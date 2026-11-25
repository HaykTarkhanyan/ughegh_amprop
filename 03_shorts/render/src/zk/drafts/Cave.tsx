// The Ali Baba cave (Quisquater et al., 1990), top-down: a ring tunnel whose two halves meet at a door that opens
// only with the secret word. One round told slowly, the same round without the word, then twenty fast rounds.
import React from "react";
import { interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, easeInOut, lerp, ramp } from "../theme";
import { Backdrop, Bubble, CheckMark, CrossMark, EyeIcon, HalvingBar } from "./common";

export const CAVE_T = {
  draw: 0.1, cast: 1.6, dark: 2.6, inEntry: 2.8, inArc: 3.6, arcDur: 2.0, youWalk: 5.6, shout: 6.6, door: 7.3,
  outArc: 8.1, outDur: 2.2, success: 10.4, fail: 11.6, failShake: 12.5, failBack: 13.0, failCross: 14.5,
  rounds: 16.2, firstRound: 0.85, minRound: 0.32, shrink: 0.88, end: 26.5,
};
export type CaveTimes = typeof CAVE_T;

const O = { x: 960, y: 430 };
const R = 255;
const TW = 104;
const J = { x: 960, y: O.y + R }; // the fork at the bottom of the ring
const MOUTH = { x: 960, y: 838 };
const YOU0 = { x: 960, y: 935 };
const YOU_FORK = { x: 960, y: J.y + 52 };
const BLOB = "M 600 120 Q 960 20 1320 120 Q 1450 430 1320 760 Q 1140 880 1020 860 L 900 860 Q 780 880 600 760 Q 470 430 600 120 Z";
const DOOR_GAP = 0.13; // radians kept clear on each side of the door

// angle 90 deg = bottom (the fork), 0 = right, 180 = left, 270 / -90 = top (the door)
const arcPt = (deg: number) => ({ x: O.x + R * Math.cos((deg * Math.PI) / 180), y: O.y + R * Math.sin((deg * Math.PI) / 180) });
const DOOR_DEG_R = -90 + (DOOR_GAP * 180) / Math.PI; // right side, just before the door
const DOOR_DEG_L = 270 - (DOOR_GAP * 180) / Math.PI; // left side, just after the door

const ROUNDS = 20;
const ROUND_IN = Array.from({ length: ROUNDS }, (_, i) => (random(`in-${i}`) < 0.5 ? "L" : "R"));
const ROUND_CALL = Array.from({ length: ROUNDS }, (_, i) => (random(`call-${i}`) < 0.5 ? "L" : "R"));

const roundSchedule = (T: CaveTimes) => {
  const starts: number[] = [];
  const lens: number[] = [];
  let s = T.rounds + 1.0;
  for (let k = 0; k < ROUNDS; k++) {
    const d = Math.max(T.minRound, T.firstRound * Math.pow(T.shrink, k));
    starts.push(s);
    lens.push(d);
    s += d;
  }
  return { starts, lens, done: s };
};

const lerpPt = (a: { x: number; y: number }, b: { x: number; y: number }, k: number) => ({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k) });

// position on one side of the ring at fraction f (0 = fork, 1 = door)
const sidePt = (side: "L" | "R", f: number) => arcPt(side === "R" ? lerp(90, DOOR_DEG_R, f) : lerp(90, DOOR_DEG_L, f));

export const CaveScene: React.FC<{ T?: CaveTimes }> = ({ T = CAVE_T }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const { starts, lens, done } = roundSchedule(T);

  // ---- the friend (knows the word) ----
  let friend = MOUTH;
  if (t < T.inEntry) friend = { x: MOUTH.x - 44, y: MOUTH.y + 40 };
  else if (t < T.inArc) friend = lerpPt({ x: MOUTH.x - 44, y: MOUTH.y + 40 }, J, ramp(t, T.inEntry, T.inArc - T.inEntry, easeInOut));
  else if (t < T.outArc) friend = sidePt("R", ramp(t, T.inArc, T.arcDur, easeInOut));
  else if (t < T.outArc + T.outDur) {
    const f = ramp(t, T.outArc, T.outDur, easeInOut);
    // through the door (right -> left, across the top), then down the left side to the fork
    friend = f < 0.12 ? arcPt(lerp(DOOR_DEG_R + 360, DOOR_DEG_L, f / 0.12)) : sidePt("L", 1 - (f - 0.12) / 0.88);
  } else friend = { x: J.x - 46, y: J.y + 34 };
  const friendVisible = t < T.fail - 0.2 ? 1 : 1 - ramp(t, T.fail - 0.2, 0.3);

  // ---- you ----
  const youWalk = ramp(t, T.youWalk, 0.9, easeInOut);
  const you = lerpPt(YOU0, YOU_FORK, youWalk);
  const blind = t >= T.dark && t < T.youWalk + 0.6;

  // ---- darkness inside the cave while you cannot see ----
  const dark = ramp(t, T.dark, 0.6) * (1 - ramp(t, T.success, 0.7));

  // ---- the door ----
  const doorOpen = ramp(t, T.door, 0.6, easeInOut) * (1 - ramp(t, T.outArc + 0.9, 0.6, easeInOut));
  const shake = t > T.failShake && t < T.failShake + 0.5 ? Math.sin((t - T.failShake) * 60) * 7 * (1 - (t - T.failShake) / 0.5) : 0;

  // ---- the failed run (no word): a ghost waits at the door, the door stays shut, back the same way ----
  const ghostIn = ramp(t, T.fail, 0.4) * (1 - ramp(t, T.rounds - 0.4, 0.4));
  let ghost = sidePt("R", 1);
  if (t > T.failBack) ghost = sidePt("R", 1 - ramp(t, T.failBack, 1.4, easeInOut));

  // ---- rounds: the cave moves left and shrinks, the bar comes in ----
  const toRounds = ramp(t, T.rounds, 1.0, easeInOut);
  const camS = lerp(1, 0.72, toRounds);
  const camX = lerp(0, -420, toRounds);
  const camY = lerp(0, 40, toRounds);
  let rk = -1;
  for (let i = 0; i < ROUNDS; i++) if (t >= starts[i]) rk = i;
  const inRounds = rk >= 0 && t < done;
  let rFriend: { x: number; y: number } | null = null;
  let rCall: "L" | "R" | null = null;
  let completed = 0;
  if (inRounds) {
    const f = (t - starts[rk]) / lens[rk];
    const sIn = ROUND_IN[rk] as "L" | "R";
    const sOut = ROUND_CALL[rk] as "L" | "R";
    rCall = f > 0.3 ? sOut : null;
    if (f < 0.3) rFriend = sidePt(sIn, easeInOut(f / 0.3));
    else if (f < 0.42) rFriend = sOut === sIn ? sidePt(sIn, 1) : arcPt(lerp(sIn === "R" ? DOOR_DEG_R + 360 : DOOR_DEG_L, sIn === "R" ? DOOR_DEG_L : DOOR_DEG_R + 360, (f - 0.3) / 0.12));
    else rFriend = sidePt(sOut, 1 - easeInOut(Math.min(1, (f - 0.42) / 0.4)));
    completed = rk + (f > 0.85 ? 1 : 0);
  } else if (t >= done) completed = ROUNDS;
  const roundsDoorOpen = inRounds && rFriend && ROUND_CALL[rk] !== ROUND_IN[rk] ? interpolate((t - starts[rk]) / lens[rk], [0.24, 0.3, 0.44, 0.52], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const door = Math.max(doorOpen, roundsDoorOpen);

  const drawIn = ramp(t, T.draw, 1.4);
  const castIn = ramp(t, T.cast, 0.6);
  const torch = rFriend ?? friend;

  // tunnel geometry
  const ring = `M ${O.x - R} ${O.y} A ${R} ${R} 0 1 0 ${O.x + R} ${O.y} A ${R} ${R} 0 1 0 ${O.x - R} ${O.y}`;
  const entry = `M ${J.x} ${J.y} L ${MOUTH.x} ${MOUTH.y + 14}`;
  const ringLen = 2 * Math.PI * R;
  const doorPt = arcPt(-90);
  const particles = Array.from({ length: 22 }, (_, i) => ({ a: random(`pa-${i}`) * Math.PI * 2, v: 60 + random(`pv-${i}`) * 120, s: 3 + random(`ps-${i}`) * 5 }));
  const burst = ramp(t, T.door, 0.9);

  const label = (text: string, x: number, y: number, op: number, color = C.dim, size = 30) => (
    <div style={{ position: "absolute", left: x - 200, top: y, width: 400, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: 700, color, opacity: op }}>{text}</div>
  );

  return (
    <Backdrop glow="rgba(242,168,0,0.05)">
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${camX}px, ${camY}px) scale(${camS})`, transformOrigin: "960px 430px" }}>
        <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
          <defs>
            <filter id="rock" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.011 0.014" numOctaves="5" seed="7" result="n" />
              <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.30  0 0 0 0 0.265  0 0 0 0 0.23  0 0 0 2.2 -0.55" result="tint" />
              <feComposite in="tint" in2="SourceGraphic" operator="in" />
            </filter>
            <filter id="grain" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="3" result="g" />
              <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.30  0 0 0 0 0.26  0 0 0 0 0.22  0 0 0 0.9 -0.2" result="gt" />
              <feComposite in="gt" in2="SourceGraphic" operator="in" />
            </filter>
            <radialGradient id="torch" gradientUnits="userSpaceOnUse" cx={torch.x} cy={torch.y} r="150">
              <stop offset="0" stopColor="#000" />
              <stop offset="0.55" stopColor="#000" stopOpacity="0.6" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="torchGlow" gradientUnits="userSpaceOnUse" cx={torch.x} cy={torch.y} r="120">
              <stop offset="0" stopColor="#FFC24D" stopOpacity="0.55" />
              <stop offset="1" stopColor="#FFC24D" stopOpacity="0" />
            </radialGradient>
            <clipPath id="rockClip"><path d={BLOB} /></clipPath>
            <mask id="darkMask">
              <rect x="0" y="0" width="1920" height="1080" fill="#fff" />
              <circle cx={torch.x} cy={torch.y} r="150" fill="url(#torch)" />
            </mask>
            <radialGradient id="doorGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#FFD25A" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FFD25A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* the rock mass */}
          <g opacity={drawIn}>
            <path d={BLOB} fill="#3A332D" />
            <path d={BLOB} filter="url(#rock)" />
            <path d={BLOB} fill="none" stroke="#14110F" strokeWidth="10" opacity="0.8" />
          </g>

          {/* tunnels: dark walls, then the floor, drawn in */}
          <g strokeLinecap="round" fill="none">
            <path d={ring} stroke="#0D0B0A" strokeWidth={TW + 26} strokeDasharray={ringLen} strokeDashoffset={ringLen * (1 - drawIn)} />
            <path d={entry} stroke="#0D0B0A" strokeWidth={TW + 26} opacity={drawIn} />
            <path d={ring} stroke="#5E5246" strokeWidth={TW} strokeDasharray={ringLen} strokeDashoffset={ringLen * (1 - drawIn)} />
            <path d={entry} stroke="#5E5246" strokeWidth={TW} opacity={drawIn} />
            <path d={ring} stroke="#fff" strokeWidth={TW} filter="url(#grain)" opacity={0.5 * drawIn} />
            <path d={ring} stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeDasharray="10 16" opacity={drawIn} />
          </g>

          {/* light spilling in at the mouth */}
          <ellipse cx={MOUTH.x} cy={MOUTH.y + 30} rx="120" ry="40" fill="#F4E3B5" opacity={0.12 * drawIn} />

          {/* the door */}
          <g opacity={drawIn} transform={`translate(${shake} 0)`}>
            <circle cx={doorPt.x} cy={doorPt.y} r={90} fill="url(#doorGlow)" opacity={0.35 + 0.5 * door} />
            <rect x={doorPt.x - 13} y={doorPt.y - TW / 2 - 12 - door * 70} width="26" height={(TW + 24) / 2} rx="5" fill="#C98A12" stroke="#FFD25A" strokeWidth="3" />
            <rect x={doorPt.x - 13} y={doorPt.y + door * 70} width="26" height={(TW + 24) / 2} rx="5" fill="#C98A12" stroke="#FFD25A" strokeWidth="3" />
            {door < 0.2 ? <circle cx={doorPt.x} cy={doorPt.y} r="6" fill="#3A2500" /> : null}
            {burst > 0 && burst < 1
              ? particles.map((p, i) => (
                  <circle key={i} cx={doorPt.x + Math.cos(p.a) * p.v * burst} cy={doorPt.y + Math.sin(p.a) * p.v * burst} r={p.s * (1 - burst)} fill="#FFD25A" />
                ))
              : null}
          </g>

          {/* darkness inside while you cannot see */}
          <rect x="0" y="0" width="1920" height="1080" fill="#000" opacity={0.78 * dark} mask="url(#darkMask)" clipPath="url(#rockClip)" />

          {/* the failed run */}
          {ghostIn > 0 ? (
            <g opacity={ghostIn}>
              <circle cx={ghost.x} cy={ghost.y} r="20" fill="none" stroke={C.red} strokeWidth="4" strokeDasharray="6 6" />
              <circle cx={ghost.x} cy={ghost.y} r="11" fill={C.red} opacity="0.75" />
            </g>
          ) : null}

          {/* the friend, with her torch */}
          {(friendVisible > 0 || rFriend) && (
            <g opacity={rFriend ? 1 : friendVisible * castIn}>
              <circle cx={torch.x} cy={torch.y} r="120" fill="url(#torchGlow)" />
              <circle cx={torch.x} cy={torch.y} r="19" fill={C.orange} stroke="#FFF2C8" strokeWidth="4" />
            </g>
          )}

          {/* you */}
          <g opacity={castIn}>
            <circle cx={you.x} cy={you.y} r="19" fill={C.ink} stroke={C.blue} strokeWidth="5" />
          </g>

          {/* your shout travels into the cave */}
          {t > T.shout && t < T.shout + 1.4
            ? [0, 1, 2].map((i) => {
                const p = ramp(t, T.shout + i * 0.22, 0.9);
                return p > 0 && p < 1 ? (
                  <path key={i} d={`M ${you.x - 40 - p * 60} ${you.y - 30 - p * 50} Q ${you.x} ${you.y - 70 - p * 90} ${you.x + 40 + p * 60} ${you.y - 30 - p * 50}`} fill="none" stroke={C.ink} strokeWidth="4" opacity={1 - p} />
                ) : null;
              })
            : null}
        </svg>

        {/* labels on the map */}
        {label("ձախ", O.x - R - 150, O.y - 20, castIn * (1 - toRounds * 0.3))}
        {label("աջ", O.x + R + 150, O.y - 20, castIn * (1 - toRounds * 0.3))}
        {label("գաղտնի բառով դուռ", doorPt.x - 300, doorPt.y - 128, castIn, C.orange, 30)}
        {label("Ընկերուհիդ", MOUTH.x - 200, MOUTH.y + 26, castIn * (1 - ramp(t, T.inEntry, 0.4)), C.orange, 28)}
        {label("Դու", YOU0.x + 170, YOU0.y - 22, castIn * (1 - ramp(t, T.youWalk, 0.4)), C.ink, 28)}
        <div style={{ position: "absolute", left: YOU0.x - 560, top: YOU0.y - 26, opacity: blind ? 1 : 0, display: "flex", alignItems: "center", gap: 12, fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.dim }}>
          <EyeIcon size={54} color={C.dim} closed />
          չես տեսնում, թե որ կողմ գնաց
        </div>
        <Bubble text="Դուրս արի ձախից" x={you.x + 30} y={you.y - 40} t={t} t0={T.shout} tail="left" accent={C.ink} out={T.success + 0.6} size={34} />
        <Bubble text="***" x={friend.x + 20} y={friend.y - 34} t={t} t0={T.door - 0.5} tail="left" accent={C.orange} out={T.outArc + 0.3} size={30} />

        {/* success / failure marks at the fork */}
        <div style={{ position: "absolute", left: J.x - 230, top: J.y - 40, opacity: ramp(t, T.success, 0.4) * (1 - ramp(t, T.fail - 0.3, 0.3)) }}>
          <CheckMark size={96} progress={ramp(t, T.success, 0.5)} />
        </div>
        <div style={{ position: "absolute", left: J.x + 130, top: J.y - 40, opacity: ramp(t, T.failCross, 0.3) * (1 - ramp(t, T.rounds - 0.4, 0.4)) }}>
          <CrossMark size={96} progress={ramp(t, T.failCross, 0.5)} />
        </div>
        {/* round calls during the fast rounds */}
        {rCall ? (
          <div style={{ position: "absolute", left: (rCall === "L" ? O.x - R - 150 : O.x + R + 150) - 70, top: O.y + 30, width: 140, textAlign: "center", fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.orange }}>
            {rCall === "L" ? "ձախից" : "աջից"}
          </div>
        ) : null}
      </div>

      {/* captions-like headers for the two stories */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 32, textAlign: "center", fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.ink, opacity: ramp(t, T.fail, 0.4) * (1 - ramp(t, T.rounds - 0.4, 0.4)) }}>
        Իսկ եթե բառը <span style={{ color: C.red }}>չգիտի</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 960, textAlign: "center", fontFamily: FONT, fontSize: 34, fontWeight: 600, color: C.dim, opacity: ramp(t, T.failCross + 0.3, 0.4) * (1 - ramp(t, T.rounds - 0.4, 0.4)) }}>
        Դուռը փակ է, և նա կարող է դուրս գալ միայն այն կողմից, որով մտել է
      </div>

      {/* the rounds */}
      <HalvingBar x={1010} y={300} width={800} rounds={completed} opacity={ramp(t, T.rounds + 0.4, 0.6)} label="Միայն բախտով" roundWord="Ռաունդ" />
      <div style={{ position: "absolute", left: 1010, top: 640, width: 800, fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.ink, lineHeight: 1.3, opacity: ramp(t, done + 0.3, 0.6) }}>
        Դու համոզված ես, իսկ բառը <span style={{ color: C.orange }}>այդպես էլ չես լսել</span>
      </div>
    </Backdrop>
  );
};
