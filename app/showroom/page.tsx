import type { Metadata } from "next";
import Link from "next/link";
import TitreSection from "@/components/TitreSection";
import Photo from "@/components/media/Photo";
import { MAISON, SIGNATURES } from "@/lib/madamoon";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";

/*
 * Le showroom.
 *
 * Une image plein cadre, puis trois photographies de la maison et le peu
 * qu'il faut savoir avant de venir. Le même langage que partout ailleurs.
 */

export const metadata: Metadata = {
  title: "Showroom robe de mariée à Paris 10e",
  description:
    "Le showroom MADAMOON, 234 rue du Faubourg Saint-Martin à Paris 10e : essayage privé d'une heure, sur rendez-vous, accompagnée de qui vous voulez.",
  alternates: { canonical: "/showroom" },
};

const VUES = ["lumiere", "dentelle", "voile"] as const;

export default function Showroom() {
  return (
    <>
      <section className="relative h-[80svh] min-h-[28rem] overflow-hidden">
        <Photo
          media={SCENES["showroom"]}
          dossier="scenes"
          alt={altScene("Robes de mariée suspendues dans le showroom")}
          sizes="100vw"
          priorite
          className="absolute inset-0 h-full w-full object-cover"
        />
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
            <h1 className="affiche text-blanc">Le showroom</h1>
            <p className="accroche mt-6 text-blanc">
              Paris 10<sup>e</sup> — sur rendez-vous
            </p>
            <Link href="/rendez-vous" className="bouton-clair mt-6">
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      <TitreSection titre="La visite" />
      <div className="gouttiere">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-[1fr_1fr]">
          <p className="phrase mesure-l">
            Une heure, le showroom privatisé, et quelqu&apos;un qui connaît chaque robe.
          </p>
          <ul className="flex flex-col gap-4 self-center">
            {SIGNATURES.map((s) => (
              <li key={s.titre} className="flex gap-4">
                <span aria-hidden="true" className="mt-[0.6rem] h-px w-6 shrink-0 bg-fil" />
                <span>
                  <span className="legende block text-encre">{s.titre}</span>
                  <span className="texte">{s.texte}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gouttiere pt-[clamp(2rem,3.5vw,3.5rem)]">
        <div className="trame-tuiles md:grid-cols-3">
          {VUES.map((v, i) => (
            <div key={v} className="tuile" data-voile data-retard={i * 110}>
              <Photo
                media={SCENES[v]}
                dossier="scenes"
                alt={altScene("Détail d'une robe de mariée")}
                sizes="(max-width: 768px) 100vw, 31vw"
              />
            </div>
          ))}
        </div>
      </div>

      <section className="gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="legende">Venir</h2>
            <p className="phrase mt-4">
              {MAISON.adresse}
              <br />
              {MAISON.codePostal} {MAISON.ville}
            </p>
            <p className="texte mt-4">
              {MAISON.horaires.map((h) => (
                <span key={h.jour} className="block">
                  {h.jour} — {h.heures}
                </span>
              ))}
              <span className="block text-plomb">{MAISON.mentionHoraires}</span>
            </p>
          </div>
          <Link href="/rendez-vous" className="bouton">
            Prendre rendez-vous
          </Link>
        </div>
      </section>
    </>
  );
}
