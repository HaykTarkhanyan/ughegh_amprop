# Showcase 1: Public-key crypto explained with paint mixing - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17); after approval this one gets the full animation treatment
(Q16, showcase) in Remotion (DECISIONS.md #21). Script source: `beats.hy.json`.

## The idea in one paragraph

How do two people agree on a secret when everyone hears everything they send? Diffie and Hellman (1976): agree
publicly on a common colour (yellow), each keeps a secret colour (Ani red, Aram blue), each sends "common + own
secret" (orange, green), each adds their own secret to what they received: both end with the same brown, while the
eavesdropper Eva, who saw yellow, orange and green, can only make a yellower mix, because paint is easy to mix and
practically impossible to unmix. In reality the paints are numbers (a power, then the remainder after dividing by a
big prime), shown with a toy example (5 and 23 -> both get 2). British GCHQ found it first and kept it secret until
1997. Today a version of it runs almost every time a site opens with a padlock; certificates stop Eva from pretending
to be Aram.

## The script (Armenian)

<!-- script:start -->

14 beats, 2,291 characters (2,394 with numbers spelled out): ~162 s of speech, ~2:44 with pauses and the end tail (estimate, calibrated on 2 measured beats, about +-10%).

**1. hook.** Ինչպե՞ս պայմանավորվել գաղտնի բանալու շուրջ, եթե ձեր զրույցը լսում է ամբողջ աշխարհը։ Դու դա անում ես գրեթե ամեն անգամ, երբ կայք ես բացում կողպեքի նշանով։

**2. problem.** Դարեր շարունակ գաղտնի հաղորդագրության համար նախ պետք էր գաղտնի հանդիպել և փոխանցել բանալին։ Բանակներն ու բանկերը սուրհանդակներ էին ուղարկում։ Համացանցում դա անհնար է։

**3. idea.** 1976 թվականին Ուիթֆիլդ Դիֆին և Մարտին Հելմանը ցույց տվեցին, որ կարելի է ընդհանուր գաղտնիք ստանալ բաց զրույցով։ Ամենահեշտ է բացատրել ներկերով։

**4. setup.** Անին և Արամն ուզում են ընդհանուր գաղտնի գույն։ Եվան տեսնում է ամեն ինչ, ինչ նրանք ուղարկում են իրար։

**5. common.** Նախ բաց պայմանավորվում են ընդհանուր գույնի շուրջ՝ դեղին։ Եվան էլ գիտի։

**6. secrets.** Հետո յուրաքանչյուրն ընտրում է իր գաղտնի գույնը և ոչ մեկին չի ասում՝ Անին կարմիր, Արամը կապույտ։

**7. mix_send.** Ամեն մեկն իր գաղտնի գույնը խառնում է դեղինի հետ և ուղարկում մյուսին։ Անին ուղարկում է նարնջագույն, Արամը՝ կանաչ։ Եվան տեսնում է երկուսն էլ։

**8. final.** Հիմա ամեն մեկն ստացած խառնուրդին ավելացնում է իր գաղտնի գույնը։ Անին կանաչին ավելացնում է կարմիր, Արամը նարնջագույնին՝ կապույտ։ Եվ երկուսն էլ ստանում են նույն շագանակագույնը՝ դեղին, կարմիր և կապույտ միասին։

**9. eve.** Իսկ Եվա՞ն։ Նա ունի դեղին, նարնջագույն և կանաչ։ Եթե դրանք խառնի, կստանա ավելի դեղնավուն գույն, ոչ թե նույնը։ Նրան պետք է ներկը հետ բաժանել իր բաղադրիչների, իսկ ներկը խառնելը հեշտ է, բաժանելը՝ համարյա անհնար։

**10. math.** Իրականում ներկի փոխարեն թվեր են։ Խառնելը թիվն աստիճան բարձրացնելն է և մեծ պարզ թվի վրա բաժանելիս մնացորդը վերցնելը։ Դա անել հեշտ է, իսկ հետ գնալը՝ գտնել աստիճանը, հարյուրավոր թվանշան ունեցող թվերի համար ոչ ոք արագ անել չգիտի։

**11. toy.** Փոքր օրինակ՝ ընդհանուր թվերը 5 և 23 են, Անիի գաղտնիքը՝ 6, Արամինը՝ 15։ Անին ուղարկում է 8, Արամը՝ 19, և երկուսն էլ հաշվում են նույն գաղտնի թիվը՝ 2։

**12. history.** Հետաքրքիրն այն է, որ բրիտանական գաղտնի ծառայությունում սա գտել էին ավելի վաղ՝ 1970-ականների սկզբին, բայց գաղտնի էին պահում մինչև 1997 թվականը։ Գաղափարի հեղինակներից մեկը՝ Ջեյմս Էլիսը, մահացավ դրա հրապարակումից մեկ ամիս առաջ։

**13. today.** Այսօր այս փոխանակման տարբերակներն օգտագործվում են գրեթե ամեն անգամ, երբ կայքը բացվում է կողպեքով, և մեսենջերներում։ Մի կարևոր մանրուք՝ պետք է նաև համոզված լինես, որ խոսում ես իսկական Արամի հետ, ոչ թե Եվայի, որը ձևանում է նրան։ Դրա համար կայքերն ունեն վկայականներ։

**14. takeaway.** Այնպես որ, համացանցի գաղտնիքները հիմնված են մի պարզ բանի վրա՝ կան գործողություններ, որոնք անել հեշտ է, իսկ հետ դարձնել՝ համարյա անհնար։ Ինչպես ներկը խառնելը։

<!-- script:end -->

Armenian lint: 0 errors after two article fixes («Արամն ուզում», «թիվն աստիճան»). Names: Անի, Արամ, Եվա (the
classic Alice, Bob, Eve).

## Facts and numbers (checked)

- **Diffie & Hellman, 1976** ("New Directions in Cryptography", IEEE Trans. Information Theory).
- **GCHQ first:** James Ellis proposed "non-secret encryption" in 1970 (some sources say 1969), Clifford Cocks
  described what is essentially RSA in 1973, Malcolm Williamson a Diffie-Hellman-like key exchange in 1974; made public
  in December 1997 (Cocks's talk on 18 Dec 1997). Ellis died on 25 Nov 1997, a month before the announcement. Sources:
  GCHQ biography of Williamson, Schneier's "The Secret Story of Nonsecret Encryption" (1998), NSA/defense.gov Diffie
  profile.
- **Today:** TLS 1.3 (RFC 8446 and its revision drafts) removed static RSA and static DH; every public-key exchange it
  keeps is ephemeral (EC)DH, so "a version of this, almost every padlock" holds. Messengers on the Signal protocol use
  DH-based key agreement.
- **Toy numbers** (computed): 5⁶ mod 23 = 8, 5¹⁵ mod 23 = 19, 19⁶ mod 23 = 2 = 8¹⁵ mod 23.
- **Simplifications said out loud or kept honest:** the paint analogy (mixing is easy, unmixing hard) stands for the
  discrete-logarithm problem; "nobody knows a fast way" is the accurate claim (not "impossible"); the
  man-in-the-middle caveat is in beat 13.

## Animation plan (showcase)

- **Characters:** Ani (left), Aram (right), Eva (top middle, a big eye), simple flat figures in the shorts' palette.
- **Paint:** cans and blobs that really mix: two blobs swirl into each other (an SVG turbulence / metaball-style
  merge, or a canvas fluid swirl), colour interpolated in a paint-like (subtractive) way, not RGB averaging, so yellow
  + blue really gives green. Colours: yellow `#F2C230`, red `#D9342B`, blue `#2E5BBA`, orange `#E8812A`, green
  `#5FA046`, brown `#7A4A2A`, Eva's wrong mix `#C9A944`.
- **The public strip:** blobs fly along a glowing channel; Eva's copies peel off upward.
- **Numbers morph:** paint cans turn into the toy numbers (beat 11), a 600-digit number scrolls (beat 10).
- **Kept from the pilot:** caption band (2 lines, measured), karaoke ending, safe area.
- **To build:** a `PaintMix` component (two blobs -> one, with the swirl), character figures, the channel, the
  number cards. Estimated 2-3 h, the swirl being the risky part (try an SVG `feTurbulence` displacement first, it
  renders in headless Chrome).

## Questions for Hayk (review points)

- **U-p, terms:** «գաղտնի բանալի», «բաց զրույց», «վկայական» (certificate): natural?
- **U-q, the maths beat (10):** «աստիճան բարձրացնել ... մնացորդը վերցնել» is the plain version; name «դիսկրետ
  լոգարիթմ» too, or not?
- **U-r, the GCHQ beat:** keep (a good story) or cut to stay under 2.5 min?
- U-a («դու» vs «դուք») applies here too.
