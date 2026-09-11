import type { Metadata } from "next";
import PageAPropos from "@/components/pages/PageAPropos";

export const metadata: Metadata = {
  title: "La maison — boutique de robes de mariée à Paris",
  description:
    "MADAMOON, boutique de robes de mariée à Paris 10e : cinq créateurs sélectionnés, essayage privé sur rendez-vous et confection sur mesure à partir de 1 500 €.",
  alternates: { canonical: "/a-propos", languages: { fr: "/a-propos", en: "/en/about" } },
};

export default function AProps() {
  return <PageAPropos langue="fr" />;
}
