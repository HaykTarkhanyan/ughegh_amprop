# pgfplots `xtick=data` only takes the first `\addplot`'s coordinates

**Symptom** Bar charts drawn with one `\addplot` per bar (so each bar can have its own colour) showed only one axis label: the sleep-paralysis chart had "Բոլորը" but no "Ուսանողներ" / "Հոգեբուժական պացիենտներ", and the Loftus chart's red "ջախջախվեցին" bar had no label. No warning in the log; seen on the contact sheets of 2026-10-19.

**Cause** With `symbolic x coords`, `xtick=data` (and `ytick=data`) uses the coordinates of the first plot only.

**Fix** List the ticks explicitly: `xtick={general, students, treatment}` (or `ytick={...}` for `xbar`). Both chart files now carry a comment saying so.
