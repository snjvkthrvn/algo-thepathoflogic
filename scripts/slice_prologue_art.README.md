# Prologue art slicer

Slices `prologue art/*.png` source images into per-frame PNGs under
`game_rebuild/public/assets/prologue/` plus an `atlas.json` manifest.

## Run

```bash
# from repo root
pip install Pillow
python scripts/slice_prologue_art.py
```

Idempotent: deletes the output directory and regenerates every run.

## Tuning composite crops

Uniform-grid assets slice cleanly by dividing the canvas. Composite assets
(moretiles, portal, p02-tiles, prologue-boss, ui) use hardcoded rectangles
in `COMPOSITE_ASSETS`. After first run, open the outputs and adjust
rectangles in the script as needed, then re-run.

The slicer also removes border-connected matte/checkerboard backgrounds so the
generated sprites render cleanly over Phaser scenes.
