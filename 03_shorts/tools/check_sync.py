"""Check caption timing against the real pauses in the narration: is "word time by length" close enough?

The timeline (tools/build_timeline.py) spreads each sentence's time over its words by length. This script finds
the actual pauses in <short>/build/narration.wav with ffmpeg silencedetect and compares them with the predicted
times of the breaks the timeline knows about: after every word that ends in punctuation (։ . ? ! , ՝). For each
predicted break it reports the nearest real pause and the error in seconds. Beat edges (clip joins) are skipped,
because there the timing is exact by construction.

Usage (from 03_shorts/):
    python tools/check_sync.py pilot_survivorship [--noise -35] [--min-pause 0.08]
Writes <short>/build/sync_report.json. Runtime: about 1 s.
"""
import argparse
import json
import logging
import re
import statistics
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "check_sync.log", encoding="utf-8")])
log = logging.getLogger("check_sync")


def silences(wav, noise, min_pause):
    cmd = ["ffmpeg", "-v", "info", "-i", str(wav), "-af", f"silencedetect=noise={noise}dB:d={min_pause}", "-f", "null", "-"]
    err = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8").stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    if not starts:
        raise SystemExit(f"no pauses found in {wav}; check --noise")
    return list(zip(starts, ends + [starts[-1]] * (len(starts) - len(ends))))


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("short", type=Path)
    ap.add_argument("--noise", type=float, default=-35.0)
    ap.add_argument("--min-pause", type=float, default=0.08)
    args = ap.parse_args()
    t0 = time.time()
    tl = json.loads((args.short / "build" / "timeline.json").read_text(encoding="utf-8"))
    pauses = silences(args.short / "build" / "narration.wav", args.noise, args.min_pause)
    rows = []
    for b in tl["beats"]:
        inner = [p for p in pauses if b["start"] + 0.15 < p[0] < b["end"] - 0.25]  # pauses inside the beat
        for w in b["words"][:-1]:
            mark = re.search(r"([։.?!,՝])»?$", w["w"])
            if not mark:
                continue
            near = min(inner, key=lambda p: abs(p[0] - w["end"]), default=None)
            if near and abs(near[0] - w["end"]) > 1.0:  # the voice did not pause here; a pause 1 s away is another break
                near = None
            err = round(near[0] - w["end"], 3) if near else None
            rows.append({"beat": b["key"], "word": w["w"], "kind": "full stop" if mark.group(1) in "։.?!" else "comma",
                         "predicted": w["end"], "pause_start": near[0] if near else None,
                         "pause_len": round(near[1] - near[0], 3) if near else None, "error_s": err})
        used = {r["pause_start"] for r in rows if r["beat"] == b["key"]}
        for p in inner:
            if p[0] not in used:
                rows.append({"beat": b["key"], "word": None, "kind": "pause with no punctuation", "predicted": None,
                             "pause_start": p[0], "pause_len": round(p[1] - p[0], 3), "error_s": None})
    errs = [abs(r["error_s"]) for r in rows if r["error_s"] is not None]
    summary = {"breaks_checked": len(errs), "pauses_found": len(pauses),
               "median_abs_error_s": round(statistics.median(errs), 3) if errs else None,
               "max_abs_error_s": round(max(errs), 3) if errs else None,
               "within_0.15_s": sum(e <= 0.15 for e in errs), "within_0.30_s": sum(e <= 0.30 for e in errs),
               "unmatched_pauses": sum(r["kind"] == "pause with no punctuation" for r in rows)}
    out = args.short / "build" / "sync_report.json"
    out.write_text(json.dumps({"summary": summary, "rows": rows}, ensure_ascii=False, indent=1), encoding="utf-8")
    for r in rows:
        if r["error_s"] is not None:
            log.info("%-12s %-9s %+.2f s  %s", r["beat"], r["kind"], r["error_s"], r["word"])
        else:
            log.info("%-12s %s at %.2f s (%.2f s long)", r["beat"], r["kind"], r["pause_start"], r["pause_len"])
    log.info("summary: %s (%.1f s) -> %s", summary, time.time() - t0, out)


if __name__ == "__main__":
    main()
