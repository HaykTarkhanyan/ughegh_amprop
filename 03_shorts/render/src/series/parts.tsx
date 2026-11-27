// Small pieces shared by the series drafts from 2026-11-27 on: centred tags, the source line, the title, the clock.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../theme";

export const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};
export const rel = (g0: number, x: number) => Math.max(0, x - g0);

// a label centred on (x, y) with a dark halo
export const Tag: React.FC<{ text: React.ReactNode; x: number; y: number; size?: number; color?: string; weight?: number; opacity?: number; width?: number }> = ({ text, x, y, size = 34, color = C.ink, weight = 800, opacity = 1, width = 800 }) => (
  <div style={{ position: "absolute", left: x - width / 2, top: y - size * 0.6, width, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: weight, color, opacity, lineHeight: 1.2, textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}>{text}</div>
);
// the small dim source line at the top (screen_small)
export const SourceLine: React.FC<{ text: string; on: number }> = ({ text, on }) => (
  <div style={{ position: "absolute", left: 90, width: 828, top: 140, textAlign: "center", fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.dim, opacity: on }}>{text}</div>
);
export const Title: React.FC<{ text: React.ReactNode; on: number; y?: number; size?: number }> = ({ text, on, y = 200, size = 46 }) => (
  <div style={{ position: "absolute", left: 110, width: 788, top: y, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: 800, color: C.ink, lineHeight: 1.2, opacity: on }}>{text}</div>
);
// a rounded card with text, popping in with `on`
export const Card: React.FC<{ text: React.ReactNode; x: number; y: number; w: number; on: number; color?: string; size?: number }> = ({ text, x, y, w, on, color = C.orange, size = 34 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, padding: "18px 22px", borderRadius: 20, background: C.panel, border: `3px solid ${color}`, fontFamily: FONT, fontSize: size, fontWeight: 750, color: C.ink, lineHeight: 1.25, opacity: Math.min(1, on), transform: `scale(${0.85 + 0.15 * Math.min(1, on)})`, transformOrigin: "50% 50%" }}>{text}</div>
);
