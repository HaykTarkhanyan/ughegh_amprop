# Background music: claim-safe free libraries (research, 2026-11-27)

Research agent for Q35 (Hayk: "maybe search for some nice copyright free stuff"). The hard limit: YouTube blocks
worldwide any Short over 1 minute with an active Content ID claim ("Any Short that is over one minute in duration with
an active copyright claim of any type, including manual claims, will be blocked globally",
https://support.google.com/youtube/answer/6013276 and /15424877, checked 2026-11-27). The candidates were mixed 20 LU
under the map Short's narration on `03_shorts/render/out/drafts/music/music_audition.html` (gitignored).

## Libraries ranked by claim safety

| # | Library | Confidence | Main evidence |
|---|---|---|---|
| 1 | YouTube Audio Library | high, YouTube only | Help pages: tracks "won't be claimed by a rights holder through the Content ID system" (answer 3376882). Needs a Studio login; use outside YouTube not covered by the help page |
| 2 | StreamBeats (Harris Heller) | medium | Own statements only: "We actively work to keep StreamBeats safe on YouTube via Content ID"; false claims "occasionally, especially on YouTube", cleared on request. No login, no credit needed. Licence: tracks "must be used as-is" (no loops or remixes); TikTok/Instagram/Facebook only as "equivalent platforms" |
| 3 | CC0 music (HoliznaCC0, OpenGameArt CC0) | medium-low | Nobody owns it, but a third party could register it; Bandcamp's field shows CC BY 4.0 for HoliznaCC0, so add the credit line |
| 4 | Mixkit | low-medium | Licence allows "any web or social media platform" and forbids registering tracks; silent on its own Content ID use |
| 5 | Pixabay | low | Its FAQ: "some contributors or their distributors may choose to register their tracks with Content ID" |
| 6 | incompetech (Kevin MacLeod) | low | Pre-registered by the composer; a claim appears when the credit is missing and holds the Short blocked until released (up to 72 h) |
| 7 | Uppbeat free tier | low | Channel safelist only on paid plans |
| 8 | Free Music Archive | low | Per-artist licences, many non-commercial |
| 9 | Musopen / public-domain classical | low, unverified | Site refused requests; false matches on recordings are common |

Not usable: FreePD (closed 2025), Fesliyan, FreeToUse, Scott Buckley without credit, Purple Planet (probably registered).
Safeguard whatever is chosen: upload each Short private first and wait for the copyright check in YouTube Studio
before making it public (https://support.google.com/youtube/answer/57407).

---


Checked 27 Nov 2026. 10 files, 23.6 MB in total. All are MP3 at 128 kbps.

**How these files were downloaded:** each file is the public 128 kbps stream copy from the artist's own Bandcamp page, fetched with curl. That is enough to audition the tracks, and probably enough for a bed sitting 20 dB under the voice. For final renders, take the full-quality file:

- **StreamBeats:** WAV files on the official Google Drive folder, linked from every album page on streambeats.com ("Free Google Drive download - The same files, no strings attached."). No login is needed. Folder: https://drive.google.com/drive/folders/196AfI6vYiSwKqb7ATKKg4J_4PcwG84jC (a per-file link is given with each track below). Bandcamp "name your price, $0" also works, but Bandcamp may ask for an email address.
- **HoliznaCC0:** Bandcamp "name your price, $0" (may ask for an email), or keep the 128 kbps copy.

**What "mood" means below:** I did not listen to these files. Each mood line comes from the album's genre and tags on streambeats.com, the track title, and loudness measured with ffmpeg (`ebur128`). Two measurements are used:

- **LUFS:** the overall loudness of the track.
- **LRA:** loudness range, in LU. A higher number means bigger swings between quiet and loud parts. Under 8 LU is even, and 17 LU is a big swing.

Check every file by ear for vocal chops and drum entrances before using it.

---

## Library 1: StreamBeats by Harris Heller (8 files)

### Licence

**Name:** "Synchronization and Master Use License" (Senpai Records, LLC). Page: https://www.streambeats.com/licensing. A PDF copy, "StreamBeats Sync_Use License.pdf", sits in the Drive folder above.

**What the licence text says:**

- "The License is gratis, worldwide, non-exclusive, royalty-free, non-transferable, and perpetual. Licensee may synchronize any StreamBeats track with video content on Twitch, YouTube, podcasts, or equivalent platforms. No royalties of any kind are owed by Licensee. Attribution is encouraged but explicitly not required."
- Restrictions: "Licensee may not redistribute the music standalone, re-upload to streaming platforms (Spotify, Apple Music, etc.), operate a music-only radio station, remix/sample/create derivative works, or use in defamatory, pornographic, or illegal content."
- FAQ on the same page: "The tracks must be used as-is. You can, however, layer them over your content freely."

**Monetization:** "You can monetize your videos with StreamBeats music." (licensing page)

**TikTok, Instagram and Facebook:** these platforms are not named in the legal text, which only says "or equivalent platforms". The FAQ says: "We're actively working to make StreamBeats safe across all platforms, including Meta Rights Manager (Facebook/Instagram) and TikTok MediaMatch."

**Content ID:**

- Now: "We actively work to keep StreamBeats safe on YouTube via Content ID. ... If you get a false Content ID claim, report it here and we'll get it cleared." Also: "It happens occasionally, especially on YouTube." (licensing page and https://www.streambeats.com/faq)
- In 2022 (archived homepage, https://web.archive.org/web/20220516221207/https://www.streambeats.com/): "We have submitted and verified every single song with YouTube individually that they are safe and able to monetize with. False claims still happen ... Keep in mind, these claims are extremely rare."

**Attribution:** not required. If you want to credit anyway: `Music: "<Track title>" by StreamBeats by Harris Heller (streambeats.com)`

**Download:** no account needed (FAQ: "No account, no login, no email required.").

**Watch out:** the licence forbids derivative works, so don't loop, splice or remix a track to make it longer. Trimming the end and fading out is ordinary use, but it is my reading, not quoted text. Pick a track at least as long as the video.

### Files

1. **streambeats_morning-dew.mp3**
   - Track: "Morning Dew", StreamBeats by Harris Heller, from the album "Diamonds" (Ambient; site tags: uplifting, chill; 2021)
   - Source: https://streambeats.bandcamp.com/track/morning-dew
   - WAV: https://drive.google.com/file/d/18_Z5bphFn5cnFn7-zt1GcVSo_enbtkqG/view
   - Length: 2:21
   - Loudness: -17.2 LUFS, LRA 9.7
   - Mood: soft ambient. The first ~70 s sit low and even (about -21 LUFS). There is a short gap near 1:10, then the track steps up about 6 dB from 1:20, which is likely an instrument or beat entrance.

2. **streambeats_petrichor.mp3**
   - Track: "Petrichor", StreamBeats by Harris Heller, album "Diamonds" (Ambient)
   - Source: https://streambeats.bandcamp.com/track/petrichor
   - WAV: https://drive.google.com/file/d/1GRhfuAWU4SCs4f-wB3FCIWu1ZnNWyFzL/view
   - Length: 2:30
   - Loudness: -18.7 LUFS, LRA 10.4
   - Mood: quiet ambient. Slow fade-in over the first ~30 s, then steady, with a softer dip around 1:40. The quietest master of the set.

3. **streambeats_riverside-cottage.mp3**
   - Track: "Riverside Cottage", StreamBeats by Harris Heller, album "Diamonds" (Ambient)
   - Source: https://streambeats.bandcamp.com/track/riverside-cottage
   - WAV: https://drive.google.com/file/d/1PC9ovC4SFDTBBQIdR1FOzxVihsPS6eCi/view
   - Length: 2:14
   - Loudness: -16.8 LUFS, LRA 9.1
   - Mood: gentle ambient that builds slowly from about -20 to -14 LUFS across the track. Good for a video that should "open up" towards the end.

4. **streambeats_sleepyhead.mp3**
   - Track: "Sleepyhead", StreamBeats by Harris Heller, album "Diamonds" (Ambient)
   - Source: https://streambeats.bandcamp.com/track/sleepyhead
   - WAV: https://drive.google.com/file/d/1eeSENSQXhZwpELiRQ3PY8Ij57u5uwRt9/view
   - Length: 2:49
   - Loudness: -16.0 LUFS, LRA 6.8
   - Mood: calm ambient, fairly even, one soft dip around 1:20. The longest ambient pick, so it covers videos up to 2:49 without looping.

5. **streambeats_sunday-stroll.mp3**
   - Track: "Sunday Stroll", StreamBeats by Harris Heller, album "Reflection" (Lofi; site tags: chill, uplifting, melancholy; 2023)
   - Source: https://streambeats.bandcamp.com/track/sunday-stroll
   - WAV: https://drive.google.com/file/d/1DqTjipFkuOfJMc74OHHn444FZwy9pmmr/view
   - Length: 2:24
   - Loudness: -14.4 LUFS, LRA 7.1
   - Mood: easy lo-fi, mostly even, with a softer passage around 1:10-1:30.

6. **streambeats_hillside-morning.mp3**
   - Track: "Hillside Morning", StreamBeats by Harris Heller, album "Reflection" (Lofi)
   - Source: https://streambeats.bandcamp.com/track/hillside-morning
   - WAV: https://drive.google.com/file/d/1a7FevT3noBKmAZI1XIC5YNjlK5kKrxDG/view
   - Length: 2:05
   - Loudness: -14.1 LUFS, LRA 7.0
   - Mood: the most level StreamBeats pick (about -14 LUFS from 0:20 to 1:50). Too short for videos over ~2:00, since looping is not allowed.

7. **streambeats_morning-calm.mp3**
   - Track: "Morning Calm", StreamBeats by Harris Heller, album "Secluded" (Lofi; site tags: chill, uplifting, melancholy; 2023)
   - Source: https://streambeats.bandcamp.com/track/morning-calm
   - WAV: https://drive.google.com/file/d/1ksTbGXQ6PD9eqkM9V3liE_-QRu3Ysyf0/view
   - Length: 2:26
   - Loudness: -11.5 LUFS, LRA 8.1
   - Mood: steady lo-fi and the loudest master here, so it needs more gain reduction. Even level throughout.

8. **streambeats_hidden-meadow.mp3**
   - Track: "Hidden Meadow", StreamBeats by Harris Heller, album "Rain" (Lofi; site tags: chill, dreamy, melancholy; 2021)
   - Source: https://streambeats.bandcamp.com/track/hidden-meadow
   - WAV: https://drive.google.com/file/d/1b-AdgHyuD7NkcI_D_e46hjIeCTBj0FUi/view
   - Length: 3:13
   - Loudness: -16.0 LUFS, LRA 17.0
   - Mood: dreamy lo-fi with big level swings. Very quiet for the first ~45 s, then full level, a dip around 1:50-2:05, and a long quiet tail. Either start it from about 0:45 or expect it to swell under the voice. Only pick it for videos longer than 2:30.

---

## Library 2: HoliznaCC0 (2 files)

### Licence

**Name:** CC0 1.0 (public domain dedication). Link: https://creativecommons.org/publicdomain/zero/1.0/

**What the artist states:**

- Artist bio (https://holiznacc0.bandcamp.com/): "I am dedicating my archive of music to the creative commons via CC0. This Means you can use it however you want! Take my beats... Take my lyrics... you are not required to credit me either!"
- Album page "Public Domain Lo-fi" (https://holiznacc0.bandcamp.com/album/public-domain-lo-fi): "Creative commons CC0 (same as public domain). Enjoy!"

**Discrepancy:** Bandcamp's own licence field on the same album page links to CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Bandcamp offers no CC0 option, which probably explains it. The Free Music Archive lists his albums as "CC0 1.0 Universal" (for example https://freemusicarchive.org/music/holiznacc0/winter-lofi).

**Platforms and monetization:** CC0 places no limits on platform or commercial use.

**Attribution:** not required under CC0. To be covered under both readings at no cost, add: `Music: "<Track title>" by HoliznaCC0 (https://holiznacc0.bandcamp.com/track/<slug>), CC0 / CC BY 4.0`

**Content ID:** neither the artist nor the hosting sites say anything about it. I found no claim reports, but I could not search Reddit (blocked for my tools).

**Download:** the 128 kbps stream needs no login. A Bandcamp $0 download may ask for an email.

### Files

9. **holiznacc0_calm-current.mp3**
   - Track: "Calm Current", HoliznaCC0, album "Public Domain Lo-fi"
   - Source: https://holiznacc0.bandcamp.com/track/calm-current
   - Licence: CC0 1.0 (see above)
   - Credit: `Music: "Calm Current" by HoliznaCC0 (https://holiznacc0.bandcamp.com/track/calm-current), CC0 / CC BY 4.0`
   - Length: 2:27
   - Loudness: -15.5 LUFS, LRA 7.7
   - Mood: lo-fi with a ~15 s intro, then a steady level (about -15 LUFS) to the end.

10. **holiznacc0_tranquil-mindset.mp3**
    - Track: "Tranquil Mindset", HoliznaCC0, album "Public Domain Lo-fi"
    - Source: https://holiznacc0.bandcamp.com/track/tranquil-mindset
    - Licence: CC0 1.0 (see above)
    - Credit: `Music: "Tranquil Mindset" by HoliznaCC0 (https://holiznacc0.bandcamp.com/track/tranquil-mindset), CC0 / CC BY 4.0`
    - Length: 2:33
    - Loudness: -14.2 LUFS, LRA 5.4
    - Mood: lo-fi and the most even track of all ten. Because it is CC0, looping or cutting it is allowed.

---

## Before publishing any of these on YouTube

Nothing here except the YouTube Audio Library comes with a YouTube guarantee against claims. So upload the Short as private or unlisted first, and wait for the copyright part of the "Checks" step in YouTube Studio to finish before making it public. Google's upload help (https://support.google.com/youtube/answer/57407) recommends waiting for checks to finish before going public, and says the results are not final.
