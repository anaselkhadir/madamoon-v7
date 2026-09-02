import TitreSection from "@/components/TitreSection";
import { AVIS, DISTINCTION, NOTE } from "@/lib/avis";
import { MAISON, SITE_URL } from "@/lib/madamoon";

/*
 * Ce qu'elles en disent.
 *
 * Posée avant le showroom : on lit les mariées, puis on va voir le lieu.
 *
 * Le parti pris est celui du reste du site — pas de cartes, pas d'ombres,
 * pas de guillemets décoratifs. Trois colonnes de texte séparées d'un
 * filet, le prénom et la date en petites capitales dessous. Un avis se
 * lit ; il n'a pas besoin d'être mis en scène.
 *
 * La section n'existe que s'il y a de quoi la remplir. Tant que la maison
 * n'a pas fourni ses avis, elle ne rend rien — plutôt que d'occuper un
 * écran avec du vide ou, pire, avec des phrases écrites ici.
 */

/* Les étoiles sont dessinées, pas écrites : un caractère ★ dépend de la
 * police installée et se lit « étoile noire » à voix haute, cinq fois. */
function Etoiles({ note }: { note: number }) {
  return (
    <span className="inline-flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
          <path
            d="M6 0.6 7.5 4.2 11.4 4.5 8.4 7 9.3 10.8 6 8.7 2.7 10.8 3.6 7 0.6 4.5 4.5 4.2Z"
            fill={i < note ? "var(--color-accent)" : "var(--color-fil)"}
          />
        </svg>
      ))}
    </span>
  );
}

export default function Avis() {
  if (AVIS.length === 0) return null;

  const donnees = {
    "@context": "https://schema.org",
    "@type": "BridalShop",
    name: MAISON.nom,
    url: SITE_URL,
    ...(NOTE && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: NOTE.moyenne,
        reviewCount: NOTE.nombre,
        bestRating: 5,
      },
    }),
    review: AVIS.map((a) => ({
      "@type": "Review",
      author: { "@type": "Person", name: a.prenom },
      datePublished: a.date,
      reviewBody: a.texte,
      reviewRating: { "@type": "Rating", ratingValue: a.note, bestRating: 5 },
    })),
  };

  return (
    <section aria-labelledby="avis" className="bg-craie">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <TitreSection
        id="avis"
        titre="Ce qu'elles en disent"
        {...(NOTE ? { lien: { href: NOTE.url, label: `Tous les avis ${NOTE.source}` } } : {})}
      />

      <div className="gouttiere pb-[clamp(3rem,5.5vw,5rem)]">
        {/* La note, d'abord. Elle porte sa source : un chiffre que l'on ne
          * peut pas aller vérifier ne vaut rien, et la loi demande que
          * l'origine des avis soit indiquée. */}
        {NOTE && (
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-fil pb-6">
            <p className="affiche text-[clamp(2rem,4vw,3.25rem)] leading-none text-action">
              {NOTE.moyenne.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}
            </p>
            <Etoiles note={Math.round(NOTE.moyenne)} />
            <p className="legende">
              {NOTE.nombre} avis sur {NOTE.source}
            </p>
            {DISTINCTION && <p className="texte w-full pt-2">{DISTINCTION}</p>}
          </div>
        )}

        <ul className="grid gap-x-10 gap-y-10 pt-8 md:grid-cols-3">
          {AVIS.map((a) => (
            <li key={`${a.prenom}-${a.date}`}>
              <Etoiles note={a.note} />
              <p className="sr-only">{a.note} étoiles sur 5</p>
              <blockquote className="phrase mt-4 text-encre">{a.texte}</blockquote>
              <p className="legende mt-4">
                {a.prenom} — {a.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
