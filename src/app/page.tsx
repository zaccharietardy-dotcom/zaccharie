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
    <div className="mx-auto max-w-4xl px-6 py-32 sm:py-48">
      {/* Hero */}
      <section className="mb-32">
        <h1 className="mb-6 font-serif text-5xl font-medium tracking-tight sm:text-6xl italic">
          Zaccharie Tardy<span className="text-primary/40">.</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground/80 sm:text-xl">
          Élève ingénieur à l&apos;École Polytechnique.
          Explorations en deep learning, vision par ordinateur et architectures d&apos;agents.
        </p>
      </section>

      {/* Projets */}
      <section className="mb-32">
        <h2 className="mb-12 font-serif text-2xl font-medium italic text-muted-foreground/60">
          Projets sélectionnés
        </h2>
        <div className="grid gap-6">
          {projects.map((proj) => (
            <Link key={proj.title} href={proj.href} className="group block">
              <div className="relative overflow-hidden rounded-2xl border border-foreground/[0.03] bg-foreground/[0.01] p-8 transition-all duration-500 group-hover:border-primary/20 group-hover:bg-primary/[0.02] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-foreground/[0.08] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 transition-colors group-hover:border-primary/20 group-hover:text-primary/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mb-3 font-serif text-2xl font-medium transition-colors group-hover:text-foreground">
                      {proj.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground/70 transition-colors group-hover:text-muted-foreground/90">
                      {proj.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40 transition-all group-hover:translate-x-1 group-hover:text-primary/60 sm:mt-2">
                    Explorer <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Formation */}
      <section className="mb-32">
        <h2 className="mb-12 font-serif text-2xl font-medium italic text-muted-foreground/60">
          Formation
        </h2>
        <div className="relative overflow-hidden rounded-2xl border border-foreground/[0.03] bg-foreground/[0.01] p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
            <div>
              <p className="font-serif text-xl font-medium">École Polytechnique</p>
              <p className="text-muted-foreground/80">
                Cycle ingénieur — Mathématiques appliquées & Informatique
              </p>
            </div>
            <span className="font-mono text-sm text-muted-foreground/50 italic">2024 — 2027</span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer className="mt-48 border-t border-foreground/5 pt-12">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
            <a
              href="mailto:zaccharie.tardy@gmail.com"
              className="transition-colors hover:text-primary/80"
            >
              Email
            </a>
            <a
              href="https://github.com/zaccharietardy"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary/80"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/zaccharie-tardy/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary/80"
            >
              LinkedIn
            </a>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/30 italic">
            © {new Date().getFullYear()} — Paris
          </p>
        </div>
      </footer>
    </div>
  );
}
