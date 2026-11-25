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

## Script rules (from the two Fable reviews, DECISIONS.md #22)

- **Hook:** the claim or the puzzle in the first 3 seconds, first sentence short; no date, label, term or hedge first.
- **One idea and one extension.** A fact that does not serve the video's one turn goes to the description or its
  own short. The beat count follows the content, not a mold (FABLE_REVIEW_2 F224).
- **Years and researchers' names on the source line** (`screen_small`), in the voice only when the date is the point.
- **Doubt beat:** only about a claim this video made, after one solid thing, ending on what is known. Never tell a
  story only to take it back (F223).
- **Pauses:** 8-12 s per script as `pause_after`, the longest on the showcase; let the viewer do something in them
  (choose, count, read along) (F222).
- **Closing:** one closing beat, no summary card, no «Այնպես որ,»; the voice says the closing screen line (F226);
  vary the frame, "not A, but B" only where it is the idea (F225).
- **Voice:** no Latin in the voice (English words on screen, voiced in Armenian letters); numbers as digits in the
  text, words only where the spoken form is the point («քսանինն ու կես», «երեսուներեք ամբողջ երեք, երեք, երեք»)
  (F229, checked in `voice_test/batch2_risky.html`).
- **Honesty:** say what is a story and what is data; tag every reconstruction, painting or drawn scene of a
  disputed story on screen («նկարազարդում», «նկարչի պատկերացում», «վերակազմություն») (F157, F212).
- **Local anchor:** one per script, best inside the idea (Armenia in the map showcase, prices in drams).

**Two strands (F232):** the channel now has thinking-error shorts (survivorship, Bayes, Simpson, regression,
decoy, IKEA, Dmanisi, statues, ...) and "why is this thing the way it is" shorts (alphabet, spelling, week,
minute, suitcase, own voice, yawning, ...). Alternate them.

**First video (Hayk, DECISIONS #23):** zero-knowledge proofs, narrated by Hayk: the Short `zero_knowledge_short/` and the long 16:9 explainer `zero_knowledge/`.

**Publishing order after it (Fable F233, pending Hayk; zero_knowledge moves to the front):** own_voice, decoy_popcorn, bayes_test, map_projection, friendship,
painted_statues, petrov, mashtots, english_spelling, crypto_paint, yawning, week_seven, regression, zero_knowledge,
dmanisi, ikea_effect, kids_tv, simpson, minute_60, luggage_wheels, waiting (rework), qwerty (rework). Option:
mashtots and english_spelling around 21 February (International Mother Language Day).

## One short, end to end

From `03_shorts/` (times measured on 2026-11-25):

1. Write `<short>/beats.hy.json`: `[{key, text, screen?, screen_small?, visual}]`, one or two sentences per beat.
   Lint the Armenian (extract the texts to a .txt and run the style guide's `lint_armenian.py --style`).
2. Voice, ~30 s for 9 beats, ~$0.02:
   `python tools/tts_gemini.py --key-name GEMINI_API_KEY beats <short>/beats.hy.json <short>/audio --voice Sadaltager --style ""`
   (unchanged beats are reused; spend goes to `tts_ledger.csv`; the default key's free tier allows ~10 calls a day).
3. Timeline, ~1 s: `python tools/build_timeline.py <short>`: trims silence, joins the clips into
   `<short>/build/narration.wav`, spreads word times by length and snaps them to the voice's real pauses, groups
   caption pages (at most 2 lines, measured with the real font, each page with its own font size; no lone words,
   no auxiliary or closing quote at a page start, no page under 0.6 s, no merge across a sentence end). Captions
   live in the band y ~1040-1200: keep every scene's content above ~1030.
   Then `python tools/check_sync.py <short>` (median error should be well under 0.1 s).
4. Photos: `python tools/fetch_commons.py search "..."`, then `get "File:..." <short>/assets --name x`; licences and
   authors go to `<short>/assets/credits.json` for the video description.
5. Render: see `bakeoff/README.md` until the framework is chosen (Q7). Check stills of changed scenes first, render
   in full last (`PROCESS_NOTES.md`).
6. Review, in this order: `python tools/contact_sheet.py <mp4> --out sheet.png` (a frame per second with the safe
   area drawn; read it), then `python tools/gemini_review.py <540x960 preview> <short>/beats.hy.json --out
   <short>/review/gemini_review.json` (~$0.02; verify each finding), then
   `python tools/media_gallery.py <files> --out <page>.html` and open it with html-review for Hayk.

## Folders

| Path | What |
|------|------|
| `pilot_survivorship/` | First short: survivorship bias (Yerevan Zoo ZIL fridge, Wald's bombers, old songs, a 90-year-old smoker, Jobs and Gates). `beats.hy.json`, `labels.hy.json`, `audio/`, `assets/` + `credits.json`, `build/` |
| `tools/` | `tts_gemini.py` (copied from sample_problems_qysu/animations on 2026-11-25, unchanged), `build_timeline.py`, `check_sync.py`, `fetch_commons.py` (search, get, credits), `contact_sheet.py`, `gemini_review.py`, `media_gallery.py` |
| `PROCESS_NOTES.md` | What the pilot taught about the process: where the time went, improvements by payoff, the Gemini review |
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
