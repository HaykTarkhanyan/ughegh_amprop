// "Ancient statues were painted" (9:16 Short, draft for review; DECISIONS #28).
// Real photos from Commons (painted_statues/assets/credits.json); every reconstruction carries «վերակազմություն» and
// every drawn part «նկարազարդում» from its first frame (Fable F212). Moments are tied to the narration.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Img, Sequence, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import TL from "../data/painted_statues.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";

const S = loadTimeline(TL, "painted_statues", "portrait");
export const PS_FPS = 30;
const TAIL_S = 1.2;
export const PS_FRAMES = Math.ceil((S.duration + TAIL_S) * PS_FPS);
const rel = (g0: number, x: number) => Math.max(0, x - g0);
const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

const GOLD = "#D9A520";
const PAINT_RED = "#C4302B";
const PAINT_BLUE = "#2F5FB3";
const MARBLE = "#E9E4DA";

// ---------- pieces ----------
const Pill: React.FC<{ text: string; color?: string; size?: number }> = ({ text, color = C.orange, size = 26 }) => (
  <div style={{ position: "absolute", left: 14, bottom: 14, padding: "6px 14px", borderRadius: 14, background: "rgba(14,15,18,0.84)", color, fontFamily: FONT, fontSize: size, fontWeight: 750 }}>{text}</div>
);
const Photo: React.FC<{ src: string; x: number; y: number; w: number; h: number; pos?: string; zoom?: number; origin?: string; tag?: string; tagColor?: string; opacity?: number; filter?: string; rot?: number; children?: React.ReactNode }> = ({ src, x, y, w, h, pos = "50% 50%", zoom = 1, origin = "50% 50%", tag, tagColor, opacity = 1, filter, rot = 0, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 22, overflow: "hidden", opacity, transform: `rotate(${rot}deg)`, boxShadow: "0 10px 40px rgba(0,0,0,0.5)", background: "#000" }}>
    <Img src={staticFile(`painted_statues/${src}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, transform: `scale(${zoom})`, transformOrigin: origin, filter }} />
    {children}
    {tag ? <Pill text={tag} color={tagColor} /> : null}
  </div>
);
const Tag: React.FC<{ text: string; x: number; y: number; size?: number; color?: string; weight?: number; opacity?: number; width?: number }> = ({ text, x, y, size = 34, color = C.ink, weight = 800, opacity = 1, width = 800 }) => (
  <div style={{ position: "absolute", left: x - width / 2, top: y - size * 0.6, width, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: weight, color, opacity, lineHeight: 1.2, textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}>{text}</div>
);
const SourceLine: React.FC<{ text: string; on: number }> = ({ text, on }) => (
  <div style={{ position: "absolute", left: 90, width: 828, top: 140, textAlign: "center", fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.dim, opacity: on }}>{text}</div>
);
const Title: React.FC<{ text: React.ReactNode; on: number; y?: number; size?: number }> = ({ text, on, y = 200, size = 46 }) => (
  <div style={{ position: "absolute", left: 110, width: 788, top: y, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: 800, color: C.ink, lineHeight: 1.2, opacity: on }}>{text}</div>
);
const DrawnTag: React.FC<{ x: number; y: number; on?: number }> = ({ x, y, on = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, padding: "5px 12px", borderRadius: 12, background: "rgba(14,15,18,0.8)", color: C.dim, fontFamily: FONT, fontSize: 22, fontWeight: 700, opacity: on }}>նկարազարդում</div>
);

// a drawn kore-like figure; `paint` 0..1 is how much of its colour is left
const Figure: React.FC<{ cx: number; top: number; paint: number; scale?: number; opacity?: number; reveal?: number }> = ({ cx, top, paint, scale = 1, opacity = 1, reveal = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>
    <defs>
      <clipPath id={`rev-${cx}-${top}`}>
        <rect x={0} y={top + (1 - reveal) * 620 * scale} width={1080} height={1920} />
      </clipPath>
    </defs>
    <g clipPath={`url(#rev-${cx}-${top})`}>
    <g transform={`translate(${cx} ${top}) scale(${scale})`}>
      <circle cx={0} cy={50} r={46} fill={MARBLE} />
      <path d="M -46 40 Q -60 120 -40 170 L -26 170 Q -40 110 -30 50 Z M 46 40 Q 60 120 40 170 L 26 170 Q 40 110 30 50 Z" fill={MARBLE} />
      <rect x={-14} y={92} width={28} height={30} fill={MARBLE} />
      <path d="M -70 130 Q 0 112 70 130 L 84 600 L -84 600 Z" fill={MARBLE} />
      <g opacity={paint}>
        <path d="M -46 40 Q -60 120 -40 170 L -26 170 Q -40 110 -30 50 Z M 46 40 Q 60 120 40 170 L 26 170 Q 40 110 30 50 Z" fill="#B5732E" />
        <path d="M -44 30 Q 0 -10 44 30 Q 30 14 0 12 Q -30 14 -44 30 Z" fill="#B5732E" />
        <path d="M -72 150 Q 0 134 72 150 L 74 200 Q 0 186 -74 200 Z" fill={PAINT_RED} />
        <rect x={-16} y={230} width={32} height={360} fill={PAINT_BLUE} />
        {Array.from({ length: 9 }, (_, i) => <rect key={i} x={-10} y={240 + i * 38} width={20} height={20} fill={i % 2 ? GOLD : PAINT_RED} />)}
        <path d="M -84 560 L 84 560 L 84 600 L -84 600 Z" fill={PAINT_RED} />
        <circle cx={-16} cy={48} r={4} fill="#2B1B10" />
        <circle cx={16} cy={48} r={4} fill="#2B1B10" />
        <path d="M -10 74 Q 0 80 10 74" stroke={PAINT_RED} strokeWidth={4} fill="none" />
      </g>
    </g>
    </g>
  </svg>
);

// ---------- hook: a white original and its painted reconstruction ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const chips = [{ c: PAINT_RED, t0: m.red }, { c: PAINT_BLUE, t0: m.blue }, { c: GOLD, t0: m.gold }];
  return (
    <Backdrop>
      <Title text={<>Հին հունական արձանները <span style={{ color: C.orange }}>սպիտակ չէին</span></>} on={1} y={190} size={44} />
      <Photo src="archer_original" x={40} y={330} w={480} h={640} pos="60% 50%" zoom={1 + 0.01 * t} tag="բնօրինակ" tagColor={C.ink} />
      <Photo src="archer_color" x={560} y={330} w={480} h={640} pos="78% 50%" zoom={1 + 0.01 * t} tag="վերակազմություն" />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        {chips.map((ch, i) => <circle key={i} cx={690 + i * 110} cy={1030} r={34 * Math.min(1, pop(t, ch.t0))} fill={ch.c} stroke={C.ink} strokeWidth={3} />)}
      </svg>
    </Backdrop>
  );
};

// ---------- traces: raking light, UV, and Egyptian blue glowing in infrared ----------
const SPECKS = Array.from({ length: 26 }, (_, i) => ({ x: 330 + random(`sp-x-${i}`) * 380, y: 660 + random(`sp-y-${i}`) * 210, r: 2 + random(`sp-r-${i}`) * 3 }));
const Meander: React.FC<{ opacity: number; glow?: number }> = ({ opacity, glow = 0 }) => (
  <svg width={480} height={640} style={{ position: "absolute", left: 0, top: 0, opacity, filter: glow ? `drop-shadow(0 0 ${10 * glow}px rgba(190,140,255,0.9))` : undefined }}>
    {Array.from({ length: 6 }, (_, i) => (
      <path key={i} d={`M ${40 + i * 70} 140 h 50 v 40 h -30 v -20 h -10 v 40 h 60`} stroke={i % 2 ? PAINT_BLUE : PAINT_RED} strokeWidth={8} fill="none" />
    ))}
    {Array.from({ length: 4 }, (_, i) => <circle key={i} cx={90 + i * 100} cy={380} r={26} fill="none" stroke={PAINT_RED} strokeWidth={7} />)}
    <rect x={200} y={430} width={80} height={180} fill="none" stroke={PAINT_BLUE} strokeWidth={8} />
  </svg>
);
const Traces: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const partA = 1 - ramp(t, m.blue - 0.3, 0.5);
  const sweep = ramp(t, m.raking, 2.4, easeInOut);
  const uv = ramp(t, m.uv, 0.6);
  const partB = ramp(t, m.blue, 0.5);
  const vis = ramp(t, m.visible, 0.6);
  const ir = ramp(t, m.ir, 0.6);
  const cam = ramp(t, m.camera, 0.5);
  const micro = ramp(t, m.micro, 1.0, easeInOut);
  const dash = (t * 60) % 40;
  return (
    <Backdrop>
      {partA > 0 ? (
        <div style={{ opacity: partA }}>
          <Photo src="kore_original" x={300} y={260} w={480} h={640} pos="50% 62%" zoom={1.9} origin="50% 62%" filter={`grayscale(1) brightness(${lerp(0.55, 0.75, sweep)})`}>
            <Meander opacity={0.65 * ramp(t, m.raking + 0.6, 1.4) * (1 - 0.3 * uv)} glow={uv} />
            <div style={{ position: "absolute", top: 0, bottom: 0, left: `${lerp(-40, 120, sweep)}%`, width: "36%", background: "linear-gradient(90deg, transparent, rgba(255,240,200,0.45), transparent)", opacity: sweep > 0 && sweep < 1 ? 1 : 0 }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(110,60,255,0.30)", mixBlendMode: "screen", opacity: uv }} />
          </Photo>
          <DrawnTag x={312} y={914} on={ramp(t, m.raking + 0.6, 0.6)} />
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: ramp(t, m.raking - 0.3, 0.4) * (1 - uv) }}>
            <path d="M 120 250 L 250 420" stroke="#FFF0C8" strokeWidth={8} strokeLinecap="round" />
            <circle cx={110} cy={236} r={30} fill="#FFF0C8" />
          </svg>
        </div>
      ) : null}
      {partB > 0 ? (
        <div style={{ opacity: partB }}>
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
            <rect x={300} y={640} width={440} height={250} rx={18} fill="#CFC8BA" />
            <path d="M 360 860 Q 420 700 480 860 M 560 860 Q 620 690 690 860" stroke="#B8B0A0" strokeWidth={14} fill="none" />
            {SPECKS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={PAINT_BLUE} opacity={0.5} />)}
            {/* the lamp: visible light in */}
            <circle cx={200} cy={400} r={40} fill="#FFE07A" opacity={vis} />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M ${235 + i * 18} ${430 + i * 6} L ${380 + i * 70} ${630}`} stroke="#FFE07A" strokeWidth={7} strokeLinecap="round" opacity={vis} />
            ))}
            {/* infrared out, to the camera */}
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M ${470 + i * 70} 640 L ${760 + i * 22} ${470 - i * 4}`} stroke="#FF4B4B" strokeWidth={6} strokeDasharray="14 12" strokeDashoffset={-dash} opacity={ir} />
            ))}
            <g opacity={Math.max(ir, cam)}>
              <rect x={760} y={330} width={150} height={100} rx={14} fill="#3A3F48" stroke={C.ink} strokeWidth={3} />
              <circle cx={835} cy={380} r={30} fill="#1B1E25" stroke={C.ink} strokeWidth={3} />
            </g>
          </svg>
          <div style={{ position: "absolute", left: 620, top: 160, width: 400, height: 150, borderRadius: 14, background: "#000", border: "3px solid #5A606A", overflow: "hidden", opacity: cam }}>
            <svg width={400} height={150}>
              <g transform={`translate(200 75) scale(${lerp(1, 2.6, micro)}) translate(-200 -75)`}>
                {SPECKS.map((s, i) => <circle key={i} cx={(s.x - 300) * (400 / 440)} cy={(s.y - 640) * (150 / 250)} r={s.r * 0.9} fill="#FFFFFF" style={{ filter: "drop-shadow(0 0 4px #fff)" }} />)}
              </g>
            </svg>
          </div>
          <Tag text="տեսախցիկի պատկեր" x={820} y={136} size={22} weight={700} color={C.dim} opacity={cam} width={400} />
          <Tag text="եգիպտական կապույտ" x={520} y={940} size={32} color="#8FB0FF" opacity={partB} width={600} />
          <DrawnTag x={312} y={980} on={partB} />
        </div>
      ) : null}
    </Backdrop>
  );
};

// ---------- kore: the Peplos Kore and the painted cast after Gilliéron ----------
const Kore: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const cast = ramp(t, m.paint, 0.8, easeInOut);
  const patches = ramp(t, m.today, 1.6, easeInOut);
  return (
    <Backdrop>
      <Photo src="kore_original" x={lerp(300, 60, cast)} y={240} w={440} h={860} pos="50% 40%" zoom={lerp(1.05, 2.2, patches)} origin="55% 72%" />
      <Photo src="kore_gillieron" x={580} y={240} w={440} h={860} pos="50% 40%" opacity={cast} tag="վերակազմություն" />
      <SourceLine text="Պեպլոսով կորե, մ.թ.ա. մոտ 530" on={ramp(t, 0.2, 0.5)} />
    </Backdrop>
  );
};

// ---------- why_white: the paint washes off; the Renaissance copies the bare stone ----------
const FLAKES = Array.from({ length: 40 }, (_, i) => ({ x: -70 + random(`fl-x-${i}`) * 140, y: 140 + random(`fl-y-${i}`) * 440, c: [PAINT_RED, PAINT_BLUE, GOLD][i % 3], d: random(`fl-d-${i}`) }));
const WhyWhite: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const age = ramp(t, m.years, 4.0, easeInOut);
  const rain = ramp(t, m.rain, 0.4) * (1 - ramp(t, m.renaissance - 0.5, 0.5));
  const ren = ramp(t, m.renaissance, 0.6);
  const carve = ramp(t, m.copy, 2.4, easeInOut);
  const cx = lerp(504, 330, ren);
  const year = Math.round(lerp(-530, 1500, ramp(t, m.years, m.renaissance - m.years + 0.4, easeInOut)) / 10) * 10;
  return (
    <Backdrop>
      <Figure cx={cx} top={300} paint={1 - age} scale={1.15} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        {FLAKES.map((f, i) => {
          const k = Math.max(0, Math.min(1, age * 1.6 - f.d * 0.6));
          return k > 0 && k < 1 ? <rect key={i} x={cx + f.x * 1.15} y={300 + f.y * 1.15 + k * 500} width={10} height={10} fill={f.c} opacity={1 - k} transform={`rotate(${k * 300} ${cx + f.x * 1.15} ${300 + f.y * 1.15 + k * 500})`} /> : null;
        })}
        {rain > 0 ? Array.from({ length: 30 }, (_, i) => {
          const x = 200 + random(`rn-${i}`) * 620;
          const y = 240 + ((t * 900 + random(`ry-${i}`) * 800) % 860);
          return <line key={i} x1={x} y1={y} x2={x - 8} y2={y + 34} stroke="#9EC3FF" strokeWidth={3} opacity={0.7 * rain} />;
        }) : null}
        <rect x={120} y={1000} width={780} height={60} rx={10} fill="#5A3E26" opacity={ramp(t, m.soil, 0.4) * (1 - ren)} />
      </svg>
      <Figure cx={700} top={300} paint={0} scale={1.15} opacity={ren} reveal={carve} />
      <Tag text="Վերածնունդ" x={700} y={1030} size={36} color={C.orange} opacity={ren} width={400} />
      <Tag text={year < 0 ? `մ.թ.ա. ${-year}` : `${year}`} x={cx} y={240} size={40} opacity={ramp(t, m.years - 0.2, 0.4)} width={400} />
      <DrawnTag x={60} y={1000 - 50} on={1} />
    </Backdrop>
  );
};

// ---------- ideal: white as the ideal, paint cleaned off, the 1937-38 scraping ----------
const Ideal: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const halo = ramp(t, m.ideal, 0.8);
  const clean = ramp(t, m.clean, 1.6, easeInOut);
  const slab = ramp(t, m.london, 0.6);
  const scrape = ramp(t, m.tools, 2.4, easeInOut);
  const whiter = ramp(t, m.whiter, 0.8);
  const split = ramp(t, m.after, 0.6);
  const sx = 140, sy = 380, sw = 800, sh = 460;
  const tool = lerp(sx + 40, sx + sw - 40, 0.5 + 0.5 * Math.sin(t * 7));
  const scraped = sw * Math.max(scrape * 0.7, whiter);
  const whiteW = split > 0 ? lerp(scraped, sw / 2, split) : scraped;
  return (
    <Backdrop>
      <div style={{ opacity: 1 - slab }}>
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <circle cx={504} cy={600} r={340} fill="rgba(255,240,200,0.10)" opacity={halo} />
        </svg>
        <Figure cx={504} top={300} paint={0} scale={1.15} />
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          {[[470, 470], [540, 640], [480, 800], [530, 900]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={22 * (1 - clean)} fill={[PAINT_RED, PAINT_BLUE, GOLD, PAINT_RED][i]} />
          ))}
          {clean > 0 && clean < 1 ? <rect x={430 + 80 * Math.sin(t * 14)} y={lerp(440, 920, clean)} width={90} height={36} rx={10} fill="#C9B07A" /> : null}
        </svg>
        <Tag text="իդեալ" x={504} y={1040} size={40} color={C.orange} opacity={halo} width={400} />
      </div>
      {slab > 0 ? (
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: slab }}>
          <defs>
            <clipPath id="slab-white">
              <rect x={sx + sw - whiteW} y={sy} width={whiteW} height={sh} />
            </clipPath>
          </defs>
          <rect x={sx} y={sy} width={sw} height={sh} rx={10} fill="#C9B48A" />
          {Array.from({ length: 3 }, (_, i) => (
            <path key={i} d={`M ${sx + 150 + i * 250} ${sy + sh - 40} q -30 -200 0 -320 q 40 -20 60 30 q 20 140 -10 290`} stroke="#A99267" strokeWidth={16} fill="none" />
          ))}
          <g clipPath="url(#slab-white)">
            <rect x={sx} y={sy} width={sw} height={sh} rx={10} fill="#F2EFE8" />
            {Array.from({ length: 3 }, (_, i) => (
              <path key={i} d={`M ${sx + 150 + i * 250} ${sy + sh - 40} q -30 -200 0 -320 q 40 -20 60 30 q 20 140 -10 290`} stroke="#D9D4C9" strokeWidth={16} fill="none" />
            ))}
            {Array.from({ length: 30 }, (_, i) => <line key={i} x1={sx + random(`sc-${i}`) * sw} y1={sy + 20 + random(`scy-${i}`) * (sh - 40)} x2={sx + random(`sc-${i}`) * sw + 50} y2={sy + 26 + random(`scy-${i}`) * (sh - 40)} stroke="#C4BCAE" strokeWidth={2} />)}
          </g>
          {split === 0 && scrape > 0 && scrape < 1 ? (
            <g transform={`translate(${tool} ${sy + sh / 2})`}>
              <rect x={-8} y={-110} width={16} height={90} rx={6} fill="#6B4A2E" />
              <path d="M -26 -24 L 26 -24 L 18 10 L -18 10 Z" fill="#B87333" stroke="#7A4A1E" strokeWidth={3} />
            </g>
          ) : null}
          {split > 0 ? <line x1={sx + sw / 2} y1={sy - 20} x2={sx + sw / 2} y2={sy + sh + 20} stroke={C.ink} strokeWidth={4} strokeDasharray="10 8" opacity={split} /> : null}
        </svg>
      ) : null}
      <Tag text="առաջ" x={sx + sw * 0.25} y={sy + sh + 50} size={34} opacity={split} width={300} />
      <Tag text="հետո" x={sx + sw * 0.75} y={sy + sh + 50} size={34} opacity={split} width={300} />
      <SourceLine text="Բրիտանական թանգարան, 1937-1938" on={slab} />
      <DrawnTag x={60} y={950} on={1} />
    </Backdrop>
  );
};

// ---------- home: bare stone, then Akhtamar's frescoes ----------
const Home: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const fres = ramp(t, m.frescoes, 0.8);
  const akh = ramp(t, m.akhtamar, 0.8);
  return (
    <Backdrop>
      <Photo src="saghmosavank" x={140} y={230} w={740} h={860} zoom={1 + 0.02 * t} tag="Սաղմոսավանք" tagColor={C.ink} opacity={1 - fres} />
      <Photo src="akhtamar_2" x={140} y={230} w={740} h={860} zoom={1 + 0.02 * Math.max(0, t - m.frescoes)} opacity={fres * (1 - akh)} tag="Աղթամար" tagColor={C.ink} />
      <Photo src="akhtamar_dome" x={140} y={230} w={740} h={860} zoom={1.05 + 0.03 * Math.max(0, t - m.akhtamar)} opacity={akh} tag="Աղթամար" tagColor={C.ink} />
    </Backdrop>
  );
};

// ---------- copies: the modern painted reconstructions ----------
const Copies: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const toy = ramp(t, m.toy, 0.4);
  const wob = (i: number) => toy * 2.5 * Math.sin(t * 5 + i * 2);
  return (
    <Backdrop>
      <Photo src="tenea_color" x={40} y={240} w={320} h={560} pos="50% 35%" rot={wob(0)} opacity={ramp(t, m.a, 0.4)} tag="վերակազմություն" />
      <Photo src="aristion_color" x={380} y={240} w={320} h={560} pos="50% 30%" rot={wob(1)} opacity={ramp(t, m.b, 0.4)} tag="վերակազմություն" />
      <Photo src="riace_color" x={720} y={240} w={320} h={560} pos="70% 40%" rot={wob(2)} opacity={ramp(t, m.c, 0.4)} tag="վերակազմություն" />
    </Backdrop>
  );
};

// ---------- doubt: flat paint, subtle paint, and the honest question mark ----------
const Face: React.FC<{ cx: number; cy: number; mode: "flat" | "subtle"; shade?: number; tone?: number; gold?: number; opacity?: number }> = ({ cx, cy, mode, shade = 0, tone = 0, gold = 0, opacity = 1 }) => {
  const id = `f-${cx}`;
  const flat = mode === "flat";
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>
      <defs>
        <radialGradient id={`${id}-skin`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#F1D2B0" />
          <stop offset="100%" stopColor={shade > 0 ? "#B98B66" : "#F1D2B0"} />
        </radialGradient>
      </defs>
      <g transform={`translate(${cx} ${cy})`}>
        <path d="M -95 -40 Q -100 -150 0 -160 Q 100 -150 95 -40 L 110 120 L -110 120 Z" fill={flat ? "#C8701E" : "#8A5A2B"} />
        <ellipse cx={0} cy={-10} rx={84} ry={110} fill={flat ? "#F4C79A" : `url(#${id}-skin)`} />
        <path d="M -60 -50 Q -35 -62 -12 -50 M 12 -50 Q 35 -62 60 -50" stroke={flat ? "#111" : "#4A3020"} strokeWidth={flat ? 9 : 5} fill="none" />
        <ellipse cx={-36} cy={-24} rx={16} ry={8} fill={flat ? "#1E4FD0" : "#3B5E88"} />
        <ellipse cx={36} cy={-24} rx={16} ry={8} fill={flat ? "#1E4FD0" : "#3B5E88"} />
        <path d="M 0 -20 L -8 30 L 8 32" stroke={flat ? "#111" : "#9A6A4A"} strokeWidth={4} fill="none" />
        <path d="M -24 58 Q 0 72 24 58" stroke={flat ? "#E0101A" : "#A84A44"} strokeWidth={flat ? 10 : 6} fill="none" />
        {!flat ? <ellipse cx={-50} cy={20} rx={22} ry={12} fill="#D98C80" opacity={0.45 * tone} /> : null}
        {!flat ? <ellipse cx={50} cy={20} rx={22} ry={12} fill="#D98C80" opacity={0.45 * tone} /> : null}
        <path d="M -92 -92 Q 0 -128 92 -92" stroke={GOLD} strokeWidth={12} fill="none" opacity={flat ? 1 : gold} style={{ filter: gold > 0 && !flat ? "drop-shadow(0 0 6px rgba(255,210,90,0.9))" : undefined }} />
      </g>
    </svg>
  );
};
const Doubt: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const flatOn = ramp(t, 0.2, 0.5); // the bright copy is up from the beat's first frame
  const hypTag = ramp(t, m.hyp, 0.4);
  const subtle = ramp(t, m.subtle, 0.5);
  const fact = ramp(t, m.fact, 0.4);
  const q = ramp(t, m.unknown, 0.5);
  return (
    <Backdrop>
      <Face cx={210} cy={560} mode="flat" opacity={flatOn} />
      <Face cx={504} cy={560} mode="subtle" shade={ramp(t, m.shade, 0.6)} tone={ramp(t, m.tone, 0.6)} gold={ramp(t, m.gold, 0.6)} opacity={subtle} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: q }}>
        <ellipse cx={810} cy={550} rx={84} ry={110} fill="none" stroke={C.dim} strokeWidth={5} strokeDasharray="12 10" />
      </svg>
      <Tag text="?" x={810} y={560} size={150} weight={900} color={C.orange} opacity={q} width={200} />
      <Tag text="վարկած" x={210} y={760} size={32} color={C.dim} opacity={hypTag} width={260} />
      <Tag text="վարկած" x={504} y={760} size={32} color={C.dim} opacity={subtle} width={260} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: fact }}>
        {[PAINT_RED, PAINT_BLUE, GOLD].map((c, i) => <circle key={i} cx={414 + i * 90} cy={900} r={30} fill={c} stroke={C.ink} strokeWidth={3} />)}
      </svg>
      <Tag text="փաստ" x={504} y={980} size={40} color={C.orange} opacity={fact} width={300} />
      <DrawnTag x={60} y={1020} on={flatOn} />
    </Backdrop>
  );
};

// ---------- takeaway: the white original alone, then its reconstruction again ----------
const Takeaway: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const back = ramp(t, m.admire, 0.8, easeInOut);
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Photo src="archer_original" x={lerp(300, 40, back)} y={330} w={480} h={640} pos="60% 50%" zoom={1 + 0.008 * t} tag="բնօրինակ" tagColor={C.ink} />
      <Photo src="archer_color" x={560} y={330} w={480} h={640} pos="78% 50%" opacity={back} tag="վերակազմություն" />
      <Title text={<>Հիացել ենք գեղեցկությամբ, որը <span style={{ color: C.orange }}>վնասվածքի արդյունք էր</span></>} on={ramp(t, m.admire, 0.6)} y={180} size={42} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ red: S.at("hook", "կարմիր"), blue: S.at("hook", "կապույտ"), gold: S.at("hook", "ոսկեգույն") }} /> },
  { keys: ["traces"], render: () => {
    const g0 = S.beat("traces").start;
    const r = (w: string, nth?: number) => rel(g0, S.at("traces", w, nth));
    return <Traces m={{ raking: r("թեք"), uv: r("ուլտրամանուշակագույն"), blue: r("եգիպտական"), visible: r("սովորական"), ir: r("ինֆրակարմիր"), camera: r("տեսախցիկը"), micro: r("մանրադիտակային") }} />;
  } },
  { keys: ["kore"], render: () => {
    const g0 = S.beat("kore").start;
    return <Kore m={{ paint: rel(g0, S.at("kore", "ներկ")), today: rel(g0, S.at("kore", "Այսօր")) }} />;
  } },
  { keys: ["why_white"], render: () => {
    const g0 = S.beat("why_white").start;
    const r = (w: string) => rel(g0, S.at("why_white", w));
    return <WhyWhite m={{ years: r("Երկու"), rain: r("անձրևն"), soil: r("հողը"), renaissance: r("Վերածննդի"), copy: r("քանդակագործները") }} />;
  } },
  { keys: ["ideal"], render: () => {
    const g0 = S.beat("ideal").start;
    const r = (w: string, nth?: number) => rel(g0, S.at("ideal", w, nth));
    return <Ideal m={{ ideal: r("իդեալ"), clean: r("մաքրում"), london: r("Անցյալ"), tools: r("պղնձե"), whiter: r("սպիտակ", 1), after: r("երևան") }} />;
  } },
  { keys: ["home"], render: () => {
    const g0 = S.beat("home").start;
    return <Home m={{ frescoes: rel(g0, S.at("home", "ներսից")), akhtamar: rel(g0, S.at("home", "Աղթամարում")) }} />;
  } },
  { keys: ["copies"], render: () => {
    const g0 = S.beat("copies").start;
    const r = (w: string) => rel(g0, S.at("copies", w));
    return <Copies m={{ a: r("գիտնականները"), b: r("արձանների"), c: r("պատճեններ"), toy: r("կոպիտ") }} />;
  } },
  { keys: ["doubt"], render: () => {
    const g0 = S.beat("doubt").start;
    const r = (w: string) => rel(g0, S.at("doubt", w));
    return <Doubt m={{ hyp: r("վարկածներ"), subtle: r("նուրբ"), shade: r("ստվերներով"), tone: r("երանգներով"), gold: r("ոսկեզօծումով"), fact: r("Գույն"), unknown: r("Թե") }} />;
  } },
  { keys: ["takeaway"], render: () => {
    const g0 = S.beat("takeaway").start;
    return <Takeaway m={{ admire: rel(g0, S.at("takeaway", "Եվ")) }} />;
  } },
];

export const PaintedStatues: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * PS_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * PS_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`painted_statues/${S.audio}`)} />
  </AbsoluteFill>
);
