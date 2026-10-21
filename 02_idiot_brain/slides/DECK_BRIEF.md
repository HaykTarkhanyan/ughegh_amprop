# Brief: one Idiot Brain chapter -> one webinar deck

Written 2026-10-21 for the agents building webinars 2-7 (chapters 3-8) in parallel, one agent per deck. It is also the spec for any later deck. Webinar 1 (`slides/webinar01/`, intro + chapters 1-2) is the finished reference: match its look, tone and quality.

| Deck | Chapter | Book file |
|---|---|---|
| `webinar02` | 3. Fear: nothing to be scared of | `02_idiot_brain/03_fear_nothing_to_be_scared_of.md` |
| `webinar03` | 4. Think you're clever, do you? | `02_idiot_brain/04_think_youre_clever_do_you.md` |
| `webinar04` | 5. Did you see this chapter coming? | `02_idiot_brain/05_did_you_see_this_chapter_coming.md` |
| `webinar05` | 6. Personality: a testing concept | `02_idiot_brain/06_personality_a_testing_concept.md` |
| `webinar06` | 7. Group hug! | `02_idiot_brain/07_group_hug.md` |
| `webinar07` | 8. When the brain breaks down ... + afterword | `02_idiot_brain/08_when_the_brain_breaks_down.md`, `09_afterword.md` |

## 1. Read first, in this order
1. Your chapter's Markdown file, all of it, including the `## Notes` at the end (they hold the book's sources).
2. `CONVENTIONS.md` (repo root) and `DECISIONS.md` entries #6-#9.
3. `slides/common/preamble.tex`: every macro and box you can use is defined there.
4. Webinar 1 as the model: `slides/webinar01/webinar01.tex`, `parts/00_opening.tex`, `parts/01_intro.tex`, `parts/04_wrapup.tex`, `parts/05_appendix.tex` in full; from `parts/02_mind_controls.tex` at least lines 1-170 (chapter opener, a whole section with poll, try-it, figure, meme, book quote, science update) and the break frame at the end; skim `parts/03_memory.tex`. Look at a few of its figures in `figures/`.
5. `slides/webinar01/NOTES.md`: the speaker-notes format to copy.
6. `_learnings/` (repo root): the 2026-10-14 Beamer and LuaLaTeX files and the 2026-10-19 pgfplots one.

## 2. Content rules
- **Audience:** bachelor students. Explain the science properly; give the English/scientific term in brackets the first time (`նշաձև մարմին (amygdala)`).
- **Language:** everything students see, and NOTES.md, is in Eastern Armenian that reads as written by a native speaker, not translated. Address the audience as «դու». Armenian punctuation: «» quotes, ։ full stop, ՝ ՞ ՛ on the word, "." before a list (Mardoto has no U+2024). No em or en dashes anywhere.
- **Length:** one chapter is a whole webinar of ~95 min including a 5-min break: about **85-100 presented frames**, plus 3-5 appendix frames after "Questions". Cover **every section** of the chapter, in the book's order.
- **Book only:** no new topics or studies beyond the chapter. Allowed exceptions, as in webinar 1: (a) where the book (2016) is wrong or outdated, say so in a `scienceupdate` box and list it in the appendix corrections table; (b) a number not in the book gets a `\source{...}` line and an appendix entry. Check doubtful claims with a web search before calling them wrong, and cite a real source; if you are unsure, leave the book's claim and say so in your report rather than inventing a correction.
- **Fun:** keep Burnett's own jokes and examples; they are the point of the book. Use the speech bubbles, popups, myth-or-fact, chat prompts. **3-5 memes** per deck (Armenian sticker captions, never explained on the slide). Use only the meme templates suggested for your deck in your task, or others that are not in any other deck's list and not used in webinar 1 (distracted boyfriend, Drake, is this a pigeon, woman yelling at cat, this is fine). Download templates from imgflip (`https://i.imgflip.com/<id>.jpg`) into `memes/`.
- **Interaction:** 6-9 interactive moments spread across the talk (`poll`, `chatbox`, `tryit`), as in webinar 1.
- **Pictures:** real photos or classic figures are welcome where they help (Wikimedia Commons is fine); put them in `images/`. Charts are bars with value labels on the bars, never pies; 3+ series use the Armenian flag colours `amRed`, `amBlue`, `amOrange`.

## 3. Deck structure
- `webinarNN.tex`: copy webinar01.tex's header comment (adapted: chapter, build command, time) and `\title[Վեբինար \#N]{Ապուշ ուղեղը}`. Deck-only macros and TikZ styles go here, after `\input{../common/preamble.tex}`.
- `parts/00_opening.tex`: `\webinartitle{N}{Գլուխ X. <title>}{<4-5 \chip topic chips>}{<mood>}{<popup error text>}{{<emoji>}{<emoji>}{<emoji>}}` (see `slides/prototypes/title_test.tex`), then a hook frame with audience interaction, one short frame on the book and the series for newcomers (where this chapter sits among the 8), and today's plan.
- One part file per book section (`parts/01_<slug>.tex`, `02_...`). Start the chapter with one `\partopener{Գլուխ X}{<short title>}{<subtitle>}{<mood>}{<colour>}` and each section with `\topicopener{<emoji>}{<short name>}{<book's section title in Armenian>}{<what it is about>}{<mood>}`.
- A break frame near the middle (~45-50 min), copied from webinar 1's.
- Wrap-up part: "today's 5 ideas", "try at home", a teaser for the next webinar's chapter (read that chapter's section headings), then the "Questions" frame. Webinar 7 ends the series instead: the afterword line and a short goodbye.
- `parts/NN_appendix.tex` after Questions: corrections to the book (table, as in webinar 1), what we added beyond the book, sources from the chapter's Notes.
- `NOTES.md` in Armenian, webinar 1's format: header, timing table by section, frames to skip if short on time, interactive frames, meme frames, then notes per frame number and title (what to say, what the clicks reveal, the book's stories in more detail than the slide).
- Mascot moods: panic, happy, scared, sleepy, sick, confused, smug, hungry, thinking, sad, angry. Emoji: the names in `slides/common/build_art.py` (268 of them; an unknown name stops the build).

## 4. Technical rules (each of these broke webinar 1 once)
- `\tracinglostchars=3`: a character missing from the font stops the build. Mardoto has no `→` (use `$\rightarrow$`), no `≈` (use `$\approx$`), no U+2024 and **no italic** (never `\textit`; `\emph` is medium weight). Glazz (`\titlefont`) has Armenian letters only: no digits, no punctuation.
- A TikZ style with `#1` cannot be defined inside a frame body; put it in your main .tex (`_learnings/2026-10-14-2240_beamer_frame_body_gotchas.md`). Don't name a style after a built-in TikZ key (`step` broke).
- `\edef` containing font commands needs `\noexpand` before them.
- pgfplots `xtick=data` / `ytick=data` only use the first `\addplot`'s coordinates: give explicit tick lists when each bar is its own `\addplot`.
- `\#` in titles, never a bare `#`.
- A line starting with `{` right after `\begin{frame}{Title}` (e.g. `{\small ...}`) becomes the frame's hidden subtitle and is never shown, with no warning. Start such lines with `\relax{...}` (found 2026-10-21 on 11 frames in three decks).
- In a TikZ node, a font switch inside the text is lost after `\\`: use the node's `font=` key.
- `visible on=<n->` hides emoji and mascots (fixed 2026-10-21) but not a plain `\includegraphics`; put photos and memes under `\onslide` outside TikZ. Look at the first overlay of build-up frames too, not only the last.
- `[remember picture, overlay]` positions (title, openers, `\source`, break, Questions) come from the previous pass's .aux: after adding or removing such frames, build with `--passes 2` before judging them.
- No hyphenation in this deck style: long Armenian words in narrow columns overflow. Table columns use `\newcolumntype{L}[1]{>{\raggedright\arraybackslash}p{#1}}` (as in webinar 1's appendix).
- `Overfull \vbox` = text cut off at the bottom. The log does not catch TikZ drawn past the frame edge, so look at every frame.
- Edit Armenian text with the Edit/Write tools only. `sed`, heredocs and `printf` in Bash have mangled Armenian and backslashes before.

## 5. Building and checking
- **Never run `lualatex`, `latexmk` or `pdflatex` yourself.** Six decks share one 4-core laptop; `slides/common/build_deck.py` queues all builds, at most two at once. Read its docstring.
- Start a build with the Bash tool and `run_in_background: true`, from the repo root:
  `python 02_idiot_brain/slides/common/build_deck.py webinarNN` (or `--parts 01,02` for part files only, `--passes 2`, `--full`).
  Then wait for it in the foreground: `python 02_idiot_brain/slides/common/build_deck.py webinarNN --wait` (timeout 600000). Exit 0 = clean, 1 = problems (printed), 3 = still queued or running: call `--wait` again. Blocking on `--wait` is fine for you: you are a background agent and nobody is waiting on your chat.
- One build of your deck at a time. A ~100-frame pass takes ~3 min; other decks' builds can add a wait. So write a lot between builds: a whole part file, then build it with `--parts`.
- Look at what you built: `uv run 02_idiot_brain/slides/common/non_essential/frame_sheets.py webinarNN [--job parts_01-02] [--frames 10-30]` writes 9-frame contact sheets of each frame's last overlay to `webinarNN/build/sheets/`; Read every sheet. Look for: anything cut at the bottom or touching the footline pill or the frame number, text outside its box, TikZ past the edge, overlapping labels, fonts too small to read on a shared screen (nothing below `\scriptsize` except `\source`), and an overlay order that makes sense. Fix, rebuild, look again.
- **Done means:** a final `--full` build of the whole deck reports 0 errors, 0 overfull vbox, 0 missing chars, and you have looked at the contact sheets of **all** frames from that build. Then check that NOTES.md's frame numbers and titles match the PDF.

## 6. Boundaries
- Write only inside your deck folder `02_idiot_brain/slides/webinarNN/`. Read anything.
- Never edit `slides/common/`, `slides/webinar01/`, another deck, `banner/`, the book files, or repo-root files (DECISIONS.md, CONVENTIONS.md, `_learnings/`, `_work_sessions/`). If you need something shared (an emoji, a mascot mood, a preamble change), use the closest thing that exists and list the need in your report.
- No git commands that change anything (no add, commit, checkout, stash, reset). Don't copy files to the Desktop. Don't start subagents.
- Throwaway scripts and renders go in your scratch folder (given in your task), never in the repo. `python`, not `python3`; pass `encoding="utf-8"` to `open()`; Python longer than ~15 lines goes in a file written with the Write tool.
- No paid APIs.

## 7. Final report (your last message, in English, short)
1. Result: presented frames + appendix frames, PDF pages, the final `--full` build line (time, counts), estimated talk time.
2. Corrections to the book you made, each with its source.
3. Judgment calls Hayk should check (content cut or merged, anything sensitive, claims you could not verify).
4. Needs you could not meet inside your folder (missing emoji or moods, preamble changes).
5. Memes used (template + frame number) and the frames to skip if the talk runs long.
