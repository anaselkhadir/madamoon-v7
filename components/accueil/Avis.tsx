import TitreSection from "@/components/TitreSection";
import { AVIS, DISTINCTION, NOTE } from "@/lib/avis";
import { MAISON, SITE_URL } from "@/lib/madamoon";

/*
 * Ce qu'elles en disent.
 *
 * Posée avant le showroom : on lit les mariées, puis on va voir le lieu.
 *
 * Les avis défilent en boucle, comme le bandeau du hero — même mécanique,
 * même keyframe, en deux fois plus lent : il y a ici des phrases à lire
 * et non trois mots à reconnaître. Le survol suspend le défilé.
 *
 * Rien d'autre que le langage du site : pas de cartes, pas d'ombres, pas
 * de guillemets décoratifs. Le texte est à la taille du texte courant,
 * séparé par un filet. C'est la seule façon qu'un avis se lise comme une
 * parole et non comme un argument.
 */

/* Quatre copies : la piste se décale d'un quart, donc la copie suivante
 * vient prendre exactement la place de la première. */
const COPIES = 4;

/* Les étoiles sont dessinées, pas écrites : le caractère ★ dépend de la
 * police installée, et un lecteur d'écran le dirait cinq fois de suite. */
function Etoiles({ note }: { note: number }) {
  return (
    <span className="inline-flex gap-[3px]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="h-[9px] w-[9px]">
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

      <div className="gouttiere">
        <p className="legende flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-fil pb-6">
          <Etoiles note={5} />
          <span>
            {NOTE.moyenne.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} sur 5 —{" "}
            {NOTE.nombre} avis {NOTE.source}
          </span>
          <span aria-hidden="true" className="text-fil">·</span>
          <span className="text-encre">{DISTINCTION}</span>
        </p>
      </div>

      {/* Le rail. Une seule copie porte le texte pour les lecteurs d'écran
        * et les moteurs ; les trois autres ne remplissent que la piste. */}
      <div className="rail-avis py-8 pb-[clamp(3rem,5.5vw,5rem)]">
        <div className="rail-avis-piste">
          {Array.from({ length: COPIES }, (_, copie) => (
            <div key={copie} className="flex" aria-hidden={copie > 0 || undefined}>
              {AVIS.map((a) => (
                <figure key={a.auteur} className="avis-colonne">
                  <Etoiles note={a.note} />
                  <span className="sr-only">{a.note} étoiles sur 5</span>
                  <blockquote className="texte mt-3">
                    {a.extrait ?? a.texte}
                    {/* Les crochets disent qu'il en manque : une coupe non
                      * signalée est une citation faussée. */}
                    {a.extrait && <span className="text-brume"> […]</span>}
                  </blockquote>
                  <figcaption className="legende mt-4">
                    {a.auteur} — {a.date}
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
