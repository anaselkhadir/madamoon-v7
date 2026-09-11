import Link from "@/components/Lien";
import Croquis from "@/components/morphologie/Croquis";
import { MORPHOLOGIES } from "@/lib/madamoon";
import { coupeNom, morphoNom, morphoSilhouette } from "@/lib/contenu";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Les six morphologies.
 *
 * La section a montré une robe par morphologie. C'était une erreur, et
 * la maison l'a vue avant nous : une photographie posée au-dessus d'un
 * type de corps se lit comme une recommandation, et la robe qui ouvrait
 * le O n'est pas celle qu'on conseille à une cliente en O.
 *
 * Six croquis au trait à la place. Ils ne promettent rien, ils
 * décrivent, et ils se comparent d'un coup d'œil — ce qu'une rangée de
 * photographies ne permettait pas. Pas de fond, pas de cadre : le
 * dessin, la lettre, deux lignes.
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
          className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(2.5rem,4vw,3.5rem)] sm:grid-cols-3 lg:grid-cols-6"
          data-suite
        >
          {MORPHOLOGIES.map((m) => (
            <li key={m.lettre}>
              <Link href={`/morphologies/${m.lettre.toLowerCase()}`} className="group block">
                <span className="block h-px w-full bg-encre" />
                <Croquis
                  lettre={m.lettre}
                  className="mx-auto mt-[clamp(1.25rem,2vw,2rem)] w-[min(100%,9rem)] text-plume transition-colors duration-700 group-hover:text-action"
                />
                {/* La lettre reste : c'est le repère que l'on cherche du
                  * regard dans le reste du site. */}
                <span className="affiche mt-[clamp(1rem,1.6vw,1.5rem)] block text-[clamp(1.75rem,3vw,2.5rem)] leading-none text-encre transition-colors duration-500 group-hover:text-action">
                  {m.lettre}
                </span>
                <span className="nom-carte mt-3 block text-[0.9375rem]">
                  {morphoNom(m, langue)}
                </span>
                <span className="texte mt-1 block text-[0.8125rem]">
                  {morphoSilhouette(m, langue)}
                </span>
                <span className="legende mt-3 block text-brume">
                  {m.premieres.map((c) => coupeNom(c, langue)).join(", ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-[clamp(2rem,3.5vw,3rem)]">
          <Link href="/morphologies" className="lien-nav souligne inline-block text-action">
            {L.silhouette.lien}
          </Link>
        </div>
      </div>
    </section>
  );
}
