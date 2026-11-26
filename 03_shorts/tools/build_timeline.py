"""Join a short's narration clips into one WAV and write timeline.json (beats, words, caption pages) for any renderer.

Reads <short>/beats.hy.json (key, text, optional screen / screen_small / visual / pause_after) and
<short>/audio/manifest.json (from tools/tts_gemini.py beats, or tools/import_recording.py for Hayk's own voice).
Everything is checked first (tools/validate_episode.py, stage "audio"), so nothing is built from a changed script.
Each clip's leading and trailing silence is cut down to LEAD_S / TAIL_S, the clips are joined with GAP_S (plus the
beat's pause_after) between them, and every word gets a start and end time spread over its beat in proportion to its
spoken length, with extra weight after punctuation (method B in _knowledge/short_videos/lit_review.md, section 5.1).
Then the pauses the voice really makes (-35 dB for 80 ms or more) are snapped onto the nearest word boundaries and
the words between them re-spread. Words are grouped into caption pages for the episode's layout (PROFILES):
portrait (the Shorts) or landscape (the 16:9 long video), chosen by <short>/episode.json {"layout": "landscape"}.

Caption guarantees (Codex review X2, X14, 2026-11-26): every page fits its box in at most max_lines lines at a size
no smaller than min_px, or the build stops and names the word (reword it in the script); pages are merged until each
is on screen for MIN_PAGE_S, and any that still are not are listed as warnings in the log and in the timeline.
The timeline's "build" block holds hashes of the script, the manifest and the joined audio plus a build id, so the
renderer copy can be checked for staleness (render/sync_short.py, tools/validate_episode.py --stage render).

Usage (from 03_shorts/):
    python tools/build_timeline.py pilot_survivorship
Output: <short>/build/narration.wav and <short>/build/timeline.json (times in seconds).
Runtime: about 2-4 s for 70 s of speech (the pause scan is plain Python). Needs Pillow (caption widths).
"""
import argparse
import hashlib
import json
import logging
import re
import sys
import time
import wave
from array import array
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hy_numbers import spoken  # noqa: E402
from runlog import setup as setup_logging  # noqa: E402
from validate_episode import sha256, validate  # noqa: E402

log = logging.getLogger("build_timeline")

LEAD_S, TAIL_S, GAP_S = 0.05, 0.10, 0.12   # silence kept before / after each clip, and added between clips
THRESHOLD = 0.02                            # fraction of the clip's peak that counts as sound
PAUSE_WEIGHT = {"։": 4, ".": 4, "՝": 2, ",": 2, "»": 0, "«": 0}  # extra "characters" of time after punctuation
MIN_PAGE_S = 0.6                            # a caption page on screen shorter than this cannot be read
HOLD_S = 0.5                                # renderers keep a page up to this long after its last word
CAPTION_FONT = Path(__file__).resolve().parents[1] / "assets" / "fonts" / "NotoSansArmenian-Variable.ttf"
# Caption layouts, matching the renderers: portrait = the Shorts (pilot Composition.tsx, box x 140-780, 68 px weight
# 800, two lines end at y ~1040); landscape = render/src/zk/Long.tsx Captions16 (box 1500 px, 46 px weight 650,
# 9 px margins). Landscape pages hold a phrase, not three words: the wide box was showing portrait-sized pages.
PROFILES = {
    "portrait": {"width": 1080, "height": 1920, "box": 640, "px": 68, "weight": 800, "gap": 32, "max_lines": 2,
                 "page_words": 3, "max_merged": 5, "min_px": 44},  # 44: one long word (X2)
    "landscape": {"width": 1920, "height": 1080, "box": 1500, "px": 46, "weight": 650, "gap": 18, "max_lines": 2,
                  "page_words": 7, "max_merged": 10, "min_px": 38},
}
P = dict(PROFILES["portrait"])               # the active profile; main() switches it
FPS = 30
PAUSE_RMS = 10 ** (-35 / 20) * 32768        # -35 dBFS, as in ffmpeg silencedetect noise=-35dB
MIN_PAUSE_S = 0.08                          # shorter dips are gaps between sounds, not pauses
SNAP_TOL_S = 0.8                            # how far a predicted word boundary may move onto a real pause


class CaptionError(ValueError):
    """A caption page that cannot fit its box at any allowed size."""


def use_profile(name):
    global _FONT
    P.clear()
    P.update(PROFILES[name])
    _FONT = None


def read_wav(path):
    with wave.open(str(path), "rb") as w:
        if w.getsampwidth() != 2 or w.getnchannels() != 1:
            raise SystemExit(f"{path}: expected 16-bit mono, got {w.getsampwidth() * 8}-bit x{w.getnchannels()} "
                             "(convert it with tools/import_recording.py)")
        sr = w.getframerate()
        samples = array("h", w.readframes(w.getnframes()))
    return sr, samples


def trim(samples, sr, key="?"):
    """Return (trimmed samples, seconds of speech start inside them, seconds of speech end inside them)."""
    if not samples:
        raise SystemExit(f"beat {key}: the clip has no samples")
    peak = max(abs(s) for s in samples)
    if peak < 330:  # about -40 dBFS: nothing was said
        raise SystemExit(f"beat {key}: the clip is silent (peak {peak})")
    thr = THRESHOLD * peak
    first = next(i for i, s in enumerate(samples) if abs(s) > thr)
    last = len(samples) - 1 - next(i for i, s in enumerate(reversed(samples)) if abs(s) > thr)
    a = max(0, first - int(LEAD_S * sr))
    b = min(len(samples), last + int(TAIL_S * sr))
    return samples[a:b], (first - a) / sr, (last - a) / sr


def weight(w, with_pause=True):
    # letters as spoken: «1983» is said «հազար ինը հարյուր ութսուներեք» (Fable review 2026-11-25: captions slipped
    # around digits when a 4-digit year weighed like a 4-letter word)
    letters = len(re.sub(r"[^\w]", "", spoken(w)))
    pause = sum(PAUSE_WEIGHT.get(ch, 0) for ch in w if not ch.isalnum()) if with_pause else 0
    return max(letters, 1) + pause


def spread(words, t0, t1, last_pause=True):
    """Give the words consecutive times over [t0, t1] in proportion to their weight."""
    ws = [weight(w, with_pause=last_pause or i < len(words) - 1) for i, w in enumerate(words)]
    out, t = [], t0
    for w, wt in zip(words, ws):
        d = (t1 - t0) * wt / sum(ws)
        out.append({"w": w, "start": round(t, 3), "end": round(t + d, 3)})
        t += d
    return out


def word_times(text, t0, t1):
    """Spread [t0, t1] over the words of text by letter count plus pause weight after punctuation."""
    return spread(text.split(), t0, t1)


def pauses_in(samples, sr, t_from, t_to):
    """Pauses (start, end) in seconds between t_from and t_to: 10 ms windows whose RMS stays under PAUSE_RMS for at
    least MIN_PAUSE_S (the same rule as ffmpeg silencedetect noise=-35dB, d=0.08, used by tools/check_sync.py)."""
    win = int(sr * 0.01)
    out, run = [], None
    for k in range(int(t_from * sr) // win, int(t_to * sr) // win):
        seg = samples[k * win:(k + 1) * win]
        t = k * win / sr
        if (sum(s * s for s in seg) / len(seg)) ** 0.5 < PAUSE_RMS:
            run = t if run is None else run
        else:
            if run is not None and t - run >= MIN_PAUSE_S:
                out.append((run, t))
            run = None
    return out


def snap(words, pauses):
    """Move word boundaries onto the real pauses of the voice, then re-spread the words between those anchors by
    length. Each pause goes to the nearest boundary within SNAP_TOL_S (boundaries after punctuation are preferred);
    check_sync.py measured length-only timing at a 0.2 s median error and up to ~1 s on long beats."""
    n = len(words)
    if n < 2 or not pauses:
        return words, 0
    bounds = [words[i]["end"] for i in range(n - 1)]
    punct = [bool(re.search(r"[։.?!,՝]»?$", words[i]["w"])) for i in range(n - 1)]
    anchors = {}
    for ps, pe in pauses:
        i = min(range(n - 1), key=lambda j: abs(bounds[j] - ps) - (0.25 if punct[j] else 0))
        if abs(bounds[i] - ps) <= SNAP_TOL_S and i not in anchors:
            anchors[i] = (ps, pe)
    keep, last_end = [], words[0]["start"]
    for i in sorted(anchors):
        if anchors[i][0] > last_end:
            keep.append(i)
            last_end = anchors[i][1]
    out, a, t = [], 0, words[0]["start"]
    for i in keep + [n - 1]:
        seg_end = anchors[i][0] if i < n - 1 else words[-1]["end"]
        out += spread([w["w"] for w in words[a:i + 1]], t, seg_end, last_pause=i == n - 1)
        if i < n - 1:
            t = anchors[i][1]
        a = i + 1
    return out, len(keep)


AUXILIARY = {"է", "են", "էր", "էին", "եմ", "ես", "ենք", "եք", "էի", "էիր", "էինք", "էիք"}
NO_BREAK_AFTER = {"որ", "ու", "և", "իսկ", "բայց", "երբ"}


_FONT = None


def word_px(w):
    """Width in pixels of one caption word at the profile's size and weight (outline and zoom excluded)."""
    global _FONT
    if _FONT is None:
        from PIL import ImageFont
        if not CAPTION_FONT.exists():
            raise SystemExit(f"caption font missing: {CAPTION_FONT}")
        _FONT = ImageFont.truetype(str(CAPTION_FONT), P["px"])
        _FONT.set_variation_by_axes([P["weight"], 100])  # wght, wdth
    return _FONT.getlength(w["w"])


def n_lines(words, size=None):
    """How many lines the browser makes of these words in the profile's box: greedy wrapping, each inline-block word
    taking its width (at font size `size`, default the profile's) plus its margin, as the renderers do. A word wider
    than the box on its own counts as an overflow line, so it can never pass as fitting (X2)."""
    scale = (size or P["px"]) / P["px"]
    lines, cur = 1, 0.0
    for w in words:
        need = word_px(w) * scale + P["gap"]
        if need > P["box"]:
            return 99  # wider than the box on its own: never fits
        if cur > 0 and cur + need > P["box"]:
            lines, cur = lines + 1, need
        else:
            cur += need
    return lines


def fits(words, size=None):
    return n_lines(words, size) <= P["max_lines"]


def page_size(words):
    """The profile's size, or the largest smaller one (2 px steps, down to min_px) at which the page fits. Raises
    CaptionError when even min_px does not fit: reword the script (split the long word) instead of overflowing."""
    size = P["px"]
    while not fits(words, size):
        if size - 2 < P["min_px"]:
            widest = max(words, key=word_px)["w"]
            raise CaptionError(f"caption page «{' '.join(x['w'] for x in words)}» does not fit at {P['min_px']} px "
                               f"(widest word «{widest}»); reword it in beats.hy.json")
        size -= 2
    return size


def ends_sentence(page):
    return bool(re.search(r"[։.?!]»?$", page[-1]["w"]))


def shown_s(out, k, tail_hold):
    """Seconds page k is on screen with the renderers' rule: from its first word until the next page starts, but no
    longer than HOLD_S after its last word; the beat's last page holds over the gap after the beat (tail_hold)."""
    p = out[k]
    if k + 1 < len(out):
        end = min(out[k + 1][0]["start"], p[-1]["end"] + HOLD_S)
    else:
        end = p[-1]["end"] + tail_hold
    return end - p[0]["start"]


def pages(words, tail_hold=HOLD_S, key="?"):
    """Group words into caption pages of at most max_lines lines (wrapping simulated with the real font): a page
    closes when the next word would not fit, after page_words words, after a full stop, or after a comma once the
    page has two words. An auxiliary verb or a word that closes a quotation never opens a page, and a page never ends
    on a conjunction such as «որ». Then short pages are merged with a neighbour until each is on screen MIN_PAGE_S:
    first never across a sentence end (that made pages that read badly), then, for pages still too short, across one.
    Pages grouped by word count alone wrapped to 3-5 lines in portrait; strictly one line split most pages into
    single words that flashed for 0.1-0.3 s (both 2026-11-25)."""
    out, cur = [], []
    for i, w in enumerate(words):
        cur.append(w)
        bare = re.sub(r"[^\w]", "", w["w"])
        nxt_raw = words[i + 1]["w"] if i + 1 < len(words) else ""
        nxt = re.sub(r"[^\w]", "", nxt_raw)
        closes_quote = "»" in nxt_raw and "«" not in nxt_raw  # «... տարի» must not open a page (Gemini, 2026-11-25)
        end_mark = re.search(r"[։.?!]»?$", w["w"])
        comma = re.search(r"[,՝]»?$", w["w"])
        punct = end_mark or (comma and len(cur) >= 2)  # a lone "Հա," would flash for 0.3 s
        may_break = nxt not in AUXILIARY and not closes_quote and bare not in NO_BREAK_AFTER
        too_wide = bool(nxt_raw) and not fits(cur + [words[i + 1]])
        full = (len(cur) >= P["page_words"] or too_wide) and may_break
        if punct or full or len(cur) > P["page_words"] + 1:
            out.append(cur)
            cur = []
    if cur:
        out.append(cur)

    def merge_pass(across_sentences, extra=0):
        merged = True
        while merged:
            merged = False
            for k in range(len(out)):
                if shown_s(out, k, tail_hold) >= MIN_PAGE_S:
                    continue
                p = out[k]
                ok_end = lambda q: across_sentences or not ends_sentence(q)  # noqa: E731
                limit = P["max_merged"] + extra
                can_next = (k + 1 < len(out) and ok_end(p) and len(p) + len(out[k + 1]) <= limit
                            and fits(p + out[k + 1]))
                can_prev = (k > 0 and ok_end(out[k - 1]) and len(out[k - 1]) + len(p) <= limit
                            and fits(out[k - 1] + p))
                if can_prev and (ends_sentence(p) or not can_next):
                    out[k - 1:k + 1] = [out[k - 1] + p]
                elif can_next:
                    out[k:k + 2] = [p + out[k + 1]]
                else:
                    continue
                merged = True
                break

    merge_pass(across_sentences=False)
    merge_pass(across_sentences=True)
    merge_pass(across_sentences=False, extra=1)  # last resort: one word over the limit, if it still fits (X14)
    result, short = [], []
    for k, p in enumerate(out):
        try:
            size = page_size(p)
        except CaptionError as e:
            raise SystemExit(f"beat {key}: {e}") from None
        shown = shown_s(out, k, tail_hold)
        if shown < MIN_PAGE_S:
            short.append({"beat": key, "text": " ".join(x["w"] for x in p), "shown_s": round(shown, 3)})
        result.append({"text": " ".join(x["w"] for x in p), "start": p[0]["start"], "end": p[-1]["end"], "words": p,
                       "size": size})
    return result, short


def main():
    setup_logging("build_timeline")
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("short", type=Path, help="folder of the short, e.g. pilot_survivorship")
    ap.add_argument("--no-snap", action="store_true", help="length-only word times, no snapping to real pauses")
    args = ap.parse_args()
    t_start = time.time()
    errs = validate(args.short, "audio")
    if errs:
        for e in errs:
            log.error("%s", e)
        raise SystemExit(f"{args.short.name}: {len(errs)} problem(s); nothing was built")
    ep_path = args.short / "episode.json"
    layout = json.loads(ep_path.read_text(encoding="utf-8")).get("layout", "portrait") if ep_path.exists() else "portrait"
    if layout not in PROFILES:
        raise SystemExit(f"{ep_path}: layout {layout!r} is not one of {sorted(PROFILES)}")
    use_profile(layout)
    beats = json.loads((args.short / "beats.hy.json").read_text(encoding="utf-8"))
    man_path = args.short / "audio" / "manifest.json"
    manifest = json.loads(man_path.read_text(encoding="utf-8"))
    out_dir = args.short / "build"
    out_dir.mkdir(exist_ok=True)

    joined, sr_all, t, snapped, short_pages = array("h"), None, 0.0, 0, []
    timeline = {"fps": FPS, "width": P["width"], "height": P["height"], "layout": layout,
                "narrator": manifest.get("narrator", "gemini-tts"), "voice": manifest.get("voice"),
                "model": manifest.get("model"), "audio": "narration.wav", "beats": []}
    for b in beats:
        m = manifest["beats"][b["key"]]
        sr, samples = read_wav(args.short / "audio" / m["file"])
        if sr_all is None:
            sr_all = sr
        elif sr != sr_all:
            raise SystemExit(f"{m['file']}: sample rate {sr} differs from {sr_all}")
        clip, s0, s1 = trim(samples, sr, b["key"])
        start = t
        joined.extend(clip)
        t += len(clip) / sr
        words = word_times(b["text"], start + s0, start + s1)
        if not args.no_snap:
            found = [(start + a, start + z) for a, z in pauses_in(clip, sr, s0 + 0.05, s1 - 0.05)]
            words, n = snap(words, found)
            snapped += n
        # pause_after: seconds of silence for the picture after this beat (Fable review F122, 2026-11-25)
        gap_s = GAP_S + b.get("pause_after", 0)
        pg, short = pages(words, tail_hold=min(HOLD_S, (t - (start + s1)) + gap_s), key=b["key"])
        short_pages += short
        entry = {k: b[k] for k in ("key", "text", "screen", "screen_small", "visual", "pause_after") if k in b}
        entry.update({"start": round(start, 3), "end": round(t, 3), "words": words, "pages": pg})
        timeline["beats"].append(entry)
        gap = int(gap_s * sr)
        joined.extend(array("h", [0]) * gap)
        t += gap / sr
    timeline["duration"] = round(t, 3)
    timeline["warnings"] = {"short_pages": short_pages}

    with wave.open(str(out_dir / "narration.wav"), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sr_all)
        w.writeframes(joined.tobytes())
    audio_sha = sha256(out_dir / "narration.wav")
    timeline["build"] = {"id": f"{datetime.now():%Y%m%d-%H%M%S}-{audio_sha[:8]}",
                         "script_sha": sha256(args.short / "beats.hy.json"), "manifest_sha": sha256(man_path),
                         "audio_sha": audio_sha}
    (out_dir / "timeline.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=1), encoding="utf-8")
    for s in short_pages:
        log.warning("caption page on screen only %.2f s (under %.1f s): %s «%s»", s["shown_s"], MIN_PAGE_S, s["beat"], s["text"])
    raw = sum(v["seconds"] for v in manifest["beats"].values())
    log.info("%s (%s): %d beats, %.1f s (clips were %.1f s before trimming), %d caption pages, %d short, %d word "
             "boundaries snapped to real pauses, build %s, %.2f s", out_dir, layout, len(beats), t, raw,
             sum(len(b["pages"]) for b in timeline["beats"]), len(short_pages), snapped, timeline["build"]["id"],
             time.time() - t_start)


if __name__ == "__main__":
    main()
