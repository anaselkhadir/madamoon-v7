import Link from "next/link";
import Photo from "@/components/media/Photo";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";

/*
 * Le dos d'Uma.
 *
 * Le cadrage est calé tout en haut : sur une image trois fois plus haute
 * que le cadre, quelques pour cent décident si l'on regarde le dos de
 * dentelle ou la chute de la jupe. À zéro, la ligne de boutons occupe le
 * centre — c'est le dos, le sujet.
 *
 * Une seule image, plein cadre, tenue haut : la dentelle et la ligne de
 * boutons occupent l'écran. Une phrase, un lien. C'est la scène la plus
 * silencieuse du site — elle n'a rien à vendre, elle montre.
 */

export default function Dos() {
  return (
    <section aria-labelledby="dos" className="relative h-[86svh] min-h-[30rem] overflow-hidden">
      <Photo
        media={SCENES["dos-uma-large"]}
        dossier="scenes"
        alt={altScene("Dos d'une robe de mariée en dentelle fermée par une ligne de boutons, modèle Uma")}
        sizes="100vw"
        position="50% 0%"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.18) 44%, rgba(0,0,0,0) 74%)",
        }}
      />
      <div className="gouttiere absolute inset-0 flex flex-col justify-center">
        <div className="max-w-[46vw] max-md:max-w-[92%]">
          <h2 id="dos" className="affiche text-blanc">
            Le dos, d&apos;abord
          </h2>
          <p className="accroche mt-6 text-blanc">
            C&apos;est lui que l&apos;on regarde pendant toute la cérémonie
          </p>
          <Link href="/robes/uma" className="bouton-clair mt-6">
            Voir le modèle Uma
          </Link>
        </div>
      </div>
    </section>
  );
}
