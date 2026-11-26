# Fact sources for the short-video scripts (claims A-J)

Checked 2026-11-26 with WebSearch and WebFetch only (no logins, no paid services).

How to read this file:
- "Quote" means text taken from the page as fetched. The fetch tool returns short exact excerpts, so long sentences are sometimes split into two quotes.
- Where a page refused automated fetching (403, bot check, connection reset), this is said next to the URL, and the quote comes from a search-engine excerpt or a republication. Those are marked "(excerpt via search)" or "(via republication)" and should get one manual look in a browser before the script is final.
- Verdicts: supported / partly supported / not supported / unresolved.

Summary table:

| ID | Claim (short) | Verdict |
|---|---|---|
| A | EU pilots ZK age checks on a state-signed birth date | Partly supported |
| B | Dutch bank (ING) published a salary-in-range proof | Partly supported |
| C | Zcash hides payer, payee and amount (zk-SNARKs, 2016) | Supported |
| D | OTR chats compare a typed answer, reveal only match / no match | Supported |
| E | GCHQ: Ellis 1970, Cocks 1973, Williamson 1974, secret until Dec 1997, Ellis died 25 Nov 1997 | Partly supported (Williamson date) |
| F | Petrov: five missiles, "not to believe the computer", never sure (2013) | Supported (primaries partly unreachable) |
| G | Webster's dictionaries spread "color" | Supported |
| H | Positive HIV screen confirmed with a different test (CDC/APHL, WHO) | Supported |
| I | Where's Waldo ZK proof, large sheet with a hole, leaks surroundings | Supported (page read via search excerpts) |
| J | Load-carriage energy rises roughly in proportion to load | Partly supported |

---

## A. EU age verification: pilot, countries, zero-knowledge proofs

Claim: "The European Union is piloting age checks this way" (a zero-knowledge proof of being over 18, on a birth date signed by the state).

Sources:
- Project portal (official blueprint docs): https://docs.ageverification.dev/
- Roadmap: https://docs.ageverification.dev/Roadmap/
- Technical spec, Annex A (AV profile): https://docs.ageverification.dev/av-doc-technical-specification/docs/annexes/annex-A/annex-A-av-profile/
- European Commission, 14 July 2025: https://digital-strategy.ec.europa.eu/en/news/commission-makes-available-age-verification-blueprint
- European Commission, 10 October 2025: https://digital-strategy.ec.europa.eu/en/news/commission-releases-enhanced-second-version-age-verification-blueprint
- European Commission factpage (last update 22 September 2026): https://digital-strategy.ec.europa.eu/en/factpages/blueprint-age-verification-solution-help-protect-minors-online
- European Commission, 29 April 2026: https://commission.europa.eu/news-and-media/news/commission-urges-fast-rollout-age-verification-app-2026-04-29_en

Quotes:
- Commission, 14 July 2025: "The release of this blueprint launches a pilot phase during which a software solution for age verification will be tested" ... "Denmark, France, Greece, Italy and Spain will be the first to take up the technical solution" ... "Additionally, work on the integration of zero-knowledge proofs is ongoing."
- Commission, 10 October 2025: "The blueprint is now being thoroughly pilot tested with Member States, online platforms, end-users and other stakeholders." ... "Work is ongoing to include zero-knowledge proof technology in a future release before the end of the year."
- Roadmap (completed releases): "1st Release for launch of the pilot phase (July 2025)"; "Release of ZKP for Android with DC API" under "4th Release (January 2026)"; "Release of ZKP for iOS with DC API" under "6th Release (July 2026)".
- Factpage (22 Sep 2026): "Zero-knowledge proof technology is included in the solution." ... "A pilot phase started in July 2025 during which the blueprint was tested and customised" ... "As of April 2026, the age verification app is technically ready and will be available to citizens soon."
- Portal, "What's new - August 2026": "France, Denmark, Greece, Italy, Spain, Cyprus and Ireland are piloting the solution as part of the national wallets" / "during 2026, before making it available." ... "Zero-Knowledge Proof is now defined as the mandatory presentation mechanism, with plain mDoc presentation as fallback." ... "No identity, date of birth or other attribute is stored or shared."
- Annex A (what is signed): age_over_18 "is present in all Proof of Age attestations and indicates whether the user is above 18." ... "A Proof of Age Attestation SHALL NOT include any other attribute." ... "A Zero-Knowledge Proof is the preferred mechanism for presenting a Proof of Age attestation." The ZKP shows that "The Proof of Age attestation includes a signature that can be verified using the public key of the AP" (AP = Attestation Provider). The only ZKP system in scope is "longfellow-libzk-v1". If the phone cannot make a ZKP, the app falls back to plain mDoc, which "does not provide the unlinkability properties of the Zero-Knowledge Proof mechanism."
- Commission, 29 April 2026: the app "is now ready for deployment in EU countries", target "by the end of 2026". This page does not mention zero-knowledge proofs.

Timeline: pilot opened 14 July 2025 (DK, FR, EL, IT, ES) -> ZKP promised Oct 2025 -> ZKP on Android Jan 2026 -> "technically ready" Apr 2026 -> ZKP on iOS Jul 2026 -> ZKP made the mandatory presentation method Aug 2026; seven countries (adds Cyprus and Ireland) piloting in national wallets during 2026.

Verdict: **Partly supported.** The pilot and the zero-knowledge proof are both real, and as of August 2026 ZKP is the mandatory way to present the proof. But what gets signed is not a birth date: the credential holds only an "over 18: yes" attribute (age_over_18), and it is signed by an Attestation Provider after checking a national eID or passport, not necessarily by the state itself.

Script wording: change "on a birth date signed by the state" to something like "from an 'over 18' credential signed by a trusted issuer after checking your ID". "Piloting" is still accurate for 2026 (seven countries), but it is moving to rollout by the end of 2026.

---

## B. ING Zero-Knowledge Range Proof (2017)

Claim: "A large Dutch bank published a method to prove a salary is in a range without showing the number."

Sources:
- ING newsroom, 16 November 2017: https://www.ing.com/Newsroom/News/Blockchain-transactions-just-got-a-whole-lot-safer.htm and https://ing.com/news/2020/07/blockchain-transactions-just-got-a-whole-lot-safer.html (both return 404 as of 2026-11-26; title and date visible in search results only)
- Press-release text reproduced by IBTimes UK, 16 November 2017 (secondary): https://www.ibtimes.co.uk/ing-releases-zero-knowledge-range-proof-more-efficient-blockchain-applications-1647566
- ING code repository: https://github.com/ing-bank/zkrp (404 as of 2026-11-26; not in the ing-bank organisation's repository search either, only zkflow and zkkrypto)
- Mirror of the ING code on the Go package index: https://pkg.go.dev/github.com/0xdecaf/zkrp
- Fork of ING's original go-ethereum range-proof contract, with the security note: https://github.com/eanker/zkrangeproof

Quotes:
- IBTimes (reproducing ING's release): "a mortgage applicant could prove that their salary sits within a certain range, without revealing the exact figure." ING "has launched ZKRP as an open source solution." Mariana Gomez de la Villa (head of ING's blockchain programme): "ING's ZKRP solution has been proven to be ten times more efficient than other ZKPs in the ethereum test network."
- pkg.go.dev mirror: "This package contains ING Bank's implementations of Bulletproofs, Zero Knowledge Range Proof (ZKRP) and Zero Knowledge Set Membership (ZKSM)."
- eanker/zkrangeproof README: "ING's zero knowledge range-proof precompiled contract for the go-ethereum client." ... "As discovered by Madars Virza, Research Scientist MIT Media Lab, this protocol contains a potential security vulnerability." ... "Therefore, the proof is not zero knowledge."
- Production use: no source found where ING says ZKRP runs in production. The 2017 coverage only says open source and "10 times more efficient". The October 2018 follow-up (ZKSM) is described in search results as "now ready to be implemented and tested" (ING page now 404, phrase not verified on the page), which is a trial-readiness statement, not production.

Verdict: **Partly supported.** ING did publish open-source range-proof code in November 2017 and used exactly the salary-in-a-range example. But (1) ING released an implementation, not a new method (range proofs predate it); (2) its first version was later found not to be zero-knowledge and was replaced (the later zkrp repo uses Bulletproofs); (3) ING never said it is used in production; (4) ING's own announcement and repository are now offline.

Script wording: "In 2017 a large Dutch bank, ING, released free code for this, with the example of proving your salary is in a range without showing the number." Do not say or imply the bank uses it day to day.

---

## C. Zcash shielded transactions (zk-SNARKs, 2016)

Claim: "Some cryptocurrencies hide who paid whom and how much."

Sources:
- Zcash documentation (official, Electric Coin Co.): https://zcash.readthedocs.io/en/latest/rtd_pages/basics.html
- z.cash: https://z.cash/learn/what-are-zk-snarks/

Quotes:
- Zcash docs: "The most secure transaction is a shielded (z-to-z) one, which encrypts the sender and receiver addresses" / "and transaction amount." ... "all transactions appear on the public blockchain, so a transaction is known to have occured and what fees were paid." ... "Zcash is the first practical application of zk-SNARKs, a specific type of zero-knowledge proof." ... "Zcash launched on October 28, 2016 by Electric Coin Co."
- z.cash: "shielded transactions in Zcash can be fully encrypted on the blockchain" ... "verified as valid under the network's consensus rules by using zk-SNARK proofs" ... "Zcash was the first widespread application of zk-SNARKs".

Verdict: **Supported.** Nuance: only fully shielded (z-to-z) transactions hide sender, receiver and amount; transparent Zcash transactions are public, and even shielded ones show that a transaction happened and its fee.

Script wording: fine as is. If there is room, "can hide" is more exact than "hide".

---

## D. Off-the-Record Messaging, Socialist Millionaires' Protocol

Claim: "Some secure chats let both sides type the answer to the same question and say only whether it matches."

Sources:
- OTR v3 specification: https://otr.cypherpunks.ca/Protocol-v3-4.1.1.html (the requested https://otr.uwaterloo.ca/Protocol-v3-4.1.1.html failed: its TLS certificate only covers the cypherpunks.ca hosts; same document)
- pidgin-otr 3.2.0 help, "Authenticating a buddy": https://otr.cypherpunks.ca/help/3.2.0/authenticate.php

Quotes:
- Spec: "This document describes version 3 of the Off-the-Record Messaging protocol." ... SMP "allows them to compare x and y without revealing any other information than the value of (x == y)" ... "if x is not equal to y, no other information is revealed." ... TLV type 7: "Like a SMP Message 1, but whose value begins with a NUL-terminated user-specified question." ... The secret combines both fingerprints, the session id and "The input string given by the user at runtime"; "Then the SHA256 hash of the above is taken, and the digest becomes the actual secret (x or y) to be used in SMP."
- pidgin-otr help: "To authenticate using a question, pick a question whose answer is known only to you and your buddy." ... "Enter this question and this answer, then wait for your buddy to enter the answer too." ... "If the answers don't match, then either your buddy made a mistake typing in the answer," / "or you may be talking to an imposter." ... "Note that this method first appeared in pidgin-otr 3.2.0".

Verdict: **Supported.** One side writes the question and its answer, the other side types their answer, and the protocol reveals only whether the two match.

Script wording: fine. If naming it, "OTR (Off-the-Record) chat plugins" is accurate; it is an older tool (pidgin-otr 3.2.0).

---

## E. GCHQ "non-secret encryption"

Claim: James Ellis (1970), Clifford Cocks (1973, essentially RSA), Malcolm Williamson (1974, a Diffie-Hellman-like exchange); kept secret until December 1997; Ellis died on 25 November 1997, about a month before.

Sources:
- GCHQ, James Ellis: https://www.gchq.gov.uk/person/james-ellis
- GCHQ, Malcolm Williamson: https://www.gchq.gov.uk/person/malcolm-williamson
- J H Ellis, "The history of Non-Secret Encryption" (CESG paper released in 1997; third-party copy): https://www.cryptocellar.org/cesg/ellis.pdf
- M J Williamson, "Non-Secret Encryption Using a Finite Field", 21 January 1974 (UK Government Web Archive copy of the old cesg.gov.uk): https://webarchive.nationalarchives.gov.uk/ukgwa/20081022185524mp_/http://www.cesg.gov.uk/publications/media/secenc.pdf
- The National Archives catalogue, HW 9/51 (Ellis, January 1970; 403 to the fetch tool, details from search excerpt): https://beta.nationalarchives.gov.uk/catalogue/id/C16493207
- Bruce Schneier, "The Secret Story of Non-Secret Encryption", Dr. Dobb's Journal, April 1998: https://www.schneier.com/essays/archives/1998/04/the_secret_story_of.html

Quotes:
- GCHQ (Ellis): "Ellis died on the 25th November 1997 aged 73." ... "ironically just a month before the public announcement of the GCHQ achievement was made" ... "The discovery in 1973 remained classified for a long time."
- GCHQ (Williamson): "devised a method of public key exchange, which allows two parties to obtain a common secret key" ... "This is now known as the Diffie-Hellmann key exchange after the academic researchers" / "who independently found it at almost the same time." (no year given)
- Ellis, History: "I published the existence theorem in 1970 (reference 3)." Reference 3: "J H Ellis, The Possibility of Secure Non-Secret Digital Encryption, CESG Report, January 1970." ... "The first workable idea was put forward in reference 4 by Clifford Cocks. This is essentially the RSA Algorithm." Reference 4: "C C Cocks, A Note on Non-Secret Encryption, CESG Report, 20 November 1973."
- Ellis, History, on Williamson: "A couple of months later Malcolm Williamson came to me with a different scheme. This also involved the raising of the message to a power ... but relied on the fact that exponentiation was commutative. He published this in reference 6." (reference 6 = the 21 January 1974 note, a three-pass scheme). Then: "Later he produced a simple, elegant scheme which was much easier to use." (the exchange of x^a and x^b) ... "He did publish it, much later than he thought of it, in reference 7. The method was published in reference 8 by Diffie and Hellman. This was identical to Williamson's version, except that they restricted q to be prime." Reference 7: "M J Williamson, Thoughts on Cheaper Non-Secret Encryption, CESG Report, 10 August 1976."
- Williamson 1974 note (primary text): "A possible implementation is suggested of J H Ellis's proposed method of encryption involving no sharing of secret information". The steps are send A^k, return A^kl, send A^l: a three-pass scheme, not the Diffie-Hellman exchange.
- Schneier 1998: "GCHQ, the British equivalent of the U.S. NSA, released a document on December 1 1997," ... "C.C. Cocks (another British spook) published a classified paper where he described what was essentially RSA." ... "M. J. Williamson invented another classified algorithm, remarkably similar to Diffie-Hellman." Note: the essay says "Fast forward to.the U.K. in 1960" for Ellis's paper, which conflicts with the January 1970 date in the primary record; do not use Schneier for the Ellis year.
- Disclosure date: Schneier gives 1 December 1997; Wikipedia (secondary) gives Cocks's public talk on 18 December 1997. Both are December 1997.

Verdict: **Partly supported.** Ellis January 1970: supported. Cocks 20 November 1973, essentially RSA: supported (Ellis's own words). Secret until December 1997: supported. Ellis died 25 November 1997, about a month before: supported (GCHQ). Williamson: his 1974 note is a three-pass scheme; the exchange that is identical to Diffie-Hellman came "later" and was written up on 10 August 1976. Schneier and the NSA say 1974 loosely, but the primary record does not support "1974, Diffie-Hellman-like" without a caveat.

Script wording: "and soon after, Malcolm Williamson found the key exchange now called Diffie-Hellman" (no year), or "Williamson (1974 to 1976)". Avoid "Williamson, 1974, Diffie-Hellman".

---

## F. Stanislav Petrov (1983 false alarm)

Claim: he later said that a war would not start with only five missiles, and "I made a decision not to believe the computer"; in 2013 he said he was never sure.

Sources:
- David Hoffman, "I Had A Funny Feeling in My Gut", Washington Post, 10 February 1999: https://www.washingtonpost.com/wp-srv/inatl/longterm/coldwar/shatter021099b.htm (403 to the fetch tool; citation details from Wikipedia)
- Geoffrey Forden, Pavel Podvig, Theodore Postol, "Colonel Petrov's Good Judgment", Peace Magazine, April 2001: https://www.peacemagazine.org/archive/v17n2p16.htm
- Daryl G. Kimball, "Nuclear False Warnings and the Risk of Catastrophe", Arms Control Today, December 2019: https://www.armscontrol.org/node/11026
- Mansur Mirovalev, Al Jazeera, 28 September 2017 (the reporter met Petrov in June 2016): https://www.aljazeera.com/news/2017/9/28/russian-officer-who-prevented-nuclear-disaster-in-1983
- Pavel Aksenov, "Stanislav Petrov: The man who may have saved the world", BBC News, 26 September 2013: https://www.bbc.com/news/world-europe-24280831 (the fetch tool cannot open bbc.com / bbc.co.uk; text read via a republication crediting the BBC: https://graphic.com.gh/international/international-news/the-man-who-may-have-saved-the-world.html)
- Wikipedia, Stanislav Petrov (for the citation trail): https://en.wikipedia.org/wiki/Stanislav_Petrov

Quotes:
- Five missiles: Arms Control Today quotes Petrov: "when people start a war, they don't start it with only five missiles." (attributed only to what he "would later report"; widely credited to the 1999 Washington Post interview, which could not be opened here). Peace Magazine (narration): "Colonel Petrov decided that nobody starts a war with just five missiles."
- Washington Post 1999, as quoted in Peace Magazine: "I had a funny feeling in my gut," Petrov said. "I didn't want to make a mistake. I made a decision, and that was it."
- Al Jazeera 2017: "I understood the signal was wrong and yelled, 'False alarm! False alarm!'" he said. Then: "I made a decision not to believe the computer." (No interview date on this exact line; the article says Petrov "told this reporter in June 2016".)
- BBC 2013 (via republication): he "was never absolutely sure that the alert was a false one" and puts the odds at "50-50". Also: "I had all the data" ... "If I had sent my report up the chain of command, nobody would have said a word against it". Wikipedia, citing this BBC piece: "However, in a 2013 interview, Petrov said at the time he was never sure that the alarm was erroneous."

Verdict: **Supported**, with the caveat that the two primaries (Washington Post 1999, BBC 2013) could not be opened directly; the wording comes from reliable secondary quotes and a republication of the BBC text.

Script wording: keep "five missiles" as a paraphrase (or quote the Arms Control Today line). Attribute "I made a decision not to believe the computer" to a late interview (Al Jazeera, 2016/2017), not to the 1999 Post article; the Post line is "I made a decision, and that was it." For 2013, "he was never completely sure; he called it 50-50" matches the BBC best.

---

## G. Noah Webster and "color"

Claim: "Noah Webster's dictionaries spread the shorter American spelling 'color'."

Sources:
- University of Utah, Marriott Library Rare Books, "Book of the Week - A Compendious Dictionary of the English Language", 1 July 2013: https://openbook.lib.utah.edu/book-of-the-week-a-compendious-dictionary-of-the-english-language/
- Britannica Kids, Noah Webster (excerpt via search): https://kids.britannica.com/students/article/Noah-Webster/277688
- Merriam-Webster, "Noah Webster's Spelling Wins and Fails" and "Noah Webster's dictionary" (403 to the fetch tool; excerpts via search): https://www.merriam-webster.com/grammar/noah-websters-spelling-wins-and-fails and https://www.merriam-webster.com/wordplay/noah-webster-dictionary
- VOA Learning English, 26 December 2015: https://learningenglish.voanews.com/a/americans-color-british-colour-thank-noah-webster/3114564.html

Quotes:
- Utah: Webster "dropped the 'u' from words such as humour and colour" ... "This American spelling first appeared in the Compendious Dictionary. It was immediately adopted by American printers."
- Britannica Kids (excerpt via search): Webster followed the best American usage and chose the simpler of two spellings, e.g. "color, labor, and honor instead of colour, labour, and honour".
- Merriam-Webster (excerpts via search): the changes that succeeded included dropping the u in honor and humor; the 1828 edition printed both spellings side by side; the choice was settled "by public use and acceptance".
- VOA: "The speller immediately became a best seller. Soon it was used in schools in every state." ... "Webster's speller helped unify the written language of the United States."

Verdict: **Supported.** "Spread" is the right verb: Webster did not invent "color" (it existed before), but his 1806 and 1828 dictionaries and his spelling book made it the American standard.

Script wording: no change needed.

---

## H. HIV: a positive screen is confirmed with a different test

Claim: "In a standard medical example, an HIV-positive screening result is confirmed with a different test."

Sources:
- CDC and APHL, "Laboratory Testing for the Diagnosis of HIV Infection: Updated Recommendations", 27 June 2014: https://stacks.cdc.gov/view/cdc/23447
- CDC and APHL, "2018 Quick Reference Guide: Recommended Laboratory HIV Testing Algorithm for Serum or Plasma Specimens" ("Published 6/27/2014. Updated January 2018"): https://stacks.cdc.gov/view/cdc/50872
- WHO news release, 27 November 2019: https://www.who.int/news-room/detail/27-11-2019-innovative-who-hiv-testing-recommendations-aim-to-expand-treatment-coverage
- WHO information note "Preventing HIV misdiagnosis", December 2023: https://cdn.who.int/media/docs/default-source/hq-hiv-hepatitis-and-stis-library/hiv-testing-information-note.1.12.2023.pdf
- WHO HIV fact sheet: https://www.who.int/news-room/fact-sheets/detail/hiv-aids
- WHO Consolidated guidelines on HIV testing services, 2019 (landing page, not opened): https://www.who.int/publications/i/item/978-92-4-155058-1

Quotes:
- CDC/APHL 2014: "testing begins with a combination immunoassay that detects HIV-1 and HIV-2 antibodies and HIV-1 p24 antigen." Reactive specimens "undergo supplemental testing with an immunoassay that differentiates HIV-1 from HIV-2 antibodies." Those reactive first but nonreactive or indeterminate on the second test "proceed to HIV-1 nucleic acid testing for resolution."
- WHO 2019: "WHO is encouraging all countries to adopt a standard HIV testing strategy which uses three consecutive reactive tests" ... "Previously, most high burden countries were using two consecutive tests."
- WHO 2023 note: "In 2019 WHO recommended that all countries use a three-test strategy" (regardless of national HIV prevalence) ... "An HIV testing strategy in which a person is diagnosed with HIV after three consecutive reactive tests." ... "Confirmation of an HIV-positive result needs to be done using the WHO standard three-test strategy" ... the aim is "a three-test algorithm with tests that share the least, or no, common cross-reactivity."
- WHO fact sheet: "However, no single test can provide a full HIV positive diagnosis; confirmatory testing is required".

Verdict: **Supported.** CDC/APHL: an antigen/antibody screen, then a different (differentiation) immunoassay, then a nucleic acid test if they disagree. WHO: three consecutive reactive tests from different products chosen not to share false reactivity.

Script wording: no change needed.

---

## I. Where's Waldo as a zero-knowledge proof (Naor, Naor, Reingold, 1999)

Claim: the large sheet with a hole proves you found Waldo, and it leaks a little of the surroundings.

Sources:
- Solutions page: https://www.wisdom.weizmann.ac.il/~naor/PUZZLES/waldo_sol.html (the requested URL with "~/naor" and the plain "~naor" form both gave a connection reset to the fetch tool; content read via search-engine excerpts)
- Low-tech solution page: https://www.wisdom.weizmann.ac.il/~naor/PUZZLES/low_waldo.html (same problem)
- Paper abstract: https://www.wisdom.weizmann.ac.il/~naor/PAPERS/waldo_abs.html
- Journal of Craptology, Volume 0, No 1 (paper listing, PDF crv0n1-3.pdf): https://www.anagram.com/jcrap/Volume_0_1/

Quotes (excerpts via search; not read on the page itself):
- Solutions page: both solutions are imperfect in that they "reveal information about his immediate surrounding".
- Low-tech page: the cardboard should be at least twice as large as the picture in each dimension, with a small rectangle cut in the middle; Bob learns something about Waldo's immediate surroundings but nothing more, because the cardboard hides the rest of the page.
- Journal listing (read directly): "Moni Naor, Yael Naor, Omer Reingold" - "Applied Kid Cryptography or How To Convince Your Children You Are Not Cheating". The listing shows no date; 1999 comes from other listings (Tel Aviv University page, via search) and is the usual citation.

Verdict: **Supported** (the large sheet with a window, and the admission that it leaks the immediate surroundings). Caveat: the Weizmann pages could not be fetched and the paper PDF uses fonts that do not extract to text, so open waldo_sol.html in a browser once before quoting it on screen.

Script wording: no change needed. "Large sheet of cardboard with a small window" matches the authors' description.

---

## J. Load carriage: energy cost vs carried load

Claim: load-carriage energy cost rises roughly in proportion to the carried load.

Sources:
- Huang TWP, Kuo AD, "Mechanics and energetics of load carriage during human walking", J Exp Biol 217(Pt 4):605-613, 2014, doi:10.1242/jeb.091587: https://pmc.ncbi.nlm.nih.gov/articles/PMC3922835/ (bot check blocked the fetch; abstract read through Europe PMC: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=PMCID:PMC3922835&resultType=core&format=json)
- Knapik JJ, Reynolds KL, Harman E, "Soldier load carriage: historical, physiological, biomechanical, and medical aspects", Mil Med 169(1):45-56, 2004, doi:10.7205/milmed.169.1.45: https://pubmed.ncbi.nlm.nih.gov/14964502/ (abstract read through Europe PMC). The brief calls this the US Army review; the abstract record fetched did not show the authors' affiliations.

Quotes:
- Huang and Kuo: "Rate of metabolic energy expenditure also increased approximately linearly with load, by approximately 7.6 W" (per kg of load); loads tested "with varying backpack loads up to 40% of body weight" at 1.25 m/s; "both work and metabolic cost increasing nearly linearly with added mass".
- Knapik et al.: walking energy cost "increases progressively with increases in weight carried, body mass, walking speed, or grade." ... "type of terrain also influences energy cost." ... "each kilogram added to the foot increases energy expenditure 7% to 10%." ... "each kilogram added to the thigh increases energy expenditure 4%." ... "locating the load center of mass as close as possible to the body center of mass results in the lowest energy cost."

Verdict: **Partly supported.** Huang and Kuo support a roughly linear rise of the extra cost with backpack load (about 7.6 W per kg, up to 40% of body weight, at one walking speed). The Army review says only "increases progressively" and stresses that speed, grade, terrain and where the load sits change the cost a lot (a kilo on the foot costs far more than a kilo on the back). "In proportion" holds for the extra energy over unloaded walking, not for the total, and only for a load carried on the back at a steady pace.

Script wording: "for a backpack at a steady walking pace, each extra kilo adds about the same extra effort" (or "the extra energy grows roughly in step with the load"). Avoid "the energy cost is proportional to the load".
