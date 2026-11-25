# yt-dlp cannot download "made for kids" YouTube videos without a login: only storyboard thumbnails

**Symptom:** for the kids-TV short I wanted to count camera cuts in CoComelon, Bluey, Caillou and SpongeBob uploads
with ffmpeg `scdet`. Every download failed (yt-dlp 2026.10.26, `--js-runtimes node`):

```
ERROR: [youtube] n4rh2jD8OkY: This video is not available
```

A normal video (Veritasium, 3LopI4YeC4I) worked with the same command. With
`--extractor-args "youtube:player_client=web_embedded"` (also `mweb`, `ios`, `web_safari`) the video was found, but
`-F` listed only storyboards (`sb0` 320x180 ... `sb3` 48x27, "images storyboard", ~1 fps); `tv` said "The page
needs to be reloaded", `android_vr` "not available".

**Cause (likely):** YouTube restricts made-for-kids videos for anonymous clients.

**Consequences:**
- For kids' content, a download needs a logged-in session (`--cookies-from-browser`), which uses Hayk's account
  cookies: ask first, every time. Screen-recording is the other route.
- Storyboards are not a substitute for cut counting: at ~1 frame per second (coarser on long uploads) short shots are
  missed, so they give at best a lower bound.
- The short therefore states no CoComelon cut rate; it uses the measured 2011 figure (SpongeBob one scene every 11 s
  vs Caillou every 34 s, Lillard & Peterson).
