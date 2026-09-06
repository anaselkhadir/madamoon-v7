"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Photo from "@/components/media/Photo";
import { COUPES, PLURIEL } from "@/lib/coupes";
import { ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altCoupe } from "@/lib/alt";
import { mouvementReduit, surDefilement } from "@/lib/mouvement";

/*
 * Les coupes.
 *
 * Après les six silhouettes, les six coupes. La scène est collée le temps
 * qu'on les traverse : le défilement fait passer d'une coupe à la
 * suivante, et rend la main à la sixième. On voit ainsi les six lignes se
 * succéder sur la même place, ce qu'une liste ne montre pas.
 *
 * Elle suit le défilement, elle ne le capture jamais : on peut s'arrêter
 * n'importe où, revenir en arrière, ou passer la section d'un geste.
 *
 * La composition est renversée par rapport à la scène précédente : la
 * photographie sort du cadre par la gauche, les noms se lisent en colonne
 * à droite. Le geste est le même, le cadrage non — c'est ce qui empêche
 * les deux scènes de se confondre.
 *
 * Au survol d'un nom, la main reprend la scène et le défilement cesse
 * d'imposer. On relâche, il reprend.
 *
 * Un nom n'est pas un lien : c'est un bouton qui change l'image. Le lien
 * vers la page de la coupe est donné séparément, sous le nom actif. Un
 * élément qui navigue au clic et prévisualise au survol est ambigu au
 * doigt, où les deux gestes n'en font qu'un.
 *
 * La photographie change en fondu et par une échelle qui se referme — un
 * plan qui se pose, pas une diapositive qui glisse.
 */

/* La part de la course laissée aux deux extrémités : la première et la
 * dernière coupe tiennent un peu plus longtemps, sinon elles ne font que
 * passer en entrant et en sortant. */
const MARGE = 0.08;

export default function Coupes() {
  const piste = useRef<HTMLDivElement>(null);
  const [rang, setRang] = useState(0);
  /* La coupe choisie à la main. Tant qu'elle existe, le défilement
   * n'impose plus rien. */
  const [tenue, setTenue] = useState<number | null>(null);

  const familles = COUPES.map((c) => {
    const robe = ROBES.find((r) => r.slug === c.robe);
    const media = robe ? vues(robe.slug)[c.vue - 1] : undefined;
    return robe && media ? { c, media } : null;
  }).filter(Boolean) as {
    c: (typeof COUPES)[number];
    media: ReturnType<typeof vues>[number];
  }[];

  const n = familles.length;

  useEffect(() => {
    if (mouvementReduit() || n === 0) return;
    let demande = 0;
    let dernier = -1;

    const poser = () => {
      demande = 0;
      const p = piste.current;
      if (!p) return;
      const b = p.getBoundingClientRect();
      const course = b.height - window.innerHeight;
      if (course <= 0) return;
      const brut = Math.min(Math.max(-b.top / course, 0), 1);
      const avance = Math.min(Math.max((brut - MARGE) / (1 - 2 * MARGE), 0), 1);
      const i = Math.min(Math.floor(avance * n), n - 1);
      if (i !== dernier) {
        dernier = i;
        setRang(i);
      }
    };

    const surScroll = () => {
      if (!demande) demande = requestAnimationFrame(poser);
    };
    poser();
    const desabonner = surDefilement(surScroll);
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surScroll);
    return () => {
      cancelAnimationFrame(demande);
      desabonner();
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surScroll);
    };
  }, [n]);

  if (n === 0) return null;
  const actif = tenue ?? rang;
  const courante = familles[actif].c;

  return (
    <section aria-labelledby="coupes" className="relative bg-blanc">
      {/* La course. Six coupes à traverser, plus une hauteur d'écran pour
        * le collant.
        *
        * La scène se colle sous l'en-tête entier — le bandeau et la barre
        * — et non sous le seul bandeau. Le hero peut se permettre de
        * passer derrière la navigation, c'est une image ; un texte, non :
        * à 790 px de haut, seize pixels de l'intitulé disparaissaient
        * dessous.
        *
        * « overflow-hidden » ne peut pas être posé sur la section : sur un
        * ancêtre, il désactive le collant. */}
      <div ref={piste} className="relative h-[210svh] max-lg:h-[180svh]">
        <div className="sticky top-[calc(var(--barre)+var(--entete))] flex h-[calc(100svh-var(--barre)-var(--entete))] min-h-[30rem] items-center overflow-hidden">
          <div className="grid w-full items-center gap-[clamp(1.25rem,5vw,5rem)] max-lg:content-center lg:grid-cols-[1.1fr_1fr]">
            {/* ————————————————————————————— la photographie —————
              * Elle sort du cadre par la gauche : la page perd son bord de ce
              * côté, et la composition cesse d'être un bloc centré. */}
            {/* Sur petit écran la photographie est mesurée en hauteur
              * d'écran, pas en rapport de côtés : la scène est collée et
              * ne défile pas, donc tout doit tenir dans un écran. Au
              * rapport 4/5, l'image seule en prenait la moitié et le lien
              * du bas passait sous le pli. */}
            <div className="relative h-[34svh] overflow-hidden max-lg:mx-[var(--gouttiere)] lg:aspect-[5/6] lg:h-[min(64svh,38rem)]">
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

              <ul className="mt-[clamp(0.75rem,3svh,2.75rem)] flex flex-col">
                {familles.map(({ c }, i) => (
                  <li key={c.ancre}>
                    <button
                      type="button"
                      onMouseEnter={() => setTenue(i)}
                      onMouseLeave={() => setTenue(null)}
                      onFocus={() => setTenue(i)}
                      onBlur={() => setTenue(null)}
                      onClick={() => setTenue(i)}
                      aria-pressed={i === actif}
                      /* La taille dépend aussi de la hauteur de l'écran, pas
                    * seulement de sa largeur : la scène est collée, les
                    * six noms doivent tenir dans un écran quel qu'il
                    * soit. Sur une fenêtre basse et large, une mesure en
                    * « vw » seule débordait le cadre. */
                  className={`block py-[0.3em] text-left font-serif text-[clamp(1.125rem,min(2.9vw,4.4svh),2.5rem)] leading-none transition-colors duration-700 [transition-timing-function:var(--ease-doux)] ${
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
              <div className="mt-[clamp(0.75rem,2.5svh,1.5rem)] grid" aria-live="polite">
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
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        Coupe présentée : {courante.nom}
      </span>
    </section>
  );
}
