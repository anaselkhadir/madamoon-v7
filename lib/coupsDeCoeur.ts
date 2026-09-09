"use client";

import { useSyncExternalStore } from "react";

/*
 * Les coups de cœur.
 *
 * Une mariée essaie une robe une fois, en cabine, sur rendez-vous. Entre
 * la première visite du site et ce rendez-vous, il se passe des jours :
 * elle revient, elle hésite, elle montre à sa mère. Ce qu'elle a aimé
 * doit l'attendre.
 *
 * La liste tient dans le navigateur, et nulle part ailleurs. Le site est
 * un export statique sans serveur : il n'y a pas de compte à créer, pas
 * de mot de passe, pas de donnée personnelle qui parte quelque part. Le
 * revers est honnête et doit être dit à la visiteuse : la liste vit sur
 * cet appareil et dans ce navigateur.
 *
 * On ne garde que des identifiants de robe. Le reste — nom, photographie,
 * coupe — se relit dans le catalogue : une liste qui recopierait les
 * fiches vieillirait mal le jour où une robe change de nom.
 */

const CLE = "madamoon.coups-de-coeur";
/* Le même onglet ne reçoit pas l'événement « storage » : il faut donc le
 * nôtre pour que le panier de l'en-tête suive un cœur cliqué à côté. */
const SIGNAL = "madamoon:coups-de-coeur";

/* Un tableau vide et unique : « useSyncExternalStore » compare les
 * instantanés par identité, et un nouveau tableau à chaque lecture le
 * ferait boucler sans fin. */
const VIDE: readonly string[] = [];

let cache: readonly string[] = VIDE;
let lu = false;

function lireDisque(): readonly string[] {
  try {
    const brut = window.localStorage.getItem(CLE);
    const v: unknown = brut ? JSON.parse(brut) : [];
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : VIDE;
  } catch {
    /* Navigation privée, stockage refusé, données illisibles : la liste
     * est vide, le site fonctionne, rien ne casse. */
    return VIDE;
  }
}

export function instantane(): readonly string[] {
  if (!lu) {
    cache = lireDisque();
    lu = true;
  }
  return cache;
}

/* Au rendu du serveur, personne n'a encore rien aimé. */
export function instantaneServeur(): readonly string[] {
  return VIDE;
}

function poser(liste: readonly string[]) {
  cache = liste;
  lu = true;
  try {
    window.localStorage.setItem(CLE, JSON.stringify(liste));
  } catch {
    /* Le stockage peut être plein ou refusé. La liste reste alors en
     * mémoire pour la visite en cours : c'est mieux que rien, et le
     * cœur ne doit pas rester sans réponse sous le doigt. */
  }
  window.dispatchEvent(new Event(SIGNAL));
}

/* La dernière aimée passe devant : c'est celle que l'on vient de voir. */
export function basculer(slug: string) {
  const liste = instantane();
  poser(liste.includes(slug) ? liste.filter((s) => s !== slug) : [slug, ...liste]);
}

export function retirer(slug: string) {
  poser(instantane().filter((s) => s !== slug));
}

export function vider() {
  poser(VIDE);
}

export function abonner(prevenir: () => void) {
  const surSignal = () => prevenir();
  /* Un autre onglet a changé la liste : on la relit avant de prévenir. */
  const surStockage = (e: StorageEvent) => {
    if (e.key === CLE || e.key === null) {
      lu = false;
      prevenir();
    }
  };
  window.addEventListener(SIGNAL, surSignal);
  window.addEventListener("storage", surStockage);
  return () => {
    window.removeEventListener(SIGNAL, surSignal);
    window.removeEventListener("storage", surStockage);
  };
}

export function useCoupsDeCoeur(): readonly string[] {
  return useSyncExternalStore(abonner, instantane, instantaneServeur);
}

export function useEstAime(slug: string): boolean {
  return useCoupsDeCoeur().includes(slug);
}
