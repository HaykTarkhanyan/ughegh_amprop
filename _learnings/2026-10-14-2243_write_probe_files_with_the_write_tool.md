# Backslashes in generated LaTeX probes got mangled; write probe files with the Write tool

**Symptom** Probe `.tex` files generated from the shell failed with
`! Text line contains an invalid character. l.3 ^^H egin{document}`: the `\b` of `\begin` arrived
as a backspace character. It happened with `printf` (expected: printf interprets `\b`) and also
with `python - <<'EOF'` heredocs containing `"\\begin"` string literals, and a Python
`s.replace("\\textit{", ...)` in a heredoc matched nothing although the file contained `\textit{`.

**Cause** Not verified. The quoted heredoc should pass backslashes through untouched, so something
between the tool call and Python halved them.

**What worked** Writing the generator with the Write tool (using `chr(92)` for backslashes), or
editing `.tex` files with the Edit tool (`replace_all`) instead of shell one-liners.
