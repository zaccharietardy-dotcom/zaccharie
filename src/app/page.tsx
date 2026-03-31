import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const modules = [
  {
    slug: "fondations-llm",
    number: "01",
    title: "Fondations LLM",
    description:
      "Transformers, tokens, attention, temperature — comprendre comment pensent les modeles.",
    status: "available" as const,
  },
  {
    slug: "prompt-engineering",
    number: "02",
    title: "Prompt Engineering",
    description:
      "Few-shot, chain-of-thought, structured output — l'art de parler aux LLMs.",
    status: "available" as const,
  },
  {
    slug: "rag",
    number: "03",
    title: "RAG",
    description:
      "Embeddings, vector stores, chunking — donner de la memoire aux LLMs.",
    status: "available" as const,
  },
  {
    slug: "agents",
    number: "04",
    title: "Tool Calling & Agents",
    description:
      "Function calling, boucle agent, MCP — quand le LLM agit dans le monde reel.",
    status: "available" as const,
  },
  {
    slug: "agents-vocaux",
    number: "05",
    title: "Agents Vocaux",
    description:
      "STT, TTS, orchestration temps reel — construire un agent vocal de qualification.",
    status: "available" as const,
  },
  {
    slug: "stage-selectra",
    number: "06",
    title: "Application — Stage Selectra",
    description:
      "Comprendre Selectra, 5 projets concrets a proposer, ce qui impressionne en entretien.",
    status: "available" as const,
  },
  {
    slug: "deblurring",
    number: "07",
    title: "Deblurring & Super-Resolution",
    description:
      "CNN, GANs, ESRGAN — restaurer des images degradees par machine learning.",
    status: "coming" as const,
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <section className="mb-24">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Zaccharie Tardy
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          IA generative, agents vocaux, computer vision.
        </p>
      </section>

      {/* Modules */}
      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Cursus IA Generative
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          6 modules, du LLM de base a l&apos;agent vocal en production.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((mod) => {
            const inner = (
              <Card
                key={mod.slug}
                className={`group relative transition-colors ${
                  mod.status === "available"
                    ? "hover:border-foreground/20 cursor-pointer"
                    : "opacity-50"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">
                      Module {mod.number}
                    </span>
                    {mod.status === "available" ? (
                      <Badge
                        variant="outline"
                        className="text-xs text-emerald-500 border-emerald-500/30"
                      >
                        Disponible
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Bientot
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{mod.title}</CardTitle>
                  <CardDescription>{mod.description}</CardDescription>
                </CardHeader>
              </Card>
            );

            if (mod.status === "available") {
              return (
                <Link key={mod.slug} href={`/cours/${mod.slug}`}>
                  {inner}
                </Link>
              );
            }
            return <div key={mod.slug}>{inner}</div>;
          })}
        </div>
      </section>
      {/* Polytechnique — Periode 3 */}
      <section className="mt-20">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Polytechnique — Periode 3
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Cours de mathematiques appliquees, 2eme annee.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/cours/optimisation">
            <Card className="group relative transition-colors hover:border-foreground/20 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    APM 43035
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs text-violet-400 border-violet-400/30"
                  >
                    Resume
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  Optimisation et Controle
                </CardTitle>
                <CardDescription>
                  Existence, convexite, Euler, Lagrange, KKT, gradient, Newton,
                  Nesterov — par Gregoire Allaire.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/cours/optimisation-resume">
            <Card className="group relative transition-colors hover:border-foreground/20 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    Fiche
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs text-amber-400 border-amber-400/30"
                  >
                    Synthese
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  Fiche Resume — Optimisation
                </CardTitle>
                <CardDescription>
                  Tous les theoremes, hypotheses, algorithmes et pieges en une
                  page.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
