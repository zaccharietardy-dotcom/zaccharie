"use client";

import {
  Section,
  Code,
  KeyConcept,
  Warning,
  Analogy,
  Quiz,
  Diagram,
  Term,
  Steps,
  Step,
  ComparisonTable,
} from "@/components/course-elements";
import { Def, Remark } from "@/components/math-elements";

/* ── Math helper components ──────────────────────────── */

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

export function CNN() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. POURQUOI LES CNN                                          */}
      {/* ============================================================ */}
      <Section id="pourquoi" number="01" title="Pourquoi les CNN">
        <p>
          Avant les CNN, on aplatissait une image en un vecteur et on la donnait
          a un reseau fully-connected. Probleme : une image 224x224x3 = 150 528
          pixels. La premiere couche dense aurait des millions de poids, et le
          reseau ne comprendrait rien a la structure spatiale.
        </p>

        <KeyConcept title="Trois intuitions fondamentales">
          <p>
            <strong>1) Invariance par translation</strong> — un chat reste un chat
            qu&apos;il soit en haut a gauche ou en bas a droite.{" "}
            <strong>2) Partage de poids</strong> — le meme filtre detecte le meme
            motif partout dans l&apos;image, ce qui reduit massivement le nombre
            de parametres.{" "}
            <strong>3) Hierarchie de features</strong> — les premieres couches
            detectent des contours, les suivantes des textures, puis des parties
            d&apos;objets, puis des objets entiers.
          </p>
        </KeyConcept>

        <Analogy>
          <p>
            Le systeme visuel humain fonctionne exactement comme un CNN.
            La retine capte les pixels. Le cortex V1 detecte des contours
            orientes. V2 assemble ces contours en textures et formes simples.
            Le cortex infero-temporal (IT) reconnait des objets complets — un
            visage, une voiture. Chaque etape construit sur la precedente,
            exactement comme les couches successives d&apos;un CNN.
          </p>
        </Analogy>

        <p>
          Les CNN exploitent la <Term def="Structure locale : les pixels proches sont plus correles que les pixels eloignes.">localite spatiale</Term> des
          images. Au lieu de connecter chaque neurone a tous les pixels, on
          connecte chaque neurone a une petite region locale — le{" "}
          <Term def="Champ recepteur : la zone de l'image qu'un neurone 'voit'. Un filtre 3x3 a un champ recepteur de 3x3 pixels.">champ recepteur</Term>.
          C&apos;est ce qui rend les CNN si efficaces en vision.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 2. L'OPERATION DE CONVOLUTION                                */}
      {/* ============================================================ */}
      <Section id="convolution" number="02" title="L'operation de convolution">
        <Def title="Convolution discrete 2D">
          <p>
            Soit une image <F>I</F> et un noyau (kernel) <F>K</F> de taille{" "}
            <F>k x k</F>. La sortie (feature map) <F>S</F> est definie par :
          </p>
          <Eq>
            <F>S</F>(<F>i, j</F>) = <F>&Sigma;</F><Sub sub="m,n"><F> </F></Sub>{" "}
            <F>I</F>(<F>i+m, j+n</F>) · <F>K</F>(<F>m, n</F>)
          </Eq>
          <p>
            On glisse le kernel sur chaque position de l&apos;image, on multiplie
            element par element, et on somme. C&apos;est une correlation croisee
            (pas une convolution au sens strict, qui flippe le kernel — mais en
            deep learning on utilise le terme convolution par convention).
          </p>
        </Def>

        <p>
          Deux hyperparametres controlent comment le kernel se deplace :
        </p>

        <Steps>
          <Step number="1" title="Stride">
            Le pas de deplacement du kernel. Stride 1 = on deplace d&apos;un
            pixel a chaque fois. Stride 2 = on saute un pixel, ce qui divise la
            taille de sortie par 2 dans chaque dimension.
          </Step>
          <Step number="2" title="Padding">
            <strong>Valid padding</strong> : pas de remplissage, la sortie est
            plus petite que l&apos;entree. <strong>Same padding</strong> : on
            ajoute des zeros autour de l&apos;image pour que la sortie ait la
            meme taille que l&apos;entree.
          </Step>
        </Steps>

        <Diagram title="Kernel 3x3 glissant sur une image 5x5 (stride=1, valid)">
          <pre className="text-center">{`
  Image 5x5               Kernel 3x3          Feature map 3x3
 ┌───┬───┬───┬───┬───┐   ┌───┬───┬───┐       ┌───┬───┬───┐
 │ 1 │ 0 │ 1 │ 0 │ 1 │   │ 1 │ 0 │ 1 │       │ 4 │ 3 │ 4 │
 ├───┼───┼───┼───┼───┤   ├───┼───┼───┤       ├───┼───┼───┤
 │ 0 │ 1 │ 0 │ 1 │ 0 │   │ 0 │ 1 │ 0 │       │ 2 │ 4 │ 3 │
 ├───┼───┼───┼───┼───┤   ├───┼───┼───┤       ├───┼───┼───┤
 │ 1 │ 0 │ 1 │ 0 │ 1 │   │ 1 │ 0 │ 1 │       │ 4 │ 3 │ 4 │
 ├───┼───┼───┼───┼───┤   └───┴───┴───┘       └───┴───┴───┘
 │ 0 │ 1 │ 0 │ 1 │ 0 │
 ├───┼───┼───┼───┼───┤   Position (0,0):
 │ 1 │ 0 │ 1 │ 0 │ 1 │   1*1+0*0+1*1+0*0+
 └───┴───┴───┴───┴───┘   1*1+0*0+1*1+0*0+1*1 = 4
`}</pre>
        </Diagram>

        <Remark>
          <p>
            Les <strong>channels</strong> ajoutent une troisieme dimension. Une
            image RGB a 3 channels. Un kernel 3x3 sur une image RGB est en
            realite un tenseur 3x3x3 : on convolue sur chaque channel puis on
            somme. Si on applique <F>N</F> filtres, on obtient <F>N</F> feature
            maps en sortie.
          </p>
        </Remark>

        <p>
          Formule de la taille de sortie :
        </p>
        <Eq>
          <F>O</F> = (<F>I</F> - <F>K</F> + 2<F>P</F>) / <F>S</F> + 1
        </Eq>
        <p>
          Avec <F>I</F> = taille de l&apos;entree, <F>K</F> = taille du kernel,{" "}
          <F>P</F> = padding, <F>S</F> = stride.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 3. POOLING & FEATURE MAPS                                    */}
      {/* ============================================================ */}
      <Section id="pooling" number="03" title="Pooling et Feature Maps">
        <p>
          Apres la convolution et l&apos;activation, on applique souvent une
          operation de <Term def="Sous-echantillonnage qui reduit la resolution spatiale tout en conservant les features importantes.">pooling</Term>{" "}
          pour reduire la taille spatiale des feature maps.
        </p>

        <KeyConcept title="Trois types de pooling">
          <p>
            <strong>Max pooling</strong> : prend la valeur maximale dans chaque
            fenetre. C&apos;est le plus courant (2x2, stride 2).{" "}
            <strong>Average pooling</strong> : prend la moyenne. Utilise plus
            rarement dans les couches intermediaires.{" "}
            <strong>Global Average Pooling (GAP)</strong> : prend la moyenne sur
            toute la feature map, produisant un seul scalaire par channel. Remplace
            souvent la couche Flatten + FC en fin de reseau.
          </p>
        </KeyConcept>

        <Diagram title="Max Pooling 2x2, stride 2">
          <pre className="text-center">{`
  Feature map 4x4                   Sortie 2x2
  ┌────┬────┬────┬────┐            ┌────┬────┐
  │  1 │  3 │  2 │  1 │            │  3 │  3 │
  ├────┼────┤    │    │     =>     ├────┼────┤
  │  2 │  0 │  3 │  1 │            │  4 │  5 │
  ├────┼────┼────┼────┤            └────┴────┘
  │  4 │  1 │  5 │  2 │
  ├────┼────┤    │    │    max(1,3,2,0) = 3
  │  0 │  2 │  1 │  4 │    max(2,1,3,1) = 3
  └────┴────┴────┴────┘    max(4,1,0,2) = 4
                            max(5,2,1,4) = 5
`}</pre>
        </Diagram>

        <Warning>
          <p>
            Le pooling jette de l&apos;information spatiale de maniere
            irreversible. Les architectures modernes (ResNet, EfficientNet)
            tendent a utiliser des convolutions avec stride 2 plutot que du max
            pooling pour le sous-echantillonnage — car les convolutions sont
            apprenables, contrairement au pooling.
          </p>
        </Warning>

        <p>
          Chaque filtre de convolution produit une <strong>feature map</strong>.
          Si on applique 64 filtres 3x3 a une image 32x32, on obtient un tenseur
          32x32x64 (avec same padding). Apres max pooling 2x2, on passe a
          16x16x64. Le nombre de features spatiales diminue, mais le nombre de
          channels (profondeur) augmente couche apres couche.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 4. ARCHITECTURE D'UN CNN                                     */}
      {/* ============================================================ */}
      <Section id="architecture" number="04" title="Architecture d'un CNN">
        <p>
          Un CNN suit presque toujours le meme schema : des blocs convolutifs
          (Conv + activation + pooling) empiles, suivis d&apos;un classificateur
          (couches fully-connected ou GAP + softmax).
        </p>

        <Diagram title="Architecture typique d'un CNN">
          <pre className="text-center">{`
  Image           Bloc conv 1        Bloc conv 2         Classificateur
  ┌─────┐     ┌─────────────┐    ┌─────────────┐    ┌──────────────────┐
  │     │     │ Conv 3x3    │    │ Conv 3x3    │    │ Flatten          │
  │ RGB │ --> │ ReLU        │ -->│ ReLU        │ -->│ FC 256           │
  │     │     │ MaxPool 2x2 │    │ MaxPool 2x2 │    │ ReLU             │
  └─────┘     └─────────────┘    └─────────────┘    │ FC 10 (classes)  │
  3x32x32       32x16x16           64x8x8           │ Softmax          │
                                                     └──────────────────┘
`}</pre>
        </Diagram>

        <Remark>
          <p>
            <strong>Compter les parametres</strong> — c&apos;est une question
            classique en entretien. Pour une couche Conv2d avec{" "}
            <Sub sub="in"><F>C</F></Sub> channels en entree, <Sub sub="out"><F>C</F></Sub>{" "}
            filtres de taille <F>k x k</F> : nombre de poids ={" "}
            <Sub sub="out"><F>C</F></Sub> x <Sub sub="in"><F>C</F></Sub> x{" "}
            <F>k</F> x <F>k</F> + <Sub sub="out"><F>C</F></Sub> (biais).
            Une couche Conv2d(3, 64, 3) a 64 x 3 x 3 x 3 + 64 = 1 792 parametres.
          </p>
        </Remark>

        <Code language="python">{`import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    """CNN simple pour CIFAR-10 (10 classes, images 32x32x3)."""
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1),   # 32x32x32
            nn.ReLU(),
            nn.MaxPool2d(2),                   # 32x16x16
            nn.Conv2d(32, 64, 3, padding=1),   # 64x16x16
            nn.ReLU(),
            nn.MaxPool2d(2),                   # 64x8x8
            nn.Conv2d(64, 128, 3, padding=1),  # 128x8x8
            nn.ReLU(),
            nn.MaxPool2d(2),                   # 128x4x4
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),                      # 128*4*4 = 2048
            nn.Linear(128 * 4 * 4, 256),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(256, 10),
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

model = SimpleCNN()
print(f"Parametres : {sum(p.numel() for p in model.parameters()):,}")
# => Parametres : 559,370`}</Code>

        <p>
          Remarquez le pattern : la resolution spatiale diminue (32 → 16 → 8 →
          4) tandis que le nombre de channels augmente (3 → 32 → 64 → 128).
          C&apos;est la recette de base de tous les CNN.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 5. LES GRANDES ARCHITECTURES                                 */}
      {/* ============================================================ */}
      <Section id="architectures" number="05" title="Les grandes architectures">
        <p>
          L&apos;histoire des CNN se lit a travers les resultats sur{" "}
          <Term def="Competition annuelle (2010-2017) sur 1.2M images, 1000 classes. Le benchmark qui a lance le deep learning en vision.">ImageNet</Term>.
          Chaque avancee architecturale a marque une rupture.
        </p>

        <ComparisonTable
          headers={["Architecture", "Annee", "Profondeur", "Top-5 erreur", "Innovation cle"]}
          rows={[
            ["LeNet-5", "1998", "5 couches", "~5% (MNIST)", "Premier CNN fonctionnel (Yann LeCun). Lecture de cheques bancaires."],
            ["AlexNet", "2012", "8 couches", "15.3%", "GPU training, ReLU, Dropout. A declenche la revolution deep learning."],
            ["VGG-16", "2014", "16 couches", "7.3%", "Simplicite : que des conv 3x3 empilees. Preuve que la profondeur aide."],
            ["GoogLeNet", "2014", "22 couches", "6.7%", "Modules Inception : convolutions paralleles (1x1, 3x3, 5x5). Pas de FC."],
          ]}
        />

        <KeyConcept title="La revolution AlexNet (2012)">
          <p>
            Avant AlexNet, les methodes dominantes en vision etaient les
            features manuelles (SIFT, HOG) + SVM. Alex Krizhevsky a gagne
            ImageNet 2012 avec 10 points d&apos;avance (erreur top-5 : 15.3%
            vs 25.8%). A partir de ce moment, le deep learning a domine la
            vision par ordinateur.
          </p>
        </KeyConcept>

        <p>
          <strong>Le module Inception</strong> de GoogLeNet est une idee
          elegante : plutot que de choisir entre un filtre 1x1, 3x3 ou 5x5,
          on les utilise tous en parallele et on concatene les resultats. Les
          convolutions 1x1 reduisent le nombre de channels avant les conv
          couteuses — c&apos;est le <em>bottleneck</em>.
        </p>

        <Diagram title="Module Inception (simplifie)">
          <pre className="text-center">{`
              Input feature map
         ┌────────┼────────┬──────────┐
         v        v        v          v
      Conv 1x1  Conv 1x1  Conv 1x1  MaxPool
         |        |        |       3x3
         |     Conv 3x3  Conv 5x5     |
         |        |        |       Conv 1x1
         v        v        v          v
         └────────┴────────┴──────────┘
                Concatenation
              Output feature map
`}</pre>
        </Diagram>
      </Section>

      {/* ============================================================ */}
      {/* 6. RESNET & CONNEXIONS RESIDUELLES                           */}
      {/* ============================================================ */}
      <Section id="resnet" number="06" title="ResNet et les connexions residuelles">
        <p>
          En 2015, une question simple mais profonde se pose : est-ce
          qu&apos;empiler plus de couches donne toujours de meilleurs
          resultats ? La reponse empirique est non — un reseau de 56 couches
          a une erreur <em>plus elevee</em> qu&apos;un reseau de 20 couches,
          meme sur le jeu d&apos;entrainement.
        </p>

        <Warning>
          <p>
            Ce n&apos;est PAS le probleme du vanishing gradient (qui se resout
            avec BatchNorm). C&apos;est le <strong>probleme de la degradation</strong> :
            un reseau plus profond ne peut pas apprendre la fonction identite
            facilement, alors qu&apos;un reseau peu profond y arriverait. Le
            reseau profond n&apos;arrive meme pas a copier les poids du reseau
            peu profond et ajouter des couches identite.
          </p>
        </Warning>

        <Def title="Connexion residuelle (skip connection)">
          <p>
            Au lieu d&apos;apprendre directement une transformation{" "}
            <F>H(x)</F>, on apprend le <strong>residu</strong>{" "}
            <F>F(x) = H(x) - x</F>. La sortie du bloc est :
          </p>
          <Eq>
            <F>y</F> = <F>F</F>(<F>x</F>) + <F>x</F>
          </Eq>
          <p>
            Si la transformation optimale est proche de l&apos;identite, il
            suffit que <F>F(x) &asymp; 0</F>, ce qui est facile a apprendre
            (initialiser les poids pres de zero).
          </p>
        </Def>

        <Diagram title="Bloc residuel">
          <pre className="text-center">{`
       x ─────────────────────────┐
       |                          |
   ┌───────┐                      |
   │Conv 3x3│                     |  skip connection
   │ BN+ReLU│                     |  (identite)
   ├───────┤                      |
   │Conv 3x3│                     |
   │  BN    │                     |
   └───┬───┘                      |
       |          +               |
       └──────── (+) <────────────┘
                  |
                ReLU
                  |
                  y = F(x) + x
`}</pre>
        </Diagram>

        <p>
          <strong>Pourquoi ca marche — le gradient flow.</strong> Lors de la
          backpropagation, le gradient a travers un bloc residuel est :
        </p>
        <Eq>
          &part;<F>L</F>/&part;<F>x</F> = &part;<F>L</F>/&part;<F>y</F> . (1 + &part;<F>F</F>/&part;<F>x</F>)
        </Eq>
        <p>
          Grace au terme <strong>1</strong>, le gradient ne peut jamais
          s&apos;annuler completement, meme si &part;<F>F</F>/&part;<F>x</F>{" "}
          est petit. C&apos;est une autoroute pour le gradient a travers des
          centaines de couches.
        </p>

        <ComparisonTable
          headers={["Variante", "Couches", "Parametres", "Top-5 erreur ImageNet"]}
          rows={[
            ["ResNet-18", "18", "11.7M", "7.1%"],
            ["ResNet-50", "50", "25.6M", "5.3%"],
            ["ResNet-101", "101", "44.5M", "4.9%"],
            ["ResNet-152", "152", "60.2M", "4.5%"],
          ]}
        />

        <Remark>
          <p>
            ResNet-50 utilise des blocs <strong>bottleneck</strong> : Conv 1x1
            (reduction) → Conv 3x3 → Conv 1x1 (expansion). Cela reduit le cout
            de calcul tout en augmentant la profondeur. C&apos;est ce design qui
            permet d&apos;aller a 152 couches sans exploser le nombre de parametres.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 7. EFFICIENTNET & SCALING                                    */}
      {/* ============================================================ */}
      <Section id="efficientnet" number="07" title="EfficientNet et compound scaling">
        <p>
          Avant EfficientNet (2019, Google), on scalait les CNN de maniere ad
          hoc : plus de couches (profondeur), plus de filtres (largeur), ou plus
          de resolution. Mais on ne faisait qu&apos;un seul de ces trois a la
          fois.
        </p>

        <KeyConcept title="Compound scaling">
          <p>
            L&apos;idee de Tan &amp; Le : scaler les trois dimensions
            simultanement, avec un ratio fixe. On definit un coefficient
            compose <F>&phi;</F> et on scale :
          </p>
          <p>
            Profondeur : <F>d</F> = <Sup sup={<F>&phi;</F>}><F>&alpha;</F></Sup>,{" "}
            Largeur : <F>w</F> = <Sup sup={<F>&phi;</F>}><F>&beta;</F></Sup>,{" "}
            Resolution : <F>r</F> = <Sup sup={<F>&phi;</F>}><F>&gamma;</F></Sup>
          </p>
          <p>
            Avec la contrainte <F>&alpha;</F> · <Sup sup="2"><F>&beta;</F></Sup> · <Sup sup="2"><F>&gamma;</F></Sup>{" "}
            &asymp; 2 (pour doubler les FLOPS quand <F>&phi;</F> augmente de 1).
          </p>
        </KeyConcept>

        <Steps>
          <Step number="1" title="Trouver l'architecture de base (B0)">
            Utilisation de NAS (Neural Architecture Search) pour trouver une
            architecture efficace a petite echelle. NAS explore automatiquement
            des milliers d&apos;architectures et garde la meilleure selon un
            compromis precision/FLOPS.
          </Step>
          <Step number="2" title="Trouver les ratios de scaling">
            On fixe <F>&phi;</F> = 1 et on cherche les meilleurs <F>&alpha;</F>,{" "}
            <F>&beta;</F>, <F>&gamma;</F> par grid search.
            Resultat : <F>&alpha;</F> = 1.2, <F>&beta;</F> = 1.1, <F>&gamma;</F> = 1.15.
          </Step>
          <Step number="3" title="Scaler">
            On augmente <F>&phi;</F> pour obtenir B1, B2, ..., B7.
            B7 atteint 84.3% top-1 sur ImageNet — SOTA a l&apos;epoque — avec
            8.4x moins de parametres que le meilleur CNN precedent.
          </Step>
        </Steps>

        <ComparisonTable
          headers={["Modele", "Parametres", "Top-1 accuracy", "FLOPS"]}
          rows={[
            ["EfficientNet-B0", "5.3M", "77.1%", "0.39B"],
            ["EfficientNet-B3", "12M", "81.6%", "1.8B"],
            ["EfficientNet-B5", "30M", "83.6%", "9.9B"],
            ["EfficientNet-B7", "66M", "84.3%", "37B"],
            ["ResNet-50", "26M", "76.0%", "4.1B"],
          ]}
        />

        <p>
          EfficientNet-B0 bat ResNet-50 avec 5x moins de parametres.
          C&apos;est l&apos;architecture de choix quand on a des contraintes
          de deploiement (mobile, edge).
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 8. VISION TRANSFORMERS (ViT)                                 */}
      {/* ============================================================ */}
      <Section id="vit" number="08" title="Vision Transformers (ViT)">
        <p>
          En 2020, Dosovitskiy et al. (Google) posent la question : peut-on
          appliquer un Transformer pur (sans convolution) a des images ? La
          reponse est oui — et ca marche mieux que les CNN quand on a assez
          de donnees.
        </p>

        <Def title="Patch embedding">
          <p>
            L&apos;image est decoupee en <F>N</F> patches de taille <F>P x P</F>{" "}
            (typiquement 16x16). Chaque patch est aplati en un vecteur et projete
            lineairement en un embedding de dimension <F>D</F>. On ajoute un
            positional embedding appris, puis on envoie la sequence de{" "}
            <F>N</F> tokens dans un Transformer encoder standard.
          </p>
        </Def>

        <Diagram title="Architecture ViT">
          <pre className="text-center">{`
  Image 224x224          Patches 16x16          Transformer Encoder
  ┌──────────┐      ┌─┬─┬─┬─┬─┬─┬─ ...       ┌──────────────────┐
  │          │      │1│2│3│4│5│6│7│            │ Multi-Head       │
  │          │  --> │ │ │ │ │ │ │ │  ──────>   │ Self-Attention   │
  │          │      │ │ │ │ │ │ │ │            │       +          │
  │          │      └─┴─┴─┴─┴─┴─┴─┘            │ Feed-Forward    │
  └──────────┘      196 patches + [CLS]        │   x L couches   │
                    + pos. embeddings           └───────┬──────────┘
                                                        |
                                                  [CLS] token
                                                        |
                                                   MLP Head
                                                   (classes)
`}</pre>
        </Diagram>

        <p>
          Les variantes majeures :
        </p>
        <Steps>
          <Step number="1" title="DeiT (Data-efficient Image Transformer, 2021)">
            Montre qu&apos;on peut entrainer un ViT efficacement sur ImageNet seul
            (sans les 300M d&apos;images JFT de Google), grace a un token de
            distillation et un data augmentation aggressif.
          </Step>
          <Step number="2" title="Swin Transformer (2021)">
            Introduit l&apos;attention par fenetres glissantes (shifted windows),
            ce qui restaure la hierarchie locale des CNN. Complexite lineaire au
            lieu de quadratique. Domine les benchmarks en detection et segmentation.
          </Step>
        </Steps>

        <ComparisonTable
          headers={["Modele", "Type", "Top-1 ImageNet", "Parametres", "Forces"]}
          rows={[
            ["ResNet-50", "CNN", "76.0%", "26M", "Rapide a entrainer, peu de donnees"],
            ["EfficientNet-B7", "CNN", "84.3%", "66M", "Meilleur rapport precision/FLOPS"],
            ["ViT-L/16", "Transformer", "87.8%", "307M", "SOTA avec beaucoup de donnees (JFT-300M)"],
            ["DeiT-B", "Transformer", "83.1%", "86M", "Entrainable sur ImageNet seul"],
            ["Swin-L", "Transformer", "87.3%", "197M", "Polyvalent : classif + detection + segmentation"],
            ["ConvNeXt-L", "CNN modernise", "87.5%", "198M", "CNN avec les recettes des Transformers (2022)"],
          ]}
        />

        <Remark>
          <p>
            En 2025, la frontiere entre CNN et Transformer est floue.
            ConvNeXt (Liu et al., 2022) a montre qu&apos;un CNN modernise
            (avec les tricks des Transformers : large kernels, LayerNorm,
            GELU, fewer activations) egale les ViT. Le debat n&apos;est plus
            &quot;CNN vs Transformer&quot; mais &quot;quels inductive biases
            pour quelle tache et quelle quantite de donnees ?&quot;
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 9. TRANSFER LEARNING                                         */}
      {/* ============================================================ */}
      <Section id="transfer-learning" number="09" title="Transfer learning">
        <p>
          Entrainer un CNN from scratch necessite des millions d&apos;images et
          des jours de GPU. En pratique, on utilise presque toujours un modele
          pre-entraine sur ImageNet et on l&apos;adapte a notre tache. C&apos;est
          le <strong>transfer learning</strong>.
        </p>

        <KeyConcept title="Feature extraction vs Fine-tuning">
          <p>
            <strong>Feature extraction</strong> : on gele toutes les couches
            convolutives (pas de mise a jour des poids) et on ne re-entraine que
            le classificateur final. Rapide, peu de donnees necessaires.{" "}
            <strong>Fine-tuning</strong> : on degele une partie des couches
            (typiquement les dernieres) et on les re-entraine avec un learning
            rate tres faible. Plus precis, mais risque d&apos;overfitting si
            peu de donnees.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Strategie", "Couches gelees", "LR", "Donnees necessaires", "Quand l'utiliser"]}
          rows={[
            ["Feature extraction", "Toutes sauf la derniere", "1e-3", "100-1000 images", "Tache similaire a ImageNet, peu de donnees"],
            ["Fine-tuning leger", "Premieres couches", "1e-4 a 1e-5", "1000-10000 images", "Tache moderement differente"],
            ["Fine-tuning complet", "Aucune", "1e-5 a 1e-6", "10000+ images", "Tache tres differente (images medicales, satellite)"],
          ]}
        />

        <Code language="python">{`import torch
import torch.nn as nn
from torchvision import models, transforms
from torch.utils.data import DataLoader

# 1. Charger un ResNet-50 pre-entraine sur ImageNet
model = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V2)

# 2. Geler toutes les couches
for param in model.parameters():
    param.requires_grad = False

# 3. Remplacer la derniere couche FC (1000 classes -> 5 classes)
model.fc = nn.Sequential(
    nn.Linear(2048, 256),
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(256, 5),   # 5 classes pour notre tache
)
# Seuls les poids de model.fc seront entraines

# 4. Preprocessing identique a l'entrainement original
preprocess = models.ResNet50_Weights.IMAGENET1K_V2.transforms()

# 5. Entrainement (feature extraction)
optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

# -- Boucle d'entrainement standard --
for epoch in range(10):
    for images, labels in train_loader:
        outputs = model(images)
        loss = criterion(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

# 6. Fine-tuning : degeler les dernieres couches
for param in model.layer4.parameters():
    param.requires_grad = True

# Reduire le LR pour les couches degelees
optimizer = torch.optim.Adam([
    {"params": model.fc.parameters(), "lr": 1e-3},
    {"params": model.layer4.parameters(), "lr": 1e-5},
])`}</Code>

        <Warning>
          <p>
            Toujours utiliser le <strong>meme preprocessing</strong> que celui
            utilise pour l&apos;entrainement du modele pre-entraine.
            ResNet-50 attend des images normalisees avec mean=[0.485, 0.456, 0.406]
            et std=[0.229, 0.224, 0.225]. Si vous normalisez differemment, les
            features extraites seront aberrantes.
          </p>
        </Warning>

        <Code language="python">{`# Conv2d from scratch avec NumPy
import numpy as np

def conv2d(image, kernel, stride=1, padding=0):
    """Convolution 2D naive — pour comprendre le mecanisme."""
    if padding > 0:
        image = np.pad(image, padding, mode='constant')

    h, w = image.shape
    kh, kw = kernel.shape
    out_h = (h - kh) // stride + 1
    out_w = (w - kw) // stride + 1
    output = np.zeros((out_h, out_w))

    for i in range(out_h):
        for j in range(out_w):
            region = image[
                i*stride : i*stride + kh,
                j*stride : j*stride + kw
            ]
            output[i, j] = np.sum(region * kernel)

    return output

# Detecteur de contours horizontaux
kernel = np.array([
    [-1, -1, -1],
    [ 0,  0,  0],
    [ 1,  1,  1]
], dtype=np.float32)

image = np.random.rand(8, 8).astype(np.float32)
result = conv2d(image, kernel, stride=1, padding=0)
print(f"Input: {image.shape} -> Output: {result.shape}")
# Input: (8, 8) -> Output: (6, 6)`}</Code>
      </Section>

      {/* ============================================================ */}
      {/* 10. QUIZ FINAL                                               */}
      {/* ============================================================ */}
      <Section id="quiz-final" number="10" title="Quiz final">
        <Quiz
          question="Pourquoi les CNN utilisent-ils le partage de poids (weight sharing) ?"
          options={[
            "Pour accelerer l'inference sur GPU",
            "Pour detecter le meme motif a differentes positions dans l'image, et reduire le nombre de parametres",
            "Pour eviter le vanishing gradient",
            "Pour pouvoir traiter des images de tailles differentes",
          ]}
          answer={1}
          explanation="Le meme filtre est applique a toutes les positions spatiales. Un detecteur de contour detecte les contours partout dans l'image avec un seul jeu de poids, au lieu d'apprendre un detecteur par position."
        />

        <Quiz
          question="Quel est le nombre de parametres d'une couche Conv2d(64, 128, kernel_size=3) ?"
          options={[
            "128 x 64 x 3 x 3 = 73 728",
            "128 x 64 x 3 x 3 + 128 = 73 856",
            "128 x 3 x 3 + 128 = 1 280",
            "64 x 128 + 128 = 8 320",
          ]}
          answer={1}
          explanation="Pour chaque filtre : C_in x k x k poids + 1 biais. Soit 128 filtres x (64 x 3 x 3) + 128 biais = 73 856 parametres."
        />

        <Quiz
          question="Quel probleme ResNet resout-il avec les skip connections ?"
          options={[
            "Le vanishing gradient",
            "L'overfitting sur ImageNet",
            "Le probleme de la degradation : un reseau plus profond performe moins bien qu'un reseau moins profond",
            "Le cout de calcul excessif des convolutions",
          ]}
          answer={2}
          explanation="He et al. ont montre que le probleme n'est pas le vanishing gradient (resolu par BatchNorm) mais la degradation : un reseau de 56 couches a une erreur PLUS ELEVEE qu'un reseau de 20 couches. Les skip connections permettent au reseau d'apprendre au minimum la fonction identite."
        />

        <Quiz
          question="Quelle est la difference fondamentale entre ViT et un CNN classique ?"
          options={[
            "ViT utilise des convolutions 1x1 au lieu de 3x3",
            "ViT decoupe l'image en patches et applique du self-attention au lieu de convolutions",
            "ViT n'a pas besoin de donnees d'entrainement",
            "ViT est toujours plus rapide qu'un CNN",
          ]}
          answer={1}
          explanation="ViT traite l'image comme une sequence de patches (16x16 typiquement) et applique le mecanisme de self-attention du Transformer. Pas de convolution du tout — c'est un Transformer pur adapte aux images."
        />

        <Quiz
          question="En transfer learning, quand utiliser le fine-tuning plutot que la feature extraction ?"
          options={[
            "Quand on n'a que 50 images",
            "Quand la tache cible est tres differente de ImageNet (images medicales, satellite) et qu'on a suffisamment de donnees",
            "Quand on veut un modele plus petit",
            "Quand on utilise un ViT au lieu d'un CNN",
          ]}
          answer={1}
          explanation="La feature extraction suffit quand la tache est similaire a ImageNet et les donnees sont rares. Le fine-tuning est necessaire quand les features de bas niveau (textures, formes) sont tres differentes de celles d'ImageNet, mais il faut assez de donnees pour eviter l'overfitting."
        />
      </Section>
    </>
  );
}
