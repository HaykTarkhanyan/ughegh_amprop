# Short: Why a minute has 60 seconds - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17), rendered in Remotion (DECISIONS.md #21). Script source:
`beats.hy.json`. Follows the Fable batch notes (F131-F134). Sister short: `week_seven/`.

## The idea in one paragraph

Money, metres and kilograms go in tens; the hour goes in sixties, a habit about four thousand years old. The
Sumerians and Babylonians counted in sixties; nobody knows why, the best-known guess being finger joints (the thumb
counts 12 joints, the other hand counts five twelves). Sixty also divides cleanly by 2, 3, 4, 5, 6, 10, 12, 15, 20
and 30, while a third of a 100-minute hour would be 33.333... The 24 hours are Egyptian (12 night hours counted by
rising stars, 12 day hours, unequal through the year). Greek astronomers split the degree by sixty, then the hour;
Latin named the first and second "small parts", which gave «մինուտ» and «սեկունդ» («սեկունդ» means "second"). Minute
hands came only in the late 16th century; the French decimal hour failed within two years. The takeaway: sixty
survived because it divides well; ten is everywhere only because we have ten fingers.

## The script (Armenian)

<!-- script:start -->

8 beats, 1,836 characters (1,836 with numbers spelled out): ~127 s of speech, ~2:12 with pauses and the end tail, 3 s of them marked silent pauses (estimate, calibrated on 2 measured beats, about +-10%).

**1. hook.** Փողը, մետրը, կիլոգրամը տասով են բաժանվում։ Իսկ ժամը՝ վաթսունով։ Ամեն անգամ ժամացույցին նայելիս օգտագործում ես մոտ չորս հազար տարեկան մի հաշվարկ։

**2. fingers.** Շումերները, հետո բաբելոնացիները հաշվում էին ոչ թե տասով, այլ վաթսունով։ Ինչո՞ւ, հստակ չգիտենք։ Ամենահայտնի վարկածը մատներն են՝ բութ մատով հաշվում ես մյուս չորս մատների տասներկու հոդը, իսկ մյուս ձեռքի հինգ մատով՝ քանի անգամ ես հասել տասներկուսի։ Հինգ անգամ տասներկու՝ վաթսուն։ *[pause 1.5 s]*

**3. divides.** Իսկ վաթսունը մեկ այլ առավելություն էլ ունի՝ այն առանց մնացորդի բաժանվում է երկուսի, երեքի, չորսի, հինգի, վեցի, տասի, տասներկուսի, տասնհինգի, քսանի և երեսունի։ Կես ժամը երեսուն րոպե է, երրորդը՝ քսան, քառորդը՝ տասնհինգ։ Իսկ եթե ժամը հարյուր րոպե լիներ, դրա երրորդը կլիներ երեսուներեք ամբողջ երեք, երեք, երեք՝ անվերջ։

**4. hours.** Իսկ ինչո՞ւ է օրը քսանչորս ժամ։ Դա եգիպտացիներից է։ Գիշերը նրանք ժամանակը չափում էին աստղերով, որոնք մեկը մյուսի հետևից էին ծագում, և գիշերը բաժանվեց տասներկու մասի։ Ցերեկն էլ՝ տասներկու։ Եվ այդ ժամերը հավասար չէին՝ ամռանը ցերեկվա ժամն ավելի երկար էր, ձմռանը՝ կարճ։

**5. names.** Վաթսունը հույն աստղագետները վերցրին Բաբելոնից և դրանով բաժանում էին աստիճանը։ Հետո նույն կերպ սկսեցին բաժանել ժամը։ Լատիներենում առաջին բաժանումը կոչվեց «առաջին փոքր մաս», երկրորդը՝ «երկրորդ փոքր մաս»։ Այստեղից են «մինուտ» և «սեկունդ» բառերը, որ գիտենք ռուսերենից։ Իսկ «սեկունդ»-ը բառացի նշանակում է «երկրորդ»։ *[pause 1.5 s]*

**6. clocks.** Բայց դարեր շարունակ րոպեն ապրում էր միայն գիտնականների թղթերում։ Առաջին մեխանիկական ժամացույցները ցույց էին տալիս միայն ժամը։ Րոպեի սլաքը սկսեց երևալ տասնվեցերորդ դարի վերջից։

**7. france.** Փոխել փորձե՞լ են։ Ֆրանսիական հեղափոխությունը մտցրեց տասնորդական ժամանակ՝ օրը տասը ժամ, ժամը հարյուր րոպե, րոպեն հարյուր վայրկյան։ Ժամացույցներ էլ պատրաստեցին։ Բայց մարդիկ չանցան, և երկու տարի էլ չանցած այն դարձավ ոչ պարտադիր։

**8. takeaway.** Վաթսունը չորս հազար տարի գոյատևել է, որովհետև լավ է բաժանվում։ Իսկ տասը մեզ մոտ ամենուր է միայն այն պատճառով, որ տասը մատ ունենք։

<!-- script:end -->

Armenian lint: 0 errors, 0 hints.

## Facts (checked)

- **Base 60:** the Babylonians inherited sexagesimal counting from the Sumerians (Scientific American; Live
  Science); why 60 is unknown (Scientific American). The finger-joint idea is a hypothesis (Live Science: "five
  fingers of one hand with the twelve segments of the other"), tagged «վարկած» on screen.
- **Divisors of 60:** 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60 (12 divisors); 100 has 9 (1, 2, 4, 5, 10, 20, 25, 50,
  100), and no 3.
- **24 hours:** Egyptian: day and night each in 12 parts, night counted by star groups rising in turn (the decans),
  and the hours were seasonal (unequal) for a long time. From the Scientific American explainer and standard
  histories; the decan detail is from general knowledge: check before voicing.
- **Minutes and seconds:** Greek and Roman scholars kept sexagesimal fractions in astronomy (Live Science), first for
  angles (Ptolemy's Almagest); al-Biruni divided the hour sexagesimally around 1000 and Sacrobosco around 1235
  (Wikipedia, Sexagesimal). The names: Medieval Latin *pars minuta prima* ("first small part") and *pars minuta
  secunda* ("second small part"), the standard dictionary etymology of minute and second.
- **Clocks:** "the first mechanical clocks that displayed minutes appeared near the end of the 16th century"
  (Scientific American, as summarised in the search).
- **French decimal time:** 10 hours, 100 minutes, 100 seconds; started November 1793; made optional on 7 April 1795
  (Mental Floss; World History Encyclopedia).
- **Old Armenian «րոպէ»** meant a moment shorter than a minute (Wiktionary); the Greek origin often given was not
  confirmed, so it stays out of the script.

## Visuals

- **Real images (Commons):** `File:YBC-7289-OBV-REV.jpg` (CC0, Yale Peabody Museum: the Babylonian tablet that gives
  √2 in base 60), `File:Clock-french-republic.jpg` (CC BY-SA 3.0, Cormullion: a Revolutionary 10-hour clock),
  `File:Decimal Clock face by Pierre Daniel Destigny 1798-1805.jpg` (CC BY-SA 4.0).
- **Drawn:** the tens-vs-sixties hook; the finger-joint count (the showcase moment); the 60-dot and 100-dot rings
  splitting into thirds; rising star groups and summer / winter sundials; the degree splitting twice with the Latin
  names shrinking to минута / секунда / րոպե / վայրկյան.

## Questions for Hayk (review points)

- **U-vv, the Russian link:** «"մինուտ" և "սեկունդ" բառերը, որ գիտենք ռուսերենից»: keep (a local hook), or use only
  «րոպե / վայրկյան»?
- **U-ww, the closing line:** "ten is everywhere only because we have ten fingers": too strong? (It is the usual
  explanation for base 10, but not proven either.)
- U-a («դու» vs «դուք») applies here too.
