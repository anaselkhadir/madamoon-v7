import type { Metadata } from "next";
import AppelElise from "@/components/AppelElise";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import Showroom from "@/components/accueil/Showroom";
import Rendezvous from "@/components/accueil/Rendezvous";
import {
  CREATEURS,
  FAMILLES,
  MAISON,
  SITE_URL,
  createurParSlug,
  morphologiesDe,
  robesDe,
  silhouettesDe,
} from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { silhouette } from "@/lib/silhouettes";

/*
 * La page d'une maison.
 *
 * Le rythme de l'accueil, au nom d'un créateur : une image plein cadre,
 * puis des sections courtes. La différence tient en un mot — la page est
 * un filtre. On n'y montre que ses robes, que les silhouettes qu'il
 * travaille, que les morphologies auxquelles ses coupes répondent.
 *
 * Rien n'est complété par le reste du catalogue : une maison qui n'a que
 * deux robes en a deux sur sa page. C'est la seule façon que le filtre
 * veuille dire quelque chose.
 */

export function generateStaticParams() {
  return CREATEURS.map((c) => ({ maison: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ maison: string }>;
}): Promise<Metadata> {
  const { maison } = await params;
  const createur = createurParSlug(maison);
  if (!createur) return {};
  const robes = robesDe(createur.nom);
  return {
    /* Le gabarit du site ajoute « — MADAMOON » : ne pas le redire ici. */
    title: `Robes de mariée ${createur.nom} à Paris`,
    description: `${robes.length} robes de mariée ${createur.nom} (${createur.origine}) au showroom MADAMOON, Paris 10e. ${createur.note} Essayage privé sur rendez-vous.`,
    alternates: { canonical: `/createurs/${createur.slug}` },
  };
}

export default async function Maison({ params }: { params: Promise<{ maison: string }> }) {
  const { maison } = await params;
  const createur = createurParSlug(maison);
  if (!createur) notFound();

  const robes = robesDe(createur.nom);
  const coupes = silhouettesDe(createur.nom);
  const morphologies = morphologiesDe(createur.nom);

  const donnees = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Robes de mariée ${createur.nom}`,
    description: createur.note,
    url: `${SITE_URL}/createurs/${createur.slug}`,
    about: { "@type": "Brand", name: createur.nom },
    isPartOf: { "@type": "WebSite", name: MAISON.nom, url: SITE_URL },
    hasPart: robes.map((r) => ({
      "@type": "Product",
      name: `Robe de mariée ${r.nom}`,
      description: r.ligne,
      url: `${SITE_URL}/robes/${r.slug}`,
      brand: { "@type": "Brand", name: createur.nom },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <HeroPage
        surtitre={createur.origine}
        titre={createur.nom}
        ligne={createur.note}
        robe={createur.ouverture.robe}
        vue={createur.ouverture.vue}
        alt={`Robe de mariée ${createur.nom} présentée chez MADAMOON à Paris`}
        action={`Trouver ma robe ${createur.nom}`}
        maison={createur.nom}
      />

      {/* ————————————————————————————— ses robes ————— */}
      <section aria-labelledby="ses-robes">
        <TitreSection
          id="ses-robes"
          titre={`Les robes ${createur.nom}`}
          lien={{ href: "/robes", label: "Voir toutes les robes" }}
        />
        <div className="gouttiere">
          <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
            {robes.map((robe, i) => {
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
                  priorite={i < 3}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ————————————————————————————— ses silhouettes ————— */}
      {coupes.length > 0 && (
        <section aria-labelledby="ses-silhouettes">
          <TitreSection
            id="ses-silhouettes"
            titre="Ses silhouettes"
            lien={{ href: "/silhouettes", label: "Les six coupes" }}
          />
          <div className="gouttiere">
            <p className="texte mesure pb-6">
              {createur.nom} travaille {coupes.length === 1 ? "une seule coupe" : `${coupes.length} coupes`} au
              catalogue MADAMOON. L&apos;image est prise sur l&apos;une de ses robes, jamais sur
              celle d&apos;une autre maison.
            </p>
            <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
              {coupes.map((coupe) => {
                /* L'image de la famille vient d'une robe de la maison :
                  * sur sa page, on ne montre pas le travail d'un autre. */
                const sienne = robes.find((r) => r.categorie === coupe);
                const media = sienne ? vues(sienne.slug)[0] : undefined;
                const famille = silhouette(coupe);
                if (!media || !famille) return null;
                return (
                  <Tuile
                    key={coupe}
                    href={`/silhouettes/${famille.ancre}`}
                    media={media}
                    dossier="robes"
                    alt={`Robe de mariée ${coupe.toLowerCase()} ${createur.nom}`}
                    nom={coupe}
                    note={FAMILLES[coupe]}
                    sizes="(max-width: 768px) 50vw, 31vw"
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ————————————————————————————— les morphologies ————— */}
      {morphologies.length > 0 && (
        <section aria-labelledby="ses-morphologies">
          <TitreSection
            id="ses-morphologies"
            titre="À qui ces coupes vont"
            lien={{ href: "/morphologies", label: "Toutes les morphologies" }}
          />
          <div className="gouttiere pb-[clamp(3rem,5vw,5rem)]">
            <p className="texte mesure pb-8">
              Une morphologie n&apos;exclut jamais une robe : elle ouvre des pistes. Voici celles
              que les coupes de {createur.nom} servent en premier — les autres s&apos;essaient tout
              aussi bien en boutique.
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
            <AppelElise maison={createur.nom} className="bouton-trait mt-8">
              Trouver ma robe {createur.nom}
            </AppelElise>
          </div>
        </section>
      )}

      <Showroom />
      <Rendezvous />
    </>
  );
}
