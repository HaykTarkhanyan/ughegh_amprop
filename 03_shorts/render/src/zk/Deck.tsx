// The red-card proof: draw a card, say "red", show that all 26 black cards are still in the rest of the deck.
// Cards: Dmitry Fomin's English pattern deck (CC0, Wikimedia Commons), in public/cards/<suit><rank>.png (cut from one thumbnail by assets_src/cut_cards.py).
import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, easeInOut, lerp, pop, ramp, shuffled } from "../theme";
import { Backdrop, Bubble, CheckMark, Label } from "./common";

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS = ["h", "d", "c", "s"]; // hearts, diamonds red; clubs, spades black
const ALL = SUITS.flatMap((s) => RANKS.map((r) => `${s}${r}`));
const isBlack = (id: string) => id[0] === "c" || id[0] === "s";
const HIDDEN = "hQ"; // never shown
const REST = shuffled(ALL.filter((id) => id !== HIDDEN), "deck-v1");
const BLACK_ORDER = REST.filter(isBlack); // highlight order = reading order of the grid
const REDS = ALL.filter((id) => !isBlack(id));

// Default phase times (seconds); a narrated cut passes its own.
export const DECK_T = {
  stackIn: 0.2, draw: 1.3, claim: 2.6, deal: 3.9, dealStep: 0.034, flip: 6.1, flipStep: 0.018,
  scan: 7.6, scanStep: 0.13, gather: 11.4, verdict: 12.9, which: 14.4, end: 18.5,
};
export type DeckTimes = typeof DECK_T;

const CW = 84, CH = 126, GAP = 8, COLS = 17;
const GX = (1920 - (COLS * CW + (COLS - 1) * GAP)) / 2;
const GY = [400, 534, 668];
const STACK = { x: 960 - CW / 2, y: 520 };
const HAND = { x: 210, y: 92, s: 1.75 };
const BLOCK_X = (1920 - (13 * CW + 12 * GAP)) / 2;
const BLOCK_Y = [455, 589];

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
  const big = lerp(2.1, 1, ramp(t, T.deal - 0.6, 0.6, easeInOut)); // stack scale before the deal
  const blackFound = Math.max(0, Math.min(26, Math.floor((t - T.scan) / T.scanStep) + 1));
  const gathered = ramp(t, T.gather, 1.3);
  const verdict = ramp(t, T.verdict, 0.6);
  const redDim = ramp(t, T.scan - 0.2, 0.6);

  // your card: the top of the stack, flown to the hand
  const draw = ramp(t, T.draw, 1.0);
  const big0 = 2.1;
  const handX = lerp(STACK.x - (CW * (big0 - 1)) / 2, HAND.x, draw);
  const handY = lerp(STACK.y - (CH * (big0 - 1)) / 2 - 30, HAND.y, draw) - Math.sin(draw * Math.PI) * 120;
  const handS = lerp(big0, HAND.s, draw);
  const handRot = lerp(0, -6, draw);
  const redPulse = verdict * (0.6 + 0.4 * Math.sin((t - T.verdict) * 4));

  const counterIn = ramp(t, T.scan - 0.4, 0.5);
  const which = ramp(t, T.which + 0.15, 0.5); // starts after the verdict line has gone
  const ghostId = REDS[Math.floor((t - T.which) * 7) % REDS.length] ?? REDS[0];

  return (
    <Backdrop>
      {/* the two people */}
      <Person x={150} y={150} color={C.ink} />
      <Label text="Դու" x={150} y={196} size={26} color={C.dim} width={200} />
      <Person x={1770} y={150} color={C.blue} />
      <Label text="Ընկերդ" x={1770} y={196} size={26} color={C.dim} width={200} />

      {/* the rest of the deck: stack -> grid -> black block */}
      {REST.map((id, i) => {
        const depth = REST.length - i;
        const d0 = T.deal + i * T.dealStep;
        const fly = ramp(t, d0, 0.55);
        const r = Math.floor(i / COLS), c = i % COLS;
        const gx = GX + c * (CW + GAP), gy = GY[r];
        const sx = STACK.x - (CW * (big - 1)) / 2 + depth * 0.15 * big, sy = STACK.y - (CH * (big - 1)) / 2 - depth * 0.55 * big;
        let x = lerp(sx, gx, fly);
        let y = lerp(sy, gy, fly) - Math.sin(fly * Math.PI) * 60;
        const rot = interpolate(fly, [0, 0.5, 1], [0, (c % 2 ? 6 : -6), 0]);
        const flip = 180 - 180 * ramp(t, T.flip + (c + r * 2) * T.flipStep, 0.45);
        const black = isBlack(id);
        let glow: string | undefined;
        let lift = 0;
        let opacity = stackIn;
        let grey = 0;
        if (black) {
          const j = BLACK_ORDER.indexOf(id);
          const h0 = T.scan + j * T.scanStep;
          const hl = ramp(t, h0, 0.25);
          if (t >= h0) {
            glow = `rgba(242,168,0,${0.9 * hl})`;
            lift = 10 * pop(t, h0, 14, 0.4) * (1 - gathered);
          }
          const bx = BLOCK_X + (j % 13) * (CW + GAP), by = BLOCK_Y[Math.floor(j / 13)];
          const g = ramp(t, T.gather + j * 0.012, 1.2);
          x = lerp(x, bx, g);
          y = lerp(y, by, g) - Math.sin(g * Math.PI) * 40;
        } else {
          opacity *= lerp(1, 0.28, redDim) * lerp(1, 0.4, gathered);
          grey = 0.7 * redDim;
        }
        return <Card key={id} id={id} x={x} y={y} scale={lerp(big, 1, fly)} rot={rot} flip={flip} glow={glow} lift={lift} opacity={opacity} grey={grey} />;
      })}

      {/* your card stays face down for the whole video */}
      <div style={{ position: "absolute", left: 0, top: 0, filter: redPulse > 0 ? `drop-shadow(0 0 ${22 * redPulse}px rgba(232,56,61,${0.95 * redPulse}))` : undefined }}>
        <Card id={HIDDEN} x={handX} y={handY} scale={handS} rot={handRot} flip={180} opacity={stackIn} />
      </div>
      <Label text="Քո քարտը" x={HAND.x + CW * HAND.s / 2} y={HAND.y + CH * HAND.s + 18} size={26} color={C.dim} width={260} opacity={ramp(t, T.draw + 0.8, 0.4)} />
      <Bubble text="Կարմիր է" x={HAND.x + CW * HAND.s + 120} y={HAND.y + 60} t={t} t0={T.claim} tail="left" accent={C.red} out={T.verdict - 0.4} />
      <Bubble text="Ապացուցի՛ր" x={1640} y={108} t={t} t0={T.claim + 0.7} tail="right" accent={C.blue} out={T.scan} />
      <Label text="առանց քարտը բացելու" x={1640} y={250} size={26} color={C.dim} width={420} opacity={ramp(t, T.claim + 1.1, 0.4) * (1 - ramp(t, T.scan, 0.3))} />

      {/* counter */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 268, display: "flex", justifyContent: "center", opacity: counterIn }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: FONT, fontSize: 46, fontWeight: 700, color: blackFound >= 26 && t > T.gather + 0.9 ? C.orange : C.ink, fontVariantNumeric: "tabular-nums" }}>
          <span>Սև քարտեր՝ {t < T.scan ? 0 : blackFound} / 26</span>
          {t > T.gather + 0.9 ? <CheckMark size={58} progress={ramp(t, T.gather + 0.9, 0.5)} /> : null}
        </div>
      </div>

      {/* verdict, then "which red card? unknown" */}
      <div style={{ position: "absolute", left: 470, top: 120, opacity: verdict * (1 - ramp(t, T.which - 0.45, 0.45)), fontFamily: FONT, fontSize: 44, fontWeight: 700, color: C.ink, transform: `translateY(${(1 - verdict) * 12}px)` }}>
        Բոլոր սևերն այստեղ են, ուրեմն քոնը <span style={{ color: C.red }}>կարմիր է</span>
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
