"use client";

import {
  Section,
  KeyConcept,
  Warning,
  Analogy,
  Quiz,
  ComparisonTable,
} from "@/components/course-elements";
import {
  Theorem,
  Proposition,
  Def,
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
   α β γ δ ε θ λ μ ν σ φ ω κ
   ∀ ∃ ∈ ∉ ⊂ ⊃ ∩ ∪ ∅
   ≤ ≥ ≠ ≈ → ⟹ ⟸ ⟺ ∞
   ⟨ ⟩ ‖ ∂ ∇ ∑ ∏ √
   ℝ ℕ ℤ ℚ ℂ ℓ
*/

export function Optimisation() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. INTRODUCTION & MOTIVATION                                 */}
      {/* ============================================================ */}
      <Section id="introduction" number="01" title="Introduction & Motivation">
        <p>
          Ce cours couvre les fondements mathematiques de l&apos;optimisation en
          dimension finie et infinie, avec des applications au controle et aux
          reseaux de neurones. Professeur : Gregoire Allaire (Ecole
          Polytechnique, APM_43035_EP).
        </p>

        <p>Les trois piliers du cours :</p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            <strong>Existence</strong> de solutions (facile en dim finie sous
            hypothese de convexite)
          </li>
          <li>
            <strong>Caracterisation</strong> des solutions — conditions
            d&apos;optimalite (tres important en pratique !)
          </li>
          <li>
            <strong>Algorithmes</strong> numeriques d&apos;optimisation (tous
            bases sur des derivees)
          </li>
        </ol>

        <KeyConcept title="Le probleme general">
          <p>
            Soit <F>V</F> un espace de Hilbert, <F>K ⊂ V</F> un
            sous-ensemble non vide, et <F>J : V → ℝ</F>. On
            cherche :
          </p>
          <Eq>
            inf<sub>v∈K</sub> J(v) &nbsp;&nbsp; ou &nbsp;&nbsp; min<sub>v∈K</sub> J(v)
          </Eq>
        </KeyConcept>

        <p>
          <strong>Exemples concrets :</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Poutre horizontale</strong> : minimiser l&apos;energie
            (deformation + potentielle) sous contraintes aux bords :
            <Eq>
              min<sub>u∈C¹(0,L)</sub>{" "}
              <Frac n="1" d="2" />
              <Int from="0" to="L" /> μ|u&apos;(x)|² dx −{" "}
              <Int from="0" to="L" /> f(x) u(x) dx
            </Eq>
          </li>
          <li>
            <strong>Controle optimal</strong> : piloter un systeme dynamique{" "}
            <F>ẋ(t) = f(t, x(t), u(t))</F> pour atteindre une cible
            ou suivre une trajectoire
          </li>
          <li>
            <strong>Reseaux de neurones</strong> : l&apos;apprentissage profond
            est un probleme de controle optimal en temps discret ! Chaque couche
            = un pas de temps, les poids = les controles. La
            retro-propagation du gradient vient de la notion d&apos;etat adjoint
            en controle optimal (idee de Yann Le Cun, 1988).
          </li>
        </ul>

        <Remark>
          <p>
            En theorie, on cherche un <strong>minimum global</strong>. En
            pratique numerique, on calcule un{" "}
            <strong>minimum local</strong>. Cette distinction est fondamentale.
          </p>
        </Remark>

        <Quiz
          question="L'apprentissage d'un reseau de neurones profond peut s'interpreter comme..."
          options={[
            "Un probleme de regression lineaire",
            "Un probleme de controle optimal en temps discret",
            "Un probleme de programmation lineaire",
            "Un probleme de classification bayesienne",
          ]}
          answer={1}
          explanation="Chaque couche du reseau correspond a un pas de temps discret, les poids sont les controles, et la retro-propagation vient de l'etat adjoint."
        />
      </Section>

      {/* ============================================================ */}
      {/* 2. EXISTENCE DE SOLUTIONS                                    */}
      {/* ============================================================ */}
      <Section id="existence" number="02" title="Existence de solutions">
        <Def title="Notions de base">
          <p>
            <strong>Infimum</strong> de <F>J</F> sur <F>K</F> : le plus
            grand des minorants.
          </p>
          <Eq>
            inf<sub>v∈K</sub> J(v) = max{"{"} C ∈ ℝ ∪ {"{"}−∞{"}"} : C ≤ J(v) ∀v ∈ K {"}"}
          </Eq>
          <p>
            <strong>Suite minimisante</strong> :{" "}
            <F>(u<sup>n</sup>)<sub>n∈ℕ</sub></F> telle que{" "}
            <F>u<sup>n</sup> ∈ K</F> pour tout <F>n</F> et{" "}
            <F>lim J(u<sup>n</sup>) = inf<sub>v∈K</sub> J(v)</F>.
          </p>
          <p>
            Il existe <strong>toujours</strong> des suites minimisantes (par
            definition de l&apos;infimum).
          </p>
        </Def>

        <Def title="Minimum local et global">
          <p>
            <F>u</F> est un <strong>minimum global</strong> de <F>J</F>{" "}
            sur <F>K</F> si :
          </p>
          <Eq>u ∈ K &nbsp; et &nbsp; J(v) ≥ J(u) &nbsp; ∀v ∈ K</Eq>
          <p>
            <F>u</F> est un <strong>minimum local</strong> si cette inegalite
            vaut dans une boule :
          </p>
          <Eq>∃δ {">"} 0, ∀v ∈ K, ‖v − u‖ {"<"} δ ⟹ J(v) ≥ J(u)</Eq>
        </Def>

        <Theorem name="Existence en dimension finie">
          <p>
            Soit <F>K</F> un ferme non vide de{" "}
            <F>ℝ<sup>N</sup></F> et <F>J</F> continue sur{" "}
            <F>K</F> verifiant la propriete{" "}
            <strong>&laquo; infinie a l&apos;infini &raquo;</strong> :
          </p>
          <Eq>
            ∀(u<sup>n</sup>) suite dans K, &nbsp; ‖u<sup>n</sup>‖ → +∞ ⟹ J(u<sup>n</sup>) → +∞
          </Eq>
          <p>
            Alors il existe au moins un point de minimum de <F>J</F> sur <F>K</F>.
          </p>
          <Hypotheses
            items={[
              "K est un ferme non vide de ℝᴺ (dimension finie !)",
              "J est continue sur K",
              "J est coercive (infinie a l'infini) — automatique si K est borne",
            ]}
          />
        </Theorem>

        <Proof title="Preuve (existence en dim finie)">
          <p>
            Soit <F>(u<sup>n</sup>)</F> une suite minimisante. Par coercivite,{" "}
            <F>J(u<sup>n</sup>) ≤ C</F> implique <F>‖u<sup>n</sup>‖ ≤ C&apos;</F> : la
            suite est bornee.
          </p>
          <p>
            En dimension finie, les fermes bornes sont compacts (Bolzano-Weierstrass).
            On extrait une sous-suite{" "}
            <F>u<sup>n<sub>k</sub></sup> → u</F>. Comme <F>K</F> est ferme,{" "}
            <F>u ∈ K</F>. Par continuite :{" "}
            <F>J(u<sup>n<sub>k</sub></sup>) → J(u) = inf J</F>.
          </p>
        </Proof>

        <Warning>
          <p>
            <strong>En dimension infinie, ce theoreme est FAUX !</strong> Une
            fonction continue sur un ferme borne peut ne pas atteindre son
            minimum. Le probleme : les fermes bornes ne sont pas compacts en
            dimension infinie.
          </p>
        </Warning>

        <KeyConcept title="Deux contre-exemples en dim infinie">
          <p>
            <strong>1. Fuite a l&apos;infini</strong> dans <F>ℓ₂(ℝ)</F> :
          </p>
          <Eq>
            J(x) = (‖x‖² − 1)² + ∑<sub>i=1</sub><sup>+∞</sup>{" "}
            <Frac n={<>x<sub>i</sub>²</>} d="i" />
          </Eq>
          <p>
            La suite <F>x<sup>n</sup> = (0,…,0,1,0,…)</F> (le
            1 en position <F>n</F>) verifie <F>J(x<sup>n</sup>) = 1/n → 0</F>,
            mais elle ne converge pas.
          </p>
          <p>
            <strong>2. Oscillation</strong> sur <F>H¹(0,1)</F> :
          </p>
          <Eq>
            J(v) = <Int from="0" to="1" /> ( (|v&apos;(x)| − 1)² + v(x)² ) dx
          </Eq>
          <p>
            La suite minimisante oscille de plus en plus (dents de scie
            de hauteur <F>1/n</F>). Elle converge vers 0, mais sa derivee ne
            converge pas.
          </p>
        </KeyConcept>

        <Quiz
          question="Pourquoi le theoreme d'existence en dim finie ne marche pas en dim infinie ?"
          options={[
            "La fonction J n'est pas continue",
            "Les fermes bornes ne sont pas compacts en dim infinie",
            "L'infimum n'existe pas",
            "Il n'y a pas de suite minimisante",
          ]}
          answer={1}
          explanation="En dimension infinie, un ferme borne n'est pas necessairement compact. C'est pourquoi on a besoin d'hypotheses supplementaires comme la convexite."
        />
      </Section>

      {/* ============================================================ */}
      {/* 3. CONVEXITE                                                 */}
      {/* ============================================================ */}
      <Section id="convexite" number="03" title="Convexite">
        <p>
          La convexite est l&apos;hypothese cle pour obtenir existence en
          dimension infinie et garantir que tout minimum local est global.
        </p>

        <Def title="Ensemble convexe">
          <p>
            <F>K ⊂ V</F> est <strong>convexe</strong> si pour tout{" "}
            <F>x, y ∈ K</F> et tout <F>θ ∈ [0,1]</F> :
          </p>
          <Eq>θx + (1 − θ)y ∈ K</Eq>
        </Def>

        <Def title="Fonction convexe">
          <p>
            <F>J</F> definie sur un convexe <F>K</F> est{" "}
            <strong>convexe</strong> si :
          </p>
          <Eq>
            J(θu + (1−θ)v) ≤ θ J(u) + (1−θ) J(v) &nbsp;&nbsp; ∀u,v ∈ K, ∀θ ∈ [0,1]
          </Eq>
          <p>
            Geometriquement : la fonction est <strong>sous sa corde</strong>.
            Elle est <strong>strictement convexe</strong> si l&apos;inegalite est stricte pour{" "}
            <F>u ≠ v</F> et <F>θ ∈ ]0,1[</F>.
          </p>
        </Def>

        <Proposition title="Minimum local = minimum global">
          <p>
            Si <F>J</F> est convexe sur un convexe <F>K</F>, alors{" "}
            <strong>tout minimum local est un minimum global</strong>.
          </p>
        </Proposition>

        <Proof>
          <p>
            Soit <F>u</F> minimum local, <F>v ∈ K</F> quelconque. Pour{" "}
            <F>0 {"<"} θ ≪ 1</F>,{" "}
            <F>w<sub>θ</sub> = θv + (1−θ)u ∈ K</F> et <F>‖w<sub>θ</sub> − u‖ {"<"} δ</F>.
            Donc :
          </p>
          <Eq>
            J(u) ≤ J(w<sub>θ</sub>) ≤ θ J(v) + (1−θ) J(u)
          </Eq>
          <p>D&apos;ou <F>J(u) ≤ J(v)</F> pour tout <F>v ∈ K</F>.</p>
        </Proof>

        <Proposition title="Unicite (cas strictement convexe)">
          <p>
            Si <F>J</F> est <strong>strictement convexe</strong> sur <F>K</F> convexe,
            il existe <strong>au plus un</strong> point de minimum.
          </p>
        </Proposition>

        <Def title="Forte convexite (α-convexite)">
          <p>
            <F>J</F> est <strong>α-convexe</strong> (fortement convexe) s&apos;il existe <F>α {">"} 0</F> tel que :
          </p>
          <Eq>
            J(θu + (1−θ)v) ≤ θ J(u) + (1−θ) J(v) −{" "}
            <Frac n="α" d="2" /> θ(1−θ) ‖u − v‖²
          </Eq>
          <p>
            Equivalence : <F>J</F> est α-convexe ssi <F>J(u) − <Frac n="α" d="2" />‖u‖²</F> est convexe.
          </p>
        </Def>

        <KeyConcept title="A retenir sur la convexite">
          <p>
            • Convexe : <strong>tout minimum local est global</strong>
            <br />• Strictement convexe : <strong>unicite</strong> du minimum
            <br />• Fortement convexe : <strong>existence + unicite + convergence rapide</strong> des algorithmes
          </p>
        </KeyConcept>

        <Quiz
          question="Si J est convexe sur K convexe et admet un minimum local u, que peut-on dire ?"
          options={[
            "u est un point selle",
            "u est un minimum global de J sur K",
            "J est necessairement differentiable en u",
            "u est unique",
          ]}
          answer={1}
          explanation="Pour une fonction convexe sur un convexe, tout minimum local est automatiquement global. L'unicite n'est garantie que si J est strictement convexe."
        />
      </Section>

      {/* ============================================================ */}
      {/* 4. CONDITIONS D'OPTIMALITE — K CONVEXE                       */}
      {/* ============================================================ */}
      <Section id="euler" number="04" title="Conditions d'optimalite — K convexe">
        <Theorem name="Inequation d'Euler">
          <p>
            Soit <F>K</F> convexe ferme et <F>J</F> differentiable. Si <F>u</F>{" "}
            est un minimum local de <F>J</F> sur <F>K</F> :
          </p>
          <Eq>⟨J&apos;(u), v − u⟩ ≥ 0 &nbsp;&nbsp; ∀v ∈ K</Eq>
          <p>
            <strong>Reciproque :</strong> si <F>J</F> est convexe, cette
            condition est aussi <strong>suffisante</strong>.
          </p>
          <Hypotheses
            items={[
              "K est convexe et ferme",
              "J est differentiable en u",
            ]}
          />
        </Theorem>

        <Proof>
          <p>
            Pour <F>v ∈ K</F> et <F>h ∈ ]0,1]</F>,{" "}
            <F>u + h(v−u) ∈ K</F> (convexite). Minimum local ⟹{" "}
            <F>[J(u + h(v−u)) − J(u)] / h ≥ 0</F>.
            Limite <F>h → 0</F> :{" "}
            <F>⟨J&apos;(u), v − u⟩ ≥ 0</F>.
          </p>
        </Proof>

        <KeyConcept title="Cas sans contrainte : K = V">
          <p>
            On prend <F>v = u ± w</F> pour tout <F>w</F>, d&apos;ou :
          </p>
          <Eq>J&apos;(u) = 0</Eq>
          <p>C&apos;est l&apos;annulation du gradient classique.</p>
        </KeyConcept>

        <KeyConcept title="Projection sur un convexe">
          <p>
            La projection <F>x<sub>K</sub></F> de <F>x</F> sur <F>K</F> convexe ferme verifie :
          </p>
          <Eq>
            x<sub>K</sub> ∈ K, &nbsp; ⟨x<sub>K</sub> − x, y − x<sub>K</sub>⟩ ≥ 0 &nbsp; ∀y ∈ K
          </Eq>
          <p>
            Si <F>K = (ℝ⁺)ⁿ</F> : <F>(x<sub>K</sub>)<sub>j</sub> = max(0, x<sub>j</sub>)</F>.
          </p>
        </KeyConcept>

        <Proposition title="Condition du 2nd ordre">
          <p>
            Si <F>K = V</F> et <F>J</F> deux fois derivable, un minimum local <F>u</F> verifie :
          </p>
          <Eq>
            J&apos;(u) = 0 &nbsp; et &nbsp; J&apos;&apos;(u)(w,w) ≥ 0 &nbsp; ∀w ∈ V
          </Eq>
        </Proposition>

        <Quiz
          question="L'inequation d'Euler ⟨J'(u), v−u⟩ ≥ 0 pour tout v ∈ K est..."
          options={[
            "Necessaire et suffisante pour tout J differentiable",
            "Necessaire seulement (suffisante si J est convexe)",
            "Suffisante seulement",
            "Ni necessaire ni suffisante",
          ]}
          answer={1}
          explanation="L'inequation d'Euler est toujours necessaire (K convexe, J differentiable). Elle est aussi suffisante si J est convexe."
        />
      </Section>

      {/* ============================================================ */}
      {/* 5. K NON CONVEXE                                             */}
      {/* ============================================================ */}
      <Section id="cone" number="05" title="Conditions d'optimalite — K non convexe">
        <Def title="Cone des directions admissibles">
          <p>Pour <F>v ∈ K</F>, le cone est :</p>
          <Eq>
            K(v) = {"{"} w ∈ V : ∃(v<sup>n</sup>) ∈ K, ∃(ε<sup>n</sup>) ∈ ℝ*₊, v<sup>n</sup> → v, ε<sup>n</sup> → 0,{" "}
            <Frac n={<>v<sup>n</sup> − v</>} d={<>ε<sup>n</sup></>} /> → w {"}"}
          </Eq>
        </Def>

        <KeyConcept title="Exemples de K(u)">
          <p>
            • <F>u</F> interieur a <F>K</F> : <F>K(u) = V</F>
            <br />• <F>K</F> convexe : <F>K(u) = {"{"}v − u : v ∈ K{"}"}</F>
            <br />• <F>K = {"{"}F(v) = 0{"}"}</F> et <F>F&apos;(u) ≠ 0</F> :{" "}
            <F>K(u) = [F&apos;(u)]⊥</F> (hyperplan tangent)
          </p>
        </KeyConcept>

        <Proposition title="Inequation d'Euler generalisee">
          <p>
            Si <F>u</F> est minimum local et <F>J</F> differentiable en <F>u</F> :
          </p>
          <Eq>⟨J&apos;(u), w⟩ ≥ 0 &nbsp;&nbsp; ∀w ∈ K(u)</Eq>
        </Proposition>
      </Section>

      {/* ============================================================ */}
      {/* 6. CONTRAINTES D'EGALITE & LAGRANGIEN                        */}
      {/* ============================================================ */}
      <Section id="egalite" number="06" title="Contraintes d'egalite & Lagrangien">
        <Theorem name="Multiplicateurs de Lagrange">
          <p>
            Soit <F>K = {"{"}v ∈ V : F(v) = 0{"}"}</F> avec{" "}
            <F>F = (F₁,…,F<sub>M</sub>)</F>. Si <F>u</F> est minimum local et
            les <F>F&apos;<sub>i</sub>(u)</F> sont <strong>lineairement independants</strong>,
            alors ∃ <F>λ₁,…,λ<sub>M</sub> ∈ ℝ</F> :
          </p>
          <Eq>
            J&apos;(u) + ∑<sub>i=1</sub><sup>M</sup> λ<sub>i</sub> F&apos;<sub>i</sub>(u) = 0
          </Eq>
          <Hypotheses
            items={[
              "J et les Fᵢ sont differentiables au voisinage de u",
              "Les F'ᵢ(u) sont lineairement independants (qualification)",
            ]}
          />
        </Theorem>

        <Warning>
          <p>
            La qualification est <strong>indispensable</strong>. Contre-exemple :{" "}
            <F>K = {"{"}v : ‖v‖² = 0{"}"}</F> = {"{"}0{"}"}, mais <F>F&apos;(0) = 0</F> et
            la condition de Lagrange ne s&apos;applique pas.
          </p>
        </Warning>

        <Def title="Lagrangien">
          <Eq>
            ℒ(v, μ) = J(v) + ∑<sub>i=1</sub><sup>M</sup> μ<sub>i</sub> F<sub>i</sub>(v)
            &nbsp;&nbsp; ∀(v, μ) ∈ V × ℝ<sup>M</sup>
          </Eq>
        </Def>

        <Theorem name="Stationnarite du Lagrangien">
          <p>Les conditions d&apos;optimalite se reecrivent :</p>
          <Eq>
            ∂ℒ/∂v (u, λ) = 0 &nbsp;&nbsp; et &nbsp;&nbsp; ∂ℒ/∂μ (u, λ) = F(u) = 0
          </Eq>
          <p>
            Le Lagrangien ramene le probleme contraint a un probleme{" "}
            <strong>sans contrainte</strong> avec une variable supplementaire <F>μ</F>.
          </p>
        </Theorem>

        <KeyConcept title="Interpretation des multiplicateurs">
          <p>
            Si <F>ℳ(ε)</F> est la valeur du minimum pour <F>F(v) = ε</F> :
          </p>
          <Eq>λ<sub>i</sub> = −∂ℳ/∂ε<sub>i</sub>(0)</Eq>
          <p>
            <F>λ<sub>i</sub></F> mesure la <strong>sensibilite du cout</strong> a
            une perturbation de la contrainte — c&apos;est le &laquo; prix &raquo; de la contrainte.
          </p>
        </KeyConcept>

        <Quiz
          question="Quelle hypothese est indispensable pour les multiplicateurs de Lagrange ?"
          options={[
            "J est convexe",
            "K est borne",
            "Les F'ᵢ(u) sont lineairement independants",
            "J est deux fois differentiable",
          ]}
          answer={2}
          explanation="C'est l'hypothese de qualification : les F'ᵢ(u) doivent etre libres pour que le cone tangent K(u) soit l'hyperplan tangent a K."
        />
      </Section>

      {/* ============================================================ */}
      {/* 7. CONTRAINTES D'INEGALITE — KKT                             */}
      {/* ============================================================ */}
      <Section id="inegalite" number="07" title="Contraintes d'inegalite — KKT">
        <p>Probleme general avec egalite ET inegalite :</p>
        <Eq>
          inf<sub>v∈K</sub> J(v) &nbsp; avec &nbsp;
          K = {"{"}v : G(v) = 0, F(v) ≤ 0{"}"}
        </Eq>

        <Theorem name="Conditions KKT (Karush-Kuhn-Tucker)">
          <p>
            Si <F>u</F> est minimum local et les contraintes sont qualifiees, alors
            ∃ <F>μ₁,…,μ<sub>N</sub> ∈ ℝ</F> et <F>λ₁,…,λ<sub>M</sub> ≥ 0</F> :
          </p>
          <Eq>
            J&apos;(u) + ∑<sub>i</sub> μ<sub>i</sub> G&apos;<sub>i</sub>(u) + ∑<sub>i</sub> λ<sub>i</sub> F&apos;<sub>i</sub>(u) = 0
          </Eq>
          <Eq>
            λ<sub>i</sub> ≥ 0, &nbsp; F<sub>i</sub>(u) ≤ 0, &nbsp; λ<sub>i</sub> · F<sub>i</sub>(u) = 0 &nbsp; ∀i
          </Eq>
          <Hypotheses
            items={[
              "J, G, F differentiables au voisinage de u",
              "Qualification : (G'ᵢ(u)) ∪ (F'ᵢ(u))_{i∈I(u)} forment une famille libre",
              "I(u) = {i : Fᵢ(u) = 0} = contraintes actives",
            ]}
          />
        </Theorem>

        <KeyConcept title="Complementarite : λᵢ Fᵢ(u) = 0">
          <p>
            • <F>F<sub>i</sub>(u) {"<"} 0</F> (contrainte inactive) ⟹ <F>λ<sub>i</sub> = 0</F>
            <br />• <F>λ<sub>i</sub> {">"} 0</F> ⟹ <F>F<sub>i</sub>(u) = 0</F> (contrainte active)
          </p>
          <p>Seules les <strong>contraintes actives</strong> comptent.</p>
        </KeyConcept>

        <Def title="Point selle">
          <p>
            <F>(u, p)</F> est un <strong>point selle</strong> de <F>ℒ</F> sur <F>V × P</F> si :
          </p>
          <Eq>
            ∀q ∈ P : &nbsp; ℒ(u, q) ≤ ℒ(u, p) ≤ ℒ(v, p) &nbsp; ∀v ∈ V
          </Eq>
          <p>On minimise en <F>v</F> et on maximise en <F>q</F>.</p>
        </Def>

        <Remark>
          <p>
            Si toutes les contraintes <F>F<sub>i</sub></F> sont <strong>affines</strong>,
            la qualification est automatique.
          </p>
        </Remark>

        <Quiz
          question="Si λᵢ > 0 pour une contrainte d'inegalite, que deduit-on ?"
          options={[
            "La contrainte est inactive",
            "La contrainte est active : Fᵢ(u) = 0",
            "Le probleme n'a pas de solution",
            "J est necessairement convexe",
          ]}
          answer={1}
          explanation="Complementarite : λᵢ · Fᵢ(u) = 0. Si λᵢ > 0, alors Fᵢ(u) = 0."
        />
      </Section>

      {/* ============================================================ */}
      {/* 8. ALGORITHME DU GRADIENT                                    */}
      {/* ============================================================ */}
      <Section id="gradient" number="08" title="Algorithme du gradient">
        <Def title="Gradient a pas fixe">
          <p>Initialisation <F>u⁰ ∈ V</F>. Iterations :</p>
          <Eq>u<sup>n+1</sup> = u<sup>n</sup> − μ J&apos;(u<sup>n</sup>)</Eq>
          <p>ou <F>μ {">"} 0</F> est le <strong>pas de descente</strong> fixe.</p>
        </Def>

        <Theorem name="Convergence du gradient a pas fixe">
          <p>Hypotheses : <F>J</F> est α-convexe et <F>J&apos;</F> est L-Lipschitz.</p>
          <p>Alors pour <F>0 {"<"} μ {"<"} 2α/L²</F>, l&apos;algorithme converge :</p>
          <Eq>
            ‖u<sup>n</sup> − u‖ ≤ γ<sup>n</sup> ‖u⁰ − u‖ &nbsp; avec &nbsp;
            γ = √(1 − α²/L²) {"<"} 1
          </Eq>
          <Hypotheses
            items={[
              "J est α-convexe (fortement convexe, α > 0)",
              "J' est L-Lipschitz : ‖J'(v) − J'(w)‖ ≤ L‖v − w‖",
              "Le pas verifie 0 < μ < 2α/L²",
            ]}
          />
        </Theorem>

        <KeyConcept title="Interpretation de α et L">
          <p>
            Pour <F>J(u) = ½ Au·u − b·u</F> avec <F>A</F> SDP de valeurs propres{" "}
            <F>0 {"<"} λ₁ ≤ … ≤ λ<sub>N</sub></F> :
          </p>
          <Eq>α = λ₁ &nbsp;&nbsp; et &nbsp;&nbsp; L = λ<sub>N</sub></Eq>
          <p>
            Le rapport <F>κ = L/α</F> est le <strong>conditionnement</strong>. Plus il est
            grand, plus la convergence est lente.
          </p>
        </KeyConcept>

        <Theorem name="Pas et vitesse optimaux">
          <Eq>
            μ<sub>opt</sub> = <Frac n="2" d="L + α" /> &nbsp;&nbsp;⟹&nbsp;&nbsp;
            γ<sub>opt</sub> = <Frac n="L − α" d="L + α" /> = <Frac n="κ − 1" d="κ + 1" />
          </Eq>
          <p>C&apos;est le mieux possible pour le gradient a pas fixe.</p>
        </Theorem>

        <Remark>
          <p>
            Convergence <strong>lineaire</strong> (= geometrique) car{" "}
            <F>log ‖u<sup>n</sup> − u‖</F> decroit lineairement en <F>n</F>.
          </p>
        </Remark>

        <Quiz
          question="Pour J(u) = ½Au·u − b·u avec A SDP, quel est le pas optimal ?"
          options={[
            "μ = 1/L",
            "μ = 1/α",
            "μ = 2/(L + α)",
            "μ = α/L²",
          ]}
          answer={2}
          explanation="Le pas optimal est μ = 2/(L + α) = 2/(λ_N + λ₁), donnant γ = (L−α)/(L+α)."
        />
      </Section>

      {/* ============================================================ */}
      {/* 9. ALGORITHME DE NEWTON                                      */}
      {/* ============================================================ */}
      <Section id="newton" number="09" title="Algorithme de Newton">
        <p>
          Algorithme d&apos;<strong>ordre 2</strong> utilisant la hessienne.
          Converge beaucoup plus vite, mais <strong>seulement pres de la solution</strong>.
        </p>

        <Def title="Algorithme de Newton">
          <p>A chaque iteration, on minimise l&apos;approximation quadratique :</p>
          <Eq>
            u<sup>n+1</sup> = u<sup>n</sup> − (J&apos;&apos;(u<sup>n</sup>))<sup>−1</sup> J&apos;(u<sup>n</sup>)
          </Eq>
          <p>
            C&apos;est une recherche de zero de <F>J&apos;</F> (Newton sur <F>F = J&apos;</F>).
          </p>
        </Def>

        <Theorem name="Convergence quadratique">
          <p>
            Soit <F>F</F> de classe C², <F>u</F> un zero regulier (<F>F(u) = 0</F>,{" "}
            <F>F&apos;(u)</F> inversible). Si <F>‖u⁰ − u‖ ≤ ε</F> :
          </p>
          <Eq>
            ‖u<sup>n+1</sup> − u‖ ≤ C ‖u<sup>n</sup> − u‖²
          </Eq>
          <Eq>
            ‖u<sup>n</sup> − u‖ ≤ C<sup>−1</sup>(Cε)<sup>2<sup>n</sup></sup> → 0
          </Eq>
          <Hypotheses
            items={[
              "F est de classe C² (J de classe C³)",
              "u est un zero regulier : F(u) = 0 et F'(u) inversible",
              "Initialisation proche : ‖u⁰ − u‖ ≤ ε (convergence LOCALE)",
            ]}
          />
        </Theorem>

        <Proof title="Preuve (convergence quadratique)">
          <p>
            Taylor avec reste exact : <F>F(u) = F(u<sup>n</sup>) + F&apos;(u<sup>n</sup>)(u − u<sup>n</sup>) + H<sup>n</sup>·(u − u<sup>n</sup>)</F> avec{" "}
            <F>H<sup>n</sup> = ∫₀¹ F&apos;&apos;(u<sup>n</sup> + s(u−u<sup>n</sup>))(1−s) ds</F>.
          </p>
          <p>
            Comme <F>F(u) = 0</F> :{" "}
            <F>u<sup>n+1</sup> − u = (F&apos;(u<sup>n</sup>))<sup>−1</sup> H<sup>n</sup>(u<sup>n</sup> − u)</F>,
            d&apos;ou <F>‖u<sup>n+1</sup> − u‖ ≤ C‖u<sup>n</sup> − u‖²</F> avec{" "}
            <F>C = ½ C₁C₂</F>.
          </p>
        </Proof>

        <Warning>
          <p>
            Newton ne converge que si <F>u⁰</F> est <strong>proche</strong> de la solution !
          </p>
        </Warning>

        <KeyConcept title="Newton hybride">
          <p>On ajoute un facteur d&apos;amortissement <F>0 {"<"} μ ≤ 1</F> :</p>
          <Eq>
            u<sup>n+1</sup> = u<sup>n</sup> − μ (J&apos;&apos;(u<sup>n</sup>))<sup>−1</sup> J&apos;(u<sup>n</sup>)
          </Eq>
          <p>
            On demarre avec <F>μ</F> petit (sûr), puis on augmente vers 1 (quadratique).
          </p>
        </KeyConcept>

        <Def title="Gauss-Newton (moindres carres)">
          <p>Pour <F>min ‖F(u)‖²</F> avec <F>F : ℝ<sup>N</sup> → ℝ<sup>M</sup></F> :</p>
          <Eq>
            u<sup>n+1</sup> = u<sup>n</sup> − (F&apos;<sup>*</sup>F&apos;)<sup>−1</sup> F&apos;<sup>*</sup>F(u<sup>n</sup>)
          </Eq>
          <p>Si <F>N = M</F>, on retrouve Newton classique.</p>
        </Def>

        <Quiz
          question="La convergence de Newton est..."
          options={[
            "Lineaire (comme le gradient)",
            "Quadratique (erreur au carre a chaque iteration)",
            "Cubique",
            "Exponentielle",
          ]}
          answer={1}
          explanation="Newton a une convergence quadratique : ‖uⁿ⁺¹ − u‖ ≤ C‖uⁿ − u‖². Le nombre de chiffres significatifs double a chaque iteration."
        />
      </Section>

      {/* ============================================================ */}
      {/* 10. ACCELERATION                                              */}
      {/* ============================================================ */}
      <Section id="acceleration" number="10" title="Acceleration des algorithmes d'ordre 1">
        <p>
          Peut-on converger plus vite sans calculer la hessienne ? <strong>Oui !</strong>
        </p>

        <Def title="Algorithme de Nesterov">
          <p>Avec variable auxiliaire (momentum) :</p>
          <Eq>v<sup>n+1</sup> = u<sup>n</sup> − μ J&apos;(u<sup>n</sup>)</Eq>
          <Eq>u<sup>n+1</sup> = v<sup>n+1</sup> + β(v<sup>n+1</sup> − v<sup>n</sup>)</Eq>
        </Def>

        <Def title="Boule pesante (heavy ball)">
          <Eq>
            u<sup>n+1</sup> = u<sup>n</sup> − μ J&apos;(u<sup>n</sup>) + β(u<sup>n</sup> − u<sup>n−1</sup>)
          </Eq>
          <p>La direction precedente sert d&apos;inertie.</p>
        </Def>

        <Def title="Gradient conjugue">
          <p>
            <strong>Idee :</strong> au lieu de descendre selon <F>−J&apos;(u<sup>n</sup>)</F>,
            on choisit une direction <F>d<sup>n</sup></F> conjuguee aux precedentes
            par rapport a la hessienne.
          </p>
          <Eq>
            u<sup>n+1</sup> = u<sup>n</sup> + ρ<sub>n</sub> d<sup>n</sup>
          </Eq>
          <p>
            avec <F>ρ<sub>n</sub></F> le pas optimal dans la direction <F>d<sup>n</sup></F>, et :
          </p>
          <Eq>
            d⁰ = −J&apos;(u⁰), &nbsp;&nbsp;
            d<sup>n+1</sup> = −J&apos;(u<sup>n+1</sup>) + β<sub>n</sub> d<sup>n</sup>
          </Eq>
          <p>
            ou <F>β<sub>n</sub></F> est choisi pour que{" "}
            <F>⟨d<sup>i</sup>, J&apos;&apos;(u) d<sup>j</sup>⟩ = 0</F> si <F>i ≠ j</F>{" "}
            (<strong>conjugaison</strong>).
          </p>
          <p>
            <strong>Propriete remarquable :</strong> pour <F>J(u) = ½Au·u − b·u</F>{" "}
            quadratique en dim <F>N</F>, l&apos;algorithme converge en{" "}
            <strong>au plus N iterations</strong> (exact !). Pas besoin de la hessienne.
          </p>
        </Def>

        <Theorem name="Vitesse amelioree">
          <p>Pour <F>α/L ≪ 1</F> (mal conditionne), ces 3 algorithmes ont :</p>
          <Eq>
            γ<sub>accelere</sub> = 1 − O(√(α/L))
            &nbsp;&nbsp; vs &nbsp;&nbsp;
            γ<sub>gradient</sub> = 1 − O(α/L)
          </Eq>
          <p>
            Comme <F>√(α/L) ≫ α/L</F> pour <F>α/L</F> petit,
            l&apos;amelioration est <strong>considerable</strong>.
          </p>
        </Theorem>

        <ComparisonTable
          headers={["Algorithme", "Ordre", "Vitesse γ", "Cout / iteration"]}
          rows={[
            ["Gradient pas fixe", "1", "(L−α)/(L+α) ≈ 1 − 2α/L", "1 gradient"],
            ["Nesterov / Boule pesante", "1", "(√L−√α)/(√L+√α) ≈ 1 − 2√(α/L)", "1 gradient + memoire"],
            ["Gradient conjugue", "1", "≈ 1 − 2√(α/L)", "1 gradient + 1 direction"],
            ["Newton", "2", "Quadratique", "1 gradient + 1 hessienne + 1 syst. lin."],
          ]}
        />

        <Warning>
          <p>
            <strong>Limitation :</strong> les constantes <F>α</F> et <F>L</F> ne sont pas
            connues en general. Il faut les estimer ou utiliser une line search.
          </p>
        </Warning>

        <KeyConcept title="Comment choisir ?">
          <p>
            • Bien conditionne (κ petit) : <strong>gradient</strong> suffit
            <br />• Mal conditionne (κ grand) : <strong>Nesterov</strong> ou <strong>gradient conjugue</strong>
            <br />• Dim faible, hessienne calculable : <strong>Newton</strong>
            <br />• Moindres carres non-lineaires : <strong>Gauss-Newton</strong>
          </p>
        </KeyConcept>

        <Quiz
          question="Nesterov converge avec γ = 1 − O(√(α/L)). C'est mieux que le gradient (γ = 1 − O(α/L)) car..."
          options={[
            "√(α/L) < α/L pour α/L petit",
            "√(α/L) > α/L pour α/L < 1, donc on retranche plus",
            "Nesterov utilise la hessienne",
            "Nesterov ne fonctionne qu'en dim finie",
          ]}
          answer={1}
          explanation="Pour α/L < 1, √(α/L) > α/L. Donc 1 − c√(α/L) < 1 − c(α/L), γ plus petit. Nesterov n'utilise PAS la hessienne."
        />
      </Section>
    </>
  );
}
