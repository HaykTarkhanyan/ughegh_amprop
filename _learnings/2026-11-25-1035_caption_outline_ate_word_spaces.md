# A 10 px text outline plus a 1.06 zoom on the spoken word ate the space between caption words

**Symptom:** on the one-frame-per-second contact sheet of the pilot short, words next to the highlighted one ran
together: «Մի շտապիր» read as «Միշտապիր», also «Տեսնում ենք», «աղբանոցում են», «Հա, սովետական».

**Cause:** each word was an inline-block with `margin: 0 9px` (18 px gap). The outline
(`-webkit-text-stroke: 10px` with `paint-order: stroke fill`) grows every glyph by 5 px on each side, and the
current word was scaled to 1.06 (a 300 px word grows 9 px per side). 18 - 5 - 5 - 9 leaves almost nothing.

**Fix:** `margin: 0 16px` and a 1.04 zoom, in both builds. Rule of thumb: word gap >= outline width + the zoom's
growth on the longest word + ~10 px.

**How it was found:** not by any check. HyperFrames' layout audit passed, because the boxes do not overlap. It took
looking at frames (`03_shorts/tools/contact_sheet.py`).
