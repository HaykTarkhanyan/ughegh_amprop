# archive

One-off scripts kept as a record. Nothing here is needed to build the slides or banners.

| Script | What it does | When you would re-run it |
|---|---|---|
| `split_chapters.py` | Split the book PDF into the chapter files `00_introduction.md` .. `09_afterword.md`: bookmark page ranges, paragraphs rejoined across page breaks, note markers turned into `[^n]` (DECISIONS.md #1). ~6 s. | Only to redo the texts, or as a starting point for another book with numbered chapter-end notes. |

Added 2026-10-27: the script ran on 2026-10-14 from a session scratchpad and was never committed. It was found again while doing the same job for The Power of Habit, moved here, switched to `logging`, and checked: its output is byte-identical to the committed chapter files.
