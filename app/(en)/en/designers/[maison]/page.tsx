import type { Metadata } from "next";
import PageMaison from "@/components/pages/PageMaison";
import { CREATEURS, createurParSlug } from "@/lib/madamoon";
import { createurNote, createurOrigine } from "@/lib/contenu";

/* Les identifiants de maison ne se traduisent pas : « olya-mak » est un
 * nom propre, pas un mot. Seule la rubrique change. */
export function generateStaticParams() {
  return CREATEURS.map((c) => ({ maison: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ maison: string }>;
}): Promise<Metadata> {
  const { maison } = await params;
  const createur = createurParSlug(maison);
  if (!createur) return {};
  return {
    title: `${createur.nom} wedding dresses in Paris`,
    description: `The ${createur.nom} wedding dresses (${createurOrigine(createur, "en")}) at the MADAMOON showroom, Paris 10e. ${createurNote(createur, "en")} Private fitting by appointment.`,
    alternates: {
      canonical: `/en/designers/${createur.slug}`,
      languages: {
        fr: `/createurs/${createur.slug}`,
        en: `/en/designers/${createur.slug}`,
      },
    },
  };
}

export default async function Designer({ params }: { params: Promise<{ maison: string }> }) {
  return <PageMaison params={params} langue="en" />;
}
