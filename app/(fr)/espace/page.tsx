import type { Metadata } from "next";
import PageEspace from "@/components/pages/PageEspace";

export const metadata: Metadata = {
  title: "Votre espace",
  description:
    "L'espace personnel MADAMOON ouvre bientôt : vos coups de cœur d'un appareil à l'autre, et votre rendez-vous à suivre.",
  alternates: { canonical: "/espace", languages: { fr: "/espace", en: "/en/my-space" } },
  robots: { index: false, follow: true },
};

export default function Espace() {
  return <PageEspace langue="fr" />;
}
