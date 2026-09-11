"""
La relecture géométrique de la présentation.

Sans rendu, on mesure. Les polices du document sont sur cette machine :
on les charge, on compose chaque paragraphe à la largeur de sa boîte, et
l'on compare la hauteur obtenue à la hauteur disponible. C'est un
contrôle exact, pas une estimation — à l'interlettrage près, que l'on
reprend depuis le XML.

On vérifie aussi ce qui sort de la page, ce qui longe ses bords, et ce
qui se recouvre.
"""

from pathlib import Path
from pptx import Presentation
from pptx.util import Emu
from PIL import ImageFont

POUCE = 914400
PAGE_L, PAGE_H = 13.333, 7.5
MARGE_MINI = 0.5

POLICES = {
    "Helvetica Neue": ("/System/Library/Fonts/HelveticaNeue.ttc", 0),
    "Menlo": ("/System/Library/Fonts/Menlo.ttc", 0),
}
_cache = {}


def police(nom, pt):
    """La police à la taille demandée, en pixels de 72 points par pouce."""
    cle = (nom, round(pt))
    if cle not in _cache:
        chemin, index = POLICES.get(nom, POLICES["Helvetica Neue"])
        _cache[cle] = ImageFont.truetype(chemin, round(pt * 4), index=index)
    return _cache[cle]


def largeur(mot, f, spc_pt):
    return f.getlength(mot) / 4 + spc_pt * len(mot)


def hauteur_texte(contenu, nom, pt, spc_pt, largeur_boite_pouces, interligne):
    """La hauteur qu'occupe ce texte, en pouces, une fois replié."""
    f = police(nom, pt)
    large_pt = largeur_boite_pouces * 72
    lignes = 0
    for paragraphe in contenu.split("\n"):
        mots = paragraphe.split(" ")
        courante = ""
        n = 1
        for m in mots:
            essai = (courante + " " + m).strip()
            if largeur(essai, f, spc_pt) <= large_pt or not courante:
                courante = essai
            else:
                n += 1
                courante = m
        lignes += n
    return lignes * pt * interligne / 72


def audit(fichier):
    pres = Presentation(fichier)
    soucis = []
    for i, s in enumerate(pres.slides, 1):
        boites = []
        for sh in s.shapes:
            try:
                x, y = Emu(sh.left).inches, Emu(sh.top).inches
                l, h = Emu(sh.width).inches, Emu(sh.height).inches
            except Exception:
                continue

            # Ce qui sort de la page.
            if x < -0.01 or y < -0.01 or x + l > PAGE_L + 0.01 or y + h > PAGE_H + 0.01:
                soucis.append(f"p{i:02} DÉBORDE  x={x:.2f} y={y:.2f} l={l:.2f} h={h:.2f}")

            if not (sh.has_text_frame and sh.text_frame.text.strip()):
                # Une image ou un carton : on ne vérifie que sa marge.
                plein = l > PAGE_L - 1 and h > PAGE_H - 1
                if not plein and (x < MARGE_MINI - 0.3 or x + l > PAGE_L - MARGE_MINI + 0.3):
                    soucis.append(f"p{i:02} IMAGE AU BORD  x={x:.2f}→{x+l:.2f}")
                continue
            contenu = sh.text_frame.text
            boites.append((x, y, l, h, contenu[:34]))

            # La marge : le fond plein et les images n'y sont pas tenus.
            if l < PAGE_L - 1 and (x < MARGE_MINI - 0.01 or x + l > PAGE_L - MARGE_MINI + 0.01):
                soucis.append(f"p{i:02} MARGE    x={x:.2f}→{x+l:.2f}  « {contenu[:30]} »")

            # La hauteur réellement occupée.
            par = sh.text_frame.paragraphs[0]
            r = par.runs[0] if par.runs else None
            if not r or not r.font.size:
                continue
            pt = r.font.size.pt
            nom = r.font.name or "Helvetica Neue"
            rpr = r._r.get_or_add_rPr()
            spc = int(rpr.get("spc", 0)) / 100
            ln = par._pPr.find("{http://schemas.openxmlformats.org/drawingml/2006/main}lnSpc") if par._pPr is not None else None
            inter = 1.2
            if ln is not None:
                pct = ln.find("{http://schemas.openxmlformats.org/drawingml/2006/main}spcPct")
                if pct is not None:
                    inter = int(pct.get("val")) / 100000
            besoin = hauteur_texte(contenu, nom, pt, spc, l, inter)
            if besoin > h + 0.06:
                soucis.append(
                    f"p{i:02} DÉBORDE TEXTE  besoin {besoin:.2f}\" > boîte {h:.2f}\"  "
                    f"[{nom} {pt}pt, l={l:.2f}\"]  « {contenu[:40]} »"
                )

        # Les recouvrements entre textes.
        for a in range(len(boites)):
            for b in range(a + 1, len(boites)):
                xa, ya, la, ha, ta = boites[a]
                xb, yb, lb, hb, tb = boites[b]
                ox = min(xa + la, xb + lb) - max(xa, xb)
                oy = min(ya + ha, yb + hb) - max(ya, yb)
                if ox > 0.08 and oy > 0.08:
                    soucis.append(f"p{i:02} CHEVAUCHE  « {ta} » × « {tb} »  ({ox:.2f}×{oy:.2f}\")")

    print(f"{len(pres.slides._sldIdLst)} diapositives")
    if not soucis:
        print("aucun défaut de mise en page")
    for s in soucis:
        print("  " + s)
    return len(soucis)


if __name__ == "__main__":
    import sys
    raise SystemExit(1 if audit(sys.argv[1]) else 0)
