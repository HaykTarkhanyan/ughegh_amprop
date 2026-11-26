# Publishing: YouTube, TikTok, Instagram, Facebook

Set up on 2026-11-26 (DECISIONS #27). Name «Ուղեղ Ամպրոպ», handle `ugheghamprop` everywhere, matching the Telegram
group `t.me/ugheghamprop`. All four platforms at launch, with the zero-knowledge video. Research and sources:
`../_knowledge/short_videos/lit_review.md`, section 10.3.

## How videos get posted

Official APIs everywhere, because they are free and reliable (Hayk, 2026-11-26: "APIs are also fine I don't care as
long as its free and reliable"); the Playwright co-pilot is only a bridge while an API is not usable yet.

| Platform | Route | What the research found (2026-11-27, `../_knowledge/short_videos/publishing_research_2026-11-26.md`) |
|---|---|---|
| Instagram (Reels) | Meta Content Publishing API from `tools/publish.py` (to build) | Reels 3 s to 15 min, at most 300 MB; `is_ai_generated=true` sets "AI info". **The Meta app must be switched to Live:** in Development mode, posts it makes are visible only to people with a role on the app (check from a logged-out browser). Keep captions to 5 hashtags (a cap is rolling out) |
| Facebook Page | Meta Graph API, same tool | The Reels endpoint takes **3 to 90 s only**, with the AI flag. Longer Shorts (most of ours: 1:40-2:50) and the long videos go through `/{page-id}/videos`, which documents no AI flag: label them by hand in Business Suite, or test Instagram's "share to Facebook" (whether the shared copy keeps the label: unverified). How a `/videos` upload shows on the Page is undocumented: one test post |
| YouTube | YouTube Data API from the same tool | Free; each upload is 1 unit in its own bucket (100 a day). **Since 2026-11-02 unaudited uploads are no longer forced private, and an omitted `status.privacyStatus` now means public**: the tool always sends it (`private` + `publishAt` to schedule). Since 2026-11-16 `hasPaidProductPlacement` must be sent (`false`). OAuth: the new "Personal" app audience avoids the 7-day token expiry of "Testing" (whether it works for a Brand Account channel: test). Shorts up to 3 min, but a Short over 1 min with any Content ID claim is blocked. The "Related video" link cannot be set by API (manual, needs advanced features) |
| TikTok | **Not the official API**: TikTok's Content Sharing Guidelines say "Not acceptable: A utility tool to help upload contents to the account(s) you or your team manages", and App Review rejects apps "for private or personal use" (checked on TikTok's page 2026-11-27) | **Decided (Hayk, Q34, 2026-11-27): by hand in TikTok Studio**, fully allowed: each video gets a folder with the file, the caption and a note whether to tick the AI label; Hayk uploads and schedules (up to 10 days ahead), about 2 minutes a video. Every account can post 3 min; 5-10 min only for some (`max_video_post_duration_sec`) |

The co-pilot (Playwright on TikTok Studio / YouTube Studio) fills the file, caption, AI label and schedule, then stops
for Hayk to press the final button. Driving these websites by script is against the letter of their terms, so it
stays supervised, low-volume and temporary.

## Shorts point to their long video

Every Short with a long companion says so in the video and links it on each platform (Hayk, 2026-11-26):

- **In the video:** one pointer beat right before the closing beat, naming what only the long video has, with the
  orange pill «▶ երկար տեսանյութ» on screen (`zero_knowledge_short` beat `tease`, `crypto_paint` beat
  `long_pointer`). The voice says «տե՛ս երկար տեսանյութում», not "below", because where the link sits differs per
  platform.
- **YouTube:** the Short's "Related video" set to the long video (YouTube Studio, desktop: Content -> the Short ->
  Related video; one per Short, same channel; it shows as a link under the Short's title). The API does not appear to
  set it, so it is one click per Short, done by hand or by the co-pilot. The long video's description links back.
- **Facebook:** the long video is posted on the Page too, and the Short's post text links it (links in post text are
  clickable).
- **Instagram:** caption links are not clickable, so the caption says the long video is linked in the profile, and the
  bio link (or one of its link slots) points to it; the long video can also go up on Instagram itself.
- **TikTok:** caption links are not clickable; a pinned comment and the profile link point to it, and TikTok also
  takes long horizontal uploads, so the long video can be posted there as well.

**AI label rules found (2026-11-27):** Meta requires the label for "realistic-sounding audio that was digitally
created" (high); YouTube does not require it for a voice that is not a real person's, and has `containsSyntheticMedia`
if we want it (medium); TikTok's own text says realistic audio must be labelled, third-party guides say generic TTS is
exempt (conflicting). Hayk's rule (Q31) labels every TTS video anyway.

**AI label:** videos with the TTS narrator (`narrator: gemini-tts` in the manifest) get each platform's label
(TikTok's AI-generated content toggle, Meta's `is_ai_generated` / "AI info", YouTube's altered or synthetic content
setting). Videos Hayk narrates (`narrator: hayk`) are not labelled. The tools read the narrator from the manifest, so
the label cannot be forgotten.

## Handle check (2026-11-26, logged out, read-only)

| Platform | `ugheghamprop` | How it was checked |
|---|---|---|
| YouTube | free (404; a real channel returns 200) | page status |
| TikTok | free ("Couldn't find this account") | page text |
| Instagram | very likely free ("Profile isn't available"; a real account shows its name) | page title |
| Facebook | unknown (logged-out pages say "not available" either way) | confirmed when the Page username is set |

`ughegh_amprop` and `ughegh.amprop` were also free on YouTube. Facebook usernames allow letters, digits and dots only,
which `ugheghamprop` satisfies.

## Hayk's steps (about an hour; phone checks and captchas need a person)

1. A dedicated channel email with two-step login (its address and passwords go into `key_info.toml`, never into this
   public repo).
2. YouTube: a channel named «Ուղեղ Ամպրոպ», handle `@ugheghamprop`.
3. Facebook: a Page «Ուղեղ Ամպրոպ», username `ugheghamprop`.
4. Instagram: account `ugheghamprop`, switched to a professional account (Creator or Business), linked to the Page.
5. TikTok: account `ugheghamprop`, switched to a Business account (needed for the web scheduler).
6. Log in to TikTok Studio and YouTube Studio once in the Playwright browser, so the co-pilot can use that session.

## My steps

1. Profile picture, banner and Armenian bios (made with the video code; bios through the style guide).
2. `tools/publish.py`, one tool for the official APIs: Meta (a developer app with the Instagram product, a long-lived
   token in `00_notes/.secrets/api_keys.env`, never printed), the YouTube Data API (a Google Cloud project with
   OAuth), and TikTok's Content Posting API once audited. A dry run, the AI label from the manifest, the long-video
   link from the episode metadata, and a confirmation before anything is posted. Meta first (Hayk's steps 3-4).
3. A TikTok hand-off folder per video (file, caption, AI-label note) for Hayk's upload in TikTok Studio (Q34). The
   Playwright co-pilot is no longer planned for TikTok; the YouTube "Related video" field stays a manual Studio step.
4. Per video: Armenian caption, hashtags, the link to the long video for the Shorts, the photo credits
   (`<short>/assets/credits.txt`), chosen from one metadata file per episode.
5. Apply for the TikTok Content Posting API audit (and the YouTube API audit) once the accounts are live.

## Money and links (research, 2026-11-27)

- **YouTube Partner Program:** available in Armenia since 2026-05-11, the full tier only (1,000 subscribers), not the
  500-subscriber tier (high).
- **TikTok Creator Rewards:** Armenia is not listed (medium-high). **Facebook / Instagram programs:** official lists
  could not be loaded (low).
- **Bio links:** TikTok needs 1,000 followers or a Business account for a clickable bio link; an Instagram bio holds 5
  links; Instagram caption links are not clickable (outside a paid Meta Verified test).

## Open

- Posting time and cadence (an Armenian audience: evenings in Yerevan is a guess, to check against the first
  analytics).
- Which video goes first on each platform: the zero-knowledge Short everywhere, the long video on YouTube and
  Facebook.
