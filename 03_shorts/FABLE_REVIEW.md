# Editorial review of the ten shorts scripts

Reviewer: Claude (Fable 5.2), 2026-11-25. Scope: hook, clarity, pacing, ending, visuals, and how the Armenian
sounds when heard. Facts were not re-checked. Nothing was voiced, rendered or committed, and no other file was
changed.

Update, same day: an eleventh script, kids_tv, was reviewed after the first ten. It is section 12, at the end, so
that the IDs stay in order. The length table, the pattern notes, the ranking note and the publishing order (F130)
in sections 0 and 11 were updated for it; where the text says "the ten", it means the original batch.

## Contents

- [0. How to read this, and the length check](#0-how-to-read-this-and-the-length-check)
- [1. bayes_test](#1-bayes_test)
- [2. simpson](#2-simpson)
- [3. regression](#3-regression)
- [4. waiting](#4-waiting)
- [5. crypto_paint](#5-crypto_paint)
- [6. friendship](#6-friendship)
- [7. qwerty](#7-qwerty)
- [8. petrov](#8-petrov)
- [9. own_voice](#9-own_voice)
- [10. yawning](#10-yawning)
- [11. Cross-cutting](#11-cross-cutting)
- [12. kids_tv (added after the first ten)](#12-kids_tv-added-after-the-first-ten)

## 0. How to read this, and the length check

- Every item that needs a decision has an ID, F1 to F152, one sequence for the whole file. Answer by ID.
- Armenian items are questions, not corrections. **[heard]** = structural, about following it by ear (sentence
  length, ambiguity, number density): fairly reliable. **[ear]** = "sounds off to me": the style guide measured this
  kind of model judgement as right 1 time in 9, so treat those as low-confidence.
- "Gloss" = an English version of a proposed line. The Armenian wording is Hayk's.
- Beat times are computed from character counts, not from audio.

### Length table

Method: characters = sum of the `text` fields; speech = characters / 870 x 60; total = speech + 0.12 s x (beats - 1)
+ 1.2 s tail. Limits: 180 s total, 165 s of speech (2,392 characters).

| Script | Beats | Chars | Speech, s | Total | Numbers spoken: speech, s | Numbers spoken: total | Hook | Verdict |
|---|---|---|---|---|---|---|---|---|
| bayes_test | 14 | 2,182 | 150 | 2:33 | 160 | 2:42 | strong | small fixes |
| simpson | 13 | 2,101 | 145 | 2:27 | 160 | 2:42 | ok | small fixes (cuts) |
| regression | 14 | 2,294 | 158 | 2:41 | 165 | 2:47 | strong | small fixes |
| waiting | 12 | 2,301 | 159 | 2:41 | 160 | 2:42 | weak | needs rework |
| crypto_paint | 14 | 2,291 | 158 | 2:41 | 165 | 2:47 | ok | small fixes |
| friendship | 13 | 1,952 | 135 | 2:17 | 140 | 2:22 | strong | small fixes |
| qwerty | 12 | 2,420 | 167 | 2:49 | 180 | 3:02 | weak | needs rework |
| petrov | 13 | 1,903 | 131 | 2:14 | 138 | 2:20 | ok | small fixes |
| own_voice | 12 | 1,663 | 115 | 1:57 | 118 | 2:00 | strong | small fixes |
| yawning | 11 | 1,747 | 120 | 2:03 | 127 | 2:09 | strong | small fixes |
| kids_tv (added) | 11 | 2,228 | 154 | 2:36 | 157 | 2:39 | ok | small fixes |

**The "numbers spoken" columns.** The 870 characters a minute were measured on the pilot, whose text has no digits
at all. These scripts write numbers as digits: «1986» counts as 4 characters but is spoken as «հազար ինը հարյուր
ութսունվեց» (27 characters). I spelled out every number and recounted. This is an estimate, not a measurement: it
assumes the voice reads a spelled-out number at its normal rate, and it does not adjust Latin letters (QWERTY, Z).

### What the numbers say

1. **qwerty is over.** Raw count: 167 s of speech, already past the 165 s cap. With its 7 years read aloud: about
   180 s of speech, 3:02 in total, past the hard limit. It must lose two beats: 10 (path) and 5 (remington), and
   beat 9 must shrink (see F80, F81).
2. **regression and crypto_paint are at the cap** once numbers are spoken (165 s of speech, no margin). Each loses
   one beat: regression beat 10 (galton, F31), crypto_paint beat 12 (history, F57).
3. **bayes_test, simpson, waiting** are inside the limit by about 5 s. No forced cut, but I recommend one anyway
   for editorial reasons: bayes beat 4, simpson beat 11 (and 9), waiting beat 5. **kids_tv** (added) is inside by
   about 8 s; it has only four numbers written as digits, so the two estimates are close. Same advice: beat 9
   (guidelines, F139).
4. **friendship, petrov, own_voice, yawning** are fine.
5. **No script leaves room for silence.** `build_timeline.py` joins beats with a fixed 0.12 s gap, and every script
   is sized to fill its time with speech. The showcases need silent seconds (the paint swirl, the alarm, the
   network drawing itself). Budget a showcase at about 150 s of speech (about 2,175 spoken characters) so 10-15 s
   are left for the animation.
6. **Check the estimate with one TTS call** (not done here, it is a paid API): voice simpson beat 4 (141
   characters, 3 three-digit numbers). If it comes back at about 14 s and not 9.7 s, the spelled-out count is the
   right one for the whole batch.
7. **Caption timing.** `build_timeline.py` gives each word time in proportion to its letter count, so «1986» gets
   the time of a 4-letter word. Expect the word-by-word captions to slip around numbers, most in bayes_test (about
   40 number mentions by my rough count, against 3 in the pilot) and simpson. `check_sync.py` should show it.
8. **Measured since (note added with kids_tv).** After the first version of this review two beats were voiced
   (`tts_ledger.csv`): simpson beat 4 came back at 11.8 s (raw estimate 9.7 s, spelled-out estimate 14.0 s) and
   the petrov hook at 12.6 s (10.4 s and 12.5 s). So the truth lies between the two columns of the table, and
   `plan_script.py` now uses their midpoint. On the midpoint qwerty is about 174 s of speech, still over the cap,
   about 2:56 in total; regression and crypto_paint are about 162 s, 3 s under the cap and not on it. The cuts I
   recommend stand, since they were editorial as much as arithmetic, but for regression and crypto_paint "must
   lose a beat" becomes "should". `build_timeline.py` now weights a number by its spoken length, so item 7 is
   dealt with. The table keeps the uncalibrated method so that all eleven rows are comparable.

## 1. bayes_test

14 beats, 2,182 characters, about 2:33 (about 2:42 with numbers spoken).

**Hook: strong.** Personal, one number, one question, under 8 s, and the situation is clear after 4 s. Keep.

**Core idea.** Clear and repeatable up to beat 8 (the first 67 s): "a positive on a 99% test for a rare disease can
be a coin flip, because the healthy outnumber the sick". After that the script adds four more number scenarios (9%,
doctors 21% and 87%, retest 99%, symptoms 92%) and a formula. Where a viewer gets lost:

- "99" ends up with three meanings: the test's accuracy, the wrong intuitive answer, and in beat 11 the probability
  after a second test. "About 99 percent" as the good news at 1:55, after a minute of "not 99", is confusing by ear.
- About 40 number mentions in 2.5 minutes.

**Pacing.**

- **F1.** Cut beat 4 (meaning). It leaves the crowd for a side panel and comes back, and it says what beat 6 says
  again ("1 of 100 healthy is flagged" / "1 percent of them, about ten"). Fold one clause into beat 5. Saves about
  9 s and removes two tiny 10 x 10 blocks squeezed next to a 1,000-dot grid.
- **F2.** Merge beat 9 (rarer) and beat 12 (symptoms) into one "same test, different rarity" beat: 1 in 1,000 gives
  9%, 1 in 100 gives 50%, 1 in 10 (you have symptoms) gives 92%. They are one idea seen from two sides, and it is
  exactly what the takeaway asks. Saves about 12 s and a grid reset.
- **F3.** Move beat 10 (doctors) to right after beat 8 and tie it to the video itself (gloss: "after one hour of
  counting people and not percentages, 87 percent got it right. You just did the same in one minute."). The
  script has the material for this line and does not use it.
- **F4.** Beat 11 (retest) is the longest beat (23 s). Keep three things: repeat the test by another method; a
  healthy person almost never tests positive twice; that is why a positive HIV test is always confirmed. Drop the
  "about 99 percent" figure (the collision above).
- **Rushed:** beat 7 (reveal) has four sentences in 11 s while 20 dots fly out and regroup. It needs about 1.5 s
  without voice between «Քսան մարդ» and the 50%.
- **F5.** Beat 13 (formula): 8 s for notation that almost nobody reads on a phone in 4 s. It was decided (Q13), so
  keep it, but draw it as counted dots first: sick positives over all positives = 10 / 20, with P(D | +) small
  under it.

**Ending.** Lands. A question the viewer can repeat, it echoes the hook's "99 percent accurate", and the frame
loops. It is the same sentence frame as four other scripts (section 11).

**Visual ideas.**

- **F6.** Give the viewer a dot. Mark one dot «դու» in the hook; at the reveal the 20 positives line up and the
  question on screen is "which of these 20 are you?": 10 red, 10 grey. It ties the hook's "your result" to the 50%
  better than a fraction does.
- **F7.** Do F2 as one continuous shot: a rarity slider moves from 1 in 1,000 to 1 in 10, red dots appear in the
  same grid, and a bar "of the positives, really sick" slides 9% -> 50% -> 92%. No resets, no new grids.

**Armenian (questions).**

- **F8** [heard] «Թեստի փոքր՝ մեկ տոկոս սխալը կիրառվում է հսկայական խմբի վրա»: the inserted «փոքր՝ մեկ տոկոս» is
  hard to parse by ear and «կիրառվում է ... վրա» is written language. Two short sentences (the error is small; the
  group is huge)?
- **F9** [heard] «կրծքագեղձի քաղցկեղի սկրինինգի մասին»: three genitives in a row plus a loanword (U-b). Does the
  viewer need the topic of the doctors' question at all?
- **F10** [heard] «երբ թվերը բացատրել են մարդկանց քանակով» can be heard as "explained by the number of people".
  Reuse beat 2's own phrase («ոչ թե տոկոսներով, այլ մարդկանցով»)?
- **F11** Agreement: «Ճիշտ է պատասխանել միայն ամեն հինգերորդը» (singular), then «ճիշտ են պատասխանել 87 տոկոսը»
  (plural). Is the plural intended?
- **F12** [ear] «Ո՞րն է հավանականությունը, որ ...» sounds like an exercise; «Մեծ մասը կասի ... Բժիշկների մեծ մասը
  նույնպես» has «մեծ մասը» with no noun, then again. Also «դրական պատասխան» comes 9 times: could some be just
  «դրական»?
- **F13** TTS: check how the voice reads «ՄԻԱՎ-ի» and «99-ին».

**Verdict: small fixes.** The first minute is the best explanation in the batch. The second minute is four more
lessons; F1-F4 turn it into two.

## 2. simpson

13 beats, 2,101 characters, about 2:27 (about 2:42 with numbers spoken; this script gains the most, 15 numbers).

**Hook: ok.** The first sentence («Երկու բուժում երիկամի քարերի համար») is a label with no tension, and the
question arrives at about 9 s. The real hook is beat 2.

- **F14.** Open on the choice and the twist together (gloss: "78 percent or 83 percent: which treatment do you
  pick? Careful: the 78 one is better for every group of patients."). Both numbers are on screen in frame 0 already.

**Core idea.** "The better treatment looked worse because it got the harder patients": clear, repeatable, and beat
8 shows it well. Where a viewer gets lost:

- **F15.** Three naming systems for the same two things: «առաջին / երկրորդ» (hook), «Ա / Բ» (screen), «բաց
  վիրահատություն» against «երկրորդ մեթոդ» (beats 4-9). One treatment has a name, the other is "the second method".
  Pick one pair and use it in the voice and on screen from the first beat.
- Beats 6-7: four percentages in about 13 s.
- Beat 11 (covid): one 173-character sentence that cannot be understood until its last clause.
- Beat 12: the exception ("if the split is a result of the treatment, trust the total") has no example and comes
  right after the viewer learned the opposite.

**Pacing.**

- **F16.** Beats 3-4 (about 0:19 to 0:40, later with the numbers read aloud) restate the hook: 78 and 83 become
  273 of 350 and 289 of 350. The viewer was promised the split at 0:10 and waits half a minute for it. Merge 3 and
  4 into one beat and show 273 and 289 on screen without speaking them.
- **F17.** Cut beat 9 (weighted) as narration. Its second sentence repeats beat 8; its first is a definition. If
  the term matters, put «կշռավորված միջին» on screen under beat 8.
- **F18.** Cut beat 11 (covid) (U-g). It is the weakest of the three examples: the hardest sentence, a sensitive
  topic, and its bars are schematic drawings of two real countries, which viewers will read as data. That sits
  badly with the honesty rule. Berkeley alone proves "it happens elsewhere".
- **F19.** Cut the second sentence of beat 12 (U-h). The first sentence already carries the condition ("something
  that existed before the treatment"), so honesty survives; an exception with no example only blurs the takeaway.
- **Rushed:** beat 5 (split) is 2.3 s of speech for the most important animation of the video. Give it 2-3 s
  without voice.
- With F16-F19 the script is about 2:00-2:05, which leaves room for that pause.

**Ending.** Fine: a repeatable question, and the frame returns to the two cards. Same frame as bayes_test.

**Visual ideas.**

- **F20.** Show stone size as dot size (large stone = large dot) from the split onward, and keep colour for the
  outcome only. The plan recolours the same dots from outcome (white / red) to size (dark / light orange) in beat
  8, so the meaning of colour changes in the middle of the video.
- **F21.** Replace the weighted-sum card (`93% x 87 + 73% x 263 -> 78%`, unreadable on a phone) with one slider per
  treatment: a marker sits between that treatment's two group rates and is pulled towards the group with more
  dots. A's marker lands near 73, B's near 87. That is the weighted average with no term and no formula.

**Armenian (questions).**

- **F22** «դիմում այն ֆակուլտետներ, որտեղ ընդունվում էին քչերը»: after «այն», should the noun be definite («այն
  ֆակուլտետները, որտեղ ...»)?
- **F23** [heard] Beat 10: 44, 35, six, four in 20 s. Drop "of the six largest ... in four" and say "in most of
  the large departments"?
- **F24** [heard] If covid stays: split the sentence in two (higher overall; lower in every age group).
- **F25** [ear] «73 տոկոսն ընդդեմ 69-ի» («ընդդեմ» in speech?); «Իսկ հիմա՝» as the twist opener (does it carry "but
  wait"?); «ընդհանուր թիվը վատ է երևում».

**Verdict: small fixes, mostly cuts.**

## 3. regression

14 beats, 2,294 characters, about 2:41 (about 2:47 with numbers spoken: 165 s of speech, at the cap). One beat
must go.

**Hook: strong.** Everyday, parallel, the first sentence takes 3 s, and it ends on a provocative question.

- **F26** [ear] The third sentence is the bookish one («նախատինքն ավելի արդյունավե՞տ է, քան գովասանքը»). A blunter
  question would hit harder (gloss: "So should we shout more?").

**Core idea.** Clear: "after an extreme result the next one is usually more average, whatever you do". Risks:

- Seven settings in under three minutes: flights, exams, flights again, heights, a doctor, a coach, two groups.
- **F27.** Three words for luck in two adjacent beats («բախտ», «հաջողություն», «պատահականություն») and three names
  for the idea («միջինին վերադարձ», «հետ գնալ դեպի միջինը», «ավելի միջին արդյունք»; U-i). By ear, one concept needs
  one word, repeated.
- Beat 8 (reverse) is the most original proof and the most abstract.

**Pacing.**

- **F28.** Beat 2 (kahneman, 21-23 s) repeats the hook in the instructor's mouth: the same observation is made at
  0:03 and again at 0:20-0:30. Cut it to one sentence (gloss: "An Israeli flight instructor said exactly this to
  the psychologist Daniel Kahneman."), or open the video with the instructor's own line and drop the generic
  hook. Saves about 12 s.
- **F29.** Beat 9 (praise): its first three sentences restate what the animation just showed. Keep the first and
  the last one («թվերը մեզ «պատժում» են բարի լինելու համար ...»), which is the line people will quote.
- **F30.** Three closing beats in a row: check (12 s), card (7 s), takeaway (7 s). The takeaway's question is the
  check beat in question form, and the card repeats beat 4. Keep check and takeaway; show the card on screen under
  the takeaway with no narration of its own.
- **F31.** Cut beat 10 (galton, 19 s). A history detour at 1:45 that adds a name and a year. The term can sit on
  screen. This is the beat that must go.
- Beat 11 (everyday): keep. The sacked coach is the example viewers will retell.
- **Rushed:** beat 8 needs a 2 s hold after «Բախտը չգիտի, թե որն է առաջինը, որը՝ երկրորդը».
- **F32** (optional). Simulate 1,000 cadets' flights and not 1,000 students' exams: one setting fewer, and beat 9
  follows without a jump. Exams are more familiar to viewers, so this is Hayk's call.

**Ending.** Loops to the hook. «առանց դրանց» ("without them") is vague by ear.

- **F33.** A blunter close would match the hook (gloss: "Don't shout. The next try would have been better
  anyway.").

**Visual ideas.**

- **F34.** Two axes, not one histogram that rearranges: test 1 on top, test 2 below, one line per highlighted
  student. The best 50 fan in towards the middle. For the reverse beat keep the same picture and highlight from
  the bottom axis upward: the mirror-image funnel shows "it works backwards" at a glance, where an animation
  played in reverse reads as "undo".
- **F35.** Show luck on the dots: when the best 50 light up, each gets a small arrow for its luck on that test, and
  almost all point up. On test 2 the arrows are drawn again at random. This shows why they fall; the current plan
  only says it.

**Armenian (questions).**

- **F36** The negative side has four names: «նախատել» (hook), «գոռալ» (instructor), «պատիժ» (Kahneman), «խիստ
  լինել» (beat 9). One word for the series of beats? (U-j)
- **F37** [heard] «որոնց սովորաբար հաջորդում են ավելի միջինները ... ավելի լավերը ... ամենավատերից հետո»: stacked
  adjectives used as nouns, and «ավելի միջին» ("more average") in particular.
- **F38** «նույն քննությունը գրում է երկու անգամ»: literally the same exam, so memory would help? «երկու նման
  քննություն»?
- **F39** [ear] «լավ հմտություն է՝ գումարած հաջողություն»; «գործը բախտինն էր» (idiomatic, or forced?);
  «Կարճահասակներինը՝ կարճ» if Galton stays.
- **F40** TTS: «1960-ականներին».

**Verdict: small fixes** (F28, F30, F31).

## 4. waiting

12 beats, 2,301 characters, about 2:41.

**Hook: weak.** «Յոթ րոպե կանգնած սպասելն ավելի երկար է թվում, քան վեց րոպե քայլելը»: seven minutes is longer than
six, so the claim sounds like a truism, and the on-screen «7 րոպե > 6 րոպե?» is simply true (the label is quoted
as the plan has it, with a Latin question mark). The Houston contrast is 1 + 7 against 6 + 2, the same total. The
best hook in the script is buried in beat 9: «Իսկ ինչո՞ւ է մյուս հերթը միշտ ավելի արագ շարժվում».

- **F41.** Open with it (gloss: "Why is the other line always faster? It is not. And airports, Disney and banks
  know exactly why you think so.").

**Core idea.** There is not one. There are seven: occupied time, four more Maister rules, inflated posted waits,
the hidden queue, progress bars, the other line, the snake line. The card («մասամբ ժամացույցն է, մասամբ՝
զգացողությունը») is vague and the takeaway gives three instructions. This is two shorts: (a) how queue designers
bend felt time, (b) why the other line seems faster. (b) is the channel's core material (probability plus what
memory keeps) and already has a simulation.

**Pacing.**

- **F42.** Beats 2-3 spend 32 s, a fifth of the video, on a story the video then calls unconfirmed, and beat 3
  deflates the opening. Keep «Պատմում են», put «չստուգված պատմություն» on screen as a stamp (as the pilot did with
  «նկարազարդում»), and cut beat 3 to one clause.
- **F43.** Cut beat 5 (rules): four sentences of the same shape ("X waiting is longer than Y") read by a neutral
  voice, the flattest 17 s in the batch. The two rules that matter are shown later anyway: unknown against known
  (progress bars), unfair against fair (snake line). Name each rule where it is used.
- Beat 4: the last sentence (people overestimate their waits) floats; cut it.
- **F44.** Cut beat 11 (card), and end beat 12 on «Միջինում այն քոնից արագ չէ» alone, without the three
  instructions.
- **F45.** Structure, if it stays one video (about 2:10): other-line hook -> 1 in 3 and memory -> "queue designers
  know more tricks": Disney's posted times, the hidden queue, progress bars (Houston as a 6 s «Պատմում են» aside,
  or cut) -> the snake line, which fixes fairness and envy at once -> close on the other line. Then the hook and
  the ending loop; now they do not (7 against 6 minutes at the start, the next line at the end).
- **F46.** Alternative: two shorts of 75-90 s each. Cleaner, but shorter than the length Hayk asked for.

**Ending.** Does not land: three instructions, then the one good line. No loop.

**Visual ideas.**

- **F47.** The three-lines race as the opening shot: three columns of dots draining at random speeds, "you" in
  orange, 30 trips fast-forwarded in about 6 s with a tally. The 20 losses flash brighter (what memory keeps).
- **F48.** Reveal the Disney queue: start at eye level (8 people and a wall), then lift the camera to a top view
  where 200 dots are folded behind the walls. The planned static top view gives the surprise away.

**Armenian (questions).**

- **F49** [heard] «զբաղված ժամանակ» / «դատարկ ժամանակ» (also «ժամանակդ զբաղված լինի», «զբաղեցրու ժամանակդ»): does
  «զբաղված» work for time and not a person? It carries rule 1, so it has to sound right.
- **F50** [heard] «իրականում սպասում ես ցուցադրվածի մոտ երկու երրորդը» is hard by ear («ցուցադրվածի մոտ» can be
  heard as "near the displayed"). Concrete numbers that match the picture (gloss: "the sign says 60 minutes, you
  wait about 40")?
- **F51** [heard] Beat 7 is one sentence with four clauses; split it.
- **F52** [ear] «ներբեռնման շերտը» for a progress bar (is that what people call it?); «Այն ուղևորներին վեց անգամ
  ավելի երկար քայլեցրեց»; «Սակայն դրա հետևում եղած գաղափարը լավ ուսումնասիրված է» (written register).

**Verdict: needs rework** (F41, F43, and F45 or F46).

## 5. crypto_paint

Showcase. 14 beats, 2,291 characters, about 2:41 (about 2:47 with numbers spoken: at the cap). The paint needs
silent seconds, so one beat must go, better two.

**Hook: ok.** The first sentence takes about 6 s and leads with a term («գաղտնի բանալի») before the viewer knows
why anyone would want a key. It also mixes «ձեր զրույցը» with «Դու դա անում ես».

- **F53.** Lead with the trick, in the picture and in the words (gloss: "Two people can agree on a secret while the
  whole world watches every move, and nobody watching can copy it. Your phone does this each time you see the
  padlock."). Paint on screen in frame 0.

**Core idea.** Clear and repeatable: "you can agree on a secret in public, because mixing is easy and unmixing is
hard". Beats 4-9 are the best-paced stretch in the batch: one step per beat, short sentences, the «Եվան տեսնում է»
refrain, and beat 9 answers the objection a sharp viewer will have. Where a viewer gets lost:

- Beat 10 (math): modular exponentiation in one spoken sentence.
- Beat 11 (toy): seven numbers in about 11 s (5, 23, 6, 15, 8, 19, 2) with no spoken link between them. By ear it
  is noise; on the card it is four lines of arithmetic nobody can check in real time.

**Pacing.**

- **F54.** The paint demonstration starts at about 0:39 (beat 5) and the first mix comes at 0:51. For a paint
  showcase that is late. Compress beats 2-3 into about 8 s: the couriers in one clause, Diffie and Hellman on the
  source line and not in the voice.
- **F55.** Cut beat 11 (toy) as narration; show the toy numbers silently, in the paints' colours, under beat 10.
- **F56.** Beat 13: its first sentence repeats the hook. Keep only the impostor and certificate sentence, or cut
  the beat.
- **F57.** Cut beat 12 (history) (U-r). A good story and a tangent from the one idea, 15-19 s. It can be its own
  60 s short later. This is the beat that must go.
- **Needs a pause:** beat 8, when both sides show the same brown (1.5 s, no voice), and beat 9 after Eva's wrong
  colour.
- With F54-F57: about 1:55 of speech plus 10-15 s of silent paint, about 2:10 in total.

**Ending.** Good: the idea in one sentence, then a three-word last line («Ինչպես ներկը խառնելը»). The frame returns
to the padlock.

**Visual ideas.**

- **F58.** Eva's shelf: a fixed strip at the top that always shows exactly what Eva has collected (yellow, then
  orange, then green). In beat 9 she uses only what is on the shelf and gets the wrong colour, held next to the
  real brown with a "not equal" mark. A visible "what the spy knows" is the teaching device of the whole video.
- **F59.** The match: the two browns slide to the centre and merge into one blob with no seam. It is the payoff
  shot; give it the best 2 s of animation in the series.
- **F60.** Unmixing: Eva pulls at the brown, the swirl runs backwards for a few frames and snaps back. Then the
  cans turn into numbers and the same snap-back arrow gets the label «գտնել աստիճանը». If the turbulence swirl
  looks cheap, two overlapping blobs with multiply blending and a slow rotation will look cleaner than a bad fluid.

**Armenian (questions).**

- **F61** Hook: «ձեր զրույցը» (plural), then «Դու դա անում ես» (singular).
- **F62** «Եվայի, որը ձևանում է նրան»: does «ձևանալ» take «նրան»? («ձևանում է, թե Արամն է»?)
- **F63** [heard] Beat 10: the first sentence (two infinitives used as nouns) and the last (the verb comes after a
  long modifier) (U-q).
- **F64** «գրեթե» (beats 1, 13) and «համարյա» (beats 9, 14) in one script: pick one?
- **F65** [ear] «Նախ բաց պայմանավորվում են» («բաց» as an adverb; «բոլորի աչքի առաջ»?), «բաց զրույցով» (U-p),
  «ներկը հետ բաժանել իր բաղադրիչների», «Հետաքրքիրն այն է, որ».

**Verdict: small fixes.**

## 6. friendship

Showcase. 13 beats, 1,952 characters, about 2:17 (about 2:22 with numbers spoken). The length is right and leaves
room for the network to draw itself.

**Hook: strong claim, weak first two seconds.** The sentence opens with two hedges («Մեծ հավանականությամբ ...
միջինում») before any content. The second sentence («Եվ սա վիրավորանք չէ, այլ մաթեմատիկա») is the best hook line
in the batch.

- **F66** (U-t). Claim first, hedge after, as its own beat (gloss: "Your friends have more friends than you.
  Probably. And that is not an insult, it is mathematics.").

**Core idea.** Clear and repeatable (beat 6): "a person with many friends is in many friend lists, so gets counted
many times". Where a viewer gets lost:

- **F67.** Beat 4 states an average of averages in the abstract ("for each person, how many friends their friends
  have on average"). Narrate one concrete person first (gloss: "this one has 2 friends; her friends have 11 and
  5"), then "do it for everyone: about five".
- Beat 11 (card), below.

**Pacing.**

- **F68.** Beat 2: 9-10 s of bibliography at 0:08 (sociologist, name, year, data source). Say only the name of the
  paradox; Feld 1991 is on the source line already.
- **F69.** Beat 11 (card) (U-u): «Մաթեմատիկան պարզ է», then a 162-character sentence that is not simple by ear,
  «դիսպերսիա» on screen, placed between the applications and the emotional close. Replace the narration with the
  one plain fact it contains (gloss: "If everyone had the same number of friends, the paradox would vanish. The
  more unequal people are, the stronger it gets."), or drop the beat and flash the formula for 2 s under beat 6.
- **F70.** Beats 9-10 (flu, vaccine): 29 s of applications. Flu is real data and a surprise; vaccine is a model
  result in the conditional. Keep flu; cut vaccine to a clause or drop it.
- Beat 7 (bus) is a good second picture of the same counting.

**Ending.** The best of the ten. Two short sentences, human, it restates the mechanism and answers the hook's "not
an insult". Beat 12 is a good bridge to it. Keep.

- **F71.** Honesty: the 20-person network is generated, not observed. Put a small «օրինակ» tag on it, as the pilot
  did with «նկարազարդում».

**Visual ideas.**

- **F72.** Friend lists as objects: 20 small phone screens, each showing its owner's friends as dots. The hub's
  dot (orange) is on 11 screens, the quiet one's on 2. Then all the list entries pour into one pile: 72 entries,
  visibly dominated by a few people, next to the 20 people themselves. That pile is the paradox.
- **F73.** One camera move for beat 8: pull back from the 20-person network until it is a speck inside a huge one,
  then «93%». And run the flu as an infection spreading through the same network (the hubs light up first) before
  the two real curves. Keep a «դու» node, one of the 17, from the hook to the last frame.

**Armenian (questions).**

- **F74** «շատ ընկեր» and «շատ ընկերներ» both appear after «շատ» / «ավելի շատ» / «ամենաշատ» (beats 1, 6, 11, 12,
  13). One form?
- **F75** [heard] «չորսից քիչ» for 3.6 next to «մոտ հինգ»: the contrast is clearer by ear in parallel form (gloss:
  "about three and a half ... about five").
- **F76** [ear] «Դու ավելի քիչ սիրված չես» (or «պակաս սիրված չես»?): it is the last line, so it must be exactly
  right.
- **F77** [ear] «պատահական ուսանողների», «պատահական ընկերը» («պատահական» + a person can read as "some nobody";
  «պատահական ընտրված»?); «Ընկերներն ավելի կապված են» (more connected to what?); «լեցուն ավտոբուսում» against
  «լիքը».

**Verdict: small fixes.** The closest to ready of the four showcases.

## 7. qwerty

Showcase. 12 beats, 2,420 characters, about 2:49 on the raw count, about 3:02 with its 7 years read aloud. Over
the limit either way. Average sentence 85 characters, the longest in the batch (bayes_test: 48).

**Hook: weak.** (a) It debunks a myth many Armenian viewers will not have heard, so there is nothing to overturn.
(b) «իրական պատմությունը շատ ավելի խառն է» promises a mess, not an answer. (c) The voice has to say "QWERTY" in
the first two seconds (U-w). (d) It takes 11 s.

- **F78.** Start from the object (gloss: "Look at your keyboard. Why this order: Q, W, E, R, T, Y? The usual
  answer, to slow typists down, is a myth."), or from the local angle that is now buried at 2:28 (gloss: "Why is Ա
  on the same key as A? Because of a choice made for telegraph operators 150 years ago.").

**Core idea.** None that a viewer can repeat. The script is a chronology with five verdicts of "disputed" or
"unproven" (the jamming, the TYPEWRITER legend, Dvorak's test, and two in the economists' beat). The myth is taken
away and a list of maybes is put in its place. The lesson ("a story that is too neat is probably wrong") is right
for the channel, but it only lands if the video offers one better-supported story instead. The script already
contains three candidates:

- Morse: Z sits by S and E because telegraph operators confused them. Concrete, and viewers can look at their own
  keyboard.
- "The famous test that proved Dvorak faster was run by Dvorak." A conflict-of-interest story, which is what this
  channel is about.
- Standards win by being first, not best (the 1888 contest, the 1893 merger).

- **F79.** Give it a spine: the myth -> what the evidence points to (Morse) -> why it stuck (contest and merger in
  one beat) -> "but isn't Dvorak better?" (his own test) -> it reached the Armenian keyboard -> takeaway.

**Pacing.**

- **F80.** Cut beat 10 (path) and beat 5 (remington), the two that U-x already names. Both, not one of them. The
  economists are abstract and are the fifth "disputed"; Remington is a date and a company.
- **F81.** Beat 9 (dvorak) is the longest beat of all ten scripts (27 s with three years spoken) and buries its
  punchline in the middle of a sentence. Two short sentences, the punchline (he ran the test himself) last, the
  years on screen.
- **F82.** Years: 7 are spoken, about 17 s. Speak two at most; the timeline shows the rest.
- Beat 3 (jam): one clause is enough.
- Beat 6 (legend): fun, and the viewer can check it, but it is a second myth that ends in "nobody proved it". Keep
  it only if the length allows after F80 and F81.
- Beat 7: «թեև հաջորդ ամիս նրան էլ հաղթեցին» is honest, costs 3 s and undercuts the beat. Leave it to the on-screen
  banner (already planned). The beat never says why the contest mattered.
- **Needs a pause:** beat 4. «Z-ը հեշտությամբ շփոթվում է SE զույգի հետ, և Z-ը հայտնվեց S-ի ու E-ի մոտ» is the key
  evidence and, by ear, the hardest sentence in the batch. It depends entirely on the picture: hold the Morse dots
  for 2 s without voice.
- After F80, F81 and F82: about 2:20.

**Ending.** Weak. «Իրական պատմությունները սովորաբար ավելի խառն են» is flat and repeats the hook's wording.

- **F83.** End on the Armenian keyboard (gloss: "Each time you type Ա on the A key, you repeat a choice made for
  telegraph operators in the 1870s."), with the lesson as the on-screen line.

**Visual ideas.**

- **F84.** Use the Armenian flip (keys turning from Latin to Armenian in place) in the first 3 seconds and again
  at the end. It is the most striking shot available and the only local one; the plan spends it once, at 2:28.
- **F85.** Lock-in as a loop of dots: typists learn QWERTY -> offices buy QWERTY machines -> schools teach QWERTY
  -> more typists, and the pile grows each turn. It replaces the economists' beat with a picture. For Dvorak: the
  1944 report signed and stamped by the same name.

**Armenian (questions).**

- **F86** (U-w) Latin in the voice: QWERTY 5 times, Z twice, SE, S twice, E, A, TYPEWRITER. If the narration is
  respelled in Armenian («քվերթի»), the word-by-word captions will show that spelling too. Which is worse?
- **F87** [heard] «Հաճախ ասում են, թե հաճախակի զույգ տառերը հեռացրին իրարից»: «հաճախ ... հաճախակի», and «հաճախակի
  զույգ տառերը» is unclear by ear.
- **F88** [ear] «չափազանց կոկիկ» for a story: it is the takeaway's title line, so it has to work.
- **F89** [ear] «բազմիցս», «պատենտավորեց» (or «արտոնագրեց»?), «արտադրությունը վերցրեց», «տպավորեն գնորդներին»,
  «փոխվում էր նրանց կարիքներով», «խրված ենք վատ դասավորության մեջ», «օգտատերերը» for 1870s typists, «հեռագրիչ»
  for a person (U-v).
- **F90** TTS: «1860-70-ականներին».

**Verdict: needs rework.**

## 8. petrov

Showcase. 13 beats, 1,903 characters, about 2:14 (about 2:20 with numbers spoken; 5 spoken years). The length is
right. Short sentences (56 characters on average).

**Hook: ok.** The strongest material in the batch, weakly cut. Spoken, the first 4 s are a date («հազար ինը հարյուր
ութսուներեք թվականի սեպտեմբերի քսանվեցի գիշերը»), and the second sentence gives away the decision, which is the one
thing this story has to hold back.

- **F91.** Open on the alarm, in the second person, and keep the outcome (gloss: "The screen says the USA has just
  launched nuclear missiles at your country. You have minutes to report it. In 1983 this happened to one Soviet
  officer."). The date is on screen in frame 0 already.

**Core idea.** Clear: "he asked which was more likely, a war that starts with five missiles or an error in a new
system". Problems:

- **F92.** The word "nuclear" («միջուկային») never appears, and neither does "Cold War". «հրթիռներ» and
  «պատասխանե՞լ, թե՞ ոչ» leave the stakes implied. A 20-year-old viewer should hear it once.
- The reasoning comes twice: beat 6 (three reasons in 9 s, rushed) and beat 10 (the same weighing, abstract, 15 s).
- «խորհրդային համակարգը» in the hook is ambiguous for a moment (the Soviet system?).

**Pacing.** The best-paced script: linear, beats of 7-12 s. Four fixes:

- **F93.** Beat 7 ends «Եվ նա ճիշտ էր», and then beat 8 says he was not sure and the minutes felt endless. The
  tension is released before the wait. Order: decision -> the wait (beat 8) -> nothing came, he was right -> cause.
- **F94.** Merge beat 10 into beat 6: do the weighing at the moment of decision, as his thought. Beat 10 then
  shrinks to a line or goes.
- **F95** (U-z). «ինչպես Բայեսի մասին մեր տեսանյութում»: in a Shorts feed most viewers arrive cold, and the line
  forces the publishing order. Keep the idea and drop the reference, or move it to the last second as a pointer.
- **F96.** Beat 12 (after): 17 s of encyclopedia with three years. Keep "no reward; the world learned of it only
  fifteen years later" (about 6 s).
- With F91, beat 7's quote («Որոշեցի չհավատալ համակարգչին») is said once, where it belongs; now it is said twice.
- **Needs a pause:** beat 8, 2 s of a ticking clock with no voice.

**Ending.** Decent. The last line («Երբեմն սա ամենակարևոր հարցն է») is understated and good. The question before
it is hard by ear: «որքա՞ն հավանական է սա առանց մեքենայի».

- **F97.** A plainer question (gloss: "and how likely was that to begin with?"). It is also the fourth "when X
  says ..., ask ..." ending in the batch; a story can end on the man (gloss: "He was never sure. He only asked
  which was more likely.").

**Visual ideas.**

- **F98.** The scale at the moment of decision: two pans, "a war that starts with 5 missiles" and "an error in a
  new system". The three reason cards drop onto the pans one at a time and the scale tips with each. The reasons
  become a mechanism, and it is Bayes without the word.
- **F99.** A clock in a corner of the frame from the alarm (beat 4) until "nothing came". The story then happens
  inside those minutes, and beat 8 lands without extra words. For beat 9, the sensor's view: five bright pixels
  over North Dakota, then the camera shows they are cloud tops in low sun. A real portrait at the "after" beat if a
  free one exists: the only face in the video, at the end.

**Armenian (questions).**

- **F100** TTS: «ԱՄՆ-ից», «ԽՍՀՄ-ը», «26-ի». Check how the voice reads them, or write «Խորհրդային Միությունը» out.
- **F101** [heard] «Նրա գործը «Օկո»՝ «աչք» կոչվող արբանյակային համակարգի տվյալներին հետևելն էր»: a nested
  apposition and the verb at the very end. Split it.
- **F102** [ear] «Տարին ամենալարվածներից էր» (the most tense of what?), «Նա կշռադատեց» (bookish?), «վերև հասավ հենց
  նրա գնահատականը» («գնահատական» also means a grade).

**Verdict: small fixes** (F91, F93, F94, F96).

## 9. own_voice

12 beats, 1,663 characters, about 1:57. The shortest.

**Hook: strong.** A feeling everyone has had, then a slightly cruel "yes".

- **F103** (optional). Start on the thought itself («Իսկապե՞ս այսպես եմ խոսում») so the first second is the
  cringe.

**Core idea.** The clearest of the ten: "others hear only the air path; you hear air plus bone". Beats 2-6 are
short and in the right order. One real problem:

- **F104.** «բարձր» is used in two senses in adjacent beats. Beat 4: the recording sounds «ավելի բարակ ու բարձր»
  (meant: higher in pitch). Beat 5: with the ears plugged the voice becomes «ավելի բարձր ու թավ» (meant: louder).
  «բարձր ձայն» normally means a loud voice, so beat 4 is likely to be heard as "thinner and louder", and beat 5
  then uses the same word for the opposite case. Two different words are needed, one for pitch and one for
  loudness.

**Pacing.**

- **F105.** Beats 11 and 12 say the same thing twice (air plus bone against air only; the recording removes the
  part only you hear). Cut the card's narration and show the card under the takeaway.
- Beat 5 ("try it now") is the best interactive moment in the batch. Give it 2-3 s without voice so the viewer can
  actually do it.
- U-cc (add a beat?): no. Add the demo in F106, not more text.

**Ending.** Lands, loops, repeatable. One wording question (F108).

**Visual and audio ideas.**

- **F106.** Let the viewer hear it. This is a video about how a voice sounds, and nothing in its sound changes.
  Take one narrated sentence and play it twice: once with the low frequencies boosted ("roughly how you hear
  yourself"), once flat ("the recording"). One ffmpeg filter on an existing clip, no cost. Label it «նկարազարդում»,
  since it is a demonstration and not a measurement. It would do more for this video than any animation.
- **F107.** Drive the frequency bars from the real audio of the narration, with the bone-path bars added at the low
  end and removed at the microphone, so the picture and the sound change together. For the mirror beat the drawn
  face needs an obvious asymmetry (a mole, a parting), or the flip is invisible.

**Armenian (questions).**

- **F108** [heard] «Այն միայն հանում է այն մասը, որը լսում ես միայն դու»: «այն» twice and «միայն» twice in ten
  words, in the closing line.
- **F109** [heard] «նրանց մեջ առանց զգուշացնելու խառնել էին իրենց ձայնը»: «նրանց» (the voices) and «իրենց» (the
  participants) a few words apart.
- **F110** [heard] «Ձայնը մեր պատկերացման կարևոր մասն է ինքներս մեզ մասին»: heavy, and «ինքներս մեզ մասին» is cut
  off from the noun it belongs to.
- **F111** [ear] «Նույնը դեմքի հետ է» (section 11), «տարօրինակությունն անցնում է», «ցածր հաճախությունները՝ բասը»
  (U-bb).

**Verdict: small fixes; the closest to ready of the ten.** F104 and F106 are the two that matter.

## 10. yawning

11 beats, 1,747 characters, about 2:03 (about 2:09 with numbers spoken).

**Hook: strong, the best of the ten.** 5 s, a prediction about the viewer, and the video becomes its own
experiment. One flaw: «Եվ ահա թե ինչու» promises an answer, and beat 9 says there is none.

- **F112.** Promise the mystery (gloss: "Warning: you will probably yawn during this video. And science still
  cannot fully say why."). "We do not know" is then the payoff and not a letdown.

**Core idea.** Repeatable as "yawning is contagious, the oxygen explanation is wrong, and nobody knows the real
one". Softer than the others because the answer is "open". Where a viewer gets lost:

- Two questions run side by side (why we yawn: beats 3-4; why it spreads: beats 5-8), and each ends in "disputed".
- Beat 7 (but): evidence against, a side finding about age, then evidence for again, with two years and a sample
  size, in 20-23 s. The age detail goes nowhere.
- The order of evidence: for (kin), against (2014), for (2018), for (dogs), then "we do not know".

**Pacing.**

- **F113.** Reorder: kin (6) -> dogs and their owners (8) -> but (7) -> unknown (9). Build the nice story, then the
  honest doubt, then land.
- **F114.** Beat 7: one finding (gloss: "But when 328 people were tested, empathy scores did not predict who would
  yawn. Other studies do find a link. The question is open."). No years, no age.
- **F115.** Cut beat 10 (card): it repeats beat 9 and the whole video. Show its two columns on screen under beat 9.
- Beat 4: its first sentence is 142 characters for a theory the next sentence doubts; shorten it.
- **Needs a pause:** the hook. A yawn takes 2-3 s to work on the viewer.

**Ending.** Lands. It loops to the warning, and the comment prompt grows out of the content (U-ee: fine once; it
would cheapen the series if every short asked for comments).

**Visual ideas.**

- **F116.** Real yawns. Drawn faces trigger far less than real ones, and the premise is that the viewer yawns. The
  channel already mixes in photos: a real yawning person in the hook, then a baby, a cat, a dog, a lion at beat
  changes, with a small «հորանջեցի՞ր» counter in a corner. The closing question then has something to count.
- **F117.** 328 dots as a flat scatter with no slope: one clear picture of "no pattern" (and no age axis, with
  F114). Keep the yawn spreading from neighbour to neighbour in the 100 faces and along the ties in the kin
  network as the same kind of motion.

**Armenian (questions).**

- **F118** [heard] «Մարդկանց մոտ կեսը հորանջում է»: by ear «մարդկանց մոտ» first parses as "among people" before it
  resolves to "about half". «Մարդկանց մոտավորապես կեսը»?
- **F119** Term: «կարեկցանք» for empathy carries beats 5-7. Is it «կարեկցանք» (closer to compassion),
  «ապրումակցում» or «էմպատիա»?
- **F120** [ear] «շներն էլ են մեզնից հորանջ «վարակվում»» (U-dd: the construction «հորանջ վարակվել»); «Հորանջը, որ
  անում ենք օրը մի քանի անգամ» («հորանջ անել»?); «ակամա կրկնում ենք նրանց» for "imitate them".
- **F121** TTS: «1980-ականներին».

**Verdict: small fixes.**

## 11. Cross-cutting

### Patterns that repeat

1. **One template.** Hook question -> name and year of a study -> demonstration -> «Նույնը ...» and a second
   example -> an application -> a summary card -> «Այնպես որ, ...». It is clearest in bayes_test, simpson,
   regression, waiting, friendship and own_voice. Watched in a row, the viewer can predict the next beat by the
   third video.
2. **«Այնպես որ,»** is in the closing of all ten, and of the pilot: it opens the last beat in eight, the
   second-to-last in friendship, and beat 9 in yawning. Four of the ten (bayes_test, simpson, regression, petrov)
   and the pilot end on the same sentence frame, «երբ ..., հարցրու՝ իսկ ...՞». As a deliberate signature for the
   statistics shorts ("the question to ask") it can work; then keep it for those and vary the lead-in.
3. **Double endings.** Six of ten have a separate summary beat just before the close: «Կարճ ասած՝» in regression,
   waiting and own_voice, «Մաթեմատիկան պարզ է՝» in friendship, «Ինչ գիտենք՝» in yawning, the formula in
   bayes_test. Each card repeats an earlier beat or the takeaway itself. Rule: one closing beat, and the card is a
   picture under it. Saves 5-11 s a script.
4. **A long tail after the payoff.** The main reveal lands at about 0:32 in own_voice, 0:54 in friendship, 0:59 in
   bayes_test, 1:02 in petrov, 1:11 in regression, 1:12 in simpson, 1:15 in crypto_paint, and 70-95 s of
   extensions follow. Waiting, qwerty and yawning have no single reveal. Each beat after the payoff should open
   with a new question (some do: «Ի՞նչ անել», «Իսկ ինչո՞ւ հաղթեց ...», «Արդյո՞ք նա միայնակ փրկեց աշխարհը») or go.
   One extension that surprises beats three that illustrate.
5. **Spoken years: 31 in the ten scripts** (qwerty 7, petrov 5, yawning 4; simpson, crypto_paint and friendship 3
   each). Each costs 2-2.5 s and sounds like a lecture. The source line on screen already has the author and the
   year. Speak a year only when the date is the point (1983; "secret until 1997").
6. **Bibliography as a beat**, at 0:08-0:35, where retention is decided: «1985 թվականին Դեյվիդ Մայստերը ...»,
   «1991 թվականին այն նկարագրեց սոցիոլոգ Սքոթ Ֆելդը ...», «1976 թվականին Ուիթֆիլդ Դիֆին և Մարտին Հելմանը ...»,
   «Ճապոնացի հետազոտողներ Յասուոկաները ...». Names the viewer will not keep.
7. **Hooks.** Strong: yawning, own_voice, regression, bayes_test, friendship (once the hedges move). Weakly built:
   petrov (date first, outcome given away), crypto_paint (a term first), simpson (a label first), qwerty (a myth
   the viewer may not know), waiting (a truism). The common fault: the first 2-4 s go to a date, a hedge, a label
   or a term. Six of ten first sentences run 4.5 s or longer.
8. **Honesty turning into the content.** The story-or-data labelling is done properly everywhere (Houston, the
   legends, Petrov's role, the simulation in regression). The side effect: "they argue" / "disputed" / "nobody has
   proven" becomes the substance in qwerty (five times) and yawning (four). Honest doubt works after one solid
   thing; it does not work as the main course. Small gaps in the other direction: the friendship network and the
   own_voice frequency bars are invented illustrations with no «օրինակ» or «նկարազարդում» tag, and the covid bars
   are schematic drawings of real countries.
9. **No silence.** The moments that need 1.5-3 s without voice: the bayes_test reveal, the simpson split, the
   regression reverse, the crypto_paint match, the petrov wait, own_voice's "try it", the yawning hook, the qwerty
   Morse dots. **F122:** an optional `pause_after` per beat in `beats.hy.json`, read by `build_timeline.py` and
   counted in the length budget.
10. **Numbers as digits** change the length estimate and the caption timing (section 0). **F123:** count length
    with numbers spelled out, and let the timeline weight a digit token by its spoken length. (Both done since;
    see section 0, item 8.)

**kids_tv against these patterns** (section 12). It follows the template less closely than most and has no summary
card. It does share four habits: «Այնպես որ,» opens its last beat too (now all eleven); two more spoken years (33
in all); a first sentence of 4.8 s; and pattern 8 in its second half, where beats 7-9 go claim, undo, claim, undo.
It adds one pause to the list in pattern 9: the song loop in its beat 4.

### Tone and consistency

- **F124.** The ten are consistent with each other and drier than the pilot. The pilot talked («Մի շտապիր», «Հա,
  սովետական սառնարանները ...», «պապս ամբողջ կյանքում ծխել է»). These read: «Սակայն», «բազմիցս», «կիրառվում է»,
  «ուստի», «հետագայում կասկածի տակ դրվեց», «այդ թվում՝». Is the drier register wanted, or should they be brought
  back towards the pilot?
- **F125.** Local colour is almost gone. The pilot had grandmother's fridge and the Yerevan Zoo. In the ten
  scripts the Armenian touches are the names Ani and Aram, the phonetic keyboard (at 2:28 of qwerty) and the
  packed buses. Everything else is Berkeley, Houston, Disney, Harvard, Cincinnati. One local anchor per script
  would make them sound made here and not translated: a football coach sacked after a bad season (regression), a
  bank queue or an airport baggage belt in Yerevan (waiting), a marshrutka for the bus (friendship).
- Address: «դու» everywhere (U-a), moving to «մենք» for general statements. Fine, except the crypto_paint hook
  (F61).
- **F126.** «գրեթե» or «համարյա»: both are in use across the batch. One for the series?
- **F127** [ear] "The same with X": «Նույնն է ավտոբուսների հետ», «Նույնը դեմքի հետ է», «Նույնը շատ տեղերում է».
  The pilot had «Հին երգերի դեպքում էլ նույնն է». Is the «... հետ» form natural, or a calque?
- **F128** [ear] «Հետաքրքիրն այն է, որ» (crypto_paint, yawning) and «Եվ ամենահետաքրքիրը» (regression) tell the
  viewer that something is interesting. Cut the openers?
- **F129.** TTS risks worth one cheap test call before voicing anything: acronyms («ԱՄՆ», «ԽՍՀՄ», «ՄԻԱՎ»), decades
  («1960-ականներին», «1860-70-ականներին»), digits with endings («99-ին», «69-ի», «26-ի»), Latin (QWERTY, Z, SE,
  TYPEWRITER).

### The three strongest

1. **friendship.** A personal claim, one mechanism shown in a picture that only a network can give, the best
   ending, the right length.
2. **petrov.** The only real story, short beats, and the channel's own idea (weigh what is likely; do not obey the
   alarm) carried by a person. It needs re-cutting, not rewriting.
3. **own_voice.** Universal, one idea, the shortest, the cheapest to make. With the audio demo (F106) it is the
   most shareable of the ten.

A close fourth is bayes_test: its first minute is the best explanation in the batch, and its second minute is four
more lessons.

### The two weakest

1. **qwerty.** No idea a viewer can repeat, a hook built on a myth the viewer may not know, five "disputed", seven
   spoken years, over the length limit, and Latin letters the voice may mangle. It needs a spine before anything
   else.
2. **waiting.** A truism for a hook, seven ideas, three takeaways, and a fifth of its time on a story it then
   calls unverified. The good short inside it is "why the other line is always faster".

**kids_tv does not change either list.** A clear answer by 1:19 and one good experiment put it above waiting and
qwerty; an ordinary hook and a second half that takes back what it says keep it out of the top three. It sits in
the middle of the batch, next to yawning.

### Publishing order

**F130.** Suggested order (updated for kids_tv, which goes in at 7):

1. own_voice: universal, simple visuals, a low-risk first upload after the pilot.
2. bayes_test: the flagship statistics piece; it builds the crowd grid that simpson reuses.
3. friendship: the first showcase; it builds the network that yawning reuses.
4. petrov: a story, two videos after bayes_test, so a pointer to it (if kept) has something to point at.
5. yawning: light, and its comment prompt helps a young channel.
6. regression.
7. kids_tv: a "why does X happen" piece between two heavier ones, with a ready audience in parents, and far
   enough from yawning that two "the evidence is mixed" videos do not run back to back.
8. crypto_paint.
9. simpson.
10. waiting, after the rework.
11. qwerty, after the rework.

The logic: never two "people as dots" statistics shorts in a row (bayes_test, regression and simpson sit at 2, 6
and 9); a story or a "why does X happen" piece between them; components are built before they are reused; the two
reworks go last. If the showcases are animated first (Q16), start with friendship and petrov, and drop petrov's
"in our Bayes video" line unless bayes_test is already out.

### Top changes for the whole batch

- **F131.** Lengths: recount with numbers spelled out and leave room for silence. qwerty loses beats 5 and 10,
  regression beat 10, crypto_paint beat 12, and every script with a summary card before the takeaway loses that
  card as narration.
- **F132.** Re-cut five hooks so the claim or the tension is in the first 3 seconds: petrov, qwerty, waiting,
  crypto_paint, simpson.
- **F133.** Break the template: one idea and one extension per video, years and names on the source line, and only
  a few endings on «Այնպես որ, ... հարցրու՝ իսկ ...».
- **F134.** Give the pictures time: mark the 1.5-3 s pauses (pattern 9) in the scripts before the voice is made,
  because adding them later means re-timing everything.

## 12. kids_tv (added after the first ten)

11 beats, 2,228 characters, about 2:36 (about 2:39 with numbers spoken). Inside the limit by about 8 s of speech,
so no forced cut. Average sentence 81 characters, second only to qwerty.

**Hook: ok.** A scene every parent knows, the first sentence takes 4.8 s, and the question comes at about 9 s. Two
weaknesses: it is a plain "why" with nothing to overturn, and it speaks only to parents.

- **F135.** Plant the belief that the video later overturns (gloss: "Your toddler in front of CoComelon looks
  hypnotised. He is not. One experiment shows what really holds him."). Beat 5 («Բայց երեխաները հիպնոսացված չեն»)
  then answers the hook; as written, it denies something nobody has said.
- **F136.** Is CoComelon the name the viewer has at home, or is another show (perhaps a Russian-language one) on in
  more Armenian homes? The hook should name the one parents recognise at once (U-ff, U-gg).

**Core idea.** The answer is good and complete by 1:19: something new for the eyes every moment, and nothing the
child fails to understand. Where a viewer gets lost:

- **F137.** Three mechanisms (reflex, repetition, understanding) and two different two-part summaries. Beat 6 says
  "grabs the eye and is understandable"; the takeaway says "reacts to the new and enjoys the familiar". Pick one
  pair and use it in both places and on screen. Repetition can be the reason they understand (they have heard the
  song many times), which folds three into two.
- **F138.** Beat 3 is the only core claim with no number and no source («շատ հաճախակի կադրափոխություն», «գրեթե
  անընդհատ»). Take the plan's option and measure the cuts in one episode (it needs Hayk's OK). "We counted" suits
  the channel and turns the beat from assertion into data. Without a number, claim less.
- Beats 7-9 go claim, undo, claim, undo: a study found an effect; it could not say why, or whether it lasts; WHO
  sets limits; some experts say minutes are the wrong measure. The viewer is left with nothing to hold (pattern 8
  in section 11).
- «ֆանտաստիկ իրադարձությունները» in beat 8 points at nothing: the viewer was never told that the fast cartoon was
  also the fantastical one.

**Pacing.**

- **F139.** Cut beat 9 (guidelines, 19 s). It is about screen minutes in general and not about this kind of show,
  it holds the longest sentence in all eleven scripts (177 characters), and its own second sentence takes it back.
  If the WHO numbers must stay, they fit on the tips card.
- **F140.** Merge beats 7 and 8 (gloss: "In one experiment four-year-olds did worse on attention tasks right after
  nine minutes of a fast cartoon. Nobody checked whether that lasts, and shows like this one have hardly been
  studied."). Year and sample size go on the source line. The pace-or-fantasy point goes; it cannot be followed
  by ear.
- **F141.** Beats 2 and 3 overlap: motion and cuts are listed in both. One beat: the reflex in a sentence, then
  "these shows trigger it almost without a break".
- Beat 5 is the most interesting finding and comes as one 153-character sentence with a decade, a name and a show
  title. The name and the decade are on the source line already.
- The second half (is it harmful, WHO, tips) runs from 1:19 to 2:23, 40% of the video, on a question the hook did
  not ask. With F139 and F140 it is about 30 s, the right size for one extension.
- **Needs a pause:** beat 4 (the song loop has to play at least twice for the child's anticipation to show) and
  beat 5 (the child looking away).
- With F139-F141: about 1:50 of speech, about 2:00 with the two pauses and the demo in F145. That is the low end
  of the 2-3 minutes Hayk asked for; F143 or a measured number (F138) would fill it better than the WHO beat does.

**Ending.** The last line («Իսկ շոուն ուղղակի շատ լավ գիտի, թե ինչպես օգտագործել դա») lands. The first does not:
«երեխան ծույլ կամ կախված չէ» denies two things the video never raised, and "not addicted" is a new claim made in
the last beat with nothing under it.

- **F142.** Open the takeaway on what was shown (gloss: "So the child is not hypnotised. His brain does what it
  has always done: ..."). With F135 that loops to the hook.
- **F143** (optional). Turn it on the viewer in one line (gloss: "The feed you are scrolling right now uses the
  same reflex."). It gives non-parents a stake and fits the channel. It is a claim, so it needs the same care as
  beat 2.

**Visual and audio ideas.**

- **F144.** If the cuts are measured (F138): one minute of an episode as a strip with a tick at every cut and the
  alert icon firing on each, next to one minute of a slow cartoon. That is the picture of this video.
- **F145.** Do beat 5 to the viewer: play 1.5 s of the narration backwards, with scrambled captions (gloss: "this
  is what the children heard"), labelled «նկարազարդում». It is the same kind of demo as F106 and costs nothing.
- Two smaller points. The Venn of two circles is a slide; two live meters under the playing loop ("new for the
  eyes", "understood") show the same thing in motion. And the planned on-screen note "a scene every 11 s vs every
  34 s" invites a comparison with CoComelon that the script cannot back without F138.

**Armenian (questions).**

- **F146** [heard] «Ամեն կտրուկ փոփոխություն՝ նոր կադր, հանկարծակի ձայն, շարժում, ուղեղում ավտոմատ «սա ի՞նչ է»
  արձագանք է առաջացնում»: the subject, a list of three, then an object with a quote inside it, and the verb last.
  Split it.
- **F147** «Թեև որոշ մասնագետներ ասում են, որ ...» stands as a sentence of its own. Should it attach to the one
  before, or start with «Բայց»? (It goes away with F139.)
- **F148** «երեխան ծույլ կամ կախված չէ»: does «կախված» on its own read as "addicted", or as "dependent on
  something" or "hanging"?
- **F149** Three words for one thing: «մուլտֆիլմ» (4 times), «շոու» (5), «հաղորդում» (1). Is «շոու» what people
  call a children's cartoon series? One word throughout? Also «գրեթե» (beat 3) and «համարյա» (beat 8) again (F126).
- **F150** [heard] «Հենց այսպիսի նոր շոուներն առանձին համարյա ուսումնասիրված չեն»: a long run of modifiers before
  a passive participle.
- **F151** Beat 10 lists infinitives («Ընտրել ..., անջատել ...») and then says «եթե կարող ես». Imperatives
  throughout, to match the «դու» of the hook?
- **F152** [ear] «կանխատեսելին հաճելի է»; «կպչում» and «ինքնատիրապետման առաջադրանքները» (U-hh). TTS: «1980-ականների»
  and «Քոքոմելոն» (U-gg).

**Verdict: small fixes** (F137, F139, F140, F142).
