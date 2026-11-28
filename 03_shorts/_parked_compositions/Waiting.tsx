// "Why waiting feels longer when you stand still" (9:16 Short, draft for review; DECISIONS #28). All drawn. The Houston
// airport story is shown as an unverified story (stamped); the rules come from Maister 1985; the Disney numbers are
// fan-collected (TouringPlans), shown as a rough two-thirds.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import TL from "../data/waiting.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "waiting", "portrait");
export const WAIT_FPS = 30;
const TAIL_S = 1.2;
export const WAIT_FRAMES = Math.ceil((S.duration + TAIL_S) * WAIT_FPS);
const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);
const WALK = "#4A90E2", STAND = "#E8383D";

const Clock: React.FC<{ x: number; y: number; r: number; a: number; heavy?: boolean }> = ({ x, y, r, a, heavy = false }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={heavy ? "#2A2E35" : C.panel} stroke={heavy ? STAND : "#8A8F99"} strokeWidth={heavy ? 8 : 4} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={x + r * 0.82 * Math.sin((i * Math.PI) / 6)} y1={y - r * 0.82 * Math.cos((i * Math.PI) / 6)} x2={x + r * 0.92 * Math.sin((i * Math.PI) / 6)} y2={y - r * 0.92 * Math.cos((i * Math.PI) / 6)} stroke="#8A8F99" strokeWidth={3} />)}
    <line x1={x} y1={y} x2={x + r * 0.75 * Math.sin(a)} y2={y - r * 0.75 * Math.cos(a)} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
  </g>
);
const Person: React.FC<{ x: number; y: number; walk?: boolean; t: number; s?: number; book?: number }> = ({ x, y, walk = false, t, s = 1, book = 0 }) => {
  const leg = walk ? 20 * Math.sin(t * 9) : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-170} r={26} fill="#D9DCE2" />
      <line x1={0} y1={-144} x2={0} y2={-70} stroke="#D9DCE2" strokeWidth={16} strokeLinecap="round" />
      <line x1={0} y1={-70} x2={leg} y2={0} stroke="#D9DCE2" strokeWidth={14} strokeLinecap="round" />
      <line x1={0} y1={-70} x2={-leg} y2={0} stroke="#D9DCE2" strokeWidth={14} strokeLinecap="round" />
      {book > 0 ? <rect x={10} y={-130} width={50} height={36} rx={4} fill={C.orange} opacity={book} /> : null}
    </g>
  );
};
const Bar: React.FC<{ x: number; y: number; segs: { w: number; c: string }[]; scale: number; on?: number }> = ({ x, y, segs, scale, on = 1 }) => {
  let cx = x;
  return (
    <g opacity={on}>
      {segs.map((s, i) => {
        const el = <rect key={i} x={cx} y={y} width={s.w * scale} height={70} fill={s.c} stroke={C.bg} strokeWidth={3} />;
        cx += s.w * scale;
        return el;
      })}
    </g>
  );
};

// ---------- hook ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Title text={<>8 րոպե = 8 րոպե՞</>} on={1} y={210} size={60} />
      <Svg>
        <Clock x={300} y={480} r={110} a={t * 0.25} heavy />
        <Clock x={780} y={480} r={110} a={t * 1.2} />
        <Person x={300} y={940} t={t} s={1.3} />
        <Person x={780 + 30 * Math.sin(t * 1.5)} y={940} t={t} walk s={1.3} />
      </Svg>
      <Tag text="կանգնած" x={300} y={990} size={32} color={STAND} opacity={ramp(t, m.stand, 0.4)} width={300} />
      <Tag text="քայլելիս" x={780} y={990} size={32} color="#7FB2F0" opacity={ramp(t, m.stand, 0.4)} width={300} />
    </Backdrop>
  );
};

// ---------- houston + honest: same 8 minutes, then the stamp ----------
const Houston: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const before = ramp(t, m.one, 0.6);
  const after = ramp(t, m.six, 1.0, easeInOut);
  const complaints = Math.round(lerp(12, 1, ramp(t, m.stopped, 1.5)));
  const stamp = Math.min(1, pop(t, m.confirm, 12, 0.5));
  const book = ramp(t, m.however, 0.5);
  const SC = 95;
  return (
    <Backdrop>
      <Svg opacity={1 - 0.5 * book}>
        <Bar x={160} y={420} segs={[{ w: 1, c: WALK }, { w: 7, c: STAND }]} scale={SC} on={before} />
        <Bar x={160} y={620} segs={[{ w: lerp(1, 6, after), c: WALK }, { w: lerp(7, 2, after), c: STAND }]} scale={SC} on={ramp(t, m.six - 0.3, 0.4)} />
        {Array.from({ length: complaints }, (_, i) => <circle key={i} cx={180 + i * 60} cy={840} r={20} fill={STAND} opacity={before} />)}
      </Svg>
      <Tag text="առաջ" x={100} y={455} size={28} color={C.dim} opacity={before} width={140} />
      <Tag text="հետո" x={100} y={655} size={28} color={C.dim} opacity={ramp(t, m.six - 0.3, 0.4)} width={140} />
      <Tag text="քայլել" x={300} y={390} size={26} color="#7FB2F0" opacity={before} width={200} />
      <Tag text="կանգնած սպասել" x={700} y={390} size={26} color="#FF7A7E" opacity={before} width={300} />
      <Tag text="8 րոպե" x={920} y={560} size={30} color={C.dim} opacity={before} width={200} />
      <Tag text="բողոքներ" x={540} y={900} size={26} color={C.dim} opacity={before} width={300} />
      <div style={{ position: "absolute", left: 180, top: 520, width: 720, padding: "14px 0", border: `8px solid ${STAND}`, borderRadius: 18, textAlign: "center", fontFamily: FONT, fontSize: 46, fontWeight: 900, color: STAND, transform: `rotate(-6deg) scale(${2 - stamp})`, opacity: stamp, background: "rgba(14,15,18,0.65)" }}>չստուգված պատմություն</div>
      <Svg opacity={book}>
        <path d="M 400 1000 L 540 970 L 680 1000 L 680 1080 L 540 1050 L 400 1080 Z" fill="#E9E1CC" stroke="#A88C5A" strokeWidth={4} />
      </Svg>
      <Tag text="ուսումնասիրված" x={540} y={1110} size={30} color={C.green} opacity={book} width={400} />
      <SourceLine text="պատմում են (աղբյուրը հաստատված չէ)" on={ramp(t, 0.3, 0.5) * (1 - book)} />
    </Backdrop>
  );
};

// ---------- empty: busy time is shorter ----------
const Empty: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const read = ramp(t, m.busy, 0.5);
  const bars = ramp(t, m.over, 0.8, easeInOut);
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 250, top: 230, width: 580, padding: "10px 0", borderRadius: 14, background: C.panel, border: `2px solid ${C.orange}`, textAlign: "center", fontFamily: FONT, fontSize: 36, fontWeight: 800, color: C.ink, opacity: ramp(t, 0.2, 0.5) }}>Դեյվիդ Մայստեր, 1985</div>
      <Svg>
        <Clock x={300} y={560} r={110} a={t * 0.2} heavy />
        <Person x={300} y={940} t={t} s={1.2} />
        <g opacity={read}>
          <Clock x={780} y={560} r={110} a={t * 1.5} />
          <Person x={780} y={940} t={t} s={1.2} book={1} />
        </g>
        <Bar x={240} y={1010} segs={[{ w: 1, c: "#8A8F99" }]} scale={360} on={bars} />
        <Bar x={240} y={1090} segs={[{ w: 1, c: STAND }]} scale={360 * lerp(1, 1.4, bars)} on={bars} />
      </Svg>
      <Tag text="իրական" x={160} y={1045} size={26} color={C.dim} opacity={bars} width={160} />
      <Tag text="զգացված" x={160} y={1125} size={26} color="#FF7A7E" opacity={bars} width={160} />
    </Backdrop>
  );
};

// ---------- rules: four pairs ----------
const RULES = [{ a: "անորոշ", b: "հայտնի" }, { a: "չբացատրված", b: "բացատրված" }, { a: "անարդար", b: "արդար" }, { a: "մենակ", b: "ընկերների հետ" }];
const Rules: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const cues = [m.unknown, m.unexplained, m.unfair, m.alone];
  return (
    <Backdrop>
      {RULES.map((r, i) => {
        const on = ramp(t, cues[i], 0.4);
        const y = 330 + i * 190;
        return (
          <React.Fragment key={i}>
            <Svg opacity={on}>
              <rect x={420} y={y - 30} width={520 * on} height={40} rx={8} fill={STAND} />
              <rect x={420} y={y + 20} width={300 * on} height={40} rx={8} fill={C.green} />
            </Svg>
            <Tag text={r.a} x={260} y={y - 10} size={30} color="#FF7A7E" opacity={on} width={300} />
            <Tag text={r.b} x={260} y={y + 40} size={30} color={C.green} opacity={on} width={300} />
          </React.Fragment>
        );
      })}
      <Tag text="զգացված տևողություն" x={680} y={1090} size={26} color={C.dim} opacity={ramp(t, 0.5, 0.5)} width={400} />
    </Backdrop>
  );
};

// ---------- disney_posted: the posted time is padded ----------
const DisneyPosted: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const real = ramp(t, m.third, 1.6, easeInOut);
  const happy = ramp(t, m.happy, 0.5);
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 300, top: 260, width: 480, padding: "18px 0", borderRadius: 16, background: "#2B4A7A", border: "6px solid #F2D7A8", textAlign: "center", fontFamily: FONT, fontSize: 72, fontWeight: 900, color: "#F2D7A8", opacity: ramp(t, m.posted, 0.4) }}>60 րոպե</div>
      <Svg>
        <Clock x={540} y={640} r={120} a={2 * Math.PI * (40 / 60) * real} />
        <rect x={190} y={880} width={700} height={44} rx={10} fill="#3A3F48" opacity={ramp(t, m.third, 0.4)} />
        <rect x={190} y={880} width={700 * (2 / 3) * real} height={44} rx={10} fill={C.orange} />
        <g opacity={happy} transform="translate(540 1030)">
          <circle r={50} fill="#FFD36B" />
          <circle cx={-16} cy={-10} r={6} fill="#1B1E25" /><circle cx={16} cy={-10} r={6} fill="#1B1E25" />
          <path d="M -24 12 Q 0 34 24 12" stroke="#1B1E25" strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
      </Svg>
      <Tag text="≈ 40" x={540} y={800} size={44} weight={900} color={C.orange} opacity={real} width={200} />
      <SourceLine text="TouringPlans" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- disney_queue: switchbacks hide the length; games fill the time ----------
const DisneyQueue: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const games = ramp(t, m.games, 0.5);
  const rows = 6, perRow = 14;
  const dots: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < perRow; c++) dots.push({ x: 180 + (r % 2 ? perRow - 1 - c : c) * 52, y: 360 + r * 110 });
  return (
    <Backdrop>
      <Svg>
        {Array.from({ length: rows - 1 }, (_, r) => <rect key={r} x={r % 2 ? 230 : 150} y={405 + r * 110} width={700} height={16} rx={6} fill="#5A3E26" />)}
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={14} fill={i === 20 ? C.orange : "#8A8F99"} opacity={Math.floor(i / perRow) === 1 ? 1 : 0.35 + 0.65 * (1 - ramp(t, m.winds, 0.6))} />)}
        <circle cx={dots[20].x} cy={dots[20].y} r={140} fill="none" stroke={C.orange} strokeWidth={3} strokeDasharray="10 8" opacity={ramp(t, m.winds, 0.6)} />
        {[[400, 580], [700, 800], [300, 910]].map(([x, y], i) => (
          <g key={i} opacity={games} transform={`translate(${x} ${y})`}>
            <rect x={-28} y={-28} width={56} height={56} rx={10} fill={C.orange} />
            <text y={14} textAnchor="middle" fontSize={34} fill={C.bg}>★</text>
          </g>
        ))}
      </Svg>
      <Tag text="դու այստեղ ես" x={dots[20].x} y={dots[20].y - 60} size={26} color={C.orange} opacity={ramp(t, m.winds, 0.6)} width={260} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Svg opacity={0.35}>
        <Clock x={300} y={760} r={110} a={t * 0.25} heavy />
        <Clock x={780} y={760} r={110} a={t * 1.2} />
      </Svg>
      <Title text={<>Սպասումը մասամբ ժամացույցն է, <span style={{ color: C.orange }}>մասամբ՝ զգացողությունը</span></>} on={ramp(t, 0.3, 0.6)} y={300} size={52} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ stand: at("hook", "կանգնած") }} /> },
  { keys: ["houston", "honest"], render: () => {
    const g0 = S.beat("houston").start;
    const r = (k: string, w: string, nth?: number) => rel(g0, S.at(k, w, nth));
    return <Houston m={{ one: r("houston", "մեկ"), six: r("houston", "վեց"), stopped: r("houston", "բողոքները"), confirm: r("honest", "հաստատել"), however: r("honest", "Սակայն") }} />;
  } },
  { keys: ["empty"], render: () => <Empty m={{ busy: at("empty", "զբաղված"), over: at("empty", "գերագնահատում") }} /> },
  { keys: ["rules"], render: () => <Rules m={{ unknown: at("rules", "անորոշ"), unexplained: at("rules", "Չբացատրված"), unfair: at("rules", "Անարդար"), alone: at("rules", "մենակ") }} /> },
  { keys: ["disney_posted"], render: () => <DisneyPosted m={{ posted: at("disney_posted", "գրված"), third: at("disney_posted", "երրորդը"), happy: at("disney_posted", "ուրախ") }} /> },
  { keys: ["disney_queue"], render: () => <DisneyQueue m={{ winds: at("disney_queue", "ոլորվում"), games: at("disney_queue", "խաղերով") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const Waiting: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * WAIT_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * WAIT_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`waiting/${S.audio}`)} />
  </AbsoluteFill>
);
