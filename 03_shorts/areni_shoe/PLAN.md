# Short: Areni-1's oldest known surviving leather shoe - script and plan

Draft for Hayk's review, 2026-11-28. History strand with an Armenian subject. Script source: `beats.hy.json`.
One construction showcase; one extension, preservation and what the surviving material can tell us. No voice or
animation generated. The winery is reserved for its own short.

## The idea in one paragraph

A roughly 5,500-year-old leather shoe from Areni-1 survives whole, including its lacing. The showcase folds a
schematic single leather piece around a right-foot form, then returns to the real photograph. Its 24.5 cm length
and approximate European size 37 give scale, not the wearer's sex. Dating the leather gives a range rather than an
exact birthday. After this solid evidence, the doubt beat limits the record to surviving leather footwear: older
plant-fibre sandals exist, and finding a shoe does not locate the invention of footwear. The single extension is
preservation: cave conditions, the covering deposit, and the grass whose presence is observed but purpose inferred.
The close returns to the object in the History Museum of Armenia collection and its unknown owner.

## The script (Armenian)

<!-- script:start -->

8 beats, 1,433 characters (1,497 with numbers spelled out): ~101 s of speech, ~1:53 with pauses and the end tail, 10 s of them marked silent pauses (a planning estimate for the TTS voice: whole voiced scripts came within 5%, single beats up to 26% off; a human reading can differ more; the timeline gives the real length).

**1. hook.** Կոշիկը մոտ 5500 տարեկան է։ Նույնիսկ կաշվե կապիչներն են պահպանվել։ *[pause 1 s]*

**2. find.** Գտել են Հայաստանում՝ Վայոց ձորի Արենի-1 քարանձավում։ Սա մեզ հայտնի ամենահին պահպանված կաշվե կոշիկն է։ Ոչ թե ոտնամանի բեկոր, այլ ամբողջական կոշիկ՝ իր ձևով ու կապիչներով։

**3. construction.** Նայի՛ր կառուցվածքին։ Կաշվի ամբողջական մի կտոր է՝ ոտքի շուրջ հավաքված ու կաշվե կապիչներով ամրացված։ Սա աջ ոտքի կոշիկ է, ու դա էլ են պարզել պահպանված մաշվածքից։ Երկարությունը 24,5 սանտիմետր է՝ մոտավորապես այսօրվա եվրոպական 37 չափսը։ Փորձի՛ր աչքով հետևել՝ ինչպես է հարթ կտորը կոշիկ դառնում։ *[pause 4 s]*

**4. dating.** Տարիքն էլ միայն տեսքից չեն գուշակել։ Թվագրել են հենց կաշվի նմուշները։ Ստացվել է ժամանակային միջակայք, ոչ թե պատրաստման ճշգրիտ օր։ Դրա համար էլ ասում ենք՝ մոտ 5500 տարեկան։

**5. doubt.** Բայց ամենահին կաշվե կոշի՞կը նշանակում է առաջին ոտնամանը։ Ոչ։ Բուսական մանրաթելերից ավելի հին սանդալներ էլ են պահպանվել։ Այս գտածոն չի ասում, թե մարդիկ որտեղ են առաջին անգամ կոշիկ պատրաստել։ Հաստատ գիտենք՝ այս կաշվե կոշիկն է հասել մեզ։

**6. preservation.** Իսկ ինչպե՞ս է կաշին այդքան երկար պահպանվել։ Հետազոտողները նշում են քարանձավի զով, չոր ու կայուն պայմանները։ Գտածոները նաև ծածկված էին ոչխարի գոմաղբի հաստ շերտով։ Հետազոտողների բացատրությամբ՝ այդ պայմաններն օգնել են, որ կոշիկը հասնի մեզ։ *[pause 2 s]*

**7. grass.** Կոշիկի ներսում խոտ էլ կար։ Գուցե տաք պահելու համար էր, գուցե՝ ձևը պահպանելու։ Նպատակը հաստատ չգիտենք։ Խոտի առկայությունը փաստ է, իսկ դրա նշանակությունը՝ հետազոտողների ենթադրությունը։ *[pause 2 s]*

**8. closing.** Այս կոշիկը Հայաստանի պատմության թանգարանի հավաքածուում է։ Կոշիկը մնացել է, տիրոջը չգիտենք։ *[pause 1 s]*

<!-- script:end -->

Armenian lint: **0 errors, 0 hints** on the final UTF-8 extraction of every `text`, `screen` and `screen_small`
string. No errors or hints in the initial pass either; no hints retained. Read through the polish checklist and
reran `--style` after the final wording and honesty-label edits. Owner choices remain in S1-S3 below.

Length: **8 beats, 1,433 characters; ~101 s speech; ~1:53 total; 10 s marked pauses**, as generated above. Under
the tool's speech-plus-pauses ceiling.

Validation: **PASS**, `tools/validate_episode.py areni_shoe --stage script`, final exit code 0. The original
`plan_script.py` and validator entry points ran from `03_shorts/` through a Python launcher with bytecode disabled
and `runlog.REPO` redirected to this episode folder, keeping tool logs inside the permitted write scope. Lint
inputs are in the system temporary directory outside the repository.

## Facts (checked)

Evidence base: `_knowledge/short_videos/facts_codex_5_mixed_2026-11-28.md`, K2. Each source below is in the sheet.
The analytical paper and the record listing were also reopened during drafting. No quotation is invented.

- **Find location and discovery year - high** (`find`): discovered in 2008 at Areni-1, Vayots Dzor, Armenia.
  The year is on the source line, not in the voice. [History Museum of Armenia, official catalogue](https://historymuseum.am/collections_type/5500-%D5%A1%D5%B4%D5%B5%D5%A1-%D5%AF%D5%A1%D5%B7%D5%BE%D5%A5-%D5%B8%D5%BF%D5%B6%D5%A1%D5%B4%D5%A1%D5%B6/).
- **Age and calibrated interval - high** (`hook`, `dating`): approximately 5,500 years old; combined leather result
  3627-3377 calibrated BCE, from Table 2. The screen uses this range, not the inconsistent narrow interval elsewhere
  in the paper or the grass result. Samples are from the leather itself; no raw BP value is presented as calendar
  years ago. [Pinhasi et al., 2010, Table 2](https://pmc.ncbi.nlm.nih.gov/articles/PMC2882957/).
- **Construction, lacing and right foot - high** (`hook`, `find`, `construction`): a single piece of hide wrapped
  around the foot; leather lacing survives. Wear and shape identify the right foot. The fold animation is an
  explanatory reconstruction, not a recovered cutting pattern. [Pinhasi et al., Results](https://pmc.ncbi.nlm.nih.gov/articles/PMC2882957/),
  [UCLA's research announcement, 2010](https://international.ucla.edu/apc/article/115597).
- **Dimensions - high** (`construction`): length 24.5 cm, approximately European size 37. Modern size comparison does
  not establish the wearer's sex. [Pinhasi et al., Results](https://pmc.ncbi.nlm.nih.gov/articles/PMC2882957/),
  [UCLA](https://international.ucla.edu/apc/article/115597). No US size conversion is used.
- **Record category - high** (`find`, `doubt`): oldest known surviving leather shoe, not oldest footwear of every
  material. Older plant-fibre sandals survive. The discovery provides no evidence of an invention site or the
  wearer's ethnicity. [Pinhasi et al., Discussion](https://pmc.ncbi.nlm.nih.gov/articles/PMC2882957/),
  [Guinness, First leather shoe](https://www.guinnessworldrecords.com/world-records/first-leather-shoe).
- **Preservation - high for observed conditions; medium for causal contributions** (`preservation`): the researchers
  describe stable, cool, dry conditions and a thick sheep-dung covering. Their explanation links the combined
  conditions to preservation. The script attributes the explanation and gives no measured share to any factor.
  [UCLA](https://international.ucla.edu/apc/article/115597). No temperature, humidity percentage or chemical tanning
  mechanism is claimed.
- **Grass - high for presence; medium for purpose** (`grass`): grass was found inside. Insulation and keeping the
  shoe's shape/storage are hypotheses, with the paper favouring the latter. Both are voiced as possibilities,
  followed by the explicit fact/inference distinction. [Pinhasi et al., Results](https://pmc.ncbi.nlm.nih.gov/articles/PMC2882957/),
  [UCLA](https://international.ucla.edu/apc/article/115597).
- **Museum collection and unknown owner - high** (`closing`): the official museum catalogue records the object in
  the History Museum of Armenia collection. The paper cannot determine the wearer's sex; no individual is
  identified. The script avoids asserting that a particular gallery display is open today.
  [Museum catalogue](https://historymuseum.am/collections_type/5500-%D5%A1%D5%B4%D5%B5%D5%A1-%D5%AF%D5%A1%D5%B7%D5%BE%D5%A5-%D5%B8%D5%BF%D5%B6%D5%A1%D5%B4%D5%A1%D5%B6/),
  [Pinhasi et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC2882957/).
- **Medium-or-lower claims used:** only the preservation explanation and the possible grass functions above.
  No low-confidence claim is used. Cowhide identification is omitted; the material is called leather.

## Animation plan (showcase)

- **One showcase, `construction`:** frame 0 contains the real shoe photo, a schematic leather outline and the
  persistent «վերակազմություն» tag. Fold the outline around a neutral right-foot form and thread the leather lacing.
  Keep a 24.5 cm ruler and approximate European size 37 for scale. The viewer follows the fold through the 4 s pause.
  This explains one-piece construction; it is not an exact ancient manufacturing sequence. Do not invent hole
  counts, tools, hide species, a separate rigid sole, or the wearer's appearance.
- **Other beats:** `hook` starts on the real lacing; `find` pairs the cave entrance and shoe photographs. `dating`
  shows only the verified combined leather interval, 3627-3377 BCE. `doubt` underlines the leather qualifier and uses
  a generic fibre-sandal icon labelled «նկարազարդում», not an attributed archaeological specimen.
- **Preservation extension:** an illustrative cave cross-section shows the covering deposit and cool/dry icons,
  without quantitative environmental claims. The grass cutaway retains «նկարազարդում» and marks both proposed
  uses as hypotheses. The 2 s pauses let the viewer read the conditions and distinguish presence from purpose.
- **Closing:** return to the real shoe photo with the museum-collection caption; leave the owner field unanswered.
  The voice says the closing screen line. No summary card or fictional display case. Total marked pauses: 10 s;
  longest: 4 s on the showcase. Every beat starts with a visible object from its narration.

## Images

Both files are in the fact sheet; licences and credits below come from its checked Commons metadata. No files
downloaded. Preserve the complete attribution and note any crop/animation when assets are fetched.

- [File:Chalcolithic leather shoe from Areni-1 cave.jpg](https://commons.wikimedia.org/wiki/File:Chalcolithic_leather_shoe_from_Areni-1_cave.jpg),
  **CC BY 2.5**; Pinhasi R., Gasparian B., Areshian G., Zardaryan D., Smith A., et al.; paper Figure 1. Use this for
  the actual object, rather than passing the folding drawing off as a photograph.
- [File:Areni-1 cave entrance.jpg](https://commons.wikimedia.org/wiki/File:Areni-1_cave_entrance.jpg),
  **CC BY 3.0**; **Serouj**. Entrance view only, not an image of the exact find position. The licence is BY, not BY-SA.

## Questions for Hayk

- **S1, object name:** keep the conversational «կոշիկ» throughout the voice, with «ոտնաման» in the category question,
  or prefer the museum catalogue's «ոտնաման» more often? Current wording stays for review.
- **S2, lacing and dating words:** approve «կաշվե կապիչներ» and «կաշվի համակցված թվագրում» on screen? The supplied
  glossary has «նմուշ» for sample, which is used, but no entries for shoe lacing or archaeological dating.
- **S3, preservation wording:** keep the direct «ոչխարի գոմաղբի հաստ շերտ»? Also choose whether to retain both
  labelled grass-function hypotheses or just the paper's favoured shape/storage interpretation. Neither is settled
  by the evidence; the current draft keeps both with uncertainty stated.

