// The red-card proof: draw a card from a complete deck, say "red", then take every black card out of the rest and
// show it, while the red ones go face down onto a pile that is never turned over. Showing all 51 would reveal the
// missing card by elimination (Codex review X20, 2026-11-26); showing only the 26 blacks proves "not black" and
// nothing about which red card it is.
// Cards: Dmitry Fomin's English pattern deck (CC0, Wikimedia Commons), in public/cards/<suit><rank>.png (cut from one thumbnail by assets_src/cut_cards.py).
import React from "react";
import { Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, easeInOut, lerp, pop, ramp, shuffled } from "../theme";
import { Backdrop, Bubble, CheckMark, Label } from "./common";

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS = ["h", "d", "c", "s"]; // hearts, diamonds red; clubs, spades black
const ALL = SUITS.flatMap((s) => RANKS.map((r) => `${s}${r}`));
const isBlack = (id: string) => id[0] === "c" || id[0] === "s";
const HIDDEN = "hQ"; // never shown
const REST = shuffled(ALL.filter((id) => id !== HIDDEN), "deck-v1");
const REDS = ALL.filter((id) => !isBlack(id));

// Default phase times (seconds); a narrated cut passes its own. deal..deal + 51 * dealStep: the rest goes card by card.
export const DECK_T = { stackIn: 0.2, full: 0.4, draw: 1.3, claim: 2.6, deal: 3.9, dealStep: 0.12, hide: 8.0, verdict: 11.0, which: 13.0, end: 17.0 };
export type DeckTimes = typeof DECK_T;

const CW = 84, CH = 126, GAP = 8;
const BIG = 2.1;                                 // stack scale before the deal
const STACK0 = { x: 960 - CW / 2, y: 520 };      // the big stack in the middle, before the deal
const STACK1 = { x: 150, y: 600 };               // where it sits while you deal
const PILE = { x: 1650, y: 520 };                // the red cards, face down
const HAND = { x: 210, y: 92, s: 1.75 };
const BLOCK_X = (1920 - (13 * CW + 12 * GAP)) / 2;
const BLOCK_Y = [455, 589];
const FLY = 0.55;

const CardBack: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <svg width={w} height={h} viewBox="0 0 84 126" style={{ display: "block" }}>
    <defs>
      <pattern id="lattice" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0 H10 M0 0 V10" stroke={C.orange} strokeWidth="1.1" opacity="0.55" />
      </pattern>
      <linearGradient id="backg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2A2117" />
        <stop offset="1" stopColor="#15110D" />
      </linearGradient>
    </defs>
    <rect x="0.5" y="0.5" width="83" height="125" rx="7" fill="url(#backg)" stroke="#F4F1EA" strokeWidth="1" />
    <rect x="6" y="6" width="72" height="114" rx="4" fill="url(#lattice)" stroke={C.orange} strokeWidth="1.2" />
    <circle cx="42" cy="63" r="12" fill="#15110D" stroke={C.orange} strokeWidth="1.6" />
    <path d="M42 54 L49 63 L42 72 L35 63 Z" fill={C.orange} />
  </svg>
);

// One card that can flip: angle 180 = back up, 0 = face up.
const Card: React.FC<{ id: string; x: number; y: number; scale?: number; rot?: number; flip: number; opacity?: number; glow?: string; lift?: number; grey?: number }> = ({
  id, x, y, scale = 1, rot = 0, flip, opacity = 1, glow, lift = 0, grey = 0,
}) => (
  <div style={{ position: "absolute", left: x, top: y - lift, width: CW, height: CH, transform: `scale(${scale}) rotate(${rot}deg)`, transformOrigin: "top left", perspective: 700, opacity }}>
    <div style={{ position: "relative", width: CW, height: CH, transformStyle: "preserve-3d", transform: `rotateY(${flip}deg)` }}>
      <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 7, overflow: "hidden", background: "#fff", boxShadow: glow ? `0 0 0 3px ${glow}, 0 0 26px ${glow}` : "0 6px 16px rgba(0,0,0,0.45)", filter: grey ? `grayscale(${grey}) brightness(${1 - 0.45 * grey})` : undefined }}>
        <Img src={staticFile(`cards/${id}.png`)} style={{ width: CW, height: CH, display: "block" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 7, boxShadow: "0 6px 16px rgba(0,0,0,0.45)" }}>
        <CardBack w={CW} h={CH} />
      </div>
    </div>
  </div>
);

const Person: React.FC<{ x: number; y: number; color: string; size?: number }> = ({ x, y, color, size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", left: x - size / 2, top: y - size / 2 }}>
    <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.05)" stroke={color} strokeWidth="3" />
    <circle cx="50" cy="38" r="15" fill={color} />
    <path d="M22 80 Q50 50 78 80 Z" fill={color} />
  </svg>
);

export const DeckScene: React.FC<{ T?: DeckTimes }> = ({ T = DECK_T }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const stackIn = pop(t, T.stackIn, 8, 0.6);
  const move = ramp(t, T.deal - 0.6, 0.6, easeInOut); // the stack shrinks and moves aside before the deal
  const big = lerp(BIG, 1, move);
  const ox = lerp(STACK0.x - (CW * (BIG - 1)) / 2, STACK1.x, move);
  const oy = lerp(STACK0.y - (CH * (BIG - 1)) / 2, STACK1.y, move);
  const landed = (i: number) => t >= T.deal + i * T.dealStep + FLY;
  const blackShown = REST.filter((id, i) => isBlack(id) && landed(i)).length;
  const redsDown = REST.filter((id, i) => !isBlack(id) && landed(i)).length;
  const verdict = ramp(t, T.verdict, 0.6);

  // your card: the top of the stack, flown to the hand
  const draw = ramp(t, T.draw, 1.0);
  const handX = lerp(STACK0.x - (CW * (BIG - 1)) / 2, HAND.x, draw);
  const handY = lerp(STACK0.y - (CH * (BIG - 1)) / 2 - 30, HAND.y, draw) - Math.sin(draw * Math.PI) * 120;
  const handS = lerp(BIG, HAND.s, draw);
  const handRot = lerp(0, -6, draw);
  const redPulse = verdict * (0.6 + 0.4 * Math.sin((t - T.verdict) * 4));

  const counterIn = ramp(t, T.deal - 0.2, 0.5);
  const which = ramp(t, T.which + 0.15, 0.5); // starts after the verdict line has gone
  const ghostId = REDS[Math.floor((t - T.which) * 7) % REDS.length] ?? REDS[0];
  let reds = 0, blacks = 0;

  return (
    <Backdrop>
      {/* the two people */}
      <Person x={150} y={150} color={C.ink} />
      <Label text="Դու" x={150} y={196} size={26} color={C.dim} width={200} />
      <Person x={1770} y={150} color={C.blue} />
      <Label text="Ընկերդ" x={1770} y={196} size={26} color={C.dim} width={200} />
      <Label text="Լրիվ կապոց՝ 52 քարտ" x={960} y={STACK0.y + CH * BIG / 2 + 92} size={34} color={C.ink} weight={700} width={600} opacity={ramp(t, T.full, 0.4) * (1 - ramp(t, T.draw, 0.4))} />

      {/* the rest of the deck: black cards fly out face up into two rows, red ones go face down onto a pile */}
      {REST.map((id, i) => {
        const depth = REST.length - i;
        const fly = ramp(t, T.deal + i * T.dealStep, FLY);
        const sx = ox + depth * 0.15 * big, sy = oy - depth * 0.55 * big;
        const black = isBlack(id);
        const j = black ? blacks++ : reds++;
        const tx = black ? BLOCK_X + (j % 13) * (CW + GAP) : PILE.x + (random(`px${id}`) - 0.5) * 18;
        const ty = black ? BLOCK_Y[Math.floor(j / 13)] : PILE.y - j * 0.9;
        const x = lerp(sx, tx, fly);
        const y = lerp(sy, ty, fly) - Math.sin(fly * Math.PI) * (black ? 70 : 40);
        const rot = black ? interpolate(fly, [0, 0.5, 1], [0, j % 2 ? 6 : -6, 0]) : lerp(0, (random(`pr${id}`) - 0.5) * 16, fly);
        const flip = black ? 180 - 180 * ramp(t, T.deal + i * T.dealStep + 0.1, 0.4) : 180; // reds never turn over
        const lift = black ? 10 * pop(t, T.deal + i * T.dealStep + FLY, 14, 0.4) : 0;
        const glow = black && fly >= 1 ? `rgba(242,168,0,${0.9 * (1 - ramp(t, T.verdict + 1, 0.6) * 0.5)})` : undefined;
        return <Card key={id} id={id} x={x} y={y} scale={lerp(big, 1, fly)} rot={rot} flip={flip} glow={glow} lift={lift} opacity={stackIn} />;
      })}
      <Label text={`${redsDown} քարտ՝ ցույց չտրված`} x={PILE.x + CW / 2} y={BLOCK_Y[1] + CH + 24} size={26} color={C.dim} width={320} opacity={ramp(t, T.hide, 0.5)} />

      {/* your card stays face down for the whole video */}
      <div style={{ position: "absolute", left: 0, top: 0, filter: redPulse > 0 ? `drop-shadow(0 0 ${22 * redPulse}px rgba(232,56,61,${0.95 * redPulse}))` : undefined }}>
        <Card id={HIDDEN} x={handX} y={handY} scale={handS} rot={handRot} flip={180} opacity={stackIn} />
      </div>
      <Label text="Քո քարտը" x={HAND.x + CW * HAND.s / 2} y={HAND.y + CH * HAND.s + 18} size={26} color={C.dim} width={260} opacity={ramp(t, T.draw + 0.8, 0.4)} />
      <Bubble text="Կարմիր է" x={HAND.x + CW * HAND.s + 120} y={HAND.y + 60} t={t} t0={T.claim} tail="left" accent={C.red} out={T.verdict - 0.4} />
      <Bubble text="Ապացուցի՛ր" x={1640} y={108} t={t} t0={T.claim + 0.7} tail="right" accent={C.blue} out={T.deal} />
      <Label text="առանց քարտը բացելու" x={1640} y={250} size={26} color={C.dim} width={420} opacity={ramp(t, T.claim + 1.1, 0.4) * (1 - ramp(t, T.deal, 0.3))} />

      {/* counter of the black cards shown */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 268, display: "flex", justifyContent: "center", opacity: counterIn }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: FONT, fontSize: 46, fontWeight: 700, color: blackShown >= 26 ? C.orange : C.ink, fontVariantNumeric: "tabular-nums" }}>
          <span>Սև քարտեր՝ {blackShown} / 26</span>
          {blackShown >= 26 ? <CheckMark size={58} progress={ramp(t, T.deal + 51 * T.dealStep + FLY, 0.5)} /> : null}
        </div>
      </div>

      {/* verdict, then "which red card? unknown" */}
      <div style={{ position: "absolute", left: 470, top: 120, opacity: verdict * (1 - ramp(t, T.which - 0.45, 0.45)), fontFamily: FONT, fontSize: 44, fontWeight: 700, color: C.ink, transform: `translateY(${(1 - verdict) * 12}px)` }}>
        Ոչ մի սև պակաս չէ, ուրեմն քոնը <span style={{ color: C.red }}>կարմիր է</span>
      </div>
      <div style={{ position: "absolute", left: 470, top: 92, opacity: which, display: "flex", alignItems: "center", gap: 26 }}>
        <div style={{ position: "relative", width: CW * 1.25, height: CH * 1.25 }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.35, filter: "blur(0.6px)" }}>
            <Img src={staticFile(`cards/${ghostId}.png`)} style={{ width: CW * 1.25, height: CH * 1.25, borderRadius: 8 }} />
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontSize: 96, fontWeight: 800, color: C.ink, textShadow: "0 4px 18px rgba(0,0,0,0.8)" }}>?</div>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 44, fontWeight: 700, color: C.ink, lineHeight: 1.25 }}>
          Կարմիր է, բայց <span style={{ color: C.orange }}>որ մեկը՝</span>
          <br />
          ընկերդ չգիտի
        </div>
      </div>
    </Backdrop>
  );
};
