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
import {
  SvgDiagram,
  Box,
  Circle,
  Arrow,
  Label,
  GroupBox,
} from "@/components/svg-diagrams";

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

        <SvgDiagram width={700} height={320} title="Effet du conditionnement sur la descente de gradient">
          {/* Left: good conditioning */}
          <GroupBox x={15} y={25} w={320} h={280} label="Bon conditionnement (κ ≈ 1)" color="accent" />
          {/* Circular contour lines */}
          <ellipse cx={175} cy={175} rx={120} ry={110} fill="none" stroke="#10b98133" strokeWidth={1} />
          <ellipse cx={175} cy={175} rx={80} ry={73} fill="none" stroke="#10b98133" strokeWidth={1} />
          <ellipse cx={175} cy={175} rx={40} ry={37} fill="none" stroke="#10b98133" strokeWidth={1} />
          {/* Iterates — direct path */}
          <Circle cx={65} cy={85} r={8} label="0" color="accent" />
          <Arrow x1={73} y1={93} x2={108} y2={118} color="#10b981" />
          <Circle cx={115} cy={125} r={8} label="1" color="accent" />
          <Arrow x1={123} y1={133} x2={143} y2={148} color="#10b981" />
          <Circle cx={150} cy={155} r={8} label="2" color="accent" />
          <Arrow x1={158} y1={163} x2={168} y2={168} color="#10b981" />
          <Circle cx={175} cy={175} r={8} label="u*" color="accent" />
          <Label x={175} y={275} text="Convergence rapide, directe" size={10} color="#10b981" />

          {/* Right: bad conditioning */}
          <GroupBox x={365} y={25} w={320} h={280} label="Mauvais conditionnement (κ >> 1)" color="rose" />
          {/* Elongated elliptic contours */}
          <ellipse cx={525} cy={175} rx={135} ry={40} fill="none" stroke="#f43f5e33" strokeWidth={1} transform="rotate(-25 525 175)" />
          <ellipse cx={525} cy={175} rx={90} ry={27} fill="none" stroke="#f43f5e33" strokeWidth={1} transform="rotate(-25 525 175)" />
          <ellipse cx={525} cy={175} rx={45} ry={13} fill="none" stroke="#f43f5e33" strokeWidth={1} transform="rotate(-25 525 175)" />
          {/* Iterates — zigzag path */}
          <Circle cx={420} cy={110} r={8} label="0" color="rose" />
          <Arrow x1={428} y1={118} x2={478} y2={218} color="#f43f5e" />
          <Circle cx={483} cy={225} r={8} label="1" color="rose" />
          <Arrow x1={491} y1={217} x2={500} y2={148} color="#f43f5e" />
          <Circle cx={505} cy={140} r={8} label="2" color="rose" />
          <Arrow x1={513} y1={148} x2={518} y2={198} color="#f43f5e" />
          <Circle cx={520} cy={205} r={8} label="3" color="rose" />
          <Arrow x1={525} y1={197} x2={523} y2={183} color="#f43f5e" />
          <Circle cx={525} cy={175} r={8} label="u*" color="rose" />
          <Label x={525} y={275} text="Zigzag, convergence lente" size={10} color="#f43f5e" />
        </SvgDiagram>
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

        <SvgDiagram width={600} height={380} title="Convergence lineaire (gradient) vs quadratique (Newton)">
          {/* Left column: Gradient — many iterations */}
          <GroupBox x={30} y={25} w={220} h={340} label="Gradient (lineaire)" color="violet" />
          <Label x={140} y={50} text="erreur = 0.5" size={10} color="#a1a1aa" />
          <Box x={60} y={58} w={160} h={28} label="iter 1" sublabel="err = 0.25" color="violet" />
          <Arrow x1={140} y1={86} x2={140} y2={95} color="#8b5cf6" />
          <Box x={60} y={95} w={160} h={28} label="iter 2" sublabel="err = 0.125" color="violet" />
          <Arrow x1={140} y1={123} x2={140} y2={132} color="#8b5cf6" />
          <Box x={60} y={132} w={160} h={28} label="iter 3" sublabel="err = 0.063" color="violet" />
          <Arrow x1={140} y1={160} x2={140} y2={169} color="#8b5cf6" />
          <Box x={60} y={169} w={160} h={28} label="iter 4" sublabel="err = 0.031" color="violet" />
          <Arrow x1={140} y1={197} x2={140} y2={206} color="#8b5cf6" />
          <Box x={60} y={206} w={160} h={28} label="iter 5" sublabel="err = 0.016" color="violet" />
          <Arrow x1={140} y1={234} x2={140} y2={243} color="#8b5cf6" />
          <Box x={60} y={243} w={160} h={28} label="iter 6" sublabel="err = 0.008" color="violet" />
          <Arrow x1={140} y1={271} x2={140} y2={280} color="#8b5cf6" />
          <Box x={60} y={280} w={160} h={28} label="..." sublabel="encore ~10 iter" color="violet" />
          <Label x={140} y={325} text="γ = (κ-1)/(κ+1)" size={10} color="#8b5cf6" />
          <Label x={140} y={340} text="~20 iterations" size={11} color="#8b5cf6" weight="bold" />

          {/* Right column: Newton — few iterations */}
          <GroupBox x={310} y={25} w={260} h={340} label="Newton (quadratique)" color="accent" />
          <Label x={440} y={50} text="erreur = 0.5" size={10} color="#a1a1aa" />
          <Box x={340} y={58} w={200} h={34} label="iter 1" sublabel="err = 0.25" color="accent" />
          <Arrow x1={440} y1={92} x2={440} y2={105} color="#10b981" />
          <Box x={340} y={105} w={200} h={34} label="iter 2" sublabel="err = 0.0625" color="accent" />
          <Arrow x1={440} y1={139} x2={440} y2={152} color="#10b981" />
          <Box x={340} y={152} w={200} h={34} label="iter 3" sublabel="err = 0.0039" color="accent" />
          <Arrow x1={440} y1={186} x2={440} y2={199} color="#10b981" />
          <Box x={340} y={199} w={200} h={34} label="iter 4" sublabel="err = 1.5e-5" color="accent" />
          <Arrow x1={440} y1={233} x2={440} y2={246} color="#10b981" />
          <Box x={340} y={246} w={200} h={34} label="iter 5" sublabel="err ≈ 0" color="accent" />
          <Label x={440} y={310} text="‖e_n+1‖ ≤ C‖e_n‖²" size={10} color="#10b981" />
          <Label x={440} y={325} text="Chiffres significatifs" size={10} color="#10b981" />
          <Label x={440} y={340} text="doublent a chaque iter" size={11} color="#10b981" weight="bold" />
        </SvgDiagram>
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

        <SvgDiagram width={700} height={340} title="Effet du momentum : 3 trajectoires de l'init vers l'optimum">
          {/* Column labels */}
          <Label x={120} y={22} text="Gradient simple" size={12} color="#f43f5e" weight="bold" />
          <Label x={350} y={22} text="Boule pesante" size={12} color="#f59e0b" weight="bold" />
          <Label x={580} y={22} text="Nesterov" size={12} color="#10b981" weight="bold" />

          {/* Shared start / end labels */}
          <Label x={30} y={55} text="start" size={10} color="#a1a1aa" anchor="start" />
          <Label x={30} y={295} text="u*" size={12} color="#e4e4e7" anchor="start" weight="bold" />

          {/* --- Path 1: plain gradient — zigzag --- */}
          <Circle cx={120} cy={55} r={7} label="" color="rose" />
          <Arrow x1={120} y1={62} x2={155} y2={95} color="#f43f5e" />
          <Arrow x1={155} y1={95} x2={90} y2={125} color="#f43f5e" />
          <Arrow x1={90} y1={125} x2={145} y2={155} color="#f43f5e" />
          <Arrow x1={145} y1={155} x2={100} y2={185} color="#f43f5e" />
          <Arrow x1={100} y1={185} x2={135} y2={215} color="#f43f5e" />
          <Arrow x1={135} y1={215} x2={110} y2={245} color="#f43f5e" />
          <Arrow x1={110} y1={245} x2={125} y2={275} color="#f43f5e" />
          <Arrow x1={125} y1={275} x2={120} y2={295} color="#f43f5e" />
          <Circle cx={120} cy={295} r={7} label="" color="rose" />
          <Label x={120} y={320} text="Zigzag, lent" size={10} color="#f43f5e" />

          {/* --- Path 2: heavy ball — smoother oscillation --- */}
          <Circle cx={350} cy={55} r={7} label="" color="amber" />
          <Arrow x1={350} y1={62} x2={370} y2={105} color="#f59e0b" />
          <Arrow x1={370} y1={105} x2={338} y2={150} color="#f59e0b" />
          <Arrow x1={338} y1={150} x2={358} y2={200} color="#f59e0b" />
          <Arrow x1={358} y1={200} x2={345} y2={250} color="#f59e0b" />
          <Arrow x1={345} y1={250} x2={350} y2={295} color="#f59e0b" />
          <Circle cx={350} cy={295} r={7} label="" color="amber" />
          <Label x={350} y={320} text="Inertie amortit" size={10} color="#f59e0b" />

          {/* --- Path 3: Nesterov — look-ahead, smooth --- */}
          <Circle cx={580} cy={55} r={7} label="" color="accent" />
          {/* Look-ahead step (dashed) */}
          <Arrow x1={580} y1={62} x2={590} y2={110} color="#10b98166" dashed />
          <Label x={605} y={90} text="look" size={9} color="#10b98199" anchor="start" />
          <Label x={605} y={102} text="ahead" size={9} color="#10b98199" anchor="start" />
          {/* Corrected step */}
          <Arrow x1={590} y1={110} x2={578} y2={165} color="#10b981" />
          <Arrow x1={578} y1={165} x2={582} y2={225} color="#10b981" />
          <Arrow x1={582} y1={225} x2={580} y2={295} color="#10b981" />
          <Circle cx={580} cy={295} r={7} label="" color="accent" />
          <Label x={580} y={320} text="Direct, rapide" size={10} color="#10b981" />
        </SvgDiagram>

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

      {/* ============================================================ */}
      {/* AMPHI 5 — ALGORITHMES SOUS CONTRAINTES                      */}
      {/* ============================================================ */}

      <Section id="gradient-projete" number="11" title="Gradient projeté">
        <p>
          On passe maintenant a l&apos;optimisation <strong>sous contraintes</strong>.
          Soit <F>K</F> un convexe ferme non vide de <F>V</F>. On veut resoudre :
        </p>
        <Eq>
          inf<Sub sub="v ∈ K"><F> </F></Sub> <F>J(v)</F>
        </Eq>

        <Def title="Projection orthogonale">
          <p>
            Soit <F>K ⊂ V</F> convexe ferme non vide. Pour tout <F>x ∈ V</F>, il existe
            un unique <Sub sub="K"><F>x</F></Sub> ∈ <F>K</F> tel que :
          </p>
          <Eq>
            ‖x − <Sub sub="K"><F>x</F></Sub>‖ = min<Sub sub="y ∈ K"><F> </F></Sub> ‖x − y‖
          </Eq>
          <p>
            On note <Sub sub="K"><F>P</F></Sub>(x) = <Sub sub="K"><F>x</F></Sub> l&apos;operateur
            de projection orthogonale. Propriete de caracterisation :
          </p>
          <Eq>
            <Sub sub="K"><F>x</F></Sub> ∈ K, ⟨<Sub sub="K"><F>x</F></Sub> − x, <Sub sub="K"><F>x</F></Sub> − y⟩ ≤ 0 ∀y ∈ K
          </Eq>
        </Def>

        <p>L&apos;algorithme du gradient projete :</p>
        <Eq>
          <Sup sup="n+1"><F>u</F></Sup> = <Sub sub="K"><F>P</F></Sub>(<Sup sup="n"><F>u</F></Sup> − μ J&apos;(<Sup sup="n"><F>u</F></Sup>))
        </Eq>
        <p>
          On fait un pas de gradient classique, puis on projette sur <F>K</F>.
        </p>

        <SvgDiagram width={600} height={200} title="Gradient projete">
          <GroupBox x={180} y={30} w={200} h={140} label="K (convexe)" color="accent" />
          <Circle cx={130} cy={120} r={8} label="" color="default" />
          <Label x={100} y={120} text="uⁿ − μJ'(uⁿ)" size={10} anchor="end" />
          <Arrow x1={138} y1={118} x2={228} y2={98} label="projection" />
          <Circle cx={240} cy={95} r={8} label="" color="accent" />
          <Label x={260} y={85} text="uⁿ⁺¹ = Pₖ(...)" size={10} anchor="start" color="#10b981" />
          <Circle cx={300} cy={120} r={6} label="" color="violet" />
          <Label x={320} y={120} text="u (minimum)" size={10} anchor="start" color="#8b5cf6" />
        </SvgDiagram>

        <Theorem title="Convergence du gradient projeté">
          <p>
            Si <F>J</F> est α-convexe (α &gt; 0) et <F>J&apos;</F> est L-Lipschitz, alors
            pour 0 &lt; μ &lt; 2α/L², l&apos;algorithme converge.
          </p>
          <p>
            La preuve repose sur le fait que <F>P</F><Sub sub="K"><F> </F></Sub> est
            faiblement contractant (‖P<Sub sub="K"><F> </F></Sub>v − P<Sub sub="K"><F> </F></Sub>w‖ ≤ ‖v − w‖)
            et que v → v − μJ&apos;(v) est strictement contractant sous la condition sur μ.
          </p>
        </Theorem>

        <Warning>
          <p>
            Le gradient projete est un algorithme <strong>faisable</strong> : les iterees <Sup sup="n"><F>u</F></Sup> restent
            dans <F>K</F> a chaque etape. Mais il faut savoir calculer <Sub sub="K"><F>P</F></Sub>, ce qui
            peut etre tres difficile en pratique pour des convexes compliques.
          </p>
        </Warning>

        <Remark>
          <p>
            <strong>Exemples ou P<Sub sub="K"><F> </F></Sub> est facile :</strong> si K est un
            produit d&apos;intervalles [a<Sub sub="i"><F> </F></Sub>, b<Sub sub="i"><F> </F></Sub>],
            la projection est un simple clamp coordonnee par coordonnee. Si K = {"{"}x : Bx = c{"}"} (contrainte
            lineaire d&apos;egalite), P<Sub sub="K"><F> </F></Sub>(x) = x + B*(BB*)⁻¹(c − Bx).
          </p>
        </Remark>
      </Section>

      <Section id="uzawa" number="12" title="Algorithme d'Uzawa">
        <p>
          Quand <Sub sub="K"><F>P</F></Sub> est difficile a calculer, on passe a des algorithmes
          <strong>infaisables</strong> : les iterees ne restent pas dans <F>K</F>, mais convergent
          vers une limite qui, elle, est dans <F>K</F>.
        </p>

        <p>
          L&apos;algorithme d&apos;Uzawa s&apos;applique au probleme :
        </p>
        <Eq>
          min<Sub sub="F(v) ≤ 0"><F> </F></Sub> J(v)
        </Eq>
        <p>
          Il recherche un <strong>point selle</strong> du
          Lagrangien L(v, q) = J(v) + q · F(v) — c&apos;est-a-dire un point (u, p) ou
          L(u, q) ≤ L(u, p) ≤ L(v, p) pour tout v et tout q ≥ 0.
        </p>

        <KeyConcept title="Idee : alterner minimisation et maximisation">
          <p>
            A <F>q</F> fixe, on <strong>minimise</strong> en <F>v</F> (descente sur J + qF).
            A <F>v</F> fixe, on <strong>maximise</strong> en <F>q</F> (montee de gradient sur le dual).
            On itere.
          </p>
        </KeyConcept>

        <Def title="Algorithme d'Uzawa">
          <p>
            Initialisation : <Sup sup="0"><F>p</F></Sup> ∈ (ℝ₊)<Sup sup="M"><F> </F></Sup>. Pour n ≥ 0 :
          </p>
          <Eq>
            L(<Sup sup="n"><F>u</F></Sup>, <Sup sup="n"><F>p</F></Sup>) = inf<Sub sub="v ∈ V"><F> </F></Sub> L(v, <Sup sup="n"><F>p</F></Sup>)
          </Eq>
          <Eq>
            <Sup sup="n+1"><F>p</F></Sup> = P<Sub sub="ℝ₊ᴹ"><F> </F></Sub>(<Sup sup="n"><F>p</F></Sup> + μF(<Sup sup="n"><F>u</F></Sup>))
          </Eq>
          <p>avec μ &gt; 0 fixe.</p>
        </Def>

        <SvgDiagram width={650} height={200} title="Algorithme d'Uzawa — alternance min/max">
          <Box x={20} y={70} w={140} h={55} label="Min en v" sublabel="L(v, pⁿ)" color="accent" />
          <Arrow x1={160} y1={97} x2={230} y2={97} label="uⁿ" />
          <Box x={230} y={70} w={180} h={55} label="Max en q" sublabel="pⁿ⁺¹ = P(pⁿ + μF(uⁿ))" color="violet" />
          <Arrow x1={410} y1={97} x2={480} y2={97} />
          <Box x={480} y={70} w={140} h={55} label="Convergé ?" sublabel="F(uⁿ) ≤ 0 ?" color="amber" />
          <Arrow x1={550} y1={125} x2={550} y2={160} label="non" dashed />
          <Arrow x1={480} y1={160} x2={90} y2={160} />
          <Arrow x1={90} y1={160} x2={90} y2={125} />
        </SvgDiagram>

        <Theorem title="Convergence d'Uzawa">
          <p>
            Si <F>J</F> est α-convexe differentiable, <F>F</F> convexe et L-Lipschitz,
            que les contraintes sont qualifiees, et 0 &lt; μ &lt; 2α/L²,
            alors pour tout <Sup sup="0"><F>p</F></Sup> ∈ (ℝ₊)<Sup sup="M"><F> </F></Sup>,
            la suite (<Sup sup="n"><F>u</F></Sup>) converge vers le minimum <F>u</F>.
          </p>
        </Theorem>

        <Remark>
          <p>
            <strong>Lien avec la dualite :</strong> Uzawa est en fait le gradient projete
            applique au probleme dual ! La fonction duale est G(p) = inf<Sub sub="v"><F> </F></Sub> L(v, p),
            et la mise a jour de p est exactement p<Sup sup="n+1"><F> </F></Sup> = P<Sub sub="ℝ₊ᴹ"><F> </F></Sub>(p<Sup sup="n"><F> </F></Sup> + μG&apos;(p<Sup sup="n"><F> </F></Sup>)) avec G&apos;(p) = F(v(p)).
          </p>
        </Remark>

        <p>
          <strong>Variante Arrow-Hurwicz :</strong> au lieu de minimiser exactement en <F>v</F>,
          on fait un seul pas de gradient. Moins precis par iteration, mais beaucoup moins cher.
        </p>
      </Section>

      <Section id="penalisation" number="13" title="Pénalisation des contraintes">
        <p>
          Idee radicalement differente : au lieu de respecter les contraintes, on les
          <strong>penalise</strong> dans la fonction objectif.
        </p>

        <Def title="Penalisation exterieure">
          <p>On remplace le probleme contraint (P) par le probleme sans contrainte :</p>
          <Eq>
            (P<Sub sub="ε"><F> </F></Sub>) : inf<Sub sub="v ∈ ℝᴺ"><F> </F></Sub> J(v) + <Frac n="1" d="ε" /> <Sup sup="M"><F>∑</F></Sup><Sub sub="i=1"><F> </F></Sub> [max(F<Sub sub="i"><F> </F></Sub>(v), 0)]²
          </Eq>
          <p>
            avec ε &gt; 0 petit. La penalite est nulle quand les contraintes sont satisfaites,
            et explose quand elles sont violees.
          </p>
        </Def>

        <Proposition title="Convergence de la penalisation">
          <p>
            Si <F>J</F> est continue, strictement convexe, coercive, et <F>F</F> est convexe continue,
            avec K = {"{"}F(v) ≤ 0{"}"} non vide, alors quand ε → 0, les solutions <Sub sub="ε"><F>u</F></Sub>
            du probleme penalise convergent vers la solution <F>u</F> du probleme contraint.
          </p>
        </Proposition>

        <ComparisonTable
          headers={["", "Penalisation exterieure", "Penalisation interieure (barriere)"]}
          rows={[
            ["Formule", "J(v) + (1/ε) Σ [max(Fᵢ,0)]²", "J(v) − ε Σ 1/Fᵢ(v)"],
            ["Faisable ?", "Non (iterees hors de K)", "Oui (iterees dans K)"],
            ["Initialisation", "Quelconque", "Doit verifier F(v⁰) < 0"],
            ["Avantage", "Tres facile a mettre en oeuvre", "Algorithme faisable"],
            ["Probleme", "Mauvais conditionnement quand ε → 0", "Doit rester strictement dans K"],
          ]}
        />

        <Warning>
          <p>
            Le mauvais conditionnement est le defaut principal de la penalisation :
            quand ε → 0, la hessienne du probleme penalise explose. En pratique,
            on utilise une <strong>methode de continuation</strong> : on diminue ε progressivement.
          </p>
        </Warning>
      </Section>

      <Section id="lagrangien-augmente" number="14" title="Lagrangien augmenté">
        <p>
          Le Lagrangien augmente combine les avantages de la penalisation (facile a implementer)
          et d&apos;Uzawa (convergence sans ε → 0).
        </p>

        <Def title="Lagrangien augmente">
          <p>
            Pour des contraintes d&apos;egalite F(v) = 0, on definit :
          </p>
          <Eq>
            L<Sub sub="aug"><F> </F></Sub>(v, λ, μ) = J(v) + λ · F(v) + <Frac n="μ" d="2" /> ‖F(v)‖²
          </Eq>
          <p>
            ou λ est un multiplicateur de Lagrange et μ &gt; 0 un parametre de penalisation.
          </p>
        </Def>

        <p><strong>Algorithme :</strong></p>
        <Eq>
          <Sup sup="n"><F>v</F></Sup> = argmin<Sub sub="v"><F> </F></Sub> L<Sub sub="aug"><F> </F></Sub>(v, <Sup sup="n"><F>λ</F></Sup>, μ)
        </Eq>
        <Eq>
          <Sup sup="n+1"><F>λ</F></Sup> = <Sup sup="n"><F>λ</F></Sup> + μF(<Sup sup="n"><F>v</F></Sup>)
        </Eq>
        <p>
          De temps en temps, on peut augmenter μ pour accelerer la convergence.
        </p>

        <Remark>
          <p>
            Ca ressemble a Uzawa mais avec le terme de penalisation μ/2 ‖F(v)‖² en plus.
            Ca ressemble a la penalisation mais avec la mise a jour du multiplicateur λ.
            Le Lagrangien augmente converge <strong>sans avoir besoin de μ → ∞</strong>,
            ce qui evite les problemes de conditionnement.
          </p>
        </Remark>
      </Section>

      <Section id="sqp" number="15" title="Approximations successives — SLP & SQP">
        <p>
          Quand <F>J</F> et <F>F</F> n&apos;ont pas de proprietes particulieres, on les
          remplace par des approximations de Taylor locales et on itere.
        </p>

        <KeyConcept title="SLP — Programmation lineaire sequentielle">
          <p>
            On linearise <F>J</F> et <F>F</F> (Taylor ordre 1) autour du point courant v<Sup sup="n"><F> </F></Sup> :
          </p>
          <Eq>
            inf {"{"}J(v<Sup sup="n"><F> </F></Sup>) + J&apos;(v<Sup sup="n"><F> </F></Sup>) · (v − v<Sup sup="n"><F> </F></Sup>){"}"} sous F(v<Sup sup="n"><F> </F></Sup>) + F&apos;(v<Sup sup="n"><F> </F></Sup>) · (v − v<Sup sup="n"><F> </F></Sup>) = 0
          </Eq>
          <p>
            C&apos;est un probleme lineaire — on sait le resoudre exactement (AMPL, Knitro, IpOpt).
            On rajoute une region de confiance ‖v − v<Sup sup="n"><F> </F></Sup>‖ ≤ ε pour que l&apos;approximation reste valide.
          </p>
        </KeyConcept>

        <KeyConcept title="SQP — Programmation quadratique sequentielle">
          <p>
            On garde l&apos;approximation lineaire pour <F>F</F>, mais on prend une approximation
            <strong>quadratique</strong> pour <F>J</F> — en utilisant non pas la hessienne de <F>J</F>,
            mais la <strong>hessienne du Lagrangien</strong> :
          </p>
          <Eq>
            Q<Sup sup="n"><F> </F></Sup> = J&apos;&apos;(v<Sup sup="n"><F> </F></Sup>) + λ<Sup sup="n"><F> </F></Sup> · F&apos;&apos;(v<Sup sup="n"><F> </F></Sup>)
          </Eq>
          <p>
            Pourquoi le Lagrangien ? Parce qu&apos;au point optimal avec F(v*) = 0,
            la condition d&apos;optimalite d&apos;ordre 2 porte sur J&apos;&apos; + λ*F&apos;&apos;, pas sur J&apos;&apos; seul.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["", "SLP", "SQP"]}
          rows={[
            ["Approx de J", "Ordre 1 (lineaire)", "Ordre 2 (quadratique)"],
            ["Approx de F", "Ordre 1", "Ordre 1"],
            ["Sous-probleme", "Lineaire", "Quadratique"],
            ["Convergence", "Lineaire", "Superlineaire"],
            ["Logiciels", "AMPL, simplex", "IpOpt, Knitro, SNOPT"],
          ]}
        />
      </Section>

      <Section id="retropropagation" number="16" title="Rétro-propagation et état adjoint">
        <p>
          Ce dernier chapitre montre comment la <strong>structure</strong> d&apos;un probleme
          permet de developper des algorithmes efficaces. Deux applications :
          la retro-propagation (deep learning) et la methode de l&apos;etat adjoint (controle optimal).
        </p>

        <KeyConcept title="Fonctions composees">
          <p>
            On minimise J(v) = J<Sub sub="m"><F> </F></Sub> ∘ J<Sub sub="m-1"><F> </F></Sub> ∘ ··· ∘ J<Sub sub="1"><F> </F></Sub>(v)
            — une composition de <F>m</F> fonctions differentiables. C&apos;est exactement la
            structure d&apos;un reseau de neurones profond (chaque J<Sub sub="i"><F> </F></Sub> est une couche).
          </p>
        </KeyConcept>

        <p>
          Par la regle de la chaine, la derivee directionnelle J&apos;(v) · h se calcule dans
          le <strong>meme sens</strong> que J(v) — de la premiere a la derniere couche. Cout :
          N multiplications pour <strong>une seule composante</strong> de J&apos;(v).
        </p>
        <p>
          Pour le gradient <strong>complet</strong>, il faudrait N passages — trop cher.
        </p>

        <Theorem title="Retro-propagation">
          <p>Le gradient complet se calcule par :</p>
          <Eq>
            J&apos;(v) = J&apos;<Sub sub="1"><F> </F></Sub>(v<Sub sub="1"><F> </F></Sub>)* · J&apos;<Sub sub="2"><F> </F></Sub>(v<Sub sub="2"><F> </F></Sub>)* · ··· · J&apos;<Sub sub="m"><F> </F></Sub>(v<Sub sub="m"><F> </F></Sub>)
          </Eq>
          <p>
            en partant de la <strong>derniere couche</strong> et en remontant. Comme J<Sub sub="m"><F> </F></Sub>
            arrive dans ℝ (scalaire), J&apos;<Sub sub="m"><F> </F></Sub>(v<Sub sub="m"><F> </F></Sub>) est un vecteur ligne.
            On multiplie par les transposees des jacobiennes dans l&apos;ordre decroissant.
          </p>
          <p>
            <strong>Cout : le meme que le calcul de J(v)</strong> — un seul passage arriere suffit.
          </p>
        </Theorem>

        <SvgDiagram width={650} height={180} title="Forward pass vs Backpropagation">
          <GroupBox x={20} y={15} w={290} h={70} label="Forward (calcul de J)" color="accent" />
          <Box x={40} y={35} w={50} h={35} label="J₁" color="accent" />
          <Arrow x1={90} y1={52} x2={110} y2={52} />
          <Box x={110} y={35} w={50} h={35} label="J₂" color="accent" />
          <Arrow x1={160} y1={52} x2={180} y2={52} />
          <Box x={180} y={35} w={50} h={35} label="..." color="accent" />
          <Arrow x1={230} y1={52} x2={250} y2={52} />
          <Box x={250} y={35} w={50} h={35} label="Jₘ" color="accent" />

          <GroupBox x={340} y={15} w={290} h={70} label="Backward (gradient)" color="rose" />
          <Box x={560} y={35} w={50} h={35} label="J'ₘ" color="rose" />
          <Arrow x1={560} y1={52} x2={540} y2={52} />
          <Box x={490} y={35} w={50} h={35} label="..." color="rose" />
          <Arrow x1={490} y1={52} x2={470} y2={52} />
          <Box x={420} y={35} w={50} h={35} label="J'₂" color="rose" />
          <Arrow x1={420} y1={52} x2={400} y2={52} />
          <Box x={350} y={35} w={50} h={35} label="J'₁" color="rose" />

          <Label x={170} y={120} text="v → J₁(v) → J₂(...) → J(v)" size={10} color="#10b981" />
          <Label x={500} y={120} text="J'ₘ* ← ... ← J'₁* = J'(v)" size={10} color="#f43f5e" />
          <Label x={325} y={155} text="Meme cout de calcul !" size={11} weight="bold" />
        </SvgDiagram>

        <KeyConcept title="Methode de l'etat adjoint">
          <p>
            Pour un probleme d&apos;optimisation sous contrainte de modele Ay = b(v)
            (par ex. en controle optimal, EDP), calculer le gradient par elimination
            necessite de resoudre N systemes lineaires — un par composante de v.
          </p>
          <p>
            L&apos;etat adjoint <F>p</F> solution de A*p = ∂J/∂y permet de calculer le gradient
            complet avec <strong>un seul systeme lineaire</strong> supplementaire.
          </p>
        </KeyConcept>

        <Quiz
          question="La retro-propagation calcule le gradient en..."
          options={[
            "O(N²) ou N est la dimension",
            "Le meme cout qu'un forward pass (calcul de J)",
            "O(1) quelle que soit la taille",
            "Plus cher que le forward pass d'un facteur m (nombre de couches)",
          ]}
          answer={1}
          explanation="C'est le resultat fondamental : le backward pass a le meme cout de calcul que le forward pass. C'est pour ca que le deep learning est possible — sinon entrainer un reseau de millions de parametres serait inabordable."
        />
      </Section>
    </>
  );
}
