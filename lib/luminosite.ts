/*
 * La luminosité de la page sous un élément flottant.
 *
 * On sonde quelques points de la zone qu'il couvre. Pour chacun, on
 * descend les couches sous le curseur — en ignorant ce qu'on marque
 * « data-sonde-ignorer », le widget et son voile — jusqu'à trouver ce
 * qui se voit : une photographie, une vidéo, ou un fond de couleur
 * opaque. Les images et la vidéo sont réduites à quelques pixels sur un
 * canevas et moyennées.
 *
 * Le résultat est une luminance relative, de 0 (noir) à 1 (blanc), ou
 * « null » quand rien n'a pu être lu.
 */

const cache = new Map<string, number>();

function luminance(r: number, g: number, b: number): number {
  const f = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function moyenneMedia(el: HTMLImageElement | HTMLVideoElement): number | null {
  const cle = el instanceof HTMLImageElement ? el.currentSrc || el.src : "";
  if (cle && cache.has(cle)) return cache.get(cle)!;
  try {
    const canevas = document.createElement("canvas");
    canevas.width = 12;
    canevas.height = 12;
    const ctx = canevas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(el, 0, 0, 12, 12);
    const { data } = ctx.getImageData(0, 0, 12, 12);
    let somme = 0;
    for (let i = 0; i < data.length; i += 4) somme += luminance(data[i], data[i + 1], data[i + 2]);
    const l = somme / (data.length / 4);
    if (cle) cache.set(cle, l);
    return l;
  } catch {
    /* Image d'une autre origine : illisible, on passe à la couche dessous. */
    return null;
  }
}

function couleurOpaque(el: Element): number | null {
  const m = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = "1"] = m[1].split(/[\s,/]+/).filter(Boolean);
  if (parseFloat(a) < 0.5) return null;
  return luminance(parseFloat(r), parseFloat(g), parseFloat(b));
}

function sonder(x: number, y: number): number | null {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest("[data-sonde-ignorer]")) continue;
    if (el instanceof HTMLImageElement && el.complete && el.naturalWidth) {
      const l = moyenneMedia(el);
      if (l !== null) return l;
    }
    if (el instanceof HTMLVideoElement && el.readyState >= 2) {
      const l = moyenneMedia(el);
      if (l !== null) return l;
    }
    const l = couleurOpaque(el);
    if (l !== null) return l;
  }
  return couleurOpaque(document.body);
}

/** La luminance moyenne de la page sous ce rectangle. */
export function luminositeSous(zone: DOMRect): number | null {
  const mesures: number[] = [];
  for (const fx of [0.2, 0.5, 0.8]) {
    for (const fy of [0.25, 0.75]) {
      const x = Math.min(Math.max(zone.left + zone.width * fx, 0), window.innerWidth - 1);
      const y = Math.min(Math.max(zone.top + zone.height * fy, 0), window.innerHeight - 1);
      const l = sonder(x, y);
      if (l !== null) mesures.push(l);
    }
  }
  return mesures.length ? mesures.reduce((a, b) => a + b, 0) / mesures.length : null;
}
