"""
Les six morphologies, tirées de la planche fournie.

Trois opérations, dans cet ordre.

Le fond s'en va. Le trait est clair sur noir : la luminance fait donc
directement la transparence. On ne détoure pas, on convertit — aucun
contour à deviner, aucune frange grise autour des lignes. Un plancher
efface le bruit du JPEG, qui laissait un voile là où il n'y a rien.

La première figure est coupée au bord gauche de la planche : il lui
manque vingt et une colonnes, soit le bord extérieur du bras. On ne
reflète que cette tranche-là, prise à la même distance de l'axe sur le
côté droit, et on la soude par recouvrement sur cinq colonnes.

Refléter la moitié entière, comme au premier essai, effaçait la pose :
ces croquis ne sont pas symétriques — le poids porte sur une jambe, les
bras ne tombent pas pareil. La figure devenait raide, et la maison l'a
vu tout de suite.

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
SORTIE = Path(__file__).resolve().parent.parent / "public" / "croquis"
SORTIE.mkdir(parents=True, exist_ok=True)

HAUT, BAS = 68, 522          # la bande des figures, lettres exclues
NOIR, BLANC = 26, 165        # les bornes de la luminance du trait
MARGE = 10                   # l'air autour de chaque figure
ECHELLE = 3
LARGE = 500                  # la carte n'en demande pas plus, même en double densité

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
            # Ce qui manque à gauche, pris à droite et retourné.
            demi_droite = bord - axe
            manque = demi_droite - axe
            recouvre = 5
            tranche = bande[:, axe + axe - recouvre : bord][:, ::-1]
            entiere = np.zeros((bande.shape[0], manque + bord), dtype=float)
            entiere[:, manque:] = bande[:, 0:bord]
            # La soudure : on garde le trait le plus marqué des deux.
            large = tranche.shape[1]
            zone = entiere[:, 0:large]
            entiere[:, 0:large] = np.maximum(zone, tranche)
            axe_local = manque + axe
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
        img = Image.fromarray(a)
        img = img.resize((img.width * ECHELLE, img.height * ECHELLE), Image.LANCZOS)
        img = img.filter(ImageFilter.UnsharpMask(radius=2.2, percent=95, threshold=2))

        # Le trait est noir ; c'est la transparence qui le dessine. Le site
        # le recolorera par masque, donc la couleur n'a pas d'importance.
        if img.width > LARGE:
            img = img.resize((LARGE, round(img.height * LARGE / img.width)), Image.LANCZOS)
        sortie = Image.new("RGBA", img.size, (0, 0, 0, 0))
        sortie.putalpha(img)
        chemin = SORTIE / f"morphologie-{nom}.webp"
        sortie.save(chemin, "WEBP", quality=74, method=6, exact=True)
        print(f"  {chemin.name:24} {sortie.size}  {chemin.stat().st_size // 1024} ko")


if __name__ == "__main__":
    main()
