import {
  Section,
  KeyConcept,
  Warning,
  Analogy,
  Quiz,
  ComparisonTable,
} from "@/components/course-elements";
import {
  M,
  MathBlock,
  Theorem,
  Proposition,
  Def,
  Lemma,
  Proof,
  Remark,
  Hypotheses,
} from "@/components/math-elements";

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
            Soit <M t="V" /> un espace de Hilbert, <M t="K \\subset V" /> un
            sous-ensemble non vide, et <M t="J : V \\to \\mathbb{R}" />. On
            cherche :
          </p>
          <MathBlock tex="\\inf_{v \\in K} J(v) \\quad \\text{ou} \\quad \\min_{v \\in K} J(v)" />
        </KeyConcept>

        <p>
          <strong>Exemples concrets :</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Poutre horizontale</strong> : minimiser l&apos;energie
            (deformation + potentielle) sous contraintes aux bords :
            <MathBlock tex="\\min_{u \\in C^1(0,L)} \\frac{1}{2}\\int_0^L \\mu|u'(x)|^2\\,dx - \\int_0^L f(x)\\,u(x)\\,dx" />
          </li>
          <li>
            <strong>Controle optimal</strong> : piloter un systeme dynamique{" "}
            <M t="\\dot{x}(t) = f(t, x(t), u(t))" /> pour atteindre une cible
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
            <strong>Infimum</strong> de <M t="J" /> sur <M t="K" /> : le plus
            grand des minorants.
          </p>
          <MathBlock tex="\\inf_{v \\in K} J(v) = \\max\\{C \\in \\mathbb{R} \\cup \\{-\\infty\\} : C \\le J(v) \\; \\forall v \\in K\\}" />
          <p>
            <strong>Suite minimisante</strong> : une suite{" "}
            <M t="(u^n)_{n \\in \\mathbb{N}}" /> telle que{" "}
            <M t="u^n \\in K" /> pour tout <M t="n" /> et{" "}
            <M t="\\lim J(u^n) = \\inf_{v \\in K} J(v)" />.
          </p>
          <p>
            Il existe <strong>toujours</strong> des suites minimisantes (par
            definition de l&apos;infimum) !
          </p>
        </Def>

        <Def title="Minimum local et global">
          <p>
            <M t="u" /> est un <strong>minimum global</strong> de <M t="J" />{" "}
            sur <M t="K" /> si :
          </p>
          <MathBlock tex="u \\in K \\quad \\text{et} \\quad J(v) \\ge J(u) \\quad \\forall v \\in K" />
          <p>
            <M t="u" /> est un <strong>minimum local</strong> si cette inegalite
            vaut dans une boule autour de <M t="u" /> :
          </p>
          <MathBlock tex="\\exists \\delta > 0, \\; \\forall v \\in K, \\; \\|v - u\\| < \\delta \\implies J(v) \\ge J(u)" />
        </Def>

        <Theorem name="Existence en dimension finie">
          <p>
            Soit <M t="K" /> un ferme non vide de{" "}
            <M t="\\mathbb{R}^N" /> et <M t="J" /> une fonction continue sur{" "}
            <M t="K" /> verifiant la propriete{" "}
            <strong>&laquo; infinie a l&apos;infini &raquo;</strong> :
          </p>
          <MathBlock tex="\\forall (u^n) \\text{ suite dans } K, \\; \\|u^n\\| \\to +\\infty \\implies J(u^n) \\to +\\infty" />
          <p>
            Alors il existe au moins un point de minimum de <M t="J" /> sur{" "}
            <M t="K" />.
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
            Soit <M t="(u^n)" /> une suite minimisante. Par coercivite,{" "}
            <M t="J(u^n) \\le C" /> implique <M t="\\|u^n\\| \\le C'" /> : la
            suite est bornee.
          </p>
          <p>
            En dimension finie, les fermes bornes sont compacts (Bolzano-Weierstrass).
            On extrait une sous-suite convergente{" "}
            <M t="u^{n_k} \\to u" />. Comme <M t="K" /> est ferme,{" "}
            <M t="u \\in K" />. Par continuite de <M t="J" /> :{" "}
            <M t="J(u^{n_k}) \\to J(u) = \\inf J" />.
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
            <strong>1. Fuite a l&apos;infini</strong> dans{" "}
            <M t="\\ell_2(\\mathbb{R})" /> :
          </p>
          <MathBlock tex="J(x) = (\\|x\\|^2 - 1)^2 + \\sum_{i=1}^{+\\infty} \\frac{x_i^2}{i}" />
          <p>
            La suite minimisante <M t="x^n = (0,\\ldots,0,1,0,\\ldots)" /> (le
            1 en position <M t="n" />) verifie <M t="J(x^n) = 1/n \\to 0" />,
            mais elle ne converge pas (elle &laquo; part a l&apos;infini
            &raquo;).
          </p>
          <p>
            <strong>2. Oscillation</strong> sur{" "}
            <M t="H^1(0,1)" /> :
          </p>
          <MathBlock tex="J(v) = \\int_0^1 \\left((|v'(x)| - 1)^2 + v(x)^2\\right) dx" />
          <p>
            La suite minimisante oscille de plus en plus vite (dents de scie de
            hauteur <M t="1/n" />). Elle converge vers 0, mais sa derivee ne
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
          explanation="En dimension infinie, un ferme borne n'est pas necessairement compact (pas de Bolzano-Weierstrass). C'est pourquoi on a besoin d'hypotheses supplementaires comme la convexite."
        />
      </Section>

      {/* ============================================================ */}
      {/* 3. CONVEXITE                                                 */}
      {/* ============================================================ */}
      <Section id="convexite" number="03" title="Convexite">
        <p>
          La convexite est l&apos;hypothese cle qui permet d&apos;obtenir des
          resultats d&apos;existence en dimension infinie et de garantir que tout
          minimum local est global.
        </p>

        <Def title="Ensemble convexe">
          <p>
            <M t="K \\subset V" /> est <strong>convexe</strong> si pour tout{" "}
            <M t="x, y \\in K" /> et tout{" "}
            <M t="\\theta \\in [0,1]" /> :
          </p>
          <MathBlock tex="\\theta x + (1 - \\theta)y \\in K" />
        </Def>

        <Def title="Fonction convexe">
          <p>
            <M t="J" /> definie sur un convexe <M t="K" /> est{" "}
            <strong>convexe</strong> si :
          </p>
          <MathBlock tex="J(\\theta u + (1-\\theta)v) \\le \\theta J(u) + (1-\\theta)J(v) \\quad \\forall u,v \\in K, \\; \\forall \\theta \\in [0,1]" />
          <p>
            Interpretation geometrique : la fonction est{" "}
            <strong>sous sa corde</strong>.
          </p>
          <p>
            <M t="J" /> est <strong>strictement convexe</strong> si
            l&apos;inegalite est stricte pour <M t="u \\ne v" /> et{" "}
            <M t="\\theta \\in ]0,1[" />.
          </p>
        </Def>

        <Proposition title="Minimum local = minimum global">
          <p>
            Si <M t="J" /> est convexe sur un convexe <M t="K" />, alors{" "}
            <strong>tout minimum local est un minimum global</strong>.
          </p>
        </Proposition>

        <Proof title="Preuve">
          <p>
            Soit <M t="u" /> un minimum local :{" "}
            <M t="J(w) \\ge J(u)" /> pour <M t="\\|w - u\\| < \\delta" />.
            Soit <M t="v \\in K" /> quelconque. Pour{" "}
            <M t="0 < \\theta \\ll 1" />, on pose{" "}
            <M t="w_\\theta = \\theta v + (1-\\theta)u \\in K" /> (convexite de{" "}
            <M t="K" />). Comme <M t="\\|w_\\theta - u\\| < \\delta" /> :
          </p>
          <MathBlock tex="J(u) \\le J(w_\\theta) \\le \\theta J(v) + (1-\\theta)J(u)" />
          <p>
            d&apos;ou <M t="J(u) \\le J(v)" /> pour tout <M t="v \\in K" />.
          </p>
        </Proof>

        <Proposition title="Unicite (cas strictement convexe)">
          <p>
            Si <M t="J" /> est <strong>strictement convexe</strong> sur un
            convexe <M t="K" />, alors il existe{" "}
            <strong>au plus un</strong> point de minimum.
          </p>
        </Proposition>

        <Proof title="Preuve">
          <p>
            Si <M t="u_1, u_2" /> sont deux minima distincts, alors{" "}
            <M t="w = \\theta u_1 + (1-\\theta)u_2 \\in K" /> verifie{" "}
            <M t="J(w) < \\theta J(u_1) + (1-\\theta)J(u_2) = \\inf J" />,
            contradiction.
          </p>
        </Proof>

        <Def title="Forte convexite (α-convexite)">
          <p>
            <M t="J" /> est <strong>fortement convexe</strong> (ou{" "}
            <M t="\\alpha" />
            -convexe) s&apos;il existe <M t="\\alpha > 0" /> tel que :
          </p>
          <MathBlock tex="J(\\theta u + (1-\\theta)v) \\le \\theta J(u) + (1-\\theta)J(v) - \\frac{\\alpha}{2}\\theta(1-\\theta)\\|u - v\\|^2" />
          <p>
            Equivalence utile : <M t="J" /> est <M t="\\alpha" />
            -convexe ssi <M t="J(u) - \\frac{\\alpha}{2}\\|u\\|^2" /> est
            convexe.
          </p>
        </Def>

        <KeyConcept title="A retenir sur la convexite">
          <p>
            • Convexe :{" "}
            <strong>tout minimum local est global</strong>
            <br />• Strictement convexe : <strong>unicite</strong> du minimum
            <br />• Fortement convexe :{" "}
            <strong>existence + unicite + convergence rapide</strong> des
            algorithmes
          </p>
        </KeyConcept>

        <Lemma name="Continuite des fonctions convexes">
          <p>
            Une fonction convexe <M t="J" /> de <M t="V" /> dans{" "}
            <M t="\\mathbb{R}" />, localement majoree, est{" "}
            <strong>continue</strong>.
          </p>
        </Lemma>

        <Remark>
          <p>
            <strong>Exemple :</strong> la fonction{" "}
            <M t="J(x) = \\frac{1}{2}Ax \\cdot x - b \\cdot x" /> sur{" "}
            <M t="\\mathbb{R}^n" /> est convexe si <M t="A" /> est positive, et
            strictement convexe si <M t="A" /> est definie positive.
          </p>
        </Remark>

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
      <Section
        id="euler"
        number="04"
        title="Conditions d'optimalite — K convexe"
      >
        <Theorem name="Inequation d'Euler">
          <p>
            Soit <M t="K" /> un <strong>convexe ferme</strong> et <M t="J" />{" "}
            differentiable. Si <M t="u" /> est un minimum local de <M t="J" />{" "}
            sur <M t="K" />, alors :
          </p>
          <MathBlock tex="\\langle J'(u), v - u \\rangle \\ge 0 \\quad \\forall v \\in K" />
          <p>
            <strong>Reciproque :</strong> si <M t="J" /> est convexe, cette
            condition est aussi <strong>suffisante</strong> (minimum global).
          </p>
          <Hypotheses
            items={[
              "K est convexe et ferme",
              "J est differentiable en u",
            ]}
          />
        </Theorem>

        <Proof title="Preuve">
          <p>
            Pour <M t="v \\in K" /> et <M t="h \\in ]0,1]" />,{" "}
            <M t="u + h(v-u) \\in K" /> (convexite). Comme <M t="u" /> est
            minimum local :
          </p>
          <MathBlock tex="\\frac{J(u + h(v-u)) - J(u)}{h} \\ge 0" />
          <p>
            On passe a la limite <M t="h \\to 0" /> par differentiabilite :{" "}
            <M t="\\langle J'(u), v - u \\rangle \\ge 0" />.
          </p>
          <p>
            <strong>Reciproque (J convexe) :</strong>{" "}
            <M t="J(v) \\ge J(u) + \\langle J'(u), v-u \\rangle \\ge J(u)" />.
          </p>
        </Proof>

        <Remark>
          <p>
            <strong>Interpretation geometrique :</strong> la derivee
            directionnelle de <M t="J" /> dans toute direction{" "}
            <M t="v - u" /> entrante dans <M t="K" /> est positive. Le gradient{" "}
            <M t="J'(u)" /> &laquo; pointe vers l&apos;exterieur &raquo; de{" "}
            <M t="K" />.
          </p>
        </Remark>

        <KeyConcept title="Cas particulier : K = V (sans contrainte)">
          <p>
            Si <M t="K = V" />, on peut prendre <M t="v = u \\pm w" /> pour
            tout <M t="w" />, d&apos;ou :
          </p>
          <MathBlock tex="J'(u) = 0" />
          <p>
            C&apos;est l&apos;equation d&apos;Euler classique. On retrouve
            l&apos;annulation du gradient.
          </p>
        </KeyConcept>

        <KeyConcept title="Exemple : projection sur un convexe">
          <p>
            Pour <M t="x \\in V" />, la projection sur un convexe ferme{" "}
            <M t="K" /> minimise <M t="\\|x - y\\|" /> pour{" "}
            <M t="y \\in K" />. L&apos;inequation d&apos;Euler donne :
          </p>
          <MathBlock tex="x_K \\in K, \\quad \\langle x_K - x, y - x_K \\rangle \\ge 0 \\quad \\forall y \\in K" />
          <p>
            En particulier, si <M t="K = (\\mathbb{R}^+)^n" />, alors{" "}
            <M t="(x_K)_j = \\max(0, x_j)" />.
          </p>
        </KeyConcept>

        <Proposition title="Condition d'optimalite du 2nd ordre">
          <p>
            Si <M t="K = V" /> et <M t="J" /> est deux fois derivable, alors un
            minimum local <M t="u" /> verifie :
          </p>
          <MathBlock tex="J'(u) = 0 \\quad \\text{et} \\quad J''(u)(w,w) \\ge 0 \\quad \\forall w \\in V" />
          <p>
            <strong>Reciproquement</strong>, si <M t="J'(u) = 0" /> et{" "}
            <M t="J''(v)(w,w) \\ge 0" /> pour tout <M t="v" /> au voisinage de{" "}
            <M t="u" />, alors <M t="u" /> est un minimum local.
          </p>
        </Proposition>

        <Quiz
          question="L'inequation d'Euler ⟨J'(u), v−u⟩ ≥ 0 pour tout v ∈ K est une condition..."
          options={[
            "Necessaire et suffisante pour tout J differentiable",
            "Necessaire seulement (suffisante si J est convexe)",
            "Suffisante seulement",
            "Ni necessaire ni suffisante en general",
          ]}
          answer={1}
          explanation="L'inequation d'Euler est toujours necessaire pour un minimum local (K convexe, J differentiable). Elle est aussi suffisante si J est convexe."
        />
      </Section>

      {/* ============================================================ */}
      {/* 5. K NON CONVEXE                                             */}
      {/* ============================================================ */}
      <Section
        id="cone"
        number="05"
        title="Conditions d'optimalite — K non convexe"
      >
        <p>
          Quand <M t="K" /> n&apos;est pas convexe (ex :{" "}
          <M t="K = \\{v : F(v) = 0\\}" /> ou{" "}
          <M t="K = \\{v : F(v) \\le 0\\}" />
          ), il faut generaliser la notion de &laquo; directions admissibles
          &raquo;.
        </p>

        <Def title="Cone des directions admissibles">
          <p>
            Pour <M t="v \\in K" />, le cone des directions admissibles est :
          </p>
          <MathBlock tex="K(v) = \\left\\{ w \\in V : \\exists (v^n) \\in K, \\; \\exists (\\varepsilon^n) \\in \\mathbb{R}^*_+, \\; v^n \\to v, \\; \\varepsilon^n \\to 0, \\; \\frac{v^n - v}{\\varepsilon^n} \\to w \\right\\}" />
        </Def>

        <KeyConcept title="Exemples de cone K(u)">
          <p>
            • Si <M t="u" /> est <strong>interieur</strong> a <M t="K" /> :{" "}
            <M t="K(u) = V" />
            <br />• Si <M t="K" /> est <strong>convexe</strong> :{" "}
            <M t="K(u) = \\{w = v - u : v \\in K\\}" />
            <br />• Si <M t="K = \\{F(v) = 0\\}" /> et{" "}
            <M t="F'(u) \\ne 0" /> :{" "}
            <M t="K(u) = [F'(u)]^\\perp" /> (hyperplan tangent)
          </p>
        </KeyConcept>

        <Proposition title="Inequation d'Euler generalisee">
          <p>
            Si <M t="u" /> est un minimum local de <M t="J" /> sur <M t="K" />{" "}
            et <M t="J" /> est differentiable en <M t="u" />, alors :
          </p>
          <MathBlock tex="\\langle J'(u), w \\rangle \\ge 0 \\quad \\forall w \\in K(u)" />
          <p>
            Le probleme : il faut <strong>identifier K(u)</strong> !
          </p>
        </Proposition>

        <Proof title="Preuve">
          <p>
            Soit <M t="w \\in K(u)" />. Par definition, il existe{" "}
            <M t="v^n \\to u" /> dans <M t="K" /> et{" "}
            <M t="\\varepsilon^n \\to 0" /> avec{" "}
            <M t="(v^n - u)/\\varepsilon^n \\to w" />.
          </p>
          <p>
            Comme <M t="J(u) \\le J(v^n)" /> :{" "}
            <M t="J(v^n) = J(u) + \\varepsilon^n \\langle J'(u), w \\rangle + o(\\varepsilon^n)" />
            . En divisant par <M t="\\varepsilon^n > 0" /> et en passant a la
            limite : <M t="\\langle J'(u), w \\rangle \\ge 0" />.
          </p>
        </Proof>
      </Section>

      {/* ============================================================ */}
      {/* 6. CONTRAINTES D'EGALITE & LAGRANGIEN                        */}
      {/* ============================================================ */}
      <Section
        id="egalite"
        number="06"
        title="Contraintes d'egalite & Lagrangien"
      >
        <Theorem name="Multiplicateurs de Lagrange (egalite)">
          <p>
            Soit{" "}
            <M t="F(v) = (F_1(v), \\ldots, F_M(v))" /> et{" "}
            <M t="K = \\{v \\in V : F(v) = 0\\}" />. Si <M t="u" /> est un
            minimum local de <M t="J" /> sur <M t="K" />, et si les vecteurs{" "}
            <M t="(F'_i(u))_{1 \\le i \\le M}" /> sont{" "}
            <strong>libres</strong>, alors il existe des multiplicateurs{" "}
            <M t="\\lambda_1, \\ldots, \\lambda_M \\in \\mathbb{R}" /> tels
            que :
          </p>
          <MathBlock tex="J'(u) + \\sum_{i=1}^M \\lambda_i F'_i(u) = 0" />
          <Hypotheses
            items={[
              "J et les Fᵢ sont differentiables au voisinage de u",
              "Les gradients F'₁(u), ..., F'ₘ(u) sont lineairement independants (hypothese de qualification)",
            ]}
          />
        </Theorem>

        <Proof title="Idee de preuve">
          <p>
            On montre que{" "}
            <M t="K(u) = \\bigcap_{i=1}^M [F'_i(u)]^\\perp" /> (hyperplan
            tangent a la variete <M t="K" /> en <M t="u" />). L&apos;inequation
            d&apos;Euler{" "}
            <M t="\\langle J'(u), w \\rangle \\ge 0" /> pour tout{" "}
            <M t="w \\in K(u)" /> implique (car <M t="K(u)" /> est un
            sous-espace vectoriel, on prend aussi <M t="-w" />) :{" "}
            <M t="\\langle J'(u), w \\rangle = 0" /> pour tout{" "}
            <M t="w \\in K(u)" />.
          </p>
          <p>
            Donc <M t="J'(u) \\in K(u)^\\perp = \\text{Vect}(F'_1(u), \\ldots, F'_M(u))" />
            .
          </p>
        </Proof>

        <Warning>
          <p>
            L&apos;hypothese de qualification (les <M t="F'_i(u)" /> sont
            libres) est <strong>indispensable</strong> ! Contre-exemple :{" "}
            <M t="K = \\{v : \\|v\\|^2 = 0\\}" /> contient un seul point{" "}
            <M t="v = 0" /> qui est forcement le minimum, mais{" "}
            <M t="F'(0) = 0" /> et on ne peut pas ecrire <M t="J'(0)" /> comme
            combinaison lineaire de <M t="F'(0)" />.
          </p>
        </Warning>

        <Def title="Lagrangien">
          <p>
            Pour les contraintes d&apos;egalite <M t="F(v) = 0" />, le{" "}
            <strong>Lagrangien</strong> est :
          </p>
          <MathBlock tex="\\mathcal{L}(v, \\mu) = J(v) + \\mu \\cdot F(v) = J(v) + \\sum_{i=1}^M \\mu_i F_i(v) \\quad \\forall (v, \\mu) \\in V \\times \\mathbb{R}^M" />
        </Def>

        <Theorem name="Stationnarite du Lagrangien">
          <p>
            Sous les memes hypotheses, les conditions d&apos;optimalite se
            reecrivent :
          </p>
          <MathBlock tex="\\frac{\\partial \\mathcal{L}}{\\partial v}(u, \\lambda) = 0 \\quad \\text{et} \\quad \\frac{\\partial \\mathcal{L}}{\\partial \\mu}(u, \\lambda) = F(u) = 0" />
          <p>
            Le Lagrangien ramene le probleme contraint a un probleme{" "}
            <strong>sans contrainte</strong>, avec une variable supplementaire{" "}
            <M t="\\mu" />.
          </p>
        </Theorem>

        <KeyConcept title="Interpretation des multiplicateurs">
          <p>
            Si on note <M t="\\mathcal{M}(\\epsilon)" /> la valeur du minimum
            pour les contraintes <M t="F(v) = \\epsilon" />, alors :
          </p>
          <MathBlock tex="\\lambda_i = -\\frac{\\partial \\mathcal{M}}{\\partial \\epsilon_i}(0)" />
          <p>
            <M t="\\lambda_i" /> mesure la{" "}
            <strong>sensibilite du cout optimal</strong> a une perturbation de la{" "}
            <M t="i" />-eme contrainte. C&apos;est le &laquo; prix &raquo; de la
            contrainte.
          </p>
        </KeyConcept>

        <Quiz
          question="Quelle hypothese est indispensable pour le theoreme des multiplicateurs de Lagrange ?"
          options={[
            "J est convexe",
            "K est borne",
            "Les gradients des contraintes F'ᵢ(u) sont lineairement independants",
            "J est deux fois differentiable",
          ]}
          answer={2}
          explanation="C'est l'hypothese de qualification : les F'ᵢ(u) doivent etre libres pour que le cone tangent K(u) soit bien l'hyperplan tangent a la variete K."
        />
      </Section>

      {/* ============================================================ */}
      {/* 7. CONTRAINTES D'INEGALITE — KKT                             */}
      {/* ============================================================ */}
      <Section
        id="inegalite"
        number="07"
        title="Contraintes d'inegalite — KKT"
      >
        <p>
          On considere maintenant le probleme avec contraintes d&apos;egalite
          ET d&apos;inegalite :
        </p>
        <MathBlock tex="\\inf_{v \\in K} J(v) \\quad \\text{avec} \\quad K = \\{v \\in V : G(v) = 0, \\; F(v) \\le 0\\}" />

        <Theorem name="Conditions de Karush-Kuhn-Tucker (KKT)">
          <p>
            Soit <M t="u \\in K" /> un minimum local. Si les contraintes sont{" "}
            <strong>qualifiees</strong> en <M t="u" /> (les gradients des
            contraintes actives et d&apos;egalite forment une famille libre),
            alors il existe <M t="\\mu_1, \\ldots, \\mu_N \\in \\mathbb{R}" />{" "}
            et <M t="\\lambda_1, \\ldots, \\lambda_M \\ge 0" /> tels que :
          </p>
          <MathBlock tex="J'(u) + \\sum_{i=1}^N \\mu_i G'_i(u) + \\sum_{i=1}^M \\lambda_i F'_i(u) = 0" />
          <MathBlock tex="\\lambda_i \\ge 0, \\quad F_i(u) \\le 0, \\quad \\lambda_i F_i(u) = 0 \\quad \\forall i" />
          <Hypotheses
            items={[
              "J, G, F sont derivables au voisinage de u",
              "Qualification : (G'ᵢ(u))₁≤ᵢ≤ₙ ∪ (F'ᵢ(u))_{i∈I(u)} forment une famille libre",
              "I(u) = {i : Fᵢ(u) = 0} est l'ensemble des contraintes actives",
            ]}
          />
        </Theorem>

        <KeyConcept title="Conditions de complementarite">
          <p>
            La condition <M t="\\lambda_i F_i(u) = 0" /> s&apos;appelle{" "}
            <strong>complementarite</strong> :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Si <M t="F_i(u) < 0" /> (contrainte inactive) : alors{" "}
              <M t="\\lambda_i = 0" /> (le multiplicateur est nul)
            </li>
            <li>
              Si <M t="\\lambda_i > 0" /> : alors <M t="F_i(u) = 0" /> (la
              contrainte est active)
            </li>
          </ul>
          <p>
            Seules les <strong>contraintes actives</strong> interviennent dans la
            condition d&apos;optimalite.
          </p>
        </KeyConcept>

        <Def title="Lagrangien avec inegalites">
          <p>
            Le Lagrangien generalise est :
          </p>
          <MathBlock tex="\\mathcal{L}(v, \\mu) = J(v) + \\sum_{i=1}^M \\mu_i F_i(v) \\quad \\forall (v, \\mu) \\in V \\times (\\mathbb{R}^+)^M" />
          <p>
            Les multiplicateurs <M t="\\mu_i \\ge 0" /> sont{" "}
            <strong>positifs</strong> pour les contraintes d&apos;inegalite{" "}
            <M t="F_i(v) \\le 0" />.
          </p>
        </Def>

        <Lemma name="Lemme de Farkas">
          <p>
            Soient <M t="a_1, \\ldots, a_M" /> une famille libre de{" "}
            <M t="V" />. On definit les cones :
          </p>
          <MathBlock tex="\\mathcal{K} = \\{w \\in V : \\langle a_i, w \\rangle \\le 0, \\; 1 \\le i \\le M\\}" />
          <MathBlock tex="\\hat{\\mathcal{K}} = \\left\\{q \\in V : \\exists \\lambda_i \\ge 0, \\; q = -\\sum_{i=1}^M \\lambda_i a_i\\right\\}" />
          <p>
            Alors pour tout <M t="p \\in V" /> :
          </p>
          <MathBlock tex="\\langle p, w \\rangle \\ge 0 \\; \\forall w \\in \\mathcal{K} \\implies p \\in \\hat{\\mathcal{K}}" />
          <p>
            Application : dans le theoreme KKT, on prend{" "}
            <M t="p = J'(u)" /> et <M t="a_i = F'_i(u)" />.
          </p>
        </Lemma>

        <Def title="Point selle">
          <p>
            <M t="(u, p)" /> est un <strong>point selle</strong> (ou min-max) de{" "}
            <M t="\\mathcal{L}" /> sur <M t="V \\times P" /> si :
          </p>
          <MathBlock tex="\\forall q \\in P, \\quad \\mathcal{L}(u, q) \\le \\mathcal{L}(u, p) \\le \\mathcal{L}(v, p) \\quad \\forall v \\in V" />
          <p>
            On minimise en <M t="v" /> et on maximise en <M t="q" />.
          </p>
        </Def>

        <Remark>
          <p>
            <strong>Qualification simplifiee :</strong> si toutes les contraintes{" "}
            <M t="F_i" /> sont <strong>affines</strong>, la qualification est
            automatiquement verifiee (prendre <M t="\\bar{w} = 0" />).
          </p>
        </Remark>

        <KeyConcept title="Exemple : regularisation d'un signal">
          <p>
            Soit <M t="A" /> SDP d&apos;ordre <M t="n" />,{" "}
            <M t="b \\in \\mathbb{R}^n" />, <M t="\\epsilon > 0" /> :
          </p>
          <MathBlock tex="\\min_{\\|x - b\\|^2 \\le \\epsilon^2} Ax \\cdot x" />
          <p>
            La solution verifie : soit <M t="x^* = 0" /> et{" "}
            <M t="\\|b\\| < \\epsilon" /> (contrainte inactive), soit{" "}
            <M t="x^* = (\\text{Id} + \\lambda^{-1}A)^{-1}b" /> avec{" "}
            <M t="\\lambda > 0" /> tel que <M t="\\|x^* - b\\| = \\epsilon" />{" "}
            (contrainte active, regularisation de Tikhonov).
          </p>
        </KeyConcept>

        <Quiz
          question="Dans les conditions KKT, si λᵢ > 0 pour une contrainte d'inegalite, que peut-on deduire ?"
          options={[
            "La contrainte est inactive",
            "La contrainte est active : Fᵢ(u) = 0",
            "Le probleme n'a pas de solution",
            "J est necessairement convexe",
          ]}
          answer={1}
          explanation="C'est la condition de complementarite : λᵢ · Fᵢ(u) = 0. Si λᵢ > 0, alors forcement Fᵢ(u) = 0 (la contrainte est saturee)."
        />
      </Section>

      {/* ============================================================ */}
      {/* 8. ALGORITHME DU GRADIENT                                    */}
      {/* ============================================================ */}
      <Section id="gradient" number="08" title="Algorithme du gradient">
        <p>
          On passe aux algorithmes numeriques. On commence par le plus simple :
          le <strong>gradient a pas fixe</strong>, pour la minimisation sans
          contrainte dans <M t="V = \\mathbb{R}^N" />.
        </p>

        <Def title="Algorithme du gradient a pas fixe">
          <p>
            Initialisation : <M t="u^0 \\in V" />. Iterations : pour{" "}
            <M t="n \\ge 0" /> :
          </p>
          <MathBlock tex="u^{n+1} = u^n - \\mu\\, J'(u^n)" />
          <p>
            ou <M t="\\mu > 0" /> est le <strong>pas de descente</strong> (fixe).
          </p>
        </Def>

        <Theorem name="Convergence du gradient a pas fixe">
          <p>
            On suppose :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <M t="J" /> est <M t="\\alpha" />
              -convexe (fortement convexe)
            </li>
            <li>
              <M t="J'" /> est <M t="L" />
              -Lipschitz : <M t="\\|J'(v) - J'(w)\\| \\le L\\|v - w\\|" />
            </li>
          </ul>
          <p>
            Alors pour{" "}
            <M t="0 < \\mu < 2/L^2" />, l&apos;algorithme converge :
          </p>
          <MathBlock tex="\\|u^n - u\\| \\le \\gamma^n \\|u^0 - u\\| \\quad \\text{avec} \\quad \\gamma = \\sqrt{1 - \\frac{\\alpha^2}{L^2}} < 1" />
          <Hypotheses
            items={[
              "J est α-convexe (fortement convexe) avec α > 0",
              "J' est L-Lipschitz",
              "Le pas verifie 0 < μ < 2α/L²",
            ]}
          />
        </Theorem>

        <Proof title="Idee de preuve">
          <p>
            On ecrit <M t="u^{n+1} - u = B^n(u^n - u)" /> avec{" "}
            <M t="B^n = \\text{Id} - \\mu \\int_0^1 J''(u + t(u^n - u))\\,dt" />
            .
          </p>
          <p>
            Comme <M t="\\alpha\\,\\text{Id} \\le J'' \\le L\\,\\text{Id}" />{" "}
            (forte convexite + Lipschitz), on a{" "}
            <M t="(1 - \\mu L)\\,\\text{Id} \\le B^n \\le (1 - \\mu\\alpha)\\,\\text{Id}" />
            , donc :
          </p>
          <MathBlock tex="\\rho(B^n) \\le \\max(|1 - \\mu L|, |1 - \\mu\\alpha|) = \\gamma < 1" />
        </Proof>

        <KeyConcept title="Interpretation de α et L">
          <p>
            Pour <M t="J(u) = \\frac{1}{2}Au \\cdot u - b \\cdot u" /> avec{" "}
            <M t="A" /> SDP de valeurs propres{" "}
            <M t="0 < \\lambda_1 \\le \\cdots \\le \\lambda_N" /> :
          </p>
          <MathBlock tex="\\alpha = \\lambda_1 \\quad \\text{et} \\quad L = \\lambda_N" />
          <p>
            Le rapport <M t="L/\\alpha = \\kappa(A)" /> est le{" "}
            <strong>conditionnement</strong> de <M t="A" />. Plus il est grand,
            plus la convergence est lente.
          </p>
        </KeyConcept>

        <Theorem name="Vitesse de convergence optimale">
          <p>
            Le pas optimal et la vitesse de convergence optimale du gradient a
            pas fixe sont :
          </p>
          <MathBlock tex="\\mu_{\\text{opt}} = \\frac{2}{L + \\alpha} \\quad \\implies \\quad \\gamma_{\\text{opt}} = \\frac{L - \\alpha}{L + \\alpha} = \\frac{\\kappa - 1}{\\kappa + 1}" />
          <p>
            C&apos;est le mieux qu&apos;on puisse faire avec un gradient a pas
            fixe. C&apos;est la vitesse la plus rapide (le plus petit{" "}
            <M t="\\gamma" /> possible).
          </p>
        </Theorem>

        <Proof title="Preuve (pas optimal)">
          <p>
            On minimise{" "}
            <M t="\\gamma(\\mu) = \\max(|1 - \\mu L|, |1 - \\mu\\alpha|)" />{" "}
            par rapport a <M t="\\mu" />. L&apos;optimum est atteint quand les
            deux termes sont egaux :{" "}
            <M t="\\mu L - 1 = 1 - \\mu\\alpha" />, d&apos;ou{" "}
            <M t="\\mu = 2/(L+\\alpha)" /> et{" "}
            <M t="\\gamma = (L-\\alpha)/(L+\\alpha)" />.
          </p>
        </Proof>

        <Remark>
          <p>
            On dit que la convergence est <strong>lineaire</strong> (ou
            geometrique) car <M t="\\log\\|u^n - u\\|" /> decroit lineairement
            en <M t="n" />.
          </p>
        </Remark>

        <Quiz
          question="Pour J(u) = ½Au·u − b·u avec A SDP, quel est le pas de descente optimal ?"
          options={[
            "μ = 1/L",
            "μ = 1/α",
            "μ = 2/(L + α)",
            "μ = α/L²",
          ]}
          answer={2}
          explanation="Le pas optimal est μ = 2/(L + α) = 2/(λ_N + λ₁). Il donne la vitesse de convergence γ = (L-α)/(L+α), le plus petit coefficient possible."
        />
      </Section>

      {/* ============================================================ */}
      {/* 9. ALGORITHME DE NEWTON                                      */}
      {/* ============================================================ */}
      <Section id="newton" number="09" title="Algorithme de Newton">
        <p>
          L&apos;algorithme de Newton est un algorithme d&apos;
          <strong>ordre 2</strong> : il utilise la derivee seconde (la
          hessienne). Il converge beaucoup plus vite, mais{" "}
          <strong>seulement si on demarre proche de la solution</strong>.
        </p>

        <Def title="Algorithme de Newton">
          <p>
            Idee : a chaque iteration, on minimise l&apos;approximation
            quadratique de <M t="J" /> autour de <M t="u^n" /> :
          </p>
          <MathBlock tex="u^{n+1} = u^n - \\big(J''(u^n)\\big)^{-1} J'(u^n)" />
          <p>
            C&apos;est en fait un{" "}
            <strong>algorithme de recherche de zero</strong> de{" "}
            <M t="J'" /> (methode de Newton appliquee a{" "}
            <M t="F(v) = J'(v)" />
            ).
          </p>
        </Def>

        <Theorem name="Convergence quadratique de Newton">
          <p>
            Soit <M t="F" /> de classe <M t="C^2" /> de{" "}
            <M t="\\mathbb{R}^N" /> dans <M t="\\mathbb{R}^N" />,{" "}
            <M t="u" /> un zero regulier de <M t="F" /> (i.e.{" "}
            <M t="F(u) = 0" /> et <M t="F'(u)" /> inversible). Alors il existe{" "}
            <M t="\\epsilon > 0" /> et <M t="C > 0" /> tels que si{" "}
            <M t="\\|u^0 - u\\| \\le \\epsilon" /> :
          </p>
          <MathBlock tex="\\|u^{n+1} - u\\| \\le C\\|u^n - u\\|^2" />
          <MathBlock tex="\\|u^n - u\\| \\le C^{-1}(C\\epsilon)^{2^n} \\xrightarrow{n \\to \\infty} 0" />
          <Hypotheses
            items={[
              "F est de classe C² (J est de classe C³)",
              "u est un zero regulier : F(u) = 0 et F'(u) inversible",
              "L'initialisation est proche : ‖u⁰ − u‖ ≤ ε (convergence locale !)",
            ]}
          />
        </Theorem>

        <Proof title="Preuve (convergence quadratique)">
          <p>
            Par Taylor avec reste exact :{" "}
            <M t="F(u) = F(u^n) + F'(u^n)(u - u^n) + H^n \\cdot (u - u^n)" />{" "}
            avec{" "}
            <M t="H^n = \\int_0^1 F''(u^n + s(u-u^n))(1-s)\\,ds" />.
          </p>
          <p>
            Comme <M t="F(u) = 0" /> et{" "}
            <M t="u^{n+1} - u = u^n - u - (F'(u^n))^{-1}F(u^n)" /> :
          </p>
          <MathBlock tex="u^{n+1} - u = (F'(u^n))^{-1} H^n (u^n - u)" />
          <p>
            D&apos;ou <M t="\\|u^{n+1} - u\\| \\le C\\|u^n - u\\|^2" /> avec{" "}
            <M t="C = \\frac{1}{2}C_1 C_2" /> ou <M t="C_1" /> borne{" "}
            <M t="\\|(F')^{-1}\\|" /> et <M t="C_2" /> borne{" "}
            <M t="\\|F''\\|" /> au voisinage de <M t="u" />.
          </p>
        </Proof>

        <Warning>
          <p>
            Newton ne converge que si <M t="u^0" /> est{" "}
            <strong>proche</strong> de la solution ! Les zeros de{" "}
            <M t="J'" /> peuvent etre des minima, des maxima, ou des points
            selle.
          </p>
        </Warning>

        <KeyConcept title="Newton hybride">
          <p>
            Pour rendre Newton robuste, on ajoute un pas de descente{" "}
            <M t="0 < \\mu \\le 1" /> :
          </p>
          <MathBlock tex="u^{n+1} = u^n - \\mu\\,(J''(u^n))^{-1} J'(u^n)" />
          <p>
            <strong>Strategie :</strong> on demarre avec <M t="\\mu" /> petit
            (descente sure), puis on augmente vers 1 (convergence quadratique).
            Si <M t="J" /> est fortement convexe, la direction de Newton{" "}
            <M t="w^n = (J'')^{-1}J'" /> est toujours une direction de descente.
          </p>
        </KeyConcept>

        <Def title="Algorithme de Gauss-Newton">
          <p>
            Pour les problemes de moindres carres non-lineaires{" "}
            <M t="\\min \\|F(u)\\|^2" /> avec{" "}
            <M t="F : \\mathbb{R}^N \\to \\mathbb{R}^M" /> :
          </p>
          <MathBlock tex="u^{n+1} = u^n - \\big(F'(u^n)^* F'(u^n)\\big)^{-1} F'(u^n)^* F(u^n)" />
          <p>
            A chaque iteration, on linearise <M t="F" /> et on resout les
            moindres carres lineaires. Si <M t="N = M" />, on retrouve Newton
            classique.
          </p>
        </Def>

        <Quiz
          question="La convergence de l'algorithme de Newton est..."
          options={[
            "Lineaire (comme le gradient)",
            "Quadratique (erreur au carre a chaque iteration)",
            "Cubique",
            "Exponentielle",
          ]}
          answer={1}
          explanation="Newton a une convergence quadratique : ‖uⁿ⁺¹ − u‖ ≤ C‖uⁿ − u‖². C'est extremement rapide — le nombre de chiffres significatifs double a chaque iteration."
        />
      </Section>

      {/* ============================================================ */}
      {/* 10. ACCELERATION DES ALGORITHMES                              */}
      {/* ============================================================ */}
      <Section
        id="acceleration"
        number="10"
        title="Acceleration des algorithmes d'ordre 1"
      >
        <p>
          Peut-on converger plus vite que le gradient a pas fixe tout en
          restant un algorithme d&apos;ordre 1 (sans calculer{" "}
          <M t="J''" /> ) ? <strong>Oui !</strong>
        </p>

        <p>
          Trois algorithmes classiques ont une meilleure vitesse de
          convergence :
        </p>

        <Def title="Algorithme de Nesterov">
          <p>
            Introduit une variable auxiliaire (momentum) :
          </p>
          <MathBlock tex="\\begin{cases} v^{n+1} = u^n - \\mu\\, J'(u^n) \\\\ u^{n+1} = v^{n+1} + \\beta(v^{n+1} - v^n) \\end{cases}" />
        </Def>

        <Def title="Algorithme de la boule pesante (heavy ball)">
          <MathBlock tex="u^{n+1} = u^n - \\mu\\, J'(u^n) + \\beta(u^n - u^{n-1})" />
          <p>
            On utilise la direction precedente comme &laquo; inertie &raquo;.
          </p>
        </Def>

        <Def title="Gradient conjugue">
          <p>
            On choisit des directions de descente conjuguees par rapport a la
            hessienne (ou une approximation). Converge en au plus <M t="N" />{" "}
            iterations pour un probleme quadratique en dimension <M t="N" />.
          </p>
        </Def>

        <Theorem name="Vitesse de convergence amelioree">
          <p>
            Pour <M t="\\alpha/L \\ll 1" /> (probleme mal conditionne), ces
            trois algorithmes ont une vitesse :
          </p>
          <MathBlock tex="\\|u^n - u\\| \\le \\gamma^n \\|u^0 - u\\| \\quad \\text{avec} \\quad \\gamma = 1 - \\mathcal{O}\\!\\left(\\sqrt{\\frac{\\alpha}{L}}\\right)" />
          <p>contre</p>
          <MathBlock tex="\\gamma_{\\text{gradient}} = 1 - \\mathcal{O}\\!\\left(\\frac{\\alpha}{L}\\right)" />
          <p>
            Comme{" "}
            <M t="\\sqrt{\\alpha/L} \\gg \\alpha/L" /> pour{" "}
            <M t="\\alpha/L" /> petit, l&apos;amelioration est{" "}
            <strong>considerable</strong>.
          </p>
        </Theorem>

        <ComparisonTable
          headers={[
            "Algorithme",
            "Ordre",
            "Vitesse γ",
            "Cout / iteration",
          ]}
          rows={[
            [
              "Gradient pas fixe",
              "1",
              "(L−α)/(L+α) ≈ 1 − 2α/L",
              "1 gradient",
            ],
            [
              "Nesterov / Boule pesante",
              "1",
              "(√L−√α)/(√L+√α) ≈ 1 − 2√(α/L)",
              "1 gradient + memoire",
            ],
            [
              "Gradient conjugue",
              "1",
              "≈ 1 − 2√(α/L)",
              "1 gradient + 1 direction",
            ],
            [
              "Newton",
              "2",
              "Quadratique (pas lineaire)",
              "1 gradient + 1 hessienne + 1 systeme lineaire",
            ],
          ]}
        />

        <Warning>
          <p>
            <strong>Limitation principale :</strong> les constantes{" "}
            <M t="\\alpha" /> et <M t="L" /> ne sont pas connues en general !
            Il faut les estimer ou utiliser une recherche de pas (line search).
          </p>
          <p>
            De plus, la vitesse de convergence se <strong>degrade</strong> si{" "}
            <M t="J" /> est seulement convexe (pas fortement convexe).
          </p>
        </Warning>

        <KeyConcept title="Resume : comment choisir son algorithme ?">
          <p>
            • Probleme bien conditionne (<M t="\\kappa" /> petit) : le{" "}
            <strong>gradient</strong> suffit
            <br />• Probleme mal conditionne (<M t="\\kappa" /> grand) :{" "}
            <strong>Nesterov</strong> ou{" "}
            <strong>gradient conjugue</strong>
            <br />• Dimension faible, hessienne calculable :{" "}
            <strong>Newton</strong> (convergence quadratique)
            <br />• Moindres carres non-lineaires :{" "}
            <strong>Gauss-Newton</strong>
          </p>
        </KeyConcept>

        <Quiz
          question="L'algorithme de Nesterov converge avec γ = 1 − O(√(α/L)). C'est mieux que le gradient a pas fixe (γ = 1 − O(α/L)) car..."
          options={[
            "√(α/L) < α/L pour α/L petit, donc 1 − √(α/L) est plus petit",
            "√(α/L) > α/L pour α/L < 1, donc on retranche plus et γ est plus petit",
            "Nesterov utilise la hessienne, ce qui est plus precis",
            "Nesterov ne fonctionne qu'en dimension finie",
          ]}
          answer={1}
          explanation="Pour α/L < 1 (probleme mal conditionne), on a √(α/L) > α/L. Donc 1 − c√(α/L) < 1 − c(α/L), ce qui donne un γ plus petit et une convergence plus rapide. Nesterov n'utilise PAS la hessienne — c'est un algorithme d'ordre 1."
        />
      </Section>
    </>
  );
}
