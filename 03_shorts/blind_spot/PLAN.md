# Short: The blind spot - a patch that detects no light - script and plan

Revised for Hayk's review, 2026-11-28. Script source: `beats.hy.json`. No voice or render made.

## The idea in one paragraph

The opening states the anatomical surprise while the real test image is already visible: part of the retina
detects no light. With right eye closed and left eye fixed on a right-hand cross, the viewer moves a phone
until the left-hand dot can disappear. The unchanged, stationary image is an actual perceptual test. Anatomy
explains the missing input; one combined beat distinguishes fellow-eye coverage from contextual completion
with one eye. The sole extension adds a continuous line through both marks. One doubt limits completion to
an appearance of continuity rather than recovery of true hidden detail. The existing Yerevan invitation is
the local setting, not an Armenian study.

## The script (Armenian)

<!-- script:start -->

9 beats, 1,424 characters (1,430 with numbers spelled out): ~98 s of speech, ~1:51 with pauses and the end tail, 10 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Աչքիդ մի հատվածը լույս չի զգում։

**2. local_setup.** Երևանում ես, թե հեռու՝ փորձի՛ր հենց հեռախոսիդ էկրանին։ Ձախում կետն է, աջում՝ խաչը։ Հեռախոսը պահի՛ր աչքերիդ բարձրությամբ՝ մոտավորապես պարզած ձեռքիդ հեռավորության վրա։

**3. showcase.** Փակի՛ր աջ աչքդ։ Ձախ աչքով նայի՛ր միայն խաչին։ Հեռախոսը դանդաղ մոտեցրո՛ւ դեմքիդ՝ հայացքդ խաչից չշեղելով։ Մի պահ կետը կարող է անհետանալ։ Կարող ես կանգնեցնել տեսանյութը և շարունակել փորձը։ *[pause 7 s]*

**4. notice.** Եթե կետը կորավ, մի՛ փնտրիր այն հայացքով։ Շարունակի՛ր նայել խաչին։ Հեռավորությունը փոխելիս այն կարող է նորից երևալ։ Պետք եղած հեռավորությունը կախված է էկրանից, նշանների հեռավորությունից ու քեզնից։

**5. anatomy.** Յուրաքանչյուր աչք կույր բիծ ունի։ Ցանցաթաղանթի այդ մասով տեսողական նյարդի թելերը դուրս են գալիս աչքից։ Այնտեղ լույսն ընկալող բջիջներ չկան։ Երբ կետի պատկերը հենց այդտեղ է ընկնում, այն չես տեսնում։

**6. filling.** 2 աչքով նայելիս մյուս աչքն էլ կարող է տեսնել այդ շրջանը։ Բայց մեր փորձի ժամանակ աջ աչքդ փակ էր։ Ուրեմն բացը չնկատելը միայն մյուս աչքի օգնությամբ չի բացատրվում։ Ուղեղը կարող է շրջապատի պատկերով լրացնել բացակայող մասը՝ նույնիսկ 1 աչքով նայելիս։

**7. line_test.** Հիմա կետի ու խաչի միջով գիծ անցկացնենք։ Կրկին աջ աչքդ փակի՛ր, ձախով նայի՛ր խաչին ու հեռավորությունը փոխի՛ր։ Երբ կետն անհետանա, գիծը կարող է շարունակական թվալ։ *[pause 3 s]*

**8. doubt.** Մի՞թե ուղեղը լրացնելիս պարզում է՝ այդ տեղում իրականում ինչ կա։ Ոչ։ Շրջապատից լրացնելը թաքնված առարկայի մանրամասները վերականգնել չէ։ Փորձը ցույց է տալիս, որ պատկերը կարող է ամբողջական թվալ՝ առանց այդ մասից լույսի ազդանշանի։

**9. takeaway.** Տեսածդ նաև ուղեղիդ լրացրածն է։

<!-- script:end -->

CHECK_RECORD_PLACEHOLDER

## Revision (2026-11-28)

- **Preserve the strongest draft:** retain phone test, line extension, dot-left/cross-right orientation, right
  eye closed and left eye on the cross. Never erase the dot digitally.
- **Concrete hook/pacing:** replace invitation-only hook with the supported light-insensitive-patch claim;
  both marks remain visible from frame 0. Combine filling/other-eye beats so the one-eye distinction is explained
  once. Nine beats follow the two tests.
- **Spoken honesty/repetition:** remove the separate spoken assurance that pixels were not deleted; it remains
  a strict production constraint. Keep the single existing doubt about hidden details and diagram labels on
  screen. No new animal/history subplot.
- **Editor's real-phone check:** specify 5-6 cm prototype separation and roughly 20 cm search distance as
  calculated QA targets only. No rendered-phone test performed or claimed; physical size varies by device.
  S4 remains for production verification; voice never promises a universal distance.
- **Rules/owner wording:** retain 7 s for main test, 3 s for line test, 10 s total; stationary fields through
  each hold. Keep one voiced closing and existing local invitation. S1-S3 remain open; new S4 is the next free
  ID. Changes follow content/pacing or explicit punctuation rules, not an ear-based textbook rewrite.

## Facts (checked)

Basis: `_knowledge/short_videos/facts_codex_2_mind_2026-11-28.md`, **CX11**. Used anatomy/demonstration facts
are **high confidence**. Exploratorium directions were reopened; no real-phone test or new measurement is claimed.

- **High — `hook`, `anatomy`:** optic nerve fibres leave through an optic-disc region without photoreceptors;
  its image gives no local retinal light input. Not an empty physical hole or central fixation. Hook foregrounds
  an already-used fact. [Meermeier et al., 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10494866/).
- **High — `local_setup`, `showcase`, `notice`:** dot left/cross right; close right eye, left eye fixates cross;
  start around arm's length at eye level and move closer. Dot can disappear/reappear; looking toward it defeats
  the test. A phone adapts the card geometry; working distance depends on device, spacing and viewer.
  [Exploratorium, To Do and Notice](https://www.exploratorium.edu/snacks/blind-spot).
- **High — `filling`:** fellow eye can represent this scene region in binocular viewing; contextual filling-in
  also occurs with one eye. Distinct mechanisms, now explained together.
  [Magnussen et al., 2007](https://www.sciencedirect.com/science/article/pii/S0042698906003932);
  [He & Davis, 2001](https://pubmed.ncbi.nlm.nih.gov/11248269/).
- **High — `line_test`:** line through both marks can appear continuous when dot falls in the blind spot.
  Actual line/dot remain complete. [Exploratorium, Fill in your blind spot](https://www.exploratorium.edu/snacks/blind-spot).
- **High/scoped inference — `doubt`, `takeaway`:** context gives an unbroken appearance without local input;
  it does not establish recovery of actual hidden detail or fabrication of all sight.
  [He & Davis](https://pubmed.ncbi.nlm.nih.gov/11248269/);
  [Meermeier et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC10494866/).
- **NEW in production plan only, high as an approximation:** blind spot about **15 degrees toward the temple**
  in visual space. For same-height mark separation s and eye-to-screen distance D, simple perpendicular-screen
  geometry gives D = s / tan(15 degrees). A chosen **5-6 cm** separation suggests **19-22 cm**, roughly **20 cm**,
  as a QA search target. Calculated design values from an approximate angle, not measured universal distances
  or new voiced facts. [Sheet source for angle: Magnussen et al., 2007](https://www.sciencedirect.com/science/article/pii/S0042698906003932).
- **Local setting:** Yerevan invitation asserts no local study or Armenian visual difference. Same
  [demonstration](https://www.exploratorium.edu/snacks/blind-spot) applies wherever the viewer is.

Excluded: fixed individual dimensions, exact discovery date, royal-court retellings and octopus comparison.
The approximate angle is a production-design input, not a new second extension in the video.

## Animation plan (showcase)

**Showcase: usable dot/cross field (`local_setup` through `notice`).** Large light field, dark dot left and cross
right at equal height. Keep marks clear of platform controls, safe-area edges and captions; visible from hook.
Do not mirror the image.

**Prototype physical-size target:** on a representative portrait phone, aim for **5-6 cm** between mark centres
if usable width permits. The sheet's approximate 15-degree location gives a **calculated** search distance near
**20 cm**, not a guarantee. Measure actual rendered separation, then test moving inward from arm's length.
Record dot loss, reappearance and line continuity; try a second phone size before approving layout. No such
measurement/test occurred at script stage.

During main instructions and **7 s** hold, all pixels in the strip, camera and surrounding labels stay fixed.
No countdown, animated phone, pan, scaling, pulse, dot fade or moving captions. Viewer moves the real phone
while left eye stays on cross. Freezing the video must leave a usable test image.

**One extension (`line_test`):** add a line through both marks and beyond them from its first frame. Keep it
complete/still during speech and **3 s** pause. Never erase a segment/dot to manufacture success; viewer may
pause again. Total action holds **10 s**, longest on the main test.

- **Anatomy:** separate cross-section labelled `սխեմա`; off-fixation dot ray reaches optic disc, distinct from
  fovea. No empty hole in eyeball.
- **Combined filling:** separate labelled schemes for fellow-eye coverage and monocular contextual completion.
  Neither records the viewer's experience or changes the live test image.
- **Doubt:** missing input versus perceived continuity, without hidden-detail recovery; keep graphic intact.
- **Closing:** original complete test scene; speak screen line; no recap. Every beat starts on a named object.
  Real portrait-phone QA remains pending S4.

## Images

Optional sheet-listed archival asset: [File:Nouvelle découverte touchant la veüe (IA gri nouvelledeco00mari).pdf](https://commons.wikimedia.org/wiki/File:Nouvelle_d%C3%A9couverte_touchant_la_ve%C3%BCe_(IA_gri_nouvelledeco00mari).pdf),
Mariotte's **1668** publication, Getty Research Institute scan, **public domain**, **PD-old-100-expired** / Public
Domain Mark 1.0 as checked in the sheet. Not used in the current beats: it would interrupt the hands-on test and add
history outside the one idea. No download made. Original test symbols and anatomical diagrams are sufficient.

## Questions for Hayk

- **S1, terminology (still open):** keep «կույր բիծ», «ցանցաթաղանթ» and «տեսողական նյարդ»? For the first,
  prefer «կույր կետ»? Absent from glossary; existing terms remain. This also covers the term question at the end
  of `SCRIPTS_BATCH1.md` for these four episodes.
- **S2, closing (still open):** keep «Տեսածդ նաև ուղեղիդ լրացրածն է», or prefer
  «Տեսածիդ մի մասը լրացնում է ուղեղդ»? Scope is contextual completion, not fabrication of all sight.
- **S3, local line (still open):** keep «Երևանում ես, թե հեռու», or choose another local invitation?
  Hypothetical viewer setting, not a claim about the study location.
- **S4, new production check:** after rendering, does the stationary image work on a real portrait phone at
  about 5-6 cm separation and near 20 cm search distance, then on a second phone size? Verify dot loss and line
  continuity, with instructions outside the strip. This cannot be signed off from JSON.
