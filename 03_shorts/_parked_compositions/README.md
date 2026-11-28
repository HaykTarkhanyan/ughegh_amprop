# Parked compositions

Remotion compositions for 9 drafts whose code is written but whose narration is not generated yet (2026-11-27).
They sit here, outside `render/`, because `render/tsconfig.json` compiles every `.tsx` under `render/` and these
import timeline data (`render/src/data/<short>.json`) that only exists after the voice step.

Labels linted (0 errors); the cue words (`S.at(...)`) are not yet checked against real timelines.

| File | Draft folder | Note |
|---|---|---|
| Regression.tsx | regression/ | 3 of its clips already voiced |
| Dmanisi.tsx | dmanisi/ | 1 clip voiced; photos in dmanisi/assets |
| IkeaEffect.tsx | ikea_effect/ | 5 clips voiced |
| KidsTv.tsx | kids_tv/ | |
| Simpson.tsx | simpson/ | formula labels use «Ա՝» |
| MinuteSixty.tsx | minute_60/ | photos in minute_60/assets |
| LuggageWheels.tsx | luggage_wheels/ | |
| Waiting.tsx | waiting/ | |
| Qwerty.tsx | qwerty/ | |

To finish one: generate its narration (`tools/tts_gemini.py`), `tools/build_timeline.py`, `render/sync_short.py`,
then move the file into `render/src/series/`, register it in `render/src/Root.tsx`, run tsc/eslint, check each cue
word against the timeline, take stills, render, build the review page. On hold since 2026-11-28 03:05 (Hayk
cancelled the scheduled run, Q42); waiting for his go.
