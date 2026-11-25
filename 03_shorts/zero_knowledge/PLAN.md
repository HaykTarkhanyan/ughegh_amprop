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
3. **The easy example, Where's Waldo (Q22, replacing the cave):** you found him; a cardboard sheet far bigger than
   the page, with a small hole, shows him and nothing else; your friend is convinced, and the page could be
   anywhere under the sheet. (beats 4-6)
4. **The red card:** draw a card, say "red", then show that all 26 black cards are still in the rest of the deck:
   proved in one step, and nobody learns which red card it is. (beat 7)
5. **The two balls, repeated (Q20):** the colour-blind friend swaps or not; you are right every time; if the balls
   were the same you could only guess; 1/2, 1/4 ... 20 rounds = one in a million; he still does not know which is
   red. (beats 8-9)
6. **Why "zero knowledge":** a video of the balls game convinces nobody, because it could be staged (agreed swaps,
   cut failures); he leaves with conviction and nothing he can pass on. (beat 10)
7. **Real systems, then back to the gossip:** maths puzzles instead of cardboard and balls, done by computers in a
   fraction of a second (a bank's salary-range proof, EU age checks, private cryptocurrencies); and the gossip itself
   has a real answer: some secure chats let two people check that they typed the same answer without showing it.
   (beats 11-12)
8. **Close:** proving and revealing are not the same thing. (beat 13)

## The script (Armenian)

<!-- script:start -->

13 beats, 3,453 characters (3,470 with numbers spelled out): ~239 s of speech, ~4:20 with pauses and the end tail, 18.5 s of them marked silent pauses (estimate, calibrated on 2 measured beats, about +-10%).

**1. gossip.** Ընկերուհիդ գրում է՝ «Լսե՞լ ես Անիի մասին»։ Դու մի գաղտնիք գիտես Անիի մասին։ Բայց չգիտես՝ ընկերուհիդ էլ գիտի՞ նույնը, թե ուզում է քեզնից իմանալ։ Եթե առաջինը դու պատմես, իսկ նա չգիտեր, գաղտնիքը դու ես տարածել։ Նա էլ նույն վախն ունի։ Ուրեմն ինչպե՞ս պարզել, որ երկուսդ էլ գիտեք, առանց որևէ մեկի բարձրաձայնելու։ *[pause 1.5 s]*

**2. same_problem.** Թվում է՝ բամբասանքի խնդիր է։ Բայց հենց նույն խնդիրն ամեն օր լուծում են կայքերն ու բանկերը։ Կայքը պետք է համոզվի, որ գիտես գաղտնաբառդ, բայց ավելի ապահով է, եթե գաղտնաբառն ինքը երբեք չուղարկես։ Բանկը պետք է իմանա, որ եկամուտդ բավական է վարկի համար, բայց պարտադիր չէ, որ իմանա ճշգրիտ թիվը։ Իսկ կայքը պետք է իմանա, որ 18 տարեկանից մեծ ես, բայց ոչ քո ծննդյան ամսաթիվը։

**3. name.** Բոլոր դեպքերում հարցը նույնն է՝ ինչպե՞ս ապացուցել, որ ինչ-որ բան ճիշտ է, և ոչինչ ավել չբացահայտել։ Մաթեմատիկոսներն ունեն դրա պատասխանը, և այն կոչվում է զրոյական գիտելիքով ապացույց։ *[pause 1 s]*

**4. waldo_setup.** Ամենապարզ օրինակը մանկական գրքերից է՝ «Որտե՞ղ է Ուոլդոն»։ Հսկայական նկար՝ հարյուրավոր մարդկանցով, և պետք է գտնել մեկին։ Դու գտել ես նրան։ Ընկերդ չի հավատում, բայց դու չես ուզում ցույց տալ՝ որտեղ է, որ նրա խաղը չփչացնես։ *[pause 1 s]*

**5. waldo_trick.** Վերցնում ես մի մեծ ստվարաթուղթ՝ նկարից շատ ավելի մեծ, և մեջտեղում փոքրիկ անցք ես բացում։ Ստվարաթուղթը դնում ես նկարի վրա այնպես, որ անցքից երևա հենց նա։ *[pause 2 s]*

**6. waldo_zero.** Ընկերդ անցքից տեսնում է նրան և համոզվում, որ գտել ես։ Բայց ստվարաթուղթը ծածկում է ամբողջ նկարը, և նա չգիտի՝ էջի որ մասում է։ Էջը ստվարաթղթի տակ կարող էր լինել ցանկացած տեղ։ *[pause 2 s]*

**7. card.** Նույն սկզբունքով կարելի է ապացուցել, որ ձեռքիդ քարտը կարմիր է։ Խառը կապոցից մի քարտ ես քաշում և առանց ցույց տալու ասում՝ «Կարմիր է»։ Ինչպե՞ս ապացուցել՝ առանց քարտը բացելու։ Կապոցի մնացած 51 քարտը շրջում ես և ցույց տալիս, որ բոլոր 26 սև քարտերը դեռ այնտեղ են։ Եթե բոլոր սևերը կապոցում են, ուրեմն ձեռքիդ քարտը կարմիր է։ Ընկերդ դա գիտի, բայց չգիտի՝ որ կարմիր քարտն է՝ յոթնո՞ց, թե՞ թագուհի։ *[pause 1.5 s]*

**8. balls.** Իսկ եթե պետք է ապացուցել ոչ թե գաղտնիք, այլ տարբերություն։ Ընկերդ դալտոնիկ է, և ձեռքին երկու գնդակ ունի՝ կարմիր ու կանաչ։ Նրա համար դրանք նույնն են։ Նա գնդակները թաքցնում է մեջքի ետևում, փոխում է ձեռքերը կամ չի փոխում, հետո ցույց է տալիս և հարցնում՝ փոխեցի՞։ *[pause 3 s]*

**9. balls_logic.** Դու ամեն անգամ ճիշտ ես պատասխանում։ Եթե գնդակներն իսկապես նույն գույնի լինեին, չէիր կարող իմանալ, միայն կգուշակեիր։ Մեկ անգամ գուշակելը կարող է հաջողվել՝ հիսուն տոկոս։ Երկու անգամ անընդմեջ՝ քառորդ, տասը անգամ՝ մոտ հազարից մեկ, քսան անգամ՝ մոտ միլիոնից մեկ։ Քսան ռաունդից հետո նա համոզված է։ Իսկ թե որն է կարմիրը, մինչև հիմա չգիտի։ *[pause 2 s]*

**10. why_zero.** Բայց ինչո՞ւ «զրոյական գիտելիք»։ Եթե ընկերդ ամբողջը նկարի և տեսանյութը ցույց տա ուրիշին, ոչ ոք չի համոզվի։ Նույն տեսանյութը կարելի է սարքել՝ բավական է նախապես պայմանավորվել, թե երբ է փոխելու, կամ ուղղակի կտրել անհաջող փորձերը։ Նա մնում է միայն համոզմունքով, առանց որևէ տեղեկության, որ կարողանա ուրիշին տալ։ *[pause 2 s]*

**11. real.** Իրական համակարգերում ստվարաթղթի ու գնդակների փոխարեն մաթեմատիկական խնդիրներ են, որոնց պատասխանը կարող է անընդհատ ճիշտ տալ միայն գաղտնիքն իմացողը։ Ռաունդներն էլ անում է համակարգիչը՝ վայրկյանի մի մասում։ Հոլանդական մի խոշոր բանկ, օրինակ, հրապարակեց մեթոդ, որով կարելի է ապացուցել, որ աշխատավարձդ որոշակի միջակայքում է՝ առանց ճշգրիտ թիվը ցույց տալու։ Եվրոպական միությունն այսպես տարիքի ստուգում է փորձարկում, իսկ որոշ կրիպտոարժույթներ թաքցնում են, թե ով ում որքան է փոխանցել։

**12. gossip_close.** Իսկ ի՞նչ անի ընկերուհիդ։ Գաղտնիքներ համեմատելու համար էլ կա մեթոդ, և այն կա իրական ծրագրերում։ Որոշ գաղտնի չատերում երկուսդ էլ գրում եք նույն հարցի պատասխանը, և ծրագիրն ասում է միայն՝ համընկնում է, թե ոչ։ Պատասխանն ինքը ոչ ոք չի տեսնում։ *[pause 1 s]*

**13. takeaway.** Ապացուցելն ու բացահայտելը նույն բանը չեն։ Կարելի է համոզել՝ ոչինչ չտալով։ *[pause 1.5 s]*

<!-- script:end -->

Armenian lint: 0 errors; one false hint («կողմից» here means "from the side", not a passive "by"). The length line
uses the TTS reading rate; your own pace will differ, and the pauses are for the animation (you do not need to
pause while reading, F222 silences are added in the edit).

## Facts (checked)

- **Where's Waldo:** Naor, Naor & Reingold, "Applied Kid Cryptography or How To Convince Your Children You Are
  Not Cheating" (1999; Weizmann pages): Alice proves she found Waldo with a large cardboard with a hole; the authors
  note it leaks a little about Waldo's immediate surroundings, and Wikipedia calls it not a perfect zero-knowledge
  proof for that reason (body position). Scientific American retells it with a large cloth. The script keeps it
  simple; the leak is a possible footnote, not a beat. **The character is ours** (orange cap, striped blue scarf,
  green shirt): Waldo's look is a trademarked design (Martin Handford), so only the book's title is mentioned.
- **Why a video convinces nobody** (now told with the balls): a recording of an interactive proof can be faked by
  agreeing on the challenges in advance (Wikipedia, Zero-knowledge proof; arXiv 2006.09990): the intuition behind
  the formal "simulator" definition. Caveat kept out: a coin flipped on camera would make the recording convincing.
- **The cave** (Quisquater et al., 1990) was the first choice and is dropped (Q22); its animation draft is kept in
  `render/src/zk/drafts/Cave.tsx`.
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

Built in the series' Remotion project, `../render/` (compositions `ZkWaldo`, `ZkDeck`, `ZkBalls`; preview renders
in `render/out/v1/`). Phase times are defaults until the narration gives the beat times.

- **Waldo** (`render/src/zk/Waldo.tsx`): an original crowd page of about 700 little people with paths, trees and a
  pond; a reference card "Գտի՛ր նրան" with our character; a magnifier that wanders with a real 2.3x zoom inside the
  lens and stops on him («Գտա» / «Ապացուցի՛ր»); a huge cardboard sheet sweeps in, see-through first, its hole landing
  on him, then fully opaque; the camera pushes in (the friend's view: only the hole), then pulls far out: the sheet is
  much bigger than the page, and a dashed page outline glides through positions that all keep him under the hole
  («Էջը տակը կարող է լինել ցանկացած տեղ»), then the verdict.
- **The deck** (`render/src/zk/Deck.tsx`): real cards (Dmitry Fomin's English pattern deck, CC0, cut from one Commons
  thumbnail by `render/assets_src/cut_cards.py`) with our own card back; your card flies to your hand face down
  («Կարմիր է» / «Ապացուցի՛ր»); the other 51 deal into a 3 x 17 grid and flip; the reds dim and the 26 black cards
  light up one by one with a counter; the blacks gather into a 2 x 13 block, "26 / 26 ✓"; your card glows red but
  stays face down; "red, but which one: your friend does not know" over a flickering ghost of red faces.
- **The balls** (`render/src/zk/Balls.tsx`): split frame, "you see" (red, green) and "your friend sees" (khaki, khaki);
  round 1 slowly (curtain "մեջքի ետևում", a coin lands on «փոխել», the balls trade places behind the curtain,
  «Փոխեցի՞» / «Այո, փոխեցիր»); 19 fast rounds with the halving bar to "1 / 1 048 576"; a check mark and "convinced, but
  does not know which is red".
- Still to build: the gossip chat (beats 1, 12), the three real-life cards (beats 2, 11), the faked-video film
  strips (beat 10), the title card, captions, and the vertical versions for the Short.

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
- **U-qqq, the "why zero knowledge" beat (the faked video, now with the balls):** the deepest beat and the one people
  rarely hear; keep it in the long video?
- **U-sss, «Որտե՞ղ է Ուոլդոն»:** the US title; in Russian the books are «Где Уолли?». Which name will your viewers know?
- U-a («դու» vs «դուք»): the script uses «դու»; your call, since it is your voice.
