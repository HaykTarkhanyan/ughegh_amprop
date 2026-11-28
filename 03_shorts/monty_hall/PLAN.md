# Short: Monty Hall - stick or switch? - script and plan

Draft for Hayk's review, 2026-11-28. Thinking-error strand. Script source: `beats.hy.json`.
The doors are a mathematical thought game, not a reconstruction of an actual broadcast. No voice or render made.

## The idea in one paragraph

The viewer chooses whether to stay or switch before learning the answer. Under explicitly stated rules, switching
wins with probability 2/3 and staying with 1/3: switching wins precisely when the first choice was wrong. The host
knows the prize location, always reveals an unchosen goat and always offers a switch; when both goats are available,
the choice between them is fair. The showcase enumerates the equally likely prize placements. The single extension
changes the host into an uninformed random opener: conditional on a goat appearing, the chances become equal.
The local anchor is a hypothetical prize in drams, with no invented amount or claim about an Armenian game show.

## The script (Armenian)

<!-- script:start -->

10 beats, 1,517 characters (1,581 with numbers spelled out): ~107 s of speech, ~1:59 with pauses and the end tail, 10 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Կփոխե՞ս դուռը։

**2. game.** Պատկերացրու՝ խաղում ես դրամով մրցանակի համար։ Կա 3 դուռ։ Մրցանակը հավասար հավանականությամբ կարող է լինել դրանցից յուրաքանչյուրի հետևում։ Մյուս 2 դռների հետևում այծեր են։ Ընտրում ես դուռը, բայց դեռ չես բացում։

**3. host_rules.** Հաղորդավարը գիտի՝ որտեղ է մրցանակը։ Նա միշտ բացում է քո չընտրած դռներից այծով դուռ և միշտ առաջարկում է փոխել ընտրությունդ։ Եթե այծով 2 դուռ ունի ընտրելու, ընտրում է պատահական՝ հավասար հավանականությամբ։

**4. choose.** Դու ընտրեցիր 1-ին դուռը։ Հաղորդավարը բացեց 3-րդը՝ այծ։ Մնում են քո դուռն ու 2-րդը։ Կմնա՞ս քո ընտրածի հետ, թե՞ կփոխես։ Հիմա որոշի՛ր։ *[pause 5 s]*

**5. answer.** Այս կանոններով փոխելիս շահելու հավանականությունը 2/3 է, մնալիս՝ 1/3։ Փոխելը կրկնապատկում է հնարավորությունդ։ Բայց ինչո՞ւ, եթե փակ դռները հիմա 2-ն են։ *[pause 1 s]*

**6. three_cases.** Նայիր բոլոր 3 հավասարահավանական դեպքերին։ Սկզբում միշտ ընտրում ես 1-ին դուռը։ Եթե մրցանակն այնտեղ է, փոխելիս պարտվում ես։ Եթե մրցանակը մյուս դռներից որևէ մեկի հետևում է, հաղորդավարը բացում է մնացած այծով դուռը։ Փոխելիս շահում ես։

**7. count.** Այս 3 դեպքից 2-ում սկզբում սխալ դուռ էիր ընտրել, և փոխելը փրկում է ընտրությունդ։ Մնալը շահում է միայն այն դեպքում, երբ հենց սկզբից գտել էիր մրցանակը։ Հաշվի՛ր սլաքները։ *[pause 2.5 s]*

**8. doubt.** Բայց այծ տեսնելը մի՞շտ է փոխելու պատճառ։ Ոչ։ Պատասխանը կախված է բացելու կանոնից։ Մեր հաշվարկում հաղորդավարն իմանալով է բացում այծով դուռը։

**9. random_host.** Իսկ եթե նա մրցանակի տեղը չգիտի, պատահական բացում է քո չընտրած դռներից մեկը, և պատահմամբ այծ է դուրս գալիս, արդեն հավանականությունները հավասար են՝ 1/2 ու 1/2։ Նույն տեսարանը, ուրիշ կանոն։ *[pause 1.5 s]*

**10. takeaway.** Հաջորդ անգամ, երբ թվա՝ մնացել է 2 տարբերակ, ուրեմն հավասար են, հարցրո՛ւ՝ ինչպե՞ս բացվեց դուռը։

<!-- script:end -->

Armenian lint: **0 errors, 0 hints**, initial and final runs. All `text`, `screen` and `screen_small` strings were
extracted into `%TEMP%/ughegh_monty_hall_script_review.txt` outside the repository and checked with `--style`.
No hints retained. Manual polish followed the checklist; U1 singular address is retained.

`plan_script.py monty_hall`: generated length line above, under the default ceiling.
`validate_episode.py monty_hall --stage script`: **PASS**. The unchanged tool entry points ran through `runpy`
with console-only logging and bytecode disabled, avoiding their default writes to repository-level `logs/`.
Only files in the four authorized episode folders were written inside the repository.

## Facts (checked)

Fact-sheet basis: `_knowledge/short_videos/facts_codex_1_statistics_2026-11-28.md`, C3. All sheet-rated facts used
are **high confidence**; no medium- or low-confidence claims are used. Sources below attach to the current beats,
not to unused anecdotes. Core mathematical results also checked directly in Rosenthal's manuscript on 2026-11-28.

- **`game`, `host_rules`, `choose`:** the standard problem has 3 doors, equally likely prize locations, a knowledgeable
  host and an unchosen losing-door reveal followed by a switch offer. The narration explicitly makes both actions
  compulsory. The fair tie-break is needed for the stated probabilities after a particular numbered door opens.
  [Rosenthal, published 2008, manuscript pp. 1-4](https://probability.ca/jeff/writing/montyfall.pdf);
  [Rosenhouse, standard formalization and host policy](https://api.pageplace.de/preview/DT0400.9780199709908_A35484108/preview-9780199709908_A35484108.pdf).
- **`answer`, `three_cases`, `count`:** staying wins with probability 1/3, switching with 2/3. Switching succeeds
  whenever the initial choice was wrong. Doubling is the ratio of these probabilities. The 3-row display enumerates
  possible placements; it does not promise exactly 2 wins in every 3 real plays.
  [Rosenthal, pp. 1-4](https://probability.ca/jeff/writing/montyfall.pdf).
- **`doubt`, `random_host`:** when an uninformed host opens an unchosen door uniformly at random and it happens to
  reveal a goat, each remaining door has conditional probability 1/2. Both the random procedure and the conditioning
  event are voiced. This is a different protocol, not a retraction of the standard answer.
  [Rosenthal, Monty Fall and its calculation](https://probability.ca/jeff/writing/montyfall.pdf).
- **Local adaptation, explicitly hypothetical:** replace the original car with an unnumbered cash prize. Only the
  prize icon changes; no probability or rule changes. The dram is Armenia's currency, independently checked against
  the [Central Bank's banknotes page](https://www.cba.am/en/banknotes-in-circulation). This is not a documented local
  contest, and no prize amount is introduced.
- **Editorial inference, `takeaway`:** the revealing procedure matters to the inference. This is the lesson drawn
  from the two verified protocols, not a claim that switching always helps.
  [Rosenthal's comparison](https://probability.ca/jeff/writing/montyfall.pdf).

Excluded: letter totals, PhD signatures, the Erdős recollection, student switching rates and claims that the actual
television show always used these rules. No fact depends on those medium-confidence anecdotes.

## Animation plan (showcase)

**Showcase: choose first, then see every starting possibility (`choose` through `count`).** Keep the warm-white
doors on the series' near-black background, orange for the selected door and winning paths, red for losing paths.
The thought-game label stays visible. Door 1 is selected, door 3 opens onto a goat and the viewer gets a **5 s**
silent decision hold with no answer visible. This is the longest pause, inside the showcase. Only after it finishes
do the 1/3 and 2/3 labels appear. Then show the complete case diagram:

| Prize behind | Initial choice | Host reveals | Stay | Switch |
|---|---|---|---|---|
| Door 1 | Door 1 | Door 2 or 3, each equally likely | Win | Lose |
| Door 2 | Door 1 | Door 3 | Lose | Win |
| Door 3 | Door 1 | Door 2 | Lose | Win |

The first row's two legal reveals are branches of the same prize placement, not extra equally weighted prize
placements. Keep each row's total probability 1/3. At `count`, hold the complete diagram for **2.5 s**, letting the
viewer count the winning paths. No invented simulated trial count, fluctuating win total or claim about a particular
run of games. A **1 s** answer pause and **1.5 s** random-host pause bring marked silence to **10 s**.

- **`hook`, `game`:** closed doors and an unnumbered dram prize envelope appear immediately; the first spoken
  sentence is the puzzle. Reveal alternate hidden arrangements as possibilities, not actual prizes being moved.
- **`host_rules`:** a private knowledge card and compulsory-reveal/offer arrows make the host's information visible.
  Show the fair choice when either goat can legally be revealed.
- **`doubt`, `random_host`:** reset to a visibly different host without the knowledge card. Show the uniformly random
  unchosen-door openings, including prize-reveal paths; filter explicitly to goat-reveal paths before showing 1/2
  and 1/2. Do not silently treat a knowing host as an uninformed one.
- **`takeaway`:** close on the opening hand and knowledge card. The narration says the screen phrase. No summary
  card. Every beat's first frame already contains an object named in that beat.

## Images

None needed; the C3 sheet recommends original doors, goats and prize icons. Use an original envelope marked in
drams, not an image of a numbered banknote. No downloaded assets or historical show footage.

## Questions for Hayk

- **S1, wording:** keep «փոխելը փրկում է ընտրությունդ», or prefer the more literal «փոխելիս շահում ես»? The draft
  keeps the former; this is an owner wording choice, not a rule-based correction.
- **S2, closing:** keep «ինչպե՞ս բացվեց դուռը», or make the host's action explicit with «հաղորդավարն ինչպե՞ս ընտրեց
  բացվող դուռը»? The shorter question is currently voiced and shown.

