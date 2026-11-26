# Short: Why your own voice sounds strange on a recording - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17); not one of the four animation showcases, so it can use
simpler visuals. Rendered in Remotion (DECISIONS.md #21). Script source: `beats.hy.json`.

## The idea in one paragraph

You hear your own voice through two paths: through the air like everyone else, and through the bones of your skull,
which carry the low frequencies well, so inside your head your voice sounds deeper and fuller. A microphone only gets
the air path, so the recording sounds thinner and higher; plug your ears while talking and you get the opposite.
That recording is roughly what everyone else always hears. Like our preference for the mirrored photo of our own
face (1977), we like the version we are used to; and when our voice is slipped in among others without warning, we
even rate it as more attractive than others do (2013). The cringe is surprise, not a bad voice, and it fades with
listening.

## The script (Armenian)

<!-- script:start -->

10 beats, 1,361 characters (1,361 with numbers spelled out): ~94 s of speech, ~1:45 with pauses and the end tail, 8.5 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Լսում ես քո ձայնը ձայնագրության մեջ և մտածում՝ իսկապե՞ս այսպես եմ խոսում։ Այո, մոտավորապես այդպես են քեզ լսում մյուսները։

**2. two_paths.** Երբ խոսում ես, ձայնդ ականջիդ հասնում է երկու ճանապարհով՝ օդով, ինչպես մյուսների ձայնը, և ներսից՝ գանգի ոսկորներով։ *[pause 1.5 s]*

**3. bone_bass.** Ոսկորները լավ են հաղորդում ցածր հաճախությունները՝ բասը։ Դրա համար ներսից լսած ձայնդ ավելի խոր ու թավ է թվում։

**4. recording.** Իսկ միկրոֆոնը լսում է միայն օդով եկող ձայնը։ Ոսկորների ճանապարհը վերանում է, և ձայնը թվում է ավելի բարակ, պակաս թավ։ *[pause 1.5 s]*

**5. try.** Փորձիր հիմա՝ մատներով փակիր ականջներդ և խոսիր։ Ձայնդ կհնչի ավելի ուժեղ ու թավ, որովհետև հիմա այն լսում ես հիմնականում ոսկորներով։ *[pause 3 s]*

**6. used_to.** Այսինքն՝ ամբողջ կյանքում լսել ես քո ձայնի մի տարբերակ, որը ոչ ոք չի լսում, բացի քեզնից։ Ձայնագրությունը քեզ համար անծանոթ է, իսկ մյուսների համար դա հենց քո ձայնն է։ *[pause 1 s]*

**7. study.** Եվ մի լավ լուր։ Մի հետազոտությունում մարդիկ գնահատում էին տարբեր ձայների գրավչությունը, և նրանց մեջ առանց զգուշացնելու խառնել էին իրենց ձայնը։ Մարդիկ իրենց ձայնն ավելի գրավիչ գնահատեցին, քան այն գնահատում էին ուրիշները։ *[pause 1.5 s]*

**8. why_cringe.** Ուրեմն խնդրի մի մասը, հավանաբար, անակնկալն է։ Ձայնը մեր պատկերացման կարևոր մասն է ինքներս մեզ մասին, և երբ այն ուրիշ է հնչում, թվում է, թե օտարին ենք լսում։

**9. practice.** Դրա համար էլ հաղորդավարներն ու երգիչները հաճախ են լսում իրենց ձայնագրությունները, և շատերի համար ժամանակի հետ տարօրինակությունը թուլանում է։

**10. takeaway.** Լավ միկրոֆոնը քեզ համարյա չի աղավաղում։ Ձայնագրությունը հանում է այն, ինչ լսում ես միայն դու։

<!-- script:end -->

Armenian lint: 0 errors after two house-style fixes.

## Facts (checked)

- **Two paths, bone = more bass** (Scientific American "Why does my voice sound different?", Gizmodo, the occlusion
  effect literature): the voice you hear is air + bone conducted; a recording removes the bone path. Plugging the ears
  boosts the low frequencies (the occlusion effect; one hearing-aid patent quotes 20 dB or more below 500 Hz, not used
  in the script).
- **Own voice rated more attractive** (Hughes & Harrison, "I Like My Voice Better: Self-Enhancement Bias in Perceptions
  of Voice Attractiveness", *Perception* 42(9): 941-949, 2013): 80 participants rated recordings of people counting to
  10; three samples of their own voice were included without telling them; they rated their own voice higher than
  others rated it and higher than they rated other voices. The authors also point to familiarity (mere exposure).
- **Mirror faces** (Mita, Dermer & Knight, *J. Personality and Social Psychology* 35: 597-601, 1977): people preferred
  the mirrored photo of their own face, friends and partners the true one; replicated (27 of 38 adults, 71%, picked
  their mirror image, *Frontiers in Psychology* 2010).
- **Left out:** the Beethoven rod-between-the-teeth story ("famously rumoured", no firsthand source); the 1966
  "voice confrontation" study (not found).
- **Beat 10** ("after a few listens the strangeness usually passes") rests on mere exposure; said with «սովորաբար».

## Visuals

A head in profile with the two sound paths (air waves curving to the ear, vibrations through the skull), a frequency
bar chart where the bone path adds low bars and the microphone removes them, fingers-in-ears, a drawn face and its
mirror image, anonymous voice cards with star ratings, a "cringe meter". Simple vector animation; no photos needed.

## Questions for Hayk (review points)

- **U-bb, terms:** «ցածր հաճախություններ՝ բասը», «թավ», «գանգի ոսկորներ»: natural?
- **U-cc, length:** ~2 min, the shortest of the batch; fine, or add a beat (for example, why singers wear in-ear
  monitors)?
- U-a («դու» vs «դուք») applies here too.

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md):

- **X43:** the closing keeps the approximation from the hook: a good microphone barely distorts you, and the
  recording removes the part only you hear (real recordings also depend on the microphone, its position, the room and
  processing). "The problem is not the voice but the surprise" is now "part of it is probably the surprise", and
  "after a few listens it passes" is now "for many people it fades with time" (self-voice research,
  https://pmc.ncbi.nlm.nih.gov/articles/PMC9929504/, names further factors such as vibration felt while speaking).
- **X53:** «բարձր» meant pitch in one line and loudness in the next. The recording is now «ավելի բարակ, պակաս թավ»
  (thinner, less bass) and the plugged-ears voice «ավելի ուժեղ ու թավ» (louder and bassier, the occlusion effect).
  Codex's candidate wording, to confirm with Hayk.
- **X51:** the «Կարճ ասած» summary card and the mirror extension are cut (texts below), years off the voice, 8.5 s of
  pauses with the longest (3 s) on the try-it-now moment, no «Այնպես որ,».

**Cut beats, kept here word for word so they can come back:**

- `mirror`: Նույնը դեմքի հետ է։ Հայելում տեսնում ենք մեր դեմքը շրջված։ 1977 թվականի հետազոտությունում մարդիկ իրենց շրջված լուսանկարն էին ավելի շատ հավանում, իսկ ընկերները՝ իսկականը։ Հավանում ենք այն, ինչին սովոր ենք։ (source line: Mita, Dermer & Knight, 1977)

- `card`: Կարճ ասած՝ ներսից լսածդ ձայնն օդ է՝ գումարած ոսկոր, իսկ ձայնագրությունը՝ միայն օդ։ (screen: ներսից՝ օդ + ոսկոր, ձայնագրություն՝ միայն օդ)
