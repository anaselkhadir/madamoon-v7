import type { Metadata } from "next";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import Rendezvous from "@/components/accueil/Rendezvous";
import { FAMILLES, ROBES } from "@/lib/madamoon";
import { SILHOUETTES } from "@/lib/silhouettes";
import { vues } from "@/lib/medias";

/*
 * Les six silhouettes.
 *
 * Une page de passage, pas une destination : elle existe pour que
 * « Silhouettes » dans la barre mène quelque part, et pour que les six
 * coupes soient atteignables autrement qu'en devinant leur adresse.
 *
 * Une tuile par coupe, le nombre de modèles sous le nom. Rien de plus :
 * ce qu'il y a à dire est dit sur la page de chacune.
 */

export const metadata: Metadata = {
  title: "Les six silhouettes de robe de mariée",
  description:
    "Sirène, princesse, fluide, trapèze, minimaliste, deux-en-un : les six coupes du showroom MADAMOON, Paris 10e. Essayage privé sur rendez-vous.",
  alternates: { canonical: "/silhouettes" },
};

export default function Silhouettes() {
  return (
    <>
      <div className="pt-[var(--entete)]">
        <TitreSection niveau={1} titre="Les silhouettes" />
        <div className="gouttiere">
          <p className="texte mesure-l pb-8">
            Six coupes, quarante robes. La silhouette n&apos;est pas une règle : c&apos;est le
            premier tri, celui qui fait gagner une heure d&apos;essayage.
          </p>
          <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
            {SILHOUETTES.map((s, i) => {
              const media = vues(s.robe)[s.vue - 1];
              const nombre = ROBES.filter((r) => r.categorie === s.nom).length;
              if (!media) return null;
              return (
                <Tuile
                  key={s.ancre}
                  href={`/silhouettes/${s.ancre}`}
                  media={media}
                  dossier="robes"
                  alt={`Robe de mariée ${s.nom.toLowerCase()} — ${FAMILLES[s.nom]}`}
                  nom={s.nom}
                  note={`${nombre} modèles — ${s.note.toLowerCase()}`}
                  sizes="(max-width: 768px) 50vw, 31vw"
                  priorite={i < 3}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Rendezvous />
    </>
  );
}
