"use client";

import Link from "@/components/Lien";
import { useEffect, useState } from "react";
import TitreSection from "@/components/TitreSection";
import Tuile from "@/components/Tuile";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import PartagerSelection from "@/components/parcours/PartagerSelection";
import { ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";
import { ajouter, decoder, PARAM, useCoupsDeCoeur, vider } from "@/lib/coupsDeCoeur";

/*
 * Les coups de cœur.
 *
 * Deux pages en une, selon ce que porte l'adresse.
 *
 * Sans paramètre, c'est la liste de la visiteuse : ce qu'elle a aimé,
 * gardé dans son navigateur.
 *
 * Avec « ?robes=… », c'est la sélection de quelqu'un d'autre — une
 * mariée qui l'a envoyée à sa mère, à son témoin. On la montre alors
 * telle quelle, et l'on ne touche à rien : celle qui reçoit le lien a
 * peut-être ses propres robes, et elles ne doivent pas être remplacées
 * en silence. Elle adopte la sélection si elle le veut, d'un bouton.
 *
 * Rien n'est rendu avant l'hydratation : une page qui annoncerait
 * « aucune robe » le temps d'une image, à quelqu'un qui en a choisi six,
 * aurait déjà menti.
 *
 * Les robes disparues du catalogue sont écartées en silence — un lien
 * gardé six mois peut désigner une robe que la maison ne présente plus.
 */

function robesDe(slugs: readonly string[]) {
  return slugs
    .map((slug) => ROBES.find((r) => r.slug === slug))
    .filter((r): r is (typeof ROBES)[number] => Boolean(r));
}

function Trame({ robes }: { robes: (typeof ROBES)[number][] }) {
  return (
    <div className="trame-tuiles mt-8 grid-cols-2 md:grid-cols-3">
      {robes.map((r, i) => {
        const media = vues(r.slug)[0];
        if (!media) return null;
        return (
          <Tuile
            key={r.slug}
            retard={(i % 3) * 70}
            href={`/robes/${r.slug}`}
            coupDeCoeur={r.slug}
            media={media}
            dossier="robes"
            alt={altRobe(r)}
            nom={r.nom}
            note={r.ligne}
            repere={r.createur}
            priorite={i < 3}
            sizes="(max-width: 768px) 50vw, 31vw"
          />
        );
      })}
    </div>
  );
}

export default function ListeCoupsDeCoeur() {
  const mienne = useCoupsDeCoeur();
  const [monte, setMonte] = useState(false);
  const [recue, setRecue] = useState<readonly string[] | null>(null);

  /* L'adresse est lue une fois montée plutôt que par le crochet de
   * navigation : l'export statique n'aime pas les lecteurs de paramètres
   * hors d'une frontière de suspension, et cette page attend déjà le
   * client pour tout le reste. */
  useEffect(() => {
    setMonte(true);
    const brut = new URLSearchParams(window.location.search).get(PARAM);
    const liste = decoder(brut);
    if (liste.length) setRecue(liste);
  }, []);

  if (!monte) return <div className="min-h-[52svh]" aria-hidden="true" />;

  /* ————————————————————————— une sélection reçue ————— */
  if (recue) {
    const robes = robesDe(recue);
    const manquantes = recue.length - robes.length;
    const toutes = robes.every((r) => mienne.includes(r.slug));

    return (
      <>
        <TitreSection
          niveau={1}
          titre="Une sélection partagée"
          lien={{ href: "/robes", label: "Voir toutes les robes" }}
        />
        <div className="gouttiere pb-[clamp(4rem,8vw,8rem)]">
          {robes.length === 0 ? (
            <>
              <p className="texte mesure-l">
                Ce lien ne désigne aucune robe que nous présentons encore. Le catalogue a
                peut-être changé depuis qu&apos;il a été envoyé.
              </p>
              <Link href="/robes" className="bouton mt-8">
                Voir les robes
              </Link>
            </>
          ) : (
            <>
              <p className="texte mesure-l">
                {robes.length === 1
                  ? "Une robe a été retenue pour vous."
                  : `${robes.length} robes ont été retenues pour vous.`}{" "}
                Elles s&apos;essaient ensemble, sur rendez-vous, au showroom.
              </p>

              <Trame robes={robes} />

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <AppelRendezvous className="bouton">Prendre rendez-vous</AppelRendezvous>
                <button
                  type="button"
                  onClick={() => ajouter(recue)}
                  disabled={toutes}
                  className="bouton-trait disabled:pointer-events-none disabled:opacity-40"
                >
                  {toutes ? "Déjà dans vos coups de cœur" : "Ajouter à mes coups de cœur"}
                </button>
                <Link href="/coups-de-coeur" className="lien-nav souligne text-action">
                  Voir mes coups de cœur
                </Link>
              </div>

              {manquantes > 0 && (
                <p className="legende mt-8 text-brume">
                  {manquantes === 1
                    ? "Une robe de ce lien n'est plus au catalogue."
                    : `${manquantes} robes de ce lien ne sont plus au catalogue.`}
                </p>
              )}
            </>
          )}
        </div>
      </>
    );
  }

  /* ————————————————————————— sa propre liste ————— */
  const robes = robesDe(mienne);

  return (
    <>
      <TitreSection
        niveau={1}
        titre="Vos coups de cœur"
        lien={{ href: "/robes", label: "Voir toutes les robes" }}
      />
      <div className="gouttiere pb-[clamp(4rem,8vw,8rem)]">
        {robes.length === 0 ? (
          <>
            <p className="texte mesure-l">
              Vous n&apos;avez pas encore de coup de cœur. Parcourez le catalogue et
              touchez le cœur posé sur une robe : elle vous attendra ici.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/robes" className="bouton">
                Voir les robes
              </Link>
              <Link href="/morphologies" className="lien-nav souligne text-action">
                Partir de ma silhouette
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="texte mesure-l">
              {robes.length === 1 ? "Une robe retenue." : `${robes.length} robes retenues.`}{" "}
              Apportez cette liste au showroom : l&apos;essayage se prépare mieux quand on
              sait par où commencer.
            </p>

            <Trame robes={robes} />

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <AppelRendezvous className="bouton">Prendre rendez-vous</AppelRendezvous>
              <PartagerSelection slugs={robes.map((r) => r.slug)} />
              <button
                type="button"
                onClick={vider}
                className="lien-nav souligne text-plomb transition-colors duration-500 hover:text-encre"
              >
                Vider la liste
              </button>
            </div>

            <p className="legende mt-10 text-brume">
              Cette liste est gardée dans ce navigateur. Elle ne vous suit pas d&apos;un
              appareil à l&apos;autre et ne nous est pas transmise — le lien de partage,
              lui, porte la sélection avec lui.
            </p>
          </>
        )}
      </div>
    </>
  );
}
