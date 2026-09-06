"use client";

import Link from "next/link";
import { useState } from "react";
import Photo from "@/components/media/Photo";
import { COUPES, PLURIEL } from "@/lib/coupes";
import { ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altCoupe } from "@/lib/alt";

/*
 * Les coupes.
 *
 * Après les six silhouettes, les six coupes. La scène précédente est
 * conduite par le défilement ; celle-ci est conduite par la main — c'est
 * volontaire. Deux scènes voisines qui répondent au même geste finissent
 * par se ressembler, quelles que soient leurs images.
 *
 * La composition est renversée elle aussi : la photographie sort du cadre
 * par la gauche, les noms se lisent en colonne à droite. On ne relit pas
 * la scène d'avant, on en lit une autre.
 *
 * Un nom n'est pas un lien : c'est un bouton qui change l'image. Le lien
 * vers la page de la coupe est donné séparément, sous le nom actif. Un
 * élément qui navigue au clic et prévisualise au survol est ambigu au
 * doigt, où les deux gestes n'en font qu'un.
 *
 * La photographie change en fondu et par une échelle qui se referme — un
 * plan qui se pose, pas une diapositive qui glisse.
 */

export default function Coupes() {
  const [actif, setActif] = useState(0);

  const familles = COUPES.map((c) => {
    const robe = ROBES.find((r) => r.slug === c.robe);
    const media = robe ? vues(robe.slug)[c.vue - 1] : undefined;
    return robe && media ? { c, media } : null;
  }).filter(Boolean) as {
    c: (typeof COUPES)[number];
    media: ReturnType<typeof vues>[number];
  }[];

  if (familles.length === 0) return null;
  const courante = familles[actif].c;

  return (
    <section
      aria-labelledby="coupes"
      className="relative overflow-hidden bg-blanc py-[clamp(4rem,8vw,8rem)]"
    >
      <div className="grid items-center gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[1.1fr_1fr]">
        {/* ————————————————————————————— la photographie —————
          * Elle sort du cadre par la gauche : la page perd son bord de ce
          * côté, et la composition cesse d'être un bloc centré. */}
        <div className="relative aspect-[4/5] overflow-hidden max-lg:mx-[var(--gouttiere)] lg:aspect-[5/6] lg:h-[min(76svh,42rem)]">
          {familles.map(({ c, media }, i) => (
            <Photo
              key={c.ancre}
              media={media}
              dossier="robes"
              alt={altCoupe(c.nom)}
              sizes="(max-width: 768px) 92vw, 46vw"
              priorite={i === 0}
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] [transition-timing-function:var(--ease-doux)] ${
                i === actif ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
        </div>

        {/* ————————————————————————————— les noms ————— */}
        <div className="gouttiere lg:pl-0">
          <p className="legende">Les coupes</p>
          <span data-ligne className="mt-4 block">
            <h2 id="coupes" className="phrase">
              Une même femme, six lignes.
            </h2>
          </span>
          <p className="texte mesure mt-4">
            C&apos;est la coupe qui décide de la ligne, bien avant la taille.
          </p>

          <ul className="mt-[clamp(1.75rem,3.5vw,2.75rem)] flex flex-col">
            {familles.map(({ c }, i) => (
              <li key={c.ancre}>
                <button
                  type="button"
                  onMouseEnter={() => setActif(i)}
                  onFocus={() => setActif(i)}
                  onClick={() => setActif(i)}
                  aria-pressed={i === actif}
                  className={`block py-[0.35em] text-left font-serif text-[clamp(1.5rem,2.9vw,2.5rem)] leading-none transition-colors duration-700 [transition-timing-function:var(--ease-doux)] ${
                    i === actif ? "text-encre" : "text-fil hover:text-brume"
                  }`}
                >
                  {c.nom}
                </button>
              </li>
            ))}
          </ul>

          {/* La note et le lien de la coupe active, empilés dans la même
            * case : la hauteur ne bouge pas d'une coupe à l'autre. */}
          <div className="mt-6 grid" aria-live="polite">
            {familles.map(({ c }, i) => (
              <div
                key={c.ancre}
                className={`col-start-1 row-start-1 transition-opacity duration-700 [transition-timing-function:var(--ease-doux)] ${
                  i === actif ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={i !== actif || undefined}
              >
                <p className="texte">{c.note}</p>
                <Link
                  href={`/coupes/${c.ancre}`}
                  tabIndex={i === actif ? undefined : -1}
                  className="lien-nav souligne mt-3 inline-block text-action"
                >
                  Les {PLURIEL[c.nom]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="sr-only">Coupe présentée : {courante.nom}</span>
    </section>
  );
}
