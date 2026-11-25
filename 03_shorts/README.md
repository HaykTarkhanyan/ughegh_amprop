# 03_shorts: short vertical videos (Shorts, Reels, TikTok)

Armenian shorts about thinking errors, made by code: animation mixed with real photos, Gemini TTS narration,
word-by-word captions. Made in a Claude Code session, uploaded by hand (DECISIONS.md #19, #20). The tools review
that led here: `../_knowledge/short_videos/lit_review.md`.

## Brief (Hayk, 2026-11-25)

- **Language:** Armenian only. All Armenian goes through the armenian-style-guide lint.
- **Look:** a new look, not the webinar branding: near-black `#0E0F12`, warm white `#F4F1EA`, flag orange `#F2A800`
  for "survived / the point", red `#E8383D` for "failed"; Noto Sans Armenian (variable, OFL, in `assets/fonts/`).
- **Length:** a bit longer rather than shorter, so a short has substance and is not doomscroll filler. The pilot is
  ~70 s. Shorts allow up to 3 min.
- **Voice:** Gemini 3.8 Flash TTS, voice Sadaltager, **no style prompt** (the "lively" prompt sounded artificial on
  all four voices tried; the "natural, over coffee" prompt was second). Test pages: `voice_test/`.
- **Honesty:** say what is a story and what is data. The Wald bomber story is told as «Պատմում են, որ ...» and the
  red-dot plane carries «նկարազարդում» (it is a 2021 illustration, not wartime data).
- **Script review:** Hayk did not need to see the first script; from the second short on, he checks the script
  before the voice is made.

## One short, end to end

From `03_shorts/` (times measured on 2026-11-25):

1. Write `<short>/beats.hy.json`: `[{key, text, screen?, screen_small?, visual}]`, one or two sentences per beat.
   Lint the Armenian (extract the texts to a .txt and run the style guide's `lint_armenian.py --style`).
2. Voice, ~30 s for 9 beats, ~$0.02:
   `python tools/tts_gemini.py --key-name GEMINI_API_KEY beats <short>/beats.hy.json <short>/audio --voice Sadaltager --style ""`
   (unchanged beats are reused; spend goes to `tts_ledger.csv`; the default key's free tier allows ~10 calls a day).
3. Timeline, under 1 s: `python tools/build_timeline.py <short>`: trims silence, joins the clips into
   `<short>/build/narration.wav`, spreads word times by length inside each sentence, groups caption pages.
4. Photos: `python tools/fetch_commons.py search "..."`, then `get "File:..." <short>/assets --name x`; licences and
   authors go to `<short>/assets/credits.json` for the video description.
5. Render: see `bakeoff/README.md` until the framework is chosen (Q7).
6. Look at it: `python tools/media_gallery.py <files> --out <page>.html`, then open with html-review.

## Folders

| Path | What |
|------|------|
| `pilot_survivorship/` | First short: survivorship bias (Yerevan Zoo ZIL fridge, Wald's bombers, old songs, a 90-year-old smoker, Jobs and Gates). `beats.hy.json`, `labels.hy.json`, `audio/`, `assets/` + `credits.json`, `build/` |
| `tools/` | `tts_gemini.py` (copied from sample_problems_qysu/animations on 2026-11-25, unchanged), `build_timeline.py`, `fetch_commons.py`, `media_gallery.py` |
| `bakeoff/` | The same short rendered in Remotion and in HyperFrames, for Q7 |
| `voice_test/` | The two voice test pages (Q8) |
| `assets/fonts/` | Noto Sans Armenian + its licence |

## Later (parked, 2026-11-25)

- Posting by API (YouTube and TikTok keep unaudited uploads private; lit review section 10.3) once manual upload is
  the bottleneck.
- Word-exact captions if the length-based timing drifts visibly: MMS forced alignment (`ctc-forced-aligner`, model
  CC-BY-NC) or Azure hy-AM voices with native word boundaries.
- A Gemini "first viewer" critique of each MP4 (hook, pacing), lit review section 9.
- Music: not decided (in-app sounds at upload, a free library, or Lyria).
- AI-disclosure tick: check YouTube's help page on synthetic narrator voices before the first upload.
