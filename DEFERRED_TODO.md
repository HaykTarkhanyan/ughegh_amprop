# Deferred

Topics cut from current work so they do not get lost. Newest at the top.

## Chapter decks, webinars 2-7 (parked 2026-10-21, all six built and reviewed; since 2026-10-23 they are webinars 3-8, and the numbers below are the old ones)
- Emoji the agents wanted but did not have (they used substitutes): tomato, elephant, pig, football, wolf, chicken, moose, older woman, elevator, parachute, skier, tooth, bank, wrench. Adding them to `build_art.py` only helps if the frames are then edited to use them.
- Webinar 3 has a local `\showon{3-}{...}` macro (hide anything inside TikZ until a slide); move it to the preamble if another deck needs it, since `visible on` still does not hide plain `\includegraphics`.
- "Questions" frame: webinars 3 and 7 use «դու» (Գրիր/միացրու), webinar 1 used plural (Գրեք). Pick one for the series.
- Webinar 7 frame 90 (whole series on one page) was written from section headings: check its one-liners against webinars 3-6.
- Each agent's "judgment calls" list is in its final report (summarised in `_work_sessions/2026-10-21-0300_chapter_decks_launch.toml`); Hayk to go through them before each webinar.
- Ask Hayk before any student-review subagent, one deck at a time.

## Webinar 1 cosmetics (parked 2026-10-21; overflow fixed, these are small; frame numbers updated after the 2026-10-23 split)
- Webinar 1 frame 39 (body clock): the "Մարմնի ջերմաստիճան (36-37 °C)" label crosses the dotted night line.
- Webinar 2 frame 13 (neuron): the "action potential" and "նեյրոն" labels are crossed by dendrite lines.
- 16 small "Overfull \hbox" warnings remain (largest: hypnogram 10 pt, the Memory part title in Glazz 14 pt); checked by eye, nothing visibly cut.
- Ask Hayk whether webinars 2-7 should get banners (needs dates; `build_banner.py` is webinar 1 only).

## Webinar 1 deck (parked 2026-10-14, first draft built)
- Polish pass over all 80 frames: the draft build reported content running past the bottom edge on ~20 frames, and some figures are cramped. Contact sheets of the last overlay per frame can be made from `build/webinar01.nav` (the scratch script used for that was not committed).
- Run the full 3-pass build (`latexmk`), not just the one-pass draft, and check the absolute-position frames (title, openers, break, questions).
- Ask Hayk before running the deck "student review" (one Sonnet subagent reading the rendered slides as a first-time student).
- Hayk to add: a self-introduction (frame 1 has none), and webinar 2's date and chapters on frame 79.
- Rehearse against the timing table in `slides/webinar01/NOTES.md`; drop frames 11, 25, 41, 57, 62, 69, 79 first if it runs long.
- ~~Decide whether the final PDF gets committed~~ Done 2026-10-23: finished PDFs are committed in `slides/pdf/` (DECISIONS.md #11).

## Builds
- Test whether a Windows Defender exclusion for `C:\texlive` speeds up LaTeX (Hayk's call; see `_learnings/2026-10-14-2241_lualatex_is_slow_here.md`).

## Banner
- Option B: an AI-generated background layer. If an image API key is used, it goes in `.env` (gitignored), never in chat.
