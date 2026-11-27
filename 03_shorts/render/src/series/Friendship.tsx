// "The friendship paradox" (9:16 Short, draft for review; DECISIONS #28).
// The 20-person network is friendship/network.py's (seed 509, copied to data/friendship_network.json): every count on
// screen (3,6 friends on average, 5,2 for friends' friends, 17 of 20, the hub's 11) is computed there, not typed in.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import TL from "../data/friendship.json";
import NET from "../data/friendship_network.json";
import { C, FONT, easeInOut, lerp, pop, ramp } from "../theme";
import { Backdrop } from "../zk/common";
import { loadTimeline } from "../zk/timeline";
import { PortraitCaptions } from "./captions";

const S = loadTimeline(TL, "friendship", "portrait");
export const FR_FPS = 30;
const TAIL_S = 1.2;
export const FR_FRAMES = Math.ceil((S.duration + TAIL_S) * FR_FPS);
const rel = (g0: number, x: number) => Math.max(0, x - g0);
const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

// ---------- the network ----------
type Node = { id: number; degree: number; friends_mean: number; fewer: boolean; x: number; y: number };
const NODES = NET.nodes as Node[];
const EDGES = NET.edges as [number, number][];
const SUM = NET.summary;
const friendsOf = (v: number) => EDGES.flatMap(([a, b]) => (a === v ? [b] : b === v ? [a] : []));
const node = (id: number) => {
  const n = NODES.find((x) => x.id === id);
  if (!n) throw new Error(`friendship network has no node ${id}`);
  return n;
};
const HUB = NODES.reduce((a, b) => (b.degree > a.degree ? b : a));
const FOCUS = node(8); // 2 friends, whose friends have 7,5 on average
const TWO = node(16); // 2 friends, not a friend of the hub
if (HUB.degree !== SUM.max_degree || FOCUS.degree !== 2 || TWO.degree !== 2 || friendsOf(TWO.id).includes(HUB.id)) {
  throw new Error("friendship network changed: re-pick HUB / FOCUS / TWO in Friendship.tsx");
}
const fmt = (x: number) => String(x).replace(".", ",");
const FEWER = NODES.filter((n) => n.fewer);

type NS = { r: number; fill: string; ring?: string; op: number; num?: number; badge?: string; badgeOp?: number };
type ES = { stroke: string; w: number; op: number; k?: number };
const NetDraw: React.FC<{ ns: (n: Node) => NS; es: (a: Node, b: Node) => ES; children?: React.ReactNode; scale?: number; opacity?: number }> = ({ ns, es, children, scale = 1, opacity = 1 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>
    <g transform={`translate(504 655) scale(${scale}) translate(-504 -655)`}>
      {EDGES.map(([a, b], i) => {
        const A = node(a), B = node(b);
        const s = es(A, B);
        const k = s.k ?? 1;
        return <line key={i} x1={A.x} y1={A.y} x2={lerp(A.x, B.x, k)} y2={lerp(A.y, B.y, k)} stroke={s.stroke} strokeWidth={s.w} opacity={s.op} strokeLinecap="round" />;
      })}
      {NODES.map((n) => {
        const s = ns(n);
        return (
          <g key={n.id} opacity={s.op}>
            {s.ring ? <circle cx={n.x} cy={n.y} r={s.r + 10} fill="none" stroke={s.ring} strokeWidth={5} /> : null}
            <circle cx={n.x} cy={n.y} r={s.r} fill={s.fill} stroke="#D8DCE3" strokeWidth={2.5} />
            {s.num !== undefined ? (
              <text x={n.x} y={n.y + s.r * 0.36} textAnchor="middle" fontFamily={FONT} fontSize={s.r * 1.0} fontWeight={800} fill={C.ink} opacity={s.num}>{n.degree}</text>
            ) : null}
            {s.badge && s.badgeOp ? (
              <g opacity={s.badgeOp}>
                <rect x={n.x + s.r - 6} y={n.y - s.r - 26} width={58} height={32} rx={10} fill={C.orange} />
                <text x={n.x + s.r + 23} y={n.y - s.r - 3} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight={800} fill={C.bg}>{s.badge}</text>
              </g>
            ) : null}
          </g>
        );
      })}
      {children}
    </g>
  </svg>
);
const BASE_FILL = "#2E3440";
const EDGE_C = "rgba(216,220,227,0.45)";

// ---------- small pieces ----------
const Tag: React.FC<{ text: string; x: number; y: number; size?: number; color?: string; weight?: number; opacity?: number; width?: number }> = ({ text, x, y, size = 34, color = C.ink, weight = 800, opacity = 1, width = 800 }) => (
  <div style={{ position: "absolute", left: x - width / 2, top: y - size * 0.6, width, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: weight, color, opacity, lineHeight: 1.2, textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}>{text}</div>
);
const SourceLine: React.FC<{ text: string; on: number }> = ({ text, on }) => (
  <div style={{ position: "absolute", left: 90, width: 828, top: 140, textAlign: "center", fontFamily: FONT, fontSize: 26, fontWeight: 600, color: C.dim, opacity: on }}>{text}</div>
);
const Title: React.FC<{ text: React.ReactNode; on: number; y?: number; size?: number }> = ({ text, on, y = 220, size = 46 }) => (
  <div style={{ position: "absolute", left: 110, width: 788, top: y, textAlign: "center", fontFamily: FONT, fontSize: size, fontWeight: 800, color: C.ink, lineHeight: 1.2, opacity: on }}>{text}</div>
);

// ---------- hook: you have 3 friends, they have 7, 9 and 6 ----------
const HOOK_FRIENDS = [{ a: -90, n: 7 }, { a: 30, n: 9 }, { a: 150, n: 6 }];
const Hook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const YX = 504, YY = 690;
  const avg = ramp(t, m.avg, 0.4);
  const you = ramp(t, m.you, 0.3);
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        {HOOK_FRIENDS.map((f, i) => {
          const fx = YX + 230 * Math.cos((f.a * Math.PI) / 180), fy = YY + 230 * Math.sin((f.a * Math.PI) / 180);
          return (
            <g key={i}>
              {Array.from({ length: f.n - 1 }, (_, j) => {
                const ang = ((f.a + (j - (f.n - 2) / 2) * (110 / Math.max(1, f.n - 2))) * Math.PI) / 180;
                const ox = fx + 125 * Math.cos(ang), oy = fy + 125 * Math.sin(ang);
                return (
                  <g key={j}>
                    <line x1={fx} y1={fy} x2={ox} y2={oy} stroke={EDGE_C} strokeWidth={3} />
                    <circle cx={ox} cy={oy} r={11} fill={BASE_FILL} stroke="#D8DCE3" strokeWidth={2} />
                  </g>
                );
              })}
              <line x1={YX} y1={YY} x2={fx} y2={fy} stroke={C.orange} strokeWidth={5} />
              <circle cx={fx} cy={fy} r={36 + 6 * avg * Math.sin(t * 6 + i)} fill={BASE_FILL} stroke={C.orange} strokeWidth={4} />
              <text x={fx} y={fy + 13} textAnchor="middle" fontFamily={FONT} fontSize={38} fontWeight={800} fill={C.ink}>{f.n}</text>
            </g>
          );
        })}
        <circle cx={YX} cy={YY} r={40} fill={C.orange} stroke={you > 0 ? C.red : "#FFD36B"} strokeWidth={4 + 4 * you} />
        <text x={YX} y={YY + 14} textAnchor="middle" fontFamily={FONT} fontSize={40} fontWeight={900} fill={C.bg}>3</text>
      </svg>
      <Tag text="դու" x={YX} y={YY + 74} size={34} />
      <Title text={<>Քո ընկերներն <span style={{ color: C.orange }}>ավելի շատ</span> ընկերներ ունեն, քան դու</>} on={1} y={200} size={44} />
      <Tag text={`միջինը՝ ${fmt(Math.round(((7 + 9 + 6) / 3) * 10) / 10)}`} x={504} y={1030} size={40} color={C.orange} opacity={avg} />
    </Backdrop>
  );
};

// ---------- name .. why: one continuous network ----------
const Network: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const titleOn = ramp(t, 0.1, 0.4) * (1 - ramp(t, m.pop - 0.4, 0.4));
  const focusOn = ramp(t, m.focus, 0.4) * (1 - ramp(t, m.all, 0.4));
  const hubOn = ramp(t, m.hub, 0.4) * (1 - ramp(t, m.two, 0.4));
  const twoOn = ramp(t, m.two, 0.4) * (1 - ramp(t, m.all2, 0.4));
  const grow = ramp(t, m.big, 1.0, easeInOut);
  const badgesOut = 1 - ramp(t, m.hub - 0.3, 0.4);
  const focusSet = new Set([FOCUS.id, ...friendsOf(FOCUS.id)]);
  const hubSet = new Set([HUB.id, ...friendsOf(HUB.id)]);
  const twoSet = new Set([TWO.id, ...friendsOf(TWO.id)]);
  const dimOf = (id: number) => Math.max(focusOn * (focusSet.has(id) ? 0 : 1), hubOn * (hubSet.has(id) ? 0 : 1), twoOn * (twoSet.has(id) ? 0 : 1));
  const rOf = (n: Node) => lerp(24, 10 + 4 * n.degree, grow);
  const ns = (n: Node): NS => {
    const appear = Math.max(0.25 * ramp(t, 0.3, 0.6), ramp(t, m.pop + n.id * 0.08, 0.3));
    const red = n.fewer ? ramp(t, m.fewer + FEWER.indexOf(n) * 0.06, 0.3) : 0;
    const orange = !n.fewer ? ramp(t, m.more, 0.3) : 0;
    const fill = orange > 0.5 ? C.orange : red > 0.5 ? "#B8323A" : BASE_FILL;
    const ring = (n.id === FOCUS.id && focusOn > 0) || (n.id === HUB.id && hubOn > 0) || (n.id === TWO.id && twoOn > 0) ? C.orange : undefined;
    const badgeOp = (n.id === FOCUS.id ? ramp(t, m.focusAvg, 0.4) : ramp(t, m.all + NODES.indexOf(n) * 0.05, 0.3)) * badgesOut;
    return { r: rOf(n), fill, ring, op: appear * (1 - 0.7 * dimOf(n.id)), num: ramp(t, m.deg, 0.4), badge: fmt(n.friends_mean), badgeOp };
  };
  const hot = (a: Node, b: Node) => (focusOn > 0 && (a.id === FOCUS.id || b.id === FOCUS.id)) || (hubOn > 0 && (a.id === HUB.id || b.id === HUB.id)) || (twoOn > 0 && (a.id === TWO.id || b.id === TWO.id));
  const es = (a: Node, b: Node): ES => {
    const i = EDGES.findIndex(([x, y]) => x === a.id && y === b.id);
    return { stroke: hot(a, b) ? C.orange : EDGE_C, w: hot(a, b) ? 5 : 3, op: (1 - 0.8 * Math.max(dimOf(a.id), dimOf(b.id))) * (t < m.edges ? 0.18 : 1), k: t < m.edges ? 1 : ramp(t, m.edges + i * 0.03, 0.5) };
  };
  // copies flying into friend lists: the hub's 11, the 2-friend person's 2, then everyone's at once
  const fly = (from: Node, t0: number) => friendsOf(from.id).map((f, i) => {
    const k = ramp(t, t0 + i * 0.08, 0.7, easeInOut);
    const to = node(f);
    return <circle key={`${from.id}-${f}`} cx={lerp(from.x, to.x, k * 0.82)} cy={lerp(from.y, to.y, k * 0.82)} r={9} fill={C.orange} stroke={C.bg} strokeWidth={2} opacity={k > 0 ? 1 : 0} />;
  });
  const everyone = ramp(t, m.all2 + 0.3, 1.0, easeInOut);
  const counters = ramp(t, m.mean, 0.4) * (1 - ramp(t, m.fewer - 0.2, 0.4));
  const tally = ramp(t, m.fewer, 0.4) * (1 - ramp(t, m.hub - 0.3, 0.4));
  return (
    <Backdrop>
      <NetDraw ns={ns} es={es}>
        {/* the focus person's friends' counts fly into its badge, which then shows their average */}
        {focusOn > 0 ? friendsOf(FOCUS.id).map((f, i) => {
          const k = ramp(t, m.focus + 0.5 + i * 0.3, 0.9, easeInOut);
          const F = node(f);
          return k > 0 && k < 1 ? <text key={`fn-${f}`} x={lerp(F.x, FOCUS.x + 47, k)} y={lerp(F.y + 10, FOCUS.y - 32, k)} textAnchor="middle" fontFamily={FONT} fontSize={34} fontWeight={900} fill={C.orange} stroke={C.bg} strokeWidth={1.5}>{F.degree}</text> : null;
        }) : null}
        {hubOn > 0 ? fly(HUB, m.hubFly) : null}
        {twoOn > 0 ? fly(TWO, m.twoFly) : null}
        {everyone > 0 && everyone < 1 ? EDGES.flatMap(([a, b], i) => [[a, b], [b, a]].map(([x, y]) => (
          <circle key={`e${i}-${x}`} cx={lerp(node(x).x, node(y).x, everyone)} cy={lerp(node(x).y, node(y).y, everyone)} r={7} fill={C.orange} />
        ))) : null}
      </NetDraw>
      <div style={{ position: "absolute", left: 140, width: 728, top: 560, height: 130, borderRadius: 24, background: "rgba(14,15,18,0.78)", opacity: titleOn }} />
      <Title text="Ընկերության պարադոքս" on={titleOn} y={590} size={58} />
      <SourceLine text="Feld, 1991" on={titleOn} />
      <Tag text={`միջինը՝ ${fmt(SUM.mean_friends)}`} x={504} y={225} size={40} opacity={counters} />
      <Tag text={`ընկերների միջինը՝ ${fmt(Number(SUM.mean_of_friends_means.toFixed(1)))}`} x={504} y={1040} size={40} color={C.orange} opacity={counters * ramp(t, m.result, 0.4)} />
      <Tag text={`ավելի քիչ՝ ${SUM.fewer_than_friends}`} x={330} y={225} size={42} color="#E8585F" opacity={tally} width={420} />
      <Tag text={`ավելի շատ՝ ${SUM.more_than_friends}`} x={700} y={225} size={42} color={C.orange} opacity={tally * ramp(t, m.more, 0.4)} width={420} />
      <Tag text={`×${HUB.degree}`} x={HUB.x + 120} y={HUB.y - 70} size={60} weight={900} color={C.orange} opacity={hubOn * ramp(t, m.hubFly + 1.4, 0.4)} width={200} />
      <Tag text={`×${TWO.degree}`} x={TWO.x + 70} y={TWO.y - 70} size={60} weight={900} color={C.orange} opacity={twoOn * ramp(t, m.twoFly + 0.8, 0.4)} width={200} />
    </Backdrop>
  );
};

// ---------- facebook: zoom out to a huge network, 93% ----------
const BIG = (() => {
  const pts = Array.from({ length: 460 }, (_, i) => ({ x: 20 + random(`fb-x-${i}`) * 1040, y: 180 + random(`fb-y-${i}`) * 940 }));
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  pts.forEach((p, i) => {
    pts.map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 })).filter((o) => o.j !== i).sort((a, b) => a.d - b.d).slice(0, 3).forEach((o) => {
      const key = i < o.j ? `${i}-${o.j}` : `${o.j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, o.j]);
      }
    });
  });
  return { pts, edges };
})();
const Facebook: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const z = ramp(t, 0, 2.6, easeInOut);
  const big = 1 + 2 * (1 - z);
  const n93 = Math.min(1, pop(t, m.n93));
  const bar = ramp(t, m.n93 + 0.3, 1.0, easeInOut);
  const plain = (n: Node): NS => ({ r: 24, fill: n.fewer ? "#B8323A" : C.orange, op: 1, num: 1 });
  const line = (): ES => ({ stroke: EDGE_C, w: 3, op: 1 });
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: 0.55 * z * (1 - 0.45 * n93) }}>
        <g transform={`translate(504 655) scale(${big}) translate(-504 -655)`}>
          {BIG.edges.map(([a, b], i) => <line key={i} x1={BIG.pts[a].x} y1={BIG.pts[a].y} x2={BIG.pts[b].x} y2={BIG.pts[b].y} stroke="rgba(216,220,227,0.35)" strokeWidth={1.5} />)}
          {BIG.pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill={random(`fb-c-${i}`) < 0.927 ? "#B8323A" : C.orange} />)}
        </g>
      </svg>
      <NetDraw ns={plain} es={line} scale={lerp(1, 0.22, z)} opacity={1 - ramp(t, 1.6, 0.8)} />
      <Tag text="721 միլիոն օգտատեր" x={504} y={225} size={44} opacity={ramp(t, m.users, 0.4)} />
      <Tag text="93%" x={504} y={600} size={190} weight={900} color="#FF6A70" opacity={n93} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: ramp(t, m.n93 + 0.2, 0.3) }}>
        <rect x={140} y={790} width={740} height={56} rx={12} fill="rgba(255,255,255,0.08)" />
        <rect x={140} y={790} width={740 * 0.927 * bar} height={56} rx={12} fill="#B8323A" />
        <rect x={140 + 740 * 0.927} y={790} width={740 * 0.073 * bar} height={56} rx={0} fill={C.orange} />
      </svg>
      <SourceLine text="Ugander et al., 2011" on={ramp(t, 0.4, 0.5)} />
    </Backdrop>
  );
};

// ---------- flu: friends get sick about two weeks earlier (a sketch of the curves, not the paper's data) ----------
const Flu: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const intro = ramp(t, 0.1, 0.4) * (1 - ramp(t, m.harvard - 0.3, 0.4)); // 'the paradox is useful': the network, the hub lit
  const groups = ramp(t, m.harvard, 0.4) * (1 - ramp(t, m.chart - 0.3, 0.4));
  const rowLabel = ramp(t, m.groups, 0.4);
  const named = ramp(t, m.named, 0.5);
  const chart = ramp(t, m.chart, 0.4);
  const draw = ramp(t, m.chart + 0.2, 2.2, easeInOut);
  const gap = ramp(t, m.weeks, 0.5);
  const X0 = 150, X1 = 900, Y0 = 880, Y1 = 400;
  const curve = (c: number) => Array.from({ length: 61 }, (_, i) => {
    const x = i / 60;
    const y = 1 / (1 + Math.exp(-(x - c) / 0.07));
    return `${i ? "L" : "M"} ${lerp(X0, X1, x).toFixed(1)} ${lerp(Y0, Y1, y).toFixed(1)}`;
  }).join(" ");
  const cF = 0.42, cR = 0.42 + 14 / 84; // 12 weeks on the axis, friends 14 days earlier
  return (
    <Backdrop>
      {intro > 0 ? <NetDraw ns={(n) => ({ r: 24, fill: n.id === HUB.id ? C.orange : BASE_FILL, op: n.id === HUB.id ? 1 : 0.5, num: 1 })} es={() => ({ stroke: EDGE_C, w: 3, op: 0.5 })} opacity={intro} /> : null}
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: groups }}>
        {Array.from({ length: 7 }, (_, i) => {
          const x = 200 + i * 100;
          return (
            <g key={i}>
              <circle cx={x} cy={480} r={22} fill={BASE_FILL} stroke="#D8DCE3" strokeWidth={3} />
              <g opacity={named}>
                <line x1={x} y1={506} x2={x + 20} y2={612} stroke={C.orange} strokeWidth={4} />
                <circle cx={x + 24} cy={640} r={24} fill={C.orange} />
              </g>
            </g>
          );
        })}
      </svg>
      <Tag text="պատահական" x={504} y={400} size={38} opacity={groups * rowLabel} />
      <Tag text="նրանց ընկերները" x={504} y={720} size={38} color={C.orange} opacity={groups * named} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: chart }}>
        <line x1={X0} y1={Y0} x2={X1 + 20} y2={Y0} stroke={C.dim} strokeWidth={3} />
        <line x1={X0} y1={Y0} x2={X0} y2={Y1 - 30} stroke={C.dim} strokeWidth={3} />
        <defs>
          <clipPath id="fl-draw">
            <rect x={X0} y={0} width={(X1 - X0) * draw + 4} height={1920} />
          </clipPath>
        </defs>
        <g clipPath="url(#fl-draw)">
          <path d={curve(cR)} fill="none" stroke="#AEB4BF" strokeWidth={7} />
          <path d={curve(cF)} fill="none" stroke={C.orange} strokeWidth={7} />
        </g>
        <g opacity={gap}>
          <line x1={lerp(X0, X1, cF)} y1={lerp(Y0, Y1, 0.5)} x2={lerp(X0, X1, cR)} y2={lerp(Y0, Y1, 0.5)} stroke={C.ink} strokeWidth={4} />
          <path d={`M ${lerp(X0, X1, cR) - 14} ${lerp(Y0, Y1, 0.5) - 10} L ${lerp(X0, X1, cR)} ${lerp(Y0, Y1, 0.5)} L ${lerp(X0, X1, cR) - 14} ${lerp(Y0, Y1, 0.5) + 10}`} fill="none" stroke={C.ink} strokeWidth={4} />
        </g>
      </svg>
      <Tag text="ընկերներ" x={lerp(X0, X1, cF) - 90} y={Y1 + 60} size={32} color={C.orange} opacity={chart * ramp(t, m.chart + 1.0, 0.4)} width={300} />
      <Tag text="պատահական" x={lerp(X0, X1, cR) + 150} y={lerp(Y0, Y1, 0.28)} size={32} color="#AEB4BF" opacity={chart * ramp(t, m.chart + 1.6, 0.4)} width={300} />
      <Tag text="≈14 օր" x={lerp(X0, X1, (cF + cR) / 2)} y={lerp(Y0, Y1, 0.5) + 44} size={40} opacity={chart * gap} width={300} />
      <Tag text="ժամանակ" x={X1 - 60} y={Y0 + 40} size={28} weight={650} color={C.dim} opacity={chart} width={300} />
      <Tag text="նկարազարդում" x={X1 - 80} y={Y0 + 90} size={22} weight={650} color={C.dim} opacity={chart} width={300} />
      <SourceLine text="Christakis & Fowler, 2010" on={ramp(t, m.harvard, 0.5)} />
    </Backdrop>
  );
};

// ---------- vaccine: random people vs a random friend of each ----------
// the chance that "a random friend of a random person" is v: (1/n) * sum over v's friends u of 1/deg(u)
const P_FRIEND = new Map(NODES.map((v) => [v.id, friendsOf(v.id).reduce((acc, u) => acc + 1 / node(u).degree, 0) / NODES.length]));
const Vaccine: React.FC<{ m: Record<string, number> }> = ({ m }) => {
  const t = useT();
  const uni = ramp(t, m.random, 0.5);
  const go = ramp(t, m.friend, 1.4, easeInOut);
  const nums = ramp(t, m.result, 0.4);
  const halo = (v: Node) => lerp(24 + 260 / NODES.length, 24 + 260 * (P_FRIEND.get(v.id) ?? 0), go);
  const ns = (): NS => ({ r: 24, fill: BASE_FILL, op: ramp(t, 0, 0.4), num: 1 });
  const es = (): ES => ({ stroke: EDGE_C, w: 3, op: 0.8 });
  return (
    <Backdrop>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: uni }}>
        {NODES.map((v) => <circle key={v.id} cx={v.x} cy={v.y} r={halo(v)} fill={go > 0.5 ? "rgba(242,168,0,0.38)" : "rgba(174,180,191,0.30)"} />)}
      </svg>
      <NetDraw ns={ns} es={es} />
      <Tag text={`պատահական մարդ՝ ${fmt(SUM.mean_friends)} ընկեր`} x={504} y={225} size={36} color="#AEB4BF" opacity={nums} />
      <Tag text={`պատահական ընկեր՝ ${fmt(Number(SUM.mean_of_friends_means.toFixed(1)))} ընկեր`} x={504} y={1040} size={36} color={C.orange} opacity={nums} />
    </Backdrop>
  );
};

// ---------- takeaway ----------
const Takeaway: React.FC = () => {
  const t = useT();
  const ns = (n: Node): NS => ({ r: 10 + 4 * n.degree, fill: n.id === HUB.id ? C.orange : BASE_FILL, op: 0.35 + (n.id === HUB.id ? 0.5 + 0.15 * Math.sin(t * 5) : 0) });
  const es = (): ES => ({ stroke: EDGE_C, w: 3, op: 0.35 });
  return (
    <Backdrop glow="rgba(242,168,0,0.12)">
      <NetDraw ns={ns} es={es} />
      <Title text={<>Ամենաշատ ընկեր ունեցողներին <span style={{ color: C.orange }}>բոլորն են հաշվում</span></>} on={ramp(t, 0.3, 0.6)} y={210} size={50} />
    </Backdrop>
  );
};

type G = { keys: string[]; render: () => React.ReactNode };
const GROUPS: G[] = [
  { keys: ["hook"], render: () => <Hook m={{ avg: S.at("hook", "միջինում"), you: S.at("hook", "դու") }} /> },
  { keys: ["name", "network", "friends_avg", "count", "why"], render: () => {
    const g0 = S.beat("name").start;
    const r = (k: string, w: string, nth?: number) => rel(g0, S.at(k, w, nth));
    return <Network m={{
      pop: r("network", "քսան"), edges: r("network", "Գծերն"), deg: r("network", "Միջինում"), mean: r("network", "չորսից"),
      focus: r("friends_avg", "հաշվենք"), focusAvg: r("friends_avg", "միջինում"), all: r("friends_avg", "ունեն"), result: r("friends_avg", "Ստացվում"),
      fewer: r("count", "տասնյոթն"), more: r("count", "Ավելի"),
      hub: r("why", "Նայիր"), hubFly: r("why", "տասնմեկ", 1), two: r("why", "Իսկ"), twoFly: r("why", "ընդամենը"), all2: r("why", "Երբ"), big: r("why", "ունեցողներին"),
    }} />;
  } },
  { keys: ["facebook"], render: () => {
    const g0 = S.beat("facebook").start;
    return <Facebook m={{ users: rel(g0, S.at("facebook", "721")), n93: rel(g0, S.at("facebook", "93")) }} />;
  } },
  { keys: ["flu"], render: () => {
    const g0 = S.beat("flu").start;
    return <Flu m={{ harvard: rel(g0, S.at("flu", "Հարվարդում")), groups: rel(g0, S.at("flu", "պատահական")), named: rel(g0, S.at("flu", "նշած")), chart: rel(g0, S.at("flu", "Ընկերների")), weeks: rel(g0, S.at("flu", "երկու", 1)) }} />;
  } },
  { keys: ["vaccine"], render: () => {
    const g0 = S.beat("vaccine").start;
    return <Vaccine m={{ random: rel(g0, S.at("vaccine", "պատահական", 0)), friend: rel(g0, S.at("vaccine", "պատահական", 1)), result: rel(g0, S.at("vaccine", "Այդպես")) }} />;
  } },
  { keys: ["takeaway"], render: () => <Takeaway /> },
];

export const Friendship: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g) => {
      const from = Math.round(S.beat(g.keys[0]).start * FR_FPS);
      const len = Math.round(S.slotEnd(g.keys[g.keys.length - 1], TAIL_S) * FR_FPS) - from;
      return (
        <Sequence key={g.keys[0]} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render()}
        </Sequence>
      );
    })}
    <PortraitCaptions pages={S.pages} end={S.duration + TAIL_S} />
    <Audio src={staticFile(`friendship/${S.audio}`)} />
  </AbsoluteFill>
);
