"""Simulate "the other line is always faster": three equal checkout lines, 30 shopping trips, how often yours wins.

Each line has 4 customers ahead of you; each takes an exponential service time with mean 1.5 min, the same for all
three lines, so no line is really faster. Your line is line 0. Writes waiting/build/lines.json (per trip: the three
finishing times and the winner) for the renderer and so the numbers in the script are reproducible.

Usage (from 03_shorts/):  python waiting/simulate_lines.py
Runtime: under 1 s. Seed 509 (the project default).
"""
import json
import logging
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "waiting_simulate_lines.log", encoding="utf-8")])
log = logging.getLogger("waiting_simulate_lines")

SEED, TRIPS, LINES, AHEAD, MEAN_MIN = 509, 30, 3, 4, 1.5


def main():
    rng = np.random.default_rng(SEED)
    times = rng.exponential(MEAN_MIN, (TRIPS, LINES, AHEAD)).sum(axis=2)
    winners = times.argmin(axis=1)
    long_run = rng.exponential(MEAN_MIN, (100_000, LINES, AHEAD)).sum(axis=2)
    summary = {"seed": SEED, "trips": TRIPS, "lines": LINES, "yours_fastest": int((winners == 0).sum()),
               "another_faster": int((winners != 0).sum()),
               "long_run_share_yours_fastest": round(float((long_run.argmin(axis=1) == 0).mean()), 3)}
    out = Path(__file__).resolve().parent / "build" / "lines.json"
    out.parent.mkdir(exist_ok=True)
    trips = [{"minutes": [round(float(x), 2) for x in t], "winner": int(w)} for t, w in zip(times, winners)]
    out.write_text(json.dumps({"summary": summary, "trips": trips}, indent=1), encoding="utf-8")
    for k, v in summary.items():
        log.info("%s: %s", k, v)
    log.info("wrote %s", out)


if __name__ == "__main__":
    main()
