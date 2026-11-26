"""Pause-consistency diagnostic for caption timing, plus a check against hand-marked word times when they exist.

What it measures, honestly (Codex review X3, 2026-11-26): tools/build_timeline.py snaps word boundaries onto the
pauses it finds in the voice (about -35 dB for 80 ms), and this script looks for pauses with ffmpeg silencedetect
using nearly the same rule. So a small error here mostly says the snapping did what it was told; it does NOT prove
that the right word sits on each pause. It checks every predicted break after punctuation (։ . ? ! , ՝) inside a
beat and reports: matched breaks and their errors, breaks with no pause within MATCH_S (counted, not dropped), and
pauses with no punctuation.

The independent check is <short>/checkpoints.json, a short list of word times marked by hand while listening
(about 10 per video, numbers and key words first): [{"beat": "card", "word": "կարմիր", "t": 81.42}, ...]. The word
is the first word in that beat starting with the given text. When the file exists, its errors are reported too, and
they are the ones to trust for karaoke accuracy.

Quality gate: exit code 1 when the median error is over --max-median, fewer than --min-coverage of the breaks are
matched, or a hand checkpoint is off by more than --max-checkpoint.

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

sys.path.insert(0, str(Path(__file__).resolve().parent))
from runlog import setup as setup_logging  # noqa: E402

log = logging.getLogger("check_sync")
MATCH_S = 1.0  # a pause further than this from a predicted break belongs to another break


def silences(wav, noise, min_pause):
    cmd = ["ffmpeg", "-v", "info", "-i", str(wav), "-af", f"silencedetect=noise={noise}dB:d={min_pause}", "-f", "null", "-"]
    err = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8").stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    if not starts:
        raise SystemExit(f"no pauses found in {wav}; check --noise")
    return list(zip(starts, ends + [starts[-1]] * (len(starts) - len(ends))))


def break_rows(tl, pauses):
    rows = []
    for b in tl["beats"]:
        inner = [p for p in pauses if b["start"] + 0.15 < p[0] < b["end"] - 0.25]  # pauses inside the beat
        used = set()
        for w in b["words"][:-1]:
            mark = re.search(r"([։.?!,՝])»?$", w["w"])
            if not mark:
                continue
            near = min(inner, key=lambda p: abs(p[0] - w["end"]), default=None)
            matched = near is not None and abs(near[0] - w["end"]) <= MATCH_S
            if matched:
                used.add(near[0])
            rows.append({"beat": b["key"], "after": w["w"], "kind": "full stop" if mark.group(1) in "։.?!" else "comma",
                         "predicted": w["end"], "pause_start": near[0] if matched else None,
                         "pause_len": round(near[1] - near[0], 3) if matched else None,
                         "error": round(near[0] - w["end"], 3) if matched else None})
        for p in inner:
            if p[0] not in used:
                rows.append({"beat": b["key"], "after": None, "kind": "pause with no punctuation", "predicted": None,
                             "pause_start": p[0], "pause_len": round(p[1] - p[0], 3), "error": None})
    return rows


def checkpoint_rows(tl, marks):
    beats = {b["key"]: b for b in tl["beats"]}
    rows = []
    for m in marks:
        b = beats.get(m["beat"])
        if b is None:
            raise SystemExit(f"checkpoint beat {m['beat']!r} is not in the timeline")
        w = next((x for x in b["words"] if x["w"].startswith(m["word"])), None)
        if w is None:
            raise SystemExit(f"checkpoint word {m['word']!r} is not in beat {m['beat']!r}")
        rows.append({"beat": m["beat"], "word": w["w"], "marked": m["t"], "caption": w["start"],
                     "error": round(w["start"] - m["t"], 3)})
    return rows


def log_row(r):
    if r["error"] is not None:
        log.info("%-12s %-9s %+.2f s  after %s", r["beat"], r["kind"], r["error"], r["after"])
    elif r["after"] is not None:
        log.info("%-12s %-9s no matching pause within %.1f s of %.2f s  after %s", r["beat"], r["kind"], MATCH_S,
                 r["predicted"], r["after"])
    else:
        log.info("%-12s %s at %.2f s (%.2f s long)", r["beat"], r["kind"], r["pause_start"], r["pause_len"])


def main():
    setup_logging("check_sync")
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("short", type=Path)
    ap.add_argument("--noise", type=float, default=-35.0)
    ap.add_argument("--min-pause", type=float, default=0.08)
    ap.add_argument("--max-median", type=float, default=0.15, help="gate: median break error, seconds")
    ap.add_argument("--min-coverage", type=float, default=0.6, help="gate: share of breaks with a matching pause")
    ap.add_argument("--max-checkpoint", type=float, default=0.25, help="gate: worst hand-checkpoint error, seconds")
    args = ap.parse_args()
    t0 = time.time()
    tl = json.loads((args.short / "build" / "timeline.json").read_text(encoding="utf-8"))
    pauses = silences(args.short / "build" / "narration.wav", args.noise, args.min_pause)
    rows = break_rows(tl, pauses)
    breaks = [r for r in rows if r["after"] is not None]
    errs = [abs(r["error"]) for r in breaks if r["error"] is not None]
    summary = {"what": "pause consistency (not word accuracy; see checkpoints)", "breaks_expected": len(breaks),
               "breaks_matched": len(errs), "coverage": round(len(errs) / len(breaks), 3) if breaks else None,
               "breaks_unmatched": len(breaks) - len(errs), "pauses_found": len(pauses),
               "pauses_without_punctuation": sum(r["after"] is None for r in rows),
               "median_abs_error_s": round(statistics.median(errs), 3) if errs else None,
               "max_abs_error_s": round(max(errs), 3) if errs else None,
               "within_0.15_s": sum(e <= 0.15 for e in errs), "within_0.30_s": sum(e <= 0.30 for e in errs)}
    cp_path = args.short / "checkpoints.json"
    cps = checkpoint_rows(tl, json.loads(cp_path.read_text(encoding="utf-8"))) if cp_path.exists() else []
    if cps:
        cerr = [abs(c["error"]) for c in cps]
        summary.update({"checkpoints": len(cps), "checkpoint_median_s": round(statistics.median(cerr), 3),
                        "checkpoint_max_s": round(max(cerr), 3)})
    fails = []
    if summary["median_abs_error_s"] is not None and summary["median_abs_error_s"] > args.max_median:
        fails.append(f"median break error {summary['median_abs_error_s']} s > {args.max_median} s")
    if summary["coverage"] is not None and summary["coverage"] < args.min_coverage:
        fails.append(f"only {summary['coverage']:.0%} of breaks matched a pause (< {args.min_coverage:.0%})")
    if cps and summary["checkpoint_max_s"] > args.max_checkpoint:
        fails.append(f"a hand checkpoint is off by {summary['checkpoint_max_s']} s (> {args.max_checkpoint} s)")
    summary["gate"] = "fail" if fails else "pass"
    out = args.short / "build" / "sync_report.json"
    out.write_text(json.dumps({"summary": summary, "rows": rows, "checkpoints": cps, "gate_failures": fails},
                              ensure_ascii=False, indent=1), encoding="utf-8")
    for r in rows:
        log_row(r)
    for c in cps:
        log.info("checkpoint %-12s %+.2f s  %s", c["beat"], c["error"], c["word"])
    if not cps:
        log.warning("no %s: this is only a pause-consistency check, not proof of word accuracy", cp_path.name)
    log.info("summary: %s (%.1f s) -> %s", summary, time.time() - t0, out)
    if fails:
        for f in fails:
            log.error("gate: %s", f)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
