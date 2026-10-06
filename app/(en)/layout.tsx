import type { Metadata, Viewport } from "next";
import Gabarit from "@/components/chrome/Gabarit";
import "../globals.css";

import { SITE_URL } from "@/lib/madamoon";
import { APERCU } from "@/lib/chemin";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wedding dresses in Paris — MADAMOON bridal boutique",
    template: "%s — MADAMOON",
  },
  description:
    "Bridal boutique and showroom in Paris 10e. Private fittings by appointment, selected designers, made to measure from €1,500.",
  keywords: [
    "wedding dress",
    "wedding dresses",
    "bridal boutique",
    "wedding dress Paris",
    "bridal boutique Paris",
    "bridal showroom Paris",
  ],
  /*
   * L'image de partage, et les liens de langue.
   *
   * Sans « images », un lien du site collé dans WhatsApp, sur Instagram
   * ou dans Pinterest sortait sans visuel — seules les fiches de robe en
   * avaient une, héritée de leur photographie. L'image est le showroom
   * de la maison, et non une robe : un lien partagé doit dire « voici
   * une vraie boutique à Paris », ce qu'aucune photographie de robe ne
   * dit. Mille deux cents sur six cent trente, la mesure que tous
   * attendent.
   *
   * « languages » déclare enfin que le français et l'anglais sont la
   * même page en deux langues. Sans cela, Google voyait deux sites qui
   * se répètent et devait deviner lequel servir à qui.
   */
  alternates: {
    canonical: "/en/",
    languages: { fr: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "MADAMOON",
    url: `${SITE_URL}/en/`,
    title: "Wedding dresses in Paris — MADAMOON bridal boutique",
    description:
      "Bridal showroom in Paris 10e. Private fittings by appointment, selected designers, made to measure.",
    images: [
      {
        url: "/partage/madamoon-showroom-paris.jpg",
        width: 1200,
        height: 630,
        alt: "The MADAMOON showroom in Paris 10e, its rails of wedding dresses and its staircase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/partage/madamoon-showroom-paris.jpg"],
  },
  /* L'aperçu GitHub Pages est fermé aux moteurs : une copie indexée
   * ferait concurrence au vrai site. */
  robots: APERCU ? { index: false, follow: false } : { index: true, follow: true },
  /* La revendication du domaine chez Pinterest : sans elle, les épingles
   * du site ne portent pas le nom de la maison et ne rapportent aucune
   * statistique. La balise doit rester sur toutes les pages — Pinterest
   * relit la racine, mais une revendication ne se retire pas. */
  verification: { other: { "p:domain_verify": "3186bf4f89c6999a6178fa094b93f66e" } },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function GabaritAnglais({ children }: { children: React.ReactNode }) {
  return <Gabarit langue="en">{children}</Gabarit>;
}
