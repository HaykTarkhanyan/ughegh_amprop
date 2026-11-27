// "Petrov, 26 September 1983: the man who did not believe the computer" (9:16 Short, draft for review; DECISIONS #28).
// All drawn. The radar is a real polar map (Natural Earth outlines, azimuthal equidistant around the North Pole, the USA
// at the bottom, the USSR at the top). Blips sit over Malmstrom AFB, Montana, where the false launches were reported.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { geoAzimuthalEquidistant, geoGraticule10, geoPath } from "d3-geo";
import type { GeoProjection } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { FeatureCollection } from "geojson";
import W110 from "world-atlas/countries-110m.json";
import TL from "../data/petrov.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { Card, SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "petrov", "portrait");
export const PETROV_FPS = 30;
const TAIL_S = 1.2;
export const PETROV_FRAMES = Math.ceil((S.duration + TAIL_S) * PETROV_FPS);

const topo = W110 as unknown as Topology<{ countries: GeometryCollection }>;
const WORLD = feature(topo, topo.objects.countries) as FeatureCollection;
const GRAT = geoGraticule10();
const PHOSPHOR = "#3BE37A";
const ALERT = "#FF3B3B";
const MALMSTROM: [number, number] = [-111.2, 47.5];
const RX = 504, RY = 640, RR = 330;
const polar = (): GeoProjection => geoAzimuthalEquidistant().rotate([100, -90]).clipAngle(80).scale(RR / ((80 * Math.PI) / 180)).translate([RX, RY]);

// the radar screen: polar map, sweep, blips
const Radar: React.FC<{ t: number; blips?: number; blipOn?: number; dim?: number; orbit?: number; sat?: number }> = ({ t, blips = 0, blipOn = 1, dim = 0, orbit = 0, sat = 0 }) => {
  const p = polar();
  const path = geoPath(p);
  const [bx, by] = p(MALMSTROM) ?? [RX, RY + 200];
  const sweep = (t * 70) % 360;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: 1 - 0.65 * dim }}>
      <defs>
        <clipPath id="radar-clip"><circle cx={RX} cy={RY} r={RR} /></clipPath>
        <radialGradient id="radar-bg"><stop offset="0%" stopColor="#06210F" /><stop offset="100%" stopColor="#020A05" /></radialGradient>
      </defs>
      <circle cx={RX} cy={RY} r={RR + 18} fill="#1A1D22" stroke="#3A3F48" strokeWidth={6} />
      <circle cx={RX} cy={RY} r={RR} fill="url(#radar-bg)" />
      <g clipPath="url(#radar-clip)">
        <path d={path(GRAT) ?? ""} fill="none" stroke={PHOSPHOR} strokeOpacity={0.12} strokeWidth={1.5} />
        <path d={path(WORLD) ?? ""} fill="rgba(59,227,122,0.10)" stroke={PHOSPHOR} strokeOpacity={0.55} strokeWidth={1.5} />
        <g transform={`rotate(${sweep} ${RX} ${RY})`}>
          <path d={`M ${RX} ${RY} L ${RX} ${RY - RR} A ${RR} ${RR} 0 0 1 ${RX + RR * Math.sin(0.5)} ${RY - RR * Math.cos(0.5)} Z`} fill="rgba(59,227,122,0.16)" />
          <line x1={RX} y1={RY} x2={RX} y2={RY - RR} stroke={PHOSPHOR} strokeWidth={3} strokeOpacity={0.8} />
        </g>
        {orbit > 0 ? (
          <g opacity={orbit}>
            <ellipse cx={RX + 40} cy={RY + 60} rx={250} ry={150} fill="none" stroke="#9EC3FF" strokeWidth={2.5} strokeDasharray="10 8" transform={`rotate(-25 ${RX + 40} ${RY + 60})`} />
            <g transform={`rotate(-25 ${RX + 40} ${RY + 60})`}>
              <circle cx={RX + 40 + 250 * Math.cos(sat)} cy={RY + 60 + 150 * Math.sin(sat)} r={11} fill="#9EC3FF" />
            </g>
          </g>
        ) : null}
        {Array.from({ length: blips }, (_, i) => (
          <circle key={i} cx={bx + [0, 14, -12, 6, -4][i]} cy={by + [0, -8, 6, 14, -14][i]} r={9 + 3 * Math.sin(t * 8 + i)} fill={ALERT} opacity={blipOn} style={{ filter: "drop-shadow(0 0 8px #FF3B3B)" }} />
        ))}
      </g>
    </svg>
  );
};
const WarnLight: React.FC<{ t: number; on?: number }> = ({ t, on = 1 }) => {
  const blink = 0.35 + 0.65 * (Math.sin(t * 7) > 0 ? 1 : 0.15);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: on }}>
      <circle cx={900} cy={250} r={34} fill={ALERT} opacity={blink} style={{ filter: `drop-shadow(0 0 ${30 * blink}px #FF3B3B)` }} />
      <rect x={862} y={284} width={76} height={18} rx={6} fill="#3A3F48" />
    </svg>
  );
};
const Silhouette: React.FC<{ x: number; y: number; s?: number; opacity?: number; tilt?: number }> = ({ x, y, s = 1, opacity = 1, tilt = 0 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${tilt})`}>
      <circle cx={0} cy={-120} r={46} fill="#0A0B0D" stroke="#3A3F48" strokeWidth={3} />
      <path d="M -95 30 Q -90 -60 0 -66 Q 90 -60 95 30 Z" fill="#0A0B0D" stroke="#3A3F48" strokeWidth={3} />
    </g>
  </svg>
);
// the chain of command, bottom (the bunker) to top
const CHAIN = ["բունկեր", "շտաբ", "ղեկավարություն"];
const Chain: React.FC<{ t: number; t0: number; hiBottom?: number; q?: number; up?: number }> = ({ t, t0, hiBottom = 0, q = 0, up = 0 }) => (
  <>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      {CHAIN.map((_, i) => {
        const y = 900 - i * 230;
        const on = ramp(t, t0 + i * 0.4, 0.4);
        return (
          <g key={i} opacity={on}>
            <rect x={300} y={y - 60} width={408} height={120} rx={22} fill={C.panel} stroke={i === 0 && hiBottom > 0 ? C.orange : "#5A606A"} strokeWidth={i === 0 ? 3 + 4 * hiBottom : 3} />
            {i < 2 ? <path d={`M 504 ${y - 66} L 504 ${y - 164} M 488 ${y - 146} L 504 ${y - 166} L 520 ${y - 146}`} stroke={i === 0 && up > 0 ? C.orange : "#8A8F99"} strokeWidth={5} fill="none" /> : null}
          </g>
        );
      })}
      {up > 0 ? <circle cx={504} cy={lerp(830, 440, up)} r={14} fill={C.orange} opacity={up < 1 ? 1 : 0} /> : null}
    </svg>
    {CHAIN.map((name, i) => (
      <Tag key={name} text={name} x={504} y={900 - i * 230 + 6} size={38} opacity={ramp(t, t0 + i * 0.4, 0.4)} width={400} />
    ))}
    <Tag text="?" x={790} y={440} size={110} weight={900} color={C.orange} opacity={q} width={200} />
    <Tag text="?" x={220} y={440} size={110} weight={900} color={C.orange} opacity={q} width={200} />
  </>
);

// ---------- scenes ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop glow="rgba(255,59,59,0.06)">
      <Radar t={t} blips={1} />
      <WarnLight t={t} />
      <Silhouette x={170} y={1060} s={0.9} opacity={ramp(t, m.man, 0.6)} />
      <SourceLine text="26 սեպտեմբերի 1983" on={1} />
    </Backdrop>
  );
};

const Context: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const plane = ramp(t, m.kal, 0.5);
  const sides = ramp(t, m.sides, 0.5);
  const cal = 1 - ramp(t, m.sides - 0.3, 0.4);
  const X0 = 180, Y0 = 400, CW = 104, CH = 88;
  return (
    <Backdrop>
      <div style={{ opacity: cal }}>
        <Tag text="Սեպտեմբեր 1983" x={504} y={320} size={48} />
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          {Array.from({ length: 30 }, (_, i) => {
            const k = i + 3; // 1 September 1983 was a Thursday (Monday-first grid)
            const x = X0 + (k % 7) * CW, y = Y0 + Math.floor(k / 7) * CH;
            const d = i + 1;
            return (
              <g key={d}>
                <rect x={x} y={y} width={CW - 8} height={CH - 8} rx={10} fill={d === 1 ? `rgba(242,168,0,${0.25 * plane})` : C.panel} stroke={d === 26 ? ALERT : "#2E333B"} strokeWidth={d === 26 ? 4 : 2} />
                <text x={x + 14} y={y + 34} fontFamily={FONT} fontSize={26} fontWeight={700} fill={C.dim}>{d}</text>
              </g>
            );
          })}
          <g opacity={plane} transform={`translate(${X0 + 3 * CW + 58} ${Y0 + 50}) rotate(45)`}>
            <path d="M 0 -26 L 5 -8 L 26 4 L 26 10 L 5 4 L 4 18 L 11 24 L 11 28 L 0 25 L -11 28 L -11 24 L -4 18 L -5 4 L -26 10 L -26 4 L -5 -8 Z" fill={C.orange} />
          </g>
        </svg>
      </div>
      <div style={{ opacity: sides }}>
        <Tag text="ԱՄՆ" x={250} y={640} size={64} color="#6FA8FF" width={360} />
        <Tag text="ԽՍՀՄ" x={760} y={640} size={64} color={ALERT} width={360} />
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M 400 ${600 + i * 40} ${Array.from({ length: 8 }, (_, j) => `L ${420 + j * 30} ${600 + i * 40 + (j % 2 ? -14 : 14) * (0.6 + 0.4 * Math.sin(t * 9 + i))}`).join(" ")}`} stroke={C.orange} strokeWidth={4} fill="none" />
          ))}
        </svg>
      </div>
    </Backdrop>
  );
};

const Bunker: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const orbit = ramp(t, m.oko - 0.6, 0.6);
  return (
    <Backdrop>
      <Radar t={t} orbit={orbit} sat={t * 0.8} />
      <div style={{ position: "absolute", left: 230, top: 1000, width: 548, padding: "12px 0", borderRadius: 16, background: C.panel, border: `2px solid ${C.orange}`, textAlign: "center", fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.ink, opacity: ramp(t, m.name, 0.5) }}>Ստանիսլավ Պետրով</div>
      <Tag text="«Օկո»" x={800} y={330} size={40} color="#9EC3FF" opacity={orbit} width={300} />
    </Backdrop>
  );
};

const Alarm: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const n = t < m.one ? 0 : t < m.four ? 1 : Math.min(5, 1 + Math.floor((t - m.four) / 0.18) + 1);
  const siren = ramp(t, m.one, 0.3) * (0.5 + 0.5 * Math.sin(t * 9));
  const flash = ramp(t, m.attack, 0.2) * (Math.sin(t * 14) > -0.2 ? 1 : 0.2);
  return (
    <Backdrop glow={`rgba(255,59,59,${0.05 + 0.18 * siren})`}>
      <Radar t={t} blips={n} />
      <WarnLight t={t} />
      <Tag text={String(n)} x={170} y={300} size={130} weight={900} color={ALERT} opacity={n > 0 ? 1 : 0} width={240} />
      <Tag text="ՀԱՐՁԱԿՈՒՄ" x={504} y={1040} size={64} weight={900} color={ALERT} opacity={flash} />
    </Backdrop>
  );
};

const Stakes: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const clock = ramp(t, m.minutes, 0.4);
  const left = 1 - ramp(t, m.minutes, 6, (x) => x);
  return (
    <Backdrop>
      <Chain t={t} t0={0.3} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: clock }}>
        <circle cx={850} cy={440} r={80} fill={C.panel} stroke="#5A606A" strokeWidth={4} />
        <path d={`M 850 440 L 850 360 A 80 80 0 ${left > 0.5 ? 1 : 0} 1 ${850 + 80 * Math.sin(2 * Math.PI * left)} ${440 - 80 * Math.cos(2 * Math.PI * left)} Z`} fill={ALERT} opacity={0.8} />
      </svg>
    </Backdrop>
  );
};

const Reasoning: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Silhouette x={504} y={1080} s={0.8} opacity={ramp(t, 0.2, 0.5)} tilt={-6 + 3 * Math.sin(t * 1.5)} />
      <Card text="5 հրթիռ, ոչ թե հարյուրներ" x={150} y={300} w={708} on={pop(t, m.five)} />
      <Card text="նոր համակարգ" x={150} y={470} w={708} on={pop(t, m.fresh)} />
      <Card text="ռադարները՝ ոչինչ" x={150} y={640} w={708} on={pop(t, m.radar)} />
    </Backdrop>
  );
};

const Decision: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const phone = ramp(t, m.report, 0.4);
  const stamp = Math.min(1, pop(t, m.error, 12, 0.5));
  const fade = 1 - ramp(t, m.error + 0.4, 1.5);
  const right = ramp(t, m.right, 0.4);
  return (
    <Backdrop>
      <Radar t={t} blips={5} blipOn={fade} dim={0.4} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: phone }}>
        <g transform="translate(170 1010)">
          <rect x={-70} y={-20} width={140} height={60} rx={14} fill="#2A2E35" stroke="#5A606A" strokeWidth={3} />
          <path d="M -80 -30 Q 0 -80 80 -30 L 70 -10 Q 0 -50 -70 -10 Z" fill="#2A2E35" stroke="#5A606A" strokeWidth={3} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 230, top: 560, width: 548, padding: "16px 0", border: `8px solid ${ALERT}`, borderRadius: 18, textAlign: "center", fontFamily: FONT, fontSize: 52, fontWeight: 900, color: ALERT, transform: `rotate(-8deg) scale(${2 - stamp})`, opacity: stamp, background: "rgba(14,15,18,0.6)" }}>սխալ ազդանշան</div>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: right }}>
        <path d="M 820 960 L 860 1000 L 940 910" stroke={C.green} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Backdrop>
  );
};

const Unsure: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const sec = (t * 0.5) % 1; // a slow second hand: the minutes felt endless
  return (
    <Backdrop>
      <Radar t={t} dim={0.5} />
      <Silhouette x={180} y={1070} s={0.9} opacity={ramp(t, 0.2, 0.5)} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: ramp(t, m.minutes, 0.5) }}>
        <circle cx={860} cy={1000} r={74} fill={C.panel} stroke={C.ink} strokeWidth={4} />
        <line x1={860} y1={1000} x2={860 + 60 * Math.sin(2 * Math.PI * sec)} y2={1000 - 60 * Math.cos(2 * Math.PI * sec)} stroke={ALERT} strokeWidth={4} />
        <circle cx={860} cy={1000} r={6} fill={C.ink} />
      </svg>
    </Backdrop>
  );
};

const Cause: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const sun = ramp(t, 0.15, 0.5); // the low sun is there from the first frame; its ray starts on the word
  const clouds = ramp(t, m.clouds, 0.5);
  const sat = ramp(t, m.sat, 0.5);
  const ray1 = ramp(t, m.sun + 0.6, 1.2, easeInOut);
  const ray2 = ramp(t, m.sat + 0.3, 1.0, easeInOut);
  const flare = Math.min(1, pop(t, m.flare));
  const CX = 560, CY = 760; // the cloud
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d="M -100 1100 Q 540 960 1180 1100 L 1180 1300 L -100 1300 Z" fill="#14321F" stroke="#2B6A43" strokeWidth={3} />
        <g opacity={sun}>
          <circle cx={130} cy={1000} r={70} fill="#FFC94A" style={{ filter: "drop-shadow(0 0 30px #FFC94A)" }} />
        </g>
        <g opacity={clouds}>
          {[[-60, 0, 60], [0, -24, 74], [70, 0, 58], [20, 16, 66]].map(([dx, dy, r], i) => <ellipse key={i} cx={CX + dx} cy={CY + dy} rx={r * 1.4} ry={r * 0.6} fill="#DDE3EA" />)}
        </g>
        <line x1={180} y1={970} x2={lerp(180, CX - 30, ray1)} y2={lerp(970, CY + 20, ray1)} stroke="#FFC94A" strokeWidth={6} />
        <line x1={CX + 20} y1={CY - 30} x2={lerp(CX + 20, 860, ray2)} y2={lerp(CY - 30, 330, ray2)} stroke="#FFC94A" strokeWidth={6} strokeDasharray="14 8" />
        <g opacity={sat} transform="translate(880 300)">
          <rect x={-22} y={-22} width={44} height={44} rx={6} fill="#9EC3FF" />
          <rect x={-90} y={-12} width={60} height={24} fill="#4E6FA8" />
          <rect x={30} y={-12} width={60} height={24} fill="#4E6FA8" />
        </g>
        <g opacity={flare} transform="translate(880 410)">
          {Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={0} x2={44 * Math.cos((i * Math.PI) / 4)} y2={44 * Math.sin((i * Math.PI) / 4)} stroke={ALERT} strokeWidth={6} />)}
          <circle r={14} fill={ALERT} />
        </g>
      </svg>
      <Tag text="Հյուսիսային Դակոտա" x={CX} y={CY + 110} size={34} opacity={ramp(t, m.dakota, 0.5)} width={500} />
      <Tag text="«հրթիռ»" x={880} y={500} size={36} color={ALERT} opacity={flare} width={300} />
    </Backdrop>
  );
};

const Bayes: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const w = [ramp(t, m.w1, 0.5), ramp(t, m.w2, 0.5), ramp(t, m.w3, 0.5)];
  const alarm = ramp(t, m.alarm, 0.5);
  // the alarm pulls the beam towards "attack"; each piece of context pulls it back, past level, towards "error"
  const tilt = lerp(0, 14, alarm) - 9 * (w[0] + w[1] + w[2]);
  const ang = (tilt * Math.PI) / 180;
  const PX = 504, PY = 520, L = 330;
  const lx = PX - L * Math.cos(ang), ly = PY - L * Math.sin(ang) * -1;
  const rx = PX + L * Math.cos(ang), ry = PY - L * Math.sin(ang);
  const dots = ramp(t, 0.15, 0.4) * (1 - ramp(t, m.alarm, 0.4)); // the Bayes video's crowd, from the beat's first frame
  const WEIGHTS = ["5 հրթիռ՝ քիչ հավանական", "նոր համակարգ", "ռադարները՝ լուռ"];
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: dots }}>
        {Array.from({ length: 120 }, (_, i) => <circle key={i} cx={300 + (i % 15) * 28} cy={420 + Math.floor(i / 15) * 28} r={8} fill={i < 2 ? C.red : i < 4 ? C.orange : "#5A606A"} />)}
      </svg>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: ramp(t, m.alarm - 0.2, 0.4) }}>
        <path d={`M ${PX} ${PY} L ${PX - 60} 1000 L ${PX + 60} 1000 Z`} fill="#3A3F48" />
        <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
        <circle cx={PX} cy={PY} r={14} fill={C.ink} />
        {[[lx, ly], [rx, ry]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x - 80} y2={y + 130} stroke="#8A8F99" strokeWidth={3} />
            <line x1={x} y1={y} x2={x + 80} y2={y + 130} stroke="#8A8F99" strokeWidth={3} />
            <path d={`M ${x - 110} ${y + 130} L ${x + 110} ${y + 130} Q ${x} ${y + 175} ${x - 110} ${y + 130} Z`} fill="#5A606A" />
          </g>
        ))}
        <circle cx={lx} cy={ly + 100} r={30} fill={ALERT} opacity={alarm} style={{ filter: "drop-shadow(0 0 10px #FF3B3B)" }} />
        {w.map((k, i) => <rect key={i} x={rx - 70 + i * 50} y={ry + 70 - i * 0} width={40} height={50} rx={6} fill={C.orange} opacity={k} />)}
      </svg>
      <Tag text="հարձակում" x={lx} y={ly + 220} size={36} color={ALERT} opacity={ramp(t, m.alarm, 0.4)} width={360} />
      <Tag text="սխալ" x={rx} y={ry + 220} size={36} color={C.orange} opacity={ramp(t, m.alarm, 0.4)} width={360} />
      {WEIGHTS.map((txt, i) => (
        <Tag key={i} text={txt} x={504} y={1030 + 0 * i} size={34} color={C.orange} opacity={w[i] * (1 - (i < 2 ? w[i + 1] : 0))} width={800} />
      ))}
    </Backdrop>
  );
};

const Honesty: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <Chain t={t} t0={0.2} q={ramp(t, m.unknown, 0.5)} hiBottom={ramp(t, m.his, 0.5)} up={ramp(t, m.his, 1.2, easeInOut)} />
    </Backdrop>
  );
};

const Takeaway: React.FC = () => {
  const t = useT();
  return (
    <Backdrop glow="rgba(255,59,59,0.06)">
      <Radar t={t} dim={0.55} />
      <WarnLight t={t} on={0.8} />
      <Title text={<>Ստուգիր ազդանշանը <span style={{ color: C.orange }}>մնացածի հետ</span></>} on={ramp(t, 0.3, 0.6)} y={540} size={58} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ man: at("hook", "Մարդը") }} /> },
  { keys: ["context"], render: () => <Context m={{ kal: at("context", "կորեական"), sides: at("context", "Երկու") }} /> },
  { keys: ["bunker"], render: () => <Bunker m={{ name: at("bunker", "Ստանիսլավ"), oko: at("bunker", "Օկո") }} /> },
  { keys: ["alarm"], render: () => <Alarm m={{ one: at("alarm", "մեկ"), four: at("alarm", "չորս"), attack: at("alarm", "հարձակման") }} /> },
  { keys: ["stakes"], render: () => <Stakes m={{ minutes: at("stakes", "րոպե") }} /> },
  { keys: ["reasoning"], render: () => <Reasoning m={{ five: at("reasoning", "հինգ"), fresh: at("reasoning", "նոր"), radar: at("reasoning", "ռադարները") }} /> },
  { keys: ["decision"], render: () => <Decision m={{ report: at("decision", "զեկուցեց"), error: at("decision", "սխալ"), right: at("decision", "ճիշտ") }} /> },
  { keys: ["unsure"], render: () => <Unsure m={{ minutes: at("unsure", "Րոպեները") }} /> },
  { keys: ["cause"], render: () => <Cause m={{ sun: at("cause", "արևի"), clouds: at("cause", "ամպերից"), dakota: at("cause", "Հյուսիսային"), sat: at("cause", "արբանյակները"), flare: at("cause", "կրակի") }} /> },
  { keys: ["bayes"], render: () => <Bayes m={{ link: at("bayes", "Բայեսի"), alarm: at("bayes", "Ազդանշանը"), w1: at("bayes", "որքան", 0), w2: at("bayes", "վստահելի"), w3: at("bayes", "մյուս") }} /> },
  { keys: ["honesty"], render: () => <Honesty m={{ unknown: at("honesty", "կորոշեր"), his: at("honesty", "Բայց") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const Petrov: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * PETROV_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * PETROV_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`petrov/${S.audio}`)} />
  </AbsoluteFill>
);
