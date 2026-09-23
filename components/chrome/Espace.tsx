"use client";

import Link from "@/components/Lien";
import { usePathname } from "next/navigation";
import { langueDe } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * L'espace de la mariée, en icône.
 *
 * Une silhouette, à côté du rendez-vous : le mot « Mon espace » prenait
 * la place d'une entrée de rubrique pour une fonction qui n'en est pas
 * une. Le trait suit la couleur de la barre, comme le cœur voisin.
 *
 * Elle mène à la page d'attente tant que les comptes ne sont pas
 * ouverts : un lien mort vaut moins qu'une phrase qui annonce.
 */

export default function Espace() {
  const L = t(langueDe(usePathname() ?? "/"));

  return (
    <Link
      href="/espace"
      aria-label={L.raccourcis.monEspace}
      title={L.raccourcis.monEspace}
      className="lien-nav flex shrink-0 items-center py-3 pl-3 transition-opacity duration-500 hover:opacity-70"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[1.05rem] w-[1.05rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="3.6" />
        <path d="M4.8 20c0-3.6 3.2-5.6 7.2-5.6s7.2 2 7.2 5.6" />
      </svg>
    </Link>
  );
}
