# Scripts, batch 1: eight drafts by Codex, with Claude's review notes

2026-11-28. Written by two Codex agents (gpt-6.1-sol, xhigh) from the fact sheets in
`../_knowledge/short_videos/facts_codex_*_2026-11-28.md`, following `README.md`'s script rules. Not voiced, not
animated. Each plan has the script, the facts with sources, the showcase plan and Codex's own questions (S1, S2, ...).

## The eight

| Folder | Hook (gloss) | Beats | Length (estimate) | Lint | Check |
|---|---|---|---|---|---|
| [monty_hall](monty_hall/PLAN.html) | «Կփոխե՞ս դուռը։» (Would you switch doors?) | 10 | ~1:59 | 0 errors | pass |
| [london_bombs](london_bombs/PLAN.html) | «Պատահականն էլ է կուտակվում։» (Chance clusters too.) | 10 | ~2:00 | 0 errors | pass |
| [anchoring_wheel](anchoring_wheel/PLAN.html) | «Անիվը փոխեց գուշակությունները։» (The wheel changed the guesses.) | 10 | ~1:53 | 0 errors | pass |
| [blind_spot](blind_spot/PLAN.html) | «Կարո՞ղ ես կորցնել այս կետը։» (Can you lose this dot?) | 10 | ~1:58 | 0 errors, 1 hint kept | pass |
| [leap_years](leap_years/PLAN.html) | «Օրացույցից 10 ամսաթիվ ջնջեցին։» (10 dates were deleted.) | 9 | ~1:59 | 0 errors | pass |
| [areni_shoe](areni_shoe/PLAN.html) | «Կոշիկը մոտ 5500 տարեկան է։» (The shoe is ~5,500 years old.) | 8 | ~1:53 | 0 errors | pass |
| [microwave](microwave/PLAN.html) | «Ինչո՞ւ է ափսեդ պտտվում։» (Why does your plate turn?) | 8 | ~1:51 | 0 errors | pass |
| [gps_einstein](gps_einstein/PLAN.html) | «Տեղդ գտնում են ժամացույցով։» (They find you with a clock.) | 9 | ~2:08 | 0 errors | pass |

Lint and the script check rerun by Claude, same results. Pauses 9-10 s in each.

## Claude's review notes

Overall: the facts are careful and match the sheets; no flagged myth is repeated, the reworded hooks are respected,
the London numbers match Clarke's table (229 empty squares, 35 with 3 hits). The weak side is the writing: dry, with
the same caveat often said twice, honesty labels spoken aloud where an on-screen tag would do, and hooks that are
abstract one-liners. Four scripts leave out the very thing that makes the topic catch people.

- **monty_hall:** correct and well built (rules stated, three cases, the "host doesn't know" twist as the extension).
  Missing the human story: vos Savant's 1990 column and the letters telling her she was wrong (the sheet: "close to
  1,000" carried PhD signatures, medium confidence, so say "many" rather than a number). It would make a far stronger
  hook than «Կփոխե՞ս դուռը։».
- **london_bombs:** the voice never says when or what: no 1944, no V-1 flying bombs, no war. «Լոնդոնը ռմբակոծում էին
  դիտմամբ» lands without context. Londoners' suspicion of spies or aiming, the human side, is reduced to «Այդ
  կուտակումների մասին պնդումներ կային». The Yerevan beat is a thought experiment that states twice it is not data;
  it reads as a forced anchor (Codex's S3 asks the same).
- **anchoring_wheel:** the "median" beat and the "doubt" beat say the same thing (groups compared, not
  individuals). No real-world anchoring with evidence, though the sheet has one (high confidence): 52 junior legal professionals
  rolled loaded dice showing 3 or 9 before giving a sentence. The drams beat is an invented example that spends a
  sentence saying it is invented.
- **blind_spot:** the strongest of the eight: the viewer does the test on the phone, then the line test. The
  direction is right (right eye closed, left eye on the cross, dot on the left falls on the left eye's blind spot).
  Worth checking on a real phone once rendered: dot and cross about 5-6 cm apart should vanish at about 20 cm.
- **leap_years:** solid, with a good Armenian anchor (1923, 6 / 19 January). The "doubt" beat repeats the hook and
  beat 2 almost word for word. The drift beat has no number ("the difference is small"); the sheet's rate (about 11 minutes
  a year, a day every ~128 years, high confidence) would make the 10 days feel earned.
- **areni_shoe:** accurate (24.5 cm, about size 37, right foot, 3627-3377 BC, sheep dung, grass inside). Heavy
  hedging in voice and on screen at once («Խոտի առկայությունը փաստ է, իսկ դրա նշանակությունը՝ ...»). No comparison
  that makes 5,500 years feel big: the sheet supports "older than Ötzi's footwear" (high confidence) and advises
  against pyramid or Stonehenge comparisons.
- **microwave:** correct and avoids the false "water resonance" story, but never debunks it, though the sheet
  flags it as a common myth. The best showcase in the sheet is missing: melting spots in chocolate half a wavelength
  apart (about 6 cm in theory; the sheet notes kitchen measurements are rough), which gives the wave a size the viewer
  can see. The tolma is a nice touch.
- **gps_einstein:** the numbers are right (-7, +45, +38 microseconds a day) and the "10 km a day" myth is avoided,
  but the stakes are gone: the voice never says why 38 microseconds matter (light covers about 300 m in a
  microsecond). The "doubt" and "receiver" beats are hard to follow for a general viewer. The Armenia beat (the
  cadastre committee's reference network) is the weakest anchor of the batch.

Terms for Hayk: «հաճախություն» (the style guide's glossary, statistics sense) vs «հաճախականություն» (the usual
physics word for Hz) in microwave; «ջիփիէս» spelled for the voice in gps_einstein; «կույր բիծ» vs «կույր կետ» in
blind_spot.
