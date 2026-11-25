# Short: Zero-knowledge proofs - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17), rendered in Remotion (DECISIONS.md #21). Script source:
`beats.hy.json`. Follows the Fable batch notes (F131-F134). Related to `crypto_paint/` (public keys with paint):
publish after it, a few videos apart.

## The idea in one paragraph

How do you prove you know a secret without revealing any of it, say, prove to a website you are over 18 without
your birth date? Your friend is colour-blind and holds a red and a green ball that look the same to him. He hides
them behind his back, swaps them or not at random, and asks "did I swap?" (one round plays in silence). You are
right every time; if the balls really were the same colour, you could only guess. Once could be luck (50%);
twenty times in a row by luck is about one in a million, so he is convinced the balls differ, yet he still does
not know which one is red. That is a zero-knowledge proof: convince, reveal nothing. Real systems replace the
balls with maths puzzles only the secret's owner can keep answering; the EU is testing such age checks and some
cryptocurrencies hide who paid whom. The takeaway: proving and revealing are not the same thing.

## The script (Armenian)

<!-- script:start -->

9 beats, 1,323 characters (1,328 with numbers spelled out): ~91 s of speech, ~1:42 with pauses and the end tail, 8 s of them marked silent pauses (estimate, calibrated on 2 measured beats, about +-10%).

**1. hook.** Ինչպե՞ս ապացուցել, որ գաղտնիք գիտես, առանց գաղտնիքից գեթ մի բան ասելու։ Օրինակ՝ կայքին ապացուցել, որ 18 տարեկանից մեծ ես, առանց ծննդյան ամսաթիվը ցույց տալու։

**2. balls.** Պատկերացրու՝ ընկերդ դալտոնիկ է, և ձեռքին երկու գնդակ ունի՝ կարմիր ու կանաչ։ Նրա համար դրանք նույնն են։ Դու ուզում ես ապացուցել, որ դրանք տարբեր գույնի են, բայց չասել, թե որն է կարմիրը։

**3. round.** Նա գնդակները թաքցնում է մեջքի ետևում, պատահականորեն փոխում է ձեռքերը կամ չի փոխում, հետո ցույց է տալիս և հարցնում՝ փոխեցի՞։ *[pause 3 s]*

**4. answer.** Դու ամեն անգամ ճիշտ ես պատասխանում։ Եթե գնդակներն իսկապես նույն գույնի լինեին, չէիր կարող իմանալ՝ նա փոխեց, թե ոչ։ Միայն կգուշակեիր։

**5. rounds.** Մեկ անգամ գուշակելը կարող է հաջողվել՝ հիսուն տոկոս։ Բայց քսան անգամ անընդմեջ պատահաբար գուշակելու հավանականությունը մոտ մեկ միլիոնից մեկ է։ Քսան ռաունդից հետո նա համոզված է՝ գնդակները տարբեր են։ *[pause 2.5 s]*

**6. zero.** Իսկ ի՞նչ իմացավ նա։ Միայն այն, որ դու տարբերում ես գնդակները։ Թե որն է կարմիրը, մինչև հիմա չգիտի։ Սա է զրոյական գիտելիքով ապացույցը՝ համոզում ես, ոչինչ չբացահայտելով։ *[pause 1.5 s]*

**7. real.** Իրական համակարգերում գնդակների փոխարեն մաթեմատիկական խնդիրներ են։ Դրանց պատասխանը կարող է անընդհատ ճիշտ տալ միայն նա, ով գիտի գաղտնիքը։

**8. uses.** Եվ սա արդեն տեսություն չէ։ Տարիքի այդպիսի ստուգում փորձարկում է Եվրոպական միությունը, իսկ որոշ կրիպտոարժույթներ այդպես թաքցնում են, թե ով ում որքան է փոխանցել։

**9. takeaway.** Ապացուցելն ու բացահայտելը նույն բանը չեն։ Կարելի է համոզել՝ ոչինչ չտալով։ *[pause 1 s]*

<!-- script:end -->

Armenian lint: 0 errors, 0 hints.

## Facts (checked)

- **The colour-blind friend and two balls:** a standard explanation (Wikipedia, Zero-knowledge proof): the friend
  never learns which ball is green and which is red. Chosen over the Ali Baba cave (Quisquater et al., published
  1990) because it needs no story set-up and animates in one frame.
- **Rounds:** a guesser passes each round with probability 1/2; 20 rounds: 1 / 2²⁰ = 1 / 1,048,576.
- **Origin:** Goldwasser, Micali & Rackoff, "The knowledge complexity of interactive proof systems" (1985); Goldwasser
  and Micali received the 2012 Turing Award. From general knowledge, not from the searches: **check before voicing**.
- **Age checks:** the European Commission sought an age-verification app fitting the EU Digital Identity Wallet;
  its specification calls for zero-knowledge proofs but does not require them (EFF, April 2025); Google
  open-sourced its ZKP libraries for EU age assurance in July 2025 (Google blog, google/longfellow-zk). Whether it has
  shipped by late 2026 was not checked, so the script says «փորձարկում է».
- **Cryptocurrency:** Zcash (launched 28 October 2016) uses zk-SNARKs to keep balances verifiable while hiding the
  parties and amounts (Zcash docs, Electric Coin Co.). The script says «որոշ կրիպտոարժույթներ», no name.

## Visuals

- **Drawn, all of it:** split view of what you see (red / green) and what the friend sees (grey / grey); hands behind
  the back with a coin-flip; the 20-round strip with the "just guessing" bar halving each round (the showcase, held
  for the 2 s pause); the balls turning into a number puzzle; the phone showing only "18+ ✓"; a transaction with
  hidden fields and a valid mark.
- Colours: red and green only for the balls, with a grey "friend's view" so colour-blind viewers get the joke too.

## After the Fable review (FABLE_REVIEW_2.md, applied 2026-11-25)

- **F207** the logical core is said («Եթե գնդակներն իսկապես նույն գույնի լինեին, չէիր կարող իմանալ ... Միայն
  կգուշակեիր»). **F208** the origin beat is now only the bridge to real systems; names and year on the source line,
  no Turing award sentence (so the unchecked fact is gone, F231).
- **F209** «Թվում է՝ անհնար է։ Բայց հնարավոր է։» cut; the hook is concrete (the 18+ website). **F210** one round
  plays in 3 s of near silence before «Դու ամեն անգամ ճիշտ ես պատասխանում». **F222** pauses 8 s.

## Questions for Hayk (review points)

- **U-eee, the term:** «զրոյական գիտելիքով ապացույց» (not in the glossary): or «զրոյական իմացությամբ ապացույց»?
- **U-fff, «դալտոնիկ»** for colour-blind: natural, or «գույները չտարբերող»?
- **U-ggg, «ռաունդ»** in the voice: or «փուլ»?
- U-a («դու» vs «դուք») applies here too.
