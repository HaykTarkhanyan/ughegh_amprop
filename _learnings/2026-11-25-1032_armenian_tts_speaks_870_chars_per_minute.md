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
