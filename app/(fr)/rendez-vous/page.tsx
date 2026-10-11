import type { Metadata } from "next";
import PageRendezVous from "@/components/pages/PageRendezVous";

export const metadata: Metadata = {
  title: "Prendre rendez-vous — essayage privé à Paris",
  description:
    "Réservez votre essayage privé de robe de mariée au showroom MADAMOON, 234 rue du Faubourg Saint-Martin, Paris 10e. Une heure, le showroom pour vous seule.",
  alternates: {
    canonical: "/rendez-vous/",
    languages: { fr: "/rendez-vous/", en: "/en/appointment/", "x-default": "/rendez-vous/" },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/rendez-vous/" },
};

export default function RendezVous() {
  return <PageRendezVous langue="fr" />;
}
