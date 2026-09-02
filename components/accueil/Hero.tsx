"use client";

import { useEffect, useRef, useState } from "react";
import { SCENES } from "@/lib/medias";
import { mouvementReduit } from "@/lib/mouvement";
import { media as chemin } from "@/lib/chemin";
import Bandeau from "@/components/accueil/Bandeau";
import AppelElise from "@/components/AppelElise";

/*
 * Le hero, relevé sur la référence.
 *
 * La vidéo occupe la hauteur de la fenêtre moins le bandeau ; la barre de
 * navigation est posée dessus. Le texte est calé sur la gouttière, centré
 * en hauteur, dans une colonne de 53 % : un titre, une ligne, un bouton.
 * Rien d'autre — pas de paragraphe, pas de second bloc.
 *
 * L'affiche est chargée en priorité : c'est elle qui s'affiche d'abord, et
 * c'est elle qui reste si la connexion est comptée ou si le mouvement est
 * refusé. La vidéo vient ensuite, en fondu, muette et en boucle.
 *
 * Le passage à la section suivante.
 *
 * Le hero ne défile pas : il est collant, et « Par où commencer » remonte
 * par-dessus. À mesure qu'elle monte, l'image se floute et tout ce qui
 * était écrit dessus s'efface — le hero cesse d'être une scène pour
 * devenir le fond de la section, derrière les deux photographies.
 *
 * Le flou est arrondi au pixel : à chaque valeur nouvelle le navigateur
 * refait le rendu de tout le plan, et une progression continue le ferait
 * soixante fois par seconde pour rien.
 *
 * Il se colle sous le bandeau, pas au bord de la fenêtre : le contenu
 * commence à 38 px du haut, et un hero haut de « 100svh moins le
 * bandeau » collé à zéro laissait justement 38 px de blanc sous lui.
 */

const DESKTOP = SCENES["hero-affiche"];
const MOBILE = SCENES["hero-affiche-mobile"];


const jeu = (media: { name: string }, ext: string, largeurs: readonly number[]) =>
  largeurs.map((w) => `${chemin(`/scenes/${media.name}-${w}.${ext}`)} ${w}w`).join(", ");

/* Le flou au bout de la course. Au-delà, on ne gagne plus rien de
 * visible et le rendu devient coûteux. */
const FLOU = 18;

export default function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const fond = useRef<HTMLDivElement>(null);
  const voile = useRef<HTMLDivElement>(null);
  const devant = useRef<HTMLDivElement>(null);
  const [charge, setCharge] = useState(false);
  const [prete, setPrete] = useState(false);
  const [joue, setJoue] = useState(true);
  /* La lecture voulue par la visiteuse, lisible depuis le défilement sans
   * refaire l'écouteur à chaque bascule. */
  const joueRef = useRef(true);
  joueRef.current = joue;
  /* Le hero ne devient collant que si le passage a lieu : sans lui, la
   * section suivante n'aurait rien à recouvrir. */
  const [passage, setPassage] = useState(false);

  useEffect(() => {
    if (!mouvementReduit()) setPassage(true);
  }, []);

  useEffect(() => {
    if (!passage) return;
    let demande = 0;
    const poser = () => {
      demande = 0;
      const hauteur = window.innerHeight || 1;
      const avance = Math.min(Math.max(window.scrollY / hauteur, 0), 1);
      if (fond.current) {
        /* Un léger agrandissement : le flou mange les bords, et sans lui
         * on verrait le fond de la page les traverser. */
        fond.current.style.filter = `blur(${Math.round(avance * FLOU)}px)`;
        fond.current.style.transform = `scale(${1 + avance * 0.06})`;
      }
      /* Le voile monte avec le flou.
       *
       * Le titre de la section est en blanc : c'est donc un voile sombre
       * qu'il faut, et non clair. Sa force est mesurée plus bas. */
      if (voile.current) voile.current.style.opacity = String(avance);

      /* Une fois le fond entièrement flouté, le film est figé : personne
       * ne lit un mouvement sous dix-huit pixels de flou, et le rendu
       * d'un plan plein écran flouté à soixante images par seconde coûte
       * cher pour rien. Il repart dès qu'on remonte — sauf si elle l'a
       * mis en pause elle-même. */
      const el = video.current;
      if (el && joueRef.current) {
        if (avance > 0.85 && !el.paused) el.pause();
        else if (avance <= 0.85 && el.paused) el.play().catch(() => {});
      }

      if (devant.current) {
        /* Le texte s'efface avant la fin de la course : on ne laisse
         * jamais lire un titre flou. */
        devant.current.style.opacity = String(Math.max(0, 1 - avance * 1.9));
      }
    };
    const surScroll = () => {
      if (!demande) demande = requestAnimationFrame(poser);
    };
    poser();
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surScroll);
    return () => {
      cancelAnimationFrame(demande);
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surScroll);
    };
  }, [passage]);

  useEffect(() => {
    const co = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (mouvementReduit() || co?.saveData) return;
    /* La vidéo ne concurrence jamais l'affichage du premier écran. */
    const t = window.setTimeout(() => setCharge(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el || !charge) return;
    /* On demande la lecture tout de suite : c'est elle qui déclenche le
     * chargement. Attendre « canplay » avant de jouer ne mène nulle part,
     * puisque rien n'est chargé tant qu'on n'a pas joué. */
    const surLecture = () => setPrete(true);
    el.addEventListener("playing", surLecture);
    el.play().catch(() => {});
    return () => el.removeEventListener("playing", surLecture);
  }, [charge]);

  const basculer = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setJoue(true);
    } else {
      el.pause();
      setJoue(false);
    }
  };

  return (
    <section
      className={`${
        passage ? "sticky top-[var(--barre)] z-0" : "relative"
      } h-[calc(100svh-var(--barre))] min-h-[34rem] w-full overflow-hidden bg-craie`}
    >
      <div ref={fond} className="absolute inset-0 will-change-[filter,transform]">
      <picture>
        <source
          type="image/avif"
          media="(max-width: 700px)"
          srcSet={jeu(MOBILE, "avif", MOBILE.widths)}
          sizes="100vw"
        />
        <source
          type="image/webp"
          media="(max-width: 700px)"
          srcSet={jeu(MOBILE, "webp", MOBILE.widths)}
          sizes="100vw"
        />
        <source type="image/avif" srcSet={jeu(DESKTOP, "avif", DESKTOP.widths)} sizes="100vw" />
        <source type="image/webp" srcSet={jeu(DESKTOP, "webp", DESKTOP.widths)} sizes="100vw" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chemin(`/scenes/${DESKTOP.name}-1000.jpg`)}
          srcSet={jeu(DESKTOP, "jpg", DESKTOP.jpgw)}
          sizes="100vw"
          width={DESKTOP.w}
          height={DESKTOP.h}
          alt="Une mariée en robe de dentelle dans le showroom MADAMOON à Paris"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backgroundImage: `url(${DESKTOP.blur})`, backgroundSize: "cover" }}
        />
      </picture>

      {charge && (
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] [transition-timing-function:var(--ease-doux)] ${
            prete ? "opacity-100" : "opacity-0"
          }`}
        >
          <source
            src={chemin("/film/hero-mobile.mp4")}
            type="video/mp4"
            media="(max-width: 700px)"
          />
          <source src={chemin("/film/hero-desktop.mp4")} type="video/mp4" />
        </video>
      )}
      </div>

      {/* Le voile de lecture, entre l'image floutée et ce qu'on écrit
        * dessus. Absent au premier écran, entier à la fin de la course. */}
      <div
        ref={voile}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{ background: "rgba(12, 10, 8, 0.5)" }}
      />

      {/* Tout ce qui est posé sur l'image s'efface ensemble : les voiles,
        * le titre, le bouton, le bandeau. La couche ne prend pas le
        * pointeur — seuls ses enfants cliquables le reprennent. */}
      <div
        ref={devant}
        className="pointer-events-none absolute inset-0 [&_a]:pointer-events-auto [&_button]:pointer-events-auto"
      >
      {/* Deux voiles très légers : l'un vers la gauche pour le titre, l'autre
       * en haut pour que la navigation blanche reste lisible quelle que soit
       * l'image de la vidéo. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.14) 45%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Le bloc de texte : gouttière à gauche, centré en hauteur. */}
      <div className="gouttiere absolute inset-0 flex flex-col justify-center">
        <div className="w-full max-w-[53vw] min-w-[16rem] max-md:max-w-[92%]">
          <h1 className="affiche text-blanc">Vous vous mariez bientôt ?</h1>
          <p className="accroche mt-6 text-blanc">
            Robes de mariée, essayage privé — Paris 10<sup>e</sup>
          </p>
          {/* Rouge plein sur la photographie : la cliente veut l'action
            * franche plutôt que le bouton blanc de la référence.
            *
            * Il n'emmène nulle part — il ouvre Élise, qui part de la
            * silhouette. Sans maison ici : l'accueil ne filtre rien. */}
          <AppelElise className="bouton mt-6">Trouver ma robe</AppelElise>
        </div>
      </div>

      {/* La commande de lecture, en bas à gauche, comme sur la référence. */}
      {charge && prete && (
        <button
          type="button"
          onClick={basculer}
          aria-label={joue ? "Mettre la vidéo en pause" : "Reprendre la vidéo"}
          className="absolute bottom-6 left-[var(--gouttiere)] flex h-8 w-8 items-center justify-center text-blanc/80 transition-colors duration-500 hover:text-blanc"
        >
          <span aria-hidden="true">
            {joue ? (
              <span className="flex gap-[3px]">
                <span className="block h-3 w-px bg-current" />
                <span className="block h-3 w-px bg-current" />
              </span>
            ) : (
              <span className="block h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
            )}
          </span>
        </button>
      )}

      <Bandeau />
      </div>
    </section>
  );
}
