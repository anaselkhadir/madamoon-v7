"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/*
 * La carte flottante, comme sur la référence.
 *
 * 271 px de large, calée à 48 px du bas et 60 px de la droite. Une ligne
 * de texte, un bouton. Elle ne bouge pas, ne s'anime pas, ne demande
 * rien : elle attend. Elle s'efface au-dessus du pied de page, et sur la
 * page de rendez-vous elle n'a plus de raison d'être.
 */

export default function CarteRendezvous() {
  const chemin = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* Elle paraît une fois le premier écran passé, jamais avant. */
    const pied = document.querySelector("footer");
    const surScroll = () => {
      const passe = window.scrollY > window.innerHeight * 0.35;
      const basAtteint = pied
        ? pied.getBoundingClientRect().top < window.innerHeight - 40
        : false;
      setVisible(passe && !basAtteint);
    };
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surScroll);
    return () => {
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surScroll);
    };
  }, [chemin]);

  if (chemin === "/rendez-vous") return null;

  return (
    <aside
      aria-label="Prendre rendez-vous"
      className={`fixed bottom-4 right-4 z-40 w-[17rem] max-w-[calc(100vw-2rem)] bg-craie px-5 py-4 text-center transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-doux)] md:bottom-12 md:right-[3.75rem] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <p className="mention mb-3 text-encre">Votre essayage privé</p>
      <Link href="/rendez-vous" className="bouton w-full">
        Prendre rendez-vous
      </Link>
    </aside>
  );
}
