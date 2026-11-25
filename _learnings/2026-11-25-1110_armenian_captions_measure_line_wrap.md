# Caption pages by word count wrapped to 3-5 lines in Armenian; simulate the wrap with the real font

**Symptom:** after a merge rule joined two short pages, «Փչացած սառնարանները վաղուց աղբանոցում են։» (5 words) wrapped
to five lines in the 640 px caption box at 68 px, so the caption grew ~400 px upward and covered the fridge grid
(Gemini review v2 flagged "grid overlaps captions" at 0:10; a still at 10.6 s confirmed it). Even 3-word pages
like «պատերազմում ամերիկացիները նայում էին» took 3 lines.

**Cause:** Armenian words are long. At 68 px weight 800, «սառնարանները» alone is ~600 px wide, so a word count says
nothing about how many lines a page takes.

**What did not work:** strictly one line (break when the next word does not fit in 600 px) split most pages into
single words: 88 pages, several on screen for 0.11-0.3 s, unreadable.

**Fix (`03_shorts/tools/build_timeline.py`):** measure each word with Pillow (`ImageFont.truetype` of
Noto Sans Armenian, `set_variation_by_axes([800, 100])`, `getlength`), simulate the browser's greedy wrap
(word width + 32 px margin per inline-block word, 640 px box), and allow at most 2 lines. Each page gets a `size`:
68 px, or 2 px steps smaller (not under 48) until it fits in 2 lines. The renderers use `page.size`. Pilot: 57 pages,
all 1-2 lines, 6 pages at 52-66 px. Two lines end at y ~1040, so every picture is kept above that.

**Consequences:** the caption band is predictable (y ~1040-1200), so scene layouts can be checked against a fixed
line. Keep the measuring font and the renderers' CSS (font, weight, margin, box width) in sync; a change in one
needs the same change in `build_timeline.py` constants.
