// The zero-knowledge Short (9:16, 1080 x 1920; Codex review X59). Its five beats laid out for a phone screen: key
// content inside the TikTok-safe area (x 120-888, y 288-1030; captions below, up to y 1245), the chat and the cards
// re-arranged vertically, and the Waldo scene shown at 0.7 around the page with its people and bubbles moved inward.
// Timing comes from the narration (render/sync_short.py zero_knowledge_short); now the temporary guide voice, later
// Hayk's recording (tools/import_recording.py).
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import TL from "../data/zero_knowledge_short.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop, CheckMark } from "./common";
import { Blur, CaseCard, Envelope, Phone, Row } from "./Story";
import { PortraitCaptions } from "../series/captions";
import { loadTimeline } from "./timeline";
import { WALDO_T, WaldoScene, WaldoTimes } from "./Waldo";

const S = loadTimeline(TL, "zero_knowledge_short", "portrait");
export const SHORT_FPS = 30;
const TAIL_S = 1.2;
export const SHORT_FRAMES = Math.ceil((S.duration + TAIL_S) * SHORT_FPS);
const rel = (g0: number, x: number) => Math.max(0, x - g0);
const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

// a rounded box with a label, for the two thoughts in the hook
const Bubble9: React.FC<{ y: number; label: string; color: string; t: number; t0: number; children: React.ReactNode }> = ({ y, label, color, t, t0, children }) => (
  <div style={{ position: "absolute", left: 470, top: y, width: 418, opacity: ramp(t, t0, 0.4), transform: `scale(${Math.min(1, pop(t, t0, 10, 0.55))})`, transformOrigin: "left center" }}>
    <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color, marginBottom: 10 }}>{label}</div>
    <div style={{ height: 150, borderRadius: 75, background: "rgba(255,255,255,0.06)", border: `3px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>{children}</div>
  </div>
);

const Gossip9: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 120, top: 300, transform: "scale(0.72)", transformOrigin: "0 0" }}>
        <Phone x={0} y={0} t={t} title="Ընկերուհիդ" typingAt={0.1} messages={[{ at: 0.9, text: "Լսե՞լ ես Անիի մասին" }]} />
      </div>
      <Bubble9 y={340} label="Դու" color={C.orange} t={t} t0={m.secret}>
        <Envelope size={110} />
        <span style={{ fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.ink }}>գաղտնիք</span>
      </Bubble9>
      <Bubble9 y={600} label="Ընկերուհիդ" color={C.blue} t={t} t0={m.doubt}>
        <span style={{ fontFamily: FONT, fontSize: 96, fontWeight: 800, color: C.blue }}>?</span>
      </Bubble9>
      <div style={{ position: "absolute", left: 120, width: 768, top: 900, textAlign: "center", fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.ink, opacity: ramp(t, m.ask, 0.5) }}>
        Ինչպե՞ս ստուգել՝ <span style={{ color: C.orange }}>առանց ասելու</span>
      </div>
    </Backdrop>
  );
};

const Problems9: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const title = Math.min(1, pop(t, m.title, 8, 0.6));
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 150, top: 330, transform: "scale(0.75)", transformOrigin: "0 0", width: 1040, height: 560 }}>
        <CaseCard x={0} y={0} t={t} t0={m.site} title="Կայք" checked={ramp(t, m.site + 1.6, 0.5)}>
          <Row label="գաղտնաբառ"><span style={{ fontFamily: FONT, fontSize: 44, color: C.ink, letterSpacing: 6 }}>••••••••</span></Row>
          <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: C.dim, lineHeight: 1.35 }}>Գաղտնաբառը չի լքում<br />քո հեռախոսը</div>
        </CaseCard>
        <CaseCard x={540} y={0} t={t} t0={m.age} title="Կայք 18+" checked={ramp(t, m.age + 1.4, 0.5)}>
          <Row label="ծննդյան ամսաթիվ"><Blur text="14.03.2001" /></Row>
          <Row label="տարիք"><span style={{ fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.orange }}>18+</span></Row>
        </CaseCard>
      </div>
      <div style={{ position: "absolute", left: 120, width: 768, top: 800, textAlign: "center", opacity: title, transform: `scale(${0.85 + 0.15 * title})` }}>
        <div style={{ fontFamily: FONT, fontSize: 62, fontWeight: 900, color: C.ink, lineHeight: 1.15 }}>Զրոյական գիտելիքով ապացույց</div>
        <div style={{ height: 8, width: 520 * ramp(t, m.title + 0.3, 0.7), background: C.orange, borderRadius: 4, margin: "16px auto 0" }} />
      </div>
    </Backdrop>
  );
};

// Waldo at 0.7 around the page: the page spans x 43-1037, y 380-975 of the portrait frame
const WALDO_SCALE = 0.7, WALDO_X = 540 - 960 * WALDO_SCALE, WALDO_Y = 380 - 96 * WALDO_SCALE;
const Waldo9: React.FC<{ T: WaldoTimes }> = ({ T }) => (
  <Backdrop>
    <div style={{ position: "absolute", left: WALDO_X, top: WALDO_Y, width: 1920, height: 1080, transform: `scale(${WALDO_SCALE})`, transformOrigin: "0 0" }}>
      <WaldoScene T={T} portrait />
    </div>
  </Backdrop>
);

const Tease9: React.FC<{ m: Record<string, number>; dur: number }> = ({ m, dur }) => {
  const t = useT();
  const merge = ramp(t, m.match - 0.5, 0.8, easeInOut);
  const teaseIn = ramp(t, m.long, 0.5);
  return (
    <Backdrop>
      <div style={{ opacity: 1 - teaseIn * 0.85 }}>
        {[0, 1].map((k) => (
          <div key={k} style={{ position: "absolute", left: lerp(k === 0 ? 130 : 520, 325, merge), top: 380, width: 360, height: 130, borderRadius: 26, background: k === 0 ? "rgba(242,168,0,0.14)" : "rgba(111,168,255,0.14)", border: `3px solid ${k === 0 ? C.orange : C.blue}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: FONT, fontSize: 40, color: C.ink, opacity: ramp(t, m.app + k * 0.6, 0.4) * (1 - ramp(t, m.match + 0.4, 0.4)) }}>
            <Envelope size={72} color={k === 0 ? C.orange : C.blue} /> ••••••
          </div>
        ))}
        <div style={{ position: "absolute", left: 120, width: 768, top: 390, display: "flex", justifyContent: "center", alignItems: "center", gap: 20, opacity: ramp(t, m.match + 0.4, 0.4), fontFamily: FONT, fontSize: 56, fontWeight: 800, color: C.orange }}>
          <CheckMark size={92} progress={ramp(t, m.match + 0.4, 0.5)} /> համընկնում է
        </div>
        <div style={{ position: "absolute", left: 120, width: 768, top: 560, textAlign: "center", fontFamily: FONT, fontSize: 34, fontWeight: 600, color: C.dim, opacity: ramp(t, m.match + 1.0, 0.5) }}>
          պատասխանն ինքը ոչ ոք չի տեսնում
        </div>
      </div>
      {/* the teaser: the face-down red card, the two khaki balls, and the pointer to the long video */}
      <div style={{ position: "absolute", left: 120, width: 768, top: 640, display: "flex", justifyContent: "center", alignItems: "center", gap: 60, opacity: teaseIn }}>
        <div style={{ width: 120, height: 180, borderRadius: 12, background: "linear-gradient(135deg, #2A2117, #15110D)", border: `4px solid ${C.orange}`, boxShadow: `0 0 ${30 + 10 * Math.sin(t * 4)}px rgba(232,56,61,0.8)`, transform: `rotate(${-6 + 3 * Math.sin(t * 2)}deg)` }} />
        <svg width="260" height="130" viewBox="0 0 260 130">
          <circle cx="65" cy="65" r="55" fill={C.khaki} />
          <circle cx="195" cy="65" r="55" fill={C.khaki} />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 120, width: 768, top: 880, display: "flex", justifyContent: "center", opacity: ramp(t, Math.min(dur - 1.2, m.long + 0.8), 0.4) }}>
        <div style={{ padding: "16px 34px", borderRadius: 40, background: C.orange, fontFamily: FONT, fontSize: 38, fontWeight: 800, color: C.bg }}>▶ երկար տեսանյութ</div>
      </div>
    </Backdrop>
  );
};

const Takeaway9: React.FC<{ dur: number }> = ({ dur }) => {
  const t = useT();
  const line = ramp(t, 0.8, Math.max(1, dur * 0.4), easeInOut);
  return (
    <Backdrop glow="rgba(242,168,0,0.12)">
      <div style={{ position: "absolute", left: 170, top: 380 }}><Envelope size={190} /></div>
      <div style={{ position: "absolute", left: 690, top: 372 }}><CheckMark size={170} progress={ramp(t, 0.5, 0.6)} /></div>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d="M 370 450 Q 530 360 690 450" fill="none" stroke={C.ink} strokeWidth="5" strokeDasharray="12 12" opacity={line} />
      </svg>
      <div style={{ position: "absolute", left: 120, width: 768, top: 640, textAlign: "center", fontFamily: FONT, fontSize: 88, fontWeight: 900, color: C.ink, lineHeight: 1.15, opacity: ramp(t, 0.2, 0.6) }}>
        Ապացուցել<br /><span style={{ color: C.orange }}>≠</span><br />բացահայտել
      </div>
    </Backdrop>
  );
};

type G = { key: string; render: (dur: number) => React.ReactNode };
const GROUPS: G[] = [
  { key: "gossip", render: () => {
    const g0 = S.beat("gossip").start;
    return <Gossip9 m={{ secret: rel(g0, S.at("gossip", "Դու")), doubt: rel(g0, S.at("gossip", "բայց")), ask: rel(g0, S.at("gossip", "Ինչպե")) }} />;
  } },
  { key: "same_problem", render: () => {
    const g0 = S.beat("same_problem").start;
    return <Problems9 m={{ site: rel(g0, S.at("same_problem", "կայքերն")), age: rel(g0, S.at("same_problem", "18")), title: rel(g0, S.at("same_problem", "Լուծումը")) }} />;
  } },
  { key: "waldo", render: (dur) => {
    const g0 = S.beat("waldo").start;
    const T: WaldoTimes = {
      ...WALDO_T, page: 0.1, ref: 0.3, search: 0.9, found: rel(g0, S.at("waldo", "գտել", 0)),
      sheet: rel(g0, S.at("waldo", "Ընկերդ", 0)) + 0.3, sheetDur: Math.max(1.2, S.at("waldo", "ծածկում") - S.at("waldo", "Ընկերդ", 0)),
      opaque: rel(g0, S.at("waldo", "երևում")) - 0.3, look: rel(g0, S.at("waldo", "երևում")) + 0.4,
      zoom: rel(g0, S.at("waldo", "Ընկերդ", 1)), leak: 0, anywhere: rel(g0, S.at("waldo", "բայց", 1)),
      verdict: rel(g0, S.at("waldo", "էջի")) + 0.6, end: dur,
    };
    return <Waldo9 T={T} />;
  } },
  { key: "tease", render: (dur) => {
    const g0 = S.beat("tease").start;
    return <Tease9 dur={dur} m={{ app: rel(g0, S.at("tease", "երկուսդ")), match: rel(g0, S.at("tease", "համընկնում")), long: rel(g0, S.at("tease", "Ինչպե")) }} />;
  } },
  { key: "takeaway", render: (dur) => <Takeaway9 dur={dur} /> },
];

export const ZkShort: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.key).start * SHORT_FPS);
      const len = Math.round(S.slotEnd(g.key, TAIL_S) * SHORT_FPS) - from;
      return (
        <Sequence key={g.key} name={g.key} from={from} durationInFrames={len}>
          {g.render(len / SHORT_FPS)}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`zero_knowledge_short/${S.audio}`)} />
  </AbsoluteFill>
);
