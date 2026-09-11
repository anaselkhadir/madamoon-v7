import type { Metadata } from "next";
import PageAPropos from "@/components/pages/PageAPropos";

export const metadata: Metadata = {
  title: "The house — bridal boutique in Paris",
  description:
    "MADAMOON, a wedding dress boutique in Paris 10e: five selected designers, private fittings by appointment and made-to-measure dresses from €1,500.",
  alternates: { canonical: "/en/about", languages: { fr: "/a-propos", en: "/en/about" } },
};

export default function About() {
  return <PageAPropos langue="en" />;
}
