// "Why a backpack tires you though the textbook says zero work" (9:16 Short, draft for review; DECISIONS #28). All
// drawn: a walker whose centre of mass bobs with each step, the backpack riding the waves, vs a suitcase on a flat line.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import TL from "../data/luggage_wheels.json";
import { C, FONT, easeInOut, lerp, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "luggage_wheels", "portrait");
export const LUG_FPS = 30;
const TAIL_S = 1.2;
export const LUG_FRAMES = Math.ceil((S.duration + TAIL_S) * LUG_FPS);
const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);
const STEP_HZ = 1.8;

// a walking figure; `bob` is the centre-of-mass rise; pack / case options
const Walker: React.FC<{ x: number; y: number; t: number; s?: number; pack?: boolean; caseKind?: 0 | 2 | 4; sweat?: number; litJoints?: number }> = ({ x, y: y0, t, s = 1, pack = false, caseKind = 0, sweat = 0, litJoints = 0 }) => {
  const y = 0; // drawn relative to the feet, then placed at (x, y0)
  const ph = t * STEP_HZ * 2 * Math.PI;
  const bob = 10 * Math.abs(Math.sin(ph));
  const leg = 26 * Math.sin(ph);
  const rising = Math.cos(ph) * Math.sin(ph) > 0;
  const hy = y - 230 - bob;
  return (
    <g transform={`translate(${x} ${y0}) scale(${s})`}>
      <circle cx={0} cy={hy} r={30} fill="#D9DCE2" />
      <line x1={0} y1={hy + 30} x2={0} y2={y - 110 - bob} stroke="#D9DCE2" strokeWidth={18} strokeLinecap="round" />
      <line x1={0} y1={y - 110 - bob} x2={leg} y2={y} stroke="#D9DCE2" strokeWidth={16} strokeLinecap="round" />
      <line x1={0} y1={y - 110 - bob} x2={-leg} y2={y} stroke="#D9DCE2" strokeWidth={16} strokeLinecap="round" />
      {litJoints > 0 && rising ? [[leg / 2, y - 55 - bob / 2], [leg, y - 6]].map(([jx, jy], i) => <circle key={i} cx={jx} cy={jy} r={12} fill={C.orange} opacity={litJoints} />) : null}
      <line x1={0} y1={hy + 60} x2={caseKind ? 60 : 30} y2={hy + (caseKind ? 140 : 120)} stroke="#D9DCE2" strokeWidth={12} strokeLinecap="round" />
      {pack ? <rect x={-62} y={hy + 30} width={46} height={92} rx={12} fill={C.orange} /> : null}
      {caseKind === 4 ? (
        <g>
          <line x1={60} y1={hy + 140} x2={110} y2={y - 150} stroke="#AEB4BF" strokeWidth={6} />
          <rect x={90} y={y - 150} width={90} height={120} rx={12} fill="#4A90E2" />
          {[100, 170].map((wx) => <circle key={wx} cx={wx} cy={y - 18} r={12} fill="#2A2E35" />)}
        </g>
      ) : null}
      {caseKind === 2 ? (
        <g transform={`rotate(-30 ${150} ${y - 16})`}>
          <rect x={100} y={y - 150} width={90} height={130} rx={12} fill="#4A90E2" />
          <circle cx={150} cy={y - 14} r={13} fill="#2A2E35" />
        </g>
      ) : null}
      {sweat > 0 ? [0, 1, 2].map((i) => <path key={i} d={`M ${30 + i * 14} ${hy - 20 + ((t * 60 + i * 20) % 50)} q 6 10 0 14 q -6 -4 0 -14`} fill="#6FC3FF" opacity={sweat} />) : null}
    </g>
  );
};
const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; w?: number; on?: number }> = ({ x1, y1, x2, y2, color, w = 8, on = 1 }) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    <g opacity={on}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <path d={`M ${x2} ${y2} L ${x2 - 26 * Math.cos(a - 0.45)} ${y2 - 26 * Math.sin(a - 0.45)} M ${x2} ${y2} L ${x2 - 26 * Math.cos(a + 0.45)} ${y2 - 26 * Math.sin(a + 0.45)}`} stroke={color} strokeWidth={w} strokeLinecap="round" />
    </g>
  );
};
const Formula: React.FC<{ x: number; y: number; on: number; zero?: number; size?: number }> = ({ x, y, on, zero = 1, size = 52 }) => (
  <div style={{ position: "absolute", left: x - 450, top: y, width: 900, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: 800, color: C.ink, opacity: on }}>
    A = F · s · cos 90° <span style={{ color: C.orange, opacity: zero }}>= 0</span>
  </div>
);
const EnergyMeter: React.FC<{ x: number; y: number; level: number; on?: number }> = ({ x, y, level, on = 1 }) => (
  <g opacity={on}>
    <rect x={x} y={y} width={70} height={260} rx={14} fill="#1B1E25" stroke="#5A606A" strokeWidth={4} />
    <rect x={x + 8} y={y + 8 + 244 * (1 - level)} width={54} height={244 * level} rx={8} fill={level > 0.3 ? C.green : C.red} />
  </g>
);

// ---------- hook ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Svg>
        <rect x={200} y={220} width={680} height={220} rx={10} fill="#E9E1CC" />
        {Array.from({ length: 4 }, (_, i) => <line key={i} x1={240} x2={840 - (i % 2) * 120} y1={260 + i * 40} y2={260 + i * 40} stroke="#8A7A5A" strokeWidth={6} opacity={0.5} />)}
        <ellipse cx={720} cy={380} rx={110} ry={42} fill="none" stroke={C.red} strokeWidth={6} />
        <line x1={120} x2={960} y1={1000} y2={1000} stroke="#3A3F48" strokeWidth={4} />
        <Walker x={300} y={1000} t={t} pack sweat={ramp(t, m.sweat, 0.4)} />
        <Walker x={700} y={1000} t={t} caseKind={4} />
      </Svg>
      <Tag text="A = 0" x={720} y={380} size={52} weight={900} color="#2A2018" width={240} />
      <Tag text="20 կգ" x={300} y={1050} size={30} color={C.orange} width={200} />
      <Tag text="20 կգ" x={780} y={1050} size={30} color="#6FA8FF" width={200} />
    </Backdrop>
  );
};

// ---------- arrows: force up, motion forward, work zero ----------
const Arrows: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Svg>
        <line x1={100} x2={980} y1={940} y2={940} stroke="#3A3F48" strokeWidth={4} />
        <Walker x={480} y={940} t={t} pack s={1.25} />
        <Arrow x1={430} y1={580} x2={430} y2={380} color={C.orange} w={12} on={ramp(t, m.up, 0.4)} />
        <Arrow x1={560} y1={760} x2={860} y2={760} color="#6FA8FF" w={12} on={ramp(t, m.forward, 0.4)} />
        <path d="M 430 760 L 470 760 L 470 720" stroke={C.ink} strokeWidth={4} fill="none" opacity={ramp(t, m.forward + 0.6, 0.4)} />
      </Svg>
      <Tag text="ուժ" x={360} y={380} size={36} color={C.orange} opacity={ramp(t, m.up, 0.4)} width={160} />
      <Tag text="շարժում" x={760} y={720} size={36} color="#6FA8FF" opacity={ramp(t, m.forward, 0.4)} width={240} />
      <Formula x={540} y={1010} on={ramp(t, m.physics, 0.5)} zero={ramp(t, m.zero, 0.4)} />
    </Backdrop>
  );
};

// ---------- two things: work vs energy ----------
const TwoThings: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const drain = ramp(t, m.holds, 6, (x) => x);
  return (
    <Backdrop>
      <Formula x={540} y={300} on={ramp(t, 0.2, 0.5)} size={44} />
      <Svg>
        <path d="M 200 700 L 520 700" stroke="#E8B996" strokeWidth={46} strokeLinecap="round" />
        <circle cx={540} cy={700} r={30} fill="#E8B996" />
        <line x1={560} y1={720} x2={560} y2={800} stroke="#8A8F99" strokeWidth={6} />
        <rect x={510} y={800} width={110} height={130} rx={14} fill="#7A5A30" />
        <ellipse cx={320} cy={688} rx={70} ry={30} fill={C.red} opacity={ramp(t, m.energy, 0.4) * (0.5 + 0.5 * Math.sin(t * 8))} />
        <EnergyMeter x={820} y={600} level={1 - 0.8 * drain} on={ramp(t, m.energy, 0.4)} />
      </Svg>
      <Tag text="աշխատանք ≠ էներգիա" x={540} y={470} size={46} weight={900} color={C.orange} opacity={ramp(t, m.energy, 0.5)} />
      <Tag text="1 րոպե" x={565} y={990} size={32} color={C.dim} opacity={ramp(t, m.minute, 0.4)} width={200} />
    </Backdrop>
  );
};

// ---------- body: the bobbing centre of mass; cost rises with load ----------
const Body: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const trace = ramp(t, m.down, 0.5);
  const chart = ramp(t, m.measured, 0.6);
  const line = ramp(t, m.measured + 0.4, 1.6, easeInOut);
  return (
    <Backdrop>
      <div style={{ opacity: 1 - 0.8 * chart }}>
        <Svg>
          <line x1={80} x2={1000} y1={900} y2={900} stroke="#3A3F48" strokeWidth={4} />
          <path d={Array.from({ length: 121 }, (_, i) => { const x = 80 + i * 7.6; const ph = (t - (i - 60) * 0.012) * STEP_HZ * 2 * Math.PI; return `${i ? "L" : "M"} ${x} ${560 - 30 * Math.abs(Math.sin(ph))}`; }).join(" ")} stroke={C.orange} strokeWidth={5} fill="none" opacity={trace} strokeDasharray="10 8" />
          <Walker x={540} y={900} t={t} pack s={1.3} litJoints={ramp(t, m.lift, 0.4)} />
        </Svg>
      </div>
      <Svg opacity={chart}>
        <line x1={200} y1={980} x2={900} y2={980} stroke={C.dim} strokeWidth={3} />
        <line x1={200} y1={980} x2={200} y2={420} stroke={C.dim} strokeWidth={3} />
        <line x1={200} y1={900} x2={lerp(200, 880, line)} y2={lerp(900, 480, line)} stroke={C.orange} strokeWidth={8} strokeLinecap="round" />
      </Svg>
      <Tag text="ուսապարկի կգ" x={600} y={1030} size={28} color={C.dim} opacity={chart} width={400} />
      <Tag text="ջանք" x={200} y={390} size={30} color={C.dim} opacity={chart} width={200} />
      <Tag text="նկարազարդում" x={820} y={420} size={22} weight={650} color={C.dim} opacity={chart} width={240} />
    </Backdrop>
  );
};

// ---------- wheels: the floor carries it ----------
const Wheels: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const arrows = ramp(t, m.four, 0.5);
  const inset = ramp(t, m.two, 0.5);
  const pull = ramp(t, m.force, 0.5);
  return (
    <Backdrop>
      <Svg>
        <line x1={80} x2={1000} y1={860} y2={860} stroke="#3A3F48" strokeWidth={4} />
        <path d="M 80 760 L 1000 760" stroke="#6FA8FF" strokeWidth={4} strokeDasharray="10 8" opacity={arrows} />
        <Walker x={400} y={860} t={t} caseKind={4} s={1.2} />
        <Arrow x1={592} y1={720} x2={592} y2={850} color="#AEB4BF" w={14} on={arrows} />
        <Arrow x1={520} y1={640} x2={470} y2={640} color={C.orange} w={8} on={pull} />
        <g opacity={inset}>
          <rect x={700} y={300} width={300} height={300} rx={20} fill={C.panel} stroke="#3A3F48" strokeWidth={3} />
          <g transform="translate(560 -330) scale(0.75)">
            <Walker x={340} y={1150} t={t} caseKind={2} />
          </g>
          <Arrow x1={872} y1={420} x2={872} y2={470} color="#AEB4BF" w={6} />
        </g>
      </Svg>
      <Tag text="հատակը պահում է" x={680} y={920} size={30} color="#AEB4BF" opacity={arrows} width={360} />
      <Tag text="մի քանի %" x={430} y={600} size={30} color={C.orange} opacity={pull} width={240} />
    </Backdrop>
  );
};

// ---------- floor: steps, sand, cobbles ----------
const Floor: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const rough = ramp(t, m.steps, 0.6);
  const yerevan = ramp(t, m.yerevan, 0.6);
  const ground = (x: number) => 860 - rough * (x > 350 && x < 560 ? Math.floor((x - 350) / 70) * 30 : x >= 700 ? 10 * Math.abs(Math.sin(x / 18)) : 0);
  return (
    <Backdrop>
      <Svg>
        <path d={Array.from({ length: 93 }, (_, i) => `${i ? "L" : "M"} ${80 + i * 10} ${ground(80 + i * 10)}`).join(" ")} stroke="#8A8F99" strokeWidth={6} fill="none" />
        {rough > 0 ? Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx={720 + i * 24} cy={862} rx={10} ry={6} fill="#5A606A" opacity={rough} />) : null}
        <g transform={`translate(0 ${-rough * 14 * Math.abs(Math.sin(t * 9))})`}>
          <Walker x={300} y={860} t={t} caseKind={4} s={1.1} />
        </g>
        <g opacity={yerevan}><Walker x={lerp(1000, 760, ramp(t, m.yerevan, 3))} y={860} t={t} pack s={0.9} /></g>
      </Svg>
      <Tag text="Երևանյան մայթ" x={540} y={950} size={30} color={C.dim} opacity={yerevan} width={400} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Formula x={540} y={420} on={ramp(t, 0.3, 0.5)} size={44} />
      <Svg>
        <EnergyMeter x={505} y={540} level={0.35 + 0.1 * Math.sin(t * 2)} on={ramp(t, 1.0, 0.5)} />
        <path d={Array.from({ length: 101 }, (_, i) => { const ph = (t - i * 0.012) * STEP_HZ * 2 * Math.PI; return `${i ? "L" : "M"} ${90 + i * 9} ${920 - 24 * Math.abs(Math.sin(ph))}`; }).join(" ")} stroke={C.orange} strokeWidth={5} fill="none" strokeDasharray="10 8" opacity={ramp(t, 1.6, 0.5)} />
      </Svg>
      <Title text={<>Աշխատանքը զրո է, <span style={{ color: C.orange }}>էներգիան՝ ոչ</span></>} on={ramp(t, 0.3, 0.6)} y={220} size={56} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ sweat: at("hook", "քրտնում") }} /> },
  { keys: ["arrows"], render: () => <Arrows m={{ up: at("arrows", "վեր", 0), forward: at("arrows", "առաջ"), physics: at("arrows", "Ֆիզիկայում"), zero: at("arrows", "զրո") }} /> },
  { keys: ["two_things"], render: () => <TwoThings m={{ energy: at("two_things", "էներգիան"), holds: at("two_things", "պահում"), minute: at("two_things", "րոպե") }} /> },
  { keys: ["body"], render: () => <Body m={{ down: at("body", "իջնում"), lift: at("body", "բարձրացնում"), measured: at("body", "Չափումները") }} /> },
  { keys: ["wheels"], render: () => <Wheels m={{ four: at("wheels", "Չորս"), two: at("wheels", "երկու"), force: at("wheels", "ուժ") }} /> },
  { keys: ["floor"], render: () => <Floor m={{ steps: at("floor", "Աստիճաններին"), yerevan: at("floor", "Երևանի") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const LuggageWheels: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * LUG_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * LUG_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`luggage_wheels/${S.audio}`)} />
  </AbsoluteFill>
);
