"""Search Wikimedia Commons and download images with their licence and author, for use in shorts.

Usage (from 03_shorts/):
    python tools/fetch_commons.py search "ZIL refrigerator" [--limit 15]
    python tools/fetch_commons.py get "File:Survivorship-bias.svg" pilot_survivorship/assets [--width 1080] [--name bomber]
                                      [--original] [--changes "red dots removed and animated separately"]
    python tools/fetch_commons.py credits pilot_survivorship/assets   # attribution lines for the video description
`search` prints title, licence, author and size. `get` saves a rendered copy (PNG/JPG thumbnail at --width) and at
once records it in <dir>/credits.json (title, page URL, author, Commons credit, licence, licence URL, description,
changes, files), written atomically. `--original` also fetches the original SVG; it is optional because Commons
answers bulk original downloads with HTTP 429 while thumbnails still arrive (learning 2026-11-25-1700), and a failed
original no longer loses the credit of the image already saved (Codex review X15): the command then exits 1 and
says which part failed. Read-only requests retry 429 / 5xx up to 4 times with growing waits. Credit lines carry the
licence link and any changes, as CC BY / BY-SA require (Codex review X16).

The licence comes from the Commons API (imageinfo + extmetadata). Files without a licence in the metadata are
refused. Runtime: about 1-2 s per call (network).
"""
import argparse
import json
import logging
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from runlog import setup as setup_logging  # noqa: E402
log = logging.getLogger("fetch_commons")

API = "https://commons.wikimedia.org/w/api.php"
UA = "shorts-research/0.1 (research script; python urllib)"
FIELDS = "Artist|LicenseShortName|LicenseUrl|ImageDescription|DateTimeOriginal|Credit"


def fetch(url, timeout, tries=4):
    """GET with bounded retries on 429 / 5xx (read-only requests only); any other error, or the last try, raises."""
    for attempt in range(tries):
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if (e.code == 429 or e.code >= 500) and attempt < tries - 1:
                wait = 5 * 2 ** attempt
                log.warning("HTTP %s from %s, retry %d/%d in %d s", e.code, url.split("?")[0], attempt + 1, tries - 1, wait)
                time.sleep(wait)
                continue
            raise


def call(params):
    url = f"{API}?{urllib.parse.urlencode({**params, 'format': 'json'})}"
    return json.loads(fetch(url, 30))


def clean(html_text):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html_text or "")).strip()


def meta(page):
    ii = page["imageinfo"][0]
    m = ii.get("extmetadata", {})
    return {
        "title": page["title"],
        "page_url": ii.get("descriptionurl", ""),
        "author": clean(m.get("Artist", {}).get("value")),
        "license": clean(m.get("LicenseShortName", {}).get("value")),
        "license_url": m.get("LicenseUrl", {}).get("value", ""),
        "credit": clean(m.get("Credit", {}).get("value"))[:200],
        "description": clean(m.get("ImageDescription", {}).get("value"))[:400],
        "date": clean(m.get("DateTimeOriginal", {}).get("value")),
        "width": ii.get("width"), "height": ii.get("height"),
        "url": ii.get("url"), "thumburl": ii.get("thumburl"),
    }


def search(args):
    d = call({"action": "query", "generator": "search", "gsrsearch": args.query, "gsrnamespace": 6,
              "gsrlimit": args.limit, "prop": "imageinfo", "iiprop": "url|size|extmetadata",
              "iiextmetadatafilter": FIELDS})
    pages = sorted(d.get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 0))
    for p in pages:
        m = meta(p)
        log.info("%s | %s | %s | %sx%s | %s", m["title"], m["license"] or "NO LICENCE", m["author"][:40],
                 m["width"], m["height"], m["description"][:80])
    log.info("%d results for %r", len(pages), args.query)


def download(url, out):
    out.write_bytes(fetch(url, 60))
    log.info("saved %s (%.0f KB)", out, out.stat().st_size / 1024)


def save_credit(out_dir, m, files, changes):
    path = out_dir / "credits.json"
    items = json.loads(path.read_text(encoding="utf-8")) if path.exists() else []
    old = next((c for c in items if c["title"] == m["title"]), {})
    items = [c for c in items if c["title"] != m["title"]]
    keep = ("title", "page_url", "author", "credit", "license", "license_url", "description", "date")
    items.append({k: m.get(k, "") for k in keep} | {"changes": changes or old.get("changes", ""),
                                                    "files": sorted(set(old.get("files", [])) | set(files))})
    tmp = path.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, path)


def get(args):
    d = call({"action": "query", "titles": args.title, "prop": "imageinfo", "iiprop": "url|size|extmetadata",
              "iiextmetadatafilter": FIELDS, "iiurlwidth": args.width})
    page = next(iter(d["query"]["pages"].values()))
    if "imageinfo" not in page:
        raise SystemExit(f"no such file on Commons: {args.title}")
    m = meta(page)
    if not m["license"]:
        raise SystemExit(f"{args.title}: no licence in the metadata, not downloading")
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = args.name or re.sub(r"[^\w.-]+", "_", Path(m["title"].split(":", 1)[1]).stem)
    files = []
    thumb = m["thumburl"] or m["url"]
    ext = Path(urllib.parse.urlparse(thumb).path).suffix.lower() or ".jpg"
    out = out_dir / f"{stem}{ext}"
    download(thumb, out)
    files.append(out.name)
    save_credit(out_dir, m, files, args.changes)  # recorded before anything optional can fail
    log.info("%s | %s | %s -> %s", m["title"], m["license"], m["author"][:60], files)
    if args.original and urllib.parse.urlparse(m["url"]).path.lower().endswith(".svg"):  # the URL has a ?utm_ query
        svg = out_dir / f"{stem}.svg"
        try:
            download(m["url"], svg)
        except urllib.error.HTTPError as e:
            log.error("partial success: %s saved and credited, but the original SVG failed (HTTP %s)", out.name, e.code)
            raise SystemExit(1)
        save_credit(out_dir, m, files + [svg.name], args.changes)


def credits(args):
    """Print one attribution line per file in <dir>/credits.json, ready for the video description."""
    items = json.loads((Path(args.dir) / "credits.json").read_text(encoding="utf-8"))
    lines = []
    for c in items:
        line = f"{c['title'].split(':', 1)[1]}: {c['author']}"
        if c.get("credit") and c["credit"] not in c["author"]:
            line += f" ({c['credit']})"
        line += f", {c['license']}"
        if c.get("license_url"):
            line += f" ({c['license_url']})"
        line += f", via Wikimedia Commons ({c['page_url']})"
        if c.get("changes"):
            line += f". Changes: {c['changes']}"
        lines.append(line)
    out = Path(args.dir) / "credits.txt"
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    for line in lines:
        log.info("%s", line)
    log.info("wrote %s", out)


def main():
    setup_logging("fetch_commons")
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("search")
    s.add_argument("query")
    s.add_argument("--limit", type=int, default=15)
    g = sub.add_parser("get")
    g.add_argument("title")
    g.add_argument("out_dir")
    g.add_argument("--width", type=int, default=1080)
    g.add_argument("--name", default="")
    g.add_argument("--original", action="store_true", help="also fetch the original SVG (optional, often rate-limited)")
    g.add_argument("--changes", default="", help="what the video changes in the image, for the credit line")
    c = sub.add_parser("credits")
    c.add_argument("dir")
    args = ap.parse_args()
    t0 = time.time()
    {"search": search, "get": get, "credits": credits}[args.cmd](args)
    log.info("done in %.1f s", time.time() - t0)


if __name__ == "__main__":
    main()
