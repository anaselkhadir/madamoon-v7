import TitreSection from "@/components/TitreSection";
import Tuile from "@/components/Tuile";
import { SILHOUETTES } from "@/lib/silhouettes";
import { vues } from "@/lib/medias";

/*
 * « Nos modèles ».
 *
 * La transposition la plus littérale de la référence : un intitulé en
 * capitales, puis trois photographies jointives au rapport 447 / 621, le
 * nom de la famille posé dans l'image et sa ligne en dessous.
 *
 * C'est elle qui remonte sur le hero : pas de fond à elle, un z-10 sans
 * lequel elle passerait dessous, et l'intitulé en blanc puisqu'il se lit
 * désormais sur l'image floutée.
 */

const TROIS = SILHOUETTES.slice(0, 3);

export default function Modeles() {
  return (
    <section aria-labelledby="modeles" className="relative z-10 pb-[clamp(3rem,5vw,5rem)]">
      <TitreSection
        id="modeles"
        titre="Nos modèles"
        lien={{ href: "/robes", label: "Voir toutes les robes" }}
        className="sur-image"
      />
      <div className="gouttiere">
        <div className="trame-tuiles md:grid-cols-3">
          {TROIS.map((s) => {
            const media = vues(s.robe)[s.vue - 1];
            if (!media) return null;
            return (
              <Tuile
                key={s.ancre}
                href={`/robes#${s.ancre}`}
                media={media}
                dossier="robes"
                alt={`Robe de mariée ${s.nom.toLowerCase()} — modèle présenté chez MADAMOON à Paris`}
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
