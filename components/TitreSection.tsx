import Link from "next/link";

/*
 * L'intitulé d'une section.
 *
 * Sur la référence : capitales de 32 px, calées sur la gouttière, à 80 px
 * de la section précédente, puis 12 px avant les images. Un lien peut
 * l'accompagner à droite — jamais un bouton.
 */

type Props = {
  titre: string;
  id?: string;
  niveau?: 1 | 2;
  lien?: { href: string; label: string };
  className?: string;
};

export default function TitreSection({ titre, id, niveau = 2, lien, className = "" }: Props) {
  const H = niveau === 1 ? "h1" : "h2";
  return (
    <div
      className={`gouttiere flex items-baseline justify-between gap-6 pb-3 pt-[clamp(3rem,5.5vw,5rem)] ${className}`}
      data-lever
    >
      <H id={id} className="titre-section">
        {titre}
      </H>
      {lien && (
        <Link href={lien.href} className="lien-nav souligne shrink-0 text-encre">
          {lien.label}
        </Link>
      )}
    </div>
  );
}
