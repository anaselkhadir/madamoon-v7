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
       *
       * Une seule composition, et non trois blocs empilés.
       *
       * Le titre, le sous-titre et la citation occupaient chacun leur
       * bande, sans lien : le titre flottait seul dans un vide, le
       * sous-titre tombait à onze pixels — la promesse de la page écrite
       * en taille de légende —, et la citation arrivait ensuite sans
       * qu'on sache encore qui parle.
       *
       * Les trois se rangent maintenant dans une seule colonne, en trois
       * corps décroissants : le titre, le chapeau, la citation. La
       * hiérarchie se fait par la taille et par l'espace, jamais par la
       * couleur — une page qui n'a qu'un rouge ne peut pas s'en servir
       * pour ranger trois niveaux.
       *
       * La citation est enfin attribuée. On lit la page entière à la
       * première personne : il faut savoir dès la première ligne de qui
       * elle est.
       *
       * Le portrait file jusqu'au bord droit et tient toute la hauteur
       * du bloc. Posé dans une boîte avec une gouttière à sa droite, il
       * laissait une bande morte le long de l'écran et se lisait comme
       * une vignette ; au bord, il fait corps avec le texte. */}
      <section className="pt-[var(--entete)]">
        <div className="gouttiere grid gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-[clamp(2.5rem,5vw,4rem)] py-[clamp(2.5rem,5.5vw,5rem)] md:grid-cols-[1fr_auto] md:items-center">
          <header>
            <h1 className="affiche">{L.titre}</h1>
            <p className="phrase est-moyenne mesure-l mt-5" style={{ color: "var(--color-plomb)" }}>
              {L.sousTitre}
            </p>

            <div className="filet mt-[clamp(2rem,4vw,3rem)] max-w-[22rem]" />

            <blockquote data-lever className="m-0 mt-[clamp(1.5rem,3vw,2.25rem)]">
              {/* Le guillemet est dessiné, pas écrit : à cette taille il
                * appartient au décor, et un lecteur d'écran n'a pas à
                * l'annoncer. */}
              <span
                aria-hidden="true"
                className="block font-serif leading-[0.5]"
                style={{
                  fontSize: "clamp(3rem,6vw,5rem)",
                  color: "color-mix(in srgb, var(--color-action) 22%, transparent)",
                }}
              >
                &laquo;
              </span>
              <p className="phrase mesure-l mt-1" style={{ textWrap: "balance" }}>
                {L.citation}
              </p>
              <footer className="legende mt-5">
                {L.signature} — {L.fonction}
              </footer>
            </blockquote>
          </header>

          {/*
           * Le portrait, en tirage encadré.
           *
           * Demandé par la maison : cadre blanc, esprit ancien. La
           * photographie filait jusqu'au bord de l'écran — un cadre ne
           * peut pas border une image qui sort de la page, elle revient
           * donc dans la gouttière et redevient un objet posé.
           *
           * Les proportions sont celles d'un tirage instantané : une
           * marge égale sur trois côtés, et le triple en bas. C'est
           * cette marge basse, et elle seule, qui fait reconnaître le
           * format — un liseré régulier ne serait qu'un cadre.
           *
           * Le blanc est « sur-image » et non « blanc » : le jeton blanc
           * désigne la surface du site, qui noircit en thème sombre, et
           * le cadre serait devenu noir. Un tirage reste blanc.
           *
           * L'inclinaison est d'un degré et demi : assez pour qu'on voie
           * une photographie posée plutôt que collée, trop peu pour
           * qu'on la croie de travers. Elle est portée par le cadre, et
           * la révélation par l'enveloppe — « data-lever » écrit lui
           * aussi une transformation, et les deux s'écraseraient.
           */}
          <div data-lever className="flex justify-center md:justify-end">
            <figure
              className="m-0 w-full max-w-[20rem] md:w-[clamp(15rem,26vw,22rem)]"
              style={{
                background: "var(--color-sur-image)",
                padding: "clamp(0.6875rem,1.3vw,1rem)",
                paddingBottom: "clamp(2.5rem,4.5vw,3.5rem)",
                boxShadow:
                  "0 22px 48px -26px rgba(20,16,12,0.5), 0 3px 8px -4px rgba(20,16,12,0.22)",
                transform: "rotate(-1.5deg)",
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "3 / 4",
                  boxShadow: "inset 0 0 0 1px rgba(20,16,12,0.07)",
                }}
              >
                <Photo
                  media={SCENES["mouna"]}
                  dossier="scenes"
                  alt={L.altMouna}
                  sizes="(max-width: 768px) 85vw, 26vw"
                  priorite
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ————————————————————————————————————————— le nom —————
       *
       * Le meilleur moment du récit, et il était en petit.
       *
       * « Madame Moon » devenu MADAMOON tenait sur une ligne, au milieu
       * d'un bloc, entre un titre et deux paragraphes : l'idée la plus
       * singulière de la page passait pour une note. Elle devient le
       * sommet visuel de la section — l'anglaise au-dessus, la maison en
       * capitales au-dessous, et le trait vertical qui dit « devient ».
       *
       * Vertical, et non horizontal : un trait couché sépare deux noms
       * de même rang, un trait debout en fait descendre un du premier.
       *
       * La section est centrée, seule de la page à l'être. C'est une
       * respiration voulue entre deux chapitres alignés à gauche — mais
       * les deux paragraphes, eux, restent alignés à gauche dans leur
       * colonne : un texte courant centré se lit mal des deux côtés. */}
      <section className="gouttiere py-[clamp(3rem,6vw,6rem)]">
        <div className="mx-auto flex max-w-[34rem] flex-col items-center">
          <h2 className="phrase text-center" style={{ textWrap: "balance" }}>
            {L.nomTitre}
          </h2>

          <div
            data-lever
            className="mt-[clamp(2rem,4vw,3rem)] flex flex-col items-center gap-[clamp(0.75rem,1.6vw,1.25rem)]"
          >
            <span
              className="font-anglaise leading-[1.05]"
              style={{ fontSize: "clamp(2.25rem,5.5vw,4rem)", color: "var(--color-plomb)" }}
            >
              {L.nomAvant}
            </span>
            <span
              aria-hidden="true"
              className="block w-px bg-fil"
              style={{ height: "clamp(1.75rem,3.5vw,2.75rem)" }}
            />
            <span className="affiche" style={{ fontSize: "clamp(1.75rem,4vw,3rem)" }}>
              {L.nomApres}
            </span>
          </div>

          <div className="mt-[clamp(2rem,4vw,3rem)] self-stretch">
            {L.nomTexte.map((p) => (
              <p key={p} className="texte mt-5 first:mt-0">
                {p}
              </p>
            ))}
          </div>
        </div>
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
