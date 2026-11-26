"""One image with a frame every N seconds of a video, each labelled with its time, for a quick visual review.

Usage (from 03_shorts/):
    python tools/contact_sheet.py VIDEO.mp4 --out sheet.png [--every 1] [--width 200] [--cols 10] [--start 0 --end 0]
    (--end 0 = to the end of the video)
One ffmpeg pass extracts the frames (fps filter), Pillow lays them out. Runtime: about 5-15 s for a 70 s 1080x1920
video. Also draws the 9:16 safe area used for captions (x 120-888, y 288-1248, from the
HyperFrames vertical guide) as a thin outline, so text that leaves it stands out.
"""
import argparse
import logging
import subprocess
import sys
import tempfile
import time
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from runlog import setup as setup_logging  # noqa: E402
log = logging.getLogger("contact_sheet")

# Safe area in 1080x1920 pixels: the right ~192 px is the widest button column (Shorts), the bottom ~670 px the title
# and description (lit review section 7). Until 2026-11-25 the box had an extra notch (x <= 780 below y 840) that no
# source backs; it pushed the captions ~85 px left of centre.
SAFE = [(120, 288), (888, 288), (888, 1248), (120, 1248)]


def main():
    setup_logging("contact_sheet")
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("video", type=Path)
    ap.add_argument("--out", type=Path, required=True)
    ap.add_argument("--every", type=float, default=1.0)
    ap.add_argument("--width", type=int, default=200)
    ap.add_argument("--cols", type=int, default=10)
    ap.add_argument("--start", type=float, default=0.0)
    ap.add_argument("--end", type=float, default=0.0)
    ap.add_argument("--no-safe", action="store_true", help="do not draw the safe-area outline")
    args = ap.parse_args()
    t0 = time.time()
    with tempfile.TemporaryDirectory() as tmp:
        cmd = ["ffmpeg", "-v", "error", "-ss", str(args.start)]
        if args.end > 0:
            cmd += ["-to", str(args.end)]
        cmd += ["-i", str(args.video), "-vf", f"fps=1/{args.every},scale={args.width}:-2", f"{tmp}/f%04d.png"]
        subprocess.run(cmd, check=True)
        frames = sorted(Path(tmp).glob("f*.png"))
        if not frames:
            raise SystemExit(f"no frames extracted from {args.video}")
        imgs = [Image.open(f).convert("RGB") for f in frames]
    w, h = imgs[0].size
    sx, sy = w / 1080, h / 1920
    head = 22
    rows = (len(imgs) + args.cols - 1) // args.cols
    sheet = Image.new("RGB", (args.cols * (w + 6) + 6, rows * (h + head + 6) + 6), "white")
    d = ImageDraw.Draw(sheet)
    font = ImageFont.truetype("arial.ttf", 15)
    for k, im in enumerate(imgs):
        x = 6 + (k % args.cols) * (w + 6)
        y = 6 + (k // args.cols) * (h + head + 6)
        t = args.start + k * args.every
        d.text((x + 2, y + 3), f"{t:5.1f} s", fill="black", font=font)
        if not args.no_safe:
            ImageDraw.Draw(im).line([(px * sx, py * sy) for px, py in SAFE + SAFE[:1]], fill=(0, 200, 255), width=1)
        sheet.paste(im, (x, y + head))
    args.out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(args.out)
    log.info("%s: %d frames, %dx%d px, %.1f s", args.out, len(imgs), sheet.width, sheet.height, time.time() - t0)


if __name__ == "__main__":
    main()
