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
  alternates: { canonical: "/en" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "MADAMOON",
    url: `${SITE_URL}/en`,
    title: "Wedding dresses in Paris — MADAMOON bridal boutique",
    description:
      "Bridal showroom in Paris 10e. Private fittings by appointment, selected designers, made to measure.",
  },
  /* L'aperçu GitHub Pages est fermé aux moteurs : une copie indexée
   * ferait concurrence au vrai site. */
  robots: APERCU ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function GabaritAnglais({ children }: { children: React.ReactNode }) {
  return <Gabarit langue="en">{children}</Gabarit>;
}
