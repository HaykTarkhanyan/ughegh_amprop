# HyperFrames with 2+ render workers stores every frame on disk (~2.9 GB for a 71 s short)

**Symptom:** the third HyperFrames render of the pilot short (1080x1920, 71 s, `--workers 2`) failed at frame 9 of
2133 although `check` had passed:

```
[Parallel] Capture failed: Worker 0: Disk capture may need ~2921.4 MB of temporary frame storage (measured from the
first 10 frames), but only 1836.6 MB is free at C:\Users\hayk_\AppData\Local\Temp\hf-render-...\captured-frames.
... re-run this render with --workers 1 to stream frames into the encoder instead.
```

**Cause:** with more than one worker, HyperFrames screenshots every frame to a JPEG in `%TEMP%` and encodes at the end.
With one worker it streams frames straight into the encoder. C: had 1.8 GB free of 475.6 GB that night.

**Consequences:**
- On this laptop render HyperFrames with `--workers 1`. The second worker barely helps anyway: measured on the same
  71 s composition, 2 workers took 3 min 52 s, 1 worker 4 min 8 s.
- Remotion streams frames by default, so it never needed the temp space (4 min 3 s - 4 min 44 s with
  `--concurrency=2`).
- Before any render, check free space on C: when it is under ~5 GB.
