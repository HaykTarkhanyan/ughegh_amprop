# slides/common/non_essential

Dev and QA tools for the decks. Not needed to build a deck (that is `../build_deck.py`), but kept working.

| Script | What it does | When to re-run |
|---|---|---|
| `frame_sheets.py` | Contact sheets of the last overlay of every frame (9 per PNG, labelled with the frame number) from `<deck>/build/<job>.pdf` + `.nav`. | After every build you want to check by eye: the log misses TikZ drawn past the frame edge. |

2026-10-21: `frame_sheets.py` added, from the scratch `review.py` / `pick.py` used for the webinar 1 polish, so the chapter-deck agents can use it.
