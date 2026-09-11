"""Un extrait d'une seule diapositive, pour la regarder.

Quick Look ne rend que la première page d'un document. On fabrique donc
un fichier qui ne contient que celle qu'on veut voir : on retire les
autres de la liste d'ordre, et le nettoyeur du greffon supprime ce qui
n'est plus référencé."""
import shutil, subprocess, sys, zipfile
from pathlib import Path
import defusedxml.minidom as minidom

GREFFON = Path("/Users/mac/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/58a12a39-2401-4af3-9622-bc4a3154e5e2/e8c3b138-e01c-4956-9a3e-affddbee3ec7/skills/pptx")


def extrait(source, rang, sortie):
    travail = Path("travail"); shutil.rmtree(travail, ignore_errors=True); travail.mkdir()
    zipfile.ZipFile(source).extractall(travail)

    p = travail / "ppt/presentation.xml"
    d = minidom.parse(str(p))
    liste = d.getElementsByTagName("p:sldIdLst")[0]
    gardes = [n for n in liste.childNodes if n.nodeType == 1]
    for i, n in enumerate(gardes, 1):
        if i != rang:
            liste.removeChild(n)
    p.write_text(d.toxml(), encoding="utf-8")

    subprocess.run([sys.executable, str(GREFFON / "scripts/clean.py"), str(travail)],
                   capture_output=True)
    s = Path(sortie); s.unlink(missing_ok=True)
    subprocess.run(["zip", "-Xqr", str(s.resolve()), "."], cwd=travail, check=True)
    return s


if __name__ == "__main__":
    for rang in [int(x) for x in sys.argv[2:]]:
        f = extrait(sys.argv[1], rang, f"extrait-{rang:02}.pptx")
        subprocess.run(["qlmanage", "-t", "-s", "1500", "-o", "ql", str(f)], capture_output=True)
        print(f"  page {rang} → ql/{f.name}.png")
