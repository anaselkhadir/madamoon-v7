import type { Metadata } from "next";
import PageRendezVous from "@/components/pages/PageRendezVous";

export const metadata: Metadata = {
  title: "Book an appointment — private fitting in Paris",
  description:
    "Book your private wedding dress fitting at the MADAMOON showroom, 234 rue du Faubourg Saint-Martin, Paris 10e. One hour, the showroom to yourself.",
  alternates: {
    canonical: "/en/appointment/",
    languages: { fr: "/rendez-vous/", en: "/en/appointment/", "x-default": "/rendez-vous/" },
  },
  /* L'adresse canonique sert aussi d'adresse de partage : sans elle,
   * un lien collé avec un paramètre de campagne devient un objet
   * distinct pour Facebook et Pinterest, et l'attribution se divise. */
  openGraph: { url: "/en/appointment/" },
};

export default function Appointment() {
  return <PageRendezVous langue="en" />;
}
