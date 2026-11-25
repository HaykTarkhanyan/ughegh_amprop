// "Where's Waldo" as a zero-knowledge proof (Naor, Naor & Reingold, "Applied Kid Cryptography", 1999): a huge sheet
// of cardboard with a small hole shows the person you found, but not where he is on the page.
// The crowd and the hidden person are our own drawings (not the books' character or art).
import React, { useMemo } from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop, Bubble, CheckMark } from "./common";

export const WALDO_T = {
  page: 0.2, ref: 1.8, search: 2.8, found: 5.2, sheet: 7.2, sheetDur: 1.9, opaque: 9.2, zoom: 10.0, anywhere: 11.8, verdict: 15.6, end: 19,
};
export type WaldoTimes = typeof WALDO_T;

const PAGE = { x: 250, y: 96, w: 1420, h: 850 };
const TARGET = { x: PAGE.x + 1010, y: PAGE.y + 548 };
const HOLE_R = 46;
const SHIRTS = ["#C8553D", "#3D7DC8", "#E0B84A", "#6A9F4B", "#8C5BA8", "#D07A9C", "#4BA3A3", "#B0B0B0", "#2F3A55", "#E8E2D0", "#A0522D", "#F08A3C"];
const SKIN = ["#F2D0B1", "#E2B48E", "#C68E63", "#8E5B3A", "#F6DCC6"];
const HATS = ["#3D7DC8", "#C8553D", "#2F3A55", "#E0B84A", "#F08A3C", "#6A9F4B"];

type Person = { x: number; y: number; s: number; shirt: string; skin: string; hat?: string; scarf?: boolean; d: number };

const makeCrowd = (): Person[] => {
  const out: Person[] = [];
  const cols = 44, rows = 17;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const id = `${r}-${c}`;
      const x = PAGE.x + 24 + (c + (r % 2) * 0.5) * ((PAGE.w - 48) / cols) + (random(`jx${id}`) - 0.5) * 18;
      const y = PAGE.y + 34 + r * ((PAGE.h - 60) / rows) + (random(`jy${id}`) - 0.5) * 14;
      if (Math.hypot(x - TARGET.x, y - TARGET.y) < 26) continue; // room for the hidden person
      const hatRoll = random(`h${id}`);
      out.push({
        x, y, s: 0.85 + random(`s${id}`) * 0.35,
        shirt: SHIRTS[Math.floor(random(`sh${id}`) * SHIRTS.length)],
        skin: SKIN[Math.floor(random(`sk${id}`) * SKIN.length)],
        hat: hatRoll < 0.33 ? HATS[Math.floor(random(`hc${id}`) * HATS.length)] : undefined, // decoys: orange caps without the scarf
        scarf: random(`sc${id}`) < 0.06, // decoys: scarves without the orange cap
        d: Math.hypot(x - 960, y - 520),
      });
    }
  }
  return out.sort((a, b) => a.y - b.y);
};

// one little person, facing us; the hidden one has the orange cap AND the striped blue scarf
const Figure: React.FC<{ p: Person; target?: boolean; k?: number }> = ({ p, target, k = 1 }) => {
  const s = p.s * k;
  return (
    <g transform={`translate(${p.x} ${p.y}) scale(${s})`}>
      <ellipse cx="0" cy="17" rx="9" ry="2.6" fill="rgba(0,0,0,0.18)" />
      <rect x="-8" y="-2" width="16" height="19" rx="6" fill={p.shirt} />
      {p.scarf ? (
        <g>
          <rect x="-8" y="-3" width="16" height="5" rx="2" fill="#2E5FB8" />
          <rect x="-4" y="-3" width="2.5" height="5" fill="#fff" />
          <rect x="1.5" y="-3" width="2.5" height="5" fill="#fff" />
          <rect x="3" y="1" width="4" height="9" rx="1.5" fill="#2E5FB8" />
        </g>
      ) : null}
      <circle cx="0" cy="-9" r="7" fill={p.skin} />
      {p.hat ? (
        <g>
          <path d="M -7.5 -11 Q 0 -21 7.5 -11 Z" fill={p.hat} />
          <rect x={target ? 0 : -1} y="-12" width="10" height="2.6" rx="1.3" fill={p.hat} />
        </g>
      ) : null}
      <circle cx="-2.4" cy="-9" r="0.9" fill="#2a1d14" />
      <circle cx="2.4" cy="-9" r="0.9" fill="#2a1d14" />
    </g>
  );
};

const HIDDEN: Person = { x: TARGET.x, y: TARGET.y, s: 1.05, shirt: "#6A9F4B", skin: "#F2D0B1", hat: "#F08A3C", scarf: true, d: 0 };

const Scenery: React.FC = () => (
  <g>
    {/* paths and a pond on the page, under the crowd */}
    <path d={`M ${PAGE.x} ${PAGE.y + 300} C ${PAGE.x + 400} ${PAGE.y + 200}, ${PAGE.x + 900} ${PAGE.y + 520}, ${PAGE.x + PAGE.w} ${PAGE.y + 380}`} stroke="#E2D3B0" strokeWidth="60" fill="none" opacity="0.8" />
    <ellipse cx={PAGE.x + 300} cy={PAGE.y + 640} rx="150" ry="70" fill="#9CC3D5" opacity="0.65" />
    {[[120, 120], [520, 90], [880, 160], [1260, 110], [1340, 720], [700, 760], [180, 420]].map(([x, y], i) => (
      <g key={i}>
        <circle cx={PAGE.x + x} cy={PAGE.y + y} r="34" fill="#7FA65A" opacity="0.75" />
        <circle cx={PAGE.x + x - 12} cy={PAGE.y + y - 10} r="18" fill="#93BA6B" opacity="0.8" />
      </g>
    ))}
  </g>
);

const Avatar: React.FC<{ x: number; y: number; color: string; label: string }> = ({ x, y, color, label }) => (
  <div style={{ position: "absolute", left: x - 50, top: y - 50, width: 100, textAlign: "center" }}>
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="rgba(255,255,255,0.05)" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="38" r="15" fill={color} />
      <path d="M22 80 Q50 50 78 80 Z" fill={color} />
    </svg>
    <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 600, color: C.dim }}>{label}</div>
  </div>
);

export const WaldoScene: React.FC<{ T?: WaldoTimes }> = ({ T = WALDO_T }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const crowd = useMemo(makeCrowd, []);

  const pageIn = ramp(t, T.page, 0.8);
  // the magnifier wanders, then settles on the hidden person
  const sp = ramp(t, T.search, T.found - T.search, easeInOut);
  const lensPath = [
    { x: PAGE.x + 380, y: PAGE.y + 300 }, { x: PAGE.x + 760, y: PAGE.y + 220 }, { x: PAGE.x + 620, y: PAGE.y + 600 },
    { x: PAGE.x + 1180, y: PAGE.y + 330 }, { x: TARGET.x, y: TARGET.y },
  ];
  const seg = Math.min(lensPath.length - 2, Math.floor(sp * (lensPath.length - 1)));
  const segK = easeInOut(sp * (lensPath.length - 1) - seg);
  const lens = { x: lerp(lensPath[seg].x, lensPath[seg + 1].x, segK), y: lerp(lensPath[seg].y, lensPath[seg + 1].y, segK) };
  const lensIn = ramp(t, T.search - 0.3, 0.4) * (1 - ramp(t, T.sheet, 0.4));
  const LR = 92, ZOOM = 2.3;

  // the sheet: far bigger than the page, slides in from the left with its hole landing on the person
  const sh = ramp(t, T.sheet, T.sheetDur, easeInOut);
  const holeX = lerp(TARGET.x - 4600, TARGET.x, sh); // starts fully off-screen, its right edge sweeps in
  const holeY = lerp(TARGET.y + 120, TARGET.y, sh);
  const sheetOpacity = t < T.sheet ? 0 : lerp(0.6, 1, ramp(t, T.opaque, 0.7));
  const SW = 3000, SH = 1900; // covers the screen and every page position in `ghosts`; the hole sits in its middle
  const sheetPath = `M ${holeX - SW / 2} ${holeY - SH / 2} h ${SW} v ${SH} h ${-SW} Z M ${holeX - HOLE_R} ${holeY} a ${HOLE_R} ${HOLE_R} 0 1 0 ${HOLE_R * 2} 0 a ${HOLE_R} ${HOLE_R} 0 1 0 ${-HOLE_R * 2} 0 Z`;

  // camera: push in on the hole for the friend's view
  // camera: push in on the hole (the friend's view), then pull far out to show how big the sheet is
  const out = ramp(t, T.anywhere, 1.3, easeInOut);
  const camS = lerp(lerp(1, 1.8, ramp(t, T.zoom, 1.2, easeInOut)), 0.42, out);
  const camX = lerp(0, 960 - TARGET.x, out), camY = lerp(0, 520 - TARGET.y, out); // the hole moves to the centre

  // where else the page could be: dashed outlines, all consistent with what the hole shows
  // every one of these page positions still has the person exactly under the hole
  const ghosts = [
    { dx: -380, dy: -270 }, { dx: 900, dy: 480 }, { dx: -330, dy: 430 }, { dx: 760, dy: -260 }, { dx: 240, dy: 120 },
  ];
  const anyIn = ramp(t, T.anywhere + 1.0, 0.5);
  const gp = ramp(t, T.anywhere + 1.2, 2.4, (x) => x) * (ghosts.length - 1);
  const gi = Math.min(ghosts.length - 2, Math.floor(gp));
  const gk = easeInOut(gp - gi);
  const glide = { dx: lerp(ghosts[gi].dx, ghosts[gi + 1].dx, gk), dy: lerp(ghosts[gi].dy, ghosts[gi + 1].dy, gk) };
  const verdict = ramp(t, T.verdict, 0.6);
  const found = ramp(t, T.found, 0.4);

  return (
    <Backdrop>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${camX}px, ${camY}px) scale(${camS})`, transformOrigin: `${TARGET.x}px ${TARGET.y}px` }}>
        <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <defs>
            <clipPath id="pageClip"><rect x={PAGE.x} y={PAGE.y} width={PAGE.w} height={PAGE.h} rx="14" /></clipPath>
            <clipPath id="lensClip"><circle cx={lens.x} cy={lens.y} r={LR} /></clipPath>
            <filter id="board" x="-6000" y="-3000" width="12000" height="7000" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="n" />
              <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.36  0 0 0 0 0.28  0 0 0 0 0.20  0 0 0 0.35 0" result="nt" />
              <feComposite in="nt" in2="SourceGraphic" operator="in" result="tex" />
              <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="tex" /></feMerge>
            </filter>
          </defs>

          {/* the page */}
          <g opacity={pageIn} transform={`translate(0 ${(1 - pageIn) * 30})`}>
            <rect x={PAGE.x + 10} y={PAGE.y + 16} width={PAGE.w} height={PAGE.h} rx="14" fill="rgba(0,0,0,0.5)" />
            <rect x={PAGE.x} y={PAGE.y} width={PAGE.w} height={PAGE.h} rx="14" fill="#EFE5CF" />
            <g clipPath="url(#pageClip)">
              <Scenery />
              {crowd.map((p, i) => {
                const k = Math.min(1, pop(t, T.page + 0.15 + p.d / 1400, 12, 0.5));
                return k > 0 ? <Figure key={i} p={p} k={k} /> : null;
              })}
              <Figure p={HIDDEN} target k={Math.min(1, pop(t, T.page + 0.6, 12, 0.5))} />
            </g>
          </g>

          {/* the magnifier: the same page, larger, inside the lens */}
          {lensIn > 0 ? (
            <g opacity={lensIn}>
              <g clipPath="url(#lensClip)">
                <circle cx={lens.x} cy={lens.y} r={LR} fill="#EFE5CF" />
                <g transform={`translate(${lens.x} ${lens.y}) scale(${ZOOM}) translate(${-lens.x} ${-lens.y})`}>
                  <Scenery />
                  {crowd.filter((p) => Math.abs(p.x - lens.x) < LR && Math.abs(p.y - lens.y) < LR).map((p, i) => <Figure key={i} p={p} />)}
                  <Figure p={HIDDEN} target />
                </g>
              </g>
              <circle cx={lens.x} cy={lens.y} r={LR} fill="none" stroke="#2B2F38" strokeWidth="12" />
              <circle cx={lens.x} cy={lens.y} r={LR - 6} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
              <line x1={lens.x + LR * 0.72} y1={lens.y + LR * 0.72} x2={lens.x + LR * 1.55} y2={lens.y + LR * 1.55} stroke="#2B2F38" strokeWidth="22" strokeLinecap="round" />
              {found > 0 ? <circle cx={lens.x} cy={lens.y} r={LR + 14} fill="none" stroke={C.orange} strokeWidth="6" opacity={found} /> : null}
            </g>
          ) : null}

          {/* the cardboard sheet with its hole */}
          {sheetOpacity > 0 ? (
            <g>
              <path d={sheetPath} fillRule="evenodd" fill="#4A3A2C" opacity={sheetOpacity} filter="url(#board)" />
              <circle cx={holeX} cy={holeY} r={HOLE_R} fill="none" stroke="#7A6248" strokeWidth="7" opacity={Math.min(1, sheetOpacity + 0.2)} />
              <circle cx={holeX} cy={holeY} r={HOLE_R + 5} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="4" opacity={sheetOpacity} />
            </g>
          ) : null}

          {/* where the page could be */}
          {anyIn > 0
            ? ghosts.slice(0, gi + 1).map((g, i) => (
                <rect key={i} x={PAGE.x + g.dx} y={PAGE.y + g.dy} width={PAGE.w} height={PAGE.h} rx="14"
                  fill="none" stroke={C.orange} strokeWidth="7" strokeDasharray="30 24" opacity={anyIn * 0.3} />
              ))
            : null}
          {anyIn > 0 ? (
            <rect x={PAGE.x + glide.dx} y={PAGE.y + glide.dy} width={PAGE.w} height={PAGE.h} rx="14" fill="rgba(242,168,0,0.06)" stroke={C.orange} strokeWidth="9" strokeDasharray="30 24" opacity={anyIn} />
          ) : null}
          {anyIn > 0 ? <circle cx={holeX} cy={holeY} r={HOLE_R + 26} fill="none" stroke={C.ink} strokeWidth="6" opacity={anyIn * 0.8} /> : null}
        </svg>
      </div>

      {/* who is who, and what they say (outside the camera move) */}
      <Avatar x={125} y={170} color={C.ink} label="Դու" />
      <Avatar x={1795} y={170} color={C.blue} label="Ընկերդ" />
      <Bubble text="Գտա" x={190} y={110} t={t} t0={T.found + 0.2} tail="left" accent={C.orange} out={T.sheet + 0.4} />
      <Bubble text="Ապացուցի՛ր" x={1730} y={110} t={t} t0={T.found + 0.8} tail="right" accent={C.blue} out={T.sheet + 0.4} />

      {/* the person to find (our own character) */}
      <div style={{ position: "absolute", left: 1500, top: 64, width: 210, height: 240, borderRadius: 18, background: "#F7F0DE", boxShadow: "0 18px 40px rgba(0,0,0,0.5)", border: `4px solid ${C.orange}`, opacity: ramp(t, T.ref, 0.5) * (1 - ramp(t, T.sheet, 0.4)), transform: `scale(${Math.min(1, pop(t, T.ref, 10, 0.5))}) rotate(3deg)` }}>
        <svg width="210" height="190" viewBox="0 0 210 190">
          <g transform="translate(105 112) scale(4.6)"><Figure p={{ ...HIDDEN, x: 0, y: 0, s: 1 }} target /></g>
        </svg>
        <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 800, color: "#2A2117", textAlign: "center", marginTop: -8 }}>Գտի՛ր նրան</div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, top: 990, textAlign: "center", fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.ink, opacity: ramp(t, T.opaque + 0.3, 0.5) * (1 - ramp(t, T.anywhere, 0.4)) }}>
        Ընկերդ տեսնում է միայն սա
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 990, textAlign: "center", fontFamily: FONT, fontSize: 36, fontWeight: 700, color: C.ink, opacity: anyIn * (1 - verdict) }}>
        Էջը տակը կարող է լինել <span style={{ color: C.orange }}>ցանկացած տեղ</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 975, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, fontFamily: FONT, fontSize: 38, fontWeight: 700, color: C.ink, opacity: verdict }}>
        <CheckMark size={60} progress={ramp(t, T.verdict, 0.6)} />
        Համոզված է, որ գտել ես, բայց չգիտի՝ <span style={{ color: C.orange }}>որտեղ</span>
      </div>
    </Backdrop>
  );
};
