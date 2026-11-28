# Short: The blind spot - lose a dot on your own phone - script and plan

Draft for Hayk's review, 2026-11-28. Why-is-it-so strand. Script source: `beats.hy.json`.
The demonstration must work on a stationary phone image; the dot is never digitally removed. No voice or render made.

## The idea in one paragraph

The viewer closes the right eye, fixates a right-hand cross with the left eye and moves the phone until a left-hand
dot can disappear. The optic disc has no photoreceptors where nerve fibres leave the eye. Perception can fill this
gap from the surrounding pattern even with only one eye, while the other eye also helps during binocular viewing.
The single extension adds a line through the two symbols: the dot can disappear while the line appears continuous.
The doubt beat distinguishes perceptual completion from recovery of an object's true hidden details. The local
anchor is a direct invitation to try it in Yerevan or wherever the viewer is, with no claimed Armenian study.

## The script (Armenian)

<!-- script:start -->

10 beats, 1,529 characters (1,535 with numbers spelled out): ~106 s of speech, ~1:58 with pauses and the end tail, 10 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Կարո՞ղ ես կորցնել այս կետը։

**2. local_setup.** Երևանում ես, թե հեռու՝ փորձիր հենց հեռախոսիդ էկրանին։ Ձախում կետն է, աջում՝ խաչը։ Հեռախոսը պահի՛ր աչքերիդ բարձրությամբ՝ մոտավորապես պարզած ձեռքիդ հեռավորության վրա։

**3. showcase.** Փակի՛ր աջ աչքդ։ Ձախ աչքով նայի՛ր միայն խաչին։ Հեռախոսը դանդաղ մոտեցրո՛ւ դեմքիդ՝ հայացքդ խաչից չշեղելով։ Մի պահ կետը կարող է անհետանալ։ Կարող ես կանգնեցնել տեսանյութը և շարունակել փորձը։ *[pause 7 s]*

**4. notice.** Եթե կետը կորավ, մի՛ փնտրիր այն հայացքով։ Շարունակի՛ր նայել խաչին։ Էկրանի կետը չենք ջնջում։ Հեռավորությունը փոխելիս այն կարող է նորից երևալ։ Պետք եղած հեռավորությունը կախված է էկրանից, նշանների հեռավորությունից ու քեզնից։

**5. anatomy.** Յուրաքանչյուր աչք կույր բիծ ունի։ Ցանցաթաղանթի այդ մասով տեսողական նյարդի թելերը դուրս են գալիս աչքից։ Այնտեղ լույսն ընկալող բջիջներ չկան։ Երբ կետի պատկերը հենց այդտեղ է ընկնում, այն չես տեսնում։

**6. filling.** Բայց սովորաբար այդ տեղում սև բիծ չես տեսնում։ Ուղեղը կարող է շրջապատի պատկերով լրացնել բացակայող մասը։ Եվ դա անում է նաև այն ժամանակ, երբ միայն 1 աչքով ես նայում։

**7. other_eye.** Երբ նայում ես 2 աչքով, մյուս աչքն էլ կարող է տեսնել այդ շրջանը։ Բայց մեր փորձի ժամանակ աջ աչքդ փակ էր։ Ուրեմն բացը չնկատելը միայն մյուս աչքի օգնությամբ չի բացատրվում։

**8. line_test.** Հիմա կետի ու խաչի միջով գիծ անցկացնենք։ Կրկին աջ աչքդ փակի՛ր, ձախով նայի՛ր խաչին ու հեռավորությունը փոխի՛ր։ Երբ կետն անհետանա, գիծը կարող է շարունակական թվալ։ *[pause 3 s]*

**9. doubt.** Մի՞թե ուղեղը լրացնելիս պարզում է՝ այդ տեղում իրականում ինչ կա։ Ոչ։ Շրջապատից լրացնելը թաքնված առարկայի մանրամասները վերականգնել չէ։ Փորձը ցույց է տալիս, որ պատկերը կարող է ամբողջական թվալ՝ առանց այդ մասից լույսի ազդանշանի։

**10. takeaway.** Տեսածդ նաև ուղեղիդ լրացրածն է։

<!-- script:end -->

Armenian lint: **0 errors, 1 hint** on the final rerun. All `text`, `screen` and `screen_small` strings were
extracted into `%TEMP%/ughegh_blind_spot_script_review.txt` outside the repository and checked with `--style`.
Retained `filler-actually` for «իրականում»: it contrasts the object's actual details with contextual completion,
the substantive distinction in the doubt beat (A72 explicitly permits contrastive use). No house-style hint was
left unapplied. Manual polish followed the checklist; U1 singular address is retained. Anatomical terms absent
from the supplied glossary remain S1 for owner review. The last factual polish scopes the doubt question to what
filling-in can ascertain, rather than claiming that the brain can never know an object's details from other cues.

`plan_script.py blind_spot`: generated length line above, under the default ceiling.
`validate_episode.py blind_spot --stage script`: **PASS**. The unchanged tool entry points ran through `runpy`
with console-only logging and bytecode disabled, avoiding their default writes to repository-level `logs/`.
Only files in the four authorized episode folders were written inside the repository.

## Facts (checked)

Fact-sheet basis: `_knowledge/short_videos/facts_codex_2_mind_2026-11-28.md`, CX11. All sheet-rated facts used are
**high confidence**; no medium- or low-confidence claims are used. Exploratorium's directions, the anatomical
paper and the filling-in abstract were also accessed on the web on 2026-11-28. Magnussen's publisher page returned
an access error; its two-eye claim is used at the sheet's high rating, not misreported as newly checked full text.

- **`hook`, `local_setup`, `showcase`, `notice`:** dot on the left, cross on the right, right eye closed, left eye
  fixed on the cross. Begin about an arm's length away at eye level and move closer; the dot can disappear and
  reappear. Do not track the dot with the eye. Phone use is an adaptation of the same geometry; symbol spacing,
  display size and the viewer determine the working distance. No universal centimetre value is prescribed.
  [Exploratorium, Blind Spot, To Do and Notice](https://www.exploratorium.edu/snacks/blind-spot).
- **`anatomy`:** the optic-disc region lacks photoreceptors where optic nerve fibres leave the eye; an image falling
  there produces no local retinal light input. It is not an empty physical hole, nor the centre of fixation.
  [Meermeier et al., 2023, abstract and introduction](https://pmc.ncbi.nlm.nih.gov/articles/PMC10494866/).
- **`filling`, `doubt`:** contextual information can fill in the natural blind spot in monocular viewing. A completed
  appearance is not evidence that the missing object's actual details were recovered. This is the relevant limit
  on the script's own filling-in claim, after the demonstration and anatomy have established the solid result.
  [He & Davis, 2001, abstract](https://pubmed.ncbi.nlm.nih.gov/11248269/);
  [Meermeier et al., absence of local input](https://pmc.ncbi.nlm.nih.gov/articles/PMC10494866/).
- **`other_eye`:** the corresponding scene region can be represented by the other eye during binocular viewing.
  This complements, rather than replaces, monocular filling-in. No numeric field overlap or anatomy angle is
  introduced. [Magnussen et al., 2007, source checked in the sheet](https://www.sciencedirect.com/science/article/pii/S0042698906003932).
- **`line_test`:** a straight line through the dot and cross can appear unbroken when the dot falls in the blind
  spot. The actual graphic stays complete; it must not simulate the perceptual effect by hiding pixels.
  [Exploratorium, Fill in your blind spot](https://www.exploratorium.edu/snacks/blind-spot).
- **Local setting, not a study:** the named city is independently confirmed by the [official Yerevan site](https://www.yerevan.am/en/).
  The invitation applies the same [demonstration geometry](https://www.exploratorium.edu/snacks/blind-spot); no local
  empirical finding or special Armenian eye characteristic is claimed.
- **`takeaway`:** the closing is the educational interpretation of contextual completion, not a claim that every
  visual detail is invented. [He & Davis](https://pubmed.ncbi.nlm.nih.gov/11248269/).

Excluded: fixed blind-spot dimensions, angular location, historical court stories and the octopus comparison. The
two eyes in the voiced explanation refer to the viewing procedure, not a newly invented empirical sample count.

## Animation plan (showcase)

**Showcase: a genuinely usable dot-and-cross test (`local_setup` through `notice`).** Use a large light field with
a dark dot on the left and cross on the right at the same height. Place both symbols comfortably inside a vertical
phone's usable width, clear of platform buttons, safe-area edges and captions. The separation must be large enough
to find a comfortable working distance; choose it during actual phone QA, with no promised universal distance.
Keep the complete pair visible from the first frame of the hook. Do not mirror the picture.

The eye-closing instructions and eye-level diagram sit outside the test strip. During `showcase`, every pixel in
the test strip stays fixed for the narration and **7 s** silent hold, the longest pause. No animated countdown,
camera move, digital zoom, dot fade, pulsing target or moving captions. Freeze the instructions outside the strip
too; the viewer moves the real phone while keeping the left eye on the cross. The voice explicitly allows pausing
the video. At `notice`, the dot is still physically present even if the viewer cannot see it.

**One extension, `line_test`:** on its first frame, add a straight line all the way through both symbols and beyond
them. Keep the line and marks complete and motionless through the instructions and **3 s** pause. The viewer can
pause the video again. Never remove the dot or a line segment to manufacture success. Together the holds total
**10 s**. The rendered demonstration still needs real portrait-phone usability QA; no such test is claimed at the
script stage, and individual success is not guaranteed.

- **`anatomy`:** start with the eye cross-section and optic nerve exit already visible. Trace an off-fixation ray to
  the receptor-free region; distinguish it from the central fixation target. Source line labels it «սխեմա».
- **`filling`:** a separate conceptual panel illustrates contextual completion; do not alter the live test dot.
- **`other_eye`:** separate diagrams show fellow-eye coverage and the established monocular condition. No invented
  angles, dimensions, timings or numerical coverage claims.
- **`doubt`:** keep the real graphic complete, and separate absent retinal input from perceived continuity in a
  labelled scheme. No hidden-object reconstruction or assertion that the brain knows unseen details.
- **`takeaway`:** return to the original complete dot-and-cross scene with the closing line outside the strip. Voice
  says the whole screen line. No summary card. Every beat starts with an object from its narration already visible.

## Images

Optional sheet-listed archival asset: [File:Nouvelle découverte touchant la veüe (IA gri nouvelledeco00mari).pdf](https://commons.wikimedia.org/wiki/File:Nouvelle_d%C3%A9couverte_touchant_la_ve%C3%BCe_(IA_gri_nouvelledeco00mari).pdf),
Mariotte's **1668** publication, Getty Research Institute scan, **public domain**, **PD-old-100-expired** / Public
Domain Mark 1.0 as checked in the sheet. Not used in the current beats: it would interrupt the hands-on test and add
history outside the one idea. No download made. Original test symbols and anatomical diagrams are sufficient.

## Questions for Hayk

- **S1, terminology absent from the supplied glossary:** keep «կույր բիծ», «ցանցաթաղանթ» and «տեսողական նյարդ»?
  For the first, would you prefer «կույր կետ»? The draft keeps its current wording pending native review.
- **S2, closing:** keep «Տեսածդ նաև ուղեղիդ լրացրածն է», or prefer «Տեսածիդ մի մասը լրացնում է ուղեղդ»?
  The intended scope is this contextual completion, not a universal claim that sight is fabricated.
- **S3, local line:** keep «Երևանում ես, թե հեռու», or choose another local invitation? It is a hypothetical viewer
  setting, not a factual claim about where the effect was studied. The usable phone demonstration needs visual QA
  after script approval, with the instructions outside the test strip.

