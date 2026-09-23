import type { Metadata } from "next";
import PageEspace from "@/components/pages/PageEspace";

export const metadata: Metadata = {
  title: "Your space",
  description:
    "The MADAMOON personal space opens soon: your favourites from one device to the next, and your appointment to follow.",
  alternates: { canonical: "/en/my-space", languages: { fr: "/espace", en: "/en/my-space" } },
  robots: { index: false, follow: true },
};

export default function MySpace() {
  return <PageEspace langue="en" />;
}
