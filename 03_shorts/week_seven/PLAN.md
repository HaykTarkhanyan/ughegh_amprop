# Short: Why the week has 7 days - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17), rendered in Remotion (DECISIONS.md #21). Script source:
`beats.hy.json`. Follows the Fable batch notes (F131-F134). Sister short: `minute_60/` (time units); they share no
facts and can go out in either order.

## The idea in one paragraph

The day, the month and the year come from the sky; the week does not, and the Moon is not the answer (29.5 days
does not split into sevens). Seven comes from two traditions that merged in the first centuries AD: the Jewish
Sabbath week, and the Roman planetary week, one day for each of the seven moving lights. The odd order of the
planet days has a neat cause: each hour had a ruling planet in slow-to-fast order, a day has 24 hours, and 24
leaves 3 when divided by 7, so each day starts three planets on. Armenian kept the Jewish counting
(«երկուշաբթի» is the week's second day). The French ten-day week and the Soviet five- and six-day weeks (Armenia
included) both failed. The takeaway: seven is neither nature nor mathematics, just two old traditions that met.

## The script (Armenian)

<!-- script:start -->

8 beats, 1,619 characters (1,641 with numbers spelled out): ~112 s of speech, ~1:57 with pauses and the end tail, 2.5 s of them marked silent pauses (estimate, calibrated on 2 measured beats, about +-10%).

**1. hook.** Օրը, ամիսը և տարին գալիս են երկնքից։ Շաբաթը՝ ոչ։ Օրը Երկրի պտույտն է, ամիսը՝ Լուսնի, տարին՝ Արևի շուրջ պտույտը։ Իսկ յոթ օրը ոչ մի բանի պտույտ չէ։ Ուրեմն որտեղի՞ց է այն։

**2. moon.** Հաճախ ասում են՝ Լուսնի փուլերից է։ Բայց լուսնային ամիսը մոտ քսանինն ու կես օր է, և յոթի վրա չի բաժանվում։ Յոթը եկել է երկու այլ տեղից։

**3. sabbath.** Առաջինը հրեական շաբաթն է՝ վեց օր աշխատանք, յոթերորդը՝ հանգիստ։ Այստեղից է մեր «շաբաթ» բառը։

**4. planets.** Երկրորդը հին աստղագուշակությունն է։ Աչքով երկնքում երևում էր յոթ շարժվող լուսատու՝ Արևը, Լուսինը, Մերկուրին, Վեներան, Մարսը, Յուպիտերը և Սատուրնը։ Հռոմեական աշխարհում ամեն օրը նվիրեցին մեկին։ Անգլերենում շաբաթ օրը Սատուրնի օրն է, կիրակին՝ Արևի, երկուշաբթին՝ Լուսնի։

**5. order.** Բայց ինչո՞ւ այս հերթով։ Հին աստղագետները լուսատուները դասավորում էին ըստ արագության՝ Սատուրն, Յուպիտեր, Մարս, Արև, Վեներա, Մերկուրի, Լուսին։ Ամեն ժամ ուներ իր տիրակալը՝ այս հերթով։ Օրն ունի քսանչորս ժամ, և քսանչորսը յոթի բաժանելիս մնում է երեք։ Դրա համար ամեն հաջորդ օր սկսվում է երեք քայլ առաջ՝ Սատուրնից Արև, Արևից Լուսին, Լուսնից Մարս։ *[pause 2.5 s]*

**6. armenian.** Հայերենը պահել է հրեական հաշիվը։ Երկուշաբթին բառացի շաբաթվա երկրորդ օրն է, երեքշաբթին՝ երրորդը, և այդպես մինչև հինգշաբթի։ Կիրակին հունարենից է՝ «Տիրոջ օր», իսկ ուրբաթը՝ ասորերենից, «նախօրյակ» իմաստով։

**7. soviet.** Յոթն այնքան ամուր է, որ փոխել չի հաջողվել։ Ֆրանսիական հեղափոխությունը մտցրեց տասնօրյա շաբաթ, Նապոլեոնը վերացրեց այն։ Իսկ Խորհրդային Միությունը, Հայաստանն էլ հետը, մոտ տասը տարի ապրեց հնգօրյա, հետո վեցօրյա շաբաթով։ Ամուսինները հաճախ տարբեր օրեր էին հանգստանում։ 1940 թվականին վերադարձան յոթին։

**8. takeaway.** Յոթ օրը ոչ բնության օրենք է, ոչ մաթեմատիկա։ Դա երկու հին ավանդույթի հանդիպում է, որ այնքան սովորական դարձավ, որ այլևս չենք նկատում։

<!-- script:end -->

Armenian lint: 0 errors, 0 hints (after «քսանինն ու կես» and dropping a filler «իրականում»).

## Facts (checked)

- **No astronomical basis; two traditions:** "The week as known today is the result of the merging of two
  different cultural traditions" (Jewish and planetary), converging over the first two centuries CE; "the seven-day
  cycle itself has no astronomical basis" (Wikipedia, Week; UCL papers by Stern and Bultrighini, who argue the
  planetary week is a Roman product). The popular "the Babylonians invented the week" is unsettled: an older
  encyclopedia says even the Babylonians had no seven-day week. So the script does not credit Babylon.
- **The Moon:** the synodic month is about 29.53 days.
- **Planetary hours** (Cassius Dio, early 3rd century, the earliest source; Vettius Valens similar; Wikipedia,
  Planetary hours): planets in the "Chaldean order" (Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon, by apparent
  speed) rule the hours in turn; the ruler of a day's first hour names the day; 24 = 3 x 7 + 3, so each day moves
  three places on: Saturn -> Sun -> Moon -> Mars -> Mercury -> Jupiter -> Venus -> Saturn. Checked by hand: it gives
  the week in order.
- **Armenian day names:** like Syriac and Greek (δευτέρα σαββάτων, "second of the week"), Armenian counts the days
  from the Sabbath week: երկուշաբթի ... հինգշաբթի = day 2 ... 5; շաբաթ via Syriac shabta; կիրակի from Greek Kyriake,
  "the Lord's day"; ուրբաթ from Syriac ʿrubtā (Greek Paraskeue "preparation" translates it). "«նախօրյակ» իմաստով"
  (eve) for ʿrubtā is from general knowledge: **check before voicing** (U-ss).
- **Soviet week:** the nepreryvka started in 1929 as a five-day cycle, became six days less than two years later,
  with staggered days off; a decree of 26 June 1940 restored the seven-day week (History.com; Wikipedia, Soviet
  calendar). Spouses with different days off: History.com.
- **French ten-day week:** the Republican calendar (from 1793) used the ten-day décade; Napoleon abolished the
  calendar on 1 January 1806 (World History Encyclopedia).
- **Constantine's Sunday (321)** is left out: one idea per video.

## Visuals

- **The showcase moment (beat 5):** seven planets on a circle in Chaldean order; a pointer ticks 24 hours, lands
  three places on, and the jumps draw the seven-pointed star that reads the week in order. Reference:
  `File:Planets and the days of the week.svg` (CC BY 4.0, Rosmaryn), which shows exactly this; ours is drawn and
  animated.
- **Drawn:** the three orbits and the empty fourth one; the 29.5-day strip; the six-plus-one squares; the Armenian
  names split into number + շաբթի; the French strip and the Soviet roster.

## Questions for Hayk (review points)

- **U-ss, ուրբաթ:** "«նախօրյակ» իմաստով" for the Syriac ʿrubtā: keep (after a check), or drop the Friday clause?
- **U-tt, terms:** «շարժվող լուսատու» for the classical planets, «տիրակալ» for the ruler of an hour: natural?
- **U-uu, the Soviet detail:** «Հայաստանն էլ հետը» and the spouses with different days off: keep?
- U-a («դու» vs «դուք») applies here too.
