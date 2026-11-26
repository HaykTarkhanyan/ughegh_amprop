# Long video: How strangers agree on a secret in public (16:9, paint and clocks) - script and plan

The second long-form video, after the zero-knowledge explainer (DECISIONS #23): the same world of secrets in public,
one step further. Hayk's pick on 2026-11-26 ("Start preping it") from the recommendation to expand `../crypto_paint/`.
The Short stays as it is and links to this video, as the zero-knowledge Short does. Script source: `beats.hy.json`;
`episode.json` sets the 16:9 caption layout. Nothing is voiced until Hayk approves the script (Q17).

## The idea

Every secure connection starts with two strangers agreeing on a key while anyone can listen. The video explains how,
twice: first with paint (the intuition), then with real numbers on a clock (the actual mechanism, small enough to
follow). Then three honest limits: the method was found earlier in secret, it does not stop someone pretending to be
the other side (hence certificates), and a large quantum computer would break it (hence the new exchanges browsers
already add). The closing line is the one idea: mixing is easy, unmixing is practically impossible.

## Structure

1. **Hook and problem** (beats 1-3): your phone just agreed a secret key in public; couriers and code books worked for
   centuries; the internet has no couriers.
2. **Paint** (beats 4-10): Ani, Aram, Eva; common yellow, secret red and blue, orange and green cross the line, both
   reach the same brown, Eva cannot unmix. Same story as the Short, with room to breathe.
3. **Clock arithmetic** (beats 11-13): the paint is only an analogy; on a clock 10 + 5 = 3; powers on a 23-hour clock
   jump around with no visible order (5, 2, 10, 4, 20, 8).
4. **The real exchange** (beats 14-15, the showcase): 5 and 23 public, secrets 6 and 15, 8 and 19 sent, both get 2;
   Eva would need the 6, easy for small numbers, practically impossible for properly chosen huge ones.
5. **Three limits** (beats 16-19): GCHQ had it first and kept it secret until 1997; Eva in the middle (why sites
   have certificates); quantum computers (why browsers already add a new exchange).
6. **Close** (beat 20): «Խառնելը՝ հեշտ, բաժանելը՝ գործնականում անհնար» (U4).

## The script (Armenian)

<!-- script:start -->

20 beats, 3,961 characters (4,143 with numbers spelled out): ~279 s of speech, ~5:01 with pauses and the end tail, 18.5 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Երբ բացեցիր այս տեսանյութը, քո հեռախոսն ու կայքը պայմանավորվեցին գաղտնի բանալու շուրջ, իսկ նրանց զրույցը կարող էր լսել ցանկացած մեկը։ Ինչպե՞ս կարելի է գաղտնիք ստեղծել՝ խոսելով բոլորի աչքի առաջ։ *[pause 1.5 s]*

**2. old_way.** Դարեր շարունակ գաղտնի նամակի համար նախ պետք էր գաղտնի փոխանցել բանալին։ Բանակներն ու բանկերը սուրհանդակներ էին ուղարկում՝ ծածկագրերի գրքերով, և եթե գիրքն ընկնում էր թշնամու ձեռքը, ամեն ինչ սկսվում էր նորից։

**3. internet.** Իսկ համացանցում սուրհանդակ չկա։ Չես կարող ամեն կայքի հետ նախապես հանդիպել։ Բանալին պետք է ստեղծել հենց բաց զրույցում, որտեղ ամեն բառը լսում են։ *[pause 1 s]*

**4. name.** Մաթեմատիկոսները ցույց տվեցին, որ դա հնարավոր է։ Սկզբում բացատրենք ներկերով, հետո՝ իսկական թվերով։

**5. setup.** Անին և Արամն ուզում են ընդհանուր գաղտնի գույն ունենալ։ Եվան տեսնում է ամեն ինչ, ինչ նրանք ուղարկում են իրար։

**6. common.** Նախ բաց պայմանավորվում են ընդհանուր գույնի շուրջ՝ դեղին։ Եվան էլ գիտի։

**7. secrets.** Հետո յուրաքանչյուրն ընտրում է իր գաղտնի գույնը և ոչ մեկին չի ասում՝ Անին կարմիր, Արամը կապույտ։

**8. mix_send.** Ամեն մեկն իր գաղտնի գույնը խառնում է դեղինի հետ և ուղարկում մյուսին։ Անին ուղարկում է նարնջագույն, Արամը՝ կանաչ։ Եվան տեսնում է երկուսն էլ։ *[pause 1.5 s]*

**9. final.** Հիմա ամեն մեկն ստացած խառնուրդին ավելացնում է իր գաղտնի գույնը։ Անին կանաչին ավելացնում է կարմիր, Արամը նարնջագույնին՝ կապույտ։ Եվ երկուսն էլ ստանում են նույն շագանակագույնը՝ դեղին, կարմիր և կապույտ միասին։ *[pause 2.5 s]*

**10. eve.** Իսկ Եվա՞ն։ Նա ունի դեղին, նարնջագույն և կանաչ։ Եթե դրանք խառնի, կստանա ավելի դեղնավուն գույն, որովհետև դեղինն այնտեղ ավելի շատ է։ Նրան պետք է նարնջագույնից հետ հանել կարմիրը, իսկ ներկը խառնելը հեշտ է, բաժանելը՝ համարյա անհնար։ *[pause 1.5 s]*

**11. analogy_limit.** Ներկը, իհարկե, միայն համեմատություն է։ Իսկական փոխանակման մեջ գույների փոխարեն թվեր են, իսկ խառնելու փոխարեն՝ մի հաշվարկ, որն անել հեշտ է, իսկ հետ գնալը՝ շատ դժվար։ Դրա համար պետք է ժամացույցի թվաբանությունը։

**12. clock.** Ժամացույցի վրա 10-ին գումարած 5 ժամը 3-ն է, ոչ թե 15-ը։ Թվերը պտտվում են շրջանով, և մնում է միայն մնացորդը՝ 12-ի բաժանելիս։ Իսկական փոխանակման մեջ ժամացույցի վրա 12 չէ, այլ մի մեծ պարզ թիվ։ *[pause 1.5 s]*

**13. power.** Հիմա վերցնենք 23 ժամ ունեցող ժամացույց և 5 թիվը։ 5-ը բազմապատկում ենք իրենով մի քանի անգամ, այսինքն՝ աստիճան ենք բարձրացնում, և ամեն անգամ մնում ենք ժամացույցի վրա։ Առաջ գնալը հեշտ է։ Իսկ եթե ասեմ միայն վերջնական թիվը, դժվար է գուշակել, թե քանի անգամ ենք բազմապատկել, որովհետև թվերը ժամացույցի վրա ցատկոտում են առանց կարգի։ *[pause 1.5 s]*

**14. toy.** Փորձենք։ Ընդհանուր թվերը 5 և 23 են՝ դեղինի փոխարեն։ Անիի գաղտնիքը 6 է, Արամինը՝ 15։ Անին 5-ը բարձրացնում է 6-րդ աստիճանի 23-ժամանոց ժամացույցի վրա և ստանում 8։ Արամը նույնն անում է 15-ով և ստանում 19։ Նրանք ուղարկում են 8 և 19։ Հիմա Անին 19-ը բարձրացնում է իր 6-րդ աստիճանի, Արամը 8-ը՝ իր 15-րդ աստիճանի, և երկուսն էլ ստանում են 2։ *[pause 3 s]*

**15. backwards.** Եվան տեսնում է 5, 23, 8 և 19։ Գաղտնի 2-ը ստանալու համար նրան պետք է Անիի 6-ը, այսինքն՝ գտնել, թե քանի անգամ է 5-ը բազմապատկվել, որ ստացվի 8։ Փոքր թվերի դեպքում կարելի է փորձել բոլորը։ Բայց իսկական թվերն ունեն հարյուրավոր թվանշաններ, և ճիշտ ընտրված թվերի համար հետ գնալու գործնական արագ եղանակ սովորական համակարգիչներով հայտնի չէ։ Գործնականում դա անհնար է։ *[pause 1.5 s]*

**16. history.** Հետաքրքիրն այն է, որ նույնը մի քանի տարի առաջ գտել էին բրիտանական գաղտնի ծառայությունում։ Երեք մաթեմատիկոս գրեթե նույն գաղափարներին հասել էին 1970-ականների սկզբին, բայց դա գաղտնի էր մինչև 1997 թվականը։ Գաղափարի հեղինակներից մեկը՝ Ջեյմս Էլիսը, մահացավ հրապարակումից մեկ ամիս առաջ։

**17. mitm.** Բայց Եվան ունի ավելի պարզ հնարք։ Ներկը բաժանել չի կարողանում, բայց կարող է կանգնել մեջտեղում և Անիի հետ ձևանալ Արամ, իսկ Արամի հետ՝ Անի։ Երկու կողմն էլ կկարծեն, որ գաղտնիք ունեն միմյանց հետ, բայց երկուսն էլ խոսում են Եվայի հետ։ *[pause 1.5 s]*

**18. certificates.** Դրա համար փոխանակումից բացի պետք է համոզվել, թե ում հետ ես խոսում։ Կայքերն ունեն վկայականներ՝ թվային ստորագրություններ, որոնք հաստատում են վստահելի կազմակերպությունները, և քո բրաուզերը ստուգում է դրանք ամեն անգամ։

**19. quantum.** Եվ վերջին նախազգուշացումը։ Եթե երբևէ կառուցվի բավական մեծ քվանտային համակարգիչ, այն կկարողանա հետ գնալ այս հաշվարկում։ Դրա համար արդեն ստանդարտացվել է նոր փոխանակում, որը հիմնված է այլ խնդրի վրա, և շատ բրաուզերներ արդեն օգտագործում են հին ու նոր փոխանակումները միասին։

**20. takeaway.** Գաղտնիքը կարելի է ստեղծել բաց զրույցով։ Խառնելը՝ հեշտ, բաժանելը՝ գործնականում անհնար։ *[pause 1.5 s]*

<!-- script:end -->

Armenian lint: 0 errors, 0 hints (2026-11-26).

## Facts (checked 2026-11-26)

- **Diffie & Hellman 1976**, "New Directions in Cryptography", *IEEE Trans. Information Theory* 22(6): 644-654,
  https://doi.org/10.1109/TIT.1976.1055638 (checked in OpenAlex). Named on the source line only; Merkle's related work
  could join the plan's notes if Hayk wants the "Diffie-Hellman-Merkle" credit.
- **GCHQ first:** James Ellis, "non-secret encryption" (1970; some sources 1969); Clifford Cocks, essentially RSA
  (1973); Malcolm Williamson, a Diffie-Hellman-like exchange (1974); made public in December 1997 (Cocks's talk on
  18 Dec 1997); Ellis died on 25 Nov 1997. From the `crypto_paint` plan: GCHQ's Williamson biography, Schneier's "The
  Secret Story of Nonsecret Encryption" (1998), the NSA / defense.gov Diffie profile.
- **Toy numbers (computed):** powers of 5 on a 23-hour clock: 5, 2, 10, 4, 20, 8; 5⁶ mod 23 = 8, 5¹⁵ mod 23 = 19,
  19⁶ mod 23 = 2 = 8¹⁵ mod 23.
- **Clock arithmetic:** 10 + 5 on a 12-hour clock = 3 (15 = 12 + 3). Real exchanges use a large prime and, more often
  today, elliptic curves; the voice says "a large prime number", true of classic Diffie-Hellman, and the visual stays
  with numbers (elliptic curves are not mentioned: one mechanism is enough).
- **"Practically impossible":** for properly chosen large parameters there is no known practical fast classical method
  (Codex X44; RFC 9325, https://www.rfc-editor.org/info/rfc9325/, specifies minimum sizes); the voice says "with
  ordinary computers" and the next beat explains the quantum exception. Wording «գործնականում անհնար»: Hayk, U4.
- **Man in the middle and certificates:** standard; TLS authenticates the server with a certificate chain to a
  trusted authority.
- **Quantum:** Shor's algorithm (1994) solves the underlying problem efficiently on a large enough quantum computer.
  NIST published ML-KEM (derived from Kyber) as FIPS 203 on 13 August 2024
  (https://csrc.nist.gov/pubs/fips/203/final). Chrome moved from a pre-standard Kyber hybrid to the hybrid
  X25519MLKEM768 in Chrome 131, late 2024 (https://security.googleblog.com/2024/09/a-new-path-for-kyber-on-web.html);
  a vendor guide says Edge and Firefox also negotiate it by default. The voice says «շատ բրաուզերներ ... հին ու նոր
  ... միասին» (hybrid). **Re-check the current browser defaults before publishing**: nothing official for 2026 was found.

## Evidence record

| Beat | Claim (as voiced) | Source | Kind | Checked |
|---|---|---|---|---|
| hook | opening the video involved a key agreement over a public network | TLS 1.3 (every handshake uses an ephemeral exchange) | data | standard; the video player's connection is HTTPS / QUIC |
| old_way | couriers and code books; a captured book meant starting again | general history of cryptography | story | general knowledge, no source recorded |
| name | mathematicians showed it is possible | Diffie & Hellman 1976, https://doi.org/10.1109/TIT.1976.1055638 | data | DOI checked in OpenAlex |
| final, eve | same brown on both sides; Eva gets a yellower mix | paint analogy | analogy | labelled as an analogy in beat 11 |
| clock | 10 + 5 = 3 on a 12-hour clock | calculation | calculation | checked |
| power, toy | 5, 2, 10, 4, 20, 8; 8, 19 sent; both get 2 | calculation | calculation | checked with Python `pow` |
| backwards | no known practical fast way with ordinary computers for properly chosen numbers | RFC 9325; standard cryptography | data | consistent with Codex X44 |
| history | three GCHQ mathematicians, early 1970s, secret until 1997; Ellis died a month before | Schneier 1998; GCHQ biography (URLs not recorded) | data (historical) | secondary; record the URLs |
| certificates | sites have certificates the browser checks | TLS standard | data | standard |
| quantum | a large quantum computer could reverse it; a new exchange is standardised; many browsers use old and new together | Shor 1994; NIST FIPS 203 (2024); Google security blog (Chrome 131) | data | FIPS 203 and the Chrome change checked by web search; current defaults to re-check |

## Visuals (16:9)

- **Paint** (beats 5-10): reuse the Short's paint design at 16:9: two workbenches, Eva on a raised stand in the
  middle, cans crossing an open line; swirling mixes; the showcase is the two browns settling to the same colour.
- **Clock** (beats 11-13): a clean dial; the 12-hour example, then a 23-hour dial with the jump trail of 5's powers.
  New component: `ClockDial` (hand animation, trail, remainder circle).
- **The real exchange** (beat 14, the showcase): the paint layout returns with numbers in the same places and colours
  (yellow = 5 and 23, red / blue = 6 / 15, orange / green = 8 / 19, brown = 2), each step on a small dial, so the
  viewer sees the paint and the numbers are the same story.
- **Backwards** (beat 15): Eva trying powers on the small dial, then the huge number scrolling; the two arrows.
- **History** (beat 16): a classified folder, three dated cards, a calendar to 1997. No photos needed (portraits of
  Ellis / Cocks / Williamson only if a free Commons file exists: to check).
- **Man in the middle and certificates** (beats 17-18): Eva swapping cans; a signed seal; the browser rejecting the
  fake.
- **Quantum** (beat 19): the backward arrow turning solid; a lattice-pattern lock joining the first lock.
- **Reused from the zero-knowledge video:** backdrop, labels, check marks, the landscape caption profile, the timeline
  loader and the cue checks (`render/src/zk/timeline.ts`).

## Answers (Hayk, 2026-11-26)

- **LQ1:** Sadaltager TTS narrates (not Hayk). Voicing waits for the script approval (Q17); about $0.07 for the
  whole script.
- **LQ2:** keep all three limits (history, man in the middle, quantum).
- **LQ3:** `crypto_paint` stays as the Short and links to this video.
- **LQ5:** published later, not straight after the zero-knowledge video.
- Open: LQ4 (terms).

## Questions for Hayk

- **LQ1, narrator:** you narrated the zero-knowledge long video. This one too (one take, free reading, through
  `tools/import_recording.py`), or the Sadaltager TTS voice?
- **LQ2, scope:** keep all three limits (history, man in the middle, quantum), or cut one to stay near 5 minutes?
  The history beat is the most cuttable; the man in the middle is the honest one to keep.
- **LQ3, the Short:** keep `crypto_paint` as the Short that links here (as with zero-knowledge), or rebuild it as a
  pure teaser like `zero_knowledge_short`?
- **LQ4, terms:** «ժամացույցի թվաբանություն» for modular arithmetic, «բրաուզեր» (or «դիտարկիչ»), «վկայական»,
  «քվանտային համակարգիչ»: natural in your mouth?
- **LQ5, publishing slot:** right after the zero-knowledge video (the same theme twice), or later in the order?
