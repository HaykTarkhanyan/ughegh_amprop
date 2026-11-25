# Showcase 2: Friendship paradox (on average, your friends really do have more friends than you) - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17); after approval: full animation (Q16, showcase) in Remotion
(DECISIONS.md #21). Script source: `beats.hy.json`.

## The idea in one paragraph

Most people have fewer friends than their friends have on average, not because they are unpopular but because of how
the averaging works: a person with 11 friends appears in 11 friend lists, a person with 2 friends in only 2, so the
popular ones are counted many times. In a 20-person network 17 have fewer friends than their friends; on Facebook in
2011, 92.7% of 721 million users did. The same counting makes buses feel always full. It is also useful: friends of
random students caught the flu ~2 weeks earlier (Harvard 2009), and vaccinating random friends of random people
reaches the well-connected. The formula: a random friend has μ + D/μ friends.

## The script (Armenian)

<!-- script:start -->

13 beats, 1,952 characters, ~135 s of speech at ~870 characters a minute.

**1. hook.** Մեծ հավանականությամբ քո ընկերները միջինում ավելի շատ ընկերներ ունեն, քան դու։ Եվ սա վիրավորանք չէ, այլ մաթեմատիկա։

**2. name.** Սա կոչվում է ընկերության պարադոքս։ 1991 թվականին այն նկարագրեց սոցիոլոգ Սքոթ Ֆելդը՝ դպրոցականների ընկերությունների տվյալներով։

**3. network.** Նայենք քսան մարդու փոքր խմբի։ Գծերն ընկերություններն են։ Միջինում ամեն մեկն ունի չորսից քիչ ընկեր։

**4. friends_avg.** Հիմա ամեն մեկի համար հաշվենք՝ իր ընկերները միջինում քանի՞ ընկեր ունեն։ Ստացվում է մոտ հինգ։

**5. count.** Քսանից տասնյոթն ավելի քիչ ընկեր ունի, քան իր ընկերները՝ միջինում։ Ավելի շատ ունեն միայն երեքը։

**6. why.** Ինչո՞ւ։ Նայիր այս մարդուն՝ նա տասնմեկ ընկեր ունի և հայտնվում է տասնմեկ մարդու ընկերների ցուցակում։ Իսկ նա, ով երկու ընկեր ունի, հայտնվում է ընդամենը երկու ցուցակում։ Երբ հաշվում ես ընկերների ընկերները, շատ ընկերներ ունեցողներին հաշվում ես շատ անգամ։

**7. bus.** Նույնն է ավտոբուսների հետ։ Եթե կեսը համարյա դատարկ է, իսկ կեսը՝ լեփ-լեցուն, ուղևորների մեծ մասը նստած կլինի լեցուն ավտոբուսում և կմտածի, թե ավտոբուսները միշտ լեցուն են։

**8. facebook.** Ֆեյսբուքում 2011 թվականին 721 միլիոն օգտատիրոջ ուսումնասիրությունը ցույց տվեց՝ օգտատերերի 93 տոկոսն ավելի քիչ ընկեր ուներ, քան իրենց ընկերները՝ միջինում։

**9. flu.** Պարադոքսը նաև օգտակար է։ 2009 թվականին Հարվարդում հետազոտողները հետևում էին երկու խմբի՝ պատահական ուսանողների և նրանց նշած ընկերների։ Ընկերների խմբում գրիպն սկսվեց մոտ երկու շաբաթ ավելի շուտ։ Ընկերներն ավելի կապված են, ուստի ավելի շուտ են վարակվում։

**10. vaccine.** Նույն գաղափարով, երբ պատվաստանյութը քիչ է, կարելի է պատվաստել ոչ թե պատահական մարդկանց, այլ նրանց պատահական ընկերներին։ Այդպես ավելի հաճախ ես հասնում շատ կապեր ունեցողներին։

**11. card.** Մաթեմատիկան պարզ է՝ պատահական ընկերը միջինում ունի սովորական միջինից ավելի շատ ընկեր, և տարբերությունն այնքան մեծ է, որքան մեծ է մարդկանց միջև եղած տարբերությունը։

**12. comfort.** Այնպես որ, եթե թվում է, թե բոլորն ավելի շատ ընկերներ և ավելի ակտիվ կյանք ունեն, մասամբ դա նրանից է, թե ում ես ամենահաճախ տեսնում։ Ամենաշատ կապեր ունեցողները հենց նրանք են, ում բոլորը տեսնում են։

**13. takeaway.** Դու ավելի քիչ սիրված չես։ Ուղղակի ամենաշատ ընկեր ունեցողներին բոլորն են հաշվում։

<!-- script:end -->

Armenian lint: 0 errors (one article fix: «Գծերն ընկերություններն»). Term: «դիսպերսիա» for variance (glossary).

## Numbers and facts (checked)

- **The demo network** (`python friendship/network.py`, networkx 3.7, powerlaw-cluster graph n = 20, seed 509;
  writes `friendship/build/network.json` with a fixed layout): 36 friendships, mean 3.6 friends ("fewer than four"),
  mean of each person's friends' mean 5.18, a random friend has 4.92 ("about five"); 17 have fewer friends than their
  friends' mean, 3 more; the most popular person has 11. Formula check: 3.6 + 4.74 / 3.6 = 4.92.
- **Feld 1991**, "Why Your Friends Have More Friends Than You Do", *American Journal of Sociology* 96(6): 1464-1477,
  using Coleman's 1961 high-school friendship data. Its exact tally could not be read (the only copy is a scan), so the
  script gives no number from it.
- **Facebook** (Ugander, Karrer, Backstrom & Marlow 2011, arXiv:1111.4503, 721 million active users, May 2011): "92.7%
  of users have less friends than the average friend count of their friends" (said "93"); median friend count 99;
  "until you have nearly 700 friends, your (average) neighbor has more friends than you".
- **Flu sensors** (Christakis & Fowler, *PLoS ONE* 2010; Harvard College, fall 2009, 744 students): the epidemic in the
  friend group ran 13.9 days (95% CI 9.9-16.6) ahead of the random group (14.7 days in the preprint): "about two
  weeks".
- **Acquaintance immunization** (Cohen, Havlin & ben-Avraham, *Phys. Rev. Lett.* 91, 247901, 2003): "immunization of
  random acquaintances of random nodes". A modelling result; the script says «կարելի է».
- **Buses** (beat 7): 5 buses with 5 passengers and 5 with 55: 275 of 300 passengers (92%) sit in full ones.

## Animation plan (showcase)

- **The network:** the 20 nodes at their fixed positions (inside the safe area, above the caption band), drawn in node
  by node with springy edges; each node a small person icon with its count.
- **"Your friends' average":** for one person, the friends pulse and their numbers fly in and merge into an average
  next to the person; then the same for everyone at once, nodes colouring red (fewer) or orange (more).
- **Why:** the hub glows and 11 copies of it fly into 11 friend lists (little cards), against 2 copies of a quiet node.
- **Buses:** ten bus outlines filling with dots; the camera switches to "the passengers' view".
- **Facebook / flu / vaccine:** a zoom-out to a huge faint network with "93%"; two epidemic curves with a 14-day
  arrow; random picks vs "a random friend of a random pick" landing on hubs, shields on hubs.
- **Formula card:** μ + D/μ with the network's numbers, and the D = 0 case (everyone equal, no paradox).
- To build: a `Network` component (nodes, edges, highlight states, flying-number merge), a `BusRow`, a small
  `EpidemicCurves`. Estimated 2-3 h.

## Questions for Hayk (review points)

- **U-s, «ընկերության պարադոքս»** (or «ընկերների պարադոքս»)?
- **U-t, the hook's claim:** «Մեծ հավանականությամբ» keeps it true for the 7% who have more friends than their friends:
  fine, or simply «քո ընկերները ... ավելի շատ ընկերներ ունեն»?
- **U-u, the formula card (10):** keep the μ + D/μ card, or words only?
- U-a («դու» vs «դուք») applies here too.
