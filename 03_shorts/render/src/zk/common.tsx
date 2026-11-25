// Building blocks shared by the zero-knowledge scenes: background, labels, bubbles, icons, the halving bar.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, groupDigits, lerp, pop, ramp } from "../theme";

export const Backdrop: React.FC<{ glow?: string; children?: React.ReactNode }> = ({ glow = "rgba(242,168,0,0.07)", children }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 60% at 50% 42%, ${glow}, transparent 70%), linear-gradient(180deg, ${C.bg2}, ${C.bg})` }}>
    {children}
    {/* soft vignette */}
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55))", pointerEvents: "none" }} />
  </AbsoluteFill>
);

export const Label: React.FC<{
  text: string; x: number; y: number; size?: number; color?: string; weight?: number; opacity?: number;
  align?: "left" | "center" | "right"; width?: number;
}> = ({ text, x, y, size = 34, color = C.ink, weight = 600, opacity = 1, align = "center", width = 800 }) => {
  const left = align === "center" ? x - width / 2 : align === "right" ? x - width : x;
  return (
    <div style={{ position: "absolute", left, top: y, width, textAlign: align, fontFamily: FONT, fontSize: size, fontWeight: weight, color, opacity, lineHeight: 1.2 }}>
      {text}
    </div>
  );
};

// A speech bubble that pops in at t0; the tail points down-left or down-right.
export const Bubble: React.FC<{
  text: string; x: number; y: number; t: number; t0: number; tail?: "left" | "right" | "down"; accent?: string; size?: number; out?: number;
}> = ({ text, x, y, t, t0, tail = "left", accent = C.ink, size = 36, out }) => {
  const s = Math.min(1.08, pop(t, t0, 11, 0.5));
  const fade = out === undefined ? 1 : 1 - ramp(t, out, 0.3);
  if (t < t0 || fade <= 0) return null;
  const tailStyle: React.CSSProperties =
    tail === "down"
      ? { left: "50%", marginLeft: -14, bottom: -24, borderWidth: "24px 14px 0 14px", borderColor: `${accent} transparent transparent transparent` }
      : tail === "left"
        ? { left: 34, bottom: -22, borderWidth: "22px 22px 0 0", borderColor: `${accent} transparent transparent transparent` }
        : { right: 34, bottom: -22, borderWidth: "22px 0 0 22px", borderColor: `${accent} transparent transparent transparent` };
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -100%) scale(${s})`, transformOrigin: tail === "right" ? "85% 110%" : tail === "down" ? "50% 110%" : "15% 110%", opacity: fade }}>
      <div style={{ position: "relative", background: accent, color: C.bg, fontFamily: FONT, fontWeight: 700, fontSize: size, padding: "16px 30px", borderRadius: 30, whiteSpace: "nowrap", boxShadow: "0 12px 40px rgba(0,0,0,0.45)" }}>
        {text}
        <div style={{ position: "absolute", width: 0, height: 0, borderStyle: "solid", ...tailStyle }} />
      </div>
    </div>
  );
};

export const CheckMark: React.FC<{ size: number; color?: string; progress?: number }> = ({ size, color = C.orange, progress = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="7" opacity={0.35} />
    <path d="M28 52 L44 67 L74 35" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray="70" strokeDashoffset={70 * (1 - progress)} />
  </svg>
);

export const CrossMark: React.FC<{ size: number; color?: string; progress?: number }> = ({ size, color = C.red, progress = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="7" opacity={0.35} />
    <path d="M32 32 L68 68 M68 32 L32 68" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
      strokeDasharray="110" strokeDashoffset={110 * (1 - progress)} />
  </svg>
);

export const EyeIcon: React.FC<{ size: number; color?: string; closed?: boolean }> = ({ size, color = C.ink, closed }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 100 62">
    {closed ? (
      <>
        <path d="M6 22 Q50 58 94 22" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
        {[18, 34, 50, 66, 82].map((x, i) => (
          <line key={i} x1={x} y1={35 + (i === 0 || i === 4 ? -4 : 2)} x2={x + (x - 50) * 0.12} y2={49 + (i === 0 || i === 4 ? -6 : 0)} stroke={color} strokeWidth="6" strokeLinecap="round" />
        ))}
      </>
    ) : (
      <>
        <path d="M4 31 Q50 -12 96 31 Q50 74 4 31 Z" fill="none" stroke={color} strokeWidth="7" strokeLinejoin="round" />
        <circle cx="50" cy="31" r="14" fill={color} />
      </>
    )}
  </svg>
);

// Rounds strip + the "just luck" bar that halves every round, with the odds written out.
export const HalvingBar: React.FC<{
  x: number; y: number; width: number; rounds: number; total?: number; opacity?: number; label: string; roundWord: string;
}> = ({ x, y, width, rounds, total = 20, opacity = 1, label, roundWord }) => {
  const k = Math.floor(rounds);
  const frac = rounds - k;
  const shown = Math.pow(2, -(k + Math.min(1, frac * 1.6)));
  const denom = Math.pow(2, k);
  const dot = (width - (total - 1) * 8) / total;
  return (
    <div style={{ position: "absolute", left: x, top: y, width, opacity, fontFamily: FONT, color: C.ink }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 26 }}>
        {Array.from({ length: total }, (_, i) => {
          const on = i < k;
          const p = on ? 1 : i === k ? frac : 0;
          return (
            <div key={i} style={{ width: dot, height: dot, borderRadius: "50%", border: `3px solid ${on ? C.orange : C.grey}`, background: on ? C.orange : "transparent", transform: `scale(${on ? 1 : lerp(1, 1.12, p)})`, boxShadow: on ? "0 0 14px rgba(242,168,0,0.55)" : "none" }} />
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <div style={{ fontSize: 28, fontWeight: 600, color: C.dim }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 600, color: C.dim }}>{roundWord} {Math.min(k, total)} / {total}</div>
      </div>
      <div style={{ position: "relative", height: 34, borderRadius: 17, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${shown * 100}%`, minWidth: 6, borderRadius: 17, background: `linear-gradient(90deg, ${C.red}, #FF7A5C)`, boxShadow: "0 0 18px rgba(232,56,61,0.6)" }} />
      </div>
      <div style={{ marginTop: 14, fontSize: 64, fontWeight: 800, letterSpacing: 1, fontVariantNumeric: "tabular-nums" }}>
        1 / {groupDigits(denom)}
      </div>
    </div>
  );
};
