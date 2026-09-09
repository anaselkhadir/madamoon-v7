import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Quattrocento_Sans } from "next/font/google";
import "./globals.css";

import Entete from "@/components/chrome/Entete";
import Elise from "@/components/Elise";
import Pied from "@/components/chrome/Pied";
import CarteRendezvous from "@/components/chrome/CarteRendezvous";
import Mouvement from "@/components/Mouvement";
import { SITE_URL } from "@/lib/madamoon";
import { MAISON_SCHEMA } from "@/lib/schema";
import { APERCU, BASE } from "@/lib/chemin";

/*
 * Deux caractères, comme sur la référence.
 *
 * La serif haute et fine porte les titres d'affiche et les noms posés dans
 * les images ; la grotesque humaniste porte la navigation, les repères et
 * la lecture. Aucune graisse intermédiaire : 400 pour lire, 700 pour les
 * capitales courtes.
 */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--police-serif",
  display: "swap",
});

const sans = Quattrocento_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--police-sans",
  display: "swap",
});

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

/* Les données structurées de la boutique : une seule source, la maison. */


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* Lenis pose ses propres classes sur <html> : React ne doit pas s'en
     * inquiéter au moment de l'hydratation. */
    <html lang="fr" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(MAISON_SCHEMA) }}
        />
        {/*
          * Le garde de l'ouverture.
          *
          * Il s'exécute avant la première peinture — c'est tout son
          * intérêt. Le site est un export statique : le hero est déjà
          * dans le HTML, et attendre l'hydratation pour le couvrir le
          * laisserait clignoter.
          *
          * Il ne décide que d'une chose : poser ou non « data-ouverture »
          * sur la racine. Le reste — le noir, la séquence — est du CSS.
          * Trois refus : ailleurs que sur l'accueil, à la deuxième visite
          * de la session, et si le mouvement est refusé. Dans ce dernier
          * cas on va droit au hero : une ouverture « plus sobre » reste
          * une ouverture, et la préférence demande qu'il n'y en ait pas.
          *
          * Le drapeau de session est posé tout de suite, avant même que
          * la séquence commence : rechargée au milieu, elle ne recommence
          * pas.
          *
          * Le filet de sécurité rend le défilement au bout de six
          * secondes, quoi qu'il arrive au script de la page.
          */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
var b=${JSON.stringify(BASE)},p=location.pathname;
if(b&&p.indexOf(b)===0)p=p.slice(b.length);
p=p.replace(/index\\.html$/,"").replace(/\\/+$/,"");
if(p!=="")return;
if(sessionStorage.getItem("madamoon.ouverture"))return;
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
sessionStorage.setItem("madamoon.ouverture","1");
var d=document.documentElement;d.setAttribute("data-ouverture","");
setTimeout(function(){d.removeAttribute("data-ouverture")},6000);
}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:bg-blanc focus:px-4 focus:py-2 focus:text-encre"
        >
          Aller au contenu
        </a>
        <Entete />
        <main id="contenu">{children}</main>
        <Pied />
        {/* Élise vit au gabarit : le bouton « Trouver ma robe » l'ouvre
          * depuis n'importe quelle page, et elle lit l'adresse courante
          * pour savoir de quelle maison partir. */}
        <Elise />
        <CarteRendezvous />
        <Mouvement />
      </body>
    </html>
  );
}
