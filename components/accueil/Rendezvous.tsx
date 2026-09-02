import Link from "next/link";
import { MAISON } from "@/lib/madamoon";

/*
 * La fin de la page.
 *
 * La seule grande surface rouge du site, et elle n'apparaît qu'une fois,
 * tout en bas : une phrase, un bouton blanc, un numéro. C'est la
 * dernière chose que l'on lit — elle doit être simple, et elle doit se
 * voir.
 *
 * Elle reprend la grille de quatre colonnes du pied de page, qui la suit
 * immédiatement. Sans cela, ses deux boutons « prendre rendez-vous » —
 * celui-ci et celui du pied — se retrouvaient sur deux axes différents à
 * quelques centimètres l'un de l'autre : le premier calé sur la gouttière
 * droite, le second sur la quatrième colonne. Ils partagent maintenant le
 * même bord gauche.
 */

export default function Rendezvous() {
  return (
    <section
      aria-labelledby="rendez-vous"
      className="sur-rouge gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-action py-[clamp(3.5rem,7vw,7rem)]"
    >
      <div className="grid gap-8 md:grid-cols-4 md:items-end md:gap-10">
        <span data-ligne className="md:col-span-3 block">
          <h2 id="rendez-vous" className="legende">
            Essayage privé
          </h2>
          <p className="phrase mesure-l mt-4">
            Venez essayer. C&apos;est là que tout se décide.
          </p>
        </span>
        <div className="flex flex-col items-start gap-4 md:col-start-4" data-lever data-retard="200">
          <Link href="/rendez-vous" className="bouton-sur-rouge">
            Prendre rendez-vous
          </Link>
          <a href={MAISON.telephoneHref} className="lien-nav souligne">
            {MAISON.telephone}
          </a>
        </div>
      </div>
    </section>
  );
}
