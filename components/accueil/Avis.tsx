import Link from "next/link";
import { AVIS, DISTINCTION, NOTE } from "@/lib/avis";
import { MAISON, SITE_URL } from "@/lib/madamoon";

/*
 * Ce qu'elles en disent.
 *
 * Le moment de respiration de la page. Après les robes et les maisons,
 * quatre voix — et rien d'autre à regarder.
 *
 * Quatre paroles, pas huit : ce sont des phrases à lire, et une page qui
 * en aligne huit n'en fait plus lire aucune. Elles sont choisies pour
 * former un chemin — le conseil, l'écoute, la recherche, le lieu — et la
 * dernière ouvre sur le showroom qui suit.
 *
 * Aucun défilé automatique, aucune carte, aucune ombre, aucun guillemet
 * décoratif. Chaque parole monte de derrière un masque à son tour, à la
 * taille d'un titre, et son autrice se lit en petit dessous. Les mesures
 * — la note, le nombre d'avis, la distinction — sont vraies mais tenues
 * à la fin, en petites capitales : ce sont des voix qui convainquent,
 * pas une moyenne.
 *
 * Les alignements alternent d'une parole à l'autre. C'est ce qui empêche
 * la suite de redevenir une liste.
 *
 * Le balisage schema.org porte les huit avis et l'avis entier de
 * chacune : c'est le texte publié que l'on déclare, jamais la coupe que
 * l'on affiche.
 */

/* Les quatre voix retenues, dans l'ordre du récit. Nommées, jamais
 * réécrites : le texte affiché vient de `lib/avis.ts`, mot pour mot. */
const CHOIX = ["Lolo makiadi", "Gwendoline Carrier", "Julia JF", "Charline Ferry"];

export default function Avis() {
  const voix = CHOIX.map((nom) => AVIS.find((a) => a.auteur === nom)).filter(
    (a): a is (typeof AVIS)[number] => Boolean(a)
  );
  if (voix.length === 0) return null;

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
    review: AVIS.map((a) => ({
      "@type": "Review",
      author: { "@type": "Person", name: a.auteur },
      reviewBody: a.texte,
      reviewRating: { "@type": "Rating", ratingValue: a.note, bestRating: 5 },
    })),
  };

  return (
    <section
      aria-labelledby="avis"
      className="gouttiere bg-ivoire py-[clamp(5rem,10vw,10rem)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <p className="legende">Ce qu&apos;elles en disent</p>
      <span data-ligne className="mt-4 block">
        <h2 id="avis" className="phrase mesure-l">
          Elles sont venues chercher une robe.
        </h2>
      </span>

      <div className="mt-[clamp(3.5rem,8vw,7rem)] flex flex-col gap-[clamp(3.5rem,8vw,7rem)]">
        {voix.map((a, i) => (
          <figure
            key={a.auteur}
            /* Une parole sur deux se décale vers la droite. Le décalage
              * suffit à rompre la pile ; l'alignement, lui, reste à
              * gauche d'un bout à l'autre — une citation cadrée à droite
              * se lit moins bien, et le procédé se voit. */
            className={i % 2 === 1 ? "md:ml-auto md:w-[76%]" : "md:w-[76%]"}
          >
            <span data-ligne className="block">
              <blockquote className="phrase text-[clamp(1.25rem,2.15vw,1.875rem)] leading-[1.35]">
                {a.extrait ?? a.texte}
                {/* Les crochets disent qu'il en manque : une coupe non
                  * signalée est une citation faussée. */}
                {a.extrait && <span className="text-brume"> […]</span>}
              </blockquote>
            </span>
            <figcaption className="legende mt-5 text-brume" data-lever data-retard="220">
              {a.auteur} — {a.date}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Les mesures, tenues à la fin et en petit. */}
      <p className="legende mt-[clamp(3.5rem,7vw,6rem)] flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-fil pt-6 text-brume">
        <span className="text-encre">
          {NOTE.moyenne.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} sur 5
        </span>
        <span aria-hidden="true">·</span>
        <span>{DISTINCTION}</span>
        <span aria-hidden="true">·</span>
        <Link href={NOTE.url} className="souligne">
          Les {NOTE.nombre} avis {NOTE.source}
        </Link>
      </p>
    </section>
  );
}
