# Publishing research: limits, official APIs, AI labels, monetization (2026-11-26)

Read-only web research for publishing Ughegh Amprop videos from our own Python tool to YouTube, TikTok, Instagram and a Facebook Page through the official APIs (own accounts only, one owner). Formats: vertical Shorts 1080x1920 up to about 2:50, horizontal 16:9 long videos of about 5 minutes. Some videos use a synthetic TTS narrator (not any real person's voice), others the creator's own voice. Audience in Armenia.

Method: WebSearch and WebFetch of public pages on 2026-11-26/27, no logins. Many help pages carry no visible date; then the date given is "no date shown" and the read date applies. Source IDs in square brackets point to the list at the end.

Confidence:
- **high** - official page read directly in this session, wording is clear.
- **medium** - official but indirect (search-engine excerpt of a page that would not load, or wording that needs interpretation), or several consistent third-party sources.
- **low** - third-party only, or my inference from the rules.

## Contents

- [Plan-changing findings](#plan-changing-findings)
- [Q1. Maximum video length](#q1-maximum-video-length)
- [Q2. YouTube Data API v3](#q2-youtube-data-api-v3)
- [Q3. TikTok Content Posting API](#q3-tiktok-content-posting-api)
- [Q4. Meta (Instagram and Facebook Page)](#q4-meta-instagram-and-facebook-page)
- [Q5. Monetization for a creator in Armenia](#q5-monetization-for-a-creator-in-armenia)
- [Open points to test before building](#open-points-to-test-before-building)
- [Sources](#sources)

## Plan-changing findings

1. **TikTok: TikTok's own rules exclude our use case from the official API.** The Content Sharing Guidelines list "Not acceptable: A utility tool to help upload contents to the account(s) you or your team manages", and App Review says "Apps must not be for private or personal use". Unaudited Direct Post is SELF_ONLY and only works if the whole account is private. The upload-to-inbox flow still needs the `video.upload` scope approved through App Review. In practice: no reliable official API path for one owner's account. (high for the rules; whether a sandbox can deliver inbox drafts is unresolved)
2. **YouTube: uploads from unverified projects are no longer forced to private (since 2026-11-02).** The flip side: if `status.privacyStatus` is omitted, the video now goes **public**. Always set it explicitly. (high)
3. **YouTube: upload quota is no longer the bottleneck.** `videos.insert` now has its own bucket: 1 unit per upload, default 100 uploads per day. (high)
4. **YouTube: the Shorts "Related video" link cannot be set through the API.** It is Studio-only, added after upload, and needs advanced feature access. (high)
5. **YouTube OAuth: a "Personal" app audience now exists:** a single Google Account, no 7-day token expiry, no unverified-app screen. "Testing" status still kills refresh tokens after 7 days. Unresolved: whether Personal mode works when the channel is a Brand Account. (high for the docs, low for the Brand Account question)
6. **Facebook Page: the Reels API accepts only 3 to 90 seconds.** A 2:50 Short has to go through the regular `/{page-id}/videos` endpoint, which documents no `is_ai_generated` parameter. (high)
7. **Meta: posts made by an app in Development mode are visible only to people with a role on the app.** They can look fine to the owner and be invisible to everyone else. Switch the app to Live and test from a logged-out browser. (high for the official rule; medium that it hits Page video posts, confirmed by a third-party guide)
8. **Meta requires an AI label for "realistic-sounding audio that was digitally created".** A natural-sounding TTS narrator most likely falls under it. Set `is_ai_generated=true` on Instagram media and Facebook Reels. YouTube does not require disclosure for a synthetic voice that is not a real person. TikTok's official wording also covers "realistic audio"; third-party guides say generic TTS is exempt. (Meta high, YouTube medium, TikTok medium-low)
9. **Instagram API: Reels must be 3 s to 15 min and at most 300 MB.** A 5-minute 16:9 video needs a total bitrate under about 8 Mbit/s. (high)
10. **TikTok length per account:** "All TikTok creators can post 3-minute videos, while some have access to post 5-minute or 10-minute videos." A 5-minute long video may be rejected for a new account; check `max_video_post_duration_sec`. (high)
11. **Monetization:** the YouTube Partner Program opened in Armenia on 2026-05-11 (full tier only; Armenia is not on the expanded 500-subscriber list). Armenia is not on any TikTok Creator Rewards list. Facebook and Instagram programs: not found for Armenia, and the official lists could not be loaded. (YouTube high, TikTok medium-high, Meta low)

## Q1. Maximum video length

| Platform | In the app | Via the official API | Confidence |
|---|---|---|---|
| YouTube Shorts | Up to 3 minutes, square or vertical, for uploads on or after 2024-10-15 [S6][S7] | Same video, same rule (classified as a Short by length and aspect ratio); no separate Shorts API | high (app), medium-high (API: the help page names only the app and Studio) |
| TikTok | Recording in the app: 10 min (third-party). Uploads of up to 60 min were a limited 2024 test; no source shows general availability [T14] | Upload endpoint: up to 10 min; per creator: "All TikTok creators can post 3-minute videos, while some have access to post 5-minute or 10-minute videos"; the actual cap comes back as `max_video_post_duration_sec` from creator_info [T5][T2] | API high; app medium-low |
| Instagram Reels | 20-minute Reels camera since Nov 2025; some accounts still see 3 or 15 min caps (third-party, rollout uneven) [M23] | REELS: 3 s minimum, 15 min maximum, 300 MB maximum, aspect ratio 0.01:1 to 10:1 (9:16 recommended), 23-60 fps, MP4/MOV, H.264/HEVC, AAC up to 48 kHz [M2] | API high; app medium |
| Facebook Reels | No length or format limits since the June 2025 change ("all videos will be shared as Reels"), rolled out over the following months [M19][M20] | `video_reels` endpoint: 3 to 90 s, 9:16, 1080x1920 recommended, 24-60 fps; Reels shared as Page stories capped at 60 s [M12] | high |

**Notes and plan impact**

- **YouTube Shorts over 1 minute:** "Any Short that is over one minute in duration with an active copyright claim of any type ... will be blocked globally", whatever the claimant's policy [S7]. A 2:50 Short with any claimed music snippet disappears worldwide. (high)
- **TikTok 5-minute long videos:** fine only if the account has 5-minute access. Read `creator_info` before each post. In the inbox flow the TikTok app enforces the cap when the creator posts. (high)
- **Instagram 300 MB cap:** 300 MB over 300 s is about 8 Mbit/s total. Encode 5-minute 16:9 videos at about 6-7 Mbit/s video plus 128 kbit/s audio. A 2:50 Short at 10 Mbit/s is about 210 MB, so it fits. (high for the limit, the bitrate maths is mine)
- **Instagram in-app reach:** third-party analyses say Reels over 3 min are not recommended to non-followers [M23]. Unverified, low.
- **Facebook Page, longer vertical video:** a 2:50 vertical video cannot go through `video_reels` (max 90 s). It has to be posted with `POST /{page-id}/videos` (regular video). Since the June 2025 change, Facebook presents every video as a Reel in the app, but **no Meta developer page says how an API-posted `/videos` upload is shown** (as a Reel or as a classic video). Unresolved; test with one post. (high for the 90 s limit, low for the display question)

## Q2. YouTube Data API v3

### 2a. Are uploads from unverified projects still forced to private?

**No, not since 2026-11-02.** (high)

- Revision history, 2026-11-02: "Videos uploaded through the `videos.insert` method from unverified API projects are no longer restricted." It reverses the 2020 policy under which such uploads were restricted "to private viewing mode until the project completed an audit" [S2].
- Same entry: "If you don't specify a value for the `status.privacyStatus` property in a `videos.insert` request, the uploaded video's privacy status defaults to `public`." and "Certain uploads might default to `private` based on creator account settings." [S2]
- The Videos: insert reference now reads: "Videos uploaded from unverified API projects are not restricted to private viewing mode." [S1]
- The conflicting text seen earlier was the pre-November wording. Localized copies, mirrors (for example developers.google.cn) and third-party blogs may still show the 2020 rule. I did not check every localized copy.

**Plan impact:** always send `status.privacyStatus` (`private` for a review step, or `private` plus `status.publishAt` for scheduling). An omitted field now means an immediate public upload.

### 2b. Quota cost of an upload and the default daily quota

(high)

- 2025-12-04: upload cost cut "from approximately 1600 units to approximately 100 units" [S2].
- 2026-06-01: granular quotas. "API calls to the `videos.insert` and `search.list` methods will be charged to their own respective quota buckets." All other methods stay in the existing bucket [S2].
- Videos: insert reference: "A call to this method has a quota cost of 1 unit in the Video Uploads quota bucket." [S1]
- Getting started: "a default quota allocation of 100 `search.list` calls, 100 `videos.insert` calls, and 10,000 units per day combined for all other endpoints", "Default quota, which is subject to change" [S3].
- So: **up to 100 uploads per day by default**. `videos.update`, `thumbnails.set`, `captions.insert`, `playlistItems.insert` and the rest come out of the 10,000-unit general bucket. Their per-call costs were not re-checked in this pass.
- Also new: `thumbnails.set` accepts custom thumbnails for Shorts after processing (2026-11-03, new `shortsAspectRatio` property) [S2].

### 2c. Can a Short's "Related video" link be set through the API?

**No.** (high)

- The videos resource has no property for a related or linked video. The only "linked" item is `brandPartner` (a brand partner channel, added 2026-07-07) [S4][S2].
- Help Center: add it in YouTube Studio, Content, select the Short, "Select a Related Video from your channel", Save. "You can add a related video after you upload your Short." "The video you select has to be public or unlisted." "Adding a related video is only available with advanced feature access." [S5]
- Third-party scheduling tools (OpusClip, Vizard) state the same: not exposed in the public API [S18] (third-party, consistent).
- **Plan impact:** linking each Short to its long video stays a manual Studio step after upload, and the channel needs advanced features turned on.

### 2d. OAuth reliability for a single-owner app

**Refresh-token lifetime in "Testing": 7 days. Confirmed.** (high)
- "A Google Cloud Platform project with an OAuth consent screen configured for an external user type and a publishing status of "Testing" is issued a refresh token expiring in 7 days, unless the only OAuth scopes requested are a subset of name, email address, and user profile" [S9].
- "Authorizations by a test user will expire seven days from the time of consent." [S10]

**Other ways a refresh token dies** [S9] (high):
- not used for six months;
- the user revokes access;
- more than 100 refresh tokens per Google Account per OAuth client: the oldest is invalidated **silently**;
- a password change, but only for tokens with Gmail scopes (not our case).

**Is `youtube.upload` sensitive or restricted?** Most likely **sensitive**, not restricted. I found no official page that labels this exact scope. Google's sensitive-scope page lists "deleting a YouTube video" as an example of a sensitive scope [S12], and the Cloud Console shows the class when the scope is added. (medium)

**"In production" without verification** (medium-high):
- Unverified apps that request sensitive scopes show the "unverified app" screen before consent. They are capped at "100 new users in total", a cap that "applies over the entire lifetime of the project, and it cannot be reset or changed" [S10][S11].
- Verification is not required for "personal use" ("used by only a few users, all of whom are known personally to you") or for apps in "development, testing, or staging" [S12].
- If you do verify for sensitive scopes: a privacy policy on the app's own domain, a public home page, domain verification in Search Console, an unlisted YouTube demo video of the consent flow, and a justification for each scope; "can take up to 10 days"; no fee mentioned [S12].
- Production apps do not get the 7-day expiry. A Google forum answer recommends switching to "In production" for exactly this reason. One 2024 forum post reports tokens still expiring after the switch, which stayed unresolved [S19] (third-party, conflicting).

**New option: "Personal" app audience** (high for what the docs say) [S10]:
- Personal projects "limit authorization requests exclusively to the single Google Account that created the application".
- They "are not subject to the OAuth user cap or 7-day test user token expiration" and "do not display the unverified app screen".
- "Personal mode is a one-time selection when configuring a new application". An existing External or Internal app cannot be switched to it; a new client or project is needed. Other accounts get a `client_user_mismatch` error.
- **Unresolved (low):** whether it works when the YouTube channel belongs to a **Brand Account**. A Brand Account is a separate Google identity from the personal account that created the project. If the channel is a Brand Account, authorizing for it may count as "another account" and fail with `client_user_mismatch`. No source covers this.

**Least-effort setup that does not break every week** (my recommendation, medium):
1. Create a new OAuth client with the **Personal** audience. Authorize once for the channel. If that succeeds, the refresh token lives until it goes unused for 6 months or is revoked.
2. If Personal mode refuses the channel (Brand Account): **External + "In production", unverified**. Click through the unverified-app warning once, store the refresh token and use it at least every few months. Verification is optional under the personal-use exemption.
3. Never leave it in "Testing".
4. In both cases, handle `invalid_grant` loudly (log at ERROR, tell the owner to re-authorize). Do not retry silently.

### 2e. Altered or synthetic content disclosure

**A synthetic narrator voice that is not a real person: disclosure not required by the written rules, but YouTube may add its own label.** (medium)

- Rule: "We require creators to disclose AI-generated or altered content that seems realistic." Triggers: "Makes a real person appear to say or do something they didn't do", "Alters footage of a real event or place", "Generates a realistic scene that didn't actually occur", "Creates music that's the main focus of the video" [S8].
- No disclosure for: "Production assistance, like using generative AI tools to create or improve a video outline, script, thumbnail, title, or infographic", "Caption creation", "Cloning one's own voice to create voice overs or dubs", non-realistic content, and more [S8].
- The page has **no explicit rule for a generic synthetic narrator**. Such a voice does not make a real person appear to say anything, so by the stated triggers no disclosure is needed. This is my reading, not YouTube's wording.
- Auto-labels: "YouTube may automatically apply an AI label ... for: ... Content that contains C2PA metadata ... Content that our internal systems detect is AI generated or altered", and "Labels may appear in the expanded description for non-music AI-generated audio" [S8]. So a TTS-voiced video may get a description label from YouTube anyway. If YouTube mislabels it, the creator can change the answer in Studio "in most cases".
- Realistic AI **visuals** (a realistic scene that never happened) would require disclosure regardless of the voice.
- Penalties for creators who "consistently choose not to disclose": manual labels, "removal of content or suspension from the YouTube Partner Program" [S8].

**Settable through the API: yes.** `status.containsSyntheticMedia` (boolean), settable on `videos.insert` and `videos.update`, added 2024-10-30 [S2][S4]. (high)

**Related, can break silently:**
- Since 2026-11-16, `paidProductPlacementDetails.hasPaidProductPlacement` "no longer defaults to `false`". If omitted, the video "isn't declared as free of paid product placement". Send `false` explicitly [S2]. (high)
- Monetization policy: since 2025-07-15 "repetitious content" is called "inauthentic content" and covers "content that looks like it's made with a template with little to no variation across videos". YouTube's cited examples include near-identical narrated stories and slideshows. It applies channel-wide [S17] (official wording via search excerpt, plus third-party coverage; medium). A TTS series with a fixed template is the risk profile to keep varied.

## Q3. TikTok Content Posting API

### 3a. Upload (inbox/draft) flow vs Direct Post for unaudited apps

**Upload to inbox (`video.upload`)** [T1][T4] (high for the documented facts):
- The app calls `/v2/post/publish/inbox/video/init/` (FILE_UPLOAD or PULL_FROM_URL). The creator gets an inbox notification and "must click on inbox notifications to continue the editing flow in TikTok" to post.
- Limits: "There may be at most 5 pending shares within any 24-hour period" (error `spam_risk_too_many_pending_share`); "Each user access_token is limited to 6 requests per minute".
- The request has **no `post_info`**: no caption, privacy, comment settings or `is_aigc`. All of that is set by hand in the TikTok app.
- The upload pages do **not** state a private-only restriction for this flow. That restriction is written on the Direct Post pages.
- **But** the docs require "Your app must be approved for the `video.upload` scope", and approval goes through App Review (see 3b), which rejects personal-use apps.
- Sandbox: "You can add up to 10 accounts" and "Sandbox mode does not offer access to Content Posting API for public videos" [T9]. **Unresolved (low):** whether a sandbox app can deliver inbox drafts that the creator then posts publicly in the app. The wording suggests not, but no page says so for the inbox flow specifically.

**Direct Post (`video.publish`)** [T2][T3][T6] (high):
- "All content posted by unaudited clients will be restricted to private viewing mode."
- "Unaudited API Clients can only post contents in `SELF_ONLY` viewership."
- "Unaudited API Clients can allow up to 5 users to post in a 24 hour window", and the posting account must be private at the time of posting. Error `unaudited_client_can_only_post_to_private_accounts`: "Unaudited clients can only post to a private account."
- **So an unaudited app cannot post to a public channel at all**, not even as a private post.
- After the audit: privacy options from creator_info, typical cap "around 15 posts per day/creator account", shared across all Direct Post clients.

### 3b. What the audit requires, time, cost

**App Review (needed for any scope in production)** [T7][T8] (high):
- "A valid official website", not "a landing page or login page", with Privacy Policy and Terms of Service links visible "without having to open a menu".
- A demo video of the full end-to-end flow (up to 5 videos, 50 MB each), showing every requested scope.
- An app description. "Apps must not be for private or personal use." "Apps that are still in development or testing will not be approved."
- Time: "App review may take several days to two weeks after submission."

**Direct Post audit** [T6] (high):
- Mandatory posting UX: show the creator's nickname from fresh creator_info; a privacy dropdown with **no default**; interaction settings (comments, Duet, Stitch) all off by default and switched on by hand; a commercial-content disclosure toggle (off by default); the consent line "By posting, you agree to TikTok's Music Usage Confirmation"; a preview; a duration check against `max_video_post_duration_sec`.
- Use-case rules: "API Clients should facilitate authentic creators to post original content to TikTok"; "should be intended for a wide audience, not limited to internal groups/private use"; "Not acceptable: A utility tool to help upload contents to the account(s) you or your team manages."
- Audit time: not published anywhere in the docs (third-party sources agree) [T17].
- Cost: no fee is mentioned in any official page read (App Review, FAQ, guidelines). (medium: absence of a fee, not a statement)

**Plan impact (blocker):** our tool is exactly the "Not acceptable" example. An honest application would be rejected, and an unaudited client cannot post to a public account. Realistic options: (A) post to TikTok by hand in the app, (B) a supervised browser co-pilot (outside the official API, so it carries ToS risk), (C) an already-audited third-party scheduler (paid, account linking; not researched here). This reopens the TikTok part of DECISIONS #27 / the 2026-11 "official APIs on all four platforms" plan.

### 3c. Can the API set the AI-generated content label?

**Yes, in Direct Post only.** `post_info.is_aigc` (bool, optional): "Set to true if the video is AI generated content"; the post then shows "Creator labeled as AI-generated" [T3]. The inbox upload has no such field; the creator switches the label on in the app before posting [T4]. (high)

Is the label needed for a TTS narrator? **Sources conflict.** (medium-low)
- TikTok support (official; the page would not load here, wording from search excerpts): the label is required for "realistic images, audio, and video"; "AI-generated speech" that makes subjects say things they did not say counts as AI content [T10].
- Community Guidelines (released 2026-08-25, effective 2026-09-24): "we require creators to label AI-generated or significantly edited content that shows realistic-looking scenes or people". This frames it visually and says nothing about voice [T11].
- Third-party guides (Magic Hour, Sirency, Hootsuite) list "generic text-to-speech narration that is not a recognizable known person's voice" as not needing a label [T12].
- Safe default: switch the label on for TTS-narrated videos whose voice sounds like a real human. TikTok says labeling does not reduce distribution (search excerpt of the support page, medium).

### 3d. Clickable link in the profile bio

**A personal account with 1,000+ followers, or a Business account.** The TikTok support page could not be loaded (JavaScript). The search-engine excerpt reads "at least 1,000 followers, or if you have a Verified Business Account". Third-party 2026 guides say "a registered business account or over 1,000 followers", one website field, set only in the mobile app, and availability varies by region [T13]. (medium; the exact business-account condition, registered vs verified, is unresolved)

## Q4. Meta (Instagram and Facebook Page)

### 4a. Instagram API with Instagram Login vs with Facebook Login

| | Instagram Login | Facebook Login |
|---|---|---|
| Facebook Page needed | "Not required" | "Required" (IG account linked to a Page) |
| Host | graph.instagram.com | graph.facebook.com (+ rupload.facebook.com) |
| Token | Instagram User token | Facebook User or **Page** token |
| Publish permissions | `instagram_business_basic`, `instagram_business_content_publish` | `instagram_basic`, `instagram_content_publish`, `pages_read_engagement` |
| Missing features | no ads, tagging, hashtag search | none of those gaps |
| Reels publishing, `is_ai_generated` | yes | yes |

Sources: [M1][M4][M5]. (high)

- **Standard Access is enough for own accounts, no App Review:** Standard Access is for apps "that will only be used by people who have roles on them", for example "If your app only serves your Instagram professional account or an account you manage" [M4]. The App Review page lists "My app is only for a business I own or manage" as Standard Access with no review [M6]. Business Verification is needed only for Advanced Access [M4][M16]. (high)
- **Which is simpler today:** for Instagram alone, Instagram Login: no Page link and a single permission pair. Since we also post to a Facebook Page, Facebook Login covers both with one Page token that does not expire (4b). It needs the IG account linked to the Page and Page Publishing Authorization done if the Page requires it [M1]. My recommendation: Facebook Login, because one non-expiring token covers both platforms. (medium: a judgement call, both work)
- **Development mode trap:** "Any data generated while an app is in Development mode, such as test posts, can only be seen by role users. However, that data will be visible to non-role users once the app is switched to Live mode." [M17] A third-party setup guide (Postiz) confirms that Facebook posts "will display for yourself but will not be visible for other users" until the app is Live [M18]. The app-modes page says to go Live after App Review, and it does not say whether a Business app can go Live with only Standard Access. Postiz says personal-use installs do not need the advanced permissions. **Test:** switch to Live, publish once, check from a logged-out browser on both Instagram and Facebook. (high for the rule, medium for its effect on Instagram, which no page states)

### 4b. Token lifetimes and staying logged in

**Instagram Login** [M4][M7] (high):
- Short-lived token: 1 hour. Long-lived token: "valid for 60 days and can be refreshed before they expire".
- Refresh rule: the token must be "at least 24 hours old but has not expired", with `instagram_business_basic` granted. "Refreshed tokens are valid for 60 days from the date at which they are refreshed."
- An expired token cannot be refreshed. Then a manual re-login is needed. **A scheduled refresh (say weekly) keeps it alive indefinitely**, but if the tool sits unused for 60 days it breaks.

**Facebook Login** [M8][M9] (high for the doc text):
- Long-lived user token: "generally lasts about 60 days".
- A Page token generated from a long-lived user token: Page tokens "do not have an expiration date". They "only expire or are invalidated under certain conditions" (the page does not list them; usually a password change, loss of the Page role, or removing the app).
- Data access expiration: "90 days, based on when the user was last active". The page does not say whether it affects Page tokens. (unresolved, medium-low)

**System user (Business Manager)** [M10][M11] (medium-low):
- The business must own the app, and the app and the system user must belong to the same business. Standard Access allows 1 system user.
- The token can be permanent (omit `set_token_expires_in_60_days`) or 60-day (Meta recommends the expiring one).
- Conflict: the overview tells you to put the app through "App Review (and Business Verification) for the permissions" the system user needs. The token page names only Standard Access to the Ads Management API as a minimum. Unresolved whether a Standard-Access-only app can mint a system user token with `pages_manage_posts` / `instagram_content_publish` for its own assets.

**Most reliable for one owner** (medium): Facebook Login, a long-lived user token, then a non-expiring Page token stored once. The same Page token publishes to the linked Instagram account. Add a daily `debug_token` or cheap GET check that fails loudly. The system user is a fallback if Page tokens keep getting invalidated.

### 4c. Publishing to a Facebook Page via the Graph API

**Reels** [M12] (high):
- `POST /{page_id}/video_reels` with `upload_phase=start` -> upload bytes to `rupload.facebook.com/video-upload/{video-id}` -> `POST /{page_id}/video_reels` with `upload_phase=finish`, `video_state=PUBLISHED` (the docs are inconsistent and also say "complete") -> `GET /{video-id}?fields=status`.
- Permissions: `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`; a Page token from a user who can do the `CREATE_CONTENT` task.
- Specs: 3-90 s, 9:16, 1080x1920 recommended (540x960 minimum), 24-60 fps, H.264/H.265 (VP9, AV1 also accepted), AAC-LC stereo 48 kHz 128 kbit/s or more. No file-size maximum is stated.
- "Reels API is limited to 30 API-published posts within a 24-hour moving period." Page posts are public only.
- Hosted-file uploads are rejected if robots.txt blocks Facebook's crawler.

**Regular videos** [M13][M14] (high for the endpoint, medium for limits):
- Resumable upload: `POST /{app-id}/uploads` -> `POST /upload:{session-id}` (file handle `h`) -> `POST graph-video.facebook.com/{page-id}/videos` with `fbuploader_video_file_chunk`, `title`, `description`.
- Same three permissions and the `CREATE_CONTENT` task. `scheduled_publish_time` between 10 minutes and 6 months ahead (with `published=false`).
- Length and file-size limits are not stated on the developer pages read.
- `is_ai_generated` is not listed for `/videos`.

**Standard Access suffices for one's own Page** (people with a role on the app, Page they manage) [M16]. Watch the Development-mode visibility issue (4a). (high for access, medium for the visibility)

**Plan impact:** Shorts up to 90 s can go through `video_reels` with the AI flag. 2:50 Shorts and 5-minute videos go through `/videos` with no documented AI flag. The AI label would then have to be added by hand in Meta Business Suite, if it can be added there for API-posted videos (unverified).

### 4d. The `is_ai_generated` parameter

- **Instagram:** changelog 2026-06-22: "Set the new `is_ai_generated` parameter to `true` when creating a media container to apply the AI info label." Available with Instagram Login and Facebook Login. For carousels, only on the carousel container; "Setting this parameter on carousel children will result in an error." It can be read back with `GET /{ig_media_id}?fields=is_ai_generated` [M1][M3]. The media reference describes it as "An optional parameter to provide a self-disclosure of AI usage in the post" and "Not available for carousel children"; it does not list the media types one by one [M2]. Reading: any single container (image, REELS, STORIES) plus the carousel parent. (high for Reels and the carousel rule, medium for Stories)
- **Facebook:** `is_ai_generated` (boolean, default false) on `video_reels`: "Set to `true` to disclose that the reel was created or edited using AI." [M12][M15]. Not listed on `/{page-id}/videos` [M14]. A third-party feature request claims a `video_labels: ["LABELED_AI_GENERATED"]` value on the video endpoint. Unverified, low.
- A third-party glossary says the flag can only be set at creation, not added later (low).
- **When the label is required on Meta:** "We'll require people to use this disclosure and label tool when they post organic content with a photorealistic video or realistic-sounding audio that was digitally created or altered, and we may apply penalties if they fail to do so" (Meta newsroom, 2024-02-06, updated 2025-04-01) [M21]. The Meta Help Center page on AI labels uses a reel with a realistic AI-generated voiceover as its example (search excerpt; the page itself was behind a cookie wall) [M22]. **A natural-sounding TTS narrator should be labeled on Instagram and Facebook.** (high for the rule text, medium for the voiceover example)

### 4e. Links in Reels captions and in the Instagram bio

- **Caption links are not clickable** for ordinary accounts. Since March 2026 Meta is testing clickable caption links only for paying Meta Verified subscribers (one tester reported a cap of 10 links per month) [M25]. Since early 2026 the Edits app can add clickable overlay links to Reels, but "They cannot direct viewers to external websites" [M26]. (medium, third-party)
- **Bio:** up to **5 links** (since April 2023, all account types; a linked Facebook profile counts toward the five; only the first shows, the rest sit in a pop-up) [M24]. The Instagram Help Center page did not load (JavaScript). (medium-high, consistent third-party coverage)
- **Can break silently:** since Dec 2025 Instagram is rolling out a cap of **5 hashtags** per post or Reel (Mosseri, reported 2025-12-19) [M27]. The API docs read do not mention it, so what happens to a caption with more hashtags via the API (rejected or trimmed) is unknown. Keep captions at 5 hashtags or fewer. (medium)

## Q5. Monetization for a creator in Armenia

| Program | Armenia listed? | Details | Confidence |
|---|---|---|---|
| YouTube Partner Program | **Yes**, since 2026-05-11 | Official YPP availability list includes Armenia [S13]; YouTube blog "the YouTube Partner Program is now live" in Armenia, 2026-05-11 [S14]. Criteria: 1,000 subscribers plus 4,000 public long-form watch hours in 365 days or 10 million public Shorts views in 90 days [S15] | high |
| YouTube expanded YPP (500-subscriber tier: fan funding, Shopping) | **No** | The expanded-YPP country list goes Algeria, American Samoa, Argentina, Aruba, Australia, Austria; Armenia is absent [S16] | high |
| TikTok Creator Rewards Program | **No** | No official list could be loaded (Creator Academy page is JavaScript). Third-party 2026 lists name about 8 countries (US, UK, Germany, France, Japan, South Korea, Brazil, Mexico; some add Canada, Italy, Spain, Australia); none includes Armenia [T15] | medium-high that Armenia is out, medium on the exact list |
| Facebook content monetization (in-stream ads, Stars, Subscriptions, bonuses) | **Not found** | The official "country and language availability" page exists but did not render [M28]. A third-party 2026 summary does not show Armenia on the Stars or Subscriptions lists [M30]. Performance bonuses are invite-only. Armenian is not reported as a supported language | low |
| Instagram (Gifts, Subscriptions, bonuses) | **No (Gifts list)** | A third-party copy of the Help Center Gifts list (as of 2026-10-01) has Georgia but not Armenia [M29]. Bonuses are invite-only | medium-low |

Notes:
- The YouTube Partner Program applies the inauthentic-content policy channel-wide (see 2e). A TTS-narrated templated series is the risky profile.
- For Facebook and Instagram, the definitive check is the Professional Dashboard of the actual Page or account (it shows only the programs available to it).

## Open points to test before building

1. **YouTube Personal mode with the real channel:** create a Personal-audience client and authorize the channel. Does it work if the channel is a Brand Account (`client_user_mismatch`)?
2. **YouTube default privacy:** one test upload with an explicit `private`, to confirm that "Certain uploads might default to private based on creator account settings" does not override it.
3. **TikTok sandbox:** does a sandbox app with `video.upload` deliver an inbox draft that the creator can then post publicly? If not, TikTok stays manual or co-pilot.
4. **Meta Live mode:** can our Business-type app with Standard Access only be switched to Live? After switching, are Instagram Reels and Facebook videos posted by the app visible from a logged-out browser?
5. **Facebook `/videos` with a 2:50 vertical file:** does it show as a Reel or as a classic video? Can the AI label be added afterwards in Business Suite?
6. **Instagram caption with 6+ hashtags via the API:** rejected, trimmed, or accepted?
7. **TikTok `creator_info`:** what `max_video_post_duration_sec` our account returns (3, 5 or 10 minutes).

## Sources

All read on 2026-11-26/27. "No date shown" = the page shows no publication or update date (often only a copyright footer).

YouTube / Google
- [S1] Videos: insert reference - https://developers.google.com/youtube/v3/docs/videos/insert - official, no date shown
- [S2] YouTube Data API revision history - https://developers.google.com/youtube/v3/revision_history - official, newest entry 2026-11-16 (entries used: 2024-10-30, 2025-12-04, 2026-06-01, 2026-06-03, 2026-07-07, 2026-11-02, 2026-11-03, 2026-11-16)
- [S3] Getting started (quota) - https://developers.google.com/youtube/v3/getting-started - official, no date shown
- [S4] Videos resource - https://developers.google.com/youtube/v3/docs/videos - official, no date shown
- [S5] Add a related video to your YouTube Shorts - https://support.google.com/youtube/answer/14075157 - official help, no date shown
- [S6] Upload YouTube Shorts - https://support.google.com/youtube/answer/12779649 - official help, no date shown
- [S7] Understand three-minute YouTube Shorts - https://support.google.com/youtube/answer/15424877 - official help, no date shown (cutoffs 2024-10-15, artist channels 2025-12-08)
- [S8] Disclosing altered or synthetic content - https://support.google.com/youtube/answer/14328491 - official help, no date shown
- [S9] Using OAuth 2.0 (refresh token expiration) - https://developers.google.com/identity/protocols/oauth2 - official, no date shown
- [S10] Manage App Audience - https://support.google.com/cloud/answer/15549945 - official help, no date shown
- [S11] Unverified apps - https://support.google.com/cloud/answer/7454865 - official help, no date shown
- [S12] Sensitive scope verification - https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification - official, no date shown
- [S13] YouTube Partner Program availability - https://support.google.com/youtube/answer/7101720 - official help, no date shown
- [S14] YouTube Partner Program in Armenia - https://blog.youtube/news-and-events/youtube-partner-program-armenia/ - official blog, 2026-05-11
- [S15] YPP launched in Armenia - https://hightech.gov.am/en/articles/news/ypp-launched-1 - Armenian Ministry of High-Tech Industry (third-party to YouTube), 2026-05-12
- [S16] Overview of the expanded YouTube Partner Program - https://support.google.com/youtube/answer/13429240 - official help, no date shown
- [S17] YouTube channel monetization policies (inauthentic content) - https://support.google.com/youtube/answer/1311392 - official help, read via search excerpt; change dated 2025-07-15. Coverage: https://www.searchenginejournal.com/youtube-targets-mass-produced-content-in-monetization-update/550337/ (third-party, 2025-07)
- [S18] Shorts related video not in the API - https://help.opus.pro/docs/article/link-shorts-to-original-video.md and https://help.vizard.ai/en/articles/13643189-can-i-add-a-link-to-my-long-form-youtube-video-when-publishing-shorts-via-vizard - third-party, no date shown
- [S19] Refresh token expires within 7 days, In Production - https://groups.google.com/g/adwords-api/c/WDgwEZT6Cd0 - forum (third-party), 2024

TikTok
- [T1] Content Posting API, upload content - https://developers.tiktok.com/doc/content-posting-api-get-started-upload-content - official, last updated 2026-11-26
- [T2] Content Posting API, get started (Direct Post) - https://developers.tiktok.com/doc/content-posting-api-get-started - official, last updated 2026-11-26
- [T3] Direct Post reference - https://developers.tiktok.com/doc/content-posting-api-reference-direct-post - official, last updated 2026-11-25
- [T4] Upload video reference - https://developers.tiktok.com/doc/content-posting-api-reference-upload-video - official, last updated 2026-11-26
- [T5] Media transfer guide - https://developers.tiktok.com/doc/content-posting-api-media-transfer-guide - official, last updated 2026-11-26
- [T6] Content Sharing Guidelines - https://developers.tiktok.com/doc/content-sharing-guidelines - official, last updated 2026-08-04
- [T7] App review guidelines - https://developers.tiktok.com/doc/app-review-guidelines - official, last updated 2026-08-04
- [T8] Getting started FAQ - https://developers.tiktok.com/doc/getting-started-faq - official, last updated 2026-08-04
- [T9] Add a sandbox - https://developers.tiktok.com/doc/add-a-sandbox - official, last updated 2026-08-04
- [T10] About AI-generated content - https://support.tiktok.com/en/using-tiktok/creating-videos/ai-generated-content - official help, did not render (redirects to a JavaScript page); wording from search excerpts only
- [T11] Community Guidelines, integrity and authenticity - https://www.tiktok.com/community-guidelines/en/integrity-authenticity - official, released 2026-08-25, effective 2026-09-24
- [T12] TTS exemption claims - https://magichour.ai/blog/tiktok-ai-generated-content-labels , https://www.sirency.com/blog/tiktok-ai-generated-content-label , https://blog.hootsuite.com/ai-disclosure-policy-for-tiktok/ - third-party, dates not checked
- [T13] Bio link - https://support.tiktok.com/en/getting-started/setting-up-your-profile/linking-another-social-media-account (official, did not render; search excerpt), https://linktr.ee/blog/how-to-add-a-linktree-to-your-tiktok-bio and https://buffer.com/resources/how-to-put-a-link-in-tiktok-bio - third-party, 2026
- [T14] TikTok length - https://techcrunch.com/2024/05/16/tiktok-upload-60-minute-videos/ (third-party, 2024-05-16), https://postfa.st/sizes/tiktok/video (third-party, no date)
- [T15] Creator Rewards countries - https://quasa.io/media/tiktok-creator-rewards-program-eligible-countries-in-2026 (third-party, 2026-07), https://ttcalculator.net/learn/creator-fund-countries/ (third-party, 2026), https://www.toptal.com/creator/post/how-to-join-the-tiktok-creator-rewards-program (third-party, 2026)
- [T16] Postiz TikTok provider docs - https://docs.postiz.com/providers/tiktok - third-party, no date shown
- [T17] Audit timing and scope commentary - https://www.socialync.io/blog/tiktok-content-posting-api-guide-2026 , https://adaptlypost.com/blog/why-does-my-app-need-approval-post-tiktok - third-party (vendors), 2026

Meta
- [M1] Instagram Content Publishing - https://developers.facebook.com/docs/instagram-platform/content-publishing - official, examples v27.0, no date shown
- [M2] IG User Media reference - https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media - official, "latest API version v27.0"
- [M3] Instagram Platform changelog - https://developers.facebook.com/documentation/instagram-platform/changelog - official, entries up to 2026-07-30 (is_ai_generated: 2026-06-22)
- [M4] Instagram Platform overview - https://developers.facebook.com/docs/instagram-platform/overview - official, no date shown
- [M5] Instagram API with Instagram Login - https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login - official, no date shown
- [M6] App Review for Instagram API - https://developers.facebook.com/docs/instagram-platform/app-review - official, no date shown
- [M7] Refresh access token (Instagram) - https://developers.facebook.com/docs/instagram-platform/reference/refresh_access_token - official, no date shown
- [M8] Long-lived access tokens - https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived - official, v27.0
- [M9] Data access expiration - https://developers.facebook.com/docs/facebook-login/auth-vs-data - official, no date shown
- [M10] System users overview - https://developers.facebook.com/docs/business-management-apis/system-users/overview - official (served in German), no date shown
- [M11] System users, install apps and generate tokens - https://developers.facebook.com/docs/business-management-apis/system-users/install-apps-and-generate-tokens - official, no date shown
- [M12] Reels Publishing API - https://developers.facebook.com/docs/video-api/guides/reels-publishing - official, examples v27.0
- [M13] Video API publishing - https://developers.facebook.com/docs/video-api/guides/publishing - official, examples v27.0
- [M14] Page videos reference - https://developers.facebook.com/docs/graph-api/reference/page/videos/ - official, v27.0
- [M15] Page video_reels reference - https://developers.facebook.com/docs/graph-api/reference/page/video_reels/ - official, v26.0 (search excerpt)
- [M16] Access levels - https://developers.facebook.com/docs/graph-api/overview/access-levels - official, no date shown
- [M17] App modes - https://developers.facebook.com/docs/development/build-and-test/app-modes - official, no date shown
- [M18] Postiz Facebook provider docs - https://docs.postiz.com/providers/facebook - third-party, no date shown
- [M19] Making it easier to create videos on Facebook - https://creators.facebook.com/blog/making-it-easier-to-create-videos-on-facebook - official (Meta creators blog), 2025-06-17
- [M20] Facebook: all videos to be shared as Reels - https://techcrunch.com/2025/06/17/facebook-announces-that-all-videos-on-its-platform-will-soon-be-shared-as-reels - third-party, 2025-06-17
- [M21] Labeling AI-generated images on Facebook, Instagram and Threads - https://about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/ - official newsroom, 2024-02-06, updated 2025-04-01
- [M22] How to identify AI content on Meta products - https://www.meta.com/help/artificial-intelligence/1783222608822690/ - official help, cookie wall, wording from search excerpts only
- [M23] Instagram Reels length - https://petapixel.com/2025/11/25/instagram-updates-camera-so-you-can-film-20-minute-reels (third-party, 2025-11-25), https://buffer.com/resources/instagram-reels-length (third-party, reviewed 2026-11), https://swarmify.com/blog/instagram-video-length-how-long-can-instagram-videos-be/ (third-party)
- [M24] Instagram up to 5 bio links - https://techcrunch.com/2023/04/18/instagram-takes-on-linktree-and-others-with-support-for-up-to-5-links-in-bio/ - third-party, 2023-04-18
- [M25] Caption links test - https://www.engadget.com/social-media/meta-is-testing-clickable-links-in-instagram-captions-for-verified-subscribers-184555406.html and https://petapixel.com/2026/03/16/instagram-begins-testing-clickable-links-in-post-captions/ - third-party, 2026-03
- [M26] Clickable Reels links and hashtag limits - https://www.socialmediaexaminer.com/what-clickable-reels-links-and-hashtag-limits-mean-for-your-2026-instagram-strategy/ - third-party, 2026-03-05
- [M27] Instagram 5-hashtag cap - https://www.socialmediatoday.com/news/instagram-implements-new-limits-on-hashtag-use/808309/ and https://betanews.com/2025/12/19/instagram-puts-a-limit-on-hashtag-usage/ - third-party, 2025-12-19
- [M28] Facebook content monetization, country and language availability - https://www.facebook.com/business/help/267128784014981 - official help, did not render (only the title loaded)
- [M29] Instagram Gifts country list - https://www.sirency.com/blog/instagram-gifts-for-creators - third-party, 2026-10-01
- [M30] Facebook monetization by country (2026) - https://www.lilachbullock.com/?p=153161 - third-party, 2026
