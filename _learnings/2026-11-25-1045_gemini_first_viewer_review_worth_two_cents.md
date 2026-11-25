# A Gemini "first viewer" review of a rendered short: 3 useful findings out of 6, for under 2 cents

**What:** `03_shorts/tools/gemini_review.py` sends the 540x960 preview (2.9 MB, inline) and the script to
`gemini-3.8-flash` and asks for a JSON review (pronunciation, sync, visual, hook, pacing, clarity, facts, top fixes).
It hears the Armenian narration, which Claude cannot.

**Measured on the pilot (71 s):** 7,489 input tokens (far fewer than the ~20k expected from 1 fps video; the API
seems to sample at low media resolution by default), 2,804 output tokens, ~$0.016 at $0.75 / $3.75 per 1M, 34 s.

**Findings and verdicts:**
- valid: the location pill text too small; a caption page starting with «տարի» and its closing quote; the takeaway
  beat (text on black) losing momentum. All three were missed by Claude's own frame review and by HyperFrames' check.
- rejected: "cut an example to stay under 60 s" (contradicts Hayk's explicit wish for longer shorts).
- empty "pronunciation" and "sync" lists: not proof of anything. At 1 fps it cannot judge word-level sync, and its
  Armenian ear is unverified. The measured check (`tools/check_sync.py`) stays.

**Consequences:** run it on every short after the frame review; verify every point before acting; never let it
override a decision Hayk made (length, voice). Ledger: `03_shorts/gemini_ledger.csv`.
