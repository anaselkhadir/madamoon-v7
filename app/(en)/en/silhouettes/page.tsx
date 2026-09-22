import type { Metadata } from "next";
import PageCoupes from "@/components/pages/PageCoupes";

export const metadata: Metadata = {
  title: "The wedding dress silhouettes",
  description:
    "Mermaid, ball gown, sheath, A-line, two-in-one: the silhouettes of the MADAMOON showroom, Paris 10e. Private fitting by appointment.",
  alternates: {
    canonical: "/en/silhouettes",
    languages: { fr: "/coupes", en: "/en/silhouettes" },
  },
};

export default function Silhouettes() {
  return <PageCoupes langue="en" />;
}
