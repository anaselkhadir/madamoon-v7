import Link from "next/link";
import { MAISON } from "@/lib/madamoon";

/*
 * La fin de la page.
 *
 * Un fond craie, une phrase, un bouton, une ligne d'informations. Rien de
 * plus : c'est la dernière chose que l'on lit, elle doit être simple.
 */

export default function Rendezvous() {
  return (
    <section
      aria-labelledby="rendez-vous"
      className="gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]"
    >
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div data-lever>
          <h2 id="rendez-vous" className="legende">
            Essayage privé
          </h2>
          <p className="phrase mesure-l mt-4">
            Venez essayer. C&apos;est là que tout se décide.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4" data-lever data-retard="120">
          <Link href="/rendez-vous" className="bouton">
            Prendre rendez-vous
          </Link>
          <a href={MAISON.telephoneHref} className="lien-nav souligne text-encre">
            {MAISON.telephone}
          </a>
        </div>
      </div>
    </section>
  );
}
