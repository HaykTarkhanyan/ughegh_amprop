# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Build the vector art the slide decks use: Twemoji icons and the brain mascot in several moods.

Run:  uv run 02_idiot_brain/slides/common/build_art.py     (~15 s; ~40 s on the first run, which downloads the emoji)
Out:  02_idiot_brain/slides/common/art/emoji.pdf    one Twemoji 15.1.0 icon per page (square)
      02_idiot_brain/slides/common/art/mascot.pdf   one mascot mood per page (420x400, same body as banner/mascot.svg)
      02_idiot_brain/slides/common/art/title_banner.pdf  the v2 banner (banner/out/v2_glazz) as a vector title slide
      02_idiot_brain/slides/common/art/art_index.tex  \\artpage{<kind>}{<name>}{<page>} lines read by preamble.tex
In LaTeX: \\emoji{doughnut}, \\emoji[2cm]{brain}, \\mascot[3cm]{sleepy}. An unknown name stops the build with an error.
Headless Edge prints each set to PDF (vector, transparent background); SVGs are cached in art/twemoji/.
"""
import base64
import logging
import math
import subprocess
import tempfile
import time
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
ART = HERE / "art"
CACHE = ART / "twemoji"
EDGE = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")
TWEMOJI = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/{}.svg"

(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[logging.StreamHandler(), logging.FileHandler(ROOT / "logs" / "build_art.log", encoding="utf-8")],
)
log = logging.getLogger("build_art")

# name used in LaTeX -> Twemoji file name (code points, lowercase hex)
EMOJI = {
    # brain, warnings, banner chips
    "brain": "1f9e0", "warning": "26a0", "rollercoaster": "1f3a2", "doughnut": "1f369", "sleeping": "1f634",
    "scream": "1f631", "thought": "1f4ad", "question": "2753", "cyclone": "1f300", "calendar": "1f5d3",
    "clock630": "1f561", "computer": "1f4bb", "receipt": "1f9fe", "gift": "1f381", "lizard": "1f98e",
    "boss": "1f454", "keyboard": "2328", "wastebasket": "1f5d1", "batterylow": "1faab", "skull": "1f480",
    # motion sickness
    "car": "1f697", "ship": "1f6a2", "airplane": "2708", "nauseated": "1f922", "vomit": "1f92e", "eye": "1f441",
    "ear": "1f442", "tree": "1f333", "wave": "1f30a", "book": "1f4d6", "walking": "1f6b6", "dizzy": "1f635",
    # appetite
    "cake": "1f370", "icecream": "1f368", "potato": "1f954", "apple": "1f34e", "burger": "1f354", "salad": "1f957",
    "clock12": "1f55b", "forkknife": "1f374", "pasta": "1f35d", "fire": "1f525", "drool": "1f924", "pizza": "1f355",
    # sleep
    "bed": "1f6cf", "personbed": "1f6cc", "moon": "1f319", "sun": "2600", "zzz": "1f4a4", "dolphin": "1f42c",
    "jellyfish": "1fabc", "rat": "1f400", "chipmunk": "1f43f", "alarm": "23f0", "phone": "1f4f1", "ghost": "1f47b",
    "alien": "1f47d", "yawn": "1f971", "baby": "1f476", "construction": "1f6a7", "broom": "1f9f9",
    "thermometer": "1f321", "cold": "1f976", "monkey": "1f412",
    # fear
    "tiger": "1f405", "axe": "1fa93", "balloon": "1f388", "heart": "2764", "anatomicalheart": "1fac0",
    "lungs": "1fac1", "sweat": "1f4a6", "eyes": "1f440", "butterfly": "1f98b", "runner": "1f3c3", "boxing": "1f94a",
    "station": "1f689", "taxi": "1f695", "bell": "1f514", "couch": "1f6cb", "muscle": "1f4aa", "toilet": "1f6bd",
    # memory
    "floppy": "1f4be", "door": "1f6aa", "coffee": "2615", "diving": "1f93f", "wine": "1f377", "beer": "1f37a",
    "dove": "1f54a", "puzzle": "1f9e9", "fish": "1f41f", "trophy": "1f3c6", "detective": "1f575", "judge": "2696",
    "cheese": "1f9c0", "film": "1f3ac", "magnifier": "1f50d", "key": "1f511", "firework": "1f386", "house": "1f3e0",
    "gloves": "1f9e4", "trafficlight": "1f6a6", "stop": "1f6d1", "mute": "1f507", "videogame": "1f3ae",
    "mirror": "1fa9e", "star": "2b50", "hospital": "1f3e5", "pill": "1f48a", "camera": "1f4f7", "tv": "1f4fa",
    "crown": "1f451", "nerd": "1f913", "lock": "1f512", "musical": "1f3b5", "chips": "1f35f",
    # faces, hands and general signs
    "check": "2705", "cross": "274c", "hand": "270b", "wavehand": "1f44b", "speech": "1f4ac", "pencil": "270f",
    "memo": "1f4dd", "monocle": "1f9d0", "thinking": "1f914", "grin": "1f600", "sweatsmile": "1f605",
    "facepalm": "1f926", "popcorn": "1f37f", "bulb": "1f4a1", "sparkles": "2728", "party": "1f389",
    "chart": "1f4ca", "testtube": "1f9ea", "people": "1f465", "pin": "1f4cc", "hourglass": "23f3",
    "microscope": "1f52c", "books": "1f4da", "megaphone": "1f4e3", "student": "1f9d1-200d-1f393",
    "zany": "1f92a", "hundred": "1f4af", "link": "1f517", "target": "1f3af",
}

PLUM, PINK, FOLD, WHITE, BLUSH, MINT, DROP = "#4A2340", "#F7A8C4", "#E57FA6", "#FFFDF9", "#FF8FA8", "#B5E8D5", "#9ED8F5"
SICK, SICK_FOLD = "#BFE3A6", "#8FC774"
BODY_CIRCLES = [(122, 175, 62), (160, 118, 64), (226, 102, 66), (292, 136, 60),
                (300, 198, 56), (250, 232, 64), (162, 232, 64), (207, 178, 95)]
FOLDS = ["M207,48 C198,72 216,92 205,116", "M118,140 C134,120 158,128 164,106", "M250,80 C270,92 262,112 286,116",
         "M90,192 C106,176 96,160 116,150", "M322,178 C302,172 306,152 290,150", "M150,72 C164,84 178,72 186,88"]


def limb(d, outer, inner):
    return (f'<path d="{d}" fill="none" stroke="{PLUM}" stroke-width="{outer}"/>'
            f'<path d="{d}" fill="none" stroke="{PINK}" stroke-width="{inner}"/>')


def arms(pose, skin):
    """Arms are drawn before the body, so the body hides the shoulders."""
    if pose == "up":  # raised in panic, as on the banner
        paths, hands = ["M78,195 Q38,182 34,140", "M336,195 Q376,182 380,140"], [(34, 134), (380, 134)]
    else:  # hanging down
        paths, hands = ["M84,214 Q52,236 54,276", "M330,214 Q362,236 360,276"], [(54, 282), (360, 282)]
    out = [limb(d, 22, 10).replace(PINK, skin) for d in paths]
    out += [f'<circle cx="{x}" cy="{y}" r="15" fill="{skin}" stroke="{PLUM}" stroke-width="6"/>' for x, y in hands]
    return "".join(out)


def body(skin, fold):
    legs = "".join(limb(d, 24, 12).replace(PINK, skin) for d in ("M178,280 L170,335", "M240,280 L248,335"))
    shoes = (f'<g stroke="{PLUM}" stroke-width="6"><ellipse cx="160" cy="343" rx="32" ry="16" fill="{MINT}"/>'
             f'<ellipse cx="258" cy="343" rx="32" ry="16" fill="{MINT}"/>'
             f'<path d="M132,350 Q160,362 188,350" fill="none" stroke="{WHITE}" stroke-width="5"/>'
             f'<path d="M230,350 Q258,362 286,350" fill="none" stroke="{WHITE}" stroke-width="5"/></g>')
    circles = "".join(f'<circle cx="{x}" cy="{y}" r="{r}"/>' for x, y, r in BODY_CIRCLES)
    blob = (f'<g fill="{PLUM}" stroke="{PLUM}" stroke-width="20">{circles}</g><g fill="{skin}">{circles}</g>'
            f'<g fill="none" stroke="{fold}" stroke-width="7">' + "".join(f'<path d="{d}"/>' for d in FOLDS) + "</g>")
    return legs + shoes, blob


def eyes(pupil_dx=0, pupil_dy=0, pupil_r=17):
    out = (f'<g stroke="{PLUM}" stroke-width="6" fill="{WHITE}"><ellipse cx="172" cy="188" rx="30" ry="34"/>'
           f'<ellipse cx="244" cy="188" rx="30" ry="34"/></g>')
    for cx in (176, 248):
        x, y = cx + pupil_dx, 195 + pupil_dy
        out += (f'<circle cx="{x}" cy="{y}" r="{pupil_r}" fill="{PLUM}"/>'
                f'<circle cx="{x - 7}" cy="{y - 9}" r="{max(3, pupil_r * 0.4):.0f}" fill="{WHITE}"/>')
    return out


def line(d, w=7):
    return f'<path d="{d}" fill="none" stroke="{PLUM}" stroke-width="{w}"/>'


BLUSH_CHEEKS = (f'<ellipse cx="136" cy="230" rx="20" ry="11" fill="{BLUSH}" opacity="0.55"/>'
                f'<ellipse cx="280" cy="230" rx="20" ry="11" fill="{BLUSH}" opacity="0.55"/>')
SWEAT = f'<path d="M330,84 q16,22 0,33 q-16,-11 0,-33 z" fill="{DROP}" stroke="{PLUM}" stroke-width="4"/>'
WORRIED_BROWS = line("M146,146 L186,132") + line("M230,132 L270,146")
Z = lambda x, y, s: line(f"M{x},{y} h{s} l-{s},{s * 1.1:.0f} h{s}", 6)


def spiral(cx, cy):
    pts = []
    for k in range(60):
        a, r = k * 0.42, 1.5 + k * 0.42
        pts.append(f"{cx + r * math.cos(a):.1f},{cy + r * math.sin(a):.1f}")
    return f'<polyline points="{" ".join(pts)}" fill="none" stroke="{PLUM}" stroke-width="5"/>'


def lids(skin):
    """Half-closed upper lids, for the smug look."""
    return "".join(f'<path d="M{cx - 30},188 A30,34 0 0 1 {cx + 30},188 Z" fill="{skin}" stroke="{PLUM}" stroke-width="6"/>'
                   for cx in (172, 244))


# mood -> (arm pose, skin, fold colour, face svg)
MOODS = {
    "panic": ("up", PINK, FOLD, WORRIED_BROWS + eyes() + BLUSH_CHEEKS + line("M191,244 q8,-8 17,0 q9,8 17,0", 6) + SWEAT),
    "happy": ("up", PINK, FOLD, line("M148,140 Q166,124 186,134") + line("M230,134 Q250,124 268,140")
              + eyes(0, -6) + BLUSH_CHEEKS
              + f'<path d="M184,234 Q208,274 232,234 Z" fill="{PLUM}" stroke="{PLUM}" stroke-width="5" stroke-linejoin="round"/>'
              + f'<ellipse cx="208" cy="252" rx="10" ry="6" fill="{BLUSH}"/>'),
    "scared": ("up", PINK, FOLD, WORRIED_BROWS + eyes(0, 0, 10) + BLUSH_CHEEKS
               + f'<ellipse cx="208" cy="250" rx="14" ry="18" fill="{PLUM}"/>' + SWEAT),
    "sleepy": ("down", PINK, FOLD, line("M144,192 Q172,208 200,192") + line("M216,192 Q244,208 272,192")
               + BLUSH_CHEEKS + f'<ellipse cx="208" cy="244" rx="8" ry="10" fill="{PLUM}"/>'
               + Z(300, 40, 22) + Z(338, 6, 30)),
    "sick": ("down", SICK, SICK_FOLD, WORRIED_BROWS
             + f'<g stroke="{PLUM}" stroke-width="6" fill="{WHITE}"><ellipse cx="172" cy="188" rx="30" ry="34"/>'
               f'<ellipse cx="244" cy="188" rx="30" ry="34"/></g>' + spiral(172, 190) + spiral(244, 190)
             + line("M186,248 l11,-9 l11,9 l11,-9 l11,9", 6) + SWEAT.replace(DROP, SICK)),
    "confused": ("down", PINK, FOLD, line("M148,142 L186,142") + line("M230,128 Q252,112 272,130")
                 + eyes(8, -10) + BLUSH_CHEEKS + line("M192,246 q8,-7 16,0 q8,7 16,0 q4,-4 8,-2", 6)),
    "smug": ("down", PINK, FOLD, line("M148,148 L188,140") + line("M228,140 L268,148")
             + eyes(4, 6) + lids(PINK) + BLUSH_CHEEKS + line("M190,246 Q216,254 236,232", 6)),
    "hungry": ("down", PINK, FOLD, line("M148,140 Q166,126 186,136") + line("M230,136 Q250,126 268,140")
               + eyes(0, -8, 19) + BLUSH_CHEEKS
               + f'<path d="M184,234 Q208,270 232,234 Z" fill="{PLUM}" stroke="{PLUM}" stroke-width="5" stroke-linejoin="round"/>'
               + f'<path d="M226,250 q9,14 0,22 q-9,-8 0,-22 z" fill="{DROP}" stroke="{PLUM}" stroke-width="3"/>'),
    "thinking": ("down", PINK, FOLD, line("M148,138 L186,134") + line("M230,134 L268,138")
                 + eyes(-8, -10) + BLUSH_CHEEKS + line("M196,246 L222,242", 6)),
}


def mascot_svg(mood):
    pose, skin, fold, face = MOODS[mood]
    lower, blob = body(skin, fold)
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 400" width="420" height="400">'
            f'<g stroke-linecap="round" stroke-linejoin="round">{lower}{arms(pose, skin)}{blob}{face}</g></svg>')


def fetch(name, code):
    path = CACHE / f"{code}.svg"
    if not path.exists():
        with urllib.request.urlopen(TWEMOJI.format(code), timeout=30) as r:  # raises on 404
            path.write_bytes(r.read())
        log.info(f"downloaded {name} ({code})")
    return path.read_bytes()


def print_pdf(svgs, w, h, pdf):
    """One page per SVG, printed by headless Edge; fails if the page count is wrong."""
    imgs = "".join(f'<img src="data:image/svg+xml;base64,{base64.b64encode(s).decode("ascii")}">' for s in svgs)
    html = (f"<!doctype html><html><head><style>@page{{size:{w}px {h}px;margin:0}}html,body{{margin:0;padding:0}}"
            f"img{{display:block;width:{w}px;height:{h}px;break-after:page}}img:last-child{{break-after:auto}}</style>"
            f"</head><body>{imgs}</body></html>")
    with tempfile.TemporaryDirectory() as tmp:
        page = Path(tmp) / "art.html"
        page.write_text(html, encoding="utf-8")
        profile = Path(tempfile.gettempdir()) / "build_banner_edge_profile"
        started = time.time()
        subprocess.run([str(EDGE), "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                        f"--user-data-dir={profile}", f"--print-to-pdf={pdf}", page.as_uri()],
                       check=True, capture_output=True, timeout=180)
    if not pdf.exists() or pdf.stat().st_mtime < started - 1:
        raise RuntimeError(f"Edge did not write {pdf}")
    out = subprocess.run(["pdfinfo", str(pdf)], check=True, capture_output=True, text=True).stdout
    pages = int(next(l.split()[-1] for l in out.splitlines() if l.startswith("Pages:")))
    if pages != len(svgs):
        raise RuntimeError(f"{pdf.name}: {pages} pages, expected {len(svgs)}")


def main():
    t0 = time.time()
    CACHE.mkdir(parents=True, exist_ok=True)
    emoji = {name: fetch(name, code) for name, code in EMOJI.items()}
    print_pdf(list(emoji.values()), 360, 360, ART / "emoji.pdf")
    moods = {m: mascot_svg(m).encode("utf-8") for m in MOODS}
    for m, s in moods.items():  # kept for inspection and for reuse outside LaTeX
        (ART / f"mascot_{m}.svg").write_bytes(s)
    print_pdf(list(moods.values()), 420, 400, ART / "mascot.pdf")
    banner = HERE.parents[1] / "banner" / "out" / "v2_glazz" / "banner_1920x1080.svg"
    if not banner.exists():
        raise FileNotFoundError(f"{banner} is missing; run banner/build_banner.py first")
    print_pdf([banner.read_bytes()], 1920, 1080, ART / "title_banner.pdf")  # the deck's title slide
    index = ["% generated by build_art.py - do not edit"]
    index += [f"\\artpage{{emoji}}{{{n}}}{{{i}}}" for i, n in enumerate(emoji, 1)]
    index += [f"\\artpage{{mascot}}{{{m}}}{{{i}}}" for i, m in enumerate(moods, 1)]
    (ART / "art_index.tex").write_text("\n".join(index) + "\n", encoding="utf-8")
    log.info(f"{len(emoji)} emoji, {len(moods)} mascot moods; done in {time.time() - t0:.1f} s")


if __name__ == "__main__":
    main()
