// Every composition of the series. The zero-knowledge demos are 1920 x 1080 (the long video, DECISIONS #23);
// their phase times are defaults until Hayk's narration gives the real beat times.
import React from "react";
import { Composition } from "remotion";
import "./theme";
import { BALLS_T, BallsScene } from "./zk/Balls";
import { DECK_T, DeckScene } from "./zk/Deck";
import { WALDO_T, WaldoScene } from "./zk/Waldo";

const FPS = 30;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ZkDeck" component={DeckScene} durationInFrames={Math.round(DECK_T.end * FPS)} fps={FPS} width={1920} height={1080} />
    <Composition id="ZkBalls" component={BallsScene} durationInFrames={Math.round(BALLS_T.end * FPS)} fps={FPS} width={1920} height={1080} />
    <Composition id="ZkWaldo" component={WaldoScene} durationInFrames={Math.round(WALDO_T.end * FPS)} fps={FPS} width={1920} height={1080} />
  </>
);
