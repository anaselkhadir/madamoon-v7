import TitreSection from "@/components/TitreSection";
import Tuile from "@/components/Tuile";
import { COUPES } from "@/lib/coupes";
import { ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altCoupe, altRobe } from "@/lib/alt";

/*
 * « Nos modèles ».
 *
 * La transposition la plus littérale de la référence : un intitulé en
 * capitales, puis trois photographies jointives au rapport 447 / 621, le
 * nom de la famille posé dans l'image et sa ligne en dessous.
 */

const TROIS = COUPES.slice(0, 3);

export default function Modeles() {
  return (
    <section aria-labelledby="modeles">
      <TitreSection
        id="modeles"
        titre="Nos modèles"
        lien={{ href: "/robes", label: "Voir toutes les robes" }}
      />
      <div className="gouttiere">
        <div className="trame-tuiles md:grid-cols-3">
          {TROIS.map((s) => {
            const media = vues(s.robe)[s.vue - 1];
            const vedette = ROBES.find((r) => r.slug === s.robe);
            if (!media) return null;
            return (
              <Tuile
                key={s.ancre}
                href={`/coupes/${s.ancre}`}
                media={media}
                dossier="robes"
                alt={vedette ? altRobe(vedette, s.vue) : altCoupe(s.nom)}
                nom={s.nom}
                note={s.note}
                sizes="(max-width: 768px) 100vw, 31vw"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
