# Word timing by length alone was off by 0.2 s (median) and up to ~1 s; snapping to real pauses fixed most of it

**Symptom:** the shorts highlight each caption word while it is spoken. Word times came from spreading each
sentence's duration over its words by letter count (no speech recognition: Whisper-based aligners are weak on
Armenian). `03_shorts/tools/check_sync.py` compares the predicted breaks (after punctuation) with the real pauses
that `ffmpeg silencedetect=noise=-35dB:d=0.08` finds in the narration:

```
length only:      23 breaks, median |error| 0.195 s, 15 within 0.3 s, worst ~1.0 s (e.g. "նրանք," -1.01 s,
                  "մնացել," +0.93 s, "հարստացել։" -0.88 s); 12 pauses inside sentences with no punctuation
snapped (default): 20 breaks matched, median |error| 0.034 s, 15 within 0.15 s; 35 word boundaries moved
```

**Cause:** the TTS does not speak evenly. It takes short breaths mid-sentence (0.08-0.26 s), skips some commas and
speeds through long words, so time is not proportional to letters.

**Fix:** `tools/build_timeline.py` now finds pauses in each clip (same -35 dB / 80 ms rule), snaps each one to the
nearest word boundary within 0.8 s (boundaries after punctuation preferred) and spreads words by length only between
those anchors. `--no-snap` gives the old behaviour.

**Side effect:** with real timing, some caption pages got very short where the voice rushes before a pause
(«իսկ ո՞ւր են» was on screen 0.34 s; HyperFrames' check flagged it as unreadable). `pages()` now merges a page shorter
than 0.6 s into a neighbour when the result stays within 5 words (55 -> 51 pages in the pilot).

**Limits:** the check is partly circular (it uses the same pauses). Where the voice does not pause at all (3 commas
in the pilot) the error stays up to ~0.9 s. Real word-level timing needs forced alignment (MMS) or a TTS with word
timestamps (Azure hy-AM), see `_knowledge/short_videos/lit_review.md` section 5.
