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
    title: "Prédiction de retournement véhiculaire",
    description:
      "Prédire le risque de retournement d'un véhicule militaire, 1 à 8 secondes à l'avance. LSTM, PatchTST, Neural ODE. Projet DGA.",
    tags: ["PyTorch", "LSTM", "PatchTST", "XGBoost"],
    href: "/projets/vdsim",
  },
  {
    title: "Deblurring de plaques d'immatriculation",
    description:
      "Restauration d'images de plaques floues : détection YOLO, restauration NAFNet, lecture OCR. En pause.",
    tags: ["Computer Vision", "GAN", "OCR"],
    href: "/projets/deblurring",
  },
  {
    title: "Planificateur de voyage",
    description:
      "Génération automatique d'itinéraires jour par jour avec transport, hôtels et activités. Gemini Flash + Google Places.",
    tags: ["Next.js", "Gemini", "Pipeline"],
    href: "https://naraevoyage.com",
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
          Élève ingénieur à l&apos;École Polytechnique, 2e année.
          Deep learning, vision par ordinateur, agents LLM.
        </p>
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
                Cycle ingénieur — mathématiques appliquées, informatique
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
          Notes de cours, accès restreint.
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
            href="https://www.linkedin.com/in/zaccharie-tardy/"
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
