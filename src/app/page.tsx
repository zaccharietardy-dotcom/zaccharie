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
    title: "Prediction de renversement vehiculaire",
    description:
      "Deep learning (LSTM + PatchTST) pour predire le risque de rollover de vehicules militaires. 98% recall. Projet DGA.",
    tags: ["PyTorch", "LSTM", "PatchTST", "XGBoost"],
    href: "/projets/vdsim",
  },
  {
    title: "Deblurring de plaques d'immatriculation",
    description:
      "Pipeline ML complet : detection YOLO + restauration (NAFNet/LPDGAN) + OCR. Upload une plaque floue, recupere l'image nette.",
    tags: ["Computer Vision", "GAN", "OCR"],
    href: "/projets/deblurring",
  },
  {
    title: "Planificateur de voyage IA",
    description:
      "Pipeline deterministe en 12 etapes : parsing intent, ancrage transport, scheduling, contrats. Gemini Flash + Google Places.",
    tags: ["Next.js", "Gemini", "Pipeline"],
    href: "https://github.com/zaccharietardy",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Zaccharie Tardy
        </h1>
        <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Eleve ingenieur a l&apos;Ecole Polytechnique. Je travaille sur l&apos;IA
          generative, les agents vocaux et la computer vision.
        </p>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span className="rounded-md border border-border px-2.5 py-1">Python</span>
          <span className="rounded-md border border-border px-2.5 py-1">PyTorch</span>
          <span className="rounded-md border border-border px-2.5 py-1">TypeScript</span>
          <span className="rounded-md border border-border px-2.5 py-1">Next.js</span>
          <span className="rounded-md border border-border px-2.5 py-1">LLMs</span>
          <span className="rounded-md border border-border px-2.5 py-1">Computer Vision</span>
        </div>
      </section>

      {/* Projets */}
      <section className="mb-20">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Projets
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((proj) => (
            <Link key={proj.title} href={proj.href}>
              <Card className="group h-full transition-colors hover:border-foreground/20">
                <CardHeader>
                  <div className="mb-2 flex flex-wrap gap-1.5">
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
                  <CardTitle className="text-lg">{proj.title}</CardTitle>
                  <CardDescription>{proj.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Formation */}
      <section className="mb-20">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Formation
        </h2>
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">Ecole Polytechnique</p>
              <p className="text-sm text-muted-foreground">
                Cycle ingenieur — mathematiques appliquees, informatique
              </p>
            </div>
            <span className="shrink-0 text-sm text-muted-foreground">2024 – 2027</span>
          </div>
        </div>
      </section>

      {/* Cours (lien vers la section protegee) */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Cours &amp; Notes
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Modules de cours sur l&apos;IA, le ML, la finance quantitative et les outils de dev.
          Acces restreint.
        </p>
        <Link
          href="/cours"
          className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
        >
          Acceder aux cours &rarr;
        </Link>
      </section>

      {/* Contact */}
      <section className="mt-20 border-t border-border/40 pt-10">
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a
            href="mailto:zaccharie.tardy@gmail.com"
            className="transition-colors hover:text-foreground"
          >
            zaccharie.tardy@gmail.com
          </a>
          <a
            href="https://github.com/zaccharietardy"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/zaccharietardy"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
