"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Tuile from "@/components/Tuile";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import { ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";
import { useCoupsDeCoeur, vider } from "@/lib/coupsDeCoeur";

/*
 * La liste des coups de cœur.
 *
 * Elle ne vit que dans le navigateur : rien à afficher avant l'hydratation,
 * et surtout rien à afficher de faux. Une page qui annoncerait « aucune
 * robe » le temps d'une image, à quelqu'un qui en a choisi six, aurait
 * déjà menti. On attend donc le premier rendu du client pour trancher —
 * une fraction de seconde, et un espace réservé pour que rien ne saute.
 *
 * Les robes disparues du catalogue sont écartées en silence : un
 * identifiant gardé six mois dans un navigateur peut désigner une robe
 * que la maison ne présente plus.
 */

export default function ListeCoupsDeCoeur() {
  const liste = useCoupsDeCoeur();
  const [monte, setMonte] = useState(false);
  useEffect(() => setMonte(true), []);

  const robes = liste
    .map((slug) => ROBES.find((r) => r.slug === slug))
    .filter((r): r is (typeof ROBES)[number] => Boolean(r));

  if (!monte) {
    /* La place de la première rangée, le temps d'un souffle. */
    return <div className="gouttiere min-h-[42svh]" aria-hidden="true" />;
  }

  if (robes.length === 0) {
    return (
      <div className="gouttiere pb-[clamp(4rem,8vw,8rem)]">
        <p className="texte mesure-l">
          Vous n&apos;avez pas encore de coup de cœur. Parcourez le catalogue et touchez
          le cœur posé sur une robe : elle vous attendra ici.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/robes" className="bouton">
            Voir les robes
          </Link>
          <Link href="/morphologies" className="lien-nav souligne text-action">
            Partir de ma silhouette
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gouttiere pb-[clamp(4rem,8vw,8rem)]">
      <p className="texte mesure-l">
        {robes.length === 1
          ? "Une robe retenue."
          : `${robes.length} robes retenues.`}{" "}
        Apportez cette liste au showroom : l&apos;essayage se prépare mieux quand on
        sait par où commencer.
      </p>

      <div className="trame-tuiles mt-8 grid-cols-2 md:grid-cols-3">
        {robes.map((r, i) => {
          const media = vues(r.slug)[0];
          if (!media) return null;
          return (
            <Tuile
              key={r.slug}
              retard={(i % 3) * 70}
              href={`/robes/${r.slug}`}
              coupDeCoeur={r.slug}
              media={media}
              dossier="robes"
              alt={altRobe(r)}
              nom={r.nom}
              note={r.ligne}
              repere={r.createur}
              priorite={i < 3}
              sizes="(max-width: 768px) 50vw, 31vw"
            />
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <AppelRendezvous className="bouton">Prendre rendez-vous</AppelRendezvous>
        <button
          type="button"
          onClick={vider}
          className="lien-nav souligne text-plomb transition-colors duration-500 hover:text-encre"
        >
          Vider la liste
        </button>
      </div>

      {/* Ce que la visiteuse doit savoir, dit une fois, sans alarmer :
        * la liste n'est nulle part ailleurs que sur cet appareil. */}
      <p className="legende mt-10 text-brume">
        Cette liste est gardée dans ce navigateur. Elle ne la suit pas d&apos;un
        appareil à l&apos;autre et ne nous est pas transmise.
      </p>
    </div>
  );
}
