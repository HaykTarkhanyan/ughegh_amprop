# Conventions

Recurring choices, written down once they have been made twice.

## Book texts
- One folder per book (`01_power_oh_habit/`, `02_idiot_brain/`). The Idiot Brain is one Markdown file per chapter, `NN_<slug>.md` (DECISIONS.md #1).

## Webinar material (Armenian)
- Everything students see is in Armenian: banner, slides, post text. Speaker notes too (`slides/<deck>/NOTES.md`).
- Armenian punctuation: «» for quotes, ։ (U+0589) for a full stop, ՝ ՞ ՛ ՜ placed on the word. Use "." for the միջակետ before a list: Mardoto has no U+2024.
- No em or en dashes in Armenian text either; use ՝, a comma or a full stop.
- Look: the banner palette (plum `#4A2340` text on cream `#FFF6EC`, pastel accents: pink, peach, lavender, mint, butter), Mardoto for text, Glazz for big titles (Armenian letters only), Twemoji 15.1.0 icons, the pink brain mascot (`banner/mascot.svg`). Charts with 3+ series use the Armenian flag colours.
- Fonts come from fonter.am and live in `02_idiot_brain/banner/assets/fonts/`; the slides load them from there.
- A glyph missing from a font is an error, never a silent blank (`\tracinglostchars=3` in the slides, `Metrics.check` in the banner script).

## Slides (Beamer + LuaLaTeX)
- One folder per webinar: `slides/webinarNN/webinarNN.tex` + `parts/` + `figures/` + `images/` + `NOTES.md`; build output goes to `build/` (gitignored).
- All styling lives in `slides/common/preamble.tex`. Decks only hold content.
- Icons and mascot moods: `\emoji{name}`, `\bigemoji[size]{name}`, `\mascot[width]{mood}`. To add one, add it to `slides/common/build_art.py` and rerun it.
- Mardoto has no italic: use `\emph` (medium weight) or `\textbf`, never `\textit`.
- Parameterised TikZ styles (with `#1`) go in the preamble, not in a frame body (`_learnings/2026-10-14-2240_beamer_frame_body_gotchas.md`).
- Numbers that are not in the book get a `\source{...}` line and an entry in the deck's NOTES.md list of differences from the book.
