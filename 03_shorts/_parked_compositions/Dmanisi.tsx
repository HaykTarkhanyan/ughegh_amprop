// "The toothless man from Dmanisi" (9:16 Short, draft for review; DECISIONS #28). Real photos from Commons
// (dmanisi/assets/credits.json): the D3444 cranium (Ryan Somma, CC BY-SA 2.0) and Mauricio Antón's painting (CC BY 4.0,
// cropped to the old man and the food, tagged as an artist's impression the whole time, F157). Map: Natural Earth.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import W50 from "world-atlas/countries-50m.json";
import TL from "../data/dmanisi.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "dmanisi", "portrait");
export const DM_FPS = 30;
const TAIL_S = 1.2;
export const DM_FRAMES = Math.ceil((S.duration + TAIL_S) * DM_FPS);
const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);

const topo = W50 as unknown as Topology<{ countries: GeometryCollection }>;
const ALL = (feature(topo, topo.objects.countries) as FeatureCollection).features as Feature<Geometry>[];
const WORLD: FeatureCollection = { type: "FeatureCollection", features: ALL.filter((f) => f.id !== "010") };
const pick = (id: string) => {
  const f = ALL.find((x) => x.id === id);
  if (!f) throw new Error(`country ${id} missing`);
  return f;
};
const ARMENIA = pick("051"), GEORGIA = pick("268");
const DMANISI: [number, number] = [44.34, 41.33];

// the skull photo in a frame; `jaw` 0..1 zooms towards the toothless upper jaw
const Skull: React.FC<{ x: number; y: number; w: number; h: number; jaw?: number; ring?: number; opacity?: number }> = ({ x, y, w, h, jaw = 0, ring = 0, opacity = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 22, overflow: "hidden", opacity, background: "#000", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
    <Img src={staticFile("dmanisi/d3444_skull.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "55% 55%", transform: `scale(${1 + 0.6 * jaw})`, transformOrigin: "68% 78%" }} />
    {ring > 0 ? (
      <svg width={w} height={h} style={{ position: "absolute", left: 0, top: 0, opacity: ring }}>
        <ellipse cx={w * (0.66 + 0.02 * jaw)} cy={h * (0.8 - 0.02 * jaw)} rx={w * (0.16 + 0.08 * jaw)} ry={h * (0.07 + 0.04 * jaw)} fill="none" stroke={C.orange} strokeWidth={6} strokeDasharray="14 10" />
      </svg>
    ) : null}
  </div>
);

// ---------- hook ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Title text={<>Ինչպե՞ս ապրեց <span style={{ color: C.orange }}>առանց ատամների</span></>} on={1} y={200} size={48} />
      <Skull x={60} y={340} w={960} h={700} jaw={ramp(t, m.lost, 3, easeInOut)} ring={ramp(t, m.lost + 0.4, 0.5)} />
      <Tag text="?" x={900} y={420} size={130} weight={900} color={C.orange} opacity={ramp(t, m.how, 0.4)} width={200} />
    </Backdrop>
  );
};

// ---------- find: Dmanisi, next door; out of Africa ----------
const Find: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const out = ramp(t, m.africa, 1.6, easeInOut);
  const scale = Math.exp(lerp(Math.log(2600), Math.log(420), out));
  const center: [number, number] = [lerp(44.5, 28, out), lerp(41, 20, out)];
  const p = geoMercator().scale(scale).center(center).translate([540, 640]);
  const path = geoPath(p);
  const [dx, dy] = p(DMANISI) ?? [540, 640];
  const af = p([25, 5]) ?? [540, 900];
  const arrow = ramp(t, m.africa + 0.8, 1.0, easeInOut);
  return (
    <Backdrop>
      <Svg>
        <defs><clipPath id="dm-win"><rect x={30} y={200} width={1020} height={890} rx={28} /></clipPath></defs>
        <rect x={30} y={200} width={1020} height={890} rx={28} fill="#101722" />
        <g clipPath="url(#dm-win)">
          <path d={path(WORLD) ?? ""} fill="#2C323C" stroke="#434B58" strokeWidth={1.2} />
          <path d={path(ARMENIA) ?? ""} fill={C.orange} opacity={0.8 * ramp(t, m.near, 0.5)} />
          <path d={path(GEORGIA) ?? ""} fill="#4A90E2" opacity={0.55 * ramp(t, m.dmanisi, 0.5)} />
          <circle cx={dx} cy={dy} r={12 + 4 * Math.sin(t * 6)} fill={C.red} opacity={ramp(t, m.dmanisi, 0.4)} stroke={C.ink} strokeWidth={3} />
          {arrow > 0 ? <path d={`M ${af[0]} ${af[1]} Q ${(af[0] + dx) / 2 - 120} ${(af[1] + dy) / 2} ${lerp(af[0], dx, arrow)} ${lerp(af[1], dy, arrow)}`} stroke={C.orange} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray="18 12" /> : null}
        </g>
      </Svg>
      <div style={{ position: "absolute", left: 270, top: 1000, width: 540, padding: "10px 0", borderRadius: 14, background: C.panel, border: `2px solid ${C.orange}`, textAlign: "center", fontFamily: FONT, fontSize: 38, fontWeight: 800, color: C.ink, opacity: ramp(t, m.dmanisi, 0.5) * (1 - out) }}>Դմանիսի, Վրաստան</div>
      <Tag text="Հայաստան" x={(p([45, 40.1]) ?? [0, 0])[0]} y={(p([45, 40.1]) ?? [0, 0])[1]} size={30} opacity={ramp(t, m.near, 0.5) * (1 - out)} width={260} />
      <Tag text="Աֆրիկա" x={af[0]} y={af[1] + 40} size={34} opacity={arrow} width={260} />
    </Backdrop>
  );
};

// ---------- sockets: an empty tooth socket fills with bone over years ----------
const Sockets: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const fall = ramp(t, m.falls, 0.8, easeInOut);
  const fill = ramp(t, m.fills, 4.0, (x) => x);
  const years = ramp(t, m.years, 0.4);
  return (
    <Backdrop>
      <Svg>
        <path d="M 140 760 Q 540 520 940 760 L 940 860 Q 540 640 140 860 Z" fill="#E6D9BF" stroke="#A8946A" strokeWidth={4} />
        {Array.from({ length: 6 }, (_, i) => {
          const a = 0.16 + i * 0.136;
          const x = lerp(170, 910, a), y = 760 - Math.sin(a * Math.PI) * 240 + 40;
          const depth = 44 * (1 - fill);
          return (
            <g key={i}>
              <path d={`M ${x - 26} ${y} Q ${x} ${y + depth + 6} ${x + 26} ${y}`} fill="#3A2E22" opacity={1 - fill * 0.95} />
              <rect x={x - 22} y={y - 70 - 400 * fall} width={44} height={70} rx={14} fill="#F4F1EA" opacity={1 - fall} />
            </g>
          );
        })}
        <rect x={240} y={980} width={600} height={14} rx={7} fill="#2E333B" />
        <rect x={240} y={980} width={600 * fill} height={14} rx={7} fill={C.orange} />
        <circle cx={240 + 600 * fill} cy={987} r={18} fill={C.orange} />
      </Svg>
      <Tag text="տարիներ" x={540} y={1050} size={40} color={C.orange} opacity={years} />
      <Tag text="նկարազարդում" x={900} y={1100} size={22} weight={650} color={C.dim} width={240} />
    </Backdrop>
  );
};

// ---------- story: the paleo-art, always tagged ----------
const Story: React.FC = () => {
  const t = useT();
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 90, top: 260, width: 900, height: 820, borderRadius: 22, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
        <Img src={staticFile("dmanisi/homo_erectus_care_anton.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "78% 40%", transform: `scale(${1.75 + 0.012 * t}) translateX(${-6 * t}px)`, transformOrigin: "74% 44%" }} />
        <div style={{ position: "absolute", left: 16, bottom: 16, padding: "6px 14px", borderRadius: 14, background: "rgba(14,15,18,0.84)", color: C.orange, fontFamily: FONT, fontSize: 28, fontWeight: 750 }}>նկարչի պատկերացում</div>
      </div>
      <SourceLine text="Նկարչի պատկերացում՝ Mauricio Antón" on={1} />
    </Backdrop>
  );
};

// ---------- bone_says .. both: what the bone says vs what we add ----------
const Entry: React.FC<{ text: string; x: number; y: number; on: number; solid?: boolean; glow?: number }> = ({ text, x, y, on, solid = false, glow = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 440, padding: "14px 18px", borderRadius: 16, border: `4px ${solid ? "solid" : "dashed"} ${solid ? C.ink : C.orange}`, fontFamily: FONT, fontSize: 32, fontWeight: 750, color: C.ink, background: solid ? "rgba(244,241,234,0.08)" : `rgba(242,168,0,${0.06 + 0.2 * glow})`, opacity: Math.min(1, on), transform: `translateY(${(1 - Math.min(1, on)) * -40}px)`, boxShadow: glow ? `0 0 ${24 * glow}px rgba(242,168,0,0.6)` : undefined }}>{text}</div>
);
const Columns: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const cols = ramp(t, m.lived, 0.5);
  const help = pop(t, m.help), soft = pop(t, m.soft);
  const bonobo = ramp(t, m.bonobo, 0.8, easeInOut);
  const adapt = pop(t, m.adapt);
  const glow = ramp(t, m.all, 0.6) * (0.6 + 0.4 * Math.sin(t * 4));
  return (
    <Backdrop>
      <Skull x={190} y={210} w={700} h={400} />
      <Tag text="ոսկորն ասում է" x={290} y={680} size={30} color={C.dim} opacity={cols} width={440} />
      <Tag text="մենք ավելացնում ենք" x={790} y={680} size={30} color={C.orange} opacity={cols} width={460} />
      <Svg opacity={cols}><line x1={540} x2={540} y1={660} y2={1080} stroke="#3A3F48" strokeWidth={3} /></Svg>
      <Entry text="ապրել է առանց ատամների" x={60} y={730} on={ramp(t, m.lived, 0.5)} solid />
      <Entry text="օգնություն" x={580} y={730} on={help} glow={glow} />
      <Entry text="փափուկ սնունդ" x={580} y={850} on={soft} glow={glow} />
      <Entry text="հարմարվել" x={580} y={970} on={adapt} glow={glow} />
      <Svg opacity={bonobo}>
        <g transform={`translate(${lerp(1200, 960, bonobo)} 880) scale(0.9)`}>
          <circle cx={0} cy={-46} r={22} fill="#3A2E28" />
          <path d="M -26 -24 Q 0 -34 26 -24 L 34 30 L 18 30 L 14 0 L -14 0 L -18 30 L -34 30 Z" fill="#3A2E28" />
          <path d="M -26 -18 L -46 26 M 26 -18 L 46 26" stroke="#3A2E28" strokeWidth={10} strokeLinecap="round" />
        </g>
      </Svg>
      <SourceLine text={t < m.bonobo ? "Lordkipanidze et al., Nature, 2005" : "Surbeck et al., 2020"} on={ramp(t, m.authors, 0.5)} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Skull x={60} y={430} w={960} h={620} opacity={0.75} />
      <Title text={<>Ամենագեղեցիկ պատմություններն <span style={{ color: C.orange }}>ամենաշատն է պետք ստուգել</span></>} on={ramp(t, 0.3, 0.6)} y={200} size={48} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ lost: at("hook", "կորցրեց"), how: at("hook", "Ինչպե՞ս") }} /> },
  { keys: ["find"], render: () => <Find m={{ near: at("find", "հարևանությամբ"), dmanisi: at("find", "Դմանիսի"), africa: at("find", "Աֆրիկայից") }} /> },
  { keys: ["sockets"], render: () => <Sockets m={{ falls: at("sockets", "ընկնում"), fills: at("sockets", "լցվում"), years: at("sockets", "տարիներ") }} /> },
  { keys: ["story"], render: () => <Story /> },
  { keys: ["bone_says", "authors", "bonobo", "both"], render: () => {
    const g0 = S.beat("bone_says").start;
    const r = (k: string, w: string, nth?: number) => rel(g0, S.at(k, w, nth));
    return <Columns m={{ lived: r("bone_says", "ապրել"), authors: rel(g0, S.beat("authors").start), help: r("authors", "օգնել"), soft: r("authors", "փափուկ"), bonobo: r("bonobo", "բոնոբոներից"), adapt: r("both", "հարմարվել"), all: r("both", "Ոսկորը") }} />;
  } },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const Dmanisi: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * DM_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * DM_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`dmanisi/${S.audio}`)} />
  </AbsoluteFill>
);
