import Link from "@/components/Lien";
import TitreSection from "@/components/TitreSection";
import Photo from "@/components/media/Photo";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import FilDAriane from "@/components/FilDAriane";
import { CREATEURS, MAISON, SITE_URL } from "@/lib/madamoon";
import { SCENES } from "@/lib/medias";
import { ID_MAISON } from "@/lib/schema";
import { createurNom, createurNote, createurOrigine, maison } from "@/lib/contenu";
import { t } from "@/lib/textes";
import { versLangue, type Langue } from "@/lib/langue";

/*
 * L'histoire de MADAMOON.
 *
 * La page ne présentait la maison qu'en deux paragraphes. Mouna a écrit
 * son récit — la reconversion, le déclic, le lieu — et c'est lui qui
 * tient désormais la page, à la première personne.
 *
 * Un récit se lit d'un bout à l'autre, ce qui est le contraire d'une
 * fiche. Chaque chapitre prend donc une forme différente — photographie
 * pleine, bloc sombre, liste, phrase seule —, non pour varier mais pour
 * que l'œil sache où il en est : huit chapitres de même facture
 * s'effondrent en un mur de texte avant le troisième.
 *
 * Deux moments portent le reste, et ne portent que du texte : le nom,
 * qui se démonte sous les yeux de la lectrice, et la phrase « la bonne
 * robe est celle qui vous ressemble », qui est la thèse de la maison.
 * Aucune photographie ne les accompagne, et c'est délibéré.
 */

export default function PageAPropos({ langue }: { langue: Langue }) {
  const L = t(langue).pages.maisonPage;
  const M = maison(langue);

  /*
   * La fondatrice, déclarée.
   *
   * Une page qui raconte qui dirige la maison est exactement ce que les
   * moteurs cherchent pour juger de sa fiabilité. Encore faut-il le leur
   * dire : « worksFor » rattache Mouna à l'entité de la boutique, et
   * « mainEntity » dit que cette page parle d'elle.
   */
  const donnees = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}${versLangue("/a-propos", langue)}/`,
    name: L.titre,
    mainEntity: {
      "@type": "Person",
      name: L.signature,
      jobTitle: L.fonction,
      worksFor: { "@id": ID_MAISON },
      image: `${SITE_URL}/scenes/${SCENES["mouna"].name}-1000.jpg`,
    },
    about: { "@id": ID_MAISON },
  };

  /* Un chapitre : son titre, et ses paragraphes. */
  const Chapitre = ({ titre, texte }: { titre: string; texte: readonly string[] }) => (
    <>
      <h2 className="titre-section">{titre}</h2>
      {texte.map((p) => (
        <p key={p} className="texte mesure-l mt-4">
          {p}
        </p>
      ))}
    </>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane
        langue={langue}
        rangs={[{ nom: t(langue).barre.maison, adresse: "/a-propos" }]}
      />

      {/* ————————————————————————————————————— l'ouverture —————
       * Le titre, puis la phrase qui tient tout le récit, posée en grand
       * à côté du portrait. La citation ouvre avant le premier chapitre
       * parce que c'est ainsi que Mouna l'a écrite : on sait pourquoi la
       * maison existe avant d'apprendre comment elle est née. */}
      <header className="gouttiere pb-[clamp(2rem,4vw,3rem)] pt-[calc(var(--entete)+clamp(2.5rem,5.5vw,5rem))]">
        <h1 className="affiche">{L.titre}</h1>
        <p className="legende mt-5">{L.sousTitre}</p>
      </header>

      <section className="gouttiere pb-[clamp(2.5rem,5vw,4.5rem)]">
        <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-8 md:grid-cols-[1fr_auto] md:items-center">
          <blockquote data-lever className="m-0 max-w-[26ch]">
            {/* Le guillemet est dessiné, pas écrit : à cette taille il
              * appartient au décor, et un lecteur d'écran n'a pas à
              * l'annoncer. */}
            <span
              aria-hidden="true"
              className="block font-serif leading-[0.6]"
              style={{
                fontSize: "clamp(3.5rem,7vw,6rem)",
                color: "color-mix(in srgb, var(--color-action) 22%, transparent)",
              }}
            >
              &laquo;
            </span>
            <p className="phrase est-moyenne mt-2">{L.citation}</p>
          </blockquote>

          <div
            data-voile
            className="tuile w-full md:w-[clamp(18rem,30vw,26rem)]"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Photo
              media={SCENES["mouna"]}
              dossier="scenes"
              alt={L.altMouna}
              sizes="(max-width: 768px) 100vw, 30vw"
              priorite
            />
          </div>
        </div>
      </section>

      {/* ————————————————————————————————————————— le nom —————
       * Rien d'autre que de la typographie. Le nom se démonte sous les
       * yeux : « Madame Moon » dans l'anglaise des faire-part, la maison
       * en capitales. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <h2 className="phrase mesure-l">{L.nomTitre}</h2>

        <div
          data-lever
          className="mt-8 flex flex-wrap items-baseline gap-x-[clamp(1rem,3vw,2.5rem)] gap-y-3"
        >
          <span
            className="font-anglaise leading-[1.1]"
            style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "var(--color-plomb)" }}
          >
            {L.nomAvant}
          </span>
          <span aria-hidden="true" className="h-px w-[clamp(2rem,6vw,5rem)] bg-fil" />
          <span className="affiche" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
            {L.nomApres}
          </span>
        </div>

        {L.nomTexte.map((p) => (
          <p key={p} className="texte mesure-l mt-5">
            {p}
          </p>
        ))}
      </section>

      {/* ———————————————————————— l'ingénierie industrielle —————
       * La photographie est à gauche, le texte à droite : c'est le seul
       * chapitre qui se passe avant la maison, et il se lit à
       * contre-sens des autres. */}
      <section style={{ background: "var(--color-craie)" }}>
        <div className="grid md:grid-cols-[auto_1fr] md:items-center">
          <figure
            data-voile
            className="relative m-0 w-full overflow-hidden md:w-[clamp(18rem,34vw,30rem)]"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Photo
              media={SCENES["mouna-ferroviaire"]}
              dossier="scenes"
              alt={L.altAvant}
              sizes="(max-width: 768px) 100vw, 34vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="legende absolute bottom-4 left-4 right-4 text-sur-image">
              {L.avantLegende}
            </figcaption>
          </figure>
          <div data-lever className="gouttiere py-[clamp(2.5rem,5vw,4.5rem)]">
            <Chapitre titre={L.avantTitre} texte={L.avantTexte} />
          </div>
        </div>
      </section>

      {/* ———————————————————————————————————————— le déclic —————
       * Une date, parce qu'il y en a une : la photographie est de ce
       * jour-là, masque compris. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-8 md:grid-cols-[1fr_auto] md:items-start">
          <div data-lever>
            <span className="legende block" style={{ color: "var(--color-action)" }}>
              {L.declicDate}
            </span>
            <div className="mt-3">
              <Chapitre titre={L.declicTitre} texte={L.declicTexte} />
            </div>
          </div>
          <div
            data-voile
            data-retard={120}
            className="tuile w-full md:w-[clamp(16rem,26vw,22rem)]"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Photo
              media={SCENES["mouna-essayage"]}
              dossier="scenes"
              alt={L.altDeclic}
              sizes="(max-width: 768px) 100vw, 26vw"
            />
          </div>
        </div>
      </section>

      {/* ——————————————————————— penser l'essayage autrement —————
       * Ce que la maison apprend d'une mariée avant de lui montrer quoi
       * que ce soit. Mouna l'a écrit en phrases courtes séparées par des
       * points : elles se posent donc en liste, et non recousues en
       * paragraphe. Puis la thèse, seule. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <Chapitre titre={L.autrementTitre} texte={L.autrementTexte} />

        <ul data-lever className="mesure-l mt-8">
          {L.autrementListe.map((item) => (
            <li key={item} className="texte border-t border-fil py-3">
              {item}
            </li>
          ))}
        </ul>

        <div data-lever className="mt-10 max-w-[34ch]">
          <p className="texte">{L.autrementCroyance}</p>
          <p className="phrase mt-3">{L.autrementVerite}</p>
        </div>
      </section>

      {/* ———————————————————————————— l'expérience MADAMOON —————
       * Sept paragraphes, dont quatre d'une seule phrase : le texte
       * accélère ici. La photographie passe en bandeau sous le chapitre
       * plutôt qu'à côté — à côté, elle aurait coupé ce souffle. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <Chapitre titre={L.experienceTitre} texte={L.experienceTexte} />
      </section>

      <div data-voile className="relative h-[clamp(18rem,42vw,32rem)] overflow-hidden">
        <Photo
          media={SCENES["mouna-cliente"]}
          dossier="scenes"
          alt={L.altExperience}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
      </div>

      {/* ————————————————————————————— un écrin hors du temps —————
       * Le seul bloc sombre de la page, et la seule photographie qui le
       * mérite : le vitrail est lui-même une lumière dans du noir. Les
       * couleurs sont écrites en style — « .texte » et « .titre-section »
       * posent les leurs et ne sont pas calquées. Les jetons s'inversent
       * avec le thème, le bloc reste donc contrasté dans les deux. */}
      <section style={{ background: "var(--color-encre)" }}>
        <div className="grid md:grid-cols-[1fr_auto] md:items-center">
          <div data-lever className="gouttiere py-[clamp(3rem,6vw,6rem)]">
            <h2 className="titre-section" style={{ color: "var(--color-ivoire)" }}>
              {L.ecrinTitre}
            </h2>
            {L.ecrinTexte.map((p) => (
              <p
                key={p}
                className="texte mesure-l mt-4"
                style={{ color: "var(--color-sable)" }}
              >
                {p}
              </p>
            ))}
          </div>
          <div
            data-voile
            className="relative min-h-[18rem] w-full overflow-hidden md:min-h-[34rem] md:w-[clamp(16rem,30vw,26rem)]"
          >
            <Photo
              media={SCENES["vitrail"]}
              dossier="scenes"
              alt={L.altEcrin}
              sizes="(max-width: 768px) 100vw, 30vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ——————————————————————————————————————— ma vision —————
       * La fin du récit. La photographie est celle de l'anniversaire de
       * la maison : elle n'illustre pas la vision, elle en montre
       * l'effet. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 md:grid-cols-2 md:items-center">
          <div data-lever>
            <Chapitre titre={L.visionTitre} texte={L.visionTexte} />
          </div>
          <div
            data-voile
            data-retard={120}
            className="tuile w-full"
            style={{ aspectRatio: "7 / 5" }}
          >
            <Photo
              media={SCENES["anniversaire"]}
              dossier="scenes"
              alt={L.altVision}
              sizes="(max-width: 768px) 100vw, 47vw"
            />
          </div>
        </div>
      </section>

      <section
        className="gouttiere py-[clamp(3rem,6vw,6rem)]"
        style={{ background: "var(--color-craie)" }}
      >
        <ul data-lever className="mesure-l">
          {L.trois.map((item) => (
            <li key={item} className="phrase est-moyenne border-t border-fil py-4">
              {item}
            </li>
          ))}
        </ul>

        <p data-lever className="affiche mt-10">
          {L.bienvenue}
        </p>

        {/* La signature, de la main de Mouna — l'anglaise plutôt qu'une
          * image : elle se redimensionne, se lit aux lecteurs d'écran et
          * ne pèse rien de plus, la police étant déjà chargée. */}
        <p data-lever className="mt-8">
          <span
            className="font-anglaise block leading-[1.2]"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--color-action)" }}
          >
            {L.signature}
          </span>
          <span className="legende mt-2 block">{L.fonction}</span>
        </p>
      </section>

      {/* ——————————————————————————————————— les créateurs —————
       * Le récit est fini. Reste ce que la maison porte — et le maillage
       * vers les cinq pages de créateurs, qui n'existe nulle part
       * ailleurs sous cette forme groupée. */}
      <TitreSection titre={L.lesCreateurs} lien={{ href: "/robes", label: L.voirLesRobes }} />
      <div className="gouttiere">
        <p className="texte mesure-l">{L.lesCreateursNote}</p>
        <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {CREATEURS.map((c) => (
            <li key={c.nom} data-lever>
              <div className="filet mb-4" />
              <h3 className="titre-section">
                <Link href={`/createurs/${c.slug}`} className="souligne hover:text-action">
                  {createurNom(c, langue)}
                </Link>
              </h3>
              <p className="legende mt-1">{createurOrigine(c, langue)}</p>
              <p className="texte mesure-l mt-3">{createurNote(c, langue)}</p>
            </li>
          ))}
        </ul>
      </div>

      <section className="gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <p className="phrase mesure-l">
            {M.adresse} — {M.codePostal} {M.ville}
          </p>
          <AppelRendezvous className="bouton">{L.prendreRendezvous}</AppelRendezvous>
        </div>
      </section>
    </>
  );
}
