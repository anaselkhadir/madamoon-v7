import type { Metadata } from "next";
import Link from "next/link";
import TitreSection from "@/components/TitreSection";
import Photo from "@/components/media/Photo";
import { MAISON, CREATEURS } from "@/lib/madamoon";
import { SCENES } from "@/lib/medias";

/*
 * La maison.
 *
 * MADAMOON n'est pas une maison de couture : c'est une boutique
 * parisienne qui choisit des robes chez cinq créateurs et les fait
 * ajuster. La page le dit en peu de mots, et montre.
 */

export const metadata: Metadata = {
  title: "La maison — boutique de robes de mariée à Paris",
  description:
    "MADAMOON, boutique de robes de mariée à Paris 10e : cinq créateurs sélectionnés, essayage privé sur rendez-vous et confection sur mesure à partir de 1 500 €.",
  alternates: { canonical: "/a-propos" },
};

export default function AProps() {
  return (
    <>
      <div className="pt-[var(--entete)]">
        <TitreSection niveau={1} titre="La maison" />
      </div>

      <div className="gouttiere">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="phrase mesure-l">
              Une boutique parisienne, cinq créateurs, et le temps qu&apos;il faut pour
              choisir.
            </p>
            <p className="texte mesure-l mt-6">
              MADAMOON n&apos;édite pas ses propres collections : la maison choisit, robe
              par robe, chez cinq créateurs — puis fait confectionner et ajuster la
              vôtre à l&apos;atelier. Le showroom du 10<sup>e</sup> se privatise le temps
              d&apos;un essayage.
            </p>
            <Link href="/rendez-vous" className="bouton-trait mt-8">
              Prendre rendez-vous
            </Link>
          </div>
          <div className="tuile" data-voile>
            <Photo
              media={SCENES["createurs"]}
              dossier="scenes"
              alt="Robe de mariée présentée au showroom MADAMOON"
              sizes="(max-width: 768px) 100vw, 47vw"
            />
          </div>
        </div>
      </div>

      <TitreSection titre="Les créateurs" lien={{ href: "/robes", label: "Voir les robes" }} />
      <div className="gouttiere">
        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {CREATEURS.map((c) => (
            <li key={c.nom} data-lever>
              <div className="filet mb-4" />
              <h3 className="titre-section">{c.nom}</h3>
              <p className="legende mt-1">{c.origine}</p>
              <p className="texte mesure-l mt-3">{c.note}</p>
            </li>
          ))}
        </ul>
      </div>

      <section className="gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <p className="phrase mesure-l">
            {MAISON.adresse} — {MAISON.codePostal} {MAISON.ville}
          </p>
          <Link href="/rendez-vous" className="bouton">
            Prendre rendez-vous
          </Link>
        </div>
      </section>
    </>
  );
}
