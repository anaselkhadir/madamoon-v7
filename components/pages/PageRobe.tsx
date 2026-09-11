import Link from "@/components/Lien";
import { notFound } from "next/navigation";
import Photo from "@/components/media/Photo";
import Film from "@/components/media/Film";
import Tuile from "@/components/Tuile";
import Catalogue from "@/components/Catalogue";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import TitreSection from "@/components/TitreSection";
import {
  ROBES,
  FAMILLES,
  MAISON,
  MORPHOLOGIES,
  SITE_URL,
} from "@/lib/madamoon";
import { FILMS } from "@/lib/films";
import { SCENES, vues } from "@/lib/medias";
import { coupe, PLURIEL } from "@/lib/coupes";
import { altRobe } from "@/lib/alt";
import { de } from "@/lib/francais";
import { CoeurFiche } from "@/components/parcours/Coeur";
import { epingleRobe, offreRobe } from "@/lib/schema";

import type { Langue } from "@/lib/langue";
import { versLangue } from "@/lib/langue";
import { t } from "@/lib/textes";
import {
  coupeNom,
  coupePluriel,
  createurNote,
  maison,
  morphoNom,
  robeLigne,
  robeRegard,
} from "@/lib/contenu";

/*
 * La fiche d'une robe, dans les deux langues.
 *
 * Une seule page pour le français et l'anglais : la route passe la
 * langue, tout le reste est commun. Une fiche recopiée aurait divergé
 * au premier ajout.
 */

export default async function PageRobe({
  params,
  langue,
}: {
  params: Promise<{ slug: string }>;
  langue: Langue;
}) {
  const L = t(langue);
  const M = maison(langue);
  const { slug } = await params;
  const robe = ROBES.find((r) => r.slug === slug);
  if (!robe) notFound();

  const photos = vues(robe.slug);
  const film = FILMS[robe.slug];
  const famille = coupe(robe.categorie);
  const servies = robe.morphos ?? [];
  const voisines = ROBES.filter(
    (r) => r.categorie === robe.categorie && r.slug !== robe.slug,
  ).slice(0, 3);

  const donnees = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${L.pied.robeDeMariee} ${robe.nom}`,
    description: `${robeLigne(robe, langue)}. ${robeRegard(robe, langue)}`,
    url: `${SITE_URL}${versLangue(`/robes/${robe.slug}`, langue)}`,
    brand: { "@type": "Brand", name: robe.createur ?? MAISON.nom },
    category: `${L.pied.robeDeMariee} ${coupeNom(robe.categorie, langue).toLowerCase()}`,
    image: photos.map(
      (p) =>
        `${SITE_URL}/robes/${p.name}-${p.widths[p.widths.length - 1]}.webp`,
    ),
    /* La robe est vendue par la maison, et seulement par elle. Le vendeur
     * est désigné par l'identité déclarée dans le gabarit : c'est ce qui
     * relie chaque modèle au showroom du dixième. */
    offers: offreRobe(robe.slug),
  };

  const epingle = epingleRobe({
    slug: robe.slug,
    nom: robe.nom,
    ligne: robeLigne(robe, langue),
    regard: robeRegard(robe, langue),
    createur: robe.createur,
    media: photos[0],
    alt: altRobe(robe, langue),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      {/*
       * L'épingle Pinterest.
       *
       * Écrites ici plutôt que par l'API de Next : celle-ci ne sait pas
       * produire « og:type: product », et n'émet ses balises qu'avec
       * « name » là où le protocole demande « property ». React les
       * remonte dans l'en-tête depuis n'importe où dans l'arbre.
       *
       * Le prix est le plancher. La description dit « à partir de »,
       * parce qu'une épingle n'affiche qu'un nombre et qu'un nombre seul
       * se lirait comme un prix ferme.
       */}
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content={MAISON.nom} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:url" content={epingle.url} />
      <meta property="og:title" content={epingle.titre} />
      <meta property="og:description" content={epingle.description} />
      {epingle.image && (
        <>
          <meta property="og:image" content={epingle.image.url} />
          <meta property="og:image:secure_url" content={epingle.image.url} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta
            property="og:image:width"
            content={String(epingle.image.largeur)}
          />
          <meta
            property="og:image:height"
            content={String(epingle.image.hauteur)}
          />
          <meta property="og:image:alt" content={epingle.image.alt} />
        </>
      )}
      <meta property="product:price:amount" content={String(epingle.prix)} />
      <meta property="product:price:currency" content="EUR" />
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      <meta property="product:retailer_item_id" content={epingle.reference} />
      <meta
        property="product:category"
        content={`${L.pied.robeDeMariee} ${coupeNom(robe.categorie, langue).toLowerCase()}`}
      />
      {epingle.marque && (
        <meta property="product:brand" content={epingle.marque} />
      )}

      {/* ————————————————————————————— le premier écran —————
       * L'image plein cadre, et le nom posé dedans. Inchangé : c'est
       * l'entrée en matière du site, et elle fonctionne. */}
      <section className="relative h-[92svh] min-h-[32rem] overflow-hidden">
        {film ? (
          <Film
            src={film.src}
            affiche={SCENES[film.affiche]}
            alt={altRobe(robe, langue)}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          photos[0] && (
            <Photo
              media={photos[0]}
              dossier="robes"
              alt={altRobe(robe, langue)}
              sizes="100vw"
              priorite
              position="50% 30%"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.16) 46%, rgba(0,0,0,0) 76%)",
          }}
        />
        {/* Le voile du haut, celui des autres premiers écrans : la
          * barre de navigation s'y pose maintenant, et son sigle est
          * blanc. Sans lui, il tombait sur du tissu clair. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.14) 45%, rgba(0,0,0,0) 100%)",
          }}
        />
        {/* Le second voile, du bas vers le haut, et seulement sous le
          * pouce : le texte y descend, et il descend sur du gravier
          * clair. Le voile latéral, calculé pour une colonne de gauche,
          * n'y suffisait plus. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 56%)",
          }}
        />
        {/*
          * Sur petit écran le bloc se range en bas plutôt qu'au milieu.
          * Centré, il tombait en travers de la robe — le buste, la
          * coupe, tout ce que la visiteuse est venue voir. En bas, il
          * laisse la photographie entière au-dessus de lui.
          */}
        <div className="gouttiere absolute inset-0 flex flex-col justify-center max-md:justify-end max-md:pb-[clamp(2rem,7vw,3rem)]">
          <div className="max-w-[52vw] max-md:max-w-full">
            <p className="mention text-sur-image/85">
              {coupeNom(robe.categorie, langue)}
              {robe.createur ? ` — ${robe.createur}` : ""}
            </p>
            <h1 className="affiche mt-3 text-sur-image">{robe.nom}</h1>
            <p className="accroche mt-5 text-sur-image">
              {robeLigne(robe, langue)}
            </p>
            {/* Les trois sur une seule ligne, toujours : l'essayage
              * garde son intitulé, les deux autres tiennent dans leur
              * cercle. Le retour à la ligne cassait le rang et poussait
              * le cœur sous la photographie. */}
            <div className="mt-6 flex flex-wrap items-center gap-3 max-md:flex-nowrap max-md:gap-2">
              <AppelRendezvous robe={robe.slug} className="bouton-clair essentiel">
                {L.fiche.essayer}
              </AppelRendezvous>
              <Catalogue intitule={robe.nom} contexte={`robe:${robe.slug}`} langue={langue} pastille />
              {/* Le coup de cœur, au même rang : c'est le geste que l'on
               * fait avant de savoir si l'on prendra rendez-vous. */}
              <CoeurFiche slug={robe.slug} nom={robe.nom} pastille />
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————————————————— la fiche ————— */}
      <section
        aria-labelledby="fiche"
        className="gouttiere pb-[clamp(3rem,6vw,6rem)] pt-[clamp(3rem,5.5vw,5rem)]"
      >
        <h2 id="fiche" className="sr-only">
          {L.fiche.laFiche} {langue === "fr" ? de(robe.nom) : robe.nom}
        </h2>

        {/* Ce que l'on remarque en premier, à la taille d'une phrase. */}
        <span data-ligne className="mb-[clamp(2.5rem,5vw,4rem)] block">
          <p className="phrase mesure-l">{robeRegard(robe, langue)}</p>
        </span>

        <dl className="grid gap-x-[clamp(2rem,5vw,5rem)] border-t border-fil md:grid-cols-2">
          {/* Les silhouettes. La seule ligne qui ne soit pas un
           * renseignement — et la seule qui réponde à la question que
           * l'on se pose devant une robe. */}
          {servies.length > 0 && (
            <div className="border-b border-fil py-6 md:col-span-2">
              <dt className="legende">{L.fiche.silhouettes}</dt>
              <dd className="mt-4">
                <ul className="flex flex-wrap items-baseline gap-x-[clamp(1rem,2.4vw,2rem)] gap-y-3">
                  {MORPHOLOGIES.map((m) => {
                    const servie = servies.includes(m.lettre);
                    return (
                      <li key={m.lettre}>
                        {servie ? (
                          <Link
                            href={`/morphologies/${m.lettre.toLowerCase()}`}
                            className="block font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] leading-none text-encre transition-colors duration-500 hover:text-action"
                          >
                            {m.lettre}
                            <span className="sr-only">
                              {" "}
                              — {morphoNom(m, langue)}
                            </span>
                          </Link>
                        ) : (
                          <span
                            aria-hidden="true"
                            className="block font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] leading-none text-fil"
                          >
                            {m.lettre}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="texte mt-4">
                  {servies.length === MORPHOLOGIES.length
                      ? L.fiche.toutesSilhouettes
                      : L.fiche.silhouettesServies(servies.join(", "))}
                </p>
              </dd>
            </div>
          )}

          <div className="border-b border-fil py-5">
            <dt className="legende">{L.fiche.coupe}</dt>
            <dd className="texte mt-2">
              <Link href={`/coupes/${famille.ancre}`} className="souligne">
                {coupeNom(robe.categorie, langue)}
              </Link>
              {" — "}
              {FAMILLES[robe.categorie].charAt(0).toLowerCase() +
                FAMILLES[robe.categorie].slice(1)}
            </dd>
          </div>

          {robe.createur && (
            <div className="border-b border-fil py-5">
              <dt className="legende">{L.fiche.maison}</dt>
              <dd className="texte mt-2">{robe.createur}</dd>
            </div>
          )}

          <div className="border-b border-fil py-5">
            <dt className="legende">{L.fiche.confection}</dt>
            <dd className="texte mt-2">{L.fiche.surMesure}</dd>
          </div>

          <div className="border-b border-fil py-5">
            <dt className="legende">{L.fiche.aPartirDe}</dt>
            <dd className="texte mt-2">{M.prixDepart}</dd>
          </div>
        </dl>
      </section>

      {/* ————————————————————————————— les autres vues ————— */}
      {photos.length > 1 && (
        <section
          aria-label={L.fiche.autresVues(robe.nom)}
          className="gouttiere"
        >
          <div className="grid gap-[clamp(1rem,2.5vw,2.5rem)] md:grid-cols-[1.15fr_0.85fr]">
            {photos.slice(1).map((p, i) => (
              <div
                key={p.name}
                data-rideau
                data-retard={(i % 2) * 120}
                /* En quinconce : la colonne de droite descend d'un quart
                 * de sa hauteur. Deux images alignées feraient planche
                 * contact ; décalées, elles se lisent l'une après
                 * l'autre. */
                className={`relative overflow-hidden ${
                  i % 2 === 1 ? "md:mt-[8%]" : ""
                } ${i % 2 === 1 ? "aspect-[4/5]" : "aspect-[5/6]"}`}
              >
                <Photo
                  media={p}
                  dossier="robes"
                  alt={altRobe(robe, langue, i + 2)}
                  sizes="(max-width: 768px) 92vw, 46vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/*
       * La bande « … vous attend au showroom » est retirée.
       *
       * Le rendez-vous est déjà proposé trois fois sur cette page : sur
       * la photographie d'ouverture, dans la barre de navigation, et
       * dans la carte qui suit le défilement. Une quatrième invitation
       * n'ajoutait rien, sinon un écran de craie entre les
       * photographies et les robes voisines. Le numéro se lit dans le
       * bandeau et au pied de page.
       */}

      {/* ————————————————————————————— les voisines ————— */}
      {voisines.length > 0 && (
        <section aria-labelledby="voisines">
          <TitreSection
            id="voisines"
            titre={L.fiche.memeFamille}
            lien={{
              href: `/coupes/${famille.ancre}`,
              label: L.fiche.toutesLes(coupePluriel(robe.categorie, langue)),
            }}
          />
          <div className="gouttiere pb-[clamp(3rem,5.5vw,5rem)]">
            <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
              {voisines.map((v, i) => {
                const media = vues(v.slug)[0];
                if (!media) return null;
                return (
                  <Tuile
                    key={v.slug}
                    retard={i * 70}
                    href={`/robes/${v.slug}`}
                    coupDeCoeur={v.slug}
                    media={media}
                    dossier="robes"
                    alt={altRobe(v, langue)}
                    nom={v.nom}
                    note={robeLigne(v, langue)}
                    sizes="(max-width: 768px) 50vw, 31vw"
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
