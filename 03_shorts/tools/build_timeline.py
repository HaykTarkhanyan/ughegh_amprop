"""Join a short's narration clips into one WAV and write timeline.json (beats, words, caption pages) for any renderer.

Reads <short>/beats.hy.json (key, text, optional screen / screen_small / visual) and <short>/audio/manifest.json
(written by tools/tts_gemini.py beats). Each clip's leading and trailing silence is cut down to LEAD_S / TAIL_S,
the clips are joined with GAP_S between them, and every word gets a start and end time spread over its beat in
proportion to its length, with extra weight after punctuation (method B in _knowledge/short_videos/lit_review.md,
section 5.1). Then the pauses the voice really makes (-35 dB for 80 ms or more) are snapped onto the nearest word
boundaries and the words between them re-spread (on 2026-11-25 length-only timing was off by 0.2 s median, ~1 s at
worst; tools/check_sync.py measures it). Words are grouped into caption pages of at most PAGE_WORDS words.

Usage (from 03_shorts/):
    python tools/build_timeline.py pilot_survivorship
Output: <short>/build/narration.wav and <short>/build/timeline.json (times in seconds).
Runtime: about 2-4 s for 70 s of speech (the pause scan is plain Python). Standard library only.
"""
import argparse
import json
import logging
import re
import sys
import time
import wave
from array import array
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "build_timeline.log", encoding="utf-8")])
log = logging.getLogger("build_timeline")

LEAD_S, TAIL_S, GAP_S = 0.05, 0.10, 0.12   # silence kept before / after each clip, and added between clips
THRESHOLD = 0.02                            # fraction of the clip's peak that counts as sound
PAUSE_WEIGHT = {"։": 4, ".": 4, "՝": 2, ",": 2, "»": 0, "«": 0}  # extra "characters" of time after punctuation
PAGE_WORDS = 3
FPS = 30
PAUSE_RMS = 10 ** (-35 / 20) * 32768        # -35 dBFS, as in ffmpeg silencedetect noise=-35dB
MIN_PAUSE_S = 0.08                          # shorter dips are gaps between sounds, not pauses
SNAP_TOL_S = 0.8                            # how far a predicted word boundary may move onto a real pause


def read_wav(path):
    with wave.open(str(path), "rb") as w:
        if w.getsampwidth() != 2 or w.getnchannels() != 1:
            raise SystemExit(f"{path}: expected 16-bit mono, got {w.getsampwidth() * 8}-bit x{w.getnchannels()}")
        sr = w.getframerate()
        samples = array("h", w.readframes(w.getnframes()))
    return sr, samples


def trim(samples, sr):
    """Return (trimmed samples, seconds of speech start inside them, seconds of speech end inside them)."""
    peak = max(abs(s) for s in samples)
    thr = THRESHOLD * peak
    first = next(i for i, s in enumerate(samples) if abs(s) > thr)
    last = len(samples) - 1 - next(i for i, s in enumerate(reversed(samples)) if abs(s) > thr)
    a = max(0, first - int(LEAD_S * sr))
    b = min(len(samples), last + int(TAIL_S * sr))
    return samples[a:b], (first - a) / sr, (last - a) / sr


def weight(w, with_pause=True):
    letters = len(re.sub(r"[^\w]", "", w))
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


def pages(words):
    """Group words into caption pages: at most PAGE_WORDS words (one more if it is an auxiliary verb, which must not
    open a page), a new page after a full stop or after a comma once the page has two words, and never a page that ends on a conjunction such as «որ»."""
    out, cur = [], []
    for i, w in enumerate(words):
        cur.append(w)
        bare = re.sub(r"[^\w]", "", w["w"])
        nxt = re.sub(r"[^\w]", "", words[i + 1]["w"]) if i + 1 < len(words) else ""
        end_mark = re.search(r"[։.?!]»?$", w["w"])
        comma = re.search(r"[,՝]»?$", w["w"])
        punct = end_mark or (comma and len(cur) >= 2)  # a lone "Հա," would flash for 0.3 s
        full = len(cur) >= PAGE_WORDS and nxt not in AUXILIARY and bare not in NO_BREAK_AFTER
        if punct or full or len(cur) > PAGE_WORDS + 1:
            out.append(cur)
            cur = []
    if cur:
        out.append(cur)
    return [{"text": " ".join(x["w"] for x in p), "start": p[0]["start"], "end": p[-1]["end"],
             "words": p} for p in out]


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("short", type=Path, help="folder of the short, e.g. pilot_survivorship")
    ap.add_argument("--no-snap", action="store_true", help="length-only word times, no snapping to real pauses")
    args = ap.parse_args()
    t_start = time.time()
    beats = json.loads((args.short / "beats.hy.json").read_text(encoding="utf-8"))
    manifest = json.loads((args.short / "audio" / "manifest.json").read_text(encoding="utf-8"))
    out_dir = args.short / "build"
    out_dir.mkdir(exist_ok=True)

    joined, sr_all, t, snapped = array("h"), None, 0.0, 0
    timeline = {"fps": FPS, "width": 1080, "height": 1920, "voice": manifest["voice"], "model": manifest["model"],
                "audio": "narration.wav", "beats": []}
    for b in beats:
        m = manifest["beats"].get(b["key"])
        if m is None:
            raise SystemExit(f"beat {b['key']} has no clip in the manifest; run tts_gemini.py beats first")
        if m["text"] != b["text"]:
            raise SystemExit(f"beat {b['key']}: text changed since the clip was made; rerun tts_gemini.py beats")
        sr, samples = read_wav(args.short / "audio" / m["file"])
        if sr_all is None:
            sr_all = sr
        elif sr != sr_all:
            raise SystemExit(f"{m['file']}: sample rate {sr} differs from {sr_all}")
        clip, s0, s1 = trim(samples, sr)
        start = t
        joined.extend(clip)
        t += len(clip) / sr
        words = word_times(b["text"], start + s0, start + s1)
        if not args.no_snap:
            found = [(start + a, start + z) for a, z in pauses_in(clip, sr, s0 + 0.05, s1 - 0.05)]
            words, n = snap(words, found)
            snapped += n
        entry = {k: b[k] for k in ("key", "text", "screen", "screen_small", "visual") if k in b}
        entry.update({"start": round(start, 3), "end": round(t, 3), "words": words, "pages": pages(words)})
        timeline["beats"].append(entry)
        gap = int(GAP_S * sr)
        joined.extend(array("h", [0]) * gap)
        t += gap / sr
    timeline["duration"] = round(t, 3)

    with wave.open(str(out_dir / "narration.wav"), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sr_all)
        w.writeframes(joined.tobytes())
    (out_dir / "timeline.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=1), encoding="utf-8")
    raw = sum(v["seconds"] for v in manifest["beats"].values())
    log.info("%s: %d beats, %.1f s (clips were %.1f s before trimming), %d caption pages, %d word boundaries snapped "
             "to real pauses, %.2f s", out_dir, len(beats), t, raw, sum(len(b["pages"]) for b in timeline["beats"]),
             snapped, time.time() - t_start)


if __name__ == "__main__":
    main()
