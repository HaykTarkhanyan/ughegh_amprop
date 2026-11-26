# Publishing: YouTube, TikTok, Instagram, Facebook

Set up on 2026-11-26 (DECISIONS #27). Name «Ուղեղ Ամպրոպ», handle `ugheghamprop` everywhere, matching the Telegram
group `t.me/ugheghamprop`. All four platforms at launch, with the zero-knowledge video. Research and sources:
`../_knowledge/short_videos/lit_review.md`, section 10.3.

## How videos get posted

Official APIs everywhere, because they are free and reliable (Hayk, 2026-11-26: "APIs are also fine I don't care as
long as its free and reliable"); the Playwright co-pilot is only a bridge while an API is not usable yet.

| Platform | Route | Status |
|---|---|---|
| Instagram (Reels) | Meta Content Publishing API from a small Python tool (to build) | usable at once: own professional account, Standard Access, no app review |
| Facebook Page (Reels and the long video) | Meta Graph API, same tool | usable at once |
| YouTube (Shorts and the long video) | YouTube Data API upload (free; default 10,000 units a day, an upload costs 100 units by the current reference, older docs say 1600: either way enough) | test the first upload: older docs say uploads from an unaudited project stay private until a free compliance audit; if so, apply and bridge with the co-pilot |
| TikTok | Content Posting API (free; no per-call price published) | posts stay private until TikTok's audit of the app; until then the co-pilot on TikTok Studio, or the API's upload-to-inbox flow if it is allowed before the audit (to check), with Hayk pressing post in the app |

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
3. `tools/upload_assist.py`: the Playwright co-pilot, only for what an API cannot do yet (TikTok before its audit,
   YouTube if uploads stay private, the YouTube "Related video" field). Needs steps 5-6.
4. Per video: Armenian caption, hashtags, the link to the long video for the Shorts, the photo credits
   (`<short>/assets/credits.txt`), chosen from one metadata file per episode.
5. Apply for the TikTok Content Posting API audit (and the YouTube API audit) once the accounts are live.

## Open

- Posting time and cadence (an Armenian audience: evenings in Yerevan is a guess, to check against the first
  analytics).
- Which video goes first on each platform: the zero-knowledge Short everywhere, the long video on YouTube and
  Facebook.
