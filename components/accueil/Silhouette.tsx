"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Photo from "@/components/media/Photo";
import { MORPHOLOGIES, ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";
import { mouvementReduit, surDefilement } from "@/lib/mouvement";

/*
 * La silhouette.
 *
 * La première scène après le hero, et celle qui remonte par-dessus lui.
 *
 * Six morphologies, six lettres, six robes. Le défilement fait passer de
 * l'une à l'autre : la lettre grandit, la photographie change en fondu.
 * On ne lit pas un cours sur les morphologies — on en voit six passer, et
 * l'idée se comprend sans qu'on l'explique.
 *
 * La scène est collée le temps de les traverser, puis rend la main. Elle
 * suit le défilement, elle ne le capture jamais : on peut s'arrêter
 * n'importe où, repartir en arrière, sauter la section d'un geste.
 *
 * Ce qui bouge est une opacité ou une transformation, jamais une mise en
 * page. Les six photographies sont empilées et se croisent en fondu ; le
 * reste est du texte qui change de graisse et de couleur.
 *
 * Au survol d'une lettre, la main reprend la scène : c'est elle qui
 * décide, et le défilement cesse d'imposer. On relâche, il reprend.
 *
 * Le mouvement refusé fige la scène sur la première morphologie, retire
 * le collant et laisse les six lettres accessibles en liste.
 */

/* La part de la course laissée aux deux extrémités : la première et la
 * dernière morphologie tiennent un peu plus longtemps que les autres,
 * sinon elles ne font que passer en entrant et en sortant. */
const MARGE = 0.08;

export default function Silhouette() {
  const piste = useRef<HTMLDivElement>(null);
  const cadre = useRef<HTMLDivElement>(null);
  /* La lettre choisie à la main. Tant qu'elle existe, le défilement
   * n'impose plus rien. */
  const [tenue, setTenue] = useState<number | null>(null);
  const [rang, setRang] = useState(0);

  const scenes = MORPHOLOGIES.map((m) => {
    const robe = ROBES.find((r) => r.slug === m.ouverture.robe);
    const media = robe ? vues(robe.slug)[m.ouverture.vue - 1] : undefined;
    return robe && media ? { m, robe, media } : null;
  }).filter(Boolean) as {
    m: (typeof MORPHOLOGIES)[number];
    robe: (typeof ROBES)[number];
    media: ReturnType<typeof vues>[number];
  }[];

  const n = scenes.length;

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

      /* Une dérive de trois pour cent sur la photographie : assez pour
       * qu'elle ne soit pas figée, trop peu pour qu'on la remarque. */
      const el = cadre.current;
      if (el) el.style.transform = `translate3d(0, ${(brut - 0.5) * 3}%, 0)`;
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
  const { m } = scenes[actif];

  return (
    <section aria-labelledby="silhouette" className="relative z-10 bg-blanc">
      {/* La course. Six morphologies à traverser, plus une hauteur d'écran
        * pour le collant : au delà, la scène s'attarde ; en deçà, les
        * lettres défilent trop vite pour qu'on les lise. */}
      <div ref={piste} className="relative h-[230svh] max-lg:h-[190svh]">
        <div className="sticky top-[calc(var(--barre)+var(--entete))] flex h-[calc(100svh-var(--barre)-var(--entete))] min-h-[30rem] items-center overflow-hidden">
          <div className="gouttiere grid w-full items-center gap-[clamp(1.5rem,4vw,4rem)] max-lg:content-center max-lg:gap-8 lg:grid-cols-[1fr_auto]">
            {/* ————————————————————————————— le propos ————— */}
            <div className="max-lg:order-2">
              <p className="legende">La silhouette</p>
              <span data-ligne className="mt-4 block">
                <h2 id="silhouette" className="phrase mesure-l">
                  Avant la robe, la ligne.
                </h2>
              </span>
              <p className="texte mesure mt-4 max-lg:hidden">
                Six silhouettes, et pour chacune les coupes qui l&apos;allongent,
                l&apos;équilibrent ou la révèlent.
              </p>

              {/* Les six lettres. Chacune mène à sa page ; le survol
                * change la photographie sans quitter l'accueil. */}
              <ul
                className="mt-[clamp(1.75rem,4vw,3rem)] flex flex-wrap items-baseline gap-x-[clamp(1rem,2.6vw,2.25rem)] gap-y-3"
                onMouseLeave={() => setTenue(null)}
              >
                {scenes.map(({ m: s }, i) => (
                  <li key={s.lettre}>
                    <Link
                      href={`/morphologies/${s.lettre.toLowerCase()}`}
                      onMouseEnter={() => setTenue(i)}
                      onFocus={() => setTenue(i)}
                      onBlur={() => setTenue(null)}
                      aria-current={i === actif ? "true" : undefined}
                      className={`block font-serif text-[clamp(1.75rem,3.4vw,3rem)] leading-none transition-colors duration-700 [transition-timing-function:var(--ease-doux)] ${
                        i === actif ? "text-encre" : "text-fil hover:text-brume"
                      }`}
                    >
                      {s.lettre}
                      <span className="sr-only"> — {s.nom}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Le nom et la ligne de la morphologie active. Les six sont
                * empilés dans la même case de grille : la hauteur est
                * celle du plus long, et rien ne saute d'une lettre à
                * l'autre. */}
              <div className="mt-6 grid" aria-live="polite">
                {scenes.map(({ m: s }, i) => (
                  <div
                    key={s.lettre}
                    className={`col-start-1 row-start-1 transition-opacity duration-700 [transition-timing-function:var(--ease-doux)] ${
                      i === actif ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={i !== actif || undefined}
                  >
                    <p className="nom-carte text-[1.0625rem]">{s.nom}</p>
                    <p className="texte mesure mt-1">{s.silhouette}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/morphologies"
                className="lien-nav souligne mt-8 inline-block text-action max-lg:mt-6"
              >
                Les six morphologies
              </Link>
            </div>

            {/* ————————————————————————————— la robe ————— */}
            <div
              ref={cadre}
              className="relative aspect-[5/7] w-full overflow-hidden will-change-transform max-lg:order-1 max-lg:mx-auto max-lg:max-w-[17rem] lg:h-[min(64svh,38rem)] lg:w-auto"
            >
              {scenes.map(({ m: s, robe, media }, i) => (
                <Photo
                  key={s.lettre}
                  media={media}
                  dossier="robes"
                  alt={altRobe(robe)}
                  sizes="(max-width: 768px) 60vw, 30rem"
                  priorite={i === 0}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] [transition-timing-function:var(--ease-doux)] ${
                    i === actif ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
