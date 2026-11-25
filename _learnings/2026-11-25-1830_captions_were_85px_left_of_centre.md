# The pilot's captions sat ~85 px left of centre because of a safe-area notch no source backs

**Symptom:** Hayk: the subtitles "feel to be a bit too much to the left". Measured on rendered stills (bright caption
pixels, bounding box): the caption centre was at x 455-460 in every frame, 80-85 px left of the frame centre (540),
while the pictures above were centred on 540.

**Cause:** the caption box was centred in the safe column x 120-780. The 780 came from a notch in our safe polygon
(x <= 780 below y 840, labelled "TikTok's action rail") that the lit review does not support: it gives the widest
right button column as YouTube's, about 192 px (so x <= 888), and the shared safe box as about 900 x 1400 centred
(`_knowledge/short_videos/lit_review.md`, section 7).

**Fix:** captions in a box x 200-880, centred on the frame; re-measured at +1 px and 0 px from the centre, right
edge at x 797-816, clear of the button column. `tools/contact_sheet.py` now draws the plain box x 120-888,
y 288-1248.

**Consequences:** centre captions on the frame, not on the safe column, unless a wide line would reach x ~888; and
when a layout number has no source, check it against the research before building on it. Still worth one check on a
real upload with a safe-zone overlay (Socialync's checker, per the lit review).
