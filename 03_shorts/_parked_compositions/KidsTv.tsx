// "Why do toddlers stick to shows like CoComelon?" (9:16 Short, draft for review; DECISIONS #28). All drawn; the kids'
// show frame is generic (no copy of any show). Study bars are qualitative (which group is lower), marked as sketches.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import TL from "../data/kids_tv.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { Card, SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "kids_tv", "portrait");
export const KIDS_FPS = 30;
const TAIL_S = 1.2;
export const KIDS_FRAMES = Math.ceil((S.duration + TAIL_S) * KIDS_FPS);
const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);
const Sketch: React.FC<{ on?: number }> = ({ on = 1 }) => (
  <div style={{ position: "absolute", right: 70, top: 1060, padding: "5px 12px", borderRadius: 12, background: "rgba(14,15,18,0.8)", color: C.dim, fontFamily: FONT, fontSize: 22, fontWeight: 700, opacity: on }}>նկարազարդում</div>
);
const SHOW = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#C77DFF"];

// a generic bright kids' show frame inside a TV; `cut` changes the layout every so often
const ShowFrame: React.FC<{ x: number; y: number; w: number; h: number; t: number; cutEvery?: number }> = ({ x, y, w, h, t, cutEvery = 1.4 }) => {
  const shot = Math.floor(t / cutEvery);
  const c = (i: number) => SHOW[(shot + i) % SHOW.length];
  const face = { cx: x + w * (0.35 + 0.3 * ((shot % 3) / 2)), cy: y + h * 0.55 };
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={16} fill={c(0)} />
      <circle cx={x + w * 0.8} cy={y + h * 0.25} r={h * 0.14} fill={c(1)} />
      <rect x={x + w * 0.05} y={y + h * 0.72} width={w * 0.9} height={h * 0.2} rx={10} fill={c(2)} />
      <circle cx={face.cx} cy={face.cy} r={h * 0.24} fill="#FFE0BD" />
      <circle cx={face.cx - h * 0.08} cy={face.cy - h * 0.04} r={h * 0.065} fill="#FFFFFF" />
      <circle cx={face.cx + h * 0.08} cy={face.cy - h * 0.04} r={h * 0.065} fill="#FFFFFF" />
      <circle cx={face.cx - h * 0.08} cy={face.cy - h * 0.035} r={h * 0.035} fill="#1B1E25" />
      <circle cx={face.cx + h * 0.08} cy={face.cy - h * 0.035} r={h * 0.035} fill="#1B1E25" />
      <path d={`M ${face.cx - h * 0.08} ${face.cy + h * 0.09} Q ${face.cx} ${face.cy + h * 0.16} ${face.cx + h * 0.08} ${face.cy + h * 0.09}`} stroke="#C0392B" strokeWidth={h * 0.025} fill="none" strokeLinecap="round" />
      <text x={x + w * 0.15} y={y + h * (0.3 + 0.05 * Math.sin(t * 6))} fontSize={h * 0.18} fill="#FFFFFF">♪</text>
    </g>
  );
};
const Tv: React.FC<{ x: number; y: number; w: number; h: number; t: number; cutEvery?: number; garbled?: number }> = ({ x, y, w, h, t, cutEvery, garbled = 0 }) => (
  <g>
    <rect x={x - 16} y={y - 16} width={w + 32} height={h + 32} rx={24} fill="#1B1E25" stroke="#3A3F48" strokeWidth={4} />
    <ShowFrame x={x} y={y} w={w} h={h} t={t} cutEvery={cutEvery} />
    {garbled > 0 ? <text x={x + w / 2} y={y - 34} textAnchor="middle" fontSize={44} fill={C.red} opacity={garbled} fontFamily={FONT} fontWeight={900}>#@%&?</text> : null}
  </g>
);
const Toddler: React.FC<{ x: number; y: number; s?: number; look?: number; glow?: number }> = ({ x, y, s = 1, look = 0, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={lerp(0, -18, look)} cy={-70} r={40} fill={glow ? `rgba(255,224,189,${0.5 + 0.5 * glow})` : "#2A2E35"} />
    <path d="M -50 40 Q -46 -24 0 -28 Q 46 -24 50 40 Z" fill="#2A2E35" />
  </g>
);
const Alert: React.FC<{ x: number; y: number; on: number }> = ({ x, y, on }) => (
  <g opacity={on} transform={`translate(${x} ${y}) scale(${0.7 + 0.3 * on})`}>
    <circle r={34} fill={C.orange} />
    <text y={16} textAnchor="middle" fontSize={48} fontWeight={900} fill={C.bg} fontFamily={FONT}>!</text>
  </g>
);
const blip = (t: number, every: number, t0 = 0) => {
  if (t < t0) return 0;
  const k = ((t - t0) % every) / every;
  return k < 0.25 ? 1 - k * 4 : 0;
};

// ---------- hook ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const dim = ramp(t, 0.5, 2.0);
  return (
    <Backdrop>
      <Title text={<>Ինչո՞ւ են փոքրերն <span style={{ color: C.orange }}>այդպես կպչում</span></>} on={1} y={200} size={50} />
      <Svg>
        <rect x={0} y={330} width={1080} height={770} fill={`rgba(60,64,72,${0.5 - 0.4 * dim})`} />
        <Tv x={280} y={380} w={520} h={300} t={t} />
        <path d="M 200 1000 Q 200 860 300 860 L 780 860 Q 880 860 880 1000 Z" fill="#3A2E3A" />
        <Toddler x={540} y={900} s={1.4} glow={0.4 + 0.3 * Math.sin(t * 9)} />
      </Svg>
      <Tag text="CoComelon" x={540} y={1060} size={36} color={C.dim} opacity={ramp(t, m.name, 0.4)} width={400} />
    </Backdrop>
  );
};

// ---------- reflex: the old "what is that?" response ----------
const Reflex: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const bush = ramp(t, m.ancestors - 1.0, 0.5) * (1 - ramp(t, m.screens, 0.4));
  const tv = ramp(t, m.screens, 0.5);
  const fire = Math.max(blip(t, 1.6, m.sudden), 0);
  return (
    <Backdrop>
      <Svg>
        <circle cx={300} cy={640} r={130} fill="#2E3440" stroke="#8A8F99" strokeWidth={4} />
        <Alert x={360} y={540} on={fire} />
        <g opacity={bush}>
          {[0, 1, 2].map((i) => <ellipse key={i} cx={720 + i * 60} cy={680 + 6 * Math.sin(t * 20 + i)} rx={70} ry={50} fill="#3E6A3A" />)}
        </g>
        <g opacity={tv}><Tv x={620} y={520} w={300} h={180} t={t} cutEvery={0.8} /></g>
      </Svg>
      <div style={{ position: "absolute", right: 70, top: 300, padding: "6px 14px", borderRadius: 12, background: "rgba(14,15,18,0.8)", color: C.orange, fontFamily: FONT, fontSize: 26, fontWeight: 750 }}>վարկած</div>
      <Tag text="«սա ի՞նչ է»" x={300} y={850} size={40} color={C.orange} opacity={ramp(t, m.sudden, 0.4)} width={400} />
    </Backdrop>
  );
};

// ---------- features: everything that triggers it, on a timeline ----------
const Features: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Svg>
        <Tv x={190} y={300} w={700} h={400} t={t} cutEvery={0.9} />
        <line x1={120} x2={960} y1={900} y2={900} stroke={C.dim} strokeWidth={3} />
        {Array.from({ length: 14 }, (_, i) => {
          const x = 140 + i * 60;
          return <Alert key={i} x={x} y={860} on={t > m.cuts - 0.5 + i * 0.15 ? 0.6 + 0.4 * blip(t, 0.9, i * 0.07) : 0} />;
        })}
      </Svg>
      <Tag text="ամեն անգամ՝ նոր ազդանշան" x={540} y={990} size={32} color={C.orange} opacity={ramp(t, m.brain, 0.4)} />
    </Backdrop>
  );
};

// ---------- repetition: the same song, the child guesses the chorus ----------
const Repetition: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const loop = 2.2;
  const phase = (t % loop) / loop;
  const chorus = phase > 0.62 && phase < 0.9;
  const anticip = phase > 0.5 && phase < 0.9 ? 1 : 0;
  return (
    <Backdrop>
      <Svg>
        {[0, 1, 2].map((r) => (
          <g key={r} opacity={ramp(t, 0.3 + r * 0.5, 0.4)}>
            <path d={Array.from({ length: 41 }, (_, i) => `${i ? "L" : "M"} ${140 + i * 20} ${380 + r * 120 + 26 * Math.sin(i * 0.9)}`).join(" ")} stroke={r === Math.floor(t / loop) % 3 ? C.orange : "#5A606A"} strokeWidth={6} fill="none" />
            <rect x={140 + 0.62 * 800} y={350 + r * 120} width={0.28 * 800} height={60} rx={10} fill="rgba(242,168,0,0.15)" />
          </g>
        ))}
        <line x1={140 + phase * 800} x2={140 + phase * 800} y1={340} y2={700} stroke={C.ink} strokeWidth={4} />
        <Toddler x={540} y={960} s={1.3} glow={ramp(t, m.guess - 1, 0.5) * anticip + (chorus ? 0.5 : 0)} />
      </Svg>
      <Tag text="նույն երգը" x={540} y={300} size={34} color={C.dim} opacity={ramp(t, m.rep, 0.4)} />
    </Backdrop>
  );
};

// ---------- not hypnosis: garbled speech, the child looks away ----------
const NotHypnosis: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const garble = ramp(t, m.garbled, 0.5);
  const away = ramp(t, m.garbled + 0.8, 0.6);
  const bar = lerp(1, 0.35, ramp(t, m.less, 1.0, easeInOut));
  return (
    <Backdrop>
      <Svg>
        <Tv x={120} y={360} w={360} h={220} t={t} />
        <Toddler x={300} y={820} s={1.1} glow={0.6} />
        <g opacity={garble}>
          <Tv x={620} y={360} w={360} h={220} t={t} garbled={1} />
          <Toddler x={800} y={820} s={1.1} look={away} />
          <rect x={900 + 0 * away} y={830} width={50} height={50} rx={8} fill={C.orange} opacity={away} />
        </g>
        <rect x={200} y={980} width={680} height={40} rx={10} fill="rgba(255,255,255,0.08)" />
        <rect x={200} y={980} width={680 * bar} height={40} rx={10} fill={C.orange} opacity={garble} />
      </Svg>
      <Tag text="ուշադրություն" x={540} y={1060} size={30} color={C.dim} opacity={garble} />
      <SourceLine text="Anderson et al., 1981: նախադպրոցականներ" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- combo: eye-catching and easy ----------
const Combo: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const a = ramp(t, 0.3, 0.5), b = ramp(t, m.easy, 0.5), both = ramp(t, m.combo, 0.6);
  return (
    <Backdrop>
      <Svg>
        <circle cx={lerp(300, 410, both)} cy={640} r={230} fill="rgba(242,168,0,0.25)" stroke={C.orange} strokeWidth={4} opacity={a} />
        <circle cx={lerp(780, 670, both)} cy={640} r={230} fill="rgba(111,168,255,0.25)" stroke="#6FA8FF" strokeWidth={4} opacity={b} />
        <ellipse cx={540} cy={640} rx={100 * both} ry={190 * both} fill="rgba(255,255,255,0.18)" opacity={0.6 + 0.4 * Math.sin(t * 4)} />
      </Svg>
      <Tag text="աչքը գրավող" x={lerp(270, 330, both)} y={640} size={34} opacity={a} width={300} />
      <Tag text="հասկանալի" x={lerp(810, 750, both)} y={640} size={34} opacity={b} width={300} />
      <div style={{ position: "absolute", left: 470, top: 930, padding: "6px 14px", borderRadius: 12, background: "rgba(14,15,18,0.8)", color: C.orange, fontFamily: FONT, fontSize: 28, fontWeight: 750, opacity: both }}>գուցե</div>
    </Backdrop>
  );
};

// ---------- study: three groups, the fast-cartoon group lower right after ----------
const Study: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const groups = [{ n: "արագ մուլտ", t0: m.fast, h: 0.62 }, { n: "դանդաղ մուլտ", t0: m.slow, h: 0.9 }, { n: "նկարում են", t0: m.draw, h: 0.92 }];
  const test = ramp(t, m.after, 1.0, easeInOut);
  return (
    <Backdrop>
      <Svg>
        {groups.map((g, gi) => (
          <g key={gi} opacity={ramp(t, g.t0, 0.4)}>
            {Array.from({ length: 20 }, (_, i) => <circle key={i} cx={130 + gi * 300 + (i % 5) * 34} cy={340 + Math.floor(i / 5) * 34} r={12} fill={gi === 0 ? C.orange : "#8A8F99"} />)}
            <rect x={150 + gi * 300} y={1000 - 340 * g.h * test} width={120} height={340 * g.h * test} rx={10} fill={gi === 0 ? C.orange : "#8A8F99"} />
          </g>
        ))}
      </Svg>
      {groups.map((g, gi) => <Tag key={gi} text={g.n} x={210 + gi * 300} y={1040} size={26} color={gi === 0 ? C.orange : C.dim} opacity={ramp(t, g.t0, 0.4)} width={280} />)}
      <Tag text="կադր՝ 11 վրկ-ը մեկ / 34 վրկ-ը մեկ" x={540} y={540} size={26} color={C.dim} opacity={ramp(t, m.slow, 0.4)} width={700} />
      <Tag text="ուշադրության առաջադրանք" x={540} y={600} size={26} color={C.dim} opacity={test} width={600} />
      <Sketch on={test} />
      <SourceLine text="Lillard & Peterson, Pediatrics, 2011" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- caveat: fantastical events, and CoComelon itself untested ----------
const Caveat: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const later = ramp(t, m.later, 0.5);
  const q = ramp(t, m.cocomelon, 0.4);
  return (
    <Backdrop>
      <Svg>
        <rect x={180} y={1000 - 340 * 0.62} width={200} height={340 * 0.62} rx={12} fill={C.orange} />
        <rect x={180} y={1000 - 340} width={200} height={340} rx={12} fill="none" stroke="#5A606A" strokeWidth={3} strokeDasharray="10 8" />
        <g opacity={later}>
          <rect x={460} y={1000 - 340 * 0.66} width={200} height={340 * 0.66} rx={12} fill="#C77DFF" />
          <rect x={460} y={1000 - 340} width={200} height={340} rx={12} fill="none" stroke="#5A606A" strokeWidth={3} strokeDasharray="10 8" />
        </g>
      </Svg>
      <Tag text="արագ + ֆանտաստիկ (2011)" x={280} y={1040} size={24} color={C.orange} width={320} />
      <Tag text="միայն ֆանտաստիկ (2020)" x={560} y={1040} size={24} color="#D9A8FF" opacity={later} width={320} />
      <Tag text="Քոքոմելոն ?" x={850} y={760} size={40} weight={900} color={C.orange} opacity={q} width={320} />
      <Sketch />
      <SourceLine text="Li et al., Frontiers in Psychology, 2020" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- guidelines: WHO 2019 ----------
const Guidelines: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const under2 = ramp(t, m.two, 0.5), up4 = ramp(t, m.hour, 0.5), other = ramp(t, m.others, 0.5);
  return (
    <Backdrop>
      <div style={{ opacity: 1 - other }}>
        <Svg>
          <line x1={140} x2={940} y1={560} y2={560} stroke={C.ink} strokeWidth={4} />
          {[0, 2, 4].map((a, i) => <g key={a}><line x1={140 + i * 400} x2={140 + i * 400} y1={540} y2={580} stroke={C.ink} strokeWidth={4} /></g>)}
          <g opacity={under2}>
            <rect x={240} y={640} width={200} height={130} rx={12} fill="#2E333B" stroke="#5A606A" strokeWidth={3} />
            <path d="M 230 630 L 450 780 M 450 630 L 230 780" stroke={C.red} strokeWidth={10} strokeLinecap="round" />
          </g>
        </Svg>
        {[0, 2, 4].map((a, i) => <Tag key={a} text={String(a)} x={140 + i * 400} y={510} size={34} width={80} />)}
        <Tag text="տարեկան" x={540} y={450} size={28} color={C.dim} width={300} />
        <Tag text="նստած էկրան՝ ոչ" x={340} y={830} size={30} color={C.red} opacity={under2} width={360} />
        <Tag text="≤ 1 ժամ, քիչը՝ ավելի լավ" x={740} y={700} size={30} color={C.orange} opacity={up4} width={400} />
      </div>
      <div style={{ opacity: other }}>
        <Svg>
          <line x1={240} x2={840} y1={600} y2={560} stroke={C.ink} strokeWidth={8} />
          <path d="M 540 580 L 500 760 L 580 760 Z" fill="#3A3F48" />
        </Svg>
        <Tag text="րոպեներ" x={260} y={660} size={34} width={300} />
        <Tag text="ինչ և ինչպես" x={820} y={620} size={34} color={C.orange} width={320} />
        <Tag text="որոշ մասնագետների կարծիքով" x={540} y={880} size={28} color={C.dim} width={600} />
      </div>
      <SourceLine text="WHO, 2019" on={ramp(t, 0.3, 0.5) * (1 - other)} />
    </Backdrop>
  );
};

// ---------- tips ----------
const Tips: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const off = ramp(t, m.autoplay + 0.4, 0.3);
  return (
    <Backdrop>
      <Card text="🐢 ավելի դանդաղ, պատմությամբ" x={140} y={330} w={800} on={pop(t, m.slow)} />
      <Card text={<>autoplay <span style={{ display: "inline-block", width: 90, height: 40, borderRadius: 20, background: off > 0.5 ? "#5A606A" : C.green, verticalAlign: "middle", position: "relative" }}><span style={{ position: "absolute", top: 4, left: off > 0.5 ? 4 : 54, width: 32, height: 32, borderRadius: 16, background: "#FFF" }} /></span></>} x={140} y={520} w={800} on={pop(t, m.autoplay)} />
      <Card text="👨‍👧 միասին դիտել ու խոսել" x={140} y={710} w={800} on={pop(t, m.together)} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  const lights = ramp(t, 4, 1.5);
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Svg>
        <rect x={0} y={330} width={1080} height={770} fill={`rgba(120,110,90,${0.05 + 0.2 * lights})`} />
        <Tv x={280} y={560} w={520} h={300} t={t} />
      </Svg>
      <Title text={<>Ուղեղն արձագանքում է նորին և <span style={{ color: C.orange }}>վայելում ծանոթը</span></>} on={ramp(t, 0.3, 0.6)} y={260} size={50} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ name: at("hook", "Քոքոմելոնի") }} /> },
  { keys: ["reflex"], render: () => <Reflex m={{ sudden: at("reflex", "Կտրուկ"), ancestors: at("reflex", "նախնիներին"), screens: at("reflex", "էկրանները") }} /> },
  { keys: ["features"], render: () => <Features m={{ cuts: at("features", "կադրափոխություն"), brain: at("features", "Ուղեղը") }} /> },
  { keys: ["repetition"], render: () => <Repetition m={{ rep: at("repetition", "կրկնություն"), guess: at("repetition", "գուշակում") }} /> },
  { keys: ["not_hypnosis"], render: () => <NotHypnosis m={{ garbled: at("not_hypnosis", "անհասկանալի"), less: at("not_hypnosis", "քիչ") }} /> },
  { keys: ["combo"], render: () => <Combo m={{ easy: at("combo", "հասկանալ"), combo: at("combo", "համադրությունն") }} /> },
  { keys: ["study"], render: () => <Study m={{ fast: at("study", "արագ", 0), slow: at("study", "դանդաղ"), draw: at("study", "նկարեց"), after: at("study", "Արագ") }} /> },
  { keys: ["caveat"], render: () => <Caveat m={{ later: at("caveat", "Հետագա"), cocomelon: at("caveat", "Քոքոմելոնի") }} /> },
  { keys: ["guidelines"], render: () => <Guidelines m={{ two: at("guidelines", "2", 0), hour: at("guidelines", "1"), others: at("guidelines", "որոշ") }} /> },
  { keys: ["tips"], render: () => <Tips m={{ slow: at("tips", "դանդաղ"), autoplay: at("tips", "ավտոմատ"), together: at("tips", "դիտել") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const KidsTv: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * KIDS_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * KIDS_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`kids_tv/${S.audio}`)} />
  </AbsoluteFill>
);
