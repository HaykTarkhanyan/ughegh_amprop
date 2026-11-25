// Small building blocks: easing ramps, a label pill, fridge and person icons, the bomber with its dots.
import React from "react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import { C, DATA, FONT } from "./data";

// 0 -> 1 between t0 and t0 + dur (seconds), clamped, eased.
export const ramp = (t: number, t0: number, dur: number, ease = Easing.bezier(0.16, 1, 0.3, 1)) =>
  interpolate(t, [t0, t0 + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

export const Pill: React.FC<{ text: string; top: number; opacity: number }> = ({ text, top, opacity }) => (
  <div style={{ position: "absolute", top, left: 120, right: 192, display: "flex", justifyContent: "center", opacity }}>
    <div
      style={{
        fontFamily: FONT, fontSize: 28, fontWeight: 600, color: C.ink, background: "rgba(14,15,18,0.78)",
        padding: "12px 26px", borderRadius: 999, maxWidth: 840, textAlign: "center", whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  </div>
);

export const Fridge: React.FC<{ w: number; h: number; color: string; style?: React.CSSProperties }> = ({ w, h, color, style }) => (
  <div style={{ width: w, height: h, borderRadius: w * 0.14, background: color, position: "relative", ...style }}>
    <div style={{ position: "absolute", top: "36%", left: "7%", right: "7%", height: Math.max(2, h * 0.02), background: "rgba(0,0,0,0.28)" }} />
    <div style={{ position: "absolute", top: "14%", left: "12%", width: Math.max(3, w * 0.06), height: "14%", borderRadius: 4, background: "rgba(0,0,0,0.35)" }} />
    <div style={{ position: "absolute", top: "44%", left: "12%", width: Math.max(3, w * 0.06), height: "16%", borderRadius: 4, background: "rgba(0,0,0,0.35)" }} />
  </div>
);

export const Person: React.FC<{ s: number; color: string; style?: React.CSSProperties }> = ({ s, color, style }) => (
  <div style={{ width: s, height: s * 1.5, position: "relative", ...style }}>
    <div style={{ position: "absolute", left: s * 0.28, top: 0, width: s * 0.44, height: s * 0.44, borderRadius: "50%", background: color }} />
    <div style={{ position: "absolute", left: 0, top: s * 0.52, width: s, height: s * 0.98, borderRadius: `${s * 0.5}px ${s * 0.5}px ${s * 0.16}px ${s * 0.16}px`, background: color }} />
  </div>
);

// The plane drawing with its red dots; `dotScale(i)` gives each dot's scale (0 = hidden).
export const Bomber: React.FC<{ width: number; dotScale: (i: number) => number; dotOpacity?: number; children?: React.ReactNode }> = ({ width, dotScale, dotOpacity = 1, children }) => {
  const height = width / DATA.bomber_aspect;
  return (
    <div style={{ position: "relative", width, height }}>
      <Img src={staticFile("bomber_plane.svg")} style={{ width, height, position: "absolute", left: 0, top: 0 }} />
      {DATA.dots.map((d, i) => {
        const s = dotScale(i);
        const size = d.r * width * 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute", left: d.x * width - size / 2, top: d.y * height - size / 2, width: size, height: size,
              borderRadius: "50%", background: "#C00000", scale: String(s), opacity: s > 0 ? dotOpacity : 0,
            }}
          />
        );
      })}
      {children}
    </div>
  );
};
