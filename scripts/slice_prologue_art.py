#!/usr/bin/env python3
"""Slice prologue art PNGs into per-frame files + atlas manifest.

Re-runnable. Deletes DST/ before writing. Run from repo root:
    python scripts/slice_prologue_art.py
"""
from __future__ import annotations

from collections import deque
import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw

REPO = Path(__file__).resolve().parent.parent
SRC = REPO / "prologue art"
DST = REPO / "game_rebuild" / "public" / "assets" / "prologue"

# Uniform-grid assets: filename -> (output_dir, cols, rows)
GRID_ASSETS: dict[str, tuple[str, int, int]] = {
    "tileset.png": ("tileset", 6, 4),
    "mc.png": ("mc", 6, 3),
    "mcmore.png": ("mcmore", 6, 3),
    "profnode.png": ("node", 8, 4),
    "p01-npc.png": ("rune-keeper", 4, 2),
    "p02-npc.png": ("console-keeper", 4, 2),
    "gates.png": ("gates", 4, 2),
    "p01tiles.png": ("p01-tiles", 4, 3),
    "atmosphere.png": ("atmosphere", 9, 4),  # 3 color bands x 3 cols
}

# Composite assets: filename -> list of (name, x, y, w, h)
# Coords are estimates on a 2816x1536 canvas; refine after first run by
# viewing outputs and updating these rectangles.
COMPOSITE_ASSETS: dict[str, list[tuple[str, int, int, int, int]]] = {
    "moretiles.png": [
        ("bridge_straight_h", 650, 80, 240, 240),
        ("bridge_straight_v", 650, 340, 240, 240),
        ("bridge_corner_ne", 910, 80, 240, 240),
        ("bridge_corner_nw", 1170, 80, 240, 240),
        ("bridge_tee", 1430, 80, 240, 240),
        ("arena_hub", 100, 820, 620, 620),
        ("crystal_small", 2400, 820, 180, 180),
        ("crystal_large", 2400, 1020, 260, 260),
    ],
    "portal.png": [
        ("locked", 120, 960, 380, 500),
        ("active_0", 520, 960, 380, 500),
        ("swirl_0", 80, 60, 350, 350),
        ("swirl_1", 460, 60, 350, 350),
        ("swirl_2", 840, 60, 350, 350),
        ("swirl_3", 1220, 60, 350, 350),
    ],
    "p02-tiles.png": [
        ("shard_red_0", 80, 40, 180, 280),
        ("shard_red_1", 280, 40, 180, 280),
        ("shard_red_2", 480, 40, 180, 280),
        ("shard_red_3", 680, 40, 180, 280),
        ("shard_blue_0", 920, 40, 180, 280),
        ("shard_blue_1", 1120, 40, 180, 280),
        ("shard_blue_2", 1320, 40, 180, 280),
        ("shard_blue_3", 1520, 40, 180, 280),
        ("shard_green_0", 1800, 40, 180, 280),
        ("shard_green_1", 2000, 40, 180, 280),
        ("shard_green_2", 2200, 40, 180, 280),
        ("shard_green_3", 2400, 40, 180, 280),
        ("console_red", 80, 380, 380, 520),
        ("console_blue", 920, 380, 380, 520),
        ("console_green", 1800, 380, 380, 520),
        ("console_red_active", 80, 980, 380, 520),
        ("console_blue_active", 920, 980, 380, 520),
        ("console_green_active", 1800, 980, 380, 520),
    ],
    "prologue-boss.png": [
        ("phase1_whole", 100, 120, 560, 560),
        ("phase2_shard_0", 900, 120, 280, 280),
        ("phase2_shard_1", 1200, 120, 280, 280),
        ("phase2_shard_2", 1500, 120, 280, 280),
        ("phase2_shard_3", 900, 420, 280, 280),
        ("phase2_shard_4", 1200, 420, 280, 280),
        ("phase2_shard_5", 1500, 420, 280, 280),
        ("phase3_frame_0", 1100, 900, 320, 320),
        ("phase3_frame_1", 1440, 900, 320, 320),
        ("phase3_frame_2", 1780, 900, 320, 320),
        ("phase3_frame_3", 2120, 900, 320, 320),
    ],
    "ui.png": [
        ("dialogue_box", 167, 171, 1466, 607),
        ("portrait_inactive", 1775, 276, 375, 384),
        ("portrait_active", 2170, 204, 534, 520),
        ("prompt", 1492, 952, 1159, 229),
    ],
}


def color_bucket(pixel: tuple[int, int, int, int], bucket_size: int) -> tuple[int, int, int]:
    r, g, b, _ = pixel
    return (r // bucket_size, g // bucket_size, b // bucket_size)


def edge_seed_buckets(im: Image.Image, bucket_size: int, stride: int = 4) -> set[tuple[int, int, int]]:
    width, height = im.size
    pix = im.load()
    seeds: set[tuple[int, int, int]] = set()

    for x in range(0, width, stride):
        for y in (0, height - 1):
            seeds.add(color_bucket(pix[x, y], bucket_size))
    for y in range(0, height, stride):
        for x in (0, width - 1):
            seeds.add(color_bucket(pix[x, y], bucket_size))
    return seeds


def remove_edge_background(frame: Image.Image, bucket_size: int = 16) -> Image.Image:
    """Make border-connected sheet backgrounds transparent.

    Some source sheets bake checkerboard or dark matte backgrounds into the
    PNGs. Flood-filling from frame edges keeps the sprite content while removing
    the rectangular matte that would otherwise be visible in Phaser.
    """
    im = frame.convert("RGBA")
    width, height = im.size
    pix = im.load()
    seeds = edge_seed_buckets(im, bucket_size)
    visited = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= width or y >= height:
            continue
        idx = y * width + x
        if visited[idx]:
            continue
        if color_bucket(pix[x, y], bucket_size) not in seeds:
            continue

        visited[idx] = 1
        queue.append((x - 1, y))
        queue.append((x + 1, y))
        queue.append((x, y - 1))
        queue.append((x, y + 1))

    out = im.copy()
    out_pix = out.load()
    for y in range(height):
        row = y * width
        for x in range(width):
            if visited[row + x]:
                r, g, b, _ = out_pix[x, y]
                out_pix[x, y] = (r, g, b, 0)
    return out


def clean_dialogue_box(frame: Image.Image) -> Image.Image:
    """Remove baked sample text from the dialogue-box crop."""
    out = frame.copy()
    draw = ImageDraw.Draw(out, "RGBA")
    draw.rounded_rectangle((85, 95, 1380, 505), radius=8, fill=(31, 26, 38, 255))
    return out


def prepare_frame(frame: Image.Image, source: str, name: str | None = None) -> Image.Image:
    out = remove_edge_background(frame)
    if source == "ui.png" and name == "dialogue_box":
        out = clean_dialogue_box(out)
    return out


def slice_grid(src: Path, out_dir: Path, cols: int, rows: int) -> list[dict]:
    im = Image.open(src).convert("RGBA")
    width, height = im.size
    fw, fh = width // cols, height // rows
    out_dir.mkdir(parents=True, exist_ok=True)
    frames = []
    for r in range(rows):
        for c in range(cols):
            idx = r * cols + c
            frame = im.crop((c * fw, r * fh, (c + 1) * fw, (r + 1) * fh))
            frame = prepare_frame(frame, src.name)
            rel = f"{out_dir.name}/frame_{idx}.png"
            frame.save(out_dir / f"frame_{idx}.png")
            frames.append({"index": idx, "path": rel})
    return frames


def slice_composite(src: Path, out_dir: Path, regions: list[tuple]) -> list[dict]:
    im = Image.open(src).convert("RGBA")
    out_dir.mkdir(parents=True, exist_ok=True)
    frames = []
    for name, x, y, w, h in regions:
        frame = im.crop((x, y, x + w, y + h))
        frame = prepare_frame(frame, src.name, name)
        frame.save(out_dir / f"{name}.png")
        frames.append({"name": name, "path": f"{out_dir.name}/{name}.png"})
    return frames


def stitch_sheet(out_dir: Path, cols: int, rows: int, frame_w: int, frame_h: int) -> None:
    """Write a `sheet.png` that concatenates frames in grid order.

    Phaser's load.spritesheet reads a single grid image with frameWidth/
    frameHeight, so we re-assemble the grid from the individual frames.
    """
    sheet = Image.new("RGBA", (cols * frame_w, rows * frame_h), (0, 0, 0, 0))
    for r in range(rows):
        for c in range(cols):
            idx = r * cols + c
            frame = Image.open(out_dir / f"frame_{idx}.png").convert("RGBA")
            sheet.paste(frame, (c * frame_w, r * frame_h))
    sheet.save(out_dir / "sheet.png")


def main() -> None:
    if DST.exists():
        shutil.rmtree(DST)
    DST.mkdir(parents=True)

    atlas = {"grid": {}, "composite": {}}

    for filename, (out_name, cols, rows) in GRID_ASSETS.items():
        src = SRC / filename
        if not src.exists():
            raise FileNotFoundError(src)
        im = Image.open(src)
        width, height = im.size
        fw, fh = width // cols, height // rows
        frames = slice_grid(src, DST / out_name, cols, rows)
        stitch_sheet(DST / out_name, cols, rows, fw, fh)
        atlas["grid"][out_name] = {
            "source": filename,
            "cols": cols,
            "rows": rows,
            "frameWidth": fw,
            "frameHeight": fh,
            "frameCount": len(frames),
            "sheet": f"{out_name}/sheet.png",
        }
        print(f"[grid]      {filename:20s} -> {out_name}/ ({len(frames)} frames + sheet.png)")

    for filename, regions in COMPOSITE_ASSETS.items():
        src = SRC / filename
        if not src.exists():
            raise FileNotFoundError(src)
        out_name = src.stem
        frames = slice_composite(src, DST / out_name, regions)
        atlas["composite"][out_name] = {
            "source": filename,
            "frames": frames,
        }
        print(f"[composite] {filename:20s} -> {out_name}/ ({len(frames)} frames)")

    (DST / "atlas.json").write_text(json.dumps(atlas, indent=2))
    print(f"\nWrote atlas: {DST / 'atlas.json'}")


if __name__ == "__main__":
    main()
