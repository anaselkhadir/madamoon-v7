import Link from "@/components/Lien";
import { AVIS, NOTE } from "@/lib/avis";
import { ID_MAISON } from "@/lib/schema";
import { typographie } from "@/lib/francais";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Ce qu'elles en disent.
 *
 * La note d'abord, très grande, puis trois voix sur trois cartes.
 *
 * La section a longtemps fait l'inverse : quatre paragraphes de trente-six
 * pixels sur un écran et demi, et les mesures — cinq sur cinq, deux cents
 * avis, seule boutique cinq étoiles du dixième — chuchotées en onze
 * pixels tout en bas. C'était enterrer ce que la maison a de plus rare.
 * Une note parfaite sur deux cents avis ne se glisse pas en note de bas
 * de page : elle s'affiche.
 *
 * Les cartes sont venues ensuite, à la demande de la maison, et ont
 * cherché leur forme en trois temps : un filet sur fond blanc, puis
 * rien du tout, puis le gris doux des morphologies et l'angle des
 * boutons. C'est cette dernière qui tient — la même carte que la
 * section des morphologies, pour que la page n'ait qu'une façon de
 * poser une carte.
 *
 * Le filet a disparu avec le fond : un gris plein se détache seul du
 * blanc de la section, et un cadre par-dessus ne ferait que l'épaissir.
 *
 * Pas de portraits. La maison n'a pas les photographies de ses
 * clientes : une initiale tient la place, et l'on n'invente pas un
 * visage.
 *
 * Le balisage schema.org porte les huit avis et l'avis entier de
 * chacune : c'est le texte publié que l'on déclare, jamais la coupe que
 * l'on affiche.
 */

/* Les trois voix retenues. Nommées, jamais réécrites : le texte affiché
 * vient de `lib/avis.ts`, mot pour mot.
 *
 * Elles disent trois choses différentes — l'essayage privé, l'accueil,
 * la comparaison avec ce qu'on a vu ailleurs. Une quatrième ne dirait
 * rien de plus. */
const CHOIX = ["Mathilde Pln", "Gwendoline Carrier", "Julia JF"];

/* Les étoiles. Dessinées, et non écrites : le caractère « ★ » n'existe
 * pas dans toutes les polices et retombe sur celle du système. */
function Etoiles({ note }: { note: number }) {
  return (
    <span aria-hidden="true" className="flex gap-[0.15em] text-action">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-[0.8rem] w-[0.8rem]"
          fill={i <= note ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        >
          <path d="M12 3.4l2.6 5.5 5.9.8-4.3 4.2 1 6-5.2-2.8-5.2 2.8 1-6-4.3-4.2 5.9-.8Z" />
        </svg>
      ))}
    </span>
  );
}

export default function Avis({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

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
    <section aria-labelledby="avis" className="gouttiere bg-blanc py-[clamp(4rem,8vw,8rem)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <p className="legende">{L.avis.legende}</p>

      {/* La note, puis ce qu'elle veut dire — l'un sous l'autre, au
        * milieu. Les deux étaient côte à côte ; la maison les veut
        * empilés et centrés. */}
      <div className="mt-[clamp(2rem,4vw,3rem)] text-center">
        {/* Le chiffre est une image de mot. Le titre porte donc sa
          * phrase en propre plutôt que de la laisser déduire de son
          * contenu : masquer le chiffre ne suffit pas — Chrome le
          * reprend quand même dans le nom, et le titre bégayait
          * « 5,0 5,0 sur 5 ». */}
        <h2 id="avis" aria-label={`${moyenne} / 5 — ${L.avis.experience}`}>
          <span className="block font-sans text-[clamp(5rem,12vw,11rem)] font-bold leading-[0.78] text-encre">
            {moyenne}
          </span>
        </h2>

        {/* La phrase de la maison, en anglaise et en rouge — la même
          * écriture que son nom sur l'accueil.
          *
          * Tout est écrit en propre : « .accroche » porte sa police et
          * sa couleur hors calque et l'emporterait sur un utilitaire.
          *
          * L'anglaise a l'œil plus petit qu'un romain de même corps, et
          * ses déliés montent et descendent loin : le corps est relevé,
          * et l'interligne tient à un et demi pour que deux lignes ne
          * s'accrochent pas l'une à l'autre.
          *
          * « balance » répartit la phrase sur ses deux lignes au lieu de
          * remplir la première : sans lui, « vivre. » restait seul en
          * bas — un mot d'orphelin sous une ligne pleine. */}
        <p
          className="mx-auto mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[52rem]"
          style={{
            fontFamily: "var(--font-anglaise)",
            fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)",
            lineHeight: 1.45,
            color: "var(--color-action)",
            textWrap: "balance",
          }}
        >
          {L.avis.experience}
        </p>
      </div>

      {/* Trois voix, sur trois cartes.
        *
        * La section n'en portait aucune : le chiffre tenait tout, et le
        * reste était du texte nu. Elles portent maintenant le gris
        * doux et l'angle des morphologies, sans cadre : le gris se
        * détache seul du blanc de la section. */}
      <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-[clamp(0.875rem,1.6vw,1.25rem)] md:grid-cols-3" data-suite>
        {voix.map((a) => (
          <figure
            key={a.auteur}
            className="relative flex flex-col overflow-hidden rounded-[4px] bg-gris p-[clamp(1.125rem,1.8vw,1.5rem)]"
          >
            {/* Le guillemet, posé dans le coin, très grand et très pâli :
              * il ponctue, il ne parle pas. En bâton — la paire de
              * virgules pleines et rondes du modèle montré, que le serif
              * ne donne pas : il en fait deux apostrophes fines.
              *
              * Hors du flux : il déborde volontairement la marge de la
              * carte, et dans le flux il aurait poussé les étoiles. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-[0.6rem] top-[0.1rem] select-none font-sans text-[6rem] font-bold leading-[0.8]"
              style={{ color: "color-mix(in srgb, var(--color-action) 15%, transparent)" }}
            >
              &rdquo;
            </span>

            <div className="relative flex items-start">
              <Etoiles note={a.note} />
            </div>

            <blockquote className="texte mt-3 flex-1">
              {typographie(a.extrait ?? a.texte)}
              {/* Les crochets disent qu'il en manque : une coupe non
                * signalée est une citation faussée. */}
              {a.extrait && <span className="text-brume"> […]</span>}
            </blockquote>

            <figcaption className="mt-5 flex items-center gap-3 border-t border-fil pt-4">
              {/* Une initiale, pas un portrait : la maison n'a pas les
                * photographies de ses clientes, et on n'en invente pas.
                *
                * La pastille est d'un gris appuyé, et non de la craie :
                * la craie et le gris des cartes se ressemblent à un
                * point près en clair, et sont le même noir en sombre —
                * la pastille y disparaissait. */}
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gris-appuye font-serif text-[1rem] leading-none text-encre"
              >
                {a.auteur.charAt(0)}
              </span>
              <span className="min-w-0">
                <span className="nom-carte block truncate">{a.auteur}</span>
                <span className="legende block" style={{ color: "var(--color-brume)" }}>
                  {a.date}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-[clamp(2.5rem,5vw,4rem)] border-t border-fil pt-6">
        <Link href={NOTE.url} className="lien-nav souligne text-action">
          {L.avis.lesAvis}
        </Link>
      </p>
    </section>
  );
}
