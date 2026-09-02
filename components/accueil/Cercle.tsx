"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Photo from "@/components/media/Photo";
import { vues } from "@/lib/medias";
import { ROBES } from "@/lib/madamoon";
import { mouvementReduit } from "@/lib/mouvement";
import { altRobe } from "@/lib/alt";

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
 *
 * Le défilement vertical fait tourner la composition ; la main peut en
 * plus la pousser latéralement — au glisser, ou au défilement horizontal
 * du pavé tactile. Les deux angles s'additionnent : on ne se dispute pas
 * la même valeur, donc pousser à la main ne défait jamais le scroll.
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
const LIBRE = 18; /* ce que la main peut ajouter, de part et d'autre */

const borner = (v: number) => Math.min(Math.max(v, -LIBRE), LIBRE);

export default function Cercle() {
  const scene = useRef<HTMLDivElement>(null);
  const roue = useRef<HTMLDivElement>(null);
  const prise = useRef<HTMLDivElement>(null);
  const [anime, setAnime] = useState(false);

  /* Les deux moitiés de la rotation : ce que le défilement impose, et ce
   * que la main ajoute. « visee » est là où la main veut aller, « pousse »
   * où l'on en est — l'écart entre les deux fait l'inertie. */
  const impose = useRef(COURSE);
  const visee = useRef(0);
  const pousse = useRef(0);

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
      if (!vivant || !scene.current || !roue.current || !prise.current) return;
      const cadre = roue.current;
      const main = prise.current;

      const poser = () => {
        const angle = impose.current + pousse.current;
        gsap.set(cadre, { rotate: angle });
        cadre
          .querySelectorAll<HTMLElement>("[data-carte]")
          .forEach((c) => gsap.set(c, { rotate: -angle - Number(c.dataset.pose) }));
      };

      /* Combien de degrés vaut un pixel de la main.
       *
       * Le rayon est exprimé en hauteurs d'écran : à 240 svh sur une
       * fenêtre de 860 px, il fait 2064 px, et un degré d'arc vaut 36 px.
       * Glisser de la largeur d'une tuile revient donc à passer une robe. */
      const parPixel = () => 180 / (Math.PI * (RAYON / 100) * window.innerHeight);

      const st = ScrollTrigger.create({
        trigger: scene.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.1,
        onUpdate: (self) => {
          impose.current = COURSE - self.progress * COURSE * 2;
          poser();
        },
      });

      /* Le pavé tactile : on ne retient que les gestes franchement
       * latéraux, sinon on volerait le défilement vertical de la page. */
      const surRoulette = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        e.preventDefault();
        visee.current = borner(visee.current - e.deltaX * parPixel());
      };

      /* Le glisser. On suit le geste sur la fenêtre plutôt que de capturer
       * le pointeur : la capture échoue dès que le pointeur n'est plus
       * actif, et le glisser s'arrêtait net en sortant de la scène. */
      let tenu = false;
      let depart = 0;
      let depuis = 0;
      const surPrise = (e: PointerEvent) => {
        tenu = true;
        depart = e.clientX;
        depuis = visee.current;
        main.dataset.tenu = "";
      };
      const surGlisse = (e: PointerEvent) => {
        if (!tenu) return;
        visee.current = borner(depuis + (e.clientX - depart) * parPixel());
      };
      const surLache = () => {
        tenu = false;
        delete main.dataset.tenu;
      };

      main.addEventListener("wheel", surRoulette, { passive: false });
      main.addEventListener("pointerdown", surPrise);
      window.addEventListener("pointermove", surGlisse);
      window.addEventListener("pointerup", surLache);
      window.addEventListener("pointercancel", surLache);

      /* L'inertie : la poussée rejoint la visée par approches, et on ne
       * repeint que tant qu'elle bouge encore. */
      let image = 0;
      const boucle = () => {
        const ecart = visee.current - pousse.current;
        if (Math.abs(ecart) > 0.002) {
          pousse.current += ecart * 0.12;
          poser();
        }
        image = requestAnimationFrame(boucle);
      };
      image = requestAnimationFrame(boucle);

      nettoyer = () => {
        st.kill();
        cancelAnimationFrame(image);
        main.removeEventListener("wheel", surRoulette);
        main.removeEventListener("pointerdown", surPrise);
        window.removeEventListener("pointermove", surGlisse);
        window.removeEventListener("pointerup", surLache);
        window.removeEventListener("pointercancel", surLache);
      };
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
          <>
            {/* La surface de préhension.
              *
              * Les tuiles sont posées sur un bras de 0 × 0 pixel : on ne
              * peut pas les saisir elles-mêmes sans manquer tout ce qui
              * les entoure. Cette couche transparente couvre la scène,
              * sous le titre et le bouton — qui portent un z-10 et
              * restent donc cliquables.
              *
              * « pan-y » laisse le doigt faire défiler la page vers le
              * bas : seul le geste latéral nous revient. */}
            <div
              ref={prise}
              aria-hidden="true"
              className="absolute inset-0 touch-pan-y cursor-grab [&[data-tenu]]:cursor-grabbing"
            />
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
                          alt={altRobe(robe)}
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
          </>
        ) : (
          /* Le repli — petit écran, ou mouvement refusé.
            *
            * La rotation n'a pas lieu, mais les robes défilent quand même
            * sous le doigt : un rail horizontal, avec arrêt sur chaque
            * tuile. Rien ne bouge tout seul, c'est la main qui mène.
            *
            * La gouttière est portée par le rembourrage du rail et non par
            * un parent, sans quoi la première et la dernière tuile
            * viendraient buter contre le bord. */
          <div
            className="mt-8 flex snap-x snap-mandatory gap-1.5 overflow-x-auto px-[var(--gouttiere)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollPaddingInline: "var(--gouttiere)" }}
          >
            {robes.map(({ media, robe }) => (
              <Link
                key={robe.slug}
                href={`/robes/${robe.slug}`}
                className="tuile group block w-[62vw] max-w-[19rem] flex-none snap-start"
              >
                <Photo
                  media={media}
                  dossier="robes"
                  alt={altRobe(robe)}
                  sizes="(max-width: 768px) 62vw, 19rem"
                />
                <span className="voile-lecture" aria-hidden="true" />
                <span className="dans-image">
                  <span className="nom-image">{robe.nom}</span>
                </span>
              </Link>
            ))}
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
