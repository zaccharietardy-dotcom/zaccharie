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

/* Unicode math symbols reference:
   α β γ δ ε θ λ μ ν σ φ ω κ η ρ τ π
   ∀ ∃ ∈ ∉ ⊂ ⊃ ∩ ∪ ∅
   ≤ ≥ ≠ ≈ → ⟹ ⟸ ⟺ ∞
   ⟨ ⟩ ‖ ∂ ∇ ∑ ∏ √
   ℝ ℕ ℤ ℚ ℂ ℓ 𝔼 ℙ
*/

export function DataScience() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. INTRODUCTION A LA DATA SCIENCE                            */}
      {/* ============================================================ */}
      <Section id="introduction" number="01" title="Introduction a la data science">
        <p>
          La{" "}
          <Term def="Science des donnees : discipline combinant statistiques, informatique et expertise metier pour extraire des connaissances a partir de donnees.">
            data science
          </Term>{" "}
          est au carrefour des mathematiques, de l&apos;informatique et de
          l&apos;expertise metier. Ce cours, base sur le programme CSC_43042_EP
          de Steve Oudot a l&apos;Ecole Polytechnique, couvre les algorithmes
          fondamentaux pour l&apos;analyse de donnees : recherche de voisins,
          clustering, estimation de densite, classification et regression.
        </p>

        <KeyConcept title="Les trois defis de la data science">
          <p>
            <strong>Donnees complexes</strong> : images, graphes, texte,
            series temporelles — des structures riches qui ne se reduisent
            pas a un tableau. <strong>Donnees corrompues</strong> : bruit,
            valeurs manquantes, outliers. <strong>Big data</strong> :
            des volumes qui rendent les algorithmes naifs impraticables.
          </p>
        </KeyConcept>

        <Def title="Apprentissage supervise vs non supervise">
          <p>
            <strong>Supervise</strong> : on dispose de paires{" "}
            <F>(x, y)</F> — features et label. Le but est d&apos;apprendre
            une fonction <F>f</F> telle que <F>f(x) ≈ y</F> (regression
            ou classification).
          </p>
          <p>
            <strong>Non supervise</strong> : on n&apos;a que les{" "}
            <F>x</F>. Le but est de decouvrir une structure cachee :
            clusters, densite, dimensions pertinentes.
          </p>
        </Def>

        <Analogy>
          <p>
            L&apos;apprentissage supervise, c&apos;est un eleve qui revise
            avec un corrigue : il connait la bonne reponse. L&apos;apprentissage
            non supervise, c&apos;est un explorateur dans une foret sans carte :
            il doit trouver les chemins par lui-meme.
          </p>
        </Analogy>

        <p>
          Les succes celebres illustrent la puissance de ces methodes :
          AlphaGo (2016, apprentissage par renforcement + recherche Monte Carlo),
          AlphaFold (2020, prediction de structure proteique),
          et le defi ImageNet ou les CNN ont reduit le taux d&apos;erreur
          de 26% a 3.5% en quelques annees. Ce cours pose les fondements
          mathematiques sur lesquels reposent ces avancees.
        </p>

        <SvgDiagram width={620} height={200} title="Taxonomie de l'apprentissage automatique">
          <GroupBox x={10} y={10} w={290} h={170} label="Supervise" color="accent" />
          <Box x={30} y={50} w={120} h={36} label="Regression" sublabel="y continu" color="accent" />
          <Box x={160} y={50} w={120} h={36} label="Classification" sublabel="y discret" color="accent" />
          <Box x={30} y={110} w={250} h={36} label="k-NN, arbres, SVM, reseaux..." sublabel="methodes" color="default" />
          <GroupBox x={320} y={10} w={290} h={170} label="Non supervise" color="violet" />
          <Box x={340} y={50} w={120} h={36} label="Clustering" sublabel="k-means, AHC" color="violet" />
          <Box x={475} y={50} w={120} h={36} label="Densite" sublabel="KDE, GMM" color="violet" />
          <Box x={340} y={110} w={255} h={36} label="Decouvrir la structure cachee" sublabel="objectif" color="default" />
        </SvgDiagram>
      </Section>

      {/* ============================================================ */}
      {/* 2. RECHERCHE DE PLUS PROCHES VOISINS                         */}
      {/* ============================================================ */}
      <Section id="nn-search" number="02" title="Recherche de plus proches voisins">
        <p>
          Probleme fondamental : etant donne un ensemble <F>P</F> de{" "}
          <F>n</F> points dans <F>ℝ<sup>d</sup></F> et un point requete{" "}
          <F>q</F>, trouver le point de <F>P</F> le plus proche de <F>q</F>{" "}
          au sens d&apos;une distance (typiquement euclidienne).
        </p>

        <Def title="Plus proche voisin (Nearest Neighbor)">
          <p>
            Soit <F>P = &#123;p<sub>1</sub>, ..., p<sub>n</sub>&#125;</F>{" "}
            dans <F>ℝ<sup>d</sup></F> et <F>q ∈ ℝ<sup>d</sup></F>.
            Le plus proche voisin de <F>q</F> dans <F>P</F> est :
          </p>
          <Eq>
            <F>NN(q) = argmin</F>
            <Sub sub="p ∈ P"><span /></Sub>{" "}
            <F>‖q − p‖</F>
          </Eq>
        </Def>

        <p>
          La <strong>recherche lineaire</strong> (brute force) parcourt
          tous les points : cout <F>O(dn)</F>. Simple mais trop lent
          pour de grands <F>n</F>.
        </p>

        <Def title="kd-tree">
          <p>
            Structure arborescente qui partitionne recursivement{" "}
            <F>ℝ<sup>d</sup></F> par des hyperplans axes. A chaque noeud,
            on coupe selon la coordonnee <F>i mod d</F> au niveau de
            la{" "}
            <Term def="Valeur qui divise l'ensemble en deux moities egales.">
              mediane
            </Term>{" "}
            des points selon cette coordonnee.
          </p>
        </Def>

        <Steps>
          <Step number="1" title="Construction du kd-tree">
            Choisir la coordonnee (cycle 1, 2, ..., d, 1, 2, ...).
            Trouver la mediane, placer le point median au noeud.
            Recurser sur les deux moities. Cout : <F>O(n log n)</F>.
          </Step>
          <Step number="2" title="Recherche NN (avec backtracking)">
            Descendre dans l&apos;arbre comme pour une insertion. En
            remontant, verifier si l&apos;autre branche peut contenir
            un point plus proche (comparer la distance au plan de coupe).
            Cout moyen : <F>O(d log n)</F> en basse dimension.
          </Step>
          <Step number="3" title="Recherche defeatist (approximative)">
            Descendre une seule fois sans backtracking. Tres rapide
            mais pas de garantie de trouver le vrai plus proche voisin.
          </Step>
        </Steps>

        <SvgDiagram width={550} height={280} title="kd-tree : partition recursive de l'espace (2D)">
          {/* Espace 2D partitionne */}
          <GroupBox x={10} y={10} w={250} h={250} label="Espace R^2" color="default" />
          {/* Coupe verticale x=5 */}
          <Label x={135} y={30} text="x1 = 5" size={9} color="#8b5cf6" />
          <Arrow x1={135} y1={38} x2={135} y2={255} color="#8b5cf6" dashed />
          {/* Coupe horizontale gauche x2=3 */}
          <Label x={72} y={138} text="x2=3" size={8} color="#06b6d4" />
          <Arrow x1={15} y1={145} x2={130} y2={145} color="#06b6d4" dashed />
          {/* Coupe horizontale droite x2=7 */}
          <Label x={192} y={108} text="x2=7" size={8} color="#f59e0b" />
          <Arrow x1={140} y1={115} x2={255} y2={115} color="#f59e0b" dashed />
          {/* Points */}
          <Circle cx={80} cy={90} r={5} label="" color="accent" />
          <Circle cx={60} cy={200} r={5} label="" color="accent" />
          <Circle cx={110} cy={170} r={5} label="" color="accent" />
          <Circle cx={180} cy={70} r={5} label="" color="accent" />
          <Circle cx={200} cy={180} r={5} label="" color="accent" />
          <Circle cx={220} cy={220} r={5} label="" color="accent" />
          {/* Arbre correspondant */}
          <GroupBox x={290} y={10} w={250} h={250} label="kd-tree" color="default" />
          <Circle cx={415} cy={50} r={18} label="x1=5" color="violet" />
          <Circle cx={350} cy={130} r={18} label="x2=3" color="cyan" />
          <Circle cx={480} cy={130} r={18} label="x2=7" color="amber" />
          <Circle cx={330} cy={210} r={12} label="A" color="accent" />
          <Circle cx={370} cy={210} r={12} label="B" color="accent" />
          <Circle cx={460} cy={210} r={12} label="C" color="accent" />
          <Circle cx={500} cy={210} r={12} label="D" color="accent" />
          <Arrow x1={400} y1={66} x2={360} y2={114} />
          <Arrow x1={430} y1={66} x2={470} y2={114} />
          <Arrow x1={340} y1={146} x2={332} y2={198} />
          <Arrow x1={360} y1={146} x2={368} y2={198} />
          <Arrow x1={470} y1={146} x2={462} y2={198} />
          <Arrow x1={490} y1={146} x2={498} y2={198} />
        </SvgDiagram>

        <Warning>
          <p>
            <strong>Malediction de la dimension</strong> : au-dela de ~20
            dimensions, le kd-tree n&apos;est plus efficace que la recherche
            lineaire. En haute dimension, tous les points sont
            &quot;presque equidistants&quot; et le backtracking visite
            quasi tous les noeuds.
          </p>
        </Warning>

        <Code language="python">{`from sklearn.neighbors import NearestNeighbors
import numpy as np

# Generer des donnees en 2D
X = np.random.randn(1000, 2)
q = np.array([[0.5, 0.5]])

# Construction + recherche avec kd-tree
nn = NearestNeighbors(n_neighbors=5, algorithm="kd_tree")
nn.fit(X)
distances, indices = nn.kneighbors(q)

print("5 plus proches voisins :")
print(f"  Indices : {indices[0]}")
print(f"  Distances : {distances[0].round(3)}")

# En haute dimension, utiliser ball_tree ou brute
X_hd = np.random.randn(1000, 100)
nn_hd = NearestNeighbors(n_neighbors=5, algorithm="ball_tree")
nn_hd.fit(X_hd)`}</Code>

        <Quiz
          question="Quelle est la complexite moyenne d'une recherche NN dans un kd-tree en basse dimension ?"
          options={[
            "O(n)",
            "O(d log n)",
            "O(n log n)",
            "O(d * n)",
          ]}
          answer={1}
          explanation="En basse dimension (d petit), le kd-tree permet une recherche en O(d log n) grace au backtracking selectif. En haute dimension, on retombe sur O(dn)."
        />
      </Section>

      {/* ============================================================ */}
      {/* 3. K-MEANS                                                   */}
      {/* ============================================================ */}
      <Section id="k-means" number="03" title="k-Means">
        <p>
          Le{" "}
          <Term def="Algorithme de clustering partitionnel qui minimise la variance intra-cluster en assignant chaque point au centre le plus proche.">
            k-Means
          </Term>{" "}
          est l&apos;algorithme de clustering le plus utilise. Il partitionne{" "}
          <F>n</F> points en <F>k</F> clusters en minimisant la
          variance intra-cluster totale.
        </p>

        <Def title="Objectif k-Means">
          <p>
            Soit <F>P = &#123;p<sub>1</sub>, ..., p<sub>n</sub>&#125;</F>{" "}
            dans <F>ℝ<sup>d</sup></F>. On cherche une partition{" "}
            <F>C<sub>1</sub>, ..., C<sub>k</sub></F> et des centres{" "}
            <F>μ<sub>1</sub>, ..., μ<sub>k</sub></F> minimisant :
          </p>
          <Eq>
            <F>J(C, μ) = </F>
            <F>∑</F>
            <Sub sub="j=1"><span /></Sub>
            <Sup sup="k"><span /></Sup>{" "}
            <F>∑</F>
            <Sub sub={<>p ∈ <F>C</F><sub>j</sub></>}><span /></Sub>{" "}
            <F>‖p − </F><Sub sub="j"><F>μ</F></Sub><F>‖</F>
            <Sup sup="2"><span /></Sup>
          </Eq>
        </Def>

        <Proposition title="Centres optimaux = centroides">
          <p>
            A partition <F>C<sub>1</sub>, ..., C<sub>k</sub></F> fixee,
            les centres minimisant <F>J</F> sont les{" "}
            <strong>centroides</strong> :
          </p>
          <Eq>
            <Sub sub="j"><F>μ</F></Sub>
            <Sup sup="*"><span /></Sup>
            <F> = </F>
            <Frac n={<>1</>} d={<>|<F>C</F><sub>j</sub>|</>} />
            <F>∑</F>
            <Sub sub={<>p ∈ <F>C</F><sub>j</sub></>}><span /></Sub>{" "}
            <F>p</F>
          </Eq>
        </Proposition>

        <Proposition title="Partition optimale = Voronoi">
          <p>
            A centres <F>μ<sub>1</sub>, ..., μ<sub>k</sub></F> fixes,
            la partition minimisant <F>J</F> est le{" "}
            <strong>diagramme de Voronoi</strong> : chaque point est
            assigne au centre le plus proche.
          </p>
        </Proposition>

        <p>
          L&apos;algorithme de <strong>Lloyd</strong> alterne entre ces
          deux etapes jusqu&apos;a convergence :
        </p>

        <Steps>
          <Step number="1" title="Initialisation">
            Choisir <F>k</F> centres initiaux (aleatoire ou k-means++).
          </Step>
          <Step number="2" title="Assignment (E-step)">
            Assigner chaque point au centre le plus proche (partition de
            Voronoi).
          </Step>
          <Step number="3" title="Update (M-step)">
            Recalculer chaque centre comme le centroide de son cluster.
          </Step>
          <Step number="4" title="Iteration">
            Repeter 2-3 jusqu&apos;a ce que les assignments ne changent plus.
          </Step>
        </Steps>

        <SvgDiagram width={650} height={180} title="Algorithme de Lloyd : boucle assignment-update">
          <Box x={10} y={50} w={130} h={44} label="Init centres" sublabel="k-means++ ou random" color="violet" />
          <Arrow x1={140} y1={72} x2={180} y2={72} />
          <Box x={180} y={50} w={140} h={44} label="Assignment" sublabel="Voronoi (E-step)" color="accent" />
          <Arrow x1={320} y1={72} x2={360} y2={72} />
          <Box x={360} y={50} w={140} h={44} label="Update" sublabel="Centroides (M-step)" color="cyan" />
          <Arrow x1={500} y1={72} x2={540} y2={72} />
          <Box x={540} y={50} w={100} h={44} label="Converge ?" color="amber" />
          {/* Loop back */}
          <Arrow x1={590} y1={94} x2={590} y2={140} color="#f59e0b" />
          <Arrow x1={590} y1={140} x2={250} y2={140} color="#a1a1aa" dashed />
          <Arrow x1={250} y1={140} x2={250} y2={94} color="#a1a1aa" dashed />
          <Label x={420} y={155} text="Non : reprendre l'assignment" size={9} color="#a1a1aa" />
          <Label x={590} y={30} text="Oui : stop" size={9} color="#10b981" />
        </SvgDiagram>

        <Theorem name="Convergence de Lloyd">
          <p>
            L&apos;objectif <F>J</F> est <strong>non-croissant</strong> a
            chaque iteration. Comme le nombre de partitions est fini,
            l&apos;algorithme <strong>termine en un nombre fini
            d&apos;iterations</strong>.
          </p>
        </Theorem>

        <Warning>
          <p>
            Lloyd converge vers un <strong>minimum local</strong>, pas
            necessairement le minimum global. Le resultat depend fortement
            de l&apos;initialisation. En pratique, on lance l&apos;algorithme
            plusieurs fois et on garde la meilleure solution.
          </p>
        </Warning>

        <Def title="k-means++ (initialisation intelligente)">
          <p>
            Au lieu de choisir les centres au hasard, k-means++ utilise
            l&apos;<strong>echantillonnage D<sup>2</sup></strong> :
            chaque nouveau centre est tire avec une probabilite
            proportionnelle au carre de la distance au centre le plus
            proche deja choisi. Cela garantit une approximation en{" "}
            <F>O(log k)</F> de la solution optimale en esperance.
          </p>
        </Def>

        <Remark>
          <p>
            <strong>Choisir k</strong> : la <strong>methode du coude</strong>{" "}
            (elbow) trace <F>J(k)</F> en fonction de <F>k</F> et cherche
            un &quot;coude&quot;. Le <strong>score silhouette</strong> mesure
            la coherence des clusters (entre -1 et 1, plus c&apos;est haut
            mieux c&apos;est). Aucune methode n&apos;est parfaite — c&apos;est
            souvent un choix guide par l&apos;expertise metier.
          </p>
        </Remark>

        <Code language="python">{`from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import numpy as np

# Generer des donnees avec 3 clusters
np.random.seed(42)
X = np.vstack([
    np.random.randn(100, 2) + [0, 0],
    np.random.randn(100, 2) + [5, 5],
    np.random.randn(100, 2) + [10, 0],
])

# k-Means avec k-means++ (par defaut dans sklearn)
kmeans = KMeans(n_clusters=3, init="k-means++", n_init=10, random_state=42)
labels = kmeans.fit_predict(X)

print(f"Inertie (J) : {kmeans.inertia_:.1f}")
print(f"Centres :\\n{kmeans.cluster_centers_.round(2)}")
print(f"Silhouette : {silhouette_score(X, labels):.3f}")

# Methode du coude
inertias = []
for k in range(1, 10):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    inertias.append(km.inertia_)
# Tracer inertias vs k pour trouver le coude`}</Code>

        <Quiz
          question="Que garantit k-means++ par rapport a une initialisation aleatoire uniforme ?"
          options={[
            "La convergence vers le minimum global",
            "Une approximation O(log k) de la solution optimale en esperance",
            "Un nombre d'iterations borne par k",
            "L'unicite de la solution",
          ]}
          answer={1}
          explanation="k-means++ garantit que la valeur de l'objectif est au plus O(log k) fois l'optimum en esperance. Ce n'est pas le minimum global, mais c'est bien mieux qu'une initialisation aleatoire."
        />
      </Section>

      {/* ============================================================ */}
      {/* 4. CLUSTERING HIERARCHIQUE                                   */}
      {/* ============================================================ */}
      <Section id="hierarchical" number="04" title="Clustering hierarchique">
        <p>
          Contrairement a k-Means qui produit une partition plate, le
          clustering hierarchique produit un{" "}
          <Term def="Arbre binaire dont les feuilles sont les points et les noeuds internes representent les fusions de clusters. La hauteur d'un noeud correspond a la distance de fusion.">
            dendrogramme
          </Term>{" "}
          — une hierarchie complete de clusters a toutes les echelles.
          On peut ensuite couper le dendrogramme a n&apos;importe quel
          niveau pour obtenir une partition.
        </p>

        <Def title="Clustering Agglomeratif (AHC)">
          <p>
            Algorithme <strong>bottom-up</strong> : on part de <F>n</F>{" "}
            clusters singletons et on fusionne iterativement les deux
            clusters les plus proches jusqu&apos;a n&apos;en avoir plus
            qu&apos;un. La notion de &quot;proche&quot; depend du
            <strong> linkage</strong> choisi.
          </p>
        </Def>

        <ComparisonTable
          headers={["Linkage", "Distance entre clusters A et B", "Propriete"]}
          rows={[
            [
              "Single (min)",
              "min d(a,b) pour a in A, b in B",
              "Sensible au chaining effect",
            ],
            [
              "Complete (max)",
              "max d(a,b) pour a in A, b in B",
              "Clusters compacts, spheriques",
            ],
            [
              "Average",
              "Moyenne des d(a,b)",
              "Compromis entre single et complete",
            ],
            [
              "Ward",
              "Augmentation de la variance intra-cluster",
              "Minimise la meme fonction que k-means",
            ],
          ]}
        />

        <Theorem name="Single-linkage = MST de Kruskal">
          <p>
            L&apos;AHC avec single-linkage produit exactement le meme
            resultat que l&apos;algorithme de Kruskal pour l&apos;arbre
            couvrant minimum (MST) : on fusionne les clusters relies
            par l&apos;arete de poids minimal dans le graphe complet
            des distances. Complexite : <F>O(n<sup>2</sup> log n)</F>.
          </p>
        </Theorem>

        <Def title="Ultrametrique">
          <p>
            Une distance <F>u</F> sur un ensemble fini <F>P</F> est une{" "}
            <strong>ultrametrique</strong> si elle verifie l&apos;inegalite
            ultra-metrique, plus forte que l&apos;inegalite triangulaire :
          </p>
          <Eq>
            ∀ x, y, z : <F>u(x, z) ≤ max(u(x, y), u(y, z))</F>
          </Eq>
        </Def>

        <Theorem name="Bijection dendrogrammes-ultrametriques">
          <p>
            Il existe une bijection naturelle entre les dendrogrammes
            sur un ensemble fini <F>P</F> et les ultrametriques sur{" "}
            <F>P</F>. L&apos;ultrametrique associee a un dendrogramme
            est : <F>u(x, y)</F> = hauteur du plus petit ancetre commun
            de <F>x</F> et <F>y</F>.
          </p>
        </Theorem>

        <Proof title="Idee de preuve (bijection)">
          <p>
            Sens dendrogramme → ultrametrique : la hauteur du plus petit
            ancetre commun definit une distance (symetrie, separation,
            inegalite ultra-metrique par construction de l&apos;arbre).
          </p>
          <p>
            Sens ultrametrique → dendrogramme : l&apos;algorithme de
            single-linkage sur la matrice de distances ultra-metriques
            reconstruit exactement le dendrogramme original.
          </p>
        </Proof>

        <Proposition title="Stabilite du single-linkage">
          <p>
            Le dendrogramme de single-linkage est <strong>1-Lipschitz</strong>{" "}
            par rapport a la distance de Hausdorff entre nuages de
            points. C&apos;est-a-dire : si on perturbe les donnees
            legerement, le dendrogramme change legerement. Les autres
            linkages n&apos;ont pas cette propriete.
          </p>
        </Proposition>

        <SvgDiagram width={500} height={260} title="Dendrogramme (AHC) — fusion bottom-up">
          {/* Feuilles */}
          <Label x={60} y={240} text="A" size={12} weight="bold" color="#10b981" />
          <Label x={140} y={240} text="B" size={12} weight="bold" color="#10b981" />
          <Label x={220} y={240} text="C" size={12} weight="bold" color="#10b981" />
          <Label x={340} y={240} text="D" size={12} weight="bold" color="#10b981" />
          <Label x={420} y={240} text="E" size={12} weight="bold" color="#10b981" />
          {/* Echelle de hauteur */}
          <Label x={15} y={230} text="0" size={8} color="#a1a1aa" />
          <Label x={15} y={180} text="1" size={8} color="#a1a1aa" />
          <Label x={15} y={120} text="2" size={8} color="#a1a1aa" />
          <Label x={15} y={60} text="3" size={8} color="#a1a1aa" />
          {/* Fusion A-B a hauteur 1 */}
          <Arrow x1={60} y1={230} x2={60} y2={180} color="#8b5cf6" />
          <Arrow x1={140} y1={230} x2={140} y2={180} color="#8b5cf6" />
          <Arrow x1={60} y1={180} x2={140} y2={180} color="#8b5cf6" />
          {/* Fusion D-E a hauteur 1.5 */}
          <Arrow x1={340} y1={230} x2={340} y2={155} color="#06b6d4" />
          <Arrow x1={420} y1={230} x2={420} y2={155} color="#06b6d4" />
          <Arrow x1={340} y1={155} x2={420} y2={155} color="#06b6d4" />
          {/* Fusion {A,B}-C a hauteur 2 */}
          <Arrow x1={100} y1={180} x2={100} y2={120} color="#f59e0b" />
          <Arrow x1={220} y1={230} x2={220} y2={120} color="#f59e0b" />
          <Arrow x1={100} y1={120} x2={220} y2={120} color="#f59e0b" />
          {/* Fusion finale a hauteur 3 */}
          <Arrow x1={160} y1={120} x2={160} y2={60} color="#f43f5e" />
          <Arrow x1={380} y1={155} x2={380} y2={60} color="#f43f5e" />
          <Arrow x1={160} y1={60} x2={380} y2={60} color="#f43f5e" />
          {/* Ligne de coupe */}
          <Arrow x1={30} y1={100} x2={480} y2={100} color="#a1a1aa" dashed />
          <Label x={485} y={100} text="coupe" size={8} color="#a1a1aa" anchor="start" />
        </SvgDiagram>

        <Warning>
          <p>
            <strong>Chaining effect</strong> (single-linkage) : deux
            clusters bien separes mais relies par une chaine de points
            intermediaires seront fusionnes trop tot. C&apos;est un
            artefact typique du single-linkage. Le complete-linkage ou
            Ward sont plus robustes dans ce cas.
          </p>
        </Warning>

        <Code language="python">{`from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage
import numpy as np

# Donnees
X = np.array([[1,2], [1.5,1.8], [5,8], [8,8], [1,0.6], [9,11]])

# AHC avec Ward linkage
ahc = AgglomerativeClustering(n_clusters=2, linkage="ward")
labels = ahc.fit_predict(X)
print(f"Labels : {labels}")

# Tracer le dendrogramme (scipy)
Z = linkage(X, method="ward")
# dendrogram(Z)  # decommenter pour afficher

# Comparer les linkages
for method in ["single", "complete", "average", "ward"]:
    ahc = AgglomerativeClustering(n_clusters=2, linkage=method)
    print(f"{method:10s} : {ahc.fit_predict(X)}")`}</Code>
      </Section>

      {/* ============================================================ */}
      {/* 5. ESTIMATION DE DENSITE                                     */}
      {/* ============================================================ */}
      <Section id="density" number="05" title="Estimation de densite">
        <p>
          Probleme : etant donne <F>n</F> echantillons{" "}
          <F>X<sub>1</sub>, ..., X<sub>n</sub></F> tires i.i.d. d&apos;une
          densite inconnue <F>f</F>, estimer <F>f</F>.
        </p>

        <Theorem name="Decomposition biais-variance">
          <p>
            Pour tout estimateur <F>f&#770;</F> de <F>f</F>, l&apos;erreur
            quadratique integree (MISE) se decompose en :
          </p>
          <Eq>
            <F>MISE = 𝔼</F>[<F>∫ (f&#770;(x) − f(x))</F><Sup sup="2"><span /></Sup> <F>dx</F>]
            <F> = ∫ Biais</F><Sup sup="2"><span /></Sup><F>(x) dx + ∫ Var(f&#770;(x)) dx</F>
          </Eq>
          <p>
            Le <strong>biais</strong> mesure l&apos;erreur systematique,
            la <strong>variance</strong> mesure la sensibilite aux donnees.
            Il faut trouver un compromis.
          </p>
        </Theorem>

        <Proof title="Idee de preuve (biais-variance)">
          <p>
            On ecrit{" "}
            <F>f&#770;(x) − f(x) = (f&#770;(x) − 𝔼[f&#770;(x)]) + (𝔼[f&#770;(x)] − f(x))</F>.
            En elevant au carre et en prenant l&apos;esperance, le terme
            croise s&apos;annule car{" "}
            <F>𝔼[f&#770;(x) − 𝔼[f&#770;(x)]] = 0</F>.
            On obtient <F>MSE(x) = Var(f&#770;(x)) + Biais<sup>2</sup>(x)</F>.
            L&apos;integration donne le MISE.
          </p>
        </Proof>

        <KeyConcept title="Estimation parametrique : modele gaussien">
          <p>
            Si on suppose <F>f</F> gaussienne, le MLE donne directement :
          </p>
          <Eq>
            <F>μ&#770; = </F>
            <Frac n={<>1</>} d={<>n</>} />
            <F>∑</F><Sub sub="i"><span /></Sub>{" "}
            <Sub sub="i"><F>X</F></Sub>
            <F>, &nbsp; &nbsp; Σ&#770; = </F>
            <Frac n={<>1</>} d={<>n</>} />
            <F>∑</F><Sub sub="i"><span /></Sub>
            <F> (</F><Sub sub="i"><F>X</F></Sub>
            <F> − μ&#770;)(</F><Sub sub="i"><F>X</F></Sub>
            <F> − μ&#770;)</F><Sup sup="T"><span /></Sup>
          </Eq>
        </KeyConcept>

        <Def title="Modele de Melange Gaussien (GMM)">
          <p>
            On modelise <F>f</F> comme un melange de <F>K</F> gaussiennes :
          </p>
          <Eq>
            <F>f(x) = </F>
            <F>∑</F>
            <Sub sub="k=1"><span /></Sub>
            <Sup sup="K"><span /></Sup>{" "}
            <Sub sub="k"><F>π</F></Sub>{" "}
            <F>N(x; </F><Sub sub="k"><F>μ</F></Sub>
            <F>, </F><Sub sub="k"><F>Σ</F></Sub><F>)</F>
          </Eq>
          <p>
            Les poids <F>π<sub>k</sub> ≥ 0</F> verifient{" "}
            <F>∑ π<sub>k</sub> = 1</F>. Les parametres sont estimes par
            l&apos;algorithme <strong>EM</strong> (Expectation-Maximization).
          </p>
        </Def>

        <Steps>
          <Step number="1" title="E-step (esperance)">
            Calculer les responsabilites :{" "}
            <F>γ<sub>ik</sub></F> = probabilite que <F>X<sub>i</sub></F>{" "}
            provienne de la composante <F>k</F>, conditionnellement aux
            parametres courants.
          </Step>
          <Step number="2" title="M-step (maximisation)">
            Mettre a jour les parametres :{" "}
            <F>π<sub>k</sub></F>, <F>μ<sub>k</sub></F>,{" "}
            <F>Σ<sub>k</sub></F> en maximisant la log-vraisemblance
            ponderee par les responsabilites.
          </Step>
          <Step number="3" title="Iteration">
            Repeter E-M jusqu&apos;a convergence de la log-vraisemblance.
            Comme pour k-Means : convergence vers un maximum local.
          </Step>
        </Steps>

        <Def title="Estimation par noyau (KDE)">
          <p>
            L&apos;estimateur a noyau avec bande passante <F>h</F> est :
          </p>
          <Eq>
            <F>f&#770;</F><Sub sub="h"><span /></Sub><F>(x) = </F>
            <Frac n={<>1</>} d={<><F>nh</F><Sup sup="d"><span /></Sup></>} />
            <F>∑</F>
            <Sub sub="i=1"><span /></Sub>
            <Sup sup="n"><span /></Sup>{" "}
            <F>K</F>
            <F>(</F>
            <Frac n={<><F>x − X</F><Sub sub="i"><span /></Sub></>} d={<>h</>} />
            <F>)</F>
          </Eq>
          <p>
            <F>K</F> est un noyau (gaussien, Epanechnikov, etc.).
            Le choix de <F>h</F> est critique : trop petit → variance
            elevee, trop grand → biais eleve.
          </p>
        </Def>

        <SvgDiagram width={580} height={220} title="KDE vs histogramme : compromis biais-variance">
          {/* Histogramme */}
          <GroupBox x={10} y={10} w={260} h={190} label="Histogramme" color="amber" />
          {/* Barres */}
          <Box x={30} y={130} w={40} h={50} label="" color="amber" rx={0} />
          <Box x={75} y={80} w={40} h={100} label="" color="amber" rx={0} />
          <Box x={120} y={100} w={40} h={80} label="" color="amber" rx={0} />
          <Box x={165} y={60} w={40} h={120} label="" color="amber" rx={0} />
          <Box x={210} y={120} w={40} h={60} label="" color="amber" rx={0} />
          <Label x={140} y={195} text="Sensible a la largeur des bins" size={9} color="#a1a1aa" />
          {/* KDE */}
          <GroupBox x={300} y={10} w={270} h={190} label="KDE (noyau gaussien)" color="accent" />
          <Label x={435} y={50} text="h petit" size={9} color="#f43f5e" />
          <Label x={435} y={80} text="h optimal" size={9} color="#10b981" />
          <Label x={435} y={110} text="h grand" size={9} color="#06b6d4" />
          <Label x={435} y={195} text="Courbe lisse, choix de h critique" size={9} color="#a1a1aa" />
        </SvgDiagram>

        <Proposition title="Bande passante optimale">
          <p>
            Pour un noyau gaussien et une densite cible suffisamment
            lisse, la bande passante optimale (au sens du MISE) est :
          </p>
          <Eq>
            <F>h* ∝ n</F>
            <Sup sup={<>−1/(d+4)</>}><span /></Sup>
          </Eq>
          <p>
            Le taux de convergence du MISE est{" "}
            <F>O(n<sup>−4/(d+4)</sup>)</F>. En haute dimension, ce taux
            se degrade drastiquement : c&apos;est la{" "}
            <strong>malediction de la dimension</strong> pour l&apos;estimation
            de densite.
          </p>
        </Proposition>

        <Code language="python">{`from sklearn.neighbors import KernelDensity
from sklearn.mixture import GaussianMixture
import numpy as np

# Donnees : melange de deux gaussiennes
np.random.seed(0)
X = np.concatenate([
    np.random.normal(-2, 0.8, 300),
    np.random.normal(3, 1.2, 200),
]).reshape(-1, 1)

# KDE avec noyau gaussien
kde = KernelDensity(kernel="gaussian", bandwidth=0.5)
kde.fit(X)
X_plot = np.linspace(-6, 8, 500).reshape(-1, 1)
log_dens = kde.score_samples(X_plot)
# np.exp(log_dens) donne la densite estimee

# GMM
gmm = GaussianMixture(n_components=2, random_state=42)
gmm.fit(X)
print(f"Poids : {gmm.weights_.round(3)}")
print(f"Moyennes : {gmm.means_.flatten().round(3)}")
print(f"Variances : {gmm.covariances_.flatten().round(3)}")`}</Code>

        <Quiz
          question="En dimension d=10, quel est l'ordre du taux de convergence optimal du MISE pour le KDE ?"
          options={[
            "O(n^{-4/5})",
            "O(n^{-4/14}) = O(n^{-2/7})",
            "O(n^{-1/2})",
            "O(n^{-1})",
          ]}
          answer={1}
          explanation="Le taux optimal est O(n^{-4/(d+4)}). Pour d=10, on obtient O(n^{-4/14}) = O(n^{-2/7}) ≈ O(n^{-0.286}). C'est beaucoup plus lent que O(n^{-4/5}) en 1D."
        />
      </Section>

      {/* ============================================================ */}
      {/* 6. APPRENTISSAGE SUPERVISE — FONDEMENTS                      */}
      {/* ============================================================ */}
      <Section id="supervised" number="06" title="Apprentissage supervise — fondements">
        <p>
          En apprentissage supervise, on observe des paires{" "}
          <F>(X, Y)</F> ou <F>X ∈ ℝ<sup>d</sup></F> est le vecteur de
          features et <F>Y</F> est la reponse. Le but : apprendre une
          fonction <F>f</F> qui predit <F>Y</F> a partir de <F>X</F>.
        </p>

        <Def title="Regression vs Classification">
          <p>
            <strong>Regression</strong> : <F>Y ∈ ℝ</F> (continu).
            Exemples : prix d&apos;un appartement, temperature demain.
          </p>
          <p>
            <strong>Classification</strong> : <F>Y ∈ &#123;1, ..., K&#125;</F>{" "}
            (discret). Exemples : spam/non-spam, diagnostic medical.
          </p>
        </Def>

        <ComparisonTable
          headers={["Fonction de perte", "Formule", "Usage"]}
          rows={[
            [
              "MSE (L2)",
              "L(y, f(x)) = (y - f(x))^2",
              "Regression, sensible aux outliers",
            ],
            [
              "MAE (L1)",
              "L(y, f(x)) = |y - f(x)|",
              "Regression, robuste aux outliers",
            ],
            [
              "Huber",
              "L2 si |e| < delta, L1 sinon",
              "Regression, compromis L1/L2",
            ],
            [
              "0-1 (classification)",
              "L(y, f(x)) = 1_{f(x) != y}",
              "Classification, non differentiable",
            ],
            [
              "Hinge (SVM)",
              "L(y, f(x)) = max(0, 1 - y*f(x))",
              "Classification binaire, marge",
            ],
            [
              "Logistique",
              "L(y, f(x)) = log(1 + exp(-y*f(x)))",
              "Classification, approximation lisse du 0-1",
            ],
          ]}
        />

        <Def title="Risque et risque empirique">
          <p>
            Le <strong>risque</strong> (erreur de generalisation) d&apos;un
            predicteur <F>f</F> est :
          </p>
          <Eq>
            <F>R(f) = 𝔼[L(Y, f(X))]</F>
          </Eq>
          <p>
            En pratique, on ne connait pas la loi de <F>(X, Y)</F>. On
            utilise le <strong>risque empirique</strong> :
          </p>
          <Eq>
            <Sub sub="n"><F>R&#770;</F></Sub>
            <F>(f) = </F>
            <Frac n={<>1</>} d={<>n</>} />
            <F>∑</F>
            <Sub sub="i=1"><span /></Sub>
            <Sup sup="n"><span /></Sup>{" "}
            <F>L(</F><Sub sub="i"><F>Y</F></Sub>
            <F>, f(</F><Sub sub="i"><F>X</F></Sub><F>))</F>
          </Eq>
        </Def>

        <Theorem name="Predicteur de Bayes — regression">
          <p>
            Pour la perte MSE, le predicteur qui minimise le risque
            est la <strong>fonction de regression</strong> :
          </p>
          <Eq>
            <F>f*(x) = 𝔼[Y | X = x]</F>
          </Eq>
          <p>C&apos;est la moyenne conditionnelle.</p>
        </Theorem>

        <Theorem name="Classifieur de Bayes — classification">
          <p>
            Pour la perte 0-1, le classifieur optimal est le{" "}
            <strong>classifieur de Bayes</strong> :
          </p>
          <Eq>
            <F>f*(x) = argmax</F>
            <Sub sub="y"><span /></Sub>{" "}
            <F>ℙ(Y = y | X = x)</F>
          </Eq>
          <p>
            Le <strong>risque de Bayes</strong> <F>R* = R(f*)</F> est
            la plus petite erreur atteignable. Aucun classifieur ne peut
            faire mieux.
          </p>
        </Theorem>

        <Remark>
          <p>
            Le risque de Bayes est en general <strong>non nul</strong> :
            il reflète le bruit intrinseque des donnees. Par exemple, si
            deux classes se chevauchent, meme le classifieur optimal
            fera des erreurs.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 7. k-NN EN PREDICTION                                        */}
      {/* ============================================================ */}
      <Section id="knn-prediction" number="07" title="k-NN en prediction">
        <p>
          L&apos;algorithme des{" "}
          <Term def="k-Nearest Neighbors : predire la reponse d'un point en aggregant les reponses de ses k plus proches voisins dans l'ensemble d'entrainement.">
            k plus proches voisins
          </Term>{" "}
          est la methode de prediction la plus simple et la plus
          intuitive : pour predire <F>Y</F> en un point <F>x</F>, on
          regarde les <F>k</F> points d&apos;entrainement les plus proches.
        </p>

        <Def title="k-NN regression">
          <p>
            On predit par la <strong>moyenne</strong> des reponses des{" "}
            <F>k</F> voisins :
          </p>
          <Eq>
            <F>f&#770;</F><Sub sub="k"><span /></Sub>
            <F>(x) = </F>
            <Frac n={<>1</>} d={<>k</>} />
            <F>∑</F>
            <Sub sub={<>i ∈ N<sub>k</sub>(x)</>}><span /></Sub>{" "}
            <Sub sub="i"><F>Y</F></Sub>
          </Eq>
          <p>
            ou <F>N<sub>k</sub>(x)</F> est l&apos;ensemble des indices
            des <F>k</F> plus proches voisins de <F>x</F>.
          </p>
        </Def>

        <Def title="k-NN classification">
          <p>
            On predit par <strong>vote majoritaire</strong> :
          </p>
          <Eq>
            <F>f&#770;</F><Sub sub="k"><span /></Sub>
            <F>(x) = argmax</F>
            <Sub sub="y"><span /></Sub>{" "}
            <F>∑</F>
            <Sub sub={<>i ∈ N<sub>k</sub>(x)</>}><span /></Sub>{" "}
            <F>1</F>
            <Sub sub={<>Y<sub>i</sub> = y</>}><span /></Sub>
          </Eq>
        </Def>

        <Theorem name="Consistance universelle (Stone, 1977)">
          <p>
            Si <F>k → ∞</F> et <F>k/n → 0</F> quand{" "}
            <F>n → ∞</F>, alors le classifieur k-NN est{" "}
            <strong>universellement consistent</strong> : son risque
            converge vers le risque de Bayes <F>R*</F> pour toute
            distribution de <F>(X, Y)</F>.
          </p>
        </Theorem>

        <Theorem name="Cover-Hart (1-NN)">
          <p>
            Le risque du classifieur 1-NN verifie :
          </p>
          <Eq>
            <F>R* ≤ </F><Sub sub="1-NN"><F>R</F></Sub>
            <F> ≤ 2R*</F>
          </Eq>
          <p>
            En particulier, si <F>R* = 0</F> (classes parfaitement
            separables), le 1-NN est aussi parfait. Et dans le pire cas,
            le 1-NN fait au plus deux fois plus d&apos;erreurs que le
            classifieur optimal.
          </p>
        </Theorem>

        <ComparisonTable
          headers={["", "Avantages", "Inconvenients"]}
          rows={[
            [
              "k-NN",
              "Simple, aucun entrainement, non-parametrique, universellement consistent",
              "Lent en prediction O(dn), stocke tout le dataset, sensible a la dimension, choix de k et de la distance",
            ],
          ]}
        />

        <Remark>
          <p>
            <strong>Choix de k</strong> : on utilise la{" "}
            <strong>validation croisee</strong> (cross-validation). On
            decoupe les donnees en <F>V</F> folds, on entraine sur{" "}
            <F>V−1</F> folds, on evalue sur le fold restant, et on
            moyenne l&apos;erreur. Le <F>k</F> qui minimise l&apos;erreur
            de CV est retenu.
          </p>
        </Remark>

        <Code language="python">{`from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.model_selection import cross_val_score
from sklearn.datasets import load_iris
import numpy as np

# Classification avec k-NN
X, y = load_iris(return_X_y=True)
knn = KNeighborsClassifier(n_neighbors=5)

# Validation croisee pour choisir k
for k in [1, 3, 5, 10, 20]:
    knn_k = KNeighborsClassifier(n_neighbors=k)
    scores = cross_val_score(knn_k, X, y, cv=5, scoring="accuracy")
    print(f"k={k:2d} : accuracy = {scores.mean():.3f} (+/- {scores.std():.3f})")

# Regression avec k-NN
from sklearn.datasets import make_regression
X_reg, y_reg = make_regression(n_samples=200, n_features=3, noise=10)
knn_reg = KNeighborsRegressor(n_neighbors=5)
scores_reg = cross_val_score(knn_reg, X_reg, y_reg, cv=5, scoring="r2")
print(f"\\nRegression k-NN : R2 = {scores_reg.mean():.3f}")`}</Code>
      </Section>

      {/* ============================================================ */}
      {/* 8. EVALUATION D'UN CLASSIFIEUR                               */}
      {/* ============================================================ */}
      <Section id="evaluation" number="08" title="Evaluation d&apos;un classifieur">
        <p>
          L&apos;accuracy seule ne suffit pas, surtout quand les classes
          sont desequilibrees. Un classifieur qui predit toujours la
          classe majoritaire peut avoir 99% d&apos;accuracy sur un dataset
          avec 1% de positifs — mais il est inutile.
        </p>

        <Def title="Matrice de confusion">
          <p>
            Pour un probleme binaire (positif / negatif), la matrice
            de confusion organise les predictions en 4 categories :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>VP</strong> (Vrai Positif) : predit positif, reellement positif</li>
            <li><strong>FP</strong> (Faux Positif) : predit positif, reellement negatif</li>
            <li><strong>FN</strong> (Faux Negatif) : predit negatif, reellement positif</li>
            <li><strong>VN</strong> (Vrai Negatif) : predit negatif, reellement negatif</li>
          </ul>
        </Def>

        <ComparisonTable
          headers={["Metrique", "Formule", "Interpretation"]}
          rows={[
            [
              "Accuracy",
              "(VP + VN) / (VP + VN + FP + FN)",
              "Taux global de bonnes predictions",
            ],
            [
              "Precision",
              "VP / (VP + FP)",
              "Parmi les predits positifs, combien le sont vraiment ?",
            ],
            [
              "Recall (Sensibilite)",
              "VP / (VP + FN)",
              "Parmi les vrais positifs, combien sont detectes ?",
            ],
            [
              "F1-score",
              "2 * Precision * Recall / (Precision + Recall)",
              "Moyenne harmonique precision-recall",
            ],
            [
              "AUC-ROC",
              "Aire sous la courbe ROC",
              "Capacite globale de discrimination (0.5 = aleatoire, 1 = parfait)",
            ],
          ]}
        />

        <KeyConcept title="Courbe ROC">
          <p>
            La courbe ROC trace le <strong>taux de vrais positifs</strong>{" "}
            (recall) en fonction du <strong>taux de faux positifs</strong>{" "}
            (FP / (FP + VN)) pour differents seuils de decision.
            L&apos;<strong>AUC</strong> (aire sous la courbe) mesure la
            qualite globale : un classifieur aleatoire a AUC = 0.5, un
            classifieur parfait a AUC = 1.
          </p>
        </KeyConcept>

        <Warning>
          <p>
            <strong>Precision vs Recall</strong> : il y a toujours un
            compromis. En detection de cancer, on veut un recall eleve
            (ne rater aucun cas) quitte a avoir plus de faux positifs.
            En filtrage de spam, on veut une precision elevee (ne pas
            supprimer un mail important).
          </p>
        </Warning>

        <Quiz
          question="Un classifieur a 95% d'accuracy sur un dataset ou 95% des exemples sont negatifs. Quel est son recall sur la classe positive ?"
          options={[
            "95%",
            "On ne peut pas savoir avec cette seule information",
            "0% (il predit toujours negatif)",
            "50%",
          ]}
          answer={1}
          explanation="On ne peut pas conclure. Il est possible que le classifieur predise toujours 'negatif' (recall = 0%) ou qu'il soit plus equilibre. L'accuracy seule masque les performances par classe."
        />
      </Section>

      {/* ============================================================ */}
      {/* 9. COMPLEXITE ET MALEDICTION DE LA DIMENSION                 */}
      {/* ============================================================ */}
      <Section id="complexity" number="09" title="Complexite et malediction de la dimension">
        <p>
          Cette section recapitule les complexites algorithmiques et
          les limites fondamentales liees a la dimension.
        </p>

        <ComparisonTable
          headers={["Algorithme", "Complexite temps", "Complexite espace", "Remarques"]}
          rows={[
            [
              "Recherche lineaire NN",
              "O(dn) par requete",
              "O(dn)",
              "Optimal en haute dimension",
            ],
            [
              "kd-tree (construction)",
              "O(dn log n)",
              "O(dn)",
              "Efficace si d < ~20",
            ],
            [
              "kd-tree (recherche)",
              "O(d log n) moyen, O(dn) pire cas",
              "—",
              "Degrade en haute dimension",
            ],
            [
              "k-Means (Lloyd, 1 iter.)",
              "O(nkd)",
              "O((n+k)d)",
              "Nombre d'iterations generalement petit",
            ],
            [
              "AHC (naive)",
              "O(n^3)",
              "O(n^2)",
              "Matrice de distances n x n",
            ],
            [
              "AHC (single-linkage, MST)",
              "O(n^2 log n)",
              "O(n^2)",
              "Via algorithme de Kruskal",
            ],
            [
              "KDE (evaluation en un point)",
              "O(dn)",
              "O(dn)",
              "Evaluation naive sur n noyaux",
            ],
            [
              "k-NN (prediction)",
              "O(dn) brute, O(d log n) kd-tree",
              "O(dn)",
              "Stocke tout le dataset",
            ],
          ]}
        />

        <KeyConcept title="La malediction de la dimension">
          <p>
            En haute dimension, plusieurs phenomenes rendent l&apos;analyse
            de donnees fondamentalement plus difficile :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Concentration des distances</strong> : les distances
              entre points se concentrent autour d&apos;une meme valeur.
              La difference entre le plus proche et le plus loin voisin
              devient negligeable.
            </li>
            <li>
              <strong>Explosion des volumes</strong> : le volume de la
              boule unite decroit exponentiellement avec <F>d</F>.
              Pour couvrir un hypercube, il faut exponentiellement plus
              de points.
            </li>
            <li>
              <strong>Degradation des taux</strong> : le taux optimal
              du KDE passe de <F>O(n<sup>−4/5</sup>)</F> en 1D a{" "}
              <F>O(n<sup>−4/(d+4)</sup>)</F> en dimension <F>d</F>.
            </li>
          </ul>
        </KeyConcept>

        <Analogy>
          <p>
            Imaginez chercher un ami dans une rue (1D) : vous le trouvez
            vite. Dans un quartier (2D), c&apos;est plus long. Dans un
            immeuble de 100 etages avec 100 pieces par etage (3D) :
            bonne chance. En dimension 100, c&apos;est comme chercher
            une personne dans un espace avec 10<sup>100</sup> pieces.
          </p>
        </Analogy>

        <ComparisonTable
          headers={["Methode", "Meilleur pour", "Limitations", "Gere bien la haute dim ?"]}
          rows={[
            [
              "k-NN",
              "Petits datasets, basse dim, baseline rapide",
              "Lent en prediction, sensible a d",
              "Non (d > 20 problematique)",
            ],
            [
              "k-Means",
              "Gros clusters spheriques, pre-traitement",
              "k fixe, sensible a l'init, clusters convexes",
              "Moyen (distances se concentrent)",
            ],
            [
              "AHC",
              "Dendrogrammes, petit n, structures non-spheriques (single)",
              "O(n^2) ou O(n^3), ne passe pas a l'echelle",
              "Non (n^2 distances a stocker)",
            ],
            [
              "KDE",
              "Visualisation 1D/2D, estimation de densite lisse",
              "Taux O(n^{-4/(d+4)}) en dim d",
              "Non (curse of dimensionality severe)",
            ],
            [
              "GMM",
              "Clusters elliptiques, model-based clustering",
              "Choix de K, convergence locale, estimation de Sigma en haute dim",
              "Moyen (necessite beaucoup de donnees)",
            ],
          ]}
        />

        <Remark>
          <p>
            En pratique, face a des donnees de haute dimension, on commence
            souvent par une <strong>reduction de dimension</strong> (PCA,
            t-SNE, UMAP) avant d&apos;appliquer ces algorithmes. C&apos;est
            aussi pour cela que les methodes a base de reseaux de neurones
            profonds, qui apprennent des representations de basse dimension,
            dominent en haute dimension.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 10. QUIZ FINAL                                               */}
      {/* ============================================================ */}
      <Section id="quiz" number="10" title="Quiz final">
        <p>
          Cinq questions pour tester la comprehension globale du cours.
        </p>

        <Quiz
          question="Dans l'algorithme de Lloyd (k-Means), que se passe-t-il si deux points sont exactement equidistants de deux centres differents ?"
          options={[
            "L'algorithme diverge",
            "Le point est assigne arbitrairement a l'un des deux (regle de bris d'egalite)",
            "Le point est exclu du clustering",
            "On cree un nouveau cluster",
          ]}
          answer={1}
          explanation="En cas d'egalite, on applique une regle de bris d'egalite deterministe (par exemple, le centre avec le plus petit indice). L'algorithme continue normalement."
        />

        <Quiz
          question="Quel linkage de clustering hierarchique est equivalent a l'algorithme de Kruskal (MST) ?"
          options={[
            "Complete linkage",
            "Average linkage",
            "Single linkage",
            "Ward linkage",
          ]}
          answer={2}
          explanation="Le single linkage fusionne les deux clusters dont les points les plus proches sont les plus proches — exactement comme Kruskal ajoute l'arete de poids minimal qui ne cree pas de cycle."
        />

        <Quiz
          question="Le theoreme de Cover-Hart dit que le risque du 1-NN est borne par 2R*. Que signifie R* = 0 pour le 1-NN ?"
          options={[
            "Le 1-NN a un risque egal a 1",
            "Le 1-NN est aussi parfait (risque 0)",
            "Le 1-NN a un risque de 0.5",
            "On ne peut rien dire",
          ]}
          answer={1}
          explanation="Si R* = 0 (classes parfaitement separables), le theoreme donne R_{1-NN} <= 2 * 0 = 0. Le 1-NN classifie aussi parfaitement."
        />

        <Quiz
          question="Pourquoi l'algorithme EM pour les GMM converge-t-il vers un maximum local et non global ?"
          options={[
            "La log-vraisemblance est convexe",
            "La log-vraisemblance du melange est non-convexe (somme de log de sommes)",
            "L'algorithme EM est stochastique",
            "Le nombre de composantes est mal choisi",
          ]}
          answer={1}
          explanation="La log-vraisemblance d'un melange de gaussiennes est non-convexe en les parametres (a cause du log d'une somme). EM augmente la vraisemblance a chaque iteration mais peut se bloquer dans un maximum local."
        />

        <Quiz
          question="En dimension d = 50, quelle affirmation est correcte ?"
          options={[
            "Le kd-tree est optimal pour la recherche NN",
            "Le KDE converge au taux O(n^{-4/54}), necessitant enormement de donnees",
            "Le k-Means est immunise contre la malediction de la dimension",
            "L'AHC avec single-linkage est toujours stable",
          ]}
          answer={1}
          explanation="En d=50, le taux du KDE est O(n^{-4/(50+4)}) = O(n^{-4/54}) ≈ O(n^{-0.074}), extremement lent. Il faudrait un nombre astronomique de points pour une bonne estimation. C'est la malediction de la dimension dans toute sa splendeur."
        />
      </Section>
    </>
  );
}
