# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Build one slide deck with LuaLaTeX, at most two builds at once across all decks, and report what went wrong.

Several decks can be worked on at once, but this laptop (4 cores, 16 GB RAM) freezes under sustained
all-core load, and each LuaLaTeX build keeps one core busy for minutes. So every build first takes one of
two machine-wide lock slots (logs/build_deck.lock, logs/build_deck.2.lock) and waits for a free one.
Two, not more: one build of a ~100-frame deck peaked at 179 MB RAM (measured 2026-10-21), so RAM is not
the limit; two builds leave two cores for the agents, Chrome and Windows.

Run from anywhere; <deck> is a folder under slides/ (its main file is <deck>/<deck>.tex unless --tex says otherwise):
  python 02_idiot_brain/slides/common/build_deck.py webinar02                one LuaLaTeX pass of the whole deck (~3 min for ~100 frames)
  python 02_idiot_brain/slides/common/build_deck.py webinar02 --parts 02,03  one pass of only those part files (faster)
  python 02_idiot_brain/slides/common/build_deck.py webinar02 --passes 2     two passes: needed after adding or removing
      frames that use [remember picture] (title, openers, \source lines), whose positions come from the previous pass
  python 02_idiot_brain/slides/common/build_deck.py webinar02 --full         latexmk until stable (~10-17 min for ~100 frames)
  python 02_idiot_brain/slides/common/build_deck.py webinar02 --wait         wait up to ~9 min for the deck's current build, print its result
Times exclude waiting for the lock. Start builds in the background, then call --wait:
exit 0 = built clean, 1 = failed or has problems (see the printed result), 2 = usage error, 3 = still queued/running.
Out: <deck>/build/<job>.pdf (+ .log/.nav), <deck>/build/status.json, logs/build_deck_<deck>.log
"""
import argparse
import json
import logging
import msvcrt
import os
import re
import subprocess
import sys
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
SLIDES = HERE.parent
ROOT = HERE.parents[2]
LOGS = ROOT / "logs"
# one (lock, holder info) pair per build slot
SLOTS = [(LOGS / "build_deck.lock", LOGS / "build_deck.holder.json"),
         (LOGS / "build_deck.2.lock", LOGS / "build_deck.2.holder.json")]
WAIT_LIMIT_S = 540  # --wait returns before the Bash tool's 10 min limit
TIMEOUT_S = {"pass": 1800, "full": 3600}  # per LuaLaTeX pass / for the whole latexmk run

LOGS.mkdir(exist_ok=True)
log = logging.getLogger("build_deck")


def setup_logging(deck):
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        handlers=[logging.StreamHandler(), logging.FileHandler(LOGS / f"build_deck_{deck}.log", encoding="utf-8")],
    )


def now():
    return time.strftime("%Y-%m-%d %H:%M:%S")


def pid_alive(pid):
    out = subprocess.run(["tasklist", "/FI", f"PID eq {pid}", "/NH", "/FO", "CSV"],
                         capture_output=True, text=True, check=True).stdout
    return f'"{pid}"' in out


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def try_lock(fd):
    try:
        os.lseek(fd, 0, os.SEEK_SET)
        msvcrt.locking(fd, msvcrt.LK_NBLCK, 1)
        return True
    except OSError:
        return False


def acquire_lock(deck, status_path, status):
    """Block until this process holds one of the build slots; the OS frees it if the process dies. Returns its fd."""
    fds = [os.open(lock, os.O_RDWR | os.O_CREAT) for lock, _ in SLOTS]
    last_note = 0.0
    while True:
        for (_, holder), fd in zip(SLOTS, fds):
            if try_lock(fd):
                for other in fds:
                    if other != fd:
                        os.close(other)
                write_json(holder, {"deck": deck, "job": status["job"], "pid": os.getpid(), "since": now()})
                return fd
        if time.time() - last_note > 60:
            holders = [read_json(h) if h.exists() else {} for _, h in SLOTS]
            busy = ", ".join(f"{h.get('deck', '?')} ({h.get('job', '?')}, since {h.get('since', '?')})" for h in holders)
            log.info(f"queued: both slots busy: {busy}")
            status["waiting_for"] = " + ".join(h.get("deck", "?") for h in holders)
            write_json(status_path, status)
            last_note = time.time()
        time.sleep(5)


def parts_wrapper(deck_dir, main_tex, parts):
    """build/parts_<ids>.tex: the main file's preamble plus only the chosen \\input{parts/NN_...} lines."""
    src = (deck_dir / main_tex).read_text(encoding="utf-8")
    head, sep, body = src.partition("\\begin{document}")
    if not sep:
        raise ValueError(f"{main_tex} has no \\begin{{document}}")
    inputs = re.findall(r"^\s*\\input\{(parts/[^}]+)\}", body, flags=re.M)
    chosen = [p for p in inputs if any(Path(p).name.startswith(f"{i}_") for i in parts)]
    missing = [i for i in parts if not any(Path(p).name.startswith(f"{i}_") for p in inputs)]
    if missing:
        raise ValueError(f"no part file starting with {missing} is \\input in {main_tex}; found {inputs}")
    job = "parts_" + "-".join(parts)
    text = head + "\\begin{document}\n" + "".join(f"\\input{{{p}}}\n" for p in chosen) + "\\end{document}\n"
    (deck_dir / "build").mkdir(exist_ok=True)
    (deck_dir / "build" / f"{job}.tex").write_text(text, encoding="utf-8")
    return job, f"build/{job}.tex"


def check_log(log_path):
    """Problems a reader would see: errors, content past the frame bottom, glyphs missing from a font."""
    text = log_path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()
    errors, vbox, hbox, missing = [], [], 0, []
    current = "?"
    for i, line in enumerate(lines):
        for m in re.finditer(r"\((\.?/?(?:parts|figures)/[^\s()]+\.tex)", line):
            current = m.group(1)
        if line.startswith("!") or re.match(r"^\S+\.tex:\d+: ", line):
            errors.append(" | ".join(l for l in lines[i:i + 4] if l.strip()))
        elif line.startswith("Overfull \\vbox"):
            vbox.append(f"{line.strip()} (last file opened: {current})")
        elif line.startswith("Overfull \\hbox"):
            hbox += 1
        if "Missing character" in line:
            missing.append(line.strip())
    return errors, vbox, hbox, missing


def pdf_pages(pdf):
    out = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True, check=True).stdout
    return int(next(l.split()[-1] for l in out.splitlines() if l.startswith("Pages:")))


def build(args):
    deck_dir = SLIDES / args.deck
    main_tex = args.tex or f"{args.deck}.tex"
    if not (deck_dir / main_tex).exists():
        sys.exit(f"ERROR: {deck_dir / main_tex} does not exist")
    status_path = deck_dir / "build" / "status.json"
    (deck_dir / "build").mkdir(exist_ok=True)
    if status_path.exists():
        old = read_json(status_path)
        if old.get("state") in ("queued", "running") and pid_alive(old["pid"]):
            sys.exit(f"ERROR: a build of {args.deck} is already {old['state']} (pid {old['pid']}); use --wait")
    if args.parts:
        job, tex = parts_wrapper(deck_dir, main_tex, [p.strip() for p in args.parts.split(",")])
    else:
        job, tex = Path(main_tex).stem, main_tex
    mode = "full" if args.full else "pass"
    if mode == "pass" and args.passes > 2:
        sys.exit("ERROR: use --full instead of more than 2 passes")
    status = {"deck": args.deck, "job": job, "mode": mode if args.full else f"{args.passes} pass(es)", "state": "queued", "pid": os.getpid(), "queued_at": now()}
    write_json(status_path, status)
    t_queue = time.time()
    fd = acquire_lock(args.deck, status_path, status)
    try:
        waited = time.time() - t_queue
        status.update(state="running", started_at=now(), waited_s=round(waited))
        status.pop("waiting_for", None)
        write_json(status_path, status)
        log.info(f"{args.deck}: building {tex} ({mode}) after {waited:.0f} s in the queue")
        flags = ["-interaction=nonstopmode", "-halt-on-error", "-file-line-error"]
        if args.full:
            cmd = ["latexmk", "-lualatex", *flags, f"-jobname={job}", "-outdir=build", tex]
        else:
            cmd = ["lualatex", *flags, f"-jobname={job}", "-output-directory=build", tex]
        t0 = time.time()
        with open(deck_dir / "build" / f"{job}.console", "w", encoding="utf-8", errors="replace") as console:
            for _ in range(1 if args.full else args.passes):
                proc = subprocess.run(cmd, cwd=deck_dir, stdout=console, stderr=subprocess.STDOUT, timeout=TIMEOUT_S[mode])
                if proc.returncode != 0:
                    break
        built = time.time() - t0
    finally:
        os.lseek(fd, 0, os.SEEK_SET)
        msvcrt.locking(fd, msvcrt.LK_UNLCK, 1)
        os.close(fd)
    log_path, pdf = deck_dir / "build" / f"{job}.log", deck_dir / "build" / f"{job}.pdf"
    errors, vbox, hbox, missing = check_log(log_path)
    nav = deck_dir / "build" / f"{job}.nav"
    frames = len(re.findall(r"\\beamer@framepages", nav.read_text(encoding="utf-8"))) if nav.exists() else None
    pages = pdf_pages(pdf) if proc.returncode == 0 and pdf.exists() else None
    ok = proc.returncode == 0 and not errors and not vbox and not missing
    status.update(state="done", ok=ok, exit_code=proc.returncode, finished_at=now(), build_s=round(built),
                  pdf=str(pdf), pages=pages, frames=frames, errors=errors[:10], overfull_vbox=vbox,
                  overfull_hbox_count=hbox, missing_chars=missing)
    write_json(status_path, status)
    summary = (f"{args.deck} {job}: {'OK' if ok else 'PROBLEMS'} in {built:.0f} s (+{waited:.0f} s queued), "
               f"exit {proc.returncode}, {frames} frames, {pages} pages, {len(errors)} errors, "
               f"{len(vbox)} overfull vbox, {len(missing)} missing chars, {hbox} overfull hbox")
    (log.info if ok else log.error)(summary)
    for line in errors[:10] + vbox + missing:
        log.error(f"  {line}")
    return 0 if ok else 1


def wait(args):
    status_path = SLIDES / args.deck / "build" / "status.json"
    if not status_path.exists():
        sys.exit(f"ERROR: no build has been started for {args.deck} ({status_path} missing)")
    t0 = time.time()
    while True:
        status = read_json(status_path)
        if status["state"] == "done":
            print(json.dumps(status, ensure_ascii=False, indent=2))
            return 0 if status["ok"] else 1
        if not pid_alive(status["pid"]):
            status = read_json(status_path)  # it may have written "done" and exited since the read above
            if status["state"] == "done":
                continue
            print(json.dumps(status, ensure_ascii=False, indent=2))
            log.error(f"{args.deck}: build process {status['pid']} is gone while {status['state']} (killed?); start a new build")
            return 1
        if time.time() - t0 > WAIT_LIMIT_S:
            extra = f", waiting for {status['waiting_for']}" if status.get("waiting_for") else ""
            print(f"{args.deck}: still {status['state']} after {time.time() - t0:.0f} s of waiting{extra}; call --wait again")
            return 3
        time.sleep(5)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("deck", help="folder under slides/, e.g. webinar02")
    p.add_argument("--tex", help="main .tex file inside the deck folder (default <deck>.tex)")
    p.add_argument("--parts", help="comma-separated part number prefixes to build alone, e.g. 02,03")
    p.add_argument("--passes", type=int, default=1, help="LuaLaTeX passes (default 1; 2 after adding frames with remember picture)")
    p.add_argument("--full", action="store_true", help="latexmk until stable instead of one pass")
    p.add_argument("--wait", action="store_true", help="wait for the deck's current build and print its result")
    args = p.parse_args()
    setup_logging(args.deck)
    sys.exit(wait(args) if args.wait else build(args))


if __name__ == "__main__":
    main()
