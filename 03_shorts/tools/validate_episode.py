"""Offline checks for one episode before paid or cache-changing work and before a render (Codex review X9, X10).

Stages (each includes the earlier ones that apply):
  script    beats.hy.json: a list; keys unique, non-empty, filename-safe; text non-empty; pause_after finite and >= 0;
            screen / screen_small / visual are strings when present.
  audio     audio/manifest.json: an entry per beat whose text matches the script, a readable 16-bit mono WAV with
            audible sound.
  timeline  build/timeline.json: beats in script order, finite ordered times, words and pages inside their beat, and
            a build block whose script hash matches the current beats.hy.json.
  render    the copies in render/ (src/data/<short>.json, public/<short>/narration.wav) are byte-identical to build/
            and were built from the current script (nothing stale gets rendered).

Usage (from 03_shorts/):  python tools/validate_episode.py zero_knowledge --stage render
Exit code 1 with every problem listed when anything fails. Runtime: under 2 s. No network, no paid calls.
Other tools import validate() and stop before doing work when it reports problems.
"""
import argparse
import hashlib
import json
import logging
import math
import re
import sys
import wave
from array import array
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from runlog import setup as setup_logging  # noqa: E402

log = logging.getLogger("validate_episode")
SHORTS = Path(__file__).resolve().parents[1]
STAGES = ["script", "audio", "timeline", "render"]
KEY_RE = re.compile(r"^[a-z0-9_]+$")


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def check_script(short: Path) -> tuple[list, list[str]]:
    return check_script_file(short / "beats.hy.json")


def check_script_file(path: Path) -> tuple[list, list[str]]:
    errs = []
    if not path.exists():
        return [], [f"{path} is missing"]
    try:
        beats = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        return [], [f"{path}: not valid JSON ({e})"]
    if not isinstance(beats, list) or not beats:
        return [], [f"{path}: must be a non-empty list of beats"]
    seen = set()
    for i, b in enumerate(beats, 1):
        where = f"beat {i}"
        if not isinstance(b, dict):
            errs.append(f"{where}: not an object")
            continue
        key = b.get("key")
        if not isinstance(key, str) or not KEY_RE.match(key or ""):
            errs.append(f"{where}: key {key!r} must be lowercase letters, digits or _ (it names the audio file)")
        elif key in seen:
            errs.append(f"{where}: duplicate key {key!r} (two beats would share one audio file)")
        seen.add(key)
        if not isinstance(b.get("text"), str) or not b["text"].strip():
            errs.append(f"{where} ({key}): text is empty")
        if "pause_after" in b:
            p = b["pause_after"]
            if not isinstance(p, (int, float)) or isinstance(p, bool) or not math.isfinite(p) or p < 0:
                errs.append(f"{where} ({key}): pause_after {p!r} must be a finite number >= 0")
        for f in ("screen", "screen_small", "visual"):
            if f in b and not isinstance(b[f], str):
                errs.append(f"{where} ({key}): {f} must be text")
    return beats, errs


def audible(path: Path) -> tuple[bool, str]:
    try:
        with wave.open(str(path), "rb") as w:
            if w.getsampwidth() != 2 or w.getnchannels() != 1:
                return False, f"{path.name}: needs 16-bit mono WAV (has {w.getsampwidth() * 8}-bit, {w.getnchannels()} ch)"
            frames = w.readframes(w.getnframes())
    except (wave.Error, EOFError) as e:
        return False, f"{path.name}: not a readable WAV ({e})"
    samples = array("h", frames)
    if not samples:
        return False, f"{path.name}: has no samples"
    if max(abs(s) for s in samples[:: max(1, len(samples) // 20000)]) < 330:  # about -40 dBFS
        return False, f"{path.name}: is silent"
    return True, ""


def check_audio(short: Path, beats: list) -> list[str]:
    errs = []
    man_path = short / "audio" / "manifest.json"
    if not man_path.exists():
        return [f"{man_path} is missing (run tools/tts_gemini.py beats or tools/import_recording.py)"]
    entries = json.loads(man_path.read_text(encoding="utf-8")).get("beats", {})
    for b in beats:
        e = entries.get(b["key"])
        if e is None:
            errs.append(f"{b['key']}: no clip in the manifest")
            continue
        if e.get("text") != b["text"]:
            errs.append(f"{b['key']}: the clip was made for different text (script changed since)")
        wav = short / "audio" / e.get("file", "")
        if not wav.is_file():
            errs.append(f"{b['key']}: {wav} is missing")
            continue
        ok, why = audible(wav)
        if not ok:
            errs.append(f"{b['key']}: {why}")
    return errs


def check_timeline(short: Path, beats: list) -> list[str]:
    errs = []
    path = short / "build" / "timeline.json"
    if not path.exists():
        return [f"{path} is missing (run tools/build_timeline.py {short.name})"]
    tl = json.loads(path.read_text(encoding="utf-8"))
    build = tl.get("build") or {}
    if build.get("script_sha") != sha256(short / "beats.hy.json"):
        errs.append("timeline was built from a different beats.hy.json (rebuild it)")
    keys = [b.get("key") for b in tl.get("beats", [])]
    if keys != [b["key"] for b in beats]:
        errs.append(f"timeline beats {keys} differ from the script's")
    prev_end = 0.0
    for b in tl.get("beats", []):
        s, e = b.get("start"), b.get("end")
        if not all(isinstance(x, (int, float)) and math.isfinite(x) for x in (s, e)) or s > e or s < prev_end - 1e-6:
            errs.append(f"{b.get('key')}: bad beat times {s}-{e}")
            continue
        prev_end = e
        last = s
        for w in b.get("words", []):
            if not (s - 1e-6 <= w["start"] <= w["end"] <= e + 1e-6) or w["start"] < last - 1e-6:
                errs.append(f"{b['key']}: word {w['w']!r} at {w['start']}-{w['end']} is out of order or outside the beat")
                break
            last = w["start"]
        for p in b.get("pages", []):
            if not (s - 1e-6 <= p["start"] <= p["end"] <= e + 1e-6):
                errs.append(f"{b['key']}: page {p['text']!r} is outside the beat")
                break
    return errs


def check_render(short: Path) -> list[str]:
    """The render copy (render/sync_short.py) is the current build: same content except its "audio" file name, and
    that audio file has the hash the build recorded."""
    fix = f"run render/sync_short.py {short.name}"
    copy_path = SHORTS / "render" / "src" / "data" / f"{short.name}.json"
    if not copy_path.exists():
        return [f"{copy_path.relative_to(SHORTS)} is missing ({fix})"]
    built = json.loads((short / "build" / "timeline.json").read_text(encoding="utf-8"))
    copy = json.loads(copy_path.read_text(encoding="utf-8"))
    if {**copy, "audio": None} != {**built, "audio": None}:
        return [f"{copy_path.relative_to(SHORTS)} is a stale copy of build {copy.get('build', {}).get('id')} ({fix})"]
    audio = SHORTS / "render" / "public" / short.name / copy["audio"]
    if not audio.exists():
        return [f"{audio.relative_to(SHORTS)} is missing ({fix})"]
    if sha256(audio) != built["build"]["audio_sha"]:
        return [f"{audio.relative_to(SHORTS)} is not the audio of build {built['build']['id']} ({fix})"]
    return []


def validate(short: Path, stage: str) -> list[str]:
    """All problems up to and including `stage`; an empty list means go."""
    beats, errs = check_script(short)
    if errs or stage == "script":
        return errs
    errs += check_audio(short, beats)
    if stage == "audio":
        return errs
    errs += check_timeline(short, beats)
    if stage == "timeline":
        return errs
    return errs + check_render(short)


def main():
    setup_logging("validate_episode")
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("short", type=Path)
    ap.add_argument("--stage", choices=STAGES, default="timeline")
    args = ap.parse_args()
    errs = validate(args.short, args.stage)
    for e in errs:
        log.error("%s: %s", args.short.name, e)
    if errs:
        raise SystemExit(f"{len(errs)} problem(s) in {args.short.name} up to stage '{args.stage}'")
    log.info("%s: OK up to stage '%s'", args.short.name, args.stage)


if __name__ == "__main__":
    main()
