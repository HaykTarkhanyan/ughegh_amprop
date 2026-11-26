"""Copy a short's built timeline and narration into the render project as one matched pair.

Checks the build first (tools/validate_episode.py, stage "timeline": the timeline was made from the current script
and audio). Then copies 03_shorts/<short>/build/narration.wav -> render/public/<short>/narration_<build id>.wav and
03_shorts/<short>/build/timeline.json -> render/src/data/<short>.json with its "audio" field set to that file name,
so the composition can only play the audio its timeline was built from (Codex review X10, 2026-11-26). The audio is
copied first and the timeline last, each through a temp file and a rename, so an interruption never leaves a timeline
pointing at audio that is not there. Older narration_*.wav files of that short are removed after the copy. Both
outputs are gitignored and regenerated from tools/build_timeline.py. Run it after every build_timeline.py run.

Usage (from 03_shorts/render/):  python sync_short.py zero_knowledge
Runtime: under 1 s.
"""
import argparse
import json
import logging
import os
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "tools"))
from runlog import setup as setup_logging  # noqa: E402
from validate_episode import sha256, validate  # noqa: E402

log = logging.getLogger("sync_short")


def main():
    setup_logging("sync_short")
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("short")
    args = ap.parse_args()
    short = HERE.parent / args.short
    errs = validate(short, "timeline")
    if errs:
        for e in errs:
            log.error("%s", e)
        raise SystemExit(f"{args.short}: {len(errs)} problem(s); nothing was copied")
    build = short / "build"
    tl = json.loads((build / "timeline.json").read_text(encoding="utf-8"))
    if sha256(build / "narration.wav") != tl["build"]["audio_sha"]:
        raise SystemExit(f"{build / 'narration.wav'} is not the audio timeline.json was built with; rebuild")
    audio_dir = HERE / "public" / args.short
    data_dir = HERE / "src" / "data"
    audio_dir.mkdir(parents=True, exist_ok=True)
    data_dir.mkdir(parents=True, exist_ok=True)
    audio_name = f"narration_{tl['build']['id']}.wav"
    tmp = audio_dir / (audio_name + ".tmp")
    shutil.copyfile(build / "narration.wav", tmp)
    os.replace(tmp, audio_dir / audio_name)
    tl["audio"] = audio_name
    tmp = data_dir / f"{args.short}.json.tmp"
    tmp.write_text(json.dumps(tl, ensure_ascii=False, indent=1), encoding="utf-8")
    os.replace(tmp, data_dir / f"{args.short}.json")
    for old in audio_dir.glob("narration*.wav"):
        if old.name != audio_name:
            log.info("removing superseded %s", old.name)
            old.unlink()
    log.info("synced %s build %s: timeline -> src/data/%s.json, narration -> public/%s/%s", args.short,
             tl["build"]["id"], args.short, args.short, audio_name)


if __name__ == "__main__":
    main()
