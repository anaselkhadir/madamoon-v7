import { Instrument_Serif, Quattrocento_Sans } from "next/font/google";

import Entete from "@/components/chrome/Entete";
import Elise from "@/components/Elise";
import Pied from "@/components/chrome/Pied";
import CarteRendezvous from "@/components/chrome/CarteRendezvous";
import Mouvement from "@/components/Mouvement";
import { MAISON_SCHEMA } from "@/lib/schema";
import { BASE } from "@/lib/chemin";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Le gabarit, commun aux deux langues.
 *
 * Il porte la balise <html> et son attribut « lang » — ce qui a imposé
 * deux gabarits racines et donc deux groupes de routes, (fr) et (en).
 * Un gabarit imbriqué ne peut pas redéclarer <html>, et poser « lang »
 * après coup en JavaScript ne servirait à rien : c'est le HTML servi que
 * les moteurs lisent, pas celui qu'un script rectifie.
 *
 * Les groupes ne changent aucune adresse : (fr)/robes reste /robes.
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

export default function Gabarit({
  langue,
  children,
}: {
  langue: Langue;
  children: React.ReactNode;
}) {
  const L = t(langue);
  return (

    /* Lenis pose ses propres classes sur <html> : React ne doit pas s'en
     * inquiéter au moment de l'hydratation. */
    <html lang={langue} suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <head>
        {/*
          * Le thème, reposé avant la première peinture.
          *
          * Sans lui, une visiteuse qui a choisi le sombre verrait le site
          * blanc le temps de l'hydratation — un éclair blanc dans une
          * pièce sombre, ce qui est exactement ce qu'elle voulait éviter.
          *
          * Le système n'est pas consulté : le site est clair par défaut,
          * et « prefers-color-scheme: dark » ne dit pas qu'on veut voir
          * de la dentelle sur du noir.
          */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `try{if(localStorage.getItem("madamoon.theme")==="sombre")` +
              `document.documentElement.setAttribute("data-theme","sombre")}catch(e){}`,
          }}
        />
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
          {L.gabarit.allerAuContenu}
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
