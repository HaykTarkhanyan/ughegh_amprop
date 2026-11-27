// "Why English spelling is a mess" (9:16 Short, draft for review; DECISIONS #28). Typographic: words light letter by
// letter with their readings in Armenian letters; one spelling row that never changes over a sound row that slides.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import TL from "../data/english_spelling.json";
import { C, FONT, easeInOut, lerp, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";
import { SourceLine, Tag, Title, rel, useT } from "./parts";

const S = loadTimeline(TL, "english_spelling", "portrait");
export const ES_FPS = 30;
const TAIL_S = 1.2;
export const ES_FRAMES = Math.ceil((S.duration + TAIL_S) * ES_FPS);
const LATIN = "Georgia, 'Times New Roman', serif";

// a word whose letters can be lit or greyed one by one
const Word: React.FC<{ parts: { s: string; on?: number; grey?: number; color?: string }[]; x: number; y: number; size: number; opacity?: number }> = ({ parts, x, y, size, opacity = 1 }) => (
  <div style={{ position: "absolute", left: x - 500, top: y - size * 0.6, width: 1000, textAlign: "center", fontFamily: LATIN, fontSize: size, fontWeight: 700, opacity, whiteSpace: "pre" }}>
    {parts.map((p, i) => (
      <span key={i} style={{ color: p.grey ? `rgba(74,80,89,${0.4 + 0.6 * (1 - p.grey)})` : p.on ? p.color ?? C.orange : C.ink, textShadow: p.on ? `0 0 ${20 * p.on}px rgba(242,168,0,0.7)` : undefined, opacity: p.grey ? 1 - 0.55 * p.grey : 1 }}>{p.s}</span>
    ))}
  </div>
);

// ---------- hook: five -ough words ----------
const OUGH = [{ w: "th", r: "դոու", k: "Դոու" }, { w: "thr", r: "թրու", k: "թրու" }, { w: "t", r: "թաֆ", k: "թաֆ" }, { w: "c", r: "քոֆ", k: "քոֆ" }, { w: "b", r: "բաու", k: "բաու" }];
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const same = ramp(t, m.same, 0.4);
  return (
    <Backdrop>
      {OUGH.map((o, i) => {
        const lit = ramp(t, m[`w${i}`], 0.25) * (1 - ramp(t, i < 4 ? m[`w${i + 1}`] : m.same, 0.25));
        const reading = ramp(t, m[`w${i}`], 0.3);
        const y = 330 + i * 150;
        return (
          <React.Fragment key={i}>
            <Word parts={[{ s: o.w }, { s: "ough", on: Math.max(lit, same * (0.6 + 0.4 * Math.sin(t * 6))) }]} x={380} y={y} size={96} />
            <Tag text={o.r} x={790} y={y} size={50} color={lit > 0.5 ? C.orange : C.dim} opacity={reading} width={320} />
          </React.Fragment>
        );
      })}
      <Tag text="4 տառ, 5 արտասանություն" x={504} y={1060} size={40} opacity={ramp(t, m.five, 0.4)} />
    </Backdrop>
  );
};

// ---------- cost: reading progress bars, then an old manuscript ----------
const Cost: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const grow = ramp(t, m.learn, 2.6, easeInOut);
  const old = ramp(t, m.but, 0.8);
  const rows = [{ n: "ֆին", v: 1 }, { n: "իտալացի", v: 1 }, { n: "անգլիացի", v: 0.45 }];
  return (
    <Backdrop>
      <div style={{ opacity: 1 - old }}>
        {rows.map((r, i) => {
          const y = 420 + i * 170;
          return (
            <React.Fragment key={i}>
              <Tag text={r.n} x={230} y={y} size={36} width={260} />
              <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                <rect x={380} y={y - 30} width={560} height={60} rx={14} fill="rgba(255,255,255,0.07)" />
                <rect x={380} y={y - 30} width={560 * r.v * grow} height={60} rx={14} fill={i === 2 ? C.red : C.green} />
              </svg>
            </React.Fragment>
          );
        })}
        <Tag text="կարդալ սովորելը" x={660} y={300} size={30} color={C.dim} width={600} />
      </div>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: old }}>
        <rect x={190} y={300} width={640} height={720} rx={10} fill="#D9C7A0" stroke="#A88C5A" strokeWidth={6} />
        {Array.from({ length: 16 }, (_, i) => <line key={i} x1={240} x2={240 + 540 * (0.6 + 0.4 * ((i * 37) % 10) / 10)} y1={360 + i * 40} y2={360 + i * 40} stroke="#5A4528" strokeWidth={6} strokeLinecap="round" opacity={0.7} />)}
        <rect x={240} y={340} width={70} height={70} fill="#8E2B1E" />
      </svg>
      <SourceLine text="Seymour, Aro & Erskine, 2003" on={ramp(t, 0.3, 0.5) * (1 - old)} />
    </Backdrop>
  );
};

// ---------- knight: k-n-i-gh-t read as written, then k and gh fall silent ----------
const KN = [{ s: "k", a: "ք" }, { s: "n", a: "ն" }, { s: "i", a: "ի" }, { s: "gh", a: "խ" }, { s: "t", a: "տ" }];
const Knight: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const silent = ramp(t, m.changed, 0.8);
  const now = ramp(t, m.now, 0.5);
  return (
    <Backdrop>
      <Word parts={KN.map((k, i) => ({ s: k.s, on: ramp(t, m.read + i * 0.18, 0.2) * (1 - silent), grey: i === 0 || i === 3 ? silent : 0 }))} x={504} y={520} size={170} />
      {KN.map((k, i) => (
        <Tag key={i} text={k.a} x={[300, 400, 490, 600, 720][i]} y={720} size={64} color={C.orange} opacity={ramp(t, m.read + i * 0.18, 0.2) * (1 - now)} width={140} />
      ))}
      <Tag text="«նայթ»" x={504} y={730} size={72} color={C.orange} opacity={now} />
      <Tag text="1400-ականներ" x={504} y={330} size={32} color={C.dim} opacity={ramp(t, 0.3, 0.4) * (1 - now)} />
      <Tag text="այսօր" x={504} y={330} size={32} color={C.dim} opacity={now} />
    </Backdrop>
  );
};

// ---------- shift + print: one continuous shot of the two rows ----------
const ShiftPrint: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const slide = ramp(t, m.became, 1.2, easeInOut);
  const named = ramp(t, m.named, 0.5) * (1 - ramp(t, m.press - 0.5, 0.5));
  const q = ramp(t, m.unknown, 0.4) * (1 - ramp(t, m.press - 0.5, 0.5));
  const press = ramp(t, m.press, 0.5);
  const stamping = t > m.books && t < m.flash;
  const stampY = stamping ? Math.abs(Math.sin((t - m.books) * 5)) : 0;
  const copies = Math.min(6, Math.max(0, Math.floor((t - m.books) * 2.5)));
  const flash = ramp(t, m.flash, 0.1) * (1 - ramp(t, m.flash + 0.15, 0.5));
  const frozen = ramp(t, m.flash, 0.2);
  const sound = slide < 0.33 ? "հուս" : slide < 0.66 ? "հոուս" : "հաուս";
  const wobble = t > m.press ? 26 * Math.sin((t - m.press) * 2.4) : 0; // the sound keeps moving while the spelling is fixed
  const extra = ramp(t, m.borrow - 0.2, 0.5);
  const rowsOut = ramp(t, m.borrow - 0.4, 0.5);
  return (
    <Backdrop>
      <div style={{ opacity: 1 - rowsOut }}>
        <Tag text="գրություն" x={200} y={430} size={30} color={C.dim} width={260} />
        <Tag text="արտասանություն" x={200} y={700} size={30} color={C.dim} width={300} />
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          {frozen > 0 ? <rect x={360} y={330} width={520} height={200} rx={8} fill="none" stroke={C.ink} strokeWidth={8} opacity={frozen} /> : null}
          <rect x={360} y={600} width={520} height={200} rx={20} fill="rgba(242,168,0,0.08)" />
          {press > 0 ? (
            <g opacity={press} transform={`translate(0 ${lerp(-40, 150, stampY)})`}>
              <rect x={400} y={160} width={440} height={60} rx={8} fill="#5A4A3A" stroke="#2A2018" strokeWidth={4} />
              <rect x={600} y={60} width={40} height={100} fill="#3A3F48" />
            </g>
          ) : null}
          {Array.from({ length: copies }, (_, i) => (
            <g key={i} opacity={press * (1 - frozen * 0.3)}>
              <rect x={60 + (i % 3) * 30} y={860 + i * 26} width={250} height={150} rx={6} fill="#E9E1CC" stroke="#A88C5A" strokeWidth={3} />
              <text x={185 + (i % 3) * 30} y={950 + i * 26} textAnchor="middle" fontFamily={LATIN} fontSize={56} fontWeight={700} fill="#2A2018">house</text>
            </g>
          ))}
        </svg>
        <Word parts={[{ s: "house" }]} x={620} y={430} size={120} />
        <Tag text={sound} x={620 + wobble} y={700} size={92} color={C.orange} width={500} />
        <Tag text="ձայնավորների մեծ տեղաշարժ" x={504} y={1040} size={40} opacity={named} />
        <Tag text="?" x={930} y={700} size={110} weight={900} color={C.orange} opacity={q} width={160} />
        <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: flash * 0.85 }} />
      </div>
      <div style={{ opacity: extra }}>
        <Tag text="փոխառություններ" x={504} y={420} size={44} color={C.orange} />
        <Tag text="«գիտական» ուղղումներ" x={504} y={640} size={44} color={C.orange} opacity={ramp(t, m.scholar, 0.4)} />
        <Word parts={[{ s: "iland → i" }, { s: "s", on: ramp(t, m.scholar + 0.4, 0.4) }, { s: "land" }]} x={504} y={760} size={76} opacity={ramp(t, m.scholar + 0.2, 0.4)} />
        <Tag text="լատիներեն insula-ի կեղծ կապով" x={504} y={860} size={30} color={C.dim} opacity={ramp(t, m.scholar + 0.6, 0.4)} />
      </div>
      <SourceLine text="մոտ 1400-1700" on={ramp(t, 0.3, 0.5) * (1 - press)} />
    </Backdrop>
  );
};

// ---------- armenian: one sound per letter, and the honest exception ----------
const MASHTOTS = ["Մ", "ա", "շ", "տ", "ո", "ց"];
const ArmenianBeat: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const not = ramp(t, m.though, 0.5);
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 380, textAlign: "center", fontFamily: FONT, fontSize: 150, fontWeight: 800 }}>
        {MASHTOTS.map((l, i) => {
          const on = ramp(t, m.letters + i * 0.28, 0.2);
          return <span key={i} style={{ color: on > 0.5 ? C.orange : C.ink, textShadow: on ? `0 0 ${18 * on}px rgba(242,168,0,0.7)` : undefined, margin: "0 4px" }}>{l}</span>;
        })}
      </div>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        {MASHTOTS.map((_, i) => <circle key={i} cx={504 - 250 + i * 100} cy={630} r={12} fill={C.orange} opacity={ramp(t, m.letters + i * 0.28, 0.2)} />)}
      </svg>
      <Tag text="1 տառ = 1 հնչյուն" x={504} y={720} size={40} opacity={ramp(t, m.letters + 1.8, 0.4) * (1 - not)} />
      <div style={{ position: "absolute", left: 0, width: 1080, top: 780, textAlign: "center", fontFamily: FONT, fontSize: 100, fontWeight: 800, color: C.ink, opacity: not }}>
        գ<span style={{ color: C.orange, fontSize: 70 }}>(ը)</span>րիչ
      </div>
      <Tag text="մոտ, ոչ ամբողջությամբ" x={504} y={960} size={36} color={C.dim} opacity={not} />
    </Backdrop>
  );
};

// ---------- reform: Webster's color, and a shelf that blurs ----------
const Reform: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const web = ramp(t, 0.2, 0.5); // the word is up from the beat's first frame
  const name = ramp(t, m.webster, 0.5);
  const drop = ramp(t, m.color, 0.6);
  const shelf = ramp(t, m.full, 0.5);
  const sw = ramp(t, m.against, 0.3);
  const blur = ramp(t, m.hard, 0.8);
  return (
    <Backdrop>
      <div style={{ opacity: 1 - shelf }}>
        <Tag text="Նոյ Վեբստեր, 1806, 1828" x={504} y={330} size={34} color={C.dim} opacity={name} />
        <Word parts={[{ s: "colo" }, { s: "u", grey: drop }, { s: "r" }]} x={504} y={520} size={130} opacity={web} />
        <Word parts={[{ s: "cent" }, { s: drop > 0.5 ? "er" : "re", on: drop }]} x={504} y={720} size={130} opacity={web * ramp(t, m.color + 0.5, 0.4)} />
      </div>
      <div style={{ opacity: shelf }}>
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, filter: `blur(${10 * blur}px)` }}>
          <rect x={120} y={780} width={840} height={24} fill="#5A3E26" />
          {Array.from({ length: 16 }, (_, i) => <rect key={i} x={140 + i * 51} y={500 + ((i * 53) % 60)} width={44} height={280 - ((i * 53) % 60)} rx={4} fill={["#7A2E2A", "#2E4A7A", "#3E6A3A", "#7A6A2E"][i % 4]} />)}
        </svg>
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <rect x={430} y={320} width={160} height={70} rx={35} fill={sw > 0.5 ? C.orange : "#5A606A"} />
          <circle cx={lerp(465, 555, sw)} cy={355} r={28} fill={C.ink} />
        </svg>
        <Tag text="ռեֆորմ" x={504} y={440} size={34} opacity={shelf} />
      </div>
    </Backdrop>
  );
};

// ---------- takeaway: the -ough words return; their gh was once a «խ» ----------
const Takeaway: React.FC = () => {
  const t = useT();
  const glow = 0.5 + 0.5 * Math.sin(t * 3);
  return (
    <Backdrop glow="rgba(242,168,0,0.10)">
      <Title text={<>Ուղղագրությունը սխալ չէ՝ <span style={{ color: C.orange }}>այն հին է</span></>} on={ramp(t, 0.3, 0.6)} y={200} size={52} />
      {OUGH.map((o, i) => (
        <Word key={i} parts={[{ s: `${o.w}ou` }, { s: "gh", on: 0.5 + 0.5 * glow }]} x={420} y={460 + i * 120} size={80} opacity={ramp(t, 0.6 + i * 0.15, 0.4)} />
      ))}
      <Tag text="gh = «խ»" x={800} y={700} size={48} color={C.orange} opacity={ramp(t, 1.8, 0.5)} width={300} />
      <Tag text="1400-ականներ" x={800} y={770} size={28} color={C.dim} opacity={ramp(t, 1.8, 0.5)} width={300} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const at = (k: string, w: string, nth?: number) => rel(S.beat(k).start, S.at(k, w, nth));
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ w0: at("hook", "Դոու"), w1: at("hook", "թրու"), w2: at("hook", "թաֆ"), w3: at("hook", "քոֆ"), w4: at("hook", "բաու"), same: at("hook", "Նույն"), five: at("hook", "հինգ") }} /> },
  { keys: ["cost"], render: () => <Cost m={{ learn: at("cost", "սովորում"), but: at("cost", "Բայց") }} /> },
  { keys: ["knight"], render: () => <Knight m={{ read: at("knight", "քնիխտ"), changed: at("knight", "Հետո"), now: at("knight", "նայթ") }} /> },
  { keys: ["shift", "print"], render: () => {
    const g0 = S.beat("shift").start;
    const r = (k: string, w: string, nth?: number) => rel(g0, S.at(k, w, nth));
    return <ShiftPrint m={{
      became: r("shift", "դարձավ"), named: r("shift", "ձայնավորների"), unknown: r("shift", "չգիտենք"),
      press: r("print", "տպագրությունը"), books: r("print", "Գրքերը"), flash: r("print", "լուսանկար"),
      borrow: r("print", "Որոշ"), scholar: r("print", "որոշները"),
    }} />;
  } },
  { keys: ["armenian"], render: () => <ArmenianBeat m={{ letters: at("armenian", "տառերը"), though: at("armenian", "թեև") }} /> },
  { keys: ["reform"], render: () => <Reform m={{ webster: at("reform", "Նոյ"), color: at("reform", "գույն"), full: at("reform", "Ամբողջական"), against: at("reform", "դեմ"), hard: at("reform", "դժվար") }} /> },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const EnglishSpelling: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * ES_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * ES_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`english_spelling/${S.audio}`)} />
  </AbsoluteFill>
);
