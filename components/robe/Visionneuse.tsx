"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as EvPointeur } from "react";
import Photo, { precharger } from "@/components/media/Photo";
import type { Media } from "@/lib/medias";
import { degelerDefilement, gelerDefilement } from "@/lib/mouvement";

/*
 * La visionneuse des photographies d'une robe.
 *
 * On clique une vue de la galerie, elle s'ouvre en grand sur un fond
 * sombre ; une croix la ferme, deux flèches passent à la suivante.
 *
 * Elle ne s'ouvre jamais sur le premier écran : celui-là est un
 * bandeau, pas une photographie que l'on regarde — et c'est la demande
 * de la maison.
 *
 * Trois choses qu'une boîte à images doit faire et que l'on oublie :
 *
 * Le clavier. Échap ferme, les flèches passent d'une vue à l'autre, et
 * la tabulation reste enfermée dans la fenêtre — sans quoi elle
 * continue dans la page derrière, qu'on ne voit plus.
 *
 * Le retour du regard. À l'ouverture, le focus va sur la croix ; à la
 * fermeture, il revient sur la vignette d'où l'on est parti, et non en
 * haut de la page.
 *
 * La page derrière. Elle est gelée : sans cela, la molette la fait
 * défiler sous la photographie, et l'on ressort ailleurs.
 *
 * Le zoom, signalé par la maison : ses clientes ne pouvaient pas
 * agrandir la photographie ouverte. Le gel de la page coupe le
 * défilement doux (Lenis), qui avale alors tous les gestes du doigt —
 * le pincement compris. La visionneuse a donc son propre zoom :
 *
 * - à la souris, un clic agrandit à l'endroit visé, la photographie
 *   suit ensuite le pointeur, un second clic la rend entière ; le
 *   pincement du pavé tactile agrandit aussi ;
 * - au doigt, on pince, on promène d'un doigt, on touche deux fois pour
 *   agrandir ou revenir ; sans zoom, un glissé de côté passe à la vue
 *   voisine ;
 * - une loupe sous la photographie fait la même chose, pour le clavier
 *   et pour qui ne connaît pas le geste.
 *
 * Agrandie, la photographie demande son fichier le plus grand : on ne
 * zoome pas dans le flou d'une vignette.
 */

/* Les rangs sont une liste de textes déjà écrits, et non une fonction
 * qui les écrit : une fonction ne traverse pas la frontière du serveur
 * vers le client — React la refuse, et la page tombe en cinq cents. */
export type Libelles = {
  fermer: string;
  precedente: string;
  suivante: string;
  rangs: string[];
  titre: string;
  zoomer: string;
  dezoomer: string;
};

type Props = {
  photos: Media[];
  alts: string[];
  libelles: Libelles;
  /* L'index affiché, ou null quand la visionneuse est fermée. */
  index: number | null;
  surChangement: (i: number) => void;
  surFermeture: () => void;
};

/*
 * La mesure de la photographie ouverte.
 *
 * Elle était écrite « 80vw », et c'était faux : l'image n'est pas
 * tenue par sa largeur mais par sa hauteur — quatre-vingts pour cent
 * de l'écran —, et une verticale de deux tiers y occupe à peu près la
 * moitié de cette hauteur en largeur. Le navigateur, croyant devoir
 * remplir quatre-vingts pour cent de la fenêtre, prenait le fichier de
 * mille sept cents pixels : cent quarante-deux kilo-octets, quand la
 * vignette avait déjà celui de huit cents en mémoire.
 *
 * À cinquante pour cent de la hauteur, il retient le même fichier que
 * la vignette sur un écran d'ordinateur : la photographie est là au
 * clic, sans un octet de plus. Au doigt, la vignette fait la moitié de
 * la fenêtre et la photographie toute la largeur : celle-là monte d'un
 * cran, et c'est justifié.
 */
export const MESURE = "(max-width: 900px) 92vw, 50vh";
/* Agrandie : le plus grand fichier de la photographie. */
const MESURE_AGRANDIE = "(max-width: 900px) 300vw, 160vh";

/* Le zoom d'un clic ou d'une double touche, et le plus fort au pincement. */
const ZOOM = 2.5;
const ZOOM_MAX = 4;

/* La croix et les chevrons sont dessinés : un « × » et un « ‹ » pris
 * dans la police n'ont ni la même graisse ni le même centre d'une
 * machine à l'autre. */
function Croix() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function Loupe({ moins }: { moins: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L20 20M7.5 10.5h6" />
      {!moins && <path d="M10.5 7.5v6" />}
    </svg>
  );
}

function Chevron({ vers }: { vers: "gauche" | "droite" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={vers === "gauche" ? "M15 4l-8 8 8 8" : "M9 4l8 8-8 8"} />
    </svg>
  );
}

export default function Visionneuse({
  photos,
  alts,
  libelles,
  index,
  surChangement,
  surFermeture,
}: Props) {
  const ouverte = index !== null;
  const fenetre = useRef<HTMLDivElement>(null);
  const croix = useRef<HTMLButtonElement>(null);

  /*
   * Le zoom. La position change à chaque image d'un geste : elle vit
   * dans une référence et s'écrit directement sur le plan, sans rendu.
   * Seul « agrandie » passe par l'état — il change le fichier demandé
   * et le curseur, une fois par geste.
   *
   * Le plan est agrandi depuis son centre : « x » et « y » sont ses
   * décalages, en pixels, bornés pour qu'aucun bord ne laisse voir le
   * vide.
   */
  const cadre = useRef<HTMLDivElement>(null);
  const plan = useRef<HTMLDivElement>(null);
  const vue = useRef({ s: 1, x: 0, y: 0 });
  const [agrandie, setAgrandie] = useState(false);
  const pointeurs = useRef(new Map<number, { x: number; y: number }>());
  const geste = useRef<
    | { type: "pincer"; s0: number; x0: number; y0: number; d0: number; mx0: number; my0: number }
    | { type: "glisser"; x0: number; y0: number; px: number; py: number; t: number; pince: boolean }
    | null
  >(null);
  const dernierToucher = useRef(0);
  const typePointeur = useRef("mouse");

  const poser = useCallback((s: number, x: number, y: number, anime: boolean) => {
    const el = plan.current;
    if (!el) return;
    s = Math.min(Math.max(s, 1), ZOOM_MAX);
    const mx = ((s - 1) * el.offsetWidth) / 2;
    const my = ((s - 1) * el.offsetHeight) / 2;
    x = Math.min(Math.max(x, -mx), mx);
    y = Math.min(Math.max(y, -my), my);
    vue.current = { s, x, y };
    el.style.transition = anime ? "transform 0.45s var(--ease-doux)" : "none";
    el.style.transform = s === 1 ? "" : `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    setAgrandie(s > 1.01);
  }, []);

  /* Le décalage d'un point de l'écran par rapport au centre du cadre. */
  const decalage = (cx: number, cy: number) => {
    const r = cadre.current?.getBoundingClientRect();
    if (!r) return { dx: 0, dy: 0 };
    return { dx: cx - (r.left + r.width / 2), dy: cy - (r.top + r.height / 2) };
  };

  /* Agrandir en gardant sous le doigt — ou le pointeur — le point visé. */
  const zoomerEn = useCallback(
    (cx: number, cy: number, s: number, anime: boolean) => {
      const { dx, dy } = decalage(cx, cy);
      const v = vue.current;
      poser(s, dx - ((dx - v.x) / v.s) * s, dy - ((dy - v.y) / v.s) * s, anime);
    },
    [poser]
  );

  const basculer = (cx?: number, cy?: number) => {
    if (vue.current.s > 1.01) return poser(1, 0, 0, true);
    const r = cadre.current?.getBoundingClientRect();
    if (!r) return;
    zoomerEn(cx ?? r.left + r.width / 2, cy ?? r.top + r.height / 2, ZOOM, true);
  };

  /* Chaque vue s'ouvre entière. */
  useEffect(() => {
    vue.current = { s: 1, x: 0, y: 0 };
    geste.current = null;
    pointeurs.current.clear();
    if (plan.current) plan.current.style.transform = "";
    setAgrandie(false);
  }, [index]);

  /* Le pincement du pavé tactile arrive en molette, touche Ctrl
   * enfoncée. Écouté hors de React pour pouvoir l'empêcher de zoomer la
   * page entière. */
  useEffect(() => {
    const el = cadre.current;
    if (!el) return;
    const molette = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      zoomerEn(e.clientX, e.clientY, vue.current.s * Math.exp(-e.deltaY * 0.01), false);
    };
    el.addEventListener("wheel", molette, { passive: false });
    return () => el.removeEventListener("wheel", molette);
  }, [index, zoomerEn]);

  const surAppui = (e: EvPointeur<HTMLDivElement>) => {
    typePointeur.current = e.pointerType;
    if (e.pointerType === "mouse") return;
    /* Le doigt reste à nous même s'il sort du cadre. Certains
     * navigateurs refusent la capture : le geste continue sans elle. */
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    pointeurs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const p = [...pointeurs.current.values()];
    const v = vue.current;
    if (p.length >= 2) {
      const m = decalage((p[0].x + p[1].x) / 2, (p[0].y + p[1].y) / 2);
      geste.current = {
        type: "pincer",
        s0: v.s,
        x0: v.x,
        y0: v.y,
        d0: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1,
        mx0: m.dx,
        my0: m.dy,
      };
    } else {
      geste.current = { type: "glisser", x0: v.x, y0: v.y, px: e.clientX, py: e.clientY, t: performance.now(), pince: false };
    }
  };

  const surMouvement = (e: EvPointeur<HTMLDivElement>) => {
    const v = vue.current;
    if (e.pointerType === "mouse") {
      /* Agrandie, la photographie suit le pointeur : le bord visé vient
       * au bord du cadre. */
      if (v.s <= 1.01) return;
      const { dx, dy } = decalage(e.clientX, e.clientY);
      poser(v.s, dx * (1 - v.s), dy * (1 - v.s), false);
      return;
    }
    if (!pointeurs.current.has(e.pointerId)) return;
    pointeurs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = geste.current;
    const p = [...pointeurs.current.values()];
    if (g?.type === "pincer" && p.length >= 2) {
      const d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      const m = decalage((p[0].x + p[1].x) / 2, (p[0].y + p[1].y) / 2);
      const s = Math.min(Math.max((g.s0 * d) / g.d0, 1), ZOOM_MAX);
      /* Le point qui était sous les doigts y reste. */
      poser(s, m.dx - ((g.mx0 - g.x0) / g.s0) * s, m.dy - ((g.my0 - g.y0) / g.s0) * s, false);
    } else if (g?.type === "glisser" && v.s > 1.01) {
      poser(v.s, g.x0 + e.clientX - g.px, g.y0 + e.clientY - g.py, false);
    }
  };

  const surLacher = (e: EvPointeur<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    const g = geste.current;
    pointeurs.current.delete(e.pointerId);
    const reste = [...pointeurs.current.values()];
    const v = vue.current;
    if (g?.type === "pincer") {
      if (v.s < 1.05) poser(1, 0, 0, true);
      /* Un doigt reste posé : il reprend la photographie là où elle est. */
      geste.current = reste.length
        ? { type: "glisser", x0: vue.current.x, y0: vue.current.y, px: reste[0].x, py: reste[0].y, t: 0, pince: true }
        : null;
      return;
    }
    if (g?.type === "glisser" && !g.pince) {
      const dx = e.clientX - g.px;
      const dy = e.clientY - g.py;
      const bref = performance.now() - g.t < 300 && Math.hypot(dx, dy) < 10;
      if (bref) {
        const maintenant = performance.now();
        if (maintenant - dernierToucher.current < 320) {
          dernierToucher.current = 0;
          basculer(e.clientX, e.clientY);
        } else {
          dernierToucher.current = maintenant;
        }
      } else if (v.s <= 1.01 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        aller(dx < 0 ? 1 : -1);
      }
    }
    geste.current = null;
  };

  const aller = useCallback(
    (pas: number) => {
      if (index === null || photos.length < 2) return;
      surChangement((index + pas + photos.length) % photos.length);
    },
    [index, photos.length, surChangement]
  );

  /* Le gel de la page, et sa levée. Le retour du focus est fait par la
   * galerie, qui sait de quelle vignette on est parti. */
  useEffect(() => {
    if (!ouverte) return;
    gelerDefilement();
    croix.current?.focus();
    return degelerDefilement;
  }, [ouverte]);

  /* Les deux voisines sont demandées dès qu'une vue s'ouvre : la
   * flèche, ensuite, ne fait plus attendre. */
  useEffect(() => {
    if (index === null || photos.length < 2) return;
    const suivante = photos[(index + 1) % photos.length];
    const precedente = photos[(index - 1 + photos.length) % photos.length];
    precharger(suivante, "robes", MESURE);
    precharger(precedente, "robes", MESURE);
  }, [index, photos]);

  useEffect(() => {
    if (!ouverte) return;
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        surFermeture();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        aller(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        aller(1);
        return;
      }
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        poser(ZOOM, 0, 0, true);
        return;
      }
      if (e.key === "-") {
        e.preventDefault();
        poser(1, 0, 0, true);
        return;
      }
      /* La tabulation tourne en rond dans la fenêtre. */
      if (e.key === "Tab") {
        /* Les boutons cachés par la mise en page — les flèches des
          * côtés sous le seuil, celles du bas au-dessus — ne prennent
          * pas le focus : les enfermer avec les autres bloquait la
          * tabulation sur un élément invisible. */
        const cibles = [...(fenetre.current?.querySelectorAll<HTMLElement>("button") ?? [])].filter(
          (b) => b.offsetParent !== null
        );
        if (cibles.length === 0) return;
        const premier = cibles[0];
        const dernier = cibles[cibles.length - 1];
        if (e.shiftKey && document.activeElement === premier) {
          e.preventDefault();
          dernier.focus();
        } else if (!e.shiftKey && document.activeElement === dernier) {
          e.preventDefault();
          premier.focus();
        }
      }
    };
    window.addEventListener("keydown", auClavier);
    return () => window.removeEventListener("keydown", auClavier);
  }, [ouverte, aller, surFermeture, poser]);

  /* Les deux façons de poser une flèche. La seconde ne paraît qu'au
   * doigt, la première qu'à partir du seuil. */
  const cote =
    "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-sur-image transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-sur-image)_16%,transparent)] md:flex";
  const sousLaPhoto =
    "flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-sur-image)_16%,transparent)]";

  if (index === null) return null;
  const media = photos[index];
  if (!media) return null;

  return (
    <div
      ref={fenetre}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      aria-label={libelles.titre}
      /* Le fond ferme au clic. La photographie et les commandes
        * arrêtent le clic : on ne ferme pas une fenêtre en visant son
        * contenu. */
      onClick={surFermeture}
      className="fixed inset-0 z-[120] flex items-center justify-center p-[clamp(0.75rem,3vw,2.5rem)]"
      style={{ background: "color-mix(in srgb, var(--color-encre) 94%, transparent)" }}
    >
      <button
        ref={croix}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          surFermeture();
        }}
        aria-label={libelles.fermer}
        className="absolute right-[clamp(0.75rem,2vw,1.75rem)] top-[clamp(0.75rem,2vw,1.75rem)] z-10 flex h-11 w-11 items-center justify-center rounded-full text-sur-image transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-sur-image)_16%,transparent)]"
      >
        <Croix />
      </button>

      {/* Les flèches, deux fois, et une seule paire à l'écran.
        *
        * Aux côtés à partir du seuil : la place y est, et la main va
        * les chercher où elle les attend. Sous le seuil, non — sur
        * trois cent soixante-quinze pixels, la photographie fait toute
        * la largeur et les flèches tombaient dessus, sur la robe. Elles
        * descendent alors sous elle, de part et d'autre du rang. */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              aller(-1);
            }}
            aria-label={libelles.precedente}
            className={`${cote} left-[clamp(0.25rem,1.5vw,1.75rem)]`}
          >
            <Chevron vers="gauche" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              aller(1);
            }}
            aria-label={libelles.suivante}
            className={`${cote} right-[clamp(0.25rem,1.5vw,1.75rem)]`}
          >
            <Chevron vers="droite" />
          </button>
        </>
      )}

      {/* La photographie est contenue, jamais recadrée : c'est tout le
        * propos de l'avoir ouverte. Sa taille d'affichage ne dépasse
        * pas celle de sa source — au-delà, on agrandit du flou. */}
      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full max-w-full flex-col items-center gap-3"
      >
        {/* Le cadre rogne la photographie agrandie : elle ne déborde
          * jamais sur les commandes. Les gestes y sont les nôtres
          * (« touch-none ») : le navigateur ne zoome pas la page. */}
        <div
          ref={cadre}
          onPointerDown={surAppui}
          onPointerMove={surMouvement}
          onPointerUp={surLacher}
          onPointerCancel={surLacher}
          onClick={(e) => {
            if (typePointeur.current === "mouse") basculer(e.clientX, e.clientY);
          }}
          className={`relative max-w-full touch-none select-none overflow-hidden ${
            agrandie ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
        >
          <div ref={plan} className="will-change-transform">
            <Photo
              key={media.name}
              media={media}
              dossier="robes"
              alt={alts[index] ?? ""}
              sizes={agrandie ? MESURE_AGRANDIE : MESURE}
              priorite
              className="pointer-events-none block max-h-[80svh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
        <figcaption
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2"
            style={{ color: "var(--color-sur-image)" }}
          >
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => aller(-1)}
                  aria-label={libelles.precedente}
                  className={`${sousLaPhoto} md:hidden`}
                >
                  <Chevron vers="gauche" />
                </button>
                <span className="mention min-w-[4.5rem] text-center">{libelles.rangs[index]}</span>
                <button
                  type="button"
                  onClick={() => aller(1)}
                  aria-label={libelles.suivante}
                  className={`${sousLaPhoto} md:hidden`}
                >
                  <Chevron vers="droite" />
                </button>
              </>
            )}
            {/* La loupe : le zoom sans le geste. */}
            <button
              type="button"
              onClick={() => basculer()}
              aria-label={agrandie ? libelles.dezoomer : libelles.zoomer}
              aria-pressed={agrandie}
              className={sousLaPhoto}
            >
              <Loupe moins={agrandie} />
            </button>
          </figcaption>
      </figure>
    </div>
  );
}
