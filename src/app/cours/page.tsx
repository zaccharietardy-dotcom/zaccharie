import Link from "next/link";

const sections = [
  {
    title: "IA Générative",
    color: "border-blue-400/40",
    courses: [
      { slug: "fondations-llm", number: "01", title: "Fondations LLM", description: "Transformers, tokens, attention, temperature." },
      { slug: "prompt-engineering", number: "02", title: "Prompt Engineering", description: "Few-shot, chain-of-thought, structured output." },
      { slug: "rag", number: "03", title: "RAG", description: "Embeddings, vector stores, chunking." },
      { slug: "agents", number: "04", title: "Tool Calling & Agents", description: "Function calling, boucle agent, MCP." },
      { slug: "agents-vocaux", number: "05", title: "Agents Vocaux", description: "STT, TTS, orchestration temps réel." },
      { slug: "stage-selectra", number: "06", title: "Stage Selectra", description: "Audit, projets IA, préparation entretien." },
    ],
  },
  {
    title: "Machine Learning & Deep Learning",
    color: "border-emerald-400/40",
    courses: [
      { slug: "arbres-ensembles", number: "ML-01", title: "Arbres & Ensembles", description: "CART, Random Forests, XGBoost, LightGBM." },
      { slug: "finance-quantitative", number: "ML-02", title: "Finance Quantitative", description: "Brownien, Itô, Black-Scholes, Greeks, Monte Carlo." },
      { slug: "rnn-lstm", number: "ML-03", title: "RNN, LSTM & GRU", description: "Modèles séquentiels, vanishing gradient." },
      { slug: "cnn", number: "ML-04", title: "CNN", description: "Convolutions, ResNet, EfficientNet, ViT." },
      { slug: "transformers-deep", number: "ML-05", title: "Transformers", description: "Self-attention, BERT, GPT, implémentation." },
      { slug: "generation-images", number: "ML-06", title: "GANs & VAE", description: "VAE, DCGAN, ProGAN, StyleGAN." },
      { slug: "diffusion-models", number: "ML-07", title: "Diffusion Models", description: "DDPM, Stable Diffusion, FLUX, ESRGAN." },
    ],
  },
  {
    title: "Outils",
    color: "border-amber-400/40",
    courses: [
      { slug: "git-github", number: "DEV", title: "Git, GitHub & GitLab", description: "Branches, merge, rebase, PR, CI/CD." },
    ],
  },
  {
    title: "Polytechnique — P3",
    color: "border-violet-400/40",
    courses: [
      { slug: "optimisation", number: "P3", title: "Optimisation et Contrôle", description: "Euler, Lagrange, KKT, gradient, Newton." },
      { slug: "optimisation-resume", number: "—", title: "Fiche Résumé — Optimisation", description: "Tous les théorèmes en une page." },
      { slug: "data-science", number: "P3", title: "Algorithms for Data Analysis", description: "k-NN, k-Means, clustering, KDE, EM, évaluation." },
      { slug: "modal", number: "P3", title: "Simulation & Événements Rares", description: "Monte Carlo, splitting, MCMC, Poisson, importance sampling." },
      { slug: "mie", number: "P3", title: "Fondamentaux des Organisations", description: "Structure, culture, pouvoir, incitations. Methode etude de cas." },
    ],
  },
  {
    title: "Anglais",
    color: "border-rose-400/40",
    courses: [
      { slug: "loneliness-machine", number: "EN", title: "The Loneliness Machine", description: "AI Companions as Symptom, Not Cure." },
    ],
  },
];

export default function CoursIndex() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-16">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">Cours</h1>
        <p className="text-muted-foreground">
          Cours et notes personnelles.
        </p>
      </div>

      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className={`mb-6 border-l-2 ${section.color} pl-3 text-xs font-medium uppercase tracking-widest text-muted-foreground/60`}>
              {section.title}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {section.courses.map((course) => (
                <Link key={course.slug} href={`/cours/${course.slug}`} className="group block">
                  <div className="rounded-xl px-5 py-4 transition-colors hover:bg-foreground/[0.03]">
                    <div className="mb-1 flex items-baseline gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground/30">
                        {course.number}
                      </span>
                      <h3 className="text-[15px] font-medium">
                        {course.title}
                      </h3>
                    </div>
                    <p className="pl-8 text-sm text-muted-foreground/60">
                      {course.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
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
