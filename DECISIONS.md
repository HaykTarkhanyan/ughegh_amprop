# Decisions

Newest at the top.

## 28. Scripts are reviewed as full draft videos, voiced with the real TTS voice, in publishing order

- **Date / status:** 2026-11-27, active (replaces "the script is approved before the voice is made", Q17)
- **Decision:** Each unapproved script gets a full draft video (Sadaltager voice, timeline, the full animation, a render) that Hayk reviews together with the script; after approval the final voice goes in (Hayk's own recording for the zero-knowledge pair, otherwise the same voice, so an unchanged script needs no second voice build) and the animation re-times itself to it. Drafts are made in the publishing order (own_voice first).
- **Why:** Hayk, Q32-Q33: "it would be nice to kind of have the full video to review ... confirm the script and everything, animations and so on, and then we do the full build". The voice is the cheap part (about $0.02-0.05 per Short, own_voice cost $0.022); the cost of a build is the animation work and the render, so drafting with the real voice keeps the draft's pacing equal to the final one.
- **Alternatives rejected:** a free voice for drafts (Azure's free Armenian neural voices, or the Gemini free tier one call per video): free, but a different voice mistimes every pause and would need a second build anyway; approving scripts as text first (the old Q17 rule): Hayk wants to judge script and picture together.
- **What would change this:** drafts often being thrown away after review (then a cheaper animatic stage before the full animation); voice prices rising enough to matter.

## 27. Publishing: all four platforms as «Ուղեղ Ամպրոպ»; Meta through its API, TikTok and YouTube through a supervised Playwright co-pilot

- **Date / status:** 2026-11-26, active, revisited the same day (supersedes "uploaded by hand" in #19)
- **Decision:** The channel launches on YouTube, TikTok, Instagram and Facebook at once, named «Ուղեղ Ամպրոպ» with the handle `ugheghamprop` (as the Telegram group). Instagram and Facebook Reels are posted through Meta's official Content Publishing API from a small Python tool; TikTok and YouTube through a Playwright co-pilot on their own web uploaders that fills everything and stops for Hayk to press the final button, while the TikTok and YouTube API audits are applied for. Videos with the TTS narrator carry each platform's AI label; videos Hayk narrates do not. Checklist: `03_shorts/PUBLISHING.md`.
- **Why:** Hayk, Q28-Q31 (2026-11-26). Meta's API needs only Standard Access for one's own professional accounts and can set the "AI info" label (`is_ai_generated`, Sep 2026); TikTok's API keeps posts private until an audit; TikTok's terms bar automated scripts that interact with the service, so the automation stays supervised and small. Handle checks on 2026-11-26: free on YouTube and TikTok, very likely on Instagram, Facebook confirmed at setup.
- **Alternatives rejected:** Playwright for all four (against all three platforms' terms, fragile, risks the new accounts); a scheduler service such as Buffer or Metricool (a third party with access to every account); YouTube and TikTok only at first; manual uploads (the #19 plan, kept as the fallback).
- **Update (Hayk, 2026-11-26, same day):** "APIs are also fine I don't care as long as its free and reliable": the official APIs become the route on all four platforms (Meta at once; the YouTube Data API, testing whether unaudited uploads stay private; TikTok's Content Posting API after its audit), and the Playwright co-pilot is only a bridge until an API is usable. Every Short with a long video points to it in the video (a pointer beat with the «▶ երկար տեսանյութ» pill) and on each platform (YouTube "Related video", a Facebook post link, Instagram and TikTok profile links).
- **Update 2 (2026-11-27):** research showed TikTok's Content Sharing Guidelines exclude "a utility tool to help upload contents to the account(s) you or your team manages" (checked on TikTok's page), so there is no official API route for us; Hayk, Q34: TikTok goes up by hand in TikTok Studio (allowed, about 2 minutes a video), with a prepared hand-off folder. Facebook's Reels API takes only 3-90 s, so longer Shorts go up as Page videos (AI label by hand or through Instagram's share to Facebook, to test).
- **What would change this:** a TikTok or YouTube API audit passing (then their co-pilot is replaced by the API); any account warning about automation (then that platform goes back to manual uploads at once); Meta changing Standard Access for own accounts.

## 26. Every Codex finding applied; the scripts follow the rules, with cut beats kept in the plans

- **Date / status:** 2026-11-26, active
- **Decision:** All 61 findings of the independent Codex review (`03_shorts/CODEX_REVIEW.md`) were applied: the factual corrections (the zero-knowledge card proof and definition, Bayes's independence assumption, Simpson's rule, the suitcase's work versus energy, the WHO ages, Egyptian blue's mechanism and the rest), the script rules applied to the 11 older scripts (8-12 s of pauses, one closing beat without «Այնպես որ,», years and names on the source lines, one extension), QWERTY rebuilt around "a mechanical layout became inherited infrastructure" and waiting around psychology (the queue maths parked as its own video). Every cut beat is kept word for word in its `PLAN.md` ("After the Codex review").
- **Why:** Hayk, Q23: "Everything, low included". The high findings were checked before applying (the card's elimination logic, Li et al. 2020 and two DOIs in OpenAlex, the Seymour abstract); each plan lists its fixes by finding ID.
- **Alternatives rejected:** fixing only the high and medium findings (offered first); fixing only the zero-knowledge video; waiting for Hayk's comments on the report before changing anything.
- **What would change this:** Hayk rejecting particular rewrites in review: every script waits for approval with its hash (`tools/episodes.py`), and cut beats can come back from the plans.

## 25. Shorts tooling: validated, versioned builds, tracked timelines, caption profiles, hash-bound approvals

- **Date / status:** 2026-11-26, active
- **Decision:** (a) One offline validator (`tools/validate_episode.py`) runs before paid TTS, timeline builds and syncs. (b) The timeline records hashes of the script, the clips and the audio plus a build id, and the render copy's audio is named after the build, so a composition can only play the audio its timeline was built with. (c) `03_shorts/render/src/data/<short>.json` is tracked in git (the audio stays ignored), so a clean checkout type-checks and lists every composition. (d) Caption pages are grouped per layout profile (portrait, landscape); a word that cannot fit stops the build; one long word may shrink to 44 px in portrait. (e) `episodes.json` and the review-queue item IDs carry the script hash. (f) The tool tests use the standard library's `unittest`. (g) The Python packages are pinned in `03_shorts/requirements.txt`. (h) Hayk's recording comes in through `tools/import_recording.py` (propose cuts, check, apply), with `narrator: hayk` in the manifest.
- **Why:** Codex X1-X10, X14, X17, X58, X59, each with a reproduction: an interrupted TTS run lost cache entries; copies could pair different versions; 8 landscape caption pages were under 0.6 s on screen (0 now); three real words could not fit any allowed size; approvals did not say which version; the type-check needed gitignored data.
- **Alternatives rejected:** a forced aligner now (the checks do not need it, and the free MMS model is CC-BY-NC); Remotion `calculateMetadata` fetching the JSON at render time (a bigger refactor than tracking a small file); pytest (a test framework is Hayk's choice; `unittest` adds no dependency and pytest can still run the files); hyphenating Armenian captions (no approved break rules).
- **What would change this:** timeline churn in git getting noisy (then move to `calculateMetadata`); Hayk choosing a test framework; 44 px captions proving hard to read on a phone.

## 24. Where's Waldo replaces the cave in the first video; the series renders from `03_shorts/render/`

- **Date / status:** 2026-11-25, active (amends the structure in #23)
- **Decision:** The easy example in the zero-knowledge video is Where's Waldo (a sheet far bigger than the page, with a small hole), not the Ali Baba cave; the repeated-rounds maths and the "a video of it convinces nobody" beat move to the colour-blind balls. The hidden character is our own design (orange cap, striped blue scarf), not Waldo. All series animation lives in a new Remotion project, `03_shorts/render/`, set up from the pilot's pinned lockfile; the pilot stays in `bakeoff/` as a record.
- **Why:** Hayk, Q22: "Where's Waldo instead" (after "for the cave i imagined a simpler example ... hello world style"). The Waldo proof is one step and visual; the balls already repeat, so nothing is lost. Waldo's look is a trademarked character design (Martin Handford), so only the book title is referred to. The render move was planned in #21 ("move the winner").
- **Alternatives rejected:** the classic 3-step cave diagram (offered, not chosen); the cave plus a "no word" run; keeping the work inside `bakeoff/remotion/` (a folder named after a finished comparison).
- **What would change this:** Hayk wanting the cave back (the draft is in `render/src/zk/drafts/Cave.tsx`); a viewer test showing the Waldo leak (it reveals his immediate surroundings) confuses more than it teaches.

## 23. The first video: zero-knowledge proofs, narrated by Hayk, as a short intro plus a long horizontal explainer

- **Date / status:** 2026-11-25, active
- **Decision:** The channel opens with zero-knowledge proofs, in Hayk's own structure (gossip hook, real uses, the cave, why "zero knowledge", the red card, the two balls, real systems, back to the gossip). Two videos: a vertical Short (~1 min, `03_shorts/zero_knowledge_short/`) and a horizontal 16:9 long explainer (~4-5 min, `03_shorts/zero_knowledge/`). Hayk narrates both himself in one free-reading take each; the animation is fitted to his recording (components timed from the beat times), not the other way round.
- **Why:** Hayk: "for this video, I understand what I want, and I want this to be our initial video"; "I will narrate the script myself, and then you fit the video to the script". Q18-Q21 answered: short intro + long explainer, horizontal for the long one, the colour-blind balls as the repeated demo, one take free reading.
- **Alternatives rejected:** one Short up to 2:45 (too tight for five demos); the Gemini TTS voice of #20 (stays the default for the other shorts); vertical for the long video (YouTube shows long vertical videos with side bars on desktop).
- **What would change this:** the free-reading take cannot be split and aligned reliably (then re-record one file per beat, or add a forced aligner, licence permitting); the long horizontal layout costs far more than reusing the vertical one.

## 22. Shorts scripts follow written script rules; numbers are written as digits

- **Date / status:** 2026-11-25, active
- **Decision:** Every short script follows the rules in `03_shorts/README.md` ("Script rules"): claim in the first seconds, no summary-card narration, years and names on the source line, 8-12 s of marked pauses (`pause_after`) with the longest on the showcase, a doubt beat only about the video's own claim and ending on what is known, the voice says the closing screen line, no Latin in the voice, and numbers written as digits in `beats.hy.json` (words only where the spoken form is the point).
- **Why:** Two Fable reviews (`03_shorts/FABLE_REVIEW.md` F131-F134, `FABLE_REVIEW_2.md` F222-F229). The digits rule was decided on measurement: a test clip with 13 digit forms («1800 դրամ», «84 տոկոսն», «24-ը», «405 թվականին» ...) came back from a Gemini transcription all correct (`03_shorts/voice_test/batch2_risky/transcripts.json`), digits make one-glance captions, and `build_timeline.py` already weights a digit token by its spoken length. Hayk said "fix all" to the review.
- **Alternatives rejected:** numbers spelled out (two-line captions such as «հազար չորս հարյուրից հազար յոթ հարյուր թվականներին»); leaving it per script (five scripts used digits, six words).
- **What would change this:** a voiced short where the TTS misreads a digit form; Hayk preferring spelled-out numbers on screen.

## 21. Shorts are rendered with Remotion

- **Date / status:** 2026-11-25, active
- **Decision:** The shorts are built in Remotion (React + TypeScript, 4.0.547 pinned), starting from the pilot's components in `03_shorts/bakeoff/remotion/`. The HyperFrames build stays in `03_shorts/bakeoff/hyperframes/` as a record of the bake-off and gets no more work.
- **Why:** Hayk, asked Q7 for the fourth time: "whichever u think is the best". The bake-off (`03_shorts/bakeoff/README.md`) gave nearly identical videos, so the choice is about the process: Remotion is mature (4.x for years), sends no telemetry, streams frames into the encoder (HyperFrames needed ~2.9 GB of temp disk with 2 workers and failed once at 1.8 GB free), and its components and types carry over between shorts. Its weakness, no built-in layout check, is covered by the measured caption band, `tools/contact_sheet.py` with the safe area drawn, and the Gemini review.
- **Alternatives rejected:** HyperFrames (pre-1.0, telemetry on by default, roadmap tied to HeyGen's paid app, the disk spike; its `check` was the one real advantage); Manim alone (weak at photos and text, see the lit review); Remotion + Manim clips (kept as an option for one math-heavy scene, not a default).
- **What would change this:** Remotion's licence (free for teams up to 3) if the channel becomes a team of 4+; a scene Remotion cannot do well (then a Manim clip for that scene); HyperFrames reaching 1.0 with telemetry off by default.

## 20. Shorts: voice Sadaltager with no style prompt, ~70 s with a takeaway, the Wald story told as a story

- **Date / status:** 2026-11-25, active
- **Decision:** Shorts are narrated by Gemini 3.8 Flash TTS, voice Sadaltager, with no style prompt. They run longer rather than shorter (the pilot is ~70 s, nine beats, ending with a takeaway the viewer can use). Anecdotes that are partly legend are framed as stories and illustrations are labelled: the Wald bomber beat opens with «Պատմում են, որ ...», and the red-dot plane carries «նկարազարդում».
- **Why:** Voice: two listening rounds on 2026-11-25. Round 1, a "lively, energetic storyteller" prompt on Sadaltager, Puck, Sadachbia and Autonoe: Hayk, "with this lively they all sounded too artifical". Round 2, no prompt vs a "natural, relaxed, like telling a friend over coffee" prompt on Sadaltager, Achird and Autonoe: Hayk, "natural_Sadaltager_no_style was best". Length: Hayk, "why is 53 s long for a short? i dont think so" and "i would actually prefer a bit longer shorts - so theyre not just doomscroll garbage"; my 30-45 s target in the review was a guess from vendor blogs. Wald: Commons describes File:Survivorship-bias.svg as "Illustration of hypothetical damage pattern" (2021), and secondary sources find no record of the "officers wanted armour the other way" scene; Wald's 1943 memos are vulnerability calculations.
- **Alternatives rejected:** the lively prompt (artificial); the qysu "calm university lecturer" prompt (made for lectures); Azure hy-AM voices (not tested yet, only if word-exact caption timing becomes a must); a 30-45 s cap; telling the Wald scene as fact.
- **What would change this:** retention numbers from the first uploads (people leaving early on long shorts); a new Gemini voice or an Armenian-native TTS that sounds more natural; Hayk's ear on a full short rather than a 13 s sample.

## 19. Short videos (Shorts, Reels, TikTok): Armenian, code-drawn animation + real photos, made in session, uploaded by hand

- **Date / status:** 2026-11-25, active (tools review done; rendering framework still open); "uploaded by hand" superseded by #27 on 2026-11-26
- **Decision:** Short vertical videos on thinking errors (first: survivorship bias, Soviet fridges) are Armenian only, drawn by code (animation mixed with real photos that the code zooms, pans and highlights), made by Claude Code in session (topic in, script and scene code written, rendered, checked, Hayk reviews), and uploaded by hand. They get a new look, not the webinar branding. The tools review lives in `_knowledge/short_videos/lit_review.md`; production will go to `03_shorts/`.
- **Why:** Hayk's answers Q1-Q6 in the 2026-11-25 session, plus "when I say AI generated ... it will be programmatically made with help of AI ... It's not gonna be Gemini or something images". The Armenian voice already works in sample_problems_qysu (Gemini TTS, voice Sadaltager, ~$0.01 per 45 s), so the open choice is the renderer.
- **Alternatives rejected:** AI video or AI images (Hayk); stock footage under big captions (the generic faceless-channel look); a one-command pipeline from day one (more upfront work before knowing what a good short looks like); posting by API (YouTube and TikTok keep uploads from unaudited apps private, see the review section 10.3); Armenian + English versions; the webinar mascot and palette; a separate repo or the qysu repo.
- **What would change this:** after 3-5 shorts, freeze what worked into a one-command pipeline; automate posting once manual upload becomes the bottleneck; Q7 (Remotion / HyperFrames / Manim) gets its own entry when decided.

## 15. Book folders renumbered: `01_idiot_brain/`, `02_power_of_habit/`

- **Date / status:** 2026-10-27, active
- **Decision:** `02_idiot_brain/` is now `01_idiot_brain/` and `01_power_oh_habit/` is now `02_power_of_habit/` (also fixing the "oh" typo), with `git mv` so history follows. Live docs and code were updated (58 places: script docstrings, `.tex` header comments, `DECK_BRIEF.md`, `CONVENTIONS.md`, webinar 1 `NOTES.md`, and the Telegram frame's line «սլայդները՝ 01\_idiot\_brain/slides/pdf թղթապանակում» in `preamble.tex`). Session logs, `_learnings/` and entries #1-#14 keep the old paths as written at the time. Each book's text extractor is now kept in its `archive/` (both checked to reproduce the committed files byte for byte).
- **Why:** Hayk: "idiot brain is 01 and this should be 02". The scripts find their files from `Path(__file__)`, so nothing in a build depends on the folder name: after the rename the prototype deck built cleanly, and the webinar 2 banner PNGs came out byte-identical (the SVGs differ only in CRLF line endings, which git normalises: 0 changed lines).
- **Known side effect:** the committed slide PDFs, and the webinar 1 PDF people already have, still print `02_idiot_brain/slides/pdf` until each deck is rebuilt. The printed GitHub link goes to the repo root, so it still works.
- **Alternatives rejected:** keeping the numbers by reading order (The Power of Habit was read first, Dec 2025); rewriting old paths in the history files (they record what was true then).
- **What would change this:** more books arrive and a rule for the order is wanted (reading date, webinar order); until then the number is Hayk's call.

## 14. The Power of Habit re-extracted in the Idiot Brain format; Hayk's notes and the LLM notes dropped

- **Date / status:** 2026-10-27, active (applies #1's format to the first book)
- **Decision:** `01_power_oh_habit/` holds one Markdown file per section, flat: `00_prologue.md`, `01_the_habit_loop.md` ... `09_the_neurology_of_free_will.md`, `10_afterword.md`, `11_appendix.md`. Each has the chapter text, the author's footnotes as `[^fnN]` under `## Footnotes`, and the book's source notes linked into the text as `[^N]` under `## Notes`. The 45 in-chapter figures are PNGs in `figures/pNNN_K.png` (PDF page, image number), referenced with `![Figure](...)` where they sit. The per-chapter `*_notes.md` / `*_llm.md` files are deleted (Hayk: "ignore my notes and llm notes u can even delete").
- **Why:** Hayk asked for the texts to be extracted from scratch. The old `*_full_text.md` files were raw dumps with hard line breaks, no notes, and no prologue, afterword or appendix. The PDF is a calibre build, so structure comes from fonts and indents: a paragraph starts at x0 = 87, continuation lines sit at 72 (no sentence-end guessing, unlike #1). The endnotes are keyed by a bold phrase quoted from the text, not by numbers, so each one is linked where its phrase appears. Checks: for all 12 sections and all 285 notes, the letters-only text equals `pdftotext`'s for the same pages, character for character. 283 notes link in order, 1 by the text before an ellipsis in its key, and 1 by its first 3 words (the key has the book's typo "organcizational"); both loose links were checked by eye, as were 10 random ones (seed 509).
- **Kept as in the PDF:** line-final hyphens are real hyphens in this reflowed ebook ("self-pity", "co-opetition"; `pdftotext` drops them). Nine URLs in the notes that the PDF spreads out with spaces were rejoined from an explicit list, and zero-width spaces were removed. Some journal names in the notes still carry stray spaces from the PDF ("Ne uropsyc hopharmacology").
- **Left out:** title and copyright pages, contents, part pages (Part One = ch. 1-3, Part Two = ch. 4-7, Part Three = ch. 8-9), dedication, acknowledgments, "A Note on Sources", about the author. Italics are dropped (text only, as in #1).
- **Alternatives rejected:** keeping the old full texts (hard line breaks, missing sections); `pdftotext` with sentence-end heuristics as in #1 (the indent rule is exact here); dropping the figures (the text refers to them: "He'll follow the habit:" is followed by a diagram); dropping the notes (they hold the study references, as in #1).
- **What would change this:** a cleaner source (EPUB) turns up, or the figures turn out to be of no use (4.7 MB in the repo).

## 13. Telegram frame in every deck, unnumbered in webinars 2-8; webinar 2's title slide is its banner

- **Date / status:** 2026-10-26, active (extends #11)
- **Decision:** The Telegram/GitHub frame and the corner QR on the Questions frame now come from two preamble macros (`\telegramframebody`, `\telegramqrbox`) and appear in all eight decks. In webinars 2-8 the frame is `[plain, noframenumbering]`: no footer and no number, so every later frame keeps its number and NOTES.md only gained a line under frame 1. Webinar 2's title slide is now its banner PNG (`webinar02/images/title_banner.png`), as webinar 1 shows its banner; webinar 2's plan frame says "մոռացկոտություն" instead of "կարճ ու երկար".
- **Why:** Hayk said yes to the QR in webinars 2-8 (Q9), to the banner title (Q8) and to the label (Q10). In webinar 1 the inserted frame shifted every number and the notes had to be renumbered; the other decks' notes cross-reference frame numbers in prose ("(19)", "(29-36)", "41-րդ ֆրեյմ"), which a script cannot shift safely.
- **Alternatives rejected:** a numbered frame 2 with renumbered notes (see above); the QR on the title slide (both title layouts are full); a PDF of the banner made by `build_art.py` like webinar 1's `title_banner.pdf` (that run rebuilds all art through Edge for one image; the 1920x1080 PNG is sharp at the slide's 16 cm width).
- **What would change this:** webinar 1 is presented again and should match the others (make its frame unnumbered and undo the notes shift); the banners of webinars 3-8 get dates and should become their title slides too.

## 12. One banner per webinar from `build_banner.py --webinar N`, v2 look only

- **Date / status:** 2026-10-26, active (does what #9's "What would change this" named once webinar 2 got a date)
- **Decision:** `build_banner.py` keeps each webinar's wording, chips, popup text and loose emoji in a `WEBINARS` dict and takes `--webinar N`; webinar 1 still builds both looks into `out/v1_bubble` and `out/v2_glazz` (the slides' title image comes from there), later webinars build only the v2 Glazz look into `out/webinar0N/`. Post texts sit next to it as `post_text_webinar0N.md`. Webinar 2: Friday 2026-10-30, 18:30, Zoom (Hayk). Webinars 3-8 were built the same day without dates (Hayk: "No dates yet"): `"date": None` shows "Ամսաթիվը՝ շուտով" and drops the time, and their posts carry `[ամսաթիվ]` / `[ժամ]` blanks. Each popup reuses its deck's title-slide line; button labels share one size, shrunk to fit the 170 px buttons.
- **Why:** webinar 2 needed a banner and post. Rebuilding webinar 1 after the change gave byte-identical SVGs and PNGs (`git diff --stat` on `banner/out` empty), so nothing already posted or used in the slides moved. Webinar 2 shows four chips, not five: five memory labels need three rows, which pushes the date row off the 1920x1080 banner; the script now raises an error instead of drawing past the edge.
- **Alternatives rejected:** a copy of the script per webinar (duplicated layout code); both looks for every webinar (v2 was chosen in #5); a TikZ poster from the slides' `\webinartitle` (the banner is the series' public look and already has the date row).
- **What would change this:** the decks' title slides should show each webinar's banner too (swap `\webinartitle` for the image, as in webinar 1).

## 11. Finished slide PDFs are committed in `slides/pdf/`; webinar 1 links the repo and a Telegram group

- **Date / status:** 2026-10-23, active
- **Decision:** The eight finished decks are copied from each `build/` (still gitignored) to `02_idiot_brain/slides/pdf/idiot_brain_webinarN_chN.pdf` and committed. Webinar 1's frame 2 shows a QR code and link for the webinar's Telegram group (https://t.me/ugheghamprop) and the repo link with the PDF folder; the closing "Questions" frame repeats the QR. The QR is drawn by the LaTeX `qrcode` package (TeX Live 2025, loaded in `webinar01.tex` only), and the rendered slide was decoded with zxing-cpp to check that it opens the link.
- **Why:** Hayk asked for the Telegram QR and the repo link at the start, and said yes to putting the PDFs in the repo, since otherwise the link would show only LaTeX sources. About 18 MB for all eight.
- **Alternatives rejected:** a QR image made in Python (an extra file and dependency; TeX draws it itself); a second QR for the repo on frame 2 (two codes on one slide make phones pick either); committing `build/` (aux files and old job names); linking the slide straight to the PDF folder (Hayk asked for the repo link).
- **What would change this:** the repo grows too much from re-committed PDFs (move them to GitHub Releases); the Telegram group is for the whole series (add the QR to webinars 2-8 too).

## 10. Chapter 2 leaves webinar 1: one chapter per webinar from the start, eight webinars

- **Date / status:** 2026-10-23, active (supersedes the "webinar 1 stays intro + chapters 1-2" part of #9 and #3)
- **Decision:** Webinar 1 is the introduction + chapter 1; chapter 2 (memory) becomes its own deck in `slides/webinar02/`; the chapter decks move up one folder, so chapter N is `slides/webinar0N/` (3-8). The memory slides were moved as they were, not rewritten or expanded: webinar 2 got its own title, hook, series and plan frames, a wrap-up, a teaser for chapter 3 and an appendix, all built from webinar 1's; webinar 1's break moved to before "sleep", webinar 2's sits before "alcohol". Cross-references in the later decks were renumbered by what they point to (intro and chapter 1 content stays "webinar 1", memory content became "webinar 2").
- **Why:** Hayk on 2026-10-23: "i just want eveything up to chapter 2 to be the first session then chapter 2 is seconds and so on" and "i dont care about minutes aount standards slide coutns". Result: webinar 1 has 61 presented frames (~65 min; 59 after the split, plus two Hayk asked for: a Telegram-group QR as frame 2 and why the cortex says yes to dessert), webinar 2 has 52 (~55 min), the others stay at 88-96.
- **Alternatives rejected:** expanding webinars 1 and 2 to ~95 min each from the book (Hayk does not care about length); calling the memory deck "webinar 1b" to keep the old folder numbers (inconsistent); keeping the old deck for the 2026-10-23 talk and splitting afterwards (Hayk asked for the split).
- **What would change this:** webinars 1 and 2 feel too short in practice (expand them from the parts of chapters 1-2 the slides skip); a fixed schedule forces two chapters into one evening again.
- **Known mismatch:** webinar 1's banner (title slide and the posted image) still shows a "հիշողություն" chip, and `banner/post_text.md` promises "faces vs names", which is now webinar 2. Webinar 1's notes tell the speaker to say so on frame 1.

## 9. Chapters 3-8 become webinars 2-7, one chapter each, built by six parallel agents

- **Date / status:** 2026-10-21, active except the webinar numbering, which #10 superseded on 2026-10-23 (these decks are now webinars 3-8) (revises #3: webinar 1 stays intro + chapters 1-2; from webinar 2 on it is one chapter per webinar); revisited 2026-10-21: the queue now allows two builds at once, after one LuaLaTeX build of webinar 1 measured a peak of only 179 MB RAM, so CPU (4 cores), not RAM, is the limit
- **Decision:** Each remaining chapter gets its own ~95 min deck (85-100 presented frames + appendix) in `slides/webinar02/` (ch3) to `slides/webinar07/` (ch8 + afterword), written at the same time by six Opus agents against one spec (`slides/DECK_BRIEF.md`). Shared files are frozen while they work. All LuaLaTeX builds go through `slides/common/build_deck.py`, which queues them behind one machine-wide lock. Webinar 2 on uses a TikZ title slide in the banner's layout (`\webinartitle`) instead of a banner image. Chapter 8 sticks to the book: no extra help-line slide.
- **Why:** Hayk's answers on 2026-10-21: "~95 min, 1 per webinar", "All six now", "Opus 5.5", "No, book only". Builds are queued because only 1.7 GB of 15.6 GB RAM was free at launch, a background LuaLaTeX build was already killed for low RAM on 2026-10-19, and one pass of a ~100-frame deck takes ~3 min on one core. The lock test: a second build waited 55 s for the first, then built. The title macro exists because webinar 1's title slide is its banner, which carries webinar 1's number and date; dates for 2-7 are not set.
- **Alternatives rejected:** ~50 min decks, two chapters per webinar (my recommendation; Hayk chose depth, so webinar 1's "next time" frame now says chapter 3 only); a two-deck pilot before the other four (Hayk chose speed, accepting that a systematic flaw can reach all six); Sonnet agents (cheaper, but weaker Armenian expected); a help-line slide in chapter 8 (Hayk: book only); a git worktree per agent (not needed: each agent writes only its own folder); a per-webinar banner from `build_banner.py` (needs dates nobody has yet).
- **What would change this:** the first finished decks share a flaw (fix the brief, redo only what is affected); a chapter cannot fill ~85 frames without padding (let that deck be shorter); builds still get killed (close apps first, or build decks one after another); Hayk sets dates and wants banners per webinar (extend `build_banner.py` and swap the title frames).

## 8. Webinar 1 deck retargeted to bachelor students: longer, a few memes, an appendix

- **Date / status:** 2026-10-19, active (revises #7 for audience and length)
- **Decision:** Aim the deck at bachelor students instead of high schoolers; let it grow to ~102 presented frames (~100-105 min) instead of ~80, add five meme templates with Armenian captions, add English/scientific terms in brackets, and put four appendix frames (corrections to the book, what we added, sources) after "Questions".
- **Why:** Hayk's answers on 2026-10-19: "let it grow", "a few memes (3-5)", keep "դու", and no additions beyond the book for now. The extra frames mostly come from splitting the ~20 frames whose content was cut off at the bottom (the first draft's main defect), plus more of Burnett's own jokes. The frame title was made smaller and the topic pill moved to the footline, which freed ~1 cm per frame; the two test builds report 0 overfull vboxes. The appendix collects every correction and outside number already listed in NOTES.md, so students can check sources.
- **Alternatives rejected:** keeping ~80 frames by cutting school-ish slides (Hayk chose to let it grow); trimming to ~65 frames; own art only, no memes; extra material beyond the book (Mandela effect quiz, group-project poll, VR sickness, doorway effect: Hayk said not yet); switching to "դուք".
- **What would change this:** the rehearsal runs well over 105 min (NOTES.md lists 11 frames to skip first), the memes fall flat, or Hayk wants the extra studies after all.

## 7. Webinar 1 deck: 90 min, all 9 book sections, alcohol kept, notes in a separate file

- **Date / status:** 2026-10-14, revisited 2026-10-19 (audience and length, see #8)
- **Decision:** `slides/webinar01/` covers the introduction and every section of chapters 1-2 in ~80 frames (14 of them openers or plain frames) with a 5 min break; the alcohol section is presented as in the book; Armenian speaker notes live in `slides/webinar01/NOTES.md`, keyed by frame number and title.
- **Why:** Hayk's answers in the interview: ~90 min talk, keep the alcohol section as the book has it, notes as a separate file, title slide matching banner v2. Interactive moments (Zoom hand raises, chat prompts, a DRM false-memory word test shown at the start of Part 2 and revealed ~20 min later) keep a high-school audience involved over 90 min. Numbers not in the book were checked before use (Loftus & Palmer 1974, Sharpless & Barber 2011, Patient HM's dates, the 2021 failed replication of the divers study, Cassiopea jellyfish sleep 2017); every place the slides differ from the book is listed at the end of NOTES.md.
- **Alternatives rejected:** 60 min / ~35 slides (Hayk chose 90); reframing or skipping the alcohol section (Hayk chose to keep it); Beamer `\note` pages (need pdfpc or a second screen while sharing Zoom).
- **What would change this:** a rehearsal runs long (NOTES.md lists 7 frames to drop first), or the audience turns out younger than high school (revisit the alcohol section).

## 6. Slides use the banner's look, built with LuaLaTeX; art comes from one Python script

- **Date / status:** 2026-10-14, active
- **Decision:** `slides/common/preamble.tex` restyles plain Beamer to the banner identity (cream + dot grid, plum text, pastel accents, Mardoto for text, Glazz for big titles, Ink Free for speech bubbles); `slides/common/build_art.py` prints Twemoji icons, 9 mascot moods (same body as `banner/mascot.svg`) and the v2 banner (title slide) to vector PDFs with headless Edge, which LaTeX uses through `\emoji{name}` and `\mascot{mood}`.
- **Why:** The deck should look like the banner people saw. Edge print-to-PDF keeps everything vector (3.8 KB per emoji page, no rasters) and needs no new install; one multi-page PDF per set means one Edge start-up (each takes 20-80 s on this machine). `\tracinglostchars=3` makes a glyph missing from a font a build error; it already caught a `→` that Mardoto lacks. Unknown emoji or mood names are build errors too.
- **Alternatives rejected:** the earlier agent's draft (metropolis theme, Segoe UI, Armenian flag colours, a different TikZ mascot; kept as `slides/prototypes/preamble_metropolis_draft.tex`) because it no longer matched the banner; porting the mascot to TikZ (two sources of truth for its shape, line widths do not scale with `pic` scale); colour emoji fonts (LuaTeX does not render them reliably); raster PNG emoji (blurry when Zoom viewers zoom in).
- **What would change this:** builds become too slow to iterate (measured: ~20 s of every LuaLaTeX pass is the preamble, a full 3-pass build takes a few minutes), or Edge stops being available on the build machine.

## 5. Banner v2: Glazz title in plum; v1 kept next to it

- **Date / status:** 2026-10-14, active
- **Decision:** Add a second banner version with the title set in Glazz, plum letters with a plain mint offset shadow (`out/v2_glazz/`), and keep v1 (My Bubble Font, pink) unchanged in `out/v1_bubble/`; one script builds both (`VERSIONS` in `build_banner.py`).
- **Why:** Feedback on v1: "Էս բաններների վարդագույն տառերի, սենց փամփլիկ ֆոնտը մի քիչ "անհաջող ասոցիացիաներ" կարող է առաջացնել" (the pink, puffy title letters may invite unfortunate associations). v2 removes both parts: no pink in the title, and Glazz is angular block capitals instead of round bubbles. Glazz was the fallback named in #4 and on Hayk's shortlist. Layout, chips, window and mascot are untouched, so the two versions differ only in the title. A first try outlined the mint shadow in plum too; together with Glazz's built-in cut lines each letter looked doubled, so the shadow outline was dropped. Rebuilt v1 SVGs are byte-identical to the stored ones (`cmp`), because each SVG embeds only its own title font.
- **Alternatives rejected:** recolouring the Bubble title only (the round shape is half of the complaint); Amar (its outline looked busy in the #4 comparison); Mardoto Black (clean and very readable, but plain; next fallback).
- **What would change this:** v2 draws comments too (add a Mardoto Black entry to `VERSIONS`), or the pink window bar and mascot get the same complaint (switch the bar to lavender).

## 4. Webinar banner: code-built SVG, rendered with headless Edge

- **Date / status:** 2026-10-14, revisited 2026-10-14 (title font, see #5)
- **Decision:** Build the banner as SVG from `02_idiot_brain/banner/build_banner.py` (concept "Brain.exe is not responding", cute original brain mascot in `mascot.svg`, warm pastel palette, title «Ապուշ ուղեղը»), rendered to PNG by headless Edge in two sizes: 1920x1080 (post / YouTube) and 1600x640 (Discord event cover, which Discord crops to 2.5:1).
- **Why:** Hayk chose the code-only route first, and the concept, mascot style, palette and title in an interview. Fonts come from fonter.am (Hayk's pick): My Bubble Font for the title (107 glyphs, Armenian only, so the script fails loudly if text uses a missing glyph) and Mardoto for everything else. Emoji are Twemoji 15.1.0 SVGs so they look the same everywhere. Edge is already installed, so no Inkscape or Chromium download is needed; one build takes ~7 s.
- **Title font:** 17 fonter.am fonts were rendered side by side in the sticker style; Hayk shortlisted My Bubble Font, Glazz and Amar, saw full banners in all three, and kept My Bubble Font for its charm even though Glazz reads more easily at thumbnail size. TUFF and Reactive were out (no Armenian lowercase).
- **Event details on the banner:** Friday 23 October 2026, 18:30 (Yerevan time, not labelled; the audience is local), Zoom.
- **Alternatives rejected:** AI-generated art (kept as a later option for a richer background; image models garble Armenian text); Google Fonts' Google Sans / Handjet (fonter.am has more characterful Armenian fonts); 📅 emoji (Twemoji's shows a fixed date, "JUL 17").
- **What would change this:** people misread the title in the feed (switch `TITLE_FONT` to Glazz, a one-line change), or a richer illustrated look is wanted (add an AI background layer).

## 3. Webinar materials are in Armenian; webinar 1 = intro + chapters 1-2

- **Date / status:** 2026-10-14, active
- **Decision:** All webinar material (slides, banner) is written in Armenian. The first webinar covers the introduction, chapter 1 (Mind controls) and chapter 2 (memory).
- **Why:** Hayk's call: the audience is Armenian high school students.
- **Alternatives rejected:** English draft first, translate later (#2) - extra pass with no benefit now that the language is known.
- **What would change this:** a mixed or non-Armenian audience for a later session.

## 2. Idiot Brain slides: Beamer + LuaLaTeX, English draft first

- **Date / status:** 2026-10-14, superseded by #3 for the language (the LuaLaTeX + Armenian-capable font setup still holds)
- **Decision:** Draft the webinar decks in English with LuaLaTeX + fontspec and a main font that also has Armenian glyphs, sharing one preamble in `02_idiot_brain/slides/common/`.
- **Why:** Hayk asked for Beamer source, not PowerPoint. The webinar may be held in Armenian; LuaLaTeX + an Armenian-capable font makes a later translation a text swap instead of a setup change. English first because the book is English and drafts are easier to check against it.
- **Alternatives rejected:** pdfLaTeX (no practical Armenian font support); drafting straight in Armenian (harder to check accuracy against the source before the content settles).
- **What would change this:** Hayk confirms the webinar language. If Armenian, translate the drafts rather than redesigning.

## 1. Book text stored as one Markdown file per chapter

- **Date / status:** 2026-10-14, active
- **Decision:** Extract The Idiot Brain into `02_idiot_brain/NN_<slug>.md`, one file per chapter (intro = 00, afterword = 09), flat, text only.
- **Why:** Hayk wants LLM-readable chapter texts without the notes/llm split used for The Power of Habit. Chapter page ranges come from the PDF bookmarks, which is exact. Footnote markers glued to words ("harmless.22") are converted to Markdown footnotes `[^22]` with definitions under `## Notes`, so a model does not read them as numbers. Paragraphs split by page breaks are rejoined (176 joins). Check: letter-word count of output vs raw PDF text differs by exactly +7 (8 added "Chapter" words, 1 rejoined hyphenated word).
- **Known gaps:** 9 of 274 in-text note markers are absent from the PDF text itself (ch1 n4, ch2 n40, ch3 n14-15, ch5 n1 and n13, ch7 n19, ch8 n13 and n21); those notes are kept in the Notes list but are not linked.
- **Alternatives rejected:** one big text file (worse for per-chapter prompting); per-chapter folders with notes/llm files (not wanted this time); dropping the notes (they hold the study references the slides need).
- **Left out:** front matter, acknowledgements, index, about the author, copyright page.
- **What would change this:** a cleaner source (EPUB) turns up, or the notes turn out to be useless for the slides.
