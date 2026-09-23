import Link from "@/components/Lien";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import Photo from "@/components/media/Photo";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * L'espace de la mariée, avant son ouverture.
 *
 * Les comptes vivent dans un autre projet, sur un serveur : tant qu'il
 * n'est pas en ligne, mieux vaut une page qui le dit qu'un lien mort.
 * Elle ne s'excuse pas, elle annonce — et elle propose ce qui existe
 * déjà : le rendez-vous, et le catalogue.
 */

const sur = { color: "var(--color-sur-image)" } as const;

export default function PageEspace({ langue }: { langue: Langue }) {
  const L = t(langue).espace;
  const scene = SCENES["showroom"] ?? SCENES["seuil"];

  return (
    <section className="relative flex min-h-[calc(100svh-var(--barre)-var(--entete))] items-center overflow-hidden bg-craie">
      {scene && (
        <Photo
          media={scene}
          dossier="scenes"
          alt={altScene("showroom", langue)}
          sizes="100vw"
          priorite
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* Le voile de lecture habituel ne suffit pas ici : la
        * photographie du showroom est claire, et le texte blanc s'y
        * perdait. Celui-ci part du bord gauche, là où le texte se pose,
        * et s'efface avant la moitié de l'image. */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.5) 32%, rgba(0,0,0,0.12) 62%, rgba(0,0,0,0) 82%)",
        }}
      />

      <div className="gouttiere relative w-full py-[clamp(3rem,8vw,6rem)]">
        {/* « .legende » et « .texte » portent leur couleur hors calque :
          * l'utilitaire ne suffit pas, il faut la redire ici. */}
        <p className="legende" style={sur}>
          {L.accroche}
        </p>
        <h1 className="affiche mesure-l mt-4 text-[clamp(2rem,6vw,4rem)] leading-none text-sur-image">
          {L.titre}
        </h1>
        <p className="texte mesure mt-6" style={sur}>
          {L.texte}
        </p>
        <p className="texte mesure mt-3" style={sur}>
          {L.entretemps}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <AppelRendezvous className="bouton">{t(langue).carte.bouton}</AppelRendezvous>
          <Link href="/robes" className="bouton-clair">
            {L.voirLesRobes}
          </Link>
        </div>
      </div>
    </section>
  );
}
