// "Why does the week have seven days?" (9:16 Short, draft for review; DECISIONS #28). All drawn. The showcase is the
// planetary-hours star: the seven lights in the old slow-to-fast order on a circle; each day's first hour lands 3 steps
// on (24 = 3 x 7 + 3), and joining the landings draws the {7/3} star that reads the week in order.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, random, staticFile } from "remotion";
import TL from "../data/week_seven.json";
import { C, easeInOut, lerp, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "week_seven", "portrait");
export const WEEK_FPS = 30;
const TAIL_S = 1.2;
export const WEEK_FRAMES = Math.ceil((S.duration + TAIL_S) * WEEK_FPS);

const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);

// the seven lights, slow to fast (Chaldean order), and the weekday each gives its name to
const LIGHTS = [
  { n: "Սատուրն", sym: "♄", day: "շաբաթ", c: "#C9B27A" },
  { n: "Յուպիտեր", sym: "♃", day: "հինգշաբթի", c: "#D9A066" },
  { n: "Մարս", sym: "♂", day: "երեքշաբթի", c: "#D9573F" },
  { n: "Արև", sym: "☉", day: "կիրակի", c: "#FFC94A" },
  { n: "Վեներա", sym: "♀", day: "ուրբաթ", c: "#F2E0B5" },
  { n: "Մերկուրի", sym: "☿", day: "չորեքշաբթի", c: "#AEB4BF" },
  { n: "Լուսին", sym: "☽", day: "երկուշաբթի", c: "#DDE3EA" },
];
const SX = 504, SY = 660, SR = 290;
const spot = (i: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
  return { x: SX + SR * Math.cos(a), y: SY + SR * Math.sin(a) };
};
const LANDINGS = Array.from({ length: 8 }, (_, d) => (d * 3) % 7); // Saturn, Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn

// the circle of lights; `hand` is a (fractional) position along the circle, `star` how many star lines are drawn
const Star: React.FC<{ t: number; on?: number; lit?: number[]; hand?: number; handOn?: number; star?: number; days?: number; dim?: number }> = ({ t, on = 1, lit = [], hand = 0, handOn = 0, star = 0, days = 0, dim = 0 }) => {
  const hp = (() => {
    const i = Math.floor(hand), f = hand - i;
    const a = spot(i % 7), b = spot((i + 1) % 7);
    return { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f) };
  })();
  return (
    <>
      <Svg opacity={on * (1 - 0.6 * dim)}>
        <circle cx={SX} cy={SY} r={SR} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={3} />
        {Array.from({ length: 7 }, (_, k) => {
          const f = Math.max(0, Math.min(1, star - k));
          const a = spot(LANDINGS[k]), b = spot(LANDINGS[k + 1]);
          return f > 0 ? <line key={k} x1={a.x} y1={a.y} x2={lerp(a.x, b.x, f)} y2={lerp(a.y, b.y, f)} stroke={C.orange} strokeWidth={6} strokeLinecap="round" /> : null;
        })}
        {LIGHTS.map((l, i) => {
          const p = spot(i);
          const on2 = lit.includes(i);
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={on2 ? 46 : 38} fill={l.c} opacity={on2 ? 1 : 0.75} style={{ filter: on2 ? `drop-shadow(0 0 ${14 + 4 * Math.sin(t * 6)}px ${l.c})` : undefined }} />
              <text x={p.x} y={p.y + 14} textAnchor="middle" fontSize={40} fill={C.bg}>{l.sym}</text>
            </g>
          );
        })}
        {handOn > 0 ? <line x1={SX} y1={SY} x2={hp.x} y2={hp.y} stroke={C.ink} strokeWidth={6} strokeLinecap="round" opacity={handOn} /> : null}
        {handOn > 0 ? <circle cx={SX} cy={SY} r={12} fill={C.ink} opacity={handOn} /> : null}
      </Svg>
      {LIGHTS.map((l, i) => {
        const p = spot(i);
        const dx = (p.x - SX) / SR, dy = (p.y - SY) / SR;
        return <Tag key={i} text={l.n} x={p.x + dx * 90} y={p.y + dy * 76} size={26} weight={700} color={C.dim} opacity={on * (1 - dim)} width={220} />;
      })}
      {LANDINGS.slice(0, 7).map((li, k) => {
        const p = spot(li);
        return <Tag key={`d${k}`} text={`${k + 1}`} x={p.x} y={p.y - 62} size={26} weight={900} color={C.orange} opacity={on * ramp(days, k, 0.3)} width={60} />;
      })}
    </>
  );
};

// ---------- hook: day, month, year come from the sky; the week does not ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const cells = [{ x: 300, y: 470, n: "օր", k: m.day }, { x: 720, y: 470, n: "ամիս", k: m.month }, { x: 300, y: 860, n: "տարի", k: m.year }, { x: 720, y: 860, n: "շաբաթ", k: m.week }];
  const hi = (k: number) => ramp(t, k, 0.3) * (1 - ramp(t, k + 1.6, 0.4));
  return (
    <Backdrop>
      <Svg>
        {cells.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r={160} fill={C.panel} stroke={i === 3 ? C.orange : "#2E333B"} strokeWidth={i === 3 ? 3 + 3 * hi(c.k) : 2 + 3 * hi(c.k)} strokeDasharray={i === 3 ? "12 10" : undefined} />)}
        {/* day: the Earth turning */}
        <circle cx={300} cy={470} r={60} fill="#2B6CB0" />
        <circle cx={300 + 60 * Math.cos(t * 2)} cy={470 + 12 * Math.sin(t * 2)} r={10} fill="#FFC94A" opacity={Math.cos(t * 2) > -0.2 ? 1 : 0.2} />
        {/* month: the Moon around the Earth */}
        <circle cx={720} cy={470} r={36} fill="#2B6CB0" />
        <circle cx={720 + 105 * Math.cos(t * 1.2)} cy={470 + 105 * Math.sin(t * 1.2)} r={16} fill="#DDE3EA" />
        <circle cx={720} cy={470} r={105} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
        {/* year: the Earth around the Sun */}
        <circle cx={300} cy={860} r={30} fill="#FFC94A" />
        <circle cx={300 + 110 * Math.cos(t * 0.6)} cy={860 + 110 * Math.sin(t * 0.6)} r={16} fill="#2B6CB0" />
        <circle cx={300} cy={860} r={110} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
      </Svg>
      {cells.map((c, i) => <Tag key={i} text={c.n} x={c.x} y={c.y + 195} size={36} color={i === 3 ? C.orange : C.ink} width={300} />)}
      <Tag text={t < m.seven ? "?" : "7"} x={720} y={860} size={140} weight={900} color={C.orange} opacity={ramp(t, 0.2, 0.4)} width={200} />
    </Backdrop>
  );
};

// ---------- moon: 29.5 days do not split into weeks ----------
const Moon: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const blocks = ramp(t, m.split, 0.5);
  const rest = ramp(t, m.notDiv, 0.4) * (0.5 + 0.5 * Math.sin(t * 8));
  const CW = 30, X0 = 95, Y = 640;
  return (
    <Backdrop>
      <Svg>
        {Array.from({ length: 30 }, (_, i) => <rect key={i} x={X0 + i * CW} y={Y} width={i === 29 ? CW / 2 - 2 : CW - 3} height={70} rx={4} fill={C.panel} stroke="#3A3F48" strokeWidth={2} opacity={ramp(t, 0.2 + i * 0.03, 0.3)} />)}
        {Array.from({ length: 8 }, (_, i) => {
          const x = X0 + (i * 29.5 * CW) / 8 + 20, ph = i / 8;
          return (
            <g key={i} opacity={ramp(t, m.phases + i * 0.1, 0.3)}>
              <circle cx={x} cy={Y - 70} r={24} fill="#DDE3EA" />
              <ellipse cx={x + 48 * (ph <= 0.5 ? ph : ph - 1)} cy={Y - 70} rx={24} ry={24} fill={C.bg} opacity={i === 4 ? 0 : 1} />
            </g>
          );
        })}
        {[0, 1, 2, 3].map((b) => (
          <path key={b} d={`M ${X0 + b * 7 * CW + 2} ${Y + 90} v 20 h ${7 * CW - 6} v -20`} stroke={C.orange} strokeWidth={4} fill="none" opacity={blocks} />
        ))}
        <rect x={X0 + 28 * CW} y={Y - 6} width={1.5 * CW} height={82} rx={6} fill="none" stroke={C.red} strokeWidth={5} opacity={rest} />
      </Svg>
      {[0, 1, 2, 3].map((b) => <Tag key={b} text="7" x={X0 + b * 7 * CW + 3.5 * CW} y={Y + 150} size={32} color={C.orange} opacity={blocks} width={100} />)}
      <Tag text="1,5" x={X0 + 28.75 * CW} y={Y + 150} size={30} color={C.red} opacity={ramp(t, m.notDiv, 0.4)} width={100} />
      <Tag text="≈29,5 օր" x={504} y={470} size={40} opacity={ramp(t, m.split - 0.8, 0.4)} />
    </Backdrop>
  );
};

// ---------- sabbath + armenian: seven rows, then their Armenian names ----------
const NAMES = [
  { a: "", b: "կիրակի" }, { a: "երկու", b: "շաբթի", n: 2 }, { a: "երեք", b: "շաբթի", n: 3 }, { a: "չորեք", b: "շաբթի", n: 4 },
  { a: "հինգ", b: "շաբթի", n: 5 }, { a: "", b: "ուրբաթ" }, { a: "", b: "շաբաթ" },
];
const Sabbath: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const names = ramp(t, m.names, 0.5);
  const greek = ramp(t, m.greek, 0.5);
  return (
    <Backdrop>
      {NAMES.map((d, i) => {
        const y = 330 + i * 98;
        const on = i < 6 ? Math.max(0.5 * ramp(t, 0.2, 0.4), ramp(t, m.six + i * 0.12, 0.3)) : Math.max(0.5 * ramp(t, 0.2, 0.4), ramp(t, m.seventh, 0.3));
        const nOn = d.n ? ramp(t, m.second + (d.n - 2) * 0.7, 0.3) : 0;
        return (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: 200, top: y - 38, width: 620, height: 76, borderRadius: 16, background: i === 6 && t >= m.seventh ? C.orange : "#2E333B", opacity: on }} />
            <Tag text={i === 6 ? "Շաբաթ՝ հանգիստ" : "աշխատանք"} x={510} y={y} size={32} color={i === 6 ? C.bg : C.dim} weight={i === 6 ? 900 : 650} opacity={on * (1 - names)} width={600} />
            <Tag text={<><span style={{ color: nOn > 0.5 ? C.orange : C.ink }}>{d.a}</span>{d.b}</>} x={510} y={y} size={38} color={i === 6 ? C.bg : C.ink} opacity={names} width={600} />
            <Tag text={`${i + 1}`} x={150} y={y} size={36} weight={900} color={nOn > 0.5 ? C.orange : C.dim} opacity={names} width={80} />
          </React.Fragment>
        );
      })}
      <Tag text="Κυριακή՝ «Տիրոջ օր»" x={504} y={1050} size={36} color={C.orange} opacity={greek} />
    </Backdrop>
  );
};

// ---------- planets: seven moving lights dock on the days ----------
const Planets: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const cross = ramp(t, 0.3, Math.max(2.5, m.dedicated - 0.5), easeInOut);
  const dock = ramp(t, m.dedicated, 1.2, easeInOut);
  const eng = ramp(t, m.english, 0.5);
  const lit = [m.saturn, m.sun, m.moon];
  const ENG = [{ i: 0, w: "Saturday", d: "շաբաթ" }, { i: 3, w: "Sunday", d: "կիրակի" }, { i: 6, w: "Monday", d: "երկուշաբթի" }];
  return (
    <Backdrop glow="rgba(111,168,255,0.06)">
      <Svg>
        {Array.from({ length: 60 }, (_, i) => <circle key={i} cx={random(`st-x-${i}`) * 1080} cy={220 + random(`st-y-${i}`) * 860} r={1.5 + random(`st-r-${i}`) * 2} fill="#FFFFFF" opacity={0.5} />)}
        {LIGHTS.map((l, i) => {
          const sx = lerp(-60, 860 - i * 90, Math.max(0, Math.min(1, cross * 1.1 - i * 0.03))), sy = 470 + 70 * Math.sin(i * 1.3 + cross * 3); // across the middle of the sky, ending inside the frame
          const dx = 150 + (i % 7) * 130, dy = 760;
          return <circle key={i} cx={lerp(sx, dx, dock)} cy={lerp(sy, dy, dock)} r={22} fill={l.c} style={{ filter: `drop-shadow(0 0 10px ${l.c})` }} opacity={1 - 0.6 * eng * (ENG.some((e) => e.i === i) ? 0 : 1)} />;
        })}
      </Svg>
      {LIGHTS.map((l, i) => <Tag key={i} text={l.n} x={150 + i * 130} y={830} size={22} weight={700} color={C.dim} opacity={dock * (1 - eng)} width={140} />)}
      {ENG.map((e, k) => {
        const on = ramp(t, lit[k], 0.4);
        return (
          <React.Fragment key={k}>
            <Tag text={`${LIGHTS[e.i].sym} ${e.w}`} x={504} y={420 + k * 110} size={56} color={on > 0.5 ? C.orange : C.ink} opacity={eng * Math.max(0.35, on)} width={700} />
          </React.Fragment>
        );
      })}
    </Backdrop>
  );
};

// ---------- order_setup + order_count: the hour hand and the star ----------
const Hours: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const odd = [m.sat, m.sun, m.moon];
  const litOdd = odd.map((k, i) => (t > k && t < m.sky + 1 ? [0, 3, 6][i] : -1)).filter((i) => i >= 0);
  const order = ramp(t, m.speed, 0.5);
  // hour hand: one step per 0.35 s through the hours of the first day, from m.hour; then day by day from m.lap
  let hand = 0, handOn = 0, star = 0, days = 0;
  const lit: number[] = [...litOdd];
  if (t > m.hour && t < m.lap) {
    handOn = 1;
    hand = Math.min(6.999, (t - m.hour) / 0.35) % 7;
    if (t > m.first) lit.push(0);
  }
  if (t >= m.lap) {
    handOn = 1;
    // the first lap to the Sun: 24 steps in ~2.6 s, then each later day 3 steps each, timed to the voice, then faster
    const marks = [m.lap, m.sunLand, m.moonLand, m.marsLand, m.marsLand + 0.9, m.marsLand + 1.8, m.marsLand + 2.7, m.marsLand + 3.6];
    let d = 0;
    while (d < 7 && t >= marks[d + 1]) d++;
    const f = d < 7 ? Math.min(1, (t - marks[d]) / Math.max(0.3, (marks[d + 1] - marks[d]) * 0.8)) : 1;
    const steps = d === 0 ? 24 : 3;
    hand = (LANDINGS[d] + (d < 7 ? f * steps : 0)) % 7;
    star = d + (d < 7 ? f : 0);
    days = d + 1;
    lit.push(LANDINGS[Math.min(d, 7)]);
  }
  const maths = ramp(t, m.h24, 0.4);
  const rem = ramp(t, m.three, 0.4);
  return (
    <Backdrop>
      <Star t={t} on={ramp(t, 0.2, 0.5)} lit={lit} hand={hand} handOn={handOn} star={star} days={days} />
      <Tag text="?" x={SX} y={SY} size={120} weight={900} color={C.orange} opacity={ramp(t, m.sky, 0.4) * (1 - order)} width={200} />
      <Tag text="դանդաղից արագ" x={SX} y={SY} size={30} color={C.dim} opacity={order * (1 - handOn)} width={300} />
      <Tag text="24 = 3 × 7 + 3" x={SX} y={1060} size={44} color={C.orange} opacity={maths * (0.3 + 0.7 * rem)} />
      <SourceLine text="Դիոն Կասիոս, մ.թ. III դար" on={ramp(t, m.speed - 2, 0.5)} />
    </Backdrop>
  );
};

// ---------- soviet: the 5-day continuous week ----------
const ROSTER = ["#D9573F", "#F2C81B", "#3E9B3A", "#C084FC", "#4A90E2"];
const Soviet: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const five = ramp(t, m.soviet, 0.5) * (1 - ramp(t, m.back - 0.2, 0.4));
  const strip = ramp(t, 0.2, 0.4) * (1 - ramp(t, m.soviet - 0.3, 0.4));
  const couple = ramp(t, m.couple, 0.5);
  const back = ramp(t, m.back, 0.6);
  return (
    <Backdrop>
      <Svg opacity={five}>
        {[0, 1].map((row) => (
          <g key={row}>
            {Array.from({ length: 15 }, (_, d) => {
              const off = (d + row * 2) % 5 === 4; // a different day off for each colour group
              return <rect key={d} x={110 + d * 56} y={460 + row * 200} width={50} height={110} rx={8} fill={off ? ROSTER[row === 0 ? 0 : 2] : "#2E333B"} opacity={off ? 1 : 0.8} />;
            })}
          </g>
        ))}
      </Svg>
      <Tag text="հնգօրյա" x={504} y={360} size={40} opacity={ramp(t, m.five, 0.4) * five * (1 - ramp(t, m.six, 0.3))} />
      <Tag text="վեցօրյա" x={504} y={360} size={40} opacity={five * ramp(t, m.six, 0.3)} />
      <Tag text="ամուսին" x={504} y={610} size={30} color={C.dim} opacity={five * couple} width={300} />
      <Tag text="կին" x={504} y={810} size={30} color={C.dim} opacity={five * couple} width={300} />
      <Svg opacity={Math.max(back, strip)}>
        {Array.from({ length: 7 }, (_, i) => <rect key={i} x={140 + i * 112 + (1 - Math.max(back, strip)) * 40 * (i - 3)} y={600} width={100} height={120} rx={14} fill={i === 6 ? C.orange : "#2E333B"} />)}
      </Svg>
      <Tag text="7" x={504} y={820} size={90} weight={900} color={C.orange} opacity={Math.max(back, strip)} width={160} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Star t={t} star={7} days={0} dim={0.3} />
      <Title text={<>Շաբաթը երկնքից չէ, <span style={{ color: C.orange }}>մարդկանցից է</span></>} on={ramp(t, 0.3, 0.6)} y={210} size={50} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ week: at("hook", "Շաբաթը"), day: at("hook", "Երկրի"), month: at("hook", "Լուսնի"), year: at("hook", "Արևի"), seven: at("hook", "յոթը") }} /> },
  { keys: ["moon"], render: () => <Moon m={{ phases: at("moon", "փուլերից"), split: at("moon", "լուսնային"), notDiv: at("moon", "բաժանվում") }} /> },
  { keys: ["sabbath", "armenian"], render: () => {
    const g0 = S.beat("sabbath").start;
    const r = (k: string, w: string, nth?: number) => rel(g0, S.at(k, w, nth));
    return <Sabbath m={{ six: r("sabbath", "վեց"), seventh: r("sabbath", "յոթերորդը"), names: r("armenian", "հայերենը"), second: r("armenian", "երկրորդ"), greek: r("armenian", "հունարենից") }} />;
  } },
  { keys: ["planets"], render: () => <Planets m={{ seven: at("planets", "յոթ"), dedicated: at("planets", "նվիրեցին"), english: at("planets", "Անգլերենը"), saturn: at("planets", "Սատուրնի"), sun: at("planets", "Արևի"), moon: at("planets", "Լուսնի") }} /> },
  { keys: ["order_setup", "order_count"], render: () => {
    const g0 = S.beat("order_setup").start;
    const r = (k: string, w: string, nth?: number) => rel(g0, S.at(k, w, nth));
    return <Hours m={{
      sat: r("order_setup", "Սատուրն"), sun: r("order_setup", "Արև"), moon: r("order_setup", "Լուսին"), sky: r("order_setup", "դասավորված"),
      speed: r("order_setup", "արագության"), hour: r("order_setup", "ժամ", 0), first: r("order_setup", "առաջին"),
      h24: r("order_count", "24", 0), three: r("order_count", "երեք", 0), lap: r("order_count", "Ուրեմն"),
      sunLand: r("order_count", "Արև,"), moonLand: r("order_count", "Լուսին"), marsLand: r("order_count", "Մարս"),
    }} />;
  } },
  { keys: ["soviet"], render: () => <Soviet m={{ soviet: at("soviet", "Խորհրդային"), five: at("soviet", "հնգօրյա"), six: at("soviet", "վեցօրյա"), couple: at("soviet", "Ամուսինները"), back: at("soviet", "վերադարձան") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const WeekSeven: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * WEEK_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * WEEK_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`week_seven/${S.audio}`)} />
  </AbsoluteFill>
);
