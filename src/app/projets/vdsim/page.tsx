import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SvgDiagram, Box, Arrow, Label, GroupBox, Circle,
} from "@/components/svg-diagrams";

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
          {["PyTorch", "LSTM", "PatchTST", "Neural ODE", "XGBoost", "DGA", "Polytechnique"].map((t) => (
            <Badge key={t} variant="secondary" className="font-mono text-[10px]">{t}</Badge>
          ))}
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Prediction du risque de retournement vehiculaire
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Systeme de prediction par deep learning du Load Transfer Ratio (LTR) sur un horizon de 1 a 8
          secondes. Projet pour la Direction Generale de l&apos;Armement (DGA), encadre par Sebastien Aubin (DGA)
          et Fabien Lionti (VDSim). Equipe de 5 eleves de l&apos;Ecole Polytechnique.
        </p>
      </header>

      {/* Key results */}
      <div className="mb-10 grid gap-4 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <p className="text-3xl font-bold text-emerald-400">98%</p>
          <p className="mt-1 text-xs text-muted-foreground">Recall sur le danger critique</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="text-3xl font-bold">8s</p>
          <p className="mt-1 text-xs text-muted-foreground">Horizon de prediction max</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="text-3xl font-bold">484</p>
          <p className="mt-1 text-xs text-muted-foreground">Scenarios generes</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="text-3xl font-bold">5</p>
          <p className="mt-1 text-xs text-muted-foreground">Modeles compares</p>
        </Card>
      </div>

      <Separator className="mb-10" />

      {/* ── Le probleme ── */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Le probleme</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-foreground/90">
          Les vehicules militaires evoluent en terrain accidente a haute vitesse — virages serres, evitement
          d&apos;obstacles, pentes laterales. Un retournement peut etre fatal. Le <strong>Load Transfer Ratio
          (LTR)</strong> mesure le transfert de charge lateral entre les roues gauches et droites :
        </p>
        <Card className="mb-6 border-l-2 border-l-violet-500 bg-violet-500/5 p-5">
          <p className="mb-2 font-serif italic text-lg text-center">
            LTR(t) = (ΣF<sub>z,gauche</sub> − ΣF<sub>z,droite</sub>) / (ΣF<sub>z,gauche</sub> + ΣF<sub>z,droite</sub>)
          </p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <p><span className="font-mono text-emerald-400">LTR = 0.0</span> — charge equilibree (ligne droite)</p>
            <p><span className="font-mono text-amber-400">|LTR| &gt; 0.7</span> — zone dangereuse</p>
            <p><span className="font-mono text-red-400">|LTR| = 1.0</span> — decollement des roues, retournement imminent</p>
          </div>
        </Card>
        <p className="mb-4 text-[15px] leading-relaxed text-foreground/90">
          <strong>Le probleme :</strong> le LTR instantane detecte le danger quand il est deja trop tard.
          L&apos;approche physique existante (Predicted LTR par Taylor) ne fonctionne que sur ~100ms — insuffisant
          pour qu&apos;un conducteur reagisse.
        </p>
        <p className="text-[15px] leading-relaxed text-foreground/90">
          <strong>L&apos;objectif :</strong> predire le LTR <strong>1 a 8 secondes dans le futur</strong> par deep learning,
          en etant capable de detecter des situations critiques <strong>jamais vues a l&apos;entrainement</strong> (extrapolation).
        </p>
      </section>

      {/* ── Simulateur ── */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Simulateur VDSim</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-foreground/90">
          Les donnees proviennent du simulateur VDSim, developpe par Fabien Lionti. Architecture a <strong>10 degres
          de liberte</strong> : 6 mouvements du chassis (x, y, z, roulis, tangage, lacet) + 4 vitesses de rotation des roues.
          Pneumatiques modelises par la formule magique de Pacejka. Suspensions masses-ressorts-amortisseurs independantes.
        </p>
        <SvgDiagram width={700} height={160} title="Pipeline de generation de donnees">
          <Box x={20} y={55} w={130} h={50} label="Trajectoire" sublabel="6 types" color="default" />
          <Box x={190} y={55} w={140} h={50} label="Controleurs" sublabel="PID + Stanley" color="violet" />
          <Box x={370} y={55} w={140} h={50} label="VDSim 10DOF" sublabel="Pacejka" color="cyan" />
          <Box x={550} y={55} w={130} h={50} label="CSV" sublabel="8 feat + LTR" color="accent" />
          <Arrow x1={150} y1={80} x2={190} y2={80} />
          <Arrow x1={330} y1={80} x2={370} y2={80} />
          <Arrow x1={510} y1={80} x2={550} y2={80} />
        </SvgDiagram>
        <p className="mb-4 text-[15px] leading-relaxed text-foreground/90">
          <strong>484 scenarios</strong> de 15 secondes a 100 Hz, repartis en 6 types :
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-zinc-950">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">LTR typique</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Circle", "Virage circulaire continu", "150", "0.3 — 0.95"],
                ["Single", "Virage simple", "100", "0.3 — 0.9"],
                ["Lemniscate", "Figure en 8", "30", "0.5 — 0.95"],
                ["Slalom", "Oscillations sinusoidales", "33", "0.5 — 0.95"],
                ["DLC", "Double changement de voie", "21", "0.3 — 0.95"],
                ["Waypoint", "Points de controle", "150", "0.1 — 0.8"],
              ].map(([type, desc, n, ltr]) => (
                <tr key={type} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-3 font-mono font-medium">{type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                  <td className="px-4 py-3 text-muted-foreground">{n}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{ltr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Variables d'entree ── */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Variables d&apos;entree</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          8 variables capteur, fenetre de 1.5 a 2 secondes de lookback a 100 Hz.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-zinc-950">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Variable</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Role</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["vx", "Vitesse longitudinale", "Indicateur principal de risque"],
                ["vy", "Vitesse laterale", "Glissement lateral du vehicule"],
                ["ψ (psi)", "Angle de lacet", "Direction du vehicule"],
                ["ψ̇ (psi_dot)", "Vitesse de lacet", "Taux de rotation, precurseur cle"],
                ["φ (phi)", "Angle de roulis", "Inclinaison laterale du chassis"],
                ["θ (theta)", "Angle de tangage", "Inclinaison avant/arriere"],
                ["δf", "Angle de braquage", "Commande du conducteur"],
                ["δ̇f", "Vitesse de braquage", "Rapidite de la manoeuvre"],
              ].map(([v, desc, role]) => (
                <tr key={v} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-3 font-mono">{v}</td>
                  <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Protocole d'evaluation ── */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Protocole d&apos;evaluation — extrapolation OOD</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-foreground/90">
          L&apos;enjeu central : on ne peut pas retourner des vehicules militaires a l&apos;entrainement.
          Le modele doit predire des situations critiques <strong>qu&apos;il n&apos;a jamais vues</strong>.
          4 configurations de difficulte croissante :
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-zinc-950">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Config</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Train</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Test</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Difficulte</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["D1", "LTR ≤ 0.7", "LTR ≤ 0.7", "In-distribution (baseline)"],
                ["D2", "LTR ≤ 0.7", "LTR > 0.7", "OOD extreme — le plus dur"],
                ["D3", "LTR ≤ 0.8", "LTR > 0.8", "OOD"],
                ["D4", "LTR ≤ 0.9", "LTR > 0.9", "OOD modere"],
              ].map(([cfg, train, test, diff]) => (
                <tr key={cfg} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-3 font-mono font-bold">{cfg}</td>
                  <td className="px-4 py-3 font-mono text-emerald-400">{train}</td>
                  <td className="px-4 py-3 font-mono text-red-400">{test}</td>
                  <td className="px-4 py-3 text-muted-foreground">{diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Card className="mt-4 border-l-2 border-l-amber-500 bg-amber-500/5 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Regression quantile.</strong> Au lieu de predire une seule valeur, les modeles predisent
            3 quantiles (Q10, Q50, Q90). Le <strong>Q90</strong> surestime volontairement le risque — pour
            un systeme de securite, mieux vaut une fausse alarme qu&apos;un danger manque.
          </p>
        </Card>
      </section>

      {/* ── Modeles ── */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">5 modeles compares</h2>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="mb-2 font-semibold"><span className="mr-2 font-mono text-violet-400">01</span>MLP (baseline)</h3>
            <p className="text-sm text-muted-foreground">
              Perceptron multicouche. La fenetre d&apos;entree est aplatie en un vecteur. Rapide mais
              aucune memoire temporelle — ne capture pas la dynamique sequentielle.
            </p>
          </Card>

          <Card className="p-5">
            <h3 className="mb-2 font-semibold"><span className="mr-2 font-mono text-emerald-400">02</span>LSTM</h3>
            <p className="text-sm text-muted-foreground">
              1 couche BiLSTM, hidden_size=128, mecanisme d&apos;attention. Capture les dependances temporelles
              longues. Excelle en extrapolation (D2-D4) grace a sa memoire cellulaire. Le meilleur rapport
              performance/complexite.
            </p>
          </Card>

          <Card className="p-5">
            <h3 className="mb-2 font-semibold"><span className="mr-2 font-mono text-cyan-400">03</span>PatchTST</h3>
            <p className="text-sm text-muted-foreground">
              Transformer adapte aux series temporelles. Decoupe la sequence en patches de 15 pas (0.15s),
              puis applique le self-attention entre patches. Meilleur R² en in-distribution (D1) mais
              moins robuste en OOD que le LSTM.
            </p>
          </Card>

          <Card className="p-5">
            <h3 className="mb-2 font-semibold"><span className="mr-2 font-mono text-amber-400">04</span>XGBoost</h3>
            <p className="text-sm text-muted-foreground">
              Gradient boosting (200 arbres) avec regression quantile Q90. Features statistiques sur la fenetre
              (moyenne, variance, min, max). Baseline robuste, perd la structure temporelle explicite.
            </p>
          </Card>

          <Card className="border-l-2 border-l-rose-500 p-5">
            <h3 className="mb-2 font-semibold"><span className="mr-2 font-mono text-rose-400">05</span>LSTM + Neural ODE (notre innovation)</h3>
            <p className="text-sm text-muted-foreground">
              Architecture hybride physique + data-driven. Un Neural ODE entraine sur la dynamique vehicule
              (dx/dt = f(etat, commande)) genere 16 features physiques. Concatenees aux 8 features brutes → 24
              dimensions en entree du LSTM. Le NODE est gele a l&apos;inference — pas de data leakage.
            </p>
            <SvgDiagram width={650} height={200} title="Architecture LSTM + Neural ODE">
              <Label x={60} y={20} text="8 features capteur" size={11} color="#a1a1aa" />
              <Box x={20} y={35} w={80} h={40} label="vx, vy..." sublabel="brutes" color="default" />
              <GroupBox x={140} y={10} w={200} h={100} label="NODE (gele)" color="rose" />
              <Box x={160} y={45} w={70} h={40} label="7 feat" color="rose" />
              <Arrow x1={230} y1={65} x2={260} y2={65} />
              <Box x={260} y={35} w={60} h={55} label="NODE" sublabel="256→128" color="rose" />
              <Arrow x1={100} y1={55} x2={160} y2={55} />
              <Arrow x1={100} y1={55} x2={100} y2={140} />
              <Arrow x1={100} y1={140} x2={370} y2={140} />
              <Arrow x1={320} y1={65} x2={370} y2={65} />
              <Box x={370} y={35} w={60} h={40} label="16 feat" sublabel="phys." color="rose" />
              <Circle cx={460} cy={110} r={18} label="+" color="cyan" />
              <Arrow x1={400} y1={75} x2={445} y2={100} />
              <Arrow x1={370} y1={140} x2={445} y2={120} />
              <Arrow x1={478} y1={110} x2={510} y2={110} />
              <Box x={510} y={85} w={120} h={50} label="LSTM" sublabel="h=128" color="accent" />
              <Label x={570} y={155} text="→ Q10, Q50, Q90" size={10} color="#10b981" />
            </SvgDiagram>
          </Card>
        </div>
      </section>

      {/* ── Resultats ── */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Resultats</h2>

        <h3 className="mb-3 font-semibold">Recall Q90 a seuil 0.7 — D4 (OOD : train ≤ 0.9, test &gt; 0.9)</h3>
        <div className="mb-6 overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-zinc-950">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Horizon</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">MLP</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">LSTM</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">PatchTST</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">XGBoost</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1s", "100%", "99%", "100%", "99%"],
                ["2s", "98%", "100%", "100%", "100%"],
                ["4s", "99%", "100%", "100%", "100%"],
                ["6s", "100%", "99%", "99%", "100%"],
                ["8s", "100%", "100%", "99%", "100%"],
              ].map(([h, mlp, lstm, patch, xgb]) => (
                <tr key={h} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-3 font-mono font-bold">{h}</td>
                  <td className="px-4 py-3 text-emerald-400">{mlp}</td>
                  <td className="px-4 py-3 text-emerald-400">{lstm}</td>
                  <td className="px-4 py-3 text-emerald-400">{patch}</td>
                  <td className="px-4 py-3 text-emerald-400">{xgb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mb-3 font-semibold">LSTM+NODE — Resultats Q90 (horizon 2s, sans data leakage)</h3>
        <div className="mb-6 overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-zinc-950">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Config</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">AUC-PR</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recall</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Precision</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["D2 (OOD dur)", "0.860", "91.2%", "66.3%", "70.8%"],
                ["D3 (OOD)", "0.969", "96.1%", "82.6%", "77.5%"],
                ["D4 (OOD modere)", "0.989", "97.9%", "90.8%", "88.4%"],
              ].map(([cfg, auc, rec, prec, cov]) => (
                <tr key={cfg} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-3 font-mono font-medium">{cfg}</td>
                  <td className="px-4 py-3 text-muted-foreground">{auc}</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">{rec}</td>
                  <td className="px-4 py-3 text-muted-foreground">{prec}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cov}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card className="border-l-2 border-l-emerald-500 bg-emerald-500/5 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Resultat cle :</strong> En configuration D4, le LSTM+NODE atteint 97.9% de recall
            avec 90.8% de precision a horizon 2 secondes — sur des situations critiques jamais vues
            a l&apos;entrainement. Le HPO (3 rounds Optuna, LSTM vs PatchTST) confirme que le LSTM
            capture mieux la dynamique sequentielle vehicule que le Transformer (+3 points AUC-PR).
          </p>
        </Card>
      </section>

      {/* ── Stack technique ── */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Stack technique</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-widest">Simulation</h3>
            <p className="text-sm text-muted-foreground">
              Python, VDSim (10DOF), Pacejka, controleurs PID/Stanley, 484 scenarios CSV a 100Hz
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-widest">Deep Learning</h3>
            <p className="text-sm text-muted-foreground">
              PyTorch, BiLSTM+Attention, PatchTST, Neural ODE, regression quantile (pinball loss)
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-widest">ML classique</h3>
            <p className="text-sm text-muted-foreground">
              XGBoost avec regression quantile Q90, features statistiques (moyenne, variance, extrema)
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-widest">Optimisation</h3>
            <p className="text-sm text-muted-foreground">
              Optuna (3 rounds HPO), ReduceLROnPlateau, early stopping, dropout 0.48, entraindement ~6h sur Apple MPS
            </p>
          </Card>
        </div>
      </section>

      {/* ── Equipe ── */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Contexte</h2>
        <p className="text-[15px] leading-relaxed text-foreground/90">
          Projet de recherche pour la <strong>DGA</strong> (Direction Generale de l&apos;Armement), dans le
          cadre du cursus ingenieur de l&apos;Ecole Polytechnique. Equipe : VOLLAND Louis, TARDY Zaccharie,
          RAMLAOUI Mohamed Taha, EL KHARRAZE Adam, CHAIRI Saad. Encadrement : Sebastien Aubin (DGA),
          Fabien Lionti (developpeur VDSim).
        </p>
      </section>
    </div>
  );
}
