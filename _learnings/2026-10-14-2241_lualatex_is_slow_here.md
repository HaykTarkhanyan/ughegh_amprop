# LuaLaTeX builds are slow on this laptop; budget for it

Measured on 2026-10-14 (TeX Live 2025, `lualatex` single pass, times from `date +%s`):

| Document | Time |
|---|---|
| `article` + fontspec + one Armenian word | 9 s |
| beamer + `common/preamble.tex` + 1 frame | 22-27 s |
| same + 10 plain frames / 10 frames with 20 emoji each / 10 frames with boxes | 24 / 26 / 25 s |
| `webinar01.tex` (80 frames, 224 pages), one pass | 94-182 s |
| `latexmk` full build | 3 passes of the above |

So the cost is ~20 s of loading (TikZ, pgfplots, tcolorbox, six fonts) per pass, plus the pages;
emoji and boxes are cheap. The first run after adding fonts also spends ~2 min building the
luaotfload font cache (once).

**Theory, not tested**: the 9 s for a trivial document points at Windows Defender scanning the
thousands of TeX Live files read on every run. Test by timing a build, adding `C:\texlive` to
Defender exclusions (Hayk's call), and timing again.

**Also seen**: with ~1.4 GB of RAM free, one pass died with
`! TeX capacity exceeded, sorry [token memory size=662416]` while loading hyperref, and Git Bash
printed `fork: retry: Resource temporarily unavailable`; the identical rerun worked.

**Consequences**: run full builds in the background; for checking fixes, use one `lualatex`
pass (absolute-position frames may be slightly off until the 2nd pass) or `\includeonlyframes`.
