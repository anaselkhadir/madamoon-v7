"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Photo from "@/components/media/Photo";
import { ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";
import { mouvementReduit } from "@/lib/mouvement";

/*
 * Nos robes de mariée — la scène.
 *
 * Une robe tient le grand cadre ; les cinq suivantes attendent en colonne.
 * À chaque pas, la vignette du haut descend vers le cadre en grandissant,
 * celle du cadre rétrécit et va prendre la dernière place de la colonne,
 * et les autres remontent d'un cran. Les six robes tournent ainsi en
 * anneau, sans début ni fin.
 *
 * Rien n'apparaît ni ne disparaît : ce sont toujours les six mêmes cartes
 * qui changent de place. C'est ce qui donne l'échange son poids — on suit
 * une image des yeux au lieu de subir un fondu.
 *
 * La photographie ne change pas en route : elle est recadrée en continu
 * par « object-fit », du format paysage de la vignette au format portrait
 * du cadre. D'où le sentiment d'un objet qui se retourne plutôt que d'une
 * image qu'on remplace.
 *
 * Les proportions et la durée sont relevées au pixel sur la référence :
 * cadre 71,14 % de la scène, colonne 26,03 %, pas vertical 20,505 %,
 * déplacement de 0,53 s en courbe symétrique, repos d'une seconde.
 *
 * Les places sont écrites en pourcentages de la scène, jamais en pixels
 * mesurés. La mise en page est donc juste dès le premier affichage, avant
 * même que le script ne tourne, et le redimensionnement ne demande aucun
 * calcul.
 *
 * Le mouvement s'arrête au survol et à la prise de focus — les cartes sont
 * des liens, il faut pouvoir les atteindre. Une commande le suspend aussi
 * pour de bon : une animation qui tourne seule au-delà de cinq secondes
 * doit pouvoir être arrêtée.
 *
 * Le mouvement refusé fige la scène sur la première robe et retire les
 * transitions ; la colonne reste lisible et cliquable.
 */

/* Six robes, une par famille : deux voisines ne se ressemblent jamais. */
const CHOIX = ["uma", "trinity", "adularia", "solana", "amaryllis", "clover"];

/* La géométrie, relevée sur la référence (toile de 720 px, contenu 634). */
const CADRE = 71.14; /* largeur du grand cadre, en % de la scène */
const COLONNE = 26.03; /* largeur de la colonne */
const DEPART = 73.97; /* bord gauche de la colonne = cadre + écart */
const PAS = 20.505; /* pas vertical d'une vignette */
const VIGNETTE = 17.792; /* hauteur d'une vignette */

/* La cadence, relevée de la même façon. */
const DUREE = 530; /* le déplacement, en ms */
const REPOS = 1100; /* l'arrêt entre deux pas */
const COURBE = "cubic-bezier(0.42, 0, 0.58, 1)";

/* La place d'une carte selon son rang : 0 le cadre, 1 à 5 la colonne. */
function place(rang: number) {
  if (rang === 0) {
    return { left: "0%", top: "0%", width: `${CADRE}%`, height: "100%" };
  }
  return {
    left: `${DEPART}%`,
    top: `${(rang - 1) * PAS}%`,
    width: `${COLONNE}%`,
    height: `${VIGNETTE}%`,
  };
}

export default function RobesEnScene() {
  const scene = useRef<HTMLDivElement>(null);
  const [tete, setTete] = useState(0);
  const [lecture, setLecture] = useState(true);

  const robes = CHOIX.map((slug) => {
    const robe = ROBES.find((r) => r.slug === slug);
    /* Une seule vue par robe : c'est la même photographie qui voyage du
     * petit format au grand, seulement recadrée. */
    const media = robe ? vues(robe.slug)[0] : undefined;
    return robe && media ? { robe, media } : null;
  }).filter(Boolean) as {
    robe: (typeof ROBES)[number];
    media: ReturnType<typeof vues>[number];
  }[];

  const n = robes.length;

  useEffect(() => {
    if (mouvementReduit() || !lecture || n === 0) return;
    /* L'attente est interrogée au moment du pas plutôt que retenue dans un
     * état. Une paire entrée/sortie de souris finit toujours par se
     * désaccorder — les cartes passent sous le curseur, et il suffit d'une
     * sortie manquée pour que la scène s'arrête pour de bon. Lire la chose
     * au moment où l'on en a besoin ne peut pas rester coincé. */
    const t = window.setInterval(() => {
      const el = scene.current;
      if (el && (el.matches(":hover") || el.contains(document.activeElement))) return;
      setTete((k) => (k + 1) % n);
    }, DUREE + REPOS);
    return () => window.clearInterval(t);
  }, [lecture, n]);

  if (n === 0) return null;
  const devant = robes[tete].robe;

  return (
    <section
      aria-labelledby="robes-scene"
      className="relative z-10 bg-blanc py-[clamp(2.5rem,5vw,4.5rem)]"
    >
      {/* La section n'a plus d'intitulé à l'écran — la scène occupe la
        * place. Il reste dans le document : sans lui, la section n'aurait
        * aucun nom à annoncer et le plan de la page y perdrait une
        * entrée. */}
      <h2 id="robes-scene" className="sr-only">
        Nos robes de mariée
      </h2>

      <div
        ref={scene}
        /* La composition est carrée par construction : le grand cadre est
         * un portrait de rapport 0,711 et les cinq vignettes empilées font
         * exactement sa hauteur, d'où largeur égale hauteur. On lui donne
         * donc toute la hauteur qu'on peut lui donner, et la largeur suit.
         *
         * Sur téléphone c'est l'inverse — la largeur est prise en entier,
         * d'un bord à l'autre, et le format passe en trois quarts : en
         * carré, les vignettes n'auraient que soixante pixels de haut. */
        className="relative mx-auto aspect-[3/4] w-full md:aspect-square md:h-[min(88svh,54rem)] md:w-auto"
      >
        {robes.map(({ robe, media }, i) => {
          const rang = (i - tete + n) % n;
          const p = place(rang);
          const cadre = rang === 0;
          return (
            <figure
              key={robe.slug}
              className="absolute overflow-hidden motion-reduce:transition-none"
              style={{
                ...p,
                /* La carte qui monte vers le cadre passe devant celle qui
                 * en descend — comme sur la référence. */
                zIndex: cadre ? 20 : 10 - rang,
                transition: `left ${DUREE}ms ${COURBE}, top ${DUREE}ms ${COURBE}, width ${DUREE}ms ${COURBE}, height ${DUREE}ms ${COURBE}`,
              }}
            >
              <Link href={`/robes/${robe.slug}`} className="block h-full w-full">
                <Photo
                  media={media}
                  dossier="robes"
                  alt={altRobe(robe)}
                  sizes="(max-width: 768px) 100vw, 40rem"
                  priorite={i < 2}
                  position="50% 22%"
                  className="h-full w-full object-cover"
                />
              </Link>
            </figure>
          );
        })}
      </div>

      {/* La commande d'arrêt, réduite au signe. Une animation qui tourne
        * seule au-delà de cinq secondes doit pouvoir être arrêtée, et le
        * survol n'y suffit pas — il n'existe pas au doigt. C'est le même
        * signe que sur le film du hero. */}
      <div className="gouttiere mt-5 flex justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setLecture((v) => !v)}
          aria-label={lecture ? "Suspendre le défilé des robes" : "Reprendre le défilé des robes"}
          className="flex h-8 w-8 items-center justify-center text-brume transition-colors duration-500 hover:text-encre"
        >
          <span aria-hidden="true">
            {lecture ? (
              <span className="flex gap-[3px]">
                <span className="block h-3 w-px bg-current" />
                <span className="block h-3 w-px bg-current" />
              </span>
            ) : (
              <span className="block h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
            )}
          </span>
        </button>
      </div>

      {/* Le nom de la robe au cadre, annoncé aux lecteurs d'écran. */}
      <p className="sr-only" aria-live="polite">
        {devant.nom}
      </p>
    </section>
  );
}
