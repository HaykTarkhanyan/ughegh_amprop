# 03_shorts/render: the series' Remotion project

Remotion 4.0.547 (React 19, TypeScript; DECISIONS.md #21), set up on 2026-11-25 from the pilot's pinned
`bakeoff/remotion/` lockfile, plus `@remotion/paths` and `@remotion/media` (both 4.0.547, exact). The pilot itself
stays in `../bakeoff/remotion/` as a record.

## Run it (from this folder)

| What | Command | Time (this laptop) |
|------|---------|--------------------|
| Install | `npm ci` | ~40 s |
| Type-check | `npx tsc --noEmit` | ~10 s |
| Preview in the browser | `npm run dev` (Remotion Studio) | |
| One still | `npx remotion still src/index.ts ZkWaldo out/stills/x.png --frame=300` | ~40-60 s (bundles first) |
| One video | `npx remotion render src/index.ts ZkDeck out/v1/ZkDeck.mp4 --concurrency=2 --crf=20` | see `out/v1/*.log` |

`out/` is gitignored (renders are regenerated from code).

## Compositions

| Id | File | Size | What |
|----|------|------|------|
| `ZkWaldo` | `src/zk/Waldo.tsx` | 1920 x 1080 | Where's Waldo as a zero-knowledge proof: crowd page, magnifier, the big sheet with a hole, "the page could be anywhere" |
| `ZkDeck` | `src/zk/Deck.tsx` | 1920 x 1080 | The red card: all 26 black cards are still in the rest of the deck |
| `ZkBalls` | `src/zk/Balls.tsx` | 1920 x 1080 | The colour-blind friend: two balls, swap or not, 20 rounds, the halving bar |
| `ZkLong` | `src/zk/Long.tsx` | 1920 x 1080 | The whole long video: all 13 beats on the narration's timeline (scenes from `Story.tsx`, `Waldo.tsx`, `Deck.tsx`, `Balls.tsx`), key moments tied to spoken words, centred captions, the narration |

**Rebuilding the long video after the narration changes** (from `03_shorts/`): `python tools/build_timeline.py
zero_knowledge`, then `python render/sync_short.py zero_knowledge`, then render `ZkLong`. `Long.tsx` finds the key
moments by the first words of sentences (e.g. the sheet sweeps in on «Ստվարաթուղթը»); if the script's wording
changes, it stops with "no word starting with ...", and the prefix in `Long.tsx` needs updating. The narration now is
a temporary Gemini guide voice (`zero_knowledge/audio/README.md`); Hayk's recording replaces it.

Each scene takes its phase times as a prop (`DECK_T`, `BALLS_T`, `WALDO_T` are the defaults). When the narration
is recorded, the beat times from `tools/build_timeline.py` set these, so a faster or slower reading only changes the
speed of the animation. `src/zk/common.tsx` holds the shared pieces (backdrop, labels, speech bubbles, check and
cross marks, the eye icon, the halving bar); `src/theme.ts` the colours, the Armenian font and easing helpers.
`src/zk/drafts/` holds unregistered drafts (the Ali Baba cave, replaced by Waldo on 2026-11-25).

## Assets and licences

- `public/NotoSansArmenian-Variable.ttf`: OFL (`../assets/fonts/OFL.txt`).
- `public/cards/*.png`: Dmitry Fomin's English pattern playing cards (CC0, Wikimedia Commons), cut from the 3840 px
  thumbnail `assets_src/deck_3840.png` by `assets_src/cut_cards.py` (Commons answers bulk original-file downloads
  with HTTP 429 and asks for thumbnails). Credits: `public/cards/credits.json`.
- Everything else (crowd, people, the hidden character, card back, balls, sheet) is drawn in code. The hidden
  character is our own design, not the Where's Waldo character.
