import type { Metadata } from "next";
import PageCoupe from "@/components/pages/PageCoupe";
import { FAMILLES } from "@/lib/madamoon";
import { COUPES, coupeParAncre } from "@/lib/coupes";
import { COUPES_EN } from "@/lib/langue";

export function generateStaticParams() {
  return COUPES.map((s) => ({ coupe: s.ancre }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ coupe: string }>;
}): Promise<Metadata> {
  const { coupe } = await params;
  const s = coupeParAncre(coupe);
  if (!s) return {};
  const en = COUPES_EN[s.ancre] ?? s.ancre;
  return {
    /* Le gabarit du site ajoute « — MADAMOON » : ne pas le redire ici. */
    title: `Robe de mariée ${s.nom.toLowerCase()} à Paris`,
    description: `Les robes de mariée ${s.nom.toLowerCase()} du showroom MADAMOON, Paris 10e. ${FAMILLES[s.nom]} Essayage privé sur rendez-vous.`,
    alternates: {
      canonical: `/coupes/${s.ancre}`,
      languages: { fr: `/coupes/${s.ancre}`, en: `/en/silhouettes/${en}` },
    },
  };
}

export default async function Coupe({ params }: { params: Promise<{ coupe: string }> }) {
  return <PageCoupe params={params} langue="fr" />;
}
