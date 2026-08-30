# MADAMOON

Le site de MADAMOON, boutique de robes de mariée à Paris 10ᵉ.

Next.js 15 (App Router), Tailwind 4, GSAP et Lenis pour le défilement.
Aucune donnée n'est inventée : les coordonnées, les créateurs, les
quarante robes et leurs photographies viennent de la maison.

## Faire tourner le site

```bash
npm install
npm run dev        # http://localhost:5600
```

## Le système visuel

Les valeurs de `app/globals.css` ne sont pas approximatives : elles ont
été relevées sur le site de référence à 1440 px de large, puis rendues
fluides. Gouttière 48, en-tête 38 (bandeau) + 70 (barre), titre
d'affiche 100/95, titre de section 32/48, boutons de 40 px, tuiles au
rapport 447/621 jointives à 1,5 px, nom posé dans l'image et centré en
hauteur à 24 px du bord.

Deux caractères seulement : Instrument Serif pour les titres et les noms,
Quattrocento Sans pour la navigation, les repères et la lecture.

Deux rouges, deux rôles : `#910000` agit (boutons, rendez-vous),
`#CE0A2C` ponctue. Le rouge ne remplit jamais une surface.

## Les médias

`public/robes` et `public/scenes` contiennent les photographies déjà
converties en AVIF, WebP et JPEG, en quatre à cinq largeurs. Le manifeste
`lib/medias.ts` décrit chaque fichier (dimensions, largeurs disponibles,
aperçu flouté de vingt pixels) — il est généré, ne pas le modifier à la
main. `public/film` contient les vidéos compressées et leurs affiches.

Le composant `Photo` choisit le bon format et la bonne largeur ; `Film`
ne demande la vidéo qu'à l'approche de la scène, et jamais si le
mouvement est refusé ou la connexion comptée.

## L'aperçu GitHub Pages

```bash
npm run build:pages
```

Produit un export statique dans `out/`. Le site étant servi depuis un
sous-dossier, les chemins écrits à la main passent par `lib/chemin.ts`.
Cette version est interdite d'indexation : une copie de démonstration ne
doit jamais concurrencer madamoon.fr dans les moteurs de recherche.

La publication est automatique à chaque poussée sur `main`
(`.github/workflows/pages.yml`).

## Ce qui reste à greffer

Le parcours guidé complet (morphologie et recommandations), le chatbot
ELISE, et les photographies du showroom — le dossier fourni ne contient
pour l'instant que des photographies de robes.
