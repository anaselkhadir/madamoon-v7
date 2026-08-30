"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MAISON, CREATEURS } from "@/lib/madamoon";
import { media as ressource } from "@/lib/chemin";

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
 */

const LIENS = [
  { href: "/robes", label: "Robes de mariée" },
  { href: "/trouver-ma-robe", label: "Silhouettes" },
  { href: "/showroom", label: "Showroom" },
  { href: "/a-propos", label: "La maison" },
];

const MENU = [
  { href: "/", label: "Accueil" },
  { href: "/robes", label: "Toutes les robes" },
  { href: "/trouver-ma-robe", label: "Trouver ma robe" },
  { href: "/showroom", label: "Le showroom" },
  { href: "/a-propos", label: "La maison" },
  { href: "/rendez-vous", label: "Prendre rendez-vous" },
];

export default function Entete() {
  const chemin = usePathname();
  const [pose, setPose] = useState(false);
  const [ouvert, setOuvert] = useState(false);

  /* L'accueil est la seule page qui commence par une image plein cadre. */
  const surImage = chemin === "/" && !pose && !ouvert;

  useEffect(() => {
    const surScroll = () => setPose(window.scrollY > 24);
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    return () => window.removeEventListener("scroll", surScroll);
  }, []);

  useEffect(() => setOuvert(false), [chemin]);

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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Le bandeau. Toujours blanc, toujours discret. */}
        <div className="hidden h-[var(--barre)] items-center justify-between border-b border-fil bg-blanc text-encre md:flex gouttiere">
          <ul className="flex items-center gap-7">
            {CREATEURS.slice(0, 4).map((c) => (
              <li key={c.nom}>
                <Link href="/robes" className="mention souligne text-plomb hover:text-encre">
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
                  {LIENS.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        data-actif={chemin === l.href}
                        className="lien-nav souligne"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
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
              {MENU.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="nom-image block py-1 text-encre transition-colors duration-500 hover:text-action"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
