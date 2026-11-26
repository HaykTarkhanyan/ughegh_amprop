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
   0.195 s -> 0.034 s. Run `check_sync.py` after every new narration. Caveat (Codex review X3, 2026-11-26): that
   median is measured against nearly the same pauses the snapping used, and the pilot also had 14 unmatched pauses
   and a 0.928 s worst case; it is a pause-consistency diagnostic, not proof of word accuracy. Hand-marked word
   times in `<short>/checkpoints.json` are the independent check.
5. **Contact sheet with the safe area drawn** (done: `tools/contact_sheet.py`): one frame per second shows text
   leaving the safe area and words running together, which no automatic check caught. At 1 fps it can miss a
   moment (the grid overlap at 10.0-11.0 s showed only as a partial overlap); use `--every 0.5 --start --end` on
   busy beats.
5b. **A fixed caption band** (done): pages measured with the real font, at most 2 lines, so captions always sit in
   y ~1040-1200 and every scene keeps its content above ~1030. New scenes should be designed against that line.
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

`python tools/gemini_review.py bakeoff/out/preview/pilot_remotion.mp4 pilot_survivorship/beats.hy.json --out
pilot_survivorship/review/gemini_review_remotion.json`: gemini-3.8-flash, 7,489 tokens in, 2,804 out, ~$0.016, 34 s.
Each point checked against the frames and Hayk's decisions:

| Gemini said | Verdict | Done |
|---|---|---|
| no pronunciation problems; no sync problems | weak evidence: it samples video at 1 fps, so it cannot judge sync finely; `check_sync.py` (pause consistency) plus hand-marked checkpoints stay the sync check | - |
| hook strong, idea understood, no disputable facts | agrees with the frame review; the «Պատմում են» framing of Wald worked | - |
| location pill text too small (0:00, 0:07) | valid: 28 px was exactly the phone floor | 34 px, may wrap to two lines |
| «տարի» with its closing quote opens a caption page (0:41) | valid: a page break inside the quoted saying | page rule: a word that closes a quote stays on the previous page |
| the takeaway (0:54-1:01) is text on black and loses momentum | valid: the only beat without a picture | faint callback grid of failed fridges and one survivor, drifting |
| cut an example to stay under 60 s | rejected: Hayk wants longer shorts with substance (DECISIONS.md #20) | - |

So: 3 useful findings out of 6 for under 2 cents. Worth running on every short, after the frame review and before
showing it to Hayk.

Second pass on the fixed video (`gemini_review_remotion_v2.json`, ~$0.016): the three fixed issues were gone. New:

| Gemini said | Verdict | Done |
|---|---|---|
| the fridge grid overlaps the captions at 0:10 | valid, worse than "medium": frames at 10.0-11.0 s showed white fridges behind white caption text; the cause was 5-word caption pages wrapping to 5 lines | caption pages now measured with the real font and limited to 2 lines (`_learnings/...armenian_captions_measure_line_wrap.md`); grid smaller and higher |
| the bomber diagram is small on a phone | rejected for now: a larger card collides with captions or the side rails; the full-size video shows the dots clearly | - |
| cut an example to stay under 60 s (again) | rejected (DECISIONS.md #20) | - |

Lesson: run the review again after fixes. The second pass found the worst layout bug of the night, one that two
frame reviews and HyperFrames' check had missed.

Third pass (`gemini_review_remotion_v3.json`, ~$0.016; three passes ~$0.048 in all): no pronunciation, sync or fact
issues; hook and clarity fine. Valid: the takeaway's unspoken words at 28% opacity were too dim to read ahead ->
50%. Parked: the hard cut into the title card at 0:14 (a plain cut is normal in shorts; a small zoom could soften
it). Rejected a third time: cutting an example to get under 60 s. Its timestamps are approximate (it put the dim
text at 0:48; the only dim text is at 0:55-1:01), so locate each finding in the frames before fixing.
