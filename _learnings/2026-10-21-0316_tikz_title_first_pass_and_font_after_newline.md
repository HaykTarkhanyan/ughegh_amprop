# TikZ title slide: wrong on the first pass, and a font switch dies at `\\`

Two separate traps hit while testing `\webinartitle` (`slides/prototypes/title_test.tex`) on 2026-10-21.

**1. `[remember picture, overlay]` frames are misplaced on a first pass**

**Symptom:** after one LuaLaTeX pass, the title slide's chapter line sat at the top edge and the title, chips and popup were drawn above the page; only the snake emoji was on the slide.
**Cause:** `current page` coordinates come from positions saved in the `.aux` by the previous pass. With no `.aux` (or after frames using `remember picture` were added or removed before this one), they are wrong.
**Evidence:** the same file, unchanged, built a second time came out right.
**Consequences:** judge title slides, openers, `\source` lines, the break and Questions frames only after a second pass. `build_deck.py` got `--passes 2` for this.

**2. A font switch inside a TikZ node's text is lost after `\\`**

**Symptom:** `\node[align=left] {\titlefont\fontsize{46}{50}\selectfont Ապուշ\\ուղեղը};` set the first line in Glazz at 46 pt and the second in small Mardoto.
**Cause:** with `align=`, each `\\` line is set in its own group, so a font command in the text only covers the first line.
**Fix:** `\node[align=left, font=\titlefont\fontsize{46}{50}\selectfont] {Ապուշ\\ուղեղը};`
