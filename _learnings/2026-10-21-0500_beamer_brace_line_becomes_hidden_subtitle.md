# A `{...}` line right after `\begin{frame}{Title}` disappears: Beamer takes it as the subtitle

**Symptom:** the first line of a frame (an intro sentence in `{\small ...}`) is simply not on the slide. No error, no warning, nothing in the overflow counts. Found by the webinar 5 agent on 2026-10-21; a scan then found 11 more frames in webinars 3, 6 and 7, e.g. webinar 7's psychosis frame without its "Փսիխոզ (psychosis)" definition.

**Cause:** the frame environment is `\begin{frame}<overlay>[options]{title}{subtitle}`. While looking for the optional subtitle, Beamer skips spaces and a single newline, so

```latex
\begin{frame}{Փսիխոզ}
  {\small \textbf{Փսիխոզ} (psychosis)՝ ...}\par
```

hands the whole brace group to the (unused) subtitle. A blank line between them stops it.

**Fix:** start the line with `\relax{...}` (or put any other token first). Webinar 1 had no case.

**Check:** the scratch scan looks for frames whose first non-comment line after `\begin{frame}...{title}` starts with `{`. Add it to the deck checks if this recurs.
