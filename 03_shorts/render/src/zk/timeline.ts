// Loading a synced timeline (render/sync_short.py) for a composition, with the checks from the Codex review:
// the data is validated before anything is drawn (X9), the audio is the file the timeline names (X10), and a cue
// word must be unique unless its occurrence is given (X11).
export type Word = { w: string; start: number; end: number };
export type Page = { text: string; start: number; end: number; words: Word[]; size: number };
export type Beat = { key: string; start: number; end: number; words: Word[]; pages: Page[]; pause_after?: number };
type Raw = { beats: Beat[]; duration: number; audio: string; layout?: string; build?: { id: string } };

export const loadTimeline = (raw: unknown, name: string, layout: "landscape" | "portrait") => {
  const tl = raw as Raw;
  const fail = (why: string): never => {
    throw new Error(`${name} timeline: ${why} (rebuild: tools/build_timeline.py ${name}, then render/sync_short.py ${name})`);
  };
  const num = (x: unknown) => typeof x === "number" && Number.isFinite(x);
  if (!tl || !Array.isArray(tl.beats) || tl.beats.length === 0) fail("no beats");
  if (!num(tl.duration)) fail("no duration");
  if (typeof tl.audio !== "string" || !/^narration_[\w-]+\.wav$/.test(tl.audio)) fail(`audio "${tl.audio}" is not a synced build`);
  if (tl.layout !== layout) fail(`layout is ${tl.layout}, this composition needs ${layout} captions`);
  let prev = 0;
  for (const b of tl.beats) {
    if (!num(b.start) || !num(b.end) || b.start > b.end || b.start < prev - 1e-6) fail(`beat ${b.key} has bad times`);
    prev = b.end;
    for (const w of b.words) if (!num(w.start) || !num(w.end) || w.start < b.start - 1e-6 || w.end > b.end + 1e-6) fail(`word ${w.w} in ${b.key} is outside its beat`);
    for (const pg of b.pages) if (!num(pg.size) || !(pg.size > 0)) fail(`a page in ${b.key} has no size`);
  }
  const beat = (key: string): Beat => tl.beats.find((x) => x.key === key) ?? fail(`beat ${key} is not in the timeline`);
  // absolute time of the word of `key` that starts with `prefix` (after leading quotes); fails when it is missing, or
  // when several words match and no occurrence `nth` (0-based) is given
  const at = (key: string, prefix: string, nth?: number): number => {
    const hits = beat(key).words.filter((x) => x.w.replace(/^[«"(]+/, "").startsWith(prefix));
    if (hits.length === 0) fail(`no word starting with "${prefix}" in beat ${key}`);
    if (nth === undefined && hits.length > 1) fail(`"${prefix}" matches ${hits.length} words in beat ${key}; pass which one`);
    const w = hits[nth ?? 0] ?? fail(`"${prefix}" has no occurrence ${nth} in beat ${key}`);
    return w.start;
  };
  const slotEnd = (key: string, tail: number) => {
    const i = tl.beats.findIndex((b) => b.key === key);
    return i + 1 < tl.beats.length ? tl.beats[i + 1].start : tl.duration + tail;
  };
  return { beats: tl.beats, duration: tl.duration, audio: tl.audio, pages: tl.beats.flatMap((b) => b.pages), beat, at, slotEnd };
};
