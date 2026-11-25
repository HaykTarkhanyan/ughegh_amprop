# Making a short: what the pilot taught about the process (2026-11-25)

Review of the first short (survivorship bias, ~71 s), written so the second one goes faster. Evidence for each
point is in `../_learnings/2026-11-25-*.md`.

## Where the time went

| Step | Time | Note |
|---|---|---|
| Script, 9 beats, Armenian lint | ~15 min | 3 lint rounds (article before «ու», filler, then a beat added) |
| Voice tests, 2 rounds of 4 | ~10 min + Hayk listening | the first round was wasted on a "lively" prompt |
| Narration, 9 beats | 32 s, ~$0.02 | one free-tier key ran out after 3 calls |
| Photos from Commons | ~10 min | search by brand name found the Yerevan Zoo ZIL |
| Each full render, 71 s 1080x1920 | 3.5-5.5 min | rendered 5 times per framework because of fixes found after rendering |
| Reviews (frame sheets, checks) | ~5 min each | found 3 rounds of layout bugs |

The biggest waste: **finding problems after a full render**. Five full renders per framework = ~25 min of CPU each,
most of it to fix things a still frame or a check would have shown.

## Improvements, by payoff

1. **Check before rendering, not after.** Order per change: (a) `check` (HyperFrames) or a few `remotion still`
   frames at the moments that changed; (b) a half-resolution draft render; (c) one full render at the end. For
   Remotion, `--scale=0.5` should cut a draft to roughly a quarter of the pixels (not measured yet).
2. **Script length from the measured rate**: ~870 Armenian characters per minute of speech
   (`_learnings/...armenian_tts_speaks_870_chars_per_minute.md`). A 60-90 s short is 870-1300 characters; count before
   paying for the voice.
3. **Hayk reviews the script before the voice** (from short 2 on, his rule). Changing a beat after the voice is
   made costs a TTS call and a re-render; changing it before costs nothing.
4. **Caption timing snapped to real pauses** (done: `build_timeline.py`, checked by `check_sync.py`): median error
   0.195 s -> 0.034 s. Run `check_sync.py` after every new narration.
5. **Contact sheet with the safe area drawn** (done: `tools/contact_sheet.py`): one frame per second shows text
   leaving the safe area and words running together, which no automatic check caught.
6. **One command per short** (not built yet): `make_short.py <short>` = narration (reuses unchanged beats) ->
   timeline -> copy assets -> draft render -> contact sheet -> Gemini review -> review page. Removes ~10 manual
   commands and the risk of rendering with a stale timeline when `sync_assets.py` is forgotten after a change.
7. **Scene templates instead of per-short code.** Most beats were one of five patterns: photo with slow zoom + label,
   grid of icons where most fail and one survives, title card, diagram with items appearing, big karaoke sentence.
   As parameterised components (props from `beats.hy.json` `visual` fields), a new short is mostly a script.
8. **A Gemini "first viewer" pass** (`tools/gemini_review.py`): it hears the Armenian voice, which Claude cannot.
   Cents per run. Its findings are claims to verify, see "Gemini review" below.
9. **Keep the free TTS quota in mind**: `GEMINI_API_KEY_VOICE` allows ~3-10 calls a day. A short is ~9 calls, a voice
   test ~4. Use `--key-name GEMINI_API_KEY` or a paid key for a full short.
10. **Disk**: renders are ~40 MB each at CRF 20; keep only the latest per framework in `out/` (gitignored). HyperFrames
    needs ~3 GB of temp space with 2+ workers, so it renders with `--workers 1` here.

## Gemini review of the pilot

(filled in below after the run)
