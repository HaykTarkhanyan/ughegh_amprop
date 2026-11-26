# Short 2: "The test is 99% accurate" (Bayes) - script and plan

Draft for Hayk's review, 2026-11-25. No voice is made until the script is approved (rule from short 2 on).
Script source: `beats.hy.json` (this page shows the same text).

## Decisions so far

| ID | Question | Answer |
|----|----------|--------|
| Q11 | Examples | the medical test only |
| Q12 | How to show it | a crowd of 1,000 dots: count people, not probabilities |
| Q13 | The formula | a brief card near the end |
| Q14 | Length | a deeper 2-3 min video |

## The idea in one paragraph

"The test is 99% accurate and you are positive" sounds like "99% sick". We take 1,000 people, light up the 10 who
are sick, test everyone, and pull out everyone who tested positive: 10 sick and about 10 healthy, so a positive means
50%, not 99%. The reason is that healthy people outnumber the sick 99 to 1, so the test's small 1% error hits a huge
group. Then: a rarer disease (9%), real doctors getting it wrong (Gigerenzer 2007), what helps (a second test, who
gets tested), the formula card, and the question to ask next time.

## Structure and timing

~150 s of speech (2,182 characters at the measured ~870 a minute), ~155 s with pauses.

*Superseded (Codex review X61, 2026-11-26): this beat-by-beat table is the 2026-11-25 storyboard estimate, before the Codex cuts. The current beats and length are in the script section above; keep the table only for its visual notes.*

| # | Beat | ~s | Said (in short) | Shown |
|---|------|----|-----------------|-------|
| 1 | hook | 6 | the test is 99% accurate, you are positive: what is the chance you are sick? | big "99%", a test card with "+" |
| 2 | guess | 11 | most say 99%, most doctors too; the answer can be 50% or even 9%; let us count people | "99%?" crossed out, "50%" and "9%" |
| 3 | crowd | 8 | 1,000 people, 1 in 100 is sick, so 10 | 40 x 25 grid of dots, 10 turn red, counter |
| 4 | meaning | 10 | what 99% means: finds 99 of 100 sick, wrongly flags 1 of 100 healthy | two 10 x 10 blocks: 99 of 100 red ringed, 1 of 100 grey ringed |
| 5 | test_sick | 4 | test everyone; all 10 sick are found | scanner sweep, 10 red dots ringed |
| 6 | test_healthy | 9 | but 990 healthy: 1% of them, about 10, also test positive: false positives | 10 grey dots ringed, counter 20 |
| 7 | reveal | 12 | gather all positives: 20, only 10 sick, so 50%, not 99% | the 20 fly out into big icons: 10 red, 10 grey; "10 / 20 = 50%" |
| 8 | why | 10 | the healthy are 99 times more; a small 1% error on a huge group | 990 vs 10 blocks; the 1% slice of grey = the red block in size |
| 9 | rarer | 14 | same test, disease 1 in 1,000: 1 sick vs ~10 false positives, about 9% | grid with 1 red dot; "1 / 11 ≈ 9%" |
| 10 | doctors | 17 | 2007: 160 gynecologists, only 1 in 5 right; after a 1-hour lesson in counts of people, 87% right | 160 doctor icons, 21% then 87% lit; source line |
| 11 | retest | 25 | test again (another method); the sick stay positive, almost no healthy one does: ~99%; that is why a positive HIV test is always confirmed with other tests | the 20 icons, second scan, grey ones lose rings; "≈ 99%" |
| 12 | symptoms | 16 | who gets tested matters: with symptoms you are not "1 in 100"; if 1 in 10 is sick, a positive means ~92% | grid with 100 red; "99 / 108 ≈ 92%" |
| 13 | formula | 9 | this is Bayes' formula: start from how common it is, then update with the test | formula card ~4 s, "= 10 / 20 = 50%" |
| 14 | takeaway | 8 | next time you hear "99% accurate", ask how rare the thing is | big text over the faint crowd; loops to the start |

## The script (Armenian)

<!-- script:start -->

12 beats, 2,018 characters (2,118 with numbers spelled out): ~143 s of speech, ~2:34 with pauses and the end tail, 9 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Թեստը 99 տոկոսով ճշգրիտ է, և քո պատասխանը դրական է։ Ո՞րն է հավանականությունը, որ իսկապես հիվանդ ես։

**2. guess.** Մեծ մասը կասի՝ 99 տոկոս։ Նման հարցում սխալվում են նաև շատ բժիշկներ՝ մի դասընթացի 160 գինեկոլոգից ճիշտ է պատասխանել միայն ամեն հինգերորդը։ Իսկ ճիշտ պատասխանը կարող է լինել 50, կամ նույնիսկ 9 տոկոս։ Հաշվենք ոչ թե տոկոսներով, այլ մարդկանցով։

**3. crowd.** Պատկերացրու հազար մարդ։ Հիվանդությունը հազվադեպ է՝ հարյուրից մեկն է հիվանդ։ Ուրեմն հազարից հիվանդ է տասը մարդ։ *[pause 1.5 s]*

**4. meaning.** «Ճշգրիտը» կարող է տարբեր բաներ նշանակել։ Մեր օրինակում ենթադրենք՝ թեստը հարյուր հիվանդից գտնում է 99-ին, իսկ հարյուր առողջից միայն մեկին է սխալմամբ դրական պատասխան տալիս։

**5. test_sick.** Ստուգենք բոլոր հազարին։ Տասը հիվանդին էլ թեստը գտնում է։

**6. test_healthy.** Բայց կա նաև 990 առողջ մարդ։ Նրանց մեկ տոկոսը՝ մոտ տասը մարդ, նույնպես դրական պատասխան է ստանում։ Սրանք կեղծ դրական պատասխաններ են։ *[pause 1.5 s]*

**7. reveal.** Հիմա հավաքենք դրական պատասխան ստացած բոլոր մարդկանց։ Քսան մարդ։ Նրանցից հիվանդ է միայն տասը։ Այսինքն՝ քո դրական պատասխանը նշանակում է ոչ թե 99, այլ 50 տոկոս։ *[pause 3 s]*

**8. why.** Պատճառը պարզ է։ Առողջները 99 անգամ ավելի շատ են, քան հիվանդները։ Թեստի փոքր՝ մեկ տոկոս սխալը կիրառվում է հսկայական խմբի վրա։

**9. rarer.** Իսկ եթե հիվանդությունն ավելի հազվադեպ է՝ հազարից մեկ։ Թեստը նույնն է։ Հիվանդ է մեկ մարդ, իսկ կեղծ դրական պատասխան ստանում է մոտ տասը առողջ։ Դրական պատասխանը ճիշտ է տասնմեկից մեկ անգամ՝ մոտ 9 տոկոս։ *[pause 1.5 s]*

**10. retest.** Ի՞նչ անել։ Ստուգել ուրիշ թեստով, որը սխալվում է այլ պատճառներով։ Քսան դրականներին նորից ստուգենք։ Հիվանդները նորից դրական են։ Իսկ առողջներից յուրաքանչյուրը երկրորդ անգամ էլ դրական ստանալու շանս ունի ընդամենը մեկ տոկոս, ուստի տասից սովորաբար ոչ ոք չի ստանում։ Եթե երկու թեստի սխալներն իրարից անկախ են, երկու դրականից հետո հավանականությունը մոտ 99 տոկոս է։ Իսկ եթե երկրորդ թեստը սխալվում է նույն մարդկանց վրա, ոչինչ չի փոխվում՝ մնում է 50։ Դրա համար էլ բժիշկներն ունեն հաստատող թեստերի հատուկ կարգ, օրինակ՝ ՄԻԱՎ-ի դեպքում։ *[pause 1.5 s]*

**11. formula.** Այս ամենի հետևում Բայեսի բանաձևն է։ Սկսիր նրանից, թե որքան տարածված է հիվանդությունը, հետո թարմացրու այն թեստի պատասխանով։

**12. takeaway.** Երբ հաջորդ անգամ լսես «99 տոկոսով ճշգրիտ», հարցրու՝ իսկ որքա՞ն հազվադեպ է այն, ինչ փնտրում ենք։

<!-- script:end -->

Armenian lint (style guide): 0 errors, 0 hints. Terms follow the course's own Bayes lecture
(`sample_problems_qysu/site/probability/w06-total-bayes.html`): «կեղծ դրական», «Բայեսի բանաձև», «տարածված».

## The numbers (checked)

"99% accurate" is simplified to: sensitivity 99% (finds 99 of 100 sick) and specificity 99% (clears 99 of 100
healthy). Per 1,000 people:

| Case | Sick | True positives | False positives | A positive means |
|------|------|----------------|-----------------|------------------|
| disease 1 in 100 | 10 | 9.9 (shown as 10) | 9.9 (shown as 10) | 50.0% |
| disease 1 in 1,000 | 1 | 1.0 | 10.0 | 9.0% (1 in 11) |
| with symptoms, 1 in 10 | 100 | 99 | 9 | 91.7% (said "about 92") |
| second test of the 20 positives (1 in 100 case) | 9.8 stay positive | | 0.1 | 99.0% |

The second-test figure assumes the two tests err independently. A repeat of the same test can repeat the same
error, so the script says "better with another method".

## Facts and sources

- **The gynecologists (beat 10).** From three accounts by Gigerenzer (the paper's hosts refuse automated fetches,
  so the paper itself was not read): Scientific American Mind, April 2009 ("Knowing Your Chances"); APS Observer,
  2007; Cochrane Colloquium abstract, 2008. In a 2007 continuing-education course, 160 gynecologists got a
  mammography question (prevalence 1%, sensitivity 90%, false-positive rate 9%, correct answer about 1 in 10). Only
  21% chose it; 60% chose 90% or 81%. After training in natural frequencies, 87% understood it. One account ties the
  87% to "a one-hour lecture ... to a group of 150 gynecologists", so the script does not say it was the same 160.
  Original: Gigerenzer, Gaissmaier, Kurz-Milcke, Schwartz & Woloshin, *Psychological Science in the Public
  Interest* 8(2), 2007, doi:10.1111/j.1539-6053.2008.00033.x.
- **HIV confirmation (beat 11).** Checked 2026-11-25: the CDC/APHL laboratory algorithm follows a reactive
  antigen/antibody screening test with a different supplemental test (an HIV-1/HIV-2 differentiation immunoassay or
  a nucleic acid test); WHO confirms a positive with its standard three-test strategy, and its verification toolkit
  advises against tests from the same manufacturer in one algorithm (shared cross-reactivity), which is the "another
  method" point. Sources: WHO HIV testing information note (2023), University of Washington HIV curriculum, CDC
  stacks. Hence «ուրիշ թեստերով» (plural).
- **"Most doctors too" (beat 2).** Rests on the gynecologist study and the older Eddy (1982) and Hoffrage &
  Gigerenzer (1998) results; fine as a teaser because beat 10 backs it up.

## Visuals

- **Crowd:** 1,000 dots in a 40 x 25 grid, 14 px dots with a 4 px gap (18 px cells): x 140-860, y 330-780, inside
  the safe area and above the caption band (captions sit in y ~1040-1200; everything else stays above ~1030).
  Counters and labels go in y 800-1020. Which dots are sick or false positives is fixed with seed 509.
- **Colours:** healthy grey `#5A606A`, sick red `#E8383D`, a positive test = an orange ring `#F2A800`, results in
  orange. Same look as the pilot.
- **Pull-out:** the ringed dots fly out of the grid and become large person icons (the pilot's `Person`).
- **Formula card:** `P(D | +) = P(+ | D) · P(D) / P(+)`, with `D՝ հիվանդ է, +՝ թեստը դրական է`, and `= 10 / 20 =
  50%` under it, as in the course page's notation.
- **Reused from the pilot:** captions (measured, 2 lines), the takeaway's big karaoke text, person icons, label pill,
  palette, font. **New:** a crowd-grid component with states (fill in, colour, scan, ring, pull out, reset), a
  counter, the formula card, a doctors grid.

## Questions for Hayk (review points)

- **U-a, address:** the script says «դու» (singular), as in the pilot. Keep, or plural «դուք»?
- **U-b, wording:** «սկրինինգ» (or «զննում»?), «կրծքագեղձի քաղցկեղ», «ախտանիշներ ունեցողներից»: natural?
- **U-c, length:** ~2.5 min. The longest beats are 10 (doctors) and 11 (retest + HIV); either can be cut.
- **U-d, HIV line:** keep (checked, see Facts), or replace with another real example of confirmatory testing?
- The course page has an interactive version of the same picture (10,000 squares with sliders); the video could
  end with a pointer to it if the course site is public.

## Production plan (after approval)

1. Voice: 14 beats, Sadaltager, no style prompt: ~45 s, ~$0.05 (paid key; the free one gives ~3-10 calls a day).
2. Timeline + `check_sync.py`; ~1 s.
3. Scenes in the chosen framework (Q7; Remotion by default): ~1.5-2 h, most of it the crowd-grid component, which
   later shorts can reuse (any "out of N people" story).
4. Stills of each new scene, then one draft render, then the final: ~3-5 min per 155 s render.
5. Reviews: contact sheet, then `gemini_review.py` (~$0.02 a pass), then the review page for Hayk.

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md):

- **X25:** the retest beat now says the 99% holds only if the two tests' errors are independent, and that a test
  repeating the same errors leaves it at 50%. The healthy group's second positives are shown as an expectation
  (each has a 1% chance, so usually none of the 10), not as 10 guaranteed clearances. The clinical line points to
  confirmatory testing rules (HIV as the example), not to repeating any test.
- **X26:** "99% accurate" is now introduced as an assumption of this example (finds 99 of 100 sick, flags 1 of 100
  healthy). The doctors claim is narrowed to one teaching session: 160 gynecologists, 21% right before training
  (primary paper: Gigerenzer et al. 2007, Psychological Science in the Public Interest 8(2), p. 55, accessible copy
  https://web.mit.edu/5.95/readings/gigerenzer.pdf). The before/after training result moved out with the doctors beat.
- **X51:** one extension (the retest) kept; the doctors and symptoms extensions are cut (texts below); 9 s of marked
  pauses, the longest (3 s) on the reveal where the viewer counts; the closing has no «Այնպես որ,».

**Cut beats, kept here word for word so they can come back:**

- `doctors`: Սա միայն տեսական խնդիր չէ։ 2007 թվականին 160 գինեկոլոգի տվել են նման հարց՝ կրծքագեղձի քաղցկեղի սկրինինգի մասին։ Ճիշտ է պատասխանել միայն ամեն հինգերորդը։ Իսկ մեկ ժամվա դասից հետո, երբ թվերը բացատրել են մարդկանց քանակով, ճիշտ են պատասխանել 87 տոկոսը։ (screen: 160 գինեկոլոգ) (source line: Gigerenzer et al., 2007)

- `symptoms`: Երկրորդը՝ կարևոր է, թե ով է թեստ անում։ Եթե ախտանիշներ ունես, դու այլևս «հարյուրից մեկը» չես։ Ասենք՝ ախտանիշներ ունեցողներից հիվանդ է ամեն տասներորդը։ Այդ դեպքում նույն դրական պատասխանը նշանակում է մոտ 92 տոկոս։

## Evidence record (Codex review X60, 2026-11-26)

One row per consequential claim in the current script. *Kind*: data (observed), calculation, analogy, story or
interpretation. *Checked*: what was actually read; "secondary" means a summary or encyclopedia, not the source;
"unverified" means nobody has read a source for these exact words yet. Fix the unverified rows before the voice.

| Beat | Claim (as voiced) | Source | Kind | Checked |
|---|---|---|---|---|
| guess | 160 gynecologists in one course; about 1 in 5 (21%) answered right | Gigerenzer et al. 2007, *PSPI* 8(2), p. 55, https://web.mit.edu/5.95/readings/gigerenzer.pdf | data | primary, p. 55, read by Codex; not re-read by Claude |
| crowd-reveal | 1% prevalence, 99% / 99% -> a positive means 50% | own calculation, assumption of the example | calculation | checked: 10 / (10 + 9.9) |
| rarer | 1 in 1000 -> about 9% | own calculation | calculation | checked: 1 / (1 + 10) |
| retest | about 99% after two positives if the errors are independent; 50% if the second test repeats the errors | own calculation (CODEX_REVIEW.md X25) | calculation | checked |
| retest | HIV positives are confirmed by a set testing procedure | CDC / APHL laboratory algorithm; WHO HIV testing information note 2023 (URLs not recorded) | guideline | secondary; record the URLs |
