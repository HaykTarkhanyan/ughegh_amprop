"""Split The Power of Habit PDF (calibre build, 422 pages) into one Markdown file per section.

Made the section files 00_prologue.md .. 11_appendix.md and figures/ on 2026-10-27 (DECISIONS.md #14); needs
PyMuPDF and pdftotext (poppler).
Usage: python 02_power_of_habit/archive/split_power_of_habit.py "02_power_of_habit/The Power of Habit -- ....pdf" <out_dir>
       (~10-20 s, most of it rendering the 45 figures; logs to logs/split_power_of_habit.log)

Layout facts this relies on (from a font survey of the PDF):
- body text Georgia 15; a paragraph starts with an indented line (x0 = 87), continuation lines sit at x0 = 72,
  also across page breaks, so no sentence-end guessing is needed
- chapter title LiberationSans 17.2, subtitle LiberationSans 15, section numerals (I., II.) LiberationSans 21,
  section break "●●●", figure captions Arial 11.2, appendix steps LiberationSans 15, run-in labels Arial 15
- author footnotes: superscript "*1" / "*" in the text, collected at the chapter end (marker Georgia 9, text Georgia 11.2)
- endnotes (pages 328-416): grouped under PROLOGUE / CHAPTER ONE ...; each starts with a bold key phrase quoted
  from the text, which is how they are linked back as [^n]

Checks: for every section, the letters-only text (case-folded) must equal pdftotext's for the same pages, and the
same for all endnotes together; unlinked or loosely linked notes are listed for a look.
"""
import logging
import re
import subprocess
import sys
import time
from collections import Counter
from pathlib import Path

import fitz

LOG_DIR = Path(__file__).resolve().parents[2] / "logs"
log = logging.getLogger("split_power_of_habit")

# (first page, last page, chapter number or None, title as in the contents, file) - pages from the PDF bookmarks
SECTIONS = [
    (8, 16, None, "Prologue", "00_prologue.md"),
    (19, 47, 1, "The Habit Loop", "01_the_habit_loop.md"),
    (48, 79, 2, "The Craving Brain", "02_the_craving_brain.md"),
    (80, 115, 3, "The Golden Rule of Habit Change", "03_the_golden_rule_of_habit_change.md"),
    (118, 146, 4, "Keystone Habits, or The Ballad of Paul O’Neill", "04_keystone_habits.md"),
    (147, 174, 5, "Starbucks and the Habit of Success", "05_starbucks_and_the_habit_of_success.md"),
    (175, 203, 6, "The Power of a Crisis", "06_the_power_of_a_crisis.md"),
    (204, 235, 7, "How Target Knows What You Want Before You Do", "07_how_target_knows_what_you_want.md"),
    (238, 268, 8, "Saddleback Church and the Montgomery Bus Boycott",
     "08_saddleback_church_and_the_montgomery_bus_boycott.md"),
    (269, 298, 9, "The Neurology of Free Will", "09_the_neurology_of_free_will.md"),
    (300, 309, None, "Afterword", "10_afterword.md"),
    (310, 322, None, "Appendix", "11_appendix.md"),
]
NOTES_PAGES = (328, 416)
NOTE_HEADINGS = ["PROLOGUE"] + [f"CHAPTER {w}" for w in
                                "ONE TWO THREE FOUR FIVE SIX SEVEN EIGHT NINE".split()]  # same order as SECTIONS
INDENT_X = 84  # a body line starting right of this opens a new paragraph (indent at 87, flush text at 72)
# URLs in the notes that the PDF spreads out with spaces; each is matched with optional whitespace between characters
URLS = [
    "http://psychiatry.ucsd.edu/faculty/lsquire.html",
    "http://www.gredeg.cnrs.fr/routines/workshop/papers/Hodgson.pdf",
    "http://www.epa.gov/history/",
    "http://www.cfar.com/Documents/Smal_win.pdf",
    "http://www.infoplease.com/ipa/A0779935.html",
    "http://www.nwcr.ws/Research/published%20research.htm",
    "http://www3.aaos.org/member/safety/guidelines.cfm",
    "http://law.jrank.org/pages/18652/Homicide.html",
    "http://www2.gsu.edu/~psyjge/Rsrc/PG_IPV_Veterans.pdf",
]
TRAILING = "?!.,;:’”) "  # a note marker goes after these when they follow the key phrase

stats = Counter()
review = []  # worth a human look: unlinked or loosely linked notes, paragraphs restarting flush after a figure


def norm_spaces(s):
    return re.sub(r" {2,}", " ", s.replace("\xa0", " ").replace("​", "")).strip()


def join(prev, line):
    """Join a wrapped line; the book is a reflowed ebook, so a line-final hyphen or dash is a real one."""
    if prev.endswith(("-", "—", "–", "/")):
        return prev + line
    return prev + " " + line


def md_escape(p):
    """Keep a paragraph from turning into a list, heading or quote."""
    return "\\" + p if re.match(r"[#*+>-]|\d+\.\s", p) else p


def page_rows(page):
    """Images and text rows in reading order, as (kind, bbox, x0, spans).

    PyMuPDF splits some widely spaced justified lines into one 'line' per word; a piece whose vertical centre
    falls inside the current row is merged back into it.
    """
    items = []
    for b in page.get_text("dict")["blocks"]:
        if b["type"] == 1:
            items.append(("img", b["bbox"], None))
        else:
            items += [("line", l["bbox"], l["spans"]) for l in b["lines"]]
    items.sort(key=lambda it: (round(it[1][1]), it[1][0]))
    rows = []
    for kind, bbox, spans in items:
        prev = rows[-1] if rows else None
        if (kind == "line" and prev and prev["kind"] == "line"
                and prev["y0"] - 1 <= (bbox[1] + bbox[3]) / 2 <= prev["y1"] + 1):
            prev["pieces"].append((bbox[0], spans))
            prev["y1"] = max(prev["y1"], bbox[3])
        else:
            rows.append({"kind": kind, "bbox": bbox, "y0": bbox[1], "y1": bbox[3], "pieces": [(bbox[0], spans)]})
    out = []
    for r in rows:
        if r["kind"] == "img":
            out.append(("img", r["bbox"], None, None))
            continue
        pieces = sorted(r["pieces"], key=lambda p: p[0])
        spans = []
        for i, (_, sp) in enumerate(pieces):
            if i and not (sp and sp[0]["flags"] & 1):  # a space between pieces, none before a superscript marker
                spans.append({"text": " ", "font": sp[0]["font"], "size": sp[0]["size"], "flags": 0})
            spans += sp
        out.append(("line", None, round(pieces[0][0]), spans))
    return out


def dominant_font(spans):
    chars = Counter()
    for s in spans:
        chars[(s["font"].split("-")[0], round(s["size"], 1))] += len(s["text"])
    return chars.most_common(1)[0][0]


def body_text(spans, name, counter):
    """Line text with superscript footnote markers turned into [^fnK], numbered in order of appearance."""
    parts = []
    for s in spans:
        if s["flags"] & 1:
            assert re.fullmatch(r"\*\d*", s["text"].strip()), f"{name}: superscript {s['text']!r}"
            counter[0] += 1
            parts.append(f"[^fn{counter[0]}]")
        else:
            parts.append(s["text"])
    return norm_spaces("".join(parts))


def parse_section(doc, first, last, name, fig_dir):
    """Return a list of elements [kind, payload, extra]."""
    els, fn_markers, in_footnotes = [], [0], False
    for pno in range(first, last + 1):
        page = doc[pno - 1]
        if not page.get_text().strip():
            continue  # chapter-number and part pages: images only
        n_img = 0
        for kind, bbox, x0, all_spans in page_rows(page):
            if kind == "img":
                n_img += 1
                path = fig_dir / f"p{pno:03d}_{n_img}.png"
                page.get_pixmap(clip=fitz.Rect(bbox), dpi=200).save(path)
                els.append(["fig", path.name, None])
                continue
            spans = [s for s in all_spans if s["text"].strip()]
            if not spans:
                continue
            font, size = dominant_font(spans)
            text = norm_spaces("".join(s["text"] for s in all_spans))
            last = els[-1] if els else [None, None, None]
            if font == "LiberationSans" and size == 17.2:
                if last[0] == "title":
                    last[1] += " " + text
                else:
                    els.append(["title", text, None])
            elif font == "LiberationSans" and size == 15.0:
                if last[0] == "subtitle":
                    last[1] += " " + text
                else:
                    els.append(["subtitle" if last[0] == "title" else "h2", text, None])
            elif font == "LiberationSans" and size == 21.0:
                els.append(["h2", text, None])
            elif font == "ArialMT" and size == 15.0:
                els.append(["h3", text, None])
            elif font in ("ArialMT", "Arial") and size == 11.2:
                if last[0] == "cap":
                    last[1] += " " + text
                else:
                    els.append(["cap", text, None])
            elif text == "●●●":
                els.append(["break", None, None])
            elif spans[0]["font"] == "Georgia" and round(spans[0]["size"], 1) == 9.0:
                in_footnotes = True
                m = re.match(r"\*\d*\s*", text)
                assert m, f"{name} p{pno}: footnote line without its marker: {text!r}"
                els.append(["fn", [text[m.end():]], None])
            elif in_footnotes:
                assert (font, size) == ("Georgia", 11.2), f"{name} p{pno}: body text after the footnotes: {text!r}"
                paras = last[1]
                if x0 >= 88:
                    paras.append(text)
                else:
                    paras[-1] = join(paras[-1], text)
            elif (font, size) == ("Georgia", 15.0):
                text = body_text(all_spans, name, fn_markers)
                if text.startswith("•"):
                    els.append(["li", text.lstrip("• "), x0])
                elif last[0] == "li" and x0 > last[2]:
                    last[1] = join(last[1], text)
                elif last[0] == "p" and (x0 < INDENT_X or (last[2] >= INDENT_X and x0 > last[2] + 20)):
                    # flush continuation, or a wrapped line set well right of its paragraph's start: the
                    # hanging indent of the appendix's question lists (87 -> 117), a centred line's tail (101 -> 277)
                    last[1] = join(last[1], text)
                else:
                    if x0 < INDENT_X and last[0] in ("fig", "cap"):
                        review.append(f"{name} p{pno}: paragraph restarts flush after a figure: {text[:60]!r}")
                    els.append(["p", text, x0])
            else:
                raise ValueError(f"{name} p{pno}: unclassified line {font} {size}: {text!r}")
    n_fn = sum(1 for e in els if e[0] == "fn")
    assert fn_markers[0] == n_fn, f"{name}: {fn_markers[0]} footnote markers in the text, {n_fn} footnotes"
    return els


def render(els, num, title, name):
    head = [e for e in els if e[0] in ("title", "subtitle")]
    assert head[0][1].upper() == title.upper(), f"{name}: PDF title {head[0][1]!r}"
    assert len(head) == 2 and head[1][0] == "subtitle", f"{name}: expected title + subtitle, got {head}"
    md = [f"# Chapter {num}: {title}" if num else f"# {title}", "", f"*{head[1][1]}*", ""]
    footnotes = []
    for kind, payload, _ in els:
        if kind == "h2":
            md += [f"## {payload}", ""]
        elif kind == "h3":
            md += [f"### {payload}", ""]
        elif kind == "break":
            md += ["* * *", ""]
        elif kind == "fig":
            md += [f"![Figure](figures/{payload})", ""]
        elif kind == "cap":
            md += [f"*{payload}*", ""]
        elif kind == "li":
            if len(md) > 1 and md[-1] == "" and md[-2].startswith("- "):
                md.pop()  # consecutive bullets form one list
            md += [f"- {payload}", ""]
        elif kind == "p":
            md += [md_escape(payload), ""]
        elif kind == "fn":
            footnotes.append(payload)
    if footnotes:
        md += ["## Footnotes", ""]
        for k, paras in enumerate(footnotes, 1):
            md += [f"[^fn{k}]: " + "\n\n    ".join(paras), ""]
    return "\n".join(md)


def parse_notes(doc):
    """Endnotes as {heading: [(key phrase, text), ...]}. A note starts with a bold key that may wrap onto the next line."""
    notes, cur, prev_bold = {}, None, False
    is_bold = lambda s: "Bold" in s["font"]
    for pno in range(NOTES_PAGES[0], NOTES_PAGES[1] + 1):
        for kind, _, _, all_spans in page_rows(doc[pno - 1]):
            assert kind == "line", f"notes p{pno}: unexpected image"
            spans = [s for s in all_spans if s["text"].strip()]
            if not spans:
                continue
            text = norm_spaces("".join(s["text"] for s in all_spans))
            if spans[0]["font"] == "LiberationSans":
                cur, prev_bold = text, False
                notes[cur] = []
                continue
            if is_bold(spans[0]) and not prev_bold:
                notes[cur].append(([], []))
            key, body = notes[cur][-1]
            for s in all_spans:
                (key if is_bold(s) and not body else body).append(s["text"])
            ends_bold = is_bold(spans[-1])
            (key if ends_bold and not body else body).append(" ")
            prev_bold = ends_bold
    assert list(notes) == NOTE_HEADINGS, f"note headings: {list(notes)}"
    return {h: [(norm_spaces("".join(k)), fix_urls(norm_spaces("".join(v)))) for k, v in items]
            for h, items in notes.items()}


def fix_urls(text):
    for url in URLS:
        pat = r"\s*".join(re.escape(c) for c in url)
        text, n = re.subn(pat, url, text)
        stats["urls_fixed"] += n
    return text


TRANS = str.maketrans({"’": "'", "‘": "'", "“": '"', "”": '"', "—": "-", "–": "-", " ": " "})


def nrm(s):
    """Lower-case and unify quotes and dashes, keeping every character's position."""
    return "".join(c.lower() if len(c.lower()) == 1 else c for c in s.translate(TRANS))


def link_notes(text, notes, name):
    """Insert [^n] after each note's key phrase. Notes follow the text, so search forward from the last hit."""
    body_n = nrm(text)
    inserts, cursor = [], 0
    for n, (key, _) in enumerate(notes, 1):
        # keys are quoted from the text, but the text often has a comma inside the closing quote
        k = re.sub(r"\s+", " ", nrm(key)).strip(" .,;:!?\"'")
        words = k.split()
        tries = [(k, cursor, "in order"), (k, 0, "out of order")]
        if "…" in k:
            tries.append((k.split("…")[0].strip(" .,;:\"'"), cursor, "before ellipsis"))
        if len(words) > 3:  # the key differs from the text further on (a typo in the key, a dropped word)
            tries.append((" ".join(words[:3]), cursor, "first 3 words"))
        for sub, start, how in tries:
            pos = body_n.find(sub, start)
            if pos >= 0:
                break
        else:
            review.append(f"{name} note {n}: UNLINKED, key {key!r}")
            continue
        stats["notes linked " + how] += 1
        end = pos + len(sub)
        while end < len(text) and text[end] in TRAILING:
            end += 1
        inserts.append((end, n))
        if how != "in order":
            review.append(f"{name} note {n} linked {how}: key {key!r} -> {text[pos:end + 30]!r}")
        if how != "out of order":
            cursor = pos
    for end, n in sorted(inserts, reverse=True):
        text = text[:end] + f"[^{n}]" + text[end:]
    return text


def letters(s):
    return "".join(c for c in s.casefold() if c.isalpha())


def seq_check(label, got, want):
    """Order-sensitive check: the letters-only texts must be identical."""
    g, w = letters(got), letters(want)
    if g == w:
        log.info(f"  {label}: letter sequence identical ({len(g)} letters)")
        return
    i = next((j for j in range(min(len(g), len(w))) if g[j] != w[j]), min(len(g), len(w)))
    raise AssertionError(f"{label}: letters differ at {i} of {len(w)}: got ...{g[max(0, i - 40):i + 40]}... "
                         f"want ...{w[max(0, i - 40):i + 40]}...")


def pdftotext(pdf, first, last):
    return subprocess.run(["pdftotext", "-enc", "UTF-8", "-f", str(first), "-l", str(last), str(pdf), "-"],
                          capture_output=True, text=True, encoding="utf-8", check=True).stdout


def main(pdf, out):
    fig_dir = out / "figures"
    fig_dir.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf)
    endnotes = parse_notes(doc)
    note_files = dict(zip(NOTE_HEADINGS, [s[4] for s in SECTIONS]))
    by_file = {note_files[h]: v for h, v in endnotes.items()}
    for first, last, num, title, name in SECTIONS:
        els = parse_section(doc, first, last, name, fig_dir)
        text = render(els, num, title, name)
        notes = by_file.get(name, [])
        if notes:
            text = link_notes(text, notes, name).rstrip() + "\n\n## Notes\n\n" + "\n\n".join(
                f"[^{n}]: **{k}** {v}" for n, (k, v) in enumerate(notes, 1))
        text = text.rstrip() + "\n"
        (out / name).write_text(text, encoding="utf-8")

        body = text.split("\n## Notes\n")[0]
        body = re.sub(r"!\[Figure\]\([^)]*\)|\[\^(fn)?\d+\]", "", body)
        body = body.replace("## Footnotes", "").replace("# Chapter ", "# ", 1)
        count = Counter(e[0] for e in els)
        log.info(f"{name}: {len(body.split())} words, {count['h2']} headings, {len(notes)} notes, "
                 f"{count['fn']} footnotes, {count['fig']} figures")
        seq_check("body vs pdftotext", body, pdftotext(pdf, first, last))
    got_notes = "".join((out / note_files[h]).read_text(encoding="utf-8").split("\n## Notes\n")[1]
                        for h in NOTE_HEADINGS)
    raw = "\n".join(l for l in pdftotext(pdf, *NOTES_PAGES).split("\n") if l.strip() not in NOTE_HEADINGS)
    log.info(f"endnotes: {sum(len(v) for v in endnotes.values())}")
    seq_check("endnotes vs pdftotext", got_notes, raw)
    assert stats["urls_fixed"] == len(URLS), f"fixed {stats['urls_fixed']} of {len(URLS)} URLs"
    log.info(dict(stats))
    log.info(f"review ({len(review)}):")
    for r in review:
        log.info(f"   {r}")


if __name__ == "__main__":
    LOG_DIR.mkdir(exist_ok=True)
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                        handlers=[logging.StreamHandler(),
                                  logging.FileHandler(LOG_DIR / "split_power_of_habit.log", encoding="utf-8")])
    sys.excepthook = lambda *exc: log.error("failed", exc_info=exc)  # a failed check lands in the log file too
    t0 = time.time()
    main(Path(sys.argv[1]), Path(sys.argv[2]))
    log.info(f"done in {time.time() - t0:.1f} s")
