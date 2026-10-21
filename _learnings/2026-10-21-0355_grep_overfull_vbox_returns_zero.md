# `grep "Overfull \vbox"` finds nothing in Git Bash; webinar 1 shipped with 20 overflowing frames

**Symptom:** on 2026-10-19 the webinar 1 build was reported as "0 overfull vboxes" and the deck was called done. On 2026-10-21 `build_deck.py` (Python, `line.startswith("Overfull \\vbox")`) found 48 in the same kind of build, from 20 frames. Frames 3, 4, 5, 8, 20 and 30 render pixel-identical to the 2026-10-19 review images, so nothing had changed: the old count was wrong.

**Cause:** in Git Bash, every regex spelling of the pattern returns 0 on a log that has 48 matches:

```
$ grep -c "Overfull \\vbox" webinar01.log     -> 0
$ grep -c "Overfull \\\\vbox" webinar01.log   -> 0
$ grep -c 'Overfull \\vbox' webinar01.log     -> 0
$ grep -cF 'Overfull \vbox' webinar01.log     -> 48
```

Why the escaped forms fail is not established (MSYS argument conversion is a guess, untested). The fixed-string form works. The same session, `sed -i '79s/\\begin{card}$/.../' file.tex` changed nothing and reported no error, and a regex `grep -c 'quad \\emoji{speech}'` returned 0 where `grep -cF '\quad \emoji{speech}'` returned 1. So in Git Bash, treat any regex containing a backslash as unreliable: use `grep -F`, Python, or the Edit tool.

**Consequences:**
- Count LaTeX log problems with `build_deck.py`'s report or `grep -F`, never a regex with a backslash.
- A zero count is evidence only if the same command has been seen to find a known positive.
- The 72 dpi contact sheets did not save it either: frame 4's card runs under the frame number and frame 34's chat box is cut off, and both were "checked". Look at sheets at 100 dpi or more, and look at the bottom edge of each frame on purpose.
