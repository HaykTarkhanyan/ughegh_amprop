// Every composition of the series. The zero-knowledge demos and the long video are 1920 x 1080 (DECISIONS #23); the
// Short is 1080 x 1920 (ZkShort, Codex review X59);
// their phase times are defaults until Hayk's narration gives the real beat times.
import React from "react";
import { Composition } from "remotion";
import "./theme";
import { BALLS_T, BallsScene } from "./zk/Balls";
import { DECK_T, DeckScene } from "./zk/Deck";
import { LONG_FPS, LONG_FRAMES, ZkLong } from "./zk/Long";
import { DECOY_FPS, DECOY_FRAMES, Decoy } from "./series/Decoy";
import { OV_FPS, OV_FRAMES, OwnVoice } from "./series/OwnVoice";
import { SHORT_FPS, SHORT_FRAMES, ZkShort } from "./zk/Short";
import { WALDO_T, WaldoScene } from "./zk/Waldo";

const FPS = 30;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ZkDeck" component={DeckScene} durationInFrames={Math.round(DECK_T.end * FPS)} fps={FPS} width={1920} height={1080} />
    <Composition id="ZkBalls" component={BallsScene} durationInFrames={Math.round(BALLS_T.end * FPS)} fps={FPS} width={1920} height={1080} />
    <Composition id="ZkWaldo" component={WaldoScene} durationInFrames={Math.round(WALDO_T.end * FPS)} fps={FPS} width={1920} height={1080} />
    <Composition id="ZkLong" component={ZkLong} durationInFrames={LONG_FRAMES} fps={LONG_FPS} width={1920} height={1080} />
    <Composition id="ZkShort" component={ZkShort} durationInFrames={SHORT_FRAMES} fps={SHORT_FPS} width={1080} height={1920} />
    <Composition id="OwnVoice" component={OwnVoice} durationInFrames={OV_FRAMES} fps={OV_FPS} width={1080} height={1920} />
    <Composition id="Decoy" component={Decoy} durationInFrames={DECOY_FRAMES} fps={DECOY_FPS} width={1080} height={1920} />
  </>
);
