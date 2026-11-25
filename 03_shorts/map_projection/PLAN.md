# Short: Map projections (why Greenland looks as big as Africa) - script and plan

Draft for Hayk's review, 2026-11-25. Script first (Q17), rendered in Remotion (DECISIONS.md #21). Script source:
`beats.hy.json`. Follows the Fable batch notes (F131-F134). A strong animation candidate: almost every beat is a
moving map.

## The idea in one paragraph

On this map Greenland is nearly Africa's size; Africa is really 14 times larger. Drag Greenland to the equator and
it shrinks below Algeria; lift Armenia to Greenland's latitude and it swells about six times. A sphere cannot be
flattened without distortion (try an orange peel; Gauss proved there is no way around it). Mercator chose to
stretch, because his map was for sailors: it keeps angles, so a straight line is a constant compass course, which
forces equal stretching north-south and east-west. The stretch grows towards the poles (x4 at 60°; the pole itself
is infinitely far, so the map is cut near 85°). Equal-area maps fix sizes and wreck shapes; every map sacrifices
something. Google Maps switched to a globe on desktop in 2018. The takeaway: a map does not lie, it answers one
question, and Mercator's was how not to get lost at sea.

## The script (Armenian)

<!-- script:start -->

8 beats, 1,433 characters (1,448 with numbers spelled out): ~99 s of speech, ~1:43 with pauses and the end tail, 1.5 s of them marked silent pauses (estimate, calibrated on 2 measured beats, about +-10%).

**1. hook.** Այս քարտեզում Գրենլանդիան գրեթե Աֆրիկայի չափ է։ Իրականում Աֆրիկան տասնչորս անգամ մեծ է։

**2. drag.** Եթե Գրենլանդիան քաշենք դեպի հասարակած, այն կծկվում է ու դառնում Ալժիրից էլ փոքր։ Իսկ եթե Հայաստանը բարձրացնենք Գրենլանդիայի տեղը, քարտեզին այն կերևա մոտ վեց անգամ ավելի մեծ, քան հիմա։ *[pause 1.5 s]*

**3. orange.** Պատճառը պարզ է՝ գնդի մակերևույթն անհնար է հարթեցնել առանց աղավաղման։ Փորձիր նարնջի կեղևը հարթ դնել սեղանին՝ կա՛մ կպատռվի, կա՛մ կձգվի։ Մաթեմատիկոս Գաուսը նույնիսկ ապացուցեց, որ ուրիշ ճանապարհ չկա։

**4. mercator.** Մերկատորն ընտրեց ձգել։ Նրա քարտեզը ծովագնացների համար էր, և այն պահում է անկյունները։ Եթե երկու նավահանգիստ քարտեզի վրա ուղիղ գծով միացնես, կստանաս կողմնացույցի հաստատուն ուղղություն։ Դրա համար նա հյուսիսում ամեն ինչ ձգեց և՛ լայնությամբ, և՛ բարձրությամբ նույն չափով։

**5. stretch.** Ձգումն աճում է բևեռին մոտենալով։ Վաթսուներորդ զուգահեռականում երկրները քարտեզին չորս անգամ ավելի մեծ են, քան հասարակածում։ Իսկ բևեռն ինքը քարտեզի վրա անվերջ հեռու է, դրա համար Մերկատորի քարտեզները կտրում են ութսունհինգ աստիճանի մոտ։

**6. others.** Կան քարտեզներ, որ պահում են մակերեսները, բայց դրանք աղավաղում են ձևերը՝ Աֆրիկան ձգվում է ներքև, ինչպես հալած պանիր։ Ամեն քարտեզ ինչ-որ բան զոհում է։ Կատարյալ հարթ քարտեզ չկա։

**7. google.** Գուգլ քարտեզները, որ երկար տարիներ Մերկատորն էին ցույց տալիս, 2018 թվականին համակարգչում փոխեցին մոտեցումը՝ երբ բավականաչափ հեռանում ես, քարտեզը դառնում է գլոբուս։

**8. takeaway.** Քարտեզը սուտ չի ասում, այլ պատասխանում է մի կոնկրետ հարցի։ Մերկատորի հարցն էր՝ ինչպես չմոլորվել ծովում։ Չափերի մասին նա չէր հարցնում։

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
  Armenia sliding north and swelling (computed with sec² φ, from Natural Earth outlines, public domain); the orange
  peel; a ship on a straight course with a fixed compass; Tissot circles swelling; a Mercator-to-Gall-Peters morph;
  a map curling into a globe. Needs d3-geo in Remotion (the projections are one line each).

## Questions for Hayk (review points)

- **U-ccc, the term:** «քարտեզագրական պրոյեկցիա» is in the glossary as «պրոյեկցիա»; the script avoids the word and
  says «քարտեզ». Name it once?
- **U-ddd, «Գուգլ քարտեզները»** in the voice: fine, or «Google Maps» on screen only?
- U-a («դու» vs «դուք») applies here too.
