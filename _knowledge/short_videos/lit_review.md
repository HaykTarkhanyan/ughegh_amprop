# Programmatic short videos: tools review

Date: 2026-11-25. Scope: short vertical videos for YouTube Shorts, Instagram Reels and TikTok about thinking errors
(first idea: survivorship bias, with local examples such as "Soviet fridges still work, so Soviet things were better").
"Made with AI" here means: Claude (or Gemini) writes the script and the code, and the code renders the video. No
AI-generated images or AI video (Veo and the like); that is out of scope by Hayk's choice.

Hayk's answers that set the scope (Q1-Q6, 2026-11-25):

| ID | Question | Answer |
|----|----------|--------|
| Q1 | Language | Armenian only |
| Q2 | Look | Code-drawn animation mixed with real photos (animated: zoom, pan, highlight) |
| Q3 | How automated | Claude Code in-session: topic in, Claude writes script and scene code, renders, checks; Hayk reviews |
| Q4 | Posting | Manual upload for now |
| Q5 | Where | This repo: review in `_knowledge/short_videos/`, production later in `03_shorts/` |
| Q6 | Look | A new look, not the webinar branding (no brain mascot, no plum/cream) |

How sure each claim is:

- **[L]** checked live today on this machine (PyPI, npm, GitHub API, local ffmpeg)
- **[S]** from web search summaries today; the page itself was not read in full, so treat numbers as approximate
- **[Q]** from the earlier research in `sample_problems_qysu/_knowledge/manim_llm_video/research.md` (2026-11-24),
  not repeated here
- **[U]** my inference, not verified

---

## Contents

1. [Short answer](#1-short-answer)
2. [What is already working (the qysu pipeline)](#2-what-is-already-working-the-qysu-pipeline)
3. [The rendering framework (the fundamental choice)](#3-the-rendering-framework-the-fundamental-choice)
4. [Armenian voice](#4-armenian-voice)
5. [Captions (Armenian, word by word)](#5-captions-armenian-word-by-word)
6. [Real photos and footage](#6-real-photos-and-footage)
7. [Format: size, safe zones, length, hook](#7-format-size-safe-zones-length-hook)
8. [Music and sound](#8-music-and-sound)
9. [Checking a finished video](#9-checking-a-finished-video)
10. [Platform rules: monetization, AI labels, posting APIs](#10-platform-rules-monetization-ai-labels-posting-apis)
11. [Ruled out and why](#11-ruled-out-and-why)
12. [Content note: the Soviet fridge example](#12-content-note-the-soviet-fridge-example)
13. [Costs per video](#13-costs-per-video)
14. [Open decisions and next step](#14-open-decisions-and-next-step)
15. [Sources](#15-sources)

---

## 1. Short answer

- The voice is solved: the qysu pipeline already makes Armenian narration with Gemini TTS (voice Sadaltager), one WAV
  per sentence, with a cost ledger. About $0.01 per 45 s of speech. **[Q]**
- The open question is **what renders the picture**. Three realistic candidates:
  - **Remotion** (React/TypeScript, mature, free for one person, official Claude Code skills, built-in TikTok-style
    captions). My pick for this look.
  - **HyperFrames** (HeyGen, plain HTML/CSS, Apache 2.0, built for coding agents, but only 7 months old and pre-1.0).
    Close second.
  - **Manim** (already set up, great for math diagrams, but weak at photos, typography and kinetic captions).
- Armenian **word-by-word captions** are the hardest part: Whisper-based aligners are weak on Armenian. Because we
  have the exact text the voice reads, we do not need speech recognition, only timing. Start with timing spread by
  character count inside each sentence; move to forced alignment (MMS) if it drifts visibly.
- Posting by API is real work: YouTube and TikTok keep API uploads **private** until the app passes an audit. Manual
  upload (Q4) is the right start.
- YouTube does not pay for "mass-produced, template" videos (inauthentic content policy). Fine for us as long as each
  short has its own script and a real point of view; risky if we churn near-identical clones.

---

## 2. What is already working (the qysu pipeline)

In `~/OneDrive/Desktop/misc/sample_problems_qysu/animations/` **[L]**:

- `tools/tts_gemini.py beats narration/<scene>.hy.json media/narration/<scene>/`: one WAV per beat, reuses unchanged
  beats, writes `manifest.json` with durations, logs cost to `tts_ledger.csv`. Standard library only, no SDK.
- Model `gemini-3.8-flash-tts`, voice Sadaltager (picked after a listening test on 2026-11-24, qysu DECISIONS #29),
  style prompt "calm university lecturer".
- `scenes/narration.py` (`NarratedScene`): `self.say("key")` ... `self.finish_beat()` syncs Manim animations to the
  clips and writes an `.srt`.
- `tools/render_check.py`: renders, prints the failing line, makes a contact sheet of frames.
- Manim CE 0.22.1 in a uv venv with Python 3.12; system ffmpeg 5.1.2 is on PATH. **[L]**
- The first narrated prototype (Cantor staircase, 76 s) works.

What carries over to shorts no matter which framework wins: the beats JSON format, `tts_gemini.py`, the ledger, the
key handling, the contact-sheet check. The beats JSON plus `manifest.json` (durations) is a clean hand-off point:
any renderer can read it.

What does not carry over well: the house style (dark background, 16:9, lecturer pace) and Manim itself, if the new
look needs real typography and photos (section 3).

---

## 3. The rendering framework (the fundamental choice)

This is a "fundamental" choice in the CLAUDE.md sense: every scene, template and helper will be written in it, so
switching later means rewriting them. Not decided here.

### 3.1 Candidates

| Framework | Language | Version, last activity | Licence | Photos / video clips | Text and Armenian fonts | Captions | Agent support |
|---|---|---|---|---|---|---|---|
| **Remotion** | React + TypeScript, renders in headless Chrome | npm `remotion` 4.0.547 (24 Nov 2026), 75.5k stars, pushed daily **[L]** | Own licence: free for individuals and teams up to 3; companies pay ($25/seat/month or $0.01/render) **[S]** | `<Img>`, `<OffthreadVideo>`, CSS transforms: trivial | Any web font via CSS, so any Armenian font; real text layout (wrapping, kerning) **[U]** | `@remotion/captions` 4.0.547 **[L]** with TikTok-style word-highlight pages **[S]** | Official Agent Skills for Claude Code since Jan 2026 (`npx skills add remotion-dev/skills`, 8k stars) **[L][S]** |
| **HyperFrames** (HeyGen) | Plain HTML + CSS + JS with seekable animations, headless Chrome + FFmpeg | npm `hyperframes` 0.9.92 (25 Nov 2026), 89.6k stars, launched Apr 2026 **[L][S]** | Apache 2.0, no render fees **[L]** | Native HTML media | Any web font via CSS **[U]** | Kinetic-caption blocks in its catalog **[S]** | Built for agents: skills for plan, write, lint, preview, render; a `/remotion-to-hyperframes` port skill **[L]** |
| **Manim CE** | Python | 0.22.1 (27 Oct 2026), 42.9k stars **[L]** | MIT | `ImageMobject` works, but no video clips inside a scene and photo effects are manual **[U]** | Pango `Text`; Arial for Armenian; no real paragraph layout **[Q]** | Hand-built per word | No official skill; our own `AUTHORING.md` + cheat sheet in qysu **[Q]** |
| **Revideo** | TypeScript (Motion Canvas fork with headless render) | `@revideo/core` 0.11.0 (Jul 2026), 4.2k stars, now under `midrender` **[L]** | MIT | Yes | Canvas text **[U]** | Manual | None found |
| **Motion Canvas** | TypeScript | 3.17.2 (Feb 2025), last push Jul 2026 **[L]** | MIT | Yes | Canvas text | Manual | None; no headless render (button in the editor) **[S]** |
| **MoviePy** | Python | 2.2.1 (May 2025, no release since) **[L]** | MIT | Good for cutting/compositing clips | PIL/ImageMagick text, clunky | Manual | None |
| **Plain ffmpeg + ASS subtitles** | CLI | ffmpeg 5.1.2 local **[L]** | LGPL/GPL | Ken Burns via `zoompan` | libass renders any installed font; karaoke tags (`\k`) for word highlight **[U]** | Yes, ASS karaoke | None; filter graphs get unreadable fast |

### 3.2 How they fit this project

- **Remotion**: the closest fit for "animation + photos + big bold Armenian captions". Mature (4.x for years), large
  community, deterministic renders, a captions package made for exactly this format, and official skills for the
  agent we use. Costs: a Node/React project in a repo that is otherwise Python and LaTeX; Chrome-based rendering is
  heavier than Manim. Remotion renders frames in parallel; on this 4-core laptop it must be capped
  (`--concurrency=2`) or it will load every core **[U]**: check the default on the first render.
- **HyperFrames**: same rendering idea (HTML in headless Chrome), but plain HTML/CSS instead of React, which agents
  write very reliably, and Apache 2.0. The worry is age: launched April 2026, still 0.9.x, roadmap tied to HeyGen's
  paid Studio app ($25/month Pro). Expect breaking changes. The star count (89.6k in 7 months) says hype, not
  stability.
- **Manim**: keep it for math-heavy scenes (it is excellent there), not as the base for shorts. Photos, video clips,
  paragraph text and kinetic captions all fight the tool. If a short ever needs a Manim diagram, render it as a clip
  and drop it into the main framework **[U]**.
- **Revideo / Motion Canvas / MoviePy**: no reason to pick them over the above. Revideo's future follows a commercial
  editor; Motion Canvas has no headless render; MoviePy's last release is 18 months old.

### 3.3 What would flip the pick

- If a one-hour **bake-off** (same 20 s fridge script in Remotion and HyperFrames, in session) shows HyperFrames'
  skills give clearly better first drafts with less fixing, pick HyperFrames.
- If the shorts become a team or company effort with more than 3 people, Remotion needs a paid licence;
  HyperFrames does not.
- If Hayk wants to stay in Python only, Manim + ffmpeg is the fallback, accepting weaker captions and photo work.

---

## 4. Armenian voice

Covered in depth in the qysu research (section 3.3) **[Q]**. Summary for shorts:

| Engine | Armenian | Cost | Word timings | Note |
|---|---|---|---|---|
| **Gemini 3.8 Flash TTS** (current) | Yes | ~$0.0135/min; Flash-Lite ~$0.009/min; free tier ~10 calls/day | Not documented | Style is steerable by prompt. Prices "roughly double" from 2027-01-01 **[Q]** |
| **Azure AI Speech** (`hy-AM-AnahitNeural`, `hy-AM-HaykNeural`) | Yes | ~$0.015/min, free 0.5M chars/month | **Native word boundaries** | Older-generation voices; would solve caption timing exactly **[Q]** |
| **ElevenLabs v4/v3** | Yes | ~$0.08/min | Character timestamps **[U]** | ~5x the price |
| Edge TTS, Google Cloud TTS classic | **No** Armenian | | | Ruled out **[Q]** |

For shorts the voice needs more energy than the "calm lecturer" prompt. A quick test: the same 3 sentences in 3-4
Gemini voices with a "lively, fast, storytelling" style prompt, ~$0.05 total. Use the paid key: the free tier allows
only ~10 calls a day **[Q]**.

---

## 5. Captions (Armenian, word by word)

Most short-form viewers start muted, so big on-screen captions are standard **[U]** (widely repeated, not checked).
The typical style shows 1-4 words at a time and highlights the word being spoken.

### 5.1 Getting word timings

The key fact: we know the exact text, because we wrote it and the TTS read it. So this is **alignment**, not
speech recognition.

| Method | How | Accuracy | Effort | Note |
|---|---|---|---|---|
| **A. Sentence timing only** | Each beat's start/end from `manifest.json` (already there) | Exact per sentence | None | Fine for 1-line subtitles, not for word highlight |
| **B. Spread by characters** | Inside each sentence, give each word time in proportion to its length (plus a small pause at commas) | Usually close for TTS, which speaks evenly **[U]** | ~30 lines | Start here; check by watching |
| **C. Forced alignment (MMS)** | `ctc-forced-aligner` 1.0.2 **[L]** with the MMS-300m model (1,130 languages, tagged `hy`) **[S]**; Armenian text is romanized with uroman first **[S]** | Word-level, from the audio | Torch on CPU, ~300M model **[U]** | Repo BSD-2, but the **model weights are CC-BY-NC-4.0** (non-commercial) **[S]**. Armenian accuracy untested |
| **D. WhisperX** | 3.8.6 **[L]**; needs a language-specific wav2vec2 aligner | Unknown for Armenian | Medium | No Armenian aligner confirmed **[S]**; and Whisper's Armenian is weak **[Q]** |
| **E. Azure word boundaries** | Comes free with Azure TTS | Exact | Low | Only if the voice is Azure, not Gemini |
| **F. Ask Gemini for timestamps** | Send the WAV, ask for per-word times | Unknown | Low | **[U]**: not documented, likely loose |

Plan: B first, upgrade to C only if the highlight visibly drifts.

### 5.2 Drawing the captions

- Remotion: `@remotion/captions` (`createTikTokStyleCaptions` groups words into pages) **[S]**, styled with CSS.
- HyperFrames: caption blocks in its catalog **[S]**, styled with CSS.
- Python: **pycaps** (CSS-styled animated captions, word-being-narrated class, MIT, 235 stars, last push Sep 2026)
  **[L][S]**. Careful: the PyPI name `pycaps` belongs to an unrelated package from 2017 **[L]**, so install it from
  GitHub (`francozanardi/pycaps`).
- ffmpeg/libass: ASS karaoke tags; works with any installed Armenian font **[U]**.

Armenian-specific check for any of these: the font must have the Armenian glyphs and the punctuation (։ ՝ ՞ « »).
The style guide's rules apply to every caption (armenian-style-guide skill).

---

## 6. Real photos and footage

For the "Soviet fridge" type of local example, the best material is the most local:

| Source | What | Licence / rules | Note |
|---|---|---|---|
| **Own photos and phone clips** | A fridge in a relative's kitchen, a Yerevan street, a market | Yours | Best for the local angle and the most authentic, which also helps with YouTube's policy (section 10) **[U]** |
| **Wikimedia Commons** | Historical photos, Soviet products, Wald's bomber diagram | Per-file licence (mostly CC BY, CC BY-SA, public domain); credit line = author + licence **[S]** | The API (`imageinfo` + `extmetadata`) returns the licence and author, so the credit line in the video description can be generated **[S]** |
| **Pexels API** | Generic stock photos and video B-roll | Free, commercial use OK; API apps must show a link to Pexels; 200 requests/hour, 20,000/month **[S]** | Logos/trademarks in a shot need care **[S]**; generic look |
| Pixabay | Stock photos, video, music | Not checked **[U]** | |

Making photos move in code: slow zoom and pan (Ken Burns), a highlight box or arrow on a detail, a split screen
("what we see" vs "what got thrown away"), cut-outs with the background removed (e.g. `rembg`, local, CPU **[U]**).
All four frameworks above can do the first three; HTML-based ones do it with a few lines of CSS.

---

## 7. Format: size, safe zones, length, hook

- **Canvas:** 1080x1920, 9:16, one master file for all three platforms **[S]**. 30 fps is enough for this style
  **[U]**.
- **Safe zones:** each app covers parts of the frame with its buttons and caption. Published numbers come from ad
  specs and disagree; one shared "safe everywhere" box is about **900x1400 centred** **[S]**. Shorts has the widest
  right button column (~192 px) and Reels/Shorts cover more of the bottom (~670 px) than TikTok (~480 px) **[S]**.
  Rule for our templates: captions and key visuals in the centre band, nothing important in the bottom ~25% or the
  right ~15%. Check uploads with a safe-zone overlay tool (e.g. Socialync's checker) **[S]**.
- **Length:** Shorts allow up to 3 minutes since October 2024 **[S]**. Advice clusters around 20-45 s, and 30-60 s for
  explainers **[S]** (vendor blogs, not YouTube). For a survivorship-bias explainer, aim for 30-45 s **[U]**.
- **Hook:** most drop-off happens in the first 1-3 s; open with the claim or the question, not with an intro **[S]**
  ("Our grandparents' fridge still works. So why doesn't yours?"). The Shorts feed tests each video on a small
  audience first and stops if engagement is weak **[S]**.
- **Loop:** an ending that leads back into the opening line raises rewatch rate **[S]**.

---

## 8. Music and sound

- Simplest: add a trending sound in the TikTok/Instagram app at upload (manual step, and their library is licensed
  for use on that platform) **[U]**.
- Free libraries: YouTube Audio Library (manual download), Pixabay Music **[U]**.
- AI music: Google Lyria 3 Clip ~$0.04 per 30 s song, Lyria 3 Pro / 3.5 ~$0.08 per song, no free tier **[S]**. Not
  video, so not excluded by Q-scope, but your call.
- Sound effects (whoosh on a zoom, pop on a highlight) help pacing in this format **[U]**; keep a small local folder of
  free SFX.
- Mix the voice clearly above the music (music around -20 dB under the voice) **[U]**.

---

## 9. Checking a finished video

- **Contact sheet** of frames (the qysu `render_check.py` idea): catches layout bugs, text off-screen, safe-zone
  problems. Claude reads the image. Free.
- **Gemini as a first viewer:** upload the MP4 and ask for a critique of the hook, pacing and clarity, with MM:SS
  timestamps **[S]**. Default sampling is 1 frame per second **[S]**, so it judges pacing and content, not fast
  caption flicker. Cost: cents per short **[U]**.
- **Hayk on the phone:** the real check. One look at the first 3 seconds and the captions on a phone screen.

---

## 10. Platform rules: monetization, AI labels, posting APIs

### 10.1 YouTube "inauthentic content"

- July 2025: YouTube renamed "repetitious content" to "inauthentic content": mass-produced or repetitive videos,
  including AI-made template content without the creator's own perspective, are not monetized. Reviewers look at the
  channel as a whole **[S]**.
- July 2026 clarification groups it into: generic/template content, distressing content, and synthetic AI personas
  on sensitive topics (health, finance) **[S]**.
- Using AI for scripting, editing and graphics is allowed **[S]**.
- What this means for us **[U]**: each short needs its own script, its own example and a point of view (the local
  angle helps). The danger is not the tools but a channel of 50 shorts that differ only in the word swapped into the
  template.

### 10.2 AI labels

- YouTube auto-labels **photorealistic** AI content since May 2026, even if not disclosed **[S]**. TikTok and Meta
  label content with C2PA markers and expect disclosure of realistic AI content **[S]**. The EU's labelling duties for
  AI content start in August 2026 **[S]**.
- Our videos (code-drawn graphics, real photos, a synthetic narrator voice that is nobody's real voice) are not
  photorealistic synthetic scenes. Whether a TTS narrator alone needs the disclosure tick: **[U]**, check YouTube's
  help page before the first upload.

### 10.3 Posting by API (for later; Q4 = manual now)

| Platform | Rule for a new app | Source |
|---|---|---|
| YouTube Data API | Uploads from unverified projects created after 28 Jul 2020 are **private** until the project passes an audit; default quota 10,000 units/day; per-upload cost disputed (100 vs 1 unit) | **[S]** |
| TikTok Content Posting API | Unaudited apps: all posts **private**, at most 5 users per 24 h, accounts must be private; audit takes days to 2 weeks; ~15 posts/day/creator cap | **[S]** |
| Instagram Graph API | Professional account needed; 50 API posts per rolling 24 h; Reels via container then publish | **[S]** |
| Postiz | Open-source scheduler (AGPL-3.0, 42k stars) **[L]**; self-hosting still needs our own app approvals on each platform **[S]**; its cloud version uses its approved apps **[U]** | |

---

## 11. Ruled out and why

- **AI video and AI images** (Veo 3.1 at ~$0.05-0.40 per second **[S]**, Nano Banana images ~$0.03-0.13 each **[S]**):
  out of scope (Hayk, 2026-11-25).
- **Turnkey generators** (MoneyPrinterTurbo, MIT, 145k stars **[L]**; ShortGPT, last push Feb 2025 **[L]**): topic in,
  stock footage + captions + TTS out. That is the generic stock-footage look (the option Hayk did not pick in Q2), and
  their default TTS (edge-tts) has no Armenian **[Q]**. They are useful only as reading material for pipeline ideas.
- **Cloud render APIs** (Shotstack ~$0.20/min, JSON2Video ~$0.20-0.25/min, Creatomate ~$0.28/min at 720p **[S]**):
  JSON templates rendered in their cloud. We render locally for free, and the in-session loop does not need a cloud.
- **Avatars** (HeyGen, Synthesia): not the chosen look, and the "synthetic persona" category is where YouTube's
  policy bites hardest **[S]**.

---

## 12. Content note: the Soviet fridge example

A good topic, and more interesting if told honestly, because it is **partly true**:

- A 1988 study of Soviet product quality noted that among common electrical appliances, "the refrigerator is usually
  the most reliable" **[S]**. ZIL was the prestige brand **[S]**.
- But a CIA report on 1959-65 appliances called them "poorly designed, crudely built, and subject to breakdowns"
  **[S]**, and contemporary complaints about new fridges breaking fast exist **[S]**.
- The survivorship part: the ones that broke were thrown away decades ago; the ones we see are the survivors. Also:
  simple design (no electronics), thick metal, and much higher electricity use are trade-offs, not pure quality **[U]**.

A short that says "partly true, and here is why your eyes still lie to you" is stronger and safer against
comment-section pushback than "it's all bias".

---

## 13. Costs per video

| Item | Cost per 30-45 s short |
|---|---|
| Gemini TTS (Armenian voice) | ~$0.01 **[Q]** (doubles in 2027) |
| Gemini critique of the MP4 | a few cents at most **[U]** |
| Rendering, captions, photos (own, Commons, Pexels) | $0 (local) |
| Framework licence | $0 (Remotion free for one person; others open source) |
| Claude Code session | the real cost: Hayk's usage limit, not dollars |

Render time on this laptop for a 1080x1920, 30-45 s video: **unknown [U]**; measure on the first one. (Manim did 15-25 s
of 720p in 16-75 s; 1080x1920 has 2.25x the pixels **[Q]**.)

---

## 14. Open decisions and next step

Open (asked in the session, IDs continue from Q6):

- **Q7:** rendering framework: Remotion / HyperFrames / Manim / a bake-off first.
- **Q8:** voice for shorts: a 3-4 voice test with a livelier style prompt, or keep Sadaltager.
- **Q9:** first video: the survivorship-bias fridge short as the pilot, or another topic.

Proposed next step: one pilot short (30-45 s), end to end, in the chosen framework: beats JSON -> Gemini TTS ->
render 1080x1920 -> captions (method B) -> contact sheet + Gemini critique -> Hayk watches on the phone. Then write
`03_shorts/AUTHORING.md` from what worked, the way qysu's `AUTHORING.md` was written.

---

## 15. Sources

Live checks **[L]**: PyPI JSON API (`manim`, `moviepy`, `manim-voiceover`, `ctc-forced-aligner`, `stable-ts`,
`whisperx`, `pycaps`, `edge-tts`), `npm view` (`remotion`, `@remotion/captions`, `@revideo/core`,
`@motion-canvas/core`, `hyperframes`), `gh api repos/...` for stars, last push and licence, all on 2026-11-25.

Earlier research **[Q]**: `~/OneDrive/Desktop/misc/sample_problems_qysu/_knowledge/manim_llm_video/research.md`
(2026-11-24) and `animations/README.md`, `tools/tts_gemini.py`.

Web **[S]**:

- Remotion licence and pricing: https://www.remotion.dev/docs/license/pricing, https://remotion.dev/docs/license
- Remotion with coding agents: https://www.remotion.dev/docs/ai/coding-agents, https://remotion.dev/skills
- Remotion word-highlight captions: https://www.remotion.dev/elements/captions/word-highlight-captions/
- HyperFrames: https://github.com/heygen-com/hyperframes, https://hyperframes.heygen.com/,
  https://dev.to/andrew-ooo/hyperframes-review-heygens-html-to-video-for-ai-agents-170i
- Revideo / Motion Canvas: https://raw.githubusercontent.com/midrender/revideo/main/README.md,
  https://www.pkgpulse.com/guides/remotion-vs-motion-canvas-vs-revideo-programmatic-video-2026
- MoneyPrinterTurbo / ShortGPT: https://dev.to/creeta/101k-stars-and-cant-do-long-form-moneyprinterturbos-limit-26jk
- MMS forced aligner: https://huggingface.co/MahmoudAshraf/mms-300m-1130-forced-aligner,
  https://docs.pytorch.org/audio/main/tutorials/forced_alignment_for_multilingual_data_tutorial.html
- WhisperX: https://github.com/m-bain/whisperx, https://arxiv.org/abs/2303.00747
- pycaps: https://dev.to/francozanardi/adding-animated-subtitles-to-videos-with-python-4hml
- Wikimedia Commons reuse: https://commons.wikimedia.org/wiki/Commons:Credit_line/en,
  https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia
- Pexels API: https://www.pexels.com/api/documentation/, https://pexels.com/terms-of-service
- Safe zones: https://adaptlypost.com/blog/social-media-safe-zones-2026-complete-guide,
  https://reap.video/blog/short-form-video-safe-zones, https://www.socialync.io/tools/safe-zones
- Shorts length and hooks: https://vidiq.com/blog/post/youtube-shorts-algorithm/,
  https://www.opus.pro/blog/ideal-youtube-shorts-length-format-retention, https://piktochart.com/blog/how-long-youtube-shorts/
- Gemini video understanding: https://ai.google.dev/gemini-api/docs/video-understanding
- Lyria pricing: https://invideo.io/blog/lyria-ai-music-generator/, https://benchlm.ai/media-pricing/lyria
- YouTube inauthentic content: https://support.google.com/youtube/answer/1311392,
  https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/
- AI labels: https://blog.youtube/news-and-events/improving-ai-labels-viewers-creators/,
  https://thenextweb.com/news/youtube-will-now-automatically-label-ai-generated-videos-whether-creators-disclose-them-or-not
- YouTube upload API: https://developers.google.com/youtube/v3/docs/videos/insert,
  https://developers.google.com/youtube/v3/determine_quota_cost
- TikTok Content Posting API: https://developers.tiktok.com/docs/en/content-sharing-guidelines,
  https://developers.tiktok.com/docs/en/content-posting-api-get-started
- Instagram publishing limit: https://developers.facebook.com/docs/instagram-platform/content-publishing
- Postiz: https://github.com/gitroomhq/postiz-app, https://docs.postiz.com/general/introduction
- Veo 3.1 prices: https://the-decoder.com/?p=33867, https://wavespeed.ai/blog/cost-and-billing/google-veo-3-pricing/
- Nano Banana prices: https://fourweekmba.com/ai-google-halves-nano-banana-image-price-triples-input-price/
- Cloud render APIs: https://shotstack.io/vs/creatomate-alternatives/, https://www.wireflow.ai/blog/json2video-pricing
- Soviet fridges: https://www.springerprofessional.de/domestic-refrigerators/7396414,
  https://www.cia.gov/readingroom/node/2007713, https://nintil.com/the-soviet-union-durable-goods/,
  https://novayagazeta.ru/articles/2020/02/20/84012-konets-partii-holodilnika
