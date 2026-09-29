import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
import { ROBES } from "@/lib/madamoon";
import { couverture } from "@/lib/couverture";
import { altRobe } from "@/lib/alt";
import { robeLigne } from "@/lib/contenu";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * La rangée de robes de l'accueil.
 *
 * Six modèles entre la présentation de la maison et les morphologies :
 * on voit des robes avant d'entendre parler de silhouettes.
 *
 * Le choix n'est pas au hasard. Les fonds des six photographies ont été
 * mesurés — teinte de 28 à 33 degrés, clarté de 62 à 72 pour cent — et
 * la rangée va du plus sourd au plus clair. Posées côte à côte, elles
 * font une seule image ; prises dans le catalogue au hasard, elles
 * faisaient six vitrines l'une contre l'autre.
 *
 * Quatre maisons sont représentées. Les deux qui manquent — Olya Mak et
 * Monica Loretti — n'ont pas de modèle photographié sur un fond clair :
 * en ajouter un aurait cassé la rangée pour une symétrie que personne
 * ne remarque.
 */

/* Les six, du fond le plus sourd au plus clair. */
const SELECTION = ["meredith", "charlotte", "montana", "angel", "monica", "agnessa"];

export default function Robes({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue).robesAccueil;
  const choisies = SELECTION.map((slug) => ROBES.find((r) => r.slug === slug)).filter(
    (r): r is (typeof ROBES)[number] => Boolean(r),
  );

  return (
    <section
      aria-labelledby="robes-accueil"
      className="relative z-10 bg-blanc pt-[clamp(3rem,8vw,7rem)]"
    >
      <div className="gouttiere flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
        <div>
          <p className="legende">{L.legende}</p>
          <span data-ligne className="mt-4 block">
            <h2 id="robes-accueil" className="phrase">
              {L.titre}
            </h2>
          </span>
        </div>
        {/* La pilule : le seul angle rond du site, et il est voulu — un
          * bouton de rubrique n'est pas un bouton d'action, il ne doit
          * pas ressembler au rouge du rendez-vous. */}
        <Link
          href="/robes"
          className="legende inline-flex shrink-0 items-center rounded-full border border-encre px-[clamp(1rem,1.6vw,1.375rem)] py-[0.7rem] text-encre transition-colors duration-500 hover:bg-encre hover:text-blanc"
          style={{ color: "inherit" }}
        >
          {L.voirTout}
        </Link>
      </div>

      {/* La rangée. Six colonnes au large, d'un bord à l'autre de la
        * fenêtre : la gouttière est rendue aux photographies, comme le
        * fait déjà le premier écran. Sous le seuil elle défile au doigt,
        * les photographies gardant leur taille plutôt que de se réduire
        * à six vignettes illisibles. */}
      <ul
        aria-label={L.rangee}
        /* La gouttière est écrite en utilitaire et non par « .gouttiere » :
          * cette classe n'est pas calquée et l'emporterait sur le
          * « lg:px-0 » qui rend le bord aux photographies. */
        className="mt-[clamp(2rem,4vw,3.5rem)] flex snap-x snap-mandatory gap-[clamp(0.375rem,0.6vw,0.5rem)] overflow-x-auto px-[var(--gouttiere)] pb-1 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0"
        data-suite
      >
        {choisies.map((robe, i) => {
          const media = couverture(robe);
          if (!media) return null;
          return (
            <li key={robe.slug} className="w-[58vw] shrink-0 snap-start sm:w-[38vw] lg:w-auto">
              <Link href={`/robes/${robe.slug}`} className="group block">
                {/* Trois cinquièmes : plus haut que le rapport de la
                  * source, donc la robe se donne en pied et la rangée
                  * gagne un cinquième de hauteur sans prendre un pixel de
                  * large. Le recadrage part du centre. */}
                <div className="relative aspect-[3/5] overflow-hidden rounded-[4px] bg-craie">
                  <Photo
                    media={media}
                    dossier="robes"
                    alt={altRobe(robe, langue)}
                    sizes="(max-width: 640px) 58vw, (max-width: 1024px) 38vw, 17vw"
                    priorite={i < 3}
                    className="h-full w-full object-cover"
                  />
                  {/* Le bouton au cœur de la photographie. Il ne paraît
                    * qu'au survol, et seulement là où il y a un survol :
                    * sous le pouce, la photographie entière est le lien. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden place-items-center opacity-0 transition-opacity duration-500 lg:grid lg:group-focus-visible:opacity-100 lg:group-hover:opacity-100"
                  >
                    <span
                      className="legende inline-flex items-center gap-2 rounded-full bg-encre px-4 py-2.5"
                      style={{ color: "var(--color-blanc)" }}
                    >
                      <span className="block h-1.5 w-1.5 rounded-full bg-current" />
                      {L.voirPlus}
                    </span>
                  </span>
                </div>

                {/* La fiche, sous la photographie. Elle est gardée dans sa
                  * place : la rangée ne bouge pas quand elle paraît. Sous
                  * le seuil elle se lit toujours — il n'y a pas de survol
                  * sous le pouce. */}
                <span className="mt-3 block px-[clamp(0.375rem,0.6vw,0.5rem)] lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-focus-visible:opacity-100 lg:group-hover:opacity-100">
                  <span className="nom-carte block">{robe.nom}</span>
                  <span className="texte mt-1 block text-[0.75rem] leading-[1.35]">
                    {robeLigne(robe, langue)}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
