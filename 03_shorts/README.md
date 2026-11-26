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

**Publishing order after it (Fable F233, pending Hayk; also in `tools/episodes.py`):** own_voice, decoy_popcorn, bayes_test, map_projection, friendship,
painted_statues, petrov, mashtots, english_spelling, crypto_paint, yawning, week_seven, regression,
dmanisi, ikea_effect, kids_tv, simpson, minute_60, luggage_wheels, waiting, qwerty (both restructured in the Codex pass). Option:
mashtots and english_spelling around 21 February (International Mother Language Day).

## One short, end to end

From `03_shorts/`. Setup once: Python 3.14 with `requirements.txt` (`uv pip install -r requirements.txt`), ffmpeg on
PATH, and `npm ci` in `render/`. Offline tests: `python -m unittest discover -s tests` (about 1 s).

1. Write `<short>/beats.hy.json`: `[{key, text, screen?, screen_small?, visual, pause_after?}]`, following the script
   rules above. Lint the Armenian (extract the texts to a .txt, run the style guide's `lint_armenian.py --style`), then
   `python tools/plan_script.py <short>` (the length line is a planning estimate, not a measurement). A 16:9 episode
   gets `<short>/episode.json` with `{"layout": "landscape"}`. `python tools/validate_episode.py <short> --stage
   script` checks the file before anything is paid for.
2. Voice. Hayk's own recording: `python tools/import_recording.py propose <take> <short>`, check the proposed cuts,
   then `... apply <short>`. The TTS voice (~30 s for 9 beats, ~$0.02):
   `python tools/tts_gemini.py --key-name GEMINI_API_KEY beats <short>/beats.hy.json <short>/audio` (Sadaltager, no
   style prompt by default; unchanged clips are reused, an interrupted run keeps every paid clip; spend goes to
   `tts_ledger.csv`).
3. Timeline, ~2 s: `python tools/build_timeline.py <short>`: trims silence, joins the clips into
   `<short>/build/narration.wav`, spreads word times by spoken length and snaps them to the voice's real pauses,
   groups caption pages for the episode's layout (each page measured with the real font; a word that cannot fit
   stops the build; pages shorter than 0.6 s on screen are merged, and any left are listed as warnings). The
   timeline records hashes of the script, the clips and the audio.
   Then `python tools/check_sync.py <short>`: a pause-consistency diagnostic with a pass/fail gate. It is not proof
   of word accuracy: for that, mark about 10 word times by ear in `<short>/checkpoints.json` (see the tool).
4. Photos: `python tools/fetch_commons.py search "..."`, then `get "File:..." <short>/assets --name x`; licence,
   licence link, credit and changes go to `<short>/assets/credits.json` for the video description.
5. Render (Remotion, DECISIONS #21, #24): `python render/sync_short.py <short>` copies the build into the render
   project as a matched pair, then see `render/README.md`. `python tools/validate_episode.py <short> --stage render`
   says whether the render copy is current. Check stills of changed scenes first, render in full last
   (`PROCESS_NOTES.md`). The bake-off (`bakeoff/`) is frozen history.
6. Review, in this order: `python tools/contact_sheet.py <mp4> --out sheet.png` (a frame per second with the safe
   area drawn; read it), then `python tools/gemini_review.py <540x960 preview> <short>/beats.hy.json --out
   <short>/review/gemini_review.json` (~$0.02; verify each finding), then
   `python tools/media_gallery.py <files> --out <page>.html` and open it with html-review for Hayk.
7. Status: `python tools/episodes.py` rebuilds `episodes.json` (beats, planned length, script hash, narration,
   approval) and the review page `review_queue_picker.html`; after Hayk approves a script,
   `python tools/episodes.py --approve <short>` records the approved hash.

## Folders

| Path | What |
|------|------|
| `pilot_survivorship/` | First short: survivorship bias (Yerevan Zoo ZIL fridge, Wald's bombers, old songs, a 90-year-old smoker, Jobs and Gates). `beats.hy.json`, `labels.hy.json`, `audio/`, `assets/` + `credits.json`, `build/` |
| `tools/` | `tts_gemini.py` (adapted for the series), `import_recording.py`, `validate_episode.py`, `build_timeline.py`, `check_sync.py`, `plan_script.py`, `hy_numbers.py`, `episodes.py`, `fetch_commons.py` (search, get, credits), `contact_sheet.py`, `gemini_review.py`, `media_gallery.py`, `runlog.py` (shared logging) |
| `render/` | The series' Remotion project (`render/README.md`): the zero-knowledge long video (`ZkLong`) and Short (`ZkShort`) |
| `tests/` | Offline tests of the tools (no network, no paid calls) |
| `episodes.json` | Episode index, generated by `tools/episodes.py`; the place to read counts, lengths and status |
| `PROCESS_NOTES.md` | What the pilot taught about the process: where the time went, improvements by payoff, the Gemini review |
| `bakeoff/` | Frozen: the pilot rendered in Remotion and in HyperFrames for the framework choice (Q7, decided: Remotion) |
| `voice_test/` | The two voice test pages (Q8) |
| `assets/fonts/` | Noto Sans Armenian + its licence |

## Later (parked, 2026-11-25)

- Posting by API (YouTube and TikTok keep unaudited uploads private; lit review section 10.3) once manual upload is
  the bottleneck.
- Word-exact captions if the length-based timing drifts visibly: MMS forced alignment (`ctc-forced-aligner`, model
  CC-BY-NC) or Azure hy-AM voices with native word boundaries.
- Music: not decided (in-app sounds at upload, a free library, or Lyria).
- AI-disclosure tick: check YouTube's help page on synthetic narrator voices before the first upload.
