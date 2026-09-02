import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/media/Photo";
import Film from "@/components/media/Film";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import { ROBES, FAMILLES, MAISON, SITE_URL } from "@/lib/madamoon";
import { FILMS } from "@/lib/films";
import { SCENES, vues } from "@/lib/medias";
import { coupe } from "@/lib/coupes";
import { altRobe } from "@/lib/alt";

/*
 * La fiche d'une robe.
 *
 * D'abord l'image — plein cadre, et le film quand la maison en possède
 * un. Le nom est posé dedans, comme sur les tuiles. Ensuite les autres
 * vues, puis le peu qu'il y a à dire, puis la seule question qui compte :
 * vous venez l'essayer ?
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
  return {
    title: `Robe de mariée ${robe.nom} — ${robe.ligne}`,
    description: `${robe.nom} : ${robe.ligne.toLowerCase()}. ${robe.regard} À essayer sur rendez-vous au showroom MADAMOON, Paris 10e.`,
    alternates: { canonical: `/robes/${robe.slug}` },
  };
}

export default async function Fiche({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const robe = ROBES.find((r) => r.slug === slug);
  if (!robe) notFound();

  const photos = vues(robe.slug);
  const film = FILMS[robe.slug];
  const famille = coupe(robe.categorie);
  const voisines = ROBES.filter((r) => r.categorie === robe.categorie && r.slug !== robe.slug).slice(
    0,
    3
  );

  const donnees = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Robe de mariée ${robe.nom}`,
    description: `${robe.ligne}. ${robe.regard}`,
    url: `${SITE_URL}/robes/${robe.slug}`,
    brand: { "@type": "Brand", name: robe.createur ?? MAISON.nom },
    category: `Robe de mariée ${robe.categorie.toLowerCase()}`,
    image: photos.map((p) => `${SITE_URL}/robes/${p.name}-1200.webp`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      {/* Le premier écran : l'image, et le nom posé dedans. */}
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
            <Link href={`/rendez-vous?robe=${robe.slug}`} className="bouton-clair mt-6">
              L&apos;essayer au showroom
            </Link>
          </div>
        </div>
      </section>

      {/* Les autres vues. Grandes, jointives, sans légende. */}
      {photos.length > 1 && (
        <div className="gouttiere pt-[clamp(1.5rem,2.5vw,2.5rem)]">
          <div className="trame-tuiles md:grid-cols-2">
            {photos.slice(1).map((p, i) => (
              <div key={p.name} className="relative overflow-hidden" data-voile data-retard={i * 90}>
                <Photo
                  media={p}
                  dossier="robes"
                  alt={altRobe(robe, i + 2)}
                  sizes="(max-width: 768px) 100vw, 47vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ce qu'il y a à en dire, et rien de plus. */}
      <section className="gouttiere pt-[clamp(3rem,5.5vw,5rem)]">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-[1fr_1fr]">
          <p className="phrase mesure-l">{robe.regard}</p>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 self-start">
            <div>
              <dt className="legende">Coupe</dt>
              <dd className="texte mt-1">
                <Link href={`/robes#${famille.ancre}`} className="souligne">
                  {robe.categorie}
                </Link>
              </dd>
            </div>
            {robe.createur && (
              <div>
                <dt className="legende">Créateur</dt>
                <dd className="texte mt-1">{robe.createur}</dd>
              </div>
            )}
            <div>
              <dt className="legende">Confection</dt>
              <dd className="texte mt-1">Sur mesure, retouches incluses</dd>
            </div>
            <div>
              <dt className="legende">À partir de</dt>
              <dd className="texte mt-1">{MAISON.prixDepart}</dd>
            </div>
            <div className="col-span-2">
              <dt className="legende">La famille</dt>
              <dd className="texte mt-1">{FAMILLES[robe.categorie]}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* La question. */}
      <section className="gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="phrase mesure">Vous venez l&apos;essayer ?</h2>
          <div className="flex flex-col items-start gap-4">
            <Link href={`/rendez-vous?robe=${robe.slug}`} className="bouton">
              Prendre rendez-vous
            </Link>
            <a href={MAISON.telephoneHref} className="lien-nav souligne text-encre">
              {MAISON.telephone}
            </a>
          </div>
        </div>
      </section>

      {/* Ce qu'elle pourrait aimer aussi — jamais ce qu'il faut éviter. */}
      {voisines.length > 0 && (
        <section aria-labelledby="voisines">
          <TitreSection
            id="voisines"
            titre="Vous pourriez aussi aimer"
            lien={{ href: `/robes#${famille.ancre}`, label: `Toutes les robes ${robe.categorie.toLowerCase()}` }}
          />
          <div className="gouttiere pb-[clamp(3rem,5.5vw,5rem)]">
            <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
              {voisines.map((v) => {
                const media = vues(v.slug)[0];
                if (!media) return null;
                return (
                  <Tuile
                    key={v.slug}
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
