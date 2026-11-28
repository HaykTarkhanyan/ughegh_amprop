# «Ուղեղ Ամպրոպ» — Fact sheets for five videos

Checked **28 November 2026**. **High** means strong documentary or technical support; **medium** means qualified evidence or an unreproduced measurement; **low** means unverified. Quotations below are short, exact excerpts or numerical entries. Calculations made for this fact-check are labelled **derived**.

## I1. GPS needs Einstein

### 1. Verdict on the premise

**High — true, with an important correction to the usual explanation.** GPS accounts for special and general relativity. The familiar **−7, +45, net +38 microseconds/day** figures are useful approximations.

However, **“your position would drift by 10 km every day” is not a generally valid prediction**. Multiplying the clock drift by light speed gives a range-equivalent error; a receiver also estimates its own clock offset. [Ashby, 2003](https://link.springer.com/article/10.12942/lrr-2003-1), [Misra, 2023](https://www.gpsworld.com/inside-the-box-gps-and-relativity/).

Accurate wording: **“GPS must correct relativistic clock effects to deliver accurate time and positioning.”**

### 2. Key facts

- **High — motion slows satellite clocks.** For nominal GPS conditions, special relativity contributes approximately **−7 μs/day**, relative to Earth-based reference clocks. Exact supporting number: **“7 microseconds”**. [NIST, *Putting Einstein to the Test*, 2025](https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test).

- **High — gravitational potential produces the larger, opposite effect.** The gravitational contribution is approximately **+45 μs/day**. Quote: **“45 microseconds per day”**. Explain this through the difference in gravitational potential between orbit and Earth’s surface. [NIST, 2025](https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test).

- **High — the combined nominal effect makes an unadjusted satellite clock run faster.** NIST gives **“38 microseconds per day faster”**. These are rounded educational figures, not an exact breakdown applicable to every satellite at every instant. [NIST, 2025](https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test).

- **High — the classic frequency offset is verified.** Ashby’s equations 35–36 give the fractional adjustment **−4.4647 × 10⁻¹⁰**, setting the proper frequency to **10.22999999543 MHz**, rather than **10.23 MHz**. Exact equation entry: **“10.229999995 43MHz”**. **Derived:** that fractional rate corresponds to **38.575008 μs/day**, explaining the more precise shorthand “about 38.6.” [Ashby, 2003, §5](https://link.springer.com/article/10.12942/lrr-2003-1).

- **High — “every clock is factory-adjusted this way” is too broad.** Ashby describes rubidium clocks whose corrections are determined after launch and represented in broadcast clock parameters. Supporting excerpt: **“not to apply such offsets to Rubidium clocks”**. This is a documented implementation distinction, not a claim that rubidium clocks escape relativity. [Ashby, 2003, §5](https://link.springer.com/article/10.12942/lrr-2003-1).

- **High — receivers solve for time as well as position.** The basic solution uses measurements from **four satellites** to determine **three position coordinates and one receiver clock offset**. Supporting excerpt: **“the local clock bias”**; see the accompanying explanation and pseudorange equations. [Ashby, 2003, §6](https://link.springer.com/article/10.12942/lrr-2003-1).

- **High — approximately 11 km/day is a range-equivalent calculation.** GPS’s specification gives light speed as **“2.99792458 x 10⁸”** metres/second. **Derived:** \(c × 38\,μs = 11.392113404\) km; using Ashby’s more precise rate gives approximately **11.56 km/day**. Neither calculation alone establishes the receiver’s position error. [IS-GPS-200N, 2022, §20.3.3.3.3.1](https://www.gps.gov/sites/default/files/2025-07/IS-GPS-200N.pdf).

- **High — a common clock error can be absorbed into the receiver’s clock estimate.** In Misra’s explicitly idealised case of identical circular satellite orbits, the shared relativistic bias changes the estimated clock offset. Quote: **“The position estimate would be unaffected.”** This result concerns that common component, not removal of every relativistic correction. [Pratap Misra, 2023](https://www.gpsworld.com/inside-the-box-gps-and-relativity/).

- **High — real orbits need an additional periodic correction.** Orbital eccentricity makes the clock effect vary. The specification says **“the user's equipment must determine the requisite relativistic correction.”** ESA illustrates one omission scenario with range errors up to **“13”** metres and vertical errors over **“20”** metres; these are example results, not universal maxima. [IS-GPS-200N, §20.3.3.3.3.1](https://www.gps.gov/sites/default/files/2025-07/IS-GPS-200N.pdf), [ESA Navipedia, Sanz Subirana, Juan Zornoza and Hernández-Pajares, 2011](https://gssc.esa.int/navipedia/index.php/Relativistic_Clock_Correction).

### 3. Retellings to avoid

- **“Your location moves 10 km farther away every day.”** Ohio State’s popular explainer does say **“about 10 kilometers each day.”** Misra’s receiver-level analysis distinguishes common clock bias from position error. **Trust Misra for this distinction:** his model includes the clock unknown that the simple light-speed multiplication omits. [Richard Pogge, Ohio State](https://www.astronomy.ohio-state.edu/pogge.1/Ast162/Unit5/gps.html), [Misra, 2023](https://www.gpsworld.com/inside-the-box-gps-and-relativity/).
- **“GPS universally fails after two minutes.” — Low as a universal claim.** Pogge says **“false after only 2 minutes”**, but supplies no generally applicable receiver-failure model. Do not use a countdown to failure. [Ohio State explainer](https://www.astronomy.ohio-state.edu/pogge.1/Ast162/Unit5/gps.html).
- **“The factory offset fixes all relativity.”** It does not replace the eccentricity correction.
- **“GPS satellites experience no gravity.”** The gravitational-potential difference is central to the explanation.

### 4. Best hook

**“GPS clocks need an Einstein correction. Without adjustment, satellite time would gain about 38 microseconds a day.”**

*Small source line: Neil Ashby, 2003; Pratap Misra, 2023; NIST, 2025.*

### 5. Showcase idea

Compare an Earth reference clock with an unadjusted orbital clock. Animate contributions of **−7**, **+45**, and **net +38 μs after one day**, visibly labelled **rounded**.

For the extension, reveal the frequency adjustment: **10.22999999543 MHz → nominal Earth-reference rate 10.23 MHz**. Label this a relativistic rate comparison; instantaneous received radio frequencies also have Doppler shifts. Avoid animating a map marker drifting 10 km.

### 6. Images

**High — Commons licensing checked:** [**File:GPS Satellite NASA art-iif.jpg**](https://commons.wikimedia.org/wiki/File:GPS_Satellite_NASA_art-iif.jpg) — NASA artist’s conception; **public domain, PD-NASA**. Licence statement includes **“public domain in the United States”**. Credit NASA and identify it as an illustration.

### 7. Armenian anchor

**High — a solid local satellite-geodesy connection.** Armenia’s Cadastre Committee documents its national reference-station network:

> “In 2013, A network of reference stations operating in real time was created for the entire territory of the Republic of Armenia”

This supports a local surveying connection, without implying Armenia invented the underlying clock correction. [Cadastre Committee, *Geodesy*, 2026](https://cadastre.gov.am/en/articles/%D5%A3%D5%A5%D5%B8%D5%A4%D5%A5%D5%A6%D5%AB%D5%A1/geodesy).

### 8. Open questions

A specific uncorrected receiver’s position error or failure time requires a defined experiment: which corrections disappear, what clock updates remain, satellite geometry, and receiver processing. **No universal km/day position trajectory was verified.**

## I3. A torn QR code still works

### 1. Verdict on the premise

**High — sometimes true.** QR codes contain error-correction information that can reconstruct damaged encoded data. Whether a particular tear remains readable depends on its location, the correction level, and whether the scanner can locate and sample the symbol. [DENSO WAVE, error correction](https://www.qrcode.com/en/about/error_correction.html).

Accurate wording: **“A damaged QR code can still work because it carries information for repairing errors.”**

### 2. Key facts

- **High — QR Code was released in 1994 by the organisation now known as DENSO WAVE, then part of DENSO.** Its history identifies **“Masahiro Hara in charge”** of development and states **“In 1994”** for the release. Credit **Hara and his team**, rather than a lone inventor working outside DENSO. [DENSO WAVE history](https://www.qrcode.com/en/history/).

- **High — QR means “Quick Response.”** DENSO’s exact wording is **“quick response”**, referring to the emphasis on fast reading. [DENSO WAVE history](https://www.qrcode.com/en/history/).

- **High — the four familiar recovery percentages are approximate.** ISO/IEC 18004:2015, Table 8, gives these exact level/percentage entries: **“L 7”**, **“M 15”**, **“Q 25”**, **“H 30”**. The column is explicitly marked approximate. [ISO/IEC 18004:2015, §7.5.1, Table 8 — copy of the standard](https://nuintun.github.io/qrcode/spec/ISO-IEC-18004-2015.pdf).

- **High — these percentages concern codewords, not arbitrary image area.** DENSO specifies **“total codewords”** and says one codeword is **“equal to 8 bits.”** Damaging a single bit can therefore make its whole codeword erroneous. [DENSO WAVE, error correction](https://www.qrcode.com/en/about/error_correction.html).

- **High — QR uses Reed–Solomon coding.** DENSO describes **“adding a Reed-Solomon Code”** to the original data. It adds calculated redundancy; it does not simply print several complete copies of the message. [DENSO WAVE, error correction](https://www.qrcode.com/en/about/error_correction.html).

- **High — the distribution of damage matters.** Larger symbols can divide their codewords into multiple correction blocks, with correction calculated **“for each block.”** Concentrating errors in one block can exceed its capacity even when the overall damaged fraction looks small. [ISO/IEC 18004:2015, §§7.5.2–7.6](https://nuintun.github.io/qrcode/spec/ISO-IEC-18004-2015.pdf).

- **High — ordinary QR symbols have three large finder patterns.** ISO places them at **“three corners.”** Their central black/white run-width ratio is **“1:1:3:1:1”**; this helps locate and orient the symbol. These are functional patterns, not decorative squares. [ISO/IEC 18004:2015, introduction and §6.3.3](https://nuintun.github.io/qrcode/spec/ISO-IEC-18004-2015.pdf), [DENSO history](https://www.qrcode.com/en/history/).

- **High — the blank border also matters.** Ordinary QR Code requires a **“four-module wide margin”** on every side. This is the quiet zone; a module is one grid cell. [DENSO WAVE, determining the code area](https://www.qrcode.com/en/howto/code.html).

- **High — logos can work by consuming correction capacity.** Covering encoded modules makes the decoder repair deliberately introduced damage. DENSO warns that the **“error correction function is invoked”**, potentially leaving little tolerance for further dirt or damage. There is no universally empty, logo-safe centre. [DENSO WAVE FAQ](https://www.qrcode.com/en/faq.html).

- **High — a precise demonstration is possible.** ISO Table 9 lists Version 1-H as **“(26,9,8)”**: **26 total codewords, 9 data codewords, correction capacity of 8 erroneous codewords**. The remaining **17** are error-correction codewords. This example concerns codeword substitutions with the symbol otherwise readable. [ISO/IEC 18004:2015, Table 9 and its legend](https://nuintun.github.io/qrcode/spec/ISO-IEC-18004-2015.pdf).

### 3. Retellings to avoid

- **“You can remove any 30% of the picture.”** The percentage is not a guaranteed spatial allowance. Even a Japan Academy explanatory citation uses **“30% of the area”**; for scripting, prefer the more precise ISO/DENSO codeword definition. [Japan Academy citation](https://www.japan-acad.go.jp/pdf/youshi/113en/hara_masahiro.pdf).
- **“QR stores the same message in each corner.”** The large corner squares locate the symbol; Reed–Solomon supplies the data-recovery mechanism.
- **“A central logo is free space.”** It can use up the correction budget.
- **“Level H guarantees that every damaged code scans.”** Optical recognition and correction capacity are separate requirements.

### 4. Best hook

**“A damaged QR code can still work. It carries information for repairing its own errors.”**

*Small source line: Masahiro Hara and DENSO team, 1994; ISO/IEC 18004:2015, Tables 8–9.*

### 5. Showcase idea

Zoom from a QR grid into a schematic row of **26 codeword tiles**, each representing **8 bits**. Mark **9 data tiles** and **17 correction tiles**. Corrupt **8 codewords**, then reconstruct them.

Label the example **“Version 1-H — codewords, not percentage of picture.”** Extend the idea by adding a logo as deliberate damage that uses some of this capacity. Keep the finder patterns and quiet zone intact.

### 6. Images

**High — Commons licensing checked:** [**File:QR Code Damaged.jpg**](https://commons.wikimedia.org/wiki/File:QR_Code_Damaged.jpg) — **CC0 1.0**, with the exact dedication **“CC0 1.0 Universal Public Domain Dedication.”** Commons credits derivative work to Bobmath, based on brdall’s QR image. Useful as a photograph of physical damage.

### 7. Armenian anchor

**High — Armenian tax-document verification.** The Tax Code amendment adopted **12 June 2024**, effective **1 January 2026**, explicitly defines QR codes for authenticating printed/downloaded tax documents.

Supporting excerpts: **“QR գծիկավոր կոդ՝ մեքենայական ընթերցվող պատկեր (պիտակ)”** and **“հարկային մարմնի կողմից վավերացված լինելու հավաստումը”**. This is a documented local application, not evidence about how much damage those particular codes tolerate. [ARLIS, Law ՀՕ-292-Ն, articles 1 and 5](https://www.arlis.am/hy/acts/194974).

### 8. Open questions

No universal safe logo size or tear-area percentage was verified. The detailed standard inspected here is **2015**; ISO’s catalogue identifies the newer **2024, Edition 4** publication, whose full text was not inspected. [ISO catalogue](https://www.iso.org/standard/83389.html).

## I12. How sites store your password without knowing it

### 1. Verdict on the premise

**High — true if “without knowing it” means “without retaining the original password.”** A correctly designed service stores a salted password hash and verifies later submissions against it.

An ordinary server-side implementation still receives the submitted password during login. Hashing does not make the service incapable of observing it. [NIST SP 800-63B-4, §3.1.1.2](https://pages.nist.gov/800-63-4/sp800-63b.html#passwordver).

Accurate wording: **“A website can check your password without keeping a recoverable copy.”**

### 2. Key facts

- **High — hashing and encryption have different purposes.** Encryption is reversible with the appropriate key. A password hash has no corresponding decryption operation; attackers can nevertheless test guesses. OWASP calls hashing a **“one-way function”** and encryption a **“two-way function.”** [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

- **High — verification means computing and comparing.** The submitted password is processed using the stored salt and settings, then compared with the stored result. The original bcrypt paper describes a login program that **“hashes the password and compares the result”**. [Niels Provos and David Mazières, 1999, introduction](https://www.usenix.org/legacy/events/usenix99/provos/provos.pdf).

- **High — a salt is different for each password record.** Its purpose includes preventing identical passwords from producing identical stored results and frustrating reusable precomputed lookup tables. OWASP’s definition is **“unique, randomly generated string.”** A salt does not prevent testing a guessed password. [OWASP, “Salting”](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#salting).

- **High — salts are stored, not treated as secret encryption keys.** NIST requires a salt of **“at least 32 bits”**, chosen to minimise collisions, and storage of both salt and hash. Its hashing scheme takes the password, salt and **“cost factor”** as inputs. The 32-bit figure is a minimum requirement, not a recommendation to shorten modern library-generated salts. [NIST SP 800-63B-4, §3.1.1.2](https://pages.nist.gov/800-63-4/sp800-63b.html#passwordver).

- **High — purpose-built password functions make guesses expensive.** Bcrypt has **“adaptable cost.”** Argon2 is a **“memory-hard function”**; scrypt is **“based on memory-hard functions.”** Their costs and parameters matter: merely naming an algorithm does not establish its resistance. [Provos and Mazières, 1999](https://www.usenix.org/legacy/events/usenix99/provos/provos.pdf), [Biryukov et al., RFC 9106, 2021](https://www.rfc-editor.org/rfc/rfc9106.html), [Percival and Josefsson, RFC 7914, 2016](https://www.rfc-editor.org/rfc/rfc7914.html).

- **High — fast general-purpose hashes alone are inappropriate.** OWASP states: **“Fast hashing algorithms such as SHA‑256 are not suitable for password storage”**. Its current guidance prefers Argon2id, offers scrypt as an alternative, and reserves bcrypt principally for legacy systems. This is OWASP guidance; do not attribute that exact algorithm ranking to NIST. [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

- **High — current NIST guidance is more specific than “add symbols.”** SP 800-63B-4, finalised in **July 2025**, requires at least **“15 characters”** for single-factor passwords, permits **“eight characters”** when part of MFA, requires a **“blocklist”** and **“rate-limiting mechanism”**, and rejects mandatory character-mixture rules. These requirements have a defined NIST scope; they are not a description of every website. [NIST, §§3.1.1.2 and 3.2.2](https://pages.nist.gov/800-63-4/sp800-63b.html).

- **High — RockYou exposed approximately 32 million plaintext passwords in December 2009.** Imperva’s contemporaneous report supplies **“December 2009”** and **“32 million passwords.”** The FTC complaint separately documents storage in **“clear text.”** This was not the cracking of 32 million securely stored hashes. [Imperva report, university-hosted copy, p.1](https://www.cs.unh.edu/~it666/reading_list/AAA/consumer_password_worst_practices.pdf), [FTC complaint, 2012, paragraphs 13–17](https://www.ftc.gov/sites/default/files/documents/cases/2012/03/120327rockyoucmpt.pdf).

- **High — “123456” ranked first in that dataset.** Imperva’s “Password Popularity – Top 20” table gives the exact row **“1 123456 290731”**: **290,731 accounts**. This establishes its rank in RockYou’s analysed corpus, not its present worldwide rank. [Imperva, p.4](https://www.cs.unh.edu/~it666/reading_list/AAA/consumer_password_worst_practices.pdf).

- **High — offline cracking differs from guessing through a login page.** After stealing hashes, an attacker can test candidates locally with **“no further access”** to the service. Website login throttling therefore does not throttle those local computations. [Provos and Mazières, 1999, §2](https://www.usenix.org/legacy/events/usenix99/provos/provos.pdf).

- **Medium — Hive’s current table is conditional, not a universal stopwatch.** Its **2026** model uses bcrypt **cost 10**, **16 RTX 5090 GPUs**, and measured aggregate throughput of **“138,675 H/s.”** It gives **“132 years”** for an eight-character random password using its full character set, under its **“worst-case maximum time”** model. These are vendor-reported measurements and extrapolations. [Corey Neskey, Hive Systems, 14 July 2026](https://www.hivesystems.com/blog/are-your-passwords-in-the-green).

- **Medium — common guesses can bypass that exhaustive-search timescale.** Hive reports a wordlist-and-rules test against `password`, on a single rented RTX 5090, taking approximately the same time as its example that cracked in **“about three seconds.”** This is a specific test, not the time required to crack every common password on every system. [Hive Systems, 2026, dictionary/reuse discussion](https://www.hivesystems.com/blog/are-your-passwords-in-the-green).

### 3. Retellings to avoid

- **“A hash can never reveal a password.”** Guessing and checking can reveal weak passwords; there is simply no ordinary decryption step.
- **“The salt must be secret.”** Salt and hash are normally stored together. A separate secret sometimes added by a service is a different mechanism.
- **“SHA-256 is enough because 256 sounds large.”** Fast evaluation is precisely the problem for password guessing.
- **“Every eight-character password cracks instantly.”** Algorithm, cost, hardware, randomness and attack method change the answer.
- **“RockYou’s passwords were all cracked.”** They were stored in plaintext.

### 4. Best hook

**“Your password needn’t be in the database. A website can keep a salted hash and check what you type against it.”**

*Small source line: Provos & Mazières, 1999; Imperva ADC, 2010; NIST, 2025; Corey Neskey/Hive Systems, 2026.*

### 5. Showcase idea

Show two fictional accounts choosing the same password. Different salts produce different stored hashes. On login, replay the calculation with the account’s original salt and show a match.

For the extension, let an attacker try candidate passwords through the same calculation. Turn up the work-cost dial: each attempt becomes more expensive. Mark abbreviated hashes as **schematic**, and avoid a universal cracking countdown.

### 6. Images

**None needed.** A custom password → salt/settings → hash diagram explains the mechanism more clearly than a stock photograph.

### 7. Armenian anchor

**None found** that adds a documented, topic-specific connection.

### 8. Open questions

- No single cracking time for `123456`, or for “a common password,” is meaningful without the storage scheme and attack setup.
- Hive’s reported benchmarks were not independently reproduced here.
- A canonical exact RockYou corpus row count was not established; use **approximately 32 million**, rather than an unsupported exact total.

## CX42. Why a computer gets 0.1 + 0.2 wrong

### 1. Verdict on the premise

**High — the demonstration is real, but “wrong” needs qualification.** In ordinary IEEE 754 binary64 arithmetic, `0.1 + 0.2` commonly displays as `0.30000000000000004`. The inputs have already been approximated, and the addition is rounded according to the specified arithmetic. It is not evidence that computers universally cannot calculate decimal sums. [Python documentation](https://docs.python.org/3/tutorial/floatingpoint.html), [ECMAScript Number specification](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-number-type).

Accurate wording: **“Binary floating point cannot store one tenth exactly.”**

### 2. Key facts

- **High — binary64 has finite precision.** Its layout has a **“52-bit fraction”**, an **“11-bit biased exponent”**, and a **“1-bit sign.”** Normal values have **“53 bits of precision”**, counting the implicit leading bit. [Oracle Numerical Computation Guide, §2.2.3](https://docs.oracle.com/cd/E60778_01/html/E60763/z4000ac019878.html).

- **High — one tenth repeats in binary.** Python’s documentation gives **“0.0001100110011001100110011001100110011001100110011...”**. Like one third in decimal, it cannot be written exactly with a finite number of digits in that base. [Python, “Floating-Point Arithmetic”](https://docs.python.org/3/tutorial/floatingpoint.html).

- **High — the exact binary64 value stored for `0.1` is verified.** Python gives the fraction **“3602879701896397 / 2 ** 55”** and the exact decimal value **“0.1000000000000000055511151231257827021181583404541015625”**. It is slightly greater than one tenth. [Python documentation](https://docs.python.org/3/tutorial/floatingpoint.html).

- **High — the familiar addition result is reproducible.** MDN’s JavaScript example outputs **“0.30000000000000004”** for `0.1 + 0.2`. That result was also reproduced during this fact-check. Display formatting varies between languages and output modes. [MDN JavaScript language overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview).

- **High — that printed result is itself a shortened decimal representation.** **Derived by exact decoding of binary64:** its full value is  
  `0.3000000000000000444089209850062616169452667236328125`.  
  The applicable rounding rule chooses the value **“closest in value”**, using an **“even significand”** for a tie. [ECMAScript, §6.1.6.1](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-number-type).

- **High — exact decimal arithmetic is an available alternative.** Python explicitly recommends its decimal module for **“exact decimal representation.”** Construct decimal values from decimal strings, rather than first importing the already approximated binary floats. [Python floating-point documentation](https://docs.python.org/3/tutorial/floatingpoint.html), [Python Decimal documentation](https://docs.python.org/3/library/decimal.html).

- **High — the Patriot incident occurred on 25 February 1991.** GAO reports failure to track and intercept a Scud at Dhahran, which subsequently hit barracks, **“killing 28 Americans.”** GAO says the battery had operated for **“over 100 hours.”** [GAO/IMTEC-92-26, 1992, printed p.1](https://www.gao.gov/assets/imtec-92-26.pdf).

- **High — Patriot’s mechanism was not modern binary64 addition of `0.1`.** Its clock counted **“tenths of seconds.”** Robert Skeel’s investigation identifies a **“fixed-point 24-bit representation of 0.1 in base 2”** and inconsistent conversions of timestamps, after which **“the error no longer cancelled.”** [GAO, printed pp.5–6](https://www.gao.gov/assets/imtec-92-26.pdf), [Skeel, *SIAM News*, July 1992](https://w3.ual.es/~plopez/docencia/itis/patriot.htm).

- **High — GAO’s exact 100-hour table entries are 0.3433 seconds and 687 metres.** Appendix II’s **100-hour** row lists time inaccuracy **“.3433”** and approximate range-gate shift **“687.”** The latter is a calculated tracking-window displacement, not a measured miss distance between two missiles. [GAO, Appendix II, printed p.15](https://www.gao.gov/assets/imtec-92-26.pdf).

- **High — the corrected software arrived the following day.** GAO gives **“February 26,1991”** for arrival in Dhahran. The report also states that Alpha Battery did not engage the Scud. [GAO, printed pp.1 and 9](https://www.gao.gov/assets/imtec-92-26.pdf).

- **High for the mechanism; medium for reconstructed historical figures — Vancouver’s index accumulated truncation bias.** A peer-reviewed account gives **“1982”**, an initial **“1000”**, **“22 months”**, and truncation to **“three decimal places.”** This was repeated downward truncation of an index, not specifically the binary64 `0.1 + 0.2` phenomenon. [Guo and Li, 2012, p.45](https://www.sav.sk/journals/uploads/0912140305-gu-li.pdf).

- **Medium — the best-supported Vancouver correction is 524.811 → 1098.892 in November 1983.** Wayne Lilley’s contemporary *Toronto Star* report, preserved in TUM’s source collection, says **“1098.892, mysteriously up 574.081 points”**. **Derived:** 1098.892 − 574.081 = **524.811**. Guo and Li independently repeat **“524.811”** and **“1098.892.”** The newspaper explains calculation to **“four decimal places but only printed to three.”** [Lilley, 29 November 1983, TUM transcription](https://www5.in.tum.de/~huckle/Vancouv.pdf), [Guo and Li, 2012](https://www.sav.sk/journals/uploads/0912140305-gu-li.pdf).

### 3. Retellings to avoid

- **“The Patriot clock was wrong by 0.1 second.”** The tenth-second quantity was the time unit/conversion factor; GAO’s 100-hour accumulated error was **0.3433 seconds**.
- **“A Patriot interceptor missed by 687 metres.”** Alpha Battery did not engage; 687 m is GAO’s approximate range-gate displacement.
- **Do not silently interchange Patriot distance estimates.** An IFIP textbook discussion gives **“573 meters”** using **“1676 meters per second”**, while GAO’s table gives 687 m. Prefer GAO when quoting its table; “over half a kilometre” avoids presenting either model estimate as an observed miss distance. [IFIP, *Accuracy and Reliability in Scientific Computing*, chapter 1](https://www.nsc.liu.se/wg25/book/ch1/).
- **Vancouver figures are frequently corrupted in retelling.** Cambridge lecture slides give **“574.081”** as the starting figure and **“1098.882”** as the corrected figure. The contemporary newspaper identifies 574.081 as the **increase**, and gives 1098.892 as the corrected level. Trust the contemporary report plus the corroborating journal account. [Cambridge slides, p.6](https://www.cl.cam.ac.uk/~jrh13/slides/bpr-14jul08/slides.pdf).
- **“The stock market lost half its actual value because computers cannot add decimals.”** The documented problem concerned the calculated index and repeated truncation.

### 4. Best hook

**“Your computer rounds 0.1 before you even add it. That is how 0.1 + 0.2 can print 0.30000000000000004.”**

*Small source line: IEEE 754, 2019; GAO, 1992; Robert Skeel, 1992. For the Vancouver scene: Wayne Lilley, 1983.*

### 5. Showcase idea

Show `1/3 = 0.333…` in decimal, then switch bases to reveal the repeating binary expansion of `0.1`. Snap it onto the nearest available binary64 value, exposing the exact decimal expansion from the fact above.

Perform the addition and reveal the shortened output. For the extension, use Patriot’s **100 hours → 0.3433 seconds** as a separate historical example of inadequate numerical handling. Do not depict Patriot as running the same binary64 calculation.

### 6. Images

**High — Commons licensing checked:** [**File:IEEE 754 Double Floating Point Format.svg**](https://commons.wikimedia.org/wiki/File:IEEE_754_Double_Floating_Point_Format.svg) — Codekaizen; **CC BY-SA 4.0** is among the offered licences. Commons explicitly lists **“4.0 International”** and permits choosing an offered licence. Credit the author, link the licence, and identify adaptations.

### 7. Armenian anchor

**None found** that is sufficiently specific and documented.

### 8. Open questions

The original Vancouver newspaper scan and exchange calculation records were not inspected. Its precise figures therefore remain **medium confidence**, supported by a university-hosted transcription and a peer-reviewed account. Omit claims about exact monthly losses or financial damages unless separately sourced.

## Z1. CAPTCHAs that ask for traffic lights

### 1. Verdict on the premise

**High — image-selection reCAPTCHAs are real, and their history includes useful human transcription and image labelling. Low/unverified — the specific assertion that traffic-light answers train Google/Waymo self-driving cars.**

Google historically confirmed building machine-learning datasets. That does not identify a particular downstream model, and a reported 2026 company statement says challenge responses are no longer used for model training. Keep **historical practice, current company claims, and speculation** distinct. [Archived Google page, 2017](https://web.archive.org/web/20170523231011/https://www.google.com/recaptcha/intro/), [Google Spain statement reported by *El País*, 2026](https://english.elpais.com/technology/2026-07-22/captchas-has-google-got-us-training-its-ai-without-knowing-it.html).

### 2. Key facts

- **High — 2000 and 2003 refer to different milestones.** Carnegie Mellon dates development and coining of the term to **“2000.”** Its institutional account identifies a team including Manuel Blum and Luis von Ahn. [CMU, Byron Spice, 2014](https://www.cmu.edu/piper/news/archives/2014/january/musical-captchas.html).

- **High — the landmark formal paper appeared in 2003 and had four authors.** Its author line names **“Luis von Ahn”**, **“Manuel Blum”**, **“Nicholas J. Hopper”**, and **“John Langford.”** The authors’ publication list identifies *CAPTCHA: Using Hard AI Problems for Security*, EUROCRYPT **2003**. [Original paper](https://www.cs.cmu.edu/~hopper/captcha.pdf), [von Ahn’s publication list](https://www.cs.cmu.edu/~biglou/papers.html).

- **High — reCAPTCHA followed in 2007.** CMU says **“In 2007, von Ahn introduced reCAPTCHAs”**, using the tests to help digitise books and periodicals. Do not date reCAPTCHA’s launch to the original CAPTCHA paper. [CMU, 2014](https://www.cmu.edu/piper/news/archives/2014/january/musical-captchas.html).

- **High — the original text system paired an unknown word with a known control.** The 2008 paper specifies **“two words”**, a **“control word”**, and an **“unknown word.”** Correctly answering the control supplied evidence that the participant could also transcribe the unknown word; agreement across users supported transcription. [von Ahn, Maurer, McMillen, Abraham and Blum, *Science*, 2008, p.1466](https://www.cs.cmu.edu/~biglou/reCAPTCHA_Science.pdf).

- **High — the New York Times connection is documented, with a measured sample.** The 2008 study tested **50 articles**, containing **24,080 words**, from the **“New York Times archive.”** It reported word accuracy **“99.1%”** after its processing procedure. This is a result for that evaluated sample, not proof that all historical reCAPTCHA transcriptions had identical accuracy. [Original paper, pp.1466–1467](https://www.cs.cmu.edu/~biglou/reCAPTCHA_Science.pdf).

- **High — Google announced the acquisition on 16 September 2009.** The announcement says **“Google has acquired reCAPTCHA”** and identifies **“Google Books”** and **“Google News Archive Search”** as applications for improving book/newspaper scanning. [Luis von Ahn and Will Cathcart, Google announcement](https://googleblog.blogspot.com/2009/09/teaching-computers-to-read-google.html).

- **High — 2012 Street View experiment.** Google: **“characters from Street View images are appearing in CAPTCHAs.”** [Google statement via TechCrunch, 29 March 2012](https://techcrunch.com/2012/03/29/google-now-using-recaptcha-to-decode-street-view-addresses/).

- **High — the 2014 checkbox was backed by risk analysis.** Google’s **3 December 2014** announcement describes assessment of a user’s **“entire engagement with the CAPTCHA”** and optional challenges involving **“image labeling.”** The examples included cats and turkeys; image challenges were not exclusively road scenes. [Vinay Shet, Google Security Blog](https://security.googleblog.com/2014/12/are-you-robot-introducing-no-captcha.html).

- **High — distorted text was already insufficient by itself.** The same announcement reports **“99.8% accuracy”** for Google’s AI on its hardest distorted-text variant. This is a particular research result, not a claim that every CAPTCHA system was defeated with that success rate. [Google, 2014](https://security.googleblog.com/2014/12/are-you-robot-introducing-no-captcha.html).

- **High — Google explicitly acknowledged machine-learning datasets historically.** Its archived **23 May 2017** page states: **“High quality human labelled images are compiled into datasets that can be used to train Machine Learning systems.”** This supports general image-labelling use. It does **not** name self-driving cars or Waymo. [Archived official Google page](https://web.archive.org/web/20170523231011/https://www.google.com/recaptcha/intro/).

- **High — reCAPTCHA v3 introduced scoring without challenge puzzles in 2018.** The launch announcement is dated **29 October 2018**. Documentation defines the score: **“1.0 is very likely a good interaction, 0.0 is very likely a bot.”** A website chooses what action to take; the score is not a calibrated percentage probability that the visitor is human. [Wei Liu, Google launch announcement](https://developers.google.com/search/blog/2018/10/introducing-recaptcha-v3-new-way-to), [Google v3 documentation](https://developers.google.com/recaptcha/docs/v3).

- **Medium — Google’s reported current position differs from its historical messaging.** In **July 2026**, *El País* quoted Google Spain: **“we no longer use reCAPTCHA challenge responses to train models.”** Treat this as an attributed company statement, not an independent audit. The introduction of puzzle-free v3 also does not mean every older image-based deployment disappeared. [Pablo G. Bejerano, *El País*, 22 July 2026](https://english.elpais.com/technology/2026-07-22/captchas-has-google-got-us-training-its-ai-without-knowing-it.html).

### 3. Retellings to avoid

- **“Every traffic-light click trains a self-driving car.” — Low/unverified.** Historical confirmation of general dataset creation does not establish that specific data pipeline.
- **“Google secretly admitted the tests were never about security.”** Its documented system had security functions and, historically, additional transcription/labelling uses.
- **“If the computer does not know an answer, it cannot verify anything.”** The original system used known controls and repeated human agreement.
- **“The checkbox only watches how you move the mouse.”** Google describes broader risk analysis; no single-cue explanation is established by these sources.
- **“Version 3 shows traffic-light puzzles.”** V3 returns a score. A site may separately require further verification, but that is not a puzzle supplied by v3 itself.
- **“2000, 2003 and 2007 are conflicting invention dates.”** They describe the term/development, formal paper, and later reCAPTCHA system respectively.

### 4. Best hook

**“That robot test once helped read books. Later, Google also used image answers to build machine-learning datasets.”**

Use **“once”** and **“later”** deliberately; do not turn this into an unsupported claim about present-day autonomous-car training.

*Small source line: von Ahn, Blum, Hopper & Langford, 2003; von Ahn et al., 2008; Google, 2009/2014/2017/2018.*

### 5. Showcase idea

Split an old two-word challenge into **known control** and **unknown scanned word**. Animate several independent answers agreeing, then place the recovered word back into a scanned page. Label the reconstruction **“historical reCAPTCHA mechanism.”**

For the extension, transform the visible puzzle into a v3 score scale from **0.0 to 1.0**, labelled **“more bot-like → more likely a good interaction.”** Avoid drawing an evidentially unsupported arrow from a traffic-light grid into a Waymo car.

### 6. Images

**High — Commons licensing checked:** [**File:Luis von Ahn.jpg**](https://commons.wikimedia.org/wiki/File:Luis_von_Ahn.jpg) — photograph by **Susan028**; **CC BY-SA 3.0**. The licence statement names **“Attribution-Share Alike 3.0 Unported.”** Credit the photographer, link the licence, and identify cropping or other changes.

### 7. Armenian anchor

**None found** that establishes a specific Armenian contribution or documented local digitisation project using reCAPTCHA.

### 8. Open questions

- **Unverified:** whether any particular traffic-light challenge dataset was transferred into Waymo or another autonomous-driving training system.
- **Unverified:** the complete present-day disposition of responses from older image-based deployments. The 2026 company statement is not a public technical audit.
- **Not established here:** an exact date or total for completion of the entire *New York Times* archive through reCAPTCHA. The verified 2008 figures above concern a measured sample.