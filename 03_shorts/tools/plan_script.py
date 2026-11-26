"""Fill the script section of a short's PLAN.md from its beats.hy.json, so the plan never drifts from the script.

PLAN.md must contain the two marker lines `<!-- script:start -->` and `<!-- script:end -->`; everything between
them is replaced by the beats (numbered, key in bold, then the Armenian text) and a length line (characters and
seconds: the midpoint of the estimate from the text as written and with numbers spelled out (tools/hy_numbers.py),
at ~870 characters per minute, calibrated on two measured digit-heavy beats on 2026-11-25; checked on 2026-11-26 against
the two voiced scripts: totals +4.4% (pilot, 6 beats) and -0.7% (zero_knowledge, 13 beats), single beats -26% to +20%,
so it is a planning allowance, not a validated accuracy band, and not calibrated for Hayk's own reading). Run it after every script edit,
then rerun the html-review converter so the HTML page (and its comments) stays attached.

Usage (from 03_shorts/):  python tools/plan_script.py crypto_paint
Runtime: under 1 s.
"""
import argparse
import json
import logging
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hy_numbers import spoken  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
from runlog import setup as setup_logging  # noqa: E402
log = logging.getLogger("plan_script")

START, END = "<!-- script:start -->", "<!-- script:end -->"
CHARS_PER_MIN = 870
GAP_S, TAIL_S = 0.12, 1.2      # build_timeline.py gap between beats, Composition tail
CEILING_S = 165                 # 2:45 of speech keeps a Short under 3:00 (YouTube limit)


def main():
    setup_logging("plan_script")
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("short", type=Path)
    ap.add_argument("--ceiling", type=float, default=CEILING_S,
                    help="seconds of speech + pauses before the plan flags a cut; 0 = no limit (long videos)")
    args = ap.parse_args()
    beats = json.loads((args.short / "beats.hy.json").read_text(encoding="utf-8"))
    plan_path = args.short / "PLAN.md"
    plan = plan_path.read_text(encoding="utf-8")
    if plan.count(START) != 1 or plan.count(END) != 1:
        raise SystemExit(f"{plan_path}: needs exactly one {START} and one {END} line")
    chars = sum(len(b["text"]) for b in beats)
    spoken_chars = sum(len(spoken(b["text"])) for b in beats)
    est = (chars + spoken_chars) / 2 / CHARS_PER_MIN * 60  # midpoint: digits as written vs spelled out
    silent = sum(b.get("pause_after", 0) for b in beats)  # marked pauses for the picture (F122)
    total = est + GAP_S * (len(beats) - 1) + silent + TAIL_S
    over = args.ceiling and est + silent > args.ceiling
    flag = f" **Over the {int(args.ceiling // 60)}:{int(args.ceiling % 60):02d} speech ceiling: cut a beat.**" if over else ""
    pauses = f", {silent:g} s of them marked silent pauses" if silent else ""
    secs = round(total)  # round first, then split, so 59.6 s prints 1:00, not 0:60 (Codex review X61)
    lines = [START, "", f"{len(beats)} beats, {chars:,} characters ({spoken_chars:,} with numbers spelled out): "
             f"~{round(est)} s of speech, ~{secs // 60}:{secs % 60:02d} with pauses and the end tail"
             f"{pauses} (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to "
             f"26% off; a human reading can differ more; the timeline gives the real length).{flag}", ""]
    for i, b in enumerate(beats, 1):
        pause = f" *[pause {b['pause_after']:g} s]*" if b.get("pause_after") else ""
        lines += [f"**{i}. {b['key']}.** {b['text']}{pause}", ""]
    lines.append(END)
    head, rest = plan.split(START, 1)
    _, tail = rest.split(END, 1)
    plan_path.write_text(head + "\n".join(lines) + tail, encoding="utf-8")
    log.info("%s: %d beats, %d chars written into the script section", plan_path, len(beats), chars)


if __name__ == "__main__":
    main()
