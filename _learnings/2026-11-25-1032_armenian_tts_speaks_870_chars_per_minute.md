# Armenian Gemini TTS speaks about 870 characters a minute: use it to size a script

Measured on the pilot short (`03_shorts/pilot_survivorship/`, Sadaltager, no style prompt, `gemini-3.8-flash-tts`):

| | value |
|---|---|
| characters in the 9 beats (spaces and punctuation included) | 1044 |
| speech returned by the API | 71.8 s |
| after trimming leading/trailing silence of each clip and joining with 0.12 s gaps | 69.9 s |
| rate | ~870 characters per minute (~14.5 per second) |

The common rule of thumb (1000 characters per minute, used in the qysu research) overestimates the speed by ~15%
for this voice. The "lively" prompt was not faster in practice: the same 196-character sample took 12.0-14.8 s across
voices with it, 13.5-14.1 s without it.

**Consequences:** a 60 s short is about 870 characters of Armenian, 90 s about 1300. Count with
`sum(len(b["text"]) for b in beats)` before paying for the voice.

**Digits break the rule (found by the Fable script review, measured the same day):** the pilot spelled its numbers
out, so the rate did not cover digits. Two digit-heavy beats ran longer than the estimate:

| Beat | Characters | Estimate | Measured (trimmed ~0.5 s less) | Numbers spelled out |
|---|---|---|---|---|
| simpson `crowd` (350, 273, 289) | 141 | 9.7 s | 11.8 s (~11.3) | 203 ch -> 14.0 s |
| petrov `hook` (a full date) | 151 | 10.4 s | 12.6 s (~12.1) | 181 ch -> 12.5 s |

Spelled-out numbers are read faster than average text, so the midpoint of the two estimates fits both beats within
~0.6 s. `tools/plan_script.py` now reports that midpoint (with `tools/hy_numbers.py`), and `tools/build_timeline.py`
weights caption words by their spoken length («1983» weighs 26 letters, not 4). Two samples only: re-check after the
first number-heavy short is voiced.
