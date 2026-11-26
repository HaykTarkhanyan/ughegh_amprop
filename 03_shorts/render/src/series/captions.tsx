// Word-by-word captions for the 9:16 Shorts (v2 style: box x 200-880, bottom at y 1245, font size x 0.82, weight 650,
// soft shadow). Page grouping and sizes come from the portrait profile in tools/build_timeline.py; a page stays up
// until the next one starts, at most 0.5 s after its last word.
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../theme";
import type { Page } from "../zk/timeline";

export const PortraitCaptions: React.FC<{ pages: Page[]; end: number }> = ({ pages, end }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const i = pages.findIndex((p, k) => t >= p.start - 0.05 && t < (pages[k + 1] ? Math.min(pages[k + 1].start - 0.05, p.end + 0.5) : end - 0.3));
  if (i < 0) return null;
  const page = pages[i];
  const pop = interpolate(t, [page.start - 0.05, page.start + 0.08], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 200, width: 680, bottom: 1920 - 1245, textAlign: "center", opacity: pop }}>
      {page.words.map((w, k) => (
        <span key={k} style={{ display: "inline-block", margin: "0 12px", fontFamily: FONT, fontSize: page.size * 0.82, fontWeight: 650, lineHeight: 1.15, color: t >= w.start && t < w.end ? C.orange : C.ink, textShadow: "0 2px 3px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.85)" }}>{w.w}</span>
      ))}
    </div>
  );
};
