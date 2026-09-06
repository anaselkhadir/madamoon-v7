/*
 * Les demandes de catalogue.
 *
 * Le site est exporté en fichiers statiques : il n'a pas de serveur à
 * lui. Une demande part donc directement du navigateur vers un point de
 * collecte, et c'est la seule ligne à renseigner ici.
 *
 * Tant que CATALOGUE_ENDPOINT est vide, le formulaire le dit franchement
 * au lieu de faire semblant d'avoir envoyé. Un formulaire qui remercie
 * sans rien transmettre est pire que pas de formulaire du tout : la
 * cliente croit avoir des demandes, et la mariée croit avoir écrit.
 */

export const CATALOGUE_ENDPOINT = "";

export type Demande = {
  prenom: string;
  nom: string;
  email: string;
  /* Au format ISO, tel que le rend un champ de type date. */
  mariage: string;
  /* Ce que la visiteuse regardait : « coupe:sirene », « maison:olya-mak »,
   * « morphologie:x », « robe:uma ». C'est ce qui dit quel catalogue
   * envoyer, et d'où vient la demande. */
  contexte: string;
  /* L'intitulé lisible du même contexte, pour ne pas avoir à le
   * reconstruire à la lecture. */
  intitule: string;
};

export type Resultat = { ok: true } | { ok: false; raison: string };

export async function envoyerDemande(d: Demande): Promise<Resultat> {
  if (!CATALOGUE_ENDPOINT) {
    return {
      ok: false,
      raison: "Le formulaire n'est pas encore relié. Écrivez-nous en attendant.",
    };
  }
  try {
    const r = await fetch(CATALOGUE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...d, envoyeeLe: new Date().toISOString() }),
    });
    if (!r.ok) return { ok: false, raison: "L'envoi a échoué. Réessayez dans un instant." };
    return { ok: true };
  } catch {
    return { ok: false, raison: "L'envoi a échoué. Vérifiez votre connexion." };
  }
}

/*
 * Le fichier à remettre.
 *
 * Un catalogue par univers, nommé d'après le contexte : « coupe:sirene »
 * donne coupe-sirene.pdf. Les fichiers sont fabriqués par
 * outils/catalogues.py et déposés dans /public/catalogues.
 */
export const CATALOGUES_DISPONIBLES = true;

export function fichierCatalogue(contexte: string): string {
  return `/catalogues/${contexte.replace(":", "-")}.pdf`;
}
