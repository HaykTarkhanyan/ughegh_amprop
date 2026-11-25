// The long zero-knowledge video (16:9): every beat's scene placed on the narration's timeline, key moments tied to
// the words that are spoken, word-by-word captions centred at the bottom, and the narration track.
// The timeline comes from tools/build_timeline.py via render/sync_short.py (now: the temporary guide voice; later:
// Hayk's recording, DECISIONS #23).
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import TL from "../data/zero_knowledge.json";
import { C, FONT } from "../theme";
import { BALLS_T, BallsScene, BallsTimes } from "./Balls";
import { DECK_T, DeckScene, DeckTimes } from "./Deck";
import { FakeVideoScene, GossipCloseScene, GossipScene, ProblemsScene, RealScene, TakeawayScene, TitleScene } from "./Story";
import { WALDO_T, WaldoScene, WaldoTimes } from "./Waldo";

type Word = { w: string; start: number; end: number };
type Page = { text: string; start: number; end: number; words: Word[]; size: number };
type Beat = { key: string; start: number; end: number; words: Word[]; pages: Page[]; pause_after?: number };
const BEATS = (TL as unknown as { beats: Beat[] }).beats;
const DURATION = (TL as unknown as { duration: number }).duration;
export const LONG_FPS = 30;
const TAIL_S = 1.5;
export const LONG_FRAMES = Math.ceil((DURATION + TAIL_S) * LONG_FPS);

const beat = (key: string): Beat => {
  const b = BEATS.find((x) => x.key === key);
  if (!b) throw new Error(`beat ${key} is not in the timeline`);
  return b;
};
// absolute time of the first word of `key` that starts with `prefix` (after leading quotes); fails loudly if missing
const at = (key: string, prefix: string): number => {
  const w = beat(key).words.find((x) => x.w.replace(/^[«"(]+/, "").startsWith(prefix));
  if (!w) throw new Error(`no word starting with "${prefix}" in beat ${key}`);
  return w.start;
};
const slotEnd = (key: string) => {
  const i = BEATS.findIndex((b) => b.key === key);
  return i + 1 < BEATS.length ? BEATS[i + 1].start : DURATION + TAIL_S;
};

// the colour-blind rounds: 19 fast rounds that finish when the narration says "twenty rounds"
const fitRounds = (fast: number, done: number): Pick<BallsTimes, "firstFast" | "minFast" | "shrink"> => {
  const shrink = 0.86, minFast = 0.3, n = 19;
  const total = (f: number) => Array.from({ length: n }, (_, k) => Math.max(minFast, f * Math.pow(shrink, k))).reduce((a, b) => a + b, 0);
  let lo = minFast, hi = 6;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (total(mid) > done - fast) hi = mid; else lo = mid;
  }
  return { firstFast: lo, minFast, shrink };
};

type Group = { keys: string[]; render: (dur: number) => React.ReactNode };
const rel = (g0: number, x: number) => Math.max(0, x - g0);

const GROUPS: Group[] = [
  {
    keys: ["gossip"], render: (dur) => {
      const g0 = beat("gossip").start;
      return <GossipScene dur={dur} m={{ secret: rel(g0, at("gossip", "Դու")), doubt: rel(g0, at("gossip", "Բայց")), spill: rel(g0, at("gossip", "Եթե")), mirror: rel(g0, at("gossip", "Նա")), ask: rel(g0, at("gossip", "Ուրեմն")) }} />;
    },
  },
  {
    keys: ["same_problem"], render: (dur) => {
      const g0 = beat("same_problem").start;
      return <ProblemsScene dur={dur} m={{ site: rel(g0, at("same_problem", "կայքերն")), bank: rel(g0, at("same_problem", "Բանկը")), age: rel(g0, at("same_problem", "Իսկ")) }} />;
    },
  },
  { keys: ["name"], render: (dur) => <TitleScene dur={dur} m={{ name: rel(beat("name").start, at("name", "Մաթեմատիկոսներն")) }} /> },
  {
    keys: ["waldo_setup", "waldo_trick", "waldo_zero"], render: (dur) => {
      const g0 = beat("waldo_setup").start;
      const z = beat("waldo_zero");
      const T: WaldoTimes = {
        ...WALDO_T,
        page: 0.2,
        ref: rel(g0, at("waldo_setup", "Հսկայական")),
        search: rel(g0, at("waldo_setup", "Հսկայական")) + 1.2,
        found: rel(g0, at("waldo_setup", "Դու")),
        sheet: rel(g0, beat("waldo_trick").start) + 0.2,
        sheetDur: Math.max(1.4, at("waldo_trick", "Ստվարաթուղթը") - beat("waldo_trick").start),
        opaque: rel(g0, z.start) - 0.4,
        zoom: rel(g0, z.start) + 0.2,
        anywhere: rel(g0, at("waldo_zero", "Բայց")),
        verdict: rel(g0, at("waldo_zero", "Էջը")) + 1.6,
        end: dur,
      };
      return <WaldoScene T={T} />;
    },
  },
  {
    keys: ["card"], render: (dur) => {
      const g0 = beat("card").start;
      const deal = rel(g0, at("card", "Կապոցի"));
      const gather = rel(g0, at("card", "Եթե"));
      const scan = deal + 2.4;
      const T: DeckTimes = {
        ...DECK_T,
        draw: rel(g0, at("card", "Խառը")), claim: rel(g0, at("card", "Կարմիր")) , deal, flip: deal + 1.9,
        scan, scanStep: Math.max(0.06, (gather - scan - 0.3) / 26), gather,
        verdict: rel(g0, at("card", "ուրեմն")), which: rel(g0, at("card", "Ընկերդ")), end: dur,
      };
      return <DeckScene T={T} />;
    },
  },
  {
    keys: ["balls", "balls_logic"], render: (dur) => {
      const g0 = beat("balls").start;
      const fast = rel(g0, at("balls_logic", "Մեկ"));
      const done = rel(g0, at("balls_logic", "Քսան"));
      const T: BallsTimes = { ...BALLS_T, intro: 0.2, r1: rel(g0, at("balls", "Նա")), fast, ...fitRounds(fast, done), end: dur };
      return <BallsScene T={T} />;
    },
  },
  {
    keys: ["why_zero"], render: (dur) => {
      const g0 = beat("why_zero").start;
      const fake = rel(g0, at("why_zero", "Նույն"));
      return <FakeVideoScene dur={dur} m={{ film: rel(g0, at("why_zero", "Եթե")), fake, same: fake + 4.6, leave: rel(g0, at("why_zero", "Նա")) }} />;
    },
  },
  {
    keys: ["real"], render: (dur) => {
      const g0 = beat("real").start;
      return <RealScene dur={dur} m={{ fast: rel(g0, at("real", "Ռաունդներն")), bank: rel(g0, at("real", "Հոլանդական")), eu: rel(g0, at("real", "Եվրոպական")), crypto: rel(g0, at("real", "իսկ")) }} />;
    },
  },
  {
    keys: ["gossip_close"], render: (dur) => {
      const g0 = beat("gossip_close").start;
      return <GossipCloseScene dur={dur} m={{ type: rel(g0, at("gossip_close", "Որոշ")), match: rel(g0, at("gossip_close", "ծրագիրն")) }} />;
    },
  },
  { keys: ["takeaway"], render: (dur) => <TakeawayScene dur={dur} /> },
];

// word-by-word captions, centred at the bottom of the 16:9 frame
const PAGES = BEATS.flatMap((b) => b.pages);
const Captions16: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const i = PAGES.findIndex((p, k) => t >= p.start - 0.05 && t < (PAGES[k + 1] ? Math.min(PAGES[k + 1].start - 0.05, p.end + 0.5) : DURATION + TAIL_S - 0.3));
  if (i < 0) return null;
  const page = PAGES[i];
  const pop = interpolate(t, [page.start - 0.05, page.start + 0.08], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 210, width: 1500, bottom: 34, textAlign: "center", opacity: pop }}>
      {page.words.map((w, k) => {
        const now = t >= w.start && t < w.end;
        return (
          <span key={k} style={{ display: "inline-block", margin: "0 9px", fontFamily: FONT, fontSize: 46, fontWeight: 650, lineHeight: 1.2, color: now ? C.orange : C.ink, textShadow: "0 2px 3px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.85)" }}>{w.w}</span>
        );
      })}
    </div>
  );
};

export const ZkLong: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {GROUPS.map((g, gi) => {
      const start = beat(g.keys[0]).start;
      const end = slotEnd(g.keys[g.keys.length - 1]);
      const from = Math.round(start * LONG_FPS);
      const len = Math.round(end * LONG_FPS) - from;
      return (
        <Sequence key={gi} name={g.keys.join("+")} from={from} durationInFrames={len}>
          {g.render(len / LONG_FPS)}
        </Sequence>
      );
    })}
    <Captions16 />
    <Audio src={staticFile("zero_knowledge/narration.wav")} />
  </AbsoluteFill>
);
