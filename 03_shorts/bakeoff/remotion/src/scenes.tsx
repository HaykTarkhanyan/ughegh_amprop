// One component per beat. `t` is seconds since the beat started, `dur` the beat's slot in seconds.
import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile } from "remotion";
import { at, beat, C, DATA, FONT, L } from "./data";
import { Bomber, Fridge, Person, Pill, ramp } from "./parts";

type P = { t: number; dur: number; fps: number };

const Shade: React.FC<{ opacity: number }> = ({ opacity }) => (
  <AbsoluteFill style={{ background: "#000", opacity }} />
);
// Darkens the bottom of a photo so the captions stay readable.
const CaptionScrim = () => (
  <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.72) 72%, rgba(0,0,0,0.8) 100%)" }} />
);

export const Hook: React.FC<P> = ({ t, dur }) => {
  const q = at("hook", "քոնը");
  const crack = ramp(t, q + 0.5, 0.5);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Img src={staticFile("zil_yerevan_zoo.jpg")} style={{ width: 1080, height: 1920, objectFit: "cover", scale: String(interpolate(t, [0, dur], [1, 1.08])) }} />
      <CaptionScrim />
      <Shade opacity={0.45 * ramp(t, q, 0.4)} />
      <Pill text={L.zoo} top={300} opacity={ramp(t, 0.3, 0.5)} />
      <div style={{ position: "absolute", left: 520, top: 470, translate: `${(1 - ramp(t, q, 0.5)) * 640}px 0px` }}>
        <Fridge w={260} h={460} color="#E4E7EB" />
        <svg width={260} height={460} style={{ position: "absolute", left: 0, top: 0 }}>
          <path d="M130 30 L110 120 L150 190 L118 280 L156 360 L128 440" fill="none" stroke={C.red} strokeWidth={10}
            strokeLinecap="round" strokeLinejoin="round" strokeDasharray={520} strokeDashoffset={520 * (1 - crack)} />
        </svg>
        <div style={{ marginTop: 18, textAlign: "center", fontFamily: FONT, fontSize: 44, fontWeight: 800, color: C.red, opacity: crack }}>
          {L.modern_years}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const GRID = { cols: 5, rows: 4, w: 80, h: 130, gap: 26, top: 300, survivor: 12 }; // lowest point ~950 px, above 3-line captions
export const Reveal: React.FC<P> = ({ t, dur }) => {
  const t1 = at("reveal", "Փչացած");
  const t2 = at("reveal", "աղբանոցում");
  const t3 = at("reveal", "Տեսնում");
  const gw = GRID.cols * GRID.w + (GRID.cols - 1) * GRID.gap;
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <Img src={staticFile("zil_factory_1966.jpg")} style={{ height: 1920, width: "auto", position: "absolute", top: 0, left: 0, translate: `${interpolate(t, [0, dur], [-260, -980])}px 0px` }} />
      <CaptionScrim />
      <Shade opacity={0.86 * ramp(t, t1 + 0.9, 0.5)} />
      <Pill text={L.factory} top={300} opacity={ramp(t, 0.2, 0.4) * (1 - ramp(t, t1 + 0.9, 0.3))} />
      {Array.from({ length: GRID.cols * GRID.rows }, (_, i) => {
        const r = Math.floor(i / GRID.cols);
        const c = i % GRID.cols;
        const appear = ramp(t, t1 + 1.1 + i * 0.025, 0.3);
        const isSurvivor = i === GRID.survivor;
        const fall = isSurvivor ? 0 : ramp(t, t2 + ((i * 7) % 20) * 0.04, 0.6, Easing.in(Easing.quad));
        const glow = isSurvivor ? ramp(t, t3, 0.4) : 0;
        return (
          <Fridge key={i} w={GRID.w} h={GRID.h} color={isSurvivor ? (glow > 0 ? C.orange : C.ink) : fall > 0.05 ? C.red : C.ink}
            style={{
              position: "absolute", left: (1080 - gw) / 2 + c * (GRID.w + GRID.gap), top: GRID.top + r * (GRID.h + GRID.gap),
              opacity: appear * (1 - 0.85 * fall), translate: `0px ${fall * 50}px`, scale: String(appear * (1 + 0.25 * glow)),
              boxShadow: glow > 0 ? `0 0 ${40 * glow}px ${C.orange}` : undefined, zIndex: isSurvivor ? 2 : 1,
            }} />
        );
      })}
    </AbsoluteFill>
  );
};

export const Name: React.FC<P> = ({ t, fps }) => {
  const s = spring({ frame: t * fps, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ background: C.bg, alignItems: "center", justifyContent: "center" }}>
      <div style={{ marginTop: -260, textAlign: "center" }}>
        <div style={{ fontFamily: FONT, fontSize: 108, fontWeight: 900, color: C.ink, scale: String(0.6 + 0.4 * s), opacity: s }}>{L.title}</div>
        <div style={{ height: 10, width: 560 * ramp(t, 0.3, 0.6), background: C.orange, margin: "18px auto", borderRadius: 5 }} />
        <div style={{ fontFamily: FONT, fontSize: 48, fontWeight: 500, color: C.muted, opacity: ramp(t, 0.5, 0.5) }}>{L.title_en}</div>
      </div>
    </AbsoluteFill>
  );
};

const PLANE_W = 820; // card ends at y ~950, above three-line captions
const BomberCard: React.FC<{ dotScale: (i: number) => number; dotOpacity?: number; opacity?: number; children?: React.ReactNode }> = ({ dotScale, dotOpacity, opacity = 1, children }) => (
  <div style={{ position: "absolute", left: 110, top: 300, width: 860, padding: 20, boxSizing: "border-box", background: C.card, borderRadius: 32, opacity }}>
    <Bomber width={PLANE_W} dotScale={dotScale} dotOpacity={dotOpacity}>{children}</Bomber>
    <div style={{ position: "absolute", left: 100, top: 16, fontFamily: FONT, fontSize: 28, color: "#6B6B70" }}>{L.illustration}</div>
  </div>
);
const dotOrder = (i: number) => (i * 73) % 195;

export const Wald: React.FC<P> = ({ t, dur }) => {
  const span = dur * 0.65;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <BomberCard opacity={ramp(t, 0, 0.4)} dotScale={(i) => ramp(t, 0.6 + (dotOrder(i) / 195) * span, 0.18, Easing.out(Easing.back(2)))} />
    </AbsoluteFill>
  );
};

const ZONES = [[0.393, 0.18], [0.598, 0.18], [0.495, 0.27], [0.497, 0.7]];
export const WaldAnswer: React.FC<P> = ({ t }) => {
  const tz = at("wald_answer", "Զրահը");
  const tn = at("wald_answer", "Այնտեղ");
  const portrait = 1 - ramp(t, tz - 0.3, 0.3);
  const planeH = PLANE_W / DATA.bomber_aspect;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: "absolute", top: 330, left: 0, right: 0, textAlign: "center", opacity: ramp(t, 0, 0.4) * portrait, scale: String(0.9 + 0.1 * ramp(t, 0, 0.5)) }}>
        <Img src={staticFile("wald.jpg")} style={{ width: 320, height: 320, borderRadius: "50%", objectFit: "cover", objectPosition: "50% 20%", border: `6px solid ${C.ink}` }} />
        <div style={{ fontFamily: FONT, fontSize: 66, fontWeight: 800, color: C.ink, marginTop: 26 }}>{L.wald}</div>
        <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 500, color: C.muted, marginTop: 6 }}>{L.wald_years}</div>
      </div>
      <BomberCard opacity={ramp(t, tz - 0.2, 0.4)} dotScale={() => 1} dotOpacity={1 - 0.6 * ramp(t, tn, 0.5)}>
        {ZONES.map(([x, y], k) => {
          const a = ramp(t, tz + 0.2 + k * 0.15, 0.35, Easing.out(Easing.back(2)));
          const pulse = 1 + 0.07 * Math.sin((t - tz) * 7);
          const size = 150;
          return (
            <div key={k} style={{
              position: "absolute", left: x * PLANE_W - size / 2, top: y * planeH - size / 2, width: size, height: size, borderRadius: "50%",
              border: `9px solid ${C.orange}`, background: `rgba(242,168,0,${0.28 * ramp(t, tn, 0.5)})`, boxSizing: "border-box",
              scale: String(a * pulse), opacity: a,
            }} />
          );
        })}
      </BomberCard>
    </AbsoluteFill>
  );
};

const KEPT = [1, 6, 11];
export const More: React.FC<P> = ({ t }) => {
  const tBad = at("more", "վատերը");
  const tG = at("more", "Իսկ");
  const tD = at("more", "որովհետև");
  const records = 1 - ramp(t, tG - 0.3, 0.3);
  const ninety = ramp(t, tG, 0.4) * (1 - ramp(t, tD - 0.2, 0.3));
  const crowd = ramp(t, tD, 0.4);
  const [years, word] = L.grandpa_years.split(" ");
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ opacity: records }}>
        {Array.from({ length: 16 }, (_, i) => {
          const kept = KEPT.includes(i);
          const fade = kept ? 0 : ramp(t, tBad + (i % 5) * 0.06, 0.5);
          const lift = kept ? ramp(t, tBad + 0.3, 0.4) : 0;
          const label = kept && lift > 0 ? C.orange : "#6E737C";
          return (
            <div key={i} style={{
              position: "absolute", left: 215 + (i % 4) * 170, top: 340 + Math.floor(i / 4) * 170, width: 140, height: 140, borderRadius: "50%",
              background: `radial-gradient(circle, ${label} 0 17%, #0E0F12 18% 21%, #26282D 22% 30%, #1B1D21 31% 40%, #26282D 41% 52%, #1B1D21 53% 100%)`,
              opacity: (0.25 + 0.75 * ramp(t, i * 0.03, 0.3)) * (1 - 0.88 * fade), scale: String((1 - 0.15 * fade) * (1 + 0.12 * lift)),
              boxShadow: lift > 0 ? `0 0 ${36 * lift}px ${C.orange}` : undefined,
            }} />
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 360, left: 0, right: 0, textAlign: "center", opacity: ninety }}>
        <div style={{ fontFamily: FONT, fontSize: 280, fontWeight: 900, color: C.orange, lineHeight: 1 }}>{years}</div>
        <div style={{ fontFamily: FONT, fontSize: 64, fontWeight: 700, color: C.ink }}>{word}</div>
        <div style={{ margin: "60px auto 0", width: 320, height: 36, display: "flex", borderRadius: 6, overflow: "hidden" }}>
          <div style={{ flex: "0 0 70px", background: "#C98A3D" }} />
          <div style={{ flex: 1, background: "#F4F1EA" }} />
          <div style={{ flex: "0 0 26px", background: C.red }} />
        </div>
      </div>
      <div style={{ opacity: crowd }}>
        {Array.from({ length: 48 }, (_, i) => {
          const grandpa = i === 19;
          const fade = grandpa ? 0 : ramp(t, tD + 0.6 + (i % 8) * 0.05, 0.8);
          return (
            <Person key={i} s={60} color={grandpa ? C.orange : C.muted} style={{
              position: "absolute", left: 216 + (i % 8) * 84, top: 340 + Math.floor(i / 8) * 114, opacity: grandpa ? 1 : 0.7 - 0.55 * fade,
              scale: String(grandpa ? 1.25 : 1),
            }} />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Dropouts: React.FC<P> = ({ t }) => {
  const tB = at("dropouts", "Բայց");
  const two = ramp(t, 0.1, 0.5, Easing.out(Easing.back(1.6)));
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {[{ x: 330, name: L.jobs }, { x: 650, name: L.gates }].map((p, k) => (
        <div key={k} style={{ position: "absolute", left: p.x - 50, top: 330, textAlign: "center", width: 100, scale: String(two) }}>
          <Person s={100} color={C.orange} />
          <div style={{ fontFamily: FONT, fontSize: 42, fontWeight: 800, color: C.ink, marginTop: 12, width: 240, marginLeft: -70 }}>{p.name}</div>
        </div>
      ))}
      {Array.from({ length: 60 }, (_, i) => { // 5 rows: stays above two-line captions
        const r = Math.floor(i / 12);
        const a = ramp(t, tB + 0.2 + r * 0.12 + (i % 12) * 0.015, 0.4);
        return (
          <Person key={i} s={40} color={C.grey} style={{ position: "absolute", left: 223 + (i % 12) * 54, top: 640 + r * 74, opacity: a * 0.9 }} />
        );
      })}
    </AbsoluteFill>
  );
};

// The key sentence as big text, each word lighting up as it is spoken (captions are off in this beat).
export const BigKaraoke: React.FC<P & { beatKey: string; top: number; size: number }> = ({ t, dur, beatKey, top, size }) => {
  const b = beat(beatKey);
  const abs = b.start + t;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Callback to the opening: faint failed fridges and one survivor, drifting slowly (Gemini: the plain black
          background here lost momentum). The survivor sits in the top row (y 300-430), above the 7-line text block. */}
      <div style={{ position: "absolute", inset: 0, translate: `0px ${interpolate(t, [0, dur], [40, -40])}px` }}>
        {Array.from({ length: 36 }, (_, i) => (
          <Fridge key={i} w={80} h={130} color={i === 2 ? C.orange : C.red}
            style={{ position: "absolute", left: 225 + (i % 6) * 110, top: 300 + Math.floor(i / 6) * 160, opacity: i === 2 ? 0.55 : 0.13 }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 130, width: 650, top, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: 800, lineHeight: 1.25 }}>
        {b.words.map((w, i) => {
          const on = abs >= w.start;
          const now = abs >= w.start && abs < w.end;
          return (
            // unspoken words at 0.5: 0.28 was too dim to read ahead (Gemini review v3)
            <span key={i} style={{ color: now ? C.orange : C.ink, opacity: on ? 1 : 0.5 }}>{w.w} </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Outro: React.FC<P> = ({ t, dur }) => (
  // Ends exactly on the opening frame (scale 1, no shade), so the short loops cleanly.
  <AbsoluteFill style={{ background: C.bg }}>
    <Img src={staticFile("zil_yerevan_zoo.jpg")} style={{ width: 1080, height: 1920, objectFit: "cover", scale: String(interpolate(t, [0, dur], [1.08, 1])) }} />
    <CaptionScrim />
    <Shade opacity={interpolate(t, [0, dur * 0.8, dur], [0.5, 0.35, 0], { extrapolateRight: "clamp" })} />
  </AbsoluteFill>
);
