# Short: Why the week has 7 days - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17), rendered in Remotion (DECISIONS.md #21). Script source:
`beats.hy.json`. Follows the Fable batch notes (F131-F134). Sister short: `minute_60/` (time units); they share no
facts and can go out in either order.

## The idea in one paragraph

The day, the month and the year come from the sky; the week does not, and the Moon is not the answer (29.5 days
does not split into sevens). Seven comes from two traditions. The first is the Jewish Sabbath week, which Armenian
kept: the week starts on Sunday, so «երկուշաբթի» is literally the week's second day. The second is the Roman
planetary week, one day for each of the seven moving lights, which English kept (Saturday, Sunday, Monday). Their
odd order (Saturn, then the Sun, then the Moon) has a neat cause: the hours had ruling planets in slow-to-fast
order, a day was named after the planet of its first hour, and 24 leaves 3 when divided by 7, so each day starts
three planets on, which draws a seven-pointed star. The Soviet five- and six-day weeks (Armenia included, spouses
with different days off) failed. The takeaway: the week is not from the sky but from people. (After the Fable
review: the Armenian names moved up, the missing "named after the first hour" link added, the French week and the
Friday etymology cut.)

## The script (Armenian)

<!-- script:start -->

9 beats, 1,594 characters (1,606 with numbers spelled out): ~110 s of speech, ~2:02 with pauses and the end tail, 9 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Օրը, ամիսը և տարին գալիս են երկնքից։ Շաբաթը՝ ոչ։ Օրը Երկրի պտույտն է, ամիսը՝ Լուսնի, տարին՝ Արևի շուրջ պտույտը։ Ուրեմն որտեղի՞ց է յոթը։ *[pause 1 s]*

**2. moon.** Հաճախ ասում են՝ Լուսնի փուլերից է։ Գուցե հնում այդպես էլ սկսվել է, բայց լուսնային ամիսը մոտ քսանինն ու կես օր է և յոթի վրա չի բաժանվում, ուստի մեր անընդհատ շաբաթը Լուսնին չի հետևում։ Մեզ ծանոթ յոթ օրը եկել է երկու փաստագրված ավանդույթից։

**3. sabbath.** Առաջինը հրեական շաբաթն է՝ վեց օր աշխատանք, յոթերորդը՝ հանգիստ։ Այստեղից է մեր «շաբաթ» բառը։

**4. armenian.** Եվ հայերենը պահել է հենց այդ հաշիվը, որտեղ շաբաթը սկսվում է կիրակիով։ Երկուշաբթին բառացի շաբաթվա երկրորդ օրն է, երեքշաբթին՝ երրորդը, և այդպես մինչև հինգշաբթի։ Իսկ կիրակին հունարենից է՝ «Տիրոջ օր»։ *[pause 1 s]*

**5. planets.** Երկրորդ աղբյուրը հին աստղագուշակությունն է։ Աչքով երկնքում երևում էր յոթ շարժվող լուսատու, և հռոմեական աշխարհում ամեն օրը նվիրեցին մեկին։ Անգլերենը դա պահել է՝ շաբաթ օրը Սատուրնի օրն է, կիրակին՝ Արևի, երկուշաբթին՝ Լուսնի։

**6. order_setup.** Բայց սա տարօրինակ հերթ է՝ Սատուրն, հետո Արև, հետո Լուսին։ Երկնքում նրանք այդպես չեն դասավորված։ Հին աստղագետները լուսատուները շարում էին ըստ արագության, և օրվա ամեն ժամ ուներ իր տիրակալը՝ այդ հերթով։ Իսկ օրը կոչվում էր այն լուսատուի անունով, որին պատկանում էր առաջին ժամը։

**7. order_count.** Օրն ունի 24 ժամ։ 24-ը յոթի բաժանելիս մնում է երեք։ Ուրեմն հաջորդ օրվա առաջին ժամն ընկնում է երեք քայլ առաջ՝ Սատուրնից՝ Արև, Արևից՝ Լուսին, Լուսնից՝ Մարս։ *[pause 4.5 s]*

**8. soviet.** Յոթն այնքան ամուր է, որ փոխել չի հաջողվել։ Խորհրդային Միությունը, Հայաստանն էլ հետը, մոտ տասը տարի ապրեց հնգօրյա, հետո վեցօրյա շաբաթով։ Ամուսինները հաճախ տարբեր օրեր էին հանգստանում։ Ի վերջո վերադարձան յոթին։ *[pause 1.5 s]*

**9. takeaway.** Ուրեմն յոթ օրը երկու հին ավանդույթի հանդիպում է։ Շաբաթը երկնքից չէ, մարդկանցից է։ *[pause 1 s]*

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

## After the Fable review (FABLE_REVIEW_2.md, applied 2026-11-25)

- **F176** the repeated hook sentence cut. **F177** the Armenian day names moved up next to the Sabbath. **F180** the
  clause "the week starts on Sunday" added. U-ss: the Friday etymology dropped (unchecked, F231).
- **F178** the missing link added ("a day was named after the planet of its first hour"), and the odd order is said
  first ("Saturn, then the Sun, then the Moon: in the sky they do not stand that way").
- **F179** the showcase split into set-up and count, 4.5 s of near silence for the star; the seven planet names are
  shown, not voiced.
- **F181** the voice says the screen line «Շաբաթը երկնքից չէ, մարդկանցից է». **F182** the French week and the year
  1940 cut (France now lives only in minute_60, F227). **F222** pauses 9 s.

## Questions for Hayk (review points)

- **U-ss, ուրբաթ:** "«նախօրյակ» իմաստով" for the Syriac ʿrubtā: keep (after a check), or drop the Friday clause?
- **U-tt, terms:** «շարժվող լուսատու» for the classical planets, «տիրակալ» for the ruler of an hour: natural?
- **U-uu, the Soviet detail:** «Հայաստանն էլ հետը» and the spouses with different days off: keep?
- U-a («դու» vs «դուք») applies here too.

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md):

- **X47:** 29.53 not dividing by 7 shows only that the continuous week does not track the lunar month; it does not
  disprove that rough lunar quarters inspired an earlier convention (US Naval Observatory calendar chapter,
  https://aa.usno.navy.mil/downloads/c15_usb_online.pdf). The moon beat now says "maybe it began that way, but our
  uninterrupted week does not follow the Moon", and presents the Jewish and planetary traditions as the documented
  route to the familiar week. The planetary-hour star keeps its long pause.
