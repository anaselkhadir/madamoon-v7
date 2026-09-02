import TitreSection from "@/components/TitreSection";
import Tuile from "@/components/Tuile";
import { SCENES } from "@/lib/medias";

/*
 * La première décision.
 *
 * Deux images, deux chemins : se laisser guider par la silhouette, ou
 * regarder toutes les robes. Le même langage que les modèles — l'image
 * porte le texte, rien n'est encadré.
 */

export default function Choix() {
  return (
    <section aria-labelledby="commencer">
      <TitreSection id="commencer" titre="Par où commencer" />
      <div className="gouttiere">
        <div className="trame-tuiles md:grid-cols-2">
          <Tuile
            href="/trouver-ma-robe"
            appelle={null}
            media={SCENES["choix-guidee"]}
            dossier="scenes"
            alt="Robe de mariée fluide portée dans la lumière du showroom"
            nom="Trouver ma robe"
            note="Nous partons de votre silhouette."
            repere="01"
            ratio="4 / 5"
            sizes="(max-width: 768px) 100vw, 47vw"
            priorite
          />
          <Tuile
            href="/robes"
            media={SCENES["choix-libre"]}
            dossier="scenes"
            alt="Robe de mariée en dentelle, vue de dos, dans l'escalier du showroom"
            nom="Voir toutes les robes"
            note="Quarante modèles, six silhouettes."
            repere="02"
            ratio="4 / 5"
            sizes="(max-width: 768px) 100vw, 47vw"
          />
        </div>
      </div>
    </section>
  );
}
