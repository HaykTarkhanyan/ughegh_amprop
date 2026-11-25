"""Simulate the two-test demo for the regression-to-the-mean short: 1,000 students, score = skill + luck, no praise.

Each student has a fixed skill ~ N(70, 8); each test adds fresh luck ~ N(0, 8), so the two tests correlate at ~0.5.
The script reports how the 50 best and 50 worst of test 1 do on test 2, and how the 50 best of test 2 had done on
test 1 (regression runs backwards too). It writes regression/build/simulation.json with every student's two scores
and group tags, for the renderer and so the numbers in the script are reproducible.

Usage (from 03_shorts/):  python regression/simulate.py
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
                              logging.FileHandler(ROOT / "logs" / "regression_simulate.log", encoding="utf-8")])
log = logging.getLogger("regression_simulate")

SEED, N, GROUP = 509, 1000, 50
SKILL_MEAN, SKILL_SD, LUCK_SD = 70.0, 8.0, 8.0


def main():
    rng = np.random.default_rng(SEED)
    skill = rng.normal(SKILL_MEAN, SKILL_SD, N)
    t1 = skill + rng.normal(0, LUCK_SD, N)
    t2 = skill + rng.normal(0, LUCK_SD, N)
    order1 = np.argsort(t1)
    top1, bot1 = order1[-GROUP:], order1[:GROUP]
    top2 = np.argsort(t2)[-GROUP:]
    summary = {
        "seed": SEED, "n": N, "group": GROUP, "corr": round(float(np.corrcoef(t1, t2)[0, 1]), 3),
        "mean_t1": round(float(t1.mean()), 1), "mean_t2": round(float(t2.mean()), 1),
        "top1_t1": round(float(t1[top1].mean()), 1), "top1_t2": round(float(t2[top1].mean()), 1),
        "top1_share_worse": round(float(np.mean(t2[top1] < t1[top1])), 3),
        "bot1_t1": round(float(t1[bot1].mean()), 1), "bot1_t2": round(float(t2[bot1].mean()), 1),
        "bot1_share_better": round(float(np.mean(t2[bot1] > t1[bot1])), 3),
        "top2_t2": round(float(t2[top2].mean()), 1), "top2_t1": round(float(t1[top2].mean()), 1),
    }
    tags = np.full(N, "", dtype=object)
    tags[top1], tags[bot1] = "top1", "bot1"
    students = [{"t1": round(float(a), 1), "t2": round(float(b), 1), "tag": str(tg), "top2": bool(i in set(top2))}
                for i, (a, b, tg) in enumerate(zip(t1, t2, tags))]
    out = Path(__file__).resolve().parent / "build" / "simulation.json"
    out.parent.mkdir(exist_ok=True)
    out.write_text(json.dumps({"summary": summary, "students": students}, indent=1), encoding="utf-8")
    for k, v in summary.items():
        log.info("%s: %s", k, v)
    log.info("wrote %s", out)


if __name__ == "__main__":
    main()
