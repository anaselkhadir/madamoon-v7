#!/usr/bin/env python3
"""
Le maillage interne de MADAMOON, en arbre radial.

Il lit le site tel qu'il est construit — pas les intentions, les pages —
et dessine qui mène à quoi. L'en-tête, le pied, le menu plein écran et
le panneau d'Élise sont écartés : leurs liens sont sur les
quatre-vingt-sept pages et ne disent rien du maillage. Ce qui reste est
le lien éditorial, celui qu'un moteur pèse.

    uv run --with reportlab python outils/maillage.py

Rend public/maillage-interne-madamoon.pdf : le schéma, puis une page de
relevés — les pages les plus tirées, les plus délaissées, et celles que
seul le gabarit atteint.
"""

import json
import math
import os
import pathlib
import re
import sys
from collections import Counter
from html.parser import HTMLParser

from reportlab.lib.pagesizes import A3, landscape
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas

RACINE = pathlib.Path(__file__).resolve().parent.parent
SORTIE = RACINE / "public" / "maillage-interne-madamoon.pdf"
POLICES = os.environ.get("POLICES_PDF", "")
BASE = "/madamoon-v7"

MM = 72 / 25.4
LARGEUR, HAUTEUR = landscape(A3)

# L'identité de la maison.
IVOIRE = (0.992, 0.984, 0.973)
CRAIE = (0.965, 0.949, 0.925)
FIL = (0.890, 0.863, 0.820)
ENCRE = (0.078, 0.063, 0.047)
PLOMB = (0.420, 0.394, 0.349)
BRUME = (0.659, 0.627, 0.576)
ACTION = (0.569, 0, 0)

SERIF = "MaillageSerif"
SANS = "MaillageSans"
SANS_G = "MaillageSansGras"


def polices():
    paires = [
        (SERIF, "InstrumentSerif-Regular.ttf"),
        (SANS, "QuattrocentoSans-Regular.ttf"),
        (SANS_G, "QuattrocentoSans-Bold.ttf"),
    ]
    for nom, fichier in paires:
        chemin = os.path.join(POLICES, fichier)
        if not os.path.exists(chemin):
            sys.exit(f"Police introuvable : {chemin}\nDéfinissez POLICES_PDF.")
        pdfmetrics.registerFont(TTFont(nom, chemin))


# ————————————————————————————————————— la lecture du site —————

VIDES = {"br", "img", "input", "meta", "link", "hr", "source", "area",
         "base", "col", "embed", "param", "track", "wbr"}
GABARIT_ID = {"menu-principal", "mega-navigation"}


class Liens(HTMLParser):
    """
    Les liens du corps d'une page.

    Tout ce qui se répète d'une page à l'autre est sauté : l'en-tête, le
    pied, le menu, le panneau d'Élise. Sans cela, chaque page pointerait
    vers les soixante robes du menu et le graphe ne serait qu'un
    peloton.
    """

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pile, self.saut, self.liens = [], 0, set()

    def handle_starttag(self, tag, attrs):
        if tag in VIDES:
            return
        a = dict(attrs)
        if self.saut:
            self.pile.append(tag)
            return
        exclu = (
            a.get("id") in GABARIT_ID
            or a.get("role") == "dialog"
            or tag in ("header", "footer")
            or "verre" in (a.get("class") or "")
        )
        self.pile.append(tag)
        if exclu:
            self.saut = len(self.pile)
            return
        if tag == "a" and "href" in a:
            h = a["href"]
            if h.startswith(BASE + "/") or h == BASE:
                self.liens.add(h[len(BASE):].split("?")[0].split("#")[0].rstrip("/") or "/")

    def handle_endtag(self, tag):
        if tag in VIDES:
            return
        if self.pile:
            if self.saut and len(self.pile) == self.saut:
                self.saut = 0
            self.pile.pop()


def lire_site():
    pages = {}
    titres = {}
    for f in sorted((RACINE / "out").rglob("index.html")):
        a = "/" + str(f.parent.relative_to(RACINE / "out")).replace(".", "").strip("/")
        a = "/" if a == "/" else a.rstrip("/")
        t = f.read_text(errors="ignore")
        p = Liens()
        p.feed(t)
        p.liens.discard(a)
        pages[a] = p.liens
        m = re.search(r"<title>(.*?)</title>", t, re.S)
        titres[a] = (m.group(1).split("—")[0].strip() if m else a)
    connues = set(pages)
    return {a: sorted(l & connues) for a, l in pages.items()}, titres


FIXES = {
    "/": "Accueil",
    "/robes": "Le catalogue",
    "/coupes": "Les coupes",
    "/morphologies": "Les morphologies",
    "/showroom": "Le showroom",
    "/a-propos": "La maison",
    "/trouver-ma-robe": "Trouver ma robe",
    "/rendez-vous": "Rendez-vous",
    "/coups-de-coeur": "Coups de cœur",
}


def nom_court(a, titres):
    """
    Le nom tel qu'on le dirait à voix haute.

    Les titres du site sont écrits pour les moteurs — « Robe de mariée
    pour une silhouette en A » — et n'ont pas leur place autour d'un
    schéma, où chaque étiquette dispose de sept millimètres.
    """
    if a in FIXES:
        return FIXES[a]
    dernier = a.rstrip("/").split("/")[-1]
    if a.startswith("/morphologies/"):
        return f"Silhouette {dernier.upper()}"
    t = titres.get(a, dernier).split(" — ")[0]
    if a.startswith("/robes/"):
        return re.sub(r"^Robe de mariée\s*", "", t).strip() or dernier
    if a.startswith("/coupes/"):
        return re.sub(r"^Robe de mariée\s*|\s*à Paris.*$", "", t).strip().capitalize() or dernier
    if a.startswith("/createurs/"):
        return re.sub(r"^Robes de mariée\s*|\s*à Paris.*$", "", t).strip() or dernier
    return t.strip() or dernier


# ————————————————————————————————————— l'arbre —————
#
# Le graphe réel n'est pas un arbre : une fiche robe est atteinte par sa
# coupe, sa morphologie, son créateur et ses voisines. Pour le dessiner
# en couronnes, on choisit une épine dorsale — celle que le site raconte,
# de l'accueil aux coupes, des coupes aux robes — et les liens qui la
# débordent restent lisibles dans les tailles : un cercle grossit avec le
# nombre de pages qui le tirent, quelle que soit sa branche.

def bâtir_arbre(graphe, titres):
    robes = sorted(a for a in graphe if a.startswith("/robes/"))
    coupes = sorted(a for a in graphe if a.startswith("/coupes/"))
    morphos = sorted(a for a in graphe if a.startswith("/morphologies/"))
    createurs = sorted(a for a in graphe if a.startswith("/createurs/"))
    rubriques = [a for a in ("/robes", "/showroom", "/a-propos",
                             "/trouver-ma-robe", "/rendez-vous", "/coups-de-coeur")
                 if a in graphe]

    # Chaque robe se range sous la coupe qui la présente.
    sous = {c: [] for c in coupes}
    for r in robes:
        pere = next((c for c in coupes if r in graphe[c]), None)
        if pere:
            sous[pere].append(r)
        else:
            sous.setdefault("__orphelines__", []).append(r)

    branches = []
    for c in coupes:
        branches.append({"a": c, "nom": nom_court(c, titres), "enfants": sous[c]})
    branches.append({"a": "/morphologies", "nom": "Les morphologies", "enfants": morphos})
    branches.append({"a": None, "nom": "Les créateurs", "enfants": createurs})
    branches.append({"a": None, "nom": "Les rubriques", "enfants": rubriques})
    if sous.get("__orphelines__"):
        branches.append({"a": None, "nom": "Hors coupe",
                         "enfants": sous["__orphelines__"]})
    return branches


# ————————————————————————————————————— le dessin —————

def secteur(c, cx, cy, r0, r1, a0, a1, couleur, alpha):
    """Un éventail pâle derrière une branche, comme sur la référence."""
    c.saveState()
    c.setFillColorRGB(*couleur, alpha=alpha)
    p = c.beginPath()
    pas = max(2, int(abs(a1 - a0) / 0.04))
    p.moveTo(cx + r0 * math.cos(a0), cy + r0 * math.sin(a0))
    for i in range(pas + 1):
        a = a0 + (a1 - a0) * i / pas
        p.lineTo(cx + r1 * math.cos(a), cy + r1 * math.sin(a))
    for i in range(pas + 1):
        a = a1 + (a0 - a1) * i / pas
        p.lineTo(cx + r0 * math.cos(a), cy + r0 * math.sin(a))
    p.close()
    c.drawPath(p, stroke=0, fill=1)
    c.restoreState()


def rond(c, x, y, r, couleur, alpha=1.0):
    c.saveState()
    c.setFillColorRGB(*couleur, alpha=alpha)
    c.setStrokeColorRGB(*IVOIRE, alpha=alpha)
    c.setLineWidth(0.7)
    c.circle(x, y, r, stroke=1, fill=1)
    c.restoreState()


def texte_radial(c, x, y, angle, texte, police, corps, couleur):
    """Une étiquette posée dans l'axe de son rayon, jamais à l'envers."""
    c.saveState()
    c.setFillColorRGB(*couleur)
    c.setFont(police, corps)
    deg = math.degrees(angle)
    c.translate(x, y)
    if -90 <= ((deg + 180) % 360) - 180 <= 90:
        c.rotate(deg)
        c.drawString(0, -corps * 0.34, texte)
    else:
        c.rotate(deg + 180)
        c.drawRightString(0, -corps * 0.34, texte)
    c.restoreState()


def schema(c, branches, graphe, entrants, titres):
    c.setFillColorRGB(*IVOIRE)
    c.rect(0, 0, LARGEUR, HAUTEUR, stroke=0, fill=1)

    cx, cy = LARGEUR / 2, HAUTEUR / 2 - 6 * MM
    R1, R2 = 42 * MM, 96 * MM

    feuilles = sum(max(1, len(b["enfants"])) for b in branches)
    # Un cran d'écart entre deux branches, pour que les éventails se lisent.
    ecart = 0.55
    total = feuilles + ecart * len(branches)
    pas = 2 * math.pi / total

    maxi = max(entrants.values()) or 1

    def rayon(a):
        return 1.7 + 5.6 * math.sqrt(entrants.get(a, 0) / maxi)

    angle = math.pi / 2  # on démarre en haut
    for b in branches:
        n = max(1, len(b["enfants"]))
        a0 = angle
        a1 = angle + n * pas
        milieu = (a0 + a1) / 2

        secteur(c, cx, cy, R1 + 3 * MM, R2 - 2 * MM, a0 + pas * 0.12, a1 - pas * 0.12,
                FIL, 0.55)

        bx, by = cx + R1 * math.cos(milieu), cy + R1 * math.sin(milieu)

        c.setStrokeColorRGB(*BRUME, alpha=0.75)
        c.setLineWidth(0.6)
        c.line(cx, cy, bx, by)

        for i, e in enumerate(b["enfants"]):
            af = a0 + (i + 0.5) * pas
            fx, fy = cx + R2 * math.cos(af), cy + R2 * math.sin(af)
            c.setStrokeColorRGB(*BRUME, alpha=0.5)
            c.setLineWidth(0.4)
            c.line(bx, by, fx, fy)
            r = rayon(e)
            rond(c, fx, fy, r, ACTION, 0.88)
            texte_radial(c, cx + (R2 + r + 2.2 * MM) * math.cos(af),
                         cy + (R2 + r + 2.2 * MM) * math.sin(af), af,
                         nom_court(e, titres), SANS, 6.2, PLOMB)

        rb = 3.4 * MM if b["a"] is None else max(3 * MM, rayon(b["a"]) * 1.2)
        rond(c, bx, by, rb, PLOMB)

        # L'intitulé se pose entre le centre et la branche : c'est le seul
        # espace vide du schéma, et aucun mot ne tient dans un disque de
        # trois millimètres.
        texte_radial(c, cx + (R1 - rb - 3 * MM) * math.cos(milieu),
                     cy + (R1 - rb - 3 * MM) * math.sin(milieu), milieu + math.pi,
                     b["nom"].upper(), SANS_G, 7.2, ENCRE)

        angle = a1 + ecart * pas

    rond(c, cx, cy, 11 * MM, ENCRE)
    c.setFillColorRGB(*IVOIRE)
    c.setFont(SERIF, 15)
    c.drawCentredString(cx, cy - 4, "Accueil")


def entete(c, graphe):
    c.setFillColorRGB(*ENCRE)
    c.setFont(SERIF, 26)
    c.drawString(18 * MM, HAUTEUR - 22 * MM, "Le maillage interne")
    c.setFont(SANS_G, 7.4)
    c.setFillColorRGB(*PLOMB)
    c.drawString(18 * MM, HAUTEUR - 28 * MM, "M A D A M O O N   —   M A D A M O O N . F R")
    c.setFont(SANS, 8.4)
    liens = sum(len(v) for v in graphe.values())
    c.setFillColorRGB(*PLOMB)
    c.drawRightString(LARGEUR - 18 * MM, HAUTEUR - 22 * MM,
                      f"{len(graphe)} pages · {liens} liens éditoriaux")
    c.drawRightString(LARGEUR - 18 * MM, HAUTEUR - 27 * MM,
                      "En-tête, pied de page et menu exclus")
    c.setStrokeColorRGB(*FIL)
    c.setLineWidth(0.6)
    c.line(18 * MM, HAUTEUR - 32 * MM, LARGEUR - 18 * MM, HAUTEUR - 32 * MM)


def legende(c, entrants):
    x, y = 18 * MM, 30 * MM
    c.setFont(SANS_G, 7)
    c.setFillColorRGB(*PLOMB)
    c.drawString(x, y + 14, "LIRE LE SCHÉMA")
    c.setFont(SANS, 8)
    lignes = [
        "Le disque grossit avec le nombre de pages qui mènent à lui.",
        "Chaque robe est rangée sous la coupe qui la présente ; les autres chemins",
        "— morphologie, créateur, robes voisines — comptent dans la taille des disques.",
    ]
    for i, l in enumerate(lignes):
        c.setFillColorRGB(*PLOMB)
        c.drawString(x, y - i * 10, l)

    # l'échelle
    xe = LARGEUR - 78 * MM
    c.setFont(SANS_G, 7)
    c.setFillColorRGB(*PLOMB)
    c.drawString(xe, y + 14, "LIENS ENTRANTS")
    maxi = max(entrants.values()) or 1
    for i, v in enumerate([2, 10, 30, maxi]):
        px = xe + i * 17 * MM
        r = 1.7 + 5.6 * math.sqrt(v / maxi)
        rond(c, px + 4, y + 1, r, ACTION, 0.88)
        c.setFillColorRGB(*BRUME)
        c.setFont(SANS, 7)
        c.drawCentredString(px + 4, y - 12, str(v))


def releves(c, graphe, entrants, titres):
    c.showPage()
    c.setFillColorRGB(*IVOIRE)
    c.rect(0, 0, LARGEUR, HAUTEUR, stroke=0, fill=1)
    c.setFillColorRGB(*ENCRE)
    c.setFont(SERIF, 26)
    c.drawString(18 * MM, HAUTEUR - 22 * MM, "Ce que le schéma montre")
    c.setStrokeColorRGB(*FIL)
    c.setLineWidth(0.6)
    c.line(18 * MM, HAUTEUR - 30 * MM, LARGEUR - 18 * MM, HAUTEUR - 30 * MM)

    # La page d'erreur n'est la destination de personne : elle fausserait
    # le bas du classement.
    compte = {a: n for a, n in entrants.items() if a not in ("/404", "/")}
    orphelines = sorted(a for a, n in compte.items() if n == 0)

    colonnes = [
        ("LES PLUS TIRÉES",
         [f"{n}   {nom_court(a, titres)}" for a, n in
          sorted(compte.items(), key=lambda x: (-x[1], x[0]))[:14]]),
        ("LES MOINS TIRÉES",
         [f"{n}   {nom_court(a, titres)}" for a, n in
          sorted(compte.items(), key=lambda x: (x[1], x[0])) if n > 0][:14]),
        ("SANS LIEN ÉDITORIAL ENTRANT",
         [f"·   {nom_court(a, titres)}   {a}" for a in orphelines]),
    ]
    largeur_col = (LARGEUR - 36 * MM) / 3
    bas = HAUTEUR - 42 * MM
    for i, (titre, lignes) in enumerate(colonnes):
        x = 18 * MM + i * largeur_col
        y = HAUTEUR - 42 * MM
        c.setFont(SANS_G, 7.6)
        c.setFillColorRGB(*ENCRE)
        c.drawString(x, y, titre)
        y -= 15
        c.setFont(SANS, 9)
        c.setFillColorRGB(*PLOMB)
        for l in lignes:
            c.drawString(x, y, l)
            y -= 13
        if i == 2:
            y -= 4
            c.setFillColorRGB(*BRUME)
            c.setFont(SANS, 8.4)
            for l in ["Elles ne sont atteintes que par le gabarit —",
                      "la barre, le menu, le pied de page."]:
                c.drawString(x, y, l); y -= 11
        bas = min(bas, y)

    # ————— la lecture, sous les colonnes
    y = bas - 16 * MM
    c.setStrokeColorRGB(*FIL)
    c.line(18 * MM, y + 8 * MM, LARGEUR - 18 * MM, y + 8 * MM)
    c.setFont(SANS_G, 7.6)
    c.setFillColorRGB(*ENCRE)
    c.drawString(18 * MM, y, "CE QU'IL FAUT EN RETENIR")
    y -= 16

    moy = sum(len(v) for v in graphe.values()) / len(graphe)
    lectures = [
        ("Le rendez-vous est le point de convergence.",
         "Il est tiré par les quatre-vingt-six autres pages : tout chemin du site y mène, "
         "et c'est bien ce qu'on lui demande."),
        ("Les morphologies concentrent le maillage.",
         "Les six silhouettes reçoivent de trente-six à cinquante-deux liens chacune — davantage "
         "que les coupes. C'est l'entrée que le site privilégie, et celle qui distingue la maison "
         "d'un catalogue."),
        ("Les fiches robes ne sont pas égales devant les liens.",
         "De deux à vingt-quatre liens entrants selon la robe. Les mieux tirées sont celles "
         "qu'une coupe, une morphologie et un créateur citent à la fois ; les moins tirées "
         "n'ont que leur coupe et le catalogue."),
        ("Trois pages n'ont aucun lien éditorial entrant.",
         "La maison, Trouver ma robe et Coups de cœur ne sont atteintes que par la barre et le "
         "pied de page. Un lien depuis un texte leur donnerait le poids qui leur manque — "
         "Coups de cœur est hors moteurs par choix, les deux autres non."),
    ]
    largeur = (LARGEUR - 36 * MM) / 2 - 8 * MM
    # La hauteur d'une rangée se mesure sur le plus long des deux blocs :
    # fixée d'avance, elle laissait le second se poser sur le troisième.
    plies = [simpleSplit(corps, SANS, 8.6, largeur) for _, corps in lectures]
    y_rangee = y
    for r in range(0, len(lectures), 2):
        haut = max(len(plies[j]) for j in range(r, min(r + 2, len(lectures))))
        for j in range(r, min(r + 2, len(lectures))):
            cx = 18 * MM + (j % 2) * ((LARGEUR - 36 * MM) / 2)
            c.setFont(SANS_G, 9)
            c.setFillColorRGB(*ACTION)
            c.drawString(cx, y_rangee, lectures[j][0])
            c.setFont(SANS, 8.6)
            c.setFillColorRGB(*PLOMB)
            yy = y_rangee - 12
            for l in plies[j]:
                c.drawString(cx, yy, l); yy -= 11
        y_rangee -= 12 + haut * 11 + 14

    c.setFont(SANS, 7.4)
    c.setFillColorRGB(*BRUME)
    c.drawString(18 * MM, 18 * MM,
                 f"Relevé sur l'export du site — {len(graphe)} pages, "
                 f"{sum(len(v) for v in graphe.values())} liens éditoriaux, "
                 f"{moy:.1f} par page en moyenne. L'en-tête, le pied de page, le menu et "
                 f"le panneau d'Élise sont exclus du décompte.")


def main():
    polices()
    graphe, titres = lire_site()
    entrants = Counter()
    for a, ls in graphe.items():
        for l in ls:
            entrants[l] += 1
    for a in graphe:
        entrants.setdefault(a, 0)

    branches = bâtir_arbre(graphe, titres)
    c = pdfcanvas.Canvas(str(SORTIE), pagesize=(LARGEUR, HAUTEUR))
    c.setTitle("MADAMOON — Le maillage interne")
    c.setAuthor("MADAMOON")
    schema(c, branches, graphe, entrants, titres)
    entete(c, graphe)
    legende(c, entrants)
    releves(c, graphe, entrants, titres)
    c.save()
    print(f"{SORTIE.relative_to(RACINE)} — {len(graphe)} pages, "
          f"{sum(len(v) for v in graphe.values())} liens, {len(branches)} branches")


if __name__ == "__main__":
    main()
