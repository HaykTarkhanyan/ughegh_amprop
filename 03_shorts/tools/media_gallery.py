"""Build one standalone HTML page with several audio or video files, each with its own player.

Why: the default Windows player reuses one window, so opening clips one by one with Start-Process leaves only
the last one (sample_problems_qysu, 2026-11-25). The page embeds every file as base64, so it is one file that can
be sent as-is, with a table of contents and a collapsible section per file. Open it with the html-review skill
so comments can be left per clip.

Usage (from 03_shorts/):
    python tools/media_gallery.py FILE [FILE ...] --out PAGE.html [--title "..."] [--intro "..."]
           [--note FILE_STEM="text"]...
    python -I ~/.claude/skills/html-review/scripts/review.py open PAGE.html
Types by extension: .wav .mp3 .m4a -> <audio>, .mp4 .webm -> <video>. Keep the total under ~10 MB (base64 adds a
third).

Runtime: under 1 s for a few MB.
"""
import argparse
import base64
import html
import logging
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "media_gallery.log", encoding="utf-8")])
log = logging.getLogger("media_gallery")

MIME = {".wav": ("audio", "audio/wav"), ".mp3": ("audio", "audio/mpeg"), ".m4a": ("audio", "audio/mp4"),
        ".mp4": ("video", "video/mp4"), ".webm": ("video", "video/webm")}

CSS = """
:root { --bg: #fafaf7; --ink: #1d1d1f; --muted: #6b6b70; --line: #e2e2dc; --accent: #0033A0; }
@media (prefers-color-scheme: dark) { :root { --bg: #17181b; --ink: #ececec; --muted: #9a9aa2; --line: #2c2d31; --accent: #8fb0ff; } }
body { background: var(--bg); color: var(--ink); font: 16px/1.5 system-ui, "Segoe UI", Arial, sans-serif;
       max-width: 900px; margin: 0 auto; padding: 24px 16px 64px; }
h1 { font-size: 1.6rem; margin: 0 0 8px; }
.intro { color: var(--muted); white-space: pre-wrap; margin-bottom: 16px; }
nav ol { padding-left: 20px; }
nav a { color: var(--accent); }
details { border: 1px solid var(--line); border-radius: 8px; padding: 8px 14px; margin: 12px 0; }
summary { font-weight: 600; cursor: pointer; font-size: 1.1rem; }
.note { color: var(--muted); margin: 6px 0 10px; white-space: pre-wrap; }
audio { width: 100%; margin: 8px 0; }
video { max-height: 80vh; max-width: 100%; display: block; margin: 8px auto; background: #000; }
.meta { color: var(--muted); font-size: 0.85rem; }
"""


def build(files, title, intro, notes):
    toc, sections, total = [], [], 0
    for i, f in enumerate(files, 1):
        kind, mime = MIME.get(f.suffix.lower(), (None, None))
        if kind is None:
            raise SystemExit(f"unsupported file type: {f}")
        data = f.read_bytes()
        total += len(data)
        sid = f"clip{i}"
        name = html.escape(f.stem)
        toc.append(f'<li><a href="#{sid}">{name}</a></li>')
        note = notes.get(f.stem, "")
        player = (f'<{kind} controls preload="metadata" src="data:{mime};base64,{base64.b64encode(data).decode()}">'
                  f'</{kind}>')
        sections.append(f'<details open id="{sid}"><summary>{i}. {name}</summary>'
                        + (f'<div class="note">{html.escape(note)}</div>' if note else "")
                        + player + f'<div class="meta">{html.escape(f.name)}, {len(data) / 1e6:.2f} MB</div></details>')
    page = (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
            f'<meta name="viewport" content="width=device-width, initial-scale=1"><title>{html.escape(title)}</title>'
            f'<style>{CSS}</style></head><body><h1>{html.escape(title)}</h1>'
            + (f'<div class="intro">{html.escape(intro)}</div>' if intro else "")
            + f'<nav><strong>Contents</strong><ol>{"".join(toc)}</ol></nav>{"".join(sections)}</body></html>')
    return page, total


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("files", nargs="+", type=Path)
    ap.add_argument("--out", type=Path, required=True)
    ap.add_argument("--title", default="Clips")
    ap.add_argument("--intro", default="")
    ap.add_argument("--note", action="append", default=[], help='FILE_STEM="text", repeatable')
    args = ap.parse_args()
    t0 = time.time()
    notes = {}
    for n in args.note:
        stem, sep, text = n.partition("=")
        if not sep:
            raise SystemExit(f"--note needs STEM=text, got {n!r}")
        notes[stem] = text
    missing = [f for f in args.files if not f.exists()]
    if missing:
        raise SystemExit(f"missing files: {missing}")
    page, total = build(args.files, args.title, args.intro, notes)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(page, encoding="utf-8")
    log.info("%s: %d files, %.1f MB of media, page %.1f MB, %.2f s", args.out, len(args.files), total / 1e6,
             args.out.stat().st_size / 1e6, time.time() - t0)
    if args.out.stat().st_size > 10e6:
        log.warning("page is over 10 MB; consider smaller files")


if __name__ == "__main__":
    main()
