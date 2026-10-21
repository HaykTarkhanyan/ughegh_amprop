# prototypes

Experiments and drafts for the slide decks. Nothing here is needed to build a deck.

| File | What it is | When you would use it |
|---|---|---|
| `style_test.tex` | 8-page check of the shared preamble's building blocks (title banner, part and topic openers, boxes, popup, myth or fact, big question). Moved here from `webinar01/` on 2026-10-14. | After changing `common/preamble.tex`: builds much faster than a full deck (`latexmk -lualatex -outdir=build style_test.tex`) |
| `title_test.tex` | Webinar 2's title slide drawn with `\webinartitle`, plus the sad and angry mascot moods. Added 2026-10-21. | After changing `\webinartitle`: `python 02_idiot_brain/slides/common/build_deck.py prototypes --tex title_test.tex --passes 2` (~30 s) |
| `preamble_metropolis_draft.tex` | The first shared preamble, written by the paused design agent on 2026-10-14: metropolis theme, Segoe UI, Armenian flag colours, a TikZ mascot ("Noggin"). Replaced on 2026-10-14 by `common/preamble.tex`, which matches the banner (DECISIONS.md #6). | Only as a record, or to borrow a piece |
| `brainmascot.sty`, `mascot_sheet.tex` | Another TikZ mascot drawn by the same agent, with a model sheet of moods | Only as a record; the decks use the banner mascot via `common/build_art.py` |
| `fonts/` | Noto Sans (+ Armenian) used by `mascot_sheet.tex` | With `mascot_sheet.tex` |
| `images/` | Images the agent found for later chapters (Fuseli's Nightmare, the Viking "face on Mars", a phrenology chart) | When drafting chapters 3-4 |
