"""Let Gemini watch and listen to a rendered short and review it like a first viewer (it hears the Armenian voice).

Sends the MP4 inline (keep it under ~15 MB: use a 540x960 preview) together with the script (beats.hy.json), and
asks for a JSON review: does the voice say the script (mispronounced or garbled Armenian words), are the captions in
sync with the speech, visual problems, the hook, pacing, clarity, factual worries, each with an MM:SS time. Treat
every finding as a claim to check against the frames and the audio, not as truth.

Usage (from 03_shorts/):
    python tools/gemini_review.py bakeoff/out/preview/pilot_remotion.mp4 pilot_survivorship/beats.hy.json
           --out pilot_survivorship/review/gemini_review.json [--model gemini-3.8-flash] [--key-name GEMINI_API_KEY]
Each call appends a row to 03_shorts/gemini_ledger.csv (tokens and estimated USD).
Runtime: about 20-60 s (upload + model). Cost: about $0.02-0.04 for a 70 s video (prices in PRICES, checked
2026-11-25; update them when they change).
"""
import argparse
import base64
import csv
import json
import logging
import sys
import time
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from tts_gemini import API, api_key, request  # noqa: E402  (same key handling and retries as the TTS script)

ROOT = Path(__file__).resolve().parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "gemini_review.log", encoding="utf-8")])
log = logging.getLogger("gemini_review")
LEDGER = Path(__file__).resolve().parents[1] / "gemini_ledger.csv"
# USD per 1M tokens (input, output incl. thinking). Search on 2026-11-25: $0.75 / $3.75 through 2026-12-31, then
# double. Audio input may be billed higher than text, so treat the estimate as a lower bound.
PRICES = {"gemini-3.8-flash": (0.75, 3.75)}

PROMPT = """You are reviewing a short vertical video (YouTube Shorts / Reels / TikTok) in Eastern Armenian before it
is published. Watch AND listen to the whole video. The narration is synthetic (TTS); the captions are drawn by code
and should highlight each word while it is spoken.

The exact narration script, beat by beat (key: text):
{script}

Return JSON only, with these keys:
- "pronunciation": list of {{"time": "MM:SS", "word": "...", "problem": "..."}} for Armenian words the voice
  mispronounces, swallows, stresses oddly, or says differently from the script. Empty list if none.
- "sync": list of {{"time": "MM:SS", "problem": "..."}} where the highlighted caption word runs clearly ahead of or
  behind the voice (more than about a third of a second), or a caption shows text that is not being said.
- "visual": list of {{"time": "MM:SS", "problem": "...", "severity": "high|medium|low"}}: unreadable or cut-off text,
  overlaps, ugly or confusing transitions, elements that look broken, anything covered by platform UI.
- "hook": {{"verdict": "...", "would_keep_watching": true/false, "why": "..."}} about the first 3 seconds.
- "pacing": list of {{"time": "MM:SS", "problem": "..."}} where it drags or rushes.
- "clarity": {{"understood": true/false, "summary_of_what_a_viewer_learns": "...", "confusing_parts": [...]}}.
- "facts": list of claims in the video that a careful viewer might dispute, with why.
- "top_3_fixes": the three changes that would improve this video most, most important first.
Be specific and critical; do not praise. If something is fine, leave its list empty."""


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("video", type=Path)
    ap.add_argument("beats", type=Path)
    ap.add_argument("--out", type=Path, required=True)
    ap.add_argument("--model", default="gemini-3.8-flash")
    ap.add_argument("--key-name", default="GEMINI_API_KEY")
    args = ap.parse_args()
    t0 = time.time()
    data = args.video.read_bytes()
    if len(data) > 15e6:
        raise SystemExit(f"{args.video} is {len(data) / 1e6:.1f} MB; use a smaller preview (inline limit ~20 MB request)")
    beats = json.loads(args.beats.read_text(encoding="utf-8"))
    script = "\n".join(f"{b['key']}: {b['text']}" for b in beats)
    body = {"contents": [{"role": "user", "parts": [
                {"inlineData": {"mimeType": "video/mp4", "data": base64.b64encode(data).decode()}},
                {"text": PROMPT.format(script=script)}]}],
            "generationConfig": {"responseMimeType": "application/json", "temperature": 0.2}}
    resp = request("POST", f"{API}/models/{args.model}:generateContent", api_key(args.key_name), body)
    text = "".join(p.get("text", "") for p in resp["candidates"][0]["content"]["parts"])
    review = json.loads(text)
    usage = resp.get("usageMetadata", {})
    tin, tout = usage.get("promptTokenCount", 0), usage.get("candidatesTokenCount", 0) + usage.get("thoughtsTokenCount", 0)
    p_in, p_out = PRICES.get(args.model, (0.0, 0.0))
    usd = tin * p_in / 1e6 + tout * p_out / 1e6
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps({"model": args.model, "video": str(args.video), "usage": usage, "usd_est": round(usd, 4),
                                    "review": review}, ensure_ascii=False, indent=2), encoding="utf-8")
    new = not LEDGER.exists()
    with LEDGER.open("a", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        if new:
            w.writerow(["datetime", "model", "video", "tokens_in", "tokens_out", "usd_est"])
        w.writerow([datetime.now().isoformat(timespec="seconds"), args.model, args.video.name, tin, tout, f"{usd:.4f}"])
    log.info("%s: tokens in %d, out %d, ~$%.4f, %.1f s -> %s", args.model, tin, tout, usd, time.time() - t0, args.out)


if __name__ == "__main__":
    main()
