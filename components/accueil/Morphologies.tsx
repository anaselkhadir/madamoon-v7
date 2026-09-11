import Link from "@/components/Lien";
import Croquis from "@/components/morphologie/Croquis";
import { MORPHOLOGIES } from "@/lib/madamoon";
import { morphoNom, morphoSilhouette } from "@/lib/contenu";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Les six morphologies.
 *
 * La section montrait une robe par morphologie. C'était une erreur, et
 * la maison l'a vue avant nous : une photographie posée au-dessus d'un
 * type de corps se lit comme une recommandation. La robe qui ouvrait le
 * O n'était pas celle qu'on conseille à une cliente en O, et la page
 * disait donc le contraire de ce qu'elle voulait dire.
 *
 * Six dessins au trait à la place. Ils ne promettent rien, ils
 * décrivent — et ils se comparent d'un coup d'œil, ce qu'une rangée de
 * photographies ne permettait pas.
 *
 * Le rail disparaît avec elles. Un dessin tient dans un sixième de la
 * page là où une photographie en demandait un quart : les six se
 * rangent en grille, tout est visible d'emblée, et il n'y a plus rien à
 * pousser — ce que la maison nous reprochait aussi.
 */

export default function Morphologies({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  return (
    <section
      aria-labelledby="morphologies"
      className="relative z-10 bg-blanc pb-[clamp(3rem,6vw,6rem)] pt-[clamp(3rem,8vw,7rem)]"
    >
      <div className="gouttiere">
        <p className="legende">{L.silhouette.legende}</p>
        <span data-ligne className="mt-4 block">
          <h2 id="morphologies" className="phrase mesure-l">
            {L.silhouette.titre}
          </h2>
        </span>
        <p className="texte mesure-l mt-4">{L.silhouette.texte}</p>

        <ul
          className="mt-[clamp(2rem,4vw,3rem)] grid gap-x-[clamp(1rem,1.8vw,1.75rem)] gap-y-[clamp(2rem,3vw,2.5rem)] grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          data-suite
        >
          {MORPHOLOGIES.map((m) => (
            <li key={m.lettre}>
              <Link href={`/morphologies/${m.lettre.toLowerCase()}`} className="group block">
                {/* Le dessin et sa lettre partagent le même cadre : la
                  * lettre est le repère que l'on cherche du regard, le
                  * dessin ce que l'on compare. */}
                <div className="relative aspect-[3/4] overflow-hidden bg-craie">
                  <Croquis
                    lettre={m.lettre}
                    className="absolute inset-0 mx-auto h-full w-auto py-[9%] text-plume transition-colors duration-700 group-hover:text-action"
                  />
                  {/* La lettre en haut à gauche : en bas, elle tombait
                    * sur une jambe. Le coin haut est vide sur les six. */}
                  <span className="absolute left-4 top-3 font-serif text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none text-encre">
                    {m.lettre}
                  </span>
                </div>
                <p className="nom-carte mt-3 text-[0.9375rem] transition-colors duration-500 group-hover:text-action">
                  {morphoNom(m, langue)}
                </p>
                <p className="texte mt-1 text-[0.8125rem]">{morphoSilhouette(m, langue)}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-[clamp(1.5rem,3vw,2.5rem)]">
          <Link href="/morphologies" className="lien-nav souligne inline-block text-action">
            {L.silhouette.lien}
          </Link>
        </div>
      </div>
    </section>
  );
}
