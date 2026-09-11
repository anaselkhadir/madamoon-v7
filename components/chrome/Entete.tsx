"use client";

import Link from "@/components/Lien";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MAISON, CREATEURS, MORPHOLOGIES, ROBES, CATEGORIES } from "@/lib/madamoon";
import { COUPES, coupe as familleDeCoupe } from "@/lib/coupes";
import { media as ressource } from "@/lib/chemin";
import AppelElise from "@/components/AppelElise";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import Panier from "@/components/chrome/Panier";
import Commutateur from "@/components/chrome/Langue";
import Theme from "@/components/chrome/Theme";
import Logo from "@/components/chrome/Logo";
import { langueDe, versFrancais, type Langue } from "@/lib/langue";
import { coupeNom, coupeNote, createurOrigine, morphoNom, morphoObjectif } from "@/lib/contenu";
import { t } from "@/lib/textes";

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
type Groupes = Record<
  string,
  { intitule: string; colonnes: number; liens: { href: string; nom: string; note?: string }[] }
>;

/* Les tables sont des fonctions de la langue : elles portent des mots,
 * et des mots ne peuvent plus être des constantes de module. */
const tableGroupes = (l: Langue): Groupes => {
  const L = t(l);
  return {
    "/robes": {
      intitule: L.barre.parMaison,
      colonnes: 3,
      liens: [
        { href: "/robes", nom: L.barre.toutesRobes, note: L.barre.catalogueEntier },
        ...CREATEURS.map((c) => ({
          href: `/createurs/${c.slug}`,
          nom: c.nom,
          note: createurOrigine(c, l),
        })),
      ],
    },
    "/coupes": {
      intitule: L.barre.sixCoupes,
      colonnes: 3,
      liens: COUPES.map((c) => ({
        href: `/coupes/${c.ancre}`,
        nom: coupeNom(c, l),
        note: coupeNote(c, l),
      })),
    },
    "/morphologies": {
      intitule: L.barre.sixMorphologies,
      colonnes: 3,
      liens: MORPHOLOGIES.map((m) => ({
        href: `/morphologies/${m.lettre.toLowerCase()}`,
        nom: morphoNom(m, l),
        note: morphoObjectif(m, l),
      })),
    },
  };
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
const tableGauche = (l: Langue) => [
  { href: "/robes", label: t(l).barre.robes },
  { href: "/coupes", label: t(l).barre.coupes },
  { href: "/morphologies", label: t(l).barre.morphologies },
];

const tableDroite = (l: Langue) => [
  { href: "/showroom", label: t(l).barre.showroom },
  { href: "/a-propos", label: t(l).barre.maison },
];

/*
 * Le menu montre le catalogue, pas la barre.
 *
 * Répéter les entrées de la navigation ne servait à rien : elles sont
 * déjà là, à trois centimètres. Le menu donne donc ce que la barre ne
 * peut pas donner — les robes elles-mêmes, par leur nom, rangées par
 * maison ou par coupe. C'est ce que font les maisons qui vendent
 * vraiment : on y entre par un modèle, pas par une rubrique.
 *
 * Les liens de rubrique restent en bas, en petit. Sous mille vingt-quatre
 * pixels la barre ne montre plus que le sigle et le rendez-vous : sans
 * eux, le showroom et la maison seraient hors d'atteinte au doigt.
 */
const tableRaccourcis = (l: Langue) => {
  const R = t(l).raccourcis;
  return [
    { href: "/robes", label: R.toutesRobes },
    { href: "/coupes", label: R.lesCoupes },
    { href: "/morphologies", label: R.lesMorphologies },
    { href: "", label: R.trouverMaRobe },
    { href: "/showroom", label: R.leShowroom },
    { href: "/a-propos", label: R.laMaison },
    { href: "/rendez-vous", label: R.prendreRendezvous },
  ];
};

/*
 * Les trois onglets du téléphone.
 *
 * Un menu de grande maison ne pose pas cinq rubriques à plat : il
 * range le catalogue derrière deux ou trois entrées et déplie l'une
 * d'elles. On garde ici les trois axes par lesquels le site fait
 * chercher — la robe, la coupe, la silhouette — et le showroom et la
 * maison se lisent dessous, où l'on regarde quand on a fini de chercher.
 */
const tableOnglets = (l: Langue) => [
  {
    cle: "robes",
    label: t(l).barre.robes,
    liens: () => [
      { href: "/robes", label: t(l).barre.toutesRobes },
      ...CREATEURS.map((c) => ({ href: `/createurs/${c.slug}`, label: c.nom })),
    ],
  },
  {
    cle: "coupes",
    label: t(l).barre.coupes,
    liens: () => [
      { href: "/coupes", label: t(l).barre.sixCoupes },
      ...COUPES.map((c) => ({ href: `/coupes/${c.ancre}`, label: coupeNom(c, l) })),
    ],
  },
  {
    cle: "morphologies",
    label: t(l).barre.morphologies,
    liens: () => [
      { href: "/morphologies", label: t(l).barre.sixMorphologies },
      ...MORPHOLOGIES.map((m) => ({
        href: `/morphologies/${m.lettre.toLowerCase()}`,
        label: morphoNom(m, l),
      })),
    ],
  },
] as const;

/* Les adresses que les onglets du téléphone portent déjà. */
const SECTIONS = new Set([
  "/robes", "/coupes", "/morphologies",
  "/showroom", "/a-propos",
]);

type Groupe = { titre: string; href: string; robes: (typeof ROBES)[number][] };

/* Par maison. Les modèles dont la maison n'est pas renseignée finissent
 * dans un dernier groupe : les taire reviendrait à les retirer du
 * catalogue. */
function parCreateur(): Groupe[] {
  const groupes = CREATEURS.map((c) => ({
    titre: c.nom,
    href: `/createurs/${c.slug}`,
    robes: ROBES.filter((r) => r.createur === c.nom),
  })).filter((g) => g.robes.length > 0);
  const orphelines = ROBES.filter((r) => !r.createur);
  if (orphelines.length > 0) {
    groupes.push({ titre: "Autres modèles", href: "/robes", robes: orphelines });
  }
  return groupes;
}

function parCoupe(): Groupe[] {
  return CATEGORIES.map((c) => ({
    titre: c,
    href: `/coupes/${familleDeCoupe(c).ancre}`,
    robes: ROBES.filter((r) => r.categorie === c),
  })).filter((g) => g.robes.length > 0);
}

export default function Entete() {
  const chemin = usePathname();
  const [onglet, setOnglet] = useState<"robes" | "coupes" | "morphologies">("robes");
  /* Le gabarit ne reçoit pas de propriété : il lit la langue sur
   * l'adresse, comme il lit déjà la page courante. */
  const l = langueDe(chemin ?? "/");
  /* Les comparaisons d'adresse se font dans l'espace français : les
   * tables de navigation portent des adresses françaises, et « /en/
   * dresses » ne s'est jamais égalé à « /robes ». Sans cela, la barre
   * de l'accueil anglais devenait blanche au lieu de rester sur la
   * vidéo, et aucune entrée ne se marquait comme active. */
  const cheminFr = versFrancais(chemin ?? "/");
  const L = t(l);
  const GRP = tableGroupes(l);
  const GCH = tableGauche(l);
  const DRT = tableDroite(l);
  const RCC = tableRaccourcis(l);
  const ONG = tableOnglets(l);
  const [pose, setPose] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  /* L'entrée dont le panneau est déplié. */
  const [mega, setMega] = useState<string | null>(null);
  /* Comment le menu range les robes. */
  const [classement, setClassement] = useState<"createur" | "coupe">("createur");
  /* Les groupes se recalculent au changement de classement, jamais à
   * chaque rendu : la liste ne bouge pas, elle vient des données. */
  const groupes = useMemo(
    () => (classement === "createur" ? parCreateur() : parCoupe()),
    [classement]
  );

  /*
   * Les pages qui s'ouvrent sur une image plein cadre.
   *
   * L'accueil, et les quatre familles qui portent un premier écran
   * photographique : la fiche d'une robe, une coupe, une morphologie,
   * une maison. La barre s'y pose dessus, et reprend son fond dès le
   * premier défilement — comme sur l'accueil.
   *
   * Les pages de liste — « /robes », « /coupes », « /morphologies » —
   * en sont exclues : elles commencent sur du papier, et une barre
   * transparente y poserait du blanc sur du blanc. La barre oblique
   * finale du préfixe suffit à les écarter, « versFrancais » ayant
   * retiré celle des adresses.
   */
  const OUVERTURES = ["/robes/", "/coupes/", "/morphologies/", "/createurs/"];
  const surPhoto = cheminFr === "/" || OUVERTURES.some((p) => cheminFr.startsWith(p));
  const surImage = surPhoto && !pose && !ouvert && !mega;

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
              ? "bg-transparent text-sur-image"
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
            aria-label={L.barre.principale}
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
                {L.barre.menu}
              </button>

              <ul className="ml-auto hidden items-center gap-8 lg:flex">
                {GCH.map((l) => {
                  const groupe = GRP[l.href];
                  return (
                    <li key={l.label} onMouseEnter={() => setMega(groupe ? l.href : null)}>
                      <Link
                        href={l.href}
                        data-actif={cheminFr === l.href}
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
              aria-label={L.barre.accueil}
              /* Centré au milieu de la page, à toutes les largeurs. Le
                * seuil qui existait ici n'a plus lieu d'être : le bouton
                * rouge, seul à disputer la place au sigle, ne paraît plus
                * sur téléphone. */
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Logo surImage={surImage} className="h-[0.75rem] w-auto sm:h-[0.9rem] md:h-[1.05rem]" />
            </Link>

            {/* ————— à droite : les entrées, puis le rendez-vous ————— */}
            <div className="flex min-w-0 items-center justify-end gap-6">
              <ul className="hidden items-center gap-8 lg:flex">
                {DRT.map((l) => {
                  const groupe = GRP[l.href];
                  return (
                    <li key={l.label} onMouseEnter={() => setMega(groupe ? l.href : null)}>
                      <Link
                        href={l.href}
                        data-actif={cheminFr === l.href}
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

              {/* Le même bouton rouge que dans le hero. Il ne paraît pas
                * sur téléphone : le menu et le pied de page y mènent
                * déjà, et il y prenait le tiers de la barre.
                *
                * C'est l'enveloppe que l'on masque, pas le bouton :
                * « .bouton » pose son « display » hors calque et
                * l'emporterait sur l'utilitaire. */}
              {/* Les coups de cœur, à droite, sur tous les écrans : c'est
                * le seul endroit où la visiteuse retrouve ce qu'elle a
                * aimé, et le seul que le téléphone garde en vue. */}
              <Panier />

              {/* La langue, juste après le cœur : deux lettres, pas un
                * drapeau — un drapeau désigne un pays, pas une langue. */}
              <Commutateur />

              {/* L'apparence, juste après la langue : deux réglages de la
                * visiteuse, rangés ensemble. Sur téléphone il rejoint le
                * bas du menu — la barre n'a pas la place. */}
              <span className="hidden lg:block">
                <Theme classe="px-1" />
              </span>

              <span className="hidden shrink-0 md:block">
                <AppelRendezvous className="bouton bouton-barre">
                  {L.barre.rendezvous}
                </AppelRendezvous>
              </span>
            </div>
          </nav>
        </div>

        {/* ————————————————————————————— le panneau ————— */}
        {mega && GRP[mega] && (
          <div
            id="mega-navigation"
            className="hidden border-b border-fil bg-blanc text-encre lg:block"
          >
            <div className="gouttiere py-[clamp(1.75rem,3vw,2.75rem)]">
              <p className="legende">{GRP[mega].intitule}</p>
              <ul className="mt-6 grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-5 md:grid-cols-3">
                {GRP[mega].liens.map((x) => (
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

      {/*
        * Le menu : une page blanche, quelques lignes, rien d'autre.
        *
        * Une colonne : la ligne du sigle en haut, qui ne se comprime
        * jamais, puis le reste qui prend ce qui demeure et défile s'il ne
        * tient pas. Le contenu était auparavant centré dans une hauteur
        * fixe : sur une fenêtre large et basse, les intitulés montent à
        * quarante-huit pixels et le bloc dépassait des deux côtés — le
        * premier lien passait sur le sigle, le dernier sortait de
        * l'écran, et rien ne défilait.
        */}
      <div
        id="menu-principal"
        hidden={!ouvert}
        className="fixed inset-0 z-[60] flex flex-col bg-blanc"
      >
        <div className="gouttiere flex h-[var(--entete)] shrink-0 items-center justify-between md:h-[calc(var(--barre)+var(--entete))]">
          <Logo className="h-[0.9rem] w-auto md:h-[1.05rem]" />
          <button type="button" onClick={() => setOuvert(false)} className="lien-nav text-encre">
            {L.barre.fermer}
          </button>
        </div>
        {/* « min-h-full » sur le bloc intérieur : il se centre tant qu'il
          * tient, et pousse la barre de défilement dès qu'il déborde. */}
        <div className="gouttiere flex-1 overflow-y-auto overscroll-contain">
          {/* Le bloc ne se centre plus : un catalogue se lit du haut. */}
          <div className="flex min-h-full flex-col py-[clamp(1.5rem,3vw,2.5rem)]">
            {/*
              * ————— sur téléphone : trois onglets —————
              *
              * Le catalogue entier est une réponse de grand écran : six
              * colonnes de noms qu'on embrasse d'un coup d'œil. Sous le
              * pouce, il devenait une liste de soixante lignes à faire
              * défiler pour atteindre « Showroom ».
              *
              * Trois onglets, et l'un d'eux déplié : c'est la forme que
              * prennent les menus des grandes maisons, et elle tient
              * dans un écran sans jamais rien cacher.
              */}
            <div className="lg:hidden">
              <div
                role="tablist"
                aria-label={L.barre.catalogue}
                className="flex items-center gap-7 border-b border-fil"
              >
                {ONG.map((o) => (
                  <button
                    key={o.cle}
                    type="button"
                    role="tab"
                    aria-selected={onglet === o.cle}
                    aria-controls={`onglet-${o.cle}`}
                    onClick={() => setOnglet(o.cle)}
                    /* Le trait sous l'onglet actif est porté par le bouton
                      * lui-même : une bordure sur un pseudo-élément
                      * sauterait d'un pixel au changement de graisse. */
                    className={`-mb-px border-b py-3 text-[0.8125rem] uppercase leading-none tracking-[0.08em] transition-colors duration-500 ${
                      onglet === o.cle
                        ? "border-encre font-bold text-encre"
                        : "border-transparent text-brume"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              {ONG.map((o) => (
                <ul
                  key={o.cle}
                  id={`onglet-${o.cle}`}
                  role="tabpanel"
                  hidden={onglet !== o.cle}
                  className="pt-5"
                >
                  {o.liens().map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        data-actif={cheminFr === l.href}
                        className="block py-[0.52em] text-[0.9375rem] uppercase leading-none tracking-[0.06em] text-encre transition-colors duration-500 hover:text-action"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}

              {/* Le showroom et la maison : on les regarde quand on a fini
                * de chercher une robe. */}
              <ul className="mt-6 border-t border-fil pt-5">
                {DRT.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      data-actif={cheminFr === l.href}
                      className="block py-[0.52em] text-[0.9375rem] uppercase leading-none tracking-[0.06em] text-encre transition-colors duration-500 hover:text-action"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ————— le classement ————— */}
            <div className="hidden items-baseline gap-6 lg:flex" role="group" aria-label={L.barre.classer}>
              {(["createur", "coupe"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClassement(c)}
                  aria-pressed={classement === c}
                  className={`lien-nav souligne transition-colors duration-500 ${
                    classement === c ? "text-encre" : "text-brume hover:text-plomb"
                  }`}
                  data-actif={classement === c}
                >
                  {c === "createur" ? L.barre.parCreateur : L.barre.parCoupe}
                </button>
              ))}
            </div>

            {/* ————— le catalogue ————— */}
            <nav aria-label="Le catalogue" className="mt-[clamp(1.5rem,3vw,2.5rem)] max-lg:hidden">
              <div /* Six colonnes au plus large : les deux classements comptent
                  * six groupes — cinq maisons plus les modèles sans maison, et
                  * les six coupes. À cinq, le dernier retombait seul sur une
                  * ligne. */
                className="grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {groupes.map((g) => (
                  <div key={g.titre}>
                    <Link
                      href={g.href}
                      className="legende souligne block text-encre transition-colors duration-500 hover:text-action"
                    >
                      {g.titre}
                    </Link>
                    <ul className="mt-4 flex flex-col">
                      {g.robes.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={`/robes/${r.slug}`}
                            className="block py-[0.3rem] font-serif text-[1.0625rem] leading-tight text-plume transition-colors duration-500 hover:text-action"
                          >
                            {r.nom}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>

            {/* ————— les rubriques, en pied ————— */}
            <div className="mt-auto border-t border-fil pt-6">
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {RCC.map((l) => {
                  const habits =
                    "lien-nav souligne text-plomb transition-colors duration-500 hover:text-encre";
                  return (
                    <li
                      key={l.label}
                      /* Sur téléphone, la liste du haut porte déjà ces
                        * cinq-là : ne restent ici qu'Élise et le
                        * rendez-vous. */
                      className={SECTIONS.has(l.href) ? "hidden lg:block" : undefined}
                    >
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
              {/* L'apparence, au bas du menu : c'est là qu'on la cherche
                * sur un téléphone, la barre n'ayant pas la place. */}
              <div className="mt-6 flex items-center gap-3 lg:hidden">
                <span className="legende text-plomb">{L.theme.intitule}</span>
                {/* Le trait fait quinze pixels : la zone touchée, elle,
                  * doit rester visable au pouce. */}
                <Theme classe="-my-1 px-3 py-4" />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2">
                <a href={MAISON.telephoneHref} className="legende text-encre">
                  {MAISON.telephone}
                </a>
                <span className="legende">
                  {MAISON.adresse} — {MAISON.codePostal} {MAISON.ville}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
