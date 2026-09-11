import Link from "@/components/Lien";
import TitreSection from "@/components/TitreSection";
import Photo from "@/components/media/Photo";
import { CREATEURS } from "@/lib/madamoon";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";
import { createurNote, createurOrigine, maison } from "@/lib/contenu";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";

/*
 * La maison.
 *
 * MADAMOON n'est pas une maison de couture : c'est une boutique
 * parisienne qui choisit des robes chez cinq créateurs et les fait
 * ajuster. La page le dit en peu de mots, et montre.
 */

export default function PageAPropos({ langue }: { langue: Langue }) {
  const L = t(langue).pages.maisonPage;
  const M = maison(langue);

  return (
    <>
      <div className="pt-[var(--entete)]">
        <TitreSection niveau={1} titre={L.titre} />
      </div>

      <div className="gouttiere">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="phrase mesure-l">{L.accroche}</p>
            {/* L'exposant est une convention française : « le 10ᵉ ». En
              * anglais l'arrondissement s'écrit en toutes lettres, et la
              * phrase se tient d'un seul tenant. */}
            <p className="texte mesure-l mt-6">
              {L.texteAvant}
              {langue === "fr" && (
                <>
                  <sup>e</sup>
                  {L.texteApres}
                </>
              )}
            </p>
            <Link href="/rendez-vous" className="bouton-trait mt-8">
              {L.prendreRendezvous}
            </Link>
          </div>
          <div className="tuile" data-voile>
            <Photo
              media={SCENES["createurs"]}
              dossier="scenes"
              alt={altScene(L.altScene)}
              sizes="(max-width: 768px) 100vw, 47vw"
            />
          </div>
        </div>
      </div>

      <TitreSection titre={L.lesCreateurs} lien={{ href: "/robes", label: L.voirLesRobes }} />
      <div className="gouttiere">
        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {CREATEURS.map((c) => (
            <li key={c.nom} data-lever>
              <div className="filet mb-4" />
              <h3 className="titre-section">{c.nom}</h3>
              <p className="legende mt-1">{createurOrigine(c, langue)}</p>
              <p className="texte mesure-l mt-3">{createurNote(c, langue)}</p>
            </li>
          ))}
        </ul>
      </div>

      <section className="gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <p className="phrase mesure-l">
            {M.adresse} — {M.codePostal} {M.ville}
          </p>
          <Link href="/rendez-vous" className="bouton">
            {L.prendreRendezvous}
          </Link>
        </div>
      </section>
    </>
  );
}
