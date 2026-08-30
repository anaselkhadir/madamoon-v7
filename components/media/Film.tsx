"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/media/Photo";
import type { Media } from "@/lib/medias";
import { mouvementReduit } from "@/lib/mouvement";
import { media as chemin } from "@/lib/chemin";

/*
 * Un film court, en boucle, sans son.
 *
 * L'affiche s'affiche seule tant que la scène n'approche pas : la vidéo
 * n'est demandée qu'à deux écrans de distance, et jamais si le mouvement
 * est refusé ou si la connexion est comptée.
 */

type Props = {
  src: string;
  affiche: Media;
  alt: string;
  className?: string;
  position?: string;
};

export default function Film({ src, affiche, alt, className = "", position }: Props) {
  const cadre = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [charge, setCharge] = useState(false);
  const [prete, setPrete] = useState(false);

  useEffect(() => {
    const co = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (mouvementReduit() || co?.saveData) return;

    const el = cadre.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCharge(true);
          obs.disconnect();
        }
      },
      { rootMargin: "150% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el || !charge) return;
    const jouer = () => {
      setPrete(true);
      el.play().catch(() => setPrete(false));
    };
    if (el.readyState >= 3) jouer();
    else el.addEventListener("canplay", jouer, { once: true });
    return () => el.removeEventListener("canplay", jouer);
  }, [charge]);

  return (
    <div ref={cadre} className={`relative overflow-hidden ${className}`}>
      <Photo
        media={affiche}
        dossier="scenes"
        alt={alt}
        sizes="100vw"
        position={position}
        className="h-full w-full object-cover"
      />
      {charge && (
        <video
          ref={video}
          src={chemin(src)}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] [transition-timing-function:var(--ease-doux)] ${
            prete ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: position }}
        />
      )}
    </div>
  );
}
