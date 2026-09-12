import AppelElise from "@/components/AppelElise";
import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import Showroom from "@/components/accueil/Showroom";
import {
  AUTRES_CREATEURS,
  FAMILLES,
  MAISON,
  SITE_URL,
  createurParSlug,
  morphologiesDe,
  robesDe,
  coupesDe,
} from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { coupe } from "@/lib/coupes";
import { altCoupe, altRobe } from "@/lib/alt";
import { de } from "@/lib/francais";
import {
  coupeNom,
  createurNom,
  createurNote,
  createurOrigine,
  familleTexte,
  morphoConseil,
  morphoNom,
  morphoSilhouette,
  robeLigne,
} from "@/lib/contenu";
import { versLangue, type Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * La page d'une maison.
 *
 * Le rythme de l'accueil, au nom d'un créateur : une image plein cadre,
 * puis des sections courtes. La différence tient en un mot — la page est
 * un filtre. On n'y montre que ses robes, que les coupes qu'il
 * travaille, que les morphologies auxquelles ses coupes répondent.
 *
 * Rien n'est complété par le reste du catalogue : une maison qui n'a que
 * deux robes en a deux sur sa page. C'est la seule façon que le filtre
 * veuille dire quelque chose.
 */

export default async function PageMaison({
  params,
  langue,
}: {
  params: Promise<{ maison: string }>;
  langue: Langue;
}) {
  const { maison } = await params;
  const createur = createurParSlug(maison);
  if (!createur) notFound();

  const L = t(langue).pages.maison;
  /* Le nom se traduit désormais : « Autres créateurs » n'est pas un nom
   * propre. Les recherches dans le catalogue gardent le nom d'origine,
   * qui est la clé ; tout ce qui s'affiche prend celui de la langue. */
  const nomMaison = createurNom(createur, langue);
  /* « Trouver ma robe Olya Mak » se dit ; « Trouver ma robe Autres
   * créateurs » non. Le collectif prend l'intitulé nu. */
  const collective = createur.nom === AUTRES_CREATEURS;
  const trouver = collective ? t(langue).raccourcis.trouverMaRobe : L.trouverMaRobeDe(nomMaison);
  const robes = robesDe(createur.nom);
  const coupes = coupesDe(createur.nom);
  const morphologies = morphologiesDe(createur.nom);

  /* En français la maison se met au génitif — « les coupes d'Olya Mak » ;
   * en anglais le nom se pose devant, sans rien. */
  const dela = langue === "fr" ? de(nomMaison) : nomMaison;

  const donnees = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    inLanguage: langue === "fr" ? "fr-FR" : "en-GB",
    name: langue === "fr" ? `Robes de mariée ${nomMaison}` : `${nomMaison} wedding dresses`,
    description: createurNote(createur, langue),
    url: `${SITE_URL}${versLangue(`/createurs/${createur.slug}`, langue)}`,
    about: { "@type": "Brand", name: nomMaison },
    isPartOf: { "@type": "WebSite", name: MAISON.nom, url: SITE_URL },
    hasPart: robes.map((r) => ({
      "@type": "Product",
      name: langue === "fr" ? `Robe de mariée ${r.nom}` : `${r.nom} wedding dress`,
      description: robeLigne(r, langue),
      url: `${SITE_URL}${versLangue(`/robes/${r.slug}`, langue)}`,
      brand: { "@type": "Brand", name: nomMaison },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <HeroPage
        surtitre={createurOrigine(createur, langue)}
        titre={nomMaison}
        ligne={createurNote(createur, langue)}
        robe={createur.ouverture.robe}
        vue={createur.ouverture.vue}
        alt={altCoupe(coupes[0] ?? "de mariée", langue, { maison: nomMaison })}
        action={trouver}
        maison={createur.nom}
        langue={langue}
        catalogue={{ intitule: nomMaison, contexte: `maison:${createur.slug}` }}
      />

      {/* ————————————————————————————— ses robes ————— */}
      <section aria-labelledby="ses-robes">
        <TitreSection
          id="ses-robes"
          titre={L.lesRobesDe(nomMaison)}
          lien={{ href: "/robes", label: L.voirToutesLesRobes }}
        />
        <div className="gouttiere">
          <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
            {robes.map((robe, i) => {
              const media = vues(robe.slug)[0];
              if (!media) return null;
              return (
                <Tuile
                  key={robe.slug}
                  retard={(i % 3) * 70}
                  href={`/robes/${robe.slug}`}
                  coupDeCoeur={robe.slug}
                  media={media}
                  dossier="robes"
                  alt={altRobe(robe, langue)}
                  nom={robe.nom}
                  note={robeLigne(robe, langue)}
                  noteAuLarge
                  sizes="(max-width: 768px) 50vw, 31vw"
                  priorite={i < 3}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ————————————————————————————— ses coupes ————— */}
      {coupes.length > 0 && (
        <section aria-labelledby="ses-coupes">
          <TitreSection
            id="ses-coupes"
            titre={L.sesCoupes}
            lien={{ href: "/coupes", label: L.toutesLesCoupes }}
          />
          <div className="gouttiere">
            <p className="texte mesure pb-6">{L.travaille(nomMaison, coupes.length)}</p>
            <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
              {coupes.map((nom, i) => {
                /* L'image de la famille vient d'une robe de la maison :
                 * sur sa page, on ne montre pas le travail d'un autre. */
                const sienne = robes.find((r) => r.categorie === nom);
                const media = sienne ? vues(sienne.slug)[0] : undefined;
                const famille = coupe(nom);
                if (!media || !famille) return null;
                return (
                  <Tuile
                    key={nom}
                    retard={(i % 3) * 70}
                    href={`/coupes/${famille.ancre}`}
                    media={media}
                    dossier="robes"
                    alt={altCoupe(nom, langue, { maison: nomMaison })}
                    nom={coupeNom(nom, langue)}
                    note={familleTexte(nom, langue, FAMILLES[nom])}
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
            titre={L.aQuiCesCoupesVont}
            lien={{ href: "/morphologies", label: L.toutesLesMorphologies }}
          />
          <div className="gouttiere pb-[clamp(3rem,5vw,5rem)]">
            <p className="texte mesure pb-8">{L.pistes(dela)}</p>
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {morphologies.map((m) => (
                <div key={m.lettre}>
                  <dt className="flex items-baseline gap-3">
                    <span className="affiche text-[2rem] leading-none text-action">{m.lettre}</span>
                    <span className="legende">{morphoNom(m, langue)}</span>
                  </dt>
                  <dd className="texte mt-3">{morphoSilhouette(m, langue)}</dd>
                  <dd className="note-image mt-2 text-plomb">{morphoConseil(m, langue)}</dd>
                </div>
              ))}
            </dl>
            <AppelElise maison={createur.nom} className="bouton-trait mt-8">
              {trouver}
            </AppelElise>
          </div>
        </section>
      )}

      <Showroom langue={langue} />
    </>
  );
}
