# Ce qui existait sur madamoon.fr avant la mise en ligne

Relevé le 3 octobre 2026, avant tout changement, par l'API Hostinger
(lecture seule).

## Le site

WordPress 6.4.12, installé le 19 avril 2023, à la racine de
`/home/u413994622/domains/madamoon.fr/public_html`.

Greffons repérés dans la configuration Apache : **WP Rocket 3.15.6**
(cache et compression) et **LiteSpeed Cache** (déclaré mais vide).

## Les cinq pages indexées

D'après son plan de site Yoast — il n'y avait ni articles, ni produits,
ni catégories :

| adresse | redirigée vers |
|---|---|
| `/` | `/` |
| `/votre-morphologie/` | `/morphologies/` |
| `/catalogue-des-robes/` | `/robes/` |
| `/prise-de-rendez-vous/` | `/rendez-vous/` |
| `/faq/` | `/a-propos/` *(provisoire)* |

## Le contenu de public_html

24 entrées à la racine : l'installation WordPress standard
(`wp-admin/`, `wp-content/`, `wp-includes/`, les fichiers `wp-*.php`),
plus `default.php`, `llms.txt`, `.htaccess` et `.htaccess.bk`.

**Aucune ne porte le nom d'un dossier du nouveau site** — pas de
collision possible.

## Ce que ce dossier contient

`htaccess-wordpress-original.txt` — la configuration Apache qui était
en place. C'est le **seul fichier que la mise en ligne remplace**, et
donc le seul qu'il fallait relever. Tout le reste de WordPress demeure
sur le serveur, intact.

## Ce que ce dossier ne contient pas

**La base de données**, et les fichiers eux-mêmes. L'API Hostinger
n'expose pas de sauvegarde pour l'hébergement mutualisé : elle ne sait
le faire que pour les VPS et les offres Agency. Une vraie sauvegarde se
prend depuis hPanel → Fichiers → Sauvegardes, à la main.

Cela a cessé d'être bloquant le jour où la mise en ligne est devenue
non destructive : on dépose le nouveau site **par-dessus**, sans rien
effacer. WordPress reste en place, désactivé par le seul fait que
`DirectoryIndex` sert `index.html` avant `index.php`. Pour revenir en
arrière, il suffirait de supprimer notre `.htaccess` et notre
`index.html`.
