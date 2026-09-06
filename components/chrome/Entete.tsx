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

/*
 * Les entrées se répartissent de part et d'autre du logo.
 *
 * À gauche ce qui sert à chercher une robe — les robes, les coupes, les
 * morphologies : c'est le même chemin que raconte l'accueil. À droite ce
 * qui parle du lieu et de la maison.
 *
 * Les morphologies restent à gauche avec les deux autres. Elles ne
 * figuraient pas dans la répartition demandée, mais les retirer de la
 * barre irait contre la demande précédente de les y mettre, et elles ont
 * plus à voir avec les coupes qu'avec le showroom.
 */
const GAUCHE = [
  { href: "/robes", label: "Robes de mariée" },
  { href: "/coupes", label: "Coupes" },
  { href: "/morphologies", label: "Morphologies" },
];

const DROITE = [
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
          {/*
            * La barre : le menu à gauche, le logo au centre, le
            * rendez-vous à droite. Les entrées se rangent de part et
            * d'autre du logo et le touchent presque — ce sont elles qui
            * l'encadrent, pas les extrémités de la page.
            *
            * Le logo est centré à la page, pas entre les deux groupes :
            * ceux-ci n'ont pas la même largeur — le bouton rouge pèse
            * plus que le mot « Menu » — et un centrage par colonnes
            * souples le décalait de vingt-cinq pixels sur téléphone. Il
            * est donc posé au milieu, en propre, et les deux groupes se
            * rangent de part et d'autre.
            */}
          <nav
            aria-label="Principale"
            className="gouttiere relative flex h-[var(--entete)] items-center justify-between gap-6"
          >
            {/* ————— à gauche : le menu, puis les entrées ————— */}
            <div className="flex min-w-0 items-center gap-6">
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
                <span className="max-sm:sr-only">Menu</span>
              </button>

              <ul className="ml-auto hidden items-center gap-8 lg:flex">
                {GAUCHE.map((l) => {
                  const groupe = GROUPES[l.href];
                  return (
                    <li key={l.label} onMouseEnter={() => setMega(groupe ? l.href : null)}>
                      <Link
                        href={l.href}
                        data-actif={chemin === l.href}
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
            </div>

            {/* ————— au centre : la marque ————— */}
            <Link
              href="/"
              aria-label="MADAMOON, accueil"
              /* Centré au milieu de la page à partir de trois cent
                * soixante-huit pixels. En dessous, la moitié du sigle
                * plus le bouton rouge dépassent la demi-largeur moins la
                * gouttière : le centrage ferait forcément un
                * chevauchement. Les trois éléments se répartissent alors
                * simplement, ce qui reste juste et ne casse rien. */
              className="min-[368px]:absolute min-[368px]:left-1/2 min-[368px]:top-1/2 min-[368px]:-translate-x-1/2 min-[368px]:-translate-y-1/2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ressource(surImage ? "/marque/logo-blanc.png" : "/marque/logo-encre.png")}
                alt="MADAMOON"
                width={513}
                height={56}
                /* Le sigle rapetisse sous six cent quarante pixels : au
                  * centre exact, il touchait le bouton rouge de six
                  * pixels sur un téléphone. */
                className="h-[0.75rem] w-auto sm:h-[0.9rem] md:h-[1.05rem]"
              />
            </Link>

            {/* ————— à droite : les entrées, puis le rendez-vous ————— */}
            <div className="flex min-w-0 items-center justify-end gap-6">
              <ul className="hidden items-center gap-8 lg:flex">
                {DROITE.map((l) => {
                  const groupe = GROUPES[l.href];
                  return (
                    <li key={l.label} onMouseEnter={() => setMega(groupe ? l.href : null)}>
                      <Link
                        href={l.href}
                        data-actif={chemin === l.href}
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

              {/* Le même bouton rouge que dans le hero. */}
              <Link href="/rendez-vous" className="bouton bouton-barre ml-auto shrink-0">
                Rendez-vous
              </Link>
            </div>
          </nav>
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
