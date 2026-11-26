# Publishing: YouTube, TikTok, Instagram, Facebook

Set up on 2026-11-26 (DECISIONS #27). Name «Ուղեղ Ամպրոպ», handle `ugheghamprop` everywhere, matching the Telegram
group `t.me/ugheghamprop`. All four platforms at launch, with the zero-knowledge video. Research and sources:
`../_knowledge/short_videos/lit_review.md`, section 10.3.

## How videos get posted

| Platform | Route | Who presses "post" |
|---|---|---|
| Instagram (Reels) | Meta's official Content Publishing API, from a small Python tool (to build) | Hayk confirms in the terminal; the tool posts |
| Facebook Page (Reels) | Meta's official API, same tool | same |
| TikTok | Playwright co-pilot on TikTok Studio's web uploader (to build): fills file, caption, AI label, schedule (up to 10 days ahead), then stops | Hayk clicks the final button |
| YouTube | Playwright co-pilot on YouTube Studio, same pattern | Hayk clicks the final button |

Driving TikTok's and YouTube's websites by script is against the letter of their terms even with Hayk pressing the
button; keep it supervised and low-volume, and move to the official APIs once their audits pass (TikTok Content
Posting API, YouTube Data API). Meta's route needs no app review for our own accounts (Standard Access).

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
2. Meta: a developer app with the Instagram product, the accounts added, a long-lived token in
   `00_notes/.secrets/api_keys.env` (never printed); `tools/publish_meta.py` with a dry run, the AI label from the
   manifest, and a confirmation before posting. Needs the accounts from Hayk's steps 3-4 first.
3. `tools/upload_assist.py`: the Playwright co-pilot for TikTok Studio and YouTube Studio. Needs steps 5-6.
4. Per video: Armenian caption, hashtags, the link to the long video for the Shorts, the photo credits
   (`<short>/assets/credits.txt`), chosen from one metadata file per episode.
5. Apply for the TikTok Content Posting API audit (and the YouTube API audit) once the accounts are live.

## Open

- Posting time and cadence (an Armenian audience: evenings in Yerevan is a guess, to check against the first
  analytics).
- Which video goes first on each platform: the zero-knowledge Short everywhere, the long video on YouTube and
  Facebook.
