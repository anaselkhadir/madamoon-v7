import type { Metadata } from "next";
import Link from "next/link";
import AppelElise from "@/components/AppelElise";
import TitreSection from "@/components/TitreSection";
import Rendezvous from "@/components/accueil/Rendezvous";
import { MAISON } from "@/lib/madamoon";

/*
 * Trouver ma robe — le carrefour.
 *
 * Cette page montrait les six coupes en tuiles. Depuis que
 * /coupes existe, c'était deux fois la même page à deux adresses :
 * mauvais pour la lecture, et deux pages qui se disputent le même mot
 * chez les moteurs.
 *
 * Elle garde son adresse — des liens pointent dessus — mais change de
 * métier : elle dit les trois portes d'entrée du catalogue, et laisse
 * chacune à sa page.
 */

export const metadata: Metadata = {
  title: "Trouver ma robe de mariée",
  description:
    "Trois façons de commencer : par la coupe, par votre morphologie, ou en conversation avec Élise. Robes de mariée MADAMOON, showroom Paris 10e.",
  alternates: { canonical: "/trouver-ma-robe" },
};

const PORTES = [
  {
    href: "/coupes",
    titre: "Par la coupe",
    texte:
      "Sirène, princesse, fluide, trapèze, minimaliste, deux-en-un. Le mot que les mariées emploient en boutique, et le tri qui fait gagner une heure d'essayage.",
  },
  {
    href: "/morphologies",
    titre: "Par la morphologie",
    texte:
      "En O, A, V, H, 8 ou X. Non pour exclure des robes — rien n'est « à éviter » — mais pour savoir lesquelles proposer en premier.",
  },
  {
    href: "/createurs/watters-designs",
    titre: "Par la maison",
    texte:
      "Cinq créateurs, chacun avec sa main : les dentelles de Watters, le mikado de Casablanca, le drapé d'Olya Mak.",
  },
];

export default function Trouver() {
  return (
    <>
      <div className="pt-[var(--entete)]">
        <TitreSection
          niveau={1}
          titre="Trouver ma robe"
          lien={{ href: "/robes", label: "Voir toutes les robes" }}
        />
        <div className="gouttiere">
          <p className="texte mesure-l pb-10">
            Trois portes, et aucune n&apos;est la bonne. Ce sont des pistes, pas des
            règles : au showroom, beaucoup de mariées repartent avec une robe
            qu&apos;elles n&apos;auraient pas choisie sur photo.
          </p>

          <ul className="border-t border-fil">
            {PORTES.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group grid gap-x-10 gap-y-2 border-b border-fil py-6 md:grid-cols-[16rem_1fr] md:items-baseline"
                >
                  <span className="phrase text-encre transition-colors duration-500 group-hover:text-action">
                    {p.titre}
                  </span>
                  <span className="texte mesure-l">{p.texte}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="pb-[clamp(3rem,5vw,5rem)] pt-10">
            <p className="texte mesure pb-6">
              Ou laissez-vous guider : Élise part de votre silhouette, en trois questions,
              et vous dit franchement si la réponse est chez une autre maison. Elle donne
              aussi l&apos;adresse et les horaires — {MAISON.adresse}, sur rendez-vous.
            </p>
            <AppelElise className="bouton">Trouver ma robe</AppelElise>
          </div>
        </div>
      </div>
      <Rendezvous />
    </>
  );
}
