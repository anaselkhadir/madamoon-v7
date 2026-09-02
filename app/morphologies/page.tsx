import type { Metadata } from "next";
import Link from "next/link";
import AppelElise from "@/components/AppelElise";
import TitreSection from "@/components/TitreSection";
import Rendezvous from "@/components/accueil/Rendezvous";
import { MORPHOLOGIES } from "@/lib/madamoon";

/*
 * Les six morphologies.
 *
 * Pas de photographies ici, et c'est délibéré : illustrer une morphologie
 * revient à désigner un corps comme le bon exemple d'une catégorie. On
 * s'en tient donc aux mots — la lettre, ce qu'elle décrit, ce que l'on
 * conseille — et les robes attendent sur la page de chacune.
 */

export const metadata: Metadata = {
  title: "Robe de mariée selon sa morphologie",
  description:
    "Silhouette en O, A, V, H, 8 ou X : les coupes de robe de mariée conseillées pour chaque morphologie, à essayer au showroom MADAMOON, Paris 10e.",
  alternates: { canonical: "/morphologies" },
};

export default function Morphologies() {
  return (
    <>
      <div className="pt-[var(--entete)]">
        <TitreSection
          niveau={1}
          titre="Les morphologies"
          lien={{ href: "/silhouettes", label: "Les six coupes" }}
        />
        <div className="gouttiere">
          <p className="texte mesure-l pb-10">
            Une morphologie n&apos;exclut jamais une robe : elle ouvre des pistes. Rien
            n&apos;est « à éviter » — c&apos;est un conseil de style, pas une règle, et au
            showroom on essaie aussi ce qui n&apos;était pas prévu.
          </p>

          <ul className="border-t border-fil">
            {MORPHOLOGIES.map((m) => (
              <li key={m.lettre}>
                <Link
                  href={`/morphologies/${m.lettre.toLowerCase()}`}
                  className="group grid gap-x-8 gap-y-2 border-b border-fil py-6 md:grid-cols-[5rem_1fr_auto] md:items-baseline"
                >
                  <span className="affiche text-[2.5rem] leading-none text-action">
                    {m.lettre}
                  </span>
                  <span>
                    <span className="phrase block text-encre transition-colors duration-500 group-hover:text-action">
                      {m.nom}
                    </span>
                    <span className="texte mt-1 block">{m.silhouette}</span>
                  </span>
                  <span className="legende">{m.premieres.join(", ")}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="pb-[clamp(3rem,5vw,5rem)] pt-10">
            <p className="texte mesure pb-6">
              Vous ne savez pas laquelle est la vôtre ? Élise vous guide en trois questions.
            </p>
            <AppelElise className="bouton">Trouver ma robe</AppelElise>
          </div>
        </div>
      </div>
      <Rendezvous />
    </>
  );
}
