# «Ուղեղ Ամպրոպ» — five research fact sheets

**Confidence:** **high** = strong documentary support or a reproducible calculation; **medium** = an attributed recollection, estimate, or qualified inference; **low** = insufficient evidence. Quotations below are short, exact excerpts. Calculated numbers are explicitly distinguished from numbers printed in sources.

## C1. Small populations appear at both extremes

**1. Verdict on the premise**

**The statistical idea is correct; “the healthiest and sickest places are tiny” is too broad.** Accurate wording: **“Small populations can produce unusually high and unusually low measured rates, even when their underlying risks are identical.”**

There is also an important correction to the famous example: Kahneman describes cancer *incidence*, but the source map identifies **age-standardized kidney/ureter cancer death rates among U.S. males, 1980–1989**. Use the map caption’s definition. [Wainer and Zwerling, 2006, Figures 1–3](https://www.pdkmembers.org/members_online/publications/Archive/pdf/k0612wai.pdf)

**2. Key facts**

- **High — What Kahneman actually says.** In Chapter 10 of *Thinking, Fast and Slow* (2011), he describes **3,141 counties**. His low-rate description includes “mostly rural, sparsely populated”; his high-rate description begins “These ailing counties tend to be mostly rural, sparsely populated”. These are descriptions of a particular historical example, not a general ranking of health. [Kahneman, Chapter 10, PDF p. 108](https://laravyan.com/uploads/data/1737007145.pdf)

- **High — The source chain is identifiable.** Kahneman credits Howard Wainer and Harris Zwerling. Their 2006 article reproduces maps from **Andrew Gelman and Deborah Nolan, *Teaching Statistics: A Bag of Tricks* (2002), pp. 14–15**. The figure captions specify “age-standardized death rates” and “U.S. males, 1980-89”. **Trust these captions over Kahneman’s less precise “incidence.”** [Wainer and Zwerling, pp. 301–302](https://www.pdkmembers.org/members_online/publications/Archive/pdf/k0612wai.pdf)

- **High — Both tails are involved.** The maps select the **lowest 10% and highest 10%** of county rates. Wainer’s later explanation identifies what the extremes share: “low population—and therefore high variation in kidney-cancer rates.” This supports a denominator lesson, not a rural-lifestyle explanation. [Wainer, 2007, Figure 2](https://sites.pitt.edu/~bertsch/wainer.pdf)

- **High — The precise variance relationship.** For independent Bernoulli observations with common probability \(p\), a sample proportion has
  \[
  \operatorname{Var}(\hat p)=\frac{p(1-p)}n,\qquad
  \operatorname{SD}(\hat p)=\sqrt{\frac{p(1-p)}n}.
  \]
  **Variance scales as \(1/n\); standard deviation scales as \(1/\sqrt n\).** Supporting source: Table 7.2’s standard-deviation entry, \(\sqrt{p(1-p)/n}\). Age-standardized cancer rates require more elaborate uncertainty calculations; this is the explanatory model. [OpenStax, §7.3](https://openstax.org/books/introductory-business-statistics/pages/7-3-the-central-limit-theorem-for-proportions)

- **High — A verified numerical illustration.** With independent fair coin tosses, \(p=0.5\): the standard deviation of the heads proportion is **10 percentage points for \(n=25\)** and **5 percentage points for \(n=100\)**. These are calculations from the preceding formula, not cancer observations. Quadrupling the sample halves this standard deviation. [Supporting formula, OpenStax Table 7.2](https://openstax.org/books/introductory-business-statistics/pages/7-3-the-central-limit-theorem-for-proportions)

- **High — The school dataset was specific.** Wainer and Zwerling examined **1,662 Pennsylvania schools** supplying **fifth-grade mathematics scores for 2001–2002**. Exact supporting numbers in the text: “1,662” and “2001-02”. This was an observational comparison of school averages. [Wainer and Zwerling, p. 301](https://www.pdkmembers.org/members_online/publications/Archive/pdf/k0612wai.pdf)

- **High — Small schools occurred among both the best and worst.** Among the **50 highest-scoring schools**, **six** belonged to the **50 smallest**: **12%**. Among the **50 lowest-scoring schools**, **nine** belonged to the 50 smallest: **18%**. Exact supporting entries: “six”; “Nine of these (18%)”. The smallest 50 were approximately **3%** of the 1,662-school dataset. [Wainer and Zwerling, pp. 301–302](https://www.pdkmembers.org/members_online/publications/Archive/pdf/k0612wai.pdf)

- **High that the claim was printed; low as a narrowly defined spending total — The famous $1.7 billion.** The 2006 article says approximately **$1.7 billion by 2001**, but describes the grants as “grants to education projects”. It does **not** establish an audited $1.7 billion spent exclusively on splitting schools. Do not turn that broader wording into a precise small-schools expenditure. [Wainer and Zwerling, p. 300](https://www.pdkmembers.org/members_online/publications/Archive/pdf/k0612wai.pdf)

- **High — Gates’s own 2009 assessment was mixed.** His annual letter reports “over $2 billion in grants” for better high schools, including organizational changes and reduced size. He says many small schools “did not improve students’ achievement in any significant way”, while also reporting attendance and graduation improvements at many schools. His disappointment concerned achieving college-ready graduation goals. [Bill Gates, 2009 annual letter](https://www.gatesfoundation.org/stories/annual-letter-2009)

- **Medium — A later clarification used a narrower figure.** A foundation spokesman supplied **$650 million** for small schools; broader spending “includes more than small schools.” [Reported clarification, 2014](https://www.washingtonpost.com/news/answer-sheet/wp/2014/06/09/how-much-bill-gatess-disappointing-small-schools-effort-really-cost/)

- **High — Later causal evidence prevents an “all failed” conclusion.** MDRC’s admissions-lottery-based New York City evaluation found that its particular small-schools model increased graduation rates by **6.8 percentage points** in the 2010 report. Supporting excerpt: “increase overall graduation rates by 6.8 percentage points”. The intervention combined school size with other organizational features; it did not isolate size alone. [Bloom, Levy Thompson and Unterman, MDRC, 2010](https://www.mdrc.org/work/publications/transforming-high-school-experience)

**3. Retellings to avoid**

- **High:** “Small towns are simultaneously the healthiest and sickest.” The evidence concerns one historical, sex-specific cancer mortality measure.
- **High:** “All differences between counties are statistical noise.” Unequal sampling variation does not eliminate genuine differences in risk.
- **High:** “Gates wasted exactly $1.7 billion because nobody checked the bottom-ranked schools.” The exact expenditure, causal motivation and blanket failure claim are not established.
- **High:** “Small schools cannot improve outcomes.” The MDRC findings contradict that generalization.
- **High — Source error:** The 2006 article says the variance is “proportional” to sample size where it should say **inversely proportional**. Use the mathematical formula, not that sentence. [2006 text](https://www.pdkmembers.org/members_online/publications/Archive/pdf/k0612wai.pdf), [correct relationship](https://openstax.org/books/introductory-business-statistics/pages/7-3-the-central-limit-theorem-for-proportions)

**4. Best hook**

“In one U.S. cancer map, the lowest death rates and the highest shared a surprising feature: small populations.”

“A tiny population can look exceptionally healthy—or exceptionally unhealthy—just because its numbers fluctuate more.”

**5. Showcase idea**

Animate repeated samples of **25 versus 100 fair coin tosses**. Both distributions center on **50% heads**, but their standard deviations are **10 versus 5 percentage points**. Label this **“mathematical illustration”**. Extend to the school results: highlight **six of the top 50** and **nine of the bottom 50**.

Small source line: **Gelman & Nolan, 2002; Wainer & Zwerling, 2006; Gates, 2009.**

**6. Images**

**None needed.** Original diagrams are better suited to this explanation.

**7. Armenian anchor**

**None found.**

**8. Open questions**

- The complete underlying county dataset and its treatment of suppressed or unstable rates were not independently reconstructed here.
- **3,141** is verified as Kahneman’s printed count, not as a newly audited count of analyzable counties in the original mortality data.
- The spending figures have different dates and scopes. **No verified basis was found for “exactly $1.7 billion spent solely on small schools.”**

## C2. London’s V-1 impacts and the Poisson distribution

**1. Verdict on the premise**

**“London’s targeted bombs were random” is misleading.** London was deliberately targeted. Clarke found that **counts within a selected South London area closely matched a Poisson model**, offering no evidence of additional clustering at that scale.

Accurate wording: **“Bomb impacts can form frightening-looking clusters even when their local distribution is consistent with chance.”** [Clarke, 1946](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

**2. Key facts**

- **High — Original publication.** R. D. Clarke’s paper is **“An application of the Poisson distribution,” *Journal of the Institute of Actuaries*, 72, 1946, p. 481**. The original is one page. Supporting printed page number: “481”. [Original paper](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

- **High — Area studied.** Clarke selected **144 square kilometres of South London**. Exact supporting number: “144 square kilometres”. This was a selected study area, not all London. [Clarke, first substantive paragraph](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

- **High — Grid specification.** It contained **576 squares**, each **¼ square kilometre**. Exact supporting entries: “576 squares” and “¼ square kilometre each”. [Clarke](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

- **High — Correct side length.** Each square therefore had a side of **0.5 km = 500 m**, calculated as \(\sqrt{0.25\text{ km}^2}\). A quarter-square-kilometre square is **not** 250 metres on a side. [Supporting area specification, Clarke](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

- **High — Bomb count.** The study counted **537 impacts** during its unspecified observation period. Exact supporting number: “537”. [Clarke](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

- **High — Fitted mean.** The estimated mean was
  \[
  \lambda=\frac{537}{576}=0.9322916667
  \]
  impacts per square. Clarke explicitly gives “\(N=576\)” and “\(m=537/576\)”. The decimal is calculated. [Clarke, formula](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

- **High — Complete original frequency table.** The following numbers are transcribed from Clarke’s table, preserving his rounding. [Clarke, table](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

  | Hits per square | Observed squares | Poisson-expected squares |
  |---|---:|---:|
  | 0 | 229 | 226.74 |
  | 1 | 211 | 211.39 |
  | 2 | 93 | 98.54 |
  | 3 | 35 | 30.62 |
  | 4 | 7 | 7.14 |
  | 5 or more | 1 | 1.57 |
  | **Total** | **576** | **576.00** |

- **High — His reported test result.** Clarke reports **\(\chi^2=1.17\)**, **4 degrees of freedom**, and **\(p=0.88\)**. These verify what he reported; the p-value is not an 88% probability that randomness is true. Exact supporting numbers: “1·17”, “4”, “·88”. [Clarke, final paragraph](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

- **High — Contemporary assertions of clustering are documented.** Clarke says impacts were alleged to have “tended to be grouped in clusters”. This directly documents the allegation, but does not quantify how many Londoners believed it or establish every later story about suspected spies and protected buildings. [Clarke, opening](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

- **High — The conclusion was limited.** Clarke says the fit “lends no support to the clustering hypothesis”. His selection assumed approximately constant underlying impact density within the study area. This is a local model check, not proof that every impact was independent or that guidance was absent. [Clarke](https://garcialab.berkeley.edu/courses/papers/Clarke1946.pdf)

- **High — London-wide uniformity is false.** Liam P. Shaw and Luke F. Shaw’s 2019 reanalysis describes the overall pattern as “not uniformly random over London but was skewed to the south”. Their result qualifies the familiar textbook story rather than invalidating Clarke’s selected-area result. [Shaw and Shaw, 2019](https://academic.oup.com/jrssig/article/16/5/12/7029379)

- **Medium — A defensible accuracy estimate exists, with qualifications.** Evans and Delaney estimated a **12.5 km circular error probable relative to an assumed Tower Bridge aiming point**. Supporting excerpt: “estimated CEP-T of 12.5 km”. Their Figure 7 uses **2,420 London impacts**; this is an approximate operational reconstruction, not a guaranteed accuracy specification for every V-1 or launch phase. [Evans and Delaney, 2018, p. 51, Figure 7](https://jhanley.biostat.mcgill.ca/bios601/Intensity-Rate/Evans2018AccuracyGeography.pdf)

**3. Retellings to avoid**

- **High:** “The Germans were not aiming at London.” The city was the intended area target.
- **High:** “Random means evenly spaced.” A Poisson pattern naturally contains empty areas and multiple-hit areas.
- **High:** “Clarke proved every London impact was uniformly random.” His conclusion applies to a selected area and aggregation scale.
- **High:** “The square sides were 250 metres.” They were **500 metres**.
- **High:** “V-1 accuracy was 3.5 km.” Evans and Delaney’s **3.5 km** concerns the location of the overall mean impact relative to the county centroid; it is not individual-shot accuracy. [Evans and Delaney, abstract and accuracy analysis](https://jhanley.biostat.mcgill.ca/bios601/Intensity-Rate/Evans2018AccuracyGeography.pdf)

**4. Best hook**

“A random bombing pattern can contain clusters. In South London, 537 V-1 impacts matched that prediction remarkably closely.”

**5. Showcase idea**

Build the **six histogram categories** from the verified table, then overlay the expected bars. Highlight **229 empty squares** and **35 squares with three hits**: both are compatible with the fitted model.

If showing dots on a map, label their positions **“simulation”**. Clarke’s table does not supply the original individual coordinates.

Small source line: **R. D. Clarke, 1946; Shaw & Shaw, 2019.**

**6. Images**

**High — Checked on Commons:**

- **[File:V-1 flying bomb, Science Museum, London.jpg](https://commons.wikimedia.org/wiki/File:V-1_flying_bomb,_Science_Museum,_London.jpg)** — photographer **The wub**, **CC BY-SA 4.0**. The licence panel states “Creative Commons Attribution-Share Alike 4.0 International”.

**7. Armenian anchor**

**None found.**

**8. Open questions**

- Clarke does not identify the exact study boundaries or observation dates in the published page.
- His paper does not provide the individual impact coordinates.
- The exact German aiming points remain uncertain; Evans and Delaney explicitly treat Tower Bridge as an assumption.
- Evidence for widespread belief in clustering is stronger than evidence for any particular colourful civilian rumour.

## C3. Monty Hall: stick or switch?

**1. Verdict on the premise**

**Switching wins with probability \(2/3\) under the standard rules.** State those rules: the prize is initially equally likely behind each door; the knowledgeable host always opens an unchosen goat door and always offers the switch.

The original published question left part of that protocol implicit. The distinction between the mathematical puzzle and the actual television show matters. [Rosenhouse’s scholarly treatment](https://faculty.winthrop.edu/abernathyk/Monty%20Hall%20Problem.pdf), [Tierney, 1991](https://academicweb.nd.edu/~rwilliam/stats1/appendices/Monty-NYTimes.pdf)

**2. Key facts**

- **High — Date and original question.** The *Parade* column appeared **9 September 1990**. Craig Whitaker’s question described choosing Door 1, a knowledgeable host opening Door 3 to reveal a goat, and an offer of Door 2. Critical exact wording: “the host, who knows what’s behind the doors”; “Is it to your advantage to switch your choice of doors?” The wording is reproduced in Rosenhouse’s scholarly account, pp. 36–37. [Rosenhouse](https://faculty.winthrop.edu/abernathyk/Monty%20Hall%20Problem.pdf)

- **High — Her answer.** Vos Savant replied: “Yes, you should switch.” Under the standard protocol, staying wins **\(1/3\)** and switching wins **\(2/3\)**. [Original answer reproduced by Rosenhouse, p. 37](https://faculty.winthrop.edu/abernathyk/Monty%20Hall%20Problem.pdf); mathematical supporting excerpt: “1/3 if you stick, and 2/3 if you switch”. [Rosenthal, 2008, p. 2 of manuscript](https://probability.ca/jeff/writing/montyfall.pdf)

- **High — Required host behaviour.** The host must deliberately reveal an **unchosen losing door**, preserve the contestant’s first door, and offer the decision on every round. A standard formalization specifies that the host is “careful always to open a door that conceals a goat”. [Rosenhouse, preface](https://api.pageplace.de/preview/DT0400.9780199709908_A35484108/preview-9780199709908_A35484108.pdf)

- **High — Why switching wins.** The initial choice is wrong with probability **\(2/3\)**. Whenever it is wrong, the host’s required goat reveal leaves the prize as the only alternative. Thus switching wins precisely when the original choice was wrong. Supporting numerical result: **\(1/3\)** versus **\(2/3\)**. [Rosenthal, pp. 1–2](https://probability.ca/jeff/writing/montyfall.pdf)

- **High — A subtle assumption about named doors.** If the initial choice hides the prize, the usual symmetric formulation has the host choose randomly between the two goats: “Monty chooses his door randomly”. This makes the familiar posterior probabilities apply after a particular named door is opened. **Always switching still wins \(2/3\) overall without a fair tie-break**, provided the host always follows the goat-reveal-and-offer protocol. [Rosenhouse’s formulation](https://api.pageplace.de/preview/DT0400.9780199709908_A35484108/preview-9780199709908_A35484108.pdf); [Rosenthal’s host-policy analysis](https://probability.ca/jeff/writing/montyfall.pdf)

- **High — A different host produces a different answer.** If an uninformed host randomly opens an unchosen door and it happens to reveal a goat, staying and switching each have probability **\(1/2\)**. Rosenthal’s supporting result is “both 1/2”. Specify the random-opening procedure; merely saying that a goat appeared is insufficient. [Rosenthal, “Monty Fall” discussion](https://probability.ca/jeff/writing/montyfall.pdf)

- **Medium — The 10,000 letters were an estimate.** John Tierney’s **21 July 1991** NYT report says vos Savant “estimates she has received 10,000 letters”, with the great majority disagreeing. Say **“by her estimate”**, not “exactly 10,000 independently counted objections.” [Tierney, original article reproduced at Notre Dame, p. 1](https://academicweb.nd.edu/~rwilliam/stats1/appendices/Monty-NYTimes.pdf)

- **Medium — Nearly 1,000 PhD signatures, not necessarily mathematicians.** Tierney reports “close to 1,000 carried signatures with Ph.D.’s”. He mentions mathematics and science department letterheads, but does not establish that all these writers were mathematicians or held mathematics doctorates. [Tierney, p. 2](https://academicweb.nd.edu/~rwilliam/stats1/appendices/Monty-NYTimes.pdf)

- **Medium — Erdős and the simulation: an attributed recollection.** Andrew Vázsonyi’s 1999 first-person account places Erdős’s visit in **1995**, describes running the program **100,000 times**, and says Erdős was “reluctantly convinced that I was right”. He adds that Ron Graham subsequently supplied an explanation Erdős understood. Present this as **Vázsonyi’s recollection**. [Vázsonyi, *Decision Line*, January 1999, pp. 17–19](https://sites.oxy.edu/lengyel/M372/Vazsonyi2003/vazs30_1.pdf)

- **Medium — The biography supports the story, but not an exact trial count.** Paul Hoffman’s *The Man Who Loved Only Numbers* (1998), p. 239, describes “hundreds of trials”, rather than 100,000. Prefer Vázsonyi for his own program count, while acknowledging that the retellings differ; neither is a preserved simulation log. [Hoffman, p. 239](https://www.nzdr.ru/data/media/biblio/kolxoz/M/MPop/Hoffman%20P.%20The%20man%20who%20loved%20only%20numbers..%20The%20story%20of%20Paul%20Erdos%20%28London%2C%201998%29%28ISBN%200786884061%29%28O%29%28335s%29_MPop_.pdf)

- **High — Actual switching rates depend on the experiment.** Granberg and Brown’s **1995 Study 1**, with **228 University of Missouri students**, reports “only 13%” switching in a one-shot written problem. Their abstract summarizes initial switching as **12%** and says it rose to **55%** across trials. **Use 13% only with the Study 1 population and task attached; use the body’s study-specific result over the abstract’s broad summary.** [Original article text, p. 713](https://www.scribd.com/document/690995400/Granberg-Brown-1995-The-Monty-Hall-Dilemma); [publisher abstract](https://journals.sagepub.com/doi/10.1177/0146167295217006)

**3. Retellings to avoid**

- **High:** “Two doors remain, so it must be fifty-fifty.” That ignores how the host selected the opened door.
- **High:** “Switching is always better whenever someone reveals a goat.” The host’s procedure matters.
- **Medium:** “Exactly 1,000 mathematicians told her she was wrong.” The report concerns approximate numbers of letters bearing PhD signatures.
- **Medium:** “Erdős never understood the explanation.” Vázsonyi says Graham later explained it.
- **High:** “Only 13% of people switch.” That converts one student study into a population statistic.
- **High:** “The real show always followed the puzzle’s rules.” Tierney documents Hall’s discretion over offers. [Tierney, pp. 4–5](https://academicweb.nd.edu/~rwilliam/stats1/appendices/Monty-NYTimes.pdf)

**4. Best hook**

“Three doors. You choose one. A host who knows the answer reveals a goat—and switching doubles your chance of winning.”

**5. Showcase idea**

Show three equally likely prize placements while the contestant initially chooses Door 1:

| Prize location | Staying | Switching |
|---|---|---|
| Door 1 | Win | Lose |
| Door 2 | Lose | Win |
| Door 3 | Lose | Win |

Animate the host’s **knowledge** and compulsory goat reveal. The extension can change the host to an uninformed random opener, producing **\(1/2\)** after a goat happens to appear.

Small source line: **vos Savant, 1990; Granberg & Brown, 1995; Rosenthal, 2008.**

**6. Images**

**None needed.** Draw original doors, goats and prize icons.

**7. Armenian anchor**

**None found.**

**8. Open questions**

- Vos Savant’s original website was inaccessible during checking; the question and answer were checked through scholarly reproductions, not a newly inspected *Parade* scan.
- The letter totals remain estimates, not an independently audited census.
- The Erdős episode is a recollection; its precise simulation count differs between accounts.
- The 12% abstract summary and 13% Study 1 result should not be silently treated as interchangeable.

## T1. The birthday paradox

**1. Verdict on the premise**

**True under the standard model:** with **23 people**, the probability that **at least two share a month-and-day birthday** is slightly above 50%.

This does not require matching birth years, a particular person’s birthday, or exactly one matching pair. [University of Chicago, birthday-problem derivation](https://ds1.datascience.uchicago.edu/10/1/Probability_1_RulesDefinitions.html)

**2. Key facts**

- **High — The event is “any matching pair.”** The event includes groups with multiple pairs or three people sharing a date. Supporting excerpt: “At least two people share a birthday”. [Tufts, *The Birthday Problem*](https://www.cs.tufts.edu/comp/250P/classpages/birthday.html)

- **High — Standard assumptions.** Use **365 possible birthdays**, equal probabilities and independent birthdays. The university text explicitly lists: “365 days in a year”; “All days are equally likely”; “Subjects have independent birthdays”. [University of Chicago, §9.3](https://ds1.datascience.uchicago.edu/10/3/Probability_3_MathVsComputation.html)

- **High — Exact formula.** For \(n\le365\),
  \[
  P_n=1-\prod_{k=0}^{n-1}\frac{365-k}{365}
     =1-\frac{365!}{(365-n)!\,365^n}.
  \]
  Supporting printed equation:
  \[
  \text{P}_n=1-\frac{365\times364\times\ldots\times(365-n+1)}{365^n}.
  \]
  [University of Chicago, §9.1](https://ds1.datascience.uchicago.edu/10/1/Probability_1_RulesDefinitions.html)

- **High — Requested probabilities, independently calculated.** These are evaluations of that exact formula; displayed percentages are rounded to ten decimal places, not simulation estimates. [Supporting formula](https://ds1.datascience.uchicago.edu/10/1/Probability_1_RulesDefinitions.html)

  | People | Probability of at least one shared birthday |
  |---:|---:|
  | 23 | **50.7297234324%** |
  | 30 | **70.6316242719%** |
  | 50 | **97.0373579578%** |
  | 57 | **99.0122459341%** |
  | 70 | **99.9159575965%** |

- **High — Twenty-three is the first group size above 50%.** For **22**, the calculated probability is **47.5695307663%**. Berresford’s Table 1 independently prints the rounded uniform-model rows **“22 — .4757”** and **“23 — .5073”**. [Berresford, 1980, Table 1](https://stat.ethz.ch/education/semesters/as2011/bio/birthday.pdf)

- **High — There are 253 pairs among 23 people.** This is the exact calculation \(\binom{23}{2}=23\times22/2=253\). The Armenian teaching paper discussed below also prints “253”. **Do not multiply 253 by \(1/365\) and call the result the probability of a match**: possible matches overlap. [Minasyan, pp. 44–45](https://mathinschool.aspu.am/index.php/mathinschool/article/download/37/33/70)

- **High — Matching your birthday is a different question.** Among you and 22 other independently sampled people, the probability that someone matches **your** birthday is
  \[
  1-(364/365)^{22}=\mathbf{5.8571325264\%}.
  \]
  Supporting source formula: “\((364/365)^{n-1}\)” for everyone having a birthday different from yours. The percentage is calculated. [Stanford, birthday discussion](https://web.stanford.edu/class/stats60/lectures/11-lecture-coincidences.html)

- **High — Unequal birthday probabilities increase collisions on the same fixed calendar.** For independent draws from a common distribution over 365 dates, the uniform distribution minimizes the probability of a shared birthday. Supporting excerpt: “the probability of a shared birthday is least for the uniform distribution.” This statement does not remove the independence assumption. [Berresford, 1980, p. 286](https://stat.ethz.ch/education/semesters/as2011/bio/birthday.pdf)

- **High — A measured distribution gives a small, specific change.** Berresford used **239,762 New York State live births in 1977**, approximating their empirical daily probabilities with ten probability levels. At **23 people**, Table 1 reports **0.5073 uniform** versus **0.5101 nonuniform**: approximately **50.73% versus 51.01%**, a **0.28 percentage-point** difference. Exact supporting row: “23 | .5073 | .5101”. This is not a universal correction for every population. [Berresford, pp. 287–288](https://stat.ethz.ch/education/semesters/as2011/bio/birthday.pdf)

- **High as a published corrected tally — World Cup check.** **2014: 16/32 squads of 23.** Corrected quote: “16 teams have birthdays and 16 teams don’t.” The earlier 19 was erroneous. [Bellos’s corrected analysis](https://www.theguardian.com/science/alexs-adventures-in-numberland/2014/jun/10/world-cup-birthday-paradox-footballers-born-on-the-same-day)

**3. Retellings to avoid**

- **High:** “In every group of 23, two people share a birthday.” It is a probability, not a guarantee.
- **High:** “There is a 50% chance someone shares your birthday.” That is a different event.
- **High:** “They must have the same birth year.” Only month and day are compared.
- **High:** “The formula is \(253/365\).” That counts expected matching pairs, not the probability of at least one.
- **High:** “Real birthdays are uniform.” The assumption is useful but imperfect.
- **High:** “Half the World Cup squads proves the model.” An illustrative tally is not a controlled test of all its assumptions.

**4. Best hook**

“Twenty-three people. A better-than-even chance that two share a birthday.”

“The surprise is in the pairs: 23 people give you 253 possible matches.”

**5. Showcase idea**

Arrange **23 people** around a circle and rapidly draw their **253 pair connections**. Then animate the complement calculation—everyone having a different birthday—and flip it to **50.7297%** for at least one match.

Extension: show the probability rising to **97.0374% with 50 people**. Use the verified table, not a staged group presented as randomly sampled.

Small source line: **Berresford, 1980; exact 365-day calculation.**

**6. Images**

**None needed.**

**7. Armenian anchor**

**High — A direct Armenian educational connection exists.** **Anzhela Minasyan of Armenian State Pedagogical University** discusses the birthday paradox in *Mathematics at School*, **2024 issue**, published online **2 July 2025**. The Armenian text gives **23 people**, **253 pairs**, and **50.7%**; exact excerpt: “Երբ \(n=23\), ապա համընկնման հավանականությունը լինում է 50,7 %”.

This supports a connection to Armenian mathematics teaching, not an Armenian discovery claim. [Journal record](https://mathinschool.aspu.am/index.php/mathinschool/article/view/37), [article, pp. 44–45](https://mathinschool.aspu.am/index.php/mathinschool/article/download/37/33/70)

**8. Open questions**

- No Armenian birth-date distribution was verified, so do not claim a locally calibrated probability.
- The World Cup tally was checked against the published correction, not independently recalculated here from all original FIFA records.
- Leap-day births and dependent sampling, including twins, require a modified model.

## T5. The chocolate weight-loss hoax

**1. Verdict on the premise**

**The deliberate 2015 hoax is documented. Its claimed weight-loss benefit is not reliable evidence.** Real participants supplied measurements, but the study was deliberately designed and promoted to generate a misleading result.

Accurate wording: **“A deliberately bad chocolate study became diet news—and exposed problems in research, publishing and reporting.”** Avoid treating “fooled millions” as a measured audience outcome. [Columbia Journalism Review, 2015](https://www.cjr.org/analysis/the_history_behind_the_chocolate_hoax.php), [AHCJ critique, 2015](https://healthjournalism.org/blog/2015/06/what-can-reporters-learn-from-the-chocolate-diet-study-hoax/)

**2. Key facts**

- **High — People and purpose.** Science journalist **John Bohannon** collaborated with German documentary filmmakers **Peter Onneken and Diana Löbl**. The paper used **Johannes Bohannon** and the invented **Institute of Diet and Health**. Supporting documentary phrases: “Johannes” and “false first name”; the filmmakers’ involvement is confirmed in Onneken’s interview. [Retraction Watch, 28 May 2015](https://retractionwatch.com/2015/05/28/should-the-chocolate-diet-sting-study-be-retracted-and-why-the-coverage-doesnt-surprise-a-news-watchdog/), [CJR interview](https://www.cjr.org/analysis/the_history_behind_the_chocolate_hoax.php)

- **High — Sixteen participants entered.** Onneken’s interview explicitly refers to “only 16 people in the study”. This reconciles with the later exclusion; it does not mean 16 remained in the analysis. [CJR, interview with Onneken](https://www.cjr.org/analysis/the_history_behind_the_chocolate_hoax.php)

- **High as Bohannon’s reported count — Fifteen analyzed, 18 measurements.** His own account states: “Our study included 18 different measurements … from 15 people. (One subject was dropped.)” The article itself also reports an exclusion. Treat **18** as his reported count, not an independently audited inventory of distinct statistical tests. [Bohannon, io9/Gizmodo, 27 May 2015](https://gizmodo.com/i-fooled-millions-into-thinking-chocolate-helps-weight-1707251800)

- **High as the paper’s documented protocol — Three groups, three weeks.** The groups were low carbohydrate; low carbohydrate plus chocolate; and usual diet. The chocolate prescription was **42 g daily, 81% cocoa**, and reported weight measurements covered **21 days**. Exact supporting entries: “42 grams”, “81%”, “21 days”. These verify the stated protocol, not its scientific adequacy. [Original IAM paper transcription, Methods and Results](https://www.scribd.com/doc/273246483/chocolate-with-high-cocoa-content-as-a-weight-loss-accelerator)

- **High — Journal identity; medium on the disputed publication process.** The paper appeared in ***International Archives of Medicine*, 2015, Vol. 8, No. 55**, originally **DOI 10.3823/1654**. Those identifiers appear on the paper. Bohannon said it bypassed meaningful peer review; the publisher later claimed accidental publication. Retraction Watch reproduced an acceptance solicitation calling it an “outstanding manuscript”. **The publisher’s accident explanation is disputed, not an established resolution.** [Original paper](https://www.scribd.com/doc/273246483/chocolate-with-high-cocoa-content-as-a-weight-loss-accelerator), [contemporaneous correspondence and publisher response](https://retractionwatch.com/2015/05/28/should-the-chocolate-diet-sting-study-be-retracted-and-why-the-coverage-doesnt-surprise-a-news-watchdog/)

- **High — The celebrated 10% needs quotation marks.** The abstract claimed a **10%** advantage with **\(p=0.04\)**. The Results section instead reports body-weight losses of **3.1%** and **3.2%**. Exact entries: “10%”, “p = 0.04”, “3.1 percent”, “3.2 percent”. The latter imply a **0.1 percentage-point** difference; they do not straightforwardly reproduce a 10% advantage. Report the headline as a **claim**, not a verified effect. [Original paper, abstract and “Weight Development”](https://www.scribd.com/doc/273246483/chocolate-with-high-cocoa-content-as-a-weight-loss-accelerator)

- **High for the preserved Irish report; medium for the broader contemporary carrier list — Outlets.** The *Irish Examiner*’s own April 2015 roundup preserves “Scientists say eating chocolate can help you lose weight”. CJR identifies the **Daily Star, German Cosmopolitan, and German/Indian Huffington Post sites**, including the phrase “Cosmopolitan’s German site”. **Bild and Times of India** are also identified in contemporary coverage; CBS states “The German newspaper Bild took the bait”. These are documented examples, not a complete audited list. [Irish Examiner](https://www.irishexaminer.com/lifestyle/arid-20322235.html), [CJR](https://www.cjr.org/analysis/the_history_behind_the_chocolate_hoax.php), [CBS](https://www.cbsnews.com/news/how-the-chocolate-diet-hoax-fooled-millions/)

- **High — His p-hacking explanation and the correct illustrative calculation.** Bohannon’s analogy was: “Think of the measurements as lottery tickets.” Selecting an appealing significant result after examining many outcomes conceals the number of opportunities for a false positive. For **18 independent tests**, each with false-positive probability **0.05**,
  \[
  P(\text{at least one false positive})=1-0.95^{18}
  =\mathbf{60.2785681542\%}.
  \]
  This is a calculated teaching model, **not the verified false-positive probability of his actual correlated analyses**. [Bohannon’s analogy](https://gizmodo.com/i-fooled-millions-into-thinking-chocolate-helps-weight-1707251800), [Gelman’s methodological critique](https://statmodeling.stat.columbia.edu/2015/05/29/i-fooled-millions-into-thinking-chocolate-helps-weight-loss-heres-how/)

- **High — Eighteen measurements need not mean only 18 tests.** Andrew Gelman noted that subgroup comparisons, interactions, exclusions and analysis choices create more opportunities. His exact point: “18 measurements corresponds to a lot more than 18 possible tests!” The lesson extends beyond simply counting measured variables. [Gelman, 29 May 2015](https://statmodeling.stat.columbia.edu/2015/05/29/i-fooled-millions-into-thinking-chocolate-helps-weight-loss-heres-how/)

- **High that the criticism was documented — Ethics and consent were challenged.** Tara Haelle’s AHCJ assessment identifies absent ethics-board oversight and says participants “did not provide fully informed consent”. Onneken’s response acknowledges “we didn’t tell them”, while saying they were informed before publicity. **The disagreement concerns whether the deception was justified; do not present the sting as ethically uncontroversial.** [Haelle, 1 June 2015](https://healthjournalism.org/blog/2015/06/what-can-reporters-learn-from-the-chocolate-diet-study-hoax/), [Onneken’s response](https://www.cjr.org/analysis/the_history_behind_the_chocolate_hoax.php)

- **Low for the numerical reach claim — “Fooled millions” was not measured.** Haelle’s critique notes “little evidence” for that assertion and observes that most major U.S. news outlets ignored the study. Publication, potential audience and demonstrated belief are different quantities. No reliable count of people persuaded was verified. [AHCJ critique](https://healthjournalism.org/blog/2015/06/what-can-reporters-learn-from-the-chocolate-diet-study-hoax/)

- **High as a dated citation analysis — The misinformation outlived the reveal.** A 2023 Retraction Watch analysis identified **eight out of 28 citations** using the paper to support scientific claims. Exact supporting count: “eight out of twenty-eight”. Those eight did not acknowledge its retraction. This is that analysis’s historical snapshot, not a current citation total. [Retraction Watch, 27 December 2023](https://retractionwatch.com/2023/12/27/a-closer-look-at-the-chocolate-with-high-cocoa-content-hoax/)

**3. Retellings to avoid**

- **High:** “The researchers invented all the participants and data.” The documented deception involved real participants and deliberately unsound inference.
- **High:** “Sixteen participants were analyzed.” Bohannon reports **15 after one exclusion**.
- **High:** “Chocolate was proved ineffective.” A failed or manipulated study cannot establish either benefit or absence of benefit.
- **High:** “Eighteen outcomes guarantees a false positive.” The independent-test illustration gives approximately **60.28%**, not certainty; the actual analysis structure matters.
- **High:** “\(p=0.05\) means a 5% probability the finding is random.” Bohannon’s explanation itself slips here. The ASA states that p-values do not measure “the probability that the studied hypothesis is true”. [Wasserstein and Lazar, ASA statement, 2016](https://amstat.tandfonline.com/doi/pdf/10.1080/00031305.2016.1154108)
- **High — Daily Mail nuance:** The screenshot initially used in the exposé concerned an unrelated story. However, its **Australian site did reference the hoax study**. Neither “that screenshot proves it” nor “the Daily Mail never covered it” is accurate. Supporting description: “Australian website”. [Observer’s reconstruction and corrections](https://observer.com/2015/06/john-bohannons-chocolate-hoax-and-the-spread-of-misinformation/)
- **High:** “This proves all nutrition research or all journalism is worthless.” The sting cannot support those sweeping conclusions.

**4. Best hook**

“A chocolate weight-loss study made the news. Its creators had deliberately designed it to mislead.”

“The trick was to measure many things—and promote the result that made the best headline.”

**5. Showcase idea**

Display **18 outcome tiles**. In a clearly labelled **independent-null-test illustration**, each has a **5%** false-positive chance. Animate repeated runs and show the calculated chance of at least one positive: **60.28%**.

Then spotlight a selected tile becoming a headline while the other tiles disappear. Keep **“illustration—not reconstructed study data”** visible.

Small source line: **Bohannon, 2015; Gelman, 2015; ASA, 2016.**

**6. Images**

**High — Checked on Commons:**

- **[File:Dark chocolate.jpg](https://commons.wikimedia.org/wiki/File:Dark_chocolate.jpg)** — **jules:stonesoup**, **CC BY 2.0**. Licence panel: “Attribution 2.0 Generic”.
- **[File:Chocolate with high Cocoa content as a weight-loss accelerator.pdf](https://commons.wikimedia.org/wiki/File:Chocolate_with_high_Cocoa_content_as_a_weight-loss_accelerator.pdf)** — **CC BY 3.0**. Licence panel: “Attribution 3.0 Unported”. A cover-page crop could establish the historical artifact; visibly label it **“HOAX / RETRACTED”**.

**7. Armenian anchor**

**None found.**

**8. Open questions**

- The exact inventory of 18 measurements and the complete set of analyses were not independently reconstructed from raw participant data.
- The reported 10% advantage is not reproducible from the two aggregate weight-loss percentages alone.
- Acceptance, removal and formal retraction accounts contain contradictory dates and explanations. The original DOI has also been reported as resolving to unrelated content; use the preserved paper alongside the retraction history.
- No verified number exists here for readers who saw, believed or acted on the claim.