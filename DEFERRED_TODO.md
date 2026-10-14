# Deferred

Topics cut from current work so they do not get lost. Newest at the top.

## Webinar 1 deck (parked 2026-10-14, first draft built)
- Polish pass over all 80 frames: the draft build reported content running past the bottom edge on ~20 frames, and some figures are cramped. Contact sheets of the last overlay per frame can be made from `build/webinar01.nav` (the scratch script used for that was not committed).
- Run the full 3-pass build (`latexmk`), not just the one-pass draft, and check the absolute-position frames (title, openers, break, questions).
- Ask Hayk before running the deck "student review" (one Sonnet subagent reading the rendered slides as a first-time student).
- Hayk to add: a self-introduction (frame 1 has none), and webinar 2's date and chapters on frame 79.
- Rehearse against the timing table in `slides/webinar01/NOTES.md`; drop frames 11, 25, 41, 57, 62, 69, 79 first if it runs long.
- Decide whether the final PDF gets committed (`build/` is gitignored for now).

## Builds
- Test whether a Windows Defender exclusion for `C:\texlive` speeds up LaTeX (Hayk's call; see `_learnings/2026-10-14-2241_lualatex_is_slow_here.md`).

## Banner
- Option B: an AI-generated background layer. If an image API key is used, it goes in `.env` (gitignored), never in chat.
