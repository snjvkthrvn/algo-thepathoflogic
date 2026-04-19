#!/usr/bin/env python3
"""Slice prologue art PNGs into per-frame files and an atlas manifest.

Re-runnable. Deletes DST before writing. Run from repo root:
    python scripts/slice_prologue_art.py
"""
from __future__ import annotations

import json
import shutil
from collections import deque
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw


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
    "atmosphere.png": ("atmosphere", 9, 4),
}

# Composite crop rectangles are calibrated for the 2816x1536 source canvases.
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
        ("dialogue_box", 80, 80, 1400, 400),
        ("portrait_inactive", 1560, 80, 300, 300),
        ("portrait_active", 1900, 80, 300, 300),
        ("prompt", 200, 900, 700, 200),
    ],
}


def slice_grid(src: Path, out_dir: Path, cols: int, rows: int) -> list[dict]:
    im = Image.open(src).convert("RGBA")
    width, height = im.size
    frame_w, frame_h = width // cols, height // rows
    out_dir.mkdir(parents=True, exist_ok=True)
    frames = []

    for row in range(rows):
        for col in range(cols):
            index = row * cols + col
            frame = make_background_transparent(
                im.crop(
                    (
                        col * frame_w,
                        row * frame_h,
                        (col + 1) * frame_w,
                        (row + 1) * frame_h,
                    )
                ),
                remove_checker=out_dir.name in {"mc", "mcmore", "gates"},
                remove_dark=out_dir.name != "atmosphere",
            )
            rel = f"{out_dir.name}/frame_{index}.png"
            frame.save(out_dir / f"frame_{index}.png")
            frames.append({"index": index, "path": rel})

    return frames


def slice_composite(src: Path, out_dir: Path, regions: list[tuple]) -> list[dict]:
    im = Image.open(src).convert("RGBA")
    out_dir.mkdir(parents=True, exist_ok=True)
    frames = []

    for name, x, y, width, height in regions:
        frame = im.crop((x, y, x + width, y + height))
        if out_dir.name == "ui" and name == "dialogue_box":
            frame = make_clean_dialogue_box(width, height)
        elif out_dir.name == "ui" and name in {"portrait_active", "portrait_inactive"}:
            frame = make_clean_portrait_frame(width, height, active=name == "portrait_active")
        elif out_dir.name == "ui":
            frame = make_background_transparent(frame, remove_checker=True, remove_dark=False)
        if out_dir.name == "portal":
            frame = make_background_transparent(frame, remove_checker=True, remove_dark=False)
        frame.save(out_dir / f"{name}.png")
        frames.append({"name": name, "path": f"{out_dir.name}/{name}.png"})

    return frames


def is_background_like(pixel: tuple[int, int, int, int]) -> bool:
    r, g, b, alpha = pixel
    if alpha == 0:
        return True

    avg = (r + g + b) / 3
    spread = max(r, g, b) - min(r, g, b)

    # Generated source sheets use checkerboard grey or very dark matte
    # backgrounds. Only edge-connected pixels are removed, so similarly colored
    # interior sprite details are preserved.
    return (spread <= 18 and 45 <= avg <= 210) or (spread <= 28 and avg <= 35)


def is_fast_background(pixel: tuple[int, int, int, int], remove_checker: bool, remove_dark: bool) -> bool:
    r, g, b, alpha = pixel
    if alpha == 0:
        return True

    avg = (r + g + b) / 3
    spread = max(r, g, b) - min(r, g, b)
    is_checker = spread <= 24 and ((70 <= avg <= 110) or (160 <= avg <= 200))
    is_dark_matte = spread <= 32 and avg <= 36

    return (remove_checker and is_checker) or (remove_dark and is_dark_matte)


def make_background_transparent(
    image: Image.Image,
    *,
    remove_checker: bool,
    remove_dark: bool,
) -> Image.Image:
    im = image.convert("RGBA")
    r, g, b, alpha = im.split()
    clear_mask = Image.new("L", im.size, 0)

    if remove_dark:
        dark_mask = ImageChops.multiply(
            r.point(lambda value: 255 if value <= 45 else 0),
            ImageChops.multiply(
                g.point(lambda value: 255 if value <= 50 else 0),
                b.point(lambda value: 255 if value <= 60 else 0),
            ),
        )
        clear_mask = ImageChops.lighter(clear_mask, dark_mask)

    if remove_checker:
        neutral_mask = ImageChops.multiply(
            ImageChops.difference(r, g).point(lambda value: 255 if value <= 28 else 0),
            ImageChops.multiply(
                ImageChops.difference(g, b).point(lambda value: 255 if value <= 28 else 0),
                ImageChops.difference(r, b).point(lambda value: 255 if value <= 28 else 0),
            ),
        )
        dark_checker = ImageChops.multiply(
            neutral_mask,
            ImageChops.multiply(
                r.point(lambda value: 255 if 25 <= value <= 145 else 0),
                ImageChops.multiply(
                    g.point(lambda value: 255 if 25 <= value <= 145 else 0),
                    b.point(lambda value: 255 if 25 <= value <= 145 else 0),
                ),
            )
        )
        light_checker = ImageChops.multiply(
            neutral_mask,
            ImageChops.multiply(
                r.point(lambda value: 255 if 130 <= value <= 255 else 0),
                ImageChops.multiply(
                    g.point(lambda value: 255 if 130 <= value <= 255 else 0),
                    b.point(lambda value: 255 if 130 <= value <= 255 else 0),
                ),
            )
        )
        clear_mask = ImageChops.lighter(clear_mask, ImageChops.lighter(dark_checker, light_checker))

    im.putalpha(ImageChops.subtract(alpha, clear_mask))
    return im


def make_clean_dialogue_box(width: int, height: int) -> Image.Image:
    image = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    margin = 22
    radius = 24

    draw.rounded_rectangle(
        (margin + 10, margin + 10, width - margin + 10, height - margin + 10),
        radius=radius,
        fill=(0, 0, 0, 120),
    )
    draw.rounded_rectangle(
        (margin, margin, width - margin, height - margin),
        radius=radius,
        fill=(32, 26, 39, 242),
        outline=(42, 36, 52, 255),
        width=12,
    )
    draw.rounded_rectangle(
        (margin + 18, margin + 18, width - margin - 18, height - margin - 18),
        radius=radius - 8,
        outline=(120, 108, 132, 180),
        width=5,
    )
    draw.rounded_rectangle(
        (margin + 34, margin + 34, width - margin - 34, height - margin - 34),
        radius=radius - 12,
        outline=(18, 14, 24, 210),
        width=4,
    )
    return image


def make_clean_portrait_frame(width: int, height: int, *, active: bool) -> Image.Image:
    image = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    margin = 16
    glow = (6, 214, 224, 96) if active else (120, 108, 132, 48)
    border = (6, 214, 224, 255) if active else (120, 108, 132, 220)
    inner = (28, 22, 36, 242)

    for inset, alpha in [(0, 48), (7, 72), (14, 96)]:
        draw.rounded_rectangle(
            (margin - inset, margin - inset, width - margin + inset, height - margin + inset),
            radius=22 + inset,
            outline=(glow[0], glow[1], glow[2], alpha),
            width=5,
        )
    draw.rounded_rectangle(
        (margin, margin, width - margin, height - margin),
        radius=18,
        fill=inner,
        outline=border,
        width=10,
    )
    draw.rounded_rectangle(
        (margin + 20, margin + 20, width - margin - 20, height - margin - 20),
        radius=10,
        outline=(160, 150, 174, 180),
        width=4,
    )
    return image


def make_edge_background_transparent(image: Image.Image) -> Image.Image:
    im = image.convert("RGBA")
    width, height = im.size
    data = list(im.getdata())
    total = width * height
    background = bytearray(1 if is_background_like(pixel) else 0 for pixel in data)
    visited = bytearray(total)
    queue: deque[int] = deque()

    def enqueue(index: int) -> None:
        if not visited[index]:
            visited[index] = 1
            queue.append(index)

    for x in range(width):
        enqueue(x)
        enqueue((height - 1) * width + x)
    for y in range(height):
        enqueue(y * width)
        enqueue(y * width + width - 1)

    while queue:
        index = queue.pop()
        if not background[index]:
            continue

        r, g, b, _ = data[index]
        data[index] = (r, g, b, 0)
        x = index % width

        if x > 0:
            enqueue(index - 1)
        if x + 1 < width:
            enqueue(index + 1)
        if index >= width:
            enqueue(index - width)
        if index < total - width:
            enqueue(index + width)

    im.putdata(data)
    return im


def stitch_sheet(out_dir: Path, cols: int, rows: int, frame_w: int, frame_h: int) -> None:
    """Write a sheet.png that Phaser can load as a spritesheet."""
    sheet = Image.new("RGBA", (cols * frame_w, rows * frame_h), (0, 0, 0, 0))

    for row in range(rows):
        for col in range(cols):
            index = row * cols + col
            frame = Image.open(out_dir / f"frame_{index}.png").convert("RGBA")
            sheet.paste(frame, (col * frame_w, row * frame_h))

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
        frame_w, frame_h = width // cols, height // rows
        frames = slice_grid(src, DST / out_name, cols, rows)
        stitch_sheet(DST / out_name, cols, rows, frame_w, frame_h)

        atlas["grid"][out_name] = {
            "source": filename,
            "cols": cols,
            "rows": rows,
            "frameWidth": frame_w,
            "frameHeight": frame_h,
            "frameCount": len(frames),
            "sheet": f"{out_name}/sheet.png",
        }
        print(f"[grid]      {filename:20s} -> {out_name}/ ({len(frames)} frames + sheet.png)")

    for filename, regions in COMPOSITE_ASSETS.items():
        src = SRC / filename
        if not src.exists():
            raise FileNotFoundError(src)

        out_name = src.stem
        slice_composite(src, DST / out_name, regions)
        atlas["composite"][out_name] = {
            "source": filename,
            "frames": [{"name": name, "path": f"{out_name}/{name}.png"} for name, *_ in regions],
        }
        print(f"[composite] {filename:20s} -> {out_name}/ ({len(regions)} frames)")

    (DST / "atlas.json").write_text(json.dumps(atlas, indent=2))
    print(f"\nWrote atlas: {DST / 'atlas.json'}")


if __name__ == "__main__":
    main()
