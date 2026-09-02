"use client";

import { useEffect, useRef, useState } from "react";
import { SCENES } from "@/lib/medias";
import { mouvementReduit } from "@/lib/mouvement";
import { media as chemin } from "@/lib/chemin";
import Bandeau from "@/components/accueil/Bandeau";
import AppelElise from "@/components/AppelElise";
import { altScene } from "@/lib/alt";

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
 */

const DESKTOP = SCENES["hero-affiche"];
const MOBILE = SCENES["hero-affiche-mobile"];


const jeu = (media: { name: string }, ext: string, largeurs: readonly number[]) =>
  largeurs.map((w) => `${chemin(`/scenes/${media.name}-${w}.${ext}`)} ${w}w`).join(", ");

export default function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [charge, setCharge] = useState(false);
  const [prete, setPrete] = useState(false);
  const [joue, setJoue] = useState(true);
  /* La lecture voulue par la visiteuse, lisible depuis le défilement sans
   * refaire l'écouteur à chaque bascule. */
  const joueRef = useRef(true);
  joueRef.current = joue;

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

  /* Le film s'arrête quand la section suivante l'a entièrement recouvert.
   * Il est alors invisible : le laisser tourner ne coûterait que de la
   * batterie. Il repart en remontant, sauf si elle l'a mis en pause
   * elle-même. */
  useEffect(() => {
    if (mouvementReduit()) return;
    const el = video.current;
    if (!el || !charge) return;

    let demande = 0;
    const poser = () => {
      demande = 0;
      if (!joueRef.current) return;
      const couvert = window.scrollY > window.innerHeight;
      if (couvert && !el.paused) el.pause();
      else if (!couvert && el.paused) el.play().catch(() => {});
    };
    const surScroll = () => {
      if (!demande) demande = requestAnimationFrame(poser);
    };
    /* Une première évaluation à l'ouverture. Sans elle, l'état ne se
     * corrigeait qu'au premier défilement : revenir en haut par une ancre,
     * ou rouvrir la page depuis le cache, laissait le film en pause devant
     * une visiteuse qui n'avait rien demandé. */
    poser();
    window.addEventListener("scroll", surScroll, { passive: true });
    return () => {
      cancelAnimationFrame(demande);
      window.removeEventListener("scroll", surScroll);
    };
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

  /*
   * Le hero est collé sous le bandeau, pas au bord de la fenêtre : le
   * contenu de la page commence à 38 px du haut, et un hero haut de
   * « 100svh moins le bandeau » collé à zéro laisserait justement 38 px
   * de blanc sous lui.
   *
   * Rien d'autre ne change. La vidéo, le titre, le bouton et le bandeau
   * restent exactement tels quels pendant que la section suivante passe
   * par-dessus — pas de flou, pas de fondu, pas de voile.
   */
  return (
    <section className="sticky top-[var(--barre)] z-0 h-[calc(100svh-var(--barre))] min-h-[34rem] w-full overflow-hidden bg-craie">
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
          alt={altScene("Une mariée en robe de dentelle")}
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
    </section>
  );
}
