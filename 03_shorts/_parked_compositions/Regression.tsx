// "Regression to the mean: why scolding seems to work" (9:16 Short, draft for review; DECISIONS #28).
// The histogram is regression/simulate.py's 1,000 simulated students (seed 509; copied to data/regression_sim.json):
// top 50 of test 1 go 92 -> 82, bottom 50 go 47 -> 59, top 50 of test 2 go back 93 -> 81. The dots are drawn as one
// SVG path per colour (not 1,000 elements), which keeps the render fast.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import TL from "../data/regression.json";
import SIM from "../data/regression_sim.json";
import { C, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { Card, SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "regression", "portrait");
export const REG_FPS = 30;
const TAIL_S = 1.2;
export const REG_FRAMES = Math.ceil((S.duration + TAIL_S) * REG_FPS);
const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);

// ---------- the histogram ----------
type St = { t1: number; t2: number; tag: string; top2: boolean };
const ST = (SIM as { students: St[] }).students;
const SUM = (SIM as { summary: Record<string, number> }).summary;
const LO = 28, HI = 115, X0 = 90, X1 = 990, BASE = 1000, BIN = 2, R = 4.6, PITCH = 9.6;
const xOf = (v: number) => X0 + ((v - LO) / (HI - LO)) * (X1 - X0);
// stack each test into bins of 2 points, two dots side by side per bin
const slots = (key: "t1" | "t2") => {
  const counts = new Map<number, number>();
  return ST.map((s) => {
    const b = Math.floor(s[key] / BIN);
    const k = counts.get(b) ?? 0;
    counts.set(b, k + 1);
    const bx = xOf(b * BIN + BIN / 2);
    return { x: bx + (k % 2 ? 5 : -5), y: BASE - R - Math.floor(k / 2) * PITCH };
  });
};
const P1 = slots("t1"), P2 = slots("t2");
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const circlePath = (pts: { x: number; y: number }[]) => pts.map((p) => `M ${(p.x - R).toFixed(1)} ${p.y.toFixed(1)} a ${R} ${R} 0 1 0 ${2 * R} 0 a ${R} ${R} 0 1 0 ${-2 * R} 0`).join(" ");

// k: 0 = test 1 layout, 1 = test 2 layout; groups get colours
const Histogram: React.FC<{ k: number; groups: { pick: (s: St) => boolean; color: string; on: number }[]; drop?: number; opacity?: number; label?: number }> = ({ k, groups, drop = 1, opacity = 1, label = 1 }) => {
  const pos = ST.map((_, i) => {
    const p = { x: lerp(P1[i].x, P2[i].x, k), y: lerp(P1[i].y, P2[i].y, k) };
    return { x: p.x, y: lerp(BASE - 700 - (i % 37) * 9, p.y, Math.min(1, Math.max(0, drop * 1.6 - (i % 50) / 80))) };
  });
  const inGroup = ST.map((s) => groups.findIndex((g) => g.on > 0 && g.pick(s)));
  return (
    <>
      <Svg opacity={opacity}>
        <line x1={X0 - 10} y1={BASE + 6} x2={X1 + 10} y2={BASE + 6} stroke={C.dim} strokeWidth={3} />
        {[40, 60, 80, 100].map((v) => <text key={v} x={xOf(v)} y={BASE + 42} textAnchor="middle" fontSize={24} fill={C.dim} fontFamily="sans-serif">{v}</text>)}
        <path d={circlePath(pos.filter((_, i) => inGroup[i] < 0))} fill="#5A606A" />
        {groups.map((g, gi) => <path key={gi} d={circlePath(pos.filter((_, i) => inGroup[i] === gi))} fill={g.color} opacity={g.on} />)}
      </Svg>
      <Tag text={k < 0.5 ? "1-ին քննություն" : "2-րդ քննություն"} x={540} y={BASE + 90} size={30} color={C.dim} opacity={opacity * label} width={400} />
    </>
  );
};
const Marker: React.FC<{ v: number; color: string; on: number; y?: number }> = ({ v, color, on, y = 420 }) => (
  <>
    <Svg opacity={on}>
      <line x1={xOf(v)} y1={y + 30} x2={xOf(v)} y2={BASE} stroke={color} strokeWidth={4} strokeDasharray="10 8" />
    </Svg>
    <Tag text={String(Math.round(v))} x={xOf(v)} y={y} size={52} weight={900} color={color} opacity={on} width={160} />
  </>
);

// ---------- hook ----------
const Hook: React.FC = () => {
  const t = useT();
  const arrowA = ramp(t, 1.0, 0.8, easeInOut), arrowB = ramp(t, 2.6, 0.8, easeInOut);
  return (
    <Backdrop>
      <Title text={<>Նախատինքն ավելի <span style={{ color: C.orange }}>արդյունավե՞տ է</span></>} on={1} y={220} size={54} />
      <Tag text="👍" x={290} y={560} size={150} width={260} />
      <Tag text="😠" x={760} y={560} size={150} width={260} />
      <Svg>
        <path d={`M 290 700 L 290 ${lerp(700, 960, arrowA)}`} stroke={C.red} strokeWidth={14} strokeLinecap="round" />
        <path d={`M 250 ${lerp(700, 960, arrowA) - 30} L 290 ${lerp(700, 960, arrowA) + 10} L 330 ${lerp(700, 960, arrowA) - 30}`} stroke={C.red} strokeWidth={14} fill="none" strokeLinecap="round" opacity={arrowA} />
        <path d={`M 760 960 L 760 ${lerp(960, 700, arrowB)}`} stroke={C.green} strokeWidth={14} strokeLinecap="round" />
        <path d={`M 720 ${lerp(960, 700, arrowB) + 30} L 760 ${lerp(960, 700, arrowB) - 10} L 800 ${lerp(960, 700, arrowB) + 30}`} stroke={C.green} strokeWidth={14} fill="none" strokeLinecap="round" opacity={arrowB} />
      </Svg>
    </Backdrop>
  );
};

// ---------- kahneman: the instructor's story ----------
const loopPath = (wobble: number, t: number) => Array.from({ length: 61 }, (_, i) => {
  const a = (i / 60) * 2 * Math.PI;
  const w = wobble * 18 * Math.sin(a * 5 + t);
  return `${i ? "L" : "M"} ${(504 + (150 + w) * Math.sin(a)).toFixed(1)} ${(640 - (110 + w) * Math.cos(a) + 110).toFixed(1)}`;
}).join(" ");
const Kahneman: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const story = ramp(t, m.objected, 0.5);
  const bad = ramp(t, m.shout, 0.5);
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 230, top: 300, width: 548, padding: "14px 0", borderRadius: 16, background: C.panel, border: `2px solid ${C.orange}`, textAlign: "center", fontFamily: "NotoArm, sans-serif", fontSize: 42, fontWeight: 800, color: C.ink, opacity: 1 - story }}>Դանիել Քանեման</div>
      <Tag text="«գովասանքն ավելի արդյունավետ է»" x={504} y={460} size={34} color={C.dim} opacity={ramp(t, m.praise, 0.5) * (1 - story)} />
      <Svg opacity={story}>
        <path d={loopPath(bad, t * 3)} stroke={bad > 0.5 ? C.red : C.green} strokeWidth={5} fill="none" strokeDasharray="12 8" />
      </Svg>
      <Tag text={bad > 0.5 ? "😠" : "👍"} x={840} y={480} size={90} opacity={story} width={160} />
      <Tag text="✈" x={504 + 150 * Math.sin(t * 2)} y={750 - 110 * Math.cos(t * 2)} size={60} opacity={story} width={100} />
      <SourceLine text="Kahneman, 1960-ականներ" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- right: noticed right, explained wrong ----------
const Right: React.FC = () => {
  const t = useT();
  return (
    <Backdrop>
      <Card text="նկատել՝ ✓" x={250} y={420} w={508} on={pop(t, 0.3)} color={C.green} size={52} />
      <Card text="բացատրել՝ ✗" x={250} y={640} w={508} on={pop(t, 1.4)} color={C.red} size={52} />
    </Backdrop>
  );
};

// ---------- luck: skill stays, luck does not ----------
const Luck: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const next = ramp(t, m.next, 0.6, easeInOut);
  const flicker = 0.75 + 0.25 * Math.sin(t * 13);
  const luck1 = 200, luck2 = 60;
  return (
    <Backdrop>
      {[0, 1].map((row) => {
        const y = 440 + row * 260;
        const luck = row === 0 ? luck1 : lerp(luck1, luck2, next);
        const on = row === 0 ? ramp(t, m.skill, 0.5) : ramp(t, m.next, 0.4);
        return (
          <React.Fragment key={row}>
            <Svg opacity={on}>
              <rect x={150} y={y} width={420} height={90} rx={12} fill="#4A90E2" />
              <rect x={574} y={y} width={luck} height={90} rx={12} fill={C.orange} opacity={flicker} />
            </Svg>
            <Tag text={row === 0 ? "շատ լավ թռիչք" : "հաջորդը"} x={504} y={y - 36} size={30} color={C.dim} opacity={on} />
          </React.Fragment>
        );
      })}
      <Tag text="հմտություն" x={360} y={1010} size={34} color="#7FB2F0" opacity={ramp(t, m.skill, 0.5)} width={360} />
      <Tag text="բախտ" x={700} y={1010} size={34} color={C.orange} opacity={ramp(t, m.luck, 0.5)} width={300} />
    </Backdrop>
  );
};

// ---------- setup .. reverse: one histogram ----------
const top1 = (s: St) => s.tag === "top1";
const bot1 = (s: St) => s.tag === "bot1";
const top2 = (s: St) => s.top2;
const Sim: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const drop = ramp(t, m.n, 2.0, easeInOut);
  // layout: test 1 -> test 2 (top), back to 1 then 2 (bottom), stay on 2 then back to 1 (reverse)
  let k = 0;
  if (t < m.bottom) k = ramp(t, m.second, 1.6, easeInOut);
  else if (t < m.rev) k = lerp(1 - ramp(t, m.bottom, 0.8, easeInOut), 1, ramp(t, m.botRise, 1.6, easeInOut));
  else k = 1 - ramp(t, m.revBack, 1.8, easeInOut);
  const topOn = ramp(t, m.top, 0.4) * (1 - ramp(t, m.bottom, 0.4));
  const botOn = ramp(t, m.bottom + 0.4, 0.4) * (1 - ramp(t, m.rev, 0.4));
  const revOn = ramp(t, m.revPick, 0.4);
  const m1 = mean(ST.filter(top1).map((s) => s.t1)), m2 = mean(ST.filter(top1).map((s) => s.t2));
  const b1 = mean(ST.filter(bot1).map((s) => s.t1)), b2 = mean(ST.filter(bot1).map((s) => s.t2));
  const r2 = mean(ST.filter(top2).map((s) => s.t2)), r1 = mean(ST.filter(top2).map((s) => s.t1));
  return (
    <Backdrop>
      <Histogram k={k} drop={drop} groups={[{ pick: top1, color: C.orange, on: topOn }, { pick: bot1, color: C.red, on: botOn }, { pick: top2, color: "#6FA8FF", on: revOn }]} />
      <Marker v={lerp(m1, m2, k)} color={C.orange} on={topOn} />
      <Marker v={lerp(b1, b2, k)} color="#FF6A70" on={botOn} />
      <Marker v={lerp(r1, r2, k)} color="#9EC3FF" on={revOn} />
      <Tag text="1000 ուսանող" x={504} y={250} size={44} opacity={ramp(t, m.n, 0.4) * (1 - ramp(t, m.top, 0.4))} />
      <div style={{ position: "absolute", right: 70, top: 300, padding: "6px 14px", borderRadius: 12, background: "rgba(14,15,18,0.8)", color: C.dim, fontFamily: "NotoArm, sans-serif", fontSize: 24, fontWeight: 700 }}>մոդելավորում</div>
      <Tag text="ռեգրեսիա դեպի միջինը" x={504} y={250} size={44} color="#9EC3FF" opacity={ramp(t, m.name, 0.5)} />
    </Backdrop>
  );
};

// ---------- praise: twelve flights around the average ----------
const FLIGHTS = [52, 70, 86, 61, 47, 33, 50, 58, 79, 64, 30, 46];
const Praise: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const draw = ramp(t, 0.3, 2.0, easeInOut);
  const pr = ramp(t, m.praise, 0.4), sc = ramp(t, m.scold, 0.4);
  const px = (i: number) => 120 + i * 76, py = (v: number) => 900 - v * 6;
  const peaks = [2, 8], dips = [5, 10];
  return (
    <Backdrop>
      <Svg>
        <line x1={100} x2={980} y1={py(55)} y2={py(55)} stroke={C.dim} strokeWidth={3} strokeDasharray="10 8" />
        <path d={FLIGHTS.map((v, i) => `${i ? "L" : "M"} ${px(i)} ${py(v)}`).join(" ")} stroke="#5A606A" strokeWidth={4} fill="none" opacity={draw} />
        {FLIGHTS.map((v, i) => <circle key={i} cx={px(i)} cy={py(v)} r={14} fill={peaks.includes(i) ? C.green : dips.includes(i) ? C.red : C.ink} opacity={ramp(t, 0.3 + i * 0.15, 0.3)} />)}
        {peaks.map((i) => <path key={i} d={`M ${px(i) + 10} ${py(FLIGHTS[i]) + 20} L ${px(i + 1) - 10} ${py(FLIGHTS[i + 1]) - 10}`} stroke={C.red} strokeWidth={6} opacity={pr} />)}
        {dips.map((i) => <path key={i} d={`M ${px(i) + 10} ${py(FLIGHTS[i]) - 20} L ${px(i + 1) - 10} ${py(FLIGHTS[i + 1]) + 10}`} stroke={C.green} strokeWidth={6} opacity={sc} />)}
      </Svg>
      {peaks.map((i) => <Tag key={i} text="👍" x={px(i)} y={py(FLIGHTS[i]) - 60} size={56} opacity={pr} width={100} />)}
      {dips.map((i) => <Tag key={i} text="😠" x={px(i)} y={py(FLIGHTS[i]) + 64} size={56} opacity={sc} width={100} />)}
      <Tag text="միջին" x={1010} y={py(55) - 30} size={26} color={C.dim} width={120} />
    </Backdrop>
  );
};

// ---------- check: the randomized comparison ----------
const Check: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const groups = ramp(t, m.groups, 0.5);
  const coin = ramp(t, m.random, 0.6);
  const drift = ramp(t, m.diff, 2.0, easeInOut);
  const gap = ramp(t, m.diff + 1.6, 0.5);
  const yA = lerp(820, 640, drift), yB = lerp(820, 600, drift);
  return (
    <Backdrop>
      <Svg opacity={groups}>
        <line x1={120} x2={960} y1={560} y2={560} stroke={C.dim} strokeWidth={3} strokeDasharray="10 8" />
        {Array.from({ length: 6 }, (_, i) => <circle key={`a${i}`} cx={180 + i * 50} cy={yA + (i % 2) * 14} r={16} fill="#5A606A" />)}
        {Array.from({ length: 6 }, (_, i) => <circle key={`b${i}`} cx={620 + i * 50} cy={yB + (i % 2) * 14} r={16} fill={coin > 0.5 ? C.orange : "#5A606A"} />)}
        <g opacity={coin * (1 - drift)} transform={`translate(504 400) scale(${Math.abs(Math.cos(t * 9))} 1)`}>
          <circle r={48} fill="#D9A520" />
        </g>
        {gap > 0 ? <path d={`M 520 ${yA + 7} L 520 ${yB + 7}`} stroke={C.ink} strokeWidth={5} opacity={gap} /> : null}
      </Svg>
      <Tag text="առանց գովասանքի" x={305} y={940} size={28} color={C.dim} opacity={groups} width={340} />
      <Tag text="գովասանքով" x={745} y={940} size={28} color={C.orange} opacity={groups * coin} width={340} />
      <Tag text="միջին" x={1010} y={530} size={26} color={C.dim} opacity={groups} width={120} />
      <Tag text="այս տարբերությունն է ազդեցությունը" x={504} y={1040} size={32} color={C.orange} opacity={gap} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Histogram k={0} groups={[]} opacity={0.35} label={0} />
      <Title text={<>Իսկ առանց դրանց <span style={{ color: C.orange }}>ի՞նչ կլիներ</span></>} on={ramp(t, 0.3, 0.6)} y={300} size={60} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook /> },
  { keys: ["kahneman"], render: () => <Kahneman m={{ praise: at("kahneman", "գովասանքն"), objected: at("kahneman", "առարկեց"), shout: at("kahneman", "գոռում") }} /> },
  { keys: ["right"], render: () => <Right /> },
  { keys: ["luck"], render: () => <Luck m={{ skill: at("luck", "հմտությունից"), luck: at("luck", "բախտից"), next: at("luck", "Հաջորդ") }} /> },
  { keys: ["setup", "top", "bottom", "reverse"], render: () => {
    const g0 = S.beat("setup").start;
    const r = (k: string, w: string, nth?: number) => rel(g0, S.at(k, w, nth));
    return <Sim m={{
      n: r("setup", "1000"), top: r("top", "Առաջին"), second: r("top", "Երկրորդ"),
      bottom: rel(g0, S.beat("bottom").start), botRise: r("bottom", "բարձրացավ"),
      rev: rel(g0, S.beat("reverse").start), revPick: r("reverse", "ընտրենք"), revBack: r("reverse", "առաջին", 0), name: r("reverse", "ռեգրեսիա"),
    }} />;
  } },
  { keys: ["praise"], render: () => <Praise m={{ praise: at("praise", "Գովասանքը"), scold: at("praise", "Նախատինքը") }} /> },
  { keys: ["check"], render: () => <Check m={{ groups: at("check", "կուրսանտներ"), random: at("check", "պատահական"), diff: at("check", "Խմբերի") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const Regression: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * REG_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * REG_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`regression/${S.audio}`)} />
  </AbsoluteFill>
);
