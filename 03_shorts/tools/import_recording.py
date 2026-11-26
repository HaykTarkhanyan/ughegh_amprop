"""Bring Hayk's own recording of a script into a short: keep the original, convert it, cut it into beats, write the
manifest that tools/build_timeline.py reads (Codex review X5, 2026-11-26; recording guide in zero_knowledge/PLAN.md).

Two steps, so a person checks the cuts before anything is built:

  propose  ORIGINAL SHORT   Moves nothing: copies the original (any format ffmpeg reads: phone .m4a, .mp3, .wav) to
                            <short>/audio/original/, converts it to <short>/audio/recording.wav (16-bit mono 48 kHz),
                            finds the pauses (ffmpeg silencedetect) and proposes one cut per beat boundary, in the
                            middle of the longest pauses, in order. Writes <short>/audio/cuts.json with "checked": false.
  apply    SHORT            Needs cuts.json with "checked": true (after listening to the cuts, or after comparing them
                            with a transcript). Cuts recording.wav into <short>/audio/<key>.wav, checks each piece is
                            audible, and writes manifest.json with narrator "hayk", the original's name and sha256,
                            and each beat's cut times. Then run build_timeline.py as usual.

The original and the converted files stay out of git (03_shorts/*/audio/original/, recording.wav; the repo is public).
A free reading (Q21) can differ from the script: update beats.hy.json to what was said before `apply`, since the
manifest takes each beat's text from the script.

Usage (from 03_shorts/):
    python tools/import_recording.py propose ~/OneDrive/Desktop/new_downloads/take1.m4a zero_knowledge
    python tools/import_recording.py apply zero_knowledge
Runtime: a few seconds for a 5-minute take (ffmpeg). Needs ffmpeg on PATH.
"""
import argparse
import json
import logging
import re
import shutil
import subprocess
import sys
import wave
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from runlog import setup as setup_logging  # noqa: E402
from validate_episode import audible, check_script, sha256  # noqa: E402

log = logging.getLogger("import_recording")
SR = 48000
MIN_GAP_S = 0.45  # a pause between beats is a breath at least this long


def ffmpeg(*a):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-y", *a], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        raise SystemExit(f"ffmpeg failed ({r.returncode}): {r.stderr[-800:]}")
    return r.stderr


def propose(args):
    short = args.short
    beats, errs = check_script(short)
    if errs:
        raise SystemExit("; ".join(errs))
    src = Path(args.original).expanduser()
    if not src.is_file():
        raise SystemExit(f"{src} is not a file")
    orig_dir = short / "audio" / "original"
    orig_dir.mkdir(parents=True, exist_ok=True)
    kept = orig_dir / src.name
    if kept.exists() and sha256(kept) != sha256(src):
        raise SystemExit(f"{kept} already exists with other content; rename the new take")
    if not kept.exists():
        shutil.copy2(src, kept)
    rec = short / "audio" / "recording.wav"
    ffmpeg("-i", str(kept), "-ac", "1", "-ar", str(SR), "-sample_fmt", "s16", str(rec))
    err = ffmpeg("-i", str(rec), "-af", f"silencedetect=noise=-38dB:d={MIN_GAP_S}", "-f", "null", "-")
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    with wave.open(str(rec), "rb") as w:
        total = w.getnframes() / w.getframerate()
    gaps = [(s, e) for s, e in zip(starts, ends) if s > 0.3 and e < total - 0.3]  # not the lead-in / tail
    need = len(beats) - 1
    if len(gaps) < need:
        raise SystemExit(f"found {len(gaps)} pauses of {MIN_GAP_S} s or more, need {need} beat boundaries; cut by hand "
                         f"in {short / 'audio' / 'cuts.json'}")
    chosen = sorted(sorted(gaps, key=lambda g: g[1] - g[0], reverse=True)[:need])
    cuts_at = [0.0] + [round((s + e) / 2, 3) for s, e in chosen] + [round(total, 3)]
    cuts = {"original": kept.name, "original_sha256": sha256(kept), "checked": False,
            "note": "Listen to each cut (or compare with a transcript), fix start/end, then set checked to true.",
            "beats": [{"key": b["key"], "start": cuts_at[i], "end": cuts_at[i + 1], "text_starts": b["text"][:40]}
                      for i, b in enumerate(beats)]}
    out = short / "audio" / "cuts.json"
    out.write_text(json.dumps(cuts, ensure_ascii=False, indent=1), encoding="utf-8")
    for c in cuts["beats"]:
        log.info("%-14s %7.2f-%7.2f s  %s", c["key"], c["start"], c["end"], c["text_starts"])
    log.info("proposed %d cuts in a %.1f s take -> %s (check them, then: import_recording.py apply %s)",
             len(beats), total, out, short)


def apply(args):
    short = args.short
    beats, errs = check_script(short)
    if errs:
        raise SystemExit("; ".join(errs))
    cuts = json.loads((short / "audio" / "cuts.json").read_text(encoding="utf-8"))
    if cuts.get("checked") is not True:
        raise SystemExit("cuts.json is not checked yet: listen to the cuts, then set \"checked\": true")
    if [c["key"] for c in cuts["beats"]] != [b["key"] for b in beats]:
        raise SystemExit("cuts.json beats differ from beats.hy.json; propose again or fix the keys")
    rec = short / "audio" / "recording.wav"
    entries = {}
    for b, c in zip(beats, cuts["beats"]):
        if not c["end"] > c["start"]:
            raise SystemExit(f"{c['key']}: end {c['end']} is not after start {c['start']}")
        wav = short / "audio" / f"{b['key']}.wav"
        ffmpeg("-i", str(rec), "-ss", f"{c['start']:.3f}", "-to", f"{c['end']:.3f}", "-c:a", "pcm_s16le", str(wav))
        ok, why = audible(wav)
        if not ok:
            raise SystemExit(f"{b['key']}: {why}")
        entries[b["key"]] = {"text": b["text"], "file": wav.name, "seconds": round(c["end"] - c["start"], 3),
                             "cut": [c["start"], c["end"]]}
    manifest = {"narrator": "hayk", "voice": None, "model": None, "style": None,
                "source": {"file": cuts["original"], "sha256": cuts["original_sha256"]}, "beats": entries}
    (short / "audio" / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    log.info("%s: %d beats cut from %s, %.1f s of speech; next: python tools/build_timeline.py %s", short, len(entries),
             cuts["original"], sum(e["seconds"] for e in entries.values()), short)


def main():
    setup_logging("import_recording")
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("propose")
    p.add_argument("original")
    p.add_argument("short", type=Path)
    a = sub.add_parser("apply")
    a.add_argument("short", type=Path)
    args = ap.parse_args()
    {"propose": propose, "apply": apply}[args.cmd](args)


if __name__ == "__main__":
    main()
