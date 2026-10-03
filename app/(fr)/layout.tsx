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
  /* La revendication du domaine chez Pinterest : sans elle, les épingles
   * du site ne portent pas le nom de la maison et ne rapportent aucune
   * statistique. La balise doit rester sur toutes les pages — Pinterest
   * relit la racine, mais une revendication ne se retire pas. */
  /* La Search Console, par la balise HTML.
   *
   * Le jeton fourni l'a été sous la forme « google-site-verification=… »,
   * qui est celle d'un enregistrement DNS TXT. Le domaine est bien servi
   * par les serveurs de Hostinger, mais il appartient à un autre compte
   * que celui relié ici : l'API refuse d'y toucher. La balise est donc
   * la voie praticable.
   *
   * Si Google refuse la vérification, c'est que ce jeton était celui du
   * DNS : il faut alors reprendre celui que la Search Console donne pour
   * la méthode « Balise HTML », qui est un autre texte.
   *
   * La balise reste sur toutes les pages : Google relit la racine, mais
   * une propriété vérifiée se perd si la preuve disparaît. */
  verification: {
    google: "4G-bRcILjkqMghmAlEeeWb4qvktBQIF6buHi-1Kr-Kc",
    other: { "p:domain_verify": "3186bf4f89c6999a6178fa094b93f66e" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function GabaritFrancais({ children }: { children: React.ReactNode }) {
  return <Gabarit langue="fr">{children}</Gabarit>;
}
