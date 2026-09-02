import type { Metadata } from "next";
import TitreSection from "@/components/TitreSection";
import Tuile from "@/components/Tuile";
import { ROBES, FAMILLES, SITE_URL } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { vues } from "@/lib/medias";
import { altCoupe, altRobe } from "@/lib/alt";

/*
 * Le catalogue.
 *
 * La page de la seconde capture : un intitulé en capitales, puis des
 * photographies jointives portant leur nom. Les six familles d'abord,
 * puis toutes les robes, famille par famille. Aucune carte, aucun cadre,
 * aucun bouton sous les images.
 */

export const metadata: Metadata = {
  title: "Robes de mariée — 40 modèles en showroom à Paris",
  description:
    "Les robes de mariée MADAMOON : sirène, princesse, fluide, trapèze, minimaliste, deux-en-un. Quarante modèles de cinq créateurs, à essayer sur rendez-vous à Paris 10e.",
  alternates: { canonical: "/robes" },
};

const LISTE = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Robes de mariée MADAMOON",
  url: `${SITE_URL}/robes`,
  hasPart: ROBES.map((r) => ({
    "@type": "Product",
    name: `Robe de mariée ${r.nom}`,
    description: r.ligne,
    url: `${SITE_URL}/robes/${r.slug}`,
    brand: r.createur ?? "MADAMOON",
  })),
};

export default function Robes() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LISTE) }}
      />

      {/* L'en-tête de page : sous la barre, à la gouttière, rien d'autre. */}
      <div className="pt-[var(--entete)]">
        <TitreSection
          niveau={1}
          titre="Nos robes de mariée"
          lien={{ href: "/rendez-vous", label: "Prendre rendez-vous" }}
        />
      </div>

      <div className="gouttiere">
        <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
          {COUPES.map((s, i) => {
            const media = vues(s.robe)[s.vue - 1];
            const vedette = ROBES.find((r) => r.slug === s.robe);
            if (!media) return null;
            return (
              <Tuile
                key={s.ancre}
                href={`#${s.ancre}`}
                media={media}
                dossier="robes"
                alt={vedette ? altRobe(vedette, s.vue) : altCoupe(s.nom)}
                nom={s.nom}
                note={s.note}
                priorite={i < 3}
                sizes="(max-width: 768px) 50vw, 31vw"
              />
            );
          })}
        </div>
      </div>

      {/* Puis chaque famille, dans l'ordre, avec ses robes. */}
      {COUPES.map((s) => {
        const famille = ROBES.filter((r) => r.categorie === s.nom);
        if (!famille.length) return null;
        return (
          <section key={s.ancre} id={s.ancre} className="scroll-mt-[7rem]">
            <TitreSection titre={`Robes ${s.nom.toLowerCase()}`} />
            <div className="gouttiere">
              <p className="texte mesure-l -mt-1 mb-6">{FAMILLES[s.nom]}</p>
              <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
                {famille.map((r) => {
                  const media = vues(r.slug)[0];
                  if (!media) return null;
                  return (
                    <Tuile
                      key={r.slug}
                      href={`/robes/${r.slug}`}
                      media={media}
                      dossier="robes"
                      alt={altRobe(r)}
                      nom={r.nom}
                      note={r.ligne}
                      repere={r.createur}
                      sizes="(max-width: 768px) 50vw, 31vw"
                    />
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <div className="gouttiere py-[clamp(3rem,5.5vw,5rem)]" />
    </>
  );
}
