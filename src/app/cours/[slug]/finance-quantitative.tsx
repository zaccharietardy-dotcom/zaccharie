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
} from "@/components/svg-diagrams";
import {
  Def,
  Theorem,
  Proposition,
  Lemma,
  Proof,
  Remark,
  Hypotheses,
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

export function FinanceQuantitative() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. POURQUOI LA FINANCE QUANTITATIVE                          */}
      {/* ============================================================ */}
      <Section id="pourquoi" number="01" title="Pourquoi la finance quantitative">
        <p>
          La finance quantitative applique les mathematiques — probabilites,
          calcul stochastique, optimisation — a la modelisation des marches
          financiers. Ce cours couvre le socle theorique qu&apos;on attend d&apos;un{" "}
          <Term def="Ingenieur financier qui utilise des modeles mathematiques pour le pricing, le hedging et la gestion des risques.">
            quant
          </Term>{" "}
          en salle de marche ou en hedge fund.
        </p>

        <p>
          Les references principales : Shreve (<em>Stochastic Calculus for
          Finance</em>), Hull (<em>Options, Futures, and Other Derivatives</em>),
          Joshi (<em>The Concepts and Practice of Mathematical Finance</em>), et
          Crack (<em>Heard on the Street</em>) pour les entretiens.
        </p>

        <KeyConcept title="Trois piliers de la finance quantitative">
          <p>
            <strong>1. Pricing</strong> — determiner le juste prix d&apos;un
            produit derive (option, swap, etc.) via des modeles mathematiques.{" "}
            <strong>2. Hedging</strong> — construire un portefeuille qui neutralise
            le risque d&apos;une position. <strong>3. Risk management</strong> —
            quantifier et controler l&apos;exposition aux risques de marche.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["", "Sell-side quant", "Buy-side quant"]}
          rows={[
            ["Employeur", "Banque d'investissement", "Hedge fund / Asset manager"],
            ["Objectif", "Pricer et hedger des produits derives", "Generer de l'alpha (rendement)"],
            ["Outils", "EDP, Monte Carlo, modeles de taux", "Statistiques, ML, signaux de trading"],
            ["Profil", "Maths pures, calcul stochastique", "Stats, machine learning, data science"],
          ]}
        />

        <Analogy>
          <p>
            Un quant sell-side est comme un ingenieur qui concoit un pont : il
            doit garantir que la structure (le prix) est solide sous toutes les
            conditions (scenarios de marche). Un quant buy-side est comme un
            pilote de course : il cherche le meilleur chemin (strategie) pour
            arriver premier (battre le marche).
          </p>
        </Analogy>
      </Section>

      {/* ============================================================ */}
      {/* 2. MOUVEMENT BROWNIEN                                        */}
      {/* ============================================================ */}
      <Section id="brownien" number="02" title="Mouvement brownien">
        <p>
          Le{" "}
          <Term def="Processus stochastique a trajectoires continues, accroissements independants et gaussiens. Decouvert par Robert Brown (1827), formalise par Wiener (1923).">
            mouvement brownien
          </Term>{" "}
          (ou processus de Wiener) est la brique fondamentale de toute la
          finance quantitative. C&apos;est le modele mathematique du hasard
          continu.
        </p>

        <Def title="Mouvement brownien standard">
          <p>
            Un processus stochastique <F>(W_t)_{"t≥0"}</F> est
            un mouvement brownien standard si :
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              <Sub sub="0"><F>W</F></Sub> = 0 p.s.
            </li>
            <li>
              Les accroissements sont independants : pour{" "}
              <F>0 ≤ </F><Sub sub="1"><F>t</F></Sub><F> &lt; </F><Sub sub="2"><F>t</F></Sub><F> &lt; ... &lt; </F><Sub sub="n"><F>t</F></Sub>,
              les variables <Sub sub={<>t<sub>i+1</sub></>}><F>W</F></Sub> − <Sub sub={<>t<sub>i</sub></>}><F>W</F></Sub> sont
              independantes.
            </li>
            <li>
              Les accroissements sont gaussiens :{" "}
              <Sub sub="t"><F>W</F></Sub> − <Sub sub="s"><F>W</F></Sub> ∼ <F>N(0, t − s)</F> pour{" "}
              <F>t &gt; s</F>.
            </li>
            <li>
              Les trajectoires <F>t ↦ </F><Sub sub="t"><F>W</F></Sub> sont continues p.s.
            </li>
          </ol>
        </Def>

        <Proposition title="Proprietes essentielles">
          <p>Le mouvement brownien possede des proprietes remarquables :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Non-differentiable</strong> : les trajectoires sont continues
              mais nulle part differentiables (p.s.)
            </li>
            <li>
              <strong>Variation quadratique</strong> :{" "}
              <F>⟨W⟩</F><Sub sub="t"><F>{" "}</F></Sub> = <F>t</F> (c&apos;est la cle du
              calcul d&apos;Ito)
            </li>
            <li>
              <strong>Martingale</strong> : 𝔼[<Sub sub="t"><F>W</F></Sub> | <F>F</F><Sub sub="s"><F>{" "}</F></Sub>] = <Sub sub="s"><F>W</F></Sub> pour{" "}
              <F>s ≤ t</F>
            </li>
            <li>
              <strong>Auto-similarite</strong> : pour tout <F>c &gt; 0</F>,{" "}
              le processus <F>(</F><Frac n="1" d="√c" /><Sub sub="ct"><F>W</F></Sub><F>)</F> est
              aussi un brownien
            </li>
          </ul>
        </Proposition>

        <p>
          <strong>Lien avec la marche aleatoire.</strong> Considerons une marche
          aleatoire symetrique : a chaque pas de temps <F>Δt</F>, le prix monte
          de <F>+√Δt</F> ou descend de <F>−√Δt</F> avec probabilite 1/2.
          Par le theoreme central limite, quand <F>Δt → 0</F>, cette marche
          converge vers un mouvement brownien (theoreme de Donsker).
        </p>

        <Code language="python">{`import numpy as np
import matplotlib.pyplot as plt

def simuler_brownien(T=1.0, n_pas=1000, n_trajectoires=5):
    """Simule plusieurs trajectoires d'un mouvement brownien."""
    dt = T / n_pas
    t = np.linspace(0, T, n_pas + 1)

    for _ in range(n_trajectoires):
        # Accroissements gaussiens independants
        dW = np.random.normal(0, np.sqrt(dt), n_pas)
        W = np.concatenate([[0], np.cumsum(dW)])
        plt.plot(t, W, alpha=0.7)

    plt.xlabel("Temps t")
    plt.ylabel("W(t)")
    plt.title("Trajectoires du mouvement brownien")
    plt.axhline(y=0, color='gray', linestyle='--', alpha=0.3)
    plt.grid(alpha=0.2)
    plt.show()

simuler_brownien()`}</Code>

        <Remark>
          <p>
            Le facteur <F>√Δt</F> dans la marche aleatoire (et non <F>Δt</F>)
            est crucial : c&apos;est ce qui donne la variation quadratique
            non-nulle et rend le calcul stochastique different du calcul
            classique.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 3. CALCUL STOCHASTIQUE — INTEGRALE D'ITO                     */}
      {/* ============================================================ */}
      <Section id="ito" number="03" title="Calcul stochastique — Integrale d'Ito">
        <p>
          Le mouvement brownien n&apos;etant pas differentiable, l&apos;integrale
          de Riemann-Stieltjes classique{" "}
          <Int from="0" to="T" /> <F>f(t) dW(t)</F> n&apos;a pas de sens
          trajectoire par trajectoire. Il faut construire une nouvelle theorie
          d&apos;integration : le{" "}
          <Term def="Theorie d'integration adaptee aux processus stochastiques, due a Kiyosi Ito (1944). Se distingue du calcul classique par la regle de la chaine modifiee (formule d'Ito).">
            calcul d&apos;Ito
          </Term>.
        </p>

        <Def title="Integrale d'Ito">
          <p>
            Pour un processus adapte <F>f(t, ω)</F> verifiant{" "}
            <Int from="0" to="T" /> 𝔼[<F>f(t)²</F>] <F>dt &lt; ∞</F>,
            l&apos;integrale d&apos;Ito est definie comme limite{" "}
            <F>L²</F> :
          </p>
          <Eq>
            <Int from="0" to="T" /> f(t) dW(t) = lim_n→∞ ∑_i f(<Sub sub="i"><F>t</F></Sub>)(
            <Sub sub={<>t<sub>i+1</sub></>}><F>W</F></Sub> − <Sub sub={<>t<sub>i</sub></>}><F>W</F></Sub>)
          </Eq>
          <p>
            Le point crucial : on evalue <F>f</F> au <strong>bord gauche</strong>{" "}
            <Sub sub="i"><F>t</F></Sub> de chaque intervalle (et non au milieu comme
            Stratonovich). Ce choix rend l&apos;integrale d&apos;Ito une
            martingale.
          </p>
        </Def>

        <Warning>
          <p>
            L&apos;integrale d&apos;Ito n&apos;obeit PAS aux regles du calcul
            classique. En particulier, la regle de la chaine est modifiee
            (formule d&apos;Ito) et{" "}
            <F>(dW)² = dt</F> (variation quadratique non nulle). Oublier le
            terme en <F>dt</F> supplementaire est l&apos;erreur la plus
            frequente en calcul stochastique.
          </p>
        </Warning>

        <Theorem name="Formule d'Ito (cas unidimensionnel)">
          <p>
            Soit <Sub sub="t"><F>X</F></Sub> un processus d&apos;Ito :{" "}
            <F>d</F><Sub sub="t"><F>X</F></Sub> = <F>μ dt + σ dW</F><Sub sub="t"><F>{" "}</F></Sub>, et{" "}
            <F>f(t, x) ∈ C</F><Sup sup="1,2"><F>{" "}</F></Sup>. Alors :
          </p>
          <Eq>
            df(<Sub sub="t"><F>t, X</F></Sub>) ={" "}
            <Frac n="∂f" d="∂t" /> dt +{" "}
            <Frac n="∂f" d="∂x" /> d<Sub sub="t"><F>X</F></Sub> +{" "}
            <Frac n="1" d="2" />{" "}
            <Frac n="∂²f" d="∂x²" /> σ² dt
          </Eq>
          <p>
            Le dernier terme{" "}
            <Frac n="1" d="2" /><Frac n="∂²f" d="∂x²" /><F>σ² dt</F> est le
            terme correctif d&apos;Ito, absent du calcul classique. Il vient
            directement de <F>(dW)² = dt</F>.
          </p>
        </Theorem>

        <Proof title="Esquisse de preuve (formule d'Ito)">
          <p>
            On developpe <F>f(t + dt, X + dX)</F> en Taylor a l&apos;ordre 2 :
          </p>
          <Eq>
            f(t+dt, X+dX) = f(t,X) +{" "}
            <Frac n="∂f" d="∂t" />dt +{" "}
            <Frac n="∂f" d="∂x" />dX +{" "}
            <Frac n="1" d="2" /><Frac n="∂²f" d="∂x²" />(dX)² + ...
          </Eq>
          <p>
            On substitue <F>dX = μdt + σdW</F> et on utilise les regles du
            calcul stochastique :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><F>(dt)² = 0</F> (negligeable)</li>
            <li><F>dt · dW = 0</F> (negligeable)</li>
            <li><F>(dW)² = dt</F> (variation quadratique !)</li>
          </ul>
          <p>
            Donc <F>(dX)² = σ²(dW)² = σ² dt</F>, et en regroupant les termes
            on obtient la formule d&apos;Ito.
          </p>
        </Proof>

        <Lemma name="Isometrie d'Ito">
          <p>
            Pour un processus adapte <F>f</F> dans <F>L²</F> :
          </p>
          <Eq>
            𝔼[(<Int from="0" to="T" /> f(t) dW(t))²] ={" "}
            <Int from="0" to="T" /> 𝔼[f(t)²] dt
          </Eq>
          <p>
            Cette identite est fondamentale : elle dit que la &quot;norme&quot;
            de l&apos;integrale stochastique se calcule comme une integrale
            ordinaire des carres. Elle sert a prouver la convergence dans la
            construction de l&apos;integrale d&apos;Ito.
          </p>
        </Lemma>
      </Section>

      {/* ============================================================ */}
      {/* 4. LE MODELE DE BLACK-SCHOLES                                */}
      {/* ============================================================ */}
      <Section id="black-scholes" number="04" title="Le modele de Black-Scholes">
        <p>
          Le modele de Black-Scholes-Merton (1973) est le point de depart de
          toute la theorie moderne du pricing d&apos;options. Malgre ses
          hypotheses simplificatrices, il reste le cadre de reference et
          le langage commun de l&apos;industrie.
        </p>

        <Hypotheses
          items={[
            "Le sous-jacent suit un mouvement brownien geometrique (GBM)",
            "Le taux sans risque r est constant",
            "Pas de dividendes",
            "Pas de couts de transaction ni de taxes",
            "Trading continu possible (pas de frictions)",
            "Pas d'opportunite d'arbitrage",
            "La volatilite σ est constante",
          ]}
        />

        <Def title="Mouvement brownien geometrique (GBM)">
          <p>
            Le prix du sous-jacent <Sub sub="t"><F>S</F></Sub> suit :
          </p>
          <Eq>
            d<Sub sub="t"><F>S</F></Sub> ={" "}
            <F>μ</F><Sub sub="t"><F>S</F></Sub> dt +{" "}
            <F>σ</F><Sub sub="t"><F>S</F></Sub> d<Sub sub="t"><F>W</F></Sub>
          </Eq>
          <p>
            ou <F>μ</F> est le drift (rendement moyen) et <F>σ</F> la
            volatilite. En appliquant la formule d&apos;Ito a{" "}
            <F>f(S) = ln(S)</F>, on obtient la solution explicite :
          </p>
          <Eq>
            <Sub sub="t"><F>S</F></Sub> ={" "}
            <Sub sub="0"><F>S</F></Sub> exp((μ −{" "}
            <Frac n="σ²" d="2" />)t + σ<Sub sub="t"><F>W</F></Sub>)
          </Eq>
        </Def>

        <Steps>
          <Step number="1" title="Portefeuille de couverture">
            <p>
              On construit un portefeuille <F>Π = V − Δ · S</F> ou{" "}
              <F>V(t, S)</F> est le prix de l&apos;option et <F>Δ</F> la
              quantite de sous-jacent detenu. Le but : choisir <F>Δ</F> pour
              eliminer le risque.
            </p>
          </Step>
          <Step number="2" title="Appliquer Ito a V(t, S)">
            <p>
              Par la formule d&apos;Ito :{" "}
              <F>dV</F> ={" "}
              <Frac n="∂V" d="∂t" /><F>dt</F> +{" "}
              <Frac n="∂V" d="∂S" /><F>dS</F> +{" "}
              <Frac n="1" d="2" /><Frac n="∂²V" d="∂S²" /><F>σ²S² dt</F>.
            </p>
          </Step>
          <Step number="3" title="Choisir Δ = ∂V/∂S (delta hedging)">
            <p>
              En posant <F>Δ = ∂V/∂S</F>, les termes en <F>dW</F> s&apos;annulent.
              Le portefeuille devient sans risque sur l&apos;instant <F>dt</F>.
            </p>
          </Step>
          <Step number="4" title="Absence d'arbitrage">
            <p>
              Un portefeuille sans risque doit rapporter le taux sans risque :{" "}
              <F>dΠ = rΠ dt</F>. En egalant les deux expressions, on obtient
              l&apos;EDP de Black-Scholes.
            </p>
          </Step>
        </Steps>

        <Theorem name="EDP de Black-Scholes">
          <p>
            Le prix <F>V(t, S)</F> d&apos;un derive europeen satisfait :
          </p>
          <Eq>
            <Frac n="∂V" d="∂t" /> +{" "}
            <Frac n="1" d="2" />σ²S²{" "}
            <Frac n="∂²V" d="∂S²" /> +{" "}
            rS <Frac n="∂V" d="∂S" /> − rV = 0
          </Eq>
          <p>
            avec la condition terminale <F>V(T, S) = payoff(S)</F>.
          </p>
        </Theorem>

        <Theorem name="Formule de Black-Scholes (call europeen)">
          <p>
            Le prix d&apos;un call europeen de strike <F>K</F> et maturite{" "}
            <F>T</F> est :
          </p>
          <Eq>
            C = S · N(<Sub sub="1"><F>d</F></Sub>) − K<Sup sup="−rT"><F>e</F></Sup> · N(<Sub sub="2"><F>d</F></Sub>)
          </Eq>
          <p>avec :</p>
          <Eq>
            <Sub sub="1"><F>d</F></Sub> ={" "}
            <Frac
              n={<>ln(S/K) + (r + σ²/2)T</>}
              d="σ√T"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Sub sub="2"><F>d</F></Sub> = <Sub sub="1"><F>d</F></Sub> − σ√T
          </Eq>
          <p>
            ou <F>N(·)</F> est la fonction de repartition de la loi normale
            standard. Le prix du put se deduit par la parite put-call.
          </p>
        </Theorem>

        <Code language="python">{`import numpy as np
from scipy.stats import norm

def black_scholes(S, K, T, r, sigma, option_type='call'):
    """Prix Black-Scholes d'un call ou put europeen."""
    d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    if option_type == 'call':
        prix = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
    else:  # put
        prix = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)

    return prix

# Exemple : call europeen
S, K, T, r, sigma = 100, 95, 1.0, 0.05, 0.20
prix_call = black_scholes(S, K, T, r, sigma, 'call')
prix_put = black_scholes(S, K, T, r, sigma, 'put')
print(f"Prix du call : {prix_call:.4f} EUR")
print(f"Prix du put  : {prix_put:.4f} EUR")`}</Code>

        <Remark>
          <p>
            Le drift <F>μ</F> du sous-jacent n&apos;apparait PAS dans
            l&apos;EDP de Black-Scholes ni dans la formule fermee. C&apos;est
            un resultat profond : le prix d&apos;une option ne depend pas de
            l&apos;opinion du marche sur la direction future du sous-jacent,
            seulement de sa volatilite. C&apos;est la consequence directe du
            pricing risque-neutre (section 06).
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 5. LES GREEKS                                                */}
      {/* ============================================================ */}
      <Section id="greeks" number="05" title="Les Greeks">
        <p>
          Les{" "}
          <Term def="Derivees partielles du prix d'une option par rapport a ses parametres (spot, volatilite, temps, taux). Mesurent les sensibilites de la position.">
            Greeks
          </Term>{" "}
          mesurent la sensibilite du prix d&apos;une option aux differents
          parametres de marche. Ils sont essentiels pour le hedging et la
          gestion du risque au quotidien.
        </p>

        <ComparisonTable
          headers={["Greek", "Symbole", "Formule (call BS)", "Interpretation"]}
          rows={[
            ["Delta", "Δ = ∂V/∂S", "N(d₁)", "Sensibilite au spot"],
            ["Gamma", "Γ = ∂²V/∂S²", "φ(d₁) / (Sσ√T)", "Convexite du prix"],
            ["Theta", "Θ = ∂V/∂t", "−Sφ(d₁)σ/(2√T) − rKe⁻ʳᵀN(d₂)", "Perte de valeur temps"],
            ["Vega", "ν = ∂V/∂σ", "S√T · φ(d₁)", "Sensibilite a la vol"],
            ["Rho", "ρ = ∂V/∂r", "KTe⁻ʳᵀN(d₂)", "Sensibilite au taux"],
          ]}
        />

        <p>
          Notation : <F>φ(·)</F> est la densite de la loi normale standard
          (la gaussienne), <F>N(·)</F> sa fonction de repartition.
        </p>

        <KeyConcept title="Delta hedging dynamique">
          <p>
            Un trader qui vend un call doit detenir <F>Δ = N(</F><Sub sub="1"><F>d</F></Sub><F>)</F> actions
            du sous-jacent pour neutraliser le risque directionnel. Comme{" "}
            <F>Δ</F> change avec <F>S</F> et <F>t</F>, il faut
            re-ajuster continuellement la position — c&apos;est le{" "}
            <strong>delta hedging dynamique</strong>. Le cout de ce re-hedging
            est proportionnel au Gamma.
          </p>
        </KeyConcept>

        <SvgDiagram title="Sensibilites d'un call europeen" width={620} height={200}>
          {/* Delta row */}
          <Label x={80} y={40} text="Delta Δ" size={12} anchor="end" color="#e4e4e7" />
          <Label x={95} y={40} text="0" size={10} anchor="start" />
          <defs>
            <linearGradient id="grad-delta" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="grad-gamma" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>
            <linearGradient id="grad-theta" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>
          </defs>
          <rect x={115} y={33} width={240} height={14} rx={7} fill="url(#grad-delta)" />
          <Label x={365} y={40} text="1" size={10} anchor="start" />
          <Label x={420} y={40} text="OTM → ATM → ITM" size={10} anchor="start" />

          {/* Gamma row */}
          <Label x={80} y={95} text="Gamma Γ" size={12} anchor="end" color="#e4e4e7" />
          <Label x={95} y={95} text="0" size={10} anchor="start" />
          <rect x={115} y={88} width={240} height={14} rx={7} fill="url(#grad-gamma)" />
          <Label x={365} y={95} text="0" size={10} anchor="start" />
          <Label x={420} y={95} text="Max au strike (ATM)" size={10} anchor="start" />

          {/* Theta row */}
          <Label x={80} y={150} text="Theta Θ" size={12} anchor="end" color="#e4e4e7" />
          <Label x={95} y={150} text="0" size={10} anchor="start" />
          <rect x={115} y={143} width={240} height={14} rx={7} fill="url(#grad-theta)" />
          <Label x={365} y={150} text="0" size={10} anchor="start" />
          <Label x={420} y={150} text="Decay max ATM (negatif)" size={10} anchor="start" />
        </SvgDiagram>

        <Code language="python">{`from scipy.stats import norm
import numpy as np

def greeks_bs(S, K, T, r, sigma):
    """Calcule tous les Greeks d'un call europeen Black-Scholes."""
    d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    delta = norm.cdf(d1)
    gamma = norm.pdf(d1) / (S * sigma * np.sqrt(T))
    theta = (-S * norm.pdf(d1) * sigma / (2 * np.sqrt(T))
             - r * K * np.exp(-r * T) * norm.cdf(d2))
    vega = S * np.sqrt(T) * norm.pdf(d1)
    rho = K * T * np.exp(-r * T) * norm.cdf(d2)

    return {
        'delta': delta,
        'gamma': gamma,
        'theta': theta / 365,  # par jour
        'vega': vega / 100,     # pour 1 point de vol
        'rho': rho / 100,       # pour 1 point de taux
    }

g = greeks_bs(S=100, K=100, T=0.25, r=0.05, sigma=0.20)
for nom, val in g.items():
    print(f"{nom:>8s} = {val:+.6f}")`}</Code>

        <Remark>
          <p>
            Relation fondamentale Theta-Gamma : pour un portefeuille delta-neutre,
            on a Θ + <Frac n="1" d="2" />σ²S²Γ = rV. Le theta (perte temporelle)
            est la &quot;prime d&apos;assurance&quot; payee pour detenir du gamma
            (convexite). Un market maker long gamma perd du theta chaque jour
            mais profite des grands mouvements.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 6. PRICING D'OPTIONS — MESURE RISQUE-NEUTRE                  */}
      {/* ============================================================ */}
      <Section id="pricing" number="06" title="Pricing d'options — mesure risque-neutre">
        <p>
          La derivation de Black-Scholes par l&apos;EDP (section 04) est
          elegante mais specifique. L&apos;approche probabiliste, via la{" "}
          <Term def="Mesure de probabilite equivalente sous laquelle tous les actifs actualises sont des martingales. Notee Q (par opposition a P, la mesure 'reelle').">
            mesure risque-neutre
          </Term>{" "}
          <F>ℚ</F>, est plus puissante et se generalise a tous les derives.
        </p>

        <Theorem name="Theoreme fondamental du pricing (1er)">
          <p>
            Sous l&apos;hypothese d&apos;absence d&apos;arbitrage, il existe
            une mesure de probabilite <F>ℚ</F> equivalente a <F>ℙ</F> telle que
            le prix actualise de tout actif est une <F>ℚ</F>-martingale.
            Le prix d&apos;un derive de payoff <F>h(</F><Sub sub="T"><F>S</F></Sub><F>)</F> est :
          </p>
          <Eq>
            V(t) = <Sup sup="−r(T−t)"><F>e</F></Sup> · 𝔼<Sup sup="ℚ"><F>{" "}</F></Sup>[h(<Sub sub="T"><F>S</F></Sub>) | <F>F</F><Sub sub="t"><F>{" "}</F></Sub>]
          </Eq>
        </Theorem>

        <Proposition title="Changement de mesure (Girsanov simplifie)">
          <p>
            Sous <F>ℙ</F>, le sous-jacent a un drift <F>μ</F> :{" "}
            <F>dS = μS dt + σS dW</F><Sup sup="ℙ"><F>{" "}</F></Sup>. Le theoreme de
            Girsanov donne un nouveau brownien{" "}
            <F>dW</F><Sup sup="ℚ"><F>{" "}</F></Sup> = <F>dW</F><Sup sup="ℙ"><F>{" "}</F></Sup> +{" "}
            <Frac n="μ − r" d="σ" /><F>dt</F>, et sous <F>ℚ</F> :
          </p>
          <Eq>
            d<Sub sub="t"><F>S</F></Sub> = r<Sub sub="t"><F>S</F></Sub> dt + σ<Sub sub="t"><F>S</F></Sub> d<Sub sub="t"><F>W</F></Sub><Sup sup="ℚ"><F>{" "}</F></Sup>
          </Eq>
          <p>
            Le drift est remplace par le taux sans risque <F>r</F>. Le
            terme <Frac n="μ − r" d="σ" /> est le <strong>prix du risque de
            marche</strong> (market price of risk, ou ratio de Sharpe instantane).
          </p>
        </Proposition>

        <KeyConcept title="Pourquoi 'risque-neutre' ?">
          <p>
            Sous <F>ℚ</F>, tous les actifs ont un rendement espere egal au taux
            sans risque <F>r</F>. C&apos;est comme si les investisseurs etaient
            indifferents au risque — d&apos;ou le nom. Ce n&apos;est pas la
            &quot;vraie&quot; probabilite mais un outil de calcul qui produit
            les bons prix grace a l&apos;absence d&apos;arbitrage.
          </p>
        </KeyConcept>

        <Theorem name="Parite put-call">
          <p>
            Pour des options europeennes de meme strike <F>K</F> et maturite{" "}
            <F>T</F> :
          </p>
          <Eq>
            C − P = S − K<Sup sup="−rT"><F>e</F></Sup>
          </Eq>
          <p>
            Cette relation est un resultat d&apos;absence d&apos;arbitrage pur,
            independant de tout modele. Elle ne necessite meme pas Black-Scholes.
          </p>
        </Theorem>

        <Warning>
          <p>
            La parite put-call ne s&apos;applique qu&apos;aux options{" "}
            <strong>europeennes</strong>. Pour les options americaines (exercice
            anticipe possible), on a seulement une inegalite. De plus, la
            presence de dividendes modifie la relation :{" "}
            <F>C − P = S − PV(div) − K</F><Sup sup="−rT"><F>e</F></Sup>.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 7. MONTE CARLO                                               */}
      {/* ============================================================ */}
      <Section id="monte-carlo" number="07" title="Methodes de Monte Carlo">
        <p>
          Quand il n&apos;existe pas de formule fermee (options exotiques,
          derives path-dependent, modeles a volatilite stochastique), on recourt
          au <strong>Monte Carlo</strong> : simuler un grand nombre de trajectoires
          du sous-jacent sous <F>ℚ</F>, calculer le payoff moyen, et actualiser.
        </p>

        <Steps>
          <Step number="1" title="Simuler des trajectoires GBM sous Q">
            <p>
              On discretise le GBM risque-neutre :{" "}
              <F>S</F><Sub sub="t+Δt"><F>{" "}</F></Sub> = <F>S</F><Sub sub="t"><F>{" "}</F></Sub> exp((r − σ²/2)Δt + σ√Δt · Z) ou{" "}
              <F>Z ∼ N(0,1)</F>.
            </p>
          </Step>
          <Step number="2" title="Calculer le payoff pour chaque trajectoire">
            <p>
              Pour un call : payoff = max(<Sub sub="T"><F>S</F></Sub> − K, 0).
              Pour un put : payoff = max(K − <Sub sub="T"><F>S</F></Sub>, 0).
            </p>
          </Step>
          <Step number="3" title="Estimer le prix">
            <p>
              Le prix = <Sup sup="−rT"><F>e</F></Sup> ·{" "}
              <Frac n="1" d="N" /> ∑ payoff<Sub sub="i"><F>{" "}</F></Sub>.
              L&apos;erreur de Monte Carlo decroit en{" "}
              <F>O(1/√N)</F> — pour diviser l&apos;erreur par 2, il faut 4x
              plus de simulations.
            </p>
          </Step>
        </Steps>

        <Def title="Reduction de variance">
          <p>
            Deux techniques classiques pour accelerer la convergence :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Variables antithetiques</strong> : pour chaque <F>Z</F>,
              simuler aussi <F>−Z</F>. Les trajectoires sont negativement
              correlees, ce qui reduit la variance de l&apos;estimateur.
            </li>
            <li>
              <strong>Variable de controle</strong> : si on connait le prix
              exact d&apos;un instrument similaire (ex: call vanille via BS),
              on utilise la difference entre le prix MC et le prix analytique
              comme correction.
            </li>
          </ul>
        </Def>

        <Code language="python">{`import numpy as np

def monte_carlo_bs(S0, K, T, r, sigma, n_sims=100_000, antithetic=True):
    """Monte Carlo pricer pour un call europeen avec variables antithetiques."""
    Z = np.random.standard_normal(n_sims)

    if antithetic:
        Z = np.concatenate([Z, -Z])  # doubler avec les opposes
        n_sims *= 2

    # Trajectoire terminale sous Q (formule exacte, pas de discretisation)
    S_T = S0 * np.exp((r - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * Z)

    # Payoff du call
    payoffs = np.maximum(S_T - K, 0)

    # Prix actualise
    prix = np.exp(-r * T) * np.mean(payoffs)
    erreur_std = np.exp(-r * T) * np.std(payoffs) / np.sqrt(n_sims)

    return prix, erreur_std

# Comparaison avec Black-Scholes
S0, K, T, r, sigma = 100, 95, 1.0, 0.05, 0.20
prix_mc, err = monte_carlo_bs(S0, K, T, r, sigma)
prix_bs = black_scholes(S0, K, T, r, sigma, 'call')  # cf section 4

print(f"Monte Carlo : {prix_mc:.4f} +/- {err:.4f}")
print(f"Black-Scholes: {prix_bs:.4f}")
print(f"Erreur       : {abs(prix_mc - prix_bs):.4f}")`}</Code>

        <Remark>
          <p>
            Pour les options path-dependent (asiatiques, barrieres, lookback),
            il faut simuler toute la trajectoire, pas seulement la valeur
            terminale. On discretise alors le GBM sur <F>n</F> pas de temps.
            La convergence depend du schema de discretisation (Euler-Maruyama
            a un biais en <F>O(Δt)</F>, Milstein en <F>O(Δt²)</F>).
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 8. MODELES DE TAUX                                           */}
      {/* ============================================================ */}
      <Section id="taux" number="08" title="Modeles de taux d'interet">
        <p>
          En pratique, les taux d&apos;interet ne sont pas constants. Les
          modeles de taux decrivent la dynamique du{" "}
          <Term def="Taux d'interet instantane applique sur une periode infinitesimale. Note r(t), c'est le 'taux court'.">
            taux court
          </Term>{" "}
          <F>r(t)</F> et permettent de pricer les obligations, swaps, caps,
          floors et swaptions.
        </p>

        <Def title="Modele de Vasicek (1977)">
          <p>
            Le taux court suit un processus d&apos;Ornstein-Uhlenbeck
            (retour a la moyenne) :
          </p>
          <Eq>
            dr(t) = κ(θ − r(t)) dt + σ dW(t)
          </Eq>
          <p>
            ou <F>κ &gt; 0</F> est la vitesse de retour a la moyenne,{" "}
            <F>θ</F> le niveau moyen de long terme, et <F>σ</F> la volatilite.
            Le modele admet une solution analytique pour le prix des
            zero-coupons.
          </p>
        </Def>

        <Def title="Modele CIR — Cox-Ingersoll-Ross (1985)">
          <p>
            Variante de Vasicek avec volatilite proportionnelle a <F>√r</F> :
          </p>
          <Eq>
            dr(t) = κ(θ − r(t)) dt + σ√r(t) dW(t)
          </Eq>
          <p>
            Avantage : si <F>2κθ ≥ σ²</F> (condition de Feller), le taux
            reste strictement positif. Le modele de Vasicek, lui, peut donner
            des taux negatifs — ce qui etait vu comme un defaut avant 2014,
            mais est devenu realiste avec les taux negatifs de la BCE.
          </p>
        </Def>

        <ComparisonTable
          headers={["Modele", "Dynamique", "Taux negatifs ?", "Solution analytique"]}
          rows={[
            ["Vasicek", "dr = κ(θ−r)dt + σdW", "Oui (defaut ou feature)", "Oui"],
            ["CIR", "dr = κ(θ−r)dt + σ√r dW", "Non (si Feller)", "Oui"],
            ["Hull-White", "dr = (θ(t)−ar)dt + σdW", "Oui", "Oui (calibre a la courbe)"],
          ]}
        />

        <Proposition title="Prix d'un zero-coupon dans Vasicek">
          <p>
            Le prix a la date <F>t</F> d&apos;un zero-coupon de maturite <F>T</F> est :
          </p>
          <Eq>
            P(t, T) = A(t, T) · exp(−B(t, T) · r(t))
          </Eq>
          <p>
            ou <F>B(t, T) = </F><Frac n="1 − exp(−κ(T−t))" d="κ" /> et{" "}
            <F>A(t, T)</F> est une fonction explicite de <F>κ, θ, σ</F>.
            La courbe des taux (yield curve) se deduit :{" "}
            <F>y(t, T) = −</F><Frac n="ln P(t,T)" d="T − t" />.
          </p>
        </Proposition>

        <Remark>
          <p>
            Le modele de Hull-White est le plus utilise en pratique car sa
            fonction <F>θ(t)</F> dependante du temps permet de calibrer
            exactement la courbe des taux observee sur le marche. Vasicek
            et CIR ne matchent pas la courbe initiale en general.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 9. RISK MANAGEMENT                                           */}
      {/* ============================================================ */}
      <Section id="risk" number="09" title="Risk management — VaR et au-dela">
        <p>
          Le risk management quantitatif vise a repondre a une question
          simple : <strong>combien peut-on perdre ?</strong> Les deux mesures
          de risque dominantes sont la{" "}
          <Term def="Value at Risk : perte maximale au seuil de confiance α sur un horizon donne. Ex: 'VaR 99% 1 jour = 2M EUR' signifie qu'on a 1% de chances de perdre plus de 2M en un jour.">
            VaR
          </Term>{" "}
          et l&apos;<Term def="Expected Shortfall (CVaR) : esperance de la perte sachant qu'on depasse la VaR. Aussi appelee Conditional VaR. Plus coherente que la VaR comme mesure de risque.">
            Expected Shortfall
          </Term>.
        </p>

        <Def title="Value at Risk (VaR)">
          <p>
            La VaR au niveau de confiance <F>α</F> (typiquement 95% ou 99%)
            sur un horizon <F>Δt</F> est le quantile :
          </p>
          <Eq>
            ℙ(Perte &gt; VaR<Sub sub="α"><F>{" "}</F></Sub>) = 1 − α
          </Eq>
          <p>
            Autrement dit, la VaR est la perte qu&apos;on ne depasse qu&apos;avec
            une probabilite <F>1 − α</F>.
          </p>
        </Def>

        <Def title="Expected Shortfall / CVaR">
          <p>
            L&apos;Expected Shortfall (ES) au niveau <F>α</F> est
            l&apos;esperance conditionnelle de la perte au-dela de la VaR :
          </p>
          <Eq>
            ES<Sub sub="α"><F>{" "}</F></Sub> = 𝔼[Perte | Perte &gt; VaR<Sub sub="α"><F>{" "}</F></Sub>]
          </Eq>
          <p>
            L&apos;ES repond a la question : &quot;quand ca va mal, a quel
            point ca va mal ?&quot; Elle est toujours superieure ou egale a la VaR.
          </p>
        </Def>

        <Warning>
          <p>
            <strong>Limites critiques de la VaR :</strong>
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              La VaR n&apos;est <strong>pas sous-additive</strong> : la VaR
              d&apos;un portefeuille peut etre superieure a la somme des VaR
              individuelles. Cela viole le principe de diversification.
            </li>
            <li>
              La VaR ne dit rien sur l&apos;<strong>amplitude</strong> des
              pertes au-dela du seuil (contrairement a l&apos;ES).
            </li>
            <li>
              Les hypotheses de normalite sont souvent violees : les rendements
              ont des <strong>queues epaisses</strong> (kurtosis &gt; 3) et
              les correlations augmentent en crise.
            </li>
            <li>
              La crise de 2008 a montre que les modeles VaR gaussiens
              sous-estimaient massivement le risque de queue. Bale III impose
              desormais l&apos;utilisation de l&apos;Expected Shortfall.
            </li>
          </ul>
        </Warning>

        <ComparisonTable
          headers={["", "VaR", "Expected Shortfall"]}
          rows={[
            ["Definition", "Quantile de la distribution des pertes", "Esperance conditionnelle au-dela de la VaR"],
            ["Sous-additive", "Non (pas coherente)", "Oui (mesure coherente)"],
            ["Reglementation", "Bale II", "Bale III (depuis 2016)"],
            ["Interpretation", "\"Je ne perds pas plus de X avec proba α\"", "\"Quand je depasse la VaR, je perds en moyenne Y\""],
            ["Sensibilite aux queues", "Aveugle au-dela du quantile", "Capture la forme de la queue"],
          ]}
        />

        <KeyConcept title="Stress testing">
          <p>
            Le stress testing complete la VaR/ES en simulant des{" "}
            <strong>scenarios extremes historiques ou hypothetiques</strong> :
            crash de 2008, crise de la dette souveraine 2011, Covid 2020.
            On recalcule le P&amp;L du portefeuille sous chaque scenario.
            C&apos;est le seul moyen d&apos;evaluer les risques{" "}
            <em>non-lineaires</em> que les mesures statistiques standard
            ne capturent pas.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 10. EXERCICES STYLE "HEARD ON THE STREET"                    */}
      {/* ============================================================ */}
      <Section id="exercices" number="10" title="Exercices style 'Heard on the Street'">
        <p>
          Les entretiens quant testent l&apos;intuition mathematique sous
          pression. Voici des classiques inspires de Crack (<em>Heard on the
          Street</em>) et Joshi (<em>Quant Job Interview</em>).
        </p>

        <KeyConcept title="Exercice 1 — Put-call parity">
          <p>
            <strong>Enonce :</strong> Un call europeen vaut 5 EUR, le sous-jacent
            est a 100 EUR, le strike est 95 EUR, le taux sans risque est 5%,
            la maturite est 1 an. Quel est le prix du put ?
          </p>
          <p>
            <strong>Solution :</strong> Par la parite put-call :{" "}
            <F>P = C − S + K</F><Sup sup="−rT"><F>e</F></Sup>{" "}
            = 5 − 100 + 95 · <Sup sup="−0.05"><F>e</F></Sup>{" "}
            = 5 − 100 + 90.48 = <strong>−4.52</strong>... Non, verifions :{" "}
            95 × <Sup sup="−0.05"><F>e</F></Sup> ≈ 90.48. Donc P = 5 − 100 + 90.48 ≈ <strong>−4.52</strong>.
            Negatif ? Impossible. La condition est que le call est deep ITM
            (S = 100 &gt; K = 95), donc le put est OTM et tres peu cher. En
            fait : P = C − S + K<Sup sup="−rT"><F>e</F></Sup> = 5 − 100 + 90.48
            est negatif, ce qui signifie qu&apos;il y a une erreur dans
            l&apos;enonce ou une opportunite d&apos;arbitrage. Un call ATM
            ne peut pas valoir seulement 5 EUR avec 20% de vol — ici le call
            est ITM donc il vaut au moins sa valeur intrinseque{" "}
            <F>S − K</F><Sup sup="−rT"><F>e</F></Sup> ≈ 9.52 EUR.
            Avec C = 5, il y aurait arbitrage. <strong>Piege classique</strong> :
            toujours verifier la coherence avant d&apos;appliquer une formule.
          </p>
        </KeyConcept>

        <KeyConcept title="Exercice 2 — Delta d'un call digital">
          <p>
            <strong>Enonce :</strong> Un call digital paye 1 EUR si{" "}
            <Sub sub="T"><F>S</F></Sub> &gt; K, et 0 sinon. Quel est son delta ?
          </p>
          <p>
            <strong>Solution :</strong> Le prix sous BS est{" "}
            <Sup sup="−rT"><F>e</F></Sup> · N(<Sub sub="2"><F>d</F></Sub>). Le delta est :{" "}
            Δ = <Sup sup="−rT"><F>e</F></Sup> · φ(<Sub sub="2"><F>d</F></Sub>) ·{" "}
            <Frac n="1" d="Sσ√T" />. Proche de la maturite et ATM, le delta
            d&apos;un digital explose — c&apos;est un <strong>probleme majeur
            de hedging</strong> en pratique. C&apos;est pourquoi les desks
            utilisent des call spreads pour repliquer les digitales.
          </p>
        </KeyConcept>

        <KeyConcept title="Exercice 3 — Esperance du max">
          <p>
            <strong>Enonce :</strong> Soient X et Y deux variables N(0,1)
            independantes. Calculer 𝔼[max(X, Y)].
          </p>
          <p>
            <strong>Solution :</strong> Par symetrie, 𝔼[max(X,Y)] = 𝔼[X | X &gt; Y]
            · ℙ(X &gt; Y) + 𝔼[Y | Y &gt; X] · ℙ(Y &gt; X) = 2 · ℙ(X &gt; Y) ·
            𝔼[X | X &gt; Y]. Par symetrie ℙ(X &gt; Y) = 1/2. On peut aussi utiliser
            la formule : max(X,Y) = <Frac n="X + Y" d="2" /> + <Frac n="|X − Y|" d="2" />.
            Or X − Y ∼ N(0, 2), donc |X − Y| suit une demi-normale et
            𝔼[|X − Y|] = √(2) · √(2/π) = 2/√π. Donc{" "}
            𝔼[max(X,Y)] = 0 + <Frac n="1" d="√π" /> ={" "}
            <strong>1/√π ≈ 0.5642</strong>.
          </p>
        </KeyConcept>

        <KeyConcept title="Exercice 4 — Volatilite implicite">
          <p>
            <strong>Enonce :</strong> Un call ATM (S = K = 100) de maturite 1 an
            vaut 10 EUR avec r = 0. Estimer la volatilite implicite.
          </p>
          <p>
            <strong>Solution :</strong> Pour un call ATM forward avec r = 0,
            on a l&apos;approximation de Brenner-Subrahmanyam :{" "}
            <F>C ≈ S · σ√T · 0.4</F> (car N(d₁) − N(d₂) ≈ 0.4σ√T pour
            les petits σ√T). Donc σ ≈ C / (0.4 · S · √T) = 10 / (0.4 · 100 · 1)
            = <strong>25%</strong>. Verification par Newton-Raphson sur la
            formule de BS exacte : σ ≈ 24.8%. L&apos;approximation est
            excellente pour les options ATM.
          </p>
        </KeyConcept>

        <KeyConcept title="Exercice 5 — Probabilite de toucher la barriere">
          <p>
            <strong>Enonce :</strong> Un brownien part de 0. Quelle est la
            probabilite qu&apos;il atteigne le niveau <F>a &gt; 0</F> avant le
            temps <F>T</F> ?
          </p>
          <p>
            <strong>Solution :</strong> Par le principe de reflexion du
            mouvement brownien :{" "}
            ℙ(max<Sub sub="0≤t≤T"><F>{" "}</F></Sub> <Sub sub="t"><F>W</F></Sub> ≥ a) = 2 · ℙ(<Sub sub="T"><F>W</F></Sub> ≥ a) = 2(1 − N(a/√T)) = <strong>2N(−a/√T)</strong>.
            Cette formule est a la base du pricing des options a barriere.
          </p>
        </KeyConcept>

        <KeyConcept title="Exercice 6 — Replication statique">
          <p>
            <strong>Enonce :</strong> Montrer qu&apos;un straddle ATM
            (long call + long put, meme strike K = S) a un payoff egal a{" "}
            |<Sub sub="T"><F>S</F></Sub> − K|. En deduire que son prix
            approxime <F>S · σ√T · √(2/π)</F> pour r = 0.
          </p>
          <p>
            <strong>Solution :</strong> Payoff = max(S−K, 0) + max(K−S, 0) = |S−K|.
            C&apos;est la valeur absolue du deplacement. Sous BS avec r = 0,{" "}
            <Sub sub="T"><F>S</F></Sub> = S · exp(−σ²T/2 + σ√T · Z) et
            pour σ√T petit, |<Sub sub="T"><F>S</F></Sub> − S| ≈ Sσ√T · |Z|.
            Or 𝔼[|Z|] = √(2/π), donc le prix du straddle ≈{" "}
            <strong>Sσ√T · √(2/π)</strong> ≈ 0.798 · Sσ√T.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 11. QUIZ FINAL                                               */}
      {/* ============================================================ */}
      <Section id="quiz" number="11" title="Quiz final">
        <Quiz
          question="Dans le modele de Black-Scholes, le prix d'une option ne depend PAS de :"
          options={[
            "La volatilite σ du sous-jacent",
            "Le drift μ du sous-jacent",
            "Le taux sans risque r",
            "Le prix actuel S du sous-jacent",
          ]}
          answer={1}
          explanation="Le drift μ disparait dans l'EDP de Black-Scholes grace au changement de mesure (Girsanov). Le prix ne depend que de S, σ, r, K et T. C'est un resultat fondamental du pricing risque-neutre."
        />

        <Quiz
          question="La variation quadratique du mouvement brownien sur [0, T] vaut :"
          options={[
            "0 (comme toute fonction continue)",
            "∞ (car les trajectoires ne sont pas differentiables)",
            "T",
            "√T",
          ]}
          answer={2}
          explanation="⟨W⟩_T = T est LA propriete qui distingue le calcul stochastique du calcul classique. Les fonctions continues classiques ont une variation quadratique nulle, mais le brownien a des oscillations si rapides que (dW)² = dt > 0."
        />

        <Quiz
          question="L'Expected Shortfall (CVaR) est preferee a la VaR car :"
          options={[
            "Elle est toujours plus petite que la VaR",
            "Elle ne necessite pas d'hypothese de distribution",
            "Elle est sous-additive (mesure de risque coherente)",
            "Elle est plus facile a calculer",
          ]}
          answer={2}
          explanation="L'ES est une mesure de risque coherente au sens d'Artzner et al. (1999) : elle est sous-additive, ce qui respecte le principe de diversification. La VaR n'est pas sous-additive et peut penaliser la diversification — un defaut theorique majeur."
        />

        <Quiz
          question="Le terme correctif dans la formule d'Ito (½ ∂²f/∂x² σ² dt) provient de :"
          options={[
            "L'approximation de Taylor a l'ordre 1",
            "La variation quadratique non nulle du brownien : (dW)² = dt",
            "L'hypothese de normalite des rendements",
            "La condition d'absence d'arbitrage",
          ]}
          answer={1}
          explanation="Le developpement de Taylor a l'ordre 2 donne un terme en (dX)², et comme dX contient σdW, on obtient σ²(dW)² = σ²dt. Ce terme ne disparait PAS (contrairement au calcul classique ou (dx)² → 0). C'est toute la difference entre Ito et Newton-Leibniz."
        />

        <Quiz
          question="Dans la methode Monte Carlo, pour diviser l'erreur d'estimation par 2, il faut multiplier le nombre de simulations par :"
          options={[
            "2",
            "4",
            "8",
            "10",
          ]}
          answer={1}
          explanation="L'erreur standard Monte Carlo decroit en O(1/√N). Pour diviser par 2 : 1/√(4N) = (1/2) · 1/√N. Il faut donc 4 fois plus de simulations. C'est pourquoi les techniques de reduction de variance (antithetiques, controle) sont cruciales en pratique."
        />
      </Section>
    </>
  );
}
