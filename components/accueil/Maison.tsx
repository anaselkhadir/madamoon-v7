import Link from "@/components/Lien";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * L'introduction de l'accueil.
 *
 * On entrait dans les morphologies sans savoir où l'on était : la
 * boutique a demandé qu'on se présente d'abord. Le titre et le
 * paragraphe sont ceux de Mouna, mot pour mot.
 *
 * Centrée, contrairement aux sections qui suivent, toutes calées à
 * gauche : c'est une adresse à la visiteuse et non une rubrique du site.
 * Elle garde la mesure du reste — quarante-huit caractères — sans quoi
 * un texte centré devient une bannière.
 *
 * Pas de repère en capitales au-dessus : le titre nomme déjà la maison,
 * et « La maison » posé dessus l'aurait dite deux fois.
 */

export default function Maison({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue).introMaison;

  return (
    <section
      aria-labelledby="la-maison"
      className="relative z-10 bg-blanc pt-[clamp(3rem,8vw,7rem)]"
    >
      <div className="gouttiere">
        <div className="mesure-l mx-auto text-center">
          <span data-ligne className="block">
            <h2 id="la-maison" className="phrase">
              {/* L'anglaise a l'œil plus petit qu'un romain de même
                * corps : relevée d'un tiers, elle se tient sur la même
                * ligne que la suite. L'interligne revient à un, sinon
                * ses déliés écartent les deux lignes du titre.
                *
                * Le rouge est écrit en propre : « .phrase » porte sa
                * couleur hors calque et l'emporterait sur un utilitaire.
                * C'est le rouge des liens et des boutons, le même en
                * clair et en sombre — la maison l'a voulu ainsi. */}
              <span
                style={{
                  fontFamily: "var(--font-anglaise)",
                  fontSize: "1.35em",
                  lineHeight: 1,
                  color: "var(--color-action)",
                }}
              >
                {L.nom}
              </span>
              {L.titre}
            </h2>
          </span>
          {/* L'exposant est une convention française : « le 10ᵉ ». En
            * anglais l'arrondissement s'écrit en toutes lettres, et la
            * phrase se tient d'un seul tenant. */}
          {/* Le paragraphe monte après le titre, le lien après lui : la
            * section se découvre dans l'ordre où elle se lit. Les
            * retards sont courts — on ouvre une page, on n'assiste pas à
            * une démonstration. « Mouvement » révèle tout de suite ce qui
            * est déjà à l'écran, et la préférence de mouvement réduit
            * annule les trois d'un coup. */}
          <p className="texte mt-5" data-lever data-retard="120">
            {L.texteAvant}
            {langue === "fr" && (
              <>
                <sup>e</sup>
                {L.texteApres}
              </>
            )}
          </p>
          <div className="pt-[clamp(1.5rem,2.5vw,2.25rem)]" data-lever data-retard="240">
            <Link href="/a-propos" className="lien-nav souligne inline-block text-action">
              {L.lien}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
