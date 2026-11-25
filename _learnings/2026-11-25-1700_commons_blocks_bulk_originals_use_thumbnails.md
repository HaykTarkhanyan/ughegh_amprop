# Wikimedia Commons answers bulk original-file downloads with HTTP 429: fetch one big thumbnail instead

**Symptom:** downloading the 52 card SVGs of a CC0 deck one by one with `tools/fetch_commons.py get` worked for the
first ~12 files, then nearly every request got `HTTP Error 429: Too Many Requests`. A slow retry loop (3 s between
files, exponential backoff up to 160 s) managed 8 more files in 12 minutes. The error text then said: "Too many
requests - please contact noc@wikimedia.org to discuss a less disruptive approach or instead use thumbnail images
in sizes listed on https://w.wiki/GHai".

**Cause:** the original-file endpoint (upload.wikimedia.org, full SVG) is rate limited for automated clients; the
thumbnail endpoint at the standard widths is not throttled the same way. `fetch_commons.py get` saves the PNG
thumbnail first and the original second, so the thumbnails kept arriving while the originals failed.

**What worked:** one request for the whole-deck file's thumbnail at a standard width (`--width 3840` gave a
3840 x 1740 PNG, each card about 271 x 406 px), then cutting the 52 cards locally
(`03_shorts/render/assets_src/cut_cards.py`, green table colour -> transparent). One request instead of 52, and no
waiting.

**Consequences:** for a set of images (a deck, an alphabet, flags), look for a single sheet on Commons and fetch
its thumbnail; use standard thumbnail widths; do not loop over originals. If a vector original is really needed,
fetch it alone, not in a burst.
