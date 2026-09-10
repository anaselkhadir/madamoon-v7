import type { Metadata, Viewport } from "next";
import Gabarit from "@/components/chrome/Gabarit";
import "../globals.css";

import { SITE_URL } from "@/lib/madamoon";
import { APERCU } from "@/lib/chemin";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Robes de mariée à Paris — Boutique MADAMOON",
    template: "%s — MADAMOON",
  },
  description:
    "Boutique et showroom de robes de mariée à Paris 10e. Essayage privé sur rendez-vous, créateurs sélectionnés, confection sur mesure à partir de 1 500 €.",
  keywords: [
    "robe de mariée",
    "robes de mariée",
    "boutique robe de mariée",
    "robe de mariée Paris",
    "boutique robe de mariée Paris",
    "showroom robe de mariée Paris",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "MADAMOON",
    url: SITE_URL,
    title: "Robes de mariée à Paris — Boutique MADAMOON",
    description:
      "Showroom de robes de mariée à Paris 10e. Essayage privé sur rendez-vous, créateurs sélectionnés, confection sur mesure.",
  },
  /* L'aperçu GitHub Pages est fermé aux moteurs : une copie indexée
   * ferait concurrence au vrai site. */
  robots: APERCU ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function GabaritFrancais({ children }: { children: React.ReactNode }) {
  return <Gabarit langue="fr">{children}</Gabarit>;
}
