// "Simpson's paradox: better in every group, worse overall" (9:16 Short, draft for review; DECISIONS #28).
// Kidney stones, Charig et al. 1986: A (open surgery) small 81/87, large 192/263 = 273/350; B (keyhole) small 234/270,
// large 55/80 = 289/350. Berkeley 1973, six largest departments, as 100-person crowds: men 51 easy (A, B) / 49 hard,
// admitted 32 + 13 = 45; women 7 easy / 93 hard, admitted 6 + 25 = 31 (the published 44.5% vs 30.4%). Dots are one
// SVG path per colour, so 700 dots stay fast to render.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import TL from "../data/simpson.json";
import { C, FONT, easeInOut, lerp, pop, ramp, shuffled } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { Card, SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "simpson", "portrait");
export const SIMP_FPS = 30;
const TAIL_S = 1.2;
export const SIMP_FRAMES = Math.ceil((S.duration + TAIL_S) * SIMP_FPS);
const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);

type P = { small: boolean; ok: boolean };
const people = (smallOk: number, small: number, largeOk: number, large: number): P[] => [
  ...Array.from({ length: small }, (_, i) => ({ small: true, ok: i < smallOk })),
  ...Array.from({ length: large }, (_, i) => ({ small: false, ok: i < largeOk })),
];
const A = people(81, 87, 192, 263), B = people(234, 270, 55, 80);
const R = 9, PITCH = 23, COLS = 18;
// mixed layout: a seeded shuffle; banded layout: small stones on top (successes first), large below
const layouts = (ps: P[], x0: number, seed: string) => {
  const order = shuffled(ps.map((_, i) => i), seed);
  const mixed = new Array<{ x: number; y: number }>(ps.length);
  order.forEach((pi, slot) => { mixed[pi] = { x: x0 + (slot % COLS) * PITCH, y: 340 + Math.floor(slot / COLS) * PITCH }; });
  const banded = new Array<{ x: number; y: number }>(ps.length);
  const smalls = ps.map((p, i) => i).filter((i) => ps[i].small).sort((a, b) => Number(ps[b].ok) - Number(ps[a].ok));
  const larges = ps.map((p, i) => i).filter((i) => !ps[i].small).sort((a, b) => Number(ps[b].ok) - Number(ps[a].ok));
  smalls.forEach((pi, k) => { banded[pi] = { x: x0 + (k % COLS) * PITCH, y: 340 + Math.floor(k / COLS) * PITCH }; });
  const smallRows = Math.ceil(smalls.length / COLS);
  larges.forEach((pi, k) => { banded[pi] = { x: x0 + (k % COLS) * PITCH, y: 340 + (smallRows + 1) * PITCH + Math.floor(k / COLS) * PITCH }; });
  return { mixed, banded, smallRows };
};
const LA = layouts(A, 70, "simp-a"), LB = layouts(B, 616, "simp-b");
const dotPath = (pts: { x: number; y: number }[]) => pts.map((p) => `M ${(p.x - R).toFixed(1)} ${p.y.toFixed(1)} a ${R} ${R} 0 1 0 ${2 * R} 0 a ${R} ${R} 0 1 0 ${-2 * R} 0`).join(" ");
const OK_C = "#F4EAD5", BAD_C = "#E8383D", LARGE_C = "#C2671B", SMALL_C = "#F2D7A8";

// one crowd: k = mixed -> banded; colour by outcome or by stone size; highlight small / large bands
const Crowd: React.FC<{ ps: P[]; L: ReturnType<typeof layouts>; k: number; colored: number; bySize: number; hiSmall: number; hiLarge: number }> = ({ ps, L, k, colored, bySize, hiSmall, hiLarge }) => {
  const pos = ps.map((_, i) => ({ x: lerp(L.mixed[i].x, L.banded[i].x, k), y: lerp(L.mixed[i].y, L.banded[i].y, k) }));
  const dim = (p: P) => 1 - 0.75 * Math.max(p.small ? hiLarge : 0, p.small ? 0 : hiSmall);
  const groups = [
    { f: (p: P) => p.small && p.ok }, { f: (p: P) => p.small && !p.ok }, { f: (p: P) => !p.small && p.ok }, { f: (p: P) => !p.small && !p.ok },
  ];
  return (
    <>
      {groups.map((g, gi) => {
        const idx = ps.map((p, i) => i).filter((i) => g.f(ps[i]));
        const p0 = ps[idx[0]];
        const outcome = p0.ok ? OK_C : BAD_C;
        const size = p0.small ? SMALL_C : LARGE_C;
        const fill = bySize > 0.5 ? size : colored > 0.5 ? outcome : "#5A606A";
        return <path key={gi} d={dotPath(idx.map((i) => pos[i]))} fill={fill} opacity={dim(p0)} />;
      })}
    </>
  );
};

// ---------- hook + twist ----------
const Hook: React.FC<{ m: Record<string, number>; twist?: boolean }> = ({ m, twist = false }) => {
  const t = useT();
  const badges = twist ? ramp(t, m.small, 0.4) : 0;
  const badges2 = twist ? ramp(t, m.large, 0.4) : 0;
  const bGlow = twist ? 1 - ramp(t, m.small, 0.6) : 1;
  const title = twist ? ramp(t, m.name, 0.5) : 0;
  return (
    <Backdrop>
      <Card text={<div style={{ textAlign: "center", fontSize: 110, fontWeight: 900 }}>Ա<br /><span style={{ fontSize: 96 }}>78%</span></div>} x={110} y={320} w={380} on={1} color="#5A606A" />
      <div style={{ filter: `drop-shadow(0 0 ${30 * bGlow}px rgba(242,168,0,0.7))` }}>
        <Card text={<div style={{ textAlign: "center", fontSize: 110, fontWeight: 900 }}>Բ<br /><span style={{ fontSize: 96, color: C.orange }}>83%</span></div>} x={590} y={320} w={380} on={1} />
      </div>
      <Tag text="փոքր քարեր ✓" x={300} y={760} size={34} color={C.green} opacity={badges} width={380} />
      <Tag text="մեծ քարեր ✓" x={300} y={830} size={34} color={C.green} opacity={badges2} width={380} />
      <Title text={<span style={{ color: C.orange }}>Սիմպսոնի պարադոքս</span>} on={title} y={960} size={56} />
      {!twist ? <Tag text="?" x={540} y={820} size={120} weight={900} color={C.orange} opacity={ramp(t, m.which, 0.4)} width={200} /> : null}
    </Backdrop>
  );
};

// ---------- study: the two methods ----------
const Study: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Svg>
        <g opacity={ramp(t, m.open, 0.5)}>
          <rect x={120} y={380} width={360} height={260} rx={30} fill="#E8C4A8" />
          <line x1={170} y1={510} x2={430} y2={510} stroke={C.red} strokeWidth={10} strokeLinecap="round" />
        </g>
        <g opacity={ramp(t, m.hole, 0.5)}>
          <rect x={600} y={380} width={360} height={260} rx={30} fill="#E8C4A8" />
          <circle cx={780} cy={510} r={14} fill={C.red} />
        </g>
      </Svg>
      <Tag text="Ա՝ բաց վիրահատություն" x={300} y={700} size={30} opacity={ramp(t, m.open, 0.5)} width={420} />
      <Tag text="Բ՝ փոքր անցքով" x={780} y={700} size={30} opacity={ramp(t, m.hole, 0.5)} width={420} />
      <Tag text="350 + 350" x={540} y={880} size={60} weight={900} color={C.orange} opacity={ramp(t, m.n, 0.5)} />
      <SourceLine text="Charig et al., BMJ, 1986" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- crowd .. weighted: the two crowds ----------
const Crowds: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const colored = ramp(t, m.outcome, 0.4);
  const k = ramp(t, m.split, 1.4, easeInOut);
  const hiS = ramp(t, m.small, 0.4) * (1 - ramp(t, m.large, 0.4));
  const hiL = ramp(t, m.large, 0.4) * (1 - ramp(t, m.why, 0.4));
  const bySize = ramp(t, m.why + 1.2, 0.4);
  const card = ramp(t, m.weighted, 0.5);
  const yBand = (L: ReturnType<typeof layouts>, small: boolean) => small ? 340 + (L.smallRows * PITCH) / 2 - 10 : 340 + (L.smallRows + 1) * PITCH + 60;
  const lab = (on: number, x: number, y: number, txt: string, color: string) => <Tag text={txt} x={x} y={y} size={30} weight={800} color={color} opacity={on} width={420} />;
  return (
    <Backdrop>
      <Svg opacity={1 - 0.8 * card}>
        <Crowd ps={A} L={LA} k={k} colored={colored} bySize={bySize} hiSmall={hiS} hiLarge={hiL} />
        <Crowd ps={B} L={LB} k={k} colored={colored} bySize={bySize} hiSmall={hiS} hiLarge={hiL} />
      </Svg>
      <Tag text="Ա" x={270} y={290} size={40} opacity={1 - card} width={100} />
      <Tag text="Բ" x={816} y={290} size={40} opacity={1 - card} width={100} />
      {lab(colored * (1 - k) * (1 - card), 270, 1000, "273 / 350 = 78%", C.ink)}
      {lab(colored * (1 - k) * (1 - card), 816, 1000, "289 / 350 = 83%", C.orange)}
      {lab(hiS, 270, yBand(LA, true), "81 / 87 = 93% ✓", C.green)}
      {lab(hiS, 816, yBand(LB, true), "234 / 270 = 87%", C.ink)}
      {lab(hiL, 270, yBand(LA, false), "192 / 263 = 73% ✓", C.green)}
      {lab(hiL, 816, yBand(LB, false), "55 / 80 = 69%", C.ink)}
      {lab(bySize * (1 - card), 270, 1000, "դժվար դեպքեր", LARGE_C)}
      {card > 0 ? (
        <div style={{ position: "absolute", left: 70, top: 380, width: 940, opacity: card, fontFamily: FONT, color: C.ink }}>
          <div style={{ fontSize: 34, fontWeight: 800, textAlign: "center", color: C.orange, marginBottom: 24 }}>կշռավորված միջին</div>
          <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Ա՝ (81 + 192) / (87 + 263) = 273 / 350</div>
          <div style={{ display: "flex", height: 40, marginBottom: 40 }}><div style={{ width: `${(87 / 350) * 100}%`, background: SMALL_C }} /><div style={{ flex: 1, background: LARGE_C }} /></div>
          <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Բ՝ (234 + 55) / (270 + 80) = 289 / 350</div>
          <div style={{ display: "flex", height: 40 }}><div style={{ width: `${(270 / 350) * 100}%`, background: SMALL_C }} /><div style={{ flex: 1, background: LARGE_C }} /></div>
        </div>
      ) : null}
    </Backdrop>
  );
};

// ---------- berkeley: 100 men, 100 women ----------
const crowd100 = (easy: number, easyIn: number, hardIn: number) => Array.from({ length: 100 }, (_, i) => ({ easy: i < easy, inn: i < easy ? i < easyIn : i - easy < hardIn }));
const MEN = crowd100(51, 32, 13), WOMEN = crowd100(7, 6, 25);
const Berkeley: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const split = ramp(t, m.four, 1.0, easeInOut);
  const lit = ramp(t, m.rates, 0.5);
  const draw = (ps: typeof MEN, x0: number) => ps.map((p, i) => {
    const row = Math.floor(i / 10), col = i % 10;
    const y = 360 + row * 40 + (p.easy ? 0 : 40 * split);
    return <circle key={i} cx={x0 + col * 40} cy={y} r={15} fill={p.inn ? (p.easy ? "#6FC3FF" : C.orange) : "#3A3F48"} opacity={p.inn ? 0.35 + 0.65 * lit : 1} />;
  });
  return (
    <Backdrop>
      <Svg>{draw(MEN, 110)}{draw(WOMEN, 610)}</Svg>
      <Tag text="տղամարդիկ՝ 44,5%" x={290} y={300} size={32} opacity={ramp(t, m.men, 0.4)} width={440} />
      <Tag text="կանայք՝ 30,4%" x={790} y={300} size={32} opacity={ramp(t, m.women, 0.4)} width={440} />
      <Tag text="կապույտ՝ «հեշտ» ֆակուլտետներ" x={540} y={1000} size={28} color="#6FC3FF" opacity={split} width={700} />
      <Tag text="նարնջագույն՝ «դժվար» ֆակուլտետներ" x={540} y={1050} size={28} color={C.orange} opacity={split} width={700} />
      <SourceLine text="Bickel et al., Science, 1975: 1973, վեց խոշոր ֆակուլտետ" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- rule ----------
const Rule: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Card text="քարի չափ → ընտրություն" x={140} y={330} w={800} on={pop(t, m.size)} />
      <Card text="քարի չափ → արդյունք" x={140} y={490} w={800} on={pop(t, m.size + 0.6)} />
      <Card text="համեմատիր նմանը նմանի հետ" x={140} y={680} w={800} on={pop(t, m.honest)} color={C.green} />
      <Tag text="բայց պատահական բաժանում չի եղել" x={540} y={920} size={30} color={C.dim} opacity={ramp(t, m.random, 0.4)} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Svg opacity={0.3}>
        <Crowd ps={A} L={LA} k={0} colored={1} bySize={0} hiSmall={0} hiLarge={0} />
        <Crowd ps={B} L={LB} k={0} colored={1} bySize={0} hiSmall={0} hiLarge={0} />
      </Svg>
      <Title text={<>Ինչո՞վ են <span style={{ color: C.orange }}>տարբերվում խմբերը</span></>} on={ramp(t, 0.3, 0.6)} y={560} size={60} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ which: at("hook", "Ո՞րը") }} /> },
  { keys: ["twist"], render: () => <Hook twist m={{ small: at("twist", "փոքր"), large: at("twist", "մեծ"), name: at("twist", "Սիմպսոնի") }} /> },
  { keys: ["study"], render: () => <Study m={{ open: at("study", "բաց"), hole: at("study", "մաշկի"), n: at("study", "350") }} /> },
  { keys: ["crowd", "split", "small", "large", "why", "weighted"], render: () => {
    const g0 = S.beat("crowd").start;
    return <Crowds m={{
      outcome: rel(g0, S.at("crowd", "273")), split: rel(g0, S.beat("split").start), small: rel(g0, S.beat("small").start),
      large: rel(g0, S.beat("large").start), why: rel(g0, S.beat("why").start), weighted: rel(g0, S.beat("weighted").start),
    }} />;
  } },
  { keys: ["berkeley"], render: () => <Berkeley m={{ men: at("berkeley", "տղամարդ"), women: at("berkeley", "կին"), four: at("berkeley", "չորսում"), rates: at("berkeley", "Պարզվեց") }} /> },
  { keys: ["rule"], render: () => <Rule m={{ size: at("rule", "քարի"), honest: at("rule", "ազնիվ"), random: at("rule", "պատահական") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const Simpson: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * SIMP_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * SIMP_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`simpson/${S.audio}`)} />
  </AbsoluteFill>
);
