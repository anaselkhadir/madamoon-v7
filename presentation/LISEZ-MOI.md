# La présentation de livraison

`MADAMOON-nouveau-site.pptx` — 43 diapositives, identité ANVSLAB.

## La refaire

Le site change, la présentation se refait. Quatre temps, dans cet ordre.

```bash
cd presentation
npm install pptxgenjs puppeteer-core          # une seule fois
node capture.js                               # les pages, grand écran et téléphone
node capture2.js                              # thème sombre, coups de cœur, menus
node capture3.js                              # les sections, saisies au défilement
python3 mockup.py                             # le cadre d'iPhone autour des captures
python3 optimiser.py                          # les images à la taille où elles servent
node construire.js                            # le fichier
python3 audit.py MADAMOON-nouveau-site.pptx   # la relecture géométrique
```

`SITE` choisit la source : par défaut le site en ligne, sinon
`SITE=http://localhost:5600 node capture.js`.

## Ce que fait chaque fichier

| Fichier | Rôle |
|---|---|
| `capture*.js` | Chrome piloté : saute l'ouverture cinématique, pose le thème, ouvre Élise et les menus |
| `mockup.py` | Dessine le téléphone autour d'une capture de 1170 × 2532 — aucun redimensionnement, donc aucun flou |
| `systeme.js` | Le système ANVSLAB relevé sur le cahier des charges : marges, corps, interlettrage, couleurs |
| `deck-a/b/c.js` | Le contenu, une fonction par tiers du document |
| `audit.py` | Charge les vraies polices, replie chaque paragraphe et compare à sa boîte. Signale débordements, chevauchements et marges |
| `extrait.py` | Un fichier d'une seule page, pour la regarder dans Quick Look |

## L'identité

Relevée sur `ANVSLAB-CDC.pptx`, non recopiée à l'œil : rouge `#FF2D00`,
gris `#696969` et `#9A9A9A`, filets `#E0E0E0`, cartons `#F4F4F4`.
Helvetica Neue pour le texte, Menlo pour les sur-titres et les folios.
L'interlettrage suit la taille — resserré au-delà de 16 points, ouvert
en dessous de 9.

## À savoir

Helvetica Neue et Menlo sont des polices macOS. Sur un poste Windows
elles seront remplacées par Arial et Courier New : la mise en page
tient, la couleur du texte change un peu. C'est le cas du cahier des
charges ANVSLAB lui-même.
