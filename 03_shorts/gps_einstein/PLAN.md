# Short: GPS clock corrections and the size of a microsecond - revised script and plan

Revised for Hayk's review, 2026-11-28. Why-is-it-so strand. Script source: `beats.hy.json`.
One clock comparison showcase; one extension explaining why clock precision matters to ranging and the receiver.
Local anchor: looking at a phone's map in Yerevan. No voice or animation generated.

## The idea in one paragraph

Light covers about 300 metres in one microsecond: this gives the tiny time unit immediate stakes before the
viewer sees a phone locating them in Yerevan. Signal travel times feed the position/time calculation. Orbital
motion slows a nominal GPS clock by about 7 microseconds/day relative to Earth reference time; the gravitational
potential difference contributes about 45 in the other direction, net about 38 for an unadjusted clock. The
showcase combines those opposing contributions. The extension makes clear why precise timing matters, then
shows that the receiver solves for its own clock error as well as location. The single doubt concerns the inference
from the numbers already given: they are not a ready-made position-error prediction. A short real-orbit correction
beat ends on the ongoing timing calculation, then one spoken close returns to the stationary phone.

## The script (Armenian)

<!-- script:start -->

8 beats, 1,495 characters (1,535 with numbers spelled out): ~104 s of speech, ~1:56 with pauses and the end tail, 9 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Լույսը՝ մոտ 300 մետր մեկ միկրովայրկյանում։ Դա վայրկյանի միլիոնական մասն է։ Հեռախոսիդ ջիփիէսի համար այդ փոքր ժամանակն էլ նշանակություն ունի։

**2. travel_time.** Պատկերացրո՛ւ՝ Երևանում կանգնած հեռախոսիդ քարտեզին ես նայում։ Տեղդ գտնելու համար հեռախոսը համեմատում է՝ արբանյակը երբ է ազդանշանն ուղարկել, ու այն երբ է հասել։ Ճանապարհի ժամանակից հաշվում է հեռավորությունը։

**3. orbit.** Բայց արբանյակի ժամացույցը Երկրի ժամացույցի տեմպով չի գնում։ Շարժումն այն դանդաղեցնում է, իսկ ուղեծրի ու Երկրի մակերևույթի ձգողության պայմանների տարբերությունն արագացնում է։ Երկու ազդեցությունները հակառակ են։

**4. clock_showcase.** Օրական մոտ 7 միկրովայրկյան հետ՝ շարժումից, մոտ 45 առաջ՝ ձգողության տարբերությունից։ Մեծ սլաքին նայի՛ր։ Չուղղված արբանյակային ժամացույցը վերջում օրական մոտ 38 միկրովայրկյան առաջ կընկներ։ Այդ տարբերությունն ազդանշանի ճանապարհի ժամանակի հաշվարկում անտեսել չես կարող։ *[pause 5 s]*

**5. receiver.** Հեռախոսի ժամացույցն էլ կատարյալ չէ։ Հիմնական հաշվարկում 4 արբանյակի տվյալներով միաժամանակ գտնում են թե՛ տեղդ, թե՛ այդ ժամացույցի շեղումը։ Այսինքն՝ համակարգը միայն քարտեզի կետը չի հաշվում։ *[pause 4 s]*

**6. doubt.** Ուրեմն 38-ը տեղիդ սխալի պատրաստի չա՞փն է։ Ոչ։ Արբանյակների ընդհանուր ժամի սխալը կարող է անցնել հեռախոսի ժամացույցի հաշվարկի մեջ։ Տեղիդ սխալը միայն այդ թվով չես որոշի։ Ճշգրիտ ժամանակի ու տեղորոշման համար հարաբերականության ուղղումները պետք են։

**7. corrections.** Իրական ուղեծրերում ժամանակային տարբերությունները նաև պարբերաբար փոխվում են։ Համակարգը հաշվի է առնում և՛ ընդհանուր տեմպը, և՛ այդ փոփոխությունները։ Քարտեզի կետի հետևում այս ամբողջ հաշվարկն է։

**8. closing.** Քարտեզում տեղդ պահելու համար նույնիսկ ժամանակի տեմպն են հաշվում։

<!-- script:end -->

Armenian lint: **0 errors, 0 hints** on both final `--style` runs over a temporary UTF-8 `.txt` outside
the repository containing every `text`, `screen` and `screen_small` string. Applied the earlier house-style
hint «տարբերությունը ազդանշանի» → «տարբերությունն ազդանշանի» (A1/A80), then reran twice.
Checked glossary/owner decisions and the polish checklist; U1 singular address and open wording questions remain.

Length: **8 beats, 1,495 characters (1,535 with numbers spelled out): ~104 s of speech, ~1:56 with pauses and the end tail, 9 s of them marked silent pauses.** This is the tool's planning estimate, not measured audio.

Validation: **PASS**, `python tools/validate_episode.py gps_einstein --stage script`, exit 0.
`python tools/plan_script.py gps_einstein` ran first from `03_shorts/`; the generated length line is above.
Both unchanged tool entry points ran through a Python launcher with bytecode disabled and logging sent only
to the console, so they created no log/cache files in the repository. No check was skipped or changed.

## Revision (2026-11-28)

- **Abstract hook:** starts with light travelling about 300 metres per microsecond; the unit is explained as a
  millionth of a second immediately. The 300 m is a propagation scale, not a map-error forecast.
- **Missing stakes:** added the sheet-supported light-speed conversion and returns to its scale beside the
  rounded 38-microsecond clock difference. No 10 km/day or replacement kilometre-drift claim.
- **Correct clock figures:** retains rounded -7, +45 and +38 microseconds/day, with an explicitly unadjusted
  orbital clock and Earth reference.
- **Hard-to-follow receiver and doubt:** explains the two outputs first, location and the phone's clock offset.
  Four satellite paths feed those outputs during an active pause. Only then does the one doubt limit what the
  38 figure predicts, using a plain description of shared clock error instead of an abstract common-bias lecture.
- **Weak cadastre anchor:** removed the detached national-network beat. A phone map in Yerevan now supplies the
  local anchor inside the actual timing explanation, visibly tagged as an illustration.
- **Honesty / repetition / close:** model qualification stays on screen, with one spoken inference limit where
  it matters. Real-orbit periodic corrections remain briefly stated. Nine seconds of pauses have specific viewer
  tasks; one spoken closing stays on the same phone scene.
- **Terms:** preserves provisional «ջիփիէս» for the editor's term question, U1 and still-open S1-S3.
  Adds S4 for the new propagation-scale and closing wording; no TTS pronunciation test is implied.

## Facts (checked)

Evidence base: `_knowledge/short_videos/facts_codex_4_technology_2026-11-28.md`, I1.
All used physical/receiver facts are **high confidence as qualified**. No new web fact is needed.

- **NEW: light's microsecond scale - high, derived** (`hook`, `clock_showcase`): the specification gives
  299,792,458 metres/second. Multiplying by one millionth of a second gives 299.792458 metres, voiced as
  about 300 metres per microsecond. This is a propagation distance and unit conversion, not a receiver's
  position error. [IS-GPS-200N, 2022, section 20.3.3.3.3.1](https://www.gps.gov/sites/default/files/2025-07/IS-GPS-200N.pdf).
  A microsecond is a millionth of a second, as already directly sourced in the prior draft.
  [NIST, Putting Einstein to the Test](https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test).
- **Timing and ranging - high** (`travel_time`): signal timing supplies distance relations in a simultaneous
  position and receiver-time solution. The conceptual explanation does not assert that an unsynchronised cheap
  phone clock directly gives exact independent ranges.
  [Neil Ashby, 2003, Introduction and section 6](https://link.springer.com/article/10.12942/lrr-2003-1).
- **Motion contribution - high, rounded** (`orbit`, `clock_showcase`): about -7 microseconds/day for nominal GPS
  orbital conditions relative to Earth-based reference clocks.
  [NIST, 2025](https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test).
- **Gravitational contribution and net - high, rounded** (`orbit`, `clock_showcase`): potential difference
  contributes about +45 microseconds/day; combined, an unadjusted clock gains about +38. This is not zero gravity
  in orbit or an exact figure for every instant and satellite.
  [NIST](https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test),
  [Ashby, section 5](https://link.springer.com/article/10.12942/lrr-2003-1).
- **Basic receiver solution - high** (`receiver`): four satellite measurements determine three position
  coordinates and one receiver clock offset. The voice gives the two kinds of output; the three-coordinate
  detail stays on screen. No claim that real receivers always use exactly four.
  [Ashby, section 6](https://link.springer.com/article/10.12942/lrr-2003-1).
- **Common clock error and the inference limit - high within the idealisation** (`doubt`): in Misra's identical
  circular-orbit case the common satellite-clock bias is absorbed by the receiver-clock estimate without changing
  the position estimate. The script says it *can* enter that estimate, not that every real effect cancels.
  [Pratap Misra, 2023](https://www.gpsworld.com/inside-the-box-gps-and-relativity/).
- **Real orbits and periodic correction - high** (`corrections`): eccentricity makes an additional periodic
  relativistic correction necessary. No universal amplitude or factory-adjustment cure-all is claimed.
  [IS-GPS-200N, section 20.3.3.3.3.1](https://www.gps.gov/sites/default/files/2025-07/IS-GPS-200N.pdf),
  [ESA Navipedia, 2011](https://gssc.esa.int/navipedia/index.php/Relativistic_Clock_Correction).
- **Yerevan anchor is an illustrative setting:** a viewer looking at a phone map, not measured local performance,
  a real person's whereabouts or a surveyed network map. This replaces the cadastre evidence; no claim about the
  current reference network is made in the revised script.
- **Scope:** no universal km/day position drift, countdown to failure, exact oscillator-frequency detour,
  GPS-only national-network assertion or claim every clock is identically factory-adjusted. No medium/low facts.

## Animation plan (showcase)

- **Hook / local timing:** from frame 0 show a signal, a one-microsecond timing bracket and an approximately
  300 m propagation ruler. Follow with a schematic phone marker labelled Yerevan and send/receive timing icons,
  tagged «նկարազարդում». Do not draw that 300 m as map-position uncertainty or invent route/building dimensions.
- **One showcase, `clock_showcase`:** compare Earth reference time with an unadjusted orbital clock. Build the
  opposing -7 and +45 microseconds/day bars and combine to rounded +38 over a notional day. During **5 s** the
  viewer traces the cancellation and remaining difference. Keep «կլորացված թվեր» visible. No marker drifting
  kilometres, invented visible clock-hand jump, orbital altitude or satellite-speed figure.
- **Scale and receiver extension:** retain the opening 1 microsecond / about 300 m signal ruler in a separate
  panel during the clock showcase. Four satellite paths then feed two outputs: position (three coordinate slots)
  and receiver clock offset. During **4 s** the viewer follows the paths to both outputs. The hook's conversion is
  not repeated in a separate spoken beat.
- **Single doubt:** retain the two-output picture. In the shared-bias idealisation, move the clock estimate while
  leaving the position marker fixed. Label the simple case on screen. This limits inference from the earlier
  numbers; it does not remove all real relativistic corrections.
- **Real correction and close:** a slightly noncircular orbit adds a qualitative periodic correction beside the
  ongoing rate adjustment. End on the stationary Yerevan marker with the clocks still active. The voice says
  «նույնիսկ ժամանակի տեմպն են հաշվում» within its closing sentence. No summary card.
- **9 s total marked pauses**, longest 5 s; relevant objects visible in frame 0 of every beat. These are timing
  diagrams, not orbital footage, real phone-location data or measurements of Armenian infrastructure.

## Images

Optional sheet asset: [GPS Satellite NASA art-iif.jpg](https://commons.wikimedia.org/wiki/File:GPS_Satellite_NASA_art-iif.jpg),
**public domain, PD-NASA**, credit **NASA**, visibly tagged «նկարազարդում» if used. It is artist's art, not
orbital photography. Diagrams suffice and no assets were downloaded.

## Questions for Hayk

- **S1, spoken GPS (still open; editor also asks):** approve «ջիփիէս», or prefer «ջի-փի-էս»? Existing spelling is
  retained provisionally. No TTS or paid pronunciation test was run.
- **S2, domain terms (still open):** approve «հարաբերականություն», «ժամացույցի շեղում», «հենակետային ժամացույց»,
  «հենակետային կայան»? The last two are no longer spoken after simplifying the receiver/anchor; their earlier
  question is not treated as answered. Screen «կոորդինատ» follows the glossary.
- **S3, gravity and comparison wording (still open):** keep «ձգողության պայմանների տարբերությունը» for the
  potential difference? The old «7-ով հետ, 45-ով առաջ» is now expanded with units and causes. The more technical
  «ձգողական պոտենցիալների տարբերությունը» is still an unapproved alternative absent from the glossary.
- **S4, new wording:** approve the compact hook «Լույսը՝ մոտ 300 մետր մեկ միկրովայրկյանում» and closing
  «նույնիսկ ժամանակի տեմպն են հաշվում»? The physical scale is checked; the phrasing is an owner choice.

