import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppelElise from "@/components/AppelElise";
import HeroPage from "@/components/HeroPage";
import Photo from "@/components/media/Photo";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import CoupesFixes, { type Station } from "@/components/morphologie/CoupesFixes";
import Showroom from "@/components/accueil/Showroom";
import Rendezvous from "@/components/accueil/Rendezvous";
import {
  MAISON,
  MORPHOLOGIES,
  ROBES,
  SITE_URL,
  maisonsPour,
  morphologieParSlug,
  type Categorie,
} from "@/lib/madamoon";
import { AU_DELA, EDITO } from "@/lib/morphologies";
import { PLURIEL, coupe } from "@/lib/coupes";
import { vues } from "@/lib/medias";
import { altCoupe, altRobe } from "@/lib/alt";

/*
 * La page d'une morphologie.
 *
 * Troisième entrée du catalogue, après les maisons et les coupes. Là on
 * partait d'un créateur ou d'une coupe ; ici on part d'un corps.
 *
 * Elle est écrite pour être lue, pas seulement indexée. La matière tient
 * dans lib/morphologies.ts ; cette page en fait une suite de scènes qui
 * se découvrent au défilement, et non une pile de blocs.
 *
 * Deux règles de ton, tenues jusqu'au bout : aucune robe n'est
 * déconseillée — les trois niveaux disent une préférence, jamais une
 * interdiction — et aucun corps n'est un problème à corriger. On écrit ce
 * qu'une coupe fait, jamais ce qu'elle « cacherait ».
 */

export function generateStaticParams() {
  return MORPHOLOGIES.map((m) => ({ lettre: m.lettre.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lettre: string }>;
}): Promise<Metadata> {
  const { lettre } = await params;
  const m = morphologieParSlug(lettre);
  if (!m) return {};
  const e = EDITO[m.lettre];
  return {
    /* Le gabarit ajoute « — MADAMOON » : ne pas le redire ici. Et la
     * lettre garde sa capitale — « silhouette en x » ne veut rien dire. */
    title: `Robe de mariée pour une silhouette en ${m.lettre}`,
    description: `${e.promesse} Comment reconnaître une silhouette en ${m.lettre}, les coupes qui la mettent en valeur et les modèles à essayer au showroom MADAMOON, Paris 10e.`,
    alternates: { canonical: `/morphologies/${m.lettre.toLowerCase()}` },
  };
}

export default async function Morpho({ params }: { params: Promise<{ lettre: string }> }) {
  const { lettre } = await params;
  const m = morphologieParSlug(lettre);
  if (!m) notFound();
  const e = EDITO[m.lettre];

  const robesDe = (c: Categorie) => ROBES.filter((r) => r.categorie === c);

  /* Les stations de la scène : les coupes conseillées d'abord, avec la
   * raison rédigée et deux modèles chacune. */
  const stations: Station[] = m.premieres
    .map((c) => {
      const robes = robesDe(c);
      const vedette = robes.find((r) => vues(r.slug).length > 0);
      const media = vedette ? vues(vedette.slug)[0] : undefined;
      if (!media) return null;
      return {
        nom: c,
        ancre: coupe(c).ancre,
        pourquoi: e.pourquoi[c] ?? "",
        media,
        alt: altCoupe(c, `conseillée pour une silhouette en ${m.lettre}`),
        robes: robes.slice(0, 2).map((r) => ({ slug: r.slug, nom: r.nom, ligne: r.ligne })),
      };
    })
    .filter(Boolean) as Station[];

  /* Les trois niveaux. Aucun ne ferme une porte : le troisième dit
   * « selon vos envies », et c'est exactement ce qu'il veut dire. */
  const niveaux = [
    {
      titre: "Particulièrement adaptées",
      note: "Les coupes que nous sortons en premier de la penderie quand vous poussez la porte.",
      robes: ROBES.filter((r) => m.premieres.includes(r.categorie)).slice(0, 6),
    },
    {
      titre: "Également intéressantes à essayer",
      note: "Elles ne sont pas les plus évidentes, et c'est souvent l'une d'elles qui surprend.",
      robes: ROBES.filter((r) => m.secondes.includes(r.categorie)).slice(0, 3),
    },
    {
      titre: "À découvrir selon vos envies",
      note: "Le reste de la sélection. En cabine tout se tente, et rien ici n'est écarté.",
      robes: ROBES.filter(
        (r) => !m.premieres.includes(r.categorie) && !m.secondes.includes(r.categorie)
      ).slice(0, 3),
    },
  ].filter((n) => n.robes.length > 0);

  const maisons = maisonsPour(m.lettre).filter((o) => o.premieres.length > 0);
  const scene = vues(m.ouverture.robe)[1] ?? vues(m.ouverture.robe)[0];

  const donnees = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: e.question,
    description: e.promesse,
    url: `${SITE_URL}/morphologies/${m.lettre.toLowerCase()}`,
    inLanguage: "fr-FR",
    isPartOf: { "@type": "WebSite", name: MAISON.nom, url: SITE_URL },
    publisher: { "@type": "Organization", name: MAISON.nom, url: SITE_URL },
    about: { "@type": "Thing", name: m.nom, description: m.silhouette },
    mentions: stations.map((s) => ({
      "@type": "Thing",
      name: `Robe de mariée ${s.nom.toLowerCase()}`,
      url: `${SITE_URL}/coupes/${s.ancre}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      {/* ————————————————————————————— 01 · le premier écran ————— */}
      <HeroPage
        surtitre={m.nom}
        titre={e.question}
        ligne={e.promesse}
        robe={m.ouverture.robe}
        vue={m.ouverture.vue}
        alt={altCoupe(m.premieres[0] ?? "de mariée", `conseillée pour une silhouette en ${m.lettre}`)}
        action="Trouver ma robe"
      />

      {/* ————————————————————————————— 02 · se reconnaître ————— */}
      <section aria-labelledby="reconnaitre" className="pt-[clamp(4rem,8vw,8rem)]">
        <div className="gouttiere grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 md:grid-cols-2">
          {/* La photographie tient sa colonne pendant que le texte
            * s'écrit à côté : le même geste que la scène des coupes, en
            * plus court. */}
          <div className="md:sticky md:top-[calc(var(--barre)+var(--entete))] md:h-fit">
            <div className="tuile" data-voile>
              {scene && (
                <Photo
                  media={scene}
                  dossier="robes"
                  alt={altCoupe(m.premieres[0] ?? "de mariée", `pour une silhouette en ${m.lettre}`)}
                  sizes="(max-width: 768px) 100vw, 46vw"
                />
              )}
            </div>
          </div>

          <div className="md:py-[clamp(2rem,4vw,4rem)]">
            <h2 id="reconnaitre" className="titre-section" data-lever>
              Reconnaître une silhouette en {m.lettre}
            </h2>
            <p className="phrase mt-5 text-encre" data-lever data-retard="80">
              {m.silhouette}
            </p>

            <dl className="mt-10 border-t border-fil">
              {e.reperes.map((r, i) => (
                <div
                  key={r.titre}
                  className="border-b border-fil py-5"
                  data-lever
                  data-retard={120 + i * 90}
                >
                  <dt className="legende">{r.titre}</dt>
                  <dd className="texte mt-2">{r.texte}</dd>
                </div>
              ))}
            </dl>

            <p className="mention mt-8 text-brume" data-lever data-retard="420">
              Les proportions
            </p>
            <p className="texte mt-1" data-lever data-retard="450">
              {e.proportions}
            </p>

            <p className="texte mesure-l mt-8" data-lever data-retard="500">
              Une morphologie ne se lit pas dans un miroir en trente secondes, et elle
              n&apos;a pas à être exacte : c&apos;est un point de départ pour savoir quoi
              essayer en premier. Si vous hésitez entre deux,{" "}
              <AppelElise className="souligne text-action">Élise vous guide</AppelElise> en
              trois questions.
            </p>
          </div>
        </div>
      </section>

      {/* ————————————————————————————— 03 · les coupes ————— */}
      {stations.length > 0 && (
        <section aria-labelledby="coupes" className="pt-[clamp(4rem,8vw,8rem)]">
          <TitreSection
            id="coupes"
            titre="Les coupes qui vous mettent en valeur"
            lien={{ href: "/coupes", label: "Toutes les coupes" }}
          />
          <div className="gouttiere">
            <p className="texte mesure-l pb-[clamp(2rem,4vw,4rem)]">
              {m.objectif} Voici pourquoi ces lignes fonctionnent, et ce qu&apos;elles font
              réellement une fois la robe enfilée.
            </p>
          </div>
          <CoupesFixes stations={stations} />
          <div className="gouttiere pt-[clamp(2rem,4vw,4rem)]">
            <p className="phrase mesure-l text-encre" data-lever>
              {e.detail}
            </p>
          </div>
        </section>
      )}

      {/* ————————————————————————————— 04 · les robes ————— */}
      <section aria-labelledby="modeles" className="pt-[clamp(4rem,8vw,8rem)]">
        <TitreSection
          id="modeles"
          titre="Nos robes pour cette silhouette"
          lien={{ href: "/robes", label: "Voir tout le catalogue" }}
        />
        {niveaux.map((n, rang) => (
          <div key={n.titre} className={rang > 0 ? "pt-[clamp(2.5rem,5vw,5rem)]" : ""}>
            <div className="gouttiere">
              <h3 className="legende" data-lever>
                {n.titre}
              </h3>
              <p className="texte mesure-l mt-2 pb-6" data-lever data-retard="70">
                {n.note}
              </p>
              <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
                {n.robes.map((robe, i) => {
                  const media = vues(robe.slug)[0];
                  if (!media) return null;
                  return (
                    <Tuile
                      key={robe.slug}
                      href={`/robes/${robe.slug}`}
                      media={media}
                      dossier="robes"
                      alt={altRobe(robe)}
                      nom={robe.nom}
                      note={robe.ligne}
                      sizes="(max-width: 768px) 50vw, 31vw"
                      priorite={rang === 0 && i < 3}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ————————————————————————————— 05 · au-delà ————— */}
      <section aria-labelledby="au-dela" className="mt-[clamp(4rem,8vw,8rem)] bg-craie">
        <TitreSection id="au-dela" titre="Au-delà de la morphologie" />
        <div className="gouttiere pb-[clamp(4rem,7vw,7rem)]">
          <p
            className="affiche mesure-l text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] text-encre"
            data-lever
          >
            Une morphologie dit par où commencer. Elle ne dit pas qui vous êtes le jour de
            votre mariage.
          </p>
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {AU_DELA.map((r, i) => (
              <div key={r.titre} data-lever data-retard={i * 90}>
                <dt className="legende">{r.titre}</dt>
                <dd className="texte mt-2">{r.texte}</dd>
              </div>
            ))}
          </dl>

          {maisons.length > 0 && (
            <div className="mt-14" data-lever>
              <p className="mention text-brume">Les maisons qui vous vont</p>
              <ol className="mesure-l mt-3 border-t border-fil">
                {maisons.map((o, i) => (
                  <li key={o.createur.slug}>
                    <Link
                      href={`/createurs/${o.createur.slug}`}
                      className="group flex items-baseline gap-4 border-b border-fil py-3"
                    >
                      <span className="legende pt-1">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="phrase text-[1.125rem] text-encre transition-colors duration-500 group-hover:text-action">
                          {o.createur.nom}
                        </span>
                        <span className="texte">
                          {" "}
                          — {o.premieres.length} robe{o.premieres.length > 1 ? "s" : ""} en{" "}
                          {o.premieres
                            .map((r) => PLURIEL[r.categorie])
                            .filter((v, j, t) => t.indexOf(v) === j)
                            .join(", ")}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* ————————————————————————————— 06 · la boutique ————— */}
      <Showroom />
      <Rendezvous />
    </>
  );
}
