# Corrections et ajustements

`MADAMOON-corrections.pptx` — 20 diapositives, identité ANVSLAB. Les
vingt-neuf modifications faites du 11 au 13 septembre 2026, après la
présentation de livraison.

## La refaire

Elle réutilise le système et les outils du dossier parent.

```bash
cd presentation/corrections
node capture.js                     # les « après », au cadrage des captures d'origine
python3 ../mockup.py                # le téléphone autour des captures
python3 ../optimiser.py             # les images à la taille où elles servent
node deck.js                        # le fichier
python3 ../audit.py MADAMOON-corrections.pptx
```

Les « avant » sont les captures de la présentation de livraison
(`sec-silhouette`, `sec-createurs`, `sec-coupes`, `sec-fiche-detail`,
`iphone-robes`), recopiées dans `images/` sous le préfixe `avant-`.
La page de la fiche utilise deux gros plans recadrés sur la zone qui a
changé, entourée en rouge.
