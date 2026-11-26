# Short: How Mashtots designed the Armenian alphabet, and why anyone builds an alphabet from scratch - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17), rendered in Remotion (DECISIONS.md #21). Script source:
`beats.hy.json`. Written after the Fable review, so it follows its batch notes (F131-F134): the tension in the
first seconds, one spoken year (the one the hook promises), no summary card, no «Այնպես որ,» ending, two marked
pauses.

## The idea in one paragraph

Try writing «ճնճղուկ» in Greek letters: it cannot be done, because Greek has no ծ, ձ, ճ, ջ, ղ, ռ. Mashtots had
exactly this problem. Most alphabets have no author; ours has an author, a year and a first sentence, and he did
not start from nothing: he took something from the Greeks and invented the rest. Around 400 Armenia was split
between Byzantium and Persia and the church read Greek and Syriac; in 405 Mashtots made 36 letters on one rule,
one sound one letter, kept the Greek order where the sounds matched (այբ, բեն, գիմ, դա like alpha, beta, gamma,
delta) and slotted new letters into the gaps. The 36 letters were also numbers, four rows of nine: units, tens,
hundreds, thousands. The first sentence came from Proverbs; within decades the Bible and Greek and Syriac books
were translated. Most alphabets just formed; ours was a decision. The kingdom was soon lost, but the script
stayed.

## The script (Armenian)

<!-- script:start -->

10 beats, 1,546 characters (1,576 with numbers spelled out): ~108 s of speech, ~1:59 with pauses and the end tail, 9.5 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. challenge.** Փորձիր «ճնճղուկ» բառը գրել հունական տառերով՝ ամեն հնչյունի համար մեկ տառ։ *[pause 2 s]*

**2. no_letters.** Չի ստացվի՝ հունական այբուբենում առանձին տառ չկար, օրինակ, ճնճղուկի «ճ»-ի և «ղ»-ի համար։ Մաշտոցն ուներ հենց այս խնդիրը։

**3. author.** Աշխարհի այբուբենների մեծ մասը հեղինակ չունի։ Մերն ունի հեղինակ, տարեթիվ և նույնիսկ առաջին նախադասություն։ Եվ Մաշտոցը զրոյից չսկսեց՝ մի բան վերցրեց հույներից, մի բան հորինեց ինքը։

**4. problem.** Հինգերորդ դարի սկիզբն էր։ Հայաստանը բաժանված էր Բյուզանդիայի և Պարսկաստանի միջև։ Եկեղեցում կարդում էին հունարեն ու ասորերեն գրքեր, և մարդիկ չէին հասկանում։ Մաշտոց վարդապետը քարոզում էր գավառներում և ամեն օր տեսնում էր դա։

**5. rule.** 405 թվականին Մաշտոցը ստեղծեց 36 տառ։ Գլխավոր սկզբունքը՝ հնարավորինս մեկ հնչյուն, մեկ տառ։ Բայց ոչ ամենուր՝ «ու» հնչյունը, օրինակ, գրվում էր երկու տառով, ինչպես հունարենում։

**6. greek_order.** Որտեղ հունարենն ուներ նույն հնչյունը, նա պահեց հունական հերթականությունը՝ այբ, բեն, գիմ, դա, ինչպես ալֆա, բետա, գամմա, դելտա։ Իսկ նոր հնչյունների համար հորինեց նոր տառեր և տեղավորեց դրանք արանքներում։ *[pause 2.5 s]*

**7. numbers.** Տառերը նաև թվեր էին, և 36 տառը կազմում էր չորս իննյակ՝ միավորներ, տասնավորներ, հարյուրավորներ և հազարավորներ։ Այբը մեկն էր, ժեն՝ տասը, ճեն՝ հարյուր, ռան՝ հազար։ *[pause 1.5 s]*

**8. first_sentence.** Ասում են՝ առաջին նախադասությունը, որ գրեցին նոր տառերով, Սողոմոնի առակներից էր՝ «Ճանաչել զիմաստութիւն եւ զխրատ, իմանալ զբանս հանճարոյ»։ Ճանաչել իմաստությունն ու խրատը, հասկանալ հանճարի խոսքերը։ *[pause 2 s]*

**9. result.** Մի քանի տասնամյակում հայերեն թարգմանվեցին Աստվածաշունչը և հունական ու ասորական գրքեր, իսկ հինգերորդ դարը կոչվեց ոսկեդար։

**10. takeaway.** Այբուբենների մեծ մասն ինքնըստինքյան է ձևավորվել։ Մերը որոշում էր։ Թագավորությունը շուտով կորավ, բայց գիրը մնաց։ *[pause 1.5 s]*

<!-- script:end -->

Armenian lint: 0 errors, 0 hints (the Proverbs line is a quotation in classical spelling and is kept as written).

## Facts (checked)

- **Date, people, place:** 405 on all three Wikipedia pages (Mesrop Mashtots, Armenian alphabet, History of the
  Armenian alphabet); supported by Catholicos Sahak Partev and King Vramshapuh; devised "in the cities of Edessa and
  Samsat" (Samosata). Primary source: Koriun's *Life of Mashtots*, written by his pupil (oldest manuscript 12th
  century).
- **Why:** Armenia "lost its independence in 387 and was divided between the Byzantine Empire and Persia"; Greek,
  Persian and Syriac scripts were "none of which was well suited for representing the many complex sounds" of
  Armenian; his first aim was religious literature for his people. Preaching in the provinces (Goghtn) is from
  Koriun as retold in the Wikipedia article.
- **Daniel's letters:** Mashtots consulted "Daniel, a bishop of Mesopotamia"; that his letters were not enough for
  Armenian sounds is Koriun's account (the Wikipedia pages read did not give the count, so the script gives none).
- **Hropanos:** Koriun's Greek calligrapher «Հռոփանոս» (Rufanos, Rufinus "a monk of Samosata" in the English
  article).
- **36 letters, Greek order, numbers:** 36 originally; Օ and Ֆ added later (the three pages say the 11th, 12th and
  13th century: they disagree, so the script gives no date); the order follows Greek where the sounds match (the
  Armenian alphabet page: "the general consensus is that Armenian is modeled after the Greek alphabet"; the History
  page leans to Pahlavi or Aramaic models for the letter shapes); each letter has a numerical value (Ա 1, Բ 2, Ժ 10,
  Ճ 100), used for dates in manuscripts.
- **First sentence:** Proverbs 1:2, «Ճանաչել զիմաստութիւն եւ զխրատ, իմանալ զբանս հանճարոյ»; one page says it "is said
  to be the first sentence", hence «Ասում են».
- **Golden age:** the Bible and Greek and Syriac books translated within decades; the 5th century is called the
  golden age (ոսկեդար). The Arsacid kingdom ended in 428.
- **Hangul:** created under King Sejong (1443, published 1446); the basic consonant shapes depict the speech organs
  (ㄱ the tongue root, ㄴ the tongue tip). From general knowledge; check the Hunminjeongeum Haerye summary before
  voicing.
- **Sequoyah:** created the Cherokee syllabary (finished about 1821) without being able to read any language; it
  spread quickly. From general knowledge; check before voicing.
- **Left out on purpose:** Armenian medieval sources also credit Mashtots with the Georgian and Caucasian Albanian
  scripts; the Georgian claim is disputed by most scholars, so the script does not raise it (a doubt beat would
  take the air out of the story, Fable pattern 8).

## Visuals

- **Real photos (Commons):** `File:Mesrop Mashtots statue at Matenadaran Yerevan 2026.jpg` (CC BY-SA 4.0, Furkan
  Akkurt), `File:Armenian manuscript fragment (5th century).jpg` (public domain), `File:Erkatagir manuscript.jpg`
  (public domain). (The Sequoyah painting went with the cut extension; X57.)
- **Drawn:** the alphabets-without-author hook; the split map; «ճնճղուկ» failing in Greek letters; the Greek and
  Armenian rows with matching letters linked and the new letters dropping in (the showcase moment); letters flipping
  to numbers; the first sentence written in erkatagir. (The Hangul mouth profile was cut with its beat; X57.)
- **Font for erkatagir:** needs a free font with old-style capitals; otherwise draw the first sentence from the
  manuscript photo.

## After the Fable review (FABLE_REVIEW_2.md, applied 2026-11-25)

- **F161** the hook is now the ճնճղուկ challenge (2 s to try it), then the missing sounds, then "author, year, first
  sentence, and he did not start from nothing" (the how, not the school "why"). «զրոյից» now says he did NOT start
  from zero.
- **F162** cut beat 9 (Korea, Cherokee): the unchecked Hangul and Sequoyah facts go with it (F231). **F163** the
  design beat split in two, Hropanos and the cities on the source line, 2.5 s on the Greek-order showcase.
- **F164** voice test done: the classical sentence and the digits came back right; the letter names need your ear
  (`voice_test/batch2_risky.html`, t1). U-mm: both versions kept.
- **F165** no Cyrillic in the "no author" row (Latin, Greek, Arabic). **F166** Daniel's letters cut; the numbers
  beat is now the 4 x 9 grid (units, tens, hundreds, thousands), checked against Wikipedia, Armenian numerals.
- **F167** beat 2 now all past tense. **F225** closes on the image «Թագավորությունը շուտով կորավ, բայց գիրը
  մնաց», which is also the screen line (F226). **F222** pauses 9.5 s.

## Questions for Hayk (review points)

- **U-ll, wording:** «զրոյից տառեր հորինում», «Մաշտոց վարդապետ», «Ասորիքի քաղաքներ», «հույն գրիչ Հռոփանոս»: natural?
- **U-mm, the classical sentence:** the voice reads «Ճանաչել զիմաստութիւն ...» in classical spelling, then the modern
  version. Keep both, or only the modern one (the voice may stumble on the classical forms)?
- **U-nn, the extension:** Korea and the Cherokee as "others did the same" (my pick), or end on Armenian alone?
- **U-oo, Georgian alphabet claim:** leave it out (my pick), or mention it as a tradition?
- U-a («դու» vs «դուք») applies here too.

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md):

- **X36:** the challenge is now "one Greek letter per Armenian sound" (a word can be approximated with letter
  combinations, so "cannot write it" was too strong), and the missing items are sounds, not the letter names «ծա,
  ձա, ճե ...». The principle is "as far as possible one sound, one letter", with «ու» (two letters for one sound,
  as in Greek ου) as the exception, per a scholarly grammar of Classical Armenian
  (https://mudrac.ffzg.hr/~rmatasov/ARMENIAN2.pdf). The English spelling video uses the same qualified wording.
- **X57:** cut scenes removed from the active visual list.
- Open voice question: how the voice reads «ճ»-ի and «ղ»-ի (letter names or sounds); check in the voice test before
  paying for the full script.
