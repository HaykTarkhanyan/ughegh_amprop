# PyMuPDF can return one "line" per word on widely spaced justified lines

**Symptom**
The first run of `02_power_of_habit/archive/split_power_of_habit.py` turned single words into their own paragraphs. Its review list (lines that start right of the paragraph indent) was full of entries like these, all from ordinary body text:

```
02_the_craving_brain.md p70: x0=152 line: 'the'
02_the_craving_brain.md p70: x0=190 line: 'reward—craving'
02_the_craving_brain.md p70: x0=314 line: 'the'
04_keystone_habits.md p123: x0=206 line: 'mathematicians,'
```

76 such entries on 12 pages; the other 4 of the 80 were real hanging-indent lines in the appendix.

**Cause**
In `page.get_text("dict")`, a justified line whose words are spread far apart (a short line stretched to full width) comes back as several `lines`, one per word, each with its own `bbox`. The per-line rule "x0 right of the indent starts a new paragraph" then fires for every word but the first. `pdftotext` reads the same pages fine, so a letter-count check against it does not catch this: the letters are all there, only the paragraph breaks are wrong.

**Fix**
Merge every text line whose vertical centre falls inside the current row's `y0..y1` into that row before classifying anything, sort the pieces by x, and put a space between them (but not before a superscript footnote marker). In this book that merged 408 pieces, and the review list dropped from 80 entries to the 4 real layout cases (hanging indents in the appendix). See `page_rows()` in the script.

**Consequences**
Any PyMuPDF-based extraction that decides paragraphs or headings from a line's x position should group lines into rows first. Check it by listing lines that start at an unusual x: real cases are rare, so a long list means the lines are split.
