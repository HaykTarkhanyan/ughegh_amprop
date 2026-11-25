// The pilot short: 9 scenes timed from the shared timeline, word-by-word captions, the narration track.
import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill, cancelRender, Composition, continueRender, delayRender, interpolate, Sequence, staticFile,
  useCurrentFrame, useVideoConfig,
} from "remotion";
import { C, DATA, FONT, V2 } from "./data";
import { BigKaraoke, Dropouts, Hook, More, Name, Outro, Reveal, Wald, WaldAnswer } from "./scenes";

// Load the Armenian font before any frame is captured.
const fontHandle = delayRender("Loading Noto Sans Armenian");
const face = new FontFace("NotoArm", `url(${staticFile("NotoSansArmenian-Variable.ttf")}) format("truetype")`, { weight: "100 900" });
face.load().then((f) => { document.fonts.add(f); continueRender(fontHandle); }).catch((err) => cancelRender(err));

const TL = DATA.timeline;
const FPS = TL.fps;
const TAIL_S = 1.2; // the closing line stays on screen at least 2 s
const NO_CAPTIONS = new Set(["name", "lesson"]);

type SceneProps = { t: number; dur: number; fps: number };
const SCENES: Record<string, React.FC<SceneProps>> = {
  hook: Hook,
  reveal: Reveal,
  name: Name,
  wald: Wald,
  wald_answer: WaldAnswer,
  more: More,
  dropouts: Dropouts,
  lesson: (p) => <BigKaraoke {...p} beatKey="lesson" top={470} size={72} />,
  outro: Outro,
};

const Scene: React.FC<{ comp: React.FC<SceneProps>; dur: number }> = ({ comp: Comp, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return <Comp t={frame / fps} dur={dur} fps={fps} />;
};

const PAGES = TL.beats.flatMap((b) => b.pages.map((p) => ({ ...p, beat: b.key })));

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const idx = PAGES.findIndex((p, i) => t >= p.start - 0.05 && t < (PAGES[i + 1] ? Math.min(PAGES[i + 1].start - 0.05, p.end + 0.4) : TL.duration + TAIL_S - 0.35)); // the last line fades before the loop restarts
  if (idx < 0 || NO_CAPTIONS.has(PAGES[idx].beat)) return null;
  const page = PAGES[idx];
  const pop = interpolate(t, [page.start - 0.05, page.start + 0.08], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (V2) {
    // v2 (2026-11-25, Hayk: captions too central): lower, smaller, lighter, a soft shadow instead of the outline
    return (
      <div style={{ position: "absolute", left: 130, width: 650, bottom: 1920 - 1245, textAlign: "center", opacity: pop, translate: `0px ${(1 - pop) * 10}px` }}>
        {page.words.map((w, i) => {
          const now = t >= w.start && t < w.end;
          return (
            <span key={i} style={{
              display: "inline-block", margin: "0 10px", fontFamily: FONT, fontSize: Math.round(page.size * 0.82), fontWeight: 650, lineHeight: 1.2,
              color: now ? C.orange : C.ink, textShadow: "0 2px 3px rgba(0,0,0,0.9), 0 4px 22px rgba(0,0,0,0.85)",
            }}>{w.w}</span>
          );
        })}
      </div>
    );
  }
  return (
    <div style={{ position: "absolute", left: 140, width: 640, bottom: 1920 - 1200, textAlign: "center", opacity: pop, scale: String(0.92 + 0.08 * pop) }}>
      {page.words.map((w, i) => {
        const now = t >= w.start && t < w.end;
        return (
          <span key={i} style={{
            display: "inline-block", margin: "0 16px", fontFamily: FONT, fontSize: page.size, fontWeight: 800, lineHeight: 1.18,
            color: now ? C.orange : C.ink, WebkitTextStroke: `10px ${C.bg}`, paintOrder: "stroke fill",
            scale: now ? "1.04" : "1", // a bigger zoom plus the 10 px outline ate the space between words
          }}>{w.w}</span>
        );
      })}
    </div>
  );
};

export const Pilot: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {TL.beats.map((b, i) => {
      const next = TL.beats[i + 1]?.start ?? TL.duration + TAIL_S;
      const from = Math.round(b.start * FPS);
      const len = Math.round(next * FPS) - from;
      const comp = SCENES[b.key];
      if (!comp) throw new Error(`no scene for beat ${b.key}`);
      return (
        <Sequence key={b.key} name={b.key} from={from} durationInFrames={len}>
          <Scene comp={comp} dur={len / FPS} />
        </Sequence>
      );
    })}
    <Captions />
    <Audio src={staticFile("narration.wav")} />
  </AbsoluteFill>
);

export const PilotComposition: React.FC = () => (
  <Composition id="Pilot" component={Pilot} durationInFrames={Math.ceil((TL.duration + TAIL_S) * FPS)} fps={FPS} width={1080} height={1920} />
);
