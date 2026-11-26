# Codex fixes by finding ID

What was changed for each of the 61 findings in `CODEX_REVIEW.md` (applied 2026-11-26, commit 2f332db), and my
view of each finding. "Agree" means I checked the finding and think Codex was right. "Judgment call" means the fix
needed an editorial choice, and that choice is yours to confirm. Nothing has been voiced except the temporary guide
voice for the two zero-knowledge videos.

## Needs your decision

- **Script cuts (X51).** The rule "one idea and one extension" removed beats from the older scripts. Every cut beat
  is kept word for word in its plan's "After the Codex review" section and can come back: Bayes (doctors training,
  symptoms), Simpson (COVID), regression (Galton, everyday examples, summary card), friendship (bus, formula card,
  comfort), yawning (dogs, summary card), own voice (mirror, summary card), crypto (GCHQ history), Petrov
  (biography), QWERTY (legend, contest, Dvorak, economists), waiting (everyday, queue maths, summary card).
- **Spines (X51).** QWERTY now follows "a mechanical layout became inherited infrastructure"; waiting follows the
  psychology (the queue maths is parked as its own video).
- **The zero-knowledge rewrites (X20-X24).** The card proof, "why zero knowledge", the Waldo set-up, the real
  systems and the Short's tease changed meaning, not just wording. Read them before you record.
- **Armenian wording.** 12 open questions in `ARMENIAN_DECISIONS.md` (address, «կարեկցանք», «ռեգրեսիա դեպի միջինը»,
  «ռաունդ», «Ուոլդո», «քվերթի», «ավելի ուժեղ ու թավ», «գործնականում անհնար», ...).
- **Re-approval.** Every script changed, so every approval is open again; the review page's IDs now end in the
  script hash (`review_queue_picker.html`).

## Code (X1-X19)

| ID | What changed | My view |
|---|---|---|
| X1 | TTS manifest keeps unvisited entries, written atomically after each clip; cached clips must be readable and audible; offline test of the interruption case | Agree |
| X2 | A word wider than the caption box never "fits"; the build stops and names it; one long word may go down to 44 px in portrait; «բաժանորդագրություններում» reworded | Agree; the 44 px floor instead of hyphenation is my call |
| X3 | check_sync is called a pause-consistency diagnostic, reports coverage and unmatched breaks, has a pass/fail gate, and compares hand-marked word times from `checkpoints.json` when present | Agree |
| X4 | Unmatched rows are logged as "no matching pause", no logging traceback; test added | Agree |
| X5 | Silent or empty clips fail with the beat name; `tools/import_recording.py` (keep the original, convert, propose cuts, check, apply, narrator "hayk") | Agree; not yet tried on a real phone take |
| X6 | Decimals keep their places (0,05 and 0,005 differ); more than 3 places refused | Agree; named units for 2-3 places is my call |
| X7 | No style prompt by default; the lecturer prompt kept as a preset | Agree |
| X8 | Logging is set up only when a tool runs, never on import (`tools/runlog.py`) | Agree |
| X9 | `tools/validate_episode.py` runs before paid TTS, timeline builds and syncs; the renderer checks the timeline when it loads | Agree |
| X10 | Timeline carries script, clip and audio hashes and a build id; the render audio is named after the build | Agree |
| X11 | Balls counter shows exactly 1, 2, 10, 20 rounds at the spoken numbers; a cue word must be unique or name its occurrence (caught «գտել» twice in the Short) | Agree |
| X12 | Fast-round answers appear only once given; I also hid the coin's face (the friend's private choice) | Agree; the coin is my addition |
| X13 | Both film strips have six rounds | Agree |
| X14 | Landscape caption profile (1500 px, up to 7 words, sizes used); pages merged by time on screen; 0 pages under 0.6 s (8 before) | Agree |
| X15 | Commons original is optional; the credit is saved before it; bounded retries | Agree |
| X16 | Credit lines carry the licence link, the Commons credit and the changes; pilot credits updated | Agree |
| X17 | `requirements.txt` pinned; the pilot declares `@remotion/media` | Agree |
| X18 | Unused `dur` removed; ESLint exit 0 | Agree |
| X19 | Sheet drawn around its own origin; filter region 3000 x 1900 (was 12000 x 7000); the grain now moves with the board | Agree |

## Scripts and plans (X20-X51)

| ID | What changed | My view |
|---|---|---|
| X20 | Only the 26 black cards are shown; the reds stay face down; "complete deck" | Agree: the old version gave the card away |
| X21 | "Why zero" = he already knew every answer, so he learns only "they differ"; the faked video follows from that | Agree: the old definition was wrong |
| X22 | The friend turns away while you place the sheet; "only you see this"; the voice admits a sliver of surroundings | Agree |
| X23 | "Have the same problem", not "solve it every day"; the EU proof is about a state-signed birth date; published / pilot / running tags; "a 'no' is information too" | Agree; the EU roadmap is not re-checked |
| X24 | The Short's tease answers the gossip question in one sentence, then points to the long video | Agree |
| X25 | 99% only if the two tests' errors are independent; the same test repeated stays at 50% | Agree |
| X26 | "99% accurate" is an assumption of the example; the doctors claim narrowed to one session (21% of 160) | Agree |
| X27 | No general "before/after treatment" rule; this example only; "not causal proof" | Agree |
| X28 | Berkeley voice and picture both use the six departments (45% / 30%) | Agree |
| X29 | Weighted card shows (81 + 192) / (87 + 263) = 78% | Agree |
| X30 | The check is a randomised comparison of equally extreme cadets; "our model"; praise not proven useless | Agree |
| X31 | Axis from the data (31-111); invented students; «մոդելավորում» tag | Agree |
| X32 | The formula card is cut; one averaging story | Agree |
| X33 | Popcorn sizes explicit (1x / 2x / 3x); the subscription is the clean decoy; limits narrowed; the close asks what you need | Judgment call (Codex offered two options; I used both) |
| X34 | Soft food, adaptation and help may all have contributed | Agree |
| X35 | The hook traces the healed sockets; nothing circled that is not in the photo | Agree |
| X36 | "One Greek letter per sound"; "as far as possible one sound, one letter" with «ու» as the exception | Agree; the voice reading of «ճ»-ի is open |
| X37 | Silent letters were once pronounced; knight vs house; borrowings and respellings; reform cost as an argument | Agree |
| X38 | Work and energy separated: muscles spend energy just holding; the wheel saves that; "work is zero, energy is not" | Agree |
| X39 | Visible light in, infrared out, seen by a camera | Agree |
| X40 | Dog familiarity claim removed with the dog extension | Agree |
| X41 | No sedentary screens under 2 (not under 1); 1 hour at 2-4 | Agree |
| X42 | Mechanisms hedged; later fantastical-content experiments cited (checked); no "not addicted" diagnosis | Agree |
| X43 | "A good microphone barely distorts you"; surprise is part of it; "fades for many" | Agree |
| X44 | "No known practical fast way on ordinary computers"; analogy flagged; padlock dropped | Agree; «գործնականում անհնար» instead of Codex's «գործնականում դժվար» is my call |
| X45 | Alarm weighed against prior, reliability and other sources; radar line qualified | Agree |
| X46 | Decimal clock: short-lived, inherited, divisible kept apart; cause left open | Agree |
| X47 | The continuous week does not follow the Moon; no "disproof" | Agree |
| X48 | «մակերեսով»; re-project, do not scale; Web Mercator; switch on globe view | Agree |
| X49 | "Maybe the same elsewhere"; ask someone who did not build it | Agree |
| X50 | Survivors cannot tell which generation lasted longer; illustration tagged; «Հա» kept | Agree; the pilot's voice and render are now outdated |
| X51 | Pauses, one closing, no «Այնպես որ,», names and years on source lines, one extension, QWERTY and waiting restructured | Agree with the rule; the cuts are judgment calls (top of the page) |

## Armenian (X52-X56)

| ID | What changed | My view |
|---|---|---|
| X52 | «չտեղի տվեց» removed with its claim | Agree |
| X53 | «ավելի բարակ, պակաս թավ» / «ավելի ուժեղ ու թավ» | Agree; wording for you to confirm |
| X54 | `ARMENIAN_DECISIONS.md` with 12 open questions | Agree; only you can close them |
| X55 | No Latin in the QWERTY voice: «քվերթի», Morse letters only on screen | Agree; «քվերթի» for you to confirm |
| X56 | Closing screen lines say what the voice says (statues, popcorn) | Agree |

## Process (X57-X61)

| ID | What changed | My view |
|---|---|---|
| X57 | README is the current entry point; bake-off frozen; stale shot lists cleaned; publishing order fixed | Agree |
| X58 | `tools/episodes.py`: episode index and review IDs with the script hash; `--approve` records the approved hash | Agree |
| X59 | `ZkShort` (1080 x 1920) with a guide voice; timeline JSONs tracked so a clean checkout type-checks | Agree; first version, the Waldo labels are small at 0.7 |
| X60 | Evidence records in 5 plans (claim, source, kind, how far it was read) | Partly done: several rows are honestly "unverified" and need a source read |
| X61 | Estimate called a planning allowance (totals within 5%, beats up to 26% off); 1:60 bug fixed; old tables marked superseded | Agree |
