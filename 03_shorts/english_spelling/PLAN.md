# Short: Why English spelling is a mess (the Great Vowel Shift) - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17), rendered in Remotion (DECISIONS.md #21). Script source:
`beats.hy.json`. Follows the Fable batch notes (F131-F134). Pairs with the Mashtots short: one alphabet built for its
sounds, one that drifted away from them; publish them next to each other.

## The idea in one paragraph

«Դոու, թրու, թաֆ, քոֆ, բաու»: the same four letters, five readings (though, through, tough, cough, bough), and that
is why English children learn to read twice as slowly as Finnish or Italian ones. But English was once written as
spoken: «knight» was read «քնիխտ»; then the sounds changed and the writing did not. Over about three hundred years
the long vowels moved (the Great Vowel Shift: «հուս» became «հաուս»), and just then printing arrived and froze the
spellings: a photograph of the old pronunciation. Armenian started from the opposite rule (one letter per sound)
and its spelling is still close to speech, though not fully. English reform keeps failing, partly because old
books would become hard to read; Webster's American "color" is the one success. The takeaway: English spelling is
not wrong, it is old, and many of its odd letters show how people spoke five hundred years ago. (After the Fable
review: the debt / island beat is cut.)

## The script (Armenian)

<!-- script:start -->

8 beats, 1,452 characters (1,452 with numbers spelled out): ~100 s of speech, ~1:51 with pauses and the end tail, 8.5 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Դոու, թրու, թաֆ, քոֆ, բաու։ Նույն չորս տառը՝ հինգ տարբեր արտասանությամբ։ *[pause 1.5 s]*

**2. cost.** Դրա համար անգլիացի երեխաները կարդալ սովորում են երկու անգամ ավելի դանդաղ, քան իտալացի կամ ֆին երեխաները։ Բայց անգլերենի շատ «լուռ» տառեր ժամանակին կարդացվում էին։

**3. knight.** Վեց հարյուր տարի առաջ «ասպետ» բառը կարդում էին «քնիխտ»՝ ճիշտ այնպես, ինչպես գրված է։ Հետո հնչյունները փոխվեցին, իսկ գրությունը՝ ոչ։ Այսօր ասում են «նայթ»։ *[pause 1 s]*

**4. shift.** Մոտ երեք հարյուր տարում անգլերենի երկար ձայնավորները տեղաշարժվեցին։ «Տուն» բառը, որ կարդացվում էր «հուս», դարձավ «հաուս»։ Սա կոչվում է ձայնավորների մեծ տեղաշարժ, և ճշգրիտ պատճառը մինչ օրս չգիտենք։ *[pause 1.5 s]*

**5. print.** Եվ հենց այդ ժամանակ Անգլիա հասավ տպագրությունը։ Գրքերը տպվեցին հազարներով, և բառերի գրությունը սկսեց քարանալ, մինչդեռ արտասանությունը դեռ շարժվում էր։ Ստացվեց հին արտասանության լուսանկար։ Սա շատ բան է բացատրում, բայց ոչ ամեն ինչ։ Որոշ տարօրինակ գրություններ փոխառություններից են, որոշները՝ հետագա «գիտական» ուղղումներից։ *[pause 2 s]*

**6. armenian.** Հայերենի տառերը Մաշտոցը ստեղծեց հենց հայերենի հնչյունների համար, և մեր ուղղագրությունն այսօր էլ շատ ավելի մոտ է արտասանությանը, թեև ոչ ամբողջությամբ։ *[pause 1 s]*

**7. reform.** Իսկ ինչո՞ւ անգլիացիները չեն ուղղում։ Փորձել են դարեր շարունակ։ Ամենահաջողը Նոյ Վեբստերն էր, որի բառարաններն ամերիկյան անգլերենում տարածեցին «գույն» բառի ավելի կարճ գրությունը։ Ամբողջական ռեֆորմի դեմ փաստարկներից մեկն այն է, որ հին գրքերը հանկարծ դժվար կկարդացվեին։

**8. takeaway.** Անգլերենի ուղղագրությունը սխալ չէ՝ այն հին է։ Նրա տարօրինակ տառերից շատերը ցույց են տալիս, թե ինչպես էին խոսում հինգ հարյուր տարի առաջ։ *[pause 1.5 s]*

<!-- script:end -->

Armenian lint: 0 errors, 0 hints. **No Latin in the voice** (F129): English words are on screen only, and the voice
says them in Armenian letters («քնիխտ», «նայթ», «բայթ», «բիթ», «դեբիտում», «ինսուլա»).

## Facts (checked)

- **Reading speed** (Seymour, Aro & Erskine, *British Journal of Psychology* 94: 143-174, 2003; 13 European
  orthographies): "The rate of development in English is more than twice as slow as in the shallow orthographies";
  word-reading accuracy passed 90% by the end of the first school year everywhere except Portuguese, French, Danish
  and "particularly, English". Finnish, Italian, Greek and Spanish are among the shallow ones. The English sample
  was Scottish children. The often quoted "34% of words" was not found in the sources read, so it is not used.
- **Great Vowel Shift:** mainly 1400-1700 (Wikipedia; other sources start it in 1350 or end it in the 18th
  century); the long vowels rose one step and the highest became diphthongs: Middle English bite /biːt/ ("beet"),
  meet /meːt/ ("mate"), house /huːs/ ("hoose"). Its causes are still debated (Discovery UK and others).
- **knight:** the k and the gh (a «խ»-like sound) were pronounced in Middle English. From standard histories of
  English; the k fell silent in the 17th century.
- **Printing:** Caxton set up his press in Westminster in 1476; spelling was standardised before the vowel changes
  finished, "so English writing froze even as it continued to evolve" (Dictionary.com); Caxton's Low Countries
  printers brought Dutch forms such as "ghost".
- **Latin respellings:** dette -> debt (Latin debitum), doute -> doubt (dubitare); iland -> island, with an s added
  by a false link to Latin insula, though the word is Old English (Mental Floss; Upward & Davidson, *The History of
  English Spelling*, 2011, as cited by Hotta's blog).
- **Webster:** Noah Webster's dictionaries (1806, 1828) fixed color, center in American spelling. From general
  knowledge.
- **Armenian:** each sound has its own letter (the History of the Armenian alphabet page: it "precisely reflects
  the phoneme structure"); exceptions named in the script: initial ե read «յե», initial ո read «վո». Others exist
  (unwritten ը between consonants), so the script says «գրեթե».

## Visuals

- **Drawn, mostly:** the two reading bars; the five -ough words with their readings (the 2 s pause); knight lit
  letter by letter (consonant loss); house with its vowel sliding from 'hoos' to 'house' (vowel change); a press
  stamping a frozen word while the sound keeps moving (the showcase moment); colour -> color. (The vowel chart and
  the debt / island letters were cut with their beats; X37, X57.)
- **Real image:** `File:The Caxton Celebration - William Caxton showing specimens of his printing to King Edward IV
  and his Queen.jpg` (public domain, William Small).

## After the Fable review (FABLE_REVIEW_2.md, applied 2026-11-25)

- **F168** the -ough words are frame 0 and second 0, the reading statistic follows as the consequence. **F169** the
  voice reads the five («Դոու, թրու, թաֆ, քոֆ, բաու»).
- **F170 / F171** beat 6 (debt, island) cut, and the takeaway says «տարօրինակ տառերից շատերը», not "every".
- **F172** option (a): claim less («մոտ է արտասանությանը, թեև ոչ ամբողջությամբ»); no "Mashtots made us read as
  written", no Armenian reform claim.
- **F173** no spoken date range (on screen), one sound pair (house), two-row picture instead of the vowel chart.
  **F174** knight order fixed (then the sounds changed, today «նայթ»). **F175** 2 s on the "photograph".
- Webster (F231) checked: his 1806 and 1828 dictionaries set color / center in American spelling (he championed
  existing forms); the script says his dictionaries spread the shorter spelling. **F222** pauses 8.5 s.
- Voice test: «քոֆ» was heard as «քաֆ»; listen to t3 in `voice_test/batch2_risky.html`.

## Questions for Hayk (review points)

- **U-pp, the term:** «ձայնավորների մեծ տեղաշարժ» for the Great Vowel Shift: natural?
- **U-qq, transliterations in the voice:** «քնիխտ», «նայթ», «բայթ / բիթ», «միթ / մեյթ», «հաուս / հուս»: clear enough, or
  should the voice say the English words (risk: the Armenian voice mangles them)?
- **U-rr, «պարտք» and «կղզի» in quotes** for debt and island, with the English on screen: clear?
- U-a («դու» vs «դուք») applies here too.

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md):

- **X37:** "English was once written exactly as read" is now "many silent letters were once pronounced"; knight
  stands for consonant loss and house for the vowel shift; the print beat says sound change and printing explain much
  but not all, naming borrowings and later learned respellings; "Armenian started from the opposite principle" is
  gone (early English spelling did try to follow speech); the old-books point is one argument against a full reform,
  not a settled outcome. Stale shot instructions (vowel chart, debt / island) removed.
- **X36:** the Armenian beat says Mashtots made the letters for Armenian's sounds and today's spelling is much closer
  to pronunciation, not a perfect one-to-one encoding.

## Evidence record (Codex review X60, 2026-11-26)

One row per consequential claim in the current script. *Kind*: data (observed), calculation, analogy, story or
interpretation. *Checked*: what was actually read; "secondary" means a summary or encyclopedia, not the source;
"unverified" means nobody has read a source for these exact words yet. Fix the unverified rows before the voice.

| Beat | Claim (as voiced) | Source | Kind | Checked |
|---|---|---|---|---|
| cost | English children learn to read more than twice as slowly as Italian or Finnish ones | Seymour, Aro & Erskine 2003, *Br J Psychol* 94: 143-174, https://doi.org/10.1348/000712603321661859 (abstract) | data | abstract checked in OpenAlex ("more than twice as slow"); English sample Scottish |
| knight | k and gh were pronounced in Middle English | standard histories of English (no page recorded) | data (historical) | general knowledge; add a page |
| shift | long vowels moved over about 300 years; house 'hoos' -> 'house'; cause unknown | Wikipedia 'Great Vowel Shift' | data | secondary only |
| print | Caxton's press (1476); spelling fixed while pronunciation still moved | Dictionary.com article | data | secondary only |
| print | some odd spellings are borrowings or later learned respellings (debt, island) | Upward & Davidson 2011, as cited by a blog | data | secondary citation; read the book |
| reform | Webster's dictionaries spread 'color' | general knowledge | data | unverified |
| reform | old books becoming harder to read is one argument against reform | reform debate (no source recorded) | argument | voiced as an argument, not an outcome |
| armenian | Armenian spelling is much closer to pronunciation, not fully | Wikipedia 'History of the Armenian alphabet' | data | secondary only |

## Source check (2026-11-27, `../../_knowledge/short_videos/fact_sources_2026-11-26.md`)

- **Webster (supported):** his dictionaries spread the shorter American spellings such as "color".
