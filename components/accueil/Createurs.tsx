"use client";

import Link from "@/components/Lien";
import { useEffect, useRef } from "react";
import Photo from "@/components/media/Photo";
import { CREATEURS, ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";
import { mouvementReduit, surDefilement } from "@/lib/mouvement";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { createurOrigine } from "@/lib/contenu";

/*
 * Les créateurs.
 *
 * Cinq maisons en bande, plus large que l'écran. Elle dérive lentement
 * vers la gauche pendant que la section passe : au moment où l'on arrive
 * on voit les premières, au moment où l'on sort on a vu les dernières.
 *
 * La dérive suit le défilement — elle ne le prend jamais. La section
 * n'est pas collée, la page ne s'arrête pas, et le geste reste celui de
 * quelqu'un qui feuillette. C'est aussi ce qui la distingue des deux
 * scènes précédentes : ici rien ne change d'état, tout se déplace.
 *
 * L'amplitude vaut exactement le débord de la bande : à l'entrée son
 * bord gauche est en place, à la sortie son bord droit l'est. Rien n'est
 * inaccessible, et personne n'a à deviner qu'il faut pousser.
 *
 * Au doigt, la bande redevient un rail que l'on pousse soi-même, avec
 * arrêt sur chaque maison : c'est plus direct qu'une dérive qu'on ne
 * commande pas.
 */

export default function Createurs({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  const scene = useRef<HTMLDivElement>(null);
  const bande = useRef<HTMLDivElement>(null);

  const maisons = CREATEURS.map((c) => {
    const robe = ROBES.find((r) => r.slug === c.ouverture.robe);
    const media = robe ? vues(robe.slug)[c.ouverture.vue - 1] : undefined;
    return robe && media ? { c, robe, media } : null;
  }).filter(Boolean) as {
    c: (typeof CREATEURS)[number];
    robe: (typeof ROBES)[number];
    media: ReturnType<typeof vues>[number];
  }[];

  useEffect(() => {
    if (mouvementReduit()) return;

    /* La largeur est interrogée à chaque image plutôt qu'une fois au
     * montage. Une fenêtre ouverte étroite puis agrandie, une tablette
     * que l'on tourne : la condition testée une seule fois laisse la
     * bande figée pour de bon. Elle ne coûte rien à relire. */
    const large = window.matchMedia("(min-width: 1024px)");

    let demande = 0;
    const poser = () => {
      demande = 0;
      const s = scene.current;
      const b = bande.current;
      if (!s || !b) return;
      /* Au doigt, la bande est un rail que l'on pousse : pas de dérive à
       * calculer, et surtout rien à laisser sur l'élément. */
      const debord = large.matches ? b.scrollWidth - s.clientWidth : 0;
      if (debord <= 0) {
        b.style.transform = "";
        return;
      }
      const r = s.getBoundingClientRect();
      /* La progression de la section dans la fenêtre : zéro quand son
       * haut touche le bas de l'écran, un quand son bas touche le
       * haut. */
      const course = r.height + window.innerHeight;
      const avance = Math.min(Math.max((window.innerHeight - r.top) / course, 0), 1);
      b.style.transform = `translate3d(${-avance * debord}px, 0, 0)`;
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
  }, []);

  if (maisons.length === 0) return null;

  return (
    <section
      aria-labelledby="createurs"
      className="bg-blanc py-[clamp(4rem,8vw,8rem)]"
    >
      <div className="gouttiere">
        <p className="legende">{L.createurs.legende}</p>
        <span data-ligne className="mt-4 block">
          <h2 id="createurs" className="phrase">
            {L.createurs.titre}
          </h2>
        </span>
        <p className="texte mesure-l mt-4">{L.createurs.lieux}</p>
      </div>

      {/* La bande. Elle déborde volontairement à droite : c'est ce débord
        * qui donne sa course à la dérive. */}
      <div ref={scene} className="mt-[clamp(2.5rem,5vw,4rem)] overflow-hidden max-lg:overflow-visible">
        <div
          ref={bande}
          className="rail flex w-max gap-[clamp(1rem,2.2vw,2rem)] pl-[var(--gouttiere)] pr-[var(--gouttiere)] will-change-transform max-lg:w-auto max-lg:snap-x max-lg:snap-mandatory max-lg:scroll-pl-[var(--gouttiere)] max-lg:overflow-x-auto"
        >
          {maisons.map(({ c, robe, media }, i) => (
            <figure
              key={c.slug}
              className="w-[clamp(13rem,22vw,20rem)] flex-none max-lg:w-[min(68vw,20rem)] max-lg:snap-start"
            >
              <Link href={`/createurs/${c.slug}`} className="group block">
                <div className="aspect-[5/7] overflow-hidden">
                  <Photo
                    media={media}
                    dossier="robes"
                    alt={altRobe(robe, langue)}
                    sizes="(max-width: 768px) 68vw, 20vw"
                    priorite={i < 2}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-doux)] group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-4">
                  <span className="block font-serif text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-tight text-encre transition-colors duration-700 group-hover:text-action">
                    {c.nom}
                  </span>
                  <span className="legende mt-2 block text-brume">{createurOrigine(c, langue)}</span>
                </figcaption>
              </Link>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
