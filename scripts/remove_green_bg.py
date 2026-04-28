"""Remove the solid green background from the hero portrait.

Picks the dominant background color from the image corners, then makes any
pixel within a tolerance transparent. Adds a soft alpha falloff at the edge
so the cutout doesn't look harsh.
"""
from __future__ import annotations

import sys
from pathlib import Path
from PIL import Image


SRC = Path("attached_assets/image_1777350285072.png")
DST = Path("artifacts/markaz-rabithah/src/assets/hero-portrait.png")

import colorsys


def sample_bg(img: Image.Image) -> tuple[int, int, int]:
    """Average the four corners to estimate the background color."""
    w, h = img.size
    px = img.load()
    r = g = b = 0
    n = 0
    for x, y in [(2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3)]:
        pr, pg, pb = px[x, y][:3]
        r += pr
        g += pg
        b += pb
        n += 1
    return (r // n, g // n, b // n)


def is_green_bg(r: int, g: int, b: int, bg_h: float) -> tuple[bool, float]:
    """Return (is_bg, alpha_factor where 1.0=keep, 0.0=clear).

    The background is a muted sage green. We classify by HSV:
    - hue close to bg hue (within 25°)
    - saturation low-to-medium (background is desaturated)
    - value medium-high (it's not a shadow)
    """
    h, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
    hue_dist = min(abs(h - bg_h), 1.0 - abs(h - bg_h))  # circular
    if hue_dist > 0.10:
        return False, 1.0
    if v < 0.45:
        return False, 1.0  # too dark to be the bright bg
    # Hue matches; classify by saturation. Background sat ~0.11. Pixels with
    # saturation in [0.05, 0.22] are bg. Below 0.05 the pixel is essentially
    # white/gray (the hat) — keep it. Above 0.22 it's an intentional color.
    if s < 0.05:
        return False, 1.0  # near-white/gray, keep (e.g. white hat)
    if s < 0.22:
        return True, 0.0
    if s < 0.35:
        t = (s - 0.22) / (0.35 - 0.22)
        return False, t
    return False, 1.0


def main() -> int:
    DST.parent.mkdir(parents=True, exist_ok=True)
    src = Image.open(SRC).convert("RGB")
    bg_r, bg_g, bg_b = sample_bg(src)
    bg_h, bg_s, bg_v = colorsys.rgb_to_hsv(bg_r / 255.0, bg_g / 255.0, bg_b / 255.0)
    print(
        f"detected background ≈ rgb({bg_r}, {bg_g}, {bg_b}) "
        f"hsv({bg_h * 360:.0f}°, {bg_s:.2f}, {bg_v:.2f})"
    )

    rgba = src.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    cleared = 0
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            is_bg, keep = is_green_bg(r, g, b, bg_h)
            if is_bg:
                px[x, y] = (r, g, b, 0)
                cleared += 1
            elif keep < 1.0:
                px[x, y] = (r, g, b, int(255 * keep))

    # Denoise: any pixel that sits in a mostly-transparent neighborhood is
    # leftover background speckle — clear it. Two passes to nibble away small
    # clusters of stray pixels.
    alpha = rgba.split()[-1]
    apx = alpha.load()
    speckle_cleared = 0
    for _ in range(2):
        # snapshot alpha to avoid cascading clears within a single pass
        snap = [[apx[x, y] for x in range(w)] for y in range(h)]
        for y in range(1, h - 1):
            for x in range(1, w - 1):
                if snap[y][x] == 0:
                    continue
                opaque = 0
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        if dx == 0 and dy == 0:
                            continue
                        if snap[y + dy][x + dx] > 200:
                            opaque += 1
                if opaque <= 2:
                    r, g, b, _ = px[x, y]
                    px[x, y] = (r, g, b, 0)
                    apx[x, y] = 0
                    speckle_cleared += 1
    print(f"speckle pass cleared {speckle_cleared} px")

    # Crop to non-transparent bounding box for a tighter asset
    bbox = rgba.getbbox()
    if bbox:
        rgba = rgba.crop(bbox)

    rgba.save(DST, "PNG", optimize=True)
    print(f"cleared {cleared} bg px -> {DST} ({rgba.size[0]}x{rgba.size[1]})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
