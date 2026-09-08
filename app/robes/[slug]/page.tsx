import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/media/Photo";
import Film from "@/components/media/Film";
import Tuile from "@/components/Tuile";
import Catalogue from "@/components/Catalogue";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import TitreSection from "@/components/TitreSection";
import { ROBES, FAMILLES, MAISON, MORPHOLOGIES, SITE_URL } from "@/lib/madamoon";
import { FILMS } from "@/lib/films";
import { SCENES, vues } from "@/lib/medias";
import { coupe, PLURIEL } from "@/lib/coupes";
import { altRobe } from "@/lib/alt";
import { epingleRobe, offreRobe } from "@/lib/schema";

/*
 * La fiche d'une robe.
 *
 * Elle ne s'ouvre plus sur une bannière. Les pages de coupe, de maison et
 * de morphologie le font déjà ; c'est leur rôle d'annoncer un univers.
 * Une robe, elle, se regarde — et la façon de la regarder en boutique
 * c'est de la voir entière, posée, avec de l'air autour.
 *
 * D'où la composition : la photographie tient une colonne haute et
 * étroite, le nom vient mordre son bord, et tout le reste est du texte
 * fin. Le chevauchement du titre sur l'image est le seul geste graphique
 * de la page — il suffit, parce qu'il ne se produit qu'une fois.
 *
 * La fiche technique n'est pas un tableau : c'est une liste de filets,
 * lue de haut en bas, où la seule ligne qui ne soit pas un renseignement
 * est celle des silhouettes. Les six lettres y reprennent le motif de
 * l'accueil : celles que la robe sert sont à l'encre, les autres au fil.
 * C'est la seule donnée de cette page qui vienne des fiches produit de la
 * cliente, et c'est aussi la seule qui réponde à la question qu'on se
 * pose vraiment devant une robe.
 *
 * Les autres vues se lisent en quinconce, jamais alignées : deux colonnes
 * de largeurs inégales, la seconde décalée vers le bas. Une grille
 * régulière ferait catalogue.
 */

export function generateStaticParams() {
  return ROBES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const robe = ROBES.find((r) => r.slug === slug);
  if (!robe) return {};

  const epingle = epingleRobe({
    slug: robe.slug,
    nom: robe.nom,
    ligne: robe.ligne,
    regard: robe.regard,
    createur: robe.createur,
    media: vues(robe.slug)[0],
    alt: altRobe(robe),
  });

  return {
    title: `Robe de mariée ${robe.nom} — ${robe.ligne}`,
    description: `${robe.nom} : ${robe.ligne.toLowerCase()}. ${robe.regard} À essayer sur rendez-vous au showroom MADAMOON, Paris 10e.`,
    alternates: { canonical: `/robes/${robe.slug}` },
    /*
     * L'Open Graph du gabarit est écarté ici, et réécrit dans la page.
     *
     * Une épingle enrichie demande « og:type: product », que l'API de
     * Next ne sait pas produire — son type n'accepte que « website »,
     * « article » et quelques autres. Laisser l'héritage en place
     * donnerait deux « og:type » contradictoires sur la même page ; on le
     * coupe donc, et l'on écrit les balises à la main, avec « property »
     * comme le veut le protocole.
     *
     * La carte Twitter, elle, doit être écrite : Next la déduisait de
     * l'Open Graph hérité, et la couper la faisait disparaître. On la
     * reprend en grand format, ce qui vaut mieux qu'une vignette pour une
     * robe entière.
     */
    openGraph: null,
    twitter: {
      card: "summary_large_image",
      title: epingle.titre,
      description: epingle.description,
      images: epingle.image ? [epingle.image.url] : undefined,
    },
  };
}

export default async function Fiche({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const robe = ROBES.find((r) => r.slug === slug);
  if (!robe) notFound();

  const photos = vues(robe.slug);
  const film = FILMS[robe.slug];
  const famille = coupe(robe.categorie);
  const servies = robe.morphos ?? [];
  const voisines = ROBES.filter(
    (r) => r.categorie === robe.categorie && r.slug !== robe.slug
  ).slice(0, 3);

  const donnees = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Robe de mariée ${robe.nom}`,
    description: `${robe.ligne}. ${robe.regard}`,
    url: `${SITE_URL}/robes/${robe.slug}`,
    brand: { "@type": "Brand", name: robe.createur ?? MAISON.nom },
    category: `Robe de mariée ${robe.categorie.toLowerCase()}`,
    image: photos.map((p) => `${SITE_URL}/robes/${p.name}-${p.widths[p.widths.length - 1]}.webp`),
    /* La robe est vendue par la maison, et seulement par elle. Le vendeur
      * est désigné par l'identité déclarée dans le gabarit : c'est ce qui
      * relie chaque modèle au showroom du dixième. */
    offers: offreRobe(robe.slug),
  };

  const epingle = epingleRobe({
    slug: robe.slug,
    nom: robe.nom,
    ligne: robe.ligne,
    regard: robe.regard,
    createur: robe.createur,
    media: photos[0],
    alt: altRobe(robe),
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
          <meta property="og:image:width" content={String(epingle.image.largeur)} />
          <meta property="og:image:height" content={String(epingle.image.hauteur)} />
          <meta property="og:image:alt" content={epingle.image.alt} />
        </>
      )}
      <meta property="product:price:amount" content={String(epingle.prix)} />
      <meta property="product:price:currency" content="EUR" />
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      <meta property="product:retailer_item_id" content={epingle.reference} />
      <meta property="product:category" content={`Robe de mariée ${robe.categorie.toLowerCase()}`} />
      {epingle.marque && <meta property="product:brand" content={epingle.marque} />}

      {/* ————————————————————————————— le premier écran —————
        * L'image plein cadre, et le nom posé dedans. Inchangé : c'est
        * l'entrée en matière du site, et elle fonctionne. */}
      <section className="relative h-[92svh] min-h-[32rem] overflow-hidden">
        {film ? (
          <Film
            src={film.src}
            affiche={SCENES[film.affiche]}
            alt={altRobe(robe)}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          photos[0] && (
            <Photo
              media={photos[0]}
              dossier="robes"
              alt={altRobe(robe)}
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
        <div className="gouttiere absolute inset-0 flex flex-col justify-center">
          <div className="max-w-[52vw] max-md:max-w-[92%]">
            <p className="mention text-blanc/85">
              {robe.categorie}
              {robe.createur ? ` — ${robe.createur}` : ""}
            </p>
            <h1 className="affiche mt-3 text-blanc">{robe.nom}</h1>
            <p className="accroche mt-5 text-blanc">{robe.ligne}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <AppelRendezvous robe={robe.slug} className="bouton-clair">
                L&apos;essayer au showroom
              </AppelRendezvous>
              <Catalogue intitule={robe.nom} contexte={`robe:${robe.slug}`} />
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
          La fiche de {robe.nom}
        </h2>

        {/* Ce que l'on remarque en premier, à la taille d'une phrase. */}
        <span data-ligne className="mb-[clamp(2.5rem,5vw,4rem)] block">
          <p className="phrase mesure-l">{robe.regard}</p>
        </span>

        <dl className="grid gap-x-[clamp(2rem,5vw,5rem)] border-t border-fil md:grid-cols-2">
          {/* Les silhouettes. La seule ligne qui ne soit pas un
            * renseignement — et la seule qui réponde à la question que
            * l'on se pose devant une robe. */}
          {servies.length > 0 && (
            <div className="border-b border-fil py-6 md:col-span-2">
              <dt className="legende">Les silhouettes qu&apos;elle sert</dt>
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
                            <span className="sr-only"> — {m.nom}</span>
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
                    ? "Elle va à toutes les silhouettes — c'est rare, et c'est ce qui en fait une valeur sûre à l'essayage."
                    : `Elle est d'abord conseillée aux silhouettes ${servies.join(", ")}. Rien n'empêche de l'essayer autrement : une morphologie ouvre des pistes, elle n'en ferme aucune.`}
                </p>
              </dd>
            </div>
          )}

          <div className="border-b border-fil py-5">
            <dt className="legende">La coupe</dt>
            <dd className="texte mt-2">
              <Link href={`/coupes/${famille.ancre}`} className="souligne">
                {robe.categorie}
              </Link>
              {" — "}
              {FAMILLES[robe.categorie].charAt(0).toLowerCase() + FAMILLES[robe.categorie].slice(1)}
            </dd>
          </div>

          {robe.createur && (
            <div className="border-b border-fil py-5">
              <dt className="legende">La maison</dt>
              <dd className="texte mt-2">{robe.createur}</dd>
            </div>
          )}

          <div className="border-b border-fil py-5">
            <dt className="legende">La confection</dt>
            <dd className="texte mt-2">Sur mesure, retouches incluses</dd>
          </div>

          <div className="border-b border-fil py-5">
            <dt className="legende">À partir de</dt>
            <dd className="texte mt-2">{MAISON.prixDepart}</dd>
          </div>
        </dl>
      </section>

      {/* ————————————————————————————— les autres vues ————— */}
      {photos.length > 1 && (
        <section aria-label={`Autres vues de ${robe.nom}`} className="gouttiere">
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
                  alt={altRobe(robe, i + 2)}
                  sizes="(max-width: 768px) 92vw, 46vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ————————————————————————————— l'essayage ————— */}
      <section className="gouttiere mt-[clamp(3rem,6vw,6rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <p className="phrase mesure">
            {robe.nom} vous attend au showroom.
          </p>
          <div className="flex flex-col items-start gap-4" data-lever data-retard="180">
            <AppelRendezvous robe={robe.slug} className="bouton">
              Prendre rendez-vous
            </AppelRendezvous>
            <a href={MAISON.telephoneHref} className="lien-nav souligne text-encre">
              {MAISON.telephone}
            </a>
          </div>
        </div>
      </section>

      {/* ————————————————————————————— les voisines ————— */}
      {voisines.length > 0 && (
        <section aria-labelledby="voisines">
          <TitreSection
            id="voisines"
            titre="Dans la même famille"
            lien={{
              href: `/coupes/${famille.ancre}`,
              label: `Toutes les ${PLURIEL[robe.categorie]}`,
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
                    media={media}
                    dossier="robes"
                    alt={altRobe(v)}
                    nom={v.nom}
                    note={v.ligne}
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
