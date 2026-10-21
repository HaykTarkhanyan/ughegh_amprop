# `visible on=<n->` hid boxes and text but not emoji or mascots, so they appeared one click early

**Symptom:** in webinar 1, frame 25 (tug of war), the referee mascot meant for click 2 was already on click 1; the same for every `\emoji`, `\bigemoji` and `\mascot` inside a TikZ node or pic marked `visible on`. Contact sheets of the LAST overlay (what all our checks looked at) cannot show this. Reported by the webinar 3 agent on 2026-10-21, confirmed by rendering frame 25's first and last overlay side by side.

**Cause:** the preamble's `invisible` style was `opacity=0, text opacity=0`. That makes fills, strokes and text transparent, but an `\includegraphics` of a PDF page (all our art) is drawn as-is.

**Fix (common/preamble.tex):** `invisible` now also runs `execute at begin node={\idiot@hiddentrue}`, and `\idiot@art` draws a `\phantom` of the art (same size, nothing drawn) while that flag is true. Checked after the fix: frame 25's first overlay has no mascot, the last overlay does.

**Still not covered:** a plain `\includegraphics` (photos, memes) inside a `visible on` node. Use `\onslide` outside TikZ for those, or webinar 3's local `\showon` macro.

**Lesson for checks:** for overlay frames, also look at the first overlay (scratch script `first_overlay.py` renders first and last side by side).
