import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    slug: "deblurring",
    title: "Deblurring de plaques d'immatriculation",
    description:
      "Restauration d'images de plaques floues : détection YOLO, restauration NAFNet, lecture OCR. En pause.",
    tags: ["PyTorch", "Computer Vision", "GAN", "OCR"],
    status: "pause" as const,
  },
  {
    slug: "vdsim",
    title: "Prédiction de retournement véhiculaire",
    description:
      "Prédiction du risque de retournement d'un véhicule militaire, 1 à 8 secondes à l'avance. LSTM, PatchTST, Neural ODE. Projet DGA.",
    tags: ["PyTorch", "LSTM", "PatchTST", "XGBoost"],
    status: "done" as const,
  },
];

export default function ProjetsIndex() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-16">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">Projets</h1>
        <p className="text-muted-foreground">
          Projets de recherche et projets personnels.
        </p>
      </div>

      <div className="space-y-2">
        {projects.map((proj) => (
          <Link key={proj.slug} href={`/projets/${proj.slug}`} className="group block">
            <div className="flex flex-col gap-3 rounded-xl px-5 py-5 transition-colors hover:bg-foreground/[0.03] sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <div className="mb-1 flex items-center gap-3">
                  <h2 className="text-[15px] font-medium">{proj.title}</h2>
                  <Badge variant="outline" className="text-[10px] text-muted-foreground/50 border-foreground/10">
                    {proj.status === "pause" ? "En pause" : "Terminé"}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground/70">
                  {proj.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:shrink-0">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-foreground/[0.06] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <Link
          href="/"
          className="text-sm text-muted-foreground/40 transition-colors hover:text-foreground"
        >
          &larr; Retour
        </Link>
      </div>
    </div>
  );
}
