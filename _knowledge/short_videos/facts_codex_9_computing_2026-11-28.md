# «Ուղեղ Ամպրոպ» — fact sheets for four videos

Checked **28 November 2026**. **High** means directly supported by primary documentation or reproducible arithmetic; **medium** means credible evidence with a stated limitation; **low** means insufficiently verified. Quotations below are short, exact excerpts. Calculated examples are identified explicitly.

## X13. How a computer makes a random number

### 1. Verdict on the premise

**High confidence: true, with an important distinction.** A pseudorandom generator calculates a sequence from an initial state established by a seed. Repeating the same initialization and operations reproduces the sequence. Computers can also obtain entropy from physical processes; practical security systems often combine physical entropy with a deterministic cryptographic generator.

Accurate wording: **“A computer can calculate numbers that look random—or measure unpredictable physical noise and use it to seed a secure generator.”** See X1, X6–X8.

### 2. Key facts

- **X1 — High: the same seed can reproduce the sequence.** This requires the same generator, compatible initialization and the same sequence of calls. Python’s documentation guarantees the “same sequence when the compatible seeder is given the same seed.” A seed initializes the generator’s state; subsequent outputs follow its algorithm. [Python, `random` documentation](https://docs.python.org/3/library/random.html).

- **X2 — High: von Neumann’s quotation is authentic, but preserve its wording and attribution.** The printed text reads: **“Any one who considers arithmetical methods of producing random digits is, of course, in a state of sin.”** “Any one” is two words in the consulted reprint. The heading also credits **“Summary written by George E. Forsythe.”** Cite John von Neumann, *Various Techniques Used in Connection With Random Digits*, **1951**, National Bureau of Standards Applied Mathematics Series **12**, pp. **36–38**; the linked document is a collected-works reprint. [Primary text, hosted by Los Alamos](https://mcnp-green.lanl.gov/pdf_files/InBook_Computing_1961_Neumann_JohnVonNeumannCollectedWorks_VariousTechniquesUsedinConnectionwithRandomDigits.pdf).

- **X3 — High: RAND really published the book in 1955.** Its title is *A Million Random Digits with 100,000 Normal Deviates*. RAND’s reissue states: **“A Million Random Digits with 100,000 Normal Deviates was originally published by The Free Press in 1955.”** The **2001** date on the digital edition is a reissue date. [RAND, copyright/title pages](https://www.rand.org/content/dam/rand/pubs/monograph_reports/MR1418/MR1418.introduction.pdf).

- **X4 — High: distinguish Mersenne Twister’s 1997 development history from its 1998 publication.** Makoto Matsumoto and Takuji Nishimura’s paper records **“Received January 1997; revised September 1997; accepted November 1997”** and appeared in the **January 1998** journal issue. For an unambiguous source line, use **“Matsumoto & Nishimura, 1998.”** [Original paper, final page](https://afpc.tamu.edu/courses/643/2016/reading/Matsumoto-Nisimura-Merseene-Twister.pdf).

- **X5 — High: MT19937’s period is \(2^{19937}-1\).** The paper states that its implemented C generator, **MT19937**, has that period. This describes repetition of the generator’s sequence/state cycle; it does **not** mean that individual output values cannot recur earlier. The printed numerical expression is **“\(2^{19937}-1\)”**; some extracted PDF text mangles the superscript. [Original paper, p. 4](https://afpc.tamu.edu/courses/643/2016/reading/Matsumoto-Nisimura-Merseene-Twister.pdf).

- **X6 — High: a huge period does not make Mersenne Twister cryptographically secure.** Python explicitly calls it **“completely unsuitable for cryptographic purposes.”** Do not generalize this to every deterministic generator: cryptographically secure pseudorandom generators are a separate, deliberately designed class. [Python documentation](https://docs.python.org/3/library/random.html).

- **X7 — High: Intel’s hardware combines physical noise and deterministic processing.** Intel’s **2018** implementation guide says its entropy source **“uses thermal noise within the silicon.”** Its RDRAND output stage uses **“CTR_DRBG”**, **“using the AES block cipher.”** Thus, RDRAND should be described as output from a hardware cryptographic generator repeatedly seeded by conditioned physical entropy, rather than as raw thermal-noise bits. [Intel, §§3.2.1–3.2.3](https://www.intel.com/content/www/us/en/developer/articles/guide/intel-digital-random-number-generator-drng-software-implementation-guide.html).

- **X8 — High: Cloudflare’s San Francisco lava-lamp system is documented by Cloudflare itself.** Joshua Liebow-Feeser’s **6 November 2017** article describes a **“wall of lava lamps”** in its **“San Francisco office”**, serving as a **“secondary source of randomness.”** It explains: **“A video feed from the camera is fed into a CSPRNG.”** The lamps supplement other randomness sources. [Cloudflare, *Randomness 101: LavaRand in Production*](https://blog.cloudflare.com/randomness-101-lavarand-in-production/).

- **X9 — High: the Debian OpenSSL failure was disclosed on 13 May 2008.** Debian attributed the predictable generator to **“an incorrect Debian-specific change”** and warned: **“cryptographic key material may be guessable.”** The advisory identifies the first vulnerable upload as **“2006-09-17.”** This was a flaw in affected Debian packages and derivatives, not evidence that every OpenSSL installation was broken. [Debian Security Advisory DSA-1571-1](https://lists.debian.org/debian-security-announce/2008/msg00152.html).

- **X10 — High: Lenstra and colleagues found shared-prime RSA failures, but denominators matter.** Their **2012** paper reports **“6.4 million distinct RSA moduli”** and **“12934 distinct n-values (0.2% of the total)”** factored through shared primes. Its original **1024-bit** subset contained **12,720** affected moduli among approximately **4.7 million**, approximately **0.27%**. These are different populations, not conflicting measurements. Repeated *whole moduli* are another category and must not be substituted for shared-prime failures. [Lenstra, Hughes, Augier, Bos, Kleinjung & Wachter, original paper](https://eprint.iacr.org/2012/064.pdf).

### 3. Retellings to avoid

- **“Computers cannot produce randomness.”** Too broad: physical entropy sources exist; distinguish them from deterministic generation. **High; X7–X8.**
- **“Pseudorandom means useless or insecure.”** False as a generalization. Mersenne Twister’s security limitation does not apply automatically to cryptographic generators. **High; X6–X8.**
- **“A period of \(2^{19937}-1\) means no number repeats before then.”** Confuses repeated values with a repeated sequence/state cycle. **High; X5.**
- **“Cloudflare’s lamps encrypt the internet directly.”** The camera supplies supplementary entropy to a cryptographic system. **High; X8.**
- **“Lenstra proved 0.2% of all internet encryption was broken.”** The statistic belongs to a particular collected RSA-modulus dataset. **High; X10.**
- **“Von Neumann proved all arithmetic randomness is worthless.”** His article discusses and evaluates arithmetic methods; the quotation is not such a theorem. **High; X2.**

### 4. Best hook

**“The same seed can make ‘random’ numbers repeat exactly. So where does a computer get a seed nobody can predict?”**

Basis: X1, X7–X8.

### 5. Showcase idea

Animate two identical machines, each initialized with **seed 1**, using this deliberately small teaching formula:

\[
x_{\text{next}}=(5x+1)\bmod16
\]

Both produce **6, 15, 12, 13, 2, 11**. These values were independently calculated from the displayed formula; this is an illustrative generator, not Mersenne Twister or a security recommendation.

Then transition to **lamp wall → camera → cryptographic generator**, explicitly labelled **“Cloudflare: supplementary entropy.”** Avoid adding an unverified lamp count or entropy rate.

Suggested small source line: **“Matsumoto & Nishimura, 1998 · Joshua Liebow-Feeser / Cloudflare, 2017.”**

### 6. Images

**High confidence:** [**File:Lava lamps.jpg**](https://commons.wikimedia.org/wiki/File:Lava_lamps.jpg), author **דוג'רית**, **CC BY-SA 4.0**. Commons specifies **“Attribution-Share Alike 4.0 International.”** Use it as a generic lamp illustration; the file does not depict Cloudflare’s installation.

### 7. Armenian anchor

**None found** that is sufficiently direct and well sourced for this video.

### 8. Open questions

- No current lamp count or entropy-production rate is approved here.
- The RSA paper also mentions an enlarged dataset. Keep the **original dataset** label when using **12,934 / approximately 6.4 million**.
- The von Neumann wording was verified in a primary-text reprint; the **1951** item credits Forsythe’s summary. Preserve that bibliographic distinction.

## CX43. Deleting a file does not erase it

### 1. Verdict on the premise

**High confidence: useful hook, but false as an unconditional rule.** Ordinary deletion on conventional magnetic storage often removes filesystem references and frees the allocation without overwriting the contents. SSDs introduce TRIM, controller mapping and garbage collection, which can make deleted content inaccessible without a later user overwrite.

Accurate wording: **“Deleting a file often removes its entry before it removes its contents—but recovery depends strongly on the storage device.”** See C1, C5–C6.

### 2. Key facts

- **C1 — High: ordinary filesystem deletion can leave file contents untouched.** Garfinkel and Shelat describe FAT deletion as marking the directory entry reusable and returning its clusters to the free list: **“The actual file data is never touched.”** Their broader taxonomy describes similar reference removal in many operating systems. Say “removes or marks the entry,” because implementations differ. [Garfinkel & Shelat, 2003, pp. 20–21](https://simson.net/clips/academic/2003.IEEE.DiskDriveForensics.pdf).

- **C2 — High: the Recycle Bin is an earlier, separate stage.** Eligible Windows deletions can move files there, where ordinary restoration remains available. Microsoft instructs users to **“open the Recycle Bin”** and **“select Restore.”** Emptying or bypassing the Bin does not, by itself, establish that underlying media has been sanitized. [Microsoft, computer Recycle Bin restoration instructions](https://support.microsoft.com/en-us/onedrive/restore-your-onedrive-files).

- **C3 — High: quick format is not a full overwrite.** Microsoft documents `/Q` as deleting filesystem structures: **“Deletes the file table and the root directory.”** It does not describe this operation as writing over every sector. On SSDs, however, formatting can interact with deallocation/TRIM, so quick format does not guarantee recoverability either. [Microsoft, `format` documentation](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/format); [King & Vidas, 2011](https://users.ece.cmu.edu/~tvidas/papers/DFRWS11b.pdf).

- **C4 — High: an explicit overwrite performs a different operation.** Microsoft describes `/P` as **“Zero every sector on the volume.”** This concerns the accessible volume; it does not establish that every hidden or remapped physical storage location has been sanitized. Avoid treating “full format” as a platform-independent synonym for secure erasure. [Microsoft, `format` parameters](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/format); [Wei et al., 2011](https://static.usenix.org/event/fast11/tech/full_papers/Wei.pdf).

- **C5 — High: TRIM and garbage collection change the recovery problem.** TRIM lets the operating system identify blocks whose contents are no longer required; the SSD controller can reclaim them. King and Vidas found that on TRIM-supported configurations, **“in most cases no data can be recovered.”** Their **2011** result is evidence of the mechanism, not a universal recovery percentage for modern SSDs. [King & Vidas, pp. S111–S113](https://users.ece.cmu.edu/~tvidas/papers/DFRWS11b.pdf).

- **C6 — High: SSD file overwriting cannot simply inherit HDD assumptions.** Wei, Grupp, Spada and Swanson found: **“none of the existing hard drive-oriented techniques for individual file sanitization are effective on SSDs.”** Their explanation includes controller indirection and copies invisible through ordinary host reads and writes. This reports the techniques they tested in **2011**, not every subsequent implementation. [Original FAST ’11 paper, abstract](https://static.usenix.org/event/fast11/tech/full_papers/Wei.pdf).

- **C7 — High: cite the current NIST revision.** **SP 800-88 Revision 2**, published **September 2025**, supersedes the **2014** revision. It retains the methods **“clear,” “purge,”** and **“destroy.”** Its change log says technique details were replaced with recommendations to follow **“IEEE 2883, NSA specifications, or an organizationally approved standard.”** Cryptographic erase is addressed separately and depends on suitable encryption and key handling. [NIST publication record](https://csrc.nist.gov/pubs/sp/800/88/r2/final); [Revision 2, §§3.1–3.2 and Appendix D](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-88r2.pdf).

- **C8 — High: the original second-hand-drive study purchased 158 drives, but only 129 were successfully imaged.** The paper records **“158 hard drives,” “129 drives that we successfully imaged,”** and **“only 12 (9 percent)”** sanitized using **“zero-filled blocks.”** Therefore **129 is an imaging/functionality count**, not a count of drives containing readable personal files. [Garfinkel & Shelat, 2003, p. 24](https://simson.net/clips/academic/2003.IEEE.DiskDriveForensics.pdf).

- **C9 — Medium: the often-repeated 69-drive figure comes from contemporary reporting.** Justin Pope’s Associated Press report, **15 January 2003**, says **“69 still had recoverable files on them”** and **“49 contained ‘significant personal information’.”** This report is preserved in an archive; NIST’s contemporary presentation reproduces the same figures. The journal article does not present that exact headline tally. Trust the paper for its defined categories; attribute **69** explicitly to contemporary AP reporting. [Archived AP report](https://seclists.org/isn/2003/Jan/72); [NIST presentation, slide 12](https://www.nist.gov/system/files/nsrl-fletc.pdf).

- **C10 — High: the BTK floppy-disk clue is confirmed by the participating forensic programme.** The FBI/RCFL **FY2005** report says a disk sent on **16 February 2005** revealed **“Dennis”** and **“Christ Lutheran Church.”** An internet search connected those terms to Dennis Rader. The report credits both digital evidence and DNA; the disk was an investigative lead, not the entire evidentiary case. [RCFL annual report, printed p. 11](https://www.rcfl.gov/file-repository/rcfl_nat_annual05.pdf).

- **C11 — Medium: the deleted-Word-file and EnCase details have a credible, later institutional source.** Jim Lyle’s **14 May 2010** NIST presentation states: **“Police found metadata embedded in a deleted Microsoft Word document”**, recovered with **“EnCase.”** It identifies **“Dennis”** as the last modifier. This is more specific than the contemporaneous RCFL account, which says “disk properties.” Use the broader FBI account with high confidence; attribute the precise recovery account to Lyle/NIST. [NIST presentation, slide 3](https://www.nist.gov/system/files/documents/2017/05/08/montana-may-2010.pdf).

### 3. Retellings to avoid

- **“Deleted files always remain until overwritten.”** Too absolute for TRIM-enabled SSDs and other storage behaviours. **High; C5–C6.**
- **“Emptying the Recycle Bin securely wipes the disk.”** Unsupported; ordinary deletion and media sanitization are different operations. **High; C1–C2, C7.**
- **“Quick format guarantees easy recovery.”** Particularly unsafe as a generalization about SSDs. **High; C3, C5.**
- **“129 of 158 drives contained recoverable personal data.”** Mislabels the imaging count. **High; C8–C9.**
- **“Police recovered a deleted confession from BTK’s disk.”** The documented clue was identifying metadata, not a recovered confession. **High for the clue; medium for the detailed deleted-file account; C10–C11.**
- **“An SSD erases every deleted file immediately.”** No universal timing or success rate is established by these sources. **High; C5–C6.**

### 4. Best hook

**“Delete can remove a file’s name before it removes its contents. But an SSD can change what survives.”**

Basis: C1, C5.

### 5. Showcase idea

Show a directory entry pointing to coloured data blocks on a **magnetic-disk schematic**. Deletion removes the pointer and marks the allocation free; the blocks remain visible until replacement data covers them.

Then show the extension: **SSD deletion → TRIM notification → controller reclamation**. Label its timing **“depends on implementation”**; do not display a countdown.

Optional evidence card:

| Study quantity | Verified figure |
|---|---:|
| Drives purchased | 158 |
| Successfully imaged | 129 |
| Zero-filled/sanitized in the paper | 12 |

Keep **69 recoverable-file drives** separate and labelled **“contemporary AP report.”**

Suggested source line: **“Garfinkel & Shelat, 2003 · King & Vidas, 2011 · NIST SP 800-88r2, 2025.”**

### 6. Images

**High confidence:** [**File:Hard disk Western Digital WD1000 1 (dark1).jpg**](https://commons.wikimedia.org/wiki/File:Hard_disk_Western_Digital_WD1000_1_%28dark1%29.jpg), author **Darkone**, **CC BY-SA 2.5**. Commons specifies **“Attribution-Share Alike 2.5 Generic.”** Suitable for establishing what a magnetic hard drive looks like.

### 7. Armenian anchor

**None found** with sufficiently strong documentation of a specific local recovery case.

### 8. Open questions

- There is no universal time window during which a deleted SSD file remains recoverable.
- The original BTK disk image and complete examination record were not available for direct inspection. The two institutional accounts differ in specificity.
- Do not turn this video into device-specific disposal instructions without checking the particular device’s sanitization capabilities.

## I10. How a phone reads your fingerprint

### 1. Verdict on the premise

**High confidence: true, but the proposed storage explanation needs correction.** Phones can sense fingerprints optically, capacitively or ultrasonically. Storage and matching implementations vary.

For Apple, say: **“Touch ID turns a scan into a processed mathematical template protected by the Secure Enclave.”** Avoid describing it simply as a saved photograph, a universal minutiae list, or data necessarily held entirely inside a separate chip. See F1–F7.

### 2. Key facts

- **F1 — High: an optical reader forms an image using light.** Under-display implementations can use illumination from display pixels and an imaging sensor beneath them. A Synaptics patent describes **“an image sensor, disposed beneath the plurality of display elements”** detecting light **“reflected from the sensing region.”** “A camera-like sensor under the screen” is a fair simplification for this architecture; it is not a description of all fingerprint readers. [Primary patent US10268884B2, description](https://patents.google.com/patent/US10268884B2/en).

- **F2 — High: capacitive sensing measures electrical differences associated with ridges and valleys.** Yan and Yang explain that **“the skin’s ridges and valleys affect the capacitance of the elements to varying degrees.”** Those spatial measurements form the fingerprint signal. [Yan & Yang, *OneTouch*, USENIX Security 2025, §2.1](https://www.usenix.org/system/files/usenixsecurity25-yan-yihui.pdf).

- **F3 — High: Apple introduced Touch ID with the iPhone 5s in 2013.** Its **10 September 2013** announcement describes a **“capacitive touch sensor.”** Apple’s **October 2014** security guide specifies an **“88-by-88-pixel, 500-ppi raster scan.”** Thus **500 pixels per inch** is verified for that documented Touch ID implementation; it is not the resolution of every phone’s sensor. [Apple’s original announcement](https://www.apple.com/newsroom/2013/09/10Apple-Announces-iPhone-5s-The-Most-Forward-Thinking-Smartphone-in-the-World/); [Apple, 2014 security guide, p. 8](https://www.apple.com/hk/privacy/docs/iOS_Security_Guide_Oct_2014.pdf).

- **F4 — High: Qualcomm’s ultrasonic system appeared in the Galaxy S10 in 2019.** Qualcomm identifies the S10 as its **“first commercial device to support the latest Qualcomm® 3D Sonic Sensor”** and describes the **“in-display Ultrasonic Fingerprint Scanner.”** Use this specific product claim; do not inflate it into “the first fingerprint phone.” [Qualcomm’s February 2019 announcement](https://www.qualcomm.com/news/releases/2019/02/qualcomm-snapdragon-855-mobile-platform-enables-samsung-galaxy-s10-line).

- **F5 — High: Apple’s stored template is more specific than “a list of minutiae.”** Apple Platform Security describes **“subdermal ridge flow angle mapping”** and says the process **“discards ‘finger minutiae data’.”** The temporary raster scan is discarded after processing. A generic minutiae illustration can explain fingerprint detail, but should not be presented as a literal diagram of Apple’s stored template. [Apple Platform Security, *Biometric security*, 2024](https://support.apple.com/en-afri/guide/security/sec067eb0c9e/web).

- **F6 — High: “protected by the Secure Enclave” is more accurate than “everything is stored inside the chip.”** Apple says fingerprint data is **“encrypted, stored on disk”** and protected with **“a key only available to the Secure Enclave.”** Ordinary apps and the operating system do not receive access to the enrolled fingerprint data. [Apple, *About Touch ID advanced security technology*, 2024](https://support.apple.com/en-ie/105095).

- **F7 — High as an attributed manufacturer claim: Apple gives Touch ID a random false-match probability of 1 in 50,000.** The qualification is **“1 in 50,000 with a single, enrolled finger.”** This concerns accidental matching by another person, not the success probability of a deliberately fabricated copy. [Apple, Touch ID security explanation](https://support.apple.com/en-ie/105095).

- **F8 — High as an attributed manufacturer claim: Apple’s current Face ID wording is “less than 1 in 1,000,000.”** Its current support description says **“less than 1 in 1,000,000”** with one enrolled appearance. The original iPhone X guide said **“approximately 1 in 1,000,000.”** These are differently dated manufacturer descriptions; preserve the qualifier. The historical guide also flags different false-match probabilities for look-alike relatives. [Current Apple support description](https://support.apple.com/en-gb/102381); [Original Face ID Security Guide](https://www.apple.com/business-docs/FaceID_Security_Guide.pdf).

- **F9 — High: the Chaos Computer Club demonstrated a Touch ID spoof in September 2013.** The CCC describes photographing an enrolled fingerprint at **“2400 dpi”** and printing at **“1200 dpi.”** Its update says the initial mould was **“somewhat unreliable”** and describes an improved mould-making method. This was a physical replica attack against matching, not evidence that the Secure Enclave’s stored template had been extracted. [CCC, 22 September 2013, including update](https://www.ccc.de/en/updates/2013/ccc-breaks-apple-touchid).

- **F10 — High: identical twins can be distinguished by fingerprint detail.** Anil Jain, Salil Prabhakar and Sharath Pankanti’s **2002** study reports that its verification system could **“successfully distinguish identical twins though with a slightly lower accuracy than nontwins.”** This supports distinguishability, not a claim that fingerprint matching is infallible. [Original paper, *Pattern Recognition*](https://www.sciencedirect.com/science/article/abs/pii/S0031320301002187).

- **F11 — High for the historical claim; low as a modern universal probability: Galton’s number was about 64 billion.** In *Finger Prints* (**1892**), p. **110**, Francis Galton wrote **“or 1 to about sixty-four thousand millions.”** That means approximately **64,000,000,000**, not **64 trillion**. A Scientific American retrospective headline says **“1 in 64 trillion,”** while its reproduced historical text says **“sixty-four thousand millions.”** Trust Galton’s original wording; present it as his historical calculation, not a measured phone error rate or an established universal collision probability. [Galton’s original book](https://www.gutenberg.org/cache/epub/36979/pg36979-images.html); [Contradictory retrospective headline](https://www.scientificamerican.com/article/the-chance-of-identical-fingerprints-1-in-64-trillion/).

### 3. Retellings to avoid

- **“Every fingerprint reader photographs your finger.”** Capacitive and ultrasonic acquisition use different physical measurements. **High; F1–F4.**
- **“Touch ID never creates an image.”** Apple describes a temporary raster scan; the distinction concerns what is retained. **High; F3, F5.**
- **“Apple stores your fingerprint’s minutiae list.”** Its published description specifies a processed ridge-flow map and discarded minutiae data. **High; F5.**
- **“One in 50,000 means a fake finger has only that chance.”** Confuses random false matching with a targeted spoof. **High; F7, F9.**
- **“Ultrasonic means impossible to fool.”** Samsung acknowledged a **2019** failure involving silicone-cover patterns: **“recognising 3-dimensional patterns appearing on certain silicone screen protecting cases as users’ fingerprints.”** [Samsung’s own statement](https://news.samsung.com/uk/statement-on-fingerprint-recognition-issue). **High.**
- **“Galton proved the chance is one in 64 trillion.”** Wrong number and excessive certainty. **High; F11.**

### 4. Best hook

**“Your phone can read the ridges on your finger using electricity—or even sound. Then it compares a mathematical pattern.”**

Basis: F2–F6; describe the chosen phone implementation explicitly.

### 5. Showcase idea

Focus on **capacitive sensing**, with secure matching as the extension:

1. Magnify a ridge and a valley above a schematic sensor grid.
2. Make their measured capacitances differ.
3. Turn the measurements into a processed pattern.
4. Show a protected comparison producing a match/no-match result.

Label the grid **“schematic”**. If showing **500 ppi**, label it **“Apple’s documented Touch ID implementation”**. Do not invent a number of matching points or an acceptance threshold.

Suggested source line: **“Apple, 2013 / 2014 / 2024 · Yan & Yang, 2025.”**

### 6. Images

**High confidence:** [**File:Fingerprint Recognition - Figure 1.jpg**](https://commons.wikimedia.org/wiki/File:Fingerprint_Recognition_-_Figure_1.jpg), author **FBI**, **public domain**, identified on Commons as a U.S. federal-government work, with **Public Domain Mark 1.0**. Suitable for explaining minutiae generally; caption it accordingly rather than calling it an Apple template.

### 7. Armenian anchor

**High confidence, as a document requirement:** Armenia’s official biometric-document technical requirements specify that **“fingerprint images shall conform to ISO / IEC 19794-4.”** This provides a solid local connection to fingerprint digitization. It does not establish that identity-document storage works like Touch ID. [Armenia Ministry of Economy, technical requirements, 24 December 2024](https://mineconomy.am/media/31791/Armenia%20PPP%20-%20Technical%20Requirements%20-%202024-12-24%20-%20ENG.pdf).

### 8. Open questions

- No universal numerical probability of fingerprint duplication is approved here.
- Apple’s advertised false-match figures are attributed claims, not an independent measurement performed for this fact sheet.
- Template formats, sensor resolution and spoof resistance vary by device; specify a model before making detailed implementation claims.

## M8. The last digit of your card checks the others — Luhn

### 1. Verdict on the premise

**High confidence: true for card numbers that use Luhn.** The final digit is calculated from the preceding digits so that the complete number satisfies a checksum rule.

Accurate wording: **“On cards using Luhn, the last digit helps catch typing mistakes in the number.”** Passing this check does not establish that an account exists or that a payment is authorized.

### 2. Key facts

- **L1 — High: the named patent and dates are correct.** **Hans Peter Luhn**, associated with IBM, is the algorithm’s namesake. Patent **US 2,950,048**, *Computer for Verifying Numbers*, identifies **“Hans P. Luhn”**, records **“Filed Jan. 6, 1954”**, and **“Patented Aug. 23, 1960.”** It describes a physical calculating device implementing the checking system; do not call it a patent for online payments. [Original patent, first text page](https://patentimages.storage.googleapis.com/ec/2a/f7/b9af046ed26128/US2950048.pdf); [IEEE Spectrum’s historical account of Hans Peter Luhn at IBM](https://spectrum.ieee.org/hans-peter-luhn-and-the-birth-of-the-hashing-algorithm).

- **L2 — High: when validating a complete number, leave the final check digit undoubled.** Work right to left, starting with the penultimate digit, then alternate. Stripe’s explanation says **“double the value of the second-to-last digit.”** This wording avoids the common ambiguity in “double every second digit from the right.” [Stripe, Luhn procedure](https://stripe.com/en-fr/resources/more/how-to-use-the-luhn-algorithm-a-guide-in-applications-for-businesses).

- **L3 — High: reduce doubled values greater than 9.** Add their decimal digits, equivalently subtract **9**: for example, \(8\times2=16\rightarrow7\). Stripe instructs users to **“add the digits of the result together.”** The subtraction equivalence follows directly for doubled decimal digits, whose two-digit results range from **10 to 18**. [Stripe, procedure](https://stripe.com/en-fr/resources/more/how-to-use-the-luhn-algorithm-a-guide-in-applications-for-businesses).

- **L4 — High: add the transformed and untouched values; a valid checksum ends in 0.** Stripe’s condition is that the **“total ends in zero.”** Equivalently, the sum is divisible by **10**. [Stripe, procedure](https://stripe.com/en-fr/resources/more/how-to-use-the-luhn-algorithm-a-guide-in-applications-for-businesses).

- **L5 — High: use a published test number.** Stripe explicitly supplies **“4242 4242 4242 4242”** for testing and lists **“4242424242424241”** as an incorrect-number test. Applying L2–L4 gives sums **80** and **79**, respectively; those sums were independently calculated. [Stripe testing documentation](https://docs.stripe.com/testing).

- **L6 — High: it catches every single-digit substitution in a valid, fixed-length number.** John D. Barrow’s **2010** Gresham lecture states that it **“catches every single digit mistake.”** It also detects every swap of two different adjacent digits except **09↔90**. His explanation identifies **“09 / 90”** as the missed swap. [Barrow, *Codebreaking in Everyday Life*](https://www.gresham.ac.uk/watch-now/codebreaking-everyday-life).

- **L7 — High: some multiple errors and nonadjacent swaps are invisible.** This follows directly from the rule. Digits in positions with the same weighting can be exchanged without changing the sum; multiple changes can also cancel modulo **10**. For the adjacent exception, either orientation of **09/90** contributes **9**. The patent’s transformed-digit row is **“0 2 4 6 8 1 3 5 7 9.”** These examples are mathematical deductions from that substitution rule. [Luhn’s original patent, substitution table](https://patents.google.com/patent/US2950048A/en).

- **L8 — High: Luhn provides error detection, not authentication or secrecy.** The public rule lets anyone compute a matching check digit. A particularly clear demonstration is that Stripe’s published test numbers pass the checksum even though test transactions **“don’t move funds.”** Passing Luhn therefore cannot prove that a number belongs to an active account. [Stripe testing documentation](https://docs.stripe.com/testing); [Public checking procedure](https://stripe.com/en-fr/resources/more/how-to-use-the-luhn-algorithm-a-guide-in-applications-for-businesses).

- **L9 — High: ISBN-10 uses modulus 11, with X representing 10.** The International ISBN Agency’s coauthored RFC describes **“a modulus 11 check digit, using X instead of 10.”** The corresponding standard gives weights **10 down to 1** across the complete ISBN-10. This is the historical ten-character system; do not transfer its X rule to ISBN-13. [Hakala & Walravens, RFC 3187, §3.1, 2001](https://www.rfc-editor.org/rfc/rfc3187.html); [ISO 2108:2005, reproduced as IS 8310:2006, Annex F](https://law.resource.org/pub/in/bis/S07/is.8310.2006.pdf).

- **L10 — High: EAN-13/GTIN-13 uses alternating weights 1 and 3.** Multiply its first **12** digits by **1,3,1,3,…,1,3** from the left; choose the final digit to bring the total to a multiple of **10**. GS1’s standard shows alternating weights; its example ends with **“Subtract sum from nearest equal or higher multiple of ten.”** Unlike Luhn, do not digit-sum each weighted product before adding. [GS1 General Specifications, §7.9.1, check-digit calculation](https://ref.gs1.org/standards/genspecs/).

- **L11 — High: IBAN uses MOD-97-10, with two check digits.** SWIFT explicitly names **“MOD-97-10”** and places the check digits in **“position 3 and 4.”** Validation rearranges the initial four characters to the end, converts letters to numbers, and checks the resulting integer modulo **97**. The Bank of Italy explains that the **“remainder of this division equals 1.”** [SWIFT, IBAN Plus FAQ](https://www.swift.com/sites/default/files/documents/swift_solutions_faq_ibanplus.pdf); [Bank of Italy, 2026, Box 1](https://uif.bancaditalia.it/pubblicazioni/quaderni/2026/quaderno-33-2026/QAR-33.pdf?language_id=1).

### 3. Retellings to avoid

- **“Double the rightmost digit.”** Wrong when checking a complete number: the final check digit stays undoubled. **High; L2.**
- **“Always double odd positions from the left.”** That depends on the number’s length. Counting from the right avoids the ambiguity. **High; L2.**
- **“It catches every neighbouring swap.”** The **09↔90** exception matters; exchanging identical digits changes nothing. **High; L6–L7.**
- **“A valid checksum proves the card is real.”** It proves only that the digits satisfy the arithmetic rule. **High; L5, L8.**
- **“Luhn encrypts your card number.”** There is no secret in this calculation. **High; L8.**
- **“ISBN, barcodes and IBAN all use Luhn.”** They use different checksum constructions. **High; L9–L11.**

### 4. Best hook

**“One mistyped digit—and the arithmetic catches it. On cards using Luhn, the last digit is a built-in typo check.”**

Basis: L2–L6; assumes a valid starting number and a single-digit substitution.

### 5. Showcase idea

Use only Stripe’s published test number:

| Stage | Digits or calculation |
|---|---|
| Public test number | **4242 4242 4242 4242** |
| Apply alternating doubling | **8282 8282 8282 8282** |
| Sum | \(8(8+2)=80\) |
| Check | \(80\bmod10=0\): passes |
| Published incorrect-number test | **4242 4242 4242 4241** |
| Its sum | **79**: fails |

Keep **“PUBLIC TEST NUMBER”** visible.

For the extension, show **09↔90** contributing the same total under either weighting orientation. Those are digit pairs, not complete card numbers. Alternatively, use ISBN-10’s **X = 10** as the single extension; the video should not attempt to teach all three alternative schemes.

Suggested source line: **“Hans P. Luhn, US 2,950,048, 1960 · Stripe test documentation.”**

### 6. Images

**None needed.** Original typography and animated arithmetic communicate the mechanism more clearly than a photograph of a payment card.

### 7. Armenian anchor

**High confidence:** the **National Library of Armenia** provides ISBN services and application forms. Its publishers’ page includes **“Գրանցված հրատարակիչների դիմում”**—an application for registered publishers. An Armenian book’s ISBN is therefore a solid local connection for the checksum extension, provided the script distinguishes ISBN’s rule from Luhn. [National Library of Armenia, publishers’ information](https://nla.am/publishers).

### 8. Open questions

- No authoritative ArCa-specific document was verified establishing its numbering/checksum rules. Do not make an ArCa-wide claim from the international examples.
- ISBN adoption dates in the consulted Armenian institutional material are inconsistent: the Library’s service page says **1998**, while a **2017** journal abstract says **1988**. Prefer the current service page provisionally, but omit the historical date until clarified. [Library service page](https://nla.am/publishers); [Bekmezyan, 2017 abstract](https://journal.nla.am/index.php/banber/article/view/166?articlesBySimilarityPage=10).
- The checksum identifies neither which digit is wrong nor how to correct it uniquely. Its role in this video should remain typo detection.