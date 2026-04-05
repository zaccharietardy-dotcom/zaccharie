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
import { Def, Remark } from "@/components/math-elements";
import {
  SvgDiagram,
  Box,
  Arrow,
  Label,
  GroupBox,
  Circle,
} from "@/components/svg-diagrams";

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

        <SvgDiagram width={720} height={260} title="Kernel 3x3 glissant sur une image 5x5 (stride=1, valid)">
          {/* ── Image 5x5 grid ── */}
          <Label x={100} y={18} text="Image 5x5" size={11} color="#e4e4e7" weight="bold" />
          {(() => {
            const ox = 30, oy = 32, s = 34;
            const vals = [[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1]];
            return (
              <g>
                {vals.flatMap((row, r) =>
                  row.map((v, c) => (
                    <g key={`img-${r}-${c}`}>
                      <rect x={ox + c * s} y={oy + r * s} width={s} height={s} rx={3}
                        fill={r < 3 && c < 3 ? "#10b98122" : "#18181b"} stroke={r < 3 && c < 3 ? "#10b981" : "#27272a"} strokeWidth={1.2} />
                      <text x={ox + c * s + s / 2} y={oy + r * s + s / 2} textAnchor="middle"
                        dominantBaseline="central" fill={r < 3 && c < 3 ? "#10b981" : "#a1a1aa"} fontSize={12} fontFamily="monospace">{v}</text>
                    </g>
                  ))
                )}
              </g>
            );
          })()}

          {/* ── Kernel 3x3 ── */}
          <Label x={320} y={18} text="Kernel 3x3" size={11} color="#e4e4e7" weight="bold" />
          {(() => {
            const ox = 260, oy = 32, s = 34;
            const vals = [[1,0,1],[0,1,0],[1,0,1]];
            return (
              <g>
                {vals.flatMap((row, r) =>
                  row.map((v, c) => (
                    <g key={`kern-${r}-${c}`}>
                      <rect x={ox + c * s} y={oy + r * s} width={s} height={s} rx={3}
                        fill="#8b5cf622" stroke="#8b5cf6" strokeWidth={1.2} />
                      <text x={ox + c * s + s / 2} y={oy + r * s + s / 2} textAnchor="middle"
                        dominantBaseline="central" fill="#8b5cf6" fontSize={12} fontFamily="monospace">{v}</text>
                    </g>
                  ))
                )}
              </g>
            );
          })()}

          {/* ── Arrow ── */}
          <Arrow x1={400} y1={85} x2={450} y2={85} color="#a1a1aa" />

          {/* ── Feature map 3x3 ── */}
          <Label x={530} y={18} text="Feature map 3x3" size={11} color="#e4e4e7" weight="bold" />
          {(() => {
            const ox = 470, oy = 32, s = 34;
            const vals = [[4,3,4],[2,4,3],[4,3,4]];
            return (
              <g>
                {vals.flatMap((row, r) =>
                  row.map((v, c) => (
                    <g key={`out-${r}-${c}`}>
                      <rect x={ox + c * s} y={oy + r * s} width={s} height={s} rx={3}
                        fill="#06b6d422" stroke="#06b6d4" strokeWidth={1.2} />
                      <text x={ox + c * s + s / 2} y={oy + r * s + s / 2} textAnchor="middle"
                        dominantBaseline="central" fill="#06b6d4" fontSize={12} fontFamily="monospace">{v}</text>
                    </g>
                  ))
                )}
              </g>
            );
          })()}

          {/* ── Calculation note ── */}
          <Label x={260} y={175} text="Position (0,0):" size={10} color="#e4e4e7" anchor="start" weight="bold" />
          <Label x={260} y={195} text="1*1 + 0*0 + 1*1 + 0*0 + 1*1" size={10} color="#a1a1aa" anchor="start" />
          <Label x={260} y={212} text="+ 0*0 + 1*1 + 0*0 + 1*1 = 4" size={10} color="#10b981" anchor="start" weight="bold" />
        </SvgDiagram>

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

        <SvgDiagram width={680} height={250} title="Max Pooling 2x2, stride 2">
          {/* ── Feature map 4x4 ── */}
          <Label x={112} y={18} text="Feature map 4x4" size={11} color="#e4e4e7" weight="bold" />
          {(() => {
            const ox = 40, oy = 34, s = 38;
            const vals = [[1,3,2,1],[2,0,3,1],[4,1,5,2],[0,2,1,4]];
            const poolColors = [
              [[0,0],[0,1],[1,0],[1,1]], // top-left pool  -> accent
              [[0,2],[0,3],[1,2],[1,3]], // top-right pool -> violet
              [[2,0],[2,1],[3,0],[3,1]], // bottom-left    -> cyan
              [[2,2],[2,3],[3,2],[3,3]], // bottom-right   -> amber
            ];
            const colors = ["#10b981","#8b5cf6","#06b6d4","#f59e0b"];
            const dimColors = ["#10b98122","#8b5cf622","#06b6d422","#f59e0b22"];
            function poolIdx(r: number, c: number) {
              for (let p = 0; p < poolColors.length; p++)
                for (const [pr, pc] of poolColors[p]) if (pr === r && pc === c) return p;
              return -1;
            }
            return (
              <g>
                {vals.flatMap((row, r) =>
                  row.map((v, c) => {
                    const pi = poolIdx(r, c);
                    const isMax = [3,3,4,5][pi] === v && [[0,1],[0,2],[2,0],[2,2]].some(([mr,mc]) => mr===r && mc===c);
                    return (
                      <g key={`pool-${r}-${c}`}>
                        <rect x={ox + c * s} y={oy + r * s} width={s} height={s} rx={3}
                          fill={dimColors[pi]} stroke={colors[pi]} strokeWidth={isMax ? 2 : 1} />
                        <text x={ox + c * s + s / 2} y={oy + r * s + s / 2} textAnchor="middle"
                          dominantBaseline="central" fill={colors[pi]} fontSize={13} fontWeight={isMax ? 700 : 400} fontFamily="monospace">{v}</text>
                      </g>
                    );
                  })
                )}
              </g>
            );
          })()}

          {/* ── Arrow ── */}
          <Arrow x1={210} y1={110} x2={280} y2={110} label="max" color="#a1a1aa" />

          {/* ── Sortie 2x2 ── */}
          <Label x={370} y={18} text="Sortie 2x2" size={11} color="#e4e4e7" weight="bold" />
          {(() => {
            const ox = 300, oy = 55, s = 46;
            const vals = [[3,3],[4,5]];
            const colors = [["#10b981","#8b5cf6"],["#06b6d4","#f59e0b"]];
            const dimColors = [["#10b98133","#8b5cf633"],["#06b6d433","#f59e0b33"]];
            return (
              <g>
                {vals.flatMap((row, r) =>
                  row.map((v, c) => (
                    <g key={`out-${r}-${c}`}>
                      <rect x={ox + c * s} y={oy + r * s} width={s} height={s} rx={4}
                        fill={dimColors[r][c]} stroke={colors[r][c]} strokeWidth={1.5} />
                      <text x={ox + c * s + s / 2} y={oy + r * s + s / 2} textAnchor="middle"
                        dominantBaseline="central" fill={colors[r][c]} fontSize={14} fontWeight={700} fontFamily="monospace">{v}</text>
                    </g>
                  ))
                )}
              </g>
            );
          })()}

          {/* ── Annotations ── */}
          <Label x={440} y={78} text="max(1,3,2,0) = 3" size={10} color="#10b981" anchor="start" />
          <Label x={440} y={96} text="max(2,1,3,1) = 3" size={10} color="#8b5cf6" anchor="start" />
          <Label x={440} y={114} text="max(4,1,0,2) = 4" size={10} color="#06b6d4" anchor="start" />
          <Label x={440} y={132} text="max(5,2,1,4) = 5" size={10} color="#f59e0b" anchor="start" />
        </SvgDiagram>

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

        <SvgDiagram width={760} height={190} title="Architecture typique d'un CNN">
          {/* Image */}
          <Box x={10} y={40} w={80} h={70} label="RGB" sublabel="3x32x32" color="default" />
          <Arrow x1={90} y1={75} x2={130} y2={75} />

          {/* Bloc conv 1 */}
          <GroupBox x={130} y={10} w={140} h={130} label="Bloc conv 1" color="accent" />
          <Box x={145} y={30} w={110} h={28} label="Conv 3x3" color="accent" />
          <Box x={145} y={64} w={110} h={28} label="ReLU" color="accent" />
          <Box x={145} y={98} w={110} h={28} label="MaxPool 2x2" color="accent" />
          <Label x={200} y={155} text="32x16x16" size={10} color="#a1a1aa" />
          <Arrow x1={270} y1={75} x2={310} y2={75} />

          {/* Bloc conv 2 */}
          <GroupBox x={310} y={10} w={140} h={130} label="Bloc conv 2" color="violet" />
          <Box x={325} y={30} w={110} h={28} label="Conv 3x3" color="violet" />
          <Box x={325} y={64} w={110} h={28} label="ReLU" color="violet" />
          <Box x={325} y={98} w={110} h={28} label="MaxPool 2x2" color="violet" />
          <Label x={380} y={155} text="64x8x8" size={10} color="#a1a1aa" />
          <Arrow x1={450} y1={75} x2={490} y2={75} />

          {/* Classificateur */}
          <GroupBox x={490} y={10} w={150} h={160} label="Classificateur" color="cyan" />
          <Box x={505} y={30} w={120} h={24} label="Flatten" color="default" />
          <Box x={505} y={60} w={120} h={24} label="FC 256" color="cyan" />
          <Box x={505} y={90} w={120} h={24} label="ReLU" color="cyan" />
          <Box x={505} y={120} w={120} h={24} label="FC 10" color="cyan" />
          <Box x={505} y={150} w={120} h={24} label="Softmax" color="rose" />
        </SvgDiagram>

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

        <SvgDiagram width={680} height={340} title="Module Inception (simplifie)">
          {/* Input */}
          <Box x={250} y={5} w={160} h={32} label="Input feature map" color="default" />

          {/* Branch lines from input to each branch top */}
          <Arrow x1={290} y1={37} x2={75} y2={70} />
          <Arrow x1={310} y1={37} x2={225} y2={70} />
          <Arrow x1={370} y1={37} x2={395} y2={70} />
          <Arrow x1={390} y1={37} x2={565} y2={70} />

          {/* Branch 1: Conv 1x1 only */}
          <Box x={20} y={70} w={110} h={32} label="Conv 1x1" color="accent" />

          {/* Branch 2: Conv 1x1 -> Conv 3x3 */}
          <Box x={170} y={70} w={110} h={32} label="Conv 1x1" color="violet" />
          <Arrow x1={225} y1={102} x2={225} y2={125} />
          <Box x={170} y={125} w={110} h={32} label="Conv 3x3" color="violet" />

          {/* Branch 3: Conv 1x1 -> Conv 5x5 */}
          <Box x={340} y={70} w={110} h={32} label="Conv 1x1" color="cyan" />
          <Arrow x1={395} y1={102} x2={395} y2={125} />
          <Box x={340} y={125} w={110} h={32} label="Conv 5x5" color="cyan" />

          {/* Branch 4: MaxPool -> Conv 1x1 */}
          <Box x={510} y={70} w={110} h={32} label="MaxPool 3x3" color="amber" />
          <Arrow x1={565} y1={102} x2={565} y2={125} />
          <Box x={510} y={125} w={110} h={32} label="Conv 1x1" color="amber" />

          {/* Lines from each branch bottom to concat */}
          <Arrow x1={75} y1={102} x2={75} y2={220} />
          <Arrow x1={225} y1={157} x2={225} y2={220} />
          <Arrow x1={395} y1={157} x2={395} y2={220} />
          <Arrow x1={565} y1={157} x2={565} y2={220} />

          {/* Concatenation */}
          <GroupBox x={20} y={220} w={600} h={40} label="" color="rose" />
          <Label x={320} y={240} text="Concatenation (depth)" size={12} color="#f43f5e" weight="bold" />

          {/* Output */}
          <Arrow x1={320} y1={260} x2={320} y2={285} />
          <Box x={240} y={285} w={160} h={32} label="Output feature map" color="default" />
        </SvgDiagram>
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

        <SvgDiagram width={700} height={320} title="Le probleme de la degradation — pourquoi plus profond ≠ meilleur">
          {/* Left: without ResNet */}
          <GroupBox x={15} y={25} w={320} h={280} label="Sans skip connections" color="rose" />
          {/* Axes */}
          <Arrow x1={50} y1={260} x2={300} y2={260} color="#a1a1aa" />
          <Arrow x1={50} y1={260} x2={50} y2={55} color="#a1a1aa" />
          <Label x={175} y={285} text="Epochs" size={10} color="#a1a1aa" />
          <Label x={30} y={150} text="Err" size={10} color="#a1a1aa" />
          {/* 20-layer curve (lower error) */}
          <polyline points="70,220 110,180 150,155 190,140 230,132 270,128" fill="none" stroke="#10b981" strokeWidth={2} />
          <Label x={280} y={128} text="20 couches" size={9} color="#10b981" anchor="start" />
          {/* 56-layer curve (HIGHER error — the paradox) */}
          <polyline points="70,230 110,200 150,180 190,170 230,165 270,162" fill="none" stroke="#f43f5e" strokeWidth={2} />
          <Label x={280} y={162} text="56 couches" size={9} color="#f43f5e" anchor="start" />
          {/* Paradox annotation */}
          <Arrow x1={240} y1={155} x2={240} y2={135} color="#f43f5e" dashed />
          <Label x={175} y={75} text="Plus profond = PIRE" size={11} color="#f43f5e" weight="bold" />
          <Label x={175} y={90} text="(meme en training !)" size={9} color="#f43f5e" />

          {/* Right: with ResNet */}
          <GroupBox x={365} y={25} w={320} h={280} label="Avec skip connections (ResNet)" color="accent" />
          {/* Axes */}
          <Arrow x1={400} y1={260} x2={650} y2={260} color="#a1a1aa" />
          <Arrow x1={400} y1={260} x2={400} y2={55} color="#a1a1aa" />
          <Label x={525} y={285} text="Epochs" size={10} color="#a1a1aa" />
          <Label x={380} y={150} text="Err" size={10} color="#a1a1aa" />
          {/* 20-layer ResNet */}
          <polyline points="420,220 460,175 500,148 540,130 580,120 620,115" fill="none" stroke="#06b6d4" strokeWidth={2} />
          <Label x={628} y={115} text="20" size={9} color="#06b6d4" anchor="start" />
          {/* 56-layer ResNet (LOWER — correct behavior) */}
          <polyline points="420,215 460,165 500,130 540,108 580,95 620,88" fill="none" stroke="#10b981" strokeWidth={2} />
          <Label x={628} y={88} text="56" size={9} color="#10b981" anchor="start" />
          {/* Correct annotation */}
          <Arrow x1={590} y1={100} x2={590} y2={82} color="#10b981" dashed />
          <Label x={525} y={75} text="Plus profond = MIEUX" size={11} color="#10b981" weight="bold" />
        </SvgDiagram>

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

        <SvgDiagram width={440} height={320} title="Bloc residuel">
          {/* Input x */}
          <Label x={120} y={20} text="x" size={14} color="#e4e4e7" weight="bold" />
          <Arrow x1={120} y1={30} x2={120} y2={55} />

          {/* Conv 3x3 + BN + ReLU */}
          <Box x={50} y={55} w={140} h={36} label="Conv 3x3" sublabel="BN + ReLU" color="violet" />
          <Arrow x1={120} y1={91} x2={120} y2={120} />

          {/* Conv 3x3 + BN */}
          <Box x={50} y={120} w={140} h={36} label="Conv 3x3" sublabel="BN" color="violet" />
          <Arrow x1={120} y1={156} x2={120} y2={195} />

          {/* Skip connection path */}
          {/* Horizontal from x level to right */}
          <line x1={120} y1={30} x2={330} y2={30} stroke="#10b981" strokeWidth={1.5} strokeDasharray="6,4" />
          {/* Down the right side */}
          <line x1={330} y1={30} x2={330} y2={210} stroke="#10b981" strokeWidth={1.5} strokeDasharray="6,4" />
          {/* Label on skip */}
          <Label x={350} y={120} text="skip" size={10} color="#10b981" anchor="start" />
          <Label x={350} y={136} text="connection" size={10} color="#10b981" anchor="start" />
          <Label x={350} y={152} text="(identite)" size={9} color="#10b98199" anchor="start" />
          {/* Arrow from right into the + circle */}
          <Arrow x1={330} y1={210} x2={155} y2={210} color="#10b981" />

          {/* Addition circle */}
          <Circle cx={120} cy={210} r={18} label="+" color="accent" />

          {/* ReLU below */}
          <Arrow x1={120} y1={228} x2={120} y2={255} />
          <Box x={60} y={255} w={120} h={32} label="ReLU" color="rose" />

          {/* Output */}
          <Arrow x1={120} y1={287} x2={120} y2={305} />
          <Label x={120} y={315} text="y = F(x) + x" size={12} color="#e4e4e7" weight="bold" />
        </SvgDiagram>

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

        <SvgDiagram width={740} height={280} title="Architecture ViT">
          {/* ── Image ── */}
          <Box x={10} y={50} w={100} h={80} label="Image" sublabel="224x224" color="default" />
          <Arrow x1={110} y1={90} x2={145} y2={90} />

          {/* ── Patches ── */}
          <Label x={220} y={25} text="Patches 16x16" size={11} color="#e4e4e7" weight="bold" />
          {(() => {
            const ox = 150, oy = 55, w = 20, gap = 3;
            const labels = ["1","2","3","4","5","6","7","..."];
            return (
              <g>
                {labels.map((l, i) => (
                  <g key={`p-${i}`}>
                    <rect x={ox + i * (w + gap)} y={oy} width={w} height={55} rx={3}
                      fill="#8b5cf622" stroke="#8b5cf6" strokeWidth={1} />
                    <text x={ox + i * (w + gap) + w / 2} y={oy + 28} textAnchor="middle"
                      dominantBaseline="central" fill="#8b5cf6" fontSize={9} fontFamily="monospace">{l}</text>
                  </g>
                ))}
                {/* [CLS] token */}
                <rect x={ox - (w + gap + 2)} y={oy} width={w + 2} height={55} rx={3}
                  fill="#f43f5e22" stroke="#f43f5e" strokeWidth={1.2} />
                <text x={ox - (w + gap + 2) + (w + 2) / 2} y={oy + 28} textAnchor="middle"
                  dominantBaseline="central" fill="#f43f5e" fontSize={7} fontWeight={700} fontFamily="monospace">CLS</text>
              </g>
            );
          })()}
          <Label x={220} y={125} text="196 patches + [CLS]" size={9} color="#a1a1aa" />
          <Label x={220} y={140} text="+ pos. embeddings" size={9} color="#a1a1aa" />

          {/* ── Arrow to Transformer ── */}
          <Arrow x1={340} y1={90} x2={390} y2={90} />

          {/* ── Transformer Encoder ── */}
          <GroupBox x={390} y={20} w={180} h={160} label="Transformer Encoder" color="accent" />
          <Box x={410} y={45} w={140} h={36} label="Multi-Head" sublabel="Self-Attention" color="accent" />
          <Arrow x1={480} y1={81} x2={480} y2={100} />
          <Box x={410} y={100} w={140} h={36} label="Feed-Forward" sublabel="x L couches" color="accent" />
          <Label x={480} y={155} text="x L" size={10} color="#10b981" weight="bold" />

          {/* ── Arrow to CLS output ── */}
          <Arrow x1={570} y1={100} x2={620} y2={100} />

          {/* ── CLS token output ── */}
          <Box x={620} y={75} w={100} h={30} label="[CLS] token" color="rose" />
          <Arrow x1={670} y1={105} x2={670} y2={140} />

          {/* ── MLP Head ── */}
          <Box x={620} y={140} w={100} h={30} label="MLP Head" color="cyan" />
          <Arrow x1={670} y1={170} x2={670} y2={200} />
          <Label x={670} y={215} text="Classes" size={11} color="#06b6d4" weight="bold" />
        </SvgDiagram>

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
