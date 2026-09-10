import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";

/*
 * Le showroom.
 *
 * Le passage de l'écran au réel. Après les paroles des mariées, une
 * porte — celle du 234, rue du Faubourg Saint-Martin — sur toute la
 * largeur, et trois lignes.
 *
 * L'adresse et les horaires ne sont plus ici : ils sont dans le pied de
 * page, et sur la page du showroom. Les répéter en tête d'une image
 * pleine page en ferait un encadré de renseignements, ce qui est
 * exactement le contraire de l'effet recherché.
 *
 * L'image se rapproche très lentement, quarante secondes pour six pour
 * cent. On ne le voit pas ; on sent seulement que l'image n'est pas
 * morte. Le voile est un dégradé, comme sur le hero : il ne teinte pas
 * la photographie, il tient le texte lisible dans son coin.
 */

export default function Showroom() {
  return (
    <section
      aria-labelledby="showroom"
      className="relative h-[92svh] min-h-[32rem] overflow-hidden"
    >
      <div className="absolute inset-0 respire">
        <Photo
          media={SCENES["seuil"]}
          dossier="scenes"
          alt={altScene("L'entrée du showroom MADAMOON, rue du Faubourg Saint-Martin")}
          sizes="100vw"
          position="50% 42%"
          className="h-full w-full object-cover"
        />
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(10deg, rgba(0,0,0,0.56) 0%, rgba(0,0,0,0.24) 42%, rgba(0,0,0,0) 76%)",
        }}
      />

      <div className="gouttiere absolute inset-x-0 bottom-0 pb-[clamp(3rem,7vw,6rem)]">
        <p className="legende text-blanc/70">Le showroom — Paris 10<sup>e</sup></p>
        <span data-ligne className="mt-4 block">
          <h2 id="showroom" className="affiche max-w-[18ch] text-blanc">
            Poussez la porte
          </h2>
        </span>
        <p className="accroche mesure-l mt-5 text-blanc">
          Une heure, le showroom pour vous seule, et quelqu&apos;un qui connaît
          chaque robe.
        </p>
        <Link href="/showroom" className="bouton-clair mt-7">
          Découvrir le showroom
        </Link>
      </div>
    </section>
  );
}
