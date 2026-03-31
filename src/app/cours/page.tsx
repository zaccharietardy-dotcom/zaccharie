import Link from "next/link";

export default function CoursIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Cours</h1>
      <p className="mb-8 text-muted-foreground">
        Cursus IA generative &amp; cours Polytechnique.
      </p>
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Retour a l&apos;accueil
      </Link>
    </div>
  );
}
