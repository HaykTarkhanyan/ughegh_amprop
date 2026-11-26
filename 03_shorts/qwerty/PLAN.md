# Showcase 3: Why the QWERTY layout won (messier than the "made to slow typists down" myth) - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17); after approval: full animation (Q16, showcase) in Remotion
(DECISIONS.md #21). Script source: `beats.hy.json`.

## The idea in one paragraph

"QWERTY was designed to slow typists down" is a myth. Sholes's keyboard changed many times from a near-alphabetical
start; jamming may have played a part but is disputed; the Yasuokas (Kyoto, 2011) showed the layout grew from the
needs of telegraph operators (Z next to S and E because Morse Z looks like "SE"). Remington took it over in 1873; the
"TYPEWRITER on the top row" story is a legend; an 1888 typing contest won on a QWERTY Remington made noise; in 1893
the big makers merged on it, then teletypes, computers and phones inherited it. Even the "we are stuck with a worse
layout" story is shaky: Dvorak's own 1944 Navy test is suspect and a better 1956 test found no gain. It reached the
Armenian phonetic layout too. Lesson: a too-neat story is usually wrong.

## The script (Armenian)

<!-- script:start -->

8 beats, 1,444 characters (1,444 with numbers spelled out): ~100 s of speech, ~1:50 with pauses and the end tail, 8.5 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Ասում են՝ ստեղնաշարի քվերթի դասավորությունը հորինել են, որ մեքենագրողներին դանդաղեցնեն։ Սա առասպել է։ Իրական պատմությունը շատ ավելի խառն է։ *[pause 1 s]*

**2. sholes.** Ամերիկացի Քրիստոֆեր Շոուլզն ընկերների հետ գրամեքենա էր ստեղծում։ Ստեղնաշարը տարիների ընթացքում բազմիցս փոխվեց։ Առաջին տարբերակներում տառերը գրեթե այբբենական կարգով էին շարված։ *[pause 1.5 s]*

**3. jam.** Հաճախ ասում են, թե հաճախակի զույգ տառերը հեռացրին իրարից, որ մետաղե լծակները չխճճվեն։ Գուցե դա էլ դեր խաղաց, բայց պատմաբանները դրա մասին մինչ օրս վիճում են։

**4. telegraph.** Երկու ճապոնացի հետազոտող այլ բան ցույց տվեցին։ Առաջին գրամեքենաների կարևոր օգտատերերը հեռագրիչներն էին, որոնք Մորզեի կոդով եկած հաղորդագրություններն արագ վերածում էին տեքստի։ Ստեղնաշարը փոխվում էր նրանց կարիքներով։ Օրինակ՝ ամերիկյան Մորզեի կոդում մի տառ հեշտությամբ շփոթվում էր երկու այլ տառերի զույգի հետ, և այդ տառը դրեցին հենց այդ երկուսի կողքին։ *[pause 2.5 s]*

**5. remington.** Հետո արտադրությունը վերցրեց Ռեմինգթոնը՝ զենք և կարի մեքենաներ արտադրող ընկերությունը։ Այդ ժամանակ ստեղնաշարն արդեն գրեթե այսպիսին էր։

**6. standard.** Ամերիկյան խոշոր արտադրողները միավորվեցին, և քվերթին դարձավ ստանդարտ։ Հետո այն անցավ հեռատիպերին, իսկ նրանցից՝ համակարգիչներին ու հեռախոսներին։ Ամեն նոր մեքենա ժառանգեց նախորդի դասավորությունը, որ մարդիկ ստիպված չլինեն վերասովորել։ *[pause 2 s]*

**7. armenian.** Եվ այն հասել է նաև մեզ՝ հայերեն հնչյունային դասավորության մեջ տառերը դրված են անգլիական նույնահնչյուն տառերի տեղում, օրինակ՝ «Ա»-ն ու «Ս»-ն։ *[pause 1.5 s]*

**8. takeaway.** Կոկիկ պատմությունը՝ «հորինեցին, որ դանդաղեցնեն», սխալ էր։ Իսկ իրականը պարզ է՝ ամեն նոր մեքենա ժառանգեց նախորդի ստեղնաշարը։

<!-- script:end -->

Armenian lint: 0 errors after three house-style fixes (articles before vowels, a redundant «մենք»).

## Facts (checked)

- **Telegraph origin** (Koichi & Motoko Yasuoka, "On the Prehistory of QWERTY", *ZINBUN* 42, Kyoto University;
  2011 per Smithsonian, the repository labels it 2009/2010): the early Type-Writer keyboard derived from the
  Hughes-Phelps printing telegraph for Morse receivers; the layout "accidentally grew into QWERTY among the different
  requirements"; American Morse Z is often confused with "SE", hence Z near S and E; they reject both the "slow
  typists" and the jamming-as-design-goal stories. Smithsonian notes the mechanical explanation remains contested.
- **Remington, 1873**: E. Remington and Sons (arms, sewing machines) took over production.
- **"TYPEWRITER" on the top row**: true as a fact (checked: all its letters are in QWERTYUIOP); that salesmen were
  the reason is a legend, said as such.
- **1888 contest** (Cincinnati, 25 July 1888): Frank McGurrin, touch-typing on a Remington No. 2, beat Louis Traub
  (Caligraph) and won $500; it popularised touch typing; McGurrin lost to Mae Orr the next month (said as "the next
  month he was beaten too"). Sources: Wikipedia, oz.Typewriter blog, Yasuoka's blog; finger counts for Traub vary,
  so the script does not mention them.
- **1893**: Remington-linked makers merged (Union Typewriter Company) and adopted QWERTY as the de facto standard
  (Smithsonian); Teletype adopted it in the 1910s.
- **Dvorak**: patented 1936; the 1944 Navy study (14 retrained vs 18 QWERTY typists) was run by Lt. Cdr. August Dvorak,
  later judged biased at best; Earle Strong's 1956 GSA study found retrained typists matched but did not beat their
  QWERTY speed. The debate: Paul David, "Clio and the Economics of QWERTY" (1985) vs Liebowitz & Margolis, "The Fable
  of the Keys" (*J. Law & Economics*, 1990). Both sides accuse the other of bias; the script calls it «վիճելի».
- **Armenian phonetic layout**: Armenian letters on the QWERTY keys of the same sound (Ա on A, Ս on S).

## Animation plan (showcase)

- **Typebars:** a semicircle of typebars swinging up to the paper, two neighbours jamming (beat 3).
- **Layout morphs:** keys slide between layouts: the alphabetical piano-key prototype -> intermediate layouts ->
  QWERTY (beat 2), QWERTY -> Dvorak and back (beat 9), Latin -> Armenian phonetic (beat 11). One `Keyboard` component
  with an animated key-position map.
- **Morse:** a telegraph key clicking, dots and dashes for Z vs "S E" side by side (beat 4).
- **Race:** two typists with word counters (beat 7).
- **Timeline:** 1868 -> 1873 -> 1888 -> 1893 -> 1910s -> today, the same top row on each device (beat 8).
- Estimated 2-3 h; the keyboard morph is the core reusable piece.

## Questions for Hayk (review points)

- **U-v, terms:** «մեքենագրող», «լծակներ» (typebars), «հեռագրիչ», «հեռատիպ», «կույր մեթոդով տպել»: natural?
- **U-w, English letters in speech:** the voice must say "QWERTY", "Z", "SE", "TYPEWRITER": the TTS may read them
  oddly; alternative: spell them in Armenian in the spoken text (Քվերթի, զեդ) and keep Latin only on screen.
- **U-x, length:** ~2.8 min, the longest so far; beats 5 (Remington) and 10 (economists) can be cut.
- U-a («դու» vs «դուք») applies here too.

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md):

- **X51:** the script was 175.9 s before any pauses. It now follows one spine: how a mechanical layout became
  inherited infrastructure (telegraph operators shaped it, Remington built it, every new machine inherited it, down to
  the Armenian phonetic layout). The TYPEWRITER legend, the 1888 contest, Dvorak and the economists' debate are cut
  (texts below; a second video if wanted). Years and researchers' names moved to the source lines, 8.5 s of pauses
  with the longest on the Morse showcase, the closing says its screen line, no «Այնպես որ,».
- **X55:** no Latin left in the voice. QWERTY is spoken «քվերթի» (spoken form to confirm with Hayk; the screen keeps
  «QWERTY»), the Morse example names no letters (Z, S, E stay on screen), and the Armenian layout example uses the
  Armenian letters «Ա» and «Ս».

**Cut beats, kept here word for word so they can come back:**

- `legend`: Ասում են նաև, որ վերին շարքում կան TYPEWRITER բառի բոլոր տառերը, որպեսզի վաճառողներն արագ տպեն այն ու տպավորեն գնորդներին։ Տառերն իսկապես այնտեղ են, բայց որ սա է եղել պատճառը, ոչ ոք չի ապացուցել։

- `contest`: Իսկ ինչո՞ւ հաղթեց հենց այս դասավորությունը։ 1888 թվականին Ցինցինատիում արագ տպելու մրցույթում Ֆրենկ Մակգուրինը, որը կույր մեթոդով էր տպում QWERTY-ով Ռեմինգթոնի վրա, հաղթեց մրցակցին ու ստացավ 500 դոլար։ Մրցույթը մեծ աղմուկ բարձրացրեց, թեև հաջորդ ամիս նրան էլ հաղթեցին։

- `dvorak`: 1936 թվականին Օգոստ Դվորակը պատենտավորեց «ավելի արագ» դասավորություն։ Նրա ամենահայտնի ապացույցը՝ ռազմածովային ուժերի 1944 թվականի փորձը, անցկացրել էր հենց ինքը՝ Դվորակը, և այն հետագայում կասկածի տակ դրվեց։ 1956 թվականի ավելի խնամքով կազմակերպված փորձում վերապատրաստված մեքենագրողները Դվորակի ստեղնաշարով ավելի արագ չդարձան։ (screen: Դվորակ, 1936)

- `path`: Այսինքն՝ նույնիսկ այն պնդումը, թե խրված ենք վատ դասավորության մեջ, վիճելի է։ Տնտեսագետները մինչ օրս վիճում են՝ QWERTY-ն սխալ ընտրության օրինա՞կ է, թե՞ բավականաչափ լավ լուծում, որը փոխելն ավելի թանկ կարժենա, քան կշահենք։
