# Short: Chocolate reveals microwave hot spots - revised script and plan

Revised for Hayk's review, 2026-11-28. Why-is-it-so strand. Script source: `beats.hy.json`.
One idea: uneven microwave fields leave visible heating patterns. One extension: rotating food through them.
The molecular explanation supports the same mechanism. No voice, physical experiment or animation generated.

## The idea in one paragraph

Chocolate softening in patches opens a concrete puzzle. Reflected microwaves form stronger and weaker field
regions; a simple standing-wave model makes their scale visible, with about 6 cm between neighbouring heating
antinodes and about 12 cm for a full free-space wavelength. A short molecular zoom explains energy transfer and
directly rejects the special-water-resonance myth. The one doubt tests the script's numerical model: real ovens
need not give precisely 6 cm; Jefferson Lab's actual demonstration measured 7.1 cm. The voice ends that doubt
on what the patches reveal: nonuniform heating. The single extension returns to the retained local anchor,
a tolma plate, so the viewer can track a rotating piece through different regions. No light-speed-measurement
detour, invention anecdote or claim that rotation ensures identical temperatures.

## The script (Armenian)

<!-- script:start -->

8 beats, 1,445 characters (1,505 with numbers spelled out): ~102 s of speech, ~1:54 with pauses and the end tail, 10 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Ինչո՞ւ է շոկոլադը կետերով հալվում։ Վառարանում այն տեղից չի շարժվում, իսկ որոշ տեղեր ավելի շուտ են տաքանում։ Այդպես անտեսանելի ալիքը հետք է թողնում։

**2. field.** Միկրոալիքները մետաղական պատերից անդրադառնում ու իրար են գումարվում։ Տեղեր կան, որտեղ էլեկտրական դաշտի տատանումն ուժեղ է, տեղեր՝ թույլ։ Անշարժ շոկոլադի ուժեղ դաշտում ընկած մասերն ավելի արագ են տաքանում։

**3. spacing.** Հետևի՛ր երկու հարևան տաք կետերին։ Պարզ կանգուն ալիքի մոդելում նրանց միջև կես ալիքի երկարություն է՝ մոտ 6 սանտիմետր։ Մեկ ամբողջ ալիքը մոտ 12 սանտիմետր է։ Աչքով միացրո՛ւ այդ երկու կեսերը։ *[pause 4 s]*

**4. water.** Բայց ինչո՞ւ է ուտելիքն ընդհանրապես տաքանում։ Փոփոխվող դաշտը ջրի մոլեկուլներին փորձում է իր ուղղությամբ շրջել։ Դրանք փոխազդում են հարևանների հետ, և ստացած էներգիայի մի մասը ջերմություն է դառնում։ Լուծված աղերի իոններն էլ կարող են մասնակցել։

**5. frequency.** Սովորական վառարանի հաճախությունը մոտ 2,45 գիգահերց է։ Դա ջրի հատուկ ռեզոնանսը չէ։ Այդ ընտրությունը թույլ է տալիս էներգիային օգտակար խորությամբ ներթափանցել սննդի մեջ։

**6. doubt.** Ուրեմն ամեն վառարանում կետերի միջև հենց 6 սանտիմե՞տր է։ Ոչ։ Իրական ցուցադրության մեջ չափել են 7,1 սանտիմետր։ Վառարանի ձևը, ուտելիքն ու ջերմության տարածումը բարդացնում են պատկերը։ Հալման կետերը ցույց են տալիս դաշտի անհավասարությունը։ *[pause 2 s]*

**7. turntable.** Հիմա շոկոլադի փոխարեն տոլմա պատկերացրո՛ւ։ Ափսեն պտտվում է։ Հետևի՛ր նշված կտորին՝ ուժեղ դաշտից անցնում է ավելի թույլ դաշտի մեջ։ Պտույտը մեղմում է անհավասար տաքացումը, թեև ամեն տեղ նույն ջերմաստիճանը չի ապահովում։ *[pause 4 s]*

**8. closing.** Ափսեդ պտտվում է, որ ճաշիդ նույն կտորը միշտ նույն տաք կետում չմնա։

<!-- script:end -->

Armenian lint: **0 errors, 0 hints**, on both final `--style` runs over a temporary UTF-8 `.txt` outside
the repository containing every `text`, `screen` and `screen_small` string. No hints retained. Checked
terms against the glossary/owner decisions and read through the polish checklist. U1 singular address is retained;
unanswered wording choices remain below. No rule-backed lint correction was needed in the revised text.

Length: **8 beats, 1,445 characters (1,505 with numbers spelled out): ~102 s of speech, ~1:54 with pauses and the end tail, 10 s of them marked silent pauses.** This is the tool's planning estimate, not measured audio.

Validation: **PASS**, `python tools/validate_episode.py microwave --stage script`, exit 0.
`python tools/plan_script.py microwave` ran first from `03_shorts/`; the generated length line is above.
Both unchanged tool entry points ran through a Python launcher with bytecode disabled and logging sent only
to the console, so they created no log/cache files in the repository. No check was skipped or changed.

## Revision (2026-11-28)

- **Abstract opening:** replaced the generic turning-plate question with chocolate melting in patches. The
  planned illustration is visibly tagged «մոդելավորում» from frame 0; no actual experiment is falsely claimed.
- **Missing strongest showcase:** added adjacent heating antinodes, a half-wavelength of about 6 cm and a full
  wavelength of about 12 cm, then the rotation of food through the same spatial pattern.
- **Missing myth correction:** directly says 2.45 GHz is not a special resonance of water, next to the positive
  explanation of changing fields, interactions and energy transfer. Does not introduce the myth as fact.
- **Kitchen precision caveat:** one doubt now addresses the model's 6 cm prediction, with Jefferson Lab's real
  7.1 cm measurement. No theoretical value is passed off as a kitchen observation; no extra wave-speed claim.
- **Nice tolma anchor:** retained inside the mechanism. The viewer tracks one piece through stronger and weaker
  regions rather than hearing a separate announcement that the example is invented.
- **Repetition / honesty:** cut the separate field/heat setup into a focused molecular zoom. Tags carry the
  model/illustration status; the single sentence on rotation's limits stays with the rotation claim.
- **Terms and structure:** retains provisional «հաճախություն» pending S2, rather than silently substituting a
  physics term. S4 adds new wave/resonance vocabulary. U1, 10 s of active pauses and one spoken close are retained.

## Facts (checked)

Evidence base: `_knowledge/short_videos/facts_codex_7_physics_everyday_2026-11-28.md`, P4.
All used physics facts are **high confidence as scoped**; model-dependent statements remain explicitly modelled.

- **Standing patterns and rotation - high** (`hook`, `field`, `turntable`, `closing`): metal-wall reflections
  create nonuniform fields; rotating food through different regions improves averaging without ensuring a
  uniform temperature. Some ovens use a mode stirrer instead. The depicted oven is specifically turntable-equipped.
  [Michael Vollmer, 2004, p. 77](https://users.wfu.edu/natalie/s24phy712/lecturenote/physics_of_microwave_ovens.pdf).
- **Nominal operating frequency - high** (`frequency`): 2.45 GHz for most conventional domestic ovens, not the mains
  frequency. [CCOHS, revised 2024](https://www.ccohs.ca/oshanswers/phys_agents/microwave_ovens.html).
- **NEW: full wavelength - high, calculated** (`spacing`): the exact light speed 299,792,458 m/s and 2.45 GHz give
  approximately 12.24 cm in free space, rounded to about 12 cm in speech/screen. This is not the wavelength inside
  every food. [NIST CODATA light speed](https://physics.nist.gov/cgi-bin/cuu/Value?c%7Csearch_for=c).
- **NEW: neighbouring heating antinodes - high in the simple standing-wave model** (`spacing`): separated by
  half a wavelength, approximately 6.12 cm at 2.45 GHz, rounded to about 6 cm. Both field signs at antinodes heat;
  the sign does not distinguish hot from cold.
  [Jefferson Lab, chocolate experiment](https://stem-tools.jlab.org/frost/speed_of_light),
  [NIST](https://physics.nist.gov/cgi-bin/cuu/Value?c%7Csearch_for=c).
- **NEW: actual demonstration and rough measurement - high** (`doubt`): Jefferson Lab measured 7.1 cm and reported
  17% error in its wave-speed result. Only its measured spacing is used here; cavity geometry, loading and heat
  spreading complicate the ideal comparison. No experiment was performed for this draft.
  [Jefferson Lab transcript](https://stem-tools.jlab.org/frost/speed_of_light).
- **Heating mechanism - high** (`water`): changing fields exert a turning influence on dipoles; response,
  interactions and lag dissipate energy. Dissolved ions also contribute. No freely spinning propellers or
  2.45 billion complete rotations per molecule are claimed.
  [Christopher S. Baird, 2014](https://www.wtamu.edu/~cbaird/sq/2014/10/15/why-are-the-microwaves-in-a-microwave-oven-tuned-to-water/),
  [Vollmer, pp. 78-79](https://users.wfu.edu/natalie/s24phy712/lecturenote/physics_of_microwave_ovens.pdf).
- **NEWLY VOICED: no special water resonance - high** (`frequency`): 2.45 GHz is not water's special resonant
  frequency. The direct correction uses Baird; the sheet's broad, temperature-dependent loss feature near 20 GHz
  is deliberately not another numerical detour.
  [Baird](https://www.wtamu.edu/~cbaird/sq/2014/10/15/why-are-the-microwaves-in-a-microwave-oven-tuned-to-water/).
- **NEW: engineering suitability and allocation - high; complete historical selection story not claimed**
  (`frequency`, including source line): useful penetration depth and the allocated ISM band both matter. Voice
  gives the penetration benefit; the source line notes the allocation. No claim of a single original reason.
  [Vollmer, p. 79](https://users.wfu.edu/natalie/s24phy712/lecturenote/physics_of_microwave_ovens.pdf),
  [47 CFR 18.301, 2025, table at p. 1129](https://www.govinfo.gov/content/pkg/CFR-2025-title47-vol1/pdf/CFR-2025-title47-vol1-part18.pdf).
- **Local anchor is an illustrative choice, not new physical data** (`turntable`, `closing`): retain the existing
  tolma plate. No recipe, composition, temperature, cooking time or origin claim is made. «Պատկերացրո՛ւ» and the
  screen tag establish the example without a separate spoken invention disclaimer.
- **Scope:** no candy anecdote, disputed commercial year, exclusive frequency-selection history, radioactive-food
  myth, inside-out heating claim or guaranteed centimetre spacing. No medium/low-confidence history is used.

## Animation plan (showcase)

- **One continuous spatial showcase:** start with stationary chocolate already showing patches, tagged
  «մոդելավորում». Add reflected waves and a simple one-dimensional standing field. Both signs of the field at
  antinodes cause heating; nodes remain weaker. No actual oven recording or measured thermal map is implied.
- **Visible size, `spacing`:** bracket two neighbouring heating antinodes at about 6 cm, then a second half-wave
  to make about 12 cm. Explain these as rounded theoretical free-space values at 2.45 GHz, not in-food wavelengths.
  During the longest **4 s** pause the viewer traces the two halves. Do not claim every oven repeats this geometry.
- **Supporting molecular zoom:** show crowded interacting dipoles lagging behind the changing field, alongside
  dissolved ions. The animation is slowed and schematic, not a measured molecular-motion rate. The frequency
  panel directly rejects special-water resonance and shows useful penetration qualitatively, without centimetre
  depths or a new historical story.
- **One numerical doubt:** separate the model's about 6 cm from an attributed Jefferson Lab 7.1 cm result card.
  During **2 s** the viewer compares them. No invented local experiment, exact speed-of-light result or precise
  thermometer scale.
- **Tolma extension:** continue from stationary chocolate to a drawn rotating plate, tagged «նկարազարդում».
  During **4 s** track one highlighted non-central piece through a nonuniform schematic field. Avoid concentric
  uniform rings, identical sampling paths or claims of perfectly even temperatures.
- **Closing:** keep that same plate moving. Voice says «նույն կտորը միշտ նույն տաք կետում չմնա» within the closing
  sentence. No summary card. **10 s total marked pauses**, longest 4 s. Objects appear from each beat's frame 0.

## Images

No downloads. The sheet's optional [NS Savannah microwave oven](https://commons.wikimedia.org/wiki/File:NS_Savannah_microwave_oven_MD8.jpg)
is **Acroterion, CC BY-SA 4.0**. It is not needed for this mechanism-focused draft and must not be portrayed as
Spencer's original apparatus. The chocolate display is an original tagged model; the 7.1 cm result is credited data.

## Questions for Hayk

- **S1, physics vocabulary (still open):** approve «միկրոալիքային վառարան», «էլեկտրամագնիսական ալիք»,
  «էլեկտրական դաշտ», «մոլեկուլ», «իոն», «գիգահերց»? Some longer labels have been cut from voice; no owner
  approval is inferred. These domain entries were absent from the supplied glossary.
- **S2, frequency (still open; editor also asks):** keep glossary «հաճախություն», or use physics
  «հաճախականություն» for Hz? The revision keeps the existing provisional word. «Տատանում» follows the glossary.
- **S3, local example and ending (still open):** keep the tolma plate? The older close
  «ճաշդ անցնում է անտեսանելի ալիքների միջով» has been replaced with the same-piece/hot-spot line; no wording
  decision on the old phrase is assumed. Is the revised close suitable?
- **S4, new wave terms:** approve «կանգուն ալիք», «ալիքի երկարություն», «տաք կետ», «ռեզոնանս»?
  The glossary has «ալիքի հավասարում», but no matching entries for these physical concepts.

