// "Why QWERTY? Not to slow typists down" (9:16 Short, draft for review; DECISIONS #28). All drawn (no brand logos).
// Keys are individual elements, so letters can travel from the alphabetical prototype rows to QWERTY. The Armenian
// phonetic flip shows only letters whose match is the same in every phonetic layout (Ա on A, Ս on S, ...).
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import TL from "../data/qwerty.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "qwerty", "portrait");
export const QW_FPS = 30;
const TAIL_S = 1.2;
export const QW_FRAMES = Math.ceil((S.duration + TAIL_S) * QW_FPS);
const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);

const QWERTY = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const ALPHA = ["ABCDEFGHIJKLM", "NOPQRSTUVWXYZ"];
const ARM: Record<string, string> = { A: "Ա", S: "Ս", D: "Դ", F: "Ֆ", G: "Գ", H: "Հ", K: "Կ", L: "Լ", Z: "Զ", V: "Վ", B: "Բ", N: "Ն", M: "Մ", T: "Տ", E: "Ե", I: "Ի", P: "Պ", R: "Ռ", O: "Օ" };
const KW = 84, KG = 8;
const qPos = (ch: string, x0 = 120, y0 = 560) => {
  for (let r = 0; r < 3; r++) {
    const c = QWERTY[r].indexOf(ch);
    if (c >= 0) return { x: x0 + r * 30 + c * (KW + KG), y: y0 + r * (KW + KG) };
  }
  throw new Error(`no key ${ch}`);
};
const aPos = (ch: string) => {
  for (let r = 0; r < 2; r++) {
    const c = ALPHA[r].indexOf(ch);
    if (c >= 0) return { x: 40 + c * 77, y: 600 + r * 100 };
  }
  throw new Error(`no key ${ch}`);
};
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// the keyboard; k: 0 = alphabetical prototype rows, 1 = QWERTY; lit letters glow; arm flips letters to Armenian
const Keyboard: React.FC<{ k?: number; lit?: Record<string, number>; arm?: number; y0?: number; scale?: number }> = ({ k = 1, lit = {}, arm = 0, y0 = 560, scale = 1 }) => (
  <Svg>
    <g transform={`translate(540 ${y0 + 130}) scale(${scale}) translate(-540 ${-(y0 + 130)})`}>
      <rect x={90} y={y0 - 40} width={960} height={350} rx={28} fill="#1B1E25" stroke="#3A3F48" strokeWidth={4} opacity={k} />
      {LETTERS.map((ch) => {
        const q = qPos(ch, 120, y0), a = aPos(ch);
        const x = lerp(a.x, q.x, k), y = lerp(a.y, q.y, k);
        const w = lerp(68, KW, k);
        const l = lit[ch] ?? 0;
        const armOn = ARM[ch] ? arm : 0;
        return (
          <g key={ch}>
            <rect x={x} y={y} width={w} height={w} rx={14} fill={l > 0 ? `rgba(242,168,0,${0.25 + 0.75 * l})` : "#2E333B"} stroke="#4A505A" strokeWidth={2} />
            <text x={x + w / 2} y={y + w * 0.66} textAnchor="middle" fontFamily={FONT} fontSize={w * 0.5} fontWeight={800} fill={l > 0.5 ? C.bg : C.ink} opacity={1 - armOn}>{ch}</text>
            {armOn > 0 ? <text x={x + w / 2} y={y + w * 0.66} textAnchor="middle" fontFamily={FONT} fontSize={w * 0.5} fontWeight={800} fill={C.orange} opacity={armOn}>{ARM[ch]}</text> : null}
          </g>
        );
      })}
    </g>
  </Svg>
);

// ---------- hook ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const lit = Object.fromEntries("QWERTY".split("").map((ch, i) => [ch, ramp(t, 0.3 + i * 0.25, 0.2)]));
  const stamp = Math.min(1, pop(t, m.myth, 12, 0.5));
  return (
    <Backdrop>
      <Title text={<span style={{ color: C.orange }}>QWERTY</span>} on={1} y={220} size={80} />
      <Keyboard lit={lit} />
      <Tag text="«որ դանդաղեցնեն»" x={540} y={980} size={44} color={C.dim} opacity={ramp(t, m.layout, 0.5)} />
      <div style={{ position: "absolute", left: 290, top: 940, width: 500, padding: "10px 0", border: `7px solid ${C.red}`, borderRadius: 16, textAlign: "center", fontFamily: FONT, fontSize: 52, fontWeight: 900, color: C.red, transform: `rotate(-7deg) scale(${2 - stamp})`, opacity: stamp, background: "rgba(14,15,18,0.6)" }}>առասպել</div>
    </Backdrop>
  );
};

// ---------- sholes: from alphabetical rows to QWERTY ----------
const Sholes: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const k = ramp(t, m.changed, Math.max(2, m.first - m.changed + 3), easeInOut);
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 230, top: 260, width: 620, padding: "12px 0", borderRadius: 16, background: C.panel, border: `2px solid ${C.orange}`, textAlign: "center", fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.ink, opacity: ramp(t, m.sholes, 0.5) }}>Քրիստոֆեր Շոուլզ</div>
      <Keyboard k={k} />
      <SourceLine text="1860-1870-ականներ" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- jam: typebars collide ----------
const Jam: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const jam = ramp(t, m.bars, 0.6);
  const q = ramp(t, m.debate, 0.4);
  const CX = 540, CY = 820;
  return (
    <Backdrop>
      <Svg>
        <rect x={340} y={380} width={400} height={60} rx={10} fill="#E9E1CC" />
        {Array.from({ length: 13 }, (_, i) => {
          const a = Math.PI + (i / 12) * Math.PI;
          const swing = i === 6 || i === 7 ? jam * (0.5 + 0.5 * Math.abs(Math.sin(t * 2))) : 0;
          const ex = CX + 300 * Math.cos(a), ey = CY + 300 * Math.sin(a) * 0.6;
          const tx = lerp(ex, CX + (i === 6 ? -8 : 8), swing), ty = lerp(ey, 440, swing);
          return <line key={i} x1={ex} y1={ey + 140} x2={tx} y2={ty} stroke={swing > 0 ? C.orange : "#8A8F99"} strokeWidth={8} strokeLinecap="round" />;
        })}
      </Svg>
      <Tag text="?" x={820} y={420} size={130} weight={900} color={C.orange} opacity={q} width={200} />
    </Backdrop>
  );
};

// ---------- telegraph: Z vs S E in American Morse ----------
const Telegraph: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const tick = Math.sin(t * 14) > 0.6 ? 1 : 0;
  const morse = ramp(t, m.pair, 0.5);
  const slide = ramp(t, m.placed, 1.0, easeInOut);
  const dot = (x: number, y: number, w = 22) => <rect x={x} y={y} width={w} height={22} rx={11} fill={C.orange} />;
  return (
    <Backdrop>
      <Svg>
        <g transform="translate(540 380)" opacity={ramp(t, m.operators, 0.5)}>
          <rect x={-160} y={40} width={320} height={40} rx={10} fill="#5A3E26" />
          <rect x={-100} y={tick ? 10 : 0} width={200} height={24} rx={10} fill="#B87333" />
          <circle cx={100} cy={tick ? 6 : -4} r={18} fill="#1B1E25" />
        </g>
        <g opacity={morse}>
          {[0, 1, 2].map((i) => dot(300 + i * 40, 520))}{dot(460, 520)}
          {[0, 1, 2].map((i) => dot(300 + i * 40, 600))}{dot(460, 600)}
        </g>
      </Svg>
      <Tag text="Z" x={240} y={532} size={40} weight={900} opacity={morse} width={80} />
      <Tag text="S E" x={230} y={612} size={40} weight={900} opacity={morse} width={120} />
      <Tag text="=" x={560} y={572} size={60} weight={900} color={C.orange} opacity={morse} width={80} />
      <div style={{ position: "absolute", left: 0, top: 120 * slide, width: 1080, opacity: ramp(t, m.placed - 0.3, 0.4) }}>
        <Keyboard y0={720} scale={0.85} lit={{ Z: slide, S: slide, E: slide }} />
      </div>
      <SourceLine text="Yasuoka & Yasuoka, 2011" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- remington: a drawn 1873 machine ----------
const Remington: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const icons = ramp(t, m.guns, 0.4) * (1 - ramp(t, m.layout, 0.4));
  return (
    <Backdrop>
      <Svg>
        <path d="M 200 900 L 880 900 L 820 640 L 260 640 Z" fill="#2A2E35" stroke="#5A606A" strokeWidth={4} />
        <rect x={300} y={520} width={480} height={90} rx={30} fill="#1B1E25" stroke="#5A606A" strokeWidth={4} />
        <rect x={340} y={430} width={400} height={80} rx={6} fill="#E9E1CC" />
        {QWERTY.map((row, r) => row.split("").map((ch, c) => (
          <g key={ch}>
            <circle cx={300 + r * 22 + c * 52} cy={690 + r * 64} r={22} fill="#E9E1CC" stroke="#8A8F99" strokeWidth={2} />
            <text x={300 + r * 22 + c * 52} y={699 + r * 64} textAnchor="middle" fontSize={22} fontWeight={800} fill="#1B1E25" fontFamily={FONT}>{ch}</text>
          </g>
        )))}
        <g opacity={icons}>
          <path d="M 120 360 L 330 340 L 340 356 L 200 372 L 160 400 L 130 396 Z" fill="#8A8F99" />
          <path d="M 760 330 h 150 v 30 h -40 v 50 h -70 v -50 h -40 z" fill="#8A8F99" />
        </g>
      </Svg>
      <SourceLine text="1873" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- standard: passed along like a baton ----------
const Standard: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const cues = [0.2, m.teletype, m.computer, m.phone];
  const names = ["գրամեքենա", "հեռատիպ", "համակարգիչ", "հեռախոս"];
  return (
    <Backdrop>
      {cues.map((c, i) => {
        const on = ramp(t, c, 0.4);
        const y = 330 + i * 190;
        return (
          <React.Fragment key={i}>
            <Svg opacity={on}>
              <rect x={i === 3 ? 470 : 300} y={y - 50} width={i === 3 ? 140 : 480} height={i === 3 ? 140 : 100} rx={16} fill="#2E333B" stroke="#5A606A" strokeWidth={3} />
              {"QWERTY".split("").map((ch, k) => <rect key={ch} x={(i === 3 ? 480 : 320) + k * (i === 3 ? 20 : 60)} y={y - 30} width={i === 3 ? 16 : 50} height={i === 3 ? 16 : 40} rx={6} fill={C.orange} opacity={0.4 + 0.6 * ramp(t, c + 0.2 + k * 0.05, 0.2)} />)}
              {i < 3 ? <path d={`M 540 ${y + 60} L 540 ${y + 130} M 525 ${y + 112} L 540 ${y + 132} L 555 ${y + 112}`} stroke={C.orange} strokeWidth={5} fill="none" opacity={ramp(t, cues[i + 1], 0.3)} /> : null}
            </Svg>
            <Tag text={names[i]} x={880} y={y} size={30} color={C.dim} opacity={on} width={260} />
          </React.Fragment>
        );
      })}
      <SourceLine text="1893" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- armenian: the phonetic layout ----------
const ArmenianKeys: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Keyboard arm={ramp(t, m.flip, 1.2, easeInOut)} lit={{ A: ramp(t, m.example, 0.4), S: ramp(t, m.example, 0.4) }} />
      <Tag text="հնչյունային դասավորություն" x={540} y={400} size={34} color={C.dim} opacity={ramp(t, m.flip, 0.5)} width={700} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  const lit = Object.fromEntries("QWERTY".split("").map((ch, i) => [ch, 0.4 + 0.6 * Math.max(0, Math.sin(t * 3 - i * 0.5))]));
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Keyboard lit={lit} y0={700} />
      <Title text={<>Ամեն նոր մեքենա <span style={{ color: C.orange }}>ժառանգեց նախորդի ստեղնաշարը</span></>} on={ramp(t, 0.3, 0.6)} y={290} size={52} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ layout: at("hook", "քվերթի"), myth: at("hook", "առասպել") }} /> },
  { keys: ["sholes"], render: () => <Sholes m={{ sholes: at("sholes", "Շոուլզն"), changed: at("sholes", "փոխվեց"), first: at("sholes", "Առաջին") }} /> },
  { keys: ["jam"], render: () => <Jam m={{ bars: at("jam", "լծակները"), debate: at("jam", "վիճում") }} /> },
  { keys: ["telegraph"], render: () => <Telegraph m={{ operators: at("telegraph", "հեռագրիչներն"), pair: at("telegraph", "Մորզեի", 1), placed: at("telegraph", "դրեցին") }} /> },
  { keys: ["remington"], render: () => <Remington m={{ guns: at("remington", "զենք"), layout: at("remington", "ստեղնաշարն") }} /> },
  { keys: ["standard"], render: () => <Standard m={{ teletype: at("standard", "հեռատիպերին"), computer: at("standard", "համակարգիչներին"), phone: at("standard", "հեռախոսներին") }} /> },
  { keys: ["armenian"], render: () => <ArmenianKeys m={{ flip: at("armenian", "հայերեն"), example: at("armenian", "օրինակ") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const Qwerty: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * QW_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * QW_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`qwerty/${S.audio}`)} />
  </AbsoluteFill>
);
