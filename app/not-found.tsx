import Link from "next/link";

export default function Introuvable() {
  return (
    <section className="gouttiere flex min-h-svh flex-col justify-center">
      <p className="legende">Erreur 404</p>
      <h1 className="affiche mt-4 text-encre">Cette page n&apos;existe pas</h1>
      <p className="texte mesure-l mt-6">
        Le lien a peut-être changé. Les robes, elles, sont toujours là.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/robes" className="bouton">
          Voir les robes
        </Link>
        <Link href="/" className="bouton-trait">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
