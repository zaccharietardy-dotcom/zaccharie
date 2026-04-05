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
    <div className="mx-auto max-w-4xl px-6 py-32">
      <header className="mb-24">
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Retour
        </Link>
        <h1 className="mb-6 font-serif text-5xl font-medium tracking-tight italic">
          Archives
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground/80">
          Cours et notes personnelles.
        </p>
      </header>

      <div className="space-y-32">
        {sections.map((section) => (
          <section key={section.title}>
            <div className="mb-12 border-b border-foreground/5 pb-4">
              <h2 className="font-serif text-2xl font-medium italic text-foreground/90">
                {section.title}
              </h2>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                {section.description}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {section.courses.map((course) => (
                <Link key={course.slug} href={`/cours/${course.slug}`} className="group block">
                  <div className="flex h-full flex-col gap-3 rounded-xl border border-foreground/[0.04] bg-foreground/[0.01] p-6 transition-all duration-300 group-hover:border-foreground/[0.1] group-hover:bg-foreground/[0.02]">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[9px] text-muted-foreground/30">
                        {course.number}
                      </span>
                      <h3 className="font-serif text-lg font-medium transition-colors group-hover:text-foreground">
                        {course.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground/60 transition-colors group-hover:text-muted-foreground/80">
                      {course.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-48 flex justify-center border-t border-foreground/5 pt-12">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 transition-colors hover:text-foreground"
        >
          Retour
        </Link>
      </footer>
    </div>
  );
}
