"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/Lien";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import { MAISON, CREATEURS } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { media as chemin } from "@/lib/chemin";
import Logo from "@/components/chrome/Logo";
import { langueDe } from "@/lib/langue";
import { t } from "@/lib/textes";
import { coupeNom, maison } from "@/lib/contenu";

/*
 * Le pied de page.
 *
 * Il ne cherche pas à retenir : il range. Quatre colonnes de liens fins,
 * les coordonnées de la maison, et le maillage interne dont le
 * référencement a besoin — sans un paragraphe de plus.
 *
 * Il lit la langue sur l'adresse : posé par le gabarit, il ne reçoit
 * rien de la page. C'est ce qui l'a fait passer côté client — il n'était
 * que des liens, qui le sont déjà.
 */

export default function Pied() {
  const l = langueDe(usePathname() ?? "/");
  const L = t(l);
  const M = maison(l);
  return (
    <footer className="gouttiere border-t border-fil bg-blanc pb-10 pt-[clamp(3rem,5vw,4.5rem)]">
      {/* Deux colonnes avant mille vingt-quatre pixels, quatre au-delà.
       * À quatre dès sept cent soixante-huit, la colonne du rendez-vous
       * était plus étroite que son bouton — celui-ci ne se coupe pas, et
       * la page gagnait seize pixels de défilement latéral. */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-[1.05rem] w-auto" />
          <p className="texte mesure mt-5">{M.baseline}.</p>
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

        <nav aria-label={L.pied.coupes}>
          <h2 className="legende">{L.pied.coupes}</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {COUPES.map((s) => (
              <li key={s.ancre}>
                <Link href={`/coupes/${s.ancre}`} className="texte souligne">
                  {L.pied.robeDeMariee} {coupeNom(s, l).toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={L.pied.createurs}>
          <h2 className="legende">{L.pied.createurs}</h2>
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
          <h2 className="legende">{L.pied.showroom}</h2>
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
          <AppelRendezvous className="bouton mt-6">
            {L.pied.rendezvous}
          </AppelRendezvous>
        </div>
      </div>

      <div className="filet mt-12" />
      <p className="mention mt-6 text-plomb">
        © {new Date().getFullYear()} {MAISON.nom} — {L.pied.droits}
      </p>
    </footer>
  );
}
