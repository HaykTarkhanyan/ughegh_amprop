# Short: Zero-knowledge proofs - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17), rendered in Remotion (DECISIONS.md #21). Script source:
`beats.hy.json`. Follows the Fable batch notes (F131-F134). Related to `crypto_paint/` (public keys with paint):
publish after it, a few videos apart.

## The idea in one paragraph

How do you prove you know a secret without revealing any of it? Your friend is colour-blind and holds a red and a
green ball that look the same to him. He hides them behind his back, swaps them or not at random, and asks "did I
swap?"; you are right every time. Once could be luck (50%); twenty times in a row by luck is about one in a million,
so he is convinced the balls differ, yet he still does not know which one is red. That is a zero-knowledge proof:
convince, reveal nothing. Three researchers proposed it in the 1980s (two later won the Turing Award); real systems
replace the balls with maths puzzles only the secret's owner can keep answering. Today it can prove to a website
that you are over 18 without your birth date (the EU is testing this) and hide who paid whom in some
cryptocurrencies. The takeaway: proving and revealing are not the same thing.

## The script (Armenian)

<!-- script:start -->

8 beats, 1,406 characters (1,406 with numbers spelled out): ~97 s of speech, ~1:41 with pauses and the end tail, 2 s of them marked silent pauses (estimate, calibrated on 2 measured beats, about +-10%).

**1. hook.** Ինչպե՞ս ապացուցել, որ գաղտնիք գիտես, առանց գաղտնիքից գեթ մի բան ասելու։ Թվում է՝ անհնար է։ Բայց հնարավոր է։

**2. balls.** Պատկերացրու՝ ընկերդ դալտոնիկ է, և ձեռքին երկու գնդակ ունի՝ կարմիր ու կանաչ։ Նրա համար դրանք նույնն են։ Դու ուզում ես ապացուցել, որ դրանք տարբեր գույնի են, բայց չասել, թե որն է կարմիրը։

**3. game.** Նա գնդակները թաքցնում է մեջքի ետևում, պատահականորեն փոխում է ձեռքերը կամ չի փոխում, հետո ցույց է տալիս և հարցնում՝ փոխեցի՞։ Դու ամեն անգամ ճիշտ ես պատասխանում։

**4. rounds.** Մեկ անգամը կարող է բախտ լինել՝ հիսուն տոկոս։ Բայց քսան անգամ անընդմեջ պատահաբար գուշակելու հավանականությունը մոտ մեկ միլիոնից մեկ է։ Քսան ռաունդից հետո նա համոզված է՝ գնդակները տարբեր են։ *[pause 2 s]*

**5. zero.** Իսկ ի՞նչ իմացավ նա։ Միայն այն, որ դու տարբերում ես գնդակները։ Թե որն է կարմիրը, մինչև հիմա չգիտի։ Սա է զրոյական գիտելիքով ապացույցը՝ համոզում ես, ոչինչ չբացահայտելով։

**6. origin.** Գաղափարը երեք գիտնական առաջարկեցին ութսունականներին, և նրանցից երկուսը հետո ստացան Թյուրինգի մրցանակը՝ համակարգչային գիտության ամենաբարձր պարգևը։ Իսկ իրական համակարգերում գնդակների փոխարեն մաթեմատիկական խնդիրներ են, որոնց պատասխանը միայն գաղտնիքն իմացողը կարող է անընդհատ ճիշտ տալ։

**7. uses.** Այսօր դա արդեն կիրառվում է։ Կարելի է կայքին ապացուցել, որ տասնութ տարեկանից մեծ ես, առանց ծննդյան ամսաթիվը ցույց տալու։ Եվրոպական միությունը նման տարիքի ստուգում է փորձարկում, իսկ որոշ կրիպտոարժույթներ այդպես թաքցնում են, թե ով ում որքան է փոխանցել։

**8. takeaway.** Ապացուցելն ու բացահայտելը նույն բանը չեն։ Կարելի է համոզել՝ ոչինչ չտալով։

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

## Questions for Hayk (review points)

- **U-eee, the term:** «զրոյական գիտելիքով ապացույց» (not in the glossary): or «զրոյական իմացությամբ ապացույց»?
- **U-fff, «դալտոնիկ»** for colour-blind: natural, or «գույները չտարբերող»?
- **U-ggg, «ռաունդ»** in the voice: or «փուլ»?
- U-a («դու» vs «դուք») applies here too.
