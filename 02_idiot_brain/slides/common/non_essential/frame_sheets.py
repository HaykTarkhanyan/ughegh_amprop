# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow==12.0.0"]
# ///
"""Contact sheets of a built deck: the LAST overlay of each frame, 9 frames per PNG, labelled with the frame number.

The log's "Overfull \\vbox" misses TikZ drawn past the frame edge, so every frame still needs a look; these
sheets make that a few images instead of hundreds of pages. The labels match the frame numbers in the footline.

Run:  uv run 02_idiot_brain/slides/common/non_essential/frame_sheets.py webinar02                 (~1 s per frame)
      uv run 02_idiot_brain/slides/common/non_essential/frame_sheets.py webinar02 --frames 30-45
      uv run 02_idiot_brain/slides/common/non_essential/frame_sheets.py webinar02 --frames 7,12,40 --dpi 110
      uv run 02_idiot_brain/slides/common/non_essential/frame_sheets.py webinar02 --job parts_02-03
Out:  <deck>/build/sheets/<job>_<first>-<last>.png (build/ is gitignored); the paths are printed.
Needs pdftoppm (poppler) on PATH and a build with its .nav file (build_deck.py makes both).
"""
import argparse
import logging
import re
import subprocess
import tempfile
import time
from pathlib import Path

from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
SLIDES = HERE.parents[1]
ROOT = HERE.parents[3]

(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[logging.StreamHandler(), logging.FileHandler(ROOT / "logs" / "frame_sheets.log", encoding="utf-8")],
)
log = logging.getLogger("frame_sheets")


def wanted(spec, n):
    """'all', '5-20' or '3,7,12' -> sorted frame numbers within 1..n."""
    if spec == "all":
        return list(range(1, n + 1))
    out = set()
    for piece in spec.split(","):
        lo, _, hi = piece.partition("-")
        out.update(range(int(lo), int(hi or lo) + 1))
    bad = sorted(f for f in out if not 1 <= f <= n)
    if bad:
        raise ValueError(f"frames {bad} are outside 1..{n}")
    return sorted(out)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("deck", help="folder under slides/, e.g. webinar02")
    p.add_argument("--job", help="build job name (default <deck>; parts builds are parts_<ids>)")
    p.add_argument("--frames", default="all", help="'all', a range '5-20' or a list '3,7,12'")
    p.add_argument("--dpi", type=int, default=70)
    args = p.parse_args()
    t0 = time.time()
    build = SLIDES / args.deck / "build"
    job = args.job or args.deck
    pdf, nav = build / f"{job}.pdf", build / f"{job}.nav"
    last_pages = [int(b) for _, b in re.findall(r"\\beamer@framepages \{(\d+)\}\{(\d+)\}", nav.read_text(encoding="utf-8"))]
    frames = wanted(args.frames, len(last_pages))
    out_dir = build / "sheets"
    out_dir.mkdir(exist_ok=True)
    ims = []
    with tempfile.TemporaryDirectory() as tmp:
        for i, f in enumerate(frames, 1):
            stem = Path(tmp) / f"f{f:03d}"
            page = last_pages[f - 1]
            subprocess.run(["pdftoppm", "-png", "-r", str(args.dpi), "-f", str(page), "-l", str(page),
                            "-singlefile", str(pdf), str(stem)], check=True)
            im = Image.open(f"{stem}.png").convert("RGB")
            draw = ImageDraw.Draw(im)
            draw.rectangle([0, 0, 34, 16], fill="black")
            draw.text((3, 2), str(f), fill="yellow")
            ims.append((f, im))
            if i % 20 == 0:
                log.info(f"{i}/{len(frames)} frames rendered, {time.time() - t0:.0f} s")
    cols, per = 3, 9
    w, h = ims[0][1].size
    for s in range(0, len(ims), per):
        chunk = ims[s:s + per]
        rows = (len(chunk) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * (w + 6) + 6, rows * (h + 6) + 6), "#777")
        for k, (_, im) in enumerate(chunk):
            sheet.paste(im, (6 + (k % cols) * (w + 6), 6 + (k // cols) * (h + 6)))
        name = out_dir / f"{job}_{chunk[0][0]:03d}-{chunk[-1][0]:03d}.png"
        sheet.save(name)
        print(name)
    log.info(f"{len(frames)} of {len(last_pages)} frames, {len(range(0, len(ims), per))} sheets in {time.time() - t0:.0f} s")


if __name__ == "__main__":
    main()
