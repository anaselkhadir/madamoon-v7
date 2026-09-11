"""
Les images à la taille où elles servent.

Une capture de 2 880 pixels posée sur sept pouces de diapositive en
gaspille les deux tiers : à 200 points par pouce, mille huit cents
suffisent. Le fichier passe de quatre-vingt-seize méga-octets à neuf,
et l'œil ne voit pas la différence.

Les téléphones finissent en JPEG sur fond blanc : le PNG rend mal la
photographie, et toutes les diapositives qui les portent sont blanches.
"""

from pathlib import Path
from PIL import Image

LARGE = 1800
TEL = 760

Path("images").mkdir(exist_ok=True)

for src in sorted(Path("captures").glob("*.png")):
    if src.stem.endswith("-entier"):
        continue
    im = Image.open(src).convert("RGB")
    if im.width > LARGE:
        im = im.resize((LARGE, round(im.height * LARGE / im.width)), Image.LANCZOS)
    im.save(Path("images") / f"{src.stem}.jpg", "JPEG", quality=86, optimize=True, progressive=True)

for src in sorted(Path("mockups").glob("*.png")):
    tel = Image.open(src).convert("RGBA")
    if tel.width > TEL:
        tel = tel.resize((TEL, round(tel.height * TEL / tel.width)), Image.LANCZOS)
    fond = Image.new("RGB", tel.size, "white")
    fond.paste(tel, mask=tel.split()[3])
    fond.save(Path("images") / f"{src.stem}.jpg", "JPEG", quality=88, optimize=True, progressive=True)

poids = sum(f.stat().st_size for f in Path("images").iterdir())
print(f"{len(list(Path('images').iterdir()))} images — {poids / 1e6:.1f} Mo")
