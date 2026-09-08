import type { Metadata } from "next";
import { Suspense } from "react";
import Photo from "@/components/media/Photo";
import RobeChoisie from "@/components/parcours/RobeChoisie";
import CalendrierRobe from "@/components/parcours/CalendrierRobe";
import { MAISON, SIGNATURES } from "@/lib/madamoon";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";

/*
 * Le rendez-vous.
 *
 * Une photographie sur toute la hauteur à gauche, l'essentiel à droite,
 * puis le calendrier en pleine largeur. La robe repérée pendant la visite
 * est reprise ici : c'est elle qui sera préparée.
 *
 * La réservation se fait sur place et non plus ailleurs. C'est le
 * formulaire de la maison — le même compte Calendly que madamoon.fr, qui
 * n'est pas touché — posé dans la page au lieu d'y renvoyer. Une
 * réservation qui quitte le site en perd une partie en chemin.
 */

export const metadata: Metadata = {
  title: "Prendre rendez-vous — essayage privé à Paris",
  description:
    "Réservez votre essayage privé de robe de mariée au showroom MADAMOON, 234 rue du Faubourg Saint-Martin, Paris 10e. Une heure, le showroom pour vous seule.",
  alternates: { canonical: "/rendez-vous" },
};

export default function RendezVous() {
  return (
    <>
    <section className="grid md:grid-cols-2">
      <div className="relative min-h-[42svh] overflow-hidden md:min-h-svh">
        <Photo
          media={SCENES["seuil"]}
          dossier="scenes"
          alt={altScene("L'entrée du showroom")}
          sizes="(max-width: 768px) 100vw, 50vw"
          priorite
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="gouttiere flex flex-col justify-center py-[clamp(3rem,6vw,6rem)] md:pt-[var(--entete)]">
        <p className="legende">Essayage privé, sur rendez-vous</p>
        <h1 className="affiche mt-4 text-encre">Prendre rendez-vous</h1>

        <Suspense fallback={null}>
          <RobeChoisie />
        </Suspense>

        <ul className="mt-8 flex flex-col gap-4">
          {SIGNATURES.map((s) => (
            <li key={s.titre} className="flex gap-4">
              <span aria-hidden="true" className="mt-[0.6rem] h-px w-6 shrink-0 bg-fil" />
              <span>
                <span className="legende block text-encre">{s.titre}</span>
                <span className="texte">{s.texte}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          {/* Le bouton ne quitte plus le site : il descend au calendrier,
            * quelques centimètres plus bas. */}
          <a href="#calendrier" className="bouton">
            Choisir un créneau
          </a>
          <a href={MAISON.telephoneHref} className="lien-nav souligne text-encre">
            {MAISON.telephone}
          </a>
        </div>

        <div className="filet my-10" />

        <dl className="grid grid-cols-2 gap-6">
          <div>
            <dt className="legende">Le showroom</dt>
            <dd className="texte mt-1">
              {MAISON.adresse}
              <br />
              {MAISON.codePostal} {MAISON.ville}
            </dd>
          </div>
          <div>
            <dt className="legende">Horaires</dt>
            <dd className="texte mt-1">
              {MAISON.horaires.map((h) => (
                <span key={h.jour} className="block">
                  {h.jour} — {h.heures}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    {/* ————————————————————————————— le calendrier ————— */}
    <section
      id="calendrier"
      aria-labelledby="titre-calendrier"
      className="gouttiere scroll-mt-[calc(var(--barre)+var(--entete))] pb-[clamp(3rem,6vw,6rem)] pt-[clamp(2rem,4vw,4rem)]"
    >
      <h2 id="titre-calendrier" className="legende">
        Choisir un créneau
      </h2>
      <p className="texte mesure-l mt-3">
        Une heure, au showroom. L&apos;essayage est gratuit pour la mariée et deux
        accompagnants.
      </p>
      <div className="mt-8">
        <Suspense fallback={null}>
          <CalendrierRobe />
        </Suspense>
      </div>
    </section>
    </>
  );
}
