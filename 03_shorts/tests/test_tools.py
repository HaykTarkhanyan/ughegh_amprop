"""Offline tests for the 03_shorts tools: no network, no paid calls, temp folders only. Runtime: about 2 s.

Run (from 03_shorts/):  python -m unittest discover -s tests -v
Each test reproduces one failure the Codex review (CODEX_REVIEW.md, 2026-11-26) found.
"""
import argparse
import json
import math
import sys
import tempfile
import unittest
import wave
from array import array
from pathlib import Path
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "tools"))
import build_timeline  # noqa: E402
import check_sync  # noqa: E402
import hy_numbers  # noqa: E402
import tts_gemini  # noqa: E402
import validate_episode  # noqa: E402


def tone(path: Path, seconds=0.5, sr=24000, amp=8000):
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes(array("h", [int(amp * math.sin(i / 8)) for i in range(int(seconds * sr))]).tobytes())


class TtsCache(unittest.TestCase):
    """X1: an interrupted run must keep the cache entries of beats it has not reached yet."""

    def run_beats(self, folder: Path, texts: dict, fail_on=None):
        (folder / "beats.hy.json").write_text(json.dumps([{"key": k, "text": t} for k, t in texts.items()]), encoding="utf-8")
        made = []

        def fake_say(a):
            key = Path(a.out).stem
            if key == fail_on:
                raise RuntimeError("network down")
            tone(Path(a.out))
            made.append(key)

        args = argparse.Namespace(beats_file=str(folder / "beats.hy.json"), out_dir=str(folder / "audio"),
                                  voice="Sadaltager", model="m", style="", key_name="X")
        with mock.patch.object(tts_gemini, "say", fake_say):
            tts_gemini.beats(args)
        return made

    def test_interrupted_run_keeps_unvisited_entries(self):
        with tempfile.TemporaryDirectory() as d:
            d = Path(d)
            self.assertEqual(self.run_beats(d, {"a": "one", "b": "two", "c": "three"}), ["a", "b", "c"])
            with self.assertRaises(RuntimeError):
                self.run_beats(d, {"a": "one!", "b": "two!", "c": "three"}, fail_on="b")
            man = json.loads((d / "audio" / "manifest.json").read_text(encoding="utf-8"))
            self.assertEqual(sorted(man["beats"]), ["a", "b", "c"])  # c's entry survived the failure
            # the retry makes only b again: a was redone before the failure, c never changed
            self.assertEqual(self.run_beats(d, {"a": "one!", "b": "two!", "c": "three"}), ["b"])

    def test_removed_beat_moves_to_unused_and_comes_back(self):
        with tempfile.TemporaryDirectory() as d:
            d = Path(d)
            self.run_beats(d, {"a": "one", "b": "two"})
            self.run_beats(d, {"a": "one"})
            man = json.loads((d / "audio" / "manifest.json").read_text(encoding="utf-8"))
            self.assertEqual(list(man["beats"]), ["a"])
            self.assertEqual(list(man["unused"]), ["b"])
            self.assertEqual(self.run_beats(d, {"a": "one", "b": "two"}), [])  # b is reused, no call

    def test_bad_script_stops_before_any_call(self):
        with tempfile.TemporaryDirectory() as d:
            d = Path(d)
            (d / "beats.hy.json").write_text(json.dumps([{"key": "a", "text": "x"}, {"key": "a", "text": "y"}]), encoding="utf-8")
            args = argparse.Namespace(beats_file=str(d / "beats.hy.json"), out_dir=str(d / "audio"),
                                      voice="v", model="m", style="", key_name="X")
            with mock.patch.object(tts_gemini, "say", side_effect=AssertionError("paid call made")):
                with self.assertRaises(SystemExit):
                    tts_gemini.beats(args)

    def test_default_style_is_empty(self):
        self.assertEqual(tts_gemini.DEFAULT_STYLE, "")  # X7


class ScriptValidation(unittest.TestCase):
    """X9: problems in a script are found before any work starts."""

    def check(self, beats):
        with tempfile.TemporaryDirectory() as d:
            (Path(d) / "beats.hy.json").write_text(json.dumps(beats), encoding="utf-8")
            return validate_episode.check_script(Path(d))[1]

    def test_duplicate_key(self):
        self.assertTrue(any("duplicate" in e for e in self.check([{"key": "a", "text": "x"}, {"key": "a", "text": "y"}])))

    def test_bad_pause(self):
        for p in (-1, "2", float("nan")):
            self.assertTrue(self.check([{"key": "a", "text": "x", "pause_after": p}]), p)

    def test_empty_text(self):
        self.assertTrue(self.check([{"key": "a", "text": "  "}]))

    def test_good_script(self):
        self.assertEqual(self.check([{"key": "a", "text": "x", "pause_after": 1.5}]), [])


class Audio(unittest.TestCase):
    """X5: silent or empty clips fail with a clear message instead of a bare StopIteration / ValueError."""

    def test_trim_silence(self):
        with self.assertRaises(SystemExit):
            build_timeline.trim(array("h", [0] * 2400), 24000, "silent_beat")
        with self.assertRaises(SystemExit):
            build_timeline.trim(array("h"), 24000, "empty_beat")

    def test_audible(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "x.wav"
            tone(p, amp=0)
            self.assertFalse(validate_episode.audible(p)[0])
            tone(p)
            self.assertTrue(validate_episode.audible(p)[0])


class Captions(unittest.TestCase):
    """X2: a word wider than the caption box must not pass as fitting."""

    def test_oversized_word_does_not_fit(self):
        w = [{"w": "բաժանորդագրություններում։"}]
        self.assertFalse(build_timeline.fits(w))
        with self.assertRaises(build_timeline.CaptionError):
            build_timeline.page_size(w)

    def test_normal_page_fits(self):
        w = [{"w": "Նույն"}, {"w": "սկզբունքը"}]
        self.assertTrue(build_timeline.fits(w))
        self.assertEqual(build_timeline.page_size(w), build_timeline.P["px"])


class Numbers(unittest.TestCase):
    """X6: decimals keep their places."""

    def test_decimal_places_differ(self):
        self.assertNotEqual(hy_numbers.spoken("0,05"), hy_numbers.spoken("0,005"))
        self.assertNotEqual(hy_numbers.spoken("0,5"), hy_numbers.spoken("0,05"))

    def test_plain_numbers_unchanged(self):
        self.assertEqual(hy_numbers.spoken("1983"), "հազար ինը հարյուր ութսուներեք")


class SyncCheck(unittest.TestCase):
    """X4: an unmatched comma is logged without a logging traceback."""

    def test_unmatched_row_logs_cleanly(self):
        row = {"beat": "b1", "kind": "comma", "after": "բառ,", "predicted": 1.0, "pause_start": None, "pause_len": None, "error": None}
        with self.assertLogs("check_sync", level="INFO") as cm:
            check_sync.log_row(row)
        self.assertIn("no matching pause", cm.output[0])


if __name__ == "__main__":
    unittest.main()
