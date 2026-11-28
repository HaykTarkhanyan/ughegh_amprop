// "Why does an hour have 60 minutes?" (9:16 Short, draft for review; DECISIONS #28). Real photos from Commons
// (minute_60/assets/credits.json): a French Revolutionary 10-hour clock (Cormullion, CC BY-SA 3.0) and the Babylonian
// tablet YBC 7289 (Yale Peabody Museum, CC0). The rest is drawn: finger counting to 60, the 60-dot ring that splits
// cleanly against a 100-dot ring that cannot be split in three, and the Latin words behind "minute" and "second".
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import TL from "../data/minute_60.json";
import { C, FONT, easeInOut, lerp, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "minute_60", "portrait");
export const MIN_FPS = 30;
const TAIL_S = 1.2;
export const MIN_FRAMES = Math.ceil((S.duration + TAIL_S) * MIN_FPS);
const Svg: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>{children}</svg>
);
const BANDS = ["#F2A800", "#4A90E2", "#3DAA55", "#E8383D", "#C77DFF", "#F2D7A8", "#6FC3FF", "#D9A066", "#FF8FA3", "#8AD9A0", "#B0B6C2", "#FFD36B"];

const MetreKilo: React.FC<{ on: number; kilo: number; x?: number; y?: number }> = ({ on, kilo, x = 0, y = 0 }) => (
  <Svg opacity={on}>
    <g transform={`translate(${x} ${y})`}>
      <rect x={140} y={1010} width={560} height={40} rx={6} fill="#F2D7A8" stroke="#A88C5A" strokeWidth={3} />
      {Array.from({ length: 11 }, (_, i) => <line key={i} x1={140 + i * 56} x2={140 + i * 56} y1={1010} y2={i % 5 === 0 ? 1040 : 1028} stroke="#5A4528" strokeWidth={3} />)}
      <g opacity={kilo}>
        <path d="M 790 1050 L 820 960 L 900 960 L 930 1050 Z" fill="#8A8F99" stroke="#5A606A" strokeWidth={3} />
        <rect x={840} y={935} width={40} height={30} rx={8} fill="none" stroke="#5A606A" strokeWidth={6} />
      </g>
    </g>
  </Svg>
);
// a ring of n dots; `band` colours them by slices of size n / parts; `blink` marks the leftover dot
const Ring: React.FC<{ n: number; cx: number; cy: number; r: number; parts: number; on?: number; blinkLeft?: number; t: number }> = ({ n, cx, cy, r, parts, on = 1, blinkLeft = 0, t }) => (
  <g opacity={on}>
    {Array.from({ length: n }, (_, i) => {
      const a = -Math.PI / 2 + (i / n) * 2 * Math.PI;
      const per = Math.floor(n / parts);
      const slice = parts > 1 ? Math.floor(i / per) : 0;
      const left = parts > 1 && i >= per * parts;
      const fill = left ? (blinkLeft > 0 && Math.sin(t * 10) > 0 ? C.red : "#3A3F48") : parts > 1 ? BANDS[slice % BANDS.length] : "#8A8F99";
      return <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={n > 80 ? 8 : 11} fill={fill} />;
    })}
  </g>
);
// a hand, palm facing us; `folded` how many fingers (from the little finger) are folded; joint `tap` 0..11 for the thumb
const Hand: React.FC<{ x: number; y: number; s?: number; folded?: number; tap?: number; mirror?: boolean }> = ({ x, y, s = 1, folded = 0, tap = -1, mirror = false }) => {
  const fingers = [{ dx: -75, len: 150 }, { dx: -25, len: 180 }, { dx: 25, len: 170 }, { dx: 75, len: 130 }];
  return (
    <g transform={`translate(${x} ${y}) scale(${mirror ? -s : s} ${s})`}>
      <rect x={-110} y={-20} width={220} height={200} rx={60} fill="#E8B996" />
      {fingers.map((f, i) => {
        const fold = folded > 3 - i ? 1 : 0;
        const len = f.len * (1 - 0.65 * fold);
        return (
          <g key={i}>
            <rect x={f.dx - 22} y={-len} width={44} height={len + 20} rx={22} fill="#E8B996" stroke="#C9956A" strokeWidth={2} />
            {fold === 0 ? [0, 1, 2].map((j) => {
              const jy = -len * (0.2 + j * 0.3);
              const k = (3 - i) * 3 + j; // 12 joints counted from the little finger's base
              return <circle key={j} cx={f.dx} cy={jy} r={9} fill={tap === k ? C.orange : "#C9956A"} />;
            }) : null}
          </g>
        );
      })}
      <rect x={100} y={40} width={44} height={110} rx={22} fill="#E8B996" stroke="#C9956A" strokeWidth={2} transform="rotate(-35 122 95)" />
      {fold5(folded) ? <circle cx={122} cy={60} r={10} fill={C.orange} /> : null}
    </g>
  );
};
const fold5 = (f: number) => f >= 5;

// ---------- hook: the 10-hour clock, the metre that stayed ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const fade = ramp(t, m.decimal, 0.8);
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 140, top: 230, width: 800, height: 760, borderRadius: 24, overflow: "hidden", opacity: 1 - 0.85 * fade }}>
        <Img src={staticFile("minute_60/decimal_clock.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1 + 0.02 * t})` }} />
      </div>
      <MetreKilo on={ramp(t, m.metre, 0.5)} kilo={ramp(t, m.kilo, 0.5)} />
      <Tag text="1 մ" x={420} y={1090} size={30} color="#F2D7A8" opacity={ramp(t, m.metre, 0.5)} width={200} />
      <Tag text="1 կգ" x={860} y={1090} size={30} color="#AEB4BF" opacity={ramp(t, m.kilo, 0.5)} width={200} />
    </Backdrop>
  );
};

// ---------- old: Babylon counted in sixties ----------
const Old: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 140, top: 240, width: 800, height: 780, borderRadius: 24, overflow: "hidden", background: "#000" }}>
        <Img src={staticFile("minute_60/ybc7289.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "70% 4%", transform: `scale(${1.25 + 0.015 * t})`, transformOrigin: "62% 22%" }} />
      </div>
      <Tag text="60" x={540} y={620} size={200} weight={900} color={C.orange} opacity={ramp(t, m.sumer, 0.5) * (0.7 + 0.3 * Math.sin(t * 3))} width={400} />
      <Tag text="մ.թ.ա. մոտ 2000" x={540} y={1060} size={32} color={C.dim} opacity={ramp(t, 0.3, 0.5)} width={400} />
      <Tag text="?" x={880} y={300} size={110} weight={900} color={C.orange} opacity={ramp(t, m.why, 0.4)} width={160} />
    </Backdrop>
  );
};

// ---------- fingers: 12 joints x 5 fingers = 60 ----------
const Fingers: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const STEP = 0.16;
  const count = Math.max(0, Math.min(60, Math.floor((t - m.tryIt) / STEP)));
  const tap = count > 0 && count < 60 ? (count - 1) % 12 : -1;
  const folded = Math.floor(count / 12);
  return (
    <Backdrop>
      <Svg>
        <Hand x={330} y={720} s={1.05} tap={tap} />
        <Hand x={760} y={720} s={1.05} folded={folded} mirror />
      </Svg>
      <Tag text={String(count)} x={540} y={330} size={120} weight={900} color={count === 60 ? C.orange : C.ink} opacity={ramp(t, m.tryIt, 0.3)} width={300} />
      <Tag text="12 × 5 = 60" x={540} y={1040} size={44} color={C.orange} opacity={ramp(t, m.sixty, 0.4)} width={500} />
      <SourceLine text="հնարավոր է՝ այսպես էին հաշվում (վարկած)" on={ramp(t, 0.3, 0.5)} />
    </Backdrop>
  );
};

// ---------- divides: 60 splits, 100 does not split in three ----------
const SPLITS = [2, 3, 4, 5, 6, 10, 12];
const Divides: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const idx = Math.min(SPLITS.length - 1, Math.max(0, Math.floor((t - m.two) / 0.9)));
  const parts = t < m.two ? 1 : SPLITS[idx];
  const hundred = ramp(t, m.third100 - 0.6, 0.5);
  const run = Math.max(0, t - m.decimal);
  const digits = "33," + "3".repeat(Math.min(40, Math.floor(run * 8)));
  return (
    <Backdrop>
      <Svg>
        <Ring n={60} cx={hundred > 0 ? lerp(540, 300, hundred) : 540} cy={600} r={hundred > 0 ? lerp(260, 190, hundred) : 260} parts={parts} t={t} />
        <Ring n={100} cx={790} cy={600} r={200} parts={t > m.third100 ? 3 : 1} on={hundred} blinkLeft={t > m.third100 ? 1 : 0} t={t} />
      </Svg>
      <Tag text={`60 ÷ ${parts} = ${60 / parts}`} x={hundred > 0 ? 300 : 540} y={600} size={hundred > 0 ? 40 : 56} weight={900} color={C.orange} opacity={t >= m.two ? 1 : 0} width={360} />
      <Tag text="100 ÷ 3" x={790} y={600} size={40} weight={900} color={C.red} opacity={ramp(t, m.third100, 0.4)} width={300} />
      <div style={{ position: "absolute", left: 100, top: 920, width: 880, overflow: "hidden", whiteSpace: "nowrap", fontFamily: FONT, fontSize: 64, fontWeight: 900, color: C.red, opacity: ramp(t, m.decimal, 0.4) }}>{digits}…</div>
    </Backdrop>
  );
};

// ---------- names: degree -> minuta -> secunda; the minute hand arrives late ----------
const Names: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const split1 = ramp(t, m.degree, 0.8, easeInOut);
  const lat = ramp(t, m.minuta, 0.5);
  const sec = ramp(t, m.secunda, 0.5);
  const ru = ramp(t, m.russian, 0.6);
  const clock = ramp(t, m.hand - 0.3, 0.5);
  const minuteHand = ramp(t, m.hand + 0.6, 0.8, easeInOut);
  return (
    <Backdrop>
      <div style={{ opacity: 1 - clock }}>
        <Svg>
          <path d="M 200 640 A 340 340 0 0 1 880 640" stroke="#5A606A" strokeWidth={6} fill="none" />
          {Array.from({ length: 61 }, (_, i) => {
            const a = Math.PI + (i / 60) * Math.PI;
            const r1 = 340, r2 = 340 - (i % 5 === 0 ? 30 : 16);
            return <line key={i} x1={540 + r1 * Math.cos(a)} y1={640 + r1 * Math.sin(a)} x2={540 + r2 * Math.cos(a)} y2={640 + r2 * Math.sin(a)} stroke={C.orange} strokeWidth={3} opacity={split1 > i / 60 ? 1 : 0} />;
          })}
        </Svg>
        <Tag text="1° = 60 մաս" x={540} y={560} size={40} opacity={split1} width={500} />
        <Tag text={ru > 0.5 ? "минута" : "pars minuta prima"} x={540} y={740} size={ru > 0.5 ? 56 : 40} color={C.orange} opacity={lat} width={800} />
        <Tag text={ru > 0.5 ? "секунда" : "pars minuta secunda"} x={540} y={840} size={ru > 0.5 ? 56 : 40} color="#6FA8FF" opacity={sec} width={800} />
        <Tag text="«փոքր»" x={540} y={790} size={28} color={C.dim} opacity={lat * (1 - ru)} width={300} />
        <Tag text="second = 2nd" x={540} y={920} size={34} color={C.dim} opacity={ru} width={500} />
      </div>
      <Svg opacity={clock}>
        <rect x={360} y={360} width={360} height={680} rx={30} fill="#4A3A2A" />
        <circle cx={540} cy={560} r={140} fill="#E9E1CC" stroke="#A88C5A" strokeWidth={6} />
        {Array.from({ length: 12 }, (_, i) => <line key={i} x1={540 + 120 * Math.sin((i * Math.PI) / 6)} y1={560 - 120 * Math.cos((i * Math.PI) / 6)} x2={540 + 132 * Math.sin((i * Math.PI) / 6)} y2={560 - 132 * Math.cos((i * Math.PI) / 6)} stroke="#2A2018" strokeWidth={5} />)}
        <line x1={540} y1={560} x2={540 + 70 * Math.sin(2.2)} y2={560 - 70 * Math.cos(2.2)} stroke="#2A2018" strokeWidth={10} strokeLinecap="round" />
        <line x1={540} y1={560} x2={540 + 115 * Math.sin(5.2 + t)} y2={560 - 115 * Math.cos(5.2 + t)} stroke={C.orange} strokeWidth={6} strokeLinecap="round" opacity={minuteHand} />
      </Svg>
      <Tag text="16-րդ դարի վերջ" x={540} y={820} size={34} color={C.orange} opacity={minuteHand} width={500} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Svg>
        <Ring n={60} cx={300} cy={700} r={170} parts={[2, 3, 4][Math.floor(t / 1.2) % 3]} t={t} />
        <Hand x={720} y={760} s={0.7} />
        <Hand x={900} y={760} s={0.7} mirror />
      </Svg>
      <MetreKilo on={0.6} kilo={0} x={0} y={0} />
      <Title text={<>Վաթսունը լավ է բաժանվում, <span style={{ color: C.orange }}>տասը՝ մատներից է</span></>} on={ramp(t, 0.3, 0.6)} y={260} size={50} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ metre: at("hook", "մետրն"), kilo: at("hook", "կիլոգրամը"), decimal: at("hook", "Տասնորդական") }} /> },
  { keys: ["old"], render: () => <Old m={{ sumer: at("old", "Շումերները"), why: at("old", "Ինչո՞ւ") }} /> },
  { keys: ["fingers"], render: () => <Fingers m={{ tryIt: at("fingers", "Փորձիր"), sixty: at("fingers", "վաթսուն", 1) }} /> },
  { keys: ["divides"], render: () => <Divides m={{ two: at("divides", "երկուսի"), third100: at("divides", "երրորդը", 1), decimal: at("divides", "երեսուներեք") }} /> },
  { keys: ["names"], render: () => <Names m={{ degree: at("names", "աստիճանը"), minuta: at("names", "մինուտա"), secunda: at("names", "սեկունդա"), russian: at("names", "ռուսերենից"), hand: at("names", "սլաքը") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const MinuteSixty: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * MIN_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * MIN_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`minute_60/${S.audio}`)} />
  </AbsoluteFill>
);
