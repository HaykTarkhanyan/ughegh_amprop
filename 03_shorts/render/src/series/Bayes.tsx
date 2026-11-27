// "The 99% test" (9:16 Short, draft for review; DECISIONS #28). A crowd of 1,000 dots (40 x 25) with 10 sick
// people and 10 false positives at fixed places (seed 509), scanned, pulled out and counted; then a rarer disease,
// the retest with its independence condition, and the formula. Moments are tied to the narration's words.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import TL from "../data/bayes_test.json";
import { C, FONT, easeInOut, lerp, pop, ramp, shuffled } from "../theme";
import { Backdrop, CrossMark, Label } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";

const S = loadTimeline(TL, "bayes_test", "portrait");
export const BAYES_FPS = 30;
const TAIL_S = 1.2;
export const BAYES_FRAMES = Math.ceil((S.duration + TAIL_S) * BAYES_FPS);
const rel = (g0: number, x: number) => Math.max(0, x - g0);
const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

const GREY = "#5A606A";
const COLS = 40, CELL = 18, GX = 140, GY = 330;
const dotX = (i: number) => GX + (i % COLS) * CELL + CELL / 2;
const dotY = (i: number) => GY + Math.floor(i / COLS) * CELL + CELL / 2;
const ORDER = shuffled(Array.from({ length: 1000 }, (_, i) => i), "bayes-509");
const SICK = ORDER.slice(0, 10);
const FALSE_POS = ORDER.slice(10, 20);
const RARE_SICK = ORDER.slice(0, 1);
const RARE_FP = ORDER.slice(20, 30);

const Person: React.FC<{ x: number; y: number; color: string; ring: number; size?: number; opacity?: number }> = ({ x, y, color, ring, size = 58, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", left: x - size / 2, top: y - size / 2, opacity, overflow: "visible" }}>
    {ring > 0 ? <circle cx="50" cy="50" r="50" fill="none" stroke={C.orange} strokeWidth="7" opacity={ring} /> : null}
    <circle cx="50" cy="34" r="16" fill={color} />
    <path d="M 20 88 Q 50 50 80 88 Z" fill={color} />
  </svg>
);

// the 1,000-dot grid; each dot's colour / ring / offset comes from the caller
type DotState = { color: string; ring: number; dx?: number; dy?: number; opacity?: number };
const Grid: React.FC<{ fill: number; state: (i: number) => DotState; dim?: number }> = ({ fill, state, dim = 0 }) => (
  <svg width={1080} height={1100} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
    {Array.from({ length: 1000 }, (_, i) => {
      if (i / 1000 > fill) return null;
      const s = state(i);
      const x = dotX(i) + (s.dx ?? 0), y = dotY(i) + (s.dy ?? 0);
      const op = (s.opacity ?? 1) * (s.color === GREY ? 1 - 0.8 * dim : 1);
      return (
        <g key={i} opacity={op}>
          <circle cx={x} cy={y} r={7} fill={s.color} />
          {s.ring > 0 ? <circle cx={x} cy={y} r={9.5} fill="none" stroke={C.orange} strokeWidth="2.6" opacity={s.ring} /> : null}
        </g>
      );
    })}
  </svg>
);

const Big: React.FC<{ text: React.ReactNode; on: number; y: number; size?: number; color?: string }> = ({ text, on, y, size = 64, color = C.ink }) => (
  <div style={{ position: "absolute", left: 120, width: 768, top: y, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: 900, color, opacity: on, transform: `scale(${0.9 + 0.1 * on})`, lineHeight: 1.15 }}>{text}</div>
);
const Counter: React.FC<{ text: string; on: number; y?: number; color?: string }> = ({ text, on, y = 820, color = C.ink }) => (
  <Label text={text} x={504} y={y} size={40} color={color} weight={800} width={760} opacity={on} />
);

// ---------- scenes ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 120, width: 768, top: 320, textAlign: "center", fontFamily: FONT, fontSize: 150, fontWeight: 900, color: C.orange, opacity: ramp(t, 0.1, 0.4), transform: `scale(${Math.min(1, pop(t, 0.1, 9, 0.55))})` }}>99%</div>
      <div style={{ position: "absolute", left: 330, top: 540, width: 340, height: 230, borderRadius: 26, background: "#F4F1EA", boxShadow: "0 24px 60px rgba(0,0,0,0.5)", opacity: ramp(t, 0.6, 0.4), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: "#3A3F4B" }}>Արդյունք</div>
        <div style={{ fontFamily: FONT, fontSize: 120, fontWeight: 900, color: C.red, lineHeight: 1 }}>+</div>
      </div>
      <Big text={<>Իսկապե՞ս <span style={{ color: C.red }}>հիվանդ</span> ես</>} on={ramp(t, m.q, 0.5)} y={830} size={50} />
    </Backdrop>
  );
};

const Guess: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const cross = ramp(t, 0.6, 0.4);
  const docs = ramp(t, m.doctors, 0.4) * (1 - ramp(t, m.real - 0.2, 0.3));
  const lit = Math.round(34 * ramp(t, m.doctors + 1.6, 1.2, (x) => x));
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 120, width: 768, top: 300, textAlign: "center", fontFamily: FONT, fontSize: 110, fontWeight: 900, color: C.ink, opacity: 1 - 0.7 * ramp(t, m.real, 0.4) }}>
        99%?
        <div style={{ position: "absolute", left: 309, top: 0 }}><CrossMark size={150} progress={cross} /></div>
      </div>
      <div style={{ position: "absolute", left: 210, top: 500, width: 600, display: "grid", gridTemplateColumns: "repeat(16, 1fr)", gap: 6, opacity: docs }}>
        {Array.from({ length: 160 }, (_, i) => (
          <svg key={i} width="30" height="30" viewBox="0 0 100 100"><circle cx="50" cy="34" r="16" fill={i < lit ? C.orange : GREY} /><path d="M 20 88 Q 50 50 80 88 Z" fill={i < lit ? C.orange : GREY} /></svg>
        ))}
      </div>
      <Label text={`160 գինեկոլոգ՝ ճիշտ ${lit}-ը (21%)`} x={504} y={880} size={32} color={C.ink} weight={700} width={760} opacity={docs} />
      <div style={{ position: "absolute", left: 120, width: 768, top: 560, display: "flex", justifyContent: "center", gap: 90, fontFamily: FONT, fontSize: 100, fontWeight: 900, opacity: ramp(t, m.real, 0.4) * (1 - ramp(t, m.count, 0.4)) }}>
        <span style={{ color: C.orange }}>50%</span><span style={{ color: C.orange }}>9%</span>
      </div>
      <Big text="Հաշվենք մարդկանցով" on={ramp(t, m.count, 0.4)} y={620} size={52} />
    </Backdrop>
  );
};

// beats crowd -> reveal: fill, 10 sick, the meaning panel, scan, 10 false positives, pull out, 10 / 20
const CrowdMain: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const fill = ramp(t, 0.2, 1.4, (x) => x);
  const sick = ramp(t, m.sick, 0.5);
  const panel = ramp(t, m.meaning, 0.4) * (1 - ramp(t, m.scan - 0.4, 0.4));
  const scanY = lerp(GY - 20, GY + 470, ramp(t, m.scan, 1.6, (x) => x));
  const scanOn = ramp(t, m.scan, 0.2) * (1 - ramp(t, m.scan + 1.6, 0.3));
  const fp = ramp(t, m.fp, 0.6);
  const pull = ramp(t, m.pull, 1.2, easeInOut);
  const sickSet = new Set(SICK), fpSet = new Set(FALSE_POS);
  const target = (i: number) => {
    const k = sickSet.has(i) ? SICK.indexOf(i) : 10 + FALSE_POS.indexOf(i);
    return { x: 210 + (k % 10) * 66, y: 470 + Math.floor(k / 10) * 110 };
  };
  const state = (i: number): DotState => {
    if (sickSet.has(i)) return { color: sick > 0.5 ? C.red : GREY, ring: dotY(i) < scanY || t > m.scan + 1.6 ? 1 : 0, opacity: 1 - pull };
    if (fpSet.has(i)) return { color: GREY, ring: fp, opacity: 1 - pull };
    return { color: GREY, ring: 0 };
  };
  return (
    <Backdrop>
      <Grid fill={fill} state={state} dim={Math.max(panel * 0.8, pull)} />
      {scanOn > 0 ? <div style={{ position: "absolute", left: GX - 20, width: 760, top: scanY, height: 6, borderRadius: 3, background: C.orange, opacity: scanOn, boxShadow: `0 0 18px ${C.orange}` }} /> : null}
      <Counter text="1000 մարդ" on={ramp(t, 0.4, 0.4) * (1 - ramp(t, m.sickCount, 0.3))} />
      <Counter text="10 հիվանդ" color={C.red} on={ramp(t, m.sickCount, 0.4) * (1 - ramp(t, m.scan, 0.3))} />
      <Counter text={`դրական՝ ${t > m.fp + 0.3 ? 20 : 10}`} color={C.orange} on={ramp(t, m.scan + 1.0, 0.4) * (1 - ramp(t, m.pull, 0.3))} />
      <Label text="որից 10-ը՝ կեղծ դրական" x={504} y={880} size={30} color={C.orange} weight={700} width={600} opacity={ramp(t, m.falseLabel, 0.4) * (1 - ramp(t, m.pull, 0.3))} />
      {/* the meaning of "99%" in this example */}
      {panel > 0 ? (
        <div style={{ position: "absolute", left: 140, top: 360, width: 760, height: 420, borderRadius: 30, background: "rgba(20,22,28,0.94)", border: "2px solid #2B2F38", opacity: panel, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          {[{ c: C.red, rings: 99, label: "100 հիվանդ՝ գտնում է 99-ին" }, { c: GREY, rings: 1, label: "100 առողջ՝ սխալվում է 1-ի վրա" }].map((b, k) => (
            <div key={k} style={{ textAlign: "center", width: 330 }}>
              <svg width="220" height="220" viewBox="0 0 220 220">
                {Array.from({ length: 100 }, (_, j) => {
                  const x = 11 + (j % 10) * 22, y = 11 + Math.floor(j / 10) * 22;
                  const ringed = k === 0 ? j < b.rings : j === 57;
                  return <g key={j}><circle cx={x} cy={y} r={7} fill={b.c} />{ringed ? <circle cx={x} cy={y} r={9.5} fill="none" stroke={C.orange} strokeWidth="2.4" opacity={ramp(t, m.meaning + 1.2 + k * 1.5, 0.6)} /> : null}</g>;
                })}
              </svg>
              <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.ink, marginTop: 12, lineHeight: 1.25 }}>{b.label}</div>
            </div>
          ))}
        </div>
      ) : null}
      <Label text="մեր օրինակում" x={504} y={300} size={28} color={C.dim} width={400} opacity={panel} />
      {/* the 20 positives pulled out as people */}
      {pull > 0
        ? [...SICK, ...FALSE_POS].map((i, k) => {
            const tg = target(i);
            return <Person key={i} x={lerp(dotX(i), tg.x, pull)} y={lerp(dotY(i), tg.y, pull)} size={lerp(16, 58, pull)} color={k < 10 ? C.red : GREY} ring={1} />;
          })
        : null}
      <Big text={<><span style={{ color: C.red }}>10</span> / 20 = <span style={{ color: C.orange }}>50%</span></>} on={ramp(t, m.result, 0.5)} y={720} />
    </Backdrop>
  );
};

// why: 10 sick against 1% of 990 healthy
const Why: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const gather = ramp(t, 0.3, 1.2, easeInOut);
  const slice = ramp(t, m.slice, 1.2, easeInOut);
  const sickSet = new Set(SICK), fpSet = new Set(FALSE_POS);
  const state = (i: number): DotState => {
    if (sickSet.has(i)) {
      const k = SICK.indexOf(i);
      return { color: C.red, ring: 0, dx: lerp(0, 600 + (k % 5) * 20 - dotX(i), gather), dy: lerp(0, 860 + Math.floor(k / 5) * 20 - dotY(i), gather) };
    }
    if (fpSet.has(i)) {
      const k = FALSE_POS.indexOf(i);
      return { color: slice > 0 ? C.orange : GREY, ring: 0, dx: lerp(0, 360 + (k % 5) * 20 - dotX(i), slice), dy: lerp(0, 860 + Math.floor(k / 5) * 20 - dotY(i), slice) };
    }
    return { color: GREY, ring: 0 };
  };
  return (
    <Backdrop>
      <Grid fill={1} state={state} dim={0.3 * gather} />
      <Label text="990 առողջ" x={504} y={290} size={34} color={C.dim} weight={800} width={500} opacity={ramp(t, 0.6, 0.4)} />
      <Label text="10 հիվանդ" x={650} y={920} size={30} color={C.red} weight={800} width={300} opacity={gather} />
      <Label text="990-ի 1%-ը ≈ 10" x={410} y={920} size={30} color={C.orange} weight={800} width={320} opacity={slice} />
      <Big text="նույնքան" on={ramp(t, m.slice + 1.4, 0.4)} y={980} size={40} color={C.orange} />
    </Backdrop>
  );
};

// rarer: 1 in 1000
const Rarer: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const fill = ramp(t, 0.2, 0.8, (x) => x);
  const scan = ramp(t, m.scan, 1.2, (x) => x);
  const pull = ramp(t, m.pull, 1.0, easeInOut);
  const sickSet = new Set(RARE_SICK), fpSet = new Set(RARE_FP);
  const state = (i: number): DotState => {
    if (sickSet.has(i)) return { color: C.red, ring: scan > 0.3 ? 1 : 0, opacity: 1 - pull };
    if (fpSet.has(i)) return { color: GREY, ring: scan > 0.7 ? 1 : 0, opacity: 1 - pull };
    return { color: GREY, ring: 0 };
  };
  return (
    <Backdrop>
      <Grid fill={fill} state={state} dim={pull} />
      <Counter text="1000-ից 1 հիվանդ" color={C.red} on={ramp(t, 0.5, 0.4) * (1 - ramp(t, m.pull, 0.3))} />
      {pull > 0
        ? [...RARE_SICK, ...RARE_FP].map((i, k) => {
            const tx = 180 + (k % 6) * 140, ty = 470 + Math.floor(k / 6) * 120;
            return <Person key={i} x={lerp(dotX(i), tx, pull)} y={lerp(dotY(i), ty, pull)} size={lerp(16, 64, pull)} color={k === 0 ? C.red : GREY} ring={1} />;
          })
        : null}
      <Big text={<><span style={{ color: C.red }}>1</span> / 11 ≈ <span style={{ color: C.orange }}>9%</span></>} on={ramp(t, m.result, 0.5)} y={760} />
    </Backdrop>
  );
};

// retest: the 20 positives tested again with an independent test, then with the same one
const Retest: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const scan = ramp(t, m.again, 1.4, (x) => x);
  const fade = ramp(t, m.healthy, 1.0);
  const same = ramp(t, m.same, 0.5);
  const hiv = ramp(t, m.hiv, 0.4);
  return (
    <Backdrop>
      <Label text="ուրիշ թեստ, որ սխալվում է այլ պատճառներով" x={504} y={300} size={28} color={C.dim} width={760} opacity={ramp(t, m.other, 0.4) * (1 - same)} />
      {Array.from({ length: 20 }, (_, k) => {
        const red = k < 10;
        const ring = red ? 1 : k === 14 ? 1 - 0.85 * fade : 1 - fade;
        return <Person key={k} x={210 + (k % 10) * 66} y={420 + Math.floor(k / 10) * 110} color={red ? C.red : GREY} ring={same > 0.5 && !red ? 1 : ring} opacity={ramp(t, 0.2, 0.4)} />;
      })}
      {scan > 0 && scan < 1 ? <div style={{ position: "absolute", left: 160, width: 700, top: lerp(360, 600, scan), height: 6, borderRadius: 3, background: C.orange, boxShadow: `0 0 18px ${C.orange}` }} /> : null}
      <Label text="≈ 0,1 սպասվող" x={720} y={610} size={28} color={C.orange} weight={700} width={300} opacity={fade * (1 - same)} />
      <Big text={<span style={{ color: C.orange }}>≈ 99%</span>} on={ramp(t, m.indep, 0.4) * (1 - same)} y={700} size={80} />
      <Label text="եթե սխալներն իրարից անկախ են" x={504} y={810} size={30} color={C.ink} weight={700} width={760} opacity={ramp(t, m.indep, 0.4) * (1 - same)} />
      <Label text="նույն թեստը կրկին" x={504} y={300} size={30} color={C.khaki} weight={700} width={760} opacity={same} />
      <Big text={<span style={{ color: C.khaki }}>50%</span>} on={same * (1 - hiv)} y={700} size={80} />
      <div style={{ position: "absolute", left: 300, top: 860, width: 480, padding: "18px 24px", borderRadius: 20, background: "#1B1E25", border: `3px solid ${C.blue}`, textAlign: "center", fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.ink, opacity: hiv }}>
        ՄԻԱՎ՝ հաստատող թեստերի կարգ
      </div>
    </Backdrop>
  );
};

const Formula: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Big text="Բայեսի բանաձև" on={ramp(t, 0.2, 0.4)} y={300} size={52} color={C.orange} />
      <div style={{ position: "absolute", left: 140, width: 760, top: 430, padding: "34px 20px", borderRadius: 28, background: "#1B1E25", border: "2px solid #2B2F38", textAlign: "center", opacity: ramp(t, 0.6, 0.5) }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 50, color: C.ink }}>P(D | +) = <span style={{ display: "inline-block", verticalAlign: "middle", textAlign: "center" }}><span style={{ display: "block", borderBottom: `3px solid ${C.ink}`, padding: "0 8px" }}>P(+ | D) · P(D)</span><span style={{ display: "block" }}>P(+)</span></span></div>
        <div style={{ fontFamily: FONT, fontSize: 26, color: C.dim, marginTop: 20 }}>D՝ հիվանդ է, +՝ թեստը դրական է</div>
        <div style={{ fontFamily: FONT, fontSize: 44, fontWeight: 800, color: C.orange, marginTop: 16, opacity: ramp(t, m.update, 0.5) }}>= 10 / 20 = 50%</div>
      </div>
      <Label text="սկսիր տարածվածությունից, հետո թարմացրու" x={504} y={840} size={30} color={C.ink} width={760} opacity={ramp(t, m.update, 0.5)} />
    </Backdrop>
  );
};

const Takeaway: React.FC = () => {
  const t = useT();
  const sickSet = new Set(SICK);
  return (
    <Backdrop glow="rgba(242,168,0,0.12)">
      <Grid fill={1} state={(i) => ({ color: sickSet.has(i) ? C.red : GREY, ring: 0, opacity: sickSet.has(i) ? 1 : 0.35 })} />
      <Big text={<>Որքա՞ն <span style={{ color: C.orange }}>հազվադեպ</span> է այն, ինչ փնտրում ենք</>} on={ramp(t, 0.3, 0.6)} y={820} size={48} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: (dur: number) => React.ReactNode };
const GROUPS: G[] = [
  { keys: ["hook"], render: () => {
    const g0 = S.beat("hook").start;
    return <Hook m={{ q: rel(g0, S.at("hook", "Ո՞")) }} />;
  } },
  { keys: ["guess"], render: () => {
    const g0 = S.beat("guess").start;
    return <Guess m={{ doctors: rel(g0, S.at("guess", "Նման")), real: rel(g0, S.at("guess", "Իսկ")), count: rel(g0, S.at("guess", "Հաշվենք")) }} />;
  } },
  { keys: ["crowd", "meaning", "test_sick", "test_healthy", "reveal"], render: () => {
    const g0 = S.beat("crowd").start;
    return <CrowdMain m={{
      sick: rel(g0, S.at("crowd", "Հիվանդությունը")), sickCount: rel(g0, S.at("crowd", "Ուրեմն")),
      meaning: rel(g0, S.beat("meaning").start), scan: rel(g0, S.at("test_sick", "Տասը")) - 0.3,
      fp: rel(g0, S.at("test_healthy", "Նրանց")), falseLabel: rel(g0, S.at("test_healthy", "Սրանք")),
      pull: rel(g0, S.at("reveal", "Քսան")), result: rel(g0, S.at("reveal", "Այսինքն")),
    }} />;
  } },
  { keys: ["why"], render: () => {
    const g0 = S.beat("why").start;
    return <Why m={{ slice: rel(g0, S.at("why", "Թեստի")) }} />;
  } },
  { keys: ["rarer"], render: () => {
    const g0 = S.beat("rarer").start;
    return <Rarer m={{ scan: rel(g0, S.at("rarer", "Հիվանդ")), pull: rel(g0, S.at("rarer", "Դրական")), result: rel(g0, S.at("rarer", "Դրական")) + 1.4 }} />;
  } },
  { keys: ["retest"], render: () => {
    const g0 = S.beat("retest").start;
    return <Retest m={{
      other: rel(g0, S.at("retest", "Ստուգել")), again: rel(g0, S.at("retest", "Քսան")), healthy: rel(g0, S.at("retest", "Իսկ", 0)),
      indep: rel(g0, S.at("retest", "Եթե")), same: rel(g0, S.at("retest", "Իսկ", 1)), hiv: rel(g0, S.at("retest", "Դրա")),
    }} />;
  } },
  { keys: ["formula"], render: () => {
    const g0 = S.beat("formula").start;
    return <Formula m={{ update: rel(g0, S.at("formula", "Սկսիր")) }} />;
  } },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const Bayes: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * BAYES_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * BAYES_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render(len / BAYES_FPS)}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`bayes_test/${S.audio}`)} />
  </AbsoluteFill>
);
