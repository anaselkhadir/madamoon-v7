import { CROQUIS } from "@/lib/croquis";

/*
 * Le croquis d'une morphologie.
 *
 * Un dessin plutôt qu'une photographie, et c'est tout le propos : une
 * robe posée au-dessus d'un type de morphologie se lisait comme une
 * recommandation. Elle n'en était pas une — la robe qui ouvrait le O
 * n'est pas celle qu'on conseille à une cliente en O.
 *
 * Le trait prend la couleur du texte : il suit donc le thème clair ou
 * sombre sans qu'on ait à le redessiner.
 *
 * Les tracés viennent de lib/croquis.ts, produit par outils/croquis.py.
 * Les six partagent la même base et ne diffèrent que par cinq largeurs :
 * c'est ce qui les tient en famille.
 */

export default function Croquis({
  lettre,
  className = "",
}: {
  lettre: string;
  className?: string;
}) {
  const tracés = CROQUIS[lettre];
  if (!tracés) return null;

  return (
    <svg
      viewBox="0 0 200 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {tracés.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
