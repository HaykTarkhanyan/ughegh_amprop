# Decisions

Newest at the top.

## 7. Webinar 1 deck: 90 min, all 9 book sections, alcohol kept, notes in a separate file

- **Date / status:** 2026-10-14, active
- **Decision:** `slides/webinar01/` covers the introduction and every section of chapters 1-2 in ~80 frames (14 of them openers or plain frames) with a 5 min break; the alcohol section is presented as in the book; Armenian speaker notes live in `slides/webinar01/NOTES.md`, keyed by frame number and title.
- **Why:** Hayk's answers in the interview: ~90 min talk, keep the alcohol section as the book has it, notes as a separate file, title slide matching banner v2. Interactive moments (Zoom hand raises, chat prompts, a DRM false-memory word test shown at the start of Part 2 and revealed ~20 min later) keep a high-school audience involved over 90 min. Numbers not in the book were checked before use (Loftus & Palmer 1974, Sharpless & Barber 2011, Patient HM's dates, the 2021 failed replication of the divers study, Cassiopea jellyfish sleep 2017); every place the slides differ from the book is listed at the end of NOTES.md.
- **Alternatives rejected:** 60 min / ~35 slides (Hayk chose 90); reframing or skipping the alcohol section (Hayk chose to keep it); Beamer `\note` pages (need pdfpc or a second screen while sharing Zoom).
- **What would change this:** a rehearsal runs long (NOTES.md lists 7 frames to drop first), or the audience turns out younger than high school (revisit the alcohol section).

## 6. Slides use the banner's look, built with LuaLaTeX; art comes from one Python script

- **Date / status:** 2026-10-14, active
- **Decision:** `slides/common/preamble.tex` restyles plain Beamer to the banner identity (cream + dot grid, plum text, pastel accents, Mardoto for text, Glazz for big titles, Ink Free for speech bubbles); `slides/common/build_art.py` prints Twemoji icons, 9 mascot moods (same body as `banner/mascot.svg`) and the v2 banner (title slide) to vector PDFs with headless Edge, which LaTeX uses through `\emoji{name}` and `\mascot{mood}`.
- **Why:** The deck should look like the banner people saw. Edge print-to-PDF keeps everything vector (3.8 KB per emoji page, no rasters) and needs no new install; one multi-page PDF per set means one Edge start-up (each takes 20-80 s on this machine). `\tracinglostchars=3` makes a glyph missing from a font a build error; it already caught a `→` that Mardoto lacks. Unknown emoji or mood names are build errors too.
- **Alternatives rejected:** the earlier agent's draft (metropolis theme, Segoe UI, Armenian flag colours, a different TikZ mascot; kept as `slides/prototypes/preamble_metropolis_draft.tex`) because it no longer matched the banner; porting the mascot to TikZ (two sources of truth for its shape, line widths do not scale with `pic` scale); colour emoji fonts (LuaTeX does not render them reliably); raster PNG emoji (blurry when Zoom viewers zoom in).
- **What would change this:** builds become too slow to iterate (measured: ~20 s of every LuaLaTeX pass is the preamble, a full 3-pass build takes a few minutes), or Edge stops being available on the build machine.

## 5. Banner v2: Glazz title in plum; v1 kept next to it

- **Date / status:** 2026-10-14, active
- **Decision:** Add a second banner version with the title set in Glazz, plum letters with a plain mint offset shadow (`out/v2_glazz/`), and keep v1 (My Bubble Font, pink) unchanged in `out/v1_bubble/`; one script builds both (`VERSIONS` in `build_banner.py`).
- **Why:** Feedback on v1: "Էս բաններների վարդագույն տառերի, սենց փամփլիկ ֆոնտը մի քիչ "անհաջող ասոցիացիաներ" կարող է առաջացնել" (the pink, puffy title letters may invite unfortunate associations). v2 removes both parts: no pink in the title, and Glazz is angular block capitals instead of round bubbles. Glazz was the fallback named in #4 and on Hayk's shortlist. Layout, chips, window and mascot are untouched, so the two versions differ only in the title. A first try outlined the mint shadow in plum too; together with Glazz's built-in cut lines each letter looked doubled, so the shadow outline was dropped. Rebuilt v1 SVGs are byte-identical to the stored ones (`cmp`), because each SVG embeds only its own title font.
- **Alternatives rejected:** recolouring the Bubble title only (the round shape is half of the complaint); Amar (its outline looked busy in the #4 comparison); Mardoto Black (clean and very readable, but plain; next fallback).
- **What would change this:** v2 draws comments too (add a Mardoto Black entry to `VERSIONS`), or the pink window bar and mascot get the same complaint (switch the bar to lavender).

## 4. Webinar banner: code-built SVG, rendered with headless Edge

- **Date / status:** 2026-10-14, revisited 2026-10-14 (title font, see #5)
- **Decision:** Build the banner as SVG from `02_idiot_brain/banner/build_banner.py` (concept "Brain.exe is not responding", cute original brain mascot in `mascot.svg`, warm pastel palette, title «Ապուշ ուղեղը»), rendered to PNG by headless Edge in two sizes: 1920x1080 (post / YouTube) and 1600x640 (Discord event cover, which Discord crops to 2.5:1).
- **Why:** Hayk chose the code-only route first, and the concept, mascot style, palette and title in an interview. Fonts come from fonter.am (Hayk's pick): My Bubble Font for the title (107 glyphs, Armenian only, so the script fails loudly if text uses a missing glyph) and Mardoto for everything else. Emoji are Twemoji 15.1.0 SVGs so they look the same everywhere. Edge is already installed, so no Inkscape or Chromium download is needed; one build takes ~7 s.
- **Title font:** 17 fonter.am fonts were rendered side by side in the sticker style; Hayk shortlisted My Bubble Font, Glazz and Amar, saw full banners in all three, and kept My Bubble Font for its charm even though Glazz reads more easily at thumbnail size. TUFF and Reactive were out (no Armenian lowercase).
- **Event details on the banner:** Friday 23 October 2026, 18:30 (Yerevan time, not labelled; the audience is local), Zoom.
- **Alternatives rejected:** AI-generated art (kept as a later option for a richer background; image models garble Armenian text); Google Fonts' Google Sans / Handjet (fonter.am has more characterful Armenian fonts); 📅 emoji (Twemoji's shows a fixed date, "JUL 17").
- **What would change this:** people misread the title in the feed (switch `TITLE_FONT` to Glazz, a one-line change), or a richer illustrated look is wanted (add an AI background layer).

## 3. Webinar materials are in Armenian; webinar 1 = intro + chapters 1-2

- **Date / status:** 2026-10-14, active
- **Decision:** All webinar material (slides, banner) is written in Armenian. The first webinar covers the introduction, chapter 1 (Mind controls) and chapter 2 (memory).
- **Why:** Hayk's call: the audience is Armenian high school students.
- **Alternatives rejected:** English draft first, translate later (#2) - extra pass with no benefit now that the language is known.
- **What would change this:** a mixed or non-Armenian audience for a later session.

## 2. Idiot Brain slides: Beamer + LuaLaTeX, English draft first

- **Date / status:** 2026-10-14, superseded by #3 for the language (the LuaLaTeX + Armenian-capable font setup still holds)
- **Decision:** Draft the webinar decks in English with LuaLaTeX + fontspec and a main font that also has Armenian glyphs, sharing one preamble in `02_idiot_brain/slides/common/`.
- **Why:** Hayk asked for Beamer source, not PowerPoint. The webinar may be held in Armenian; LuaLaTeX + an Armenian-capable font makes a later translation a text swap instead of a setup change. English first because the book is English and drafts are easier to check against it.
- **Alternatives rejected:** pdfLaTeX (no practical Armenian font support); drafting straight in Armenian (harder to check accuracy against the source before the content settles).
- **What would change this:** Hayk confirms the webinar language. If Armenian, translate the drafts rather than redesigning.

## 1. Book text stored as one Markdown file per chapter

- **Date / status:** 2026-10-14, active
- **Decision:** Extract The Idiot Brain into `02_idiot_brain/NN_<slug>.md`, one file per chapter (intro = 00, afterword = 09), flat, text only.
- **Why:** Hayk wants LLM-readable chapter texts without the notes/llm split used for The Power of Habit. Chapter page ranges come from the PDF bookmarks, which is exact. Footnote markers glued to words ("harmless.22") are converted to Markdown footnotes `[^22]` with definitions under `## Notes`, so a model does not read them as numbers. Paragraphs split by page breaks are rejoined (176 joins). Check: letter-word count of output vs raw PDF text differs by exactly +7 (8 added "Chapter" words, 1 rejoined hyphenated word).
- **Known gaps:** 9 of 274 in-text note markers are absent from the PDF text itself (ch1 n4, ch2 n40, ch3 n14-15, ch5 n1 and n13, ch7 n19, ch8 n13 and n21); those notes are kept in the Notes list but are not linked.
- **Alternatives rejected:** one big text file (worse for per-chapter prompting); per-chapter folders with notes/llm files (not wanted this time); dropping the notes (they hold the study references the slides need).
- **Left out:** front matter, acknowledgements, index, about the author, copyright page.
- **What would change this:** a cleaner source (EPUB) turns up, or the notes turn out to be useless for the slides.
