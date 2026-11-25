"""Copy one short's shared inputs into both bake-off projects, so Remotion and HyperFrames render the same material.

Inputs (from 03_shorts/<short>/): build/timeline.json and build/narration.wav (tools/build_timeline.py),
labels.hy.json, assets/*.jpg, assets/bomber.svg; the font from 03_shorts/assets/fonts/.
The bomber SVG is split into the plane alone (bomber_plane.svg) and its 195 red dots as fractions of the drawing
(bomber_dots.json), so both renderers can show the bullet holes appearing one batch at a time.

Outputs (gitignored copies):
    remotion/public/      images, plane SVG, narration.wav, font
    remotion/src/data.json            {timeline, labels, dots} for `import`
    hyperframes/assets/   images, plane SVG, narration.wav, font, data.js (window.SHORT = {...})

Usage (from 03_shorts/bakeoff/):  python sync_assets.py ../pilot_survivorship
Runtime: under 1 s.
"""
import argparse
import json
import logging
import shutil
import sys
import time
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "sync_assets.log", encoding="utf-8")])
log = logging.getLogger("sync_assets")

HERE = Path(__file__).resolve().parent
FONT = HERE.parent / "assets" / "fonts" / "NotoSansArmenian-Variable.ttf"
IMAGES = ["zil_yerevan_zoo.jpg", "zil_factory_1966.jpg", "wald.jpg"]
NS = "{http://www.w3.org/2000/svg}"
DOTS_GROUP = "g2002"              # the group of red dots in File:Survivorship-bias.svg
LAYER_OFFSET = (-32.713837, -89.0942)  # translate() on its parent layer1


def split_bomber(svg_path, out_svg):
    ET.register_namespace("", "http://www.w3.org/2000/svg")
    tree = ET.parse(svg_path)
    root = tree.getroot()
    vb = [float(v) for v in root.get("viewBox").split()]
    parent = group = None
    for p in root.iter():
        for c in p:
            if c.get("id") == DOTS_GROUP:
                parent, group = p, c
    if group is None:
        raise SystemExit(f"{svg_path}: group {DOTS_GROUP} not found")
    if parent.get("id") != "layer1" or parent.get("transform") != "translate(-32.713837,-89.0942)":
        raise SystemExit(f"{svg_path}: unexpected parent {parent.get('id')} / {parent.get('transform')}")
    dots = []
    for c in group.iter(NS + "circle"):
        if c.get("transform"):
            raise SystemExit(f"circle {c.get('id')} has its own transform, not handled")
        x = float(c.get("cx")) + LAYER_OFFSET[0]
        y = float(c.get("cy")) + LAYER_OFFSET[1]
        dots.append({"x": round((x - vb[0]) / vb[2], 5), "y": round((y - vb[1]) / vb[3], 5),
                     "r": round(float(c.get("r")) / vb[2], 5)})
    parent.remove(group)
    tree.write(out_svg, encoding="utf-8", xml_declaration=True)
    return dots, vb[2] / vb[3]


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("short", type=Path)
    args = ap.parse_args()
    t0 = time.time()
    short = args.short.resolve()
    timeline = json.loads((short / "build" / "timeline.json").read_text(encoding="utf-8"))
    labels = json.loads((short / "labels.hy.json").read_text(encoding="utf-8"))
    remotion_public, remotion_src = HERE / "remotion" / "public", HERE / "remotion" / "src"
    hf_assets = HERE / "hyperframes" / "assets"
    for d in (remotion_public, hf_assets):
        d.mkdir(parents=True, exist_ok=True)

    dots, aspect = split_bomber(short / "assets" / "bomber.svg", remotion_public / "bomber_plane.svg")
    shutil.copy2(remotion_public / "bomber_plane.svg", hf_assets / "bomber_plane.svg")
    files = [short / "assets" / n for n in IMAGES] + [short / "build" / "narration.wav", FONT]
    for f in files:
        if not f.exists():
            raise SystemExit(f"missing input: {f}")
        for d in (remotion_public, hf_assets):
            shutil.copy2(f, d / f.name)

    data = {"timeline": timeline, "labels": labels, "dots": dots, "bomber_aspect": round(aspect, 5)}
    (remotion_src / "data.json").write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    (hf_assets / "data.js").write_text("window.SHORT = " + json.dumps(data, ensure_ascii=False) + ";\n",
                                       encoding="utf-8")
    log.info("synced %d files + data (%d beats, %.1f s, %d dots) into remotion/ and hyperframes/ in %.2f s",
             len(files) + 1, len(timeline["beats"]), timeline["duration"], len(dots), time.time() - t0)


if __name__ == "__main__":
    main()
