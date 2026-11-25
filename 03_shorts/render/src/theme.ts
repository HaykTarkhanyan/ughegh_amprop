// Shared look for every video: colours, the Armenian font, easing helpers, deterministic shuffles.
import { cancelRender, continueRender, delayRender, Easing, interpolate, random, staticFile } from "remotion";

export const C = {
  bg: "#0E0F12",
  bg2: "#16181D",
  panel: "#1B1E25",
  ink: "#F4F1EA",
  dim: "#8A8F99",
  grey: "#5A606A",
  orange: "#F2A800",
  red: "#E8383D",
  green: "#3DAA55",
  khaki: "#A89B62", // what a red-green colour-blind viewer sees for both balls
  blue: "#6FA8FF",
};

export const FONT = "NotoArm, 'Noto Sans Armenian', sans-serif";

// Load the Armenian font once, before any frame is captured.
const handle = delayRender("Loading Noto Sans Armenian");
const face = new FontFace("NotoArm", `url(${staticFile("NotoSansArmenian-Variable.ttf")}) format("truetype")`, {
  weight: "100 900",
});
face
  .load()
  .then((f) => {
    document.fonts.add(f);
    continueRender(handle);
  })
  .catch((err) => cancelRender(err));

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

// 0 -> 1 between t0 and t0 + dur (seconds), clamped and eased.
export const ramp = (t: number, t0: number, dur: number, ease = easeOut) =>
  interpolate(t, [t0, t0 + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

// A damped spring 0 -> 1 (overshoots a little) starting at t0, computed in closed form so it is frame-exact.
export const pop = (t: number, t0: number, stiffness = 9, damping = 0.55) => {
  const x = t - t0;
  if (x <= 0) return 0;
  return 1 - Math.exp(-stiffness * damping * x) * Math.cos(stiffness * Math.sqrt(1 - damping * damping) * x);
};

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// Fisher-Yates with Remotion's seeded random, so every render shuffles the same way.
export const shuffled = <T,>(items: T[], seed: string): T[] => {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random(`${seed}-${i}`) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// "1 048 576" (Armenian groups thousands with spaces).
export const groupDigits = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
