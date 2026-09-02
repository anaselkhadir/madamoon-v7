import Link from "next/link";
import TitreSection from "@/components/TitreSection";
import Photo from "@/components/media/Photo";
import { SCENES } from "@/lib/medias";
import { MAISON } from "@/lib/madamoon";
import { altScene } from "@/lib/alt";

/*
 * Le showroom.
 *
 * Une grande photographie, un texte court, un lien discret — le schéma de
 * la référence pour ses boutiques. Les informations utiles (adresse,
 * horaires) sont données une fois, sans paragraphe.
 */

export default function Showroom() {
  return (
    <section aria-labelledby="showroom">
      <TitreSection id="showroom" titre="Le showroom" />
      <div className="gouttiere">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-[1.55fr_1fr] md:items-end">
          <div className="relative overflow-hidden" data-voile>
            <Photo
              media={SCENES["showroom"]}
              dossier="scenes"
              alt={altScene("Robes de mariée suspendues dans la lumière du showroom")}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div data-lever>
            <p className="phrase">
              Une heure, le showroom pour vous seule, et quelqu&apos;un qui connaît
              chaque robe.
            </p>
            <dl className="mt-8 flex flex-col gap-3">
              <div>
                <dt className="legende">Adresse</dt>
                <dd className="texte">
                  {MAISON.adresse}
                  <br />
                  {MAISON.codePostal} {MAISON.ville}
                </dd>
              </div>
              <div>
                <dt className="legende">Horaires</dt>
                <dd className="texte">
                  {MAISON.horaires.map((h) => (
                    <span key={h.jour} className="block">
                      {h.jour} — {h.heures}
                    </span>
                  ))}
                  <span className="block text-plomb">{MAISON.mentionHoraires}</span>
                </dd>
              </div>
            </dl>
            <Link href="/showroom" className="bouton-trait mt-8">
              Découvrir le showroom
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
