# Independent repository review

Reviewed 26 November 2026. Paths below are relative to `03_shorts/`, except paths explicitly beginning `../` or `C:/`.

## Summary

**Do not publish the current zero-knowledge explainer unchanged.** The card demonstration reveals the missing card, and the explanation of “zero knowledge” substitutes non-transferability for the actual privacy property. Other substantive corrections include the independent-test assumption in Bayes, the causal rule in Simpson, the explanation of muscular effort, and WHO's missing recommendation for one-year-olds.

The production tools also have reproducible faults: interrupted TTS work loses reusable cache entries; caption sizing accepts words that cannot fit; the sync metric largely measures its own fitting targets; and the balls' displayed probabilities disagree with the spoken checkpoints. Passing TypeScript does not establish that a video is correct.

| Area | Verdict |
|---|---|
| Code | A working prototype with production reliability gaps. Fix cache recovery, validation, caption guarantees and animation timing before extending it. Both type-checks pass; the series project's ESLint check fails. |
| Scripts and plans | Substantial factual and explanatory revisions are needed. The first video's central examples need correction. Several other scripts overstate what their evidence establishes, and eleven unproduced shorts still lack the agreed marked pauses. |
| Armenian | Mechanically clean under the owner's lint, with a clear negation error and several meaning/pronunciation issues that lint cannot detect. Native review remains necessary; singular address is an unresolved project choice, not an error to silently “correct.” |
| Documentation/process | Decisions, plans and review interfaces describe different project states. The human-recording intake and the first vertical video's implementation are unfinished. Source and approval records need to identify exact versions. |

**Priority:** correct X20, X21, X25, X27, X38 and X41 before recording those scripts; fix X1–X4 and X11 before relying on production checks. Complete X59 before treating the first release as implementable end to end.

## Scope, checks and limitations

Read all **24** `*/beats.hy.json` files and all **23** `*/PLAN.md` files. The pilot has no PLAN.md. Read the nine tools, the series renderer and its asset cutter, the pilot Remotion sources, the relevant decisions/process notes and short-video learnings. Consulted the earlier Fable reviews as editorial opinions, not validation results. Checked consequential factual concerns against primary papers, official documentation and museum sources; this was not a fresh verification of every historical detail in every plan.

Applied the owner's read-only [Armenian style guide](C:/Users/hayk_/.claude/skills/armenian-style-guide/SKILL.md), its owner decisions, checklist and glossary. Suggestions identified as native-review questions below are deliberately not presented as settled grammar rules.

Executed the following without rendering, paid calls, package installation, secret access, or changes outside this report:

```text
render/: node node_modules/typescript/bin/tsc --noEmit --incremental false
  exit 0
bakeoff/remotion/: same command
  exit 0
render/: node node_modules/eslint/bin/eslint.js src
  Story.tsx:86:53: 'dur' is assigned a value but never used
  @typescript-eslint/no-unused-vars; exit 1
bakeoff/remotion/: same ESLint command
  exit 0
All 9 tools: Python ast.parse succeeds.
Armenian lint_text(..., '.txt', style=True), using extracted values in memory:
  343 narration/screen/source-line strings: 0 errors, 2 hints
  152 Armenian TS/TSX AST string/text nodes: 0 errors, 1 hint
```

The hints are contextual false alarms or accepted usage: a refrigerator “works,” `իրականում` contrasts posted and actual waiting, and the archived cave's `կողմից` means “from the side.” I did not turn these into findings. Technical terms checked against the glossary include probability, variance, weighted average, regression, projection and proof-related vocabulary; the glossary does not settle every series-specific term.

The pilot's separate `labels.hy.json` also has no lint errors and matches its copied renderer labels. The series type-check excludes `src/zk/drafts`; it does not certify the archived cave's relocated imports, whose need for repair is already documented in that archive's README.

Python reproductions compiled selected function definitions/constants into memory. They did **not** import the pipeline modules with their file-writing logging setup. File output was intercepted for the sync-check reproduction; the TTS reproduction used an entirely in-memory filesystem and mocked synthesis. Existing JSON/audio were read for numerical checks. The Dmanisi photograph was inspected directly. I did not watch or listen to rendered videos, so observations about animated output below are code/timeline findings, not claims of audiovisual QA.

## Code

### X1 — Interrupted TTS runs discard valid cache metadata (medium)

**Location:** `tools/tts_gemini.py:153-171`.

**Evidence:** the new manifest starts with an empty `beats` dictionary and replaces the old manifest after each newly synthesized beat. Entries for old clips not yet visited disappear. Reproduction with existing paid clips `a`, `b`, `c`, changed text for `a` and `b`, and a simulated failure on `b`:

```text
after failed b: manifest keys ['a']; all three WAV files still exist
retry synthesized ['b', 'c']
```

`c` was unchanged and already existed, but its lost metadata forces another paid call. This contradicts the recovery comment on line 170.

**Fix:** keep cache records independently of the current script's assembled manifest, with text/model/voice/style fingerprints per clip. Preserve unvisited old entries during recovery and write JSON atomically. Validate a cached WAV before reuse. Add the interruption scenario above as a small offline test.

### X2 — Caption sizing returns success even when a word cannot fit (medium)

**Location:** `tools/build_timeline.py:163-178,235-243`; default pilot caption consumer `bakeoff/remotion/src/Composition.tsx:68-76`.

**Evidence:** `n_lines()` counts an oversized first word as one line; `fits()` checks only the line count. `page_size()` stops at 48 px without asserting that the result actually fits. Measured using the configured font/weight and 32 px word margins:

```text
real script token                         width at 48 px    box
բաժանորդագրություններում։                806.8 px          640 px
ուլտրամանուշակագույն                     661.6 px          640 px
մեկնաբանություններում՝                   686.7 px          640 px
```

These occur in `decoy_popcorn/beats.hy.json:44`, `painted_statues/beats.hy.json:10` and `yawning/beats.hy.json:59`. A synthetic oversized word likewise returns `n_lines=1`, `fits=True`, `size=48`. Smaller V2/landscape captions can avoid some overflows, but the advertised common sizing guarantee is false for its documented layout.

**Fix:** include maximum word width in `fits()`, validate the final result, and define an explicit fallback: split/hyphenate at approved boundaries, change the wording, or use a wider caption profile. Do not silently return an impossible minimum size.

### X3 — The sync score is not evidence of word-level accuracy (medium)

**Location:** `tools/build_timeline.py:115-141`; `tools/check_sync.py:52-74`; `README.md:60-65`; `PROCESS_NOTES.md:30-31,59`.

**Evidence:** timing is fitted to pauses detected at approximately −35 dB/80 ms, then checked against essentially the same pauses. The checker examines punctuation boundaries, not spoken word identities. It also excludes errors over one second from the error distribution by turning them into unmatched rows. The saved pilot report contains:

```text
breaks_checked: 20; median_abs_error_s: 0.034
max_abs_error_s: 0.928; unmatched_pauses: 14
```

The small median neither covers the unmatched boundaries nor establishes that the right word was assigned to a pause. `_learnings/2026-11-25-1033_caption_timing_snap_to_real_pauses.md` acknowledges circularity, but the main workflow still calls this the sync test. There is no pass/fail threshold.

**Fix:** rename it a pause-consistency diagnostic; report all expected boundaries, unmatched counts and coverage alongside errors. Fail a configurable quality gate on insufficient coverage or large errors. Establish independent manually marked word checkpoints, especially around numbers, and assess those before claiming karaoke accuracy. A forced aligner is an option, not a prerequisite for creating that small reference set.

### X4 — Unmatched sync rows produce logging tracebacks while the command succeeds (low)

**Location:** `tools/check_sync.py:60-63,77-82`.

**Evidence:** an unmatched punctuation row has `pause_start=None` and `pause_len=None`, but line 81 formats both with `%.2f`. Running the actual pilot analysis with report writes suppressed and logging enabled produced **three** `--- Logging error ---` tracebacks containing `TypeError: must be real number, not NoneType`. The function returned normally. This is a logging failure, not an uncaught process crash.

**Fix:** log unmatched punctuation separately, using its predicted time and a clear “no matching pause” message. Add a case containing a comma without a detected pause. Keep quality-gate failure separate from logging failure.

### X5 — Audio intake does not handle silence or the promised human recording formats (medium)

**Location:** `tools/build_timeline.py:54-71,266-271`; `zero_knowledge/PLAN.md:128-143`.

**Evidence:** `trim([])` raises `ValueError: max() iterable argument is empty`; an all-zero mono clip raises `StopIteration`. The intake accepts only 16-bit mono WAV, while the recording guide explicitly accepts any format, including phone `.m4a`. No supplied command imports/converts/splits that recording and creates the manifest required by the timeline. The manual steps are acknowledged in the plan, but the bridge is still missing.

**Fix:** validate nonempty audible audio with a beat-specific error. Supply a separate recording-import step that preserves the original, converts channels/sample format, records selected beat boundaries and creates a correctly labelled manifest. It must identify Hayk as narrator rather than retaining the temporary Gemini voice/model metadata. Do not offer arbitrary recording formats without documenting their conversion path.

### X6 — Decimal spelling loses the decimal places (medium)

**Location:** `tools/hy_numbers.py:54-65`.

**Evidence:** converting the fractional part to `int` erases leading zeros:

```text
spoken('0,05')  -> զրո ամբողջ հինգ
spoken('0,005') -> զրո ամբողջ հինգ
```

Different numbers become the same spoken representation and timing weight. This is an edge-case defect, not a claim that the current scripts contain these two decimals. Ordinal/article suffixes also remain orthographic fragments, as the docstring admits, so this is not generally “the way the narration says” every digit token.

**Fix:** preserve fractional precision and choose one documented Armenian reading convention, such as digit-by-digit fractional reading or named decimal units. Test zero, leading-zero fractions, grouped integers, ordinal suffixes and the actual number forms used by the scripts. Reject unsupported forms rather than implying exact speech prediction.

### X7 — The TTS default contradicts the chosen voice style (medium)

**Location:** `tools/tts_gemini.py:42-45,203-205`; `../DECISIONS.md:37-42`.

**Evidence:** the selected default is Sadaltager **without** a style prompt, but `DEFAULT_STYLE` remains “Calm, clear university lecturer explaining mathematics to students, moderate pace.” The README command overrides it correctly; the tool itself and its usage examples do not. Forgetting the extra flag changes both the delivery and the cache fingerprint.

**Fix:** make the short-series default empty and provide the lecturer style as an explicit preset if it is still useful. Update the copied qysu-specific comments/docstring at the same time.

### X8 — Importing helpers writes files and redirects another tool's logs (low)

**Location:** `tools/tts_gemini.py:51-55`; `tools/gemini_review.py:25-33`; analogous setup in the other tools and `render/sync_short.py:18-21`.

**Evidence:** imports create the root `logs` directory and instantiate file handlers. `gemini_review` imports `tts_gemini` first, which configures the root logger; its subsequent `basicConfig()` normally does nothing because handlers already exist. Review messages therefore go to the TTS logging configuration, while the requested review handler may merely create an unused file. Ordinary imports also have filesystem side effects, complicating read-only checks and reuse.

**Fix:** initialize logging only in CLI entry points, use one small shared setup helper, and keep audio/HTTP utilities importable without I/O. Give each run a clear operation/episode identifier.

### X9 — There is no common preflight contract before paid or destructive-to-cache work (medium)

**Location:** `tools/tts_gemini.py:149-156`; `tools/build_timeline.py:252-285`; `render/src/zk/Long.tsx:15-19`; `bakeoff/remotion/src/data.ts:18-25`.

**Evidence:** the code assumes JSON structure and uses unchecked `as unknown as` casts. It does not first verify unique/nonempty beat keys, nonempty narration, finite nonnegative pauses, valid manifest entries, or ordered/finite word/page times. Duplicate keys share audio filenames and dictionary entries. A malformed later beat can be discovered after earlier paid work or cache changes. Current scripts have unique keys; this is a missing production boundary, not an allegation that they currently contain duplicates.

**Fix:** implement one offline episode validator used before TTS, timeline generation and synchronization. Validate all inputs before doing work, and validate generated timelines at the renderer boundary. Test only meaningful failure cases, especially duplicate keys, invalid pauses, missing clips and incompatible audio.

### X10 — Copied render inputs have no provenance or freshness check (medium)

**Location:** `render/sync_short.py:28-35`; `render/src/zk/Long.tsx:8,18-22,172`; `tools/build_timeline.py:264-265`.

**Evidence:** timeline generation checks narration text against the manifest, but that protection ends before the renderer. The renderer reads a copied JSON file and a separately copied WAV with no build identity. Editing a script or rebuilding audio without rerunning synchronization can silently render older content. Interruption between the two copy operations can pair different versions. The current `zero_knowledge` source and copied timelines are byte-identical; the finding concerns missing protection, not a detected current mismatch.

**Fix:** put script/audio hashes and a build ID in the timeline; copy a complete build as one versioned unit and verify the selected audio and timeline together. Provide a read-only `preflight` that reports stale artifacts before a render. Do not make “build” implicitly trigger paid TTS.

### X11 — The balls' probability display contradicts the spoken numbers (medium)

**Location:** `render/src/zk/Long.tsx:40-49,105-111`; `render/src/zk/Balls.tsx:16-26,123-151,178`.

**Evidence:** `fitRounds()` fits nineteen accelerating rounds only to the final “Քսան ռաունդից” checkpoint. It does not align the intermediate 1/2, 1/4, 1/1024 and approximately 1/million statements. Recomputing the existing guide timeline and the exact scheduling formula gives:

```text
spoken checkpoint       absolute time    animation's completed rounds
Երկու                   162.928 s        3  (display 1/8)
տասը                    165.488 s        7  (display 1/128)
քսան                    167.165 s        11 (display 1/2048)
Քսան [ռաունդից]         169.912 s        20 (display 1/1048576)
```

The last match conceals the earlier contradictions. More generally, `at()` at lines 30-33 accepts the first prefix match without checking uniqueness, so a wording change can silently bind a cue to a different occurrence.

**Fix:** anchor the probability checkpoints individually, with phase/round counts validated against narration markers. Alternatively, animate the rounds first and then show the narrated values as separate frozen examples. Give repeated phrases explicit occurrence/marker identities; validate phase ordering and minimum readable durations when fitting Hayk's recording.

### X12 — The hidden-round answer is visible before the answer phase (medium)

**Location:** `render/src/zk/Balls.tsx:140-148,170-174`; `zero_knowledge/beats.hy.json:49`.

**Evidence:** the fast-round answer text is always derived from `SWAPS[k]`; before the answer it is drawn at opacity **0.25**, not hidden. Thus “փոխեցիր” or “չփոխեցիր” is already readable during the covered/guessing phase. This conflicts with the planned viewer participation. The illustrative split view should distinguish an omniscient explanation from what the verifier can observe.

**Fix:** render the answer only after the response checkpoint. Keep the private swap choice and the verifier's public observation visually separate; reveal the explanation after the viewer has had a chance to guess.

### X13 — The two supposedly identical film strips have different numbers of surviving frames (low)

**Location:** `render/src/zk/Story.tsx:232-256,262-267`.

**Evidence:** `realOK` contains six successes; `staged` contains five successes and three failures. Removing the failures leaves five frames next to six, while the label says `նույնն են`. This is an avoidable visible contradiction at the exact point where the viewer is asked to trust an indistinguishability argument.

**Fix:** give the staged strip the same final number/order of displayed successful observations. Prefer explaining that the distributions of observations can match, rather than using editing alone as a substitute for the argument in X21.

### X14 — The minimum caption duration is a best effort, not a guarantee (medium)

**Location:** `tools/build_timeline.py:206-232`; `render/src/zk/Long.tsx:142-151`; `README.md:62-63`.

**Evidence:** short pages are left unchanged whenever neither permitted merge fits. The guide timeline has eighteen pages with speech spans below 0.6 s. Applying the renderer's actual hold-to-next-page rule still leaves **eight displayed pages** below 0.6 s, including `կարմիր է։` at 0.463 s and `բայց չգիտի՝` at 0.504 s. The pilot has no sub-0.6 displayed pages after its hold rule; the landscape guide does. The README's “no page under 0.6 s” promise is therefore stronger than the implementation.

**Fix:** validate actual display intervals after grouping, not just speech spans. Rebalance adjacent groups or explicitly report unsatisfied constraints. For landscape, use its wider layout to group phrases more naturally instead of inheriting portrait three-word pages and ignoring their calculated size.

### X15 — An optional SVG download failure loses credits for a successful image download (medium)

**Location:** `tools/fetch_commons.py:95-109`; `../_learnings/2026-11-25-1700_commons_blocks_bulk_originals_use_thumbnails.md`.

**Evidence:** the thumbnail is saved first, then the original SVG is fetched, and only afterward are credits written. The learning records that originals returned HTTP 429 while thumbnails continued to arrive. In precisely that observed failure mode, the command leaves a usable thumbnail without its new credits record and a retry downloads it again.

**Fix:** make the original optional (`--original`), preserve metadata for each successful asset immediately, and commit downloads/credits atomically where possible. Add bounded retry/backoff for read-only Commons requests and a clear partial-success result.

### X16 — The generated attribution text drops information the project already collected (medium)

**Location:** `tools/fetch_commons.py:33,47-59,107-119`; `pilot_survivorship/assets/credits.txt:1-5`; `bakeoff/sync_assets.py:40-64`.

**Evidence:** `credits()` omits `license_url`, despite storing it in JSON, and the tool requests `Credit` metadata but does not preserve it. There is no changes/adaptation field. The pilot's bomber SVG is actually modified by removing the red-dot group and animating the dots separately. The ready-to-paste credit lines name licenses but provide no license links or modification statement. CC's own [BY](https://creativecommons.org/licenses/by/4.0/) and [BY-SA](https://creativecommons.org/licenses/by-sa/4.0/) summaries require a license link and indication of changes. This finding does not assert that a single embedded image automatically determines the license of the entire video.

**Fix:** retain supplied attribution/credit information, emit the license URL, and record changes such as cropping or animation separately from the source description. Generate credits from the assets actually used, with explicit handling of any adaptation's applicable license conditions.

### X17 — Reproducibility depends on undeclared Python packages and a transitive JS import (medium)

**Location:** `tools/build_timeline.py:14,155-159`; `tools/contact_sheet.py:18`; `render/assets_src/cut_cards.py:14-15`; `friendship/network.py:17`; `bakeoff/remotion/src/Composition.tsx:3`; `bakeoff/remotion/package.json:11-23`.

**Evidence:** there is no requirements file, pyproject or lockfile at the repo root or under `03_shorts/`. Pillow, NumPy and NetworkX are required; `build_timeline` still describes itself as standard-library-only. The pilot imports `@remotion/media` without declaring it directly; the current lockfile supplies it through `@remotion/studio`. That explains why its type-check passes, but makes the import depend on another package's dependency graph.

**Fix:** document/pin the small Python environment and ffmpeg requirement; correct the tool's dependency claim. Declare the pilot's direct media import, or use an already declared supported alternative. Keep the frozen pilot reproducible without requiring a broader refactor.

### X18 — The series project's advertised lint command currently fails (low)

**Location:** `render/src/zk/Story.tsx:86`; `render/package.json:31`.

**Evidence:** ESLint reports unused `dur` in `GossipScene`; `tsc` does not, because the destructured parameter is not diagnosed the same way. The complete check is not green even though TypeScript is.

**Fix:** remove the unused parameter binding or use it for the intended duration fitting, then run the existing lint command. No new test suite is needed for this cleanup.

### X19 — The moving Waldo sheet has an unnecessarily large procedural filter region (low)

**Location:** `render/src/zk/Waldo.tsx:125,154-159,195-198`.

**Evidence:** a 3000×1900 sheet uses a declared **12000×7000** filter region with procedural turbulence. That region contains 84 million logical pixels, over forty output-frame areas. Browser clipping may avoid allocating or processing all of them; I did not benchmark or render it, so this is a concrete performance opportunity, not a measured memory-exhaustion claim.

**Fix:** reduce the filter region to the sheet's needed bounds or use one reusable static procedural texture/pattern. The texture need not be regenerated as a moving filtered path on every frame. Check this hotspot when the next authorized render is profiled.

## Video scripts and plans

### X20 — The red-card demonstration reveals the exact card (high)

**Location:** `zero_knowledge/beats.hy.json:41-43`; `zero_knowledge/PLAN.md:19-20,83-84,109-113`; `render/src/zk/Deck.tsx:12-15,108-140`.

**Evidence:** the narration says `Կապոցի մնացած 51 քարտը շրջում ես` and concludes that the friend does not know which red card is missing. In a standard deck, revealing the other 51 identifies the missing card by elimination. The implementation fixes it as `hQ` and flips **every** remaining card; dimming the red cards afterward does not undo that disclosure. This is not a minor approximation: it defeats the example's central privacy claim.

**Fix:** reveal only the 26 distinct black cards, while keeping the other red cards concealed and shuffled throughout. Establish that the original deck is the agreed complete deck. Change the voice, storyboard and animation together. The corrected example can then show that no black card is missing without showing which red one is.

### X21 — “Why zero knowledge” teaches the wrong defining property (high)

**Location:** `zero_knowledge/beats.hy.json:59-61`; `zero_knowledge/PLAN.md:24-25,78-80`; `render/src/zk/Story.tsx:239-267`.

**Evidence:** the explanation centers on a film convincing nobody and `առանց որևէ տեղեկության, որ կարողանա ուրիշին տալ`; the screen says `փոխանցվող տեղեկություն՝ 0`. A conversation being forgeable or non-transferable does not establish that it leaked no secret information to its participant. Conversely, non-interactive ZK proofs can be publicly verifiable and transferable. The later Zcash example makes this conceptual mismatch particularly consequential.

The actual criterion is that the verifier's observations can be simulated without the secret, given the public statement. See [Goldreich's tutorial](https://www.wisdom.weizmann.ac.il/~oded/zk-tut02.html) and [the distinction illustrated by non-interactive ZK](https://www.cs.utexas.edu/~dwu4/courses/fa22/static/lecture26.pdf).

**Fix:** explain the balls' simulator: someone who does not distinguish the colors can prepare the same-looking challenge/answer record in advance, but cannot reliably answer fresh hidden random challenges live. What the verifier learns is the claimed difference, not the red/green assignment. Present non-transferability as a feature of this interactive example, not the definition of all zero-knowledge proofs. Drop the universal “nothing he can give another person” formulation.

### X22 — Waldo needs a hidden setup and an explicit analogy caveat (medium)

**Location:** `zero_knowledge/beats.hy.json:29-37`; `zero_knowledge_short/beats.hy.json:16-18`; `render/src/zk/Waldo.tsx:120-124,194-213`; `zero_knowledge/PLAN.md:72-77`.

**Evidence:** neither spoken script says the verifier must not observe where the sheet/page is positioned. The animation shows the page's location and a translucent sheet sliding over it while both participants remain present. A verifier who follows that motion already knows where the hole is relative to the page. Separately, the plan acknowledges local visual leakage but leaves it out while the voice speaks absolutely. The [original authors](https://www.wisdom.weizmann.ac.il/~/naor/PUZZLES/waldo_sol.html) explicitly identify their solutions as imperfect because surrounding details are revealed.

**Fix:** establish the page and sheet are positioned out of the friend's view; distinguish the explanatory view from the friend's actual view. Cover page edges and external positional references. Say it is an intuition-building analogy with a small local leak, or restrict the claim to hiding the overall position rather than revealing literally nothing else.

### X23 — The real-world ZK examples omit what makes the underlying assertion trustworthy (medium)

**Location:** `zero_knowledge/beats.hy.json:10,65,71`; `zero_knowledge_short/beats.hy.json:10`; `render/src/zk/Story.tsx:176-188,293-337`.

**Evidence:** age and salary appear to be proven just by knowing private values. Proving that some privately entered date makes a person over 18 does not prove that it is their authentic birth date. Similarly, the opening says websites and banks solve “the same problem every day,” while the plan admits no evidence that ING used its method in actual lending (`PLAN.md:86-96`). The SMP ending is a genuine application, but an equality check still permits guessing candidate answers; a small set of plausible gossip secrets is not automatically protected against repeated guesses. The [OTR specification](https://otr.uwaterloo.ca/Protocol-v3-4.1.1.html) defines a particular shared-secret equality/authentication operation, not semantic proof that someone knows a piece of gossip.

**Fix:** add one plain sentence that real systems prove a condition about authenticated/signed data. Distinguish deployed behavior from demonstrations and published methods. Explain that the chat compares the same agreed answer and that an equality test reveals a match/mismatch; avoid implying unrestricted, consequence-free interrogation of low-entropy secrets. These are limits of the hook's promise, not reasons to remove the examples.

### X24 — The Short's central question never gets its own payoff (medium)

**Location:** `zero_knowledge_short/beats.hy.json:4,10,16,22,27`; `zero_knowledge_short/PLAN.md:7-12`.

**Evidence:** it asks how to tell whether the friend knows Ani's secret, then shows a location-hiding analogy. That does not answer the shared-secret comparison question. The teaser names the cards, balls and terminology, but never returns to the specific gossip question. A viewer who does not follow the long-video link leaves with the original problem unresolved.

**Fix:** either make the hook the Waldo question that this Short actually resolves, or spend one short closing sentence on the matching-secret check and explicitly point to its explanation in the long video. The related-video link should deepen a completed idea, not supply its missing answer.

### X25 — Repeating a diagnostic test does not automatically produce the stated 99% result (high)

**Location:** `bayes_test/beats.hy.json:58-59`; `bayes_test/PLAN.md:93-96`.

**Evidence:** the plan correctly identifies conditional independence as necessary for this calculation, but the voice says merely “better with another method” and then states an approximately 99% posterior. With prevalence 1%, sensitivity/specificity both 99%, independent errors give

```text
P(D | two positives) = (.01 × .99²) / (.01 × .99² + .99 × .01²) = .99
```

If the second test repeats the first test's errors perfectly, the posterior stays **50%**. A different method can reduce dependence but does not establish independence. Showing all ten healthy icons cleared also turns an expected residual of about 0.1 into apparent certainty. The medical extension deserves this assumption in the spoken explanation. [WHO's confirmatory strategies](https://www.who.int/publications/b/72663) are validated testing algorithms, not a general instruction to repeat any test twice.

**Fix:** say that the 99% is for this hypothetical example **if the tests' errors are independent**. Show the residual as an expectation, not ten guaranteed clearances. Frame the clinical takeaway as using the appropriate confirmatory algorithm, not self-selecting an arbitrary repeat test.

### X26 — Bayes silently upgrades an ambiguous accuracy claim and overgeneralizes the doctors result (medium)

**Location:** `bayes_test/beats.hy.json:4,9,20,51`; `bayes_test/PLAN.md:85-86,100-115`.

**Evidence:** `Ի՞նչ է նշանակում 99 տոկոս` introduces equal sensitivity and specificity as if “99% accurate” necessarily meant those two rates. It does not. The hook also claims most doctors would answer 99%, whereas the cited teaching-session result concerned a different mammography question and mostly answers of 90%/81%, not the current toy test. I obtained the [primary paper](https://web.mit.edu/5.95/readings/gigerenzer.pdf), p. 55: it supports 160 gynecologists, 21% before and 87% after training in that session. The plan's uncertainty about whether the cohorts match can be removed; the broad population claim still cannot be inferred from that session.

**Fix:** say “In our example, assume it finds 99 out of 100 sick people and wrongly flags one out of 100 healthy people.” Replace the universal doctors claim with a precisely scoped observation that similar errors occurred in a group of doctors. Keep the verified training result, and update the plan to cite the accessible primary copy.

### X27 — Simpson's rule substitutes timing for a causal model (high)

**Location:** `simpson/beats.hy.json:9,36,64-65`; `simpson/PLAN.md:115-123`.

**Evidence:** “existed before treatment → compare groups; caused by treatment → use the total” is not a valid general adjustment rule. A pre-treatment variable can be a collider, and deciding between totals and strata depends on the causal question and structure, not chronology alone. See the pre-treatment M-bias example in [Cinelli, Forney and Pearl's paper](https://doi.org/10.1177/00491241221099552). The script also calls one historical treatment “better” on the basis of observational success rates, even though its own plan acknowledges different treatment eras and no randomization. The [original study](https://www.bmj.com/content/bmj/292/6524/877.full.pdf) confirms the different periods.

**Fix:** narrow the rule to this example: stone size affected both treatment selection and outcome, so an aggregate comparison mixes case severity. Say the recorded success rate was higher within both size groups; do not conclude causal superiority from these data. End with a question about why the groups differ. A general causal-adjustment lesson needs its own explanation, not a misleading exception in one sentence.

### X28 — The Berkeley voice and picture use different populations (medium)

**Location:** `simpson/beats.hy.json:52-54`; `simpson/PLAN.md:91-107,134`.

**Evidence:** the spoken **44% men / 35% women** are campus-wide rates. The proposed animated crowds and easy/hard split use the six largest departments, whose rates in the plan are **44.5% / 30.4%**. Animating the six-department population cannot simultaneously reproduce the campus-wide women's figure. The plan already contains enough information to catch this without another source.

**Fix:** use the six-department rates consistently and label the scope, or show campus-wide results separately before explicitly changing to a six-department subset. Do not imply that splitting the same displayed people yields both datasets.

### X29 — The weighted-average visual omits normalization (medium)

**Location:** `simpson/beats.hy.json:46-48`; `simpson/PLAN.md:133`.

**Evidence:** the card is specified as `93% × 87 + 73% × 263 -> 78%`, without division by 350. That expression is about 273, not 78%. The B expression using rounded percentages is 290.1, not the actual 289 successes. An arrow alone conceals the defining operation the viewer is meant to learn.

**Fix:** show `(81 + 192) / (87 + 263) = 78%`, then reveal equivalent normalized weights `87/350` and `263/350` if needed. Use exact counts for the computation and rounded percentages only as display labels.

### X30 — Regression's proposed causal check needs comparable, randomly assigned groups (medium)

**Location:** `regression/beats.hy.json:20,62-63,67`; `regression/PLAN.md:108-110`.

**Evidence:** `Եթե նրանք էլ նույն կերպ են փոխվել, գործը բախտինն էր` treats a similar change in an unspecified unpraised/unscolded group as proof that luck caused it. Different groups may differ in skill, selection and learning; a null difference also does not identify all the causes. The opening model's fixed skill plus fresh independent noise is an assumption, not a universal law of training. The plan expressly parks learning outside the narration.

**Fix:** say to compare comparable cadets with similarly extreme initial performances, randomly assigning feedback where practical. Explain that this estimates feedback's effect beyond the change that would occur anyway. Present skill plus noise as the demonstration's model, and say regression can explain the pattern without establishing that praise never helps or scolding never harms.

### X31 — The planned regression chart cannot contain all its simulated students (medium)

**Location:** `regression/beats.hy.json:27`; `regression/PLAN.md:114-116`; `regression/simulate.py:31-33`.

**Evidence:** the histogram axis is specified as 40–100, but the existing generated data contain:

```text
test 1: min 31.3, max 110.6; 10 values outside 40–100
test 2: min 34.6, max 103.0;  9 values outside 40–100
```

Clipping or dropping those points would preferentially hide the extremes this video discusses. Treating the scores as a literal 0–100 exam also conflicts with the unbounded normal model.

**Fix:** label them as simulated performance scores with a full data-derived axis, or choose a bounded model and regenerate/recheck every quoted summary. Add a visible `մոդելավորում` label so invented students cannot be mistaken for observed research data.

### X32 — Friendship changes the averaging procedure halfway through (medium)

**Location:** `friendship/beats.hy.json:21-22,53-60`; `friendship/PLAN.md:53-56`; `friendship/network.py:42-48`.

**Evidence:** the generated network correctly distinguishes:

```text
mean degree                         3.60
mean of each person's friends' mean 5.18
random edge endpoint's mean degree  4.92 = 3.60 + 4.74 / 3.60
```

The narration moves from averaging each person's friends to `պատահական ընկերը` and the formula without explaining the changed sampling. Picking a random person and then one of that person's random friends is not generally the same as picking a uniform friendship endpoint. The formula card can look like a derivation of the earlier 5.18 when it is not. Nor does the theorem by itself guarantee a majority have fewer friends in every possible network.

**Fix:** choose one sampling/averaging story and carry it through. For `μ + D/μ`, explicitly pool all friend-list entries and sample one entry; popular people appear repeatedly. Treat 17/20 and Facebook's result as properties of those networks, not a theorem about every viewer. Cut the formula rather than introduce a second mean without explaining it.

### X33 — Popcorn is not a clean dominated-decoy demonstration, and the caveat is oversold (medium)

**Location:** `decoy_popcorn/beats.hy.json:9-27,44-52,56`; `decoy_popcorn/PLAN.md:60-65`.

**Evidence:** medium at 1800 and large at 2000 trades quantity for price: without specified quantities, the medium is not strictly dominated in both attributes. That example can illustrate reference-dependent value, but it is less clean than the same-price print/bundle case. The caveat then rescues the hook with “numbers work; popcorn has a numerical price,” a stronger conclusion than the [19-study paper](https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/The-Limits-of-Attraction-1.pdf) licenses for every numerical menu. Removing the option nobody buys is also not a reliable consumer rule: low popularity does not identify domination or irrelevance to one's own needs.

**Fix:** make the dominated attributes explicit or present popcorn as a possible application and use the subscription example for the actual demonstration. Say numerical attributes made the effect more robust in these experiments, not universally reliable. End by comparing the two options against one's needs/budget independently of the distractor, rather than guessing what everybody else buys.

### X34 — Dmanisi's conclusion creates a false either/or (medium)

**Location:** `dmanisi/beats.hy.json:35,41,47`; `dmanisi/PLAN.md:11-16,53-57`.

**Evidence:** `կամ ինքը ... կամ նրան օգնեցին մոտիկները` presents self-adaptation and social help as mutually exclusive. Both could have occurred. A bonobo's unaided survival establishes that help is not necessary in every case; it does not estimate the probabilities of explanations for this hominin. The plan had read only a summary of the bonobo paper. The [primary paper](https://kokolopori.hsites.harvard.edu/sites/g/files/omnuum5861/files/kokolopori/files/surbeck_2020.pdf) does support prolonged survival without others' assistance, so the counterexample itself survives checking.

**Fix:** say soft food, adaptation and help may all have contributed, and the fossil does not distinguish their contributions. The useful lesson is that survival does not uniquely prove care, not that science offers two equally likely competing stories.

### X35 — The chosen Dmanisi hook photograph has no tooth to circle (medium)

**Location:** `dmanisi/beats.hy.json:6`; `dmanisi/PLAN.md:69-70`; `dmanisi/assets/d3444_skull.jpg`.

**Evidence:** the storyboard calls for circling the single remaining tooth in this photograph. The actual image shows the toothless cranium/maxilla, without the associated lower jaw. I inspected the asset: it cannot supply the specified single-tooth detail. The source plan correctly distinguishes cranium D3444 and mandible D3900 elsewhere.

**Fix:** obtain and identify an appropriate photograph/scan of the associated mandible, or change the hook image to highlight the resorbed tooth sockets actually visible. Do not draw a circle around an absent anatomical feature.

### X36 — Mashtots's hook and one-to-one principle are stated too absolutely (medium)

**Location:** `mashtots/beats.hy.json:4-10,25-33`; `english_spelling/beats.hy.json:35-37`; `mashtots/PLAN.md:10-15`.

**Evidence:** lacking a dedicated Greek letter is not the same as being unable to write a word with Greek letter combinations; letter names such as `ծա` are also not the sounds themselves. “One sound, one letter” is an oversimplification even for Classical Armenian: `ու` represents /u/ as a digraph. A [scholarly grammar](https://mudrac.ffzg.hr/~rmatasov/ARMENIAN2.pdf) explicitly identifies that Greek-influenced spelling. Modern Greek sound inventories, Classical Armenian and today's Armenian must not silently be treated as the same system.

**Fix:** make the challenge “one Greek letter per Armenian sound” and explain that the Greek alphabet lacked dedicated signs for some Armenian distinctions. Describe the design as fitting Armenian's sound system much more closely, rather than a perfect one-to-one encoding. Use the same qualified formulation in the English spelling video.

### X37 — English spelling's history becomes a single-cause fable (medium)

**Location:** `english_spelling/beats.hy.json:10,16-35,41-46`; `english_spelling/PLAN.md:53-68,72-74`.

**Evidence:** “English once was written exactly as read,” followed by the vowel shift plus printing, is too comprehensive a story for the claim made. The plan itself lists borrowed spellings and learned respellings, then removes them from the script. The hook's consonant losses are not all explained by the Great Vowel Shift, which concerns vowels. “Armenian started from the opposite principle” also falsely suggests early English spelling did not attempt to represent speech. Finally, a full reform *would make old books suddenly hard to read* is asserted as a settled outcome rather than one proposed obstacle.

**Fix:** say that many apparently silent letters preserve earlier pronunciations, and that sound change and spelling standardization explain much of the mismatch. Use the `knight` example for consonant loss and `house` for vowel change explicitly. Present old-book compatibility as a reform tradeoff, not an established universal consequence. Remove stale animation instructions for the cut vowel chart/debt/island scenes.

### X38 — The suitcase video conflates mechanical work with metabolic energy (high)

**Location:** `luggage_wheels/beats.hy.json:4,10,16,22,34`; `luggage_wheels/PLAN.md:44-54`.

**Evidence:** it explains the effort of carrying chiefly by vertical bobbing, then closes with the textbook and the legs “disagreeing.” They do not disagree: zero net mechanical work on an idealized load does not imply zero metabolic energy expenditure. Even holding a load stationary costs muscular energy. The [load-carriage study](https://pmc.ncbi.nlm.nih.gov/articles/PMC3922835/) distinguishes mechanical work from metabolic cost; the [physiology of isometric contraction](https://onlinelibrary.wiley.com/doi/10.1002/j.2040-4603.2015.tb00619.x) also makes the distinction explicit. Otherwise the viewer learns that removing vertical motion would remove the effort, which is false.

**Fix:** name both quantities in the explanation. Say muscles consume energy to maintain force even without moving the load, and walking adds repeated positive work/other costs. The wheel transfers support to the floor and reduces the load-carriage work. Show a four-wheel case if claiming the floor supports all the weight; the plan itself notes a two-wheel tilted case also loads the hand. End with the distinction, not a claim that the textbook was refuted.

### X39 — Egyptian blue's illumination and emission are reversed (medium)

**Location:** `painted_statues/beats.hy.json:10-12`; `painted_statues/PLAN.md:9-10,51-53`.

**Evidence:** `ինֆրակարմիր լույսի տակ փայլում է` describes infrared illumination. The relevant conservation technique excites Egyptian blue with **visible light** and records its **near-infrared emission**. See the [University of Michigan project's imaging description](https://sites.lsa.umich.edu/color-roman-egypt/imaging/). The plan's English quotation about infrared luminescence has been turned into the wrong mechanism in Armenian.

**Fix:** say visible illumination makes the pigment emit infrared light, detected with a suitable camera. Animate the incoming and outgoing wavelengths distinctly. Keep false-color/processed views identified as diagnostic images or illustrations rather than what an unaided eye sees.

### X40 — The dog-yawning extension treats a contested familiarity result as settled (medium)

**Location:** `yawning/beats.hy.json:42-44`; `yawning/PLAN.md:61-62`.

**Evidence:** after carefully presenting mixed human empathy results, the script says it was subsequently established that dogs respond more to their owner's yawn. A [2020 reanalysis of six studies](https://pubmed.ncbi.nlm.nih.gov/32075525/) supported contagious yawning in dogs but found no evidence of a familiarity bias. That does not erase the earlier positive study; it prevents presenting its owner/stranger result as the final answer. The extension currently undermines the very uncertainty the main story explains.

**Fix:** keep the original 21/29 result explicitly as one experiment, and either qualify owner preference as disputed or remove that clause. Do not infer the amount of empathy a person or dog has from whether they yawn. The dog extension is optional; the human evidence already supplies the video's main turn.

### X41 — The WHO screen-time line leaves out one-year-olds (high)

**Location:** `kids_tv/beats.hy.json:47-49`; `kids_tv/PLAN.md:16-17,72-75`.

**Evidence:** both the voice and age graphic prohibit screens only under one, then jump to a one-hour recommendation at ages two through four. The cited [WHO 2019 guidance](https://www.who.int/news-room/detail/24-04-2019-to-grow-up-healthy-children-need-to-sit-less-and-play-more) also recommends **no sedentary screen time for one-year-olds**. That missing year is directly relevant to the toddler audience and may be read as permission for unrestricted viewing during it. “No sedentary screen time” also has a narrower, more accurate meaning than no screen use of any kind.

**Fix:** accurately state no sedentary screen time for under-twos, then no more than one hour for ages two through four, with less preferred. Match the age graphic to the wording. Keep WHO guidance and any other organization's guidance clearly attributed rather than blending their age bands.

### X42 — CoComelon's causal explanation is more confident than the research (medium)

**Location:** `kids_tv/beats.hy.json:10-15,25-31,36-42,58`; `kids_tv/PLAN.md:54-76`.

**Evidence:** the voice calls the orienting reflex “the first cause” and says small children understand the simple songs completely. The plan admits no measured cut rate and almost no study isolating this show. Evidence about preschoolers understanding Sesame Street is being generalized to toddlers and another format. The 2011 experiment's pace/fantasy confound is acknowledged, but the scientific thread stops there; [later experimental work](https://pmc.ncbi.nlm.nih.gov/articles/PMC7759480/) addresses fantastical content and reinforces the need not to equate “fast cuts” with the demonstrated cause. The ending also categorically says the child is not addicted, something these studies cannot diagnose for a particular child.

**Fix:** present novelty, comprehensibility and repetition as plausible contributing mechanisms supported by broader research. Avoid “every change”/“understands everything” absolutes. Separate what the 2011 experiment measured from claims about this show, mention the later evidence if retaining the harm discussion, and replace the diagnostic-sounding reassurance with a description of attention. Keep practical co-viewing/autoplay advice distinct from experimentally established mechanisms.

### X43 — The own-voice ending turns a useful approximation into an absolute (medium)

**Location:** `own_voice/beats.hy.json:4,24,40-51,62-63`; `own_voice/PLAN.md:52-65`.

**Evidence:** the opening correctly says a recording is *approximately* how others hear us. The ending says `ձայնագրությունը քեզ չի աղավաղում` and implies subtraction of bone conduction is its only change. Real recordings also depend on microphone response, position, room acoustics and processing. Likewise, an experiment in which people rated their unidentified voice favorably does not establish that dislike of recordings is solely surprise or that it normally disappears after only a few plays. [Work on self-voice perception](https://pmc.ncbi.nlm.nih.gov/articles/PMC9929504/) identifies additional vibrotactile and perceptual factors.

**Fix:** preserve the approximation through the close: a reasonably faithful recording lacks an internal component familiar to the speaker. Say unfamiliarity can contribute to the reaction; do not promise that it is the whole explanation or that a specified small amount of repetition resolves it. In the plug-your-ears example, distinguish the occlusion effect's bass/loudness increase from a pitch increase (X53).

### X44 — Crypto's security claim needs parameters and a computational qualifier (medium)

**Location:** `crypto_paint/beats.hy.json:45-51,67,72-73`; `crypto_paint/PLAN.md:64-70`.

**Evidence:** the plan explicitly says the accurate claim is “no known fast method,” yet the visual puts `անհնար` on the reverse arrow. “Hundreds of digits” alone does not establish a hard discrete-log instance: the group, subgroup and sizes matter. Known quantum algorithms also make an unqualified mathematical “nobody knows a fast way” too broad. [RFC 9325](https://www.rfc-editor.org/info/rfc9325/) illustrates that real deployments specify minimum group/key sizes, not simply “a big prime.” The all-internet-secrets ending is broader than the key-agreement mechanism actually demonstrated.

**Fix:** say carefully chosen large parameters have no known practical fast classical attack, and label the arrow `գործնականում դժվար` or equivalent owner-approved wording. Explicitly mark the paint as an analogy, not a physical security experiment; adding/subtracting pigment quantities is not the discrete-log problem. End on agreeing a key over a public channel, with authentication still required. For contemporary browser imagery, avoid implying all viewers still see a padlock: [Chrome replaced it with a tune icon](https://blog.chromium.org/2023/05/an-update-on-lock-icon.html) in 2023.

### X45 — Petrov's Bayesian lesson risks teaching people to ignore the likelihood (medium)

**Location:** `petrov/beats.hy.json:30-31,50-51,65-66`; `petrov/PLAN.md:53-64,74`.

**Evidence:** the lesson contrasts “what the alarm says” with how likely war was without the alarm, and the balance compares a five-missile war with a new system error. Bayes needs both the prior and the signal's reliability; a rare event can become likely after sufficiently strong evidence. The consequences of a false alarm and a missed attack also matter to the decision. “The radar saw nothing” needs care because detection horizons and timing limit what a negative observation establishes. The current framing is especially awkward following a medical-test video meant to teach updating.

**Fix:** make the question “How does this warning change the prior, given the system's known limitations and other observations?” Keep uncertainty and the chain of command. Use the story to illustrate checking an alarm against a model and independent evidence, not a general rule that a machine's confidence should lose to intuition. Move the date/context/award biography out of the opening and main spine to improve the hook without losing the reasoning.

### X46 — The decimal-clock story invents a settled reason for reform's failure (medium)

**Location:** `minute_60/beats.hy.json:4,10,22,34`; `minute_60/PLAN.md:44-55`.

**Evidence:** `Ժամանակը չտեղի տվեց, որովհետև վաթսունը շատ ավելի հին է` and the ending present age/divisibility as the explanation for decimal time's failure. The cited material establishes the reform's dates and sexagesimal history, not that historical causal conclusion. Showing that 60 divides neatly by three does not establish why a whole society did not replace its clocks and habits. The narration also acknowledges we do not know why base 60 originated, then closes more definitively than the evidence permits.

**Fix:** separate three claims: the reform was short-lived; sexagesimal divisions are inherited; divisibility is a useful property of 60. Describe replacement of established practice as a proposed practical obstacle only with supporting evidence, or leave the cause open. Let the fraction demonstration be the payoff rather than proof of the historical explanation. Correct the language defect in X52.

### X47 — Non-divisibility by seven does not disprove lunar influence (low)

**Location:** `week_seven/beats.hy.json:4,10,49`; `week_seven/PLAN.md:50-60`.

**Evidence:** 29.53 not being a multiple of seven establishes that continuous weeks do not exactly partition lunar months. It does not rule out rough lunar quarters having inspired an earlier convention. The [Stern/Bultrighini account](https://discovery.ucl.ac.uk/id/eprint/10126925/3/Stern_Chapter%201.pdf) supports the two traditions used in the video; the [US Naval Observatory's calendar discussion](https://aa.usno.navy.mil/downloads/c15_usb_online.pdf) describes possible inexact lunar origins. Historical origin and exact astronomical periodicity are different questions.

**Fix:** say the modern uninterrupted week is not an exact lunar cycle. Present the Jewish and planetary traditions as the documented route to the familiar week, without treating a remainder calculation as an archaeological disproof. The planetary-hour star is the useful demonstration and should retain the long pause; no extra historical detour is needed.

### X48 — The map plan needs explicit area units and a narrower Web Mercator claim (medium)

**Location:** `map_projection/beats.hy.json:16-18,35-36,47`; `map_projection/PLAN.md:51-60,68-71`.

**Evidence:** the approximately sixfold change is an **area** ratio: `sec²(72°)/sec²(40.2°) ≈ 6.1`. It is not a sixfold multiplier for both SVG dimensions; the corresponding local linear multiplier is about **2.47**. The animation instruction “swells about six times,” with `sec²` named as its calculation, leaves this dangerous ambiguity for implementation. The 85.05° cutoff is characteristic of square Web Mercator tiles, not a universal cutoff for all Mercator maps. Finally, Google Maps' globe behavior depends on mode/browser/settings; [Google's own help](https://support.google.com/maps/answer/3031966) tells users to enable globe view and satisfy the 3D requirements.

**Fix:** say `մակերեսով` with the sixfold statement and specify whether the animator is comparing area or linear dimensions. Prefer reprojecting geographic coordinates over scaling a finite country outline using an area factor. Name Web Mercator for the cutoff. Make the try-it instruction reproducible or show the globe transition directly without promising every desktop setup will do it automatically.

### X49 — IKEA's extrapolation and closing undervalue independent usefulness (low)

**Location:** `ikea_effect/beats.hy.json:29,36,41-43`; `ikea_effect/PLAN.md:49-58`.

**Evidence:** the studies concern valuation under particular assembly/completion conditions. “This tendency works everywhere our effort is” expands that into all business plans and code. “It is good for you; for others it is just a box” also risks equating psychological ownership with objective poor quality. Self-built work can actually meet needs better or be genuinely valuable to others; the experiment demonstrates a valuation difference, not that external value vanishes.

**Fix:** frame code/business/fence as possible analogous judgments, not universal measured effects. End with an actionable independent check—someone else's assessment or willingness to pay—rather than reassuring the maker that their assessment is “true for them.” Keep the frog demonstration and completion condition; do not refill the time with another unrelated anecdote.

### X50 — The pilot answers a selection problem with an unsupported quality concession (medium)

**Location:** `pilot_survivorship/beats.hy.json:4,9-10,33,38,49`; `../_knowledge/short_videos/lit_review.md:299-306`.

**Evidence:** the final `սովետական սառնարանները պարզ ու ամուր էին` is a broad historical-quality assertion after a video showing that surviving examples cannot settle that comparison. The research notes mixed evidence: refrigerators were relatively reliable *among Soviet appliances*, while other accounts describe breakdowns; the proposed simple-design/thick-metal tradeoffs are marked unverified. None is a matched generation-to-generation durability comparison. The one-out-of-twenty fridge grid is an invented illustration, not a measured survival rate. The dropout story likewise supports a missing-denominator warning, not a conclusion about the effect of attending university.

**Fix:** close by saying surviving appliances alone cannot tell us which generation was more durable; actual failure rates and comparable usage would be needed. Identify invented counts as illustrative. Keep the colloquial voice, including `Հա` if the owner wants it; the problem is the factual concession, not colloquial Armenian. Avoid treating “not famous/rich” as “achieved nothing” in the dropout contrast.

### X51 — The agreed script rules were applied to one batch, not the series (medium)

**Location:** `README.md:21-38`; `../DECISIONS.md:21-27`; representative scripts `qwerty/beats.hy.json:4-62`, `own_voice/beats.hy.json:55-63`, `regression/beats.hy.json:66-74`, `waiting/beats.hy.json:55-63`.

**Evidence:** all eleven unproduced older shorts—Bayes, crypto, friendship, kids TV, own voice, Petrov, QWERTY, regression, Simpson, waiting and yawning—have **zero** marked `pause_after` time. All eleven still use `Այնպես որ,` somewhere, usually in their close. Own voice, regression and waiting retain a separate `Կարճ ասած` summary beat. Several open beats with names/dates and accumulate multiple extensions. This is a scope/completion gap, not an objection to the owner's preference for substance over a 60-second cap.

Using the repository's current estimator, QWERTY is **175.9 s** before adding any marked pauses. Adding even eight seconds makes it approximately **183.9 s**, beyond the project's three-minute target. Crypto and regression are both about 164.3 s before that revision, leaving little reading-rate margin.

**Fix:** revise these older scripts against the actual rules before voice approval. For QWERTY, choose a spine—how a mechanical layout became inherited infrastructure—and cut the contest/Dvorak/economists catalogue or make it a second video. For waiting, choose waiting psychology or queue mathematics; the opening `7 > 6` compares durations that are already unequal, so use equal real durations if demonstrating perceived duration. For the other long explainers, preserve the main demonstration and choose one useful extension. Add purposeful pauses where a viewer must count/choose/read, not an identical silence quota on every script. Keep longer videos where the explanation earns the time.

## Armenian

The zero-error lint results above are credible as mechanical results. They should not be represented as a grammar/terminology/factual approval. The following separates a checkable construction error and explicit project-rule violations from wording questions. I found no justification for a broad rewrite into formal textbook Armenian.

### X52 — Negation is attached to the noun in `չտեղի տվեց` (medium)

**Location:** `minute_60/beats.hy.json:10`; repeated as a wording question in `minute_60/PLAN.md:85`.

**Evidence:** `Ժամանակը չտեղի տվեց` places `չ-` before `տեղի`, instead of negating the verb in the compound `տեղի տալ`. The guide's rule limits this prefix to verbs/participles. The lint does not catch every erroneous `չ-` formation.

**Fix:** the grammatical form is `Ժամանակը տեղի չտվեց`. Whether this personification of time is an effective spoken metaphor is a separate native/editorial choice. X46 recommends changing the historical claim regardless, so the phrase may be removed rather than repaired.

### X53 — `բարձր` blurs pitch and loudness in the own-voice demonstration (medium)

**Location:** `own_voice/beats.hy.json:14,19,24`.

**Evidence:** the recording is described as `ավելի բարակ ու բարձր`, then ear plugging makes the voice `ավելի բարձր ու թավ`. The intended first “higher” concerns perceived pitch/spectral character; the second concerns loudness plus bass. Hearing both in close succession can sound like a contradiction, and the visual frequency bars cannot resolve it for an audio-only listener. The glossary does support `հաճախություն`; it does not resolve this ambiguity automatically.

**Fix:** distinguish pitch from intensity in plain words. For the plug-your-ears line, a candidate is `Ձայնդ ավելի ուժեղ ու թավ կհնչի`; check that exact wording with the owner. Describe the recorded version as thinner/less bass-rich rather than making an unnecessary absolute pitch claim. This is a clarity fix, not a declaration that `բարձր ձայն` is generally bad Armenian.

### X54 — Several language decisions remain questions, but there is no consolidated project answer (low)

**Location:** `bayes_test/PLAN.md:133-134`; `dmanisi/PLAN.md:88,96`; `yawning/beats.hy.json:25-38`; `zero_knowledge/PLAN.md:151-156`; `mashtots/beats.hy.json:43`.

**Evidence:** singular/plural address, `սկրինինգ`, `ռաունդ`, the ZK term and `կարեկցանք` are repeatedly left open across plans. In Dmanisi, `կարեկցանք` represents compassion/care; in yawning, it represents the psychological construct empathy. That is not automatically a spelling error, but the two concepts should not be silently treated as interchangeable in an educational series. The glossary does not settle this pair.

**Fix:** resolve the few recurring terms once with the owner, record the results in the project's Armenian decisions file, and reuse them. For empathy/compassion, consider retaining a small English source term at first definition if the owner wants distinct Armenian terms. Keep singular address pending the actual choice; the guide's plural default is not evidence that all current `դու` scripts are wrong.

**Native-review questions, not asserted errors:** the modern paraphrase `հասկանալ հանճարի խոսքերը` may suggest “the words of a genius” to some younger viewers. However, `հանճարի խոսքերը` is established [Armenian church wording](https://surbzoravor.am/post/view/chanachel-imastutyunn-u-khraty-imanal-hanchari-khosqery), so do not mark it as a mistranslation or alter the Classical quotation. Ask whether an added plain explanation is useful. Similarly, leave `բաց Գուգլ քարտեզները` alone as a grammatical matter: `բա՛ց` is a valid imperative, documented in the [NAS language institute's grammar discussion](https://language.sci.am/sites/default/files/kerakanakan_ankanonowtyownnere_zhamanakakits.pdf). Adding a stress mark or choosing `բացիր` is an editorial/pronunciation choice, not repair of a nonexistent verb form.

### X55 — QWERTY still sends Latin words and letter names to the Armenian narrator (medium)

**Location:** `qwerty/beats.hy.json:4,20,31,36,41,57`; `qwerty/PLAN.md:85-88`; `README.md:33-35`.

**Evidence:** the spoken `text` contains `QWERTY`, `Z`, `SE`, `TYPEWRITER` and Latin-letter suffix constructions. This directly violates the series' explicit no-Latin-in-the-voice rule. The plan recognizes the problem but still leaves it unresolved. Testing Armenian letter names in a different voice-test clip does not validate these particular English tokens and their inflections.

**Fix:** choose the actual spoken forms in Armenian letters, while preserving the Latin keyboard labels on screen. Spell the English word through an owner-approved pronunciation or say “the English word for typewriter” while showing it being typed. Resolve the choice before paying to voice the full script; keep display text and speech text as separate, intentional representations where needed.

### X56 — A rewritten closing screen line can strengthen the spoken claim (low)

**Location:** `painted_statues/beats.hy.json:52-54`; `decoy_popcorn/beats.hy.json:56-58`; `README.md:31-32`.

**Evidence:** the statue voice says a beauty was `վնասվածքի արդյունք`, while the screen says the beauty `վնասվածք էր`. “The result of damage” and “was damage” are not the same statement. The popcorn voice tells the viewer to remove an option mentally and choose; the screen supplies a separately composed slogan `Ջնջիր խայծը, հետո ընտրիր`. The latter has the same general intent but still is not the exact spoken line the rule promises. Capitalization, punctuation and mathematical `≠` alone are not the problem here; changes in claim or independently rewritten phrases are.

**Fix:** approve one closing sentence for both voice and screen, or explicitly define the screen line as a non-caption summary and stop claiming exact identity. For karaoke, derive the text from the actual spoken words. Correct the content first; exact duplication of an inaccurate claim is not the objective.

## Documentation, process and remaining production gaps

### X57 — The current instructions still route producers into superseded work (medium)

**Location:** `README.md:44-48,68-69,80,86-94`; `bakeoff/README.md:14-17`; `../DECISIONS.md:5-35`; active visual sections in `dmanisi/PLAN.md:75-77`, `mashtots/PLAN.md:84-89`, `ikea_effect/PLAN.md:62-65`, `english_spelling/PLAN.md:72-74`.

**Evidence:** the main pipeline still sends rendering to the bakeoff “until the framework is chosen (Q7),” although decisions #21/#24 choose Remotion and the new project. Its folder table says the TTS tool is unchanged, although it now resides in this pipeline and has series-specific behavior to fix. A completed Gemini-review step also remains listed under “Later.” The proposed publication order retains `zero_knowledge` after naming it as the first release. Several active visual lists still include cut scenes: Mead/Neanderthals, Korea/Sequoyah, cake mix, debt/island and the vowel chart. Parked facts can remain as history, but active shot lists should not resurrect them.

**Fix:** make the top-level README the actual current entry point, link `render/README.md`, and clearly mark the bakeoff frozen. Update active shot lists and remove answered/obsolete review questions from the current task list. Keep historical notes in an explicitly archived section. Generate episode counts, current durations and release status from one small episode index rather than copying them into multiple pages.

### X58 — Approval IDs do not identify the script version approved (medium)

**Location:** `review_queue_picker.html:34-55,92-99`; `review_queue.json:3-6,203-205,363-365,394-395`.

**Evidence:** saved choices are checkbox IDs under a title/date key. The copied/sent summary contains IDs such as `A1`, not a script hash or snapshot. Changing a script while retaining its ID and date restores the old tick and produces an indistinguishable approval message. The queue also retains the older showcase-first organization after the ZK-first decision. I did not inspect account comments or infer whether the owner has approved anything; the finding is that the stored representation cannot establish which version an approval covers.

**Fix:** bind a review item to episode name and content hash, include that identity in the review summary, and invalidate its saved selection when the script changes. Keep the approved snapshot or hash in an episode status record alongside the eventual narration fingerprint. This implements the existing script-first rule without repeatedly asking the owner to answer already settled questions.

### X59 — The first vertical video is planned, but there is no corresponding composition or clean bootstrap (medium)

**Location:** `render/src/Root.tsx:15-18`; `zero_knowledge/PLAN.md:125-126,133`; `zero_knowledge_short/PLAN.md:34-38`; `render/README.md:9-15,28-32`; `../.gitignore:25-28`.

**Evidence:** all four registered compositions are 1920×1080. None consumes `zero_knowledge_short` or supplies its 9:16 layout/captions. The long plan explicitly says the vertical version remains to build. Its recording guide still says the Short has six beats, while the current JSON has five. Separately, `Long.tsx` statically imports a gitignored timeline generated from guide audio whose WAVs are also ignored. The documented `npm ci` → type-check path therefore depends on local artifacts that a clean checkout does not contain; the passing check in this workspace does not demonstrate clean bootstrap.

**Fix:** implement/register a genuine portrait composition for the five-beat Short, adapting information density and safe areas rather than scaling the landscape canvas. Specify an offline bootstrap/import command and the required recording/assets; fail clearly if unavailable. Avoid requiring a paid guide-voice regeneration just to discover project compositions or type-check source. Update the recording guide to the actual script version. This is unfinished work already visible in the plan, not a claim that the long composition cannot render.

### X60 — “Facts checked” does not preserve enough evidence to audit several claims (medium)

**Location:** `dmanisi/PLAN.md:56-57`; `english_spelling/PLAN.md:53-68`; `petrov/PLAN.md:53-66`; `zero_knowledge/PLAN.md:89-96`; `bayes_test/PLAN.md:100-107`.

**Evidence:** the source sections mix primary papers, descriptions of search results, “general knowledge,” unread summaries and future checks under the same checked-facts heading. Some entries name a host/article without a direct URL or page/table. This is how the infrared mechanism, the unqualified retest assumption and broader causal conclusions can survive a “checked” label. The ZK age-verification source is a 2025 commentary even though the [official project's roadmap](https://docs.ageverification.dev/Roadmap/) now documents Android/iOS ZKP releases in 2026. Conversely, the supposedly inaccessible gynecologist paper has an accessible primary mirror and settles an uncertainty in the plan.

**Fix:** for each consequential claim, record beat key, precise claim, direct source URL/DOI and relevant page/table, plus whether it is observed data, a calculation, analogy or conjecture. Put unresolved claims in an explicitly unverified list. Date-check product/UI/guideline assertions before publication. Do not add more source names unless they support the exact words being voiced. Earlier model reviews should reference the script version reviewed and should never substitute for this evidence.

### X61 — The duration estimator's claimed error band is not established (low)

**Location:** `tools/plan_script.py:29-31,45-55`; `../_learnings/2026-11-25-1032_armenian_tts_speaks_870_chars_per_minute.md`; length/timing tables in `bayes_test/PLAN.md:25-42`, `regression/PLAN.md:22-39`, `simpson/PLAN.md:22-38`.

**Evidence:** the midpoint calibration rests on two digit-heavy beats, but generated plans state “about ±10%” as a general error band. That is not a measured interval for arbitrary topics, pauses, long proper names or Hayk's free reading. Independently maintained timing tables still describe older estimates. The formatter can also produce `1:60` near a minute boundary because it floors minutes before rounding seconds.

**Fix:** call the range a planning allowance rather than a validated accuracy claim. Compare estimates against existing narration manifests without making new paid calls, and maintain separate rates for TTS and human narration when data exist. Use total rounded seconds before formatting minutes/seconds. Flag proximity to the full duration target with margin, and replace estimates with actual timeline duration as soon as recording exists.

## Per-video disposition and coverage

All script/plan pairs were read; their generated script sections currently contain the JSON narration text. The more serious drift is in timing tables, facts/assumptions, visual lists and unanswered questions. Totals below use the repository's estimator, current marked pauses, 0.12 s inter-beat gaps and its 1.2 s planning tail. They are **estimates**, not measured finished-video durations. This table adds no new findings; it maps each video to the findings above.

| Episode | Beats | Approx. total | Marked silence | Main action before production |
|---|---:|---:|---:|---|
| `bayes_test` | 14 | 2:38 | 0 s | Speak the independence assumption; define the toy test and narrow the doctors claim; add counting pauses. X25–X26, X51. |
| `crypto_paint` | 14 | 2:44 | 0 s | Qualify security, keep one key-agreement spine, add mixing/reading pauses and shorten history. X44, X51. |
| `decoy_popcorn` | 10 | 1:52 | 8 s | Define dominance and stop claiming all numerical menus reliably work; fix overwide caption tokens. X2, X33, X56. |
| `dmanisi` | 9 | 1:45 | 7.5 s | Replace the impossible tooth-circle shot and remove the exclusive help/adaptation choice. X34–X35. |
| `english_spelling` | 8 | 1:43 | 8.5 s | Qualify the history, distinguish consonant/vowel changes, remove cut-shot instructions. X36–X37. |
| `friendship` | 13 | 2:20 | 0 s | Use one averaging procedure; simplify extensions and add a readable network pause. X32, X51. |
| `ikea_effect` | 7 | 1:21 | 7.5 s | Narrow the universal extrapolation and make independent assessment the takeaway. X49. |
| `kids_tv` | 11 | 2:38 | 0 s | Correct WHO ages; distinguish hypotheses from show-specific evidence; add pauses. X41–X42, X51. |
| `luggage_wheels` | 6 | 1:19 | 9.5 s | Rebuild the explanation around mechanical work versus metabolic energy. X38. |
| `map_projection` | 9 | 1:46 | 8.5 s | Specify area/linear scaling; name Web Mercator's cutoff; make the try-it step reproducible. X48. |
| `mashtots` | 10 | 1:49 | 9.5 s | Narrow the Greek-letter challenge and one-to-one claim; resolve audience wording. X36, X54. |
| `minute_60` | 6 | 1:41 | 9 s | Separate divisibility from historical causation; fix `չտեղի տվեց`. X46, X52. |
| `own_voice` | 12 | 1:59 | 0 s | Retain “approximately,” distinguish loudness/pitch and reduce repeated closings. X43, X51, X53. |
| `painted_statues` | 9 | 1:58 | 8.5 s | Correct Egyptian blue's mechanism and closing wording; ensure caption token fits. X2, X39, X56. |
| `petrov` | 13 | 2:17 | 0 s | Teach prior plus evidence, not prior instead of evidence; shorten biography. X45, X51. |
| `pilot_survivorship` | 9 | 1:14 | 0 s | Remove the unsupported generational-quality concession; retain the missing-denominator question. X50. Existing timeline plus pilot tail is about 1:11. |
| `qwerty` | 12 | 2:56 | 0 s | Structural cut required before adding pauses; resolve all Latin narration. X51, X55. |
| `regression` | 14 | 2:44 | 0 s | Qualify causal control/model assumptions, fix axis range and add demonstration pauses. X30–X31, X51. |
| `simpson` | 13 | 2:35 | 0 s | Replace the causal rule, align Berkeley populations, normalize the weighted card. X27–X29, X51. |
| `waiting` | 12 | 2:42 | 0 s | Compare equal durations in the hook and choose psychology or queue mathematics as the spine. X51. |
| `week_seven` | 9 | 1:54 | 9 s | Narrow the lunar-origin dismissal; preserve the planetary-hour showcase. X47. |
| `yawning` | 11 | 2:06 | 0 s | Correct the dog-familiarity certainty; trim the study catalogue and add experiment pauses. X40, X51. |
| `zero_knowledge` | 13 | 4:18 | 18.5 s | Correct the card proof and ZK definition, then fix checkpoint timing before fitting Hayk's recording. X11–X14, X20–X23. |
| `zero_knowledge_short` | 5 | 0:54 | 4 s | Resolve its hook, explain hidden Waldo setup and implement its actual portrait composition. X22, X24, X59. |

## Suggested repair order

1. **Before recording:** repair the central ZK claims, Bayes's independence assumption, Simpson's causal rule, the suitcase explanation and WHO ages. Re-review only the changed claims against their sources.
2. **Before the next paid synthesis:** fix manifest recovery/default style and run the offline validator over the whole approved script. Resolve QWERTY's spoken tokens and the few recurring Armenian decisions.
3. **Before relying on caption QA:** enforce fit/display-duration constraints, label pause consistency honestly, and check independently chosen words. Fix the balls' numerical checkpoints and hidden-answer visibility.
4. **Before the first release:** finish portrait layout, provide the recording-import/bootstrap path, bind reviews/builds to versions, and generate complete credits. Check a few authorized stills and listen to the real recording; this review deliberately did neither rendering nor new synthesis.

Do not begin by building a large generic animation engine. A small offline validator, reliable clip cache, shared caption profiles, explicit cue markers and an episode index will remove more repeated production work than more scene abstractions at this stage.



