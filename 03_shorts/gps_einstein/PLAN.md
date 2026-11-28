# Short: GPS needs Einstein - script and plan

Draft for Hayk's review, 2026-11-28. Why-is-it-so strand. Script source: `beats.hy.json`. One clock-comparison
showcase; one extension distinguishing clock offset from position error. Armenia's surveying network is the
local anchor. No voice or animation generated.

## The idea in one paragraph

GPS finds position by timing satellite signals, but orbital clocks and Earth-reference clocks do not run at the
same rate. The showcase combines rounded daily contributions: motion about -7 microseconds, gravitational
potential about +45, net about +38 for an unadjusted clock. The doubt beat then asks exactly what this permits us
to infer: clock error is not a universal position-error trajectory, because receivers estimate their clock bias
alongside position. Four satellites supply the basic four-unknown solution, and real noncircular orbits need
additional time corrections. Armenia's documented reference-station network connects satellite measurement to a
local use without inventing its performance or attributing the relativity correction to it.

## The script (Armenian)

<!-- script:start -->

9 beats, 1,651 characters (1,697 with numbers spelled out): ~115 s of speech, ~2:08 with pauses and the end tail, 10 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Տեղդ գտնում են ժամացույցով։ Հեռախոսիդ ջիփիէսի համար կարևոր է, թե երբ է արբանյակն ազդանշանն ուղարկել, ու երբ ես այն ստացել։

**2. travel_time.** Ազդանշանի ճանապարհի ժամանակից կարելի է հաշվել հեռավորությունը։ Մի քանի արբանյակից ստացած տվյալներով ընդունիչը որոշում է տեղդ։ Բայց այստեղ մի անակնկալ կա՝ ուղեծրում ժամացույցը նույն տեմպով չի գնում, ինչ Երկրի վրա։

**3. motion.** Շարժման պատճառով արբանյակի ժամացույցը Երկրի վրա հենակետային ժամացույցի համեմատ դանդաղում է։ Ջիփիէսի սովորական ուղեծրի համար դա օրական մոտ 7 միկրովայրկյան է։ Միկրովայրկյանը վայրկյանի միլիոնական մասն է։ *[pause 1 s]*

**4. gravity.** Իսկ ձգողության պայմանների տարբերությունը հակառակ ազդեցությունն ունի։ Երկրի մակերևույթից բարձր՝ արբանյակի ուղեծրում, ժամացույցն ավելի արագ է գնում։ Այս ներդրումն օրական մոտ 45 միկրովայրկյան է։

**5. clock_showcase.** Հիմա համեմատի՛ր՝ 7-ով հետ, 45-ով առաջ։ Ո՞րն է մեծ։ Չուղղված ժամացույցը գումարային հաշվով օրական մոտ 38 միկրովայրկյան առաջ կընկներ։ Սա ժամացույցի տարբերություն է, որը համակարգը պետք է հաշվի առնի։ *[pause 4 s]*

**6. doubt.** Այդ 38-ից կարո՞ղ ենք ասել, թե տեղդ քանի մետրով կսխալվի։ Ոչ։ Ընդունիչը հաշվում է նաև իր ժամացույցի շեղումը։ Մի քանի արբանյակի համար ընդհանուր ժամանակային սխալը կարող է արտահայտվել հենց այդ հաշվարկում։ Ժամի սխալը դեռ տեղիդ սխալի չափը չէ։ *[pause 2 s]*

**7. receiver.** Հիմնական հաշվարկում պետք են 4 արբանյակի տվյալներ՝ տեղիդ 3 կոորդինատն ու ժամացույցիդ շեղումը գտնելու համար։ Իրական ուղեծրերն էլ կատարյալ շրջաններ չեն, և դրանց հետ կապված լրացուցիչ ժամանակային ուղղումներ են պետք։

**8. armenia.** Հայաստանում էլ արբանյակային չափումները կապվում են հենակետային կայանների ցանցի հետ։ Կադաստրի կոմիտեն նկարագրում է ամբողջ երկրի համար ստեղծված այդ ցանցը։ Ճշգրիտ տեղը որոշելու համար ճշգրիտ ժամանակի հաշվարկ է պետք։ *[pause 2 s]*

**9. closing.** Քարտեզի կետի հետևում ժամանակի հաշվարկ կա։ Նույնիսկ երբ դու տեղում կանգնած ես։ *[pause 1 s]*

<!-- script:end -->

Armenian lint: **0 errors, 0 hints** on the final UTF-8 extraction of every `text`, `screen` and `screen_small`
string. No hints retained. Applied the initial house-style hint «ներդրումը օրական» → «ներդրումն օրական» (A1/A80).
Read through the polish checklist and reran `--style` after the final edits. Wording choices remain in S1-S3 below.

Length: **9 beats, 1,651 characters; ~115 s speech; ~2:08 total; 10 s marked pauses**, as generated above. Under
the tool's speech-plus-pauses ceiling.

Validation: **PASS**, `tools/validate_episode.py gps_einstein --stage script`, final exit code 0. The original
`plan_script.py` and validator entry points ran from `03_shorts/` through a Python launcher with bytecode disabled
and `runlog.REPO` redirected to this episode folder, keeping tool logs inside the permitted write scope. Lint
inputs are in the system temporary directory outside the repository.

## Facts (checked)

Evidence base: `_knowledge/short_videos/facts_codex_4_technology_2026-11-28.md`, I1. All used sheet claims are
**high confidence**. Ashby, NIST, Misra and the Cadastre Committee page were also reopened online during drafting.
The microsecond definition was additionally verified directly in NIST's explanation.

- **Timing and ranging** (`hook`, `travel_time`): departure/arrival timing and signal propagation allow distance
  equations and a simultaneous position/time solution. «Ժամանակից կարելի է հաշվել հեռավորությունը» is the
  conceptual relation; it does not claim an inexpensive unsynchronised receiver directly measures exact ranges
  without estimating its own clock bias. [Neil Ashby, 2003, Introduction and section 6](https://link.springer.com/article/10.12942/lrr-2003-1).
- **Motion contribution - rounded** (`motion`): for nominal GPS conditions, approximately -7 microseconds/day
  relative to Earth-reference clocks. [NIST, Putting Einstein to the Test, 2025](https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test).
- **Microsecond definition - additional direct check** (`motion`): NIST explicitly explains microseconds as millionths
  of a second. This is a unit definition, not an additional observed GPS error.
  [NIST](https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test), opened 2026-11-28.
- **Gravitational contribution and net - rounded** (`gravity`, `clock_showcase`): the difference in gravitational
  potential between orbit and Earth reference gives about +45 microseconds/day; together with the motion
  contribution the unadjusted clock gains about +38 microseconds/day. The phrase «ձգողության պայմանների
  տարբերությունը» is the plain-language rendering of potential difference, not a statement that there is no
  gravity in orbit. [NIST](https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test),
  [Ashby, section 5](https://link.springer.com/article/10.12942/lrr-2003-1).
- **Clock error versus position error** (`doubt`): the receiver estimates its own clock bias. In Misra's explicitly
  idealised identical circular-orbit case, the common satellite-clock bias is absorbed in that estimate without
  moving the position estimate. This does not remove all real relativistic corrections.
  [Pratap Misra, 2023, original engineering analysis](https://www.gpsworld.com/inside-the-box-gps-and-relativity/).
  The narration limits this to a common component that *can* enter the clock estimate; the diagram is labelled
  idealised. Neither the familiar 10 km/day claim nor a substitute 11 km/day position claim is used.
- **Basic receiver solution** (`receiver`): measurements from 4 satellites determine 3 position coordinates and
  1 receiver clock bias. [Ashby, section 6](https://link.springer.com/article/10.12942/lrr-2003-1).
  This is the basic solution, not a claim that every receiver uses exactly four satellites at all times.
- **Real-orbit correction** (`receiver`): eccentricity introduces an additional periodic relativistic correction.
  [IS-GPS-200N, 2022, section 20.3.3.3.3.1](https://www.gps.gov/sites/default/files/2025-07/IS-GPS-200N.pdf),
  [ESA Navipedia, Sanz Subirana, Juan Zornoza and Hernández-Pajares, 2011](https://gssc.esa.int/navipedia/index.php/Relativistic_Clock_Correction).
  The script supplies no universal amplitude, failure countdown or claim that a factory offset handles everything.
- **Armenian anchor** (`armenia`): the Cadastre Committee describes a national satellite geodetic network and
  real-time reference stations created for the entire territory in 2013. The page is dated 2026; 2013 is the network
  creation year on the source line. [Cadastre Committee, Geodesy](https://cadastre.gov.am/en/articles/%D5%A3%D5%A5%D5%B8%D5%A4%D5%A5%D5%A6%D5%AB%D5%A1/geodesy).
  No accuracy number, station location, GPS-only equipment claim, or present operational-status guarantee is added.
- **Medium-or-lower claims used:** none. No exact oscillator-frequency example, generic factory-adjustment claim,
  clock-to-kilometre conversion, or receiver failure time is voiced or animated.

## Animation plan (showcase)

- **One showcase, `clock_showcase`:** frame 0 already contains the two clock-offset bars. Over a notional day,
  combine the rounded -7 and +45 microseconds/day contributions and expose the rounded net +38. Keep
  «կլորացված թվեր» and the Earth-reference comparison visible. Hold for the 4 s pause so the viewer can compare
  the opposing bars and read the sum. The orbital clock is explicitly unadjusted. Do not animate a location
  marker travelling kilometres, or make a real-time clock hand jump by an invented visible amount.
- **Supporting beats:** the hook begins with a location point, signal and clocks. `travel_time` shows schematic
  propagation paths. `motion` and `gravity` build the showcase's ingredients with no invented orbital altitude,
  speed or absolute gravitational value. The gravitational-potential shading is qualitative.
- **Doubt extension:** keep position and receiver-clock estimate separate. A common timing component shifts the
  latter in a diagram labelled «Իդեալականացված օրինակ». During the 2 s pause let the viewer inspect the separate
  outputs. The following four-satellite diagram has 3 coordinate slots and 1 clock-bias slot; a noncircular orbit
  indicates an additional qualitative periodic correction without an invented numerical amplitude.
- **Local scene and close:** use an outline of Armenia and schematic reference-station symbols, explicitly labelled
  as a scheme, never claimed station coordinates. Its 2 s pause allows reading the source line. Return to the
  stationary phone point with time still advancing; voice and closing screen line match. No summary card.
- Total marked pauses: 10 s; longest: 4 s on the showcase. All beats begin with a relevant object in frame 0.
  These are explanatory diagrams, not purported orbital footage or surveyed network maps.

## Images

- Optional sheet asset: [File:GPS Satellite NASA art-iif.jpg](https://commons.wikimedia.org/wiki/File:GPS_Satellite_NASA_art-iif.jpg),
  **public domain, PD-NASA**. Credit **NASA**, and visibly label it «նկարազարդում» if used: it is an artist's conception.
  The current beats can use original schematic vectors instead. No images downloaded; preserve the source and
  recheck the Commons credit panel during asset preparation.

## Questions for Hayk

- **S1, spoken GPS:** approve «ջիփիէս» as the Armenian-letter reading, or prefer «ջի-փի-էս»? The voice has no Latin
  letters. No TTS pronunciation test was run under the task's limits.
- **S2, missing domain terms:** approve «հարաբերականություն», «ժամացույցի շեղում», «հենակետային ժամացույց» and
  «հենակետային կայան»? They are absent from the supplied math glossary; «կոորդինատ» follows its coordinate entry.
- **S3, gravity and comparison wording:** keep «ձգողության պայմանների տարբերությունը» for gravitational-potential
  difference and «7-ով հետ, 45-ով առաջ» for the paired clock contributions? These are plain draft choices. A more
  technical alternative is «ձգողական պոտենցիալների տարբերությունը», also absent from the glossary.

