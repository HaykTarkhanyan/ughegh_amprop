// "The IKEA effect" (9:16 Short, draft for review; DECISIONS #28). All drawn. Bars are relative (finished box = 100,
// self-built = 163, the study's +63%); no invented prices on screen.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, random, staticFile } from "remotion";
import TL from "../data/ikea_effect.json";
import { C, FONT, easeInOut, lerp, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "ikea_effect", "portrait");
export const IKEA_FPS = 30;
const TAIL_S = 1.2;
export const IKEA_FRAMES = Math.ceil((S.duration + TAIL_S) * IKEA_FPS);
const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);

// a storage box in simple 3/4 view; `built` 0 = flat pieces, 1 = assembled
const Box: React.FC<{ x: number; y: number; s?: number; built?: number; glow?: number; initials?: number }> = ({ x, y, s = 1, built = 1, glow = 0, initials = 0 }) => {
  const k = built;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} style={{ filter: glow ? `drop-shadow(0 0 ${20 * glow}px rgba(242,168,0,0.8))` : undefined }}>
      {/* front, side, top: they slide from flat positions into place */}
      <rect x={lerp(-160, -90, k)} y={lerp(60, -40, k)} width={180} height={140} fill="#C9A06A" stroke="#7A5A30" strokeWidth={4} transform={`rotate(${lerp(-8, 0, k)})`} />
      <path d={`M ${lerp(40, 90, k)} ${lerp(70, -40, k)} l 60 -40 l 0 140 l -60 40 z`} fill="#B08850" stroke="#7A5A30" strokeWidth={4} />
      <path d={`M ${lerp(-140, -90, k)} ${lerp(-60, -40, k)} l 60 -40 l 180 0 l -60 40 z`} fill="#DDB884" stroke="#7A5A30" strokeWidth={4} opacity={0.3 + 0.7 * k} />
      <rect x={-40} y={20} width={80} height={14} rx={7} fill="#7A5A30" opacity={k} />
      {initials > 0 ? <text x={0} y={80} textAnchor="middle" fontFamily={FONT} fontSize={40} fontWeight={900} fill={C.orange} opacity={initials}>★</text> : null}
    </g>
  );
};
const PriceTag: React.FC<{ x: number; y: number; h: number; color?: string; opacity?: number }> = ({ x, y, h, color = C.orange, opacity = 1 }) => (
  <g opacity={opacity}>
    <rect x={x - 34} y={y - h} width={68} height={h} rx={10} fill={color} />
    <text x={x} y={y - h - 14} textAnchor="middle" fontFamily={FONT} fontSize={34} fontWeight={900} fill={color}>֏</text>
  </g>
);

// ---------- hook ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const rise = 120 + 80 * ramp(t, 0.6, 3.5, easeInOut);
  return (
    <Backdrop>
      <Svg>
        <Box x={300} y={700} s={1} built={ramp(t, 0.2, 2.0, easeInOut)} glow={0.5 + 0.5 * Math.sin(t * 3)} />
        <Box x={770} y={700} s={1} />
        <PriceTag x={300} y={460} h={rise} />
        <PriceTag x={770} y={460} h={120} color="#8A8F99" />
        <g transform={`translate(${190 + 10 * Math.sin(t * 8)} 860) rotate(-35)`}>
          <rect x={-8} y={-70} width={16} height={60} rx={4} fill="#3A3F48" />
          <rect x={-18} y={-10} width={36} height={70} rx={10} fill={C.red} />
        </g>
      </Svg>
      <Tag text="ինքդ հավաքած" x={300} y={940} size={30} color={C.orange} width={360} />
      <Tag text="պատրաստի" x={770} y={940} size={30} color={C.dim} width={360} />
      <Tag text="֏" x={504} y={1050} size={60} weight={900} color={C.orange} opacity={ramp(t, m.money, 0.4)} width={120} />
    </Backdrop>
  );
};

// ---------- boxes: the experiment, +63% ----------
const Boxes: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const build = ramp(t, m.built, 2.0, easeInOut);
  const ready = ramp(t, m.ready, 0.5);
  const bars = ramp(t, m.asked, 1.4, easeInOut);
  const pct = ramp(t, m.pct, 0.4);
  return (
    <Backdrop>
      <Svg>
        {Array.from({ length: 6 }, (_, i) => <circle key={`a${i}`} cx={160 + (i % 3) * 70} cy={340 + Math.floor(i / 3) * 70} r={22} fill={C.orange} />)}
        {Array.from({ length: 6 }, (_, i) => <circle key={`b${i}`} cx={710 + (i % 3) * 70} cy={340 + Math.floor(i / 3) * 70} r={22} fill="#8A8F99" opacity={ready} />)}
        <Box x={300} y={620} s={0.65} built={build} />
        <g opacity={ready}><Box x={780} y={620} s={0.65} /></g>
        <rect x={210} y={1020 - 300 * bars} width={180} height={300 * bars} rx={12} fill="#8A8F99" transform="translate(470 0)" />
        <rect x={210} y={1020 - 300 * 1.63 * bars} width={180} height={300 * 1.63 * bars} rx={12} fill={C.orange} />
      </Svg>
      <Tag text="+63%" x={300} y={1020 - 300 * 1.63 * bars - 50} size={60} weight={900} color={C.orange} opacity={pct} width={260} />
      <Tag text="հավաքողներ" x={300} y={1060} size={28} color={C.orange} opacity={bars} width={300} />
      <Tag text="պատրաստի" x={770} y={1060} size={28} color={C.dim} opacity={bars} width={300} />
      <SourceLine text="Norton, Mochon & Ariely, 2012" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- origami: the maker's frog vs the expert's crane ----------
const Frog: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <path d={`M ${x - 90} ${y + 40} L ${x - 30} ${y - 50} L ${x + 10} ${y - 20} L ${x + 80} ${y - 60} L ${x + 70} ${y + 30} L ${x + 20} ${y + 10} L ${x - 20} ${y + 50} Z`} fill="#7FBF6A" stroke="#4E7A3E" strokeWidth={4} transform={`rotate(-9 ${x} ${y})`} />
);
const Crane: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <path d={`M ${x - 120} ${y} L ${x - 20} ${y - 30} L ${x} ${y - 120} L ${x + 20} ${y - 30} L ${x + 130} ${y - 60} L ${x + 40} ${y + 10} L ${x + 60} ${y + 70} L ${x} ${y + 20} L ${x - 60} ${y + 60} Z`} fill="#F4F1EA" stroke="#AEB4BF" strokeWidth={4} />
);
const Origami: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const name = ramp(t, 0.2, 0.5) * (1 - ramp(t, m.origami - 0.3, 0.4));
  const paper = ramp(t, m.origami, 0.5);
  const maker = ramp(t, m.makers, 1.0, easeInOut);
  const onlooker = ramp(t, m.others, 1.0, easeInOut);
  return (
    <Backdrop>
      <Title text={<span style={{ color: C.orange }}>Իկեայի էֆեկտ</span>} on={name} y={560} size={72} />
      <Svg opacity={paper}>
        <Frog x={300} y={560} />
        <Crane x={760} y={560} />
        <PriceTag x={760} y={960} h={260} color="#AEB4BF" opacity={maker} />
        <PriceTag x={250} y={960} h={lerp(0, 240, maker)} opacity={maker} />
        <PriceTag x={360} y={960} h={lerp(240, 24, onlooker)} color="#6FA8FF" opacity={onlooker} />
      </Svg>
      <Tag text="սկսնակ" x={300} y={700} size={28} color={C.dim} opacity={paper} width={300} />
      <Tag text="վարպետ" x={760} y={700} size={28} color={C.dim} opacity={paper} width={300} />
      <Tag text="ինքը" x={250} y={1000} size={26} color={C.orange} opacity={maker} width={160} />
      <Tag text="կողքից" x={370} y={1000} size={26} color="#9EC3FF" opacity={onlooker} width={160} />
    </Backdrop>
  );
};

// ---------- finish: take it apart and the effect is gone ----------
const Finish: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const apart = ramp(t, m.apart, 1.2, easeInOut);
  const gone = ramp(t, m.gone, 1.0, easeInOut);
  const h = 300 * lerp(1.63, 1.0, gone);
  return (
    <Backdrop>
      <Svg>
        <Box x={300} y={540} s={0.9} built={1 - apart} />
        <rect x={210} y={1020 - h} width={180} height={h} rx={12} fill={C.orange} />
        <rect x={680} y={1020 - 300} width={180} height={300} rx={12} fill="#8A8F99" />
      </Svg>
      <Tag text="+63%" x={300} y={1020 - h - 50} size={56} weight={900} color={C.orange} opacity={1 - gone} width={260} />
      <Tag text="քանդված կամ կիսատ" x={300} y={1060} size={28} color={C.orange} opacity={ramp(t, m.apart, 0.4)} width={360} />
      <Tag text="պատրաստի" x={770} y={1060} size={28} color={C.dim} width={300} />
    </Backdrop>
  );
};

// ---------- why: it becomes a bit of you ----------
const Why: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const words = [{ w: "ջանք", t0: m.done }, { w: "կարողացա", t0: m.done + 0.6 }, { w: "իմն է", t0: m.part }];
  const fade = ramp(t, m.yours, 0.5);
  return (
    <Backdrop>
      <Svg><Box x={504} y={700} s={1.3} initials={ramp(t, m.part, 0.5)} glow={ramp(t, m.yours, 0.5)} /></Svg>
      {words.map((w, i) => (
        <Tag key={i} text={w.w} x={[250, 760, 504][i]} y={[420, 420, 330][i] - 10 * Math.sin(t * 2 + i)} size={i === 2 ? 52 : 38} color={i === 2 ? C.orange : C.dim} opacity={ramp(t, w.t0, 0.4) * (i < 2 ? 1 - fade : 1)} width={340} />
      ))}
      <SourceLine text="Sarstedt, Neubert & Barth, 2017 (Մյունխեն)" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- trap: the same pattern elsewhere, not measured ----------
const Trap: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const v = [ramp(t, m.biz, 0.4), ramp(t, m.code, 0.4), ramp(t, m.fence, 0.4)];
  const tag = (i: number) => 40 + 70 * ramp(t, [m.biz, m.code, m.fence][i] + 0.3, 1.2, easeInOut);
  const q = ramp(t, m.notMeasured, 0.4);
  return (
    <Backdrop>
      <Svg>
        <g opacity={v[0]}>
          <rect x={90} y={300} width={360} height={220} rx={14} fill="#F4F1EA" />
          <rect x={120} y={340} width={140} height={20} rx={6} fill="#4A90E2" />
          {[0, 1, 2].map((i) => <rect key={i} x={120 + i * 90} y={470 - [60, 100, 150][i]} width={60} height={[60, 100, 150][i]} fill={C.orange} />)}
          <PriceTag x={500} y={520} h={tag(0)} />
        </g>
        <g opacity={v[1]}>
          <rect x={590} y={300} width={400} height={240} rx={14} fill="#1B1E25" stroke="#3A3F48" strokeWidth={3} />
          {Array.from({ length: 7 }, (_, i) => <rect key={i} x={620 + (i % 3) * 20} y={330 + i * 28} width={120 + random(`code-${i}`) * 180} height={12} rx={6} fill={["#6FA8FF", "#3DAA55", "#F2A800"][i % 3]} opacity={0.8} />)}
          <PriceTag x={950} y={700} h={tag(1)} />
        </g>
        <g opacity={v[2]}>
          {Array.from({ length: 9 }, (_, i) => <rect key={i} x={160 + i * 64} y={760 + (i % 3) * 6} width={26} height={180 - (i % 4) * 12} fill="#8A6A40" transform={`rotate(${(i % 3) * 5 - 5} ${173 + i * 64} 940)`} />)}
          <rect x={140} y={820} width={600} height={14} fill="#8A6A40" transform="rotate(3 440 827)" />
          <circle cx={820} cy={800} r={36} fill="#D9A57A" />
          <path d="M 770 940 Q 772 850 820 846 Q 868 850 870 940 Z" fill="#5A6E8A" />
          <PriceTag x={930} y={1000} h={tag(2)} />
        </g>
      </Svg>
      {[[500, 300], [950, 480], [930, 760]].map(([x, y], i) => <Tag key={i} text="?" x={x + 50} y={y - 20} size={56} weight={900} color={C.orange} opacity={q} width={80} />)}
      <Tag text="չափված չէ" x={504} y={1060} size={34} color={C.orange} opacity={q} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Svg>
        <Box x={330} y={760} s={1} glow={0.6 + 0.4 * Math.sin(t * 3)} />
        <circle cx={790} cy={640} r={50} fill="#D9A57A" opacity={ramp(t, m.ask, 0.5)} />
        <path d="M 720 820 Q 724 700 790 696 Q 856 700 860 820 Z" fill="#4A90E2" opacity={ramp(t, m.ask, 0.5)} />
        <PriceTag x={790} y={980} h={lerp(0, 90, ramp(t, m.pay, 1.0, easeInOut))} color="#6FA8FF" />
      </Svg>
      <Title text={<>Հարցրու մեկին, <span style={{ color: C.orange }}>ով այն չի սարքել</span></>} on={ramp(t, 0.3, 0.6)} y={260} size={54} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ money: at("hook", "չափել") }} /> },
  { keys: ["boxes"], render: () => <Boxes m={{ built: at("boxes", "հավաքեց"), ready: at("boxes", "հավաքված"), asked: at("boxes", "հարցրին"), pct: at("boxes", "63") }} /> },
  { keys: ["origami"], render: () => <Origami m={{ origami: at("origami", "օրիգամիով"), makers: at("origami", "Սկսնակներն"), others: at("origami", "կողքից") }} /> },
  { keys: ["finish"], render: () => <Finish m={{ apart: at("finish", "քանդում"), gone: at("finish", "անհետանում") }} /> },
  { keys: ["why"], render: () => <Why m={{ done: at("why", "Ավարտած"), part: at("why", "մասը"), yours: at("why", "այլ", 1) }} /> },
  { keys: ["trap"], render: () => <Trap m={{ biz: at("trap", "բիզնես"), code: at("trap", "կոդում"), fence: at("trap", "ցանկապատում"), notMeasured: at("trap", "չափված") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway m={{ ask: at("takeaway", "հարցրու"), pay: at("takeaway", "վճարեր") }} /> },
];

export const IkeaEffect: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * IKEA_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * IKEA_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`ikea_effect/${S.audio}`)} />
  </AbsoluteFill>
);
