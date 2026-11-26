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
   the page, placed while your friend looks away, shows him and a sliver around him; your friend is convinced,
   and the page could be anywhere under the sheet. (beats 4-6)
4. **The red card:** draw a card from a complete deck, say "red", then take out and show only the 26 black cards;
   the reds stay face down. Proved in one step, and nobody learns which red card it is. (beat 7; showing all 51 would
   reveal it by elimination, X20)
5. **The two balls, repeated (Q20):** the colour-blind friend swaps or not; you are right every time; if the balls
   were the same you could only guess; 1/2, 1/4 ... 20 rounds = one in a million; he still does not know which is
   red. (beats 8-9)
6. **Why "zero knowledge":** every answer only tells the friend what he already knew (did he swap?), so the one new
   fact is "the balls differ"; which is red appears nowhere. That is also why a video of it convinces nobody: it can
   be staged by agreeing the swaps in advance. (beat 10, X21)
7. **Real systems, then back to the gossip:** maths puzzles instead of cardboard and balls, done by computers in a
   fraction of a second (a bank's salary-range proof, EU age checks, private cryptocurrencies); and the gossip itself
   has a real answer: some secure chats let two people check that they typed the same answer without showing it.
   (beats 11-12)
8. **Close:** proving and revealing are not the same thing. (beat 13)

## The script (Armenian)

<!-- script:start -->

13 beats, 3,825 characters (3,840 with numbers spelled out): ~264 s of speech, ~4:45 with pauses and the end tail, 18.5 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. gossip.** Ընկերուհիդ գրում է՝ «Լսե՞լ ես Անիի մասին»։ Դու մի գաղտնիք գիտես Անիի մասին։ Բայց չգիտես՝ ընկերուհիդ էլ գիտի՞ նույնը, թե ուզում է քեզնից իմանալ։ Եթե առաջինը դու պատմես, իսկ նա չգիտեր, գաղտնիքը դու ես տարածել։ Նա էլ նույն վախն ունի։ Ուրեմն ինչպե՞ս պարզել, որ երկուսդ էլ գիտեք, առանց որևէ մեկի բարձրաձայնելու։ *[pause 1.5 s]*

**2. same_problem.** Թվում է՝ բամբասանքի խնդիր է։ Բայց նույն խնդիրն ունեն կայքերն ու բանկերը։ Կայքը պետք է համոզվի, որ գիտես գաղտնաբառդ, բայց ավելի ապահով է, եթե գաղտնաբառն ինքը երբեք չուղարկես։ Բանկը պետք է իմանա, որ եկամուտդ բավական է վարկի համար, բայց պարտադիր չէ, որ իմանա ճշգրիտ թիվը։ Իսկ կայքը պետք է իմանա, որ 18 տարեկանից մեծ ես, բայց ոչ քո ծննդյան ամսաթիվը։

**3. name.** Բոլոր դեպքերում հարցը նույնն է՝ ինչպե՞ս ապացուցել, որ ինչ-որ բան ճիշտ է, և ոչինչ ավել չբացահայտել։ Մաթեմատիկոսներն ունեն դրա պատասխանը, և այն կոչվում է զրոյական գիտելիքով ապացույց։ *[pause 1 s]*

**4. waldo_setup.** Ամենապարզ օրինակը մանկական գրքերից է՝ «Որտե՞ղ է Վալոդը»։ Հսկայական նկար՝ հարյուրավոր մարդկանցով, և պետք է գտնել մեկին։ Դու գտել ես նրան։ Ընկերդ չի հավատում, բայց դու չես ուզում ցույց տալ՝ որտեղ է, որ նրա խաղը չփչացնես։ *[pause 1 s]*

**5. waldo_trick.** Ընկերդ շրջվում է, իսկ դու վերցնում ես մի մեծ ստվարաթուղթ՝ նկարից շատ ավելի մեծ, և մեջտեղում փոքրիկ անցք ես բացում։ Ստվարաթուղթը դնում ես նկարի վրա այնպես, որ անցքից երևա հենց նա։ Հիմա ընկերդ կարող է նայել։ *[pause 2 s]*

**6. waldo_zero.** Ընկերդ անցքից տեսնում է նրան և համոզվում, որ գտել ես։ Երևում է միայն նա ու մի փոքր կտոր շուրջը, իսկ ստվարաթուղթը ծածկում է ամբողջ էջը՝ մինչև եզրերը։ Էջը դրա տակ կարող էր լինել ցանկացած տեղ, ուստի ընկերդ չգիտի՝ էջի որ մասում է նա։ *[pause 2 s]*

**7. card.** Նույն սկզբունքը գործում է քարտերով։ Լրիվ, խառը կապոցից մի քարտ ես քաշում և առանց ցույց տալու ասում՝ «Կարմիր է»։ Ինչպե՞ս ապացուցել՝ առանց քարտը բացելու։ Մնացած կապոցից հանում ես բոլոր սև քարտերը և ցույց տալիս՝ 26-ն էլ այնտեղ են։ Կարմիրները ցույց չես տալիս։ Եթե ոչ մի սև քարտ պակաս չէ, ուրեմն ձեռքիդ քարտը կարմիր է։ Ընկերդ դա գիտի, բայց չգիտի՝ որ կարմիր քարտն է՝ յոթնո՞ց, թե՞ թագուհի։ *[pause 1.5 s]*

**8. balls.** Իսկ երբեմն պետք է ապացուցել ոչ թե գաղտնիք, այլ տարբերություն։ Ընկերդ դալտոնիկ է, և ձեռքին երկու գնդակ ունի՝ կարմիր ու կանաչ։ Նրա համար դրանք նույնն են։ Նա գնդակները թաքցնում է մեջքի ետևում, փոխում է ձեռքերը կամ չի փոխում, հետո ցույց է տալիս և հարցնում՝ փոխեցի՞։ *[pause 3 s]*

**9. balls_logic.** Դու ամեն անգամ ճիշտ ես պատասխանում։ Եթե գնդակներն իսկապես նույն գույնի լինեին, չէիր կարող իմանալ, միայն կգուշակեիր։ Մեկ անգամ գուշակելը կարող է հաջողվել՝ հիսուն տոկոս։ Երկու անգամ անընդմեջ՝ քառորդ, տասը անգամ՝ մոտ հազարից մեկ, քսան անգամ՝ մոտ միլիոնից մեկ։ Քսան փուլից հետո նա համոզված է։ Իսկ թե որն է կարմիրը, մինչև հիմա չգիտի։ *[pause 2 s]*

**10. why_zero.** Բայց ինչո՞ւ «զրոյական գիտելիք»։ Ամեն փուլում դու ասում ես միայն այն, ինչ ընկերդ արդեն գիտի՝ փոխե՞լ է, թե ոչ։ Ուրեմն զրույցից նա իմանում է միայն մի բան՝ դու գույները տարբերում ես։ Թե որ գնդակն է կարմիրը, զրույցում ոչ մի տեղ չկա։ Դրա համար էլ, եթե նա ամբողջը նկարի, տեսանյութն ուրիշին չի համոզի։ Այն կարելի է սարքել նախապես՝ պայմանավորվելով, թե երբ է փոխելու։ *[pause 2 s]*

**11. real.** Իրական համակարգերում ստվարաթղթի ու գնդակների փոխարեն մաթեմատիկական խնդիրներ են, որոնց պատասխանը կարող է անընդհատ ճիշտ տալ միայն գաղտնիքն իմացողը։ Փուլերն էլ անում է համակարգիչը՝ վայրկյանի մի մասում։ Հոլանդական մի խոշոր բանկ, օրինակ, հրապարակեց անվճար կոդ, որով կարելի է ապացուցել, որ աշխատավարձդ որոշակի միջակայքում է՝ առանց ճշգրիտ թիվը ցույց տալու։ Եվրոպական միությունն այսպես տարիքի ստուգում է փորձարկում։ Այստեղ ապացույցը վերաբերում է ոչ թե քո գրած ամսաթվին, այլ «18-ից մեծ է» նշմանը, որը վստահելի կազմակերպությունն է ստորագրում՝ ստուգելով անձնագիրդ։ Իսկ որոշ կրիպտոարժույթներ թաքցնում են, թե ով ում որքան է փոխանցել։

**12. gossip_close.** Իսկ ի՞նչ անի ընկերուհիդ։ Գաղտնիքներ համեմատելու համար էլ կա մեթոդ, և այն կա իրական ծրագրերում։ Որոշ գաղտնի չատերում երկուսդ էլ գրում եք նույն հարցի պատասխանը, և ծրագիրն ասում է միայն՝ համընկնում է, թե ոչ։ Պատասխանն ինքը ոչ ոք չի տեսնում։ Միայն թե «ոչ»-ն էլ է տեղեկություն, ուստի պատասխանը պետք է դժվար լինի գուշակել։ *[pause 1 s]*

**13. takeaway.** Ապացուցելն ու բացահայտելը նույն բանը չեն։ Կարելի է համոզել՝ ոչինչ ավել չտալով։ *[pause 1.5 s]*

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
- **Why "zero knowledge"** (Codex X21): the defining property is that the verifier's view can be produced without
  the secret (the simulator; Goldreich's tutorial, https://www.wisdom.weizmann.ac.il/~oded/zk-tut02.html). In the
  balls game the verifier already knows every right answer (his own swaps), so the conversation tells him only that
  the balls differ. Non-transferability (a recording convinces nobody, it can be staged) is a consequence in this
  interactive example, not the definition: non-interactive proofs, like Zcash's, are publicly verifiable.
- **The cave** (Quisquater et al., 1990) was the first choice and is dropped (Q22); its animation draft is kept in
  `render/src/zk/drafts/Cave.tsx`.
- **Red card:** showing only the 26 black cards (taken out of the complete deck, the reds kept face down) proves the
  hidden card is red and nothing else. The first version turned over all 51, which identifies the missing card by
  elimination (Codex X20).
- **Two balls:** the colour-blind friend (Wikipedia, Zero-knowledge proof): he never learns which ball is which.
- **Bank:** ING open-sourced a "Zero-Knowledge Range Proof" (2017); its own illustration is a mortgage applicant
  proving the salary is in a range without the exact number. No evidence ING uses it in real lending, so the script
  says "published a method", and the bank is named only on the source line.
- **EU age checks:** the Commission's age-verification app fits the EU Digital Identity Wallet; its specification
  calls for zero-knowledge proofs but does not require them (EFF, April 2025): "փորձարկում է". Codex (X60) points to
  the official roadmap, https://docs.ageverification.dev/Roadmap/, which lists Android / iOS ZKP releases in 2026:
  re-check it before publishing and update the source line.
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
  thumbnail by `render/assets_src/cut_cards.py`) with our own card back; "complete deck: 52 cards"; your card flies to
  your hand face down («Կարմիր է» / «Ապացուցի՛ր»); going through the rest, each black card flies out face up into a
  2 x 13 block with a counter to "26 / 26 ✓", each red card lands face down on a pile that is never turned over
  ("25 cards, not shown"); your card glows red but stays face down; "red, but which one: your friend does not know"
  over a flickering ghost of red faces.
- **The balls** (`render/src/zk/Balls.tsx`): split frame, "you see" (red, green) and "your friend sees" (khaki, khaki);
  round 1 slowly (curtain "մեջքի ետևում", a coin whose face stays hidden, "your friend decides, you do not see",
  the balls trade places behind the curtain, «Փոխեցի՞» / «Այո, փոխեցիր»); then the rounds are scheduled so the
  counter shows exactly 1, 2, 10 and 20 rounds when the voice says those numbers (rounds too short to animate tick
  behind a closed curtain); each round's answer appears only once it is given; a check mark and "convinced, but
  does not know which is red".
- **The connecting scenes** (`render/src/zk/Story.tsx`, built 2026-11-25): the gossip chat (a phone with «Լսե՞լ ես
  Անիի մասին», the two thought bubbles, the secret flying out and "spilled", her mirrored fear, "how to find out
  without saying it"); the three everyday cases (password that never leaves the phone, blurred income "enough",
  blurred birth date "18+"); the title card; "why zero" (his choices and your answers matching row by row, "he
  already knew every answer", "new: only «they differ»", then a real and a staged strip of six rounds each, "the same,
  the video convinces nobody"); the real systems (a digit puzzle solved in a blur, then bank salary range "published
  method", EU age check with a state signature stamp "pilot", hidden crypto transfer "running since 2016", each locked
  and checked); the gossip close (both answers locked, "match ✓", "a 'no' is information too"); the takeaway.
- **The whole long video** (`ZkLong`, 4:42 with the temporary guide voice after the Codex fixes):
  `render/out/codex_fix/ZkLong_guide.mp4`.
- **The vertical Short** (`ZkShort`, 1080 x 1920): see `../zero_knowledge_short/PLAN.md`.

## Recording guide (for your one take)

- Read the whole long script once, naturally (Q21). Small changes of wording are fine: I transcribe your recording
  and update the captions to what you actually said.
- No need to pause at the "[pause]" marks; I add the silences in the edit. Do leave a breath between beats.
- Record the short separately (`../zero_knowledge_short/`, 5 beats): it has its own wording and a faster pace.
- Quiet room, phone about 20 cm away, the same place for both recordings. Any format (phone .m4a is fine). Drop the
  files in `~/OneDrive/Desktop/new_downloads/` and tell me.

## After the recording (my side)

1. Transcribe your take with Gemini (about $0.02), compare it with the script, update the beat texts.
2. Split the take into beats: `python tools/import_recording.py propose <take> zero_knowledge` keeps the original,
   converts it and proposes cuts at the longest pauses; after checking the cuts (and updating the beat texts to what
   you said), `python tools/import_recording.py apply zero_knowledge` writes the manifest with you as narrator.
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

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md); the script, the storyboard and the animation were changed together:

- **X20:** the card proof showed all 51 remaining cards, which identifies the missing one by elimination. Now only
  the 26 black cards are taken out and shown, the reds stay face down, and the deck is said to be complete.
- **X21:** "why zero knowledge" now explains the real property (the friend learns nothing he could not produce
  himself: he already knows each right answer), and the faked video follows as a consequence. The universal "nothing
  he can give another person" is gone; the takeaway says «ոչինչ ավել չտալով».
- **X22:** the friend looks away while the sheet is placed («Ընկերդ շրջվում է ... Հիմա ընկերդ կարող է նայել»), the
  see-through sheet is labelled "only you see this", and the voice admits the hole shows a sliver of the surroundings
  while the edges are covered.
- **X23:** «ամեն օր լուծում են» became «նույն խնդիրն ունեն»; the EU example says the proof is about a birth date the
  state signed (otherwise you could type a false one); the cards show which examples are a published method, a
  pilot, or running; the gossip close says a "no" is information too, so the answer must be hard to guess.
- **X11, X12, X13:** the balls' counter now matches the spoken checkpoints, answers appear only when given and the
  coin no longer shows the friend's private choice; the two film strips both have six rounds.
- **X14:** the landscape captions now use their own profile (1500 px box, up to 7 words, sizes computed and used):
  0 pages under 0.6 s on screen (8 before).
- **X19:** the sheet's texture filter covers only the sheet (3000 x 1900 instead of 12000 x 7000).
- Guide voice remade for the 8 changed beats ($0.040); timeline 282.4 s.

## Evidence record (Codex review X60, 2026-11-26)

One row per consequential claim in the current script. *Kind*: data (observed), calculation, analogy, story or
interpretation. *Checked*: what was actually read; "secondary" means a summary or encyclopedia, not the source;
"unverified" means nobody has read a source for these exact words yet. Fix the unverified rows before the voice.

| Beat | Claim (as voiced) | Source | Kind | Checked |
|---|---|---|---|---|
| waldo_* | the sheet-with-a-hole proof; it leaks a little of the surroundings | Naor, Naor & Reingold, 'Applied Kid Cryptography', https://www.wisdom.weizmann.ac.il/~/naor/PUZZLES/waldo_sol.html | analogy | cited by Codex; the leak is now voiced |
| card | showing only the 26 black cards proves 'red' without showing which | own reasoning | calculation | checked (X20) |
| balls_logic | 20 rounds of guessing: 1 in 2^20 = 1 in 1 048 576 | own calculation | calculation | checked |
| why_zero | the friend already knows every right answer, so he learns only that the balls differ | Goldreich's tutorial, https://www.wisdom.weizmann.ac.il/~oded/zk-tut02.html (simulator definition) | explanation | cited by Codex; matches the standard definition |
| real | a Dutch bank published a salary-range proof method | ING Zero-Knowledge Range Proof, 2017 (repository URL not recorded) | data | secondary; record the URL |
| real | the EU is piloting age checks this way, on a state-signed birth date | EFF April 2025; official roadmap https://docs.ageverification.dev/Roadmap/ | data | roadmap cited by Codex, not re-checked; re-check before publishing |
| real | some cryptocurrencies hide who paid whom and how much | Zcash (zk-SNARKs, 2016) | data | general knowledge; add the Zcash docs URL |
| gossip_close | some secure chats compare an answer and say only 'match or not' | OTR spec, Socialist Millionaires' Protocol, https://otr.uwaterloo.ca/Protocol-v3-4.1.1.html | data | cited by Codex |

**Answered 2026-11-26 (ARMENIAN_DECISIONS.md):** U-sss: the character is «Վալոդ» («Որտե՞ղ է Վալոդը», U2); «ռաունդ» became «փուլ» in the voice and on the counter (U3); address stays «դու» (U1). Guide voice remade for the 4 changed beats ($0.028 with the Short's Waldo beat).

## Source check (2026-11-27, `../../_knowledge/short_videos/fact_sources_2026-11-26.md`)

- **EU age check (partly supported, fixed):** a real pilot since July 2025 (seven countries in 2026; ZKP on Android in
  January 2026, iOS in July 2026, required from August 2026). The signed credential holds only "over 18: yes", issued by
  a trusted issuer after an ID check, not a birth date signed by the state: the voice and the EU card now say so.
- **ING (partly supported, fixed):** released free code in November 2017; never said it was used in production; the
  first version was later found not to be zero-knowledge; the page and repository are gone (404). The voice says
  «հրապարակեց անվճար կոդ», the tag «հրապարակված կոդ».
- **Zcash, OTR (supported):** only fully shielded Zcash transactions hide sender, receiver and amount (launch 28 Oct 2016);
  the OTR spec mirror at otr.cypherpunks.ca (the uwaterloo URL fails its certificate check).
- **Waldo (supported, checked directly 2026-11-27):** https://www.wisdom.weizmann.ac.il/~naor/PUZZLES/waldo_sol.html:
  "Both solutions are imperfect in that they reveal information about his immediate surrounding."
