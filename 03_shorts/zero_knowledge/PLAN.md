# Long video: Zero-knowledge proofs (horizontal 16:9, narrated by Hayk) - script and plan

Rewritten 2026-11-25 to Hayk's structure, as **the channel's first video** (DECISIONS.md #23). Two videos (Q18): this
long explainer (horizontal 16:9, Q19, about 4-5 min) and a short intro, `../zero_knowledge_short/` (vertical,
about 1 min). **Hayk narrates both himself** (one take, free reading, Q21); the animation is fitted to his
recording. Script source: `beats.hy.json`. The earlier TTS version of this short is in git history (commit
8e2e7a3).

## Hayk's structure, and where it is in the script

1. **The motivating question:** your friend wants to gossip about Ani, but does she really know the secret, or is
   she fishing? How can you both find out without anyone saying it? (beat 1)
2. **The same problem in real life:** a website checking your password without receiving it, a bank checking your
   income is enough without the exact number, an age check without your birth date. Named: zero-knowledge proof.
   (beats 2-3)
3. **The easy example, the cave:** a ring-shaped cave, two paths joined by a door that opens with a secret word;
   she goes in by a path you cannot see, you shout which side to come out of; with the word she always can,
   without it only half the time; 20 rounds = one in a million. (beats 4-6)
4. **Why "zero knowledge":** a video of the cave convinces nobody, because it could be faked by agreeing on the
   calls or cutting the failures; you leave with conviction and nothing you can pass on. (beat 7)
5. **The red card:** draw a card, say "red", then show that all 26 black cards are still in the rest of the deck:
   proved in one step, and nobody learns which red card it is. (beat 8)
6. **The two balls, repeated (Q20):** the colour-blind friend swaps or not; you are right every time; if the balls
   were the same you could only guess; 20 rounds; he still does not know which is red. (beats 9-10)
7. **Real systems, then back to the gossip:** maths puzzles instead of caves, done by computers in a fraction of a
   second (a bank's salary-range proof, EU age checks, private cryptocurrencies); and the gossip itself has a real
   answer: some secure chats let two people check that they typed the same answer without showing it. (beats 11-12)
8. **Close:** proving and revealing are not the same thing. (beat 13)

## The script (Armenian)

<!-- script:start -->

13 beats, 3,744 characters (3,761 with numbers spelled out): ~259 s of speech, ~4:38 with pauses and the end tail, 16.5 s of them marked silent pauses (estimate, calibrated on 2 measured beats, about +-10%).

**1. gossip.** Ընկերուհիդ գրում է՝ «Լսե՞լ ես Անիի մասին»։ Դու մի գաղտնիք գիտես Անիի մասին։ Բայց չգիտես՝ ընկերուհիդ էլ գիտի՞ նույնը, թե ուզում է քեզնից իմանալ։ Եթե առաջինը դու պատմես, իսկ նա չգիտեր, գաղտնիքը դու ես տարածել։ Նա էլ նույն վախն ունի։ Ուրեմն ինչպե՞ս պարզել, որ երկուսդ էլ գիտեք, առանց որևէ մեկի բարձրաձայնելու։ *[pause 1.5 s]*

**2. same_problem.** Թվում է՝ բամբասանքի խնդիր է։ Բայց հենց նույն խնդիրն ամեն օր լուծում են կայքերն ու բանկերը։ Կայքը պետք է համոզվի, որ գիտես գաղտնաբառդ, բայց ավելի ապահով է, եթե գաղտնաբառն ինքը երբեք չուղարկես։ Բանկը պետք է իմանա, որ եկամուտդ բավական է վարկի համար, բայց պարտադիր չէ, որ իմանա ճշգրիտ թիվը։ Իսկ կայքը պետք է իմանա, որ 18 տարեկանից մեծ ես, բայց ոչ քո ծննդյան ամսաթիվը։

**3. name.** Բոլոր դեպքերում հարցը նույնն է՝ ինչպե՞ս ապացուցել, որ ինչ-որ բան ճիշտ է, և ոչինչ ավել չբացահայտել։ Մաթեմատիկոսներն ունեն դրա պատասխանը, և այն կոչվում է զրոյական գիտելիքով ապացույց։ *[pause 1 s]*

**4. cave_setup.** Ամենահայտնի բացատրությունը քարանձավն է։ Պատկերացրու օղակաձև քարանձավ՝ մուտքից երկու արահետ է գնում, ձախ և աջ, որոնք խորքում միանում են փակ դռնով։ Դուռը բացվում է միայն գաղտնի բառով։ Ընկերուհիդ ասում է, որ գիտի այդ բառը։ Դու ուզում ես համոզվել, բայց առանց բառը լսելու։

**5. cave_round.** Նա մտնում է քարանձավ և ընտրում արահետներից մեկը, իսկ դու դրսում ես և չես տեսնում՝ որը։ Հետո դու գալիս ես մուտքի մոտ և բղավում՝ «Դուրս արի ձախից»։ Եթե նա գիտի բառը, միշտ կարող է դուրս գալ քո ասած կողմից, անհրաժեշտության դեպքում բացելով դուռը։ Իսկ եթե չգիտի, կկարողանա միայն վերադառնալ նույն ճանապարհով, և քո պահանջը կկատարի միայն այն դեպքում, եթե պատահաբար ճիշտ արահետ էր ընտրել։ *[pause 2 s]*

**6. cave_rounds.** Մեկ անգամ նա կարող էր բախտ ունենալ՝ հիսուն տոկոս։ Երկու անգամ անընդմեջ՝ քառորդ։ Տասը անգամ՝ մոտ հազարից մեկ։ Քսան անգամ՝ մոտ միլիոնից մեկ։ Քսան անգամ ճիշտ կողմից դուրս գալուց հետո դու համոզված ես։ Իսկ բառն այդպես էլ չես լսել։ *[pause 1.5 s]*

**7. why_zero.** Բայց ինչո՞ւ «զրոյական գիտելիք»։ Որովհետև դու ոչ մի բան չես կարող փոխանցել ուրիշին։ Եթե ամբողջը նկարես և տեսանյութը ցույց տաս ընկերներիդ, ոչ ոք չի համոզվի։ Նույն տեսանյութը կարելի է սարքել առանց բառն իմանալու՝ բավական է նախապես պայմանավորվել, թե որ կողմն ես ասելու, կամ ուղղակի կտրել անհաջող փորձերը։ Դու քարանձավից դուրս ես գալիս միայն համոզմունքով, առանց որևէ տեղեկության, որ կարողանաս ուրիշին տալ։ *[pause 2 s]*

**8. card.** Երբեմն նույնիսկ մեկ քայլը բավական է։ Խառը կապոցից մի քարտ ես քաշում և առանց ցույց տալու ասում՝ «Կարմիր է»։ Ինչպե՞ս ապացուցել՝ առանց քարտը բացելու։ Կապոցի մնացած 51 քարտը շրջում ես և ցույց տալիս, որ բոլոր 26 սև քարտերը դեռ այնտեղ են։ Եթե բոլոր սևերը կապոցում են, ուրեմն ձեռքիդ քարտը կարմիր է։ Ընկերդ դա գիտի, բայց չգիտի՝ որ կարմիր քարտն է՝ յոթնո՞ց, թե՞ թագուհի։ *[pause 1.5 s]*

**9. balls.** Իսկ եթե պետք է ապացուցել ոչ թե գաղտնիք, այլ տարբերություն։ Ընկերդ դալտոնիկ է, և ձեռքին երկու գնդակ ունի՝ կարմիր ու կանաչ։ Նրա համար դրանք նույնն են։ Նա գնդակները թաքցնում է մեջքի ետևում, փոխում է ձեռքերը կամ չի փոխում, հետո ցույց է տալիս և հարցնում՝ փոխեցի՞։ *[pause 3 s]*

**10. balls_logic.** Դու ամեն անգամ ճիշտ ես պատասխանում։ Եթե գնդակներն իսկապես նույն գույնի լինեին, չէիր կարող իմանալ, միայն կգուշակեիր։ Քսան ռաունդից հետո նա նույնքան համոզված է, որքան դու քարանձավի դեպքում։ Իսկ թե որն է կարմիրը, մինչև հիմա չգիտի։ *[pause 1.5 s]*

**11. real.** Իրական համակարգերում քարանձավի ու գնդակների փոխարեն մաթեմատիկական խնդիրներ են, որոնց պատասխանը կարող է անընդհատ ճիշտ տալ միայն գաղտնիքն իմացողը։ Ռաունդներն էլ անում է համակարգիչը՝ վայրկյանի մի մասում։ Հոլանդական մի խոշոր բանկ, օրինակ, հրապարակեց մեթոդ, որով կարելի է ապացուցել, որ աշխատավարձդ որոշակի միջակայքում է՝ առանց ճշգրիտ թիվը ցույց տալու։ Եվրոպական միությունն այսպես տարիքի ստուգում է փորձարկում, իսկ որոշ կրիպտոարժույթներ թաքցնում են, թե ով ում որքան է փոխանցել։

**12. gossip_close.** Իսկ ի՞նչ անի ընկերուհիդ։ Գաղտնիքներ համեմատելու համար էլ կա մեթոդ, և այն կա իրական ծրագրերում։ Որոշ գաղտնի չատերում երկուսդ էլ գրում եք նույն հարցի պատասխանը, և ծրագիրն ասում է միայն՝ համընկնում է, թե ոչ։ Պատասխանն ինքը ոչ ոք չի տեսնում։ *[pause 1 s]*

**13. takeaway.** Ապացուցելն ու բացահայտելը նույն բանը չեն։ Կարելի է համոզել՝ ոչինչ չտալով։ *[pause 1.5 s]*

<!-- script:end -->

Armenian lint: 0 errors; one false hint («կողմից» here means "from the side", not a passive "by"). The length line
uses the TTS reading rate; your own pace will differ, and the pauses are for the animation (you do not need to
pause while reading, F222 silences are added in the edit).

## Facts (checked)

- **Cave:** Quisquater et al., "How to explain zero-knowledge protocols to your children" (published 1990): Peggy,
  Victor, a ring cave with a magic door; repeated rounds (Wikipedia, Zero-knowledge proof; Ali Baba cave).
  2^10 = 1,024, 2^20 = 1,048,576.
- **Why a video convinces nobody:** "A recording of this type would be trivial for any two people to fake" (they
  agree on the calls in advance), so a third party cannot be convinced; this is the intuition behind the formal
  "simulator" definition of zero knowledge (Wikipedia; arXiv 2006.09990). Caveat kept out of the script: if the
  verifier flips a coin on camera, the recording does become convincing.
- **Red card:** a standard illustration: revealing all 26 black cards among the other 51 proves the hidden card is
  red and reveals nothing else (one round, no probability).
- **Two balls:** the colour-blind friend (Wikipedia, Zero-knowledge proof): he never learns which ball is which.
- **Bank:** ING open-sourced a "Zero-Knowledge Range Proof" (2017); its own illustration is a mortgage applicant
  proving the salary is in a range without the exact number. No evidence ING uses it in real lending, so the script
  says "published a method", and the bank is named only on the source line.
- **EU age checks:** the Commission's age-verification app fits the EU Digital Identity Wallet; its specification
  calls for zero-knowledge proofs but does not require them (EFF, April 2025): "փորձարկում է".
- **Cryptocurrency:** Zcash (2016) hides parties and amounts with zk-SNARKs.
- **Gossip close:** the Socialist Millionaires' Protocol in Off-the-Record Messaging lets two users compare a shared
  secret and learn only whether it matches (OTR spec; Wikipedia). OTR clients show it as a question and answer
  (general knowledge).
- **Password without sending it:** the line says it is "safer" never to send the password; real password logins
  that never send it exist (password-authenticated key exchange, e.g. SRP), not named in the script.

## Visuals (16:9, 1920 x 1080)

- **Layout:** a new horizontal composition in Remotion: content in the middle 70%, captions in a band at the bottom
  (about y 880-1000), the same colours and font as the shorts. The cave, the deck and the balls are drawn once as
  components and reused by the vertical short.
- **The cave** (the main showcase): top-down ring cave, two paths, a glowing door; the friend's dot, a curtain that
  hides the inside; split-screen endings with and without the word; then 20 fast rounds with the halving "just
  luck" bar.
- **The fake video:** two identical film strips, one real, one staged with agreed calls and scissors cutting the
  failures: "նույնն են".
- **The deck:** 51 cards turned face up, the 26 black ones lighting one by one with a 26/26 counter; your card face
  down with a red glow.
- **The balls:** split frame, your view (red / green) and the friend's (grey / grey); one silent round.
- **Real systems:** the three cards from beat 2 come back locked and checked; the chat from beat 1 closes the loop.

## Recording guide (for your one take)

- Read the whole long script once, naturally (Q21). Small changes of wording are fine: I transcribe your recording
  and update the captions to what you actually said.
- No need to pause at the "[pause]" marks; I add the silences in the edit. Do leave a breath between beats.
- Record the short separately (`../zero_knowledge_short/`, 6 beats): it has its own wording and a faster pace.
- Quiet room, phone about 20 cm away, the same place for both recordings. Any format (phone .m4a is fine). Drop the
  files in `~/OneDrive/Desktop/new_downloads/` and tell me.

## After the recording (my side)

1. Transcribe your take with Gemini (about $0.02), compare it with the script, update the beat texts.
2. Split the take into beats at the pauses that match the beat ends; check each piece against its text.
3. Run the existing timeline (trim, join with the marked pauses, caption timing snapped to your real pauses).
   If the word timing is visibly off, a forced aligner is the next step (to decide then: the free MMS model is
   CC-BY-NC, which may not suit a monetised channel).
4. Build the animations as components whose durations come from the beat times, so a faster or slower reading only
  changes the speed; render stills first, then the full video; contact sheet and a Gemini viewer review.

## Questions for Hayk (review points)

- **U-ooo, the gossip set-up:** «Ընկերուհիդ գրում է՝ «Լսե՞լ ես Անիի մասին»» and the closing chat answer: is this the
  scenario you had in mind?
- **U-ppp, terms:** «զրոյական գիտելիքով ապացույց», «օղակաձև քարանձավ», «արահետ», «դալտոնիկ», «ռաունդ»: natural in your
  mouth? (You narrate, so change anything to how you would say it.)
- **U-qqq, the "why zero knowledge" beat (the faked video):** it is the deepest beat and the one people rarely hear;
  keep it in the long video?
- U-a («դու» vs «դուք»): the script uses «դու»; your call, since it is your voice.
