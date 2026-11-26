"""Episode index and script review queue, generated from the scripts themselves (Codex review X57, X58, 2026-11-26).

Writes:
  episodes.json            one row per episode: folder, title, strand, layout, beats, planned length, script hash,
                           narration state (none / gemini-tts / hayk, and whether its clips match the current text),
                           the script hash Hayk approved (kept across runs) and a status. Counts, lengths and release
                           state are read from here instead of being copied into several pages by hand.
  review_queue.json        the review page's spec: every item ID ends in the script's hash (A3-1f0c2e), so a tick
                           saved for an older version never comes back and every approval names the exact version.
  review_queue_picker.html rebuilt with the html-review picker.

Approving a script: python tools/episodes.py --approve <folder>  (records the current hash as approved; a later
script edit turns the status back to "changed since approval").
Usage (from 03_shorts/): python tools/episodes.py   Runtime: under 2 s.
"""
import argparse
import hashlib
import json
import logging
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from runlog import setup as setup_logging  # noqa: E402

log = logging.getLogger("episodes")
SHORTS = Path(__file__).resolve().parents[1]
PICKER = Path.home() / ".claude/skills/html-review/scripts/picker.py"
FIRST = ["zero_knowledge", "zero_knowledge_short"]
# publishing order after the first video (README, Fable F233, pending Hayk)
ORDER = ["own_voice", "decoy_popcorn", "bayes_test", "map_projection", "friendship", "painted_statues", "petrov",
         "mashtots", "english_spelling", "crypto_paint", "crypto_long", "yawning", "week_seven", "regression", "dmanisi",
         "ikea_effect", "kids_tv", "simpson", "minute_60", "luggage_wheels", "waiting", "qwerty"]
THINKING = {"pilot_survivorship", "bayes_test", "simpson", "regression", "decoy_popcorn", "ikea_effect", "dmanisi",
            "painted_statues", "friendship", "petrov", "kids_tv", "crypto_paint", "crypto_long", "zero_knowledge", "zero_knowledge_short"}
# what each script says now, and its open review points (U-ids from the plans); refreshed after the Codex review
NOTES = {
    "zero_knowledge": ("Gossip hook; websites and banks have the same problem; Where's Waldo (placed while the friend looks away); "
                       "the red card (only the 26 black cards shown); the colour-blind balls; why 'zero knowledge' (he already "
                       "knew every answer); real systems on signed data; the gossip answer. Long 16:9 + Short 9:16, your narration.",
                       "Open: U-ooo gossip set-up, U-ppp terms in your mouth, re-check the Codex rewrites of the card, 'why zero' and Waldo beats"),
    "own_voice": ("Air + bone conduction; the recording is thinner, less bass; plug your ears (louder and bassier); people rated "
                  "their own unlabelled voice higher; part of the cringe is probably surprise.", "Open: U-bb terms, «ավելի ուժեղ ու թավ» (X53)"),
    "decoy_popcorn": ("Small 1x / medium 2x / large 3x popcorn; the subscription decoy (84% vs 32%) as the clean case; the effect "
                      "is weaker than told; ask what you need and what you will pay.", "Open: U-xx «խայծի էֆեկտ», U-zz «ադիբուդի»"),
    "bayes_test": ("1,000 dots: a positive means 50%, 9% for a rarer disease; many doctors miss it too; a second, independent test "
                   "gives ~99%, the same test repeated stays at 50%.", "Open: U-a address, U-b «սկրինինգ» (now only on the source line), U-d HIV line"),
    "map_projection": ("Africa is 14x Greenland; drag Greenland south, lift Armenia north (area x6); orange peel and Gauss; why "
                       "Mercator stretched; Web Mercator cut at 85°; switch on globe view in Google Maps.", "Open: U-ccc «պրոյեկցիա», U-ddd «Գուգլ քարտեզները»"),
    "friendship": ("20-person network: friends' friends average ~5 vs 3.6; 17 of 20 here have fewer friends than their friends; "
                   "popular people sit on many lists; Facebook 93%; flu and vaccination use.", "Open: U-s term, U-t hook wording"),
    "painted_statues": ("Statues were painted; traces under raking light, UV, and Egyptian blue's infrared glow seen by a camera; "
                        "the Peplos Kore; why we thought white; Akhtamar; copies are hypotheses.", "Open: U-hhh local anchor, U-iii «Պեպլոսով կորե»"),
    "petrov": ("5 missiles on screen; Petrov weighed the alarm against the prior, the new system's reliability and the silent "
               "radars; sun glint on clouds; his role debated; check the signal against the rest.", "Open: U-y terms, U-aa sensitivity"),
    "mashtots": ("Write «ճնճղուկ» with one Greek letter per sound; author, year, first sentence; as far as possible one sound one "
                 "letter (ու is two); the Greek order kept; letters as numbers; the script stayed.", "Open: U-ll wording, U-mm the classical sentence, how the voice reads «ճ»-ի / «ղ»-ի"),
    "english_spelling": ("-ough read five ways; many silent letters were once pronounced; knight (consonants), house (vowel shift); "
                         "printing froze spellings, borrowings and learned respellings too; Webster; 'not wrong, old'.", "Open: U-pp term, U-qq transliterations in the voice"),
    "crypto_paint": ("Agreeing a key in public: paint analogy (yellow + secret red / blue); Eva cannot unmix; numbers instead of "
                     "paint, no known practical fast way back; toy numbers; authentication still needed.", "Open: U-p terms, U-q discrete logarithm, «գործնականում անհնար» (X44)"),
    "crypto_long": ("Second long video (16:9): how strangers agree a secret in public: paint first, then clock arithmetic and the real exchange with 5 and 23 (both get 2); GCHQ had it first; Eva in the middle and certificates; quantum computers and the new exchanges.",
                    "Decided: TTS voice, all three limits, Short kept, later slot. Open: LQ4 terms"),
    "yawning": ("About half catch a yawn; the oxygen idea failed; cooling theory; kin > strangers vs the null result; honestly, "
                "we do not know; how many times did you yawn?", "Open: U-dd «վարակվել», U-ee the comment call-to-action"),
    "week_seven": ("Sky gives day, month, year, not the week; the continuous week does not follow the Moon; Sabbath week (Armenian "
                   "day names); planet days; 24 mod 7 draws the star; Soviet weeks failed.", "Open: U-ss ուրբաթ etymology, U-tt terms, U-uu Soviet detail"),
    "regression": ("Kahneman's flight instructors; 1,000 simulated students: best 92 -> 82, worst 47 -> 59, and backwards; "
                   "regression to the mean; a randomised comparison is the check.", "Open: «ռեգրեսիա դեպի միջինը», U-j «նախատինք»"),
    "dmanisi": ("Toothless man near Armenia; the 'someone fed him' story vs what the bone shows; a toothless bonobo; soft food, "
                "adaptation and help may all have played a part.", "Open: U-jj terms, «կարեկցանք» here vs in yawning (X54)"),
    "ikea_effect": ("Builders pay 63% more for their own box; crooked origami frogs; only if finished; it becomes 'my box'; maybe "
                    "the same elsewhere (not measured); ask someone who did not build it.", "Open: U-aaa brand in the voice, U-bbb local touch"),
    "kids_tv": ("Plausible mechanisms: the orienting reflex, bright fast shows, repetition; attention follows understanding; the "
                "2011 study and the later fantastical-content experiments; WHO: no sedentary screens under 2, 1 hour at 2-4.",
                "Open: U-ff CoComelon meant?, U-hh terms"),
    "simpson": ("Kidney stones: 78% vs 83% overall, higher in both groups; who got which treatment; the weighted average with the "
                "division by 350; Berkeley's six departments; compare like with like, no causal proof.", "Open: U-e «ֆակուլտետ», U-f method names"),
    "minute_60": ("A real 10-hour French clock; base 60 is ancient (why, unknown); count to 60 on your hands; 60 divides well; "
                  "minuta / secunda; why decimal time failed, we do not know for sure.", "Open: U-vv the Russian link"),
    "luggage_wheels": ("Zero work on the load, yet you sweat: muscles use energy to hold a load, and walking lifts it each step; "
                       "wheels take both away on a smooth floor; 'work is zero, energy is not'.", "Open: U-kkk Yerevan pavement joke, U-lll «բորտուղեկցորդ»"),
    "waiting": ("The same 8 minutes feel long or short; the Houston story (unverified); Maister's rules; Disney's posted waits; "
                "waiting is partly the clock, partly the feeling.", "Open: U-m «Մայստեր», U-o «ուղեբեռի ժապավեն»; queue maths parked as its own video"),
    "qwerty": ("Not made to slow typists: telegraph operators shaped it, Remington built it, every new machine inherited it, down "
               "to the Armenian phonetic layout.", "Open: the spoken form «քվերթի» (X55), U-v terms"),
}


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def episode(folder: Path, old: dict) -> dict:
    beats = json.loads((folder / "beats.hy.json").read_text(encoding="utf-8"))
    plan = folder / "PLAN.md"
    text = plan.read_text(encoding="utf-8") if plan.exists() else ""
    title = re.sub(r"^# (Short: )?", "", text.splitlines()[0]).split(" - script")[0] if text else folder.name
    m = re.search(r"~(\d+):(\d\d) with pauses", text)
    est = int(m.group(1)) * 60 + int(m.group(2)) if m else None
    ep_file = folder / "episode.json"
    layout = json.loads(ep_file.read_text(encoding="utf-8")).get("layout", "portrait") if ep_file.exists() else "portrait"
    man = folder / "audio" / "manifest.json"
    narration = {"narrator": None, "matches_script": None}
    if man.exists():
        mj = json.loads(man.read_text(encoding="utf-8"))
        clips = mj.get("beats", {})
        narration = {"narrator": mj.get("narrator", "gemini-tts"),
                     "matches_script": all(clips.get(b["key"], {}).get("text") == b["text"] for b in beats)}
    script_sha = sha(folder / "beats.hy.json")[:12]
    approved = old.get("approved_sha")
    if folder.name == "pilot_survivorship":
        status = "pilot (rendered; script changed by the Codex review, voice and render outdated)"
    elif approved == script_sha:
        status = "approved"
    elif approved:
        status = "changed since approval"
    else:
        status = "script waiting for review"
    return {"folder": folder.name, "title": title, "strand": "thinking error" if folder.name in THINKING else "why is it so",
            "layout": layout, "beats": len(beats), "planned_s": est, "script_sha": script_sha,
            "approved_sha": approved, "narration": narration, "status": status}


def main():
    setup_logging("episodes")
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--approve", metavar="FOLDER", help="record the current script hash of FOLDER as approved")
    args = ap.parse_args()
    idx_path = SHORTS / "episodes.json"
    old = {e["folder"]: e for e in json.loads(idx_path.read_text(encoding="utf-8"))} if idx_path.exists() else {}
    folders = sorted(p.parent for p in SHORTS.glob("*/beats.hy.json"))
    if args.approve:
        if args.approve not in {f.name for f in folders}:
            raise SystemExit(f"no episode folder {args.approve}")
        old.setdefault(args.approve, {})["approved_sha"] = sha(SHORTS / args.approve / "beats.hy.json")[:12]
    eps = [episode(f, old.get(f.name, {})) for f in folders]
    idx_path.write_text(json.dumps(eps, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    by = {e["folder"]: e for e in eps}
    missing = [f for f in by if f not in ORDER + FIRST + ["pilot_survivorship"]]
    if missing:
        raise SystemExit(f"episodes not in the publishing order: {missing}")

    def fmt(s):
        return f"~{s // 60}:{s % 60:02d}" if s else "length ?"

    def item(n, prefix, folder, tag):
        e = by[folder]
        if folder == "zero_knowledge":
            s = by["zero_knowledge_short"]
            h = hashlib.sha256((e["script_sha"] + s["script_sha"]).encode()).hexdigest()[:6]
            title = (f"FIRST VIDEO, zero-knowledge proofs (long 16:9, {e['beats']} beats, {fmt(e['planned_s'])} + Short 9:16, "
                     f"{s['beats']} beats, {fmt(s['planned_s'])}, scripts {e['script_sha'][:6]} / {s['script_sha'][:6]})")
        else:
            h = e["script_sha"][:6]
            title = f"{e['title']} ({folder}, {e['beats']} beats, {fmt(e['planned_s'])}, script {h})"
        note, detail = NOTES[folder]
        if tag == "fix":
            return {"id": f"C{n}-{h}", "title": f"Needs changes: {title}", "exclusive": folder,
                    "note": f"Leave comments on {folder}/PLAN.html", "detail": []}
        return {"id": f"A{n}-{h}", "title": f"Approve: {title}", "exclusive": folder, "note": note, "detail": [detail]}

    groups = [("First video", ["zero_knowledge"]), ("In publishing order", ORDER)]
    sections = []
    for sid, stitle, tag, prefix in (("approve", "Approve (voice + animation can start)", "ok", "A"),
                                     ("fix", "Needs changes (comment on that short's PLAN.html)", "fix", "C")):
        n, gs = 0, []
        for gtitle, fl in groups:
            items = []
            for f in fl:
                n += 1
                items.append(item(n, prefix, f, tag))
            gs.append({"title": gtitle, "items": items})
        sections.append({"id": sid, "title": stitle, "tag": tag, "groups": gs,
                         "intro": "Each item ID ends in the script's hash: an approval covers exactly that version."})
    spec_path = SHORTS / "review_queue.json"
    spec = json.loads(spec_path.read_text(encoding="utf-8"))
    spec.update({"date": date.today().isoformat(), "sections": sections,
                 "subtitle": "Tick 'approve' (voice + animation can start) or 'needs changes' for each script. Comment on "
                             "details on that short's PLAN.html page. Every script was revised after the Codex review "
                             "(2026-11-26); approvals name the script hash.",
                 "warning": "Nothing is voiced or animated until approved here (Q17). Approving costs about $0.05 of TTS "
                            "per short. After approving, run: python tools/episodes.py --approve <folder>."})
    spec["choices"] = [c for c in spec.get("choices", []) if "showcase" not in json.dumps(c, ensure_ascii=False)]
    spec_path.write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    r = subprocess.run([sys.executable, "-I", str(PICKER), str(spec_path)], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        raise SystemExit(f"picker failed: {r.stderr[-600:]}")
    counts = {}
    for e in eps:
        counts[e["status"]] = counts.get(e["status"], 0) + 1
    log.info("%d episodes -> %s; review queue %s with %d items per section; %s", len(eps), idx_path.name, spec_path.name,
             sum(len(g["items"]) for g in sections[0]["groups"]), counts)


if __name__ == "__main__":
    main()
