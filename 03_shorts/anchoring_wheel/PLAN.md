# Short: Anchoring - a wheel moves the groups' guesses - script and plan

Draft for Hayk's review, 2026-11-28. Thinking-error strand. Script source: `beats.hy.json`.
The famous outcomes are group medians, not individual changes. No voice or render made.

## The idea in one paragraph

An irrelevant starting number can pull subsequent numerical estimates toward it. Participants saw a wheel number,
compared a historical UN-membership percentage with it, then estimated that percentage. The groups shown 10 and 65
had median estimates of 25% and 45%. The showcase puts these two reported group results on identical scales without
inventing individual responses. The doubt beat limits the claim to the measured groups. The one extension is a
dram-denominated price tag, explicitly an everyday illustration rather than an Armenian experiment; unlike the
wheel, a price tag may contain relevant product information.

## The script (Armenian)

<!-- script:start -->

10 beats, 1,458 characters (1,502 with numbers spelled out): ~102 s of speech, ~1:53 with pauses and the end tail, 9 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Անիվը փոխեց գուշակությունները։

**2. question.** Փորձի հարցը սա էր՝ ՄԱԿ-ի անդամ երկրների քանի՞ տոկոսն են աֆրիկյան երկրները։ Նախքան պատասխանելը մասնակիցներն անիվի պտույտ էին տեսնում։ Անիվը երկրների մասին ոչինչ չէր հայտնում։

**3. wheel.** Անիվը համարակալված էր 0-ից 100։ Բայց այն այնպես էին սարքել, որ խմբից կախված՝ կանգ առներ 10-ի կամ 65-ի վրա։ Թիվը թվում էր պատահական, իսկ հետազոտողները նախապես որոշել էին այն։

**4. procedure.** Մարդիկ նախ ասում էին՝ իրենց փնտրած տոկոսը ցուցադրված թվից բա՞րձր է, թե՞ ցածր։ Հետո տալիս էին իրենց գնահատականը։ Հարցը նույնն էր, անիվի թիվը՝ տարբեր։

**5. showcase.** 10 տեսած խմբի պատասխանների մեդիանը 25 տոկոս էր։ 65 տեսած խմբինը՝ 45 տոկոս։ Կողք կողքի նայիր՝ անիվի ավելի մեծ թվին հետևում էր նաև ավելի մեծ գնահատականը։ *[pause 5 s]*

**6. median.** Մեդիանը պատասխանները փոքրից մեծ դասավորելիս կենտրոնը ցույց տվող թիվն է։ Այսինքն՝ այստեղ համեմատում ենք խմբերը։ Չենք չափել, թե նույն մարդն անիվից առաջ ու հետո որքան փոխեց իր կարծիքը։

**7. anchor.** Սա խարսխման ազդեցությունն է։ Առաջին թիվը կարող է խարսխի պես պահել հետագա գնահատականդ իր մոտ, նույնիսկ երբ հարցի պատասխանի մասին տեղեկություն չի տալիս։ *[pause 1 s]*

**8. doubt.** Բայց այս թվերից չես իմանա՝ կոնկրետ դու որքան կազդվես։ Դրանք չեն նշանակում, թե ամեն մարդ նույնքան փոխեց պատասխանը։ Չափվածը տարբեր թվեր տեսած խմբերի պատասխանների տարբերությունն է։

**9. local_price.** Հիմա պատկերացրու դրամով գնապիտակ։ Մինչ քո գնահատականը տալը, արդեն վաճառողի թիվն ես տեսել։ Սա առօրյա օրինակ է, ոչ Հայաստանում արված փորձի արդյունք։ Գնապիտակն էլ, ի տարբերություն անիվի, կարող է ապրանքի մասին տեղեկություն տալ։ *[pause 2 s]*

**10. takeaway.** Թիվը գնահատելիս հարցրո՛ւ՝ առաջին թիվը որտեղի՞ց եկավ։ *[pause 1 s]*

<!-- script:end -->

Armenian lint: **0 errors, 0 hints**, initial and final runs. All `text`, `screen` and `screen_small` strings were
extracted into `%TEMP%/ughegh_anchoring_wheel_script_review.txt` outside the repository and checked with `--style`.
No hints retained. Manual polish followed the checklist; U1 singular address is retained. «մեդիան» and
«գնահատական» follow the glossary; the missing anchoring term is left as S1, not recorded as an owner decision.

`plan_script.py anchoring_wheel`: generated length line above, under the default ceiling.
`validate_episode.py anchoring_wheel --stage script`: **PASS**. The unchanged tool entry points ran through `runpy`
with console-only logging and bytecode disabled, avoiding their default writes to repository-level `logs/`.
Only files in the four authorized episode folders were written inside the repository.

## Facts (checked)

Fact-sheet basis: `_knowledge/short_videos/facts_codex_2_mind_2026-11-28.md`, C4. All sheet-rated facts used are
**high confidence**; no medium- or low-confidence claims are used. The 1974 paper's procedure and medians were also
read directly on the web on 2026-11-28. No direct replication of the full wheel procedure is claimed.

- **`question`, `procedure`:** the task involved a wheel-generated number, a higher/lower comparison, then a
  percentage estimate. The intended denominator is all UN member countries: what percentage were African? The
  Armenian wording makes this explicit. It does not ask what percentage of African countries belonged to the UN.
  The question is historical; the video supplies no present-day membership count or correct percentage.
  [Tversky & Kahneman, 1974, p. 1128](https://pages.ucsd.edu/~mckenzie/TverskyKahneman1974Science.pdf).
- **`wheel`:** the 0-100 wheel and conditions 10/65 are sheet-rated high. The deliberate stopping arrangement is
  documented in Shleifer's review of Kahneman's retrospective; the original short article gives less apparatus
  detail. This is a secondary procedural account, not a newly recovered lab protocol. The drawn stop mechanism is
  explanatory only. [Shleifer, 2012](https://shleifer.scholars.harvard.edu/sites/g/files/omnuum10626/files/shleifer/files/kahneman_review_jel_final.pdf);
  [original paper, p. 1128](https://pages.ucsd.edu/~mckenzie/TverskyKahneman1974Science.pdf).
- **`showcase`, `median`, `doubt`:** median estimates were 25% for the group given 10 and 45% for the group given 65.
  These are between-group results, not a 20-point change measured within every individual. No participant count,
  dispersion, individual trajectories or raw response distribution is provided or invented.
  [Tversky & Kahneman, p. 1128](https://pages.ucsd.edu/~mckenzie/TverskyKahneman1974Science.pdf).
- **`median`, explanatory definition:** a median describes the centre of observations sorted by value. This plain
  wording does not substitute the arithmetic mean; for an even number of observations the conventional median
  averages the central pair. The narration does not introduce a numerical example. This definition was independently
  verified in the [NIST handbook, Measures of Location](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm).
- **`hook`, `anchor`:** the original paper identifies anchoring as estimates biased toward initial values. The voice
  says it **can** influence later estimates, not that any number always controls every person. The anchor image is
  a metaphor, not a demonstrated mechanism in the brain.
  [Tversky & Kahneman, p. 1128](https://pages.ucsd.edu/~mckenzie/TverskyKahneman1974Science.pdf).
- **`local_price`:** an original illustration, not a claim of a tested Armenian price effect. No amount, discount,
  effect size, actual purchase or domestic study is asserted. The caveat that prices can be informative follows the
  sheet's distinction between the irrelevant wheel and listing-price anchors.
  [Northcraft & Neale, 1987, house-information/listing-price task](https://www.smallprojectsbureau.com/wp-content/uploads/2020/01/northcraft_neale.pdf).
  Only the currency identity is independently checked: [Central Bank of Armenia, banknotes](https://www.cba.am/en/banknotes-in-circulation).
- **`takeaway`:** asking where the first number came from is the video's practical reflection. It is not presented
  as an experimentally established cure for anchoring.
  [Conceptual basis: Tversky & Kahneman](https://pages.ucsd.edu/~mckenzie/TverskyKahneman1974Science.pdf).

Excluded: loaded-dice sentencing results, house-price outcome figures and Many Labs statistics. Many Labs used
different anchoring tasks, not this wheel/UN procedure; it cannot fill the fact sheet's wheel-specific replication
gap. The original report's limited methodological detail remains a limitation, not a reason to invent it.

## Animation plan (showcase)

**Showcase: two wheel conditions, two group medians (`wheel` through `median`).** From the first wheel frame, keep
«վերակազմություն» visible. Separate the 10 and 65 conditions, ask the same comparison question and then reveal the
25% and 45% median markers on identical 0-100 percentage scales. Call them **group medians** in the graphic as well
as the voice. Do not slide one person's answer from low to high; do not create fake response dots, sample sizes,
means or error bars. Keep the markers fixed during the **5 s** silent showcase hold so the viewer can compare the
input/output pairs. The counts and values all come from the sheet; no simulation is needed.

- **`hook`, `question`:** wheel and empty group-result space already visible; the historical question has the correct
  UN-member denominator. No claim that the wheel informs the answer.
- **`procedure`:** higher/lower comparison precedes the estimate. The stop mechanism is a conceptual reconstruction
  with no assertion about the historical machinery's design.
- **`median`, `anchor`:** retain the reported group results, emphasize their group labels, then add the anchor
  metaphor. No invented ordered list of individual responses. A **1 s** pause lets the metaphor settle.
- **`doubt`:** an empty viewer-answer card appears beside the group markers, with no predicted individual effect.
  Finish on what was measured: a difference between groups exposed to different starting numbers.
- **`local_price`:** original price tag says «գին՝ … դրամ», explicitly an everyday illustration. Hold **2 s** for
  the viewer to consider their own estimate. The ellipsis avoids inventing a price or implying a measured effect.
- **`takeaway`:** stay on the tag and trace it to its source; voice says the closing screen phrase. **1 s** of silent
  pause here makes **9 s** total. No recap card. Every beat starts on an object or result it discusses.

## Images

None needed; the C4 sheet recommends original wheel and chart graphics. The dram price tag is drawn from scratch,
with no store logo, amount or banknote. No assets downloaded.

## Questions for Hayk

- **S1, missing glossary term:** «խարսխման ազդեցություն» for anchoring is not in the supplied glossary or owner
  answers. Keep it, or prefer «խարսխում»? The current term remains provisional in `anchor`.
- **S2, hook:** «գուշակությունները» or «գնահատականները» for the hook? The former is currently used for the viewer's
  first encounter; the measured answers are called «գնահատական» in the explanation.
- **S3, median explanation:** keep «կենտրոնը ցույց տվող թիվն է», or prefer a different spoken explanation of
  «մեդիան»? The term itself matches glossary row 616; the source uses medians, so it must not become «միջին».

