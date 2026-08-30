import Link from "next/link";
import { MAISON, CREATEURS } from "@/lib/madamoon";
import { SILHOUETTES } from "@/lib/silhouettes";
import { media as chemin } from "@/lib/chemin";

/*
 * Le pied de page.
 *
 * Il ne cherche pas à retenir : il range. Quatre colonnes de liens fins,
 * les coordonnées de la maison, et le maillage interne dont le
 * référencement a besoin — sans un paragraphe de plus.
 */

export default function Pied() {
  return (
    <footer className="gouttiere border-t border-fil bg-blanc pb-10 pt-[clamp(3rem,5vw,4.5rem)]">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={chemin("/marque/logo-encre.png")}
            alt="MADAMOON"
            width={513}
            height={56}
            className="h-[1.05rem] w-auto"
          />
          <p className="texte mesure mt-5">{MAISON.baseline}.</p>
          <ul className="mt-5 flex gap-5">
            {MAISON.reseaux.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mention souligne text-plomb hover:text-encre"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Silhouettes">
          <h2 className="legende">Silhouettes</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {SILHOUETTES.map((s) => (
              <li key={s.ancre}>
                <Link href={`/robes#${s.ancre}`} className="texte souligne">
                  Robe de mariée {s.nom.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Créateurs">
          <h2 className="legende">Créateurs</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {CREATEURS.map((c) => (
              <li key={c.nom}>
                <Link href="/robes" className="texte souligne">
                  {c.nom}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="legende">Le showroom</h2>
          <address className="texte mt-4 not-italic">
            {MAISON.adresse}
            <br />
            {MAISON.codePostal} {MAISON.ville}
            <br />
            <a href={MAISON.telephoneHref} className="souligne">
              {MAISON.telephone}
            </a>
            <br />
            <a href={MAISON.emailHref} className="souligne">
              {MAISON.email}
            </a>
          </address>
          <Link href="/rendez-vous" className="bouton mt-6">
            Prendre rendez-vous
          </Link>
        </div>
      </div>

      <div className="filet mt-12" />
      <p className="mention mt-6 text-plomb">
        © {new Date().getFullYear()} {MAISON.nom} — Boutique de robes de mariée à Paris
      </p>
    </footer>
  );
}
