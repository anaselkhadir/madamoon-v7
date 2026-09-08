import Link from "next/link";
import Photo from "@/components/media/Photo";
import RailFleches from "@/components/accueil/RailFleches";
import { MORPHOLOGIES, ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";

/*
 * La silhouette.
 *
 * Six morphologies, six lettres, six robes, en un rail que l'on pousse.
 * Chaque carte s'arrête net : on en regarde une, puis la suivante, à son
 * rythme.
 *
 * La scène collée qui tenait cette place a été retirée. Elle retenait
 * près d'un écran de défilement pour montrer une morphologie à la fois,
 * et il fallait la traverser pour passer à la suite. Le rail dit la même
 * chose en laissant la main : on peut le parcourir, ou passer outre sans
 * même le remarquer.
 *
 * C'est aussi le même geste sur un téléphone et sur un écran large —
 * seules les photographies changent de taille. Deux dessins pour une même
 * idée finissent toujours par diverger ; celui-ci n'existe qu'une fois.
 *
 * Aucun script : un rail est du défilement, et le navigateur sait faire.
 */

export default function Silhouette() {
  const scenes = MORPHOLOGIES.map((m) => {
    const robe = ROBES.find((r) => r.slug === m.ouverture.robe);
    const media = robe ? vues(robe.slug)[m.ouverture.vue - 1] : undefined;
    return robe && media ? { m, robe, media } : null;
  }).filter(Boolean) as {
    m: (typeof MORPHOLOGIES)[number];
    robe: (typeof ROBES)[number];
    media: ReturnType<typeof vues>[number];
  }[];

  if (scenes.length === 0) return null;

  return (
    <section
      aria-labelledby="silhouette"
      className="relative z-10 bg-blanc pb-[clamp(3rem,6vw,6rem)] pt-[clamp(3rem,8vw,7rem)]"
    >
      <div className="gouttiere">
        <p className="legende">La silhouette</p>
        <span data-ligne className="mt-4 block">
          <h2 id="silhouette" className="phrase mesure-l">
            Avant la robe, la ligne.
          </h2>
        </span>
        <p className="texte mesure-l mt-4">
          Six silhouettes, et pour chacune les coupes qui l&apos;allongent,
          l&apos;équilibrent ou la révèlent.
        </p>
      </div>

      {/*
        * Le rail. Il déborde volontairement à droite : c'est ce débord qui
        * dit qu'il y a autre chose à voir. La barre de défilement est
        * masquée — le geste suffit, et une barre sous six photographies
        * ferait fenêtre de navigateur.
        */}
      <ul id="rail-silhouette" className="mt-[clamp(2rem,4vw,3rem)] flex snap-x snap-mandatory scroll-pl-[var(--gouttiere)] gap-[clamp(1rem,1.6vw,1.5rem)] overflow-x-auto px-[var(--gouttiere)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {scenes.map(({ m, robe, media }, i) => (
          <li
            key={m.lettre}
            /* Les cartes grandissent avec l'écran : trois et demie
              * paraissent à 1440 px, une et demie sur un téléphone. */
            className="w-[74vw] max-w-[19rem] flex-none snap-start lg:w-[clamp(18rem,27vw,26rem)] lg:max-w-none"
          >
            <Link href={`/morphologies/${m.lettre.toLowerCase()}`} className="group block">
              <div className="relative aspect-[5/7] overflow-hidden">
                <Photo
                  media={media}
                  dossier="robes"
                  alt={altRobe(robe)}
                  sizes="(max-width: 1024px) 74vw, 27vw"
                  priorite={i < 2}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-doux)] group-hover:scale-[1.03]"
                />
                {/* La lettre est posée sur l'image, en bas : c'est elle que
                  * l'on cherche du regard en parcourant. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.42) 100%)",
                  }}
                />
                <span className="absolute bottom-4 left-5 font-serif text-[clamp(2.5rem,4vw,3.5rem)] leading-none text-blanc">
                  {m.lettre}
                </span>
              </div>
              <p className="nom-carte mt-4 text-[1.0625rem] transition-colors duration-500 group-hover:text-action">
                {m.nom}
              </p>
              <p className="texte mt-1">{m.silhouette}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="gouttiere flex items-center justify-between gap-6 pt-[clamp(1.5rem,3vw,2.5rem)]">
        <Link href="/morphologies" className="lien-nav souligne inline-block text-action">
          Les six morphologies
        </Link>
        <RailFleches cible="rail-silhouette" />
      </div>
    </section>
  );
}
