"""Generate favicons and OpenGraph image for the Markaz Rabithah Logo Guide.

Output files (all written to artifacts/markaz-rabithah/public/):
  - favicon-32.png            (32 x 32)
  - favicon-192.png           (192 x 192)
  - apple-touch-icon.png      (180 x 180)
  - opengraph.jpg             (1200 x 630)
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "attached_assets"
PUBLIC = ROOT / "artifacts" / "markaz-rabithah" / "public"
LOGO_MARK = ASSETS / "Logo_Markaz_Rabithah_2_1777345186295.png"
LOGO_FULL = ASSETS / "Markaz_Rabithah_Logo_1_1777345170344.png"
FONT_DISPLAY = ASSETS / "Sk-Modernist-Bold_1777344266318.otf"

NAVY = (10, 29, 55)            # #0A1D37
NAVY_DEEP = (6, 19, 37)        # darker
CRIMSON = (178, 34, 34)        # #B22222
IVORY = (244, 239, 230)        # #F4EFE6


def fit_logo(logo: Image.Image, box: int, padding: float = 0.18) -> Image.Image:
    """Scale logo to fit a square of size ``box`` with relative ``padding``."""
    inner = int(box * (1 - 2 * padding))
    w, h = logo.size
    scale = min(inner / w, inner / h)
    return logo.resize((int(w * scale), int(h * scale)), Image.LANCZOS)


def make_square_icon(size: int, *, corner_radius: float = 0.22) -> Image.Image:
    """Navy rounded square with the logo mark centered."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    # rounded rect mask
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle((0, 0, size, size), radius=int(size * corner_radius), fill=255)

    # gradient navy bg
    bg = Image.new("RGBA", (size, size))
    bd = ImageDraw.Draw(bg)
    for y in range(size):
        t = y / max(1, size - 1)
        r = int(NAVY[0] * (1 - t) + NAVY_DEEP[0] * t)
        g = int(NAVY[1] * (1 - t) + NAVY_DEEP[1] * t)
        b = int(NAVY[2] * (1 - t) + NAVY_DEEP[2] * t)
        bd.line([(0, y), (size, y)], fill=(r, g, b, 255))

    canvas.paste(bg, (0, 0), mask)

    # subtle radial vignette (skipped for very small icons)
    if size >= 64:
        vig = Image.new("L", (size, size), 0)
        vd = ImageDraw.Draw(vig)
        steps = 8
        start = int(size * 0.2)
        end = int(size * 1.2)
        for i in range(steps):
            shrink = i * (size // 32 + 1)
            x0 = -start + shrink
            x1 = end - shrink
            if x1 - x0 < 4:
                break
            alpha = int(18 * (i / max(1, steps - 1)))
            vd.ellipse((x0, x0, x1, x1), fill=alpha)
        overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        overlay.putalpha(vig)
        canvas = Image.alpha_composite(canvas, overlay)

    # logo
    logo = Image.open(LOGO_MARK).convert("RGBA")
    fitted = fit_logo(logo, size, padding=0.16 if size >= 96 else 0.12)
    cx = (size - fitted.width) // 2
    cy = (size - fitted.height) // 2
    canvas.alpha_composite(fitted, (cx, cy))
    return canvas


def make_opengraph(width: int = 1200, height: int = 630) -> Image.Image:
    """1200x630 OG image with logo + title."""
    img = Image.new("RGB", (width, height), NAVY_DEEP)
    d = ImageDraw.Draw(img, "RGBA")

    # vertical gradient navy
    for y in range(height):
        t = y / max(1, height - 1)
        r = int(NAVY[0] * (1 - t) + NAVY_DEEP[0] * t)
        g = int(NAVY[1] * (1 - t) + NAVY_DEEP[1] * t)
        b = int(NAVY[2] * (1 - t) + NAVY_DEEP[2] * t)
        d.line([(0, y), (width, y)], fill=(r, g, b))

    # crimson radial glow upper-left
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    cx, cy = int(width * 0.28), int(height * 0.35)
    for i in range(28):
        alpha = max(0, 110 - i * 4)
        rad = 80 + i * 22
        gd.ellipse((cx - rad, cy - rad, cx + rad, cy + rad), fill=(*CRIMSON, alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    d = ImageDraw.Draw(img, "RGBA")

    # subtle grid
    for x in range(0, width, 60):
        d.line([(x, 0), (x, height)], fill=(244, 239, 230, 8))
    for y in range(0, height, 60):
        d.line([(0, y), (width, y)], fill=(244, 239, 230, 8))

    # logo on left
    logo = Image.open(LOGO_FULL).convert("RGBA")
    target_h = int(height * 0.42)
    scale = target_h / logo.height
    logo_r = logo.resize((int(logo.width * scale), target_h), Image.LANCZOS)
    img.paste(logo_r, (int(width * 0.07), int((height - logo_r.height) / 2)), logo_r)

    # text on right
    try:
        title_font = ImageFont.truetype(str(FONT_DISPLAY), 64)
        sub_font = ImageFont.truetype(str(FONT_DISPLAY), 30)
        small_font = ImageFont.truetype(str(FONT_DISPLAY), 22)
    except Exception:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()
        small_font = ImageFont.load_default()

    text_x = int(width * 0.46)
    text_y = int(height * 0.30)

    # eyebrow
    d.text((text_x, text_y), "BRAND  GUIDE", fill=(*CRIMSON, 255), font=small_font, spacing=8)
    # title
    d.text((text_x, text_y + 38), "Markaz Rabithah", fill=IVORY, font=title_font)
    d.text((text_x, text_y + 110), "Logo Guide", fill=IVORY, font=title_font)
    # divider
    d.line(
        [(text_x, text_y + 200), (text_x + 100, text_y + 200)],
        fill=(*CRIMSON, 230),
        width=3,
    )
    # studio
    d.text((text_x, text_y + 215), "by SYMP Studio", fill=(244, 239, 230, 180), font=sub_font)

    # bottom crimson stripe
    d.rectangle((0, height - 6, width, height), fill=CRIMSON)

    return img


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    for size, name in [(32, "favicon-32.png"), (192, "favicon-192.png"), (180, "apple-touch-icon.png")]:
        icon = make_square_icon(size)
        icon.save(PUBLIC / name, "PNG")
        print(f"wrote {name} ({size}x{size})")

    og = make_opengraph()
    og.save(PUBLIC / "opengraph.jpg", "JPEG", quality=88, optimize=True)
    print("wrote opengraph.jpg (1200x630)")


if __name__ == "__main__":
    main()
