"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "@/components/media/Photo";
import TitreSection from "@/components/TitreSection";
import { ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";
import { mouvementReduit, surDefilement } from "@/lib/mouvement";

/*
 * Nos robes de mariée — les cartes qui tournent.
 *
 * Une rangée de robes posées sur un cylindre invisible. Le défilement
 * vertical la fait avancer latéralement, et chaque carte s'incline selon
 * sa distance au centre de l'écran : celles du milieu font face, celles
 * des bords se présentent de trois quarts.
 *
 * L'inclinaison est calculée, jamais mesurée. La position de chaque carte
 * se déduit de son rang et de l'avancement — trois multiplications par
 * carte et par image, aucune lecture de mise en page. Le navigateur n'a
 * rien à recalculer, seulement à composer.
 *
 * La scène suit le défilement, elle ne le pilote jamais : la page défile
 * normalement, la rangée est simplement retenue le temps qu'on la
 * traverse. On peut s'arrêter n'importe où, et repartir.
 *
 * Les boutons et les points ne sont pas une décoration : sans eux, la
 * rangée ne serait atteignable qu'à la molette. Ils déplacent le
 * défilement de la page, donc l'état reste unique — il n'y a qu'une seule
 * source de vérité, la position dans la page.
 *
 * Sous 768 px, et si le mouvement est refusé, tout cela disparaît au
 * profit d'un rail horizontal natif avec arrêt sur chaque robe. Le doigt
 * a déjà son inertie ; lui en ajouter une seconde ne rend pas service.
 */

/* Huit robes, choisies pour que deux voisines ne se ressemblent jamais :
 * une par coupe, puis les silhouettes les plus tranchées. */
const CHOIX = [
  "uma",
  "trinity",
  "adularia",
  "solana",
  "amaryllis",
  "clover",
  "venus",
  "pendant",
];

/*
 * La géométrie de la roue.
 *
 * Les cartes ne sont pas simplement inclinées : elles sont posées sur un
 * cylindre. Pour un angle donné, la profondeur vaut R(cos θ − 1) — donc
 * les cartes des bords reculent réellement au lieu de pivoter sur place.
 * C'est ce qui fait qu'on lit une roue et non une rangée penchée.
 *
 * Le creux ajoute quelques pixels de descente vers les bords. Sur un
 * cylindre horizontal parfait la hauteur ne bougerait pas ; l'œil, lui,
 * attend une courbe, et vingt-huit pixels suffisent à la lui donner.
 */
const ANGLE = 26; /* degrés au bord de l'écran */
const RAYON = 820; /* le rayon du cylindre, en pixels */
const CREUX = 28; /* la descente au bord, en pixels */

export default function RobesEnRoue() {
  const scene = useRef<HTMLElement>(null);
  const piste = useRef<HTMLDivElement>(null);
  const cartes = useRef<(HTMLElement | null)[]>([]);
  const [rang, setRang] = useState(0);
  const [roule, setRoule] = useState(false);

  const robes = CHOIX.map((slug) => {
    const robe = ROBES.find((r) => r.slug === slug);
    const media = robe ? vues(robe.slug)[0] : undefined;
    return robe && media ? { robe, media } : null;
  }).filter(Boolean) as { robe: (typeof ROBES)[number]; media: ReturnType<typeof vues>[number] }[];

  /* La roue n'existe que sur grand écran, et jamais contre l'avis de
   * l'utilisatrice. */
  useEffect(() => {
    if (mouvementReduit()) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    setRoule(true);
  }, []);

  useEffect(() => {
    if (!roule) return;
    let demande = 0;
    let dernier = -1;

    const poser = () => {
      demande = 0;
      const s = scene.current;
      const p = piste.current;
      if (!s || !p) return;

      const b = s.getBoundingClientRect();
      const course = b.height - window.innerHeight;
      if (course <= 0) return;
      const avance = Math.min(Math.max(-b.top / course, 0), 1);

      /* Ce qu'il reste à parcourir : la piste moins la fenêtre. */
      const reste = Math.max(p.scrollWidth - window.innerWidth, 0);
      const x = -avance * reste;
      p.style.transform = `translate3d(${x}px, 0, 0)`;

      /* L'inclinaison de chaque carte, déduite de sa position. */
      const milieu = window.innerWidth / 2;
      let proche = 0;
      let ecart = Infinity;
      cartes.current.forEach((el, i) => {
        if (!el) return;
        /* offsetLeft est figé : il ne dépend pas de la translation, donc
         * le lire ne force aucun recalcul. */
        const centre = el.offsetLeft + el.offsetWidth / 2 + x;
        const d = Math.min(Math.max((centre - milieu) / milieu, -1.3), 1.3);
        const theta = (d * ANGLE * Math.PI) / 180;
        const profondeur = RAYON * (Math.cos(theta) - 1);
        el.style.transform = `translateY(${d * d * CREUX}px) rotateY(${
          -d * ANGLE
        }deg) translateZ(${profondeur}px)`;
        const e = Math.abs(centre - milieu);
        if (e < ecart) {
          ecart = e;
          proche = i;
        }
      });
      if (proche !== dernier) {
        dernier = proche;
        setRang(proche);
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
  }, [roule, robes.length]);

  /* Amener une robe au centre revient à déplacer la page : la position
   * dans le document reste la seule source de vérité. */
  const aller = useCallback(
    (i: number) => {
      const s = scene.current;
      const p = piste.current;
      const el = cartes.current[i];
      if (!s || !p || !el) return;
      const reste = Math.max(p.scrollWidth - window.innerWidth, 0);
      if (reste <= 0) return;
      const vise = el.offsetLeft + el.offsetWidth / 2 - window.innerWidth / 2;
      const avance = Math.min(Math.max(vise / reste, 0), 1);
      const haut = window.scrollY + s.getBoundingClientRect().top;
      window.scrollTo({
        top: haut + avance * (s.offsetHeight - window.innerHeight),
        behavior: "smooth",
      });
    },
    []
  );

  return (
    <section
      ref={scene}
      aria-labelledby="robes-roue"
      className={roule ? "relative h-[320svh] bg-blanc" : "relative bg-blanc"}
    >
      {/* Le rembourrage haut dégage l'en-tête fixe : sans lui, l'intitulé
        * se glisse dessous et se coupe. */}
      <div
        className={
          roule
            ? "sticky top-0 h-[100svh] overflow-hidden pt-[calc(var(--barre)+var(--entete))]"
            : "overflow-hidden"
        }
      >
        <TitreSection
          id="robes-roue"
          titre="Nos robes de mariée"
          lien={{ href: "/robes", label: "Voir toutes les robes" }}
        />

        <div
          className={
            roule
              ? "flex h-[calc(100svh-var(--barre)-var(--entete)-11rem)] items-center"
              : "pb-[clamp(2rem,4vw,4rem)]"
          }
          style={roule ? { perspective: "1100px", perspectiveOrigin: "50% 45%" } : undefined}
        >
          <div
            ref={piste}
            className={
              roule
                ? "flex w-max gap-[clamp(1.25rem,2.5vw,2.5rem)] px-[var(--gouttiere)] will-change-transform [transform-style:preserve-3d]"
                : "flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gouttiere)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            }
          >
            {robes.map(({ robe, media }, i) => (
              <figure
                key={robe.slug}
                ref={(el) => {
                  cartes.current[i] = el;
                }}
                className={`w-[clamp(12rem,17vw,16rem)] flex-none ${
                  roule
                    ? "will-change-transform [transform-style:preserve-3d]"
                    : "snap-start"
                }`}
              >
                <Link href={`/robes/${robe.slug}`} className="group block">
                  {/* Le coin est adouci de dix pixels : assez pour que la
                    * carte se lise comme une carte, pas assez pour qu'elle
                    * devienne une pastille. */}
                  <div className="tuile overflow-hidden rounded-[10px] shadow-[0_18px_40px_-28px_rgba(22,19,15,0.55)]">
                    <Photo
                      media={media}
                      dossier="robes"
                      alt={altRobe(robe)}
                      sizes="(max-width: 768px) 62vw, 17vw"
                      priorite={i < 3}
                    />
                  </div>
                  <figcaption className="mt-4">
                    <span className="phrase block text-[1.125rem] text-encre transition-colors duration-500 group-hover:text-action">
                      {robe.nom}
                    </span>
                    <span className="texte mt-1 block">{robe.ligne}</span>
                  </figcaption>
                </Link>
              </figure>
            ))}
          </div>
        </div>

        {/* Les repères. Ils déplacent la page, ils ne pilotent pas la roue. */}
        {roule && (
          <div className="gouttiere absolute inset-x-0 bottom-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => aller(Math.max(rang - 1, 0))}
              disabled={rang === 0}
              className="lien-nav souligne text-encre disabled:opacity-30"
            >
              Précédente
            </button>
            <ol className="flex items-center gap-2" aria-hidden="true">
              {robes.map((r, i) => (
                <li
                  key={r.robe.slug}
                  className={`h-1 w-1 rounded-full transition-colors duration-500 ${
                    i === rang ? "bg-action" : "bg-fil"
                  }`}
                />
              ))}
            </ol>
            <button
              type="button"
              onClick={() => aller(Math.min(rang + 1, robes.length - 1))}
              disabled={rang === robes.length - 1}
              className="lien-nav souligne text-encre disabled:opacity-30"
            >
              Suivante
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
