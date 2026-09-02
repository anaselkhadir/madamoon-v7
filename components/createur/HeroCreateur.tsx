"use client";

import { useEffect, useRef, useState } from "react";
import Bandeau from "@/components/accueil/Bandeau";
import AppelElise from "@/components/AppelElise";
import { SCENES, vues, type Media } from "@/lib/medias";
import { FILMS } from "@/lib/films";
import { mouvementReduit } from "@/lib/mouvement";
import { media as chemin } from "@/lib/chemin";
import type { Createur } from "@/lib/madamoon";

/*
 * Le premier écran d'une maison.
 *
 * Le même écran que l'accueil, au nom de la maison : une image plein
 * cadre, le titre calé sur la gouttière, une ligne, un bouton rouge.
 *
 * Le film n'est là que si la maison en a un. Trois des cinq n'en ont
 * pas ; leur page s'ouvre alors sur la photographie de la robe choisie,
 * et rien ne le signale — une image fixe n'est pas un manque.
 *
 * L'affiche est chargée en priorité : c'est elle qui s'affiche d'abord,
 * et c'est elle qui reste si la connexion est comptée ou si le mouvement
 * est refusé.
 */

const jeu = (media: Media, ext: string, largeurs: readonly number[], dossier: string) =>
  largeurs.map((w) => `${chemin(`/${dossier}/${media.name}-${w}.${ext}`)} ${w}w`).join(", ");

export default function HeroCreateur({ createur }: { createur: Createur }) {
  const video = useRef<HTMLVideoElement>(null);
  const [charge, setCharge] = useState(false);
  const [prete, setPrete] = useState(false);

  const film = FILMS[createur.ouverture.robe];
  /* L'affiche : celle du film quand il existe, sinon la photographie
   * elle-même — dans les deux cas, l'image sur laquelle on ouvre. */
  const affiche: Media | undefined = film
    ? SCENES[film.affiche]
    : vues(createur.ouverture.robe)[createur.ouverture.vue - 1];
  const dossier = film ? "scenes" : "robes";

  useEffect(() => {
    if (!film) return;
    const co = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (mouvementReduit() || co?.saveData) return;
    /* Le film ne concurrence jamais l'affichage du premier écran. */
    const t = window.setTimeout(() => setCharge(true), 400);
    return () => window.clearTimeout(t);
  }, [film]);

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

  if (!affiche) return null;

  return (
    <section className="relative h-[calc(100svh-var(--barre))] min-h-[34rem] w-full overflow-hidden bg-craie">
      <picture>
        <source type="image/avif" srcSet={jeu(affiche, "avif", affiche.widths, dossier)} sizes="100vw" />
        <source type="image/webp" srcSet={jeu(affiche, "webp", affiche.widths, dossier)} sizes="100vw" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chemin(`/${dossier}/${affiche.name}-${affiche.jpgw[affiche.jpgw.length - 1]}.jpg`)}
          srcSet={jeu(affiche, "jpg", affiche.jpgw, dossier)}
          sizes="100vw"
          width={affiche.w}
          height={affiche.h}
          alt={`Robe de mariée ${createur.nom} présentée chez MADAMOON à Paris`}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backgroundImage: `url(${affiche.blur})`, backgroundSize: "cover" }}
        />
      </picture>

      {film && charge && (
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
          <source src={chemin(film.src)} type="video/mp4" />
        </video>
      )}

      {/* Les deux voiles de l'accueil : l'un vers la gauche pour le titre,
        * l'autre en haut pour que la navigation reste lisible. */}
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

      <div className="gouttiere absolute inset-0 flex flex-col justify-center">
        <div className="w-full max-w-[53vw] min-w-[16rem] max-md:max-w-[92%]">
          <p className="legende sur-rouge">{createur.origine}</p>
          <h1 className="affiche mt-3 text-blanc">{createur.nom}</h1>
          <p className="accroche mt-6 text-blanc">{createur.note}</p>
          <AppelElise maison={createur.nom} className="bouton mt-6">
            Trouver ma robe {createur.nom}
          </AppelElise>
        </div>
      </div>

      <Bandeau />
    </section>
  );
}
