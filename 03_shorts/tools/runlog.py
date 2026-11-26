"""One logging setup for every 03_shorts tool, called from each tool's main() only (Codex review X8, 2026-11-26).

Importing a tool (gemini_review imports tts_gemini, plan_script imports hy_numbers, ...) must not create files or
take over another tool's log; so modules only call logging.getLogger(name), and the entry point calls setup().
Logs go to <repo>/logs/<name>.log and to the console.
"""
import logging
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]


def setup(name: str) -> logging.Logger:
    (REPO / "logs").mkdir(exist_ok=True)
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s", force=True,
                        handlers=[logging.StreamHandler(sys.stdout),
                                  logging.FileHandler(REPO / "logs" / f"{name}.log", encoding="utf-8")])
    return logging.getLogger(name)
