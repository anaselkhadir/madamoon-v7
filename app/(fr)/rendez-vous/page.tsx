import type { Metadata } from "next";
import PageRendezVous from "@/components/pages/PageRendezVous";

export const metadata: Metadata = {
  title: "Prendre rendez-vous — essayage privé à Paris",
  description:
    "Réservez votre essayage privé de robe de mariée au showroom MADAMOON, 234 rue du Faubourg Saint-Martin, Paris 10e. Une heure, le showroom pour vous seule.",
  alternates: {
    canonical: "/rendez-vous",
    languages: { fr: "/rendez-vous", en: "/en/appointment" },
  },
};

export default function RendezVous() {
  return <PageRendezVous langue="fr" />;
}
