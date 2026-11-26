# Short: Map projections (why Greenland looks as big as Africa) - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17), rendered in Remotion (DECISIONS.md #21). Script source:
`beats.hy.json`. Follows the Fable batch notes (F131-F134). A strong animation candidate: almost every beat is a
moving map.

## The idea in one paragraph

On this map Greenland is nearly Africa's size; Africa is really 14 times larger. Drag Greenland to the equator and
it shrinks below Algeria; lift Armenia to Greenland's latitude and its area grows about six times. A sphere cannot be
flattened without distortion (try an orange peel; Gauss proved there is no way around it). So why draw the world
like this? Gerardus Mercator, a 16th-century mapmaker, made his map for sailors: it keeps angles, so a straight
line is a constant compass course, which forces equal stretching north-south and east-west. The stretch grows
towards the poles and the pole itself is infinitely far, so square web maps (Web Mercator) are cut near 85 degrees. Equal-area maps fix
sizes and wreck shapes; every map sacrifices something. Try it: zoom all the way out in Google Maps on a computer
and the map becomes a globe. The takeaway: a map does not lie, it answers one question, and Mercator's was how not
to get lost at sea.

## The script (Armenian)

<!-- script:start -->

9 beats, 1,457 characters (1,472 with numbers spelled out): ~101 s of speech, ~1:52 with pauses and the end tail, 8.5 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Այս քարտեզում Գրենլանդիան գրեթե Աֆրիկայի չափ է։ Իրականում Աֆրիկան 14 անգամ մեծ է։ *[pause 1 s]*

**2. drag_greenland.** Եթե Գրենլանդիան քաշենք դեպի հասարակած, այն կծկվում է ու դառնում Ալժիրից էլ փոքր։ *[pause 2 s]*

**3. drag_armenia.** Իսկ եթե Հայաստանը բարձրացնենք Գրենլանդիայի տեղը, քարտեզին այն կերևա մակերեսով մոտ վեց անգամ ավելի մեծ, քան հիմա։ *[pause 2 s]*

**4. orange.** Գնդի մակերևույթն անհնար է հարթեցնել առանց աղավաղման։ Փորձիր նարնջի կեղևը հարթ դնել սեղանին՝ կա՛մ կպատռվի, կա՛մ կձգվի։ Մաթեմատիկոս Գաուսը նույնիսկ ապացուցեց, որ ուրիշ ճանապարհ չկա։ *[pause 1 s]*

**5. mercator.** Բայց ինչո՞ւ է մեկն աշխարհն այսպես ձգել։ Տասնվեցերորդ դարի քարտեզագիր Գերարդ Մերկատորն իր քարտեզը ծովագնացների համար էր անում։ Այն պահում է անկյունները՝ եթե երկու նավահանգիստ քարտեզի վրա ուղիղ գծով միացնես, կստանաս կողմնացույցի հաստատուն ուղղություն։ Դրա համար նա հյուսիսում ամեն ինչ ձգեց և՛ լայնությամբ, և՛ բարձրությամբ նույն չափով։

**6. stretch.** Ձգումն աճում է բևեռին մոտենալով, իսկ բևեռն ինքը քարտեզի վրա անվերջ հեռու է։ Դրա համար համացանցի քառակուսի քարտեզները կտրում են մոտ 85 աստիճանում։

**7. others.** Կան քարտեզներ, որ պահում են մակերեսները, բայց դրանք աղավաղում են ձևերը՝ Աֆրիկան ձգվում է ներքև, ինչպես հալած պանիր։ Ամեն քարտեզ ինչ-որ բան զոհում է։ Կատարյալ հարթ քարտեզ չկա։ *[pause 1.5 s]*

**8. google.** Ստուգիր ինքդ՝ համակարգչում Գուգլ քարտեզներում միացրու գլոբուսի տեսքը և հեռացիր մինչև վերջ։ Քարտեզը կդառնա գլոբուս, և Գրենլանդիան կստանա իր իսկական չափը։ Գուգլն այդ տեսքն ավելացրեց, որ Գրենլանդիան այլևս Աֆրիկայի չափ չերևա։

**9. takeaway.** Քարտեզը սուտ չի ասում, այլ պատասխանում է մի կոնկրետ հարցի։ Մերկատորի հարցն էր՝ ինչպես չմոլորվել ծովում։ Չափերի մասին նա չէր հարցնում։ *[pause 1 s]*

<!-- script:end -->

Armenian lint: 0 errors, 0 hints.

## Facts (checked)

- **Areas:** Greenland about 2.17 million km², Africa about 30.4 million km² (14.0 times); Algeria 2.38 million km²,
  so Greenland is smaller than Algeria (NPR 2026, Mental Floss, data.europa.eu guide).
- **Mercator's stretch:** linear scale sec φ, area scale sec² φ (standard). Computed here: x1.71 at Armenia's 40.2°N,
  x4.0 at 60°, x10.5 at 72°N (mid-Greenland), so Armenia moved to 72°N would look 10.47 / 1.71 = 6.1 times bigger
  than on today's Mercator map ("about six"). Web Mercator is cut at about 85.05°.
- **Why Mercator:** a conformal projection (glossary: «կոնֆորմ արտապատկերում»), made in 1569 for navigation; rhumb
  lines (constant compass bearing) are straight. Standard; the year is on the source line, not in the voice.
- **Gauss:** Theorema Egregium (1827): a sphere's curvature cannot be kept on a plane, so no flat map is free of
  distortion.
- **Google Maps:** desktop switched to a 3D globe when zoomed out, announced 2 August 2018; Google's own example was
  Greenland no longer looking as large as Africa; mobile kept the flat map (Engadget, TechCrunch, TechRadar). The
  script says «համակարգչում».
- **Left out:** the Boston schools switching to Gall-Peters (2017) was not confirmed in the search.

## Visuals

- **Real maps (Commons):** `File:Mercator 1569 world map composite.jpg` (public domain, Mercator's own),
  `File:Tissot indicatrix world map Mercator proj.svg` (CC BY-SA 4.0, Eric Gaba), `File:Gall–Peters projection
  SW.jpg` (CC BY-SA 3.0, Strebe).
- **Drawn and animated (the showcase):** Greenland's true outline sliding south and shrinking next to Algeria;
  Armenia sliding north, re-projected from its coordinates (area x6.1, each dimension x2.47; never scale the outline
  by the area factor), from Natural Earth outlines, public domain; the orange
  peel; a ship on a straight course with a fixed compass; Tissot circles swelling; a Mercator-to-Gall-Peters morph;
  a map curling into a globe. Needs d3-geo in Remotion (the projections are one line each).

## After the Fable review (FABLE_REVIEW_2.md, applied 2026-11-25)

- **F201** Mercator introduced («Տասնվեցերորդ դարի քարտեզագիր Գերարդ Մերկատորը»). **F205** one question at the turn
  («Բայց ինչո՞ւ է մեկն աշխարհն այսպես ձգել») and the stretch beat leads with the pole; ×4 at 60° is a label.
- **F202 / F226** the screen line is the voiced thought («Քարտեզը պատասխանում է մի կոնկրետ հարցի»).
- **F203** the drag beat split in two with 2 s each, 1 s on the orange, 1.5 s on the morph: 8.5 s of pauses.
- **F204** the Google beat is now something to try, no spoken year. **F206** «քարտեզագրական պրոյեկցիաներ» on
  screen once (U-ccc). **F228** «Պատճառը պարզ է» cut. **F229** «14 անգամ», «85 աստիճանում» as digits.

## Questions for Hayk (review points)

- **U-ccc, the term:** «քարտեզագրական պրոյեկցիա» is in the glossary as «պրոյեկցիա»; the script avoids the word and
  says «քարտեզ». Name it once?
- **U-ddd, «Գուգլ քարտեզները»** in the voice: fine, or «Google Maps» on screen only?
- U-a («դու» vs «դուք») applies here too.

## After the Codex review (2026-11-26)

Fixes by finding ID (CODEX_REVIEW.md):

- **X48:** "about six times" is an area ratio (sec² 72° / sec² 40.2° ≈ 6.1); each dimension grows about 2.47x. The
  voice now says «մակերեսով», and the storyboard tells the animator to re-project Armenia's coordinates rather than
  scale the outline by the area factor. The Tissot labels are marked as area. The 85° cutoff is named as Web
  Mercator's (square web tiles), not every Mercator map's. The try-it step says to switch on globe view first, which
  Google's help requires (https://support.google.com/maps/answer/3031966), instead of promising every desktop does it
  automatically.
