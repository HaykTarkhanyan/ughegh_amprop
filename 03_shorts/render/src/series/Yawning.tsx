// "Why is yawning contagious?" (9:16 Short, draft for review; DECISIONS #28). All drawn: one cartoon face whose yawn
// is a single 0..1 value, reused for the crowd, the mirror pair and the kin ties. The scatter in the 'but' beat is an
// illustration of "no pattern", marked as such, not the study's data.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, random, staticFile } from "remotion";
import TL from "../data/yawning.json";
import { C, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { Card, SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "yawning", "portrait");
export const YAWN_FPS = 30;
const TAIL_S = 1.2;
export const YAWN_FRAMES = Math.ceil((S.duration + TAIL_S) * YAWN_FPS);

// a yawn: 0 -> 1 -> 0 over `d` seconds from t0
const yawn = (t: number, t0: number, d = 2.6) => {
  const k = (t - t0) / d;
  return k <= 0 || k >= 1 ? 0 : Math.pow(Math.sin(Math.PI * k), 0.7);
};
const SKIN = ["#F1C9A5", "#D9A57A", "#E8B996", "#C98E62"];

// the face, centred on (x, y) with radius r
const Face: React.FC<{ x: number; y: number; r: number; y0: number; skin?: string; ring?: string }> = ({ x, y, r, y0, skin = SKIN[0], ring }) => {
  const eyeH = Math.max(0.6, 7 * (1 - y0)) * (r / 60);
  return (
    <g transform={`translate(${x} ${y}) rotate(${-8 * y0})`}>
      {ring ? <circle r={r + 8} fill="none" stroke={ring} strokeWidth={4} /> : null}
      <circle r={r} fill={skin} />
      <ellipse cx={-r * 0.36} cy={-r * 0.18} rx={r * 0.11} ry={eyeH} fill="#2A1E16" />
      <ellipse cx={r * 0.36} cy={-r * 0.18} rx={r * 0.11} ry={eyeH} fill="#2A1E16" />
      <path d={`M ${-r * 0.52} ${-r * (0.42 + 0.12 * y0)} q ${r * 0.16} ${-r * 0.1} ${r * 0.32} 0 M ${r * 0.2} ${-r * (0.42 + 0.12 * y0)} q ${r * 0.16} ${-r * 0.1} ${r * 0.32} 0`} stroke="#5A3E2A" strokeWidth={r * 0.06} fill="none" strokeLinecap="round" />
      {y0 > 0.05 ? (
        <ellipse cx={0} cy={r * 0.38} rx={r * (0.18 + 0.1 * y0)} ry={r * 0.42 * y0} fill="#5A1E1E" />
      ) : (
        <path d={`M ${-r * 0.22} ${r * 0.38} q ${r * 0.22} ${r * 0.12} ${r * 0.44} 0`} stroke="#5A1E1E" strokeWidth={r * 0.07} fill="none" strokeLinecap="round" />
      )}
    </g>
  );
};
const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);

// ---------- hook ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Title text={<>Զգուշացում՝ <span style={{ color: C.orange }}>կհորանջես</span></>} on={1} y={230} size={56} />
      <Svg>
        <Face x={330} y={680} r={150} y0={yawn(t, 0.3, 4.2)} />
        <Face x={760} y={720} r={110} y0={yawn(t, m.catch, 3.5)} skin={SKIN[1]} />
      </Svg>
    </Backdrop>
  );
};

// ---------- contagious: about half of a crowd catches it, then reading is enough ----------
const HALF = new Set(Array.from({ length: 100 }, (_, i) => i).filter((i) => random(`half-${i}`) < 0.5));
const Contagious: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const book = ramp(t, m.read, 0.5);
  return (
    <Backdrop>
      <div style={{ opacity: 1 - book }}>
        <Svg>
          <rect x={354} y={250} width={300} height={190} rx={14} fill="#1B1E25" stroke="#5A606A" strokeWidth={4} />
          <Face x={504} y={345} r={70} y0={yawn(t, 0.3, 3)} />
          {Array.from({ length: 100 }, (_, i) => {
            const x = 150 + (i % 10) * 78, y = 520 + Math.floor(i / 10) * 56;
            const d = Math.hypot(x - 504, y - 440) / 600; // the ripple spreads from the screen
            return <Face key={i} x={x} y={y} r={22} y0={HALF.has(i) ? yawn(t, m.half + d * 1.6, 2.2) : 0} skin={SKIN[i % 4]} />;
          })}
        </Svg>
        <Tag text="մոտ կեսը" x={504} y={1100} size={38} color={C.orange} opacity={ramp(t, m.half + 0.8, 0.4)} />
      </div>
      <Svg opacity={book}>
        <path d="M 300 760 L 504 720 L 708 760 L 708 960 L 504 920 L 300 960 Z" fill="#E9E1CC" stroke="#A88C5A" strokeWidth={4} />
        <line x1={504} y1={720} x2={504} y2={920} stroke="#A88C5A" strokeWidth={4} />
        <Face x={504} y={530} r={100} y0={yawn(t, m.read + 0.8, 3)} />
      </Svg>
      <Tag text="հորանջ" x={404} y={830} size={36} color="#2A2018" weight={800} opacity={book} width={200} />
      <SourceLine text="Provine, 1986" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- why_yawn: the oxygen idea, tested and not confirmed ----------
const Head: React.FC<{ x: number; y: number; s?: number; children?: React.ReactNode }> = ({ x, y, s = 1, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 120 Q -190 -60 -60 -170 Q 80 -230 160 -110 Q 200 -40 170 30 L 200 90 L 160 100 L 165 150 Q 120 190 60 170 L 40 260 L -110 260 Z" fill="#2E3440" stroke="#8A8F99" strokeWidth={5} />
    {children}
  </g>
);
const WhyYawn: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const o2 = ramp(t, m.oxygen, 1.4, easeInOut);
  const popped = ramp(t, m.notConfirmed, 0.2);
  const stamp = Math.min(1, pop(t, m.notConfirmed, 12, 0.5));
  return (
    <Backdrop>
      <Svg>
        <Head x={504} y={650} />
        {o2 > 0 && popped < 1 ? (
          <g opacity={1 - popped} transform={`translate(${lerp(880, 470, o2)} ${lerp(330, 560, o2)}) scale(${1 + popped})`}>
            <circle r={60} fill="rgba(111,168,255,0.25)" stroke="#6FA8FF" strokeWidth={4} />
            <text y={16} textAnchor="middle" fontSize={44} fontWeight={800} fill="#9EC3FF" fontFamily="sans-serif">O₂</text>
          </g>
        ) : null}
      </Svg>
      <div style={{ position: "absolute", left: 250, top: 900, width: 508, padding: "12px 0", border: `7px solid ${C.red}`, borderRadius: 16, textAlign: "center", fontSize: 52, fontWeight: 900, color: C.red, fontFamily: "NotoArm, sans-serif", transform: `rotate(-6deg) scale(${2 - stamp})`, opacity: stamp, background: "rgba(14,15,18,0.6)" }}>չհաստատվեց</div>
    </Backdrop>
  );
};

// ---------- cooling: cool air in, warm blood out ----------
const Cooling: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const therm = ramp(t, m.cools, 0.5);
  const air = ramp(t, m.breath, 1.0);
  const jaw = yawn(t, m.jaw - 0.6, 3.2);
  const flow = ramp(t, m.blood, 0.6);
  const temp = lerp(1, 0.55, ramp(t, m.blood, 2.0, easeInOut));
  const q = ramp(t, m.doubt, 0.4);
  return (
    <Backdrop>
      <Svg>
        <Face x={504} y={620} r={230} y0={jaw} />
        <g opacity={therm} transform="translate(504 470)">
          <rect x={-14} y={-90} width={28} height={150} rx={14} fill="#E9E6DF" />
          <rect x={-8} y={-84 + 140 * (1 - temp)} width={16} height={140 * temp} rx={8} fill={C.red} />
          <circle cy={70} r={24} fill={C.red} />
        </g>
        {[0, 1, 2].map((i) => {
          const k = (air * 1.4 - i * 0.2);
          return k > 0 && k < 1.2 ? <path key={i} d={`M ${180 - 40 * i} ${880 + 30 * i} Q ${330} ${900} ${lerp(200, 480, Math.min(1, k))} ${lerp(880, 720, Math.min(1, k))}`} stroke="#6FC3FF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={Math.min(1, 1.2 - k + 0.2)} /> : null;
        })}
        {[0, 1, 2].map((i) => {
          const k = ((t - m.blood) * 0.7 + i * 0.33) % 1;
          return flow > 0 ? <path key={`r${i}`} d={`M ${640 + i * 40} ${520} q 60 ${-40 - 80 * k} 120 ${-140 * k - 20}`} stroke={C.red} strokeWidth={7} fill="none" strokeLinecap="round" opacity={flow * (1 - k)} /> : null;
        })}
      </Svg>
      <Tag text="?" x={860} y={330} size={120} weight={900} color={C.orange} opacity={q} width={200} />
      <SourceLine text="Gallup & Gallup, 2007" on={ramp(t, m.cools - 0.5, 0.5)} />
    </Backdrop>
  );
};

// ---------- empathy: two faces mirror each other ----------
const Empathy: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const heart = ramp(t, m.empathy, 0.5);
  const y0 = yawn(t, m.mirror, 2.4);
  return (
    <Backdrop>
      <Svg>
        <Face x={300} y={640} r={150} y0={y0} />
        <Face x={710} y={640} r={150} y0={yawn(t, m.mirror + 0.35, 2.4)} skin={SKIN[1]} />
        <g opacity={heart} transform={`translate(504 560) scale(${1 + 0.06 * Math.sin(t * 6)})`}>
          <path d="M 0 30 C -50 -10 -40 -60 0 -36 C 40 -60 50 -10 0 30 Z" fill={C.red} />
        </g>
        <path d="M 460 640 Q 504 600 548 640" stroke={C.red} strokeWidth={4} fill="none" strokeDasharray="8 8" opacity={heart} />
      </Svg>
    </Backdrop>
  );
};

// ---------- kin: thick ties catch first ----------
const TIES = [{ n: "ազգականներ", w: 18 }, { n: "ընկերներ", w: 11 }, { n: "ծանոթներ", w: 6 }, { n: "անծանոթներ", w: 2.5 }];
const Kin: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const cues = [m.kin, m.friends, m.known, m.strangers];
  return (
    <Backdrop>
      <Svg>
        {TIES.map((tie, i) => {
          const y = 360 + i * 190;
          return (
            <g key={i} opacity={ramp(t, 0.3 + i * 0.2, 0.4)}>
              <line x1={290} y1={640} x2={640} y2={y} stroke={C.orange} strokeWidth={tie.w} strokeLinecap="round" opacity={0.85} />
              <Face x={700} y={y} r={56} y0={yawn(t, cues[i], 2.2)} skin={SKIN[(i + 1) % 4]} ring={ramp(t, cues[i], 0.3) > 0 ? C.orange : undefined} />
            </g>
          );
        })}
        <Face x={230} y={640} r={90} y0={yawn(t, m.yawn, 2.4)} />
      </Svg>
      {TIES.map((tie, i) => (
        <Tag key={i} text={`${i + 1}. ${tie.n}`} x={900} y={360 + i * 190 + 84} size={28} color={ramp(t, cues[i], 0.3) > 0 ? C.orange : C.dim} width={340} opacity={ramp(t, 0.3 + i * 0.2, 0.4)} />
      ))}
      <SourceLine text="Norscia & Palagi, 2011" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- but: 328 people, empathy scores predict nothing; age a little ----------
const DOTS = Array.from({ length: 328 }, (_, i) => ({ gx: 160 + (i % 20) * 38, gy: 330 + Math.floor(i / 20) * 38, e: random(`em-${i}`), y: random(`yw-${i}`), a: random(`ag-${i}`) }));
const But: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const show = ramp(t, 0.2, 0.6); // the 328 dots are up from the beat's first frame
  const scatter = ramp(t, m.empathy, 1.2, easeInOut);
  const age = ramp(t, m.age, 1.2, easeInOut);
  const card = ramp(t, m.later, 0.5);
  const X0 = 180, X1 = 880, Y0 = 950, Y1 = 380;
  return (
    <Backdrop>
      <Svg opacity={show * (1 - 0.6 * card)}>
        {scatter > 0 ? (
          <g opacity={scatter}>
            <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={C.dim} strokeWidth={3} />
            <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke={C.dim} strokeWidth={3} />
          </g>
        ) : null}
        {DOTS.map((d, i) => {
          // age: a slight downward tilt (older people catch it a little less)
          const sy = lerp(d.y, d.y * 0.75 + (1 - d.a) * 0.25, age);
          const sx = lerp(d.e, d.a, age);
          return <circle key={i} cx={lerp(d.gx, lerp(X0 + 20, X1 - 20, sx), scatter)} cy={lerp(d.gy, lerp(Y0 - 20, Y1 + 20, sy), scatter)} r={8} fill={C.orange} opacity={0.8} />;
        })}
      </Svg>
      <Tag text="328 մարդ" x={504} y={1060} size={38} opacity={ramp(t, m.n, 0.4) * (1 - scatter)} />
      <Tag text="կարեկցանք" x={(X0 + X1) / 2} y={Y0 + 44} size={30} color={C.dim} opacity={scatter * (1 - age) * (1 - card)} width={400} />
      <Tag text="տարիք" x={(X0 + X1) / 2} y={Y0 + 44} size={30} color={C.dim} opacity={age * (1 - card)} width={400} />
      <Tag text="հորանջ" x={X0 - 10} y={Y1 - 30} size={28} color={C.dim} opacity={scatter * (1 - card)} width={200} />
      <Tag text="նկարազարդում" x={X1 - 60} y={Y1 - 30} size={22} weight={650} color={C.dim} opacity={scatter * (1 - card)} width={260} />
      <Card text="Ավելի ուշ հետազոտություն՝ կապ կարեկցանքի հետ" x={150} y={560} w={708} on={pop(t, m.later)} />
      <SourceLine text="Bartholomew & Cirulli, 2014" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- unknown: a puzzle with missing pieces ----------
const Unknown: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const pieces = [{ n: "սառեցում", x: 160, y: 380 }, { n: "կարեկցանք", x: 560, y: 380 }, { n: "տարիք", x: 160, y: 600 }];
  return (
    <Backdrop>
      {pieces.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: 360, height: 180, borderRadius: 18, border: "4px dashed #8A8F99", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 750, color: `rgba(138,143,153,${ramp(t, m.dontKnow + i * 0.3, 0.4)})`, fontFamily: "NotoArm, sans-serif", opacity: ramp(t, 0.2, 0.4) }}>{p.n}</div>
      ))}
      <Card text="վարակիչ է ✓" x={560} y={600} w={360} on={pop(t, m.sure)} color={C.green} size={36} />
      <Card text="թթվածին ✗" x={360} y={820} w={360} on={pop(t, m.oxygen)} color={C.red} size={36} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.12)">
      <Svg><Face x={504} y={760} r={170} y0={yawn(t, Math.max(0.5, m.count - 1.5), 4)} /></Svg>
      <Title text={<>Քանի՞ անգամ <span style={{ color: C.orange }}>հորանջեցիր</span></>} on={ramp(t, m.count, 0.5)} y={330} size={60} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ catch: at("hook", "կհորանջես") }} /> },
  { keys: ["contagious"], render: () => <Contagious m={{ half: at("contagious", "կեսը"), read: at("contagious", "կարդալը") }} /> },
  { keys: ["why_yawn"], render: () => <WhyYawn m={{ oxygen: at("why_yawn", "թթվածին"), notConfirmed: at("why_yawn", "չհաստատվեց") }} /> },
  { keys: ["cooling"], render: () => <Cooling m={{ cools: at("cooling", "սառեցնում"), breath: at("cooling", "շունչ"), jaw: at("cooling", "ծնոտը"), blood: at("cooling", "արյան"), doubt: at("cooling", "կասկածողներ") }} /> },
  { keys: ["empathy"], render: () => <Empathy m={{ empathy: at("empathy", "կարեկցանքն"), mirror: at("empathy", "կրկնում") }} /> },
  { keys: ["kin"], render: () => <Kin m={{ yawn: at("kin", "Հորանջն"), kin: at("kin", "ազգականներից"), friends: at("kin", "ընկերներից"), known: at("kin", "ծանոթներից"), strangers: at("kin", "անծանոթներից") }} /> },
  { keys: ["but"], render: () => <But m={{ n: at("but", "328"), empathy: at("but", "կարեկցանքի", 0), age: at("but", "տարիքը"), later: at("but", "Իսկ") }} /> },
  { keys: ["unknown"], render: () => <Unknown m={{ dontKnow: at("unknown", "չգիտենք"), sure: at("unknown", "Հաստատ"), oxygen: at("unknown", "թթվածնի") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway m={{ count: at("takeaway", "Քանի՞") }} /> },
];

export const Yawning: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * YAWN_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * YAWN_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`yawning/${S.audio}`)} />
  </AbsoluteFill>
);
