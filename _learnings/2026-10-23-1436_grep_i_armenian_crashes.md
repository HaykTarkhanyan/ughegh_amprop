# `grep -i` with an Armenian pattern crashes in Git Bash and prints nothing

**Symptom:** a search for every "վեբինար" mention in the decks returned no lines at all, and a `grep.exe.stackdump` file appeared in the current folder (`slides/`). The same search without `-i` found the lines.

**Cause:** Git Bash's GNU grep 3.0 (locale `C.UTF-8`) aborts on `-i` with a non-ASCII pattern. Measured on 2026-10-23, run from the scratchpad on `webinar03/NOTES.md`:

```
grep -c -F 'վեբինար' NOTES.md      -> 11, exit 0
grep -c -i -F 'վեբինար' NOTES.md   -> (nothing), exit 134, grep.exe.stackdump written to the cwd
rg -c -i 'վեբինար' NOTES.md        -> 12 (also counts the capital Վեբինար)
```

**Consequences:** inside a pipeline (`grep -i ... | grep -v ...`) the crash is invisible and reads as "no matches", the same trap as the backslash patterns in `2026-10-21-0355_grep_overfull_vbox_returns_zero.md`. For Armenian text use `rg` (case-insensitive works, and it is faster), or grep without `-i` and spell out both cases (`[Վվ]եբինար`). `*.stackdump` is gitignored, but delete the dump file anyway.
