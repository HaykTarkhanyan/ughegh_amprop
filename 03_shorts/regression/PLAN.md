# Short 4: Regression to the mean (why praise seems to "fail" and punishment seems to "work") - script and plan

Draft for Hayk's review, 2026-11-25. No voice until the script is approved. Script source: `beats.hy.json`.

## Choices (carried over, not asked again)

Same as the Bayes and Simpson shorts: real examples, people as dots, a deeper ~2.5 min video, one brief card (here:
"result = skill + luck"). Change any of these in the review.

## The idea in one paragraph

A flight instructor told Kahneman that praise makes cadets worse and shouting makes them better. He was right about
the pattern and wrong about the cause: every result is skill plus luck, an unusually good one is usually skill plus
good luck, and the luck does not come back. So the next attempt after a peak is usually worse and after a dip
usually better, whatever you say. A computer test with 1,000 students who are never praised or scolded shows it
(the best 50 fall from 92 to 82, the worst 50 rise from 47 to 59), and it even runs backwards in time. Galton found
it in heights in 1886; it fools us with doctors' remedies and coach firings. The check: compare with people who got
no praise and no scolding.

## Structure and timing

~158 s of speech (2,294 characters at ~870 a minute), ~165 s with pauses.

*Superseded (Codex review X61, 2026-11-26): this beat-by-beat table is the 2026-11-25 storyboard estimate, before the Codex cuts. The current beats and length are in the script section above; keep the table only for its visual notes.*

| # | Beat | ~s | Said (in short) | Shown |
|---|------|----|-----------------|-------|
| 1 | hook | 9 | praise, and the next try is worse; scold, and it is better: so scolding works better? | thumbs-up -> falling arrow, frown -> rising arrow |
| 2 | kahneman | 22 | 1960s: Kahneman tells Israeli Air Force instructors praise beats punishment; one objects with his experience | portrait, plane loops, thumbs-up / wobbly loop |
| 3 | right | 3 | the instructor saw it right but explained it wrong | two stamps |
| 4 | luck | 12 | every flight = skill + luck; a great one = skill + good luck; next time the skill stays, the luck does not | score bar: solid skill block + flickering luck block |
| 5 | setup | 11 | a computer test: 1,000 students write the same exam twice, score = skill + chance, nobody is praised or scolded | 1,000 dots stacked as a histogram of test-1 scores |
| 6 | top | 9 | the best 50 averaged 92, the second time 82; most did worse, though nobody praised them | top 50 orange, fly to test-2 positions, marker 92 -> 82 |
| 7 | bottom | 5 | the worst 50 rose from 47 to 59, though nobody scolded them | bottom 50 red, marker 47 -> 59 |
| 8 | reverse | 12 | pick the best 50 of test 2: 93 there, only 81 on test 1; luck does not know which test came first | re-tag test-2 best, animate backwards, 93 -> 81 |
| 9 | praise | 19 | now the instructor's story is clear: praise came after the best flights, scolding after the worst; the numbers "punish" kindness and "reward" strictness | a 12-flight timeline with praise on peaks, scolding on dips |
| 10 | galton | 19 | Galton, 1886: tall parents' children are tall but less so; short parents' children closer to average; he called it regression | Galton portrait, parent / child silhouettes, average line |
| 11 | everyday | 12 | people see a doctor at their worst, so any remedy can look like it worked; a coach fired after the worst season makes the new one look like a hero | symptom curve; team results with a coach swap |
| 12 | check | 11 | how to tell: compare with people who got neither praise nor scolding; if they changed the same way, it was luck | two groups rising equally |
| 13 | card | 7 | result = skill + luck; after an extreme result, expect a more average one | card |
| 14 | takeaway | 8 | when scolding seems to help and praise to hurt, ask: what would have happened without either? | big text over the faint histogram; loops |

## The script (Armenian)

<!-- script:start -->

11 beats, 1,893 characters (1,947 with numbers spelled out): ~132 s of speech, ~2:23 with pauses and the end tail, 8 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Գովում ես՝ հաջորդ անգամ ավելի վատ է ստացվում։ Նախատում ես՝ ավելի լավ։ Ուրեմն նախատինքն ավելի արդյունավե՞տ է, քան գովասանքը։

**2. kahneman.** Հոգեբան Դանիել Քանեմանը մի անգամ դասախոսում էր իսրայելցի օդաչու-հրահանգիչների համար և ասում, որ գովասանքն ավելի արդյունավետ է, քան պատիժը։ Հրահանգիչներից մեկն առարկեց՝ երբ կուրսանտին գովում եմ լավ թռիչքի համար, հաջորդը սովորաբար ավելի վատ է լինում, իսկ երբ գոռում եմ վատ թռիչքից հետո, հաջորդն ավելի լավ է։

**3. right.** Հրահանգիչը ճիշտ էր նկատել, բայց սխալ էր բացատրել։

**4. luck.** Ամեն թռիչք կախված է երկու բանից՝ հմտությունից և բախտից։ Շատ լավ թռիչքը սովորաբար լավ հմտություն է՝ գումարած հաջողություն։ Հաջորդ անգամ հմտությունը մնում է, իսկ բախտը՝ ոչ։

**5. setup.** Ստուգենք համակարգչով։ 1000 հորինված ուսանող նույն քննությունը գրում է երկու անգամ։ Մեր մոդելում ամեն արդյունք հմտություն է՝ գումարած պատահականություն, և ոչ ոքի չենք գովում ու չենք նախատում։ *[pause 1 s]*

**6. top.** Առաջին քննության լավագույն հիսունի միջինը 92 էր։ Երկրորդ անգամ՝ 82։ Նրանց մեծ մասն ավելի վատ գրեց, թեև ոչ ոք նրանց չգովեց։ *[pause 1.5 s]*

**7. bottom.** Իսկ ամենաթույլ հիսունը 47-ից բարձրացավ 59-ի, թեև ոչ ոք նրանց չնախատեց։ *[pause 1.5 s]*

**8. reverse.** Եվ ամենահետաքրքիրը։ Եթե ընտրենք երկրորդ քննության լավագույն հիսունին, նրանց միջինն այստեղ 93 է, իսկ առաջին քննությունում՝ ընդամենը 81։ Բախտը չգիտի, թե որն է առաջինը, որը՝ երկրորդը։ Սա կոչվում է ռեգրեսիա դեպի միջինը։ *[pause 2.5 s]*

**9. praise.** Հիմա հրահանգչի պատմությունը պարզ է։ Գովասանքը գալիս էր ամենալավ թռիչքներից հետո, որոնց սովորաբար հաջորդում են ավելի միջինները։ Նախատինքը՝ ամենավատերից հետո, որոնց հաջորդում են ավելի լավերը։ Սա չի ապացուցում, որ գովասանքն անօգուտ է, միայն ցույց է տալիս, որ այս թվերով դա չես իմանա։

**10. check.** Ինչպե՞ս իմանալ՝ իրո՞ք գովասանքն է, թե միայն միջինին վերադարձը։ Պետք է վերցնել նույնքան ծայրահեղ արդյունքով սկսած կուրսանտներ և պատահական ընտրել, թե ում գովել, ում՝ ոչ։ Խմբերի տարբերությունը ցույց կտա գովասանքի ազդեցությունը՝ այն փոփոխությունից ավել, որ առանց այդ էլ կլիներ։ *[pause 1.5 s]*

**11. takeaway.** Երբ թվում է, թե նախատինքն օգնում է, իսկ գովասանքը՝ վնասում, հարցրու՝ իսկ առանց դրանց ի՞նչ կլիներ։

<!-- script:end -->

Armenian lint: 0 errors, 0 hints. "Regression to the mean" is not in the glossary (only «գծային ռեգրեսիա»), so the
script says «միջինին վերադարձ» and names Galton's «ռեգրեսիա» once: see U-i.

## The numbers (checked)

**The computer test** (`python regression/simulate.py`, seed 509, writes `regression/build/simulation.json` for the
renderer): 1,000 students, skill ~ N(70, 8), each test adds luck ~ N(0, 8), so the tests correlate at 0.51.

| Group | Test 1 | Test 2 | Note |
|---|---|---|---|
| everyone | 69.3 | 70.4 | |
| best 50 of test 1 | 91.7 (said 92) | 82.3 (said 82) | 76% did worse |
| worst 50 of test 1 | 46.5 (said 47) | 58.6 (said 59) | 90% did better |
| best 50 of test 2 | 80.8 (said 81) | 93.1 (said 93) | the same effect, backwards |

These are simulated numbers and the script says so («Ստուգենք համակարգչով»). With a correlation of ~0.5 a group
lands about halfway back to the average, which is what the table shows.

## Facts and sources

- **Kahneman and the flight instructors** (beat 2): told by Kahneman in *Thinking, Fast and Slow* (2011, ch. 17) and
  his Nobel autobiography; the observation already appears in Tversky & Kahneman, *Science* 185 (1974), "experienced
  instructors noted that praise for an exceptionally smooth landing is typically followed by a poorer landing on the
  next try". Setting: Israeli Air Force flight instructors, mid-1960s, Kahneman then at the Hebrew University.
  Accounts differ on his coin demonstration (two coins at a floor target vs over the shoulder), so the script does not
  describe it.
- **Galton 1886** (beat 10): "Regression towards Mediocrity in Hereditary Stature", *Journal of the Anthropological
  Institute* 15: 246-263. Children's deviation from the average was about 2/3 of their mid-parent's ("as from 1 to
  2/3"). The family counts often quoted (205 families, 928 children) were not confirmed, so the script gives none.
- **Doctors and coaches** (beat 11): stated as "can seem" / "seems", not as measured effects. Both are standard
  textbook cases of regression to the mean; no numbers are claimed.
- **Caveat kept out of the script:** real flight training also contains learning, so not all change is luck (a
  point raised against the anecdote); the video's claim is only that the instructor's pattern needs no praise or
  scolding to appear.

## Visuals

- **Histogram of dots:** 1,000 dots stacked by score (full data range, about 30-115; X31) across x 140-860, columns up to y ~980 at most, above
  the caption band (y ~1040-1200). Between tests the dots fly from their test-1 to their test-2 position (from
  `simulation.json`), so the orange (best) and red (worst) clouds visibly slide towards the middle. Group means as
  small triangles with numbers.
- **Colours:** everyone grey `#5A606A`, best 50 orange `#F2A800`, worst 50 red `#E8383D`.
- **Portraits** (Commons, credits via `fetch_commons.py`): `File:Daniel Kahneman (3283955327) (cropped).jpg` (CC BY-SA
  2.0, nrkbeta); `File:Sir Francis Galton, circa 1890.jpg` (public domain).
- **New component:** a histogram-of-dots with a "move to new values" state; together with the crowd grid (Bayes,
  Simpson) it covers most "people as dots" shorts.

## Questions for Hayk (review points)

- **U-i, the term:** «միջինին վերադարձ», «վերադարձ դեպի միջինը», or «ռեգրեսիա դեպի միջին»?
- **U-j, «նախատինք» / «նախատել»** for scolding and «գոռում եմ» for the instructor's shouting: natural?
- **U-k, the backwards beat (8):** the strongest proof, but slightly abstract: keep?
- **U-l, length:** ~2.7 min, the longest of the three; beats 9 and 11 can be shortened.
- U-a («դու» vs «դուք») applies here too.

## Production plan (after approval)

Voice (14 beats, ~$0.05), timeline + sync check, scenes (new: the dot histogram with moving dots, the plane loops,
the silhouettes), stills, one draft and one final render, contact sheet, Gemini review, review page.

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md):

- **X30:** the check no longer says "if an unpraised group changed the same way, it was luck". It now says to take
  cadets starting from equally extreme results and assign praise at random; the difference between the groups
  estimates praise's effect beyond the change that happens anyway. Skill plus chance is presented as "our model", and
  the praise beat says the pattern does not prove praise useless, only that these numbers cannot tell.
- **X31:** the simulated scores run from 31.3 to 110.6 (test 1) and 34.6 to 103.0 (test 2), so a 40-100 axis would
  hide 10 and 9 of the extremes this video is about. The axis now comes from the data, the students are called
  invented, and the picture carries a «մոդելավորում» tag. The numbers are results of the model, not 0-100 exam marks.
- **X51:** one extension (the check) kept; Galton, the everyday examples and the «Կարճ ասած» summary card are cut
  (texts below); the name of the effect moved into the reverse beat; years off the voice; 8 s of pauses, the longest
  on the reversed selection; no «Այնպես որ,». Open term question: «ռեգրեսիա դեպի միջինը» (glossary has only «գծային
  ռեգրեսիա»).

**Cut beats, kept here word for word so they can come back:**

- `galton`: Երևույթն առաջինը նկարագրեց Ֆրենսիս Գալթոնը 1886 թվականին։ Բարձրահասակ ծնողների երեխաները նույնպես բարձր են, բայց սովորաբար ոչ այնքան, որքան ծնողները։ Կարճահասակներինը՝ կարճ, բայց ավելի մոտ միջինին։ Գալթոնը սա անվանեց ռեգրեսիա, այսինքն՝ հետ գնալ դեպի միջինը։ (screen: Ֆրենսիս Գալթոն, 1886)

- `everyday`: Նույնը շատ տեղերում է։ Մարդը բժշկի է գնում, երբ ամենավատ վիճակում է, և ցանկացած միջոց կարող է թվալ, թե օգնեց։ Մարզչին փոխում են ամենավատ մրցաշրջանից հետո, և նոր մարզիչը հերոս է թվում։

- `card`: Կարճ ասած՝ արդյունքը հմտություն է՝ գումարած բախտ։ Ծայրահեղ արդյունքից հետո սպասիր ավելի միջին արդյունքի։ (screen: արդյունք = հմտություն + բախտ)
