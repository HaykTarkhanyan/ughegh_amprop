# /// script
# requires-python = ">=3.10"
# dependencies = ["fonttools==4.60.1"]
# ///
"""Build the webinar 1 banner for the Idiot Brain series: SVG source + PNG, two sizes, one folder per version.

Run:  uv run 02_idiot_brain/banner/build_banner.py      (~20 s: four headless Edge renders)
Out:  02_idiot_brain/banner/out/<version>/banner_1920x1080.{svg,png}  - post / YouTube thumbnail (16:9)
      02_idiot_brain/banner/out/<version>/banner_1600x640.{svg,png}   - Discord event cover (2.5:1)
Versions differ only in the title look (VERSIONS below). Edit TEXT to change the wording.
Fonts: assets/fonts (fonter.am), emoji: assets/emoji (Twemoji 15.1.0).
"""
import base64
import logging
import struct
import subprocess
import tempfile
import time
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
ASSETS = HERE / "assets"
OUT = HERE / "out"
EDGE = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")

(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[logging.StreamHandler(), logging.FileHandler(ROOT / "logs" / "build_banner.log", encoding="utf-8")],
)
log = logging.getLogger("build_banner")

TEXT = {
    "tag": "Վեբինար #1",
    "title": ["Ապուշ", "ուղեղը"],
    "chips": [("rollercoaster", "ծովախտ"), ("doughnut", "ախորժակ"), ("sleep", "քուն"),
              ("scream", "վախ"), ("thought", "հիշողություն")],
    "credit": "Դին Բըրնեթի «The Idiot Brain» գրքի հիման վրա",
    "date": "Ուրբաթ, հոկտեմբերի 23",
    "time": "18:30",
    "place": "Zoom",
    "window_title": "ուղեղ.exe",
    "error": ["Ուղեղը չի", "արձագանքում"],
    "error_hint": "Սպասե՞լ, թե՞ փակել",
    "buttons": ["Սպասել", "Փակել"],
}

PLUM, PINK, CREAM, WHITE = "#4A2340", "#F7A8C4", "#FFF6EC", "#FFFDF9"
PEACH, LAVENDER, MINT, BUTTER, BLUSH = "#FFD9C2", "#D9C8F5", "#B5E8D5", "#FFE8A3", "#FF8FA8"

FONTS = {
    ("Bubble", 400): "MyBubbleFont-Regular.ttf",
    ("Glazz", 400): "GlazzArm-Regular.ttf",
    ("Mardoto", 400): "Mardoto-Regular.ttf",
    ("Mardoto", 500): "Mardoto-Medium.ttf",
    ("Mardoto", 700): "Mardoto-Bold.ttf",
    ("Mardoto", 900): "Mardoto-Black.ttf",
}
# title look per version (DECISIONS.md #4, #5); stroke / shadow_stroke = plum outline width as a share of the font size
VERSIONS = {
    "v1_bubble": dict(family="Bubble", fill=PINK, stroke=0.06, shadow=PLUM, shadow_stroke=0),
    "v2_glazz": dict(family="Glazz", fill=PLUM, stroke=0, shadow=MINT, shadow_stroke=0),
}


def b64(path):
    return base64.b64encode(path.read_bytes()).decode("ascii")


class Metrics:
    """Glyph coverage and advance widths, so text can be checked and boxes sized to fit."""

    def __init__(self, path):
        font = TTFont(path)
        self.cmap, self.hmtx, self.upm = font.getBestCmap(), font["hmtx"].metrics, font["head"].unitsPerEm
        self.glyphs = font.getGlyphSet()

    def ink(self, s, size):
        """(height above baseline, depth below baseline) of the actual letter shapes in s."""
        self.check(s)
        top, bottom = 0, 0
        for c in s:
            if c.isspace():
                continue
            pen = BoundsPen(self.glyphs)
            self.glyphs[self.cmap[ord(c)]].draw(pen)
            if pen.bounds:
                bottom, top = min(bottom, pen.bounds[1]), max(top, pen.bounds[3])
        return top * size / self.upm, -bottom * size / self.upm

    def check(self, s):
        missing = sorted({c for c in s if not c.isspace() and ord(c) not in self.cmap})
        if missing:
            raise ValueError(f"font has no glyphs for {''.join(missing)!r} in {s!r}")

    def width(self, s, size):
        self.check(s)
        return sum(self.hmtx[self.cmap[ord(c)]][0] for c in s if ord(c) in self.cmap) * size / self.upm


METRICS = {key: Metrics(ASSETS / "fonts" / f) for key, f in FONTS.items()}
FONT_FACES = {
    (fam, wt): f"@font-face{{font-family:'{fam}';font-weight:{wt};src:url(data:font/ttf;base64,{b64(ASSETS / 'fonts' / f)}) format('truetype');}}"
    for (fam, wt), f in FONTS.items()
}
EMOJI = {p.stem: b64(p) for p in (ASSETS / "emoji").glob("*.svg")}
MASCOT = b64(HERE / "mascot.svg")


def text(x, y, s, family="Mardoto", weight=700, size=40, fill=PLUM, anchor="start", extra=""):
    METRICS[(family, weight)].check(s)
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-family="{family}" font-weight="{weight}" font-size="{size:.1f}" '
            f'fill="{fill}" text-anchor="{anchor}" {extra}>{escape(s)}</text>')


def fit(s, family, weight, size, max_w):
    w = METRICS[(family, weight)].width(s, size)
    return size if w <= max_w else size * max_w / w


def emoji(name, x, y, size, rot=0):
    return (f'<image href="data:image/svg+xml;base64,{EMOJI[name]}" x="{x:.1f}" y="{y:.1f}" width="{size}" height="{size}" '
            f'transform="rotate({rot} {x + size / 2:.1f} {y + size / 2:.1f})"/>')


def circle(cx, cy, r, fill, opacity):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" opacity="{opacity}"/>'


def pill(x, y, h, s, fill, size, weight=700, icon=None, shadow=6, stroke=5):
    """Rounded label with a hard plum shadow; returns (svg, width)."""
    pad = h * 0.38
    icon_w = h * 0.64 + 12 if icon else 0
    w = 2 * pad + icon_w + METRICS[("Mardoto", weight)].width(s, size)
    parts = [f'<rect x="{x + shadow}" y="{y + shadow}" width="{w:.1f}" height="{h}" rx="{h / 2}" fill="{PLUM}"/>',
             f'<rect x="{x}" y="{y}" width="{w:.1f}" height="{h}" rx="{h / 2}" fill="{fill}" stroke="{PLUM}" stroke-width="{stroke}"/>']
    if icon:
        parts.append(emoji(icon, x + pad, y + h * 0.18, h * 0.64))
    parts.append(text(x + pad + icon_w, y + h / 2 + size * 0.36, s, weight=weight, size=size))
    return "\n".join(parts), w


def chip_rows(x0, y0, max_x, h, size, gap):
    """Topic chips (emoji + word), wrapped onto new rows; returns (svg, bottom y)."""
    out, x, y = [], x0, y0
    for icon, label in TEXT["chips"]:
        svg, w = pill(x, y, h, label, WHITE, size, icon=icon, shadow=5, stroke=4)
        if x + w > max_x and x > x0:
            x, y = x0, y + h + gap
            svg, w = pill(x, y, h, label, WHITE, size, icon=icon, shadow=5, stroke=4)
        out.append(svg)
        x += w + gap
    return "\n".join(out), y + h


def outline(width):
    return f'stroke="{PLUM}" stroke-width="{width:.1f}" paint-order="stroke" stroke-linejoin="round"' if width else ""


def title(x, top, style, size):
    """Two-line title with a hard offset shadow, letters starting exactly at `top`; returns (svg, y where the ink ends)."""
    family = style["family"]
    m = METRICS[(family, 400)]
    out, y = [], top
    for s in TEXT["title"]:
        rise, drop = m.ink(s, size)
        base = y + rise
        out.append(text(x + size * 0.05, base + size * 0.05, s, family, 400, size, fill=style["shadow"],
                        extra=outline(size * style["shadow_stroke"])))
        out.append(text(x, base, s, family, 400, size, fill=style["fill"], extra=outline(size * style["stroke"])))
        y = base + drop + size * 0.12
    return "\n".join(out), y - size * 0.12


def date_row(x, y, icon, size, gap=40):
    parts = []
    for name, s in (("spiral_calendar", TEXT["date"]), ("clock_630", TEXT["time"]), ("laptop", TEXT["place"])):
        parts.append(emoji(name, x, y - icon * 0.82, icon))
        x += icon + 12
        parts.append(text(x, y, s, size=size))
        x += METRICS[("Mardoto", 700)].width(s, size) + gap
    return "\n".join(parts)


def spinner(cx, cy, r=24, dot=6.5):
    """'Loading' ring of 8 dots, fading - the brain is frozen."""
    dots = []
    for k in range(8):
        a = k * 45
        dots.append(f'<circle cx="{r}" cy="0" r="{dot}" fill="{PLUM}" opacity="{(k + 1) / 8:.2f}" transform="rotate({a})"/>')
    return f'<g transform="translate({cx} {cy})">{"".join(dots)}</g>'


def button(x, y, w, h, s, fill):
    return (f'<rect x="{x + 6}" y="{y + 6}" width="{w}" height="{h}" rx="16" fill="{PLUM}"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{fill}" stroke="{PLUM}" stroke-width="5"/>'
            + text(x + w / 2, y + h / 2 + 12, s, size=34, anchor="middle"))


def window(transform):
    """The 'Brain.exe is not responding' popup, drawn in an 800x600 local box."""
    W, H, R, BAR = 800, 600, 26, 88
    p = [f'<g transform="{transform}">',
         f'<rect x="16" y="16" width="{W}" height="{H}" rx="{R}" fill="{PLUM}"/>',
         f'<rect x="0" y="0" width="{W}" height="{H}" rx="{R}" fill="{WHITE}" stroke="{PLUM}" stroke-width="6"/>',
         f'<path d="M0,{BAR} V{R} A{R},{R} 0 0 1 {R},0 H{W - R} A{R},{R} 0 0 1 {W},{R} V{BAR} Z" '
         f'fill="{PINK}" stroke="{PLUM}" stroke-width="6" stroke-linejoin="round"/>',
         emoji("warning", 26, 16, 56),
         text(98, 60, TEXT["window_title"], size=38)]
    for i, (fill, kind) in enumerate([(WHITE, "min"), (WHITE, "max"), (BLUSH, "close")]):
        bx, by = W - 20 - 46 - (2 - i) * 58, 21
        cx, cy = bx + 23, by + 23
        glyph = {"min": f"M{cx - 11},{cy + 8} H{cx + 11}",
                 "max": f"M{cx - 10},{cy - 10} h20 v20 h-20 z",
                 "close": f"M{cx - 10},{cy - 10} L{cx + 10},{cy + 10} M{cx + 10},{cy - 10} L{cx - 10},{cy + 10}"}[kind]
        p += [f'<rect x="{bx}" y="{by}" width="46" height="46" rx="10" fill="{fill}" stroke="{PLUM}" stroke-width="5"/>',
              f'<path d="{glyph}" fill="none" stroke="{PLUM}" stroke-width="5" stroke-linecap="round"/>']
    p.append(f'<image href="data:image/svg+xml;base64,{MASCOT}" x="10" y="128" width="380" height="362"/>')
    p.append(spinner(372, 150))
    size = min(fit(s, "Mardoto", 900, 56, 360) for s in TEXT["error"])
    y = 250
    for s in TEXT["error"]:
        p.append(text(412, y, s, weight=900, size=size))
        y += size * 1.15
    hint_size = fit(TEXT["error_hint"], "Mardoto", 500, 30, 360)
    p.append(text(412, y + 22, TEXT["error_hint"], weight=500, size=hint_size, extra='opacity="0.75"'))
    p.append(button(412, 480, 170, 78, TEXT["buttons"][0], MINT))
    p.append(button(602, 480, 170, 78, TEXT["buttons"][1], PEACH))
    p.append("</g>")
    return "\n".join(p)


def background(W, H, blobs):
    return (f'<rect width="{W}" height="{H}" fill="{CREAM}"/>'
            f'<defs><pattern id="dots" width="44" height="44" patternUnits="userSpaceOnUse">'
            f'<circle cx="22" cy="22" r="3" fill="{PLUM}" opacity="0.07"/></pattern></defs>'
            f'<rect width="{W}" height="{H}" fill="url(#dots)"/>' + "".join(blobs))


def wide(style):
    W, H = 1920, 1080
    body = [background(W, H, [circle(1720, 140, 330, PEACH, 0.6), circle(120, 1010, 300, LAVENDER, 0.5),
                              circle(980, 1110, 230, MINT, 0.5), circle(880, 40, 120, BUTTER, 0.7)])]
    body.append(pill(110, 80, 74, TEXT["tag"], LAVENDER, 38)[0])
    tsize = min(fit(s, style["family"], 400, 210, 820) for s in TEXT["title"])
    svg, title_end = title(100, 80 + 74 + 56, style, tsize)
    body.append(svg)
    chips, bottom = chip_rows(110, title_end + 56, 960, 74, 34, 18)
    body.append(chips)
    body.append(text(112, bottom + 64, TEXT["credit"], weight=500, size=32, extra='opacity="0.85"'))
    body.append(date_row(110, bottom + 160, 46, 38))
    body.append(window("translate(1035 205) rotate(3 400 300)"))
    body += [emoji("zzz", 1480, 40, 96, -12), emoji("question", 880, 205, 80, 14), emoji("nausea", 1110, 900, 104, -10),
             emoji("key", 1420, 935, 88, 18), emoji("cake", 1700, 905, 100, 8), emoji("cyclone", 1810, 60, 84, 0)]
    return W, H, "\n".join(body)


def cover(style):
    W, H = 1600, 640
    body = [background(W, H, [circle(1500, 60, 220, PEACH, 0.6), circle(40, 640, 200, LAVENDER, 0.5),
                              circle(830, 700, 160, MINT, 0.5)])]
    body.append(pill(64, 30, 56, TEXT["tag"], LAVENDER, 28, shadow=5, stroke=4)[0])
    tsize = min(fit(s, style["family"], 400, 130, 560) for s in TEXT["title"])
    svg, title_end = title(56, 30 + 56 + 34, style, tsize)
    body.append(svg)
    chips, bottom = chip_rows(64, title_end + 34, 830, 54, 26, 12)
    body.append(chips)
    body.append(text(66, bottom + 40, TEXT["credit"], weight=500, size=22, extra='opacity="0.85"'))
    body.append(date_row(64, 616, 34, 28, gap=30))
    body.append(window("translate(905 66) scale(0.76) rotate(3 400 300)"))
    body += [emoji("zzz", 760, 40, 70, -12), emoji("nausea", 1440, 548, 70, -10), emoji("cake", 1300, 560, 64, 8)]
    return W, H, "\n".join(body)


def svg_doc(W, H, body, title_family):
    """Embed Mardoto plus this version's title font only, so each SVG carries no unused font."""
    css = "".join(face for (fam, _), face in FONT_FACES.items() if fam in ("Mardoto", title_family))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">\n'
            f"<style>{css}</style>\n{body}\n</svg>\n")


def render(svg_path, png_path, W, H):
    """Screenshot the SVG with headless Edge; fail if the PNG is missing, stale or the wrong size."""
    profile = Path(tempfile.gettempdir()) / "build_banner_edge_profile"
    started = time.time()
    cmd = [str(EDGE), "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={profile}",
           f"--window-size={W},{H}", f"--screenshot={png_path}", svg_path.as_uri()]
    subprocess.run(cmd, check=True, capture_output=True, timeout=120)
    if not png_path.exists() or png_path.stat().st_mtime < started - 1:
        raise RuntimeError(f"Edge did not write {png_path}")
    w, h = struct.unpack(">II", png_path.read_bytes()[16:24])
    if (w, h) != (W, H):
        raise RuntimeError(f"{png_path.name}: rendered {w}x{h}, expected {W}x{H}")


def main():
    t0 = time.time()
    for version, style in VERSIONS.items():
        out = OUT / version
        out.mkdir(parents=True, exist_ok=True)
        for name, build in (("banner_1920x1080", wide), ("banner_1600x640", cover)):
            W, H, body = build(style)
            svg, png = out / f"{name}.svg", out / f"{name}.png"
            svg.write_text(svg_doc(W, H, body, style["family"]), encoding="utf-8")
            render(svg, png, W, H)
            log.info(f"{version}/{name}: svg {svg.stat().st_size / 1024:.0f} KB, png {png.stat().st_size / 1024:.0f} KB")
    log.info(f"done in {time.time() - t0:.1f} s")


if __name__ == "__main__":
    main()
