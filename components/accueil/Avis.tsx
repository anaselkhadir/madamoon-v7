import TitreSection from "@/components/TitreSection";
import { AVIS, DISTINCTION, NOTE } from "@/lib/avis";
import { MAISON, SITE_URL } from "@/lib/madamoon";

/*
 * Ce qu'elles en disent.
 *
 * Posée avant le showroom : on lit les mariées, puis on va voir le lieu.
 *
 * Rien de plus que le reste du site — pas de cartes, pas d'ombres, pas de
 * guillemets décoratifs, pas d'étoiles dessinées en gros. Le texte est à
 * la taille du texte courant ; c'est la seule façon qu'il se lise comme
 * une parole et non comme un argument.
 *
 * La note tient sur une ligne, avec sa source et son lien. Un chiffre que
 * la visiteuse ne peut pas aller vérifier ne vaut rien, et l'article
 * L111-7-2 du code de la consommation demande que l'origine des avis soit
 * indiquée.
 */

export default function Avis() {
  if (AVIS.length === 0) return null;

  const donnees = {
    "@context": "https://schema.org",
    "@type": "BridalShop",
    name: MAISON.nom,
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: NOTE.moyenne,
      reviewCount: NOTE.nombre,
      bestRating: 5,
    },
    /* Le balisage porte l'avis entier, pas la coupe affichée. */
    review: AVIS.map((a) => ({
      "@type": "Review",
      author: { "@type": "Person", name: a.auteur },
      reviewBody: a.texte,
      reviewRating: { "@type": "Rating", ratingValue: a.note, bestRating: 5 },
    })),
  };

  return (
    <section aria-labelledby="avis">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <TitreSection
        id="avis"
        titre="Ce qu'elles en disent"
        lien={{ href: NOTE.url, label: `Les ${NOTE.nombre} avis ${NOTE.source}` }}
      />

      <div className="gouttiere pb-[clamp(3rem,5.5vw,5rem)]">
        <p className="legende border-b border-fil pb-6">
          {NOTE.moyenne.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} sur 5 —{" "}
          {NOTE.nombre} avis {NOTE.source}
          {DISTINCTION && <span className="text-encre"> · {DISTINCTION}</span>}
        </p>

        <ul className="grid gap-x-10 gap-y-9 pt-8 md:grid-cols-3">
          {AVIS.map((a) => (
            <li key={a.auteur}>
              <blockquote className="texte">
                {a.extrait ?? a.texte}
                {/* Les crochets disent qu'il en manque : une coupe non
                  * signalée est une citation faussée. */}
                {a.extrait && <span className="text-brume"> […]</span>}
              </blockquote>
              <p className="legende mt-4">
                {a.auteur} — {a.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
