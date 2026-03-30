import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function VDSimProject() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/projets"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Projets
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-3 flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="font-mono text-[10px]">
            PyTorch
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            LSTM
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            PatchTST
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            XGBoost
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            DGA
          </Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Prediction de renversement vehiculaire
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Deep learning pour predire le Load Transfer Ratio (LTR) 1 a 8
          secondes dans le futur. Projet pour la DGA (Direction Generale de
          l&apos;Armement). 98% recall sur les scenarios critiques.
        </p>
      </header>

      {/* Key results */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <Card className="p-5 text-center">
          <p className="text-3xl font-bold text-emerald-400">98.1%</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Recall sur le risque critique
          </p>
        </Card>
        <Card className="p-5 text-center">
          <p className="text-3xl font-bold">0.939</p>
          <p className="mt-1 text-xs text-muted-foreground">
            R² (PatchTST, horizon 1s)
          </p>
        </Card>
        <Card className="p-5 text-center">
          <p className="text-3xl font-bold">484</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Scenarios de simulation generes
          </p>
        </Card>
      </div>

      <Separator className="mb-10" />

      {/* Problem */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Le probleme</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-foreground/90">
          Les vehicules militaires evoluent sur des terrains accidentes a haute
          vitesse. Un renversement peut etre fatal. Le <strong>Load Transfer
          Ratio (LTR)</strong> mesure le transfert de charge lateral :
        </p>
        <div className="mb-4 overflow-hidden rounded-lg border border-border/40 bg-zinc-950 p-5 font-mono text-sm text-zinc-400">
          <p>LTR = 0.0 → equilibre (ligne droite)</p>
          <p>LTR = 0.7 → zone dangereuse</p>
          <p className="text-red-400">LTR = 1.0 → renversement imminent</p>
        </div>
        <p className="text-[15px] leading-relaxed text-foreground/90">
          L&apos;objectif : predire le LTR <strong>1 a 8 secondes a
          l&apos;avance</strong> pour alerter le conducteur AVANT le point de
          non-retour.
        </p>
      </section>

      {/* Approach */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Approche</h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold">
              <span className="mr-2 font-mono text-blue-400">01</span>
              Generation de donnees — VDSim
            </h3>
            <p className="text-sm text-muted-foreground">
              484 scenarios de 15 secondes generes avec le simulateur VDSim
              (10 degres de liberte, modele de pneu Pacejka). 6 types de
              trajectoires : virage circulaire, slalom, double changement de
              voie, lemniscate, waypoints.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">
              <span className="mr-2 font-mono text-emerald-400">02</span>
              4 modeles compares
            </h3>
            <div className="overflow-x-auto rounded-lg border border-border/40">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-zinc-950">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Modele
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Params
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      R² (1s)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Recall
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["MLP", "781K", "0.87+", "—"],
                    ["LSTM", "21K", "0.549 (D4)", "98.1%"],
                    ["PatchTST", "109K", "0.939 (D1)", "98.0%"],
                    ["XGBoost", "—", "Baseline", "—"],
                  ].map(([model, params, r2, recall]) => (
                    <tr key={model} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3 font-medium">{model}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{params}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r2}</td>
                      <td className="px-4 py-3 text-emerald-400">{recall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">
              <span className="mr-2 font-mono text-amber-400">03</span>
              Innovation : regression quantile
            </h3>
            <p className="text-sm text-muted-foreground">
              Au lieu de predire une seule valeur, les modeles predisent 3
              quantiles (Q10, Q50, Q90). Le Q90 surestime le risque
              volontairement — pour un systeme de securite, il vaut mieux
              prevenir un danger qui n&apos;existe pas que de rater un vrai
              danger. Resultat : <strong>&gt;90% recall</strong> sur tous les
              modeles en extrapolation critique.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">
              <span className="mr-2 font-mono text-red-400">04</span>
              Protocole d&apos;evaluation : D1 → D4
            </h3>
            <p className="text-sm text-muted-foreground">
              4 configurations de test de difficulte croissante. <strong>D4</strong>{" "}
              (la plus dure) entraine sur LTR ≤ 0.9 et teste sur LTR &gt; 0.9 —
              le modele doit predire des situations critiques qu&apos;il n&apos;a
              jamais vues. C&apos;est la que le recall de 98% est remarquable.
            </p>
          </div>
        </div>
      </section>

      {/* Input features */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Variables d&apos;entree</h2>
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-zinc-950">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Variable
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["vx, vy", "Vitesses longitudinale et laterale"],
                ["ψ, ψ̇", "Angle de lacet et sa derivee"],
                ["φ", "Angle de roulis"],
                ["θ", "Angle de tangage"],
                ["δf", "Angle de braquage"],
                ["δ̇f", "Vitesse de braquage"],
              ].map(([v, desc]) => (
                <tr key={v} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-3 font-mono">{v}</td>
                  <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Team & context */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Contexte</h2>
        <p className="text-sm text-muted-foreground">
          Projet realise pour la <strong>DGA</strong> (Direction Generale de
          l&apos;Armement) dans le cadre d&apos;un projet de recherche sur la
          securite des vehicules militaires. Equipe de 5 etudiants, supervisee
          par Sebastien Aubin (DGA) et Fabien Lionti (developpeur VDSim).
        </p>
      </section>
    </div>
  );
}
