// "Map projections: why Greenland looks as big as Africa" (9:16 Short, draft for review; DECISIONS #28).
// Real outlines (Natural Earth through world-atlas, public domain) drawn with d3-geo. A country is moved by rotating
// the sphere under it, never by scaling, and re-projected every frame, so its size on screen is exactly what
// Mercator does to it (Armenia at 72°N: ×6.1 in area, ×2.47 each way; plan X48). Moments are tied to the narration.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { geoCentroid, geoCircle, geoGraticule10, geoInterpolate, geoMercator, geoOrthographic, geoPath, geoProjection, geoRotation } from "d3-geo";
import type { GeoProjection, GeoRawProjection } from "d3-geo";
import { geoRobinsonRaw } from "d3-geo-projection";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry, Position } from "geojson";
import W110 from "world-atlas/countries-110m.json";
import W50 from "world-atlas/countries-50m.json";
import TL from "../data/map_projection.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";

const S = loadTimeline(TL, "map_projection", "portrait");
export const MAP_FPS = 30;
const TAIL_S = 1.2;
export const MAP_FRAMES = Math.ceil((S.duration + TAIL_S) * MAP_FPS);
const rel = (g0: number, x: number) => Math.max(0, x - g0);
const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

// ---------- data ----------
type LL = [number, number];
type Country = Feature<Geometry, { name: string }>;
const countries = (w: unknown): Country[] => {
  const topo = w as Topology<{ countries: GeometryCollection<{ name: string }> }>;
  return (feature(topo, topo.objects.countries) as FeatureCollection<Geometry, { name: string }>).features;
};
const ALL110 = countries(W110);
const ALL50 = countries(W50);
const fc = (features: Country[]): FeatureCollection => ({ type: "FeatureCollection", features });
const WORLD110 = fc(ALL110.filter((f) => f.id !== "010")); // no Antarctica: nothing in the script happens there
const WORLD50 = fc(ALL50.filter((f) => f.id !== "010"));
const pick = (id: string) => {
  const f = ALL50.find((x) => x.id === id);
  if (!f) throw new Error(`country ${id} is missing from world-atlas 50m`);
  return f;
};
const GREENLAND = pick("304");
const ALGERIA = pick("012");
const ARMENIA = pick("051");
const AFRICA_IDS = ["012", "024", "072", "108", "120", "132", "140", "148", "174", "178", "180", "204", "226", "231", "232", "262", "266", "270", "288", "324", "384", "404", "426", "430", "434", "450", "454", "466", "478", "480", "504", "508", "516", "562", "566", "624", "646", "678", "686", "690", "694", "706", "710", "716", "728", "729", "732", "748", "768", "788", "800", "818", "834", "854", "894"];
const AFRICA = fc(ALL50.filter((f) => AFRICA_IDS.includes(String(f.id)) || f.properties.name === "Somaliland"));
const GRAT = geoGraticule10();
const GL_C = geoCentroid(GREENLAND) as LL; // about (-41.8, 73.1)
const DZ_C = geoCentroid(ALGERIA) as LL;
const AM_C = geoCentroid(ARMENIA) as LL; // about (44.9, 40.3)
const AF_C = geoCentroid(AFRICA) as LL;
const GL_SIDE: LL = [-31, 28]; // Greenland's stop: the Atlantic at Algeria's latitude, so both get the same stretch
const AM_DEST: LL = [-41, 72]; // Greenland's place (sec²72° / sec²40.2° = 6.1)
const LISBON: LL = [-9.14, 38.72];
const HAVANA: LL = [-82.38, 23.13];

const mapRings = (g: Geometry, fn: (p: Position) => Position): Geometry => {
  if (g.type === "Polygon") return { ...g, coordinates: g.coordinates.map((r) => r.map(fn)) };
  if (g.type === "MultiPolygon") return { ...g, coordinates: g.coordinates.map((poly) => poly.map((r) => r.map(fn))) };
  throw new Error(`moveTo: geometry ${g.type} is not a polygon`);
};
// the same country with its centroid carried over the sphere from `from` to `to`, north kept up
const moveTo = (f: Country, from: LL, to: LL): Country => {
  const a = geoRotation([-from[0], -from[1]]);
  const b = geoRotation([-to[0], -to[1]]);
  return { ...f, geometry: mapRings(f.geometry, (p) => b.invert(a([p[0], p[1]]))) };
};

const merc = (scale: number, center: LL, cx = 540, cy = 640): GeoProjection => geoMercator().scale(scale).center(center).translate([cx, cy]);
const px = (p: GeoProjection, ll: LL): LL => (p(ll) ?? [0, 0]) as LL;
const D = (p: GeoProjection, o: Parameters<ReturnType<typeof geoPath>>[0]) => geoPath(p)(o) ?? "";

// ---------- drawing pieces ----------
const OCEAN = "#101722";
const LAND = "#2C323C";
const EDGE = "#434B58";
const GRID = "rgba(255,255,255,0.07)";
const HI = C.orange;
const WIN = { x: 30, y: 200, w: 1020, h: 890 }; // the map window, above the caption band

const MapWin: React.FC<{ id: string; opacity?: number; children: React.ReactNode }> = ({ id, opacity = 1, children }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>
    <defs>
      <clipPath id={id}>
        <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} rx={28} />
      </clipPath>
    </defs>
    <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} rx={28} fill={OCEAN} />
    <g clipPath={`url(#${id})`}>{children}</g>
    <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} rx={28} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={2} />
  </svg>
);

const World: React.FC<{ p: GeoProjection; hi?: boolean }> = ({ p, hi = false }) => (
  <>
    <path d={D(p, GRAT)} fill="none" stroke={GRID} strokeWidth={1.5} />
    <path d={D(p, hi ? WORLD50 : WORLD110)} fill={LAND} stroke={EDGE} strokeWidth={1} />
  </>
);

// a label centred on (x, y) with a dark halo, readable over the map
const Tag: React.FC<{ text: string; x: number; y: number; size?: number; color?: string; weight?: number; opacity?: number }> = ({ text, x, y, size = 34, color = C.ink, weight = 800, opacity = 1 }) => (
  <div style={{ position: "absolute", left: x - 300, top: y - size * 0.6, width: 600, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: weight, color, opacity, lineHeight: 1.2, textShadow: "0 2px 4px rgba(0,0,0,0.95), 0 0 18px rgba(0,0,0,0.8)" }}>{text}</div>
);
const SourceLine: React.FC<{ text: string; on: number }> = ({ text, on }) => (
  <div style={{ position: "absolute", left: 90, width: 828, top: 140, textAlign: "center", fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.dim, opacity: on }}>{text}</div>
);
const Title: React.FC<{ text: React.ReactNode; on: number; y?: number; size?: number }> = ({ text, on, y = 220, size = 46 }) => (
  <div style={{ position: "absolute", left: 110, width: 788, top: y, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: 800, color: C.ink, lineHeight: 1.2, opacity: on }}>{text}</div>
);
// a small boat pointing along `deg` (screen bearing, clockwise from up)
const Ship: React.FC<{ x: number; y: number; deg: number; opacity?: number }> = ({ x, y, deg, opacity = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${deg})`} opacity={opacity}>
    <path d="M 0 -22 L 11 12 L 0 6 L -11 12 Z" fill={C.ink} stroke={C.bg} strokeWidth={2.5} />
  </g>
);
const bearing = (a: LL, b: LL) => (Math.atan2(b[0] - a[0], -(b[1] - a[1])) * 180) / Math.PI;

// ---------- hook + drag_greenland: one continuous map ----------
const HookDrag: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const mv = ramp(t, m.drag, 3.4, easeInOut);
  const cam = ramp(t, m.drag + 0.3, 3.4, easeInOut);
  const p = merc(Math.exp(lerp(Math.log(221), Math.log(560), cam)), [lerp(-10, -14, cam), lerp(54.5, 30, cam)]);
  const g = moveTo(GREENLAND, GL_C, geoInterpolate(GL_C, GL_SIDE)(mv) as LL);
  const hookOn = 1 - ramp(t, m.drag - 0.6, 0.5);
  const endOn = ramp(t, m.algeria, 0.5);
  const [gx, gy] = px(p, GL_C);
  const [ax, ay] = px(p, AF_C);
  const [dx, dy] = px(p, DZ_C);
  const [sx, sy] = px(p, GL_SIDE);
  return (
    <Backdrop>
      <MapWin id="m-hook">
        <World p={p} />
        <path d={D(p, AFRICA)} fill={HI} opacity={lerp(0.85, 0.22, mv)} />
        <path d={D(p, ALGERIA)} fill={C.blue} opacity={0.9 * ramp(t, m.algeria - 0.7, 0.5)} />
        {mv > 0 ? <path d={D(p, GREENLAND)} fill="none" stroke={HI} strokeWidth={2.5} strokeDasharray="8 7" opacity={0.7} /> : null}
        <path d={D(p, g)} fill={HI} fillOpacity={0.92} stroke="#FFD36B" strokeWidth={2} />
      </MapWin>
      <Tag text="Գրենլանդիա" x={gx} y={gy} size={32} opacity={hookOn} />
      <Tag text="Աֆրիկա" x={ax} y={ay - 40} size={38} opacity={hookOn} />
      <Tag text="×14" x={ax} y={ay + 40} size={86} weight={900} opacity={Math.min(1, pop(t, m.x14)) * hookOn} />
      <Tag text="Գրենլանդիա" x={sx} y={sy - 10} size={30} opacity={endOn} />
      <Tag text="2,17 մլն կմ²" x={sx} y={sy + 30} size={26} weight={650} opacity={endOn} />
      <Tag text="Ալժիր" x={dx} y={dy - 10} size={30} opacity={endOn} />
      <Tag text="2,38 մլն կմ²" x={dx} y={dy + 30} size={26} weight={650} opacity={endOn} />
    </Backdrop>
  );
};

// ---------- drag_armenia: the camera follows Armenia north to Greenland's place ----------
const ArmeniaTrip: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const k = ramp(t, m.lift, Math.max(1.5, m.arrive - m.lift), easeInOut);
  const cur = geoInterpolate(AM_C, AM_DEST)(k) as LL;
  const SC = 1100;
  const p = merc(SC, cur, 540, 640);
  const moved = moveTo(ARMENIA, AM_C, cur);
  const cmp = ramp(t, m.compare, 0.6);
  const home = merc(SC, AM_C, 760, 650); // the same projection at home: today's size on this map, beside the moved one
  const halfH = (0.5 * 0.0436 * SC) / Math.cos((cur[1] * Math.PI) / 180); // Armenia spans ~2.5° of latitude
  return (
    <Backdrop>
      <MapWin id="m-arm">
        <World p={p} hi />
        <path d={D(p, GREENLAND)} fill="rgba(242,168,0,0.10)" stroke={HI} strokeWidth={2} strokeDasharray="10 8" opacity={ramp(t, m.arrive - 1.0, 0.8)} />
        {k > 0 ? <path d={D(p, ARMENIA)} fill="none" stroke={HI} strokeWidth={2.5} strokeDasharray="6 6" opacity={0.8} /> : null}
        <path d={D(p, moved)} fill={HI} stroke="#FFD36B" strokeWidth={2.5} />
        {cmp > 0 ? <path d={D(home, ARMENIA)} fill="rgba(244,241,234,0.55)" stroke={C.ink} strokeWidth={3} opacity={cmp} /> : null}
      </MapWin>
      <Tag text="Հայաստան" x={540} y={640 - halfH - 34} size={34} />
      <Tag text="Գրենլանդիա" x={540} y={300} size={30} color={HI} opacity={ramp(t, m.arrive - 0.6, 0.6)} />
      <Tag text="մակերես ×6" x={600} y={640 + halfH + 70} size={44} weight={900} color={HI} opacity={Math.min(1, pop(t, m.compare + 0.3))} />
    </Backdrop>
  );
};

// ---------- orange: the peel either tears into petals or stretches into a rectangle ----------
const GORES = 8;
const wrapPi = (a: number) => a - 2 * Math.PI * Math.floor((a + Math.PI) / (2 * Math.PI));
const Orange: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const spin = 0.35 * Math.min(t, m.peel);
  const u = ramp(t, m.peel, 2.2, easeInOut);
  const st = ramp(t, m.stretch, 1.1, easeInOut);
  const gauss = ramp(t, m.proof, 0.6);
  const gaussName = ramp(t, m.gauss, 0.5);
  const R = 240, S0 = 960 / (2 * Math.PI), CX = 540, CY = 640, N = 28;
  const half = Math.PI / GORES;
  const gores = Array.from({ length: GORES }, (_, i) => {
    const l0 = -Math.PI + (i + 0.5) * 2 * half;
    const face = wrapPi(l0 + spin);
    const point = (l: number, ph: number) => {
      const ox = CX + R * Math.cos(ph) * Math.sin(l + spin);
      const oy = CY - R * Math.sin(ph);
      const fx = CX + face * S0 + (l - l0) * S0 * lerp(Math.cos(ph), 1, st);
      const fy = CY - ph * S0;
      return `${lerp(ox, fx, u).toFixed(1)},${lerp(oy, fy, u).toFixed(1)}`;
    };
    const pts: string[] = [];
    for (let j = 0; j <= N; j++) pts.push(point(l0 - half, -Math.PI / 2 + (Math.PI * j) / N));
    for (let j = N; j >= 0; j--) pts.push(point(l0 + half, -Math.PI / 2 + (Math.PI * j) / N));
    return { d: `M ${pts.join(" L ")} Z`, front: Math.cos(face) };
  }).sort((a, b) => a.front - b.front);
  const tearOn = ramp(t, m.tear, 0.4) * (1 - ramp(t, m.stretch, 0.4));
  const stretchOn = ramp(t, m.stretch + 0.2, 0.4);
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: 1 - 0.7 * gauss }}>
        <rect x={40} y={CY - 290} width={1000} height={580} rx={24} fill="#2E2319" opacity={u} />
        <circle cx={CX} cy={CY} r={R} fill="#F39C1F" opacity={1 - Math.min(1, u * 3)} />
        {gores.map((g, i) => (
          <path key={i} d={g.d} fill="#F39C1F" stroke="#B5620A" strokeWidth={2.5} opacity={g.front > 0 ? 1 : Math.min(1, u * 1.6)} />
        ))}
        {stretchOn > 0 ? (
          <g stroke={C.ink} strokeWidth={5} strokeLinecap="round" fill="none" opacity={stretchOn}>
            {[CY - 215, CY + 215].map((y) => (
              <g key={y}>
                <path d={`M 400 ${y} L 140 ${y} M 160 ${y - 16} L 140 ${y} L 160 ${y + 16}`} />
                <path d={`M 680 ${y} L 940 ${y} M 920 ${y - 16} L 940 ${y} L 920 ${y + 16}`} />
              </g>
            ))}
          </g>
        ) : null}
      </svg>
      <Tag text="կպատռվի" x={504} y={CY + 340} size={46} opacity={tearOn} />
      <Tag text="կձգվի" x={504} y={CY + 340} size={46} opacity={stretchOn * (1 - gauss)} />
      {gauss > 0 ? (
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: gauss }}>
          <circle cx={330} cy={CY} r={110} fill="#F39C1F" />
          <ellipse cx={330} cy={CY} rx={45} ry={110} fill="none" stroke="#B5620A" strokeWidth={4} />
          <path d={`M 220 ${CY} A 110 30 0 0 0 440 ${CY}`} fill="none" stroke="#B5620A" strokeWidth={4} />
          <text x={540} y={CY + 28} textAnchor="middle" fontFamily={FONT} fontSize={110} fontWeight={800} fill={C.ink}>≠</text>
          <path d={`M 690 ${CY - 80} L 910 ${CY - 80} L 870 ${CY + 80} L 650 ${CY + 80} Z`} fill="#F39C1F" />
        </svg>
      ) : null}
      <Tag text="Գաուս, 1827" x={504} y={CY + 250} size={44} opacity={gauss} />
      <SourceLine text="Gauss, Theorema Egregium, 1827" on={gaussName} />
    </Backdrop>
  );
};

// ---------- mercator: why stretch at all ----------
const MercatorScene: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const q = 1 - ramp(t, m.old - 0.3, 0.5);
  const old = ramp(t, m.old, 0.7) * (1 - ramp(t, m.course - 0.4, 0.5));
  const course = ramp(t, m.course, 0.5) * (1 - ramp(t, m.squares - 0.4, 0.5));
  const sq = ramp(t, m.squares, 0.5);
  // the question: the hook's world, dimmed
  const pw = merc(221, [-10, 54.5]);
  // the sailor's map
  const pc = merc(520, [-45, 33]);
  const L = px(pc, LISBON), H = px(pc, HAVANA);
  const draw = ramp(t, m.line, 1.0, easeInOut);
  const sail = ramp(t, m.compass, Math.max(1.5, m.squares - m.compass - 0.4), easeInOut);
  const deg = bearing(L, H);
  const ship: LL = [lerp(L[0], H[0], sail), lerp(L[1], H[1], sail)];
  const len = Math.hypot(H[0] - L[0], H[1] - L[1]);
  const dir: LL = [(H[0] - L[0]) / len, (H[1] - L[1]) / len];
  const arcs = [-75, -60, -45, -30, -15].map((lon) => {
    const x = px(pc, [lon, 0])[0];
    const k = (x - L[0]) / (H[0] - L[0]);
    return { x, y: lerp(L[1], H[1], k), k };
  }).filter((a) => a.k > 0.05 && a.k < 0.95);
  const arcOn = ramp(t, m.compass, 0.5);
  // the squares: same square at the equator and at 60°, then the north one stretched both ways
  const ps = merc(300, [0, 30]);
  const yEq = px(ps, [0, 0])[1], y60 = px(ps, [0, 60])[1];
  const w60 = 90 * lerp(1, 2, ramp(t, m.wide, 0.7, easeInOut));
  const h60 = 90 * lerp(1, 2, ramp(t, m.tall, 0.7, easeInOut));
  return (
    <Backdrop>
      <MapWin id="m-q" opacity={q}>
        <World p={pw} />
        <path d={D(pw, GREENLAND)} fill={HI} opacity={0.6} />
        <path d={D(pw, AFRICA)} fill={HI} opacity={0.6} />
      </MapWin>
      <Tag text="?" x={504} y={620} size={260} weight={900} opacity={q * ramp(t, 0.2, 0.4)} />
      {old > 0 ? (
        <div style={{ position: "absolute", left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h, borderRadius: 28, overflow: "hidden", opacity: old }}>
          <Img src={staticFile("map_projection/mercator_1569.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1 + 0.05 * Math.max(0, t - m.old)})` }} />
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 254, width: 500, top: WIN.y + WIN.h - 100, height: 76, borderRadius: 38, background: "rgba(14,15,18,0.82)", opacity: old * ramp(t, m.name, 0.5) }} />
      <Tag text="Գերարդ Մերկատոր" x={504} y={WIN.y + WIN.h - 60} size={40} opacity={old * ramp(t, m.name, 0.5)} />
      <SourceLine text="Mercator, 1569" on={old} />
      {course > 0 ? (
        <MapWin id="m-sea" opacity={course}>
          <World p={pc} />
          <line x1={L[0]} y1={L[1]} x2={lerp(L[0], H[0], draw)} y2={lerp(L[1], H[1], draw)} stroke={HI} strokeWidth={5} strokeDasharray="14 9" />
          {arcs.map((a, i) => (
            <g key={i} opacity={arcOn}>
              <line x1={a.x} y1={a.y - 60} x2={a.x} y2={a.y + 60} stroke={C.ink} strokeWidth={2} opacity={0.6} />
              <path d={`M ${a.x} ${a.y + 38} A 38 38 0 0 1 ${a.x + dir[0] * 38} ${a.y + dir[1] * 38}`} fill="none" stroke={C.ink} strokeWidth={4} />
            </g>
          ))}
          {[L, H].map((c, i) => <circle key={i} cx={c[0]} cy={c[1]} r={10} fill={C.ink} stroke={C.bg} strokeWidth={3} />)}
          <Ship x={ship[0]} y={ship[1]} deg={deg} opacity={ramp(t, m.compass, 0.4)} />
        </MapWin>
      ) : null}
      <Tag text="Լիսաբոն" x={L[0]} y={L[1] - 34} size={28} opacity={course * ramp(t, m.course + 0.6, 0.4)} />
      <Tag text="Հավանա" x={H[0]} y={H[1] + 36} size={28} opacity={course * ramp(t, m.course + 0.6, 0.4)} />
      {course > 0 ? (
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: course * arcOn }}>
          <g transform="translate(830, 930)">
            <circle r={88} fill="rgba(14,15,18,0.85)" stroke={C.ink} strokeWidth={3} />
            <text y={-56} textAnchor="middle" fontFamily={FONT} fontSize={30} fontWeight={800} fill={C.ink}>N</text>
            <g transform={`rotate(${deg})`}>
              <path d="M 0 -64 L 12 0 L 0 10 L -12 0 Z" fill={HI} />
              <path d="M 0 64 L 12 0 L 0 -10 L -12 0 Z" fill={C.grey} />
            </g>
          </g>
        </svg>
      ) : null}
      {sq > 0 ? (
        <MapWin id="m-sq" opacity={sq}>
          {[0, 15, 30, 45, 60, 75].map((lat) => {
            const y = px(ps, [0, lat])[1];
            return <line key={lat} x1={0} x2={1080} y1={y} y2={y} stroke={lat === 0 || lat === 60 ? "rgba(255,255,255,0.35)" : GRID} strokeWidth={2} />;
          })}
          {[-60, -40, -20, 0, 20, 40, 60].map((lon) => {
            const x = px(ps, [lon, 0])[0];
            return <line key={lon} x1={x} x2={x} y1={0} y2={1920} stroke={GRID} strokeWidth={2} />;
          })}
          <rect x={330 - 45} y={yEq - 45} width={90} height={90} fill={HI} />
          <rect x={700 - w60 / 2} y={y60 - h60 / 2} width={w60} height={h60} fill={HI} stroke="#FFD36B" strokeWidth={2} />
        </MapWin>
      ) : null}
      <Tag text="0°" x={110} y={yEq} size={30} opacity={sq} />
      <Tag text="60°" x={110} y={y60} size={30} opacity={sq} />
      <Tag text="↔ ×2" x={700} y={y60 + 140} size={38} color={HI} opacity={sq * ramp(t, m.wide + 0.3, 0.4)} />
      <Tag text="↕ ×2" x={700} y={y60 + 190} size={38} color={HI} opacity={sq * ramp(t, m.tall + 0.3, 0.4)} />
    </Backdrop>
  );
};

// ---------- stretch: Tissot's circles, the pole at infinity, the 85° cut ----------
const TISSOT = [-60, -30, 0, 30, 60, 75].flatMap((lat) => [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => ({ lat, c: geoCircle().center([lon, lat]).radius(4)() })));
const Stretch: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const north = ramp(t, m.north, 1.6, easeInOut);
  const back = ramp(t, m.cut, 1.4, easeInOut);
  const scale = lerp(170, 135, back);
  const lat = lerp(lerp(22, 80, north), 0, back);
  const p = merc(scale, [0, lat], 540, 640);
  const cutOn = ramp(t, m.n85 - 0.4, 0.5);
  const yTop = px(p, [0, 85.05])[1];
  const yBot = px(p, [0, -85.05])[1];
  const poleLines = [80, 85, 88, 89, 89.5];
  const infOn = ramp(t, m.inf, 0.5) * (1 - back);
  return (
    <Backdrop>
      <MapWin id="m-tissot">
        <World p={p} />
        {TISSOT.map((c, i) => (
          <path key={i} d={D(p, c.c)} fill="rgba(242,168,0,0.55)" stroke={HI} strokeWidth={2} opacity={ramp(t, 0.2 + Math.abs(c.lat) / 40, 0.5)} />
        ))}
        {poleLines.map((l) => {
          const y = px(p, [0, l])[1];
          return <line key={l} x1={0} x2={1080} y1={y} y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeDasharray="6 8" opacity={north * (1 - back)} />;
        })}
        {cutOn > 0 ? (
          <g opacity={cutOn}>
            <rect x={0} y={0} width={1080} height={Math.max(0, yTop)} fill="rgba(0,0,0,0.55)" />
            <rect x={0} y={yBot} width={1080} height={1920} fill="rgba(0,0,0,0.55)" />
            <line x1={0} x2={1080} y1={yTop} y2={yTop} stroke={HI} strokeWidth={4} strokeDasharray="16 10" />
            <line x1={0} x2={1080} y1={yBot} y2={yBot} stroke={HI} strokeWidth={4} strokeDasharray="16 10" />
          </g>
        ) : null}
      </MapWin>
      <Tag text="մակերես ×1" x={504} y={px(p, [0, 0])[1] + 56} size={30} opacity={ramp(t, 0.6, 0.4) * (1 - north)} />
      <Tag text="մակերես ×4" x={504} y={px(p, [0, 60])[1] + 64} size={30} opacity={ramp(t, 2.0, 0.4) * (1 - north)} />
      {poleLines.map((l) => (
        <Tag key={l} text={`${String(l).replace(".", ",")}°`} x={110} y={px(p, [0, l])[1] - 22} size={26} weight={700} opacity={north * (1 - back) * (px(p, [0, l])[1] > WIN.y + 20 ? 1 : 0)} />
      ))}
      <Tag text="90° → ∞" x={504} y={WIN.y + 60} size={48} weight={900} color={HI} opacity={infOn} />
      <Tag text="Web Mercator ≈ 85°" x={504} y={yTop + 40} size={32} color={HI} opacity={cutOn} />
    </Backdrop>
  );
};

// ---------- others: Mercator morphs into equal-area Gall-Peters, then Robinson ----------
const clampLat = (ph: number) => Math.max(-1.466, Math.min(1.466, ph)); // ±84°
const mercRaw: GeoRawProjection = (l, ph) => [l, Math.log(Math.tan(Math.PI / 4 + clampLat(ph) / 2))];
const gallRaw: GeoRawProjection = (l, ph) => [l * Math.SQRT1_2, Math.sin(ph) * Math.SQRT2]; // cylindrical equal-area, standard parallels 45°
const mixRaw = (a: GeoRawProjection, b: GeoRawProjection, k: number): GeoRawProjection => (l, ph) => {
  const A = a(l, ph), B = b(l, ph);
  return [lerp(A[0], B[0], k), lerp(A[1], B[1], k)];
};
const Others: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const k1 = ramp(t, m.gp, 1.6, easeInOut);
  const k2 = ramp(t, m.robinson, 1.4, easeInOut);
  const raw = k2 > 0 ? mixRaw(gallRaw, geoRobinsonRaw, k2) : mixRaw(mercRaw, gallRaw, k1);
  const p = geoProjection(raw).fitExtent([[70, 300], [1010, 1000]], WORLD110);
  const afOn = ramp(t, m.africa, 0.4);
  const pulse = afOn * (1 - ramp(t, m.robinson, 0.5)) * (0.5 + 0.5 * Math.sin((t - m.africa) * 6));
  const [ax, ay] = px(p, AF_C);
  const name = (from: number, to: number) => ramp(t, from, 0.4) * (1 - ramp(t, to, 0.4));
  return (
    <Backdrop>
      <MapWin id="m-morph">
        <World p={p} />
        <path d={D(p, GREENLAND)} fill={HI} opacity={0.75} />
        <path d={D(p, AFRICA)} fill={HI} opacity={0.75 + 0.25 * pulse} stroke="#FFD36B" strokeWidth={2 + 3 * pulse} />
      </MapWin>
      {afOn > 0 && k2 === 0 ? (
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: afOn * (1 - ramp(t, m.robinson, 0.4)) }}>
          <path d={`M ${ax + 190} ${ay - 120} L ${ax + 190} ${ay + 130} M ${ax + 174} ${ay + 108} L ${ax + 190} ${ay + 130} L ${ax + 206} ${ay + 108}`} stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
        </svg>
      ) : null}
      <Tag text="Մերկատոր" x={504} y={1040} size={40} opacity={1 - ramp(t, m.gp, 0.4)} />
      <Tag text="Գալ-Պետերս" x={504} y={1040} size={40} opacity={name(m.gp + 0.8, m.robinson)} />
      <Tag text="Ռոբինսոն" x={504} y={1040} size={40} opacity={ramp(t, m.robinson + 0.8, 0.4)} />
      <SourceLine text="քարտեզագրական պրոյեկցիաներ՝ Մերկատոր, Գալ-Պետերս, Ռոբինսոն" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- google: switch on globe view, zoom out, the map becomes a globe ----------
const Google: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const win = ramp(t, 0.15, 0.5); // up from the beat's first frame, so the pause before it is not an empty screen
  const menu = ramp(t, m.on, 0.3) * (1 - ramp(t, m.zoom, 0.3));
  const sw = ramp(t, m.toggle, 0.3);
  const zoom = ramp(t, m.zoom, Math.max(1, m.globe - m.zoom), easeInOut);
  const toGlobe = ramp(t, m.globe, 0.9, easeInOut);
  const greenOn = ramp(t, m.green, 0.4);
  const B = { x: 80, y: 250, w: 920, h: 820, bar: 56 };
  const cx = B.x + B.w / 2, cy = B.y + B.bar + (B.h - B.bar) / 2;
  const pf = merc(lerp(150, 92, zoom), [-15, 30], cx, cy);
  const pg = geoOrthographic().scale(lerp(180, 330, toGlobe)).translate([cx, cy]).rotate([22 + 4 * Math.max(0, t - m.globe), -38]).clipAngle(90);
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: win }}>
        <defs>
          <clipPath id="m-browser">
            <rect x={B.x} y={B.y + B.bar} width={B.w} height={B.h - B.bar} />
          </clipPath>
        </defs>
        <rect x={B.x} y={B.y} width={B.w} height={B.h} rx={22} fill={OCEAN} stroke="rgba(255,255,255,0.16)" strokeWidth={2} />
        <rect x={B.x} y={B.y} width={B.w} height={B.bar} rx={22} fill="#20242C" />
        {[0, 1, 2].map((i) => <circle key={i} cx={B.x + 32 + i * 30} cy={B.y + B.bar / 2} r={9} fill={[C.red, C.orange, C.green][i]} />)}
        <rect x={B.x + 150} y={B.y + 13} width={B.w - 200} height={30} rx={15} fill="#2D323B" />
        <g clipPath="url(#m-browser)">
          <g opacity={1 - toGlobe}>
            <World p={pf} />
            <path d={D(pf, GREENLAND)} fill={HI} opacity={0.85} />
            <path d={D(pf, AFRICA)} fill={HI} opacity={0.85} />
          </g>
          <g opacity={toGlobe}>
            <path d={D(pg, { type: "Sphere" })} fill="#16233A" stroke="rgba(255,255,255,0.25)" strokeWidth={2} />
            <path d={D(pg, GRAT)} fill="none" stroke={GRID} strokeWidth={1.5} />
            <path d={D(pg, WORLD110)} fill={LAND} stroke={EDGE} strokeWidth={1} />
            <path d={D(pg, GREENLAND)} fill={HI} opacity={0.6 + 0.4 * greenOn} stroke="#FFD36B" strokeWidth={1 + 2 * greenOn} />
            <path d={D(pg, AFRICA)} fill={HI} opacity={0.85} />
          </g>
          {/* the layers button and its menu (drawn generically, no product branding) */}
          <g opacity={1 - toGlobe * 0.6}>
            <rect x={B.x + 26} y={B.y + B.h - 116} width={92} height={92} rx={16} fill="#E9E6DF" />
            {[0, 1].map((i) => <path key={i} d={`M ${B.x + 72} ${B.y + B.h - 96 + i * 18} L ${B.x + 100} ${B.y + B.h - 82 + i * 18} L ${B.x + 72} ${B.y + B.h - 68 + i * 18} L ${B.x + 44} ${B.y + B.h - 82 + i * 18} Z`} fill={i ? "#7B8494" : "#3D4452"} />)}
          </g>
          <g opacity={menu}>
            <rect x={B.x + 26} y={B.y + B.h - 260} width={300} height={124} rx={18} fill="#E9E6DF" />
            <circle cx={B.x + 86} cy={B.y + B.h - 198} r={34} fill="#5B8BD9" />
            <ellipse cx={B.x + 86} cy={B.y + B.h - 198} rx={14} ry={34} fill="none" stroke="#E9E6DF" strokeWidth={3} />
            <line x1={B.x + 52} x2={B.x + 120} y1={B.y + B.h - 198} y2={B.y + B.h - 198} stroke="#E9E6DF" strokeWidth={3} />
            <rect x={B.x + 170} y={B.y + B.h - 220} width={110} height={44} rx={22} fill={sw > 0.5 ? "#3DAA55" : "#9AA0AA"} />
            <circle cx={B.x + 192 + 66 * sw} cy={B.y + B.h - 198} r={18} fill="#FFFFFF" />
          </g>
        </g>
      </svg>
      {menu > 0 ? (
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: menu * (1 - sw) }}>
          <path d={`M ${B.x + 300} ${B.y + B.h - 140} l 0 44 l 12 -12 l 14 26 l 9 -5 l -14 -25 l 17 -2 Z`} fill={C.ink} stroke={C.bg} strokeWidth={2} />
        </svg>
      ) : null}
    </Backdrop>
  );
};

// ---------- takeaway: the map answers one question ----------
const Takeaway: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const p = merc(200, [-10, 54.5], 540, 692);
  const at0: LL = [GL_C[0], 0];
  const trueG = moveTo(GREENLAND, GL_C, at0); // Greenland as Mercator draws it at the equator: its true size here
  const [gx, gy] = px(p, GL_C);
  const [ex, ey] = px(p, at0);
  const L = px(p, LISBON), H = px(p, HAVANA);
  const sail = ramp(t, m.ship, 3.2, easeInOut);
  const sizes = ramp(t, m.sizes, 0.5);
  const breathe = 0.5 + 0.5 * Math.sin(t * 2.6);
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <MapWin id="m-take">
        <World p={p} />
        <path d={D(p, AFRICA)} fill={HI} opacity={0.8} />
        <path d={D(p, GREENLAND)} fill={HI} opacity={lerp(0.8, 0.35 + 0.4 * breathe, sizes)} />
        <g transform={`translate(${gx - ex}, ${gy - ey})`} opacity={sizes}>
          <path d={D(p, trueG)} fill={C.ink} opacity={0.9} />
        </g>
        <line x1={L[0]} y1={L[1]} x2={lerp(L[0], H[0], sail)} y2={lerp(L[1], H[1], sail)} stroke={C.ink} strokeWidth={4} strokeDasharray="12 8" opacity={ramp(t, m.ship, 0.3)} />
        <Ship x={lerp(L[0], H[0], sail)} y={lerp(L[1], H[1], sail)} deg={bearing(L, H)} opacity={ramp(t, m.ship, 0.3)} />
      </MapWin>
      <Title text={<>Քարտեզը պատասխանում է <span style={{ color: C.orange }}>մի կոնկրետ հարցի</span></>} on={ramp(t, m.title, 0.6)} y={216} size={44} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const GROUPS: G[] = [
  { keys: ["hook", "drag_greenland"], render: () => {
    const g0 = S.beat("hook").start;
    return <HookDrag m={{ x14: rel(g0, S.at("hook", "14")), drag: rel(g0, S.at("drag_greenland", "քաշենք")), algeria: rel(g0, S.at("drag_greenland", "Ալժիրից")) }} />;
  } },
  { keys: ["drag_armenia"], render: () => {
    const g0 = S.beat("drag_armenia").start;
    return <ArmeniaTrip m={{ lift: rel(g0, S.at("drag_armenia", "բարձրացնենք")), arrive: rel(g0, S.at("drag_armenia", "քարտեզին")), compare: rel(g0, S.at("drag_armenia", "մակերեսով")) }} />;
  } },
  { keys: ["orange"], render: () => {
    const g0 = S.beat("orange").start;
    return <Orange m={{ peel: rel(g0, S.at("orange", "Փորձիր")), tear: rel(g0, S.at("orange", "կպատռվի")), stretch: rel(g0, S.at("orange", "կձգվի")), gauss: rel(g0, S.at("orange", "Գաուսը")), proof: rel(g0, S.at("orange", "ապացուցեց")) }} />;
  } },
  { keys: ["mercator"], render: () => {
    const g0 = S.beat("mercator").start;
    return <MercatorScene m={{
      old: rel(g0, S.at("mercator", "Տասնվեցերորդ")), name: rel(g0, S.at("mercator", "Մերկատորն")), course: rel(g0, S.at("mercator", "Այն")),
      line: rel(g0, S.at("mercator", "ուղիղ")), compass: rel(g0, S.at("mercator", "կստանաս")), squares: rel(g0, S.at("mercator", "Դրա")),
      wide: rel(g0, S.at("mercator", "լայնությամբ")), tall: rel(g0, S.at("mercator", "բարձրությամբ")),
    }} />;
  } },
  { keys: ["stretch"], render: () => {
    const g0 = S.beat("stretch").start;
    return <Stretch m={{ north: rel(g0, S.at("stretch", "իսկ")), inf: rel(g0, S.at("stretch", "անվերջ")), cut: rel(g0, S.at("stretch", "Դրա")), n85: rel(g0, S.at("stretch", "85")) }} />;
  } },
  { keys: ["others"], render: () => {
    const g0 = S.beat("others").start;
    return <Others m={{ gp: rel(g0, S.at("others", "պահում")), africa: rel(g0, S.at("others", "Աֆրիկան")), robinson: rel(g0, S.at("others", "Ամեն")) }} />;
  } },
  { keys: ["google"], render: () => {
    const g0 = S.beat("google").start;
    return <Google m={{
      browser: rel(g0, S.at("google", "համակարգչում")), on: rel(g0, S.at("google", "միացրու")), toggle: rel(g0, S.at("google", "գլոբուսի")),
      zoom: rel(g0, S.at("google", "հեռացիր")), globe: rel(g0, S.at("google", "Քարտեզը")), green: rel(g0, S.at("google", "Գրենլանդիան", 0)),
    }} />;
  } },
  { keys: ["takeaway"], render: () => {
    const g0 = S.beat("takeaway").start;
    return <Takeaway m={{ title: rel(g0, S.at("takeaway", "սուտ")), ship: rel(g0, S.at("takeaway", "Մերկատորի")), sizes: rel(g0, S.at("takeaway", "Չափերի")) }} />;
  } },
];

export const MapProjection: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * MAP_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * MAP_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`map_projection/${S.audio}`)} />
  </AbsoluteFill>
);
