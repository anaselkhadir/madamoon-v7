import TitreSection from "@/components/TitreSection";
import Tuile from "@/components/Tuile";
import { ROBES, FAMILLES, SITE_URL } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { vues } from "@/lib/medias";
import { altCoupe, altRobe } from "@/lib/alt";

import type { Langue } from "@/lib/langue";
import { versLangue } from "@/lib/langue";
import { t } from "@/lib/textes";
import {
  coupeNom,
  coupeNote,
  coupePluriel,
  familleTexte,
  robeLigne,
} from "@/lib/contenu";

/*
 * Le catalogue.
 *
 * La page de la seconde capture : un intitulé en capitales, puis des
 * photographies jointives portant leur nom. Les six familles d'abord,
 * puis toutes les robes, famille par famille. Aucune carte, aucun cadre,
 * aucun bouton sous les images.
 *
 * Une seule page pour les deux langues : le français et l'anglais
 * montent le même composant avec une propriété différente. Le jour où
 * la trame change, elle change des deux côtés.
 */

const liste = (langue: Langue) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: t(langue).catalogue.nom,
  url: `${SITE_URL}${versLangue("/robes", langue)}`,
  hasPart: ROBES.map((r) => ({
    "@type": "Product",
    name: `${t(langue).pied.robeDeMariee} ${r.nom}`,
    description: robeLigne(r, langue),
    url: `${SITE_URL}${versLangue(`/robes/${r.slug}`, langue)}`,
    brand: r.createur ?? "MADAMOON",
  })),
});

export default function PageRobes({ langue }: { langue: Langue }) {
  const L = t(langue);
  const LISTE = liste(langue);

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
          titre={L.catalogue.titre}
          lien={{ href: "/rendez-vous", label: L.raccourcis.prendreRendezvous }}
        />
      </div>

      <div className="gouttiere">
        <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
          {COUPES.map((s, i) => {
            const media = vues(s.robe)[s.vue - 1];
            if (!media) return null;
            return (
              <Tuile
                key={s.ancre}
                retard={(i % 3) * 70}
                href={`#${s.ancre}`}
                media={media}
                dossier="robes"
                alt={altCoupe(s.nom, langue)}
                nom={coupeNom(s, langue)}
                note={coupeNote(s, langue)}
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
            <TitreSection
              titre={L.catalogue.robesDe(coupePluriel(s.nom, langue))}
            />
            <div className="gouttiere">
              <p className="texte mesure-l -mt-1 mb-6">
                {familleTexte(s.nom, langue, FAMILLES[s.nom])}
              </p>
              <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
                {famille.map((r, i) => {
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
                      alt={altRobe(r, langue)}
                      nom={r.nom}
                      note={robeLigne(r, langue)}
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
