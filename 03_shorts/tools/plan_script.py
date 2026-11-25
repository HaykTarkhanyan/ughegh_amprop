"""Fill the script section of a short's PLAN.md from its beats.hy.json, so the plan never drifts from the script.

PLAN.md must contain the two marker lines `<!-- script:start -->` and `<!-- script:end -->`; everything between
them is replaced by the beats (numbered, key in bold, then the Armenian text) and a length line (characters and
seconds at the measured ~870 characters per minute, _learnings/2026-11-25-1032_...). Run it after every script edit,
then rerun the html-review converter so the HTML page (and its comments) stays attached.

Usage (from 03_shorts/):  python tools/plan_script.py crypto_paint
Runtime: under 1 s.
"""
import argparse
import json
import logging
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "plan_script.log", encoding="utf-8")])
log = logging.getLogger("plan_script")

START, END = "<!-- script:start -->", "<!-- script:end -->"
CHARS_PER_MIN = 870


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
    lines = [START, "", f"{len(beats)} beats, {chars:,} characters, ~{round(chars / CHARS_PER_MIN * 60)} s of speech "
             f"at ~{CHARS_PER_MIN} characters a minute.", ""]
    for i, b in enumerate(beats, 1):
        lines += [f"**{i}. {b['key']}.** {b['text']}", ""]
    lines.append(END)
    head, rest = plan.split(START, 1)
    _, tail = rest.split(END, 1)
    plan_path.write_text(head + "\n".join(lines) + tail, encoding="utf-8")
    log.info("%s: %d beats, %d chars written into the script section", plan_path, len(beats), chars)


if __name__ == "__main__":
    main()
