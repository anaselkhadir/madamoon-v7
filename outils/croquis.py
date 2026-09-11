"""
Les six morphologies, dessinées.

Un croquis de mode : ni visage, ni pieds, ni vêtement — une ligne qui
dit une proportion, et rien d'autre. Les six partagent la même base et
ne diffèrent que par cinq largeurs : épaule, buste, taille, hanche,
cuisse.

Elles sont générées plutôt que dessinées une par une. C'est ce qui
garantit qu'elles forment une famille : même hauteur d'épaule, même
cou, même trait. Une seule est fausse si toutes le sont.

Le repère : 200 de large, 300 de haut, le centre à 100. La figure est
coupée à mi-cuisse, comme sur les planches de modélisme.
"""

from pathlib import Path

L, H, C = 200.0, 300.0, 100.0

Y_COU = 10          # le haut du cou
Y_EPAULE = 54       # la ligne des épaules
Y_BUSTE = 78        # le bord du bustier
Y_TAILLE = 136      # le creux de la taille
Y_HANCHE = 170      # le plus large des hanches
Y_JAMBE = 200       # l'entrejambe
Y_BAS = 292         # la coupe, à mi-cuisse

# Cinq demi-largeurs par morphologie, plus le galbe du ventre.
FORMES = {
    "O": dict(epaule=44, buste=50, taille=52, hanche=48, cuisse=45, ventre=1.06),
    "A": dict(epaule=40, buste=41, taille=40, hanche=55, cuisse=49, ventre=0.99),
    "V": dict(epaule=55, buste=51, taille=44, hanche=42, cuisse=39, ventre=0.97),
    "H": dict(epaule=46, buste=46, taille=44, hanche=47, cuisse=44, ventre=1.0),
    "8": dict(epaule=48, buste=51, taille=36, hanche=52, cuisse=47, ventre=1.0),
    "X": dict(epaule=45, buste=46, taille=34, hanche=48, cuisse=44, ventre=0.99),
}


def n(v: float) -> str:
    return f"{v:.1f}".rstrip("0").rstrip(".")


def flanc(f, s):
    """Le côté du corps, de l'épaule à la coupe de cuisse."""
    ep, bu, ta, ha, cu, ventre = (f[k] for k in ("epaule", "buste", "taille", "hanche", "cuisse", "ventre"))
    x = lambda d: C + s * d
    return " ".join([
        f"M {n(x(ep))} {n(Y_EPAULE)}",
        # L'aisselle, puis le flanc jusqu'au bustier.
        f"C {n(x(ep + 1))} {n(Y_EPAULE + 10)} {n(x(bu))} {n(Y_BUSTE - 12)} {n(x(bu))} {n(Y_BUSTE + 2)}",
        # Le buste à la taille : le ventre passe par là.
        f"C {n(x(bu * ventre))} {n(Y_BUSTE + 22)} {n(x(ta + (bu - ta) * 0.30))} {n(Y_TAILLE - 14)} "
        f"{n(x(ta))} {n(Y_TAILLE)}",
        # La taille à la hanche.
        f"C {n(x(ta + (ha - ta) * 0.62))} {n(Y_TAILLE + 13)} {n(x(ha))} {n(Y_HANCHE - 13)} "
        f"{n(x(ha))} {n(Y_HANCHE)}",
        # La hanche à la cuisse, puis la cuisse qui descend.
        f"C {n(x(ha - 1))} {n(Y_HANCHE + 16)} {n(x(cu + 2))} {n(Y_JAMBE - 6)} {n(x(cu))} {n(Y_JAMBE + 4)}",
        f"C {n(x(cu - 2))} {n(Y_JAMBE + 34)} {n(x(cu - 5))} {n(Y_BAS - 30)} {n(x(cu - 7))} {n(Y_BAS)}",
    ])


def cou(f):
    ep = f["epaule"]
    return (
        f"M {n(C - 6.5)} {n(Y_COU)} C {n(C - 7)} {n(Y_COU + 16)} {n(C - 12)} {n(Y_EPAULE - 14)} "
        f"{n(C - ep * 0.44)} {n(Y_EPAULE - 6)} "
        f"M {n(C + 6.5)} {n(Y_COU)} C {n(C + 7)} {n(Y_COU + 16)} {n(C + 12)} {n(Y_EPAULE - 14)} "
        f"{n(C + ep * 0.44)} {n(Y_EPAULE - 6)}"
    )


def epaules(f):
    ep = f["epaule"]
    return (
        f"M {n(C - ep)} {n(Y_EPAULE)} "
        f"C {n(C - ep * 0.74)} {n(Y_EPAULE - 4)} {n(C - ep * 0.34)} {n(Y_EPAULE - 9)} {n(C)} {n(Y_EPAULE - 10)} "
        f"C {n(C + ep * 0.34)} {n(Y_EPAULE - 9)} {n(C + ep * 0.74)} {n(Y_EPAULE - 4)} {n(C + ep)} {n(Y_EPAULE)}"
    )


def bras(f, s):
    """Le bras pend, écarté du corps : c'est l'écart qui donne le buste."""
    ep = f["epaule"]
    x = lambda d: C + s * d
    large = max(f["epaule"], f["buste"], f["taille"], f["hanche"]) + 12
    return " ".join([
        f"M {n(x(ep - 1))} {n(Y_EPAULE + 2)}",
        f"C {n(x(large))} {n(Y_EPAULE + 24)} {n(x(large + 1))} {n(Y_TAILLE - 18)} {n(x(large - 2))} {n(Y_TAILLE + 6)}",
        f"C {n(x(large - 3))} {n(Y_HANCHE - 10)} {n(x(large - 5))} {n(Y_HANCHE - 2)} {n(x(large - 8))} {n(Y_HANCHE + 6)}",
    ])


def bustier(f):
    bu = f["buste"]
    return (
        f"M {n(C - bu + 2.5)} {n(Y_BUSTE)} C {n(C - bu * 0.36)} {n(Y_BUSTE - 4)} "
        f"{n(C + bu * 0.36)} {n(Y_BUSTE - 4)} {n(C + bu - 2.5)} {n(Y_BUSTE)}"
    )


def culotte(f):
    ha = f["hanche"]
    return (
        f"M {n(C - ha + 3)} {n(Y_HANCHE - 2)} C {n(C - ha * 0.7)} {n(Y_JAMBE - 14)} "
        f"{n(C - 15)} {n(Y_JAMBE - 6)} {n(C)} {n(Y_JAMBE)} "
        f"C {n(C + 15)} {n(Y_JAMBE - 6)} {n(C + ha * 0.7)} {n(Y_JAMBE - 14)} "
        f"{n(C + ha - 3)} {n(Y_HANCHE - 2)}"
    )


def entrejambe(f):
    return f"M {n(C)} {n(Y_JAMBE)} L {n(C)} {n(Y_BAS)}"


def figure(lettre):
    f = FORMES[lettre]
    return [cou(f), epaules(f), flanc(f, -1), flanc(f, 1),
            bras(f, -1), bras(f, 1), bustier(f), culotte(f), entrejambe(f)]


def svg(lettre, trait="#14100c", epaisseur=2):
    d = "".join(f'<path d="{p}"/>' for p in figure(lettre))
    return (
        f'<svg viewBox="0 0 {n(L)} {n(H)}" fill="none" stroke="{trait}" '
        f'stroke-width="{epaisseur}" stroke-linecap="round" stroke-linejoin="round" '
        f'xmlns="http://www.w3.org/2000/svg">{d}</svg>'
    )


def composant() -> str:
    """Le composant React : les six jeux de tracés, et rien d'autre.

    Les chemins sont écrits ici plutôt qu'à la main dans le TSX : c'est
    ce fichier qui décide des proportions, et une retouche se repasse
    sans rien réécrire.
    """
    entrees = ",\n".join(
        "  " + (f'"{l}"' if not l.isalpha() else l) + ": [\n"
        + ",\n".join(f'    "{t}"' for t in figure(l))
        + ",\n  ]"
        for l in FORMES
    )
    return f'''/* Ce fichier est produit par outils/croquis.py — ne pas le
 * retoucher à la main : les proportions se règlent dans le générateur,
 * et une modification ici serait perdue au prochain passage. */

export const CROQUIS: Record<string, string[]> = {{
{entrees},
}};
'''


if __name__ == "__main__":
    import sys
    if "--composant" in sys.argv:
        Path("lib/croquis.ts").write_text(composant())
        print("lib/croquis.ts écrit")
        raise SystemExit(0)
    cases = "".join(
        f'<figure><div class="c">{svg(l)}</div><figcaption>{l}</figcaption></figure>'
        for l in FORMES
    )
    Path("planche.html").write_text(
        "<style>body{margin:0;background:#fdfbf8;font:14px ui-sans-serif;}"
        "main{display:flex;gap:20px;padding:36px;}figure{margin:0;flex:1;text-align:center}"
        ".c{background:#f6f2ec;padding:18px 10px}svg{width:100%;height:auto;display:block}"
        "figcaption{margin-top:12px;font-size:22px;font-family:Georgia,serif}</style>"
        f"<main>{cases}</main>"
    )
    print("planche.html écrite")
