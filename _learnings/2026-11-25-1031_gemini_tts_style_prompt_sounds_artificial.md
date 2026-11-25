# Gemini TTS: a "lively" style prompt made every voice sound artificial; no prompt sounded best

**Symptom:** for the shorts, the same 196-character Armenian sample (the pilot's hook) was synthesized with
`gemini-3.8-flash-tts` in two rounds (pages in `03_shorts/voice_test/`):

- Round 1, style "Lively, energetic storyteller for a short social media video. Fast pace, natural and
  conversational, a little playful": Sadaltager, Puck, Sadachbia, Autonoe. Hayk: "with this lively they all sounded
  too artifical".
- Round 2: Sadaltager with no style prompt, and Sadaltager, Achird, Autonoe with "Natural, relaxed and
  conversational, like telling a friend something interesting over coffee". Hayk: "natural_Sadaltager_no_style was
  best".

**Cause (theory, not tested):** an energy prompt pushes the model into an advertising register, which in a language
it handles less well than English comes out as exaggerated intonation.

**Consequences:**
- Shorts use Sadaltager with `--style ""` (DECISIONS.md #20). The qysu lectures keep their "calm lecturer" prompt.
- Try a new voice or prompt on one 10-15 s sample first; four samples cost about $0.012.
- Disproven: "a short needs a high-energy voice". For this audience the plain voice won.
