#!/usr/bin/env python3
"""One-off: background-removal + optimisation for the new bottle photos.

Picture1-3 are JPGs on solid white. We flood-fill the background inward from
the image border, which strips the white surround while leaving the white/cream
*label* (fully enclosed by the dark bottle) untouched. Picture4-7 already ship
with a transparent alpha channel, so they only need cropping + WebP encoding.
Output: optimised, content-cropped WebP with transparency.
"""
from PIL import Image, ImageDraw, ImageFilter

SENT = (255, 0, 255)          # sentinel colour to paint flooded background
PAD = 6                        # transparent padding around the cropped bottle


def near_white(px, tol=22):
    return px[0] >= 255 - tol and px[1] >= 255 - tol and px[2] >= 255 - tol


def remove_white_bg(path, thresh=90, tol=22):
    im = Image.open(path).convert("RGB")
    w, h = im.size

    # Seed a flood fill from every near-white border pixel. thresh is generous
    # so the fill consumes the anti-aliased grey halo around the bottle, but it
    # can only travel through connected background, never reaching the label.
    border = (
        [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)] +
        [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]
    )
    for seed in border:
        if im.getpixel(seed) != SENT and near_white(im.getpixel(seed), tol):
            ImageDraw.floodfill(im, seed, SENT, thresh=thresh)

    # Alpha: 0 where flooded background, 255 elsewhere; soften the edge a touch.
    px = im.load()
    mask = Image.new("L", (w, h), 0)
    mpx = mask.load()
    for y in range(h):
        for x in range(w):
            mpx[x, y] = 0 if px[x, y] == SENT else 255
    mask = mask.filter(ImageFilter.GaussianBlur(0.6))

    out = im.convert("RGBA")
    out.putalpha(mask)
    return out


def load_transparent(path):
    return Image.open(path).convert("RGBA")


def crop_and_save(rgba, out_path):
    bbox = rgba.split()[3].getbbox()
    if bbox:
        l, t, r, b = bbox
        l, t = max(0, l - PAD), max(0, t - PAD)
        r, b = min(rgba.width, r + PAD), min(rgba.height, b + PAD)
        rgba = rgba.crop((l, t, r, b))
    rgba.save(out_path, "WEBP", quality=86, method=6, alpha_quality=100)
    return rgba.size


JOBS = [
    ("images/Picture1.jpg", "images/special-reserve.webp",      remove_white_bg),
    ("images/Picture2.jpg", "images/saperavi-reserve.webp",     remove_white_bg),
    # Pale white-wine bottle: low thresh so bright glass highlights survive.
    ("images/Picture3.jpg", "images/alazani-reserve.webp",
        lambda p: remove_white_bg(p, thresh=34, tol=10)),
    ("images/Picture4.png", "images/alazani-estate-white.webp", load_transparent),
    ("images/Picture5.png", "images/rkatsiteli-estate.webp",    load_transparent),
    ("images/Picture6.png", "images/alazani-estate-red.webp",   load_transparent),
    ("images/Picture7.png", "images/saperavi-estate.webp",      load_transparent),
]

if __name__ == "__main__":
    import os
    for src, dst, fn in JOBS:
        size = crop_and_save(fn(src), dst)
        kb = os.path.getsize(dst) / 1024
        print(f"{os.path.basename(dst):28} {size[0]}x{size[1]}  {kb:6.1f} KB")
