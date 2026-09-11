"""
Les six morphologies, tirées de la planche fournie.

Trois opérations, dans cet ordre.

Le fond s'en va. Le trait est clair sur noir : la luminance fait donc
directement la transparence. On ne détoure pas, on convertit — aucun
contour à deviner, aucune frange grise autour des lignes. Un plancher
efface le bruit du JPEG, qui laissait un voile là où il n'y a rien.

La première figure est coupée au bord gauche de la planche : son bras
manque. Les silhouettes étant symétriques, on reconstruit la moitié
absente en reflétant la moitié présente autour de l'axe du cou.

La définition monte d'un facteur trois, et le trait est raffermi. On
part de 168 pixels de large par figure, ce qui est juste pour un écran
à double densité ; on finit à 504.

Les six partagent le même cadrage vertical, donc les mêmes hauteurs
d'épaule et de hanche : elles restent une famille.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

SOURCE = Path.home() / "Downloads" / "Gemini_Generated_Image_3ew5sk3ew5sk3ew5.jpeg"
SORTIE = Path("figures")
SORTIE.mkdir(exist_ok=True)

HAUT, BAS = 68, 522          # la bande des figures, lettres exclues
NOIR, BLANC = 26, 165        # les bornes de la luminance du trait
MARGE = 10                   # l'air autour de chaque figure
ECHELLE = 3

# L'axe de chaque figure et son bord droit, relevés sur la planche.
FIGURES = [
    ("o", 66, 153, True),    # coupée : à reconstruire par miroir
    ("a", 314, 398, False),
    ("v", 561, 645, False),
    ("h", 809, 893, False),
    ("8", 1046, 1130, False),
    ("x", 1293, 1377, False),
]


def alpha(bande: np.ndarray) -> np.ndarray:
    """La luminance devient l'opacité du trait."""
    a = (bande - NOIR) / (BLANC - NOIR)
    a = np.clip(a, 0, 1)
    a[a < 0.10] = 0          # le voile du JPEG
    return a


def main() -> None:
    source = np.asarray(Image.open(SOURCE).convert("L")).astype(float)
    bande = source[HAUT:BAS, :]

    # La demi-largeur nécessaire, commune aux six : le cadre ne change pas
    # d'une figure à l'autre.
    demis = [max(bord - axe, axe - 0) if coupee else max(bord - axe, axe - (axe - (bord - axe)))
             for _, axe, bord, coupee in FIGURES]
    demi = int(max(bord - axe for _, axe, bord, _ in FIGURES)) + MARGE

    for nom, axe, bord, coupee in FIGURES:
        if coupee:
            # La moitié droite, puis son reflet.
            droite = bande[:, axe:bord]
            gauche = droite[:, ::-1]
            entiere = np.concatenate([gauche, droite], axis=1)
            axe_local = droite.shape[1]
        else:
            g = max(0, axe - (bord - axe))
            entiere = bande[:, g:bord]
            axe_local = axe - g

        # On pose la figure au centre d'un cadre commun.
        h = entiere.shape[0]
        cadre = np.zeros((h, demi * 2), dtype=float)
        depart = demi - axe_local
        cadre[:, depart:depart + entiere.shape[1]] = entiere

        a = (alpha(cadre) * 255).astype(np.uint8)
        img = Image.fromarray(a, mode="L")
        img = img.resize((img.width * ECHELLE, img.height * ECHELLE), Image.LANCZOS)
        img = img.filter(ImageFilter.UnsharpMask(radius=2.2, percent=95, threshold=2))

        # Le trait est noir ; c'est la transparence qui le dessine. Le site
        # le recolorera par masque, donc la couleur n'a pas d'importance.
        sortie = Image.new("RGBA", img.size, (0, 0, 0, 0))
        sortie.putalpha(img)
        chemin = SORTIE / f"morphologie-{nom}.png"
        sortie.save(chemin, optimize=True)
        print(f"  {chemin.name:24} {sortie.size}  {chemin.stat().st_size // 1024} ko")


if __name__ == "__main__":
    main()
