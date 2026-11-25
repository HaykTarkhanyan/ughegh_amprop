"""Fill the script section of a short's PLAN.md from its beats.hy.json, so the plan never drifts from the script.

PLAN.md must contain the two marker lines `<!-- script:start -->` and `<!-- script:end -->`; everything between
them is replaced by the beats (numbered, key in bold, then the Armenian text) and a length line (characters and
seconds: the midpoint of the estimate from the text as written and with numbers spelled out (tools/hy_numbers.py),
at ~870 characters per minute, calibrated on two measured digit-heavy beats on 2026-11-25). Run it after every script edit,
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
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "plan_script.log", encoding="utf-8")])
log = logging.getLogger("plan_script")

START, END = "<!-- script:start -->", "<!-- script:end -->"
CHARS_PER_MIN = 870
GAP_S, TAIL_S = 0.12, 1.2      # build_timeline.py gap between beats, Composition tail
CEILING_S = 165                 # 2:45 of speech keeps a Short under 3:00 (YouTube limit)


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("short", type=Path)
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
    flag = " **Over the 2:45 speech ceiling: cut a beat.**" if est + silent > CEILING_S else ""
    pauses = f", {silent:g} s of them marked silent pauses" if silent else ""
    lines = [START, "", f"{len(beats)} beats, {chars:,} characters ({spoken_chars:,} with numbers spelled out): "
             f"~{round(est)} s of speech, ~{int(total // 60)}:{round(total % 60):02d} with pauses and the end tail"
             f"{pauses} (estimate, calibrated on 2 measured beats, about +-10%).{flag}", ""]
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
