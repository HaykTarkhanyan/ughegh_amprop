// The connecting scenes of the long zero-knowledge video (16:9): the gossip chat (beats 1 and 12), the three everyday
// cases (beat 2) and the real systems (beat 11), the title (beat 3), the faked video (beat 10), the takeaway (beat 13).
// Every scene takes `dur` (its slot in seconds) and `m` (moments in seconds from the scene start, from the narration's
// word times); defaults keep each scene playable on its own.
import React from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop, CheckMark, CrossMark } from "./common";

export type Marks = Record<string, number>;
type SceneProps = { dur?: number; m?: Marks };
const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};
const mk = (m: Marks | undefined, key: string, fallback: number) => (m && m[key] !== undefined ? m[key] : fallback);

// ---------- small drawings ----------
const Head: React.FC<{ x: number; y: number; color: string; size?: number; label?: string }> = ({ x, y, color, size = 120, label }) => (
  <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, textAlign: "center" }}>
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="47" fill="rgba(255,255,255,0.04)" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="38" r="15" fill={color} />
      <path d="M22 80 Q50 50 78 80 Z" fill={color} />
    </svg>
    {label ? <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: C.dim, marginTop: 4 }}>{label}</div> : null}
  </div>
);

const Envelope: React.FC<{ size: number; open?: number; color?: string }> = ({ size, open = 0, color = C.orange }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 100 75" style={{ overflow: "visible" }}>
    <rect x="4" y="12" width="92" height="60" rx="8" fill="#2A2117" stroke={color} strokeWidth="4" />
    <path d={`M 6 16 L 50 ${lerp(48, -10, open)} L 94 16`} fill="#2A2117" stroke={color} strokeWidth="4" strokeLinejoin="round" />
    {open < 0.3 ? (
      <g>
        <rect x="40" y="38" width="20" height="16" rx="3" fill={color} />
        <path d="M 44 38 V 33 A 6 6 0 0 1 56 33 V 38" fill="none" stroke={color} strokeWidth="3.5" />
      </g>
    ) : null}
  </svg>
);

const Thought: React.FC<{ x: number; y: number; w: number; h: number; opacity: number; children: React.ReactNode; tail: "left" | "right" }> = ({ x, y, w, h, opacity, children, tail }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, opacity }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: h / 2, background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
      {children}
    </div>
    {[0, 1].map((i) => (
      <div key={i} style={{ position: "absolute", top: h + 10 + i * 26, left: tail === "left" ? 40 - i * 18 : w - 60 + i * 18, width: 22 - i * 8, height: 22 - i * 8, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
    ))}
  </div>
);

// a phone with a chat; `messages` appear at their times
const Phone: React.FC<{ x: number; y: number; t: number; title: string; messages: { at: number; text: string; mine?: boolean; locked?: boolean }[]; typingAt?: number }> = ({ x, y, t, title, messages, typingAt }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 430, height: 800, borderRadius: 56, background: "#0A0B0E", border: "10px solid #2B2F38", boxShadow: "0 40px 90px rgba(0,0,0,0.6)", overflow: "hidden" }}>
    <div style={{ height: 110, background: "#171A20", display: "flex", alignItems: "center", gap: 18, padding: "34px 28px 0" }}>
      <div style={{ width: 54, height: 54, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontWeight: 800, fontSize: 26, color: C.bg }}>Ը</div>
      <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.ink }}>{title}</div>
    </div>
    <div style={{ padding: "28px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
      {messages.map((msg, i) => {
        const s = Math.min(1, pop(t, msg.at, 12, 0.55));
        if (t < msg.at) return null;
        return (
          <div key={i} style={{ alignSelf: msg.mine ? "flex-end" : "flex-start", maxWidth: 330, transform: `scale(${s})`, transformOrigin: msg.mine ? "right bottom" : "left bottom",
            background: msg.mine ? C.orange : "#262A33", color: msg.mine ? C.bg : C.ink, fontFamily: FONT, fontSize: 30, fontWeight: 600, lineHeight: 1.3,
            padding: "16px 22px", borderRadius: 26, borderBottomLeftRadius: msg.mine ? 26 : 8, borderBottomRightRadius: msg.mine ? 8 : 26 }}>
            {msg.locked ? <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}><Envelope size={40} color={msg.mine ? C.bg : C.orange} />••••••</span> : msg.text}
          </div>
        );
      })}
      {typingAt !== undefined && t > typingAt && t < (messages[0]?.at ?? 0) ? (
        <div style={{ alignSelf: "flex-start", background: "#262A33", borderRadius: 26, padding: "18px 24px", display: "flex", gap: 10 }}>
          {[0, 1, 2].map((k) => (
            <div key={k} style={{ width: 14, height: 14, borderRadius: "50%", background: C.dim, opacity: 0.4 + 0.6 * Math.abs(Math.sin((t * 5 - k) * 1.2)) }} />
          ))}
        </div>
      ) : null}
    </div>
  </div>
);

// ---------- beat 1: the gossip ----------
export const GossipScene: React.FC<SceneProps> = ({ dur = 22, m }) => {
  const t = useT();
  const secret = mk(m, "secret", 3.2);
  const doubt = mk(m, "doubt", 6.4);
  const spill = mk(m, "spill", 11.5);
  const mirror = mk(m, "mirror", 15.5);
  const ask = mk(m, "ask", 17.2);
  const fly = ramp(t, spill + 0.4, 1.2, easeInOut);
  const youX = 990, herX = 1590, headsY = 650;
  const back = ramp(t, spill + 2.6, 0.5);
  const herFly = ramp(t, mirror + 0.2, 1.2, easeInOut) * (1 - ramp(t, ask - 0.2, 0.4));
  return (
    <Backdrop>
      <Phone x={170} y={110} t={t} title="Ընկերուհիդ" typingAt={0.1} messages={[{ at: 0.9, text: "Լսե՞լ ես Անիի մասին" }]} />
      <Head x={youX} y={headsY} color={C.ink} label="Դու" size={170} />
      <Head x={herX} y={headsY} color={C.blue} label="Ընկերուհիդ" size={170} />
      <Thought x={youX - 250} y={250} w={400} h={210} tail="right" opacity={ramp(t, secret, 0.5)}>
        <Envelope size={140} open={fly > 0 && back < 1 ? 1 : 0} />
        <div style={{ fontFamily: FONT, fontSize: 38, fontWeight: 700, color: C.orange }}>Անիի<br />գաղտնիքը</div>
      </Thought>
      <Thought x={herX - 160} y={250} w={340} h={210} tail="left" opacity={ramp(t, doubt, 0.5)}>
        <div style={{ fontFamily: FONT, fontSize: 120, fontWeight: 800, color: C.blue }}>?</div>
        <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 600, color: C.dim, lineHeight: 1.2 }}>գիտի՞,<br />թե ոչ</div>
      </Thought>
      {/* "if you tell first and she did not know": the secret flies out and is spilled */}
      {fly > 0 && back < 1 ? (
        <div style={{ position: "absolute", left: lerp(youX - 60, herX - 60, fly), top: 380 - Math.sin(fly * Math.PI) * 120, opacity: 1 - back }}>
          <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.bg, background: C.orange, borderRadius: 18, padding: "10px 18px" }}>գաղտնիքը</div>
        </div>
      ) : null}
      <div style={{ position: "absolute", left: (youX + herX) / 2 - 220, top: 780, width: 440, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: ramp(t, spill + 1.6, 0.4) * (1 - ramp(t, mirror, 0.4)), fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.red }}>
        <CrossMark size={64} progress={ramp(t, spill + 1.6, 0.5)} /> դու ես տարածել
      </div>
      {/* "she has the same fear": the same arrow the other way, dashed */}
      {herFly > 0 ? (
        <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
          <path d={`M ${herX - 70} 560 Q ${(youX + herX) / 2} ${430} ${youX + 70} 560`} fill="none" stroke={C.blue} strokeWidth="5" strokeDasharray="14 12" opacity={herFly} />
        </svg>
      ) : null}
      <div style={{ position: "absolute", left: (youX + herX) / 2 - 300, top: 790, width: 600, textAlign: "center", fontFamily: FONT, fontSize: 32, fontWeight: 600, color: C.dim, opacity: herFly }}>
        նա էլ նույն վախն ունի
      </div>
      <div style={{ position: "absolute", left: 700, top: 820, width: 1140, textAlign: "center", fontFamily: FONT, fontSize: 46, fontWeight: 800, color: C.ink, opacity: ramp(t, ask, 0.5), transform: `translateY(${(1 - ramp(t, ask, 0.5)) * 14}px)` }}>
        Ինչպե՞ս պարզել՝ <span style={{ color: C.orange }}>առանց բարձրաձայնելու</span>
      </div>
    </Backdrop>
  );
};

// ---------- the three everyday cases (beat 2) and the real systems (beat 11) ----------
const CaseCard: React.FC<{ x: number; y: number; t: number; t0: number; title: string; children: React.ReactNode; checked?: number; locked?: boolean }> = ({ x, y, t, t0, title, children, checked = 0, locked }) => {
  const s = Math.min(1, pop(t, t0, 9, 0.6));
  if (t < t0) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 500, height: 560, borderRadius: 34, background: "linear-gradient(180deg, #1F232C, #15181E)", border: "2px solid rgba(255,255,255,0.09)", boxShadow: "0 30px 80px rgba(0,0,0,0.5)", transform: `translateY(${(1 - s) * 60}px) scale(${0.9 + 0.1 * s})`, opacity: s, padding: 36, boxSizing: "border-box" }}>
      <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, color: C.ink, marginBottom: 26 }}>{title}</div>
      {children}
      <div style={{ position: "absolute", right: 30, bottom: 30, display: "flex", alignItems: "center", gap: 12, opacity: checked }}>
        {locked ? <Envelope size={70} /> : null}
        <CheckMark size={76} progress={checked} />
      </div>
    </div>
  );
};

const Blur: React.FC<{ text: string; size?: number }> = ({ text, size = 40 }) => (
  <span style={{ fontFamily: FONT, fontSize: size, fontWeight: 700, color: C.ink, filter: "blur(9px)", opacity: 0.8 }}>{text}</span>
);

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.dim, marginBottom: 8 }}>{label}</div>
    <div style={{ height: 70, borderRadius: 16, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 22px", gap: 14 }}>{children}</div>
  </div>
);

export const ProblemsScene: React.FC<SceneProps> = ({ dur = 30, m }) => {
  const t = useT();
  const c1 = mk(m, "site", dur * 0.18), c2 = mk(m, "bank", dur * 0.5), c3 = mk(m, "age", dur * 0.78);
  const dotsIn = ramp(t, c1 + 0.8, 1.0);
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", fontFamily: FONT, fontSize: 44, fontWeight: 800, color: C.ink, opacity: ramp(t, 0.2, 0.5) }}>
        Նույն խնդիրը՝ <span style={{ color: C.orange }}>ամեն օր</span>
      </div>
      <CaseCard x={150} y={210} t={t} t0={c1} title="Կայք" checked={ramp(t, c1 + 2.4, 0.5)}>
        <Row label="գաղտնաբառ">
          <span style={{ fontFamily: FONT, fontSize: 44, color: C.ink, letterSpacing: 6 }}>{"••••••••".slice(0, Math.round(8 * dotsIn))}</span>
        </Row>
        <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: C.dim, lineHeight: 1.35 }}>Գաղտնաբառը չի լքում<br />քո հեռախոսը</div>
      </CaseCard>
      <CaseCard x={710} y={210} t={t} t0={c2} title="Բանկ" checked={ramp(t, c2 + 2.2, 0.5)}>
        <Row label="եկամուտ"><Blur text="480 000 ֏" /></Row>
        <Row label="վարկի համար"><span style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, color: C.orange }}>բավական է</span></Row>
      </CaseCard>
      <CaseCard x={1270} y={210} t={t} t0={c3} title="Կայք 18+" checked={ramp(t, c3 + 1.8, 0.5)}>
        <Row label="ծննդյան ամսաթիվ"><Blur text="14.03.2001" /></Row>
        <Row label="տարիք"><span style={{ fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.orange }}>18+</span></Row>
      </CaseCard>
    </Backdrop>
  );
};

// ---------- beat 3: the title ----------
export const TitleScene: React.FC<SceneProps> = ({ dur = 10, m }) => {
  const t = useT();
  const name = mk(m, "name", dur * 0.55);
  const a = ramp(t, 0.2, 0.5), b = ramp(t, 0.9, 0.5);
  const big = Math.min(1, pop(t, name, 8, 0.6));
  return (
    <Backdrop glow="rgba(242,168,0,0.12)">
      <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center", gap: 120, fontFamily: FONT, fontSize: 56, fontWeight: 800, opacity: 1 - ramp(t, name - 0.3, 0.4) * 0.6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: C.ink, opacity: a }}>ապացուցել <CheckMark size={70} progress={a} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: C.dim, opacity: b }}>բացահայտել <CrossMark size={70} progress={b} /></div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 440, textAlign: "center", opacity: big, transform: `scale(${0.85 + 0.15 * big})` }}>
        <div style={{ fontFamily: FONT, fontSize: 104, fontWeight: 900, color: C.ink }}>Զրոյական գիտելիքով ապացույց</div>
        <div style={{ height: 10, width: 900 * ramp(t, name + 0.3, 0.7), background: C.orange, borderRadius: 5, margin: "22px auto 0" }} />
        <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 500, color: C.dim, marginTop: 20, opacity: ramp(t, name + 0.6, 0.5) }}>zero-knowledge proof</div>
      </div>
    </Backdrop>
  );
};

// ---------- beat 10: a video of it convinces nobody ----------
const Frame: React.FC<{ x: number; y: number; ok: boolean; cut?: number }> = ({ x, y, ok, cut = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 150, height: 100, borderRadius: 10, background: "#1B1E25", border: "3px solid #3A3F4B", opacity: 1 - cut, transform: `translateY(${cut * 80}px) rotate(${cut * 18}deg)` }}>
    <svg width="150" height="100" viewBox="0 0 150 100">
      <circle cx="55" cy="52" r="18" fill={C.khaki} />
      <circle cx="98" cy="52" r="18" fill={C.khaki} />
    </svg>
    <div style={{ position: "absolute", right: -16, top: -16 }}>{ok ? <CheckMark size={40} /> : <CrossMark size={40} />}</div>
  </div>
);

export const FakeVideoScene: React.FC<SceneProps> = ({ dur = 22, m }) => {
  const t = useT();
  const film = mk(m, "film", dur * 0.15);
  const fake = mk(m, "fake", dur * 0.4);
  const same = mk(m, "same", dur * 0.62);
  const leave = mk(m, "leave", dur * 0.75);
  const realOK = [true, true, true, true, true, true];
  const staged = [true, false, true, true, false, true, true, false];
  const stripIn = ramp(t, film, 0.6);
  const fakeIn = ramp(t, fake, 0.6);
  let kept = 0;
  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", fontFamily: FONT, fontSize: 46, fontWeight: 800, color: C.ink, opacity: ramp(t, 0.2, 0.5) }}>
        Ինչո՞ւ <span style={{ color: C.orange }}>«զրոյական գիտելիք»</span>
      </div>
      <div style={{ position: "absolute", left: 140, top: 200, fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.ink, opacity: stripIn }}>Իսկական տեսանյութ</div>
      <div style={{ position: "absolute", left: 140, top: 250, width: 1640, height: 150, borderRadius: 16, background: "#101216", border: "2px solid #2B2F38", opacity: stripIn }}>
        {realOK.map((ok, i) => <Frame key={i} x={30 + i * 200} y={22} ok={ok} />)}
      </div>
      <div style={{ position: "absolute", left: 140, top: 470, fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.ink, opacity: fakeIn }}>
        Սարքված՝ <span style={{ color: C.dim, fontWeight: 600 }}>նախապես պայմանավորված, անհաջողները կտրված</span>
      </div>
      <div style={{ position: "absolute", left: 140, top: 520, width: 1640, height: 150, borderRadius: 16, background: "#101216", border: "2px solid #2B2F38", opacity: fakeIn }}>
        {staged.map((ok, i) => {
          const cut = ok ? 0 : ramp(t, fake + 1.2 + i * 0.25, 0.6);
          const slot = ok ? kept++ : -1;
          const xFinal = 30 + Math.max(0, slot) * 200;
          const xStart = 30 + i * 200;
          const close = ramp(t, fake + 3.6, 0.8, easeInOut);
          return <Frame key={i} x={ok ? lerp(xStart, xFinal, close) : xStart} y={22} ok={ok} cut={cut} />;
        })}
        {t > fake + 1.0 && t < fake + 3.2 ? (
          <div style={{ position: "absolute", left: 30 + (Math.floor((t - fake - 1.0) / 0.55) % staged.length) * 200 + 60, top: -46, }}><svg width="56" height="56" viewBox="0 0 56 56"><circle cx="14" cy="44" r="8" fill="none" stroke="#E8383D" strokeWidth="4" /><circle cx="42" cy="44" r="8" fill="none" stroke="#E8383D" strokeWidth="4" /><path d="M 19 38 L 40 6 M 37 38 L 16 6" stroke="#F4F1EA" strokeWidth="5" strokeLinecap="round" /></svg></div>
        ) : null}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 712, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, opacity: ramp(t, same, 0.5), fontFamily: FONT, fontSize: 44, fontWeight: 800, color: C.orange }}>
        <span style={{ fontSize: 60 }}>=</span> նույնն են. ոչ ոք չի համոզվի
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 800, display: "flex", justifyContent: "center", gap: 90, opacity: ramp(t, leave, 0.5), fontFamily: FONT, fontSize: 34, fontWeight: 700 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: C.ink }}><CheckMark size={58} progress={ramp(t, leave, 0.5)} /> համոզմունք</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: C.dim }}>փոխանցվող տեղեկություն՝ <span style={{ color: C.red, fontSize: 48 }}>0</span></div>
      </div>
    </Backdrop>
  );
};

// ---------- beat 11: real systems ----------
export const RealScene: React.FC<SceneProps> = ({ dur = 30, m }) => {
  const t = useT();
  const fast = mk(m, "fast", dur * 0.2);
  const bank = mk(m, "bank", dur * 0.35), eu = mk(m, "eu", dur * 0.62), crypto = mk(m, "crypto", dur * 0.78);
  const gridIn = ramp(t, 0.2, 0.6) * (1 - ramp(t, bank - 0.4, 0.5));
  const digits = Array.from({ length: 60 }, (_, i) => i);
  return (
    <Backdrop>
      {/* puzzles instead of cardboard and balls, solved in a blur */}
      <div style={{ position: "absolute", left: 460, top: 160, width: 1000, opacity: gridIn, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 12 }}>
        {digits.map((i) => {
          const v = Math.floor(random(`d${i}-${Math.floor(t * (t > fast ? 14 : 3))}`) * 10);
          const ok = t > fast + 0.8 && random(`ok${i}`) < Math.min(1, (t - fast - 0.8) / 1.6);
          return <div key={i} style={{ height: 70, borderRadius: 12, background: ok ? "rgba(242,168,0,0.16)" : "rgba(255,255,255,0.05)", border: `2px solid ${ok ? C.orange : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontSize: 34, fontWeight: 700, color: ok ? C.orange : C.dim }}>{v}</div>;
        })}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 690, textAlign: "center", fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.ink, opacity: ramp(t, fast, 0.5) * gridIn }}>
        հազարավոր ռաունդ՝ <span style={{ color: C.orange }}>վայրկյանի մի մասում</span>
      </div>
      <CaseCard x={150} y={210} t={t} t0={bank} title="Բանկ" checked={ramp(t, bank + 2.5, 0.5)} locked>
        <Row label="աշխատավարձ"><Blur text="612 000 ֏" /></Row>
        <div style={{ position: "relative", height: 40, marginTop: 10, borderRadius: 20, background: "rgba(255,255,255,0.06)" }}>
          <div style={{ position: "absolute", left: "35%", width: "40%", top: 0, bottom: 0, borderRadius: 20, background: "rgba(242,168,0,0.35)", border: `2px solid ${C.orange}` }} />
        </div>
        <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.dim, marginTop: 14 }}>միջակայքում է</div>
      </CaseCard>
      <CaseCard x={710} y={210} t={t} t0={eu} title="ԵՄ՝ տարիքի ստուգում" checked={ramp(t, eu + 2.0, 0.5)} locked>
        <svg width="160" height="160" viewBox="0 0 100 100" style={{ display: "block", margin: "0 auto" }}>
          <circle cx="50" cy="50" r="46" fill="#1A3A8A" />
          {Array.from({ length: 12 }, (_, k) => {
            const a = (k / 12) * Math.PI * 2;
            return <circle key={k} cx={50 + 30 * Math.cos(a)} cy={50 + 30 * Math.sin(a)} r="4" fill="#FFD25A" />;
          })}
        </svg>
        <div style={{ textAlign: "center", fontFamily: FONT, fontSize: 52, fontWeight: 900, color: C.orange, marginTop: 14 }}>18+</div>
      </CaseCard>
      <CaseCard x={1270} y={210} t={t} t0={crypto} title="Կրիպտոարժույթ" checked={ramp(t, crypto + 2.0, 0.5)} locked>
        <Row label="ով"><Blur text="Արամ → Անի" size={34} /></Row>
        <Row label="որքան"><Blur text="0,42 ZEC" size={34} /></Row>
      </CaseCard>
    </Backdrop>
  );
};

// ---------- beat 12: back to the gossip ----------
export const GossipCloseScene: React.FC<SceneProps> = ({ dur = 16, m }) => {
  const t = useT();
  const type = mk(m, "type", dur * 0.35);
  const match = mk(m, "match", dur * 0.62);
  const merge = ramp(t, match - 0.4, 0.9, easeInOut);
  return (
    <Backdrop>
      <Phone x={200} y={110} t={t} title="Ընկերուհիդ" messages={[{ at: 0.3, text: "Լսե՞լ ես Անիի մասին" }, { at: type, text: "", mine: true, locked: true }, { at: type + 0.8, text: "", locked: true }]} />
      <div style={{ position: "absolute", left: 820, top: 300, width: 900, height: 300 }}>
        {[0, 1].map((k) => (
          <div key={k} style={{ position: "absolute", left: lerp(k === 0 ? 0 : 520, 260, merge), top: 40, width: 380, height: 120, borderRadius: 24, background: k === 0 ? "rgba(242,168,0,0.14)" : "rgba(111,168,255,0.14)", border: `3px solid ${k === 0 ? C.orange : C.blue}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: FONT, fontSize: 40, color: C.ink, opacity: ramp(t, type + k * 0.8, 0.4) * (1 - ramp(t, match + 0.6, 0.4)) }}>
            <Envelope size={70} color={k === 0 ? C.orange : C.blue} /> ••••••
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 30, display: "flex", justifyContent: "center", alignItems: "center", gap: 20, opacity: ramp(t, match + 0.6, 0.4), fontFamily: FONT, fontSize: 52, fontWeight: 800, color: C.orange }}>
          <CheckMark size={90} progress={ramp(t, match + 0.6, 0.5)} /> համընկնում է
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 200, textAlign: "center", fontFamily: FONT, fontSize: 34, fontWeight: 600, color: C.dim, opacity: ramp(t, match + 1.4, 0.5) }}>
          պատասխանն ինքը ոչ ոք չի տեսնում
        </div>
      </div>
    </Backdrop>
  );
};

// ---------- beat 13: the takeaway ----------
export const TakeawayScene: React.FC<SceneProps> = ({ dur = 7 }) => {
  const t = useT();
  const line = ramp(t, 1.0, Math.max(1, dur * 0.4), easeInOut);
  return (
    <Backdrop glow="rgba(242,168,0,0.12)">
      <div style={{ position: "absolute", left: 640, top: 230 }}><Envelope size={180} /></div>
      <div style={{ position: "absolute", left: 1120, top: 220 }}><CheckMark size={170} progress={ramp(t, 0.6, 0.6)} /></div>
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d="M 830 300 Q 980 220 1120 300" fill="none" stroke={C.ink} strokeWidth="5" strokeDasharray="12 12" strokeDashoffset={0} opacity={line} />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 520, textAlign: "center", fontFamily: FONT, fontSize: 110, fontWeight: 900, color: C.ink, opacity: ramp(t, 0.3, 0.6) }}>
        Ապացուցել <span style={{ color: C.orange }}>≠</span> բացահայտել
      </div>
    </Backdrop>
  );
};
