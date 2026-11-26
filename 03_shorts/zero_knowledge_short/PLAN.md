# Short: Zero-knowledge proofs, the intro (vertical 9:16, narrated by Hayk) - script and plan

The short intro to the long explainer `../zero_knowledge/` (Q18; DECISIONS.md #23): the channel's first video.
Narrated by Hayk, recorded separately from the long one (one take, free reading). Facts, sources and the recording
guide are in `../zero_knowledge/PLAN.md`. Script source: `beats.hy.json`.

## The idea

The gossip hook (does your friend really know Ani's secret?), the same problem for websites and banks, then Where's
Waldo in one beat (placed while your friend looks away, a big sheet with a small hole shows him, not where he is),
the answer to the gossip question in one sentence (a chat that only says "match or not"), and a pointer: how that
is possible, the cards, the balls and why it is called "zero knowledge" are in the long video. On YouTube, link the long video from the Short
(the "related video" field).

## The script (Armenian)

<!-- script:start -->

5 beats, 803 characters (808 with numbers spelled out): ~56 s of speech, ~1:01 with pauses and the end tail, 4 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. gossip.** Ընկերուհիդ գրում է՝ «Լսե՞լ ես Անիի մասին»։ Դու գաղտնիքը գիտես, բայց չգիտես՝ նա էլ գիտի՞, թե ուզում է քեզնից իմանալ։ Ինչպե՞ս ստուգել՝ առանց գաղտնիքը բարձրաձայնելու։ *[pause 1 s]*

**2. same_problem.** Նույն խնդիրն ունեն կայքերն ու բանկերը՝ համոզվել, որ գիտես գաղտնաբառդ, կամ որ 18 տարեկանից մեծ ես, առանց ավելորդ բան իմանալու։ Լուծումը կոչվում է զրոյական գիտելիքով ապացույց։

**3. waldo.** Ինչպես «Որտե՞ղ է Վալոդը» գրքում՝ գտել ես նրան, բայց չես ուզում ցույց տալ՝ որտեղ։ Ընկերդ շրջվում է, իսկ դու էջը ծածկում ես մեծ ստվարաթղթով, որի փոքրիկ անցքից երևում է միայն նա։ Ընկերդ համոզված է, որ գտել ես, բայց չգիտի՝ էջի որ մասում է։ *[pause 2 s]*

**4. tease.** Իսկ բամբասանքի համար կա ծրագիր՝ երկուսդ էլ գրում եք պատասխանը, և այն ասում է միայն՝ համընկնում է, թե ոչ։ Ինչպե՞ս է դա հնարավոր, և ի՞նչ կապ ունեն քարտերն ու գնդակները, տե՛ս երկար տեսանյութում։

**5. takeaway.** Ապացուցելն ու բացահայտելը նույն բանը չեն։ *[pause 1 s]*

<!-- script:end -->

Armenian lint: 0 errors, 0 hints.

## Visuals (9:16)

The same components as the long video (`../render/src/zk/`), laid out vertically: the chat and the locked envelope
(frame 0), two quick cards (password, age gate), the Waldo page with the sheet and the hole, a flash of the
face-down red card and the two khaki balls as the tease.

## Questions for Hayk

- **U-rrr, the tease line** «... տե՛ս երկար տեսանյութում»: fine, or end the Short on the takeaway alone and let
  the related-video link do the work?

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md):

- **X24:** the hook asks about the gossip, but the Short only resolved Waldo. The tease now answers the gossip
  question in one sentence (some chats let both type the answer and say only whether it matches) and points to the
  long video for how and why, so the Short closes its own question.
- **X22:** the Waldo beat says the friend turns away while you cover the page.
- **X59:** the portrait composition `ZkShort` (1080 x 1920) is registered in `render/src/Root.tsx`, laid out for 9:16
  rather than scaled from 16:9; see the render README for building it from a recording or the guide voice.
