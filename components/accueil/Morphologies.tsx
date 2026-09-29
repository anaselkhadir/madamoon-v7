import Link from "@/components/Lien";
import Croquis from "@/components/morphologie/Croquis";
import { MORPHOLOGIES } from "@/lib/madamoon";
import { coupeNom, morphoNom, morphoSilhouette } from "@/lib/contenu";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Les morphologies.
 *
 * La section a montré une robe par morphologie. C'était une erreur, et
 * la maison l'a vue avant nous : une photographie posée au-dessus d'un
 * type de corps se lit comme une recommandation, et la robe qui ouvrait
 * le O n'est pas celle qu'on conseille à une cliente en O.
 *
 * Des croquis au trait à la place. Ils ne promettent rien, ils
 * décrivent, et ils se comparent d'un coup d'œil — ce qu'une rangée de
 * photographies ne permettait pas.
 *
 * Chacun est posé sur une carte, et la carte ne porte que la lettre et
 * le nom. Le reste — la silhouette, les coupes qui lui répondent — ne
 * paraît qu'au survol, sous la carte, dans une place qui lui est
 * gardée : rien ne bouge quand le texte arrive. Six descriptions posées
 * à plat se lisaient comme un formulaire ; il fallait pouvoir comparer
 * les dessins avant de lire.
 *
 * Sur ordinateur, les cartes tiennent en deux rangs de trois et le
 * texte de la section passe à leur droite. Sous mille vingt-quatre
 * pixels il reprend sa place au-dessus, et les descriptions restent
 * visibles : il n'y a pas de survol sous le pouce.
 */

export default function Morphologies({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  return (
    <section
      aria-labelledby="morphologies"
      className="relative z-10 bg-blanc pb-[clamp(3rem,6vw,6rem)] pt-[clamp(3rem,8vw,7rem)]"
    >
      <div className="gouttiere">
        {/* La colonne du texte est mesurée, celle des cartes prend tout
          * ce qui reste : les cartes remplissent leur zone d'un bord à
          * l'autre. C'est leur hauteur, non leur largeur, qui les avait
          * fait paraître énormes — d'où un cadre presque carré. */}
        <div className="lg:grid lg:grid-cols-[clamp(14rem,24vw,26rem)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(2rem,3vw,3rem)]">
          {/* ————— le texte : au-dessus sur téléphone, à gauche sur
            * ordinateur ————— */}
          <div>
            <p className="legende">{L.silhouette.legende}</p>
            <span data-ligne className="mt-4 block">
              <h2 id="morphologies" className="phrase">
                {L.silhouette.titre}
              </h2>
            </span>
            <p className="texte mesure-l mt-4">{L.silhouette.texte}</p>
            {/* Le rappel des pages de morphologie : une piste, jamais une
              * règle. */}
            <p className="texte mesure-l mt-3 text-[0.875rem] italic" style={{ color: "var(--color-plomb)" }}>
              {L.silhouette.mention}
            </p>
            <div className="pt-[clamp(1.5rem,2.5vw,2.25rem)]">
              <Link href="/morphologies" className="lien-nav souligne inline-block text-action">
                {L.silhouette.lien}
              </Link>
            </div>
          </div>

          {/* ————— les cartes : deux rangs de trois ————— */}
          <ul
            /* Trois parts égales de la place disponible : les cartes la
              * remplissent d'un bord à l'autre. Sous le seuil, deux de
              * front — un téléphone n'a pas de place à perdre. */
            className="mt-[clamp(2.5rem,5vw,4rem)] grid min-w-0 grid-cols-2 gap-x-[clamp(0.625rem,1.1vw,1rem)] gap-y-[clamp(0.75rem,1.2vw,1rem)] sm:grid-cols-3 lg:mt-0"
            data-suite
          >
            {MORPHOLOGIES.map((m) => (
              <li key={m.lettre}>
                <Link href={`/morphologies/${m.lettre.toLowerCase()}`} className="group block">
                  {/* La carte. L'intitulé en tête — la lettre et le nom à
                    * gauche, le plus à droite, qui dit qu'il y a une page
                    * derrière —, et le dessin dessous. */}
                  <div className="flex aspect-[6/7] flex-col rounded-[1.125rem] bg-craie p-[clamp(0.75rem,1vw,1rem)] transition-colors duration-500 group-hover:bg-sable">
                    <span className="flex shrink-0 items-start justify-between gap-2">
                      <span className="flex items-baseline gap-2">
                        <span className="font-serif text-[clamp(1rem,1.3vw,1.25rem)] leading-none text-encre transition-colors duration-500 group-hover:text-action">
                          {m.lettre}
                        </span>
                        <span className="legende leading-tight">{morphoNom(m, langue)}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-fil text-plomb transition-colors duration-500 group-hover:border-action group-hover:text-action"
                      >
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </span>

                    {/* Le croquis se mesure en hauteur : la planche est
                      * haute et étroite — cinq cents sur douze cent un —,
                      * et une largeur imposée l'aurait fait déborder de
                      * la carte. */}
                    <span className="flex min-h-0 flex-1 items-center justify-center pt-2">
                      <Croquis
                        lettre={m.lettre}
                        className="h-full w-auto text-plume transition-colors duration-700 group-hover:text-action"
                      />
                    </span>
                  </div>

                  {/* La description, gardée dans sa place : invisible tant
                    * qu'on ne survole pas, mais elle occupe déjà la
                    * hauteur — la grille ne bouge donc jamais. Sous mille
                    * vingt-quatre pixels elle reste lue : il n'y a pas de
                    * survol sous le pouce. */}
                  <span className="mt-2 block lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-focus-visible:opacity-100 lg:group-hover:opacity-100">
                    <span className="texte block text-[0.75rem] leading-[1.35]">
                      {morphoSilhouette(m, langue)}
                    </span>
                    <span
                      className="legende mt-1 block text-[0.625rem]"
                      style={{ color: "var(--color-brume)" }}
                    >
                      {m.premieres.map((c) => coupeNom(c, langue)).join(", ")}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
