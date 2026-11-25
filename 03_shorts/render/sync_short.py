"""Copy a short's timeline and narration into the render project, so its Remotion composition can read them.

Copies 03_shorts/<short>/build/timeline.json -> render/src/data/<short>.json and
03_shorts/<short>/build/narration.wav -> render/public/<short>/narration.wav (both gitignored: regenerated from
tools/build_timeline.py). Run it after every build_timeline.py run.

Usage (from 03_shorts/render/):  python sync_short.py zero_knowledge
Runtime: under 1 s.
"""
import argparse
import logging
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout), logging.FileHandler(ROOT / "logs" / "sync_short.log", encoding="utf-8")])
log = logging.getLogger("sync_short")


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("short")
    args = ap.parse_args()
    build = HERE.parent / args.short / "build"
    for f in ("timeline.json", "narration.wav"):
        if not (build / f).exists():
            raise SystemExit(f"{build / f} is missing: run tools/build_timeline.py {args.short} first")
    (HERE / "src" / "data").mkdir(parents=True, exist_ok=True)
    (HERE / "public" / args.short).mkdir(parents=True, exist_ok=True)
    shutil.copyfile(build / "timeline.json", HERE / "src" / "data" / f"{args.short}.json")
    shutil.copyfile(build / "narration.wav", HERE / "public" / args.short / "narration.wav")
    log.info("synced %s: timeline -> src/data/%s.json, narration -> public/%s/narration.wav", args.short, args.short, args.short)


if __name__ == "__main__":
    main()
