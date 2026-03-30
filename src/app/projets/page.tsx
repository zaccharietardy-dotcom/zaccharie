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
    slug: "sf-presentation",
    title: "The Loneliness Machine",
    description:
      "AI Companions as Symptom, Not Cure. Presentation anglais sur la SF, les robots et l'IA — Her, Blade Runner 2049, Black Mirror.",
    tags: ["English", "Science Fiction", "AI Ethics", "Presentation"],
    status: "demo" as const,
  },
  {
    slug: "deblurring",
    title: "Deblurring de plaques d'immatriculation",
    description:
      "Pipeline ML : detection YOLO + restauration (NAFNet/LPDGAN) + OCR. Upload une plaque floue, recupere l'image nette + les caracteres.",
    tags: ["PyTorch", "Computer Vision", "GAN", "OCR"],
    status: "demo" as const,
  },
  {
    slug: "vdsim",
    title: "Prediction de renversement vehiculaire",
    description:
      "Deep learning pour predire le risque de rollover de vehicules militaires. LSTM + PatchTST, 98% recall. Projet DGA.",
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
        Machine learning, computer vision, et IA appliquee.
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
