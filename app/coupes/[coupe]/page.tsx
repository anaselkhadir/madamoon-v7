import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppelElise from "@/components/AppelElise";
import HeroPage from "@/components/HeroPage";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import Showroom from "@/components/accueil/Showroom";
import Rendezvous from "@/components/accueil/Rendezvous";
import { CREATEURS, FAMILLES, MAISON, MORPHOLOGIES, ROBES, SITE_URL } from "@/lib/madamoon";
import { PLURIEL, COUPES, coupeParAncre } from "@/lib/coupes";
import { vues } from "@/lib/medias";
import { altCoupe, altRobe } from "@/lib/alt";

/*
 * La page d'une coupe.
 *
 * Bâtie comme celle d'une maison, mais l'axe est inversé : là on prenait
 * une maison et on montrait ses coupes, ici on prend une coupe et on
 * montre les maisons qui la travaillent.
 *
 * Les robes sont donc rangées par créateur — « Nos sirènes Watters
 * Designs » — dans l'ordre du catalogue. Les modèles dont le créateur
 * n'est pas renseigné forment un dernier groupe, à part : on ne les
 * attribue à personne pour faire joli.
 */

export function generateStaticParams() {
  return COUPES.map((s) => ({ coupe: s.ancre }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ coupe: string }>;
}): Promise<Metadata> {
  const { coupe } = await params;
  const s = coupeParAncre(coupe);
  if (!s) return {};
  const nombre = ROBES.filter((r) => r.categorie === s.nom).length;
  return {
    /* Le gabarit du site ajoute « — MADAMOON » : ne pas le redire ici. */
    title: `Robe de mariée ${s.nom.toLowerCase()} à Paris`,
    description: `${nombre} robes de mariée ${s.nom.toLowerCase()} au showroom MADAMOON, Paris 10e. ${FAMILLES[s.nom]} Essayage privé sur rendez-vous.`,
    alternates: { canonical: `/coupes/${s.ancre}` },
  };
}

export default async function Coupe({ params }: { params: Promise<{ coupe: string }> }) {
  const { coupe } = await params;
  const s = coupeParAncre(coupe);
  if (!s) notFound();

  const siennes = ROBES.filter((r) => r.categorie === s.nom);
  const pluriel = PLURIEL[s.nom];

  /* Par maison, dans l'ordre du catalogue, puis celles dont on ignore le
   * créateur — jamais rangées sous un nom qui n'est pas le leur. */
  const maisons = CREATEURS.map((c) => ({
    titre: `Nos ${pluriel} ${c.nom}`,
    lien: `/createurs/${c.slug}` as string | undefined,
    robes: siennes.filter((r) => r.createur === c.nom),
  })).filter((g) => g.robes.length > 0);

  const orphelines = siennes.filter((r) => !r.createur);
  const groupes = [
    ...maisons,
    /* « Autres » n'a de sens qu'après quelque chose : quand aucun créateur
     * n'est renseigné pour cette coupe, ce groupe est le seul, et le mot
     * ne renverrait à rien. */
    ...(orphelines.length > 0
      ? [
          {
            titre: maisons.length > 0 ? `Nos autres ${pluriel}` : `Nos ${pluriel}`,
            lien: undefined,
            robes: orphelines,
          },
        ]
      : []),
  ];

  const morphologies = MORPHOLOGIES.filter((m) => m.premieres.includes(s.nom));
  const ouverture = s.ouverture ?? { robe: s.robe, vue: s.vue };

  const donnees = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Robes de mariée ${s.nom.toLowerCase()}`,
    description: FAMILLES[s.nom],
    url: `${SITE_URL}/coupes/${s.ancre}`,
    isPartOf: { "@type": "WebSite", name: MAISON.nom, url: SITE_URL },
    hasPart: siennes.map((r) => ({
      "@type": "Product",
      name: `Robe de mariée ${r.nom}`,
      description: r.ligne,
      url: `${SITE_URL}/robes/${r.slug}`,
      ...(r.createur && { brand: { "@type": "Brand", name: r.createur } }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <HeroPage
        surtitre={s.note}
        titre={s.nom}
        ligne={FAMILLES[s.nom]}
        robe={ouverture.robe}
        vue={ouverture.vue}
        alt={altCoupe(s.nom)}
        action="Trouver ma robe"
      />

      {/* ————————————————————————————— par maison ————— */}
      {groupes.map((g, i) => (
        <section key={g.titre} aria-label={g.titre}>
          <TitreSection
            titre={g.titre}
            {...(g.lien ? { lien: { href: g.lien, label: "La maison" } } : {})}
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
                    alt={altRobe(robe)}
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

      {/* ————————————————————————————— à qui elle va ————— */}
      {morphologies.length > 0 && (
        <section aria-labelledby="pour-qui">
          <TitreSection
            id="pour-qui"
            titre="À qui cette coupe va"
            lien={{ href: "/morphologies", label: "Toutes les morphologies" }}
          />
          <div className="gouttiere pb-[clamp(3rem,5vw,5rem)]">
            <p className="texte mesure pb-8">
              Une morphologie n&apos;exclut jamais une robe : elle ouvre des pistes. La{" "}
              {s.nom.toLowerCase()} est celle que l&apos;on conseille d&apos;abord à ces
              morphologies — les autres l&apos;essaient tout aussi bien en boutique.
            </p>
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {morphologies.map((m) => (
                <div key={m.lettre}>
                  <dt className="flex items-baseline gap-3">
                    <span className="affiche text-[2rem] leading-none text-action">{m.lettre}</span>
                    <span className="legende">{m.nom}</span>
                  </dt>
                  <dd className="texte mt-3">{m.silhouette}</dd>
                  <dd className="note-image mt-2 text-plomb">{m.conseil}</dd>
                </div>
              ))}
            </dl>
            <AppelElise className="bouton-trait mt-8">Trouver ma robe</AppelElise>
          </div>
        </section>
      )}

      <Showroom />
      <Rendezvous />
    </>
  );
}
