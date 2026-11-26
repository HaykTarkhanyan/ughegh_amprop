"""Gemini text-to-speech for the shorts' narration (standard library only, no SDK). Copied from
sample_problems_qysu/animations on 2026-11-25 and adapted for 03_shorts.

Usage (from 03_shorts/):
    python tools/tts_gemini.py --key-name GEMINI_API_KEY beats <short>/beats.hy.json <short>/audio
    python tools/tts_gemini.py say TEXT_FILE OUT.wav [--voice Sadaltager] [--style "..."]
    python tools/tts_gemini.py voices [--lang hy-AM]

`beats` checks the script first (tools/validate_episode.py) and stops before any paid call if it has problems.
Then it makes one clip per beat, <short>/audio/<key>.wav, and keeps <short>/audio/manifest.json up to date: text,
seconds, and the voice / model / style each clip was made with. A clip whose text, voice, model and style are
unchanged, and whose WAV is still readable and audible, is reused without a call. The manifest is written
atomically after every new clip and keeps the entries of beats not visited yet, so an interrupted run loses no
paid clip (Codex review X1, 2026-11-26). Clips of beats no longer in the script move to "unused".
Default voice: Sadaltager with no style prompt (DECISIONS.md #20; Codex review X7). LECTURER_STYLE is the old
qysu prompt, kept as a preset to pass with --style.

The API key is read from the environment variable named by --key-name (default GEMINI_API_KEY_VOICE) or, if
unset, from the line KEY=... in ~/OneDrive/Desktop/00_notes/.secrets/api_keys.env. The key is never printed.
Every synthesis call appends one row to 03_shorts/tts_ledger.csv (date, model, voice, characters, tokens, audio
seconds, estimated USD), so the spend is answerable from data.

Runtime: about 5-20 s per clip of 20-40 s audio (network bound). Prices used for the estimate are the ones found
on 2026-11-24: Flash TTS $0.50 per 1M input tokens and $9 per 1M audio tokens, Flash-Lite TTS $6 per 1M audio
tokens; they roughly double from 2027-01-01.
"""
import argparse
import base64
import csv
import io
import json
import logging
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import wave
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ENV_FILE = Path.home() / "OneDrive/Desktop/00_notes/.secrets/api_keys.env"
LEDGER = Path(__file__).resolve().parents[1] / "tts_ledger.csv"
API = "https://generativelanguage.googleapis.com/v1beta"
# Hayk's choice for the shorts (DECISIONS.md #20): Sadaltager on 3.8 Flash TTS with no style prompt
DEFAULT_VOICE = "Sadaltager"
DEFAULT_MODEL = "gemini-3.8-flash-tts"
DEFAULT_STYLE = ""
LECTURER_STYLE = "Calm, clear university lecturer explaining mathematics to students, moderate pace"
PRICES = {  # USD per 1M tokens: (text input, audio output)
    "gemini-3.8-flash-tts": (0.50, 9.0),
    "gemini-3.8-flash-lite-tts": (0.50, 6.0),
}

sys.path.insert(0, str(Path(__file__).resolve().parent))
from runlog import setup as setup_logging  # noqa: E402
log = logging.getLogger("tts_gemini")


def api_key(name):
    key = os.environ.get(name)
    if not key and ENV_FILE.exists():
        for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
            if line.strip().startswith(name + "="):
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not key:
        raise SystemExit(f"API key {name} not found in the environment or in {ENV_FILE}")
    return key


def request(method, url, key, body=None, retries=6):
    """One API call. 429 (rate limit) and 5xx are retried with growing waits, honouring the server's
    suggested retryDelay; any other error, or running out of retries, raises."""
    data = json.dumps(body).encode("utf-8") if body is not None else None
    for attempt in range(retries + 1):
        req = urllib.request.Request(url, data=data, method=method,
                                     headers={"x-goog-api-key": key, "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            text = e.read().decode("utf-8", "replace")
            if (e.code == 429 or e.code >= 500) and attempt < retries:
                wait = 10 * 2 ** attempt
                m = re.search(r'"retryDelay":\s*"(\d+(?:\.\d+)?)s"', text)
                if m:
                    wait = max(wait, float(m.group(1)) + 1)
                if wait > 300:
                    # a daily quota (2026-11-24: the free tier gave a 44156 s delay after about 10 TTS calls)
                    log.error("HTTP %s with a %.0f s retry delay: quota exhausted for this key, try --key-name "
                              "with another project's key or wait. %s", e.code, wait, text[:300])
                    raise
                log.warning("HTTP %s, retry %d/%d in %.0f s", e.code, attempt + 1, retries, wait)
                time.sleep(wait)
                continue
            log.error("HTTP %s from %s: %s", e.code, url.split("?")[0], text[:800])
            raise


def to_wav(audio, mime):
    """The API returns a WAV by default; wrap raw 16-bit PCM (24 kHz mono) if that is what came back."""
    if audio[:4] == b"RIFF":
        return audio
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(24000)
        w.writeframes(audio)
    log.info("wrapped raw PCM (%s) into WAV", mime)
    return buf.getvalue()


def say(args):
    key = api_key(args.key_name)
    text = Path(args.text_file).read_text(encoding="utf-8").strip()
    part = {"text": text}
    if args.style:
        part["speech_metadata"] = {"style": args.style}
    body = {"contents": [{"role": "user", "parts": [part]}],
            "generationConfig": {"responseModalities": ["AUDIO"],
                                 "speechConfig": {"voiceConfig": {"voice": args.voice}}}}
    t0 = time.time()
    resp = request("POST", f"{API}/models/{args.model}:generateContent", key, body)
    inline = resp["candidates"][0]["content"]["parts"][0]["inlineData"]
    wav = to_wav(base64.b64decode(inline["data"]), inline.get("mimeType", "?"))
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(wav)
    with wave.open(str(out), "rb") as w:
        seconds = w.getnframes() / w.getframerate()
    usage = resp.get("usageMetadata", {})
    tin, tout = usage.get("promptTokenCount", 0), usage.get("candidatesTokenCount", 0)
    p_in, p_out = PRICES.get(args.model, (0.0, 0.0))
    usd = tin * p_in / 1e6 + tout * p_out / 1e6
    log.info("%s | voice %s | %d chars | tokens in %d, audio %d | %.1f s audio | ~$%.4f | %.1f s wall | %s",
             args.model, args.voice, len(text), tin, tout, seconds, usd, time.time() - t0, out)
    new = not LEDGER.exists()
    with LEDGER.open("a", newline="", encoding="utf-8") as fh:
        wr = csv.writer(fh)
        if new:
            wr.writerow(["datetime", "model", "voice", "chars", "tokens_in", "tokens_audio", "audio_s", "usd_est", "out"])
        wr.writerow([datetime.now().isoformat(timespec="seconds"), args.model, args.voice, len(text), tin, tout,
                     f"{seconds:.1f}", f"{usd:.5f}", out.name])


def write_json_atomic(path: Path, data) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, path)


def beats(args):
    """One clip per beat of a beats JSON into OUT_DIR, with OUT_DIR/manifest.json (cache rules: module docstring)."""
    from validate_episode import audible, check_script_file
    spec, errs = check_script_file(Path(args.beats_file))
    if errs:
        for e in errs:
            log.error("%s", e)
        raise SystemExit(f"{args.beats_file}: {len(errs)} problem(s); nothing was synthesized")
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    man_path = out_dir / "manifest.json"
    old = json.loads(man_path.read_text(encoding="utf-8")) if man_path.exists() else {}
    if old.get("narrator", "gemini-tts") != "gemini-tts":
        raise SystemExit(f"{man_path} holds clips cut from a {old['narrator']} recording; use another out_dir")
    # manifests before 2026-11-26 kept voice / model / style once at the top; every entry now carries its own
    top = {k: old.get(k) for k in ("voice", "model", "style")}
    entries = {k: {**top, **v} for k, v in {**old.get("unused", {}), **old.get("beats", {})}.items()}
    want = {"voice": args.voice, "model": args.model, "style": args.style}
    manifest = {"narrator": "gemini-tts", **want, "beats": entries}
    for b in spec:
        wav = out_dir / f"{b['key']}.wav"
        prev = entries.get(b["key"])
        if prev and prev.get("text") == b["text"] and all(prev.get(k) == v for k, v in want.items()) and wav.exists():
            ok, why = audible(wav)
            if ok:
                log.info("reuse %s (%.1f s)", b["key"], prev["seconds"])
                continue
            log.warning("cached clip unusable, making it again: %s", why)
        txt = out_dir / f"{b['key']}.txt"
        txt.write_text(b["text"], encoding="utf-8")
        say(argparse.Namespace(key_name=args.key_name, text_file=str(txt), out=str(wav), voice=args.voice,
                               model=args.model, style=args.style))
        with wave.open(str(wav), "rb") as w:
            seconds = w.getnframes() / w.getframerate()
        entries[b["key"]] = {"text": b["text"], "file": wav.name, "seconds": round(seconds, 3), **want}
        write_json_atomic(man_path, manifest)  # after every paid clip, with the unvisited entries still in it
    keys = [b["key"] for b in spec]
    manifest["beats"] = {k: entries[k] for k in keys}
    unused = {k: v for k, v in entries.items() if k not in manifest["beats"]}
    if unused:
        manifest["unused"] = unused
    write_json_atomic(man_path, manifest)
    total = sum(v["seconds"] for v in manifest["beats"].values())
    log.info("manifest %s: %d beats, %.1f s of speech, %d unused clip(s) kept", man_path, len(keys), total, len(unused))


def voices(args):
    key = api_key(args.key_name)
    q = {"page_size": 1000}
    if args.lang:
        q["language_code"] = args.lang
    resp = request("GET", f"{API}/voices?{urllib.parse.urlencode(q)}", key)
    vs = resp.get("voices", [])
    for v in vs:
        log.info("%s | %s | %s | %s | %s | %s", v.get("id"), v.get("displayName") or v.get("display_name"),
                 v.get("languageCode") or v.get("language_code"), v.get("gender"), v.get("pitch"),
                 (v.get("description") or "")[:90])
    log.info("%d voices%s", len(vs), f" for {args.lang}" if args.lang else "")


def main():
    setup_logging("tts_gemini")
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--key-name", default="GEMINI_API_KEY_VOICE")
    sub = ap.add_subparsers(dest="cmd", required=True)
    for name in ("say", "beats"):
        p = sub.add_parser(name)
        if name == "say":
            p.add_argument("text_file")
            p.add_argument("out")
        else:
            p.add_argument("beats_file")
            p.add_argument("out_dir")
        p.add_argument("--voice", default=DEFAULT_VOICE)
        p.add_argument("--model", default=DEFAULT_MODEL)
        p.add_argument("--style", default=DEFAULT_STYLE)
    v = sub.add_parser("voices")
    v.add_argument("--lang", default="")
    args = ap.parse_args()
    t0 = time.time()
    {"say": say, "beats": beats, "voices": voices}[args.cmd](args)
    log.info("done in %.1f s", time.time() - t0)


if __name__ == "__main__":
    main()
