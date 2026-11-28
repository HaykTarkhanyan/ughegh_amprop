# Short: London's V-1 impacts - chance can contain clusters - script and plan

Draft for Hayk's review, 2026-11-28. Thinking-error strand. Script source: `beats.hy.json`.
The hook follows the fact-check correction: London was deliberately targeted. No voice or render made.

## The idea in one paragraph

A cluster is compatible with a chance model; randomness does not mean evenly spaced dots. In a selected South
London area, observed counts of V-1 impacts per equal square closely matched a fitted Poisson distribution. The
showcase compares Clarke's complete frequency table with its predicted bars. The doubt beat limits the conclusion
to this area and cell size. The single extension is a clearly hypothetical Yerevan dot map that makes the same
comparison local without inventing Armenian incident data. Nothing claims that London itself was untargeted.

## The script (Armenian)

<!-- script:start -->

10 beats, 1,523 characters (1,622 with numbers spelled out): ~108 s of speech, ~2:00 with pauses and the end tail, 9 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Պատահականն էլ է կուտակվում։

**2. target.** Լոնդոնը ռմբակոծում էին դիտմամբ։ Հարցն ուրիշ էր՝ քաղաքի ներսում հարվածների կուտակումները պատահականությա՞ն արդյունք էին, թե՞ առանձին վայրերի հատուկ թիրախավորման նշան։ Այդ կուտակումների մասին պնդումներ կային։

**3. study.** Հարավային Լոնդոնում ընտրեցին 144 քառակուսի կիլոմետր տարածք և բաժանեցին 576 հավասար քառակուսու։ Դրանցում հաշվեցին 537 հարված։ Ամեն քառակուսու կողմը 500 մետր էր։

**4. counts.** 229 քառակուսի դատարկ էր։ Իսկ 35 քառակուսուց յուրաքանչյուրում 3 հարված կար։ Նույն տվյալներում կային թե՛ դատարկ բջիջներ, թե՛ բազմակի հարվածներ ստացած բջիջներ։

**5. model.** Հաշվարկի համար վերցրին Պուասոնի բաշխումը։ Այս մոդելում հարվածներն անկախ են, իսկ միջին խտությունը նույնն է ամբողջ ընտրված տարածքում։ Պատահականն այստեղ չի նշանակում՝ կետերը հավասար հեռավորությամբ են։

**6. showcase.** Նայիր սյուներին։ Իրական քանակների կողքին մոդելի կանխատեսած քանակներն են։ Դրանք շատ մոտ են։ Մոդելն էլ է կանխատեսում դատարկ բջիջներ և նույն բջիջն ընկած մի քանի հարված։ Համեմատի՛ր։ *[pause 5 s]*

**7. doubt.** Ուրեմն ամբողջ Լոնդոնո՞ւմ ամեն հարված պատահական էր։ Այդպիսի բան այս ստուգումը չի ապացուցում։ Այն վերաբերում էր ընտրված տարածքին ու այս չափի բջիջներին։ Այդտեղ տվյալները լրացուցիչ կուտակումների վարկածը չէին հաստատում։

**8. local.** Նույն միտքը փորձիր Երևանի քարտեզով։ Պատկերացրու՝ վրան պատահական նշումներ ես դնում։ Սա մտավոր փորձ է, ոչ քաղաքի մասին տվյալ։ Նշումների մի մասը կարող է իրար մոտ ընկնել՝ առանց հատուկ պատճառի։ *[pause 2 s]*

**9. compare.** Ուրեմն հարցը միայն այն չէ՝ կուտակում կա՞։ Պետք է նաև հարցնել՝ այս պայմաններում պատահական բաշխումն ինչպիսի՞ կուտակումներ կտար։ Դրա հետ է պետք համեմատել տեսածդ։ *[pause 2 s]*

**10. takeaway.** Կուտակումը դեռ հատուկ պատճառի ապացույց չէ։

<!-- script:end -->

Armenian lint: **0 errors, 0 hints** on the final rerun. All `text`, `screen` and `screen_small` strings were
extracted into `%TEMP%/ughegh_london_bombs_script_review.txt` outside the repository and checked with `--style`.
Rule-backed fix: applied the initial `article-before-vowel` hint, «Պատահականը այստեղ» -> «Պատահականն այստեղ»
(A1/A80 house style for new text). No hints retained. Manual polish followed the checklist; U1 is retained.

`plan_script.py london_bombs`: generated length line above, under the default ceiling.
`validate_episode.py london_bombs --stage script`: **PASS**. The unchanged tool entry points ran through `runpy`
with console-only logging and bytecode disabled, avoiding their default writes to repository-level `logs/`.
Only files in the four authorized episode folders were written inside the repository.

## Facts (checked)

Fact-sheet basis: `_knowledge/short_videos/facts_codex_1_statistics_2026-11-28.md`, C2. All sheet-rated facts used
are **high confidence**; no medium- or low-confidence claims are used. Clarke's original single page and its table
were also read directly on the web on 2026-11-28.

- **`target`:** London was deliberately targeted; the question concerns variation inside a selected area. Clarke
  documents assertions that impacts clustered. The script does not assert that spies or specific protected buildings
  caused civilian suspicions, nor assign a number of believers.
  [Clarke, 1946, opening and study description](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf).
- **`study`:** selected area 144 square kilometres in South London, divided into 576 squares of 1/4 square kilometre;
  537 impacts in the unspecified observation period. The 500 m side is the sheet's high-confidence calculation from
  the square area, not 250 m. No exact boundaries, street names or attack dates are invented.
  [Clarke, study description](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf).
- **`counts`, `showcase`:** the following is the complete reported table, with the original rounding. The 229 empty
  squares and 35 squares with 3 hits come from it. The narration compares categories, never claims those squares
  were geographically adjacent. [Clarke, table](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf).

  | Hits per square | Observed squares | Poisson-expected squares |
  |---|---:|---:|
  | 0 | 229 | 226.74 |
  | 1 | 211 | 211.39 |
  | 2 | 93 | 98.54 |
  | 3 | 35 | 30.62 |
  | 4 | 7 | 7.14 |
  | 5 or more | 1 | 1.57 |
  | Total | 576 | 576.00 |

- **`model`:** the Poisson comparison assumes independent impacts and a constant underlying mean density within
  the selected area. Its fitted mean is 537/576, not an independently known attack rate. The manuscript explicitly
  describes approximately constant underlying density; the voice's exact constancy describes the model, not a
  proven property of all the historical impacts.
  [Clarke, area selection and formula](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf).
- **`doubt`:** the fit did not support extra clustering at that scale; it does not prove an absence of targeting or
  that the whole city was uniformly random. A later reanalysis qualifies the London-wide textbook retelling; its
  southward-skew detail is not added to the narration.
  [Clarke, conclusion](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf);
  [Shaw & Shaw, 2019, fact-sheet source for the wider limitation](https://academic.oup.com/jrssig/article/16/5/12/7029379).
- **`local`, `compare`, `takeaway`:** the Yerevan map is an explicitly labelled thought experiment, not a dataset.
  No local counts, measured rates, locations or real incidents are claimed. The city name was independently checked
  against the [official Yerevan site](https://www.yerevan.am/en/). Applying the chance comparison is our explanation
  of [Clarke's method](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf), not a new local finding.

Excluded: the medium-confidence accuracy reconstruction, exact German aiming point, civilian spy stories and
individual coordinates. No p-value is voiced or interpreted as a probability that randomness is true.

## Animation plan (showcase)

**Showcase: paired observed and expected histogram bars (`counts` through `showcase`).** Start with the observed
categories, then overlay the expected bars from the table above. Both series use the same zero baseline and scale;
label the axes as impacts per square and number of squares. Keep all categories visible, including 5 or more.
Warm white is observed; orange outlines are the model. Show exact table values with Armenian decimal commas in the
rendered graphic. No invented error bars, simulation totals or rounded replacements.

The viewer compares empty squares and repeated-hit squares during a **5 s** silent hold, the longest pause.
Do not use Clarke's counts to invent a geographic map of actual hits. Any grouped square tiles are labelled
«տվյալների սխեմա» and represent frequency categories. Any spatial scatter has a persistent «մոդելավորում» label.
The full original table remains available here for review before graphic production.

- **`hook`:** a schematic scatter already contains empty patches and close dots in its first frame; model label
  visible immediately.
- **`target`:** a drawn V-1 silhouette and London label, tagged «նկարազարդում». No invented damage scene, people or
  location. The city is visibly the target.
- **`study`:** show the selected area as an unlocated schematic box; display 144 square kilometres, 576 squares,
  537 impacts and a separate 500 m side bracket. Do not suggest that the exact study boundary is known.
- **`model`, `doubt`:** put model assumptions beside the histogram, then contain the conclusion within its selected
  area frame. No claim of randomness across the whole city.
- **`local`:** schematic Yerevan card with no streets or actual incident positions; permanent «մտավոր փորձ» and
  «մոդելավորում» labels. Hold **2 s** to inspect possible clumps.
- **`compare`:** the model and hypothetical scatter share the frame from its first instant; **2 s** for comparison.
  Marked silence totals **9 s**.
- **`takeaway`:** end inside the scatter, voice saying the complete screen phrase, with no summary card.
  Every beat starts with something it names already visible.

## Images

Optional file from the C2 sheet: [File:V-1 flying bomb, Science Museum, London.jpg](https://commons.wikimedia.org/wiki/File:V-1_flying_bomb,_Science_Museum,_London.jpg),
photographer **The wub**, **CC BY-SA 4.0**. This is a museum photograph, not an image of an attack. No download made;
the current plan works with original vectors. If used later, preserve its attribution, licence link and change
record in the production credits. No new licence verification is claimed here beyond the sheet's checked entry.

## Questions for Hayk

- **S1, hook:** keep «Պատահականն էլ է կուտակվում», or prefer «Պատահական հարվածներն էլ են կուտակվում»? The short
  substantivized wording is left for native review, not treated as a linguistic error.
- **S2, model wording:** is «միջին խտությունը» clear in speech, or would «հարվածների միջին խտությունը» help?
  «Պուասոնի բաշխում» is the glossary's exact term.
- **S3, local extension:** keep the explicitly hypothetical Yerevan map? No local evidence is available in the sheet;
  exact London boundaries and individual coordinates remain unavailable and are deliberately absent.

