import type { Metadata } from "next";
import PageShowroom from "@/components/pages/PageShowroom";

export const metadata: Metadata = {
  title: "Wedding dress showroom in Paris 10e",
  description:
    "The MADAMOON showroom, 234 rue du Faubourg Saint-Martin in Paris 10e: a private one-hour fitting, by appointment, with whoever you wish to bring.",
  alternates: {
    canonical: "/en/showroom",
    languages: { fr: "/showroom", en: "/en/showroom" },
  },
};

export default function Showroom() {
  return <PageShowroom langue="en" />;
}
