// The colour-blind friend: two balls, swapped or not behind a curtain, "did I swap?", twenty rounds.
// Left panel: what you see (red, green). Right panel: what your friend sees (the same khaki twice).
import React from "react";
import { interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop, Bubble, CheckMark, EyeIcon, HalvingBar, Label } from "./common";

// Checkpoints (Codex review X11, 2026-11-26): the narration says "one ... two ... ten ... twenty" times; the rounds are
// scheduled piece by piece so the counter shows exactly 1, 2, 10 and 20 rounds at those words (fast, two, ten, twenty).
export const BALLS_T = { intro: 0.2, r1: 2.8, fast: 8.4, two: 10.4, ten: 13.4, twenty: 15.6, end: 18.5 };
export type BallsTimes = typeof BALLS_T;
const MIN_ANIMATED = 0.4; // a round shorter than this keeps the curtain closed and just ticks (fast-forward)

const ROUNDS = 20;
// swap decisions, fixed so every render tells the same story; round 1 is a swap
const SWAPS = Array.from({ length: ROUNDS }, (_, i) => (i === 0 ? true : random(`swap-${i}`) < 0.5));

// start time and length of each round: round 1 told slowly (r1..fast), round 2 until "two", rounds 3-10 until "ten",
// rounds 11-20 until "twenty"
const schedule = (T: BallsTimes) => {
  if (!(T.r1 < T.fast && T.fast < T.two && T.two < T.ten && T.ten < T.twenty)) {
    throw new Error(`balls checkpoints out of order: ${JSON.stringify(T)}`);
  }
  const starts: number[] = [T.r1];
  const lens: number[] = [T.fast - T.r1];
  const pieces: [number, number, number][] = [[T.fast, T.two, 1], [T.two, T.ten, 8], [T.ten, T.twenty, 10]];
  for (const [a, b, n] of pieces) {
    for (let k = 0; k < n; k++) {
      starts.push(a + ((b - a) * k) / n);
      lens.push((b - a) / n);
    }
  }
  return { starts, lens, done: T.twenty };
};

const PANEL = { y: 120, w: 840, h: 520 };
const LEFT_X = 90, RIGHT_X = 990;
const BALL_R = 82;

const Ball: React.FC<{ cx: number; cy: number; color: string; id: string }> = ({ cx, cy, color, id }) => (
  <g>
    <ellipse cx={cx} cy={cy + BALL_R + 26} rx={BALL_R * 0.95} ry={16} fill="rgba(0,0,0,0.45)" />
    <defs>
      <radialGradient id={`g-${id}`} cx="35%" cy="30%" r="75%">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="0.18" stopColor={color} />
        <stop offset="0.85" stopColor={color} stopOpacity="0.9" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.55" />
      </radialGradient>
    </defs>
    <circle cx={cx} cy={cy} r={BALL_R} fill={`url(#g-${id})`} />
    <ellipse cx={cx - BALL_R * 0.32} cy={cy - BALL_R * 0.42} rx={BALL_R * 0.22} ry={BALL_R * 0.12} fill="#fff" opacity="0.55" transform={`rotate(-30 ${cx - BALL_R * 0.32} ${cy - BALL_R * 0.42})`} />
  </g>
);

// a cupped hand under each ball
const Palm: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => (
  <g>
    <path d={`M ${cx - 110} ${cy + 40} Q ${cx} ${cy + 150} ${cx + 110} ${cy + 40} L ${cx + 96} ${cy + 72} Q ${cx} ${cy + 168} ${cx - 96} ${cy + 72} Z`} fill="#3B4150" />
    <path d={`M ${cx - 110} ${cy + 40} Q ${cx} ${cy + 150} ${cx + 110} ${cy + 40}`} fill="none" stroke="#5B6374" strokeWidth="5" strokeLinecap="round" />
  </g>
);

const Panel: React.FC<{
  x: number; title: string; colorblind: boolean; redLeft: boolean; swapK: number; swapping: boolean; cover: number; t: number; intro: number;
}> = ({ x, title, colorblind, redLeft, swapK, swapping, cover, intro }) => {
  const cy = 340;
  const ax = 260, bx = 580; // ball x inside the panel
  // during a swap the balls trade places on two arcs
  const k = swapping ? easeInOut(swapK) : 0;
  const leftBall = { x: lerp(ax, bx, k), y: cy - Math.sin(k * Math.PI) * 90 };
  const rightBall = { x: lerp(bx, ax, k), y: cy + Math.sin(k * Math.PI) * 40 };
  const redPos = redLeft ? leftBall : rightBall;
  const greenPos = redLeft ? rightBall : leftBall;
  const red = colorblind ? C.khaki : C.red;
  const green = colorblind ? C.khaki : C.green;
  const drop = (d: number) => (1 - Math.min(1, pop(intro, d, 10, 0.45))) * -260;
  return (
    <div style={{ position: "absolute", left: x, top: PANEL.y, width: PANEL.w, height: PANEL.h, borderRadius: 34, background: "linear-gradient(180deg, #1D2029, #14161C)", border: "2px solid rgba(255,255,255,0.08)", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
      <div style={{ position: "absolute", left: 36, top: 26, display: "flex", alignItems: "center", gap: 16, fontFamily: FONT, fontSize: 32, fontWeight: 700, color: C.ink }}>
        <EyeIcon size={46} color={colorblind ? C.khaki : C.orange} />
        {title}
      </div>
      <svg width={PANEL.w} height={PANEL.h} style={{ position: "absolute", left: 0, top: 0 }}>
        <Palm cx={ax} cy={cy} />
        <Palm cx={bx} cy={cy} />
        <g transform={`translate(0 ${drop(0.1)})`}>
          <Ball cx={redPos.x} cy={redPos.y} color={red} id={`r${x}`} />
        </g>
        <g transform={`translate(0 ${drop(0.28)})`}>
          <Ball cx={greenPos.x} cy={greenPos.y} color={green} id={`g${x}`} />
        </g>
      </svg>
      {/* the curtain: "behind his back" */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: `${cover * 100}%`, background: "repeating-linear-gradient(90deg, #2A2E38 0 38px, #242832 38px 76px)", borderBottom: cover > 0.02 ? `6px solid ${C.orange}` : "none", boxShadow: "0 12px 30px rgba(0,0,0,0.6)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, textAlign: "center", fontFamily: FONT, fontSize: 30, fontWeight: 600, color: C.dim, opacity: cover > 0.9 ? 1 : 0 }}>
          մեջքի ետևում
        </div>
      </div>
    </div>
  );
};

// a coin that spins and lands on swap / no swap
const Coin: React.FC<{ t: number; t0: number; dur: number; swap: boolean }> = ({ t, t0, dur, swap }) => {
  const p = ramp(t, t0, dur, easeInOut);
  if (t < t0 - 0.2 || t > t0 + dur + 1.0) return null;
  const spins = 5 + (swap ? 0 : 0.5);
  const angle = p * spins * 360;
  const fade = interpolate(t, [t0 - 0.2, t0, t0 + dur + 0.6, t0 + dur + 1.0], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = 380 - Math.sin(p * Math.PI) * 170;
  return (
    <div style={{ position: "absolute", left: 960 - 75, top: y - 75, width: 150, height: 150, opacity: fade, perspective: 600 }}>
      <div style={{ width: 150, height: 150, borderRadius: "50%", transform: `rotateX(${angle}deg)`, background: "radial-gradient(circle at 35% 30%, #FFE08A, #F2A800 55%, #9A6A00)", border: "5px solid #FFD25A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(242,168,0,0.5)" }}>
        <div style={{ fontFamily: FONT, fontSize: 72, fontWeight: 800, color: "#3A2500", textAlign: "center", lineHeight: 1.05, transform: Math.cos((angle * Math.PI) / 180) < 0 ? "scaleY(-1)" : undefined }}>
          ?
        </div>
      </div>
    </div>
  );
};

export const BallsScene: React.FC<{ T?: BallsTimes }> = ({ T = BALLS_T }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const { starts, lens, done } = schedule(T);

  // which round are we in, and where inside it
  let k = -1;
  for (let i = 0; i < ROUNDS; i++) if (t >= starts[i]) k = i;
  const inRound = k >= 0 && t < done;
  // red is on the left at the start; each finished swap flips it
  let redLeft = true;
  for (let i = 0; i < Math.max(0, k); i++) if (SWAPS[i]) redLeft = !redLeft;

  let cover = 0, swapK = 0, swapping = false, answered = false, completed = Math.max(0, k);
  if (k === 0) {
    const s = starts[0];
    cover = ramp(t, s, 0.5, easeInOut) * (1 - ramp(t, s + 2.7, 0.5, easeInOut));
    swapping = SWAPS[0] && t >= s + 1.75 && t < s + 2.65;
    swapK = ramp(t, s + 1.75, 0.85, (x) => x);
    if (SWAPS[0] && t >= s + 2.65) redLeft = !redLeft;
    answered = t >= s + 4.4;
    completed = answered ? 1 : 0;
  } else if (inRound) {
    const s = starts[k], d = lens[k];
    const f = (t - s) / d;
    if (d < MIN_ANIMATED) {
      cover = 1; // fast-forward: behind the curtain, only the counter and the answers tick
      if (SWAPS[k] && f >= 0.5) redLeft = !redLeft;
    } else {
      cover = f < 0.25 ? easeInOut(f / 0.25) : f < 0.62 ? 1 : f < 0.85 ? 1 - easeInOut((f - 0.62) / 0.23) : 0;
      swapping = SWAPS[k] && f >= 0.25 && f < 0.62;
      swapK = Math.min(1, Math.max(0, (f - 0.25) / 0.37));
      if (SWAPS[k] && f >= 0.62) redLeft = !redLeft;
    }
    answered = f >= 0.85;
    completed = k + (answered ? 1 : 0);
  } else if (t >= done) {
    redLeft = SWAPS.filter(Boolean).length % 2 === 0;
    completed = ROUNDS;
  }

  const intro = t;
  const barIn = ramp(t, T.fast - 0.6, 0.6);
  const endIn = ramp(t, done + 0.4, 0.6);
  const lastSwap = k >= 0 && k < ROUNDS ? SWAPS[k] : false;

  return (
    <Backdrop glow="rgba(111,168,255,0.06)">
      <Panel x={LEFT_X} title="Դու տեսնում ես" colorblind={false} redLeft={redLeft} swapK={swapK} swapping={swapping} cover={cover} t={t} intro={intro - T.intro} />
      <Panel x={RIGHT_X} title="Ընկերդ տեսնում է" colorblind redLeft={redLeft} swapK={swapK} swapping={swapping} cover={cover} t={t} intro={intro - T.intro} />
      <Label text="դալտոնիկ է" x={RIGHT_X + PANEL.w - 40} y={PANEL.y + 32} size={26} color={C.khaki} align="right" width={300} opacity={ramp(t, 1.2, 0.5)} />

      {/* round 1, told slowly */}
      <Coin t={t} t0={starts[0] + 0.6} dur={1.0} swap={SWAPS[0]} />
      <Label text="ընկերդ է որոշում, դու չես տեսնում" x={960} y={PANEL.y + PANEL.h + 30} size={28} color={C.dim} width={700} opacity={ramp(t, starts[0] + 0.6, 0.3) * (1 - ramp(t, starts[0] + 2.0, 0.4))} />
      <Bubble text="Փոխեցի՞" x={RIGHT_X + 620} y={PANEL.y + PANEL.h + 10} t={t} t0={starts[0] + 3.2} tail="down" accent={C.blue} out={T.fast - 0.5} />
      <Bubble text="Այո, փոխեցիր" x={LEFT_X + 260} y={PANEL.y + PANEL.h + 10} t={t} t0={starts[0] + 4.0} tail="down" accent={C.orange} out={T.fast - 0.5} />

      {/* fast rounds: the answer under your panel */}
      {inRound && k > 0 && answered ? (
        <div style={{ position: "absolute", left: LEFT_X, width: PANEL.w, top: PANEL.y + PANEL.h + 18, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.ink }}>
          {lastSwap ? "փոխեցիր" : "չփոխեցիր"}
          <CheckMark size={44} />
        </div>
      ) : null}

      <HalvingBar x={410} y={694} width={1100} rounds={completed} opacity={barIn} label="Միայն գուշակելով հաջողելու հավանականությունը" roundWord="Ռաունդ" />

      {/* the end: he is sure, and still does not know which is red */}
      <div style={{ position: "absolute", left: RIGHT_X, width: PANEL.w, top: PANEL.y + 170, display: "flex", justifyContent: "center", opacity: endIn }}>
        <CheckMark size={120} progress={ramp(t, done + 0.4, 0.6)} />
      </div>
      <div style={{ position: "absolute", left: RIGHT_X, width: PANEL.w, top: PANEL.y + 96, textAlign: "center", fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.ink, opacity: ramp(t, done + 1.0, 0.6) }}>
        Համոզված է, բայց <span style={{ color: C.orange }}>որն է կարմիրը՝</span> չգիտի
      </div>
    </Backdrop>
  );
};
