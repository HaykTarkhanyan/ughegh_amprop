# An independent reviewer with a neutral brief caught six factual errors that two earlier reviews and the author missed

**Symptom.** The shorts scripts had been through two Fable reviews and my own fact checks, and were close to being
recorded. Codex (gpt-6.1-sol, reasoning xhigh, 26 minutes, one CLI call with a deliberately unbiased brief: "find
what is wrong, don't follow my list") returned 61 findings, 6 of them high, in scripts already marked "facts checked":

- the zero-knowledge card proof turned over all 51 remaining cards, which identifies the missing card by
  elimination, the opposite of the point being made;
- "why zero knowledge" taught non-transferability (a video convinces nobody) as the definition, instead of the
  simulator idea (the verifier learns nothing he could not produce himself);
- Bayes: the 99% after a second test silently assumed independent errors (a repeated test stays at 50%);
- Simpson: "existed before treatment -> compare groups" is not a valid general rule (colliders);
- suitcase: zero mechanical work was set against the legs' energy as if they "disagree";
- WHO: "no screens under 1" left out one-year-olds (the guidance says under 2).

**Cause.** The earlier reviews were briefed with my own checklist (hook, pauses, rules), so they checked what I
already suspected. "Facts checked" sections mixed primary papers, summaries and general knowledge under one heading,
so a wrong mechanism (Egyptian blue: visible light in, infrared out, not the reverse) survived the label.

**What worked.** I verified the high findings before applying them (the elimination logic, Li et al. 2020 in
OpenAlex, the Seymour abstract, two DOIs); all held. The structural findings had reproductions (an interrupted TTS
run losing paid cache entries; 8 caption pages under 0.6 s; three words that could not fit the caption box), so they
could be turned into tests (`03_shorts/tests/test_tools.py`).

**Consequences.**
- Before recording or paying for a voice, run one independent review with a neutral brief and no hypothesis.
- Keep an evidence record per consequential claim (source, page, kind, how far it was read); the plans now have one.
- A new cue-uniqueness check caught a real silent mis-binding on its first run: «գտել» occurs twice in the Short's
  Waldo beat, and the old first-match lookup would have bound the cue to whichever came first without saying so.
