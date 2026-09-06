"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MAISON, CREATEURS, MORPHOLOGIES } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { media as ressource } from "@/lib/chemin";
import AppelElise from "@/components/AppelElise";

/*
 * L'en-tête, relevée sur la référence.
 *
 * Deux étages. Un bandeau de 38 px, toujours blanc, qui porte les maisons
 * présentées et les coordonnées. Puis une barre de 70 px : le logo à
 * gauche, la navigation en capitales de 12 px, le rendez-vous à droite.
 *
 * Sur l'accueil, la barre est posée sur la vidéo, sans fond, en blanc.
 * Dès que la page défile — et sur toutes les pages claires — elle devient
 * blanche et la typographie passe à l'encre. Elle ne change jamais de
 * hauteur.
 *
 * Trois entrées ouvrent un panneau : les robes par maison, les six
 * coupes, les six morphologies. Il est blanc plein, sans effet — le reste
 * du site n'en a aucun, et un texte se lit mieux sur du blanc que sur
 * n'importe quel verre.
 *
 * Tant qu'il est ouvert, la barre reprend son fond plein elle aussi : sur
 * l'accueil elle est blanche sur la vidéo, et son texte blanc
 * disparaîtrait au-dessus d'un panneau blanc.
 */

/*
 * Ce que chaque entrée déplie. Les listes sont construites depuis les
 * données du site : une coupe ajoutée au catalogue paraît ici sans qu'on
 * y touche.
 */
const GROUPES: Record<
  string,
  { intitule: string; colonnes: number; liens: { href: string; nom: string; note?: string }[] }
> = {
  "/robes": {
    intitule: "Par maison",
    colonnes: 3,
    liens: [
      { href: "/robes", nom: "Toutes les robes", note: "Le catalogue entier" },
      ...CREATEURS.map((c) => ({
        href: `/createurs/${c.slug}`,
        nom: c.nom,
        note: c.origine,
      })),
    ],
  },
  "/coupes": {
    intitule: "Les six coupes",
    colonnes: 3,
    liens: COUPES.map((c) => ({
      href: `/coupes/${c.ancre}`,
      nom: c.nom,
      note: c.note,
    })),
  },
  "/morphologies": {
    intitule: "Les six silhouettes",
    colonnes: 3,
    liens: MORPHOLOGIES.map((m) => ({
      href: `/morphologies/${m.lettre.toLowerCase()}`,
      nom: m.nom,
      note: m.objectif,
    })),
  },
};

const LIENS = [
  { href: "/robes", label: "Robes de mariée" },
  { href: "/coupes", label: "Coupes" },
  { href: "/morphologies", label: "Morphologies" },
  { href: "/showroom", label: "Showroom" },
  { href: "/a-propos", label: "La maison" },
];

const MENU = [
  { href: "/", label: "Accueil" },
  { href: "/robes", label: "Toutes les robes" },
  { href: "/coupes", label: "Les coupes" },
  { href: "/morphologies", label: "Les morphologies" },
  /* Celle-ci n'a pas d'adresse : elle ouvre Élise. La maison, s'il y en a
   * une, vient de la page où l'on se trouve. */
  { href: "", label: "Trouver ma robe" },
  { href: "/showroom", label: "Le showroom" },
  { href: "/a-propos", label: "La maison" },
  { href: "/rendez-vous", label: "Prendre rendez-vous" },
];

export default function Entete() {
  const chemin = usePathname();
  const [pose, setPose] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  /* L'entrée dont le panneau est déplié. */
  const [mega, setMega] = useState<string | null>(null);

  /* L'accueil est la seule page qui commence par une image plein cadre. */
  const surImage = chemin === "/" && !pose && !ouvert && !mega;

  useEffect(() => {
    const surScroll = () => setPose(window.scrollY > 24);
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    return () => window.removeEventListener("scroll", surScroll);
  }, []);

  useEffect(() => {
    setOuvert(false);
    setMega(null);
  }, [chemin]);

  /* Échap referme le panneau, comme il referme le menu. */
  useEffect(() => {
    if (!mega) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(null);
    };
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, [mega]);

  useEffect(() => {
    document.documentElement.style.overflow = ouvert ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [ouvert]);

  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, []);

  /* Ouvrir Élise depuis le menu ferme le menu : deux plein-écrans
   * superposés, c'est un de trop. */
  useEffect(() => {
    const fermer = () => setOuvert(false);
    window.addEventListener("elise:ouvrir", fermer);
    return () => window.removeEventListener("elise:ouvrir", fermer);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setMega(null)}>
        {/* Le bandeau. Toujours blanc, toujours discret. */}
        <div className="hidden h-[var(--barre)] items-center justify-between border-b border-fil bg-blanc text-encre md:flex gouttiere">
          <ul className="flex items-center gap-7">
            {CREATEURS.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/createurs/${c.slug}`}
                  className="mention souligne text-plomb hover:text-encre"
                >
                  {c.nom}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-7">
            <span className="mention text-plomb">
              {MAISON.adresse}, {MAISON.ville} {MAISON.codePostal.slice(-2)}e
            </span>
            <a href={MAISON.telephoneHref} className="mention souligne text-encre">
              {MAISON.telephone}
            </a>
          </div>
        </div>

        {/* La barre principale. */}
        <div
          className={`transition-[background-color,color,box-shadow] duration-700 [transition-timing-function:var(--ease-doux)] ${
            surImage
              ? "bg-transparent text-blanc"
              : "bg-blanc text-encre shadow-[0_1px_0_var(--color-fil)]"
          }`}
        >
          <div className="gouttiere flex h-[var(--entete)] items-center justify-between gap-8">
            {/* Le logo et la navigation forment un seul groupe, à gauche. */}
            <div className="flex items-center gap-10 lg:gap-14">
              <Link href="/" aria-label="MADAMOON, accueil" className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ressource(surImage ? "/marque/logo-blanc.png" : "/marque/logo-encre.png")}
                  alt="MADAMOON"
                  width={513}
                  height={56}
                  className="h-[0.9rem] w-auto md:h-[1.05rem]"
                />
              </Link>

              <nav aria-label="Principale" className="hidden lg:block">
                <ul className="flex items-center gap-8">
                  {LIENS.map((l) => {
                    const groupe = GROUPES[l.href];
                    return (
                      <li
                        key={l.label}
                        onMouseEnter={() => setMega(groupe ? l.href : null)}
                      >
                        <Link
                          href={l.href}
                          data-actif={chemin === l.href}
                          /* L'entrée reste un lien : elle mène à sa page
                            * d'index. Le panneau ne fait que devancer le
                            * clic — il ne le remplace pas. */
                          onFocus={() => setMega(groupe ? l.href : null)}
                          aria-expanded={groupe ? mega === l.href : undefined}
                          aria-controls={groupe ? "mega-navigation" : undefined}
                          className="lien-nav souligne"
                        >
                          {l.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-5 md:gap-7">
              <Link
                href="/rendez-vous"
                className={`hidden lien-nav souligne sm:inline-block ${
                  surImage ? "" : "text-action"
                }`}
              >
                Rendez-vous
              </Link>
              <button
                type="button"
                onClick={() => setOuvert(true)}
                className="lien-nav flex items-center gap-2"
                aria-expanded={ouvert}
                aria-controls="menu-principal"
              >
                <span aria-hidden="true" className="flex flex-col gap-[3px]">
                  <span className="block h-px w-4 bg-current" />
                  <span className="block h-px w-4 bg-current" />
                </span>
                Menu
              </button>
            </div>
          </div>
        </div>

        {/* ————————————————————————————— le panneau ————— */}
        {mega && GROUPES[mega] && (
          <div
            id="mega-navigation"
            className="hidden border-b border-fil bg-blanc text-encre lg:block"
          >
            <div className="gouttiere py-[clamp(1.75rem,3vw,2.75rem)]">
              <p className="legende">{GROUPES[mega].intitule}</p>
              <ul className="mt-6 grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-5 md:grid-cols-3">
                {GROUPES[mega].liens.map((x) => (
                  <li key={x.href}>
                    <Link href={x.href} className="group block">
                      <span className="block font-serif text-[1.375rem] leading-tight text-encre transition-colors duration-500 group-hover:text-action">
                        {x.nom}
                      </span>
                      {x.note && <span className="texte mt-1 block text-plomb">{x.note}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      {/* Le menu : une page blanche, quelques lignes, rien d'autre. */}
      <div
        id="menu-principal"
        hidden={!ouvert}
        className="fixed inset-0 z-[60] bg-blanc"
      >
        <div className="gouttiere flex h-[var(--entete)] items-center justify-between md:h-[calc(var(--barre)+var(--entete))]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ressource("/marque/logo-encre.png")}
            alt="MADAMOON"
            width={513}
            height={56}
            className="h-[0.9rem] w-auto md:h-[1.05rem]"
          />
          <button type="button" onClick={() => setOuvert(false)} className="lien-nav text-encre">
            Fermer
          </button>
        </div>
        <div className="gouttiere flex h-[calc(100svh-var(--entete))] flex-col justify-center gap-6 md:h-[calc(100svh-var(--barre)-var(--entete))]">
          <nav aria-label="Menu">
            <ul className="flex flex-col gap-1">
              {MENU.map((l) => {
                const habits =
                  "nom-image block py-1 text-left text-encre transition-colors duration-500 hover:text-action";
                return (
                  <li key={l.label}>
                    {l.href ? (
                      <Link href={l.href} className={habits}>
                        {l.label}
                      </Link>
                    ) : (
                      <AppelElise className={habits}>{l.label}</AppelElise>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Les maisons. Le bandeau qui les porte est masqué sous 768 px :
            * sans cette liste, leurs pages seraient hors d'atteinte au
            * doigt. */}
          <p className="legende mt-8">Les maisons</p>
          <ul className="mt-2 flex flex-col gap-1">
            {CREATEURS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/createurs/${c.slug}`}
                  className="mention block py-1 text-plomb transition-colors duration-500 hover:text-action"
                >
                  {c.nom}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-1">
            <a href={MAISON.telephoneHref} className="legende text-encre">
              {MAISON.telephone}
            </a>
            <span className="legende">
              {MAISON.adresse} — {MAISON.codePostal} {MAISON.ville}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
