# Showcase 4: Stanislav Petrov, the Soviet officer who treated a 1983 nuclear alarm as false, and was right - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17); after approval: full animation (Q16, showcase) in Remotion
(DECISIONS.md #21). Script source: `beats.hy.json`.

## The idea in one paragraph

On the night of 26 September 1983, weeks after the Soviets shot down a Korean airliner, the Oko early-warning system
told Lt. Col. Stanislav Petrov that the USA had launched one missile, then four more. He reported a system error:
a war does not start with five missiles, the system was new, ground radars saw nothing. He was right (sunlight off
high clouds over North Dakota), though he admitted he was never fully sure. He reasoned like the Bayes short: not
"what does the alarm say" but "what is more likely". Whether he alone saved the world is debated; he got no reward,
the story came out in 1998, and he died in 2017.

## The script (Armenian)

<!-- script:start -->

12 beats, 1,824 characters (1,824 with numbers spelled out): ~126 s of speech, ~2:16 with pauses and the end tail, 8 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Խորհրդային համակարգը հայտնեց՝ ԱՄՆ-ից հրթիռներ են արձակվել։ Մարդը, որը պետք է զեկուցեր, որոշեց չհավատալ համակարգչին։

**2. context.** Տարին ամենալարվածներից էր։ Մեկ ամիս էլ չէր անցել, ինչ ԽՍՀՄ-ը խոցել էր կորեական ուղևորատար ինքնաթիռ։ Երկու կողմն էլ սպասում էր հարձակման։

**3. bunker.** Մոսկվայի մոտ գտնվող բունկերում հերթապահում էր փոխգնդապետ Ստանիսլավ Պետրովը։ Նրա գործը «Օկո»՝ «աչք» կոչվող արբանյակային համակարգի տվյալներին հետևելն էր։

**4. alarm.** Կեսգիշերից քիչ անց ազդանշանը միացավ՝ մեկ հրթիռ։ Հետո ևս չորս։ Համակարգը հայտնում էր հրթիռային հարձակման մասին։ *[pause 1.5 s]*

**5. stakes.** Եթե Պետրովը զեկուցեր հարձակման մասին, ղեկավարությունն ընդամենը մի քանի րոպե կունենար որոշելու՝ պատասխանե՞լ, թե՞ ոչ։ *[pause 2 s]*

**6. reasoning.** Նա կշռադատեց։ Ավելի ուշ պատմել է՝ պատերազմը հինգ հրթիռով չեն սկսում։ Համակարգը նոր էր։ Իսկ ցամաքային ռադարները, որոնք հրթիռները կտեսնեին ավելի ուշ, դեռ ոչինչ ցույց չէին տալիս։ *[pause 1.5 s]*

**7. decision.** Նա զեկուցեց, որ դա համակարգի սխալ է։ Ավելի ուշ ասել է՝ «Որոշեցի չհավատալ համակարգչին»։ Եվ նա ճիշտ էր։ *[pause 1.5 s]*

**8. unsure.** Բայց ինքն էլ վստահ չէր։ Հետո խոստովանել է, որ այդ պահին երբեք լիովին վստահ չի եղել։ Րոպեները, մինչև պարզ դարձավ, որ հրթիռներ չկան, նրա համար անվերջ էին թվում։

**9. cause.** Հետո պարզվեց պատճառը՝ արևի լույսն անդրադառնում էր բարձր ամպերից Հյուսիսային Դակոտայի վրա, և արբանյակները դա ընդունեցին հրթիռի կրակի տեղ։ *[pause 1.5 s]*

**10. bayes.** Պետրովը մտածում էր այնպես, ինչպես Բայեսի մասին մեր տեսանյութում։ Ազդանշանը կարևոր է, բայց այն պետք է կշռել երեք բանի հետ՝ որքան հավանական էր հարձակումն առանց դրա, որքան վստահելի է համակարգը, և ինչ են ասում մյուս աղբյուրները։ Հինգ հրթիռով պատերազմը, նոր համակարգը և լուռ ռադարները միասին ասում էին՝ ավելի հավանական է սխալը։

**11. honesty.** Արդյո՞ք նա միայնակ փրկեց աշխարհը։ Պատմաբանները վիճում են։ Նա ինքը հրթիռ արձակել չէր կարող, և հայտնի չէ, թե ինչ կորոշեր ղեկավարությունը։ Բայց վերև հասավ հենց նրա գնահատականը։

**12. takeaway.** Երբ մեքենան ասում է՝ «հաստատ է», ստուգիր ազդանշանը մնացածի հետ՝ որքա՞ն հավանական էր սա առանց դրա, և ի՞նչ են ասում մյուս աղբյուրները։

<!-- script:end -->

Armenian lint: 0 errors, 0 hints.

## Facts (checked)

- **The night** (Wikipedia "1983 Soviet nuclear false alarm incident", Britannica, History.com, APS News 2026,
  Physics Today, NTI): 26 Sep 1983, Serpukhov-15 bunker near Moscow, Lt. Col. Petrov on duty watching the Oko
  satellites; the system reported one Minuteman launch, then four more (5 in total, from a North Dakota base); ground
  radar showed nothing; he judged it a malfunction. "I made a decision not to believe the computer." In a 2013
  interview he said he was never sure the alarm was wrong.
- **Cause:** sunlight on high-altitude clouds over North Dakota, aligned with the satellites' Molniya orbits.
- **"A war does not start with five missiles"**: widely quoted from his later interviews (e.g. the Washington Post,
  1999); not confirmed word for word in the searches here, so the script gives it as what he "later said", in
  paraphrase. To check against a primary interview before the voice is made.
- **Context:** Korean Air Lines Flight 007 was shot down on 1 Sep 1983 (said "less than a month before").
- **Role debated:** he could not launch anything himself; accounts differ on how he reported it; some analysts doubt
  his role; post-Soviet Russia gave him no award. The script says historians argue.
- **After:** the story became known through Col. Gen. Yury Votintsev's 1998 memoir (other sources mention 1990s press);
  Dresden Peace Prize 2013; died 19 May 2017, aged 77.

## Animation plan (showcase)

- **Bunker mood:** dark room, red warning lamp, a stylised early-warning screen (not a copy of the real one) with a
  map, blips counting 1 -> 5, a siren pulse. Tension through slow pushes and a ticking clock.
- **Orbits:** satellites on high elliptical orbits; the sun-glint diagram (sun low, light off cloud tops into the
  sensor).
- **Reasoning cards** and a **balance scale** (beat 10) that links to the Bayes short's crowd of dots.
- **Chain of command** as boxes with question marks (beats 5, 11); a short end timeline.
- Mostly vector shapes and text; no real photos needed (a portrait could come from Commons if a free one exists:
  to check).
- To build: `Radar` screen, `Orbit` diagram, `Scale`, `CommandChain`. Estimated 2 h.

## Questions for Hayk (review points)

- **U-y, terms:** «փոխգնդապետ», «հերթապահում էր», «ցամաքային ռադարներ», «Օկո»՝ «աչք»: natural?
- **U-z, the Bayes link (beat 10):** keep (ties the channel together; only works if the Bayes short is out first)?
- **U-aa, sensitivity:** the topic involves the USSR, the USA and nuclear war; the script stays factual and neutral.
  Any line you would phrase differently for an Armenian audience?
- U-a («դու» vs «դուք») applies here too.

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md):

- **X45:** the lesson no longer contrasts "what the alarm says" with "how likely war was without it" (that teaches
  ignoring the evidence; a rare event can become likely after strong enough evidence). The Bayes beat now weighs the
  alarm against three things: the prior, the system's reliability and the other sources; the closing says to check the
  signal against the rest. The radar line now says the ground radars, which would see missiles later, showed nothing
  yet (a negative observation is limited by detection range and timing).
- **X51:** the date left the opening (source line), the award biography is cut (text below), 8 s of pauses, no
  «Այնպես որ,».

**Cut beats, kept here word for word so they can come back:**

- `after`: Պետրովին չպարգևատրեցին, և պատմությունը հայտնի դարձավ միայն 1998 թվականին։ Հետագայում նա միջազգային մրցանակներ ստացավ, այդ թվում՝ Դրեզդենի խաղաղության մրցանակը 2013 թվականին։ Մահացավ 2017 թվականին։

## Evidence record (Codex review X60, 2026-11-26)

One row per consequential claim in the current script. *Kind*: data (observed), calculation, analogy, story or
interpretation. *Checked*: what was actually read; "secondary" means a summary or encyclopedia, not the source;
"unverified" means nobody has read a source for these exact words yet. Fix the unverified rows before the voice.

| Beat | Claim (as voiced) | Source | Kind | Checked |
|---|---|---|---|---|
| hook, alarm | the system reported one launch, then four more | Wikipedia '1983 Soviet nuclear false alarm incident'; Britannica | data (historical) | secondary only |
| reasoning | 'a war does not start with five missiles' (later interview) | attributed to his later interviews, e.g. Washington Post 1999 | quote, paraphrased | unverified: not found word for word |
| reasoning | ground radars showed nothing yet | Wikipedia, Britannica | data | secondary only |
| decision | 'I decided not to believe the computer' | his later interviews (cited by Wikipedia) | quote | secondary only |
| unsure | he was never fully sure | 2013 interview (cited by Wikipedia) | quote | secondary only |
| cause | sunlight on high clouds over North Dakota | Wikipedia, NTI | data | secondary only |
| bayes | weigh the alarm against the prior, the system's reliability and other sources | the channel's reading of the story | interpretation | labelled as our framing |
| honesty | historians debate his role | Wikipedia | interpretation | secondary only |
