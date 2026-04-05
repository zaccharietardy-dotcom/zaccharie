import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const sections = [
  {
    title: "Cursus IA Generative",
    description: "6 modules, du LLM de base a l'agent vocal en production.",
    courses: [
      { slug: "fondations-llm", number: "01", title: "Fondations LLM", description: "Transformers, tokens, attention, temperature." },
      { slug: "prompt-engineering", number: "02", title: "Prompt Engineering", description: "Few-shot, chain-of-thought, structured output." },
      { slug: "rag", number: "03", title: "RAG", description: "Embeddings, vector stores, chunking." },
      { slug: "agents", number: "04", title: "Tool Calling & Agents", description: "Function calling, boucle agent, MCP." },
      { slug: "agents-vocaux", number: "05", title: "Agents Vocaux", description: "STT, TTS, orchestration temps reel." },
      { slug: "stage-selectra", number: "06", title: "Stage Selectra", description: "Audit, projets IA, preparation entretien." },
    ],
  },
  {
    title: "Machine Learning & Deep Learning",
    description: "Des arbres de decision aux modeles de diffusion.",
    courses: [
      { slug: "arbres-ensembles", number: "ML-01", title: "Arbres & Ensembles", description: "CART, Random Forests, XGBoost, LightGBM." },
      { slug: "finance-quantitative", number: "ML-02", title: "Finance Quantitative", description: "Brownien, Ito, Black-Scholes, Greeks, Monte Carlo." },
      { slug: "rnn-lstm", number: "ML-03", title: "RNN, LSTM & GRU", description: "Modeles sequentiels, vanishing gradient." },
      { slug: "cnn", number: "ML-04", title: "CNN", description: "Convolutions, ResNet, EfficientNet, ViT." },
      { slug: "transformers-deep", number: "ML-05", title: "Transformers", description: "Self-attention, BERT, GPT, implementation." },
      { slug: "generation-images", number: "ML-06", title: "GANs & VAE", description: "VAE, DCGAN, ProGAN, StyleGAN." },
      { slug: "diffusion-models", number: "ML-07", title: "Diffusion Models", description: "DDPM, Stable Diffusion, FLUX, ESRGAN." },
    ],
  },
  {
    title: "Outils & Pratiques",
    description: "Competences transversales.",
    courses: [
      { slug: "git-github", number: "DEV-01", title: "Git, GitHub & GitLab", description: "Branches, merge, rebase, PR, CI/CD." },
    ],
  },
  {
    title: "Polytechnique — Periode 3",
    description: "Mathematiques appliquees, 2e annee.",
    courses: [
      { slug: "optimisation", number: "P3", title: "Optimisation et Controle", description: "Euler, Lagrange, KKT, gradient, Newton." },
      { slug: "optimisation-resume", number: "Fiche", title: "Fiche Resume — Optimisation", description: "Tous les theoremes en une page." },
    ],
  },
  {
    title: "English",
    description: "Presentations et travaux en anglais.",
    courses: [
      { slug: "loneliness-machine", number: "EN", title: "The Loneliness Machine", description: "AI Companions as Symptom, Not Cure. Her, Blade Runner 2049, Black Mirror.", standalone: true },
    ],
  },
];

export default function CoursIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Cours</h1>
      <p className="mb-12 text-muted-foreground">
        Cours et notes personnelles.
      </p>

      {sections.map((section) => (
        <section key={section.title} className="mb-16">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {section.title}
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            {section.description}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.courses.map((course) => (
              <Link key={course.slug} href={`/cours/${course.slug}`}>
                <Card className="group h-full transition-colors hover:border-foreground/20 cursor-pointer">
                  <CardHeader>
                    <span className="font-mono text-xs text-muted-foreground">
                      {course.number}
                    </span>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Retour
      </Link>
    </div>
  );
}
