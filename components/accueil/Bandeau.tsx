/*
 * Le bandeau des mentions, au bas d'un premier écran.
 *
 * Le défilé est une translation, pas une boucle programmée : la piste
 * porte quatre copies de la liste et se décale d'un quart de sa largeur,
 * si bien que la copie suivante vient prendre exactement la place de la
 * première. Quatre copies plutôt que deux pour qu'un très grand écran ne
 * rattrape jamais la fin de la piste.
 *
 * Une seule copie porte le texte pour les lecteurs d'écran et les
 * moteurs ; les trois autres ne remplissent que la piste.
 */

const MENTIONS = [
  "Essayage privé",
  "Confection sur mesure",
  "Retouches incluses",
  "À partir de 1 500 €",
];

const COPIES = 4;

export default function Bandeau({ className = "" }: { className?: string }) {
  return (
    <div className={`bandeau absolute inset-x-0 bottom-[4.5rem] ${className}`}>
      <div className="bandeau-piste">
        {Array.from({ length: COPIES }, (_, copie) => (
          <div key={copie} className="flex" aria-hidden={copie > 0 || undefined}>
            {MENTIONS.map((mention) => (
              <p key={mention} className="legende bandeau-mention">
                {mention}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
