import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppelElise from "@/components/AppelElise";
import HeroPage from "@/components/HeroPage";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import Showroom from "@/components/accueil/Showroom";
import Rendezvous from "@/components/accueil/Rendezvous";
import {
  MAISON,
  MORPHOLOGIES,
  ROBES,
  SITE_URL,
  maisonsPour,
  morphologieParSlug,
} from "@/lib/madamoon";
import { PLURIEL, coupe } from "@/lib/coupes";
import { vues } from "@/lib/medias";

/*
 * La page d'une morphologie.
 *
 * Troisième entrée du catalogue, après les maisons et les coupes.
 * Là on partait d'un créateur ou d'une coupe ; ici on part d'un corps.
 *
 * Le ton est celui du reste : une morphologie n'exclut jamais une robe,
 * elle ouvre des pistes. Les coupes conseillées d'abord viennent en tête,
 * celles qui valent l'essai ensuite — et rien n'est jamais présenté comme
 * « à éviter », parce qu'en boutique on essaie aussi ce qui n'était pas
 * prévu.
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
  return {
    /* Le gabarit ajoute « — MADAMOON » : ne pas le redire ici. Et la
     * lettre garde sa capitale — « silhouette en x » ne veut rien dire,
     * d'où le nom reconstruit plutôt que mis en bas de casse. */
    title: `Robe de mariée pour une silhouette en ${m.lettre}`,
    description: `${m.silhouette} ${m.conseil} Les robes de mariée MADAMOON qui vont à cette morphologie, à essayer au showroom, Paris 10e.`,
    alternates: { canonical: `/morphologies/${m.lettre.toLowerCase()}` },
  };
}

export default async function Morpho({ params }: { params: Promise<{ lettre: string }> }) {
  const { lettre } = await params;
  const m = morphologieParSlug(lettre);
  if (!m) notFound();

  /* Les coupes conseillées d'abord, puis celles qui valent l'essai. Une
   * robe ne paraît jamais deux fois : la seconde liste ne reprend pas ce
   * que la première a déjà montré. */
  const groupes = [
    ...m.premieres.map((c) => ({
      titre: `Nos ${PLURIEL[c]}`,
      ancre: coupe(c).ancre,
      robes: ROBES.filter((r) => r.categorie === c),
    })),
  ].filter((g) => g.robes.length > 0);

  const aussi = ROBES.filter((r) => m.secondes.includes(r.categorie));
  const maisons = maisonsPour(m.lettre).filter((o) => o.premieres.length > 0);

  const donnees = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Robes de mariée pour une silhouette en ${m.lettre}`,
    description: `${m.silhouette} ${m.conseil}`,
    url: `${SITE_URL}/morphologies/${m.lettre.toLowerCase()}`,
    isPartOf: { "@type": "WebSite", name: MAISON.nom, url: SITE_URL },
    hasPart: groupes.flatMap((g) =>
      g.robes.map((r) => ({
        "@type": "Product",
        name: `Robe de mariée ${r.nom}`,
        description: r.ligne,
        url: `${SITE_URL}/robes/${r.slug}`,
        ...(r.createur && { brand: { "@type": "Brand", name: r.createur } }),
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <HeroPage
        surtitre={m.silhouette}
        titre={m.nom}
        ligne={m.objectif}
        robe={m.ouverture.robe}
        vue={m.ouverture.vue}
        alt={`Robe de mariée conseillée pour une silhouette en ${m.lettre}, chez MADAMOON à Paris`}
        action="Trouver ma robe"
      />

      {/* ————————————————————————————— ce que l'on conseille ————— */}
      <section aria-labelledby="conseils">
        <TitreSection
          id="conseils"
          titre="Ce que l'on conseille"
          lien={{ href: "/coupes", label: "Toutes les coupes" }}
        />
        <div className="gouttiere">
          <ul className="mesure-l border-t border-fil">
            {m.coupes.map((c) => (
              <li key={c} className="texte flex gap-3 border-b border-fil py-3">
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ————————————————————————————— par coupe ————— */}
      {groupes.map((g, i) => (
        <section key={g.titre} aria-label={g.titre}>
          <TitreSection
            titre={g.titre}
            lien={{ href: `/coupes/${g.ancre}`, label: "La coupe" }}
          />
          <div className="gouttiere">
            <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
              {g.robes.map((robe, j) => {
                const media = vues(robe.slug)[0];
                if (!media) return null;
                return (
                  <Tuile
                    key={robe.slug}
                    href={`/robes/${robe.slug}`}
                    media={media}
                    dossier="robes"
                    alt={`Robe de mariée ${robe.nom} — ${robe.ligne}`}
                    nom={robe.nom}
                    note={robe.ligne}
                    sizes="(max-width: 768px) 50vw, 31vw"
                    priorite={i === 0 && j < 3}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ————————————————————————————— à essayer aussi ————— */}
      {aussi.length > 0 && (
        <section aria-labelledby="aussi">
          <TitreSection id="aussi" titre="À essayer aussi" />
          <div className="gouttiere">
            <p className="texte mesure pb-6">
              Ces coupes ne sont pas les premières que l&apos;on vous proposera, mais elles
              valent l&apos;essai. Beaucoup de mariées repartent avec une robe qu&apos;elles
              n&apos;auraient pas choisie sur photo.
            </p>
            <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
              {aussi.slice(0, 6).map((robe) => {
                const media = vues(robe.slug)[0];
                if (!media) return null;
                return (
                  <Tuile
                    key={robe.slug}
                    href={`/robes/${robe.slug}`}
                    media={media}
                    dossier="robes"
                    alt={`Robe de mariée ${robe.nom} — ${robe.ligne}`}
                    nom={robe.nom}
                    note={robe.ligne}
                    sizes="(max-width: 768px) 50vw, 31vw"
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ————————————————————————————— les maisons ————— */}
      {maisons.length > 0 && (
        <section aria-labelledby="maisons">
          <TitreSection id="maisons" titre="Les maisons qui vous vont" />
          <div className="gouttiere pb-[clamp(3rem,5vw,5rem)]">
            <p className="texte mesure pb-6">
              Classées par le nombre de robes qu&apos;elles ont dans les coupes conseillées
              ici. C&apos;est le même classement qu&apos;Élise donne en conversation.
            </p>
            <ol className="mesure-l border-t border-fil">
              {maisons.map((o, i) => (
                <li key={o.createur.slug} className="flex gap-4 border-b border-fil py-3">
                  <span className="legende pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`/createurs/${o.createur.slug}`} className="texte text-encre">
                    <span className="phrase text-[1.125rem] text-encre">{o.createur.nom}</span>
                    <span className="text-plomb">
                      {" "}
                      — {o.premieres.length} robe{o.premieres.length > 1 ? "s" : ""} dans vos
                      coupes
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            <AppelElise className="bouton-trait mt-8">Trouver ma robe</AppelElise>
          </div>
        </section>
      )}

      <Showroom />
      <Rendezvous />
    </>
  );
}
