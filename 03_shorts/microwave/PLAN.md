# Short: How a microwave oven heats food, and why the plate turns - script and plan

Draft for Hayk's review, 2026-11-28. Why-is-it-so strand. Script source: `beats.hy.json`. One continuous field-and-
turntable showcase; one extension from the heating mechanism to uneven heating. No voice or animation generated.

## The idea in one paragraph

An imagined plate of tolma supplies the local kitchen anchor and the opening puzzle: why does the plate turn?
The explanation starts with a changing electric field acting on interacting water molecules and transferring
energy into heat; water is important but not the only absorber. The single extension zooms out to the cavity:
reflections produce stronger and weaker field regions, and the turntable moves food through them. The viewer
tracks a marked tolma piece through the pattern. The doubt beat asks whether this guarantees equal temperatures;
it improves averaging but does not guarantee uniform heating. No water-resonance, freely spinning molecules,
candy-bar anecdote, or kitchen light-speed measurement is introduced.

## The script (Armenian)

<!-- script:start -->

8 beats, 1,409 characters (1,447 with numbers spelled out): ~98 s of speech, ~1:51 with pauses and the end tail, 10 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Ինչո՞ւ է ափսեդ պտտվում։ Պատկերացրո՛ւ՝ տոլմա ես տաքացնում միկրոալիքային վառարանում։ Պտույտը ճաշդ անտեսանելի ալիքների տարբեր մասերով է անցկացնում։

**2. field.** Ներսում միկրոալիքներ են՝ էլեկտրամագնիսական ալիքներ։ Դրանց էլեկտրական դաշտն անընդհատ փոխում է ուղղությունը։ Սովորական կենցաղային վառարանների հաճախությունը մոտ 2,45 գիգահերց է։ *[pause 1 s]*

**3. water.** Ճաշի ջրի մոլեկուլները դրան արձագանքում են։ Էլեկտրական լիցքը նրանց մեջ անհավասար է բաշխված, և դաշտը փորձում է դրանք շրջել իր ուղղությամբ։ Բայց հեղուկի մեջ մոլեկուլները մենակ չեն՝ հարևանների հետ փոխազդում են։

**4. heat.** Դաշտից ստացած էներգիայի մի մասը վերածվում է ջերմության։ Այդպես ճաշը տաքանում է։ Ջուրը մեծ դեր ունի, բայց միակ նյութը չէ, որ կարող է կլանել էներգիան։ Լուծված աղերի իոններն էլ կարող են մասնակցել տաքացմանը։

**5. hot_spots.** Հիմա նայի՛ր ամբողջ վառարանին։ Ալիքները մետաղական պատերից անդրադառնում ու իրար են գումարվում։ Տեղեր կան, որտեղ դաշտի տատանումն ուժեղ է, տեղեր՝ թույլ։ Դրա համար նույն ճաշի տարբեր մասերը կարող են տարբեր չափով տաքանալ։ *[pause 2 s]*

**6. turntable.** Պտտվող ափսեն ճաշը տեղափոխում է այդ տարբեր տեղերով։ Հետևի՛ր տոլմայի մի կտորին՝ հիմա ուժեղ դաշտում է, հետո՝ ավելի թույլ։ Պտույտն օգնում է, որ ճաշի նույն մասը միշտ նույն տեղում չմնա։ *[pause 4 s]*

**7. doubt.** Ուրեմն պտտվելուց հետո ամեն տեղ նույնքան տա՞ք է։ Պարտադիր չէ։ Իրական վառարանի դաշտն ավելի բարդ է, և ճաշի ձևն ու բաղադրությունն էլ են ազդում։ Պտույտը մեղմում է անհավասար տաքացումը, բայց լիովին չի վերացնում։ *[pause 2 s]*

**8. closing.** Հաջորդ անգամ ափսեի պտույտին նայելիս հիշի՛ր՝ ճաշդ անցնում է անտեսանելի ալիքների միջով։ *[pause 1 s]*

<!-- script:end -->

Armenian lint: **0 errors, 0 hints** on the final UTF-8 extraction of every `text`, `screen` and `screen_small`
string. No hints retained. Applied the initial house-style hint «Պտույտը օգնում» → «Պտույտն օգնում» (A1/A80).
Read through the polish checklist and reran `--style` after the final edits. Wording choices remain in S1-S3 below.

Length: **8 beats, 1,409 characters; ~98 s speech; ~1:51 total; 10 s marked pauses**, as generated above. Under
the tool's speech-plus-pauses ceiling.

Validation: **PASS**, `tools/validate_episode.py microwave --stage script`, final exit code 0. The original
`plan_script.py` and validator entry points ran from `03_shorts/` through a Python launcher with bytecode disabled
and `runlog.REPO` redirected to this episode folder, keeping tool logs inside the permitted write scope. Lint
inputs are in the system temporary directory outside the repository.

## Facts (checked)

Evidence base: `_knowledge/short_videos/facts_codex_7_physics_everyday_2026-11-28.md`, P4. All used sheet claims are
**high confidence**. Vollmer's article and Baird's university explanation were also read online during drafting.
The local food connection is an additional web check, explicitly separated from the physical example.

- **Frequency** (`field`): most conventional domestic ovens nominally operate at 2.45 GHz. This is neither the
  mains frequency nor a special resonant frequency of water. [CCOHS, Microwave Ovens, revised 2024](https://www.ccohs.ca/oshanswers/phys_agents/microwave_ovens.html),
  [Vollmer, 2004, p. 74](https://users.wfu.edu/natalie/s24phy712/lecturenote/physics_of_microwave_ovens.pdf),
  [Baird, 2014](https://www.wtamu.edu/~cbaird/sq/2014/10/15/why-are-the-microwaves-in-a-microwave-oven-tuned-to-water/).
  The nominal-frequency statement is the only numerical physics value displayed or voiced.
- **Dielectric heating** (`water`, `heat`): the changing field acts on molecular dipoles. Neighbour interactions
  and lag cause energy dissipation; the animation must not equate field oscillations with complete molecular
  rotations. The plain charge-distribution explanation replaces an unexplained dipole label.
  [Vollmer, pp. 78-79](https://users.wfu.edu/natalie/s24phy712/lecturenote/physics_of_microwave_ovens.pdf),
  [Baird](https://www.wtamu.edu/~cbaird/sq/2014/10/15/why-are-the-microwaves-in-a-microwave-oven-tuned-to-water/).
- **Other absorbers** (`heat`): dissolved ions and other constituents can contribute; the draft does not say only
  water heats. [Vollmer, p. 79](https://users.wfu.edu/natalie/s24phy712/lecturenote/physics_of_microwave_ovens.pdf).
- **Standing patterns and turntable** (`hook`, `hot_spots`, `turntable`): wall reflections produce spatially uneven
  fields. A turntable moves food through different regions and improves averaging. Some designs instead use a
  mode stirrer, so the opening is explicitly this imagined turntable-equipped oven, not a universal design claim.
  [Vollmer, p. 77](https://users.wfu.edu/natalie/s24phy712/lecturenote/physics_of_microwave_ovens.pdf).
- **Limits of the simplified image** (`doubt`): real cavity fields and the food's loading and dielectric properties
  are more complex. Rotation does not guarantee an even temperature. The animation is qualitative, without a
  supposedly universal hot-spot spacing or an invented measured heat map.
  [Vollmer, pp. 77-79](https://users.wfu.edu/natalie/s24phy712/lecturenote/physics_of_microwave_ovens.pdf),
  [Baird, load-dependent field/frequency discussion](https://www.wtamu.edu/~cbaird/sq/2014/10/15/why-are-the-microwaves-in-a-microwave-oven-tuned-to-water/).
- **Additional local anchor, verified on the web** (`hook`, `turntable`, `closing`): the Tourism Committee's official
  guide identifies tolma as a traditional Armenian dish. [Armenia Travel, Armenian Cuisine](https://armenia.travel/things-to-do/armenian-cuisine/),
  opened 2026-11-28. The reheating scene begins «Պատկերացրո՛ւ»: it is an illustrative application of the mechanism,
  not an experiment on tolma or a claim about its cooking time, temperature, composition percentages, or origin.
- **Medium-or-lower claims used:** none. The medium-confidence historical selection story, candy anecdote and
  disputed commercial-launch dates are omitted. No additional biography or invention-history extension is used.

## Animation plan (showcase)

- **One continuous showcase, `hot_spots` into `turntable`:** frame 0 of `hot_spots` contains the cavity and reflected
  wave arrows. Build a simplified standing-field section, distinguishing strong and weak oscillation regions.
  Positive and negative field antinodes both heat; field sign is not a hot/cold distinction. Move out to the plate
  and follow a marked tolma piece along a non-central circular path through the qualitative pattern. Keep
  «Պարզեցված պատկեր» visible. The 2 s field pause is for comparing regions; the longest pause, 4 s, continues the
  same showcase so the viewer can follow the marked piece. Do not draw concentric uniform rings that rotation
  cannot move the marked piece across, or imply all paths sample identical fields.
- **Supporting beats:** `hook` has the tolma and rotating plate in frame 0, labelled «նկարազարդում». `field` slows the
  arrow reversals explicitly; the animation speed is not 2.45 GHz. `water` starts with neighbouring dipoles and
  shows lag and interactions; `heat` adds ion motion and a qualitative heat tint, not free-propeller molecules.
- **Doubt and closing:** retain a visibly uneven tint after rotation, with no asserted temperature scale. Allow
  2 s to inspect it. Return to the same imaginary plate, say the closing screen line, and fade the field overlay.
  Keep the illustration label. No summary card. Total marked pauses: 10 s; longest: 4 s on the showcase.
- No chocolate experiment, fixed centimetre spacing, measured cooking time, inside-out claim or historical
  laboratory scene. Every beat begins on a relevant object rather than a title-only frame.

## Images

- The sheet offers [File:NS Savannah microwave oven MD8.jpg](https://commons.wikimedia.org/wiki/File:NS_Savannah_microwave_oven_MD8.jpg),
  **Acroterion**, **CC BY-SA 4.0 International**. It shows the Raytheon oven aboard NS Savannah, not Spencer's original
  experimental apparatus. **Not used in this draft**: the kitchen and field diagrams serve the idea without a
  second historical strand. No images downloaded. If used later, preserve the source's attribution/share-alike
  requirements and identify the depicted oven accurately.

## Questions for Hayk

- **S1, physics vocabulary:** approve «միկրոալիքային վառարան», «էլեկտրամագնիսական ալիք», «էլեկտրական դաշտ»,
  «մոլեկուլ», «իոն», and «գիգահերց»? Those physics-specific entries are absent from the supplied math glossary.
  They are kept as draft choices, not silently treated as owner-approved terms.
- **S2, frequency:** the glossary gives frequency as «հաճախություն», so the draft uses it. For this physics context,
  retain it or choose «հաճախականություն»? The glossary's «տատանում» for oscillation is also followed.
- **S3, local example and ending:** retain the imagined tolma plate and «ճաշդ անցնում է անտեսանելի ալիքների միջով»?
  These are wording/visual choices for review. No particular plate's heating pattern has been measured.

