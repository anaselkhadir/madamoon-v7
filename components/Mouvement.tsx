"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { enregistrerLenis, mouvementReduit } from "@/lib/mouvement";

/*
 * Le mouvement du site.
 *
 * Un seul défilement, continu, sans accroche ni « slide suivante » : Lenis
 * lisse la molette, les scènes suivent le scroll — elles ne le pilotent
 * jamais. On peut s'arrêter n'importe où.
 *
 * Les apparitions ([data-lever], [data-voile]) passent par un simple
 * IntersectionObserver, doublé d'un filet de sécurité : si l'observateur
 * ne se déclenche pas (onglet en arrière-plan, environnement particulier),
 * un contrôle au défilement puis un délai révèlent quand même le contenu.
 * Une décoration ne doit jamais pouvoir cacher une page.
 */

export default function Mouvement() {
  const chemin = usePathname();

  useEffect(() => {
    if (mouvementReduit()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      /* Sur mobile, le défilement natif reste le meilleur. */
      syncTouch: false,
    });
    enregistrerLenis(lenis);

    let image = requestAnimationFrame(function boucle(t: number) {
      lenis.raf(t);
      image = requestAnimationFrame(boucle);
    });

    return () => {
      cancelAnimationFrame(image);
      enregistrerLenis(null);
      lenis.destroy();
    };
  }, []);

  /* Les apparitions, remontées à chaque page. */
  useEffect(() => {
    const cibles = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-lever]:not([data-leve]), [data-voile]:not([data-leve])"
      )
    );
    if (!cibles.length) return;

    if (mouvementReduit()) {
      cibles.forEach(reveler);
      return;
    }

    const obs = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const retard = Number(el.dataset.retard ?? 0);
          window.setTimeout(() => reveler(el), retard);
          obs.unobserve(el);
        });
      },
      /* La marge est positive : l'image se découvre pendant qu'elle
       * monte, pas une fois arrivée. On ne voit jamais de trou blanc. */
      { rootMargin: "0px 0px 18% 0px", threshold: 0 }
    );
    cibles.forEach((el) => obs.observe(el));

    /* Filet de sécurité : ce qui est à l'écran finit toujours par paraître. */
    const rattraper = () => {
      let restant = false;
      for (const el of cibles) {
        if (el.dataset.leve) continue;
        const b = el.getBoundingClientRect();
        if (b.top < window.innerHeight * 1.18 && b.bottom > 0) {
          obs.unobserve(el);
          reveler(el);
        } else {
          restant = true;
        }
      }
      if (!restant) {
        window.removeEventListener("scroll", surScroll);
      }
    };

    let attente = 0;
    const surScroll = () => {
      window.clearTimeout(attente);
      attente = window.setTimeout(rattraper, 180);
    };
    window.addEventListener("scroll", surScroll, { passive: true });
    const amorce = window.setTimeout(rattraper, 400);

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", surScroll);
      window.clearTimeout(attente);
      window.clearTimeout(amorce);
    };
  }, [chemin]);

  return null;
}

function reveler(el: HTMLElement) {
  if (el.dataset.leve) return;
  if ("voile" in el.dataset) {
    el.style.transition = "clip-path 0.75s var(--ease-rideau)";
    el.style.clipPath = "inset(0 0 0% 0)";
  } else {
    el.style.transition =
      "opacity 0.6s var(--ease-doux), transform 0.7s var(--ease-doux)";
    el.style.opacity = "1";
    el.style.transform = "none";
  }
  el.dataset.leve = "1";
  window.setTimeout(() => {
    el.style.willChange = "auto";
  }, 900);
}
