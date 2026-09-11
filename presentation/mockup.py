"""
Le téléphone qui tient la capture.

Un cadre dessiné plutôt qu'une image trouvée : la capture fait
1170 × 2532 — la définition exacte d'un iPhone Pro — et le cadre se
construit autour d'elle au pixel près. Aucun redimensionnement, donc
aucun flou sur le texte.

Le fond reste transparent : la diapositive passe dessous, claire ou
noire.
"""

from pathlib import Path
from PIL import Image, ImageDraw

DOSSIER = Path("captures")
SORTIE = Path("mockups")
SORTIE.mkdir(exist_ok=True)

BORD = 34          # l'épaisseur de la lunette
RAYON_ECRAN = 165  # l'arrondi de la dalle
CORPS = "#0B0B0C"  # le titane, presque noir
LISERE = "#2E2E32"  # le liseré qui attrape la lumière


def arrondir(image: Image.Image, rayon: int) -> Image.Image:
    """Découpe les quatre coins de la capture."""
    masque = Image.new("L", image.size, 0)
    ImageDraw.Draw(masque).rounded_rectangle([0, 0, *[c - 1 for c in image.size]], rayon, fill=255)
    sortie = image.convert("RGBA")
    sortie.putalpha(masque)
    return sortie


def telephone(capture: Path, sortie: Path) -> None:
    ecran = Image.open(capture).convert("RGB")
    le, he = ecran.size
    lc, hc = le + 2 * BORD, he + 2 * BORD
    rayon_corps = RAYON_ECRAN + BORD

    cadre = Image.new("RGBA", (lc, hc), (0, 0, 0, 0))
    d = ImageDraw.Draw(cadre)
    # Le liseré, puis le corps posé dessus : deux rectangles, et la
    # tranche qui dépasse fait la lumière sur l'arête.
    d.rounded_rectangle([0, 0, lc - 1, hc - 1], rayon_corps, fill=LISERE)
    d.rounded_rectangle([3, 3, lc - 4, hc - 4], rayon_corps - 3, fill=CORPS)

    cadre.alpha_composite(arrondir(ecran, RAYON_ECRAN), (BORD, BORD))

    # L'îlot : une pastille noire posée sur la dalle, en haut.
    li, hi = 366, 102
    xi = (lc - li) // 2
    yi = BORD + 33
    d2 = ImageDraw.Draw(cadre)
    d2.rounded_rectangle([xi, yi, xi + li, yi + hi], hi // 2, fill="#000000")

    cadre.save(sortie)


if __name__ == "__main__":
    for f in sorted(DOSSIER.glob("tel-*.png")):
        s = SORTIE / f.name.replace("tel-", "iphone-")
        telephone(f, s)
        print(f"  {s.name}  {Image.open(s).size}")
