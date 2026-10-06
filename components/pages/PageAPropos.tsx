import Link from "@/components/Lien";
import TitreSection from "@/components/TitreSection";
import Photo from "@/components/media/Photo";
import { CREATEURS } from "@/lib/madamoon";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";
import { createurNom, createurNote, createurOrigine, faq, maison } from "@/lib/contenu";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";
import FilDAriane from "@/components/FilDAriane";

/*
 * La maison.
 *
 * MADAMOON n'est pas une maison de couture : c'est une boutique
 * parisienne qui choisit des robes chez plusieurs créateurs et les fait
 * ajuster. La page le dit en peu de mots, et montre.
 */

export default function PageAPropos({ langue }: { langue: Langue }) {
  const L = t(langue).pages.maisonPage;
  const M = maison(langue);
  const questions = faq(langue);

  /*
   * Le balisage des questions.
   *
   * Google a fermé les extraits enrichis FAQ en 2023 : ils ne s'affichent
   * plus que pour les sites publics et de santé. Le balisage reste
   * néanmoins juste, et il sert ailleurs — les moteurs qui rédigent une
   * réponse plutôt qu'une liste de liens y lisent directement la
   * question et sa réponse. C'est surtout le texte visible qui compte :
   * ces sept réponses n'existaient que dans la conversation d'Élise,
   * c'est-à-dire nulle part pour un moteur.
   */
  const donnees = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.r },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane
        langue={langue}
        rangs={[{ nom: t(langue).barre.maison, adresse: "/a-propos" }]}
      />
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
              alt={altScene(L.altScene, langue)}
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
              <h3 className="titre-section">
                <Link href={`/createurs/${c.slug}`} className="souligne hover:text-action">
                  {createurNom(c, langue)}
                </Link>
              </h3>
              <p className="legende mt-1">{createurOrigine(c, langue)}</p>
              <p className="texte mesure-l mt-3">{createurNote(c, langue)}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Les questions, en clair. L'ancienne adresse /faq/ du site
        * WordPress mène ici : elle doit trouver ses réponses. */}
      <TitreSection id="questions" titre={L.questions} />
      <div className="gouttiere">
        <ul className="grid gap-x-10 md:grid-cols-2">
          {questions.map((x) => (
            <li key={x.q} data-lever className="border-t border-fil py-6">
              <h3 className="titre-section">{x.q}</h3>
              <p className="texte mt-3">{x.r}</p>
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
