// Every composition of the series. The zero-knowledge demos and the long video are 1920 x 1080 (DECISIONS #23); the
// Short is 1080 x 1920 (ZkShort, Codex review X59);
// their phase times are defaults until Hayk's narration gives the real beat times.
import React from "react";
import { Composition } from "remotion";
import "./theme";
import { BALLS_T, BallsScene } from "./zk/Balls";
import { DECK_T, DeckScene } from "./zk/Deck";
import { LONG_FPS, LONG_FRAMES, ZkLong } from "./zk/Long";
import { BAYES_FPS, BAYES_FRAMES, Bayes } from "./series/Bayes";
import { DECOY_FPS, DECOY_FRAMES, Decoy } from "./series/Decoy";
import { FR_FPS, FR_FRAMES, Friendship } from "./series/Friendship";
import { MAP_FPS, MAP_FRAMES, MapProjection } from "./series/MapProjection";
import { OV_FPS, OV_FRAMES, OwnVoice } from "./series/OwnVoice";
import { PS_FPS, PS_FRAMES, PaintedStatues } from "./series/PaintedStatues";
import { PETROV_FPS, PETROV_FRAMES, Petrov } from "./series/Petrov";
import { ES_FPS, ES_FRAMES, EnglishSpelling } from "./series/EnglishSpelling";
import { CP_FPS, CP_FRAMES, CryptoPaint } from "./series/CryptoPaint";
import { YAWN_FPS, YAWN_FRAMES, Yawning } from "./series/Yawning";
import { WEEK_FPS, WEEK_FRAMES, WeekSeven } from "./series/WeekSeven";
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
    <Composition id="MapProjection" component={MapProjection} durationInFrames={MAP_FRAMES} fps={MAP_FPS} width={1080} height={1920} />
    <Composition id="Friendship" component={Friendship} durationInFrames={FR_FRAMES} fps={FR_FPS} width={1080} height={1920} />
    <Composition id="PaintedStatues" component={PaintedStatues} durationInFrames={PS_FRAMES} fps={PS_FPS} width={1080} height={1920} />
    <Composition id="Petrov" component={Petrov} durationInFrames={PETROV_FRAMES} fps={PETROV_FPS} width={1080} height={1920} />
    <Composition id="EnglishSpelling" component={EnglishSpelling} durationInFrames={ES_FRAMES} fps={ES_FPS} width={1080} height={1920} />
    <Composition id="CryptoPaint" component={CryptoPaint} durationInFrames={CP_FRAMES} fps={CP_FPS} width={1080} height={1920} />
    <Composition id="Yawning" component={Yawning} durationInFrames={YAWN_FRAMES} fps={YAWN_FPS} width={1080} height={1920} />
    <Composition id="WeekSeven" component={WeekSeven} durationInFrames={WEEK_FRAMES} fps={WEEK_FPS} width={1080} height={1920} />
    <Composition id="Bayes" component={Bayes} durationInFrames={BAYES_FRAMES} fps={BAYES_FPS} width={1080} height={1920} />
  </>
);
