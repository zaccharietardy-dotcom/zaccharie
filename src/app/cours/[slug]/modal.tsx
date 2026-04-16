"use client";

import {
  Section,
  Code,
  KeyConcept,
  Warning,
  Analogy,
  Quiz,
  Term,
  Steps,
  Step,
  ComparisonTable,
} from "@/components/course-elements";
import {
  SvgDiagram,
  Box,
  Arrow,
  Label,
  GroupBox,
  Circle,
} from "@/components/svg-diagrams";
import {
  Def,
  Theorem,
  Proposition,
  Proof,
  Remark,
} from "@/components/math-elements";

/* ── Math helper components using pure HTML/CSS ────────── */

function F({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic text-[1.05em]">{children}</span>;
}

function Eq({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 text-center text-lg font-serif italic leading-relaxed">
      {children}
    </div>
  );
}

function Frac({
  n,
  d,
}: {
  n: React.ReactNode;
  d: React.ReactNode;
}) {
  return (
    <span className="inline-flex flex-col items-center mx-1 align-middle text-[0.85em]">
      <span className="border-b border-current px-1 pb-0.5">{n}</span>
      <span className="px-1 pt-0.5">{d}</span>
    </span>
  );
}

function Sub({ children, sub }: { children: React.ReactNode; sub: React.ReactNode }) {
  return (
    <span>
      {children}
      <sub className="text-[0.7em]">{sub}</sub>
    </span>
  );
}

function Sup({ children, sup }: { children: React.ReactNode; sup: React.ReactNode }) {
  return (
    <span>
      {children}
      <sup className="text-[0.7em]">{sup}</sup>
    </span>
  );
}

function Int({
  from,
  to,
}: {
  from?: React.ReactNode;
  to?: React.ReactNode;
}) {
  return (
    <span className="text-[1.4em] align-middle mx-0.5">
      ∫
      {from && <sub className="text-[0.55em]">{from}</sub>}
      {to && <sup className="text-[0.55em]">{to}</sup>}
    </span>
  );
}

/* Unicode math symbols reference:
   α β γ δ ε θ λ μ ν σ φ ω κ τ ρ
   ∀ ∃ ∈ ∉ ⊂ ⊃ ∩ ∪ ∅
   ≤ ≥ ≠ ≈ → ⟹ ⟸ ⟺ ∞
   ⟨ ⟩ ‖ ∂ ∇ ∑ ∏ √
   ℝ ℕ ℤ ℚ ℂ ℓ 𝔼 ℙ
*/

export function Modal() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. LA PROBLEMATIQUE DES EVENEMENTS RARES                     */}
      {/* ============================================================ */}
      <Section id="evenements-rares" number="01" title="La problematique des evenements rares">
        <p>
          Ce cours, donne par Gersende Fort a l&apos;Ecole Polytechnique
          (MODAL APM_43M02), traite de la{" "}
          <Term def="Simulation de systemes stochastiques ou l'on s'interesse a des evenements de probabilite tres faible (typiquement inferieure a 10^{-4}), necessitant des methodes specifiques.">
            simulation numerique aleatoire pour evenements rares
          </Term>.
          On cherche a evaluer des probabilites tres petites, a simuler des
          scenarii atypiques, et a calculer des statistiques conditionnelles
          dans des situations ou la methode de Monte Carlo naive echoue.
        </p>

        <Def title="Evenement rare">
          <p>
            On dit qu&apos;un evenement <F>A</F> est{" "}
            <strong>rare</strong> lorsque sa probabilite{" "}
            <F>p = ℙ(A)</F> verifie :
          </p>
          <Eq>
            <F>p = ℙ(A) ≤ </F><Sup sup={"-4"}><F>10</F></Sup>
          </Eq>
          <p>
            Cela signifie que l&apos;evenement se produit en moyenne moins
            d&apos;une fois sur 10 000 realisations.
          </p>
        </Def>

        <p>
          Les evenements rares apparaissent dans de nombreux domaines :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Finance</strong> : calcul de la Value-at-Risk (VaR),
            probabilite de ruine d&apos;une compagnie d&apos;assurance,
            evenements de marche extremes
          </li>
          <li>
            <strong>Nucleaire</strong> : probabilite d&apos;accident grave
            dans une centrale (etudes de surete)
          </li>
          <li>
            <strong>Aeronautique</strong> : taux de defaillance
            critique d&apos;un systeme embarque
          </li>
          <li>
            <strong>Epidemiologie</strong> : probabilite de depassement
            d&apos;un seuil epidemique, pandemie
          </li>
          <li>
            <strong>Telecommunications</strong> : debordement de files
            d&apos;attente dans un reseau
          </li>
        </ul>

        <KeyConcept title="Les trois objectifs">
          <p>
            Face a un evenement rare <F>A</F>, on cherche generalement a :
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              <strong>Evaluer</strong> <F>p = ℙ(A)</F> avec une
              precision relative donnee
            </li>
            <li>
              <strong>Generer</strong> des realisations typiques de
              l&apos;evenement rare (a quoi ressemble un scenario de crise ?)
            </li>
            <li>
              <strong>Calculer des statistiques conditionnelles</strong> :
              𝔼[<F>h(X) | X ∈ A</F>]
            </li>
          </ol>
        </KeyConcept>

        <Proposition title="Temps de retour">
          <p>
            Si <F>A</F> est un evenement de probabilite <F>p</F>,
            le <strong>temps de retour</strong>{" "}
            <Sub sub="A"><F>τ</F></Sub> est le nombre
            d&apos;experiences independantes avant la premiere occurrence
            de <F>A</F>. On a :
          </p>
          <Eq>
            <Sub sub="A"><F>τ</F></Sub> ∼ Geom(<F>p</F>),
            &nbsp;&nbsp; 𝔼[<Sub sub="A"><F>τ</F></Sub>] ={" "}
            <Frac n="1" d={<F>p</F>} />
          </Eq>
          <p>
            Pour <F>p = </F><Sup sup={"-7"}><F>10</F></Sup>,
            il faut en moyenne 10 millions d&apos;experiences pour
            observer l&apos;evenement une seule fois.
          </p>
        </Proposition>

        <p>
          Les difficultes sont de deux ordres :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Computationnelle</strong> : pour estimer <F>p</F> avec
            une precision relative de 10%, il faut de l&apos;ordre de{" "}
            <F>100/p</F> simulations (on verra pourquoi en section 4)
          </li>
          <li>
            <strong>Modelisation</strong> : le resultat est tres sensible
            au choix de la loi des queues de distribution —
            une erreur de modelisation peut changer <F>p</F> de
            plusieurs ordres de grandeur
          </li>
        </ul>

        <SvgDiagram width={700} height={300} title="Monte Carlo naif vs accelere — le defi des evenements rares">
          {/* Axes */}
          <Arrow x1={60} y1={270} x2={60} y2={20} color="#a1a1aa" />
          <Arrow x1={60} y1={270} x2={680} y2={270} color="#a1a1aa" />
          <Label x={40} y={20} text="cout" size={10} color="#e4e4e7" anchor="end" />
          <Label x={680} y={285} text="-log(p)" size={10} color="#e4e4e7" anchor="end" />

          {/* Seuil p=10^{-4} */}
          <line x1={300} y1={270} x2={300} y2={30} stroke="#f59e0b33" strokeWidth={1} strokeDasharray="4,4" />
          <Label x={300} y={285} text="p=10^-4" size={9} color="#f59e0b" />

          {/* MC naif : courbe ~ 1/p => exponentielle */}
          <polyline
            points="80,260 140,250 200,230 260,200 320,150 380,100 440,60 500,40 560,32 620,28 660,26"
            fill="none" stroke="#f43f5e" strokeWidth={2}
          />
          <Label x={580} y={18} text="MC naif: ~1/p simulations" size={9} color="#f43f5e" anchor="start" />

          {/* Methode acceleree : courbe beaucoup plus plate */}
          <polyline
            points="80,260 140,255 200,248 260,240 320,232 380,224 440,218 500,212 560,208 620,204 660,200"
            fill="none" stroke="#10b981" strokeWidth={2}
          />
          <Label x={580} y={195} text="Methode acceleree" size={9} color="#10b981" anchor="start" />

          {/* Zone rare */}
          <rect x={300} y={30} width={370} height={240} fill="#f59e0b08" rx={4} />
          <Label x={485} y={50} text="ZONE EVENEMENTS RARES" size={9} color="#f59e0b" />

          {/* Points de repere */}
          <Label x={80} y={285} text="10^-1" size={8} color="#a1a1aa" />
          <Label x={190} y={285} text="10^-3" size={8} color="#a1a1aa" />
          <Label x={420} y={285} text="10^-6" size={8} color="#a1a1aa" />
          <Label x={560} y={285} text="10^-8" size={8} color="#a1a1aa" />
        </SvgDiagram>

        <Remark>
          <p>
            Le graphique illustre le probleme central : le cout du Monte Carlo
            naif croit comme <F>1/p</F> quand <F>p → 0</F>, ce qui
            le rend impraticable pour les evenements rares. Les methodes
            d&apos;acceleration (splitting, importance sampling) visent a
            maintenir un cout raisonnable meme quand <F>p</F> est tres petit.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 2. MONTE CARLO : PRINCIPES DE BASE                          */}
      {/* ============================================================ */}
      <Section id="monte-carlo" number="02" title="Monte Carlo : principes de base">
        <p>
          La methode de{" "}
          <Term def="Methode d'approximation numerique basee sur des tirages aleatoires. Le nom vient du casino de Monte-Carlo, par analogie avec le jeu de hasard.">
            Monte Carlo
          </Term>{" "}
          est le socle de tout ce cours. L&apos;idee fondamentale :
          approcher une esperance par une moyenne empirique.
        </p>

        <Def title="Objectif de base">
          <p>
            Soit <F>X</F> une variable aleatoire de loi connue et{" "}
            <F>h</F> une fonction mesurable. On veut approcher :
          </p>
          <Eq>
            <F>μ = 𝔼[h(X)]</F>
          </Eq>
          <p>
            a partir d&apos;un echantillon{" "}
            <Sub sub="1"><F>X</F></Sub>, ...,{" "}
            <Sub sub="n"><F>X</F></Sub> i.i.d. de meme loi que <F>X</F>.
          </p>
        </Def>

        <Def title="Estimateur ponctuel de Monte Carlo">
          <p>
            L&apos;<strong>estimateur de Monte Carlo</strong> de <F>μ</F> est
            la moyenne empirique :
          </p>
          <Eq>
            <Sub sub="n"><F>μ̂</F></Sub> ={" "}
            <Frac
              n="1"
              d={<F>n</F>}
            />{" "}
            <Sup sup="n"><F>∑</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
            <F>h(</F><Sub sub="i"><F>X</F></Sub><F>)</F>
          </Eq>
        </Def>

        <Theorem name="Loi des Grands Nombres forte">
          <p>
            Si 𝔼[|<F>h(X)</F>|] &lt; ∞, alors :
          </p>
          <Eq>
            <Sub sub="n"><F>μ̂</F></Sub> →{" "}
            𝔼[<F>h(X)</F>] &nbsp; p.s. quand <F>n → ∞</F>
          </Eq>
          <p>
            L&apos;estimateur est <strong>fortement consistant</strong> :
            il converge presque surement vers la vraie valeur.
          </p>
        </Theorem>

        <Proof>
          <p>
            C&apos;est une consequence directe de la LGN forte de Kolmogorov :
            les <F>h(</F><Sub sub="i"><F>X</F></Sub><F>)</F> sont
            i.i.d., integrables, donc leur moyenne empirique converge p.s.
            vers leur esperance commune.
          </p>
        </Proof>

        <Theorem name="Theoreme Central Limite (TCL)">
          <p>
            Si <Sub sub="h"><F>σ</F></Sub><Sup sup="2"><F>{" "}</F></Sup> = Var(<F>h(X)</F>) &lt; ∞, alors :
          </p>
          <Eq>
            <F>√n</F>{" "}
            <Frac
              n={<><Sub sub="n"><F>μ̂</F></Sub> − 𝔼[<F>h(X)</F>]</>}
              d={<Sub sub="h"><F>σ</F></Sub>}
            />{" "}
            <F>→ N(0, 1)</F> &nbsp; en loi
          </Eq>
          <p>
            Cela donne la <strong>vitesse de convergence</strong> :
            l&apos;erreur est de l&apos;ordre de{" "}
            <F>σ</F><Sub sub="h"><F>{" "}</F></Sub><F>/√n</F>, independamment
            de la dimension du probleme.
          </p>
        </Theorem>

        <Analogy>
          <p>
            Le Monte Carlo, c&apos;est comme un sondage electoral :
            on interroge <F>n</F> personnes (les tirages) pour estimer
            le pourcentage de vote (l&apos;esperance). Le TCL dit que
            la marge d&apos;erreur decroit en <F>1/√n</F> :
            pour diviser l&apos;erreur par 2, il faut 4 fois plus de sondages.
          </p>
        </Analogy>

        <Proposition title="Methode delta">
          <p>
            Soit <F>g : </F>ℝ<Sup sup="d"><F>{" "}</F></Sup> → ℝ
            differentiable en <F>m = 𝔼[X]</F>, et{" "}
            <Sub sub="n"><F>X̄</F></Sub> la moyenne empirique d&apos;un
            echantillon i.i.d. de matrice de covariance <F>Σ</F>. Alors :
          </p>
          <Eq>
            <F>√n (g(</F><Sub sub="n"><F>X̄</F></Sub><F>) − g(m)) → N(0, ∇g(m)</F><Sup sup="T"><F>{" "}</F></Sup><F>Σ ∇g(m))</F>
          </Eq>
          <p>
            La methode delta permet de deduire la loi limite de{" "}
            <F>g(</F><Sub sub="n"><F>X̄</F></Sub><F>)</F> a partir
            de celle de <Sub sub="n"><F>X̄</F></Sub>.
          </p>
        </Proposition>

        <Remark>
          <p>
            La methode delta est essentielle pour construire des intervalles
            de confiance pour des fonctions de l&apos;esperance : par exemple
            pour estimer <F>√μ</F> ou <F>log(μ)</F> quand on connait
            le TCL pour <Sub sub="n"><F>μ̂</F></Sub>.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 3. INTERVALLES DE CONFIANCE                                  */}
      {/* ============================================================ */}
      <Section id="intervalles-confiance" number="03" title="Intervalles de confiance">
        <p>
          Le TCL fournit une approximation de la distribution de
          l&apos;erreur d&apos;estimation. On en deduit des{" "}
          <Term def="Intervalle aleatoire qui contient le parametre vrai avec une probabilite prescrite (le niveau de confiance).">
            intervalles de confiance
          </Term>{" "}
          pour quantifier la precision de l&apos;estimateur de Monte Carlo.
        </p>

        <Def title="Intervalle de confiance — variance connue">
          <p>
            Si <Sub sub="h"><F>σ</F></Sub> est connu, un intervalle de
            confiance de niveau <F>1 − α</F> pour{" "}
            <F>μ = 𝔼[h(X)]</F> est :
          </p>
          <Eq>
            <F>IC = [</F><Sub sub="n"><F>μ̂</F></Sub> ±{" "}
            <Sub sub={<>1−α/2</>}><F>z</F></Sub>{" "}
            <Frac n={<Sub sub="h"><F>σ</F></Sub>} d={<F>√n</F>} />
            <F>]</F>
          </Eq>
          <p>
            ou <Sub sub={<>1−α/2</>}><F>z</F></Sub> est le quantile
            de la loi normale standard.
          </p>
        </Def>

        <Def title="Intervalle de confiance — variance inconnue">
          <p>
            En pratique, <Sub sub="h"><F>σ</F></Sub> est inconnu. On le
            remplace par l&apos;estimateur :
          </p>
          <Eq>
            <Sub sub="n"><F>σ̂</F></Sub><Sup sup="2"><F>{" "}</F></Sup> ={" "}
            <Frac n="1" d={<F>n − 1</F>} />{" "}
            <Sup sup="n"><F>∑</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
            <F>(h(</F><Sub sub="i"><F>X</F></Sub><F>) − </F>
            <Sub sub="n"><F>μ̂</F></Sub><Sup sup="2"><F>)</F></Sup>
          </Eq>
          <p>
            Le <strong>lemme de Slutsky</strong> garantit que l&apos;IC reste
            asymptotiquement valide :
          </p>
          <Eq>
            <F>IC = [</F><Sub sub="n"><F>μ̂</F></Sub> ±{" "}
            <Sub sub={<>1−α/2</>}><F>z</F></Sub>{" "}
            <Frac n={<Sub sub="n"><F>σ̂</F></Sub>} d={<F>√n</F>} />
            <F>]</F>
          </Eq>
        </Def>

        <ComparisonTable
          headers={["", "Variance connue", "Variance inconnue"]}
          rows={[
            ["Demi-largeur", "z * sigma_h / sqrt(n)", "z * sigma_hat_n / sqrt(n)"],
            ["Valide pour n fini ?", "Oui (si h(X) gaussien)", "Non — asymptotique (Slutsky)"],
            ["En pratique ?", "Rare (sigma rarement connu)", "Le cas standard"],
            ["Convergence", "O(1/sqrt(n))", "O(1/sqrt(n))"],
          ]}
        />

        <p>
          <strong>Quantiles usuels</strong> de la loi normale standard :
        </p>
        <ComparisonTable
          headers={["Niveau de confiance", "1 − alpha", "z_{1−alpha/2}"]}
          rows={[
            ["90%", "0.90", "1.645"],
            ["95%", "0.95", "1.960"],
            ["99%", "0.99", "2.576"],
          ]}
        />

        <Proposition title="Approximation binomiale vs Poisson">
          <p>
            Soit <Sub sub="n"><F>S</F></Sub> = nombre de succes
            sur <F>n</F> essais de Bernoulli de parametre <F>p</F>.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>TCL</strong> : <Sub sub="n"><F>S</F></Sub> ≈{" "}
              <F>N(np, np(1−p))</F> quand <F>n</F> est grand
            </li>
            <li>
              <strong>Le Cam (1960)</strong> : quand <F>p</F> est petit et{" "}
              <F>np</F> reste modere,{" "}
              <Sub sub="n"><F>S</F></Sub> ≈ Poisson(<F>np</F>) avec une erreur
              en variation totale ≤ <Sup sup="2"><F>p</F></Sup>
            </li>
          </ul>
        </Proposition>

        <Remark>
          <p>
            Pour les evenements rares (<F>p</F> petit), l&apos;approximation
            poissonienne est bien meilleure que l&apos;approximation gaussienne.
            Le resultat de <strong>Shevtsova (2007)</strong> donne des bornes
            explicites sur l&apos;erreur du TCL (constante dans l&apos;inegalite
            de Berry-Esseen) et montre que le regime gaussien peut etre
            atteint tres lentement quand <F>p → 0</F>.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 4. MC NAIF POUR EVENEMENTS RARES                             */}
      {/* ============================================================ */}
      <Section id="mc-evenements-rares" number="04" title="Monte Carlo naif pour evenements rares">
        <p>
          Appliquons le Monte Carlo de base a l&apos;estimation d&apos;une
          probabilite rare <F>p = ℙ(X ∈ A)</F>.
        </p>

        <Def title="Estimateur de p">
          <p>
            L&apos;estimateur naturel de <F>p</F> est :
          </p>
          <Eq>
            <Sub sub="n"><F>p̂</F></Sub> ={" "}
            <Frac n="1" d={<F>n</F>} />{" "}
            <Sup sup="n"><F>∑</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
            <F>𝟙</F>{"{"}
            <Sub sub="i"><F>X</F></Sub> ∈ <F>A</F>
            {"}"}
          </Eq>
          <p>
            C&apos;est la proportion empirique de tirages qui tombent dans <F>A</F>.
          </p>
        </Def>

        <Proposition title="Variance de l'estimateur">
          <p>
            Comme <F>𝟙</F>{"{"}X ∈ A{"}"} est une Bernoulli de
            parametre <F>p</F> :
          </p>
          <Eq>
            Var(<Sub sub="n"><F>p̂</F></Sub>) ={" "}
            <Frac n={<F>p(1 − p)</F>} d={<F>n</F>} />{" "}
            ≈ <Frac n={<F>p</F>} d={<F>n</F>} />{" "}
            quand <F>p → 0</F>
          </Eq>
        </Proposition>

        <Proposition title="Precision relative">
          <p>
            La <strong>precision relative</strong> de l&apos;estimateur,
            definie comme le rapport ecart-type / esperance, vaut :
          </p>
          <Eq>
            <Frac
              n={<F>√Var(<Sub sub="n"><F>p̂</F></Sub>)</F>}
              d={<F>p</F>}
            />{" "}
            ={" "}
            <F>√</F><Frac n={<F>1 − p</F>} d={<F>np</F>} />{" "}
            ≈{" "}
            <Frac n="1" d={<F>√(np)</F>} />
          </Eq>
          <p>
            Pour une precision relative de <F>ε</F>, on a besoin de :
          </p>
          <Eq>
            <F>n ≈ </F>
            <Frac
              n={<><Sup sup="2"><Sub sub="1−α/2"><F>z</F></Sub></Sup></>}
              d={<><Sup sup="2"><F>ε</F></Sup> <F>p</F></>}
            />
          </Eq>
        </Proposition>

        <ComparisonTable
          headers={["Probabilite p", "Precision 10%", "Precision 1%"]}
          rows={[
            ["10^{-2}", "~40 000 tirages", "~4 000 000 tirages"],
            ["10^{-4}", "~4 000 000 tirages", "~400 000 000 tirages"],
            ["10^{-7}", "~4 * 10^9 tirages", "~4 * 10^11 tirages"],
          ]}
        />

        <Warning>
          <p>
            Pour les evenements rares, le nombre de tirages explose :
            il faut de l&apos;ordre de <F>1/p</F> tirages juste pour
            observer l&apos;evenement une fois, et <F>100/p</F> pour
            une precision relative de 10%. De plus, quand <F>np</F> est
            petit (regime Poisson), l&apos;approximation gaussienne du TCL
            peut etre tres imprecise — les intervalles de confiance gaussiens
            ne sont plus fiables.
          </p>
        </Warning>

        <KeyConcept title="Le Monte Carlo naif est trop couteux pour les evenements rares">
          <p>
            Quand <F>p ≤ </F><Sup sup={"-4"}><F>10</F></Sup>,
            le cout computationnel du Monte Carlo naif devient prohibitif.
            Il faut des methodes d&apos;acceleration qui reduisent la variance
            sans biaiser l&apos;estimateur : <strong>echantillonnage
            d&apos;importance</strong>, <strong>splitting</strong>,
            ou <strong>MCMC</strong>.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 5. SIMULATION DE VARIABLES ALEATOIRES                        */}
      {/* ============================================================ */}
      <Section id="simulation" number="05" title="Simulation de variables aleatoires">
        <p>
          Avant de pouvoir faire du Monte Carlo, il faut savoir{" "}
          <strong>simuler</strong> des variables aleatoires a partir
          d&apos;un generateur uniforme. Tout repose sur la fonction de
          repartition et son inverse.
        </p>

        <Def title="Fonction de repartition">
          <p>
            La <strong>fonction de repartition</strong> (cdf) d&apos;une
            variable aleatoire <F>X</F> est :
          </p>
          <Eq>
            <F>F(x) = ℙ(X ≤ x)</F>
          </Eq>
          <p>Proprietes fondamentales :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><F>F</F> est croissante (au sens large)</li>
            <li><F>F</F> est continue a droite</li>
            <li><F>F(−∞) = 0</F>, <F>F(+∞) = 1</F></li>
          </ul>
        </Def>

        <Def title="Fonction quantile (inverse generalisee)">
          <p>
            La <strong>fonction quantile</strong> de <F>X</F> est :
          </p>
          <Eq>
            <F>Q(α) = </F><Sup sup={"-1"}><F>F</F></Sup><F>(α) = inf</F>{"{"}
            <F>x ∈ ℝ : F(x) ≥ α</F>
            {"}"}, &nbsp; <F>α ∈ (0, 1)</F>
          </Eq>
          <p>
            Si <F>F</F> est strictement croissante et continue,{" "}
            <F>Q</F> = <Sup sup={"-1"}><F>F</F></Sup> au sens classique.
          </p>
        </Def>

        <Theorem name="Methode d'inversion">
          <p>
            Si <F>U ∼ U[0,1]</F>, alors <F>Q(U)</F> a la meme
            loi que <F>X</F>.
          </p>
          <p>
            Reciproquement, si <F>X</F> a la cdf <F>F</F> continue,
            alors <F>F(X) ∼ U[0,1]</F>.
          </p>
        </Theorem>

        <Proof>
          <p>
            Pour tout <F>x ∈ ℝ</F> :{" "}
            <F>ℙ(Q(U) ≤ x) = ℙ(U ≤ F(x)) = F(x)</F>,
            car <F>U</F> est uniforme et{" "}
            <F>Q(u) ≤ x ⟺ u ≤ F(x)</F> par definition de
            l&apos;inverse generalisee.
          </p>
        </Proof>

        <Proposition title="Transformation affine">
          <p>
            Si <F>Y = λX + m</F> avec <F>λ &gt; 0</F>, alors :
          </p>
          <Eq>
            <Sup sup="Y"><F>Q</F></Sup><F>(α) = λ</F>{" "}
            <Sup sup="X"><F>Q</F></Sup><F>(α) + m</F>
          </Eq>
        </Proposition>

        <SvgDiagram width={700} height={320} title="F et Q : correspondance en miroir">
          {/* F(x) a gauche */}
          <GroupBox x={20} y={10} w={310} h={290} label="CDF F(x)" color="accent" />
          {/* Axes pour F */}
          <Arrow x1={50} y1={280} x2={50} y2={30} color="#a1a1aa" />
          <Arrow x1={50} y1={280} x2={310} y2={280} color="#a1a1aa" />
          <Label x={30} y={30} text="1" size={9} color="#a1a1aa" anchor="end" />
          <Label x={30} y={280} text="0" size={9} color="#a1a1aa" anchor="end" />
          <Label x={310} y={295} text="x" size={10} color="#e4e4e7" />
          <Label x={35} y={15} text="F(x)" size={10} color="#10b981" anchor="end" />
          {/* Sigmoid-like CDF curve */}
          <path d="M50,275 C100,270 130,260 160,200 S220,80 260,50 C280,38 300,35 310,34"
            fill="none" stroke="#10b981" strokeWidth={2} />
          {/* Dashed line for alpha level */}
          <line x1={50} y1={150} x2={195} y2={150} stroke="#f59e0b" strokeWidth={1} strokeDasharray="4,4" />
          <line x1={195} y1={150} x2={195} y2={280} stroke="#f59e0b" strokeWidth={1} strokeDasharray="4,4" />
          <Label x={35} y={150} text="alpha" size={9} color="#f59e0b" anchor="end" />
          <Label x={195} y={295} text="Q(alpha)" size={9} color="#f59e0b" />

          {/* Q(alpha) a droite */}
          <GroupBox x={370} y={10} w={310} h={290} label="Quantile Q(alpha)" color="violet" />
          {/* Axes pour Q */}
          <Arrow x1={400} y1={280} x2={400} y2={30} color="#a1a1aa" />
          <Arrow x1={400} y1={280} x2={660} y2={280} color="#a1a1aa" />
          <Label x={385} y={280} text="0" size={9} color="#a1a1aa" anchor="end" />
          <Label x={385} y={30} text="x" size={9} color="#a1a1aa" anchor="end" />
          <Label x={660} y={295} text="alpha" size={10} color="#e4e4e7" />
          <Label x={660} y={25} text="Q(alpha)" size={10} color="#8b5cf6" />
          <Label x={650} y={295} text="1" size={9} color="#a1a1aa" />
          {/* Quantile function (mirror of CDF rotated) */}
          <path d="M400,275 C420,270 440,265 460,240 S500,160 530,110 C550,80 580,55 620,42 C640,38 650,36 660,35"
            fill="none" stroke="#8b5cf6" strokeWidth={2} />
          {/* Dashed line */}
          <line x1={500} y1={280} x2={500} y2={145} stroke="#f59e0b" strokeWidth={1} strokeDasharray="4,4" />
          <line x1={400} y1={145} x2={500} y2={145} stroke="#f59e0b" strokeWidth={1} strokeDasharray="4,4" />
          <Label x={500} y={295} text="alpha" size={9} color="#f59e0b" />
          <Label x={385} y={145} text="Q(alpha)" size={9} color="#f59e0b" anchor="end" />
        </SvgDiagram>

        <Proposition title="Simulation gaussienne — methode de Box-Muller">
          <p>
            Si <Sub sub="1"><F>U</F></Sub>, <Sub sub="2"><F>U</F></Sub> sont
            i.i.d. uniformes sur <F>[0, 1]</F>, alors :
          </p>
          <Eq>
            <F>X = √(−2 ln </F><Sub sub="1"><F>U</F></Sub><F>) cos(2π</F>
            <Sub sub="2"><F>U</F></Sub><F>)</F>
          </Eq>
          <p>
            suit une loi <F>N(0, 1)</F>. De meme pour{" "}
            <F>Y = √(−2 ln </F><Sub sub="1"><F>U</F></Sub><F>) sin(2π</F>
            <Sub sub="2"><F>U</F></Sub><F>)</F>,
            et <F>X, Y</F> sont independantes.
          </p>
        </Proposition>

        <Code language="python">{`import numpy as np

# 1. Methode d'inversion — exemple exponentielle
def simul_exponentielle(lam, n=10000):
    """Simule n v.a. Exp(lambda) par inversion."""
    U = np.random.uniform(0, 1, n)
    return -np.log(U) / lam

# 2. Methode de Box-Muller — gaussienne
def simul_gaussienne_box_muller(n=10000):
    """Simule n v.a. N(0,1) par Box-Muller."""
    U1 = np.random.uniform(0, 1, n)
    U2 = np.random.uniform(0, 1, n)
    X = np.sqrt(-2 * np.log(U1)) * np.cos(2 * np.pi * U2)
    return X

# Verification
X_exp = simul_exponentielle(lam=2.0)
print(f"Exp(2): moyenne = {X_exp.mean():.3f} (attendu 0.5)")

X_gauss = simul_gaussienne_box_muller()
print(f"N(0,1): moyenne = {X_gauss.mean():.3f}, var = {X_gauss.var():.3f}")`}</Code>

        <Remark>
          <p>
            En pratique, <code>numpy</code> utilise l&apos;algorithme de
            Ziggurat (plus rapide que Box-Muller) pour generer des gaussiennes.
            La methode d&apos;inversion est surtout utile quand on dispose
            d&apos;une formule fermee pour <Sup sup={"-1"}><F>F</F></Sup>,
            comme pour la loi exponentielle ou la loi de Cauchy.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 6. ESTIMATION DE F ET DES QUANTILES                          */}
      {/* ============================================================ */}
      <Section id="estimation-quantiles" number="06" title="Estimation de la fonction de repartition et des quantiles">
        <p>
          En statistique, on cherche souvent a estimer la cdf <F>F</F> et
          les quantiles <F>Q(α)</F> a partir d&apos;un echantillon. Ce
          probleme est directement lie a l&apos;estimation d&apos;evenements
          rares.
        </p>

        <Def title="Fonction de repartition empirique">
          <p>
            Soit <Sub sub="1"><F>X</F></Sub>, ...,{" "}
            <Sub sub="n"><F>X</F></Sub> un echantillon i.i.d. La{" "}
            <strong>cdf empirique</strong> est :
          </p>
          <Eq>
            <Sub sub="n"><F>F</F></Sub><F>(x) = </F>
            <Frac n="1" d={<F>n</F>} />{" "}
            <Sup sup="n"><F>∑</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
            <F>𝟙</F>{"{"}
            <Sub sub="i"><F>X</F></Sub> ≤ <F>x</F>
            {"}"}
          </Eq>
        </Def>

        <Def title="Statistiques d'ordre">
          <p>
            Les <strong>statistiques d&apos;ordre</strong> sont les valeurs
            de l&apos;echantillon triees :
          </p>
          <Eq>
            <Sub sub="(1,n)"><F>X</F></Sub> ≤{" "}
            <Sub sub="(2,n)"><F>X</F></Sub> ≤ ... ≤{" "}
            <Sub sub="(n,n)"><F>X</F></Sub>
          </Eq>
          <p>
            On a <Sub sub="n"><F>F</F></Sub><F>(x) = </F>
            <Frac n={<F>k</F>} d={<F>n</F>} /> quand{" "}
            <Sub sub="(k,n)"><F>X</F></Sub> ≤ <F>x</F> &lt;{" "}
            <Sub sub="(k+1,n)"><F>X</F></Sub>.
          </p>
        </Def>

        <Theorem name="Glivenko-Cantelli">
          <p>
            La convergence uniforme de la cdf empirique :
          </p>
          <Eq>
            <F>sup</F><Sub sub="x ∈ ℝ"><F>{" "}</F></Sub>{" "}
            |<Sub sub="n"><F>F</F></Sub><F>(x) − F(x)</F>| → 0
            &nbsp; p.s.
          </Eq>
          <p>
            C&apos;est le theoreme fondamental de la statistique :
            la cdf empirique converge uniformement vers la vraie cdf.
          </p>
        </Theorem>

        <Theorem name="TCL pour la cdf empirique">
          <p>
            Pour tout <F>x</F> fixe tel que <F>0 &lt; F(x) &lt; 1</F> :
          </p>
          <Eq>
            <F>√n (</F><Sub sub="n"><F>F</F></Sub><F>(x) − F(x)) → N(0, F(x)(1 − F(x)))</F>
          </Eq>
          <p>
            La variance est maximale en <F>F(x) = 1/2</F> (la mediane)
            et minimale pres des extremes — la ou justement on s&apos;interesse
            aux evenements rares.
          </p>
        </Theorem>

        <Def title="Quantile empirique">
          <p>
            Le <strong>quantile empirique</strong> de niveau <F>α</F> est :
          </p>
          <Eq>
            <Sub sub="n"><F>Q</F></Sub><F>(α) = </F>
            <Sub sub="(⌈nα⌉, n)"><F>X</F></Sub>
          </Eq>
          <p>
            C&apos;est la <F>⌈nα⌉</F>-ieme statistique d&apos;ordre.
          </p>
        </Def>

        <Theorem name="TCL pour le quantile empirique">
          <p>
            Si <F>f = F&apos;</F> existe et est strictement positive
            en <F>Q(α)</F> :
          </p>
          <Eq>
            <F>√n (</F><Sub sub="(⌈nα⌉, n)"><F>X</F></Sub><F> − Q(α)) → N</F>
            <F>(0, </F>
            <Frac
              n={<F>α(1 − α)</F>}
              d={<>f<Sup sup="2"><F>{" "}</F></Sup>(Q(α))</>}
            />
            <F>)</F>
          </Eq>
        </Theorem>

        <Warning>
          <p>
            La variance du quantile empirique est inversement proportionnelle
            a <F>f²(Q(α))</F>. Quand <F>f(Q(α)) → 0</F> (queues legeres,
            comme la gaussienne), la variance explose. C&apos;est un probleme
            fondamental pour l&apos;estimation des quantiles extremes : plus
            le quantile est dans la queue de la distribution, moins
            l&apos;estimateur empirique est precis.
          </p>
        </Warning>

        <Remark>
          <p>
            Pour la loi normale, <F>f(Q(0.999)) ≈ 0.003</F>, ce qui
            donne une variance du quantile empirique environ 100 000 fois
            plus grande que pour la mediane. C&apos;est une des raisons pour
            lesquelles la VaR extreme est si difficile a estimer.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 7. METHODE DE SPLITTING                                      */}
      {/* ============================================================ */}
      <Section id="splitting" number="07" title="Methode de splitting">
        <p>
          La premiere methode d&apos;acceleration que nous etudions est le{" "}
          <Term def="Methode de decomposition multiplicative d'une probabilite rare en un produit de probabilites conditionnelles non-rares, chacune estimee independamment.">
            splitting
          </Term>{" "}
          (ou methode de fragmentation). L&apos;idee est simple et elegante :
          decomposer un evenement rare en une cascade d&apos;evenements
          conditionnels, chacun ayant une probabilite raisonnable.
        </p>

        <Def title="Decomposition en niveaux emboites">
          <p>
            On considere <F>p = ℙ(g(X) ∈ A)</F> avec <F>g : </F>ℝ<Sup sup="d"><F>{" "}</F></Sup> → ℝ.
            On construit une suite d&apos;ensembles emboites :
          </p>
          <Eq>
            <Sub sub="0"><F>A</F></Sub> = ℝ<Sup sup="d"><F>{" "}</F></Sup> ⊃{" "}
            <Sub sub="1"><F>A</F></Sub> ⊃ ... ⊃{" "}
            <Sub sub="I"><F>A</F></Sub> = <F>A</F>
          </Eq>
          <p>
            Typiquement, si <F>A = </F>{"{"}g(x) &gt; γ{"}"}, on choisit des
            seuils intermediaires <F>γ</F><Sub sub="0"><F>{" "}</F></Sub> &lt;{" "}
            <F>γ</F><Sub sub="1"><F>{" "}</F></Sub> &lt; ... &lt;{" "}
            <F>γ</F><Sub sub="I"><F>{" "}</F></Sub> = <F>γ</F>, et{" "}
            <Sub sub="i"><F>A</F></Sub> = {"{"}g(x) &gt; <F>γ</F><Sub sub="i"><F>{" "}</F></Sub>{"}"}.
          </p>
        </Def>

        <Theorem name="Decomposition multiplicative">
          <p>
            Par la formule des probabilites conditionnelles :
          </p>
          <Eq>
            <F>p = ℙ(A) = </F>
            <Sup sup="I"><F>∏</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
            ℙ(<F>g(X) ∈ </F><Sub sub="i"><F>A</F></Sub><F> | g(X) ∈ </F><Sub sub="i−1"><F>A</F></Sub><F>)</F>
          </Eq>
          <p>
            Chaque facteur <Sub sub="i"><F>p</F></Sub> = ℙ(<Sub sub="i"><F>A</F></Sub> |{" "}
            <Sub sub="i−1"><F>A</F></Sub>) peut etre choisi de l&apos;ordre
            de 0.1 a 0.5 en ajustant les seuils <F>γ</F><Sub sub="i"><F>{" "}</F></Sub>.
          </p>
        </Theorem>

        <Proof>
          <p>
            C&apos;est la regle des probabilites conditionnelles en chaine :{" "}
            <F>ℙ(A ∩ B) = ℙ(A|B)ℙ(B)</F>, appliquee recursivement aux
            ensembles emboites.
          </p>
        </Proof>

        <Steps>
          <Step number="1" title="Choix des niveaux">
            <p>
              Definir les seuils <F>γ</F><Sub sub="1"><F>{" "}</F></Sub>, ...,{" "}
              <F>γ</F><Sub sub="I"><F>{" "}</F></Sub> de sorte que chaque probabilite
              conditionnelle soit de l&apos;ordre de 0.1 a 0.5.
            </p>
          </Step>
          <Step number="2" title="Estimation du premier niveau">
            <p>
              Simuler <F>n</F> copies i.i.d. de <F>X</F> et estimer{" "}
              <Sub sub="1"><F>p̂</F></Sub> = proportion tombant dans <Sub sub="1"><F>A</F></Sub>.
            </p>
          </Step>
          <Step number="3" title="Simulation conditionnelle">
            <p>
              Pour les niveaux suivants, simuler sous la loi de <F>X</F>{" "}
              conditionnellement a <F>g(X) ∈ </F><Sub sub="i−1"><F>A</F></Sub>.
              Methodes possibles : tirages exacts (rarement), rejet, ou MCMC.
            </p>
          </Step>
          <Step number="4" title="Estimation finale">
            <p>
              L&apos;estimateur final est le produit :{" "}
              <Sub sub="n"><F>p̂</F></Sub> ={" "}
              <Sup sup="I"><F>∏</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
              <Sub sub={<>i,n</>}><F>p̂</F></Sub>.
            </p>
          </Step>
        </Steps>

        <SvgDiagram width={700} height={280} title="Splitting — niveaux emboites">
          {/* Niveau A_0 = R^d (tout l'espace) */}
          <GroupBox x={30} y={15} w={640} h={250} label="A_0 = R^d" color="default" />

          {/* Niveau A_1 */}
          <GroupBox x={100} y={45} w={500} h={190} label="A_1 (gamma_1)" color="cyan" />

          {/* Niveau A_2 */}
          <GroupBox x={180} y={75} w={340} h={130} label="A_2 (gamma_2)" color="violet" />

          {/* Niveau A_I = A (evenement rare) */}
          <GroupBox x={270} y={105} w={160} h={70} label="A_I = A" color="rose" />

          {/* Points simulees au premier niveau */}
          <Circle cx={60} cy={200} r={3} label="" color="default" />
          <Circle cx={120} cy={180} r={3} label="" color="default" />
          <Circle cx={150} cy={100} r={3} label="" color="cyan" />
          <Circle cx={200} cy={130} r={3} label="" color="cyan" />
          <Circle cx={250} cy={120} r={3} label="" color="violet" />
          <Circle cx={310} cy={135} r={3} label="" color="violet" />
          <Circle cx={350} cy={130} r={3} label="" color="rose" />

          {/* Fleches montrant la progression */}
          <Arrow x1={90} y1={250} x2={160} y2={230} label="p_1 ~ 0.3" dashed />
          <Arrow x1={230} y1={230} x2={290} y2={200} label="p_2 ~ 0.3" dashed />
          <Arrow x1={360} y1={200} x2={380} y2={170} label="p_I ~ 0.3" dashed />

          {/* Probabilite finale */}
          <Label x={350} y={270} text="p = p_1 * p_2 * ... * p_I" size={10} color="#e4e4e7" weight="bold" />
        </SvgDiagram>

        <Quiz
          question="Pourquoi le splitting reduit-il la variance par rapport au Monte Carlo naif ?"
          options={[
            "Il utilise moins de tirages aleatoires au total",
            "Il decompose un produit de probabilites petites en probabilites moderees, chacune estimable avec peu de tirages",
            "Il elimine le biais de l'estimateur",
            "Il remplace les tirages aleatoires par du calcul deterministe",
          ]}
          answer={1}
          explanation="Le splitting transforme l'estimation d'une probabilite p = 10^{-6} en I estimations de probabilites conditionnelles ~0.1-0.5 chacune. Chaque estimation conditionnelle ne necessite que quelques centaines de tirages, au lieu des ~10^8 tirages du MC naif."
        />

        <Remark>
          <p>
            Le choix des niveaux <F>γ</F><Sub sub="i"><F>{" "}</F></Sub> est un
            point delicat en pratique. Des methodes adaptatives (comme le
            splitting adaptatif ou l&apos;algorithme AMS —
            Adaptive Multilevel Splitting) determinent les seuils
            automatiquement en cours de simulation.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 8. MONTE CARLO PAR CHAINES DE MARKOV                        */}
      {/* ============================================================ */}
      <Section id="mcmc" number="08" title="Monte Carlo par chaines de Markov">
        <p>
          Pour la methode de splitting, on a besoin de simuler sous des lois
          conditionnelles. En general, le tirage exact est impossible. Le{" "}
          <Term def="Methode de simulation qui construit une chaine de Markov dont la loi stationnaire est la loi cible. Convergence garantie par l'ergodicite.">
            MCMC
          </Term>{" "}
          (Monte Carlo par Chaines de Markov) resout ce probleme : au lieu
          de tirer directement sous la loi cible, on construit une chaine
          de Markov qui converge vers cette loi.
        </p>

        <Def title="Noyau de transition">
          <p>
            Un <strong>noyau de transition</strong> sur ℝ<Sup sup="d"><F>{" "}</F></Sup>{" "}
            est une application <F>P(x, dy)</F> telle que pour tout <F>x</F>,{" "}
            <F>P(x, ·)</F> est une probabilite, et pour tout borelien <F>B</F>,{" "}
            <F>x ↦ P(x, B)</F> est mesurable.
          </p>
        </Def>

        <Def title="Loi invariante">
          <p>
            Une probabilite <F>ν</F> est <strong>invariante</strong> pour{" "}
            <F>P</F> si :
          </p>
          <Eq>
            <Int from="" to="" />{" "}
            <F>ν(dx) P(x, B) = ν(B)</F> &nbsp; pour tout borelien <F>B</F>
          </Eq>
          <p>
            Intuitivement : si <Sub sub="n"><F>X</F></Sub> ∼ ν, alors{" "}
            <Sub sub="n+1"><F>X</F></Sub> ∼ ν aussi. La chaine reste
            dans sa loi stationnaire.
          </p>
        </Def>

        <Theorem name="Theoreme ergodique">
          <p>
            Si la chaine de Markov <F>(</F><Sub sub="n"><F>X</F></Sub><F>)</F>{" "}
            de noyau <F>P</F> est <strong>ergodique</strong> (irreductible,
            aperiodique, recurrente positive) de loi invariante <F>ν</F>,
            alors pour toute fonction <F>g</F> avec{" "}
            <Int from="" to="" /> |<F>g</F>| <F>dν</F> &lt; ∞ :
          </p>
          <Eq>
            <Frac n="1" d={<F>n</F>} />{" "}
            <Sup sup="n"><F>∑</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
            <F>g(</F><Sub sub="i"><F>X</F></Sub><F>) →</F>{" "}
            <Int from="" to="" /> <F>g dν</F> &nbsp; p.s.
          </Eq>
          <p>
            C&apos;est la LGN pour les chaines de Markov : on peut calculer
            des integrales par rapport a <F>ν</F> en simulant la chaine,
            meme si les <Sub sub="i"><F>X</F></Sub> ne sont pas independants.
          </p>
        </Theorem>

        <Def title="Reversibilite (balance detaillee)">
          <p>
            La chaine est <strong>reversible</strong> par rapport a <F>ν</F> si :
          </p>
          <Eq>
            <F>ν(dx) P(x, dy) = ν(dy) P(y, dx)</F>
          </Eq>
          <p>
            La reversibilite implique l&apos;invariance de <F>ν</F>.
            C&apos;est la propriete centrale utilisee pour construire
            des algorithmes MCMC.
          </p>
        </Def>

        <Proof title="Reversibilite implique invariance">
          <p>
            En integrant la balance detaillee par rapport a <F>dy</F> :{" "}
            <Int from="" to="" /> <F>ν(dx) P(x, dy) = </F>{" "}
            <Int from="" to="" /> <F>ν(dy) P(y, dx) = ν(dx)</F>,
            ce qui donne <F>νP = ν</F>.
          </p>
        </Proof>

        <Proposition title="Exemple : AR(1) gaussien">
          <p>
            Soit <F>ρ ∈ (−1, 1)</F> et <Sub sub="i"><F>Y</F></Sub> i.i.d.{" "}
            <F>N(0, 1)</F>. Le processus :
          </p>
          <Eq>
            <Sub sub="i"><F>X</F></Sub> = <F>ρ </F>
            <Sub sub="i−1"><F>X</F></Sub> + <F>√(1 − ρ²) </F>
            <Sub sub="i"><F>Y</F></Sub>
          </Eq>
          <p>
            est une chaine de Markov <strong>reversible</strong> de loi
            invariante <F>N(0, 1)</F>. Plus <F>|ρ|</F> est proche de 1,
            plus les correlations sont fortes et plus la convergence
            ergodique est lente.
          </p>
        </Proposition>

        <p>
          L&apos;algorithme de <strong>Metropolis-Hastings</strong> est la
          methode MCMC la plus generale : a partir d&apos;une loi de
          proposition <F>q(x, y)</F>, on accepte le candidat <F>y</F> avec
          probabilite min(1, <Frac n={<F>ν(y) q(y, x)</F>} d={<F>ν(x) q(x, y)</F>} />)
          pour garantir la reversibilite.
        </p>

        <SvgDiagram width={700} height={240} title="Boucle MCMC — Metropolis-Hastings">
          <Box x={30} y={90} w={120} h={50} label="X_n" sublabel="etat actuel" color="accent" />
          <Arrow x1={150} y1={115} x2={220} y2={115} label="proposition" />
          <Box x={220} y={90} w={120} h={50} label="Y ~ q(X_n, .)" sublabel="candidat" color="violet" />
          <Arrow x1={340} y1={115} x2={410} y2={115} label="alpha(X_n, Y)" />
          <Box x={410} y={50} w={130} h={40} label="Accepter" sublabel="X_{n+1} = Y" color="accent" />
          <Box x={410} y={130} w={130} h={40} label="Rejeter" sublabel="X_{n+1} = X_n" color="rose" />

          {/* Fleches de retour */}
          <Arrow x1={540} y1={70} x2={610} y2={70} />
          <Arrow x1={540} y1={150} x2={610} y2={150} />
          <Box x={610} y={90} w={70} h={50} label="X_{n+1}" color="cyan" />

          {/* Labels */}
          <Label x={460} y={100} text="oui" size={9} color="#10b981" />
          <Label x={460} y={125} text="non" size={9} color="#f43f5e" />
        </SvgDiagram>

        <Remark>
          <p>
            La difficulte du MCMC est le choix de la loi de proposition et
            le diagnostic de convergence. Trop de rejets (loi de proposition
            trop large) ralentissent la convergence ; trop d&apos;acceptations
            (loi trop etroite) creent des correlations fortes. En pratique,
            on vise un taux d&apos;acceptation de 20 a 40% en dimension
            moderee.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 9. PROCESSUS DE POISSON                                      */}
      {/* ============================================================ */}
      <Section id="poisson" number="09" title="Processus de Poisson">
        <p>
          Le{" "}
          <Term def="Processus de comptage a accroissements independants et stationnaires, fondamental en theorie des files d'attente, assurance et fiabilite.">
            processus de Poisson
          </Term>{" "}
          est le modele de base pour les arrivees aleatoires. Il est
          omnipresent dans les applications ou l&apos;on compte des
          evenements (sinistres, pannes, arrivees de clients).
        </p>

        <Def title="Construction informelle">
          <p>
            Soit <F>(</F><Sub sub="i"><F>τ</F></Sub><F>)</F><Sub sub="i≥1"><F>{" "}</F></Sub>{" "}
            une suite de v.a. i.i.d. <F>Exp(λ)</F> (temps inter-arrivees).
            On definit :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Les temps d&apos;arrivee :{" "}
              <Sub sub="n"><F>T</F></Sub> ={" "}
              <Sup sup="n"><F>∑</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
              <Sub sub="i"><F>τ</F></Sub>
            </li>
            <li>
              Le processus de comptage :{" "}
              <Sub sub="t"><F>N</F></Sub> ={" "}
              <Sup sup="∞"><F>∑</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
              <F>𝟙</F>{"{"}
              <Sub sub="i"><F>T</F></Sub> ≤ <F>t</F>
              {"}"}
            </li>
          </ul>
        </Def>

        <Def title="Definition formelle">
          <p>
            Un processus de comptage <F>(</F><Sub sub="t"><F>N</F></Sub><F>)</F><Sub sub="t≥0"><F>{" "}</F></Sub>{" "}
            est un <strong>processus de Poisson</strong> d&apos;intensite{" "}
            <F>λ &gt; 0</F> si :
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li><Sub sub="0"><F>N</F></Sub> = 0</li>
            <li>Les accroissements sont independants</li>
            <li>
              Pour tout <F>s &lt; t</F> :{" "}
              <Sub sub="t"><F>N</F></Sub> − <Sub sub="s"><F>N</F></Sub>{" "}
              ∼ Poisson(<F>λ(t − s)</F>)
            </li>
          </ol>
        </Def>

        <Proposition title="Proprietes fondamentales">
          <p>Le processus de Poisson possede des proprietes remarquables :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Projection</strong> : si les points sont dans ℝ<Sup sup="d"><F>{" "}</F></Sup>,
              leur projection sur un sous-espace est encore un PP
            </li>
            <li>
              <strong>Superposition</strong> : la somme de deux PP independants
              de parametres <Sub sub="1"><F>λ</F></Sub>,{" "}
              <Sub sub="2"><F>λ</F></Sub> est un PP de parametre{" "}
              <Sub sub="1"><F>λ</F></Sub> + <Sub sub="2"><F>λ</F></Sub>
            </li>
            <li>
              <strong>Couplage trajectorial</strong> : un PP de parametre{" "}
              <F>λ</F> peut etre construit par amincissement d&apos;un PP
              de parametre <F>λ̄ ≥ λ</F>
            </li>
            <li>
              <strong>Loi des points</strong> : conditionnellement a{" "}
              <Sub sub="T"><F>N</F></Sub> = <F>n</F>, les <F>n</F> points
              sont i.i.d. uniformes sur <F>[0, T]</F>
            </li>
          </ul>
        </Proposition>

        <p>
          <strong>Trois methodes de simulation :</strong>
        </p>

        <Steps>
          <Step number="1" title="Methode progressive">
            <p>
              Simuler les inter-arrivees{" "}
              <Sub sub="i"><F>τ</F></Sub> ∼ Exp(<F>λ</F>) et cumuler
              tant que <Sub sub="n"><F>T</F></Sub> ≤ <F>T</F>.
              Complexite proportionnelle a 𝔼[<Sub sub="T"><F>N</F></Sub>] = <F>λT</F>.
            </p>
          </Step>
          <Step number="2" title="Methode a rebours">
            <p>
              Simuler <F>N ∼ Poisson(λT)</F>, puis generer <F>N</F> points
              uniformes sur <F>[0, T]</F> et les trier. Utile quand on a
              besoin de tous les points d&apos;un coup.
            </p>
          </Step>
          <Step number="3" title="Discretisation approchee">
            <p>
              Decouper <F>[0, T]</F> en <F>m</F> intervalles de longueur{" "}
              <F>Δt = T/m</F>. Dans chaque intervalle, tirer un Bernoulli
              de parametre <F>λΔt</F>. Approximation valable si{" "}
              <F>λΔt ≪ 1</F>.
            </p>
          </Step>
        </Steps>

        <Def title="Processus de Poisson inhomogene">
          <p>
            Quand l&apos;intensite varie dans le temps, <F>λ(t)</F>, le PP
            a des accroissements independants mais non stationnaires :{" "}
            <Sub sub="t"><F>N</F></Sub> − <Sub sub="s"><F>N</F></Sub> ∼{" "}
            Poisson(<Int from="s" to="t" /> <F>λ(u) du</F>).
          </p>
        </Def>

        <Proposition title="Simulation par thinning (choc fictif)">
          <p>
            Pour simuler un PP d&apos;intensite <F>λ(t) ≤ λ̄</F> :
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Simuler un PP homogene de parametre <F>λ̄</F> (le PP majore)</li>
            <li>
              Chaque point <Sub sub="i"><F>T</F></Sub> est conserve
              avec probabilite <F>λ(</F><Sub sub="i"><F>T</F></Sub><F>)/λ̄</F>,
              et rejete sinon
            </li>
          </ol>
          <p>
            Le resultat est un PP d&apos;intensite <F>λ(t)</F>. C&apos;est
            un cas particulier de la methode d&apos;acceptation-rejet.
          </p>
        </Proposition>

        <SvgDiagram width={700} height={300} title="Thinning — simulation d'un PP inhomogene">
          {/* Rectangle [0,T] x [0, lambda_bar] */}
          <rect x={60} y={30} width={600} height={220} fill="#18181b" stroke="#27272a" strokeWidth={1} rx={4} />

          {/* Axes */}
          <Arrow x1={60} y1={250} x2={60} y2={20} color="#a1a1aa" />
          <Arrow x1={60} y1={250} x2={680} y2={250} color="#a1a1aa" />
          <Label x={40} y={20} text="lambda" size={10} color="#e4e4e7" anchor="end" />
          <Label x={680} y={265} text="t" size={10} color="#e4e4e7" anchor="end" />
          <Label x={35} y={30} text="lambda_bar" size={8} color="#f59e0b" anchor="end" />
          <Label x={660} y={265} text="T" size={9} color="#a1a1aa" />

          {/* Lambda bar (ligne horizontale) */}
          <line x1={60} y1={30} x2={660} y2={30} stroke="#f59e0b" strokeWidth={1} strokeDasharray="4,4" />

          {/* Lambda(t) — courbe variable */}
          <path d="M60,200 C150,180 200,80 300,100 S400,180 500,60 C550,40 600,80 660,120"
            fill="none" stroke="#10b981" strokeWidth={2} />
          <Label x={620} y={110} text="lambda(t)" size={9} color="#10b981" />

          {/* Zone sous lambda(t) — hachuree */}
          <path d="M60,200 C150,180 200,80 300,100 S400,180 500,60 C550,40 600,80 660,120 L660,250 L60,250 Z"
            fill="#10b98110" />

          {/* Points du PP homogene — acceptes (sous la courbe) */}
          <Circle cx={120} cy={190} r={5} label="" color="accent" />
          <Circle cx={230} cy={100} r={5} label="" color="accent" />
          <Circle cx={350} cy={150} r={5} label="" color="accent" />
          <Circle cx={510} cy={55} r={5} label="" color="accent" />
          <Circle cx={580} cy={110} r={5} label="" color="accent" />

          {/* Points rejetes (au-dessus de la courbe) */}
          <Circle cx={160} cy={60} r={5} label="" color="rose" />
          <Circle cx={300} cy={50} r={5} label="" color="rose" />
          <Circle cx={420} cy={70} r={5} label="" color="rose" />
          <Circle cx={550} cy={40} r={5} label="" color="rose" />
          <Circle cx={630} cy={50} r={5} label="" color="rose" />

          {/* Legende */}
          <Circle cx={80} cy={275} r={5} label="" color="accent" />
          <Label x={95} y={275} text="= accepte" size={9} color="#10b981" anchor="start" />
          <Circle cx={200} cy={275} r={5} label="" color="rose" />
          <Label x={215} y={275} text="= rejete" size={9} color="#f43f5e" anchor="start" />
        </SvgDiagram>

        <Code language="python">{`import numpy as np

def poisson_homogene(lam, T):
    """Simule un PP homogene d'intensite lam sur [0, T]."""
    temps = []
    t = 0
    while True:
        t += np.random.exponential(1 / lam)
        if t > T:
            break
        temps.append(t)
    return np.array(temps)

def poisson_thinning(lam_func, lam_bar, T):
    """Simule un PP inhomogene par thinning.
    lam_func: t -> lambda(t), majoree par lam_bar.
    """
    # Etape 1 : PP homogene d'intensite lam_bar
    candidats = poisson_homogene(lam_bar, T)
    # Etape 2 : acceptation/rejet
    probas = np.array([lam_func(t) / lam_bar for t in candidats])
    U = np.random.uniform(0, 1, len(candidats))
    return candidats[U < probas]

# Exemple : lambda(t) = 5 + 3*sin(2*pi*t)
lam = lambda t: 5 + 3 * np.sin(2 * np.pi * t)
points = poisson_thinning(lam, lam_bar=8.0, T=2.0)
print(f"{len(points)} points generes sur [0, 2]")`}</Code>
      </Section>

      {/* ============================================================ */}
      {/* 10. CHANGEMENT DE PROBABILITE & IMPORTANCE SAMPLING          */}
      {/* ============================================================ */}
      <Section id="importance-sampling" number="10" title="Changement de probabilite et echantillonnage d'importance">
        <p>
          L&apos;<strong>echantillonnage d&apos;importance</strong> est la
          deuxieme grande methode d&apos;acceleration. L&apos;idee : au lieu
          de simuler sous la loi originale <F>ν</F> (sous laquelle
          l&apos;evenement rare est... rare), on simule sous une loi
          alternative <Sub sub="f"><F>ν</F></Sub> qui favorise
          l&apos;evenement, puis on corrige par un rapport de vraisemblance.
        </p>

        <Def title="Processus de Poisson compose">
          <p>
            Un processus de Poisson compose de parametres <F>(λ, ν)</F> est :
          </p>
          <Eq>
            <Sub sub="t"><F>X</F></Sub> ={" "}
            <Sup sup={<Sub sub="t"><F>N</F></Sub>}><F>∑</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
            <Sub sub="i"><F>Y</F></Sub>
          </Eq>
          <p>
            ou <Sub sub="t"><F>N</F></Sub> ∼ PP(<F>λ</F>) et les{" "}
            <Sub sub="i"><F>Y</F></Sub> sont i.i.d. de loi <F>ν</F>,
            independantes de <Sub sub="t"><F>N</F></Sub>.
          </p>
        </Def>

        <Proposition title="Fonction caracteristique">
          <p>
            La fonction caracteristique du PP compose est :
          </p>
          <Eq>
            𝔼[<F>exp(iu</F><Sub sub="t"><F>X</F></Sub><F>)</F>] ={" "}
            <F>exp(λt (𝔼[exp(iuY)] − 1))</F>
          </Eq>
          <p>
            Ce resultat elegant permet de deduire la loi de{" "}
            <Sub sub="t"><F>X</F></Sub> a partir de celle de <F>Y</F>.
          </p>
        </Proposition>

        <Def title="Transformation de Esscher">
          <p>
            Soit <F>f : ℝ → ℝ</F> mesurable telle que{" "}
            <Int from="" to="" /> <F>exp(f(y)) ν(dy) &lt; ∞</F>.
            La <strong>transformation de Esscher</strong> definit une nouvelle
            loi :
          </p>
          <Eq>
            <Sub sub="f"><F>ν</F></Sub><F>(dy) = </F>
            <Frac
              n={<F>exp(f(y)) ν(dy)</F>}
              d={<><Int from="" to="" /> <F>exp(f(y)) ν(dy)</F></>}
            />
          </Eq>
          <p>
            On note <Sub sub="f"><F>λ</F></Sub> = <F>λ</F>{" "}
            <Int from="" to="" /> <F>exp(f(y)) ν(dy)</F> l&apos;intensite
            transformee.
          </p>
        </Def>

        <Theorem name="Changement de mesure pour PP compose">
          <p>
            Si l&apos;on simule le PP compose sous la loi transformee
            (intensite <Sub sub="f"><F>λ</F></Sub>, loi des sauts{" "}
            <Sub sub="f"><F>ν</F></Sub>), on a :
          </p>
          <Eq>
            𝔼[<F>g(</F><Sub sub="T"><F>X</F></Sub><F>)</F>] ={" "}
            <Sub sub="f"><F>𝔼</F></Sub>[<F>g(</F><Sub sub="T"><F>X</F></Sub><F>)</F>{" "}
            <F>exp((</F><Sub sub="f"><F>λ</F></Sub> − <F>λ)T − </F>
            <Sup sup={<Sub sub="T"><F>N</F></Sub>}><F>∑</F></Sup><Sub sub="i=1"><F>{" "}</F></Sub>{" "}
            <F>f(</F><Sub sub="i"><F>Y</F></Sub><F>))</F>]
          </Eq>
          <p>
            Le facteur exponentiel est le <strong>rapport de vraisemblance</strong>{" "}
            (likelihood ratio) qui corrige le biais introduit par le
            changement de loi.
          </p>
        </Theorem>

        <KeyConcept title="L'idee centrale de l'importance sampling">
          <p>
            On simule sous une loi <Sub sub="f"><F>ν</F></Sub> qui{" "}
            <strong>favorise l&apos;evenement rare</strong> (par exemple,
            en augmentant la taille typique des sauts). L&apos;evenement
            n&apos;est plus rare sous cette nouvelle loi, et l&apos;estimation
            Monte Carlo converge rapidement. Le rapport de vraisemblance
            garantit que l&apos;estimateur reste sans biais.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["", "Monte Carlo naif", "Importance sampling"]}
          rows={[
            ["Loi de simulation", "Loi originale nu", "Loi changee nu_f"],
            ["Estimateur", "(1/n) sum g(X_i)", "(1/n) sum g(X_i) * L(X_i)"],
            ["Biais", "Non biaise", "Non biaise (corrige par L)"],
            ["Variance pour evt rare", "Tres grande (~p/n)", "Potentiellement tres faible"],
            ["Difficulte", "Cout prohibitif", "Choix de nu_f critique"],
          ]}
        />

        <Warning>
          <p>
            Le choix de la loi d&apos;importance <Sub sub="f"><F>ν</F></Sub>{" "}
            est crucial. Un mauvais choix peut <strong>augmenter</strong> la
            variance au lieu de la reduire (en creant des poids de
            vraisemblance tres variables). La loi d&apos;importance{" "}
            <strong>optimale</strong> est proportionnelle a{" "}
            <F>|g(x)| ν(x)</F>, mais elle necessite de connaitre la
            quantite qu&apos;on cherche a estimer — un cercle vicieux en
            pratique.
          </p>
        </Warning>

        <Code language="python">{`import numpy as np

def mc_naif_proba_rare(seuil, n_tirages, lam=1.0):
    """Estime P(X > seuil) pour X ~ Exp(lambda) par MC naif."""
    X = np.random.exponential(1/lam, n_tirages)
    return np.mean(X > seuil)

def importance_sampling_exp(seuil, n_tirages, lam=1.0, lam_f=0.2):
    """Importance sampling : simuler sous Exp(lam_f) au lieu de Exp(lam).

    lam_f < lam => favorise les grandes valeurs.
    """
    # Simuler sous la loi d'importance Exp(lam_f)
    X = np.random.exponential(1/lam_f, n_tirages)
    # Rapport de vraisemblance
    L = (lam / lam_f) * np.exp(-(lam - lam_f) * X)
    # Estimateur IS
    return np.mean((X > seuil) * L)

# Comparaison pour P(X > 10) avec X ~ Exp(1)
# Valeur exacte : exp(-10) ~ 4.5e-5
seuil = 10
n = 100_000
p_naif = mc_naif_proba_rare(seuil, n)
p_is = importance_sampling_exp(seuil, n, lam_f=0.3)
print(f"Valeur exacte : {np.exp(-seuil):.2e}")
print(f"MC naif (n={n}): {p_naif:.2e}")
print(f"IS (n={n}):      {p_is:.2e}")`}</Code>

        <Remark>
          <p>
            Dans l&apos;exemple ci-dessus, pour estimer{" "}
            <F>ℙ(X &gt; 10) ≈ 4.5 × </F><Sup sup={"-5"}><F>10</F></Sup>{" "}
            avec <F>X ∼ Exp(1)</F>, le Monte Carlo naif avec{" "}
            <Sup sup="5"><F>10</F></Sup> tirages donne typiquement 0 a 10
            occurrences (tres bruite). L&apos;importance sampling avec{" "}
            <Sub sub="f"><F>λ</F></Sub> = 0.3 donne un resultat stable
            des <Sup sup="4"><F>10</F></Sup> tirages.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 11. QUIZ FINAL                                               */}
      {/* ============================================================ */}
      <Section id="quiz" number="11" title="Quiz final">
        <Quiz
          question="Un evenement est qualifie de 'rare' dans ce cours lorsque sa probabilite est :"
          options={[
            "Inferieure a 1%",
            "Inferieure a 0.01% (10^{-4})",
            "Egale a zero",
            "Inconnue",
          ]}
          answer={1}
          explanation="Par convention dans ce cours, un evenement rare a une probabilite p <= 10^{-4}. Ce seuil marque le moment ou le Monte Carlo naif devient impraticable : il faudrait au minimum ~10^6 tirages pour 10% de precision relative."
        />

        <Quiz
          question="Pour diviser par 2 la precision relative d'un estimateur Monte Carlo, il faut multiplier le nombre de tirages par :"
          options={[
            "2",
            "4",
            "8",
            "Cela depend de la loi de X",
          ]}
          answer={1}
          explanation="La precision relative est proportionnelle a 1/sqrt(n). Pour la diviser par 2, il faut donc multiplier n par 4. C'est la 'malediction du sqrt(n)' : gagner un chiffre significatif coute 100 fois plus de tirages."
        />

        <Quiz
          question="La methode d'inversion pour simuler une variable aleatoire repose sur :"
          options={[
            "Le theoreme central limite",
            "La transformation de Fourier",
            "Le fait que F(X) ~ U[0,1] quand F est continue",
            "Le lemme de Slutsky",
          ]}
          answer={2}
          explanation="Si F est la cdf continue de X, alors F(X) ~ U[0,1]. Reciproquement, si U ~ U[0,1], alors F^{-1}(U) a la meme loi que X. C'est le fondement de la simulation par inversion."
        />

        <Quiz
          question="Dans la methode de splitting, on decompose P(A) en :"
          options={[
            "Une somme de probabilites conditionnelles",
            "Un produit de probabilites conditionnelles moderees",
            "Une integrale sur un espace de grande dimension",
            "Un rapport de fonctions de partition",
          ]}
          answer={1}
          explanation="Le splitting utilise P(A) = prod P(A_i | A_{i-1}) avec des ensembles emboites. Chaque probabilite conditionnelle est de l'ordre de 0.1-0.5, donc facilement estimable par MC. Le produit de I facteurs ~0.3 donne ~0.3^I, potentiellement tres petit."
        />

        <Quiz
          question="La propriete de reversibilite d'une chaine de Markov implique :"
          options={[
            "La chaine converge en un nombre fini d'etapes",
            "La loi invariante nu est necessairement gaussienne",
            "La loi invariante existe (nu est invariante pour P)",
            "Les etats de la chaine sont tous atteints en temps fini",
          ]}
          answer={2}
          explanation="La balance detaillee nu(dx)P(x,dy) = nu(dy)P(y,dx) implique, en integrant sur dy, que nuP = nu : la mesure nu est invariante. C'est la propriete clef exploitee par l'algorithme de Metropolis-Hastings pour construire des chaines avec une loi cible donnee."
        />

        <Quiz
          question="Dans l'echantillonnage d'importance, le rapport de vraisemblance sert a :"
          options={[
            "Augmenter la probabilite de l'evenement rare",
            "Corriger le biais introduit par le changement de loi",
            "Reduire la dimension du probleme",
            "Eliminer la variance de l'estimateur",
          ]}
          answer={1}
          explanation="On simule sous une loi nu_f qui favorise l'evenement rare, mais l'estimateur (1/n) sum g(X_i) serait biaise. Le rapport de vraisemblance L(X_i) = dnu/dnu_f(X_i) corrige ce biais : E_f[g(X)L(X)] = E[g(X)]. L'estimateur est sans biais, et si nu_f est bien choisi, sa variance est drastiquement reduite."
        />
      </Section>
    </>
  );
}
