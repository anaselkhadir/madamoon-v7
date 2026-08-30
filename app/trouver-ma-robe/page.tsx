import type { Metadata } from "next";
import TitreSection from "@/components/TitreSection";
import Tuile from "@/components/Tuile";
import { FAMILLES } from "@/lib/madamoon";
import { SILHOUETTES } from "@/lib/silhouettes";
import { vues } from "@/lib/medias";

/*
 * Trouver ma robe — première étape.
 *
 * On part de la silhouette, parce que c'est le mot que les mariées
 * emploient en boutique. Ce sont des recommandations, jamais des
 * exclusions : aucune robe n'est « à éviter ».
 *
 * Le parcours guidé complet (morphologie, questions, sélection) viendra
 * se greffer ici — la page en est déjà la première marche.
 */

export const metadata: Metadata = {
  title: "Trouver ma robe de mariée — par silhouette",
  description:
    "Sirène, princesse, fluide, trapèze, minimaliste ou deux-en-un : partez de la silhouette qui vous ressemble et découvrez les robes de mariée MADAMOON à Paris.",
  alternates: { canonical: "/trouver-ma-robe" },
};

export default function Trouver() {
  return (
    <>
      <div className="pt-[var(--entete)]">
        <TitreSection
          niveau={1}
          titre="Trouver ma robe"
          lien={{ href: "/robes", label: "Voir toutes les robes" }}
        />
      </div>

      <div className="gouttiere">
        <p className="texte mesure-l mb-8">
          Commencez par la ligne qui vous attire. Ce sont des pistes, pas des règles :
          au showroom, beaucoup de mariées repartent avec une robe qu&apos;elles
          n&apos;auraient pas choisie sur photo.
        </p>
        <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
          {SILHOUETTES.map((s, i) => {
            const media = vues(s.robe)[s.vue - 1];
            if (!media) return null;
            return (
              <Tuile
                key={s.ancre}
                href={`/robes#${s.ancre}`}
                media={media}
                dossier="robes"
                alt={`Robe de mariée ${s.nom.toLowerCase()} — ${FAMILLES[s.nom]}`}
                nom={s.nom}
                note={FAMILLES[s.nom]}
                priorite={i < 3}
                sizes="(max-width: 768px) 50vw, 31vw"
              />
            );
          })}
        </div>
      </div>

      <div className="gouttiere py-[clamp(3rem,5.5vw,5rem)]" />
    </>
  );
}
