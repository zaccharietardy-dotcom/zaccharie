"use client";

import { Section, KeyConcept, ComparisonTable } from "@/components/course-elements";
import { Card } from "@/components/ui/card";

function Th({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <Card className="my-4 border-l-2 border-l-violet-500 bg-violet-500/5 p-4">
      <p className="mb-2 text-sm font-bold text-violet-400">{name}</p>
      <div className="text-sm text-foreground/90 space-y-1.5">{children}</div>
    </Card>
  );
}

function Hyp({ items }: { items: string[] }) {
  return (
    <div className="mt-2 rounded border border-amber-500/20 bg-amber-500/5 px-3 py-2">
      <p className="text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-1">Hypotheses</p>
      <ul className="space-y-0.5">
        {items.map((h, i) => (
          <li key={i} className="text-[13px] text-muted-foreground flex gap-1.5">
            <span className="text-amber-500 shrink-0">✓</span>{h}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Algo({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <Card className="my-4 border-l-2 border-l-emerald-500 bg-emerald-500/5 p-4">
      <p className="mb-2 text-sm font-bold text-emerald-400">{name}</p>
      <div className="text-sm text-foreground/90 space-y-1.5">{children}</div>
    </Card>
  );
}

function F({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic">{children}</span>;
}

function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center mx-1 align-middle text-[0.85em]">
      <span className="border-b border-current px-1 pb-0.5">{n}</span>
      <span className="px-1 pt-0.5">{d}</span>
    </span>
  );
}

export function OptimisationResume() {
  return (
    <>
      {/* ── EXISTENCE ────────────────────────────────────── */}
      <Section id="existence" number="01" title="Theoremes d'existence">
        <Th name="Existence en dimension finie">
          <p>
            Soit <F>K</F> ferme non vide de <F>ℝ<sup>N</sup></F> et <F>J</F> continue.
            Si <F>J</F> est coercive (<F>‖u<sup>n</sup>‖ → +∞ ⟹ J(u<sup>n</sup>) → +∞</F>),
            alors <F>J</F> admet un minimum sur <F>K</F>.
          </p>
          <Hyp items={[
            "Dimension finie V = ℝᴺ",
            "K ferme non vide",
            "J continue",
            "J coercive (auto si K borne)",
          ]} />
          <p className="mt-2 text-xs text-muted-foreground">
            <strong>⚠ Faux en dim infinie</strong> — contre-exemples : fuite dans ℓ₂, oscillation dans H¹.
          </p>
        </Th>

        <Th name="Minimisation de fonctions convexes">
          <p>Si <F>J</F> convexe sur <F>K</F> convexe → <strong>tout min local est global</strong>.</p>
          <p>Si <F>J</F> strictement convexe → <strong>unicite</strong> du minimum.</p>
          <p>Si <F>J</F> fortement convexe (α-convexe) → <strong>existence + unicite</strong>.</p>
          <Hyp items={[
            "K convexe",
            "J convexe (ou strict. convexe, ou α-convexe)",
          ]} />
        </Th>
      </Section>

      {/* ── CONDITIONS D'OPTIMALITE ──────────────────────── */}
      <Section id="optimalite" number="02" title="Conditions d'optimalite">

        <Th name="Inequation d'Euler (K convexe)">
          <p>Si <F>u</F> est min local de <F>J</F> sur <F>K</F> convexe :</p>
          <p className="text-center font-serif italic text-base my-2">
            ⟨J&apos;(u), v − u⟩ ≥ 0 &nbsp; ∀v ∈ K
          </p>
          <p><strong>CNS si J convexe.</strong> Cas <F>K = V</F> : se reduit a <F>J&apos;(u) = 0</F>.</p>
          <Hyp items={[
            "K convexe ferme",
            "J differentiable en u",
          ]} />
        </Th>

        <Th name="Condition du 2nd ordre (sans contrainte)">
          <p>Si <F>K = V</F>, <F>u</F> min local :</p>
          <p className="text-center font-serif italic text-base my-2">
            J&apos;(u) = 0 &nbsp; et &nbsp; J&apos;&apos;(u)(w,w) ≥ 0 &nbsp; ∀w ∈ V
          </p>
          <Hyp items={["J deux fois derivable en u"]} />
        </Th>

        <Th name="Euler generalise (K quelconque)">
          <p>Si <F>u</F> min local de <F>J</F> sur <F>K</F> :</p>
          <p className="text-center font-serif italic text-base my-2">
            ⟨J&apos;(u), w⟩ ≥ 0 &nbsp; ∀w ∈ K(u)
          </p>
          <p>ou <F>K(u)</F> est le cone des directions admissibles.</p>
          <Hyp items={["J differentiable en u", "Identifier K(u) !"]} />
        </Th>

        <Th name="Multiplicateurs de Lagrange (egalite F(v) = 0)">
          <p>Si <F>u</F> min local et les <F>F&apos;<sub>i</sub>(u)</F> libres :</p>
          <p className="text-center font-serif italic text-base my-2">
            J&apos;(u) + ∑<sub>i</sub> λ<sub>i</sub> F&apos;<sub>i</sub>(u) = 0 &nbsp;&nbsp; avec λ<sub>i</sub> ∈ ℝ
          </p>
          <p>Stationnarite du Lagrangien <F>ℒ(v,μ) = J(v) + μ·F(v)</F>.</p>
          <Hyp items={[
            "J et Fᵢ differentiables",
            "⚠ QUALIFICATION : les F'ᵢ(u) lineairement independants",
          ]} />
        </Th>

        <Th name="KKT (inegalite F(v) ≤ 0, egalite G(v) = 0)">
          <p>Si <F>u</F> min local et contraintes qualifiees :</p>
          <p className="text-center font-serif italic text-base my-2">
            J&apos;(u) + ∑ μ<sub>i</sub>G&apos;<sub>i</sub>(u) + ∑ λ<sub>i</sub>F&apos;<sub>i</sub>(u) = 0
          </p>
          <p className="text-center font-serif italic text-base my-2">
            λ<sub>i</sub> ≥ 0, &nbsp; F<sub>i</sub>(u) ≤ 0, &nbsp; λ<sub>i</sub>·F<sub>i</sub>(u) = 0
          </p>
          <p>
            <strong>Complementarite :</strong> contrainte inactive ⟹ λ = 0 ; λ {">"} 0 ⟹ contrainte active.
          </p>
          <Hyp items={[
            "J, G, F differentiables",
            "⚠ QUALIFICATION : G'ᵢ(u) ∪ F'ᵢ(u) des contraintes actives forment une famille libre",
            "(Auto si toutes les contraintes sont affines)",
          ]} />
        </Th>

        <Th name="Lemme de Farkas">
          <p>
            Si <F>a₁,…,a<sub>M</sub></F> libres, <F>𝒦 = {"{"}w : ⟨a<sub>i</sub>,w⟩ ≤ 0{"}"}</F>, et{" "}
            <F>⟨p,w⟩ ≥ 0 ∀w ∈ 𝒦</F>, alors <F>p = −∑ λ<sub>i</sub>a<sub>i</sub></F> avec <F>λ<sub>i</sub> ≥ 0</F>.
          </p>
          <Hyp items={["(a₁,…,aₘ) famille libre"]} />
        </Th>

        <KeyConcept title="Interpretation des multiplicateurs λ">
          <p>
            <F>λ<sub>i</sub> = −∂ℳ/∂ε<sub>i</sub>(0)</F> ou <F>ℳ(ε)</F> est le cout optimal
            pour <F>F(v) = ε</F>. C&apos;est le <strong>prix de la contrainte</strong>.
          </p>
        </KeyConcept>
      </Section>

      {/* ── ALGORITHMES ──────────────────────────────────── */}
      <Section id="algorithmes" number="03" title="Algorithmes d'optimisation">

        <Algo name="Gradient a pas fixe (ordre 1)">
          <p className="text-center font-serif italic text-base my-2">
            u<sup>n+1</sup> = u<sup>n</sup> − μ J&apos;(u<sup>n</sup>)
          </p>
          <Hyp items={[
            "J α-convexe (fortement convexe)",
            "J' L-Lipschitz",
            "Pas : 0 < μ < 2α/L²",
          ]} />
          <p className="mt-2"><strong>Convergence :</strong> ‖u<sup>n</sup> − u‖ ≤ γ<sup>n</sup> ‖u⁰ − u‖</p>
          <p>Pas optimal : <F>μ<sub>opt</sub></F> = <Frac n="2" d="L + α" /> → vitesse <F>γ<sub>opt</sub></F> = <Frac n="L − α" d="L + α" /> = <Frac n="κ − 1" d="κ + 1" /></p>
          <p className="text-xs text-muted-foreground mt-1">
            Convergence lineaire (geometrique). κ = L/α = conditionnement.
          </p>
        </Algo>

        <Algo name="Newton (ordre 2)">
          <p className="text-center font-serif italic text-base my-2">
            u<sup>n+1</sup> = u<sup>n</sup> − (J&apos;&apos;(u<sup>n</sup>))<sup>−1</sup> J&apos;(u<sup>n</sup>)
          </p>
          <Hyp items={[
            "J de classe C³ (F = J' de classe C²)",
            "u zero regulier : J'(u) = 0 et J''(u) inversible",
            "⚠ Initialisation PROCHE : ‖u⁰ − u‖ ≤ ε",
          ]} />
          <p className="mt-2"><strong>Convergence quadratique :</strong> ‖u<sup>n+1</sup> − u‖ ≤ C ‖u<sup>n</sup> − u‖²</p>
          <p className="text-xs text-muted-foreground mt-1">
            Le nombre de chiffres significatifs double a chaque iteration. Mais convergence locale seulement !
          </p>
        </Algo>

        <Algo name="Newton hybride">
          <p className="text-center font-serif italic text-base my-2">
            u<sup>n+1</sup> = u<sup>n</sup> − μ (J&apos;&apos;(u<sup>n</sup>))<sup>−1</sup> J&apos;(u<sup>n</sup>) &nbsp; avec 0 {"<"} μ ≤ 1
          </p>
          <p>Demarrer μ petit (descente sure), augmenter vers 1 (quadratique).</p>
          <Hyp items={["J fortement convexe (direction de Newton = direction de descente)"]} />
        </Algo>

        <Algo name="Gauss-Newton (moindres carres)">
          <p className="text-center font-serif italic text-base my-2">
            u<sup>n+1</sup> = u<sup>n</sup> − (F&apos;<sup>*</sup>F&apos;)<sup>−1</sup> F&apos;<sup>*</sup> F(u<sup>n</sup>)
          </p>
          <p>Pour min ‖F(u)‖² avec F : ℝ<sup>N</sup> → ℝ<sup>M</sup>. Linearise F a chaque iteration.</p>
          <Hyp items={[
            "ker F'(uⁿ) = {0} (F' injective)",
            "Si N = M, on retrouve Newton classique",
          ]} />
        </Algo>

        <Algo name="Nesterov (ordre 1 accelere)">
          <p className="text-center font-serif italic text-base my-2">
            v<sup>n+1</sup> = u<sup>n</sup> − μ J&apos;(u<sup>n</sup>)
          </p>
          <p className="text-center font-serif italic text-base my-2">
            u<sup>n+1</sup> = v<sup>n+1</sup> + β(v<sup>n+1</sup> − v<sup>n</sup>)
          </p>
          <Hyp items={["Memes que gradient (α-convexe, J' L-Lipschitz)"]} />
          <p className="mt-2">
            <strong>Vitesse :</strong> γ = 1 − O(√(α/L)) ≪ 1 − O(α/L) du gradient classique.
          </p>
        </Algo>

        <Algo name="Boule pesante / Heavy ball (ordre 1 accelere)">
          <p className="text-center font-serif italic text-base my-2">
            u<sup>n+1</sup> = u<sup>n</sup> − μ J&apos;(u<sup>n</sup>) + β(u<sup>n</sup> − u<sup>n−1</sup>)
          </p>
          <p>Utilise l&apos;inertie de la direction precedente.</p>
          <Hyp items={["Memes que gradient"]} />
        </Algo>

        <Algo name="Gradient conjugue (ordre 1 accelere)">
          <p><strong>Idee :</strong> au lieu de descendre selon <F>−J&apos;(u<sup>n</sup>)</F>, on choisit une direction <F>d<sup>n</sup></F> qui est <strong>conjuguee</strong> aux precedentes par rapport a la hessienne.</p>
          <p className="text-center font-serif italic text-base my-2">
            u<sup>n+1</sup> = u<sup>n</sup> + ρ<sub>n</sub> d<sup>n</sup>
          </p>
          <p>ou <F>ρ<sub>n</sub></F> est le pas optimal dans la direction <F>d<sup>n</sup></F>, et :</p>
          <p className="text-center font-serif italic text-base my-2">
            d<sup>0</sup> = −J&apos;(u<sup>0</sup>)
          </p>
          <p className="text-center font-serif italic text-base my-2">
            d<sup>n+1</sup> = −J&apos;(u<sup>n+1</sup>) + β<sub>n</sub> d<sup>n</sup>
          </p>
          <p>avec <F>β<sub>n</sub></F> choisi pour que les directions soient <strong>conjuguees</strong> :
            <F> ⟨d<sup>i</sup>, J&apos;&apos;(u) d<sup>j</sup>⟩ = 0</F> pour <F>i ≠ j</F>.
          </p>
          <p><strong>Propriete cle :</strong> pour <F>J(u) = ½Au·u − b·u</F> quadratique en dim <F>N</F>,
            le gradient conjugue converge en <strong>au plus N iterations</strong> (exact !).
          </p>
          <Hyp items={[
            "J α-convexe, J' L-Lipschitz",
            "Convergence exacte en N etapes pour J quadratique",
            "Pas besoin de calculer la hessienne (contrairement a Newton)",
          ]} />
          <p className="mt-2">
            <strong>Vitesse :</strong> γ ≈ 1 − 2√(α/L), meme amelioration que Nesterov.
          </p>
        </Algo>
      </Section>

      {/* ── TABLEAU COMPARATIF ───────────────────────────── */}
      <Section id="comparaison" number="04" title="Tableau comparatif">
        <ComparisonTable
          headers={["Algorithme", "Ordre", "Vitesse γ", "Cout/iter", "Convergence"]}
          rows={[
            ["Gradient fixe", "1", "(κ−1)/(κ+1)", "1 gradient", "Globale"],
            ["Nesterov", "1", "(√κ−1)/(√κ+1)", "1 grad + memoire", "Globale"],
            ["Boule pesante", "1", "≈ Nesterov", "1 grad + memoire", "Globale"],
            ["Grad. conjugue", "1", "≈ Nesterov", "1 grad + 1 dir.", "Globale"],
            ["Newton", "2", "Quadratique", "1 grad + hessienne", "⚠ Locale"],
            ["Newton hybride", "2→2", "μ-dependant", "1 grad + hessienne", "Globale→locale"],
            ["Gauss-Newton", "2", "Quadratique", "1 jacobienne", "⚠ Locale"],
          ]}
        />

        <KeyConcept title="Comment choisir ?">
          <p>
            • <strong>κ petit</strong> (bien conditionne) → gradient suffit
            <br />• <strong>κ grand</strong> (mal conditionne) → Nesterov ou gradient conjugue
            <br />• <strong>Dim faible</strong>, hessienne calculable → Newton (convergence quadratique)
            <br />• <strong>Moindres carres</strong> non-lineaires → Gauss-Newton
            <br />• <strong>En pratique</strong> : α et L inconnus → line search ou estimation
          </p>
        </KeyConcept>
      </Section>

      {/* ── PIEGES CLASSIQUES ────────────────────────────── */}
      <Section id="pieges" number="05" title="Pieges classiques a l'examen">
        <Card className="my-4 border-l-2 border-l-red-500 bg-red-500/5 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-red-400">Erreurs frequentes</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>1.</strong> Oublier de verifier la <strong>qualification</strong> des contraintes
              avant d&apos;appliquer Lagrange ou KKT.
            </li>
            <li>
              <strong>2.</strong> Confondre min local et global : sans convexite,
              les conditions d&apos;optimalite ne garantissent qu&apos;un <strong>min local</strong>.
            </li>
            <li>
              <strong>3.</strong> Appliquer Newton sans verifier que <F>u⁰</F> est{" "}
              <strong>proche</strong> de la solution (convergence locale seulement !).
            </li>
            <li>
              <strong>4.</strong> Oublier de tester la valeur de <F>J</F> aux{" "}
              <strong>points candidats</strong> pour trouver le vrai minimum (ex : plusieurs
              solutions de Lagrange → comparer les valeurs).
            </li>
            <li>
              <strong>5.</strong> Confondre multiplicateur <F>λ<sub>i</sub> ∈ ℝ</F> (egalite) et{" "}
              <F>λ<sub>i</sub> ≥ 0</F> (inegalite).
            </li>
            <li>
              <strong>6.</strong> Existence en dim infinie ≠ dim finie : les fermes bornes
              ne sont PAS compacts en dim infinie.
            </li>
          </ul>
        </Card>
      </Section>
    </>
  );
}
