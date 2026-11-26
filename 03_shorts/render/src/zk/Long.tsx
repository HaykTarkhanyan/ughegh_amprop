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
import { loadTimeline } from "./timeline";
import { WALDO_T, WaldoScene, WaldoTimes } from "./Waldo";

const TLX = loadTimeline(TL, "zero_knowledge", "landscape");
const DURATION = TLX.duration;
export const LONG_FPS = 30;
const TAIL_S = 1.5;
export const LONG_FRAMES = Math.ceil((DURATION + TAIL_S) * LONG_FPS);

const beat = TLX.beat;
const at = TLX.at;
const slotEnd = (key: string) => TLX.slotEnd(key, TAIL_S);

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
        opaque: rel(g0, at("waldo_trick", "Հիմա")) - 0.5,
        look: rel(g0, at("waldo_trick", "Հիմա")) + 0.3,
        zoom: rel(g0, z.start) + 0.2,
        leak: rel(g0, at("waldo_zero", "Երևում")),
        anywhere: rel(g0, at("waldo_zero", "ստվարաթուղթը")),
        verdict: rel(g0, at("waldo_zero", "ուստի")) + 0.4,
        end: dur,
      };
      return <WaldoScene T={T} />;
    },
  },
  {
    keys: ["card"], render: (dur) => {
      const g0 = beat("card").start;
      const deal = rel(g0, at("card", "Մնացած")) + 0.4;
      const verdict = rel(g0, at("card", "Եթե"));
      const T: DeckTimes = {
        ...DECK_T,
        full: rel(g0, at("card", "Լրիվ")), draw: rel(g0, at("card", "քաշում")) - 0.3, claim: rel(g0, at("card", "Կարմիր", 0)),
        deal, dealStep: Math.max(0.04, (verdict - deal - 0.9) / 51), hide: rel(g0, at("card", "Կարմիրները")),
        verdict, which: rel(g0, at("card", "Ընկերդ")), end: dur,
      };
      return <DeckScene T={T} />;
    },
  },
  {
    keys: ["balls", "balls_logic"], render: (dur) => {
      const g0 = beat("balls").start;
      // the round counter reaches 1, 2, 10 and 20 exactly when the narration says so
      const T: BallsTimes = {
        ...BALLS_T, intro: 0.2, r1: rel(g0, at("balls", "Նա")), fast: rel(g0, at("balls_logic", "Մեկ")),
        two: rel(g0, at("balls_logic", "Երկու")), ten: rel(g0, at("balls_logic", "տասը")), twenty: rel(g0, at("balls_logic", "քսան")), end: dur,
      };
      return <BallsScene T={T} />;
    },
  },
  {
    keys: ["why_zero"], render: (dur) => {
      const g0 = beat("why_zero").start;
      const fake = rel(g0, at("why_zero", "Այն"));
      return <FakeVideoScene dur={dur} m={{ knew: rel(g0, at("why_zero", "Ամեն")), only: rel(g0, at("why_zero", "Ուրեմն")), which: rel(g0, at("why_zero", "Թե")), film: rel(g0, at("why_zero", "Դրա")), fake, same: Math.min(dur - 1.5, fake + 3.2) }} />;
    },
  },
  {
    keys: ["real"], render: (dur) => {
      const g0 = beat("real").start;
      return <RealScene dur={dur} m={{ fast: rel(g0, at("real", "Ռաունդներն")), bank: rel(g0, at("real", "Հոլանդական")), eu: rel(g0, at("real", "Եվրոպական")), signed: rel(g0, at("real", "Այստեղ")), crypto: rel(g0, at("real", "Իսկ")) }} />;
    },
  },
  {
    keys: ["gossip_close"], render: (dur) => {
      const g0 = beat("gossip_close").start;
      return <GossipCloseScene dur={dur} m={{ type: rel(g0, at("gossip_close", "Որոշ")), match: rel(g0, at("gossip_close", "ծրագիրն")), guess: rel(g0, at("gossip_close", "Միայն")) }} />;
    },
  },
  { keys: ["takeaway"], render: (dur) => <TakeawayScene dur={dur} /> },
];

// word-by-word captions, centred at the bottom of the 16:9 frame; page grouping and size come from the landscape
// profile in tools/build_timeline.py (box 1500 px, 46 px, weight 650), which checks that every page fits
const PAGES = TLX.pages;
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
          <span key={k} style={{ display: "inline-block", margin: "0 9px", fontFamily: FONT, fontSize: page.size, fontWeight: 650, lineHeight: 1.2, color: now ? C.orange : C.ink, textShadow: "0 2px 3px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.85)" }}>{w.w}</span>
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
    {/* the audio this timeline was built with (render/sync_short.py names it after the build) */}
    <Audio src={staticFile(`zero_knowledge/${TLX.audio}`)} />
  </AbsoluteFill>
);
