# Short: Leap years and the 10 skipped dates - revised script and plan

Revised for Hayk's review, 2026-11-28. Why-is-it-so strand. Script source: `beats.hy.json`.
One idea: calendar drift and its repair. One extension: Armenian Apostolic feast calendars.
No voice or animation generated.

## The idea in one paragraph

Thursday October 4 turns into Friday October 15 in the first Gregorian-adopting jurisdictions. The opening
makes that concrete puzzle visible at once; one continuous-day ribbon settles the date/time distinction without
a second spoken recap. The missing cause now has scale: Julian excess is about 11 minutes per year, roughly one
day in 128 years. The reform's ten-day adjustment has its own Nicaea reference, rather than being presented as an
exact multiplication of a modern rounded rate. The leap-year rule and a viewer choice between 1900 and 2000 show
the ongoing repair. The single doubt asks whether the new rule is perfect, ending with its much slower approximate
26-second annual excess. The local extension retains the Church's 1923 adoption, Jerusalem's exception and the
present January 6/19 correspondence for Nativity and Theophany.

## The script (Armenian)

<!-- script:start -->

9 beats, 1,374 characters (1,510 with numbers spelled out): ~99 s of speech, ~1:52 with pauses and the end tail, 10 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Հոկտեմբերի 4-ից հետո՝ 15-ը։ Հինգշաբթիից հետո սովորական ուրբաթ էր։ Օրացույցից 10 ամսաթիվ էր անհետացել։

**2. calendar_jump.** Նոր տոմարին անցած երկրներում հոկտեմբերի 4-ի հաջորդ օրը գրեցին 15։ Հետևի՛ր ներքևի շարքին՝ շաբաթվա օրերն իրար են հաջորդում։ Փոխվել են ամսաթվերը, ժամացույցը շարունակում է գնալ։ *[pause 4 s]*

**3. drift.** Ինչո՞ւ այդպես արեցին։ Հուլյան օրացույցի տարին եղանակների շրջանից տարեկան մոտ 11 րոպե երկար էր։ Մեկ տարում քիչ է թվում։ Բայց մոտ 128 տարում մի ամբողջ օր է կուտակվում։ Ուղղման պահին վերացնում էին մոտ 10 օրվա շեղում։

**4. new_rule.** Մի անգամ ամսաթվերը փոխելը բավարար չէր։ Նոր՝ գրիգորյան օրացույցը փոխեց նաև նահանջ տարվա կանոնը։ 4-ի բաժանվող տարին սովորաբար նահանջ է։ Բայց 100-ի բաժանվող տարին նահանջ է միայն այն դեպքում, երբ բաժանվում է նաև 400-ի։

**5. centuries.** Փորձի՛ր այս երկուսը՝ 1900-ը և 2000-ը։ Ո՞րն է նահանջ։ *[pause 3 s]*

**6. doubt.** 1900-ը՝ ոչ, 2000-ը՝ այո։ Ուրեմն օրացույցն արդեն կատարյա՞լ է։ Դեռ տարեկան մոտ 26 վայրկյանի տարբերություն կա։ Նախկին մոտ 11 րոպեի համեմատ շեղումը շատ ավելի դանդաղ է կուտակվում։

**7. armenian_calendar.** Նույն տարբերությունն այսօր էլ մեր տոների մեջ է երևում։ Հայ առաքելական եկեղեցին նոր տոմարն ընդունել է 1923-ին, իսկ Երուսաղեմի Հայոց պատրիարքությունը պահել է հուլյան օրացույցը։

**8. christmas.** Էջմիածնում Սուրբ Ծնունդն ու Աստվածահայտնությունը հունվարի 6-ին են։ Երուսաղեմում էլ տոնի օրը հին տոմարով հունվարի 6-ն է։ Մեր օրացույցով հիմա դա հունվարի 19-ն է։ Երկու օրացույցները կողք կողքի կարդա՛։ *[pause 3 s]*

**9. closing.** Օրացույցն ուղղում ենք, որ եղանակներից հետ չմնա։ Ժամանակը շարունակում է գնալ։

<!-- script:end -->

Armenian lint: **0 errors, 0 hints**, on both final `--style` runs over a temporary UTF-8 `.txt` outside
the repository containing every `text`, `screen` and `screen_small` string. No hints retained. Checked
terms against the glossary/owner decisions and read through the polish checklist. U1 singular address is retained;
unanswered wording choices remain below. No rule-backed lint correction was needed in the revised text.

Length: **9 beats, 1,374 characters (1,510 with numbers spelled out): ~99 s of speech, ~1:52 with pauses and the end tail, 10 s of them marked silent pauses.** This is the tool's planning estimate, not measured audio.

Validation: **PASS**, `python tools/validate_episode.py leap_years --stage script`, exit 0.
`python tools/plan_script.py leap_years` ran first from `03_shorts/`; the generated length line is above.
Both unchanged tool entry points ran through a Python launcher with bytecode disabled and logging sent only
to the console, so they created no log/cache files in the repository. No check was skipped or changed.

## Revision (2026-11-28)

- **Abstract opening / hook:** replaced the date-deletion headline with October 4 → 15 and Thursday → Friday.
  The initial-adopter qualification is visible from frame 0; the date is the puzzle itself.
- **Repeated doubt:** removed the second explanation that people did not lose lived time. The calendar
  showcase handles that once. The one doubt now tests the script's repair claim: is the new calendar perfect?
- **Drift without a number:** added about 11 minutes/year and one day/128 years. These make accumulated drift
  tangible; the reform's ten-day correction is separately tied to its stated Nicaea reference on screen.
- **Timid wording / repeated caveats:** states the well-supported calendar change and rule plainly. The
  remaining-error comparison is qualified once, with approximate values also on screen.
- **Good Armenian anchor:** retained the Church's 1923 adoption and current January 6/19 alignment; did not turn
  a church-adoption source into a civil-calendar claim.
- **Viewer action / closing:** answers to the century-year choice now follow its pause. All 10 seconds of
  marked pauses have a task; the longest is on the calendar showcase. One spoken closing, on the moving clock.
- **Terms:** preserves singular address (U1), established draft calendar words and unresolved S1-S3. No owner
  wording choice was silently marked answered.

## Facts (checked)

Evidence base: `_knowledge/short_videos/facts_codex_3_physics_earth_2026-11-28.md`, C5.
All claims used below are **high confidence as qualified**. Sources are those in the sheet; no extra research,
quotation, exact historical equinox simulation or invented adoption map is used.

- **Date change and continuing weekdays** (`hook`, `calendar_jump`): Thursday 4 October → Friday 15 October
  1582 in initial adopting jurisdictions. Ten date labels were skipped, with ordinary time and weekdays
  continuing. [USNO, Julian Date explanatory notes](https://aa.usno.navy.mil/data/JulianDate),
  [Gregory XIII, Inter gravissimas, 1582](https://en.wikisource.org/wiki/Translation:Inter_gravissimas).
- **NEW: numerical Julian drift** (`drift`): Julian average 365.25 days versus a modern approximate tropical
  year of 365.2422 days. Their rounded difference, 0.0078 day, gives approximately 11 minutes 14 seconds/year
  and one day in 128 years. Speech rounds to about 11 minutes; these are calculated comparisons, not recovered
  historical measurements. [USNO, Leap Years](https://aa.usno.navy.mil/faq/leap_years).
- **NEW: why the reform corrected ten days** (`drift`, including source line): the bull refers to about ten
  days' displacement since the Council of Nicaea. This is not all accumulated Julian error since Caesar.
  [Inter gravissimas](https://en.wikisource.org/wiki/Translation:Inter_gravissimas).
- **Gregorian rule and century examples** (`new_rule`, `centuries`, `doubt`): divisible by 4, except century
  years must also be divisible by 400; 1900 not leap, 2000 leap.
  [USNO](https://aa.usno.navy.mil/faq/leap_years).
- **NEW: approximate residual Gregorian excess** (`doubt`): 365.2425 versus 365.2422 days is calculated as about
  26 seconds/year. It establishes improvement without perfection; no inevitable future correction date is
  asserted. [USNO](https://aa.usno.navy.mil/faq/leap_years).
- **Church adoption year** (`armenian_calendar`): 1923 for the Armenian Church, with no independently checked
  decree day or civil transition claim.
  [UK and Ireland Diocese, Our Faith](https://www.armenianchurch.org.uk/our-faith).
- **Jerusalem exception** (`armenian_calendar`): Jerusalem retains the Julian calendar.
  [Official Western European church calendar explanation](https://www.armenian-church.eu/en/holidays/).
- **Combined feast and present conversion** (`christmas`): Holy Nativity and Theophany at Etchmiadzin on January
  6; Jerusalem's Julian January 6 corresponds presently to Gregorian January 19. The 2026 itinerary distinguishes
  eve and feast, January 18/19. [Mother See, January 6, 2026](https://www.armenianchurch.org/en/news/patriarchal-divine-liturgy-on-the-occasion-of-the-feast-of-the-holy-nativity-and-theophany/12110),
  [Eastern Diocese, 2026 itinerary](https://armenianchurch.us/wp-content/uploads/2025/07/HL26_011526X_43749_Armenian-Church_Chevian_005-1.pdf).
  The conversion is explicitly current, not a timeless thirteen-day rule.
- **Scope:** no British riots, perfect-calendar claim or December 25 conversion story. Historical names and
  publication years stay in `screen_small`; calendar years voiced here are the subject of the comparisons.

## Animation plan (showcase)

- **One showcase, `calendar_jump`:** frame 0 already contains the October 4/Thursday and October 15/Friday puzzle,
  qualified as the initial adoption. Lift the ten intervening date labels while the weekday ribbon and clock
  continue. In its **4 s** pause, the viewer follows the weekdays and counts the removed labels. Never fast-forward
  the clock by ten days or invent an eyewitness scene.
- **Cause and repair:** a seasonal ribbon and calendar ribbon gradually separate. Use about 11 minutes/year and
  one day/128 years as an approximate scale, not an exact animation of dated equinoxes. Keep the ten-day reform
  reference distinct. Build the 4/100/400 rule, then hold two unanswered year cards for the **3 s** choice pause;
  only `doubt` reveals 1900 no / 2000 yes.
- **One doubt:** show the remaining approximate 26 seconds/year against the earlier 11 minutes. It addresses
  perfection of the repair, without replaying the calendar-jump explanation.
- **Local extension:** branch the church calendar into Gregorian and Jerusalem Julian practice. The 1923 label
  belongs to Church adoption. Align Jerusalem's January 6 Julian and January 19 Gregorian on the same day axis;
  keep Etchmiadzin's Gregorian January 6 separate. The **3 s** pause lets the viewer read the aligned labels.
- **Closing:** return to the moving clock. Voice says «Ժամանակը շարունակում է գնալ» on that same scene.
  No summary card. **10 s total marked pauses**, longest 4 s. Every beat begins with its relevant object.

## Images

Optional sheet asset: [File:Inter-grav.jpg](https://commons.wikimedia.org/wiki/File:Inter-grav.jpg), **public domain**.
Identify it as the bull's first page, not a picture of the date change. Calendar diagrams suffice; no assets
downloaded. Recheck the credit panel if fetched.

## Questions for Hayk

- **S1, plain astronomical wording (still open):** keep «եղանակների շրջանը», or introduce «արևադարձային տարի»?
  The glossary has no tropical-year entry. The intended meaning is the seasonal year, not a star-relative orbit.
- **S2, calendar terms (still open):** approve «նահանջ տարի», «հուլյան օրացույց», «գրիգորյան օրացույց»?
  The original closing personification «Օրացույցն է փորձում հասնել եղանակներին» is no longer used; no owner
  decision on that wording is inferred.
- **S3, local extension (still open):** keep the explicit 1923 adoption sentence and full combined-feast name?
  Both remain. The precise ecclesiastical decree date is unverified and omitted.
