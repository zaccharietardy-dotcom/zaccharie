import Link from "next/link";

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
    tags: ["Next.js", "Gemini"],
    href: "https://naraevoyage.com",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      {/* Hero */}
      <section className="mb-24">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Zaccharie Tardy<span className="text-blue-400/70">.</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Élève ingénieur à l&apos;École Polytechnique, 2e année.
          Deep learning, vision par ordinateur, agents LLM.
        </p>
      </section>

      {/* Projets */}
      <section className="mb-24">
        <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
          Projets
        </h2>
        <div className="space-y-1">
          {projects.map((proj) => (
            <Link key={proj.title} href={proj.href} className="group block">
              <div className="flex flex-col gap-3 rounded-xl px-5 py-5 transition-colors hover:bg-foreground/[0.03] sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <h3 className="mb-1 text-[15px] font-medium group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h3>
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
      </section>

      {/* Formation */}
      <section className="mb-24">
        <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
          Formation
        </h2>
        <div className="flex items-baseline justify-between gap-4 px-5">
          <div>
            <p className="text-[15px] font-medium">École Polytechnique</p>
            <p className="text-sm text-muted-foreground/70">
              Cycle ingénieur — mathématiques appliquées, informatique
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs text-muted-foreground/40">2024 – 2027</span>
        </div>
      </section>

      {/* Contact */}
      <footer className="border-t border-foreground/5 pt-10">
        <div className="flex flex-wrap gap-8 px-5 text-sm text-muted-foreground/50">
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
      </footer>
    </div>
  );
}
