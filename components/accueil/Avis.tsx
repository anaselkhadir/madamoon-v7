import Link from "@/components/Lien";
import { AVIS, DISTINCTION, NOTE } from "@/lib/avis";
import { ID_MAISON } from "@/lib/schema";
import { typographie } from "@/lib/francais";

/*
 * Ce qu'elles en disent.
 *
 * La note d'abord, très grande, et deux voix seulement.
 *
 * La section a longtemps fait l'inverse : quatre paragraphes de trente-six
 * pixels sur un écran et demi, et les mesures — cinq sur cinq, deux cents
 * avis, seule boutique cinq étoiles du dixième — chuchotées en onze
 * pixels tout en bas. C'était enterrer ce que la maison a de plus rare.
 * Une note parfaite sur deux cents avis ne se glisse pas en note de bas
 * de page : elle s'affiche.
 *
 * Deux voix, pas quatre. Elles sont choisies pour dire deux choses
 * différentes — l'accueil d'un côté, la comparaison de l'autre : celle
 * qui a fait sept boutiques et revient ici. Une troisième ne dirait rien
 * de plus et ferait rallonger la page.
 *
 * Aucune carte, aucune ombre, aucune étoile dessinée, aucun guillemet
 * décoratif. Le chiffre porte la section, le filet le pose, et le reste
 * est du texte.
 *
 * Le balisage schema.org porte les huit avis et l'avis entier de
 * chacune : c'est le texte publié que l'on déclare, jamais la coupe que
 * l'on affiche.
 */

/* Les deux voix retenues. Nommées, jamais réécrites : le texte affiché
 * vient de `lib/avis.ts`, mot pour mot. */
const CHOIX = ["Gwendoline Carrier", "Julia JF"];

export default function Avis() {
  const voix = CHOIX.map((nom) => AVIS.find((a) => a.auteur === nom)).filter(
    (a): a is (typeof AVIS)[number] => Boolean(a)
  );
  if (voix.length === 0) return null;

  const moyenne = NOTE.moyenne.toLocaleString("fr-FR", { minimumFractionDigits: 1 });

  /*
   * La note et les avis se raccrochent à l'entité du gabarit par son
   * « @id », au lieu de déclarer une seconde maison. Deux nœuds de même
   * identité se fondent en un ; deux nœuds sans identité commune font
   * deux commerces, et la note n'est alors rattachée à rien.
   */
  const donnees = {
    "@context": "https://schema.org",
    "@type": "BridalShop",
    "@id": ID_MAISON,
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
    <section aria-labelledby="avis" className="gouttiere bg-ivoire py-[clamp(4rem,8vw,8rem)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <p className="legende">Ce qu&apos;elles en disent</p>

      {/* La note. Le chiffre est posé à gauche, ce qu'il vaut à droite. */}
      <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-5 md:grid-cols-[auto_1fr] md:items-start">
        {/* Le chiffre est une image de mot. Le titre porte donc sa
          * phrase en propre plutôt que de la laisser déduire de son
          * contenu : masquer le chiffre ne suffit pas — Chrome le
          * reprend quand même dans le nom, et le titre bégayait
          * « 5,0 5,0 sur 5 ». */}
        <h2
          id="avis"
          aria-label={`${moyenne} sur 5, sur ${NOTE.nombre} avis ${NOTE.source}`}
          className="md:min-w-[8rem]"
        >
          <span className="block font-serif text-[clamp(5rem,12vw,11rem)] leading-[0.78] text-encre">
            {moyenne}
          </span>
          <span aria-hidden="true" className="mt-5 block h-px w-full bg-encre" />
        </h2>

        <div className="md:pt-[clamp(0.5rem,1.5vw,1.5rem)]">
          <p className="accroche text-encre">
            Sur {NOTE.nombre} avis {NOTE.source}
          </p>
          <p className="texte mesure mt-3">{DISTINCTION}</p>
        </div>
      </div>

      {/* Deux voix, côte à côte. */}
      <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-2">
        {voix.map((a) => (
          <figure key={a.auteur}>
            <span data-ligne className="block">
              {/* « .phrase » n'est pas calquée : sa taille l'emporterait sur
                  * l'utilitaire, et la citation sortirait à trente-six pixels.
                  * On reprend donc ses composantes à la main. */}
              <blockquote className="font-serif text-[clamp(1.125rem,1.8vw,1.5rem)] leading-[1.4] text-encre">
                {typographie(a.extrait ?? a.texte)}
                {/* Les crochets disent qu'il en manque : une coupe non
                  * signalée est une citation faussée. */}
                {a.extrait && <span className="text-brume"> […]</span>}
              </blockquote>
            </span>
            <figcaption className="legende mt-4 text-brume" data-lever data-retard="200">
              {a.auteur} — {a.date}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-[clamp(2.5rem,5vw,4rem)] border-t border-fil pt-6">
        <Link href={NOTE.url} className="lien-nav souligne text-action">
          Les {NOTE.nombre} avis {NOTE.source}
        </Link>
      </p>
    </section>
  );
}
