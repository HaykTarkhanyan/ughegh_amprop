// "Why your own voice sounds strange on a recording" (9:16 Short, draft for review; Q32, 2026-11-27).
// Beats 2-5 are one continuous diagram: a head with the two paths (air around to the ear, bone inside the skull), a
// frequency chart where the bone path adds bass, the microphone that hears only the air path, and the plugged ears.
// The other beats are single scenes. Key moments are tied to the narration's words (timeline.ts).
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import TL from "../data/own_voice.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop, CheckMark, Label } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";

const S = loadTimeline(TL, "own_voice", "portrait");
export const OV_FPS = 30;
const TAIL_S = 1.2;
export const OV_FRAMES = Math.ceil((S.duration + TAIL_S) * OV_FPS);
const rel = (g0: number, x: number) => Math.max(0, x - g0);
const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

// ---------- drawings ----------
const HEAD = "M 170 470 C 118 400 108 300 138 222 C 172 132 268 80 360 94 C 452 108 503 170 507 246 L 542 302 L 514 316 C 518 344 512 370 497 386 C 503 410 492 430 472 436 L 432 441 C 421 470 402 490 382 500 L 382 560 L 222 560 Z";
const EAR = { x: 300, y: 292 };
const MOUTH = { x: 512, y: 398 };

// the head in profile with the two sound paths; air / bone in 0..1 (how strongly each is shown), dash moves with t
const HeadPaths: React.FC<{ x: number; y: number; scale: number; t: number; air: number; bone: number; hands?: number; mic?: number; talk?: number }> = ({ x, y, scale, t, air, bone, hands = 0, mic = 0, talk }) => (
  <svg width={620 * scale} height={600 * scale} viewBox="0 0 620 600" style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
    <path d={HEAD} fill="#232733" stroke="#3A4152" strokeWidth="4" />
    {/* the ear */}
    <path d={`M ${EAR.x - 14} ${EAR.y - 30} C ${EAR.x + 22} ${EAR.y - 40} ${EAR.x + 26} ${EAR.y + 26} ${EAR.x - 6} ${EAR.y + 34}`} fill="none" stroke="#5B6374" strokeWidth="9" strokeLinecap="round" />
    {/* path 1: out of the mouth, through the air, round to the ear */}
    <path d={`M ${MOUTH.x + 10} ${MOUTH.y} C 650 400 660 160 520 100 C 420 58 330 120 ${EAR.x + 4} ${EAR.y - 36}`} fill="none" stroke={C.blue} strokeWidth="9" strokeLinecap="round" strokeDasharray="18 16" strokeDashoffset={-t * 60} opacity={air} />
    {[0, 1, 2].map((k) => (
      <path key={k} d={`M ${MOUTH.x + 30 + k * 26} ${MOUTH.y - 26 - k * 8} q 16 26 0 52`} fill="none" stroke={C.blue} strokeWidth="6" strokeLinecap="round" opacity={(talk ?? air) * (0.4 + 0.6 * Math.abs(Math.sin(t * 4 - k)))} />
    ))}
    {/* path 2: from the throat through the skull to the inner ear */}
    <path d={`M 430 470 L 410 440 L 432 418 L 398 396 L 420 370 L 380 352 L 396 326 L ${EAR.x + 18} ${EAR.y + 8}`} fill="none" stroke={C.orange} strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" opacity={bone} style={{ filter: bone > 0.6 ? `drop-shadow(0 0 ${12 * bone}px ${C.orange})` : undefined }} />
    <circle cx={EAR.x + 18} cy={EAR.y + 8} r={14 + 3 * Math.sin(t * 6)} fill={C.orange} opacity={bone * 0.9} />
    {/* fingers in the ears */}
    {hands > 0 ? <ellipse cx={EAR.x - 6} cy={EAR.y} rx={30} ry={46} fill="#D9B48F" stroke="#A9825E" strokeWidth="4" opacity={hands} transform={`translate(${(1 - hands) * -80} 0)`} /> : null}
    {/* the microphone, catching only path 1 */}
    {mic > 0 ? (
      <g opacity={mic} transform={`translate(${590 - (1 - mic) * 60} 330)`}>
        <rect x="-26" y="-60" width="52" height="92" rx="26" fill="#3B4150" stroke={C.ink} strokeWidth="4" />
        <path d="M -40 10 A 40 40 0 0 0 40 10 M 0 50 V 84 M -24 84 H 24" fill="none" stroke={C.ink} strokeWidth="5" strokeLinecap="round" />
      </g>
    ) : null}
  </svg>
);

const AIR = [40, 70, 95, 110, 100, 85, 70, 58, 45, 35, 26, 18];
const BONE = [95, 85, 60, 34, 14, 4, 0, 0, 0, 0, 0, 0];
// the voice as a frequency chart: blue = through the air, orange = what the bones add (low notes on the left)
const Chart: React.FC<{ y: number; t: number; show: number; bone: number; airK?: number }> = ({ y, show, bone, airK = 1 }) => (
  <div style={{ position: "absolute", left: 140, top: y, width: 760, height: 330, opacity: show }}>
    <svg width={760} height={330}>
      <line x1="20" y1="270" x2="740" y2="270" stroke="#5B6374" strokeWidth="3" />
      {AIR.map((a, i) => {
        const x = 40 + i * 58, ah = a * 1.1 * airK * show, bh = BONE[i] * 1.1 * bone;
        return (
          <g key={i}>
            <rect x={x} y={270 - ah} width={42} height={ah} rx={6} fill={C.blue} opacity={0.35 + 0.65 * airK} />
            <rect x={x} y={270 - ah - bh} width={42} height={bh} rx={6} fill={C.orange} />
          </g>
        );
      })}
    </svg>
    <div style={{ position: "absolute", left: 20, top: 282, fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.dim }}>ցածր (բաս)</div>
    <div style={{ position: "absolute", right: 20, top: 282, fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.dim }}>բարձր</div>
  </div>
);

const Wave: React.FC<{ w: number; h: number; t: number; rich: boolean; color: string }> = ({ w, h, t, rich, color }) => (
  <svg width={w} height={h}>
    {Array.from({ length: 34 }, (_, i) => {
      const base = rich ? 0.55 + 0.45 * Math.abs(Math.sin(i * 0.7)) : 0.28 + 0.3 * Math.abs(Math.sin(i * 1.3));
      const a = base * (0.75 + 0.25 * Math.sin(t * 5 + i));
      const bh = a * h * 0.9;
      return <rect key={i} x={i * (w / 34)} y={(h - bh) / 2} width={w / 34 - 4} height={bh} rx={3} fill={color} />;
    })}
  </svg>
);

const Face: React.FC<{ x: number; y: number; cringe: number }> = ({ x, y, cringe }) => (
  <svg width={200} height={200} viewBox="0 0 200 200" style={{ position: "absolute", left: x, top: y }}>
    <circle cx="100" cy="100" r="88" fill="#F2C9A0" stroke="#C99A6E" strokeWidth="5" />
    <path d={`M 52 ${82 + 6 * cringe} l 30 ${-8 * cringe} M 148 ${82 + 6 * cringe} l -30 ${-8 * cringe}`} stroke="#3A2A1E" strokeWidth="8" strokeLinecap="round" />
    <path d={`M 60 140 q 40 ${18 - 40 * cringe} 80 0`} fill="none" stroke="#3A2A1E" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

// ---------- scenes ----------
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 120, width: 768, top: 300, textAlign: "center", fontFamily: FONT, fontSize: 56, fontWeight: 800, color: C.ink, lineHeight: 1.2 }}>
        Իսկապե՞ս <span style={{ color: C.orange }}>այսպես</span> եմ խոսում
      </div>
      <div style={{ position: "absolute", left: 200, top: 470, width: 420, height: 420, borderRadius: 48, background: "#0F1115", border: "8px solid #2B2F38", padding: 30, boxSizing: "border-box" }}>
        <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.dim, marginBottom: 26 }}>Ձայնագրություն</div>
        <Wave w={340} h={150} t={t} rich={false} color={C.blue} />
        <div style={{ marginTop: 34, width: 90, height: 90, borderRadius: "50%", background: C.orange, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="40" height="40" viewBox="0 0 40 40"><path d="M 12 6 L 34 20 L 12 34 Z" fill={C.bg} /></svg>
        </div>
      </div>
      <Face x={640} y={560} cringe={ramp(t, m.cringe, 0.6) * (1 - 0.6 * ramp(t, m.yes, 0.6))} />
      <Label text="մոտավորապես այդպես են քեզ լսում մյուսները" x={504} y={930} size={30} color={C.ink} width={760} opacity={ramp(t, m.yes, 0.5)} />
    </Backdrop>
  );
};

const Diagram: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const air = ramp(t, m.air, 0.6) * (1 - 0.75 * ramp(t, m.plug, 0.5));
  const bone = ramp(t, m.bone, 0.6) * (1 - ramp(t, m.cut, 0.6)) + ramp(t, m.plug, 0.6) * 1.0;
  const chartIn = ramp(t, m.chart, 0.6);
  const shrink = ramp(t, m.chart - 0.2, 0.8, easeInOut); // the head moves up to make room for the chart
  const boneBars = ramp(t, m.bass, 0.8) * (1 - ramp(t, m.cut, 0.8)) + ramp(t, m.plug, 0.8) * 1.35;
  const micIn = ramp(t, m.mic, 0.5) * (1 - ramp(t, m.tryIn - 0.3, 0.4));
  const hands = ramp(t, m.plug - 0.3, 0.5);
  const tryBig = ramp(t, m.tryIn, 0.4) * (1 - ramp(t, m.plug + 1.2, 0.5));
  const label = (text: string, on: number, color: string, y: number) => (
    <Label text={text} x={504} y={y} size={34} color={color} weight={700} width={760} opacity={on} />
  );
  return (
    <Backdrop>
      <HeadPaths x={lerp(220, 290, shrink)} y={lerp(330, 300, shrink)} scale={lerp(1.0, 0.72, shrink)} t={t} air={air} bone={Math.min(1, bone)} hands={hands} mic={micIn} talk={ramp(t, 0.2, 0.5)} />
      {label("2 ճանապարհ", ramp(t, m.two, 0.4) * (1 - ramp(t, m.air, 0.4)), C.ink, 950)}
      {label("օդով", ramp(t, m.air, 0.4) * (1 - shrink), C.blue, 950)}
      {label("ոսկորներով", ramp(t, m.bone, 0.4) * (1 - shrink), C.orange, 998)}
      <Chart y={660} t={t} show={chartIn} bone={Math.max(0, boneBars)} airK={1 - 0.6 * ramp(t, m.plug, 0.6)} />
      {label("ոսկորներն ավելացնում են բաս", ramp(t, m.bass, 0.5) * (1 - ramp(t, m.mic, 0.4)), C.orange, 1000)}
      {label("միկրոֆոն՝ միայն օդով", micIn * (1 - ramp(t, m.cut + 1.6, 0.4)), C.ink, 1000)}
      {label("ավելի բարակ, պակաս թավ", ramp(t, m.cut + 0.8, 0.4) * (1 - ramp(t, m.tryIn - 0.3, 0.3)), C.blue, 1000)}
      {label("ավելի ուժեղ ու թավ", ramp(t, m.louder, 0.4), C.orange, 1000)}
      {tryBig > 0 ? (
        <div style={{ position: "absolute", left: 120, width: 768, top: 300, textAlign: "center", fontFamily: FONT, fontSize: 60, fontWeight: 900, color: C.orange, opacity: tryBig, transform: `scale(${0.9 + 0.1 * Math.min(1, pop(t, m.tryIn, 9, 0.5))})` }}>
          Փորձիր հիմա
        </div>
      ) : null}
    </Backdrop>
  );
};

const UsedTo: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const card = (x: number, title: string, rich: boolean, on: number, color: string) => (
    <div style={{ position: "absolute", left: x, top: 380, width: 360, height: 360, borderRadius: 30, background: "#1B1E25", border: `3px solid ${color}`, padding: 24, boxSizing: "border-box", opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>
      <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color, marginBottom: 30, lineHeight: 1.2 }}>{title}</div>
      <Wave w={300} h={160} t={t} rich={rich} color={color} />
    </div>
  );
  return (
    <Backdrop>
      {card(140, "Ինչ լսում ես դու", true, ramp(t, 0.2, 0.5), C.orange)}
      {card(540, "Ինչ լսում են մյուսները", false, ramp(t, 0.8, 0.5), C.blue)}
      <div style={{ position: "absolute", left: 540, width: 360, top: 770, display: "flex", justifyContent: "center", gap: 26, opacity: ramp(t, m.rec, 0.5) }}>
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ textAlign: "center" }}>
            <svg width="70" height="70" viewBox="0 0 100 100"><circle cx="50" cy="36" r="18" fill={C.blue} /><path d="M 18 92 Q 50 52 82 92 Z" fill={C.blue} /></svg>
            <CheckMark size={40} progress={ramp(t, m.rec + 0.3 + k * 0.2, 0.4)} />
          </div>
        ))}
      </div>
      <Label text="= ձայնագրությունը" x={720} y={930} size={32} color={C.blue} weight={700} width={360} opacity={ramp(t, m.rec, 0.5)} />
    </Backdrop>
  );
};

const Study: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const reveal = ramp(t, m.own, 0.5);
  const bars = ramp(t, m.rated, 0.8, easeInOut);
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 120, width: 768, top: 300, textAlign: "center", fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.ink, opacity: ramp(t, 0.3, 0.5) }}>Որքա՞ն գրավիչ է այս ձայնը</div>
      {[0, 1, 2, 3, 4].map((k) => {
        const you = k === 2;
        return (
          <div key={k} style={{ position: "absolute", left: 160, top: 380 + k * 120, width: 690, height: 96, borderRadius: 22, background: "#1B1E25", border: `3px solid ${you ? `rgba(242,168,0,${0.3 + 0.7 * reveal})` : "#2B2F38"}`, display: "flex", alignItems: "center", gap: 20, padding: "0 22px", boxSizing: "border-box", opacity: ramp(t, 0.5 + k * 0.15, 0.4) }}>
            <Wave w={200} h={60} t={t + k} rich={false} color={you ? C.orange : C.dim} />
            <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: you ? C.orange : C.dim, width: 150 }}>{you ? (reveal > 0.5 ? "քո ձայնը" : "?") : "?"}</div>
            {you ? (
              <div style={{ flex: 1 }}>
                <div style={{ height: 16, width: `${92 * bars}%`, background: C.orange, borderRadius: 8, marginBottom: 8 }} />
                <div style={{ height: 16, width: `${64 * bars}%`, background: C.blue, borderRadius: 8 }} />
              </div>
            ) : null}
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 120, width: 768, top: 1000, display: "flex", justifyContent: "center", gap: 40, fontFamily: FONT, fontSize: 28, fontWeight: 700, opacity: bars }}>
        <span style={{ color: C.orange }}>■ դու ինքդ</span><span style={{ color: C.blue }}>■ ուրիշները</span>
      </div>
    </Backdrop>
  );
};

const Person9: React.FC<{ x: number; y: number; color: string; label: string; on: number }> = ({ x, y, color, label, on }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 110, textAlign: "center", opacity: on, transform: `scale(${0.8 + 0.2 * on})` }}>
    <svg width="90" height="90" viewBox="0 0 100 100"><circle cx="50" cy="36" r="18" fill={color} /><path d="M 18 92 Q 50 52 82 92 Z" fill={color} /></svg>
    <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color }}>{label}</div>
  </div>
);

const WhyCringe: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 160, top: 360, fontFamily: FONT, fontSize: 32, fontWeight: 700, color: C.orange, opacity: ramp(t, 0.3, 0.5) }}>Սպասում էիր</div>
      <div style={{ position: "absolute", left: 160, top: 410, opacity: ramp(t, 0.3, 0.5) }}><Wave w={580} h={170} t={t} rich color={C.orange} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 600, textAlign: "center", fontFamily: FONT, fontSize: 80, fontWeight: 900, color: C.ink, opacity: ramp(t, 1.4, 0.5) }}>≠</div>
      <div style={{ position: "absolute", left: 160, top: 710, fontFamily: FONT, fontSize: 32, fontWeight: 700, color: C.blue, opacity: ramp(t, 1.0, 0.5) }}>Լսեցիր</div>
      <div style={{ position: "absolute", left: 160, top: 760, opacity: ramp(t, 1.0, 0.5) }}><Wave w={580} h={120} t={t} rich={false} color={C.blue} /></div>
      <Label text="անակնկալ (հավանաբար՝ մասամբ)" x={504} y={940} size={32} color={C.khaki} weight={700} width={760} opacity={ramp(t, 2.0, 0.5)} />
      <Person9 x={780} y={300} color={C.orange} label="ես" on={ramp(t, m.self, 0.5)} />
      <Person9 x={780} y={650} color={C.dim} label="օտա՞ր" on={ramp(t, m.stranger, 0.5)} />
    </Backdrop>
  );
};

const Practice: React.FC<{ m: Record<string, number>; dur: number }> = ({ m, dur }) => {
  const t = useT();
  const replays = Math.min(6, Math.floor(ramp(t, 0.8, Math.max(2, dur - 2.5), (x) => x) * 6));
  return (
    <Backdrop>
      <svg width="260" height="300" viewBox="0 0 260 300" style={{ position: "absolute", left: 140, top: 400 }}>
        <rect x="90" y="20" width="80" height="150" rx="40" fill="#3B4150" stroke={C.ink} strokeWidth="5" />
        <path d="M 60 120 A 70 70 0 0 0 200 120 M 130 190 V 250 M 90 250 H 170" fill="none" stroke={C.ink} strokeWidth="7" strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", left: 470, top: 400, width: 380 }}>
        <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.dim, marginBottom: 16 }}>տարօրինակություն</div>
        {Array.from({ length: 6 }, (_, k) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12, opacity: k <= replays ? 1 : 0.15 }}>
            <div style={{ width: 40, fontFamily: FONT, fontSize: 24, color: C.dim }}>{k + 1}</div>
            <div style={{ height: 24, width: 300 * (1 - k * 0.13), background: k <= replays ? C.orange : "#2B2F38", borderRadius: 12 }} />
          </div>
        ))}
      </div>
      <Label text="շատերի համար՝ ժամանակի հետ թուլանում է" x={504} y={900} size={30} color={C.ink} width={760} opacity={ramp(t, m.many, 0.5)} />
    </Backdrop>
  );
};

const Takeaway: React.FC = () => {
  const t = useT();
  return (
    <Backdrop glow="rgba(242,168,0,0.12)">
      <HeadPaths x={300} y={300} scale={0.7} t={t} air={1} bone={1 - ramp(t, 0.8, 0.8)} mic={1} />
      <div style={{ position: "absolute", left: 120, width: 768, top: 760, textAlign: "center", fontFamily: FONT, fontSize: 50, fontWeight: 900, color: C.ink, lineHeight: 1.2, opacity: ramp(t, 0.3, 0.6) }}>
        Ձայնագրությունը հանում է այն, ինչ լսում ես <span style={{ color: C.orange }}>միայն դու</span>
      </div>
    </Backdrop>
  );
};

type G = { keys: string[]; render: (dur: number) => React.ReactNode };
const GROUPS: G[] = [
  { keys: ["hook"], render: () => {
    const g0 = S.beat("hook").start;
    return <Hook m={{ cringe: rel(g0, S.at("hook", "իսկապե")), yes: rel(g0, S.at("hook", "Այո")) }} />;
  } },
  { keys: ["two_paths", "bone_bass", "recording", "try"], render: () => {
    const g0 = S.beat("two_paths").start;
    return <Diagram m={{
      two: rel(g0, S.at("two_paths", "երկու")), air: rel(g0, S.at("two_paths", "օդով")), bone: rel(g0, S.at("two_paths", "ներսից")),
      chart: rel(g0, S.beat("bone_bass").start), bass: rel(g0, S.at("bone_bass", "Դրա")),
      mic: rel(g0, S.at("recording", "միկրոֆոնը")), cut: rel(g0, S.at("recording", "Ոսկորների")),
      tryIn: rel(g0, S.at("try", "Փորձիր")), plug: rel(g0, S.at("try", "խոսիր")), louder: rel(g0, S.at("try", "Ձայնդ")),
    }} />;
  } },
  { keys: ["used_to"], render: () => {
    const g0 = S.beat("used_to").start;
    return <UsedTo m={{ rec: rel(g0, S.at("used_to", "Ձայնագրությունը")) }} />;
  } },
  { keys: ["study"], render: () => {
    const g0 = S.beat("study").start;
    return <Study m={{ own: rel(g0, S.at("study", "իրենց", 0)), rated: rel(g0, S.at("study", "Մարդիկ")) }} />;
  } },
  { keys: ["why_cringe"], render: () => {
    const g0 = S.beat("why_cringe").start;
    return <WhyCringe m={{ self: rel(g0, S.at("why_cringe", "Ձայնը")), stranger: rel(g0, S.at("why_cringe", "օտարին")) }} />;
  } },
  { keys: ["practice"], render: (dur) => {
    const g0 = S.beat("practice").start;
    return <Practice dur={dur} m={{ many: rel(g0, S.at("practice", "շատերի")) }} />;
  } },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const OwnVoice: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * OV_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * OV_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render(len / OV_FPS)}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`own_voice/${S.audio}`)} />
  </AbsoluteFill>
);
