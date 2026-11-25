"""Search Wikimedia Commons and download images with their licence and author, for use in shorts.

Usage (from 03_shorts/):
    python tools/fetch_commons.py search "ZIL refrigerator" [--limit 15]
    python tools/fetch_commons.py get "File:Survivorship-bias.svg" pilot_survivorship/assets [--width 1080] [--name bomber]
    python tools/fetch_commons.py credits pilot_survivorship/assets   # attribution lines for the video description
`search` prints title, licence, author and size. `get` saves a rendered copy (PNG/JPG thumbnail at --width; the
original too if it is an SVG) and adds an entry to <dir>/credits.json (title, page URL, author, licence, licence
URL, description, file). The credit line for the video description is built from credits.json.

The licence comes from the Commons API (imageinfo + extmetadata). Files without a licence in the metadata are
refused. Runtime: about 1-2 s per call (network).
"""
import argparse
import json
import logging
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "fetch_commons.log", encoding="utf-8")])
log = logging.getLogger("fetch_commons")

API = "https://commons.wikimedia.org/w/api.php"
UA = "shorts-research/0.1 (research script; python urllib)"
FIELDS = "Artist|LicenseShortName|LicenseUrl|ImageDescription|DateTimeOriginal|Credit"


def call(params):
    url = f"{API}?{urllib.parse.urlencode({**params, 'format': 'json'})}"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


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
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        out.write_bytes(r.read())
    log.info("saved %s (%.0f KB)", out, out.stat().st_size / 1024)


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
    if urllib.parse.urlparse(m["url"]).path.lower().endswith(".svg"):  # the URL carries a ?utm_... query
        svg = out_dir / f"{stem}.svg"
        download(m["url"], svg)
        files.append(svg.name)
    credits_path = out_dir / "credits.json"
    credits = json.loads(credits_path.read_text(encoding="utf-8")) if credits_path.exists() else []
    credits = [c for c in credits if c["title"] != m["title"]]
    credits.append({k: m[k] for k in ("title", "page_url", "author", "license", "license_url", "description", "date")}
                   | {"files": files})
    credits_path.write_text(json.dumps(credits, ensure_ascii=False, indent=2), encoding="utf-8")
    log.info("%s | %s | %s -> %s", m["title"], m["license"], m["author"][:60], files)


def credits(args):
    """Print one attribution line per file in <dir>/credits.json, ready for the video description."""
    items = json.loads((Path(args.dir) / "credits.json").read_text(encoding="utf-8"))
    lines = [f"{c['title'].split(':', 1)[1]}: {c['author']}, {c['license']}, via Wikimedia Commons ({c['page_url']})"
             for c in items]
    out = Path(args.dir) / "credits.txt"
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    for line in lines:
        log.info("%s", line)
    log.info("wrote %s", out)


def main():
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
    c = sub.add_parser("credits")
    c.add_argument("dir")
    args = ap.parse_args()
    t0 = time.time()
    {"search": search, "get": get, "credits": credits}[args.cmd](args)
    log.info("done in %.1f s", time.time() - t0)


if __name__ == "__main__":
    main()
