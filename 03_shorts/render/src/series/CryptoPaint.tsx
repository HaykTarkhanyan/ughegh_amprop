// "Public-key crypto explained with paint mixing" (9:16 Short, draft for review; DECISIONS #28). All drawn: Ani and
// Aram agree on a secret colour in public while Eva copies everything they send. Toy numbers checked: 5^6 mod 23 = 8,
// 5^15 mod 23 = 19, 19^6 mod 23 = 8^15 mod 23 = 2.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, random, staticFile } from "remotion";
import TL from "../data/crypto_paint.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { Card, SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "crypto_paint", "portrait");
export const CP_FPS = 30;
const TAIL_S = 1.2;
export const CP_FRAMES = Math.ceil((S.duration + TAIL_S) * CP_FPS);

const P = { yellow: "#F2C81B", red: "#D7263D", blue: "#2563C9", orange: "#F07F1E", green: "#3E9B3A", brown: "#7A4A2A", muddy: "#B39A3A" };
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, k: number) => {
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], k))).join(",")})`;
};

// ---------- pieces ----------
const Person: React.FC<{ x: number; y: number; name: string; color: string; opacity?: number; eye?: number; mask?: number }> = ({ x, y, name, color, opacity = 1, eye = 0, mask = 0 }) => (
  <>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>
      <circle cx={x} cy={y} r={42} fill={color} />
      <path d={`M ${x - 70} ${y + 120} Q ${x - 66} ${y + 52} ${x} ${y + 50} Q ${x + 66} ${y + 52} ${x + 70} ${y + 120} Z`} fill={color} />
      {eye > 0 ? (
        <g opacity={eye} transform={`translate(${x} ${y - 80})`}>
          <path d="M -50 0 Q 0 -36 50 0 Q 0 36 -50 0 Z" fill={C.ink} />
          <circle r={16} fill="#1B1E25" />
        </g>
      ) : null}
      {mask > 0 ? <rect x={x - 46} y={y - 20} width={92} height={34} rx={10} fill={C.ink} opacity={mask} /> : null}
    </svg>
    <Tag text={name} x={x} y={y + 152} size={32} opacity={opacity} width={240} />
  </>
);
const Can: React.FC<{ x: number; y: number; color: string; on: number; lock?: number; s?: number }> = ({ x, y, color, on, lock = 0, s = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: Math.min(1, on) }}>
    <g transform={`translate(${x} ${y}) scale(${s * (0.7 + 0.3 * Math.min(1, on))})`}>
      <rect x={-34} y={-40} width={68} height={80} rx={8} fill="#C9CDD3" stroke="#6B7280" strokeWidth={3} />
      <ellipse cx={0} cy={-40} rx={34} ry={10} fill={color} stroke="#6B7280" strokeWidth={3} />
      <rect x={-34} y={-6} width={68} height={22} fill={color} />
      {lock > 0 ? (
        <g opacity={lock} transform="translate(26 -50)">
          <rect x={-14} y={-4} width={28} height={22} rx={4} fill={C.ink} />
          <path d="M -8 -4 V -12 A 8 8 0 0 1 8 -12 V -4" stroke={C.ink} strokeWidth={4} fill="none" />
        </g>
      ) : null}
    </g>
  </svg>
);
const Blob: React.FC<{ x: number; y: number; r: number; color: string; opacity?: number; t: number }> = ({ x, y, r, color, opacity = 1, t }) => {
  const pts = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * 2 * Math.PI;
    const rr = r * (1 + 0.08 * Math.sin(t * 3 + i * 1.7));
    return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`;
  });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>
      <polygon points={pts.join(" ")} fill={color} stroke="rgba(0,0,0,0.35)" strokeWidth={3} strokeLinejoin="round" />
    </svg>
  );
};
const Ear: React.FC<{ x: number; y: number; s: number; o: number }> = ({ x, y, s, o }) => (
  <path d={`M ${x} ${y} c ${-14 * s} ${-2 * s} ${-18 * s} ${18 * s} ${-6 * s} ${26 * s} c ${6 * s} ${4 * s} ${2 * s} ${12 * s} ${10 * s} ${10 * s} c ${12 * s} ${-4 * s} ${14 * s} ${-28 * s} ${-4 * s} ${-36 * s}`} fill="none" stroke="#AEB4BF" strokeWidth={4} opacity={o} />
);
const TuneIcon: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke={C.ink} strokeWidth={4} strokeLinecap="round">
    <line x1={-14} y1={-7} x2={14} y2={-7} /><line x1={-14} y1={7} x2={14} y2={7} />
    <circle cx={-5} cy={-7} r={5} fill={C.panel} /><circle cx={6} cy={7} r={5} fill={C.panel} />
  </g>
);
const AddressBar: React.FC<{ on: number }> = ({ on }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: on }}>
    <rect x={110} y={210} width={788} height={84} rx={42} fill={C.panel} stroke="#3A3F48" strokeWidth={3} />
    <TuneIcon x={170} y={252} />
    <rect x={220} y={240} width={360} height={24} rx={12} fill="#3A3F48" />
  </svg>
);

const ANI = { x: 200, y: 360 };
const ARAM = { x: 810, y: 360 };
const EVA = { x: 504, y: 330 };
const CH_Y = 700; // the public channel

// ---------- hook ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Person x={ANI.x} y={500} name="Անի" color={P.red} />
      <Person x={ARAM.x} y={500} name="Արամ" color={P.blue} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <line x1={280} y1={580} x2={730} y2={580} stroke={C.dim} strokeWidth={4} strokeDasharray="12 10" />
        {Array.from({ length: 22 }, (_, i) => <Ear key={i} x={300 + random(`ear-x-${i}`) * 420} y={380 + random(`ear-y-${i}`) * 480} s={1.1} o={ramp(t, 1.2 + i * 0.12, 0.3)} />)}
      </svg>
      <AddressBar on={ramp(t, m.you, 0.5)} />
    </Backdrop>
  );
};

// ---------- problem: a courier, then billions of connections ----------
const Problem: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const walk = ramp(t, 0.5, m.net - 0.5, (x) => x);
  const net = ramp(t, m.net, 0.6);
  const route = (k: number) => ({ x: lerp(180, 860, k), y: 640 + 140 * Math.sin(k * Math.PI * 2) });
  const c = route(walk);
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: 1 - 0.75 * net }}>
        <path d="M 120 520 Q 300 420 500 500 T 960 480 L 960 860 Q 700 940 480 860 T 120 880 Z" fill="#2A2E26" />
        <path d={Array.from({ length: 41 }, (_, i) => { const p = route(i / 40); return `${i ? "L" : "M"} ${p.x} ${p.y}`; }).join(" ")} stroke={C.dim} strokeWidth={4} strokeDasharray="10 10" fill="none" />
        <g transform={`translate(${c.x} ${c.y - 60})`}>
          <circle cx={0} cy={-40} r={18} fill={C.ink} />
          <path d="M -16 -18 L 16 -18 L 12 30 L -12 30 Z" fill={C.ink} />
          <line x1={-8} y1={30} x2={-14 + 8 * Math.sin(t * 8)} y2={64} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          <line x1={8} y1={30} x2={14 - 8 * Math.sin(t * 8)} y2={64} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          <rect x={18} y={0} width={36} height={28} rx={4} fill="#8A5A2B" />
        </g>
      </svg>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: net }}>
        <circle cx={504} cy={640} r={250} fill="#16233A" stroke="#3A5A8A" strokeWidth={3} />
        {Array.from({ length: 40 }, (_, i) => {
          const a1 = random(`n1-${i}`) * 2 * Math.PI, a2 = random(`n2-${i}`) * 2 * Math.PI, r1 = 230 * Math.sqrt(random(`n3-${i}`)), r2 = 230 * Math.sqrt(random(`n4-${i}`));
          const x1 = 504 + r1 * Math.cos(a1), y1 = 640 + r1 * Math.sin(a1), x2 = 504 + r2 * Math.cos(a2), y2 = 640 + r2 * Math.sin(a2);
          return <path key={i} d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 80} ${x2} ${y2}`} stroke={C.orange} strokeWidth={2} fill="none" opacity={0.6} />;
        })}
        <path d="M 800 860 L 920 980 M 920 860 L 800 980" stroke={C.red} strokeWidth={14} strokeLinecap="round" />
      </svg>
    </Backdrop>
  );
};

// ---------- idea ----------
const Idea: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Title text={<>Ընդհանուր գաղտնիք՝ <span style={{ color: C.orange }}>բաց զրույցով</span></>} on={ramp(t, 0.2, 0.5)} y={380} size={54} />
      {[P.yellow, P.red, P.blue].map((c, i) => {
        const k = ramp(t, m.paint + i * 0.2, 0.7, easeInOut);
        return <Can key={i} x={lerp(-100, 330 + i * 175, k)} y={760} color={c} on={k} s={1.5} />;
      })}
      <SourceLine text="Diffie & Hellman, 1976" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- setup .. final: one continuous paint scene ----------
const Paint: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const eva = ramp(t, m.eva, 0.5);
  const yel = ramp(t, m.yellow, 0.6, easeInOut);
  const evaYel = ramp(t, m.evaKnows, 0.6, easeInOut);
  const red = ramp(t, m.red, 0.4), blue = ramp(t, m.blue, 0.4);
  const mx = ramp(t, m.mix, 1.0);
  const send = ramp(t, m.send, 1.6, easeInOut);
  const copy = ramp(t, m.evaSees, 0.6, easeInOut);
  const addRed = ramp(t, m.addRed, 1.0), addBlue = ramp(t, m.addBlue, 1.0);
  const same = Math.min(1, pop(t, m.same));
  const recipe = ramp(t, m.recipe, 0.5);
  const CY = 900; // can row
  const BY = 790; // blob row
  // the mixed blobs: Ani's orange travels to Aram, Aram's green to Ani, arcing through the channel
  const arc = (x0: number, x1: number, k: number) => ({ x: lerp(x0, x1, k), y: BY - Math.sin(k * Math.PI) * (BY - CH_Y) });
  const o = arc(ANI.x + 30, ARAM.x - 30, send), g = arc(ARAM.x - 30, ANI.x + 30, send);
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <rect x={110} y={CH_Y - 34} width={860} height={68} rx={34} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth={2} strokeDasharray="10 8" />
      </svg>
      <Tag text="բաց կապ" x={504} y={CH_Y + 60} size={28} color={C.dim} width={300} />
      <Person x={ANI.x} y={ANI.y} name="Անի" color={P.red} />
      <Person x={ARAM.x} y={ARAM.y} name="Արամ" color={P.blue} />
      <Person x={EVA.x} y={EVA.y} name="Եվա" color="#7A7F8A" opacity={eva} eye={eva} />
      {/* the public yellow: one can in the middle, copies to everyone */}
      <Can x={lerp(504, ANI.x - 40, yel)} y={lerp(CH_Y, CY, yel)} color={P.yellow} on={ramp(t, m.yellow - 0.3, 0.3)} />
      <Can x={lerp(504, ARAM.x + 40, yel)} y={lerp(CH_Y, CY, yel)} color={P.yellow} on={ramp(t, m.yellow - 0.3, 0.3)} />
      <Can x={lerp(504, EVA.x - 110, evaYel)} y={lerp(CH_Y, 560, evaYel)} color={P.yellow} on={ramp(t, m.evaKnows - 0.2, 0.3)} s={0.8} />
      {/* the secrets, locked */}
      <Can x={ANI.x + 50} y={CY} color={P.red} on={red} lock={red} />
      <Can x={ARAM.x - 50} y={CY} color={P.blue} on={blue} lock={blue} />
      {/* mixing and sending */}
      {mx > 0 ? <Blob x={o.x} y={o.y} r={34} color={mix(P.yellow, P.orange, mx)} t={t} opacity={1 - ramp(t, m.addBlue - 0.2, 0.3)} /> : null}
      {mx > 0 ? <Blob x={g.x} y={g.y} r={34} color={mix(P.yellow, P.green, mx)} t={t + 1} opacity={1 - ramp(t, m.addRed - 0.2, 0.3)} /> : null}
      {copy > 0 ? <Blob x={lerp(504, EVA.x + 40, copy)} y={lerp(CH_Y, 560, copy)} r={20} color={P.orange} t={t} /> : null}
      {copy > 0 ? <Blob x={lerp(504, EVA.x + 100, copy)} y={lerp(CH_Y, 560, copy)} r={20} color={P.green} t={t + 2} /> : null}
      {/* the final colours */}
      {addRed > 0 ? <Blob x={ANI.x + 30} y={BY} r={40} color={mix(P.green, P.brown, addRed)} t={t} /> : null}
      {addBlue > 0 ? <Blob x={ARAM.x - 30} y={BY} r={40} color={mix(P.orange, P.brown, addBlue)} t={t + 1} /> : null}
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: same }}>
        <path d="M 470 800 L 500 830 L 560 760" stroke={C.green} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Tag text="դեղին + կարմիր + կապույտ" x={504} y={1040} size={36} color={C.orange} opacity={recipe} />
    </Backdrop>
  );
};

// ---------- eve: her mix is different, and paint does not unmix ----------
const Eve: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const cans = ramp(t, m.has, 0.5);
  const pour = ramp(t, m.mixes, 1.0, easeInOut);
  const cmp = ramp(t, m.notSame, 0.5);
  const pull = t > m.separate && t < m.easy ? Math.abs(Math.sin((t - m.separate) * 2.2)) : 0;
  const arrows = ramp(t, m.easy, 0.4);
  return (
    <Backdrop>
      <Person x={504} y={300} name="Եվա" color="#7A7F8A" eye={1} />
      {[P.yellow, P.orange, P.green].map((c, i) => <Can key={i} x={lerp(330 + i * 175, 504, pour)} y={lerp(640, 760, pour)} color={c} on={cans * (1 - pour)} />)}
      {pour > 0.3 ? (
        <>
          <Blob x={cmp > 0 ? lerp(504, 380, cmp) - 40 * pull : 504} y={780} r={60} color={P.muddy} t={t} />
          {pull > 0 ? <Blob x={lerp(504, 380, cmp) + 40 * pull} y={780} r={60 - 20 * pull} color={P.muddy} t={t + 1} /> : null}
        </>
      ) : null}
      {cmp > 0 ? <Blob x={640} y={780} r={60} color={P.brown} t={t + 2} opacity={cmp} /> : null}
      <Tag text="≠" x={510} y={780} size={90} weight={900} opacity={cmp} width={120} />
      <Tag text="Եվայի խառնուրդը" x={380} y={880} size={26} color={C.dim} opacity={cmp} width={300} />
      <Tag text="Անիի և Արամի գույնը" x={660} y={880} size={26} color={C.dim} opacity={cmp} width={320} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: arrows }}>
        <path d="M 250 990 L 760 990 M 735 970 L 760 990 L 735 1010" stroke={C.green} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M 760 1060 L 250 1060 M 275 1040 L 250 1060 L 275 1080" stroke={C.red} strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray="14 10" />
      </svg>
      <Tag text="խառնել՝ հեշտ" x={504} y={960} size={30} color={C.green} opacity={arrows} />
      <Tag text="բաժանել՝ համարյա անհնար" x={504} y={1100} size={30} color={C.red} opacity={ramp(t, m.impossible, 0.4)} />
    </Backdrop>
  );
};

// ---------- math: paint becomes numbers ----------
const DIGITS = Array.from({ length: 600 }, (_, i) => Math.floor(random(`dg-${i}`) * 10)).join("");
const MathScene: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const nums = ramp(t, m.numbers, 0.6);
  const formula = ramp(t, m.power, 0.5);
  const easy = ramp(t, m.easy, 0.4);
  const back = ramp(t, m.back, 0.4);
  const big = ramp(t, m.big, 0.5);
  return (
    <Backdrop>
      {[P.yellow, P.red, P.blue].map((c, i) => <Can key={i} x={330 + i * 175} y={420} color={c} on={1 - nums} s={1.2} />)}
      {["5", "6", "15"].map((n, i) => <Tag key={i} text={n} x={330 + i * 175} y={420} size={80} weight={900} color={[P.yellow, P.red, P.blue][i]} opacity={nums * (1 - formula)} width={200} />)}
      <div style={{ position: "absolute", left: 0, width: 1080, top: 560, textAlign: "center", fontFamily: FONT, fontSize: 78, fontWeight: 800, color: C.ink, opacity: formula }}>
        g<sup style={{ fontSize: 48 }}>a</sup> ÷ p → մնացորդ
      </div>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d="M 200 740 L 860 740 M 835 720 L 860 740 L 835 760" stroke={C.green} strokeWidth={6} fill="none" strokeLinecap="round" opacity={easy} />
        <path d="M 860 840 L 200 840 M 225 820 L 200 840 L 225 860" stroke={C.red} strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray="14 10" opacity={back} />
      </svg>
      <Tag text="հեշտ" x={530} y={705} size={34} color={C.green} opacity={easy} />
      <Tag text="գործնականում անհնար" x={530} y={890} size={34} color={C.red} opacity={back} />
      <div style={{ position: "absolute", left: 0, top: 960, width: 1080, overflow: "hidden", opacity: big }}>
        <div style={{ whiteSpace: "nowrap", fontFamily: "monospace", fontSize: 34, color: C.dim, transform: `translateX(${-((t - m.big) * 260)}px)` }}>{DIGITS}</div>
      </div>
      <Tag text="ճիշտ ընտրված պարամետրեր" x={504} y={1050} size={28} color={C.dim} opacity={big} />
    </Backdrop>
  );
};

// ---------- toy: 5 and 23 ----------
const Toy: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const sup = (n: string) => <sup style={{ fontSize: "0.6em" }}>{n}</sup>;
  return (
    <Backdrop>
      <Tag text="5 և 23" x={504} y={240} size={64} weight={900} opacity={ramp(t, 0.2, 0.4)} />
      <Tag text="Անի՝ 6" x={300} y={360} size={40} color="#FF6B78" opacity={ramp(t, m.six, 0.4)} width={360} />
      <Tag text="Արամ՝ 15" x={720} y={360} size={40} color="#7FA8FF" opacity={ramp(t, m.fifteen, 0.4)} width={360} />
      <Card text={<>5{sup("6")} ÷ 23 → <b style={{ color: C.orange }}>8</b></>} x={90} y={450} w={420} on={pop(t, m.eight)} color={P.red} size={44} />
      <Card text={<>5{sup("15")} ÷ 23 → <b style={{ color: C.orange }}>19</b></>} x={560} y={450} w={420} on={pop(t, m.nineteen)} color={P.blue} size={44} />
      <Card text={<>19{sup("6")} ÷ 23 → <b style={{ color: C.green }}>2</b></>} x={90} y={640} w={420} on={pop(t, m.two)} color={P.red} size={44} />
      <Card text={<>8{sup("15")} ÷ 23 → <b style={{ color: C.green }}>2</b></>} x={560} y={640} w={420} on={pop(t, m.two + 0.2)} color={P.blue} size={44} />
      <Tag text="մնացորդները" x={504} y={860} size={28} color={C.dim} opacity={ramp(t, m.eight, 0.4)} />
    </Backdrop>
  );
};

// ---------- today: real connections, and the certificate that stops a fake Aram ----------
const Today: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const fake = ramp(t, m.eva, 0.5);
  const cert = Math.min(1, pop(t, m.cert));
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: ramp(t, 0.2, 0.5) * (1 - fake) }}>
        <rect x={250} y={420} width={220} height={180} rx={30} fill={C.panel} stroke="#3A3F48" strokeWidth={3} />
        <TuneIcon x={360} y={510} />
        <path d="M 600 430 h 220 a 30 30 0 0 1 30 30 v 100 a 30 30 0 0 1 -30 30 h -150 l -40 40 v -40 h -30 a 30 30 0 0 1 -30 -30 v -100 a 30 30 0 0 1 30 -30 z" fill={C.panel} stroke="#3A3F48" strokeWidth={3} />
      </svg>
      <div style={{ opacity: fake }}>
        <Person x={200} y={420} name="Անի" color={P.red} />
        <Person x={810} y={420} name="Արամ" color={P.blue} opacity={0.35} />
        <Person x={504} y={420} name="«Արամ»" color="#7A7F8A" mask={1} />
      </div>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: cert }}>
        <g transform="translate(504 800)">
          <circle r={70} fill={C.orange} />
          <path d="M -30 0 L -8 22 L 32 -22" stroke={C.bg} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M -40 60 L -60 130 L -20 110 L 0 140 L 10 66 Z M 40 60 L 60 130 L 20 110 L 0 140 L -10 66 Z" fill={C.orange} />
        </g>
        <path d="M 440 300 L 570 430 M 570 300 L 440 430" stroke={C.red} strokeWidth={12} strokeLinecap="round" />
      </svg>
      <Tag text="վկայական" x={504} y={990} size={34} color={C.orange} opacity={cert} />
    </Backdrop>
  );
};

// ---------- long pointer ----------
const Pointer: React.FC<{ m: Record<string, number>; dur: number }> = ({ m, dur }) => {
  const t = useT();
  const folder = ramp(t, m.secret, 0.4) * (1 - ramp(t, m.quantum, 0.3));
  const chip = ramp(t, m.quantum, 0.4) * (1 - ramp(t, m.see, 0.3));
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: folder }}>
        <path d="M 300 420 h 160 l 30 40 h 290 v 340 h -480 z" fill="#C9A35A" stroke="#8A6A2A" strokeWidth={4} />
      </svg>
      <div style={{ position: "absolute", left: 330, top: 560, width: 420, padding: "10px 0", border: `6px solid ${C.red}`, borderRadius: 12, textAlign: "center", fontFamily: FONT, fontSize: 56, fontWeight: 900, color: C.red, transform: "rotate(-10deg)", opacity: folder }}>ԳԱՂՏՆԻ</div>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: chip }}>
        <rect x={384} y={500} width={240} height={240} rx={20} fill="#1B2A44" stroke="#6FA8FF" strokeWidth={4} style={{ filter: `drop-shadow(0 0 ${20 + 10 * Math.sin(t * 6)}px #6FA8FF)` }} />
        {Array.from({ length: 6 }, (_, i) => <g key={i}><line x1={414 + i * 36} y1={470} x2={414 + i * 36} y2={500} stroke="#6FA8FF" strokeWidth={6} /><line x1={414 + i * 36} y1={740} x2={414 + i * 36} y2={770} stroke="#6FA8FF" strokeWidth={6} /></g>)}
      </svg>
      <div style={{ position: "absolute", left: 120, width: 768, top: 880, display: "flex", justifyContent: "center", opacity: ramp(t, Math.min(dur - 1.2, m.see), 0.4) }}>
        <div style={{ padding: "16px 34px", borderRadius: 40, background: C.orange, fontFamily: FONT, fontSize: 38, fontWeight: 800, color: C.bg }}>▶ երկար տեսանյութ</div>
      </div>
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  const k = 0.5 + 0.5 * Math.sin(t * 0.8);
  return (
    <Backdrop glow="rgba(242,168,0,0.12)">
      <Blob x={504 - 90 * Math.cos(t * 0.9)} y={820 + 40 * Math.sin(t * 0.9)} r={70} color={mix(P.yellow, P.brown, k)} t={t} opacity={0.85} />
      <Blob x={504 + 90 * Math.cos(t * 0.9)} y={820 - 40 * Math.sin(t * 0.9)} r={60} color={mix(P.red, P.blue, k)} t={t + 1} opacity={0.85} />
      <Title text={<>Անել՝ հեշտ, <span style={{ color: C.orange }}>հետ դարձնել՝ գործնականում անհնար</span></>} on={ramp(t, 0.3, 0.6)} y={330} size={52} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: (dur: number) => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ you: at("hook", "Դու") }} /> },
  { keys: ["problem"], render: () => <Problem m={{ net: at("problem", "Համացանցում") }} /> },
  { keys: ["idea"], render: () => <Idea m={{ shared: at("idea", "ընդհանուր"), paint: at("idea", "ներկերի") }} /> },
  { keys: ["setup", "common", "secrets", "mix_send", "final"], render: () => {
    const g0 = S.beat("setup").start;
    const r = (k: string, w: string, nth?: number) => rel(g0, S.at(k, w, nth));
    return <Paint m={{
      eva: r("setup", "Եվան"), yellow: r("common", "դեղին"), evaKnows: r("common", "Եվան"), red: r("secrets", "կարմիր"), blue: r("secrets", "կապույտ"),
      mix: r("mix_send", "խառնում"), send: r("mix_send", "ուղարկում", 1), evaSees: r("mix_send", "Եվան"),
      addRed: r("final", "կարմիր", 0), addBlue: r("final", "կապույտ", 0), same: r("final", "նույն"), recipe: r("final", "դեղին"),
    }} />;
  } },
  { keys: ["eve"], render: () => <Eve m={{ has: at("eve", "ունի"), mixes: at("eve", "խառնի"), notSame: at("eve", "նույնը"), separate: at("eve", "բաժանել", 0), easy: at("eve", "խառնելը"), impossible: at("eve", "անհնար") }} /> },
  { keys: ["math"], render: () => <MathScene m={{ numbers: at("math", "թվեր", 0), power: at("math", "աստիճան", 0), easy: at("math", "հեշտ"), back: at("math", "հետ"), big: at("math", "ճիշտ") }} /> },
  { keys: ["toy"], render: () => <Toy m={{ five: at("toy", "5"), six: at("toy", "6"), fifteen: at("toy", "15"), eight: at("toy", "8"), nineteen: at("toy", "19"), two: at("toy", "2։") }} /> },
  { keys: ["today"], render: () => <Today m={{ eva: at("today", "Եվայի"), cert: at("today", "վկայականներ") }} /> },
  { keys: ["long_pointer"], render: (dur) => <Pointer dur={dur} m={{ secret: at("long_pointer", "գաղտնի"), quantum: at("long_pointer", "քվանտային"), see: at("long_pointer", "տե՛ս") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const CryptoPaint: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * CP_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * CP_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render(len / CP_FPS)}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`crypto_paint/${S.audio}`)} />
  </AbsoluteFill>
);
