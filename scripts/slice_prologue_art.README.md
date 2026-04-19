# Prologue art slicer

Slices `prologue art/*.png` source images into per-frame PNGs under
`game_rebuild/public/assets/prologue/` plus an `atlas.json` manifest.

## Run

```bash
# from repo root
pip install Pillow
python scripts/slice_prologue_art.py
```

The script is idempotent: it deletes the output directory and regenerates every
file each run.

## Tuning composite crops

Uniform-grid assets slice cleanly by dividing the canvas. Composite assets
(`moretiles`, `portal`, `p02-tiles`, `prologue-boss`, `ui`) use hardcoded
rectangles in `COMPOSITE_ASSETS`. After the first run, inspect the outputs and
adjust rectangles in the script if needed, then re-run.
