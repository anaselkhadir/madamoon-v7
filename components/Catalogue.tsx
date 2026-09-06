"use client";

import { useRef, useState } from "react";
import { media as chemin } from "@/lib/chemin";
import {
  CATALOGUES_DISPONIBLES,
  envoyerDemande,
  fichierCatalogue,
  type Demande,
} from "@/lib/catalogue";
import { MAISON } from "@/lib/madamoon";

/*
 * Le catalogue.
 *
 * Un bouton blanc posé sur la photographie d'ouverture, et une boîte de
 * dialogue derrière : prénom, nom, courriel, date du mariage. Rien
 * d'autre — chaque champ retiré est une demande de plus qui aboutit.
 *
 * L'intitulé se met au contexte : « le catalogue sirène » sur une coupe,
 * « le catalogue Olya Mak » sur une maison. C'est le même geste partout,
 * mais ce n'est jamais le même catalogue, et il faut que cela se voie
 * avant le clic.
 *
 * Le dialogue est l'élément natif : la pile de focus, la fermeture par
 * Échap et le fond inerte sont donnés par le navigateur. Une boîte
 * refaite à la main les perd presque toujours.
 *
 * La date est un champ de date, jamais trois listes déroulantes. Et elle
 * n'accepte pas hier : on ne prépare pas un mariage qui a eu lieu.
 */

type Props = {
  /* Ce que l'on écrit après « Télécharger le catalogue ». Déjà accordé,
   * déjà en minuscules s'il le faut : « sirène », « Olya Mak ». */
  intitule: string;
  /* « coupe:sirene », « maison:olya-mak », « morphologie:x », « robe:uma ». */
  contexte: string;
  className?: string;
};

const VIDE: Omit<Demande, "contexte" | "intitule"> = {
  prenom: "",
  nom: "",
  email: "",
  mariage: "",
};

export default function Catalogue({ intitule, contexte, className = "bouton-clair" }: Props) {
  const boite = useRef<HTMLDialogElement>(null);
  const premier = useRef<HTMLInputElement>(null);
  const [champs, setChamps] = useState(VIDE);
  const [etat, setEtat] = useState<"repos" | "envoi" | "fait">("repos");
  const [raison, setRaison] = useState("");

  /* Demain : la date du mariage ne peut pas être passée. */
  const demain = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const ouvrir = () => {
    setEtat("repos");
    boite.current?.showModal();
    /* Le focus va au premier champ, pas au bouton de fermeture que le
     * navigateur choisirait de lui-même : on ouvre ce dialogue pour
     * écrire. Il n'existe pas d'événement « open » sur un dialogue — on
     * le place donc juste après l'ouverture. */
    premier.current?.focus();
  };

  const soumettre = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEtat("envoi");
    const r = await envoyerDemande({ ...champs, contexte, intitule });

    /*
     * Le catalogue part quoi qu'il arrive.
     *
     * Il a été promis en échange de quatre lignes ; si notre collecte
     * tombe en panne, c'est notre affaire, pas celle de la mariée. On le
     * remet donc toujours, et l'on dit franchement, en petit, quand la
     * demande n'a pas pu être enregistrée — plutôt que de la renvoyer les
     * mains vides.
     */
    if (CATALOGUES_DISPONIBLES) {
      const a = document.createElement("a");
      a.href = chemin(fichierCatalogue(contexte));
      /* Un nom lisible dans le dossier des téléchargements : c'est là
       * qu'il sera retrouvé dans trois semaines, entre deux devis. */
      a.download = `MADAMOON — Catalogue ${intitule}.pdf`;
      document.body.appendChild(a);
      a.click();
      /* L'ancre n'est retirée qu'au tour suivant : la supprimer dans la
       * foulée du clic annule le téléchargement. */
      window.setTimeout(() => a.remove(), 0);
    }
    setRaison(r.ok ? "" : r.raison);
    setEtat("fait");
  };

  const modifier = (cle: keyof typeof VIDE) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setChamps((c) => ({ ...c, [cle]: e.target.value }));

  return (
    <>
      <button type="button" onClick={ouvrir} className={className}>
        Télécharger le catalogue {intitule}
      </button>

      <dialog
        ref={boite}
        className="dialogue"
        aria-labelledby="titre-catalogue"
        onClose={() => setEtat("repos")}
      >
        <div className="flex items-start justify-between gap-6">
          <p className="legende">Le catalogue</p>
          <button
            type="button"
            onClick={() => boite.current?.close()}
            aria-label="Fermer"
            className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center text-brume transition-colors duration-500 hover:text-encre"
          >
            <span aria-hidden="true" className="relative block h-4 w-4">
              <span className="absolute left-0 top-1/2 block h-px w-full rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 block h-px w-full -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        {etat === "fait" ? (
          <div className="mt-5">
            <p id="titre-catalogue" className="phrase">
              C&apos;est envoyé.
            </p>
            <p className="texte mt-4">
              {CATALOGUES_DISPONIBLES
                ? `Le catalogue ${intitule} se télécharge.`
                : `Vous recevez le catalogue ${intitule} par courriel dans quelques minutes.`}
            </p>
            {raison && (
              <p className="texte mt-4 text-plomb">
                Nous n&apos;avons pas pu enregistrer votre demande. Si vous
                souhaitez que nous vous recontactions, écrivez-nous à{" "}
                <a href={MAISON.emailHref} className="souligne">
                  {MAISON.email}
                </a>
                .
              </p>
            )}
            <button
              type="button"
              onClick={() => boite.current?.close()}
              className="bouton-trait mt-7"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={soumettre} className="mt-5">
            <p id="titre-catalogue" className="phrase">
              Le catalogue {intitule}
            </p>
            <p className="texte mt-3">
              Dites-nous où l&apos;envoyer, et pour quand.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cat-prenom" className="etiquette">
                  Prénom
                </label>
                <input
                  ref={premier}
                  id="cat-prenom"
                  name="prenom"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={champs.prenom}
                  onChange={modifier("prenom")}
                  className="champ"
                />
              </div>
              <div>
                <label htmlFor="cat-nom" className="etiquette">
                  Nom
                </label>
                <input
                  id="cat-nom"
                  name="nom"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={champs.nom}
                  onChange={modifier("nom")}
                  className="champ"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cat-email" className="etiquette">
                  Adresse e-mail
                </label>
                <input
                  id="cat-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="vous@exemple.fr"
                  value={champs.email}
                  onChange={modifier("email")}
                  className="champ"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cat-mariage" className="etiquette">
                  Date du mariage
                </label>
                <input
                  id="cat-mariage"
                  name="mariage"
                  type="date"
                  required
                  min={demain}
                  value={champs.mariage}
                  onChange={modifier("mariage")}
                  className="champ"
                />
                <p className="texte mt-2 text-plomb">
                  Même approximative — elle nous dit s&apos;il reste le temps du sur-mesure.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="submit" disabled={etat === "envoi"} className="bouton">
                {etat === "envoi" ? "Envoi…" : "Recevoir le catalogue"}
              </button>
              <span className="texte text-plomb">
                Vos informations ne servent qu&apos;à cet envoi.
              </span>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
