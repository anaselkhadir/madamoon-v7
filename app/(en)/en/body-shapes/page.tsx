import type { Metadata } from "next";
import PageMorphologies from "@/components/pages/PageMorphologies";

export const metadata: Metadata = {
  title: "Choosing a wedding dress for your body shape",
  description:
    "O, A, V, H, 8 or X: the wedding dress cuts we recommend for each body shape, to try on at the MADAMOON showroom, Paris 10e.",
  alternates: {
    canonical: "/en/body-shapes",
    languages: { fr: "/morphologies", en: "/en/body-shapes" },
  },
};

export default function BodyShapes() {
  return <PageMorphologies langue="en" />;
}
