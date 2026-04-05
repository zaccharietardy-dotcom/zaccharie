import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const projects = [
  {
    slug: "deblurring",
    title: "Deblurring de plaques d'immatriculation",
    description:
      "Restauration d'images de plaques floues : détection YOLO, restauration NAFNet, lecture OCR. En pause.",
    tags: ["PyTorch", "Computer Vision", "GAN", "OCR"],
    status: "demo" as const,
  },
  {
    slug: "vdsim",
    title: "Prediction de renversement vehiculaire",
    description:
      "Prédiction du risque de retournement d'un véhicule militaire, 1 à 8 secondes à l'avance. LSTM, PatchTST, Neural ODE. Projet DGA.",
    tags: ["PyTorch", "LSTM", "PatchTST", "XGBoost"],
    status: "completed" as const,
  },
];

export default function ProjetsIndex() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-32">
      <header className="mb-20">
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Retour
        </Link>
        <h1 className="mb-6 font-serif text-5xl font-medium tracking-tight italic">
          Projets
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground/80">
          Projets de recherche et projets personnels.
        </p>
      </header>

      <div className="grid gap-8">
        {projects.map((proj) => (
          <Link key={proj.slug} href={`/projets/${proj.slug}`} className="group block">
            <article className="relative overflow-hidden rounded-2xl border border-foreground/[0.04] bg-foreground/[0.01] p-10 transition-all duration-300 group-hover:border-foreground/[0.1] group-hover:bg-foreground/[0.02] sm:p-12">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-foreground/[0.08] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="h-1 w-1 rounded-full bg-foreground/[0.08]" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/40">
                      {proj.status === "demo" ? "Démo Live" : "Terminé"}
                    </span>
                  </div>
                  <h2 className="mb-4 font-serif text-3xl font-medium transition-colors group-hover:text-foreground">
                    {proj.title}
                  </h2>
                  <p className="leading-relaxed text-muted-foreground/70 transition-colors group-hover:text-muted-foreground/90">
                    {proj.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 transition-all group-hover:translate-x-2 group-hover:text-foreground/60 sm:mt-2">
                  Détails <span className="text-xs">→</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
