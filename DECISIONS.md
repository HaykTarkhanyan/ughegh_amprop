# Decisions

Newest at the top.

## 19. Short videos (Shorts, Reels, TikTok): Armenian, code-drawn animation + real photos, made in session, uploaded by hand

- **Date / status:** 2026-11-25, active (tools review done; rendering framework still open)
- **Decision:** Short vertical videos on thinking errors (first: survivorship bias, Soviet fridges) are Armenian only, drawn by code (animation mixed with real photos that the code zooms, pans and highlights), made by Claude Code in session (topic in, script and scene code written, rendered, checked, Hayk reviews), and uploaded by hand. They get a new look, not the webinar branding. The tools review lives in `_knowledge/short_videos/lit_review.md`; production will go to `03_shorts/`.
- **Why:** Hayk's answers Q1-Q6 in the 2026-11-25 session, plus "when I say AI generated ... it will be programmatically made with help of AI ... It's not gonna be Gemini or something images". The Armenian voice already works in sample_problems_qysu (Gemini TTS, voice Sadaltager, ~$0.01 per 45 s), so the open choice is the renderer.
- **Alternatives rejected:** AI video or AI images (Hayk); stock footage under big captions (the generic faceless-channel look); a one-command pipeline from day one (more upfront work before knowing what a good short looks like); posting by API (YouTube and TikTok keep uploads from unaudited apps private, see the review section 10.3); Armenian + English versions; the webinar mascot and palette; a separate repo or the qysu repo.
- **What would change this:** after 3-5 shorts, freeze what worked into a one-command pipeline; automate posting once manual upload becomes the bottleneck; Q7 (Remotion / HyperFrames / Manim) gets its own entry when decided.

## 15. Book folders renumbered: `01_idiot_brain/`, `02_power_of_habit/`

- **Date / status:** 2026-10-27, active
- **Decision:** `02_idiot_brain/` is now `01_idiot_brain/` and `01_power_oh_habit/` is now `02_power_of_habit/` (also fixing the "oh" typo), with `git mv` so history follows. Live docs and code were updated (58 places: script docstrings, `.tex` header comments, `DECK_BRIEF.md`, `CONVENTIONS.md`, webinar 1 `NOTES.md`, and the Telegram frame's line «սլայդները՝ 01\_idiot\_brain/slides/pdf թղթապանակում» in `preamble.tex`). Session logs, `_learnings/` and entries #1-#14 keep the old paths as written at the time. Each book's text extractor is now kept in its `archive/` (both checked to reproduce the committed files byte for byte).
- **Why:** Hayk: "idiot brain is 01 and this should be 02". The scripts find their files from `Path(__file__)`, so nothing in a build depends on the folder name: after the rename the prototype deck built cleanly, and the webinar 2 banner PNGs came out byte-identical (the SVGs differ only in CRLF line endings, which git normalises: 0 changed lines).
- **Known side effect:** the committed slide PDFs, and the webinar 1 PDF people already have, still print `02_idiot_brain/slides/pdf` until each deck is rebuilt. The printed GitHub link goes to the repo root, so it still works.
- **Alternatives rejected:** keeping the numbers by reading order (The Power of Habit was read first, Dec 2025); rewriting old paths in the history files (they record what was true then).
- **What would change this:** more books arrive and a rule for the order is wanted (reading date, webinar order); until then the number is Hayk's call.

## 14. The Power of Habit re-extracted in the Idiot Brain format; Hayk's notes and the LLM notes dropped

- **Date / status:** 2026-10-27, active (applies #1's format to the first book)
- **Decision:** `01_power_oh_habit/` holds one Markdown file per section, flat: `00_prologue.md`, `01_the_habit_loop.md` ... `09_the_neurology_of_free_will.md`, `10_afterword.md`, `11_appendix.md`. Each has the chapter text, the author's footnotes as `[^fnN]` under `## Footnotes`, and the book's source notes linked into the text as `[^N]` under `## Notes`. The 45 in-chapter figures are PNGs in `figures/pNNN_K.png` (PDF page, image number), referenced with `![Figure](...)` where they sit. The per-chapter `*_notes.md` / `*_llm.md` files are deleted (Hayk: "ignore my notes and llm notes u can even delete").
- **Why:** Hayk asked for the texts to be extracted from scratch. The old `*_full_text.md` files were raw dumps with hard line breaks, no notes, and no prologue, afterword or appendix. The PDF is a calibre build, so structure comes from fonts and indents: a paragraph starts at x0 = 87, continuation lines sit at 72 (no sentence-end guessing, unlike #1). The endnotes are keyed by a bold phrase quoted from the text, not by numbers, so each one is linked where its phrase appears. Checks: for all 12 sections and all 285 notes, the letters-only text equals `pdftotext`'s for the same pages, character for character. 283 notes link in order, 1 by the text before an ellipsis in its key, and 1 by its first 3 words (the key has the book's typo "organcizational"); both loose links were checked by eye, as were 10 random ones (seed 509).
- **Kept as in the PDF:** line-final hyphens are real hyphens in this reflowed ebook ("self-pity", "co-opetition"; `pdftotext` drops them). Nine URLs in the notes that the PDF spreads out with spaces were rejoined from an explicit list, and zero-width spaces were removed. Some journal names in the notes still carry stray spaces from the PDF ("Ne uropsyc hopharmacology").
- **Left out:** title and copyright pages, contents, part pages (Part One = ch. 1-3, Part Two = ch. 4-7, Part Three = ch. 8-9), dedication, acknowledgments, "A Note on Sources", about the author. Italics are dropped (text only, as in #1).
- **Alternatives rejected:** keeping the old full texts (hard line breaks, missing sections); `pdftotext` with sentence-end heuristics as in #1 (the indent rule is exact here); dropping the figures (the text refers to them: "He'll follow the habit:" is followed by a diagram); dropping the notes (they hold the study references, as in #1).
- **What would change this:** a cleaner source (EPUB) turns up, or the figures turn out to be of no use (4.7 MB in the repo).

## 13. Telegram frame in every deck, unnumbered in webinars 2-8; webinar 2's title slide is its banner

- **Date / status:** 2026-10-26, active (extends #11)
- **Decision:** The Telegram/GitHub frame and the corner QR on the Questions frame now come from two preamble macros (`\telegramframebody`, `\telegramqrbox`) and appear in all eight decks. In webinars 2-8 the frame is `[plain, noframenumbering]`: no footer and no number, so every later frame keeps its number and NOTES.md only gained a line under frame 1. Webinar 2's title slide is now its banner PNG (`webinar02/images/title_banner.png`), as webinar 1 shows its banner; webinar 2's plan frame says "մոռացկոտություն" instead of "կարճ ու երկար".
- **Why:** Hayk said yes to the QR in webinars 2-8 (Q9), to the banner title (Q8) and to the label (Q10). In webinar 1 the inserted frame shifted every number and the notes had to be renumbered; the other decks' notes cross-reference frame numbers in prose ("(19)", "(29-36)", "41-րդ ֆրեյմ"), which a script cannot shift safely.
- **Alternatives rejected:** a numbered frame 2 with renumbered notes (see above); the QR on the title slide (both title layouts are full); a PDF of the banner made by `build_art.py` like webinar 1's `title_banner.pdf` (that run rebuilds all art through Edge for one image; the 1920x1080 PNG is sharp at the slide's 16 cm width).
- **What would change this:** webinar 1 is presented again and should match the others (make its frame unnumbered and undo the notes shift); the banners of webinars 3-8 get dates and should become their title slides too.

## 12. One banner per webinar from `build_banner.py --webinar N`, v2 look only

- **Date / status:** 2026-10-26, active (does what #9's "What would change this" named once webinar 2 got a date)
- **Decision:** `build_banner.py` keeps each webinar's wording, chips, popup text and loose emoji in a `WEBINARS` dict and takes `--webinar N`; webinar 1 still builds both looks into `out/v1_bubble` and `out/v2_glazz` (the slides' title image comes from there), later webinars build only the v2 Glazz look into `out/webinar0N/`. Post texts sit next to it as `post_text_webinar0N.md`. Webinar 2: Friday 2026-10-30, 18:30, Zoom (Hayk). Webinars 3-8 were built the same day without dates (Hayk: "No dates yet"): `"date": None` shows "Ամսաթիվը՝ շուտով" and drops the time, and their posts carry `[ամսաթիվ]` / `[ժամ]` blanks. Each popup reuses its deck's title-slide line; button labels share one size, shrunk to fit the 170 px buttons.
- **Why:** webinar 2 needed a banner and post. Rebuilding webinar 1 after the change gave byte-identical SVGs and PNGs (`git diff --stat` on `banner/out` empty), so nothing already posted or used in the slides moved. Webinar 2 shows four chips, not five: five memory labels need three rows, which pushes the date row off the 1920x1080 banner; the script now raises an error instead of drawing past the edge.
- **Alternatives rejected:** a copy of the script per webinar (duplicated layout code); both looks for every webinar (v2 was chosen in #5); a TikZ poster from the slides' `\webinartitle` (the banner is the series' public look and already has the date row).
- **What would change this:** the decks' title slides should show each webinar's banner too (swap `\webinartitle` for the image, as in webinar 1).

## 11. Finished slide PDFs are committed in `slides/pdf/`; webinar 1 links the repo and a Telegram group

- **Date / status:** 2026-10-23, active
- **Decision:** The eight finished decks are copied from each `build/` (still gitignored) to `02_idiot_brain/slides/pdf/idiot_brain_webinarN_chN.pdf` and committed. Webinar 1's frame 2 shows a QR code and link for the webinar's Telegram group (https://t.me/ugheghamprop) and the repo link with the PDF folder; the closing "Questions" frame repeats the QR. The QR is drawn by the LaTeX `qrcode` package (TeX Live 2025, loaded in `webinar01.tex` only), and the rendered slide was decoded with zxing-cpp to check that it opens the link.
- **Why:** Hayk asked for the Telegram QR and the repo link at the start, and said yes to putting the PDFs in the repo, since otherwise the link would show only LaTeX sources. About 18 MB for all eight.
- **Alternatives rejected:** a QR image made in Python (an extra file and dependency; TeX draws it itself); a second QR for the repo on frame 2 (two codes on one slide make phones pick either); committing `build/` (aux files and old job names); linking the slide straight to the PDF folder (Hayk asked for the repo link).
- **What would change this:** the repo grows too much from re-committed PDFs (move them to GitHub Releases); the Telegram group is for the whole series (add the QR to webinars 2-8 too).

## 10. Chapter 2 leaves webinar 1: one chapter per webinar from the start, eight webinars

- **Date / status:** 2026-10-23, active (supersedes the "webinar 1 stays intro + chapters 1-2" part of #9 and #3)
- **Decision:** Webinar 1 is the introduction + chapter 1; chapter 2 (memory) becomes its own deck in `slides/webinar02/`; the chapter decks move up one folder, so chapter N is `slides/webinar0N/` (3-8). The memory slides were moved as they were, not rewritten or expanded: webinar 2 got its own title, hook, series and plan frames, a wrap-up, a teaser for chapter 3 and an appendix, all built from webinar 1's; webinar 1's break moved to before "sleep", webinar 2's sits before "alcohol". Cross-references in the later decks were renumbered by what they point to (intro and chapter 1 content stays "webinar 1", memory content became "webinar 2").
- **Why:** Hayk on 2026-10-23: "i just want eveything up to chapter 2 to be the first session then chapter 2 is seconds and so on" and "i dont care about minutes aount standards slide coutns". Result: webinar 1 has 61 presented frames (~65 min; 59 after the split, plus two Hayk asked for: a Telegram-group QR as frame 2 and why the cortex says yes to dessert), webinar 2 has 52 (~55 min), the others stay at 88-96.
- **Alternatives rejected:** expanding webinars 1 and 2 to ~95 min each from the book (Hayk does not care about length); calling the memory deck "webinar 1b" to keep the old folder numbers (inconsistent); keeping the old deck for the 2026-10-23 talk and splitting afterwards (Hayk asked for the split).
- **What would change this:** webinars 1 and 2 feel too short in practice (expand them from the parts of chapters 1-2 the slides skip); a fixed schedule forces two chapters into one evening again.
- **Known mismatch:** webinar 1's banner (title slide and the posted image) still shows a "հիշողություն" chip, and `banner/post_text.md` promises "faces vs names", which is now webinar 2. Webinar 1's notes tell the speaker to say so on frame 1.

## 9. Chapters 3-8 become webinars 2-7, one chapter each, built by six parallel agents

- **Date / status:** 2026-10-21, active except the webinar numbering, which #10 superseded on 2026-10-23 (these decks are now webinars 3-8) (revises #3: webinar 1 stays intro + chapters 1-2; from webinar 2 on it is one chapter per webinar); revisited 2026-10-21: the queue now allows two builds at once, after one LuaLaTeX build of webinar 1 measured a peak of only 179 MB RAM, so CPU (4 cores), not RAM, is the limit
- **Decision:** Each remaining chapter gets its own ~95 min deck (85-100 presented frames + appendix) in `slides/webinar02/` (ch3) to `slides/webinar07/` (ch8 + afterword), written at the same time by six Opus agents against one spec (`slides/DECK_BRIEF.md`). Shared files are frozen while they work. All LuaLaTeX builds go through `slides/common/build_deck.py`, which queues them behind one machine-wide lock. Webinar 2 on uses a TikZ title slide in the banner's layout (`\webinartitle`) instead of a banner image. Chapter 8 sticks to the book: no extra help-line slide.
- **Why:** Hayk's answers on 2026-10-21: "~95 min, 1 per webinar", "All six now", "Opus 5.5", "No, book only". Builds are queued because only 1.7 GB of 15.6 GB RAM was free at launch, a background LuaLaTeX build was already killed for low RAM on 2026-10-19, and one pass of a ~100-frame deck takes ~3 min on one core. The lock test: a second build waited 55 s for the first, then built. The title macro exists because webinar 1's title slide is its banner, which carries webinar 1's number and date; dates for 2-7 are not set.
- **Alternatives rejected:** ~50 min decks, two chapters per webinar (my recommendation; Hayk chose depth, so webinar 1's "next time" frame now says chapter 3 only); a two-deck pilot before the other four (Hayk chose speed, accepting that a systematic flaw can reach all six); Sonnet agents (cheaper, but weaker Armenian expected); a help-line slide in chapter 8 (Hayk: book only); a git worktree per agent (not needed: each agent writes only its own folder); a per-webinar banner from `build_banner.py` (needs dates nobody has yet).
- **What would change this:** the first finished decks share a flaw (fix the brief, redo only what is affected); a chapter cannot fill ~85 frames without padding (let that deck be shorter); builds still get killed (close apps first, or build decks one after another); Hayk sets dates and wants banners per webinar (extend `build_banner.py` and swap the title frames).

## 8. Webinar 1 deck retargeted to bachelor students: longer, a few memes, an appendix

- **Date / status:** 2026-10-19, active (revises #7 for audience and length)
- **Decision:** Aim the deck at bachelor students instead of high schoolers; let it grow to ~102 presented frames (~100-105 min) instead of ~80, add five meme templates with Armenian captions, add English/scientific terms in brackets, and put four appendix frames (corrections to the book, what we added, sources) after "Questions".
- **Why:** Hayk's answers on 2026-10-19: "let it grow", "a few memes (3-5)", keep "դու", and no additions beyond the book for now. The extra frames mostly come from splitting the ~20 frames whose content was cut off at the bottom (the first draft's main defect), plus more of Burnett's own jokes. The frame title was made smaller and the topic pill moved to the footline, which freed ~1 cm per frame; the two test builds report 0 overfull vboxes. The appendix collects every correction and outside number already listed in NOTES.md, so students can check sources.
- **Alternatives rejected:** keeping ~80 frames by cutting school-ish slides (Hayk chose to let it grow); trimming to ~65 frames; own art only, no memes; extra material beyond the book (Mandela effect quiz, group-project poll, VR sickness, doorway effect: Hayk said not yet); switching to "դուք".
- **What would change this:** the rehearsal runs well over 105 min (NOTES.md lists 11 frames to skip first), the memes fall flat, or Hayk wants the extra studies after all.

## 7. Webinar 1 deck: 90 min, all 9 book sections, alcohol kept, notes in a separate file

- **Date / status:** 2026-10-14, revisited 2026-10-19 (audience and length, see #8)
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
