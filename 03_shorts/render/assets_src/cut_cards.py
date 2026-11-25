"""Cut the 52 cards out of the full-deck thumbnail (Dmitry Fomin's English pattern deck, CC0, Wikimedia Commons).

Commons blocks bulk downloads of original files (HTTP 429, "use thumbnail images"), so the deck comes as one 3840 px
thumbnail (render/assets_src/deck_3840.png): 4 rows (spades, hearts, diamonds, clubs) x 13 columns (A..K) on green.
The green between and around the cards becomes transparent.

Usage (from 03_shorts/render/):  python assets_src/cut_cards.py
Runtime: about 2 s. Writes public/cards/<suit><rank>.png (s/h/d/c + A,2..10,J,Q,K).
"""
import logging
import sys
from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout), logging.FileHandler(ROOT / "logs" / "cut_cards.log", encoding="utf-8")])
log = logging.getLogger("cut_cards")

ROWS = ["s", "h", "d", "c"]
RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]


def runs(mask: np.ndarray, min_len: int) -> list[tuple[int, int]]:
    """Start/end index of each run of True at least min_len long."""
    out, start = [], None
    for i, v in enumerate(list(mask) + [False]):
        if v and start is None:
            start = i
        elif not v and start is not None:
            if i - start >= min_len:
                out.append((start, i))
            start = None
    return out


def main():
    im = Image.open(HERE / "deck_3840.png").convert("RGBA")
    a = np.asarray(im).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    green = (g > r + 40) & (g > b + 40)  # the table colour, not card art (card art has no such pure greens)
    card = ~green
    cols = runs(card.mean(axis=0) > 0.5, 100)
    rows = runs(card.mean(axis=1) > 0.5, 150)
    if len(cols) != 13 or len(rows) != 4:
        raise SystemExit(f"expected 13 x 4 cards, found {len(cols)} x {len(rows)}")
    out = HERE.parent / "public" / "cards"
    out.mkdir(parents=True, exist_ok=True)
    for ri, (y0, y1) in enumerate(rows):
        for ci, (x0, x1) in enumerate(cols):
            pad = 2
            crop = a[y0 - pad:y1 + pad, x0 - pad:x1 + pad].copy()
            cg = crop[..., 1] - np.maximum(crop[..., 0], crop[..., 2])
            # alpha: pure table green -> 0, card -> 255, soft edge in between
            alpha = np.clip(255 - (cg - 10) * 6, 0, 255)
            crop[..., 3] = np.minimum(crop[..., 3], alpha)
            Image.fromarray(crop.astype(np.uint8), "RGBA").save(out / f"{ROWS[ri]}{RANKS[ci]}.png", optimize=True)
    w, h = cols[0][1] - cols[0][0], rows[0][1] - rows[0][0]
    log.info("wrote 52 cards of about %d x %d px to %s", w, h, out)


if __name__ == "__main__":
    main()
