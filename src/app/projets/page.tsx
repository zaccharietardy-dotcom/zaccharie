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
      "Tu uploades une photo de plaque floue, ca te sort l'image nette et les caracteres. YOLO + NAFNet + OCR.",
    tags: ["PyTorch", "Computer Vision", "GAN", "OCR"],
    status: "demo" as const,
  },
  {
    slug: "vdsim",
    title: "Prediction de renversement vehiculaire",
    description:
      "Predire si un vehicule militaire va se retourner, 1 a 8 secondes avant. LSTM + PatchTST + Neural ODE. Projet DGA.",
    tags: ["PyTorch", "LSTM", "PatchTST", "XGBoost"],
    status: "completed" as const,
  },
];

export default function ProjetsIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Retour
      </Link>

      <h1 className="mb-2 text-3xl font-bold tracking-tight">Projets</h1>
      <p className="mb-10 text-muted-foreground">
        Des trucs que j&apos;ai construits.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((proj) => (
          <Link key={proj.slug} href={`/projets/${proj.slug}`}>
            <Card className="group h-full transition-colors hover:border-foreground/20">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {proj.status === "demo" ? (
                    <Badge
                      variant="outline"
                      className="text-xs text-emerald-500 border-emerald-500/30"
                    >
                      Demo live
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Termine
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{proj.title}</CardTitle>
                <CardDescription>{proj.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
