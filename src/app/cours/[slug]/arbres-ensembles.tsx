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
  SvgDiagram, Box, Arrow, Label, GroupBox,
} from "@/components/svg-diagrams";
import { Def, Theorem, Proof, Remark } from "@/components/math-elements";

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

/* Unicode math symbols reference:
   α β γ δ ε θ λ μ ν σ φ ω κ η
   ∀ ∃ ∈ ∉ ⊂ ⊃ ∩ ∪ ∅
   ≤ ≥ ≠ ≈ → ⟹ ⟸ ⟺ ∞
   ⟨ ⟩ ‖ ∂ ∇ ∑ ∏ √
   ℝ ℕ ℤ ℚ ℂ ℓ
*/

export function ArbresEnsembles() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. POURQUOI CE MODULE                                        */}
      {/* ============================================================ */}
      <Section id="pourquoi" number="01" title="Pourquoi ce module">
        <p>
          Les reseaux de neurones dominent la vision, le NLP et la generation.
          Mais dans le monde reel — scoring bancaire, detection de fraude,
          donnees tabulaires — ce sont les <strong>methodes a base d&apos;arbres</strong> qui
          regnent. Sur Kaggle, plus de 70% des competitions sur donnees
          tabulaires sont remportees par XGBoost, LightGBM ou CatBoost.
        </p>

        <KeyConcept title="Arbres et ensembles : les rois du tabulaire">
          <p>
            Les arbres de decision sont interpretables et puissants. En les
            combinant via <strong>bagging</strong> (Random Forest) ou{" "}
            <strong>boosting</strong> (XGBoost), on obtient des modeles qui
            dominent le ML classique en precision, robustesse et vitesse
            d&apos;entrainement.
          </p>
        </KeyConcept>

        <Analogy>
          <p>
            Un arbre de decision, c&apos;est comme un medecin qui pose des
            questions binaires : &quot;Avez-vous de la fievre ?&quot;,
            &quot;Depuis plus de 3 jours ?&quot;, &quot;Toux seche ?&quot;.
            Chaque reponse mene a une branche differente. A la fin, il pose un
            diagnostic. Un Random Forest, c&apos;est un conseil de 500 medecins
            qui votent. XGBoost, c&apos;est un medecin qui apprend de ses
            erreurs a chaque consultation.
          </p>
        </Analogy>

        <p>
          Ce module couvre la theorie mathematique complete — de la construction
          d&apos;un arbre CART aux algorithmes de boosting modernes — avec du
          code Python a chaque etape. On termine par les applications en finance
          et les papiers recents.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 2. ARBRES DE DECISION                                        */}
      {/* ============================================================ */}
      <Section id="arbres-decision" number="02" title="Arbres de decision — CART">
        <p>
          L&apos;algorithme{" "}
          <Term def="Classification And Regression Trees. Algorithme publie par Breiman et al. en 1984, qui construit un arbre binaire par splits recursifs.">
            CART
          </Term>{" "}
          construit un arbre binaire en cherchant, a chaque noeud, la meilleure
          question (feature + seuil) pour separer les donnees.
        </p>

        <Def title="Impurete de Gini">
          <p>
            Pour un noeud contenant des echantillons de <F>K</F> classes, avec{" "}
            <Sub sub="k"><F>p</F></Sub> la proportion de la classe <F>k</F> :
          </p>
          <Eq>
            <F>Gini(t) = 1 − </F>
            <F>∑</F>
            <Sub sub="k=1"><span /></Sub>
            <Sup sup="K"><span /></Sup>{" "}
            <Sub sub="k"><F>p</F></Sub>
            <Sup sup="2"><span /></Sup>
          </Eq>
          <p>
            Gini = 0 quand le noeud est pur (une seule classe). Gini maximal
            = <F>1 − 1/K</F> quand les classes sont equiprobables.
          </p>
        </Def>

        <Def title="Entropie de Shannon et Information Gain">
          <p>
            L&apos;entropie mesure l&apos;incertitude dans un noeud :
          </p>
          <Eq>
            <F>H(t) = − ∑</F>
            <Sub sub="k=1"><span /></Sub>
            <Sup sup="K"><span /></Sup>{" "}
            <Sub sub="k"><F>p</F></Sub>{" "}
            <F>log</F>
            <Sub sub="2"><span /></Sub>
            <F>(</F>
            <Sub sub="k"><F>p</F></Sub>
            <F>)</F>
          </Eq>
          <p>
            L&apos;<strong>information gain</strong> d&apos;un split est la
            reduction d&apos;entropie ponderee par la taille des noeuds fils :
          </p>
          <Eq>
            <F>IG = H(parent) − </F>
            <Frac n={<><Sub sub="gauche"><F>N</F></Sub></>} d={<F>N</F>} />
            <F>H(gauche) − </F>
            <Frac n={<><Sub sub="droite"><F>N</F></Sub></>} d={<F>N</F>} />
            <F>H(droite)</F>
          </Eq>
        </Def>

        <Steps>
          <Step number="1" title="Enumerer tous les splits possibles">
            Pour chaque feature et chaque seuil candidat, calculer le critere
            (Gini ou IG) apres le split.
          </Step>
          <Step number="2" title="Choisir le meilleur split">
            Retenir le couple (feature, seuil) qui maximise la reduction
            d&apos;impurete.
          </Step>
          <Step number="3" title="Recurser">
            Appliquer recursivement sur les noeuds fils jusqu&apos;a un critere
            d&apos;arret (profondeur max, nombre min d&apos;echantillons, gain
            minimal).
          </Step>
        </Steps>

        <Warning>
          <p>
            Un arbre sans contrainte va <strong>overfit</strong> : il cree une
            feuille par echantillon. Le <strong>pruning</strong> (elagage) est
            essentiel. On utilise soit le pre-pruning (max_depth, min_samples_leaf),
            soit le cost-complexity pruning : minimiser{" "}
            <F>R(T) + α|T|</F> ou <F>|T|</F> est le nombre de feuilles et{" "}
            <F>α</F> le parametre de regularisation.
          </p>
        </Warning>

        <Code language="python">{`# Decision tree from scratch — Gini split
import numpy as np

def gini_impurity(y):
    """Calcule l'impurete de Gini pour un vecteur de labels."""
    classes, counts = np.unique(y, return_counts=True)
    proportions = counts / len(y)
    return 1 - np.sum(proportions ** 2)

def best_split(X, y):
    """Trouve le meilleur split (feature, seuil) par Gini."""
    best_gain, best_feat, best_thresh = -1, None, None
    parent_gini = gini_impurity(y)
    n = len(y)

    for feat in range(X.shape[1]):
        thresholds = np.unique(X[:, feat])
        for thresh in thresholds:
            left_mask = X[:, feat] <= thresh
            right_mask = ~left_mask
            if left_mask.sum() == 0 or right_mask.sum() == 0:
                continue

            g_left = gini_impurity(y[left_mask])
            g_right = gini_impurity(y[right_mask])
            weighted = (left_mask.sum() / n) * g_left \\
                     + (right_mask.sum() / n) * g_right
            gain = parent_gini - weighted

            if gain > best_gain:
                best_gain = gain
                best_feat = feat
                best_thresh = thresh

    return best_feat, best_thresh, best_gain

# Test sur des donnees simples
X = np.array([[2.5], [1.0], [3.0], [0.5], [4.0]])
y = np.array([1, 0, 1, 0, 1])
feat, thresh, gain = best_split(X, y)
print(f"Split: feature {feat}, seuil {thresh}, gain {gain:.3f}")`}</Code>

        <Quiz
          question="Quelle valeur de Gini indique un noeud parfaitement pur ?"
          options={[
            "Gini = 1",
            "Gini = 0.5",
            "Gini = 0",
            "Gini = -1",
          ]}
          answer={2}
          explanation="Gini = 0 signifie que tous les echantillons appartiennent a la meme classe. C'est le noeud le plus pur possible."
        />
      </Section>

      {/* ============================================================ */}
      {/* 3. BAGGING & BOOTSTRAP                                       */}
      {/* ============================================================ */}
      <Section id="bagging" number="03" title="Bagging & Bootstrap">
        <p>
          Un arbre seul est instable : un petit changement dans les donnees peut
          modifier completement l&apos;arbre. Le{" "}
          <Term def="Bootstrap Aggregating. Technique proposee par Breiman (1996) qui entraine plusieurs modeles sur des echantillons bootstrap et agrege leurs predictions.">
            bagging
          </Term>{" "}
          reduit cette variance en entrainant plusieurs arbres sur des
          echantillons differents et en agregeant leurs predictions.
        </p>

        <Def title="Echantillon Bootstrap">
          <p>
            A partir d&apos;un dataset de <F>n</F> echantillons, on tire{" "}
            <F>n</F> echantillons <strong>avec remise</strong>. En moyenne,
            chaque echantillon bootstrap contient ~63.2% des donnees originales
            (la probabilite qu&apos;un point soit inclus est{" "}
            <F>1 − (1 − 1/n)</F><Sup sup="n"><span /></Sup>{" "}
            <F>→ 1 − 1/e ≈ 0.632</F>).
          </p>
        </Def>

        <Theorem title="Propriete" name="Reduction de variance par bagging">
          <p>
            Si <F>B</F> modeles ont chacun une variance <F>σ</F><Sup sup="2"><span /></Sup>{" "}
            et une correlation mutuelle <F>ρ</F>, la variance de leur moyenne
            est :
          </p>
          <Eq>
            <F>Var(</F><F>f</F><Sub sub="bag"><span /></Sub><F>) = ρσ</F>
            <Sup sup="2"><span /></Sup>
            <F> + </F>
            <Frac n={<><F>(1 − ρ)σ</F><Sup sup="2"><span /></Sup></>} d={<F>B</F>} />
          </Eq>
          <p>
            Quand <F>B → ∞</F>, le second terme disparait. Il reste{" "}
            <F>ρσ</F><Sup sup="2"><span /></Sup> : la variance
            irreductible due a la correlation entre arbres.
          </p>
        </Theorem>

        <Proof title="Pourquoi ~63.2% ?">
          <p>
            La probabilite qu&apos;un point donne ne soit jamais tire en{" "}
            <F>n</F> tirages est{" "}
            <F>(1 − 1/n)</F><Sup sup="n"><span /></Sup>. Quand{" "}
            <F>n → ∞</F>, cette expression tend vers{" "}
            <F>1/e ≈ 0.368</F>. Donc la probabilite d&apos;etre inclus au
            moins une fois est <F>1 − 1/e ≈ 0.632</F>.
          </p>
        </Proof>

        <KeyConcept title="Out-of-Bag (OOB) Error">
          <p>
            Les ~36.8% de points non selectionnes dans chaque bootstrap forment
            l&apos;ensemble <strong>out-of-bag</strong>. On peut les utiliser
            comme set de validation gratuit : chaque point est predit par les
            arbres pour lesquels il etait OOB. L&apos;erreur OOB est un
            estimateur non biaise de l&apos;erreur de generalisation, sans
            besoin de validation croisee.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 4. RANDOM FORESTS                                            */}
      {/* ============================================================ */}
      <Section id="random-forests" number="04" title="Random Forests">
        <p>
          Le Random Forest (Breiman, 2001) ajoute une idee au bagging :
          a chaque split, on ne considere qu&apos;un sous-ensemble aleatoire de
          features. Cela <strong>decorele les arbres</strong> et reduit le terme{" "}
          <F>ρ</F> dans la formule de variance.
        </p>

        <Def title="Random Forest">
          <p>
            Pour chaque arbre <F>b = 1, ..., B</F> :
          </p>
          <p>1. Tirer un echantillon bootstrap de taille <F>n</F></p>
          <p>
            2. A chaque split, selectionner aleatoirement <F>m</F> features
            parmi les <F>p</F> disponibles
          </p>
          <p>
            3. Choisir le meilleur split parmi ces <F>m</F> features
          </p>
          <p>
            Prediction : vote majoritaire (classification) ou moyenne
            (regression).
          </p>
          <p>
            Valeur typique : <F>m = √p</F> (classification),{" "}
            <F>m = p/3</F> (regression).
          </p>
        </Def>

        <SvgDiagram width={580} height={310} title="Random Forest -- decorrelation des arbres">
          {/* Dataset source */}
          <Box x={200} y={10} w={180} h={38} label="Dataset D" color="default" />
          {/* Bootstrap samples */}
          <GroupBox x={30} y={75} w={520} h={190} label="Echantillons bootstrap + m features" color="accent" />
          <Box x={55} y={100} w={130} h={36} label="Bootstrap 1" sublabel="m features" color="amber" />
          <Box x={225} y={100} w={130} h={36} label="Bootstrap 2" sublabel="m features" color="amber" />
          <Box x={395} y={100} w={130} h={36} label="Bootstrap B" sublabel="m features" color="amber" />
          {/* Arrows from dataset to bootstraps */}
          <Arrow x1={260} y1={48} x2={120} y2={100} />
          <Arrow x1={290} y1={48} x2={290} y2={100} />
          <Arrow x1={320} y1={48} x2={460} y2={100} />
          {/* Trees */}
          <Box x={65} y={170} w={110} h={36} label="Arbre 1" color="violet" />
          <Box x={235} y={170} w={110} h={36} label="Arbre 2" color="violet" />
          <Box x={405} y={170} w={110} h={36} label="Arbre B" color="violet" />
          <Label x={365} y={188} text="..." size={16} weight="bold" />
          {/* Arrows from bootstraps to trees */}
          <Arrow x1={120} y1={136} x2={120} y2={170} />
          <Arrow x1={290} y1={136} x2={290} y2={170} />
          <Arrow x1={460} y1={136} x2={460} y2={170} />
          {/* Arrows from trees to aggregation */}
          <Arrow x1={120} y1={206} x2={255} y2={280} />
          <Arrow x1={290} y1={206} x2={290} y2={280} />
          <Arrow x1={460} y1={206} x2={325} y2={280} />
          {/* Aggregation */}
          <Box x={185} y={280} w={210} h={22} label="Agregation (vote / moyenne)" color="cyan" rx={4} />
        </SvgDiagram>

        <ComparisonTable
          headers={["Hyperparametre", "Role", "Valeur typique"]}
          rows={[
            ["n_estimators", "Nombre d'arbres", "100-500 (plus = mieux, rendements decroissants)"],
            ["max_depth", "Profondeur max par arbre", "None (laisser pousser) ou 10-30"],
            ["max_features", "Features par split", "sqrt(p) classif, p/3 regression"],
            ["min_samples_leaf", "Echantillons min par feuille", "1-5 (regularisation)"],
            ["oob_score", "Utiliser l'erreur OOB", "True (validation gratuite)"],
          ]}
        />

        <Code language="python">{`from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Charger les donnees
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Entrainer un Random Forest
rf = RandomForestClassifier(
    n_estimators=300,
    max_features="sqrt",
    oob_score=True,
    random_state=42,
    n_jobs=-1,
)
rf.fit(X_train, y_train)

print(f"OOB score: {rf.oob_score_:.4f}")
print(f"Test accuracy: {rf.score(X_test, y_test):.4f}")
print(classification_report(y_test, rf.predict(X_test)))`}</Code>

        <Quiz
          question="Pourquoi le Random Forest selectionne un sous-ensemble de features a chaque split ?"
          options={[
            "Pour accelerer l'entrainement uniquement",
            "Pour decorreler les arbres et reduire la variance de l'ensemble",
            "Pour augmenter le biais du modele",
            "Pour eviter d'utiliser des features continues",
          ]}
          answer={1}
          explanation="La selection aleatoire de features decorele les arbres (reduit rho dans la formule de variance), ce qui est la cle de la superiorite du Random Forest sur le simple bagging."
        />
      </Section>

      {/* ============================================================ */}
      {/* 5. GRADIENT BOOSTING                                         */}
      {/* ============================================================ */}
      <Section id="gradient-boosting" number="05" title="Gradient Boosting — theorie complete">
        <p>
          Le boosting adopte une strategie opposee au bagging : au lieu
          d&apos;arbres independants, chaque arbre corrige les erreurs des
          precedents. Le <strong>Gradient Boosting</strong> (Friedman, 2001)
          formalise cela comme une descente de gradient dans l&apos;espace des
          fonctions.
        </p>

        <Def title="Modele additif">
          <p>
            Le modele final est une somme de <F>M</F> apprenants faibles :
          </p>
          <Eq>
            <F>F(x) = </F>
            <Sub sub="0"><F>F</F></Sub>
            <F>(x) + ∑</F>
            <Sub sub="m=1"><span /></Sub>
            <Sup sup="M"><span /></Sup>{" "}
            <Sub sub="m"><F>η h</F></Sub>
            <F>(x)</F>
          </Eq>
          <p>
            ou <Sub sub="m"><F>h</F></Sub> est l&apos;arbre <F>m</F> et{" "}
            <F>η ∈ (0, 1]</F> est le <strong>learning rate</strong> (shrinkage).
          </p>
        </Def>

        <Theorem title="Propriete" name="Descente de gradient dans l'espace des fonctions">
          <p>
            A l&apos;etape <F>m</F>, on cherche a minimiser la loss totale{" "}
            <F>L = ∑</F><Sub sub="i"><span /></Sub>{" "}
            <F>l(</F><Sub sub="i"><F>y</F></Sub><F>, F(</F><Sub sub="i"><F>x</F></Sub><F>))</F>.
            On calcule les <strong>pseudo-residus</strong> :
          </p>
          <Eq>
            <Sub sub="im"><F>r</F></Sub>
            <F> = − </F>
            <Frac
              n={<><F>∂ l(</F><Sub sub="i"><F>y</F></Sub><F>, F(</F><Sub sub="i"><F>x</F></Sub><F>))</F></>}
              d={<><F>∂ F(</F><Sub sub="i"><F>x</F></Sub><F>)</F></>}
            />
          </Eq>
          <p>
            Ces pseudo-residus sont le gradient negatif de la loss par rapport
            aux predictions. On entraine un arbre{" "}
            <Sub sub="m"><F>h</F></Sub> pour predire ces pseudo-residus, puis
            on met a jour :
          </p>
          <Eq>
            <Sub sub="m"><F>F</F></Sub>
            <F>(x) = </F>
            <Sub sub="m-1"><F>F</F></Sub>
            <F>(x) + η · </F>
            <Sub sub="m"><F>h</F></Sub>
            <F>(x)</F>
          </Eq>
        </Theorem>

        <Steps>
          <Step number="1" title="Initialiser">
            <F>F</F><Sub sub="0"><span /></Sub><F>(x) = argmin</F><Sub sub="γ"><span /></Sub>{" "}
            <F>∑ l(</F><Sub sub="i"><F>y</F></Sub><F>, γ)</F> — souvent la
            moyenne (regression) ou le log-odds (classification).
          </Step>
          <Step number="2" title="Pour m = 1 a M">
            Calculer les pseudo-residus{" "}
            <Sub sub="im"><F>r</F></Sub> pour chaque echantillon. Entrainer un
            arbre sur les paires (<Sub sub="i"><F>x</F></Sub>,{" "}
            <Sub sub="im"><F>r</F></Sub>).
          </Step>
          <Step number="3" title="Optimiser la taille du pas">
            Pour chaque feuille <F>j</F> de l&apos;arbre, trouver le poids
            optimal :{" "}
            <Sub sub="jm"><F>γ</F></Sub>{" "}
            <F>= argmin</F><Sub sub="γ"><span /></Sub>{" "}
            <F>∑</F><Sub sub="i ∈ feuille j"><span /></Sub>{" "}
            <F>l(</F><Sub sub="i"><F>y</F></Sub><F>, </F>
            <Sub sub="m-1"><F>F</F></Sub>
            <F>(</F><Sub sub="i"><F>x</F></Sub><F>) + γ)</F>.
          </Step>
          <Step number="4" title="Mettre a jour">
            <Sub sub="m"><F>F</F></Sub><F>(x) = </F>
            <Sub sub="m-1"><F>F</F></Sub><F>(x) + η · </F>
            <Sub sub="m"><F>h</F></Sub><F>(x)</F>.
          </Step>
        </Steps>

        <SvgDiagram width={750} height={280} title="Gradient Boosting : construction additive iteration par iteration">
          {/* Iteration 0 — initialization */}
          <Box x={10} y={30} w={100} h={44} label="F_0(x)" sublabel="init (moyenne)" color="accent" />
          <Arrow x1={110} y1={52} x2={145} y2={52} color="#10b981" />

          {/* Iteration 1 */}
          <GroupBox x={145} y={8} w={180} h={115} label="Iteration 1" color="violet" />
          <Box x={160} y={30} w={150} h={36} label="Pseudo-residus" sublabel="r_1 = -(dL/dF)" color="violet" />
          <Arrow x1={235} y1={66} x2={235} y2={78} color="#8b5cf6" />
          <Box x={160} y={78} w={150} h={36} label="Arbre h_1" sublabel="fit sur r_1" color="violet" />

          {/* Update F_1 */}
          <Arrow x1={325} y1={96} x2={360} y2={96} color="#8b5cf6" />
          <Box x={360} y={76} w={120} h={44} label="F_1 = F_0" sublabel="+ eta * h_1" color="accent" />
          <Arrow x1={480} y1={98} x2={510} y2={98} color="#10b981" />

          {/* Iteration 2 */}
          <GroupBox x={510} y={8} w={180} h={115} label="Iteration 2" color="cyan" />
          <Box x={525} y={30} w={150} h={36} label="Pseudo-residus" sublabel="r_2 = -(dL/dF)" color="cyan" />
          <Arrow x1={600} y1={66} x2={600} y2={78} color="#06b6d4" />
          <Box x={525} y={78} w={150} h={36} label="Arbre h_2" sublabel="fit sur r_2" color="cyan" />

          {/* F_2 result */}
          <Arrow x1={600} y1={123} x2={600} y2={150} color="#06b6d4" />
          <Box x={530} y={150} w={140} h={44} label="F_2 = F_1" sublabel="+ eta * h_2" color="accent" />

          {/* Dots to indicate continuation */}
          <Arrow x1={600} y1={194} x2={600} y2={220} color="#a1a1aa" dashed />
          <Label x={600} y={240} text="... continue M iterations" size={11} color="#a1a1aa" />

          {/* Final model */}
          <Box x={10} y={200} w={320} h={50} label="F_M(x) = F_0 + eta*h_1 + eta*h_2 + ... + eta*h_M" color="amber" />
          <Label x={170} y={268} text="Chaque arbre corrige l'erreur residuelle du precedent" size={10} color="#a1a1aa" />

          {/* Learning rate annotation */}
          <Label x={170} y={148} text="eta = learning rate (0.01 - 0.3)" size={10} color="#f59e0b" />
        </SvgDiagram>

        <Remark>
          <p>
            Le <strong>learning rate</strong> <F>η</F> est crucial. Un{" "}
            <F>η</F> petit (0.01-0.1) avec plus d&apos;arbres donne de meilleurs
            resultats qu&apos;un <F>η</F> grand avec peu d&apos;arbres. C&apos;est
            le trade-off shrinkage : on echange du compute contre de la
            generalisation.
          </p>
        </Remark>

        <Warning>
          <p>
            Contrairement au Random Forest, le Gradient Boosting est sensible
            a l&apos;overfitting si <F>M</F> est trop grand. Le{" "}
            <strong>early stopping</strong> (arreter quand la validation stagne)
            est indispensable en pratique.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 6. XGBOOST                                                   */}
      {/* ============================================================ */}
      <Section id="xgboost" number="06" title="XGBoost — eXtreme Gradient Boosting">
        <p>
          XGBoost (Chen & Guestrin, 2016) est l&apos;implementation de
          reference du gradient boosting. Il ajoute trois innovations majeures :
          une regularisation explicite, une approximation efficace des splits, et
          une architecture systeme optimisee.
        </p>

        <Def title="Objectif regularise de XGBoost">
          <p>
            A l&apos;etape <F>m</F>, XGBoost minimise :
          </p>
          <Eq>
            <F>Obj = ∑</F><Sub sub="i=1"><span /></Sub><Sup sup="n"><span /></Sup>{" "}
            <F>l(</F><Sub sub="i"><F>y</F></Sub><F>, </F>
            <Sub sub="i"><F>ŷ</F></Sub><Sup sup="(m-1)"><span /></Sup>
            <F> + </F><Sub sub="m"><F>f</F></Sub><F>(</F>
            <Sub sub="i"><F>x</F></Sub><F>)) + Ω(</F>
            <Sub sub="m"><F>f</F></Sub><F>)</F>
          </Eq>
          <p>
            ou le terme de regularisation est :
          </p>
          <Eq>
            <F>Ω(f) = γT + </F>
            <Frac n={<F>1</F>} d={<F>2</F>} />
            <F>λ ∑</F><Sub sub="j=1"><span /></Sub><Sup sup="T"><span /></Sup>{" "}
            <Sub sub="j"><F>w</F></Sub><Sup sup="2"><span /></Sup>
            <F> + α ∑</F><Sub sub="j=1"><span /></Sub><Sup sup="T"><span /></Sup>{" "}
            <F>|</F><Sub sub="j"><F>w</F></Sub><F>|</F>
          </Eq>
          <p>
            <F>T</F> = nombre de feuilles, <Sub sub="j"><F>w</F></Sub> = poids
            de la feuille <F>j</F>, <F>γ</F> = cout par feuille (L0),{" "}
            <F>λ</F> = regularisation L2, <F>α</F> = regularisation L1.
          </p>
        </Def>

        <Theorem title="Propriete" name="Approximation de Taylor ordre 2">
          <p>
            En faisant un developpement de Taylor a l&apos;ordre 2 de la loss
            autour de <Sub sub="i"><F>ŷ</F></Sub><Sup sup="(m-1)"><span /></Sup>,
            avec <Sub sub="i"><F>g</F></Sub> = gradient et{" "}
            <Sub sub="i"><F>h</F></Sub> = hessienne :
          </p>
          <Eq>
            <F>Obj ≈ ∑</F><Sub sub="i"><span /></Sub>{" "}
            <F>[</F><Sub sub="i"><F>g</F></Sub>{" "}
            <Sub sub="m"><F>f</F></Sub><F>(</F><Sub sub="i"><F>x</F></Sub><F>) + </F>
            <Frac n={<F>1</F>} d={<F>2</F>} />
            <Sub sub="i"><F>h</F></Sub>{" "}
            <Sub sub="m"><F>f</F></Sub><Sup sup="2"><span /></Sup>
            <F>(</F><Sub sub="i"><F>x</F></Sub><F>)] + Ω(</F>
            <Sub sub="m"><F>f</F></Sub><F>)</F>
          </Eq>
          <p>
            Le poids optimal de chaque feuille <F>j</F> est alors :
          </p>
          <Eq>
            <Sub sub="j"><F>w</F></Sub><Sup sup="*"><span /></Sup>
            <F> = − </F>
            <Frac
              n={<><F>∑</F><Sub sub="i ∈ j"><span /></Sub>{" "}<Sub sub="i"><F>g</F></Sub></>}
              d={<><F>∑</F><Sub sub="i ∈ j"><span /></Sub>{" "}<Sub sub="i"><F>h</F></Sub><F> + λ</F></>}
            />
          </Eq>
          <p>
            Et le gain d&apos;un split est :
          </p>
          <Eq>
            <F>Gain = </F>
            <Frac n={<F>1</F>} d={<F>2</F>} />
            <F>[</F>
            <Frac
              n={<><F>(∑</F><Sub sub="i ∈ L"><span /></Sub>{" "}<Sub sub="i"><F>g</F></Sub><F>)</F><Sup sup="2"><span /></Sup></>}
              d={<><F>∑</F><Sub sub="i ∈ L"><span /></Sub>{" "}<Sub sub="i"><F>h</F></Sub><F> + λ</F></>}
            />
            <F> + </F>
            <Frac
              n={<><F>(∑</F><Sub sub="i ∈ R"><span /></Sub>{" "}<Sub sub="i"><F>g</F></Sub><F>)</F><Sup sup="2"><span /></Sup></>}
              d={<><F>∑</F><Sub sub="i ∈ R"><span /></Sub>{" "}<Sub sub="i"><F>h</F></Sub><F> + λ</F></>}
            />
            <F> − </F>
            <Frac
              n={<><F>(∑</F><Sub sub="i"><span /></Sub>{" "}<Sub sub="i"><F>g</F></Sub><F>)</F><Sup sup="2"><span /></Sup></>}
              d={<><F>∑</F><Sub sub="i"><span /></Sub>{" "}<Sub sub="i"><F>h</F></Sub><F> + λ</F></>}
            />
            <F>] − γ</F>
          </Eq>
        </Theorem>

        <KeyConcept title="Innovations systeme de XGBoost">
          <p>
            <strong>Approximate split finding :</strong> au lieu de trier toutes
            les valeurs, XGBoost utilise des quantiles ponderes pour proposer
            des splits candidats. Complexite{" "}
            <F>O(n log n)</F> → <F>O(n)</F> par feature.
          </p>
          <p>
            <strong>Sparsity-aware :</strong> XGBoost gere nativement les
            valeurs manquantes en apprenant la direction par defaut a chaque
            noeud.
          </p>
          <p>
            <strong>Column block :</strong> les donnees sont stockees en
            colonnes triees en memoire, permettant un acces cache-friendly et
            le parallelisme par feature.
          </p>
        </KeyConcept>

        <Code language="python">{`import xgboost as xgb
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# DMatrix pour performance optimale
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)

params = {
    "objective": "binary:logistic",
    "eval_metric": "logloss",
    "max_depth": 6,
    "learning_rate": 0.1,
    "reg_lambda": 1.0,      # L2
    "reg_alpha": 0.0,       # L1
    "subsample": 0.8,
    "colsample_bytree": 0.8,
    "seed": 42,
}

model = xgb.train(
    params,
    dtrain,
    num_boost_round=500,
    evals=[(dtrain, "train"), (dtest, "eval")],
    early_stopping_rounds=20,
    verbose_eval=50,
)

print(f"Best iteration: {model.best_iteration}")
print(f"Best logloss: {model.best_score:.4f}")`}</Code>

        <Quiz
          question="Que regularise le parametre gamma dans XGBoost ?"
          options={[
            "Les poids des feuilles (L2)",
            "Le nombre de feuilles — chaque split doit apporter un gain > gamma",
            "Le learning rate",
            "Le nombre d'echantillons bootstrap",
          ]}
          answer={1}
          explanation="Gamma est le cout minimal de gain pour effectuer un split. Plus gamma est grand, plus l'arbre est conservateur — on elague les splits qui n'apportent pas assez."
        />
      </Section>

      {/* ============================================================ */}
      {/* 7. LIGHTGBM & CATBOOST                                       */}
      {/* ============================================================ */}
      <Section id="lightgbm-catboost" number="07" title="LightGBM & CatBoost">
        <p>
          Apres XGBoost, deux frameworks ont pousse les performances encore plus
          loin avec des innovations algorithmiques specifiques.
        </p>

        <KeyConcept title="LightGBM — deux innovations cles">
          <p>
            <strong>GOSS (Gradient-based One-Side Sampling) :</strong> au lieu
            d&apos;utiliser tous les echantillons pour trouver le split, LightGBM
            garde les echantillons avec les plus gros gradients (les plus
            &quot;difficiles&quot;) et sous-echantillonne le reste. Les gros
            gradients portent la majorite de l&apos;information.
          </p>
          <p>
            <strong>EFB (Exclusive Feature Bundling) :</strong> les features
            mutuellement exclusives (rarement non-nulles en meme temps) sont
            regroupees en un seul &quot;bundle&quot;. Cela reduit la
            dimensionnalite effective, surtout sur des donnees sparse.
          </p>
          <p>
            LightGBM utilise aussi le <strong>leaf-wise growth</strong> (au lieu
            du level-wise de XGBoost) : il etend toujours la feuille avec le
            plus grand gain, ce qui produit des arbres asymetriques mais plus
            efficaces.
          </p>
        </KeyConcept>

        <KeyConcept title="CatBoost — ordered boosting">
          <p>
            <strong>Ordered Boosting :</strong> pour eviter le target leakage
            (le modele voit les residus calcules sur les memes donnees
            d&apos;entrainement), CatBoost utilise une permutation aleatoire des
            donnees et ne calcule les residus de chaque echantillon qu&apos;avec
            un modele entraine sur les echantillons precedents dans la
            permutation.
          </p>
          <p>
            <strong>Gestion native des categoriques :</strong> CatBoost encode
            les features categorielles avec un <em>ordered target encoding</em>{" "}
            qui evite l&apos;overfitting du target encoding classique.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["", "XGBoost", "LightGBM", "CatBoost"]}
          rows={[
            ["Croissance arbre", "Level-wise", "Leaf-wise", "Symmetric (level-wise)"],
            ["Split finding", "Quantiles ponderes", "Histogrammes + GOSS", "Ordered TS + histogrammes"],
            ["Features categ.", "Encodage manuel", "Encodage manuel", "Natif (ordered encoding)"],
            ["Valeurs manquantes", "Direction par defaut", "Direction par defaut", "Min/max treatment"],
            ["GPU", "Oui", "Oui", "Oui (tres optimise)"],
            ["Innovation cle", "Regularisation L1/L2", "GOSS + EFB", "Ordered boosting"],
            ["Vitesse (grandes donnees)", "Moyen", "Rapide", "Moyen-rapide"],
            ["Use case ideal", "Polyvalent, standard", "Gros datasets, sparse", "Categoriques, petit a moyen"],
          ]}
        />

        <Warning>
          <p>
            En pratique, les trois frameworks donnent des performances tres
            proches sur la plupart des datasets. Le choix depend surtout de la
            nature des donnees : beaucoup de categoriques → CatBoost ;
            dataset tres large et sparse → LightGBM ; defaut solide → XGBoost.
            Toujours valider avec un benchmark sur vos donnees.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 8. APPLICATIONS FINANCE                                      */}
      {/* ============================================================ */}
      <Section id="finance" number="08" title="Applications en finance">
        <p>
          Les methodes d&apos;ensemble sont omni-presentes en finance
          quantitative. Trois cas d&apos;usage majeurs :
        </p>

        <Steps>
          <Step number="1" title="Credit scoring">
            Predire la probabilite de defaut d&apos;un emprunteur. Les arbres
            boostes remplacent progressivement la regression logistique car ils
            capturent les interactions non-lineaires sans feature engineering
            manuel. Regularite : Bale III impose l&apos;interpretabilite →
            SHAP values.
          </Step>
          <Step number="2" title="Detection de fraude">
            Classifier des transactions comme frauduleuses ou non. Donnees tres
            desequilibrees (0.1% de fraude). XGBoost avec{" "}
            <F>scale_pos_weight</F> ou SMOTE + Random Forest.
          </Step>
          <Step number="3" title="Signaux de trading algorithmique">
            Predire la direction d&apos;un actif sur un horizon court. Features
            techniques (RSI, MACD, Bollinger) + features fondamentales.
            Attention : l&apos;overfitting est le danger principal sur des series
            temporelles financieres.
          </Step>
        </Steps>

        <Code language="python">{`# Credit scoring avec XGBoost + SHAP
import xgboost as xgb
import shap
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

# Simuler un dataset de credit (en pratique : German Credit, etc.)
np.random.seed(42)
n = 5000
X = np.random.randn(n, 10)  # 10 features financieres
# Relation non-lineaire pour le defaut
logit = 0.5 * X[:, 0] - 0.3 * X[:, 1]**2 + 0.4 * X[:, 2] * X[:, 3]
y = (logit + np.random.randn(n) * 0.5 > 0).astype(int)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = xgb.XGBClassifier(
    n_estimators=200,
    max_depth=5,
    learning_rate=0.05,
    reg_lambda=1.0,
    subsample=0.8,
    eval_metric="auc",
)
model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    verbose=False,
)

y_proba = model.predict_proba(X_test)[:, 1]
print(f"AUC: {roc_auc_score(y_test, y_proba):.4f}")

# Interpretabilite avec SHAP
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)
shap.summary_plot(shap_values, X_test, show=False)
print("SHAP summary plot genere — interpretabilite Bale III")`}</Code>

        <Remark>
          <p>
            En finance reglementee, l&apos;interpretabilite n&apos;est pas
            optionnelle. Les SHAP values (Shapley Additive Explanations) sont
            devenues le standard car elles sont les seules a garantir les
            proprietes d&apos;equite du jeu cooperatif de Shapley : efficacite,
            symetrie, linearite, et joueur nul.
          </p>
        </Remark>

        <Quiz
          question="Pourquoi le scale_pos_weight est important en detection de fraude ?"
          options={[
            "Pour accelerer l'entrainement sur GPU",
            "Pour compenser le desequilibre de classes et eviter que le modele predise toujours 'non-fraude'",
            "Pour augmenter le learning rate automatiquement",
            "Pour ajouter de la regularisation L1",
          ]}
          answer={1}
          explanation="Avec 0.1% de fraude, un modele qui predit toujours 'non-fraude' a 99.9% d'accuracy. scale_pos_weight augmente le cout des faux negatifs pour forcer le modele a detecter les fraudes."
        />
      </Section>

      {/* ============================================================ */}
      {/* 9. PAPIERS RECENTS                                           */}
      {/* ============================================================ */}
      <Section id="papiers-recents" number="09" title="Papiers recents (2024-2025)">
        <p>
          Le boosting d&apos;arbres continue d&apos;evoluer. Voici les
          directions les plus prometteuses :
        </p>

        <KeyConcept title="Neural Decision Trees (NDTs)">
          <p>
            Fusion entre arbres et reseaux de neurones. Au lieu de splits
            durs (<F>x</F><Sub sub="j"><span /></Sub>{" "}
            <F>≤ t</F> ?), on utilise des splits{" "}
            <strong>differentiables</strong> via des sigmoides :{" "}
            <F>σ(</F><Sub sub="j"><F>w</F></Sub>{" "}
            <Sub sub="j"><F>x</F></Sub>{" "}
            <F>+ b)</F>. Cela permet l&apos;entrainement end-to-end par
            backpropagation. Papier cle : &quot;Neural Oblivious Decision
            Ensembles for Deep Learning on Tabular Data&quot; (NODE, 2024
            update avec integration XGBoost pour l&apos;initialisation).
          </p>
        </KeyConcept>

        <KeyConcept title="XGBoostLSS — boosting probabiliste">
          <p>
            Au lieu de predire un point (la moyenne), XGBoostLSS predit les
            parametres complets d&apos;une distribution (location, scale,
            shape). Par exemple, pour une regression gaussienne, il predit{" "}
            <F>μ</F> et <F>σ</F>. Cela donne des intervalles de confiance
            calibres — crucial en finance et sante.
          </p>
          <p>
            Extension recente : support de distributions zero-inflated pour les
            donnees de comptage avec exces de zeros (reclamations assurance).
          </p>
        </KeyConcept>

        <KeyConcept title="DART — Dropout Additive Regression Trees">
          <p>
            Applique le dropout des reseaux de neurones au boosting : a chaque
            iteration, un sous-ensemble aleatoire des arbres precedents est
            &quot;desactive&quot;. Cela combat l&apos;over-specialization ou les
            derniers arbres ne corrigent que des residus infimes. Integre dans
            XGBoost (<F>booster=&quot;dart&quot;</F>) et LightGBM.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Methode", "Innovation", "Avantage", "Limitation"]}
          rows={[
            [
              "NODE (Neural Decision Trees)",
              "Splits differentiables",
              "Entrainement end-to-end, GPU natif",
              "Plus lent, moins interpretable",
            ],
            [
              "XGBoostLSS",
              "Prediction de distributions",
              "Intervalles de confiance, incertitude",
              "Choix de la famille de distributions",
            ],
            [
              "DART",
              "Dropout sur les arbres",
              "Meilleure generalisation, anti-overfitting",
              "Plus lent (pas d'early stopping standard)",
            ],
            [
              "TabPFN (2024)",
              "Prior-data fitted network",
              "Zero-shot sur petit tabulaire",
              "Limite a ~10k echantillons, ~100 features",
            ],
          ]}
        />

        <Remark>
          <p>
            Malgre ces avancees, le benchmark &quot;Tabular Benchmarks for
            Evaluating Machine Learning&quot; (Grinsztajn et al., NeurIPS 2022,
            confirme en 2024) montre que XGBoost bien tune bat encore la plupart
            des approches deep learning sur donnees tabulaires de taille moyenne.
            Les methodes hybrides (NODE, TabNet) sont prometteuses mais pas
            encore dominantes en production.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 10. FEATURE IMPORTANCE                                       */}
      {/* ============================================================ */}
      <Section id="feature-importance" number="10" title="Feature importance et interpretabilite">
        <p>
          L&apos;interpretabilite est un avantage majeur des methodes a base
          d&apos;arbres. Trois approches principales :
        </p>

        <Def title="Importance par gain (split-based)">
          <p>
            Pour chaque feature, sommer le gain (reduction d&apos;impurete)
            apporte par tous les splits utilisant cette feature, sur tous les
            arbres. C&apos;est rapide mais biaise vers les features a haute
            cardinalite.
          </p>
        </Def>

        <Def title="Importance par permutation">
          <p>
            Permuter aleatoirement les valeurs d&apos;une feature et mesurer la
            degradation de la metrique de performance. Avantage : model-agnostic
            et non biaise. Inconvenient : lent sur de gros datasets.
          </p>
        </Def>

        <Def title="SHAP (SHapley Additive exPlanations)">
          <p>
            Basee sur la theorie des jeux cooperatifs. La contribution de chaque
            feature <F>i</F> est sa valeur de Shapley :
          </p>
          <Eq>
            <Sub sub="i"><F>φ</F></Sub>
            <F> = ∑</F><Sub sub="S ⊂ N\{'{i}'}"><span /></Sub>{" "}
            <Frac
              n={<><F>|S|!(|N| − |S| − 1)!</F></>}
              d={<F>|N|!</F>}
            />
            <F>[f(S ∪ {'{i}'}) − f(S)]</F>
          </Eq>
          <p>
            TreeSHAP (implementation pour les arbres) calcule ces valeurs en{" "}
            <F>O(TLD</F><Sup sup="2"><span /></Sup><F>)</F> au lieu de{" "}
            <F>O(2</F><Sup sup="p"><span /></Sup><F>)</F>.
          </p>
        </Def>

        <Code language="python">{`import xgboost as xgb
import matplotlib.pyplot as plt
import numpy as np

# Apres entrainement d'un modele XGBoost...
# model = xgb.XGBClassifier(...).fit(X_train, y_train)

# 1. Importance par gain (built-in)
fig, axes = plt.subplots(1, 2, figsize=(14, 5))
xgb.plot_importance(
    model, importance_type="gain",
    ax=axes[0], title="Importance par gain"
)

# 2. Importance par permutation (sklearn)
from sklearn.inspection import permutation_importance
perm = permutation_importance(model, X_test, y_test, n_repeats=10)
sorted_idx = perm.importances_mean.argsort()[::-1][:10]
axes[1].barh(range(10), perm.importances_mean[sorted_idx])
axes[1].set_title("Importance par permutation")
plt.tight_layout()
plt.savefig("feature_importance.png", dpi=150)
print("Graphique sauvegarde")`}</Code>

        <Quiz
          question="Quel est l'avantage principal de SHAP par rapport a l'importance par gain ?"
          options={[
            "SHAP est plus rapide a calculer",
            "SHAP fournit des attributions par prediction (locale), pas seulement globale, et n'est pas biaisee par la cardinalite",
            "SHAP ne fonctionne qu'avec les Random Forests",
            "SHAP remplace le besoin de validation croisee",
          ]}
          answer={1}
          explanation="SHAP donne des attributions locales (par echantillon) avec des garanties theoriques (proprietes de Shapley). L'importance par gain est globale et biaisee vers les features avec beaucoup de valeurs distinctes."
        />
      </Section>

      {/* ============================================================ */}
      {/* 11. QUIZ FINAL                                               */}
      {/* ============================================================ */}
      <Section id="quiz-final" number="11" title="Quiz final">
        <p>
          Testez votre comprehension des arbres et methodes d&apos;ensemble.
        </p>

        <Quiz
          question="Quelle est la difference fondamentale entre bagging et boosting ?"
          options={[
            "Le bagging utilise des arbres profonds, le boosting des arbres peu profonds",
            "Le bagging entraine les arbres en parallele et les agrege ; le boosting entraine sequentiellement, chaque arbre corrigeant les erreurs des precedents",
            "Le bagging est pour la classification, le boosting pour la regression",
            "Le bagging est une methode deep learning, le boosting est classique",
          ]}
          answer={1}
          explanation="Le bagging reduit la variance par agregation d'arbres independants. Le boosting reduit le biais en apprenant sequentiellement sur les erreurs residuelles."
        />

        <Quiz
          question="Dans XGBoost, l'approximation de Taylor a l'ordre 2 utilise quelles quantites ?"
          options={[
            "La loss et sa derivee premiere uniquement",
            "Le gradient (g) et la hessienne (h) de la loss par rapport aux predictions",
            "Les poids des features et le learning rate",
            "La variance et la moyenne des residus",
          ]}
          answer={1}
          explanation="XGBoost utilise g_i (gradient = derivee premiere) et h_i (hessienne = derivee seconde) pour approximer la loss et calculer analytiquement le poids optimal de chaque feuille."
        />

        <Quiz
          question="Quel framework de boosting gere nativement les features categorielles sans encodage prealable ?"
          options={[
            "XGBoost",
            "LightGBM",
            "CatBoost",
            "Tous les trois",
          ]}
          answer={2}
          explanation="CatBoost est le seul a gerer nativement les categoriques avec son ordered target encoding. XGBoost et LightGBM necessitent un encodage prealable (label encoding, one-hot)."
        />

        <Quiz
          question="Pourquoi l'erreur OOB (Out-of-Bag) est-elle utile dans un Random Forest ?"
          options={[
            "Elle permet de calculer l'importance des features",
            "Elle sert d'estimation de l'erreur de generalisation sans validation croisee, en utilisant les echantillons non selectionnes dans chaque bootstrap",
            "Elle mesure la correlation entre les arbres",
            "Elle determine automatiquement le nombre optimal d'arbres",
          ]}
          answer={1}
          explanation="Chaque echantillon est OOB pour ~36.8% des arbres. En agregeant les predictions de ces arbres-la, on obtient un estimateur non biaise de l'erreur de generalisation — gratuitement."
        />
      </Section>
    </>
  );
}
