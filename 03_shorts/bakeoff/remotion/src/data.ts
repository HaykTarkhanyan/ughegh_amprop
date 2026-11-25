// Shared inputs (written by ../sync_assets.py) and the look of the pilot short.
import raw from "./data.json";

export type Word = { w: string; start: number; end: number };
export type Page = { text: string; start: number; end: number; words: Word[]; size: number }; // size: px, fits 2 lines
export type Beat = {
  key: string;
  text: string;
  screen?: string;
  screen_small?: string;
  start: number;
  end: number;
  words: Word[];
  pages: Page[];
};
export type Dot = { x: number; y: number; r: number };
type Data = {
  timeline: { fps: number; width: number; height: number; duration: number; beats: Beat[] };
  labels: Record<string, string>;
  dots: Dot[];
  bomber_aspect: number;
};

export const DATA = raw as unknown as Data;
export const L = DATA.labels;

// New look for the shorts (not the webinar branding): near-black, warm white, flag orange for "survived".
export const C = {
  bg: "#0E0F12",
  ink: "#F4F1EA",
  muted: "#8A8F98",
  orange: "#F2A800",
  red: "#E8383D",
  card: "#F4F1EA",
  grey: "#3A3E46",
};
export const FONT = "NotoArm, sans-serif";

export const beat = (key: string): Beat => {
  const b = DATA.timeline.beats.find((x) => x.key === key);
  if (!b) throw new Error(`no beat ${key}`);
  return b;
};

// Seconds from the start of a beat to the first word that starts with `prefix` (quotes ignored).
export const at = (key: string, prefix: string): number => {
  const b = beat(key);
  const w = b.words.find((x) => x.w.replace(/[«»]/g, "").startsWith(prefix));
  if (!w) throw new Error(`no word "${prefix}" in beat ${key}`);
  return w.start - b.start;
};
