// "The decoy effect: why a medium popcorn exists" (9:16 Short, draft for review; DECISIONS #28).
// Popcorn buckets drawn to their stated sizes (x1, x2, x3), the magazine experiment as the showcase (100 dots that
// re-flow when the decoy is removed), the honest limits, and the closing question. Moments tied to the narration.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import TL from "../data/decoy_popcorn.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop, Label } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";

const S = loadTimeline(TL, "decoy_popcorn", "portrait");
export const DECOY_FPS = 30;
const TAIL_S = 1.2;
export const DECOY_FRAMES = Math.ceil((S.duration + TAIL_S) * DECOY_FPS);
const rel = (g0: number, x: number) => Math.max(0, x - g0);
const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

// a popcorn bucket; size 1, 2 or 3 is the volume, drawn with the area growing in proportion (scale = sqrt(size))
const Bucket: React.FC<{ cx: number; bottom: number; size: number; price?: string; glow?: number; ghost?: number; hook?: number; opacity?: number }> = ({ cx, bottom, size, price, glow = 0, ghost = 0, hook = 0, opacity = 1 }) => {
  const k = Math.sqrt(size);
  const w = 120 * k, h = 150 * k;
  return (
    <div style={{ position: "absolute", left: cx - w / 2 - 20, top: bottom - h - 40 * k, width: w + 40, opacity: opacity * (1 - 0.55 * ghost), filter: glow ? `drop-shadow(0 0 ${24 * glow}px rgba(242,168,0,${0.8 * glow}))` : undefined }}>
      <svg width={w + 40} height={h + 40 * k} viewBox={`0 0 ${w + 40} ${h + 40 * k}`}>
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} cx={20 + (w / 6) * i} cy={40 * k - 6 * Math.sin(i * 1.7)} r={18 * k} fill="#FFF3C4" stroke="#E9CF7A" strokeWidth="2" />
        ))}
        <path d={`M 20 ${40 * k} L ${w + 20} ${40 * k} L ${w + 20 - 14 * k} ${h + 40 * k} L ${20 + 14 * k} ${h + 40 * k} Z`} fill="#F4F1EA" />
        {Array.from({ length: 4 }, (_, i) => (
          <path key={i} d={`M ${20 + (w / 4) * i + w / 16} ${40 * k} L ${20 + (w / 4) * i + w / 8 + w / 16} ${40 * k} L ${20 + (w / 4) * i + w / 8 + w / 16 - 3 * k} ${h + 40 * k} L ${20 + (w / 4) * i + w / 16 + 3 * k} ${h + 40 * k} Z`} fill={C.red} />
        ))}
      </svg>
      <div style={{ textAlign: "center", fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.dim, marginTop: 6 }}>×{size}</div>
      {price ? <div style={{ textAlign: "center", fontFamily: FONT, fontSize: 36, fontWeight: 800, color: C.ink }}>{price}</div> : null}
      {hook > 0 ? (
        <div style={{ position: "absolute", left: (w + 40) / 2 - 22, top: -70, opacity: hook, transform: `translateY(${(1 - hook) * -40}px)` }}>
          <svg width="44" height="70" viewBox="0 0 44 70"><path d="M 22 0 V 44 A 14 14 0 1 1 8 30" fill="none" stroke={C.orange} strokeWidth="6" strokeLinecap="round" /><path d="M 4 26 L 8 30 L 12 24" fill="none" stroke={C.orange} strokeWidth="5" strokeLinecap="round" /></svg>
        </div>
      ) : null}
    </div>
  );
};

const Title: React.FC<{ text: React.ReactNode; on: number; y?: number; size?: number }> = ({ text, on, y = 300, size = 48 }) => (
  <div style={{ position: "absolute", left: 120, width: 768, top: y, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: 800, color: C.ink, lineHeight: 1.2, opacity: on }}>{text}</div>
);

// ---------- the popcorn part (hook, choice, medium, gift, name): one continuous scene ----------
const Popcorn: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const hookOut = ramp(t, m.choice - 0.4, 0.4);
  const mediumIn = m.medium ? Math.min(1, pop(t, m.medium, 9, 0.55)) : 0;
  const pointer = ramp(t, m.ask, 0.4) * (1 - ramp(t, m.medium - 0.3, 0.3));
  const drift = ramp(t, m.gift + 0.8, 3.0, easeInOut);
  const decoy = ramp(t, m.name, 0.5);
  return (
    <Backdrop>
      {/* the hook: three buckets, the medium flickering, the large glowing */}
      <div style={{ opacity: 1 - hookOut }}>
        <Bucket cx={250} bottom={820} size={1} />
        <Bucket cx={520} bottom={820} size={2} ghost={0.5 + 0.5 * Math.sin(t * 9)} />
        <Bucket cx={790} bottom={820} size={3} glow={0.6 + 0.4 * Math.sin(t * 3)} />
        <Title text={<>Միջինը <span style={{ color: C.orange }}>վաճառում է</span> մեծը</>} on={ramp(t, 0.2, 0.5)} />
      </div>
      {/* the choice and the decoy */}
      <div style={{ opacity: hookOut }}>
        <Bucket cx={240} bottom={800} size={1} price="1000 ֏" />
        <Bucket cx={800} bottom={800} size={3} price="2000 ֏" glow={ramp(t, m.gift, 0.6)} />
        {mediumIn > 0 ? <Bucket cx={520} bottom={800} size={2} price="1800 ֏" opacity={mediumIn} hook={decoy} /> : null}
        <Label text="օրինակ, գները հորինված են" x={504} y={300} size={26} color={C.dim} width={600} opacity={ramp(t, m.choice, 0.4) * (1 - ramp(t, m.gift, 0.4))} />
        <div style={{ position: "absolute", left: lerp(330, 690, 0.5 + 0.5 * Math.sin(t * 2.4)), top: 470, fontSize: 70, opacity: pointer, color: C.ink }}>
          <svg width="60" height="80" viewBox="0 0 60 80"><path d="M 30 0 L 30 56 M 12 40 L 30 60 L 48 40" fill="none" stroke={C.ink} strokeWidth="7" strokeLinecap="round" /></svg>
        </div>
        <Label text="Ո՞րը կվերցնես" x={504} y={360} size={40} color={C.ink} weight={800} width={600} opacity={pointer} />
        {/* +200 for one more small bucket */}
        <div style={{ position: "absolute", left: 560, top: 370, width: 300, textAlign: "center", fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.orange, opacity: ramp(t, m.gift + 0.6, 0.4) * (1 - decoy) }}>
          +200 ֏<div style={{ fontSize: 28, color: C.ink }}>+1 փոքրի չափ</div>
        </div>
        {/* buyers drift from small to large */}
        {Array.from({ length: 14 }, (_, i) => {
          const x0 = 180 + random(`x${i}`) * 120, x1 = 740 + random(`y${i}`) * 120;
          return <div key={i} style={{ position: "absolute", left: lerp(x0, x1, Math.min(1, Math.max(0, drift * 1.3 - i * 0.02))), top: 880 + random(`r${i}`) * 80, width: 22, height: 22, borderRadius: "50%", background: C.blue, opacity: ramp(t, m.gift + 0.4, 0.4) * (1 - ramp(t, m.name + 3, 0.5)) }} />;
        })}
        <Label text="խայծ" x={520} y={340} size={46} color={C.orange} weight={900} width={300} opacity={decoy} />
        <Label text="ամենամաքուր դեպքում՝ վատ ամեն ինչով" x={504} y={950} size={30} color={C.ink} width={760} opacity={ramp(t, m.pure, 0.4)} />
      </div>
    </Backdrop>
  );
};

// ---------- the magazine experiment ----------
const Magazine: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const flow1 = ramp(t, m.students - 0.3, 1.6, easeInOut);
  const removed = ramp(t, m.removed, 0.7, easeInOut);
  const flow2 = ramp(t, m.removed + 0.8, 1.6, easeInOut);
  const cardX = [150, 400, 650];
  const cards = [["Միայն կայքը", "$59"], ["Միայն տպագիրը", "$125"], ["Տպագիր + կայք", "$125"]];
  // 100 buyers: before 16 web / 0 print / 84 both; after 68 web / 32 both
  const before = (i: number) => (i < 16 ? 0 : 2);
  const after = (i: number) => (i < 68 ? 0 : 2);
  const count = (fn: (i: number) => number, c: number) => Array.from({ length: 100 }, (_, i) => fn(i)).filter((x) => x === c).length;
  const shown = (c: number) => Math.round(lerp(count(before, c) * flow1, count(after, c), flow2));
  return (
    <Backdrop>
      <Title text="Ամսագրի բաժանորդագրություն" on={ramp(t, 0.2, 0.5)} size={40} />
      {/* a magazine cover until the offers appear */}
      <svg width="260" height="340" viewBox="0 0 260 340" style={{ position: "absolute", left: 374, top: 420, opacity: ramp(t, 0.3, 0.5) * (1 - ramp(t, m.offers - 0.3, 0.4)) }}>
        <rect x="10" y="10" width="240" height="320" rx="14" fill="#F4F1EA" />
        <rect x="30" y="30" width="200" height="56" rx="6" fill={C.red} />
        <rect x="30" y="110" width="200" height="120" rx="6" fill="#CFC6B4" />
        {[250, 272, 294].map((y) => <rect key={y} x="30" y={y} width="200" height="10" rx="5" fill="#B9AF9B" />)}
      </svg>
      {cards.map(([name, price], c) => (
        <div key={c} style={{ position: "absolute", left: cardX[c], top: 400, width: 230, height: 190, borderRadius: 24, background: c === 2 ? "rgba(242,168,0,0.12)" : "#1B1E25", border: `3px solid ${c === 2 ? C.orange : "#2B2F38"}`, textAlign: "center", padding: "22px 10px", boxSizing: "border-box",
          opacity: ramp(t, m.offers + c * 0.5, 0.4) * (c === 1 ? 1 - removed : 1), transform: c === 1 ? `translateY(${removed * 260}px) rotate(${removed * 12}deg)` : undefined }}>
          <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.ink, lineHeight: 1.15, height: 70 }}>{name}</div>
          <div style={{ fontFamily: FONT, fontSize: 48, fontWeight: 900, color: c === 2 ? C.orange : C.ink }}>{price}</div>
        </div>
      ))}
      {Array.from({ length: 100 }, (_, i) => {
        const c = flow2 > 0 ? after(i) : before(i);
        const c0 = before(i);
        const tx = (cc: number) => cardX[cc] + 20 + (i % 10) * 19;
        const ty = 640 + Math.floor(i / 10) * 0 + (i % 7) * 0;
        const col = (cc: number, idx: number) => ({ x: tx(cc), y: ty + (idx % 10) * 19 + Math.floor(idx / 10) * 0 });
        void col;
        const slot = (cc: number, fn: (j: number) => number) => {
          const rank = Array.from({ length: i }, (_, j) => fn(j)).filter((x) => x === cc).length;
          return { x: cardX[cc] + 20 + (rank % 10) * 19, y: 630 + Math.floor(rank / 10) * 19 };
        };
        const p0 = { x: 504, y: 1000 };
        const a = slot(c0, before), b = slot(c, after);
        const x = flow2 > 0 ? lerp(a.x, b.x, flow2) : lerp(p0.x, a.x, flow1);
        const y = flow2 > 0 ? lerp(a.y, b.y, flow2) : lerp(p0.y, a.y, flow1);
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: 14, height: 14, borderRadius: "50%", background: c === 2 ? C.orange : C.blue, opacity: ramp(t, m.students - 0.4, 0.3) }} />;
      })}
      {[0, 2].map((c) => (
        <div key={c} style={{ position: "absolute", left: cardX[c], width: 230, top: 840, textAlign: "center", fontFamily: FONT, fontSize: 54, fontWeight: 900, color: c === 2 ? C.orange : C.blue, opacity: ramp(t, m.students, 0.4), fontVariantNumeric: "tabular-nums" }}>{shown(c)}%</div>
      ))}
      <div style={{ position: "absolute", left: cardX[1], width: 230, top: 840, textAlign: "center", fontFamily: FONT, fontSize: 54, fontWeight: 900, color: C.dim, opacity: ramp(t, m.students, 0.4) * (1 - removed) }}>0%</div>
      <Label text="«միայն տպագիրը» հանեցին" x={504} y={940} size={30} color={C.ink} width={700} opacity={ramp(t, m.removed + 0.4, 0.4)} />
    </Backdrop>
  );
};

const Why: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const hard = ramp(t, m.hard, 0.5);
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 140, top: 360, width: 760, height: 200, borderRadius: 28, background: "rgba(111,168,255,0.10)", border: `3px solid ${C.blue}`, padding: 28, boxSizing: "border-box", opacity: ramp(t, m.easy, 0.4) * (1 - 0.6 * hard) }}>
        <div style={{ fontFamily: FONT, fontSize: 34, fontWeight: 800, color: C.blue }}>Համեմատել՝ հեշտ</div>
        <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 600, color: C.ink, marginTop: 14 }}>«տպագիր + կայք» &gt; «միայն տպագիր» ✓</div>
      </div>
      <div style={{ position: "absolute", left: 140, top: 620, width: 760, height: 220, borderRadius: 28, background: "rgba(242,168,0,0.10)", border: `3px solid ${C.orange}`, padding: 28, boxSizing: "border-box", opacity: 0.35 + 0.65 * hard, transform: `scale(${1 + 0.04 * hard})` }}>
        <div style={{ fontFamily: FONT, fontSize: 34, fontWeight: 800, color: C.orange }}>Գնահատել՝ դժվար</div>
        <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 600, color: C.ink, marginTop: 14 }}>արժե՞ ընդհանրապես 125 դոլար վճարել</div>
      </div>
    </Backdrop>
  );
};

const Everywhere: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const rows: [string, string[], number][] = [["սուրճ", ["S", "M", "L"], m.coffee], ["կապ", ["10 ԳԲ", "50 ԳԲ", "60 ԳԲ"], m.phone], ["ծառայություն", ["Հիմնական", "Ստանդարտ", "Պրեմիում"], m.subs]];
  return (
    <Backdrop>
      <Title text={<>Երեք տարբերակ՝ <span style={{ color: C.orange }}>ամենուր</span></>} on={ramp(t, 0.2, 0.5)} y={282} size={40} />
      {rows.map(([label, opts, t0], r) => (
        <div key={r} style={{ position: "absolute", left: 130, top: 340 + r * 200, width: 790, opacity: ramp(t, t0, 0.4) }}>
          <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.dim, marginBottom: 10 }}>{label}</div>
          <div style={{ display: "flex", gap: 20 }}>
            {opts.map((o, k) => (
              <div key={k} style={{ flex: 1, height: 100, borderRadius: 20, background: k === 1 ? "rgba(242,168,0,0.12)" : "#1B1E25", border: `3px solid ${k === 1 ? C.orange : "#2B2F38"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontSize: 30, fontWeight: 800, color: C.ink }}>
                {o}{k === 1 ? <span style={{ fontSize: 22, color: C.orange, marginLeft: 8 }}>խայծ?</span> : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </Backdrop>
  );
};

const Limits: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const panel = (x: number, title: string, bar: number, on: number, note: string) => (
    <div style={{ position: "absolute", left: x, top: 380, width: 370, height: 420, borderRadius: 28, background: "#1B1E25", border: "3px solid #2B2F38", padding: 26, boxSizing: "border-box", opacity: on }}>
      <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 800, color: C.ink, height: 80, lineHeight: 1.2 }}>{title}</div>
      <div style={{ fontFamily: FONT, fontSize: 24, color: C.dim, marginBottom: 12 }}>էֆեկտը</div>
      <div style={{ height: 30, borderRadius: 15, background: "rgba(255,255,255,0.06)" }}>
        <div style={{ height: 30, width: `${bar * 100}%`, borderRadius: 15, background: C.orange }} />
      </div>
      <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.dim, marginTop: 18, lineHeight: 1.3 }}>{note}</div>
    </div>
  );
  return (
    <Backdrop>
      <Title text="Էֆեկտն այնքան ամուր չէ" on={ramp(t, 0.2, 0.5)} y={280} size={44} />
      {panel(130, "Իրական ապրանքներ", 0.04 * ramp(t, m.real + 1, 0.6), ramp(t, m.real, 0.4), "19 փորձ՝ համարյա զրո")}
      {panel(530, "Թվերով տարբերակներ", 0.55 * ramp(t, m.numbers + 0.6, 0.8), ramp(t, m.numbers, 0.4), "ավելի կայուն")}
      <div style={{ position: "absolute", left: 590, top: 840, opacity: ramp(t, m.notAll, 0.4), display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ padding: "8px 16px", borderRadius: 12, background: "#F4F1EA", color: C.bg, fontFamily: FONT, fontSize: 28, fontWeight: 800 }}>1800 ֏</div>
        <div style={{ fontFamily: FONT, fontSize: 60, fontWeight: 900, color: C.khaki }}>?</div>
      </div>
    </Backdrop>
  );
};

const Takeaway: React.FC = () => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.12)">
      <Bucket cx={360} bottom={680} size={2} opacity={ramp(t, 0.2, 0.5)} />
      <svg width="200" height="150" viewBox="0 0 200 150" style={{ position: "absolute", left: 560, top: 480, opacity: ramp(t, 0.5, 0.5) }}>
        <rect x="10" y="20" width="180" height="120" rx="18" fill="#6B4A2E" stroke="#3E2A19" strokeWidth="5" />
        <rect x="120" y="55" width="70" height="50" rx="12" fill="#8A6240" stroke="#3E2A19" strokeWidth="4" />
        <circle cx="145" cy="80" r="8" fill={C.orange} />
      </svg>
      <Title text={<>Ինձ որքա՞ն է պետք, և որքա՞ն եմ <span style={{ color: C.orange }}>պատրաստ վճարել</span></>} on={ramp(t, 0.4, 0.6)} y={760} size={46} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: (dur: number) => React.ReactNode };
const GROUPS: G[] = [
  { keys: ["hook", "choice", "medium", "gift", "name"], render: () => {
    const g0 = S.beat("hook").start;
    return <Popcorn m={{
      choice: rel(g0, S.beat("choice").start), ask: rel(g0, S.at("choice", "Դու")), medium: rel(g0, S.beat("medium").start),
      gift: rel(g0, S.beat("gift").start), name: rel(g0, S.beat("name").start), pure: rel(g0, S.at("name", "Ամենամաքուր")),
    }} />;
  } },
  { keys: ["economist"], render: () => {
    const g0 = S.beat("economist").start;
    return <Magazine m={{ offers: rel(g0, S.at("economist", "Միայն")), students: rel(g0, S.at("economist", "Ուսանողների")), removed: rel(g0, S.at("economist", "Հետո")) }} />;
  } },
  { keys: ["why"], render: () => {
    const g0 = S.beat("why").start;
    return <Why m={{ easy: rel(g0, S.at("why", "Գինն")), hard: rel(g0, S.at("why", "արժե")) }} />;
  } },
  { keys: ["everywhere"], render: () => {
    const g0 = S.beat("everywhere").start;
    return <Everywhere m={{ coffee: rel(g0, S.at("everywhere", "սուրճի")), phone: rel(g0, S.at("everywhere", "բջջային")), subs: rel(g0, S.at("everywhere", "ֆիլմերի")) }} />;
  } },
  { keys: ["limits"], render: () => {
    const g0 = S.beat("limits").start;
    return <Limits m={{ real: rel(g0, S.at("limits", "Հետազոտողների")), numbers: rel(g0, S.at("limits", "Այս")), notAll: rel(g0, S.at("limits", "Բայց", 1)) }} />;
  } },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const Decoy: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * DECOY_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * DECOY_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render(len / DECOY_FPS)}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`decoy_popcorn/${S.audio}`)} />
  </AbsoluteFill>
);
