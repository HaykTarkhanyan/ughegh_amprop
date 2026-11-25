"""Spell numbers the way the Armenian narration says them, for length estimates and caption timing.

The scripts write numbers as digits («1983», «350», «92», «3,6»), but the voice reads them as words («հազար ինը
հարյուր ութսուներեք»), which takes much longer than four characters suggest: on 2026-11-25 two digit-heavy beats
ran 21-22% longer than the 870-characters-a-minute estimate (Fable review, then measured). `spoken(text)` returns
the text with every number spelled out; use its length for timing. Integers up to 999,999,999 and decimals with a
comma («3,6» -> «երեք ամբողջ վեց»). Ordinal endings and «-ը»/«-ին» suffixes after a digit stay as they are.

Usage:  python tools/hy_numbers.py "1983 թվականին 160 գինեկոլոգ"   (prints the spoken form)
Runtime: instant. Standard library only.
"""
import re
import sys

UNITS = ["զրո", "մեկ", "երկու", "երեք", "չորս", "հինգ", "վեց", "յոթ", "ութ", "ինը"]
TEENS = ["տասը", "տասնմեկ", "տասներկու", "տասներեք", "տասնչորս", "տասնհինգ", "տասնվեց", "տասնյոթ", "տասնութ",
         "տասնինը"]
TENS = ["", "", "քսան", "երեսուն", "քառասուն", "հիսուն", "վաթսուն", "յոթանասուն", "ութսուն", "իննսուն"]


def _below_1000(n):
    parts = []
    h, rest = divmod(n, 100)
    if h:
        parts.append("հարյուր" if h == 1 else f"{UNITS[h]} հարյուր")
    if rest >= 20:
        t, u = divmod(rest, 10)
        parts.append(TENS[t] + (UNITS[u] if u else ""))
    elif rest >= 10:
        parts.append(TEENS[rest - 10])
    elif rest:
        parts.append(UNITS[rest])
    return " ".join(parts)


def spell(n):
    """Armenian words for a non-negative integer below one billion."""
    if n == 0:
        return UNITS[0]
    if n >= 10**9:
        raise ValueError(f"{n} is too large to spell")
    parts = []
    millions, rest = divmod(n, 10**6)
    thousands, rest = divmod(rest, 1000)
    if millions:
        parts.append(f"{_below_1000(millions)} միլիոն")
    if thousands:
        parts.append("հազար" if thousands == 1 else f"{_below_1000(thousands)} հազար")
    if rest:
        parts.append(_below_1000(rest))
    return " ".join(parts)


NUMBER = re.compile(r"(?<![\w])(\d{1,3}(?:[  ]\d{3})+|\d+)(?:,(\d+))?")


def spoken(text):
    """The text with digits replaced by the words the narrator says."""
    def repl(m):
        whole = int(re.sub(r"[  ]", "", m.group(1)))
        out = spell(whole)
        if m.group(2):
            out += " ամբողջ " + spell(int(m.group(2)))
        return out
    return NUMBER.sub(repl, text)


if __name__ == "__main__":
    for arg in sys.argv[1:]:
        print(spoken(arg))
