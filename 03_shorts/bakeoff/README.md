# Bake-off: Remotion vs HyperFrames (Q7)

The same pilot short (survivorship bias, 9 beats, ~71 s, Armenian) built twice from identical inputs, so Hayk can
pick the rendering framework from the result, not from a description (Q7, 2026-11-25). Background:
`../../_knowledge/short_videos/lit_review.md`, section 3.

## Identical inputs

`python sync_assets.py ../pilot_survivorship` copies into both projects: the timeline (beats, word times, caption
pages from `tools/build_timeline.py`), `narration.wav`, the on-screen labels (`labels.hy.json`), the photos, the
bomber plane SVG with its 195 dots split out, and Noto Sans Armenian. Both builds use the same storyboard, colours,
font sizes, positions and timings; every layout fix found by one tool was applied to both.

**Parity ended on 2026-11-25 ~11:20.** Both builds got every fix up to the measured two-line captions (renders at
~11:15). After that, fixes go into Remotion only until Q7 is answered (a heads-up note pointed out that double
rendering cost ~9 min per round). Known difference since then: in HyperFrames the orange survivor in the takeaway
beat still sits in the bottom row, behind the last text line; in Remotion it moved to the top row.

## Run

```bash
# Remotion (Node 20+): first time `npm i` in remotion/
cd remotion && npx tsc --noEmit && npx remotion render Pilot ../out/pilot_remotion.mp4 --concurrency=2 --crf=20
# HyperFrames: telemetry off on every call
cd hyperframes && DO_NOT_TRACK=1 HYPERFRAMES_NO_TELEMETRY=1 npx --yes hyperframes@0.9.92 check
cd hyperframes && DO_NOT_TRACK=1 HYPERFRAMES_NO_TELEMETRY=1 npx --yes hyperframes@0.9.92 render -o ../out/pilot_hyperframes.mp4 --workers 2 --crf 20
# side by side
python compare_frames.py out/pilot_remotion.mp4 out/pilot_hyperframes.mp4 --out out/compare.png
```

`out/` is gitignored (renders are 35-45 MB each).

## What happened (2026-11-25, this laptop: i7-1165G7, 16 GB RAM, 2 render workers each)

| | Remotion 4.0.547 | HyperFrames 0.9.92 |
|---|---|---|
| Setup | `npx create-video@4.0.547 --yes --blank --no-tailwind`: one command, exact pins, React 19.3.1, TypeScript | `npx hyperframes@0.9.92 init --example blank --resolution portrait`: one command; the scaffold loads GSAP from a CDN; writes its own CLAUDE.md/AGENTS.md |
| Code | 446 lines of TS/TSX in 6 files: components, `useCurrentFrame()` + `interpolate()`, data imported as JSON | 338 lines in one HTML file: CSS + a GSAP timeline built from `window.SHORT` |
| Checks before render | TypeScript only (types, not layout) | `check`: lint + runtime + layout + motion + contrast + "craft". First run: 12 safe-zone hits (TikTok right rail, Reels/Shorts bottom), a label shown 0.5 s, text under the 28 px phone floor, a 1.8 s closing line, caption groups overlapping 0.05 s |
| First look | `remotion still` of one frame: 61 s | `check` run: 50 s |
| Full render (71 s video) | 4 min 44 s, 4 min 26 s, 4 min 3 s, 3 min 28 s (four versions), 42-44 MB; frames stream into the encoder | 2 workers: 3 min 52 s (4 min 52 s with CLI start), 37.5 MB. 1 worker: 4 min 8 s, 5 min 26 s |
| Disk during render | no temp frames | with 2+ workers every frame is saved as an image first: **~2.9 GB of temp files for 71 s**. The third render failed at frame 9 with 1.8 GB free on C:. `--workers 1` streams instead (slower) |
| Telemetry | none seen | on by default; the agent skill even asks to send a "usage note" linked to the account. Off with `DO_NOT_TRACK=1` / `HYPERFRAMES_NO_TELEMETRY=1` (used on every call here) |
| Licence | free for individuals and teams up to 3 | Apache 2.0 |
| Maturity | 4.x line for years, 75k stars | launched Apr 2026, pre-1.0, roadmap tied to HeyGen's paid app |

HyperFrames' `check` still reports `first_frame_empty` ("Frame 0 is covered by #s-hook") on the final version. It is
a false positive here: frame 0 is the zoo photo with the first caption, not an empty frame.

Not used on either side: the Studio editors (Remotion Studio, HyperFrames preview/desktop app). Both skills push
for them; for a Claude-in-session workflow the CLI was enough.
