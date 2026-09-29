import Link from "@/components/Lien";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * L'introduction de l'accueil.
 *
 * On entrait dans les morphologies sans savoir où l'on était : la
 * boutique a demandé qu'on se présente d'abord. Trois choses, pas une de
 * plus — qui est la maison, où elle se trouve, ce qu'on y vit. Puis on
 * entre dans le vif.
 *
 * Les mots sont ceux de la page « La maison », resserrés : l'accueil ne
 * raconte pas une autre histoire, il en donne la première ligne, et le
 * lien mène au reste.
 *
 * Même composition que la section qui suit — le repère, la phrase, le
 * paragraphe, le lien. L'accueil est une seule page : ses sections se
 * ressemblent, sinon chacune paraît venir d'ailleurs.
 */

export default function Maison({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue).introMaison;

  return (
    <section
      aria-labelledby="la-maison"
      className="relative z-10 bg-blanc pt-[clamp(3rem,8vw,7rem)]"
    >
      <div className="gouttiere">
        <p className="legende">{L.legende}</p>
        <span data-ligne className="mt-4 block">
          <h2 id="la-maison" className="phrase mesure-l">
            {L.titre}
          </h2>
        </span>
        {/* L'exposant est une convention française : « le 10ᵉ ». En
          * anglais l'arrondissement s'écrit en toutes lettres, et la
          * phrase se tient d'un seul tenant. */}
        <p className="texte mesure-l mt-4">
          {L.texteAvant}
          {langue === "fr" && (
            <>
              <sup>e</sup>
              {L.texteApres}
            </>
          )}
        </p>
        <div className="pt-[clamp(1.5rem,2.5vw,2.25rem)]">
          <Link href="/a-propos" className="lien-nav souligne inline-block text-action">
            {L.lien}
          </Link>
        </div>
      </div>
    </section>
  );
}
