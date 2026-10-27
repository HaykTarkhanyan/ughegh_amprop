"""Split The Idiot Brain PDF into one clean Markdown file per chapter, using bookmark page ranges.

Made the chapter files 00_introduction.md .. 09_afterword.md on 2026-10-14 (DECISIONS.md #1); needs pdftotext (poppler).
Usage: python 01_idiot_brain/archive/split_chapters.py 01_idiot_brain/pdfcoffee.com_the-idiot-brain-pdf-free.pdf <out_dir>
       (~6 s, measured 2026-10-27; logs to logs/split_chapters.log)
"""
import logging
import re
import subprocess
import sys
import time
from pathlib import Path

PDF = Path(sys.argv[1]) if len(sys.argv) > 1 else None
OUT = Path(sys.argv[2]) if len(sys.argv) > 2 else None
LOG_DIR = Path(__file__).resolve().parents[2] / "logs"
log = logging.getLogger("split_chapters")
# (first page, last page, chapter number or None, filename) - from the PDF bookmarks
CHAPTERS = [
    (8, 10, None, "00_introduction.md"),
    (11, 34, 1, "01_mind_controls.md"),
    (35, 68, 2, "02_the_gift_of_memory.md"),
    (69, 98, 3, "03_fear_nothing_to_be_scared_of.md"),
    (99, 130, 4, "04_think_youre_clever_do_you.md"),
    (131, 158, 5, "05_did_you_see_this_chapter_coming.md"),
    (159, 186, 6, "06_personality_a_testing_concept.md"),
    (187, 220, 7, "07_group_hug.md"),
    (221, 252, 8, "08_when_the_brain_breaks_down.md"),
    (253, 253, None, "09_afterword.md"),
]
TERMINAL = tuple(".?!…’”'\")")
MARKERS = "0123456789*†‡§¶"


def ends_sentence(p):
    return p.rstrip(MARKERS).endswith(TERMINAL)


def page_paragraphs(first, last, stats):
    txt = subprocess.run(["pdftotext", "-enc", "UTF-8", "-f", str(first), "-l", str(last), str(PDF), "-"],
                         capture_output=True, text=True, encoding="utf-8", check=True).stdout
    paras = []
    for page in txt.split("\f"):
        lines = [l.strip() for l in page.split("\n") if l.strip()]
        for i, l in enumerate(lines):
            if i == 0 and paras:
                prev = paras[-1]
                if prev.endswith("-") and l[:1].islower():
                    paras[-1] = prev[:-1] + l
                    stats["hyphen_joins"] += 1
                    continue
                heading_then_subtitle = len(prev) < 80 and l.startswith("(")
                if not ends_sentence(prev) and not prev.isdigit() and not heading_then_subtitle:
                    paras[-1] = prev + " " + l
                    stats["page_joins"] += 1
                    continue
            paras.append(l)
    return paras


def merge_wrapped_subtitles(paras):
    """A '(subtitle' that runs onto a second line ends with ')' on the next one."""
    out = []
    for p in paras:
        if out and out[-1].startswith("(") and not out[-1].endswith(")") and len(out[-1]) < 120 and p.endswith(")") and len(p) < 60:
            out[-1] += " " + p
        else:
            out.append(p)
    return out


def note_start(blob, n, pos):
    """Position of ' n ' that starts note n: strict shape first, else the single loose hit before note n+1."""
    m = re.compile(rf"(?<=[\.\)\d’”]) {n} (?=[A-Z‘“])").search(blob, pos)
    if m:
        return m.start()
    nxt = re.compile(rf"(?<=[\.\)\d’”]) {n + 1} (?=[A-Z‘“])").search(blob, pos)
    window = blob[pos:nxt.start() if nxt else len(blob)]
    loose = [pos + h.start() for h in re.finditer(rf"(?<=\S) {n} (?=\S)", window)]
    if len(loose) > 1:
        raise ValueError(f"note {n}: {len(loose)} ambiguous loose candidates")
    return loose[0] if loose else None


def split_notes(blob, name):
    """Notes arrive glued together; split on the note numbers 1, 2, 3 ... strictly in order."""
    assert blob.startswith("1 "), f"{name}: notes do not start with note 1"
    notes, pos, n = [], 0, 1
    while True:
        start = note_start(blob, n + 1, pos + 1)
        end = start if start is not None else len(blob)
        notes.append((n, blob[pos + len(str(n)) + 1:end].strip()))
        if start is None:
            return notes
        pos, n = start + 1, n + 1


def marker_re(n):
    # glued after punctuation ('harmless.22', '.’20)'), straight onto a word ('word13 ')
    # or after a symbol footnote ('.**36')
    return re.compile(rf"(?:(?<=[A-Za-z0-9\.\,\?\!\)’”'\x22][\.\,\?\!’”\):;])|(?<=[a-z]{{2}})|(?<=[\.\,’”][\*†‡])|(?<=[\*†‡]{{2}})){n}(?=[\s\*†‡\),;]|$)")


def link_markers(text, n_notes, name, missing):
    """Turn in-text note numbers glued to punctuation ('harmless.22') into [^22], strictly in order.

    A marker the PDF conversion dropped (its number appears nowhere before the next marker) is
    recorded in `missing`; a number that is present but does not match the pattern is an error.
    """
    out, pos = [], 0
    for n in range(1, n_notes + 1):
        m = marker_re(n).search(text, pos)
        if not m:
            nxt = marker_re(n + 1).search(text, pos) if n < n_notes else None
            seg = text[pos:nxt.start() if nxt else len(text)]
            if re.search(rf"(?<=[^\s\d]){n}(?!\d)", seg):  # glued to something, yet unmatched
                raise ValueError(f"{name}: in-text marker {n} of {n_notes} present but unmatched")
            missing.append(f"{name} note {n}")
            continue
        out.append(text[pos:m.start()] + f"[^{n}]")
        pos = m.end()
    out.append(text[pos:])
    return "".join(out)


def to_markdown(paras, num, name, missing):
    md = []
    if num:
        # chapter opener: number (sometimes printed on the previous chapter's last page), title, subtitle
        if paras[0].isdigit():
            assert int(paras[0]) == num, paras[0]
            paras = paras[1:]
        md += [f"# Chapter {num}: {paras[0]}", "", f"*{paras[1]}*", ""]
        paras = paras[2:]
    else:
        md += [f"# {paras[0]}", ""]
        paras = paras[1:]
    notes = []
    if "Notes" in paras:
        k = paras.index("Notes")
        notes = split_notes(" ".join(paras[k + 1:]), name)
        paras = paras[:k]
    i = 0
    while i < len(paras):
        p, nxt = paras[i], paras[i + 1] if i + 1 < len(paras) else ""
        if len(p) < 80 and nxt.startswith("(") and nxt.endswith(")") and len(nxt) < 140:
            md += [f"## {p}", "", f"*{nxt}*", ""]
            i += 1
        elif p == "*":
            md += ["* * *", ""]
        else:
            md += [("\\" + p) if p.startswith("*") else p, ""]  # '*' footnote text, not a bullet
        i += 1
    body = "\n".join(md)
    if notes:
        body = link_markers(body, len(notes), name, missing)
        body += "\n## Notes\n\n" + "\n\n".join(f"[^{n}]: {t}" for n, t in notes) + "\n"
    return body.rstrip() + "\n", len(notes)


if __name__ == "__main__":
    LOG_DIR.mkdir(exist_ok=True)
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                        handlers=[logging.StreamHandler(),
                                  logging.FileHandler(LOG_DIR / "split_chapters.log", encoding="utf-8")])
    sys.excepthook = lambda *exc: log.error("failed", exc_info=exc)  # a failed check lands in the log file too
    t0 = time.time()
    stats = {"page_joins": 0, "hyphen_joins": 0}
    missing = []
    OUT.mkdir(exist_ok=True)
    for first, last, num, name in CHAPTERS:
        paras = merge_wrapped_subtitles(page_paragraphs(first, last, stats))
        if paras[-1].isdigit():  # next chapter's number, printed at the bottom of this chapter's last page
            log.info(f"  dropped trailing chapter number {paras[-1]!r} from {name}")
            paras = paras[:-1]
        text, n_notes = to_markdown(paras, num, name, missing)
        (OUT / name).write_text(text, encoding="utf-8")
        heads = sum(1 for l in text.split("\n") if l.startswith("## ") and l != "## Notes")
        log.info(f"{name}: {len(text.split()):>6} words, {heads} sections, {n_notes} notes")
    log.info(stats)
    log.info(f"note markers absent from the PDF text ({len(missing)}): {missing}")
    log.info(f"done in {time.time() - t0:.1f} s")
