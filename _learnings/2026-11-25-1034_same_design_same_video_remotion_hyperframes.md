# Remotion and HyperFrames rendered the same design to nearly identical frames: choose on process, not looks

**Evidence:** the pilot short was built twice from the same inputs (`03_shorts/bakeoff/`): 446 lines of TS/TSX in
Remotion 4.0.547 and a 338-line HTML + GSAP page in HyperFrames 0.9.92. `bakeoff/compare_frames.py` put frames at
18 moments side by side: the only differences were bugs present in one build at the time, never the rendering.
Both run headless Chrome, so fonts, CSS gradients, SVG and `paint-order: stroke fill` outlines render the same.

**What did differ:**
- HyperFrames' `check` (lint + runtime + layout + "craft") found real problems on the first run that apply to any
  short: 12 safe-zone violations, a label shown 0.5 s, text under the 28 px phone floor, a 1.8 s closing line,
  caption groups overlapping for 0.05 s. Remotion has no such check (TypeScript only).
- Its safe area for 1080x1920, used since in both builds and drawn by `tools/contact_sheet.py`: y 288-1248, x 120-888,
  and x up to 780 only below y 840 (TikTok's button rail). Captions end at y 1200.
- HyperFrames' telemetry is on by default and its agent skill asks to send a "usage note" linked to the account;
  `DO_NOT_TRACK=1` / `HYPERFRAMES_NO_TELEMETRY=1` turn it off. Its scaffold loads GSAP from a CDN.
- Disk: see `2026-11-25-1030_hyperframes_two_workers_need_3gb_temp.md`.

**Consequences:** a bake-off of renderers that share a browser engine mostly measures the developer loop. The
safe-area numbers and readability rules are worth keeping whatever the choice (Q7, open on 2026-11-25).
