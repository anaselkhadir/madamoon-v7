import type { Metadata } from "next";
import PageMorphologie from "@/components/pages/PageMorphologie";
import { MORPHOLOGIES, morphologieParSlug } from "@/lib/madamoon";
import { edito } from "@/lib/contenu";

/* Les lettres ne se traduisent pas : /en/body-shapes/a comme
 * /morphologies/a. C'est un repère, pas un mot. */
export function generateStaticParams() {
  return MORPHOLOGIES.map((m) => ({ lettre: m.lettre.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lettre: string }>;
}): Promise<Metadata> {
  const { lettre } = await params;
  const m = morphologieParSlug(lettre);
  if (!m) return {};
  const e = edito(m.lettre, "en");
  const slug = m.lettre.toLowerCase();
  return {
    title: `Wedding dresses for the ${m.lettre} body shape`,
    description: `${e.promesse} How to recognise the ${m.lettre} shape, the cuts that suit it and the models to try on at the MADAMOON showroom, Paris 10e.`,
    alternates: {
      canonical: `/en/body-shapes/${slug}`,
      languages: { fr: `/morphologies/${slug}`, en: `/en/body-shapes/${slug}` },
    },
  };
}

export default async function BodyShape({ params }: { params: Promise<{ lettre: string }> }) {
  return <PageMorphologie params={params} langue="en" />;
}
