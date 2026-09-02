import Link from "next/link";
import AppelElise from "@/components/AppelElise";
import Photo from "@/components/media/Photo";
import type { Media } from "@/lib/medias";

/*
 * La tuile.
 *
 * C'est le composant central du site : une photographie au rapport
 * 447 / 621 — celui relevé sur la référence — et, posé dedans, un nom en
 * serif avec une ligne en dessous. Le texte est centré en hauteur et calé
 * à 24 px de la gauche. Pas de cadre, pas d'ombre, pas de bouton : la
 * tuile entière est le lien.
 *
 * « appelle » remplace l'adresse par une conversation : la tuile devient
 * alors un bouton, parce qu'il n'y a pas de page au bout. Le nom de la
 * maison, s'il est donné, dit à Élise de quel catalogue partir.
 */

type Props = {
  href: string;
  /* Ouvre Élise plutôt que de naviguer. La chaîne vide vaut « aucune
   * maison » : la conversation part alors de tout le catalogue. */
  appelle?: string | null;
  media: Media;
  dossier: "robes" | "scenes";
  alt: string;
  nom: string;
  note?: string;
  sizes: string;
  priorite?: boolean;
  position?: string;
  /* Un repère discret en haut à gauche (numéro, catégorie). */
  repere?: string;
  /* Le rapport de la tuile. Par défaut celui de la référence. */
  ratio?: string;
};

export default function Tuile({
  href,
  appelle,
  media,
  dossier,
  alt,
  nom,
  note,
  sizes,
  priorite = false,
  position,
  repere,
  ratio,
}: Props) {
  const dedans = (
    <>
      <Photo
        media={media}
        dossier={dossier}
        alt={alt}
        sizes={sizes}
        priorite={priorite}
        position={position}
      />
      <span className="voile-lecture" aria-hidden="true" />
      {repere && (
        <span className="mention absolute left-[clamp(1rem,1.7vw,1.5rem)] top-[clamp(1rem,1.7vw,1.5rem)] text-blanc/80">
          {repere}
        </span>
      )}
      <span className="dans-image">
        <span className="nom-image">{nom}</span>
        {note && <span className="note-image mt-2">{note}</span>}
      </span>
    </>
  );

  const habits = {
    className: "tuile group block",
    style: ratio ? { aspectRatio: ratio } : undefined,
    "data-voile": true,
  } as const;

  if (appelle !== undefined)
    return (
      <AppelElise maison={appelle ?? undefined} {...habits}>
        {dedans}
      </AppelElise>
    );

  return (
    <Link href={href} {...habits}>
      {dedans}
    </Link>
  );
}
