"""Grab frames from two renders of the same short at the same moments and lay them out side by side in one PNG.

Default moments: two per beat (30% and 80% into it), read from remotion/src/data.json, so every scene is seen in
both renders. Uses ffmpeg (on PATH) for the frames and Pillow for the sheet.

Usage (from 03_shorts/bakeoff/):
    python compare_frames.py out/pilot_remotion.mp4 out/pilot_hyperframes.mp4 --out out/compare.png [--width 300]
Runtime: about 1 s per frame pair (36 ffmpeg seeks for 18 moments), ~20-40 s in total.
"""
import argparse
import json
import logging
import subprocess
import sys
import tempfile
import time
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "compare_frames.log", encoding="utf-8")])
log = logging.getLogger("compare_frames")
HERE = Path(__file__).resolve().parent


def moments():
    tl = json.loads((HERE / "remotion" / "src" / "data.json").read_text(encoding="utf-8"))["timeline"]
    out = []
    for i, b in enumerate(tl["beats"]):
        end = tl["beats"][i + 1]["start"] if i + 1 < len(tl["beats"]) else tl["duration"]
        for f in (0.3, 0.8):
            out.append((f"{b['key']} {f:.0%}", b["start"] + f * (end - b["start"])))
    return out


def grab(video, t, path, width):
    cmd = ["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", str(video), "-frames:v", "1",
           "-vf", f"scale={width}:-2", str(path)]
    subprocess.run(cmd, check=True)
    return Image.open(path).convert("RGB")


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("left", type=Path)
    ap.add_argument("right", type=Path)
    ap.add_argument("--out", type=Path, required=True)
    ap.add_argument("--width", type=int, default=300)
    args = ap.parse_args()
    t0 = time.time()
    ms = moments()
    font = ImageFont.truetype("arial.ttf", 18)
    tiles = []
    with tempfile.TemporaryDirectory() as tmp:
        for k, (label, t) in enumerate(ms):
            a = grab(args.left, t, Path(tmp) / f"a{k}.png", args.width)
            b = grab(args.right, t, Path(tmp) / f"b{k}.png", args.width)
            tiles.append((label, t, a, b))
            log.info("%d/%d %s at %.2f s", k + 1, len(ms), label, t)
    w, h = tiles[0][2].size
    head, gap = 30, 8
    pair_w = 2 * w + gap
    cols = 3  # three pairs per row
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * pair_w + (cols + 1) * 24, rows * (h + head + 16) + 40), "white")
    d = ImageDraw.Draw(sheet)
    d.text((24, 10), f"left: {args.left.name}   right: {args.right.name}", fill="black", font=font)
    for k, (label, t, a, b) in enumerate(tiles):
        x = 24 + (k % cols) * (pair_w + 24)
        y = 40 + (k // cols) * (h + head + 16)
        d.text((x, y + 4), f"{label}  ({t:.1f} s)", fill="black", font=font)
        sheet.paste(a, (x, y + head))
        sheet.paste(b, (x + w + gap, y + head))
    args.out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(args.out)
    log.info("%s: %d moments, %dx%d px, %.1f s", args.out, len(tiles), sheet.width, sheet.height, time.time() - t0)


if __name__ == "__main__":
    main()
