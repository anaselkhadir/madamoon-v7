import Photo from "@/components/media/Photo";
import AppelElise from "@/components/AppelElise";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import FilDAriane from "@/components/FilDAriane";
import { SCENES } from "@/lib/medias";
import { FICHE_GOOGLE } from "@/lib/schema";
import { faq, maison } from "@/lib/contenu";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";

/*
 * Les questions fréquentes.
 *
 * Elles n'existaient que dans la conversation d'Élise — c'est-à-dire
 * nulle part pour un moteur, et nulle part non plus pour qui préfère
 * lire. Elles ont désormais leur page, et l'ancienne adresse du site
 * WordPress, /faq/, y mène directement au lieu d'être renvoyée ailleurs.
 *
 * Les textes viennent de « faq(langue) », la table unique que servent
 * aussi Élise et le balisage : une réponse ne se recopie pas. Ce fichier
 * n'apporte que la mise en page.
 *
 * Et la mise en page change à chaque question, parce que les réponses ne
 * se ressemblent pas. Un délai se montre sur une frise ; un déroulé
 * d'essayage demande une photographie ; une confection est une suite de
 * quatre temps, et donc numérotée ; un paiement se fait en deux fois, et
 * se pose en deux colonnes ; un prix est un nombre, et mérite d'être
 * grand ; une mariée qui demande si elle peut venir accompagnée attend
 * une phrase, pas un paragraphe ; une adresse veut des horaires alignés.
 * Sept réponses, sept formes — et le lecteur ne décroche pas.
 */

/* Les ancres, dans l'ordre de la table. Elles survivent à une
 * reformulation de la question, ce qu'un numéro ne ferait pas. */
const ANCRES = [
  "delai",
  "essayage",
  "etapes",
  "paiement",
  "prix",
  "accompagnee",
  "showroom",
];

/*
 * Les phrases d'une réponse.
 *
 * Deux mises en page découpent la réponse qu'elles reçoivent : les
 * quatre temps du sur-mesure, et les deux versements. Le découpage est
 * typographique — un point suivi d'une espace — et il tient parce que
 * ces réponses n'ont ni abréviation ni décimale. Chaque appel vérifie
 * tout de même qu'il a trouvé le compte attendu, et retombe sur le
 * paragraphe entier sinon : une réponse réécrite doit s'afficher mal
 * plutôt que de disparaître.
 */
const phrases = (texte: string) => texte.split(/(?<=\.)\s+/).filter(Boolean);

export default function PageFaq({ langue }: { langue: Langue }) {
  const T = t(langue);
  const L = T.pages.faq;
  const M = maison(langue);
  const questions = faq(langue);

  /*
   * Le balisage des questions.
   *
   * Google a fermé les extraits enrichis FAQ en 2023 : ils ne
   * s'affichent plus que pour les sites publics et de santé. Le balisage
   * reste néanmoins juste, et il sert ailleurs — les moteurs qui
   * rédigent une réponse plutôt qu'une liste de liens y lisent
   * directement la question et la réponse de la maison, au lieu de les
   * deviner.
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

  const ancre = (i: number) => ANCRES[i] ?? `question-${i + 1}`;

  /* Les quatre temps du sur-mesure. La troisième et la quatrième phrase
   * n'en font qu'un : « s'il y a besoin d'ajustement » et « un
   * rendez-vous retouches est prévu » sont le même moment. */
  const dites = phrases(questions[2]?.r ?? "");
  const etapes =
    dites.length === 5
      ? [dites[0], dites[1], `${dites[2]} ${dites[3]}`, dites[4]]
      : null;

  /* Les deux versements. */
  const versements = (() => {
    const p = phrases(questions[3]?.r ?? "");
    return p.length === 2 ? p : null;
  })();

  /* Une question au titre du document, avec son ancre. Les sept sections
   * la posent de la même façon : c'est le seul endroit où elles se
   * ressemblent, et c'est voulu — un moteur comme une lectrice doivent
   * retrouver la question au même rang partout. */
  const Question = ({
    i,
    className = "titre-section",
    style,
  }: {
    i: number;
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <h2 id={ancre(i)} className={`scroll-mt-[calc(var(--entete)+1.5rem)] ${className}`} style={style}>
      {questions[i]?.q}
    </h2>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane langue={langue} rangs={[{ nom: L.titre, adresse: "/faq" }]} />

      {/* ————————————————————————————————————— l'ouverture —————
       * Pas de photographie plein cadre : la page est faite pour être
       * lue, et le showroom a déjà la sienne. Le titre, une phrase, et
       * tout de suite le sommaire — c'est ce qu'une visiteuse pressée
       * vient chercher. */}
      <header className="gouttiere pb-[clamp(2rem,4vw,3.5rem)] pt-[calc(var(--entete)+clamp(2.5rem,5.5vw,5rem))]">
        <h1 className="affiche">{L.titre}</h1>
        <p className="phrase est-moyenne mesure-l mt-6">{L.accroche}</p>
      </header>

      <nav aria-label={L.sommaire} className="gouttiere pb-[clamp(2.5rem,5vw,4.5rem)]">
        <h2 className="legende">{L.sommaire}</h2>
        {/* Numéroté parce que le rang est une information vraie : la
          * lectrice sait combien il en reste, et peut dire « la trois ».
          * Les sections, elles, ne portent aucun numéro — elles ne
          * forment pas une marche à suivre. */}
        <ol className="mt-4 grid gap-x-[clamp(1.5rem,4vw,4rem)] md:grid-cols-2">
          {questions.map((x, i) => (
            <li key={x.q} className="border-t border-fil">
              <a
                href={`#${ancre(i)}`}
                className="texte flex items-baseline gap-4 py-3 transition-colors duration-300 hover:text-action"
              >
                <span className="legende shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="lien-texte">{x.q}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ———————————————————————————————— 1. le délai —————
       * Huit à neuf mois, c'est une durée : elle se montre. La frise
       * compte neuf crans, un par mois, et le dernier — le jour du
       * mariage — est le seul trait rouge de la page. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 md:grid-cols-2 md:items-center">
          <div data-lever>
            <Question i={0} />
            <p className="texte mesure mt-5">{questions[0]?.r}</p>
          </div>

          <figure data-lever data-retard={120} className="m-0">
            <div className="flex items-baseline gap-4">
              <span className="affiche leading-none">{L.delaiChiffre}</span>
              <span className="phrase">{L.delaiUnite}</span>
            </div>

            <div aria-hidden="true" className="mt-6">
              <div className="flex items-end justify-between">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span
                    key={i}
                    className="block w-px"
                    style={{
                      height: i === 8 ? "2.5rem" : i === 0 ? "1.5rem" : "0.6rem",
                      background: i === 8 ? "var(--color-action)" : "var(--color-fil)",
                    }}
                  />
                ))}
              </div>
              <div className="filet" />
            </div>

            <figcaption className="mt-3 flex items-baseline justify-between gap-4">
              <span className="legende">{L.delaiDebut}</span>
              <span className="legende" style={{ color: "var(--color-action)" }}>
                {L.delaiFin}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ———————————————————————————— 2. l'essayage —————
       * La seule photographie de la page, et elle file jusqu'au bord :
       * on ne raconte pas une heure de showroom privatisé sans le
       * montrer. */}
      <section style={{ background: "var(--color-craie)" }}>
        <div className="grid md:grid-cols-2">
          <div
            data-voile
            className="relative min-h-[44svh] overflow-hidden md:min-h-[30rem]"
          >
            <Photo
              media={SCENES["showroom"]}
              dossier="scenes"
              alt={L.altEssayage}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div
            data-lever
            className="gouttiere flex flex-col justify-center py-[clamp(2.5rem,5vw,4.5rem)]"
          >
            <Question i={1} />
            <p className="texte mesure mt-5">{questions[1]?.r}</p>
          </div>
        </div>
      </section>

      {/* ———————————————————————————————— 3. les étapes —————
       * Ici, et ici seulement, les numéros disent quelque chose de vrai :
       * on ne prend pas les mensurations avant d'avoir choisi la robe. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <Question i={2} />
        {etapes ? (
          <>
            <p className="legende mt-4">{L.lesEtapes}</p>
            <ol className="mt-8 grid gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-8 md:grid-cols-4">
              {etapes.map((texte, i) => (
                <li
                  key={texte}
                  data-lever
                  data-retard={i * 90}
                  className="border-t pt-4"
                  style={{ borderColor: "var(--color-encre)" }}
                >
                  <span className="nom-image block tabular-nums">{i + 1}</span>
                  <p className="texte mt-2">{texte}</p>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className="texte mesure-l mt-5">{questions[2]?.r}</p>
        )}
      </section>

      {/* ———————————————————————————————— 4. le paiement —————
       * Deux versements, deux colonnes séparées d'un filet. La réponse
       * tient en deux phrases : elles passent en serif, comme deux
       * engagements et non comme un paragraphe de conditions. */}
      <section className="gouttiere py-[clamp(1rem,2vw,2rem)]">
        <div
          className="rounded-[4px] p-[clamp(1.5rem,3.5vw,3rem)]"
          style={{ background: "var(--color-craie)" }}
        >
          <Question i={3} />
          {versements ? (
            <div className="mt-8 grid gap-y-8 md:grid-cols-2">
              {versements.map((texte, i) => (
                <div
                  key={texte}
                  data-lever
                  data-retard={i * 120}
                  className={
                    i === 1
                      ? "md:border-l md:border-fil md:pl-[clamp(1.5rem,4vw,4rem)]"
                      : "md:pr-[clamp(1.5rem,4vw,4rem)]"
                  }
                >
                  <span className="legende">{i === 0 ? L.acompte : L.solde}</span>
                  <p className="phrase est-moyenne mt-3">{texte}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="texte mesure-l mt-5">{questions[3]?.r}</p>
          )}
        </div>
      </section>

      {/* ———————————————————————————————————— 5. le prix —————
       * Le seul bloc sombre de la page, et le seul très grand nombre.
       * Une mariée cherche ce chiffre avant tout le reste : autant le
       * lui donner d'un seul regard, plutôt que noyé dans une phrase.
       *
       * Les couleurs sont écrites en style et non en utilitaires :
       * « .texte », « .legende » et « .titre-section » posent chacune la
       * leur, et ne sont pas calquées — elles l'emporteraient. Les
       * jetons, eux, s'inversent avec le thème : le bloc reste contrasté
       * en sombre, où il devient clair sur une page sombre. */}
      <section
        className="gouttiere mt-[clamp(1.5rem,3vw,3rem)] py-[clamp(3rem,6vw,6rem)]"
        style={{ background: "var(--color-encre)" }}
      >
        <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-8 md:grid-cols-[auto_1fr] md:items-start">
          <div data-lever>
            {/* « sable » et non « brume » : sur le bloc inversé, brume ne
              * donnait que quatre de contraste du côté sombre, où le fond
              * devient clair. Le repère reste discret par sa taille. */}
            <span className="legende block" style={{ color: "var(--color-sable)" }}>
              {L.aPartirDe}
            </span>
            <p
              className="affiche mt-2 leading-none"
              style={{ color: "var(--color-ivoire)" }}
            >
              {M.prixDepart}
            </p>
          </div>
          <div data-lever data-retard={120}>
            <Question i={4} style={{ color: "var(--color-ivoire)" }} />
            <p className="texte mesure-l mt-4" style={{ color: "var(--color-sable)" }}>
              {questions[4]?.r}
            </p>
            <AppelRendezvous className="bouton mt-7">{L.prendreRendezvous}</AppelRendezvous>
          </div>
        </div>
      </section>

      {/* ———————————————————————— 6. venir accompagnée —————
       * La réponse la plus courte de la table, et la plus chaleureuse.
       * La hiérarchie s'inverse : la question passe en petit, la réponse
       * devient la phrase. C'est la respiration de la page. */}
      <section className="gouttiere py-[clamp(3.5rem,7vw,7rem)]">
        <div className="mx-auto max-w-[46ch] text-center" data-lever>
          <Question i={5} className="legende" />
          <p className="phrase mt-5" style={{ textWrap: "balance" }}>
            {questions[5]?.r}
          </p>
        </div>
      </section>

      {/* ———————————————————————————————— 7. le showroom —————
       * Une adresse et des horaires ne se lisent pas dans un paragraphe :
       * ils s'alignent. Les heures prennent des chiffres de largeur
       * égale, pour que les deux lignes se superposent. */}
      <section
        className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]"
        style={{ background: "var(--color-sable)" }}
      >
        <Question i={6} />
        <div className="mt-8 grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 md:grid-cols-2">
          <div data-lever>
            <span className="legende">{L.ladresse}</span>
            <address className="phrase est-moyenne mt-3 not-italic">
              {M.adresse}
              <br />
              {M.codePostal} {M.ville}
            </address>
            <a
              href={FICHE_GOOGLE.lieu}
              target="_blank"
              rel="noreferrer noopener"
              className="texte lien-texte mt-5 inline-block"
            >
              {L.voirLaCarte}
            </a>
          </div>

          <div data-lever data-retard={120}>
            <span className="legende">{L.lesHoraires}</span>
            <dl className="mt-3">
              {M.horaires.map((h) => (
                <div
                  key={h.jour}
                  className="flex items-baseline justify-between gap-6 border-t border-fil py-3"
                >
                  <dt className="texte">{h.jour}</dt>
                  <dd className="texte tabular-nums" style={{ color: "var(--color-encre)" }}>
                    {h.heures}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="legende mt-4">{M.mentionHoraires}</p>
          </div>
        </div>
      </section>

      {/* ————————————————————————————————————— la sortie ————— */}
      <section className="gouttiere py-[clamp(3rem,6vw,5.5rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="phrase">{L.autreQuestion}</h2>
            <p className="texte mesure-l mt-4">{L.autreQuestionTexte}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AppelElise className="bouton-trait">{L.demanderAElise}</AppelElise>
            <AppelRendezvous className="bouton">{L.prendreRendezvous}</AppelRendezvous>
          </div>
        </div>
      </section>
    </>
  );
}
