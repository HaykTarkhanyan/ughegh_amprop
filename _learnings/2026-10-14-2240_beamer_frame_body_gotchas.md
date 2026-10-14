# Three TikZ-in-Beamer gotchas that each cost a full build

All three hit `slides/webinar01` on 2026-10-14; each one only showed after ~1-2 min of compiling.

**1. A style with `#1` defined inside a frame body**

**Symptom**
```
! Illegal parameter number in definition of \iterate.
l.527 \end{frame}
```
**Cause** Beamer reads the whole frame body as a macro argument, so `#1` in
`\begin{tikzpicture}[box/.style={... text width=#1}]` written directly in the frame is a parameter
of that macro. Figure files pulled in with `\input` are fine: they are read when the frame runs.
**Fix** Parameterised styles live in `common/preamble.tex` (`flow=<width>`, `chatmsg=<width>`);
frames only define styles without `#`, and set colours per node (`fill=...`).

**2. Font commands inside `\edef`**

**Symptom**
```
! TeX capacity exceeded, sorry [input stack size=10000].
\@setfontsize #1#2#3->\@nomath #1
l.19     }            (figures/sleep_need.tex)
```
**Cause** The pgfplots `\foreach` + `\edef\temp{...}` trick expands everything, including
`\blackfont\small`, which recurse when expanded.
**Fix** `\noexpand` every font command (and `\,`) inside the `\edef`.

**3. A style named like a built-in key**

**Symptom** `! Package pgfkeys Error: The key '/tikz/step' requires a value.`
**Cause** `step` is TikZ's grid key. Naming a local style `step` collides with it.
**Fix** Use specific names (`storystep`).

**Consequence** Check new frames with `prototypes/style_test.tex` or a one-frame file before
launching a full deck build.
