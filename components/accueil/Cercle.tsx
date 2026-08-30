"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Photo from "@/components/media/Photo";
import { vues } from "@/lib/medias";
import { ROBES } from "@/lib/madamoon";
import { mouvementReduit } from "@/lib/mouvement";

/*
 * La rotation.
 *
 * Six photographies posées sur un cercle invisible dont le centre est
 * sous la page. Au défilement, c'est la composition qui tourne — jamais
 * les images, contre-tournées pour rester droites. Elles passent une à
 * une devant le regard.
 *
 * La scène tient sur deux hauteurs d'écran : assez pour que la rotation
 * se lise, pas assez pour retenir quelqu'un. Sans JavaScript, ou si le
 * mouvement est refusé, les six robes se rangent simplement en ligne.
 */

const CHOIX = [
  { slug: "pendant", vue: 2 },
  { slug: "meredith", vue: 1 },
  { slug: "charlize", vue: 1 },
  { slug: "venus", vue: 1 },
  { slug: "trinity", vue: 1 },
  { slug: "clover", vue: 1 },
];

/*
 * La géométrie.
 *
 * Le cercle est immense et son centre très bas : l'arc qui traverse
 * l'écran est donc presque plat, et les robes glissent latéralement en
 * s'inclinant à peine. Un petit cercle ferait tourner les images en
 * carrousel de manège — ce n'est pas ce que l'on veut.
 *
 * Le pas de 9° correspond, à ce rayon, à environ 340 px entre deux
 * robes : la largeur d'une tuile plus une respiration.
 */
const RAYON = 240; /* en hauteurs d'écran */
const PAS = 9; /* l'écart entre deux robes, en degrés */
const COURSE = 14; /* l'amplitude de la rotation au défilement */

export default function Cercle() {
  const scene = useRef<HTMLDivElement>(null);
  const roue = useRef<HTMLDivElement>(null);
  const [anime, setAnime] = useState(false);

  /* La rotation n'a lieu que sur grand écran, et jamais contre l'avis
   * de l'utilisatrice. La décision est prise avant d'aller chercher GSAP. */
  useEffect(() => {
    if (mouvementReduit()) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    setAnime(true);
  }, []);

  useEffect(() => {
    if (!anime) return;
    let vivant = true;
    let nettoyer: (() => void) | undefined;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!vivant || !scene.current || !roue.current) return;

      const st = ScrollTrigger.create({
        trigger: scene.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.1,
        onUpdate: (self) => {
          const angle = COURSE - self.progress * COURSE * 2;
          gsap.set(roue.current, { rotate: angle });
          const cartes = roue.current?.querySelectorAll<HTMLElement>("[data-carte]");
          cartes?.forEach((c) => gsap.set(c, { rotate: -angle - Number(c.dataset.pose) }));
        },
      });

      nettoyer = () => st.kill();
    });

    return () => {
      vivant = false;
      nettoyer?.();
    };
  }, [anime]);

  const robes = CHOIX.map((c) => {
    const media = vues(c.slug)[c.vue - 1];
    const robe = ROBES.find((r) => r.slug === c.slug);
    return media && robe ? { media, robe } : null;
  }).filter(Boolean) as { media: ReturnType<typeof vues>[number]; robe: (typeof ROBES)[number] }[];

  return (
    <section
      ref={scene}
      aria-labelledby="rotation"
      className={anime ? "relative h-[240svh] bg-ivoire" : "relative bg-ivoire"}
    >
      <div
        className={
          anime
            ? "sticky top-0 h-[100svh] overflow-hidden"
            : "relative overflow-hidden pb-[clamp(3rem,5vw,5rem)]"
        }
      >
        <div className="gouttiere relative z-10 pt-[clamp(3rem,5.5vw,5rem)]">
          <h2 id="rotation" className="titre-section">
            La collection
          </h2>
          <p className="texte mesure mt-2">
            Quarante robes en showroom, choisies une par une chez cinq maisons.
          </p>
        </div>

        {anime ? (
          <div
            ref={roue}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[295%] h-0 w-0 will-change-transform"
          >
            {robes.map(({ media, robe }, i) => {
              const pose = (i - (robes.length - 1) / 2) * PAS;
              return (
                /* Le bras : il place un point sur le cercle, et ne bouge plus. */
                <div
                  key={robe.slug}
                  className="absolute left-0 top-0"
                  style={{ transform: `rotate(${pose}deg) translateY(-${RAYON}svh)` }}
                >
                  {/* Le redressement : la seule valeur que le défilement modifie. */}
                  <div
                    data-carte
                    data-pose={pose}
                    className="will-change-transform"
                    style={{ transform: `rotate(${-pose - COURSE}deg)` }}
                  >
                    <div className="absolute left-0 top-0 w-[21vw] min-w-[9rem] -translate-x-1/2 -translate-y-1/2">
                      <div className="tuile">
                        <Photo
                          media={media}
                          dossier="robes"
                          alt={`Robe de mariée ${robe.nom} — ${robe.ligne}`}
                          sizes="21vw"
                        />
                      </div>
                      <p className="mention mt-3 text-center text-encre">{robe.nom}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Le repli : une ligne de robes, sans rotation. */
          <div className="gouttiere mt-8">
            <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
              {robes.map(({ media, robe }) => (
                <Link key={robe.slug} href={`/robes/${robe.slug}`} className="tuile group block">
                  <Photo
                    media={media}
                    dossier="robes"
                    alt={`Robe de mariée ${robe.nom} — ${robe.ligne}`}
                    sizes="(max-width: 768px) 50vw, 31vw"
                  />
                  <span className="voile-lecture" aria-hidden="true" />
                  <span className="dans-image">
                    <span className="nom-image">{robe.nom}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {anime && (
          <div className="gouttiere absolute inset-x-0 bottom-10 z-10 flex justify-center">
            <Link href="/robes" className="bouton-trait">
              Voir toutes les robes
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
