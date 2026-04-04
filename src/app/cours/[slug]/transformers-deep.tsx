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
import { Def, Theorem, Remark } from "@/components/math-elements";

/* ── Local math helpers ─────────────────────────────────── */

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

function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center mx-1 align-middle text-[0.85em]">
      <span className="border-b border-current px-1 pb-0.5">{n}</span>
      <span className="px-1 pt-0.5">{d}</span>
    </span>
  );
}

function Sub({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub: React.ReactNode;
}) {
  return (
    <span>
      {children}
      <sub className="text-[0.7em]">{sub}</sub>
    </span>
  );
}

function Sup({
  children,
  sup,
}: {
  children: React.ReactNode;
  sup: React.ReactNode;
}) {
  return (
    <span>
      {children}
      <sup className="text-[0.7em]">{sup}</sup>
    </span>
  );
}

/* ── TransformersDeep ───────────────────────────────────── */

export function TransformersDeep() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. POURQUOI LES TRANSFORMERS                                 */}
      {/* ============================================================ */}
      <Section
        id="pourquoi"
        number="01"
        title="Pourquoi les Transformers"
      >
        <p>
          Avant 2017, le traitement du langage naturel reposait sur les{" "}
          <Term def="Recurrent Neural Network : reseau qui traite les tokens un par un, en propageant un etat cache d'un pas de temps au suivant.">
            RNN
          </Term>{" "}
          et leurs variantes (LSTM, GRU). Ces architectures avaient un defaut
          fondamental : elles traitent les tokens{" "}
          <strong>sequentiellement</strong>. Le token 50 ne peut etre traite
          qu&apos;apres le token 49.
        </p>

        <KeyConcept title="Les limites des RNN">
          <p>
            <strong>1. Pas de parallelisation</strong> — chaque pas de temps
            depend du precedent, ce qui rend l&apos;entrainement lent sur GPU.
          </p>
          <p>
            <strong>2. Disparition du gradient</strong> — sur les longues
            sequences, le signal se dilue a travers les multiplications
            successives. Le modele &quot;oublie&quot; le debut.
          </p>
          <p>
            <strong>3. Goulot d&apos;etranglement</strong> — toute
            l&apos;information d&apos;une phrase de 500 mots doit passer par un
            seul vecteur d&apos;etat cache de taille fixe.
          </p>
        </KeyConcept>

        <p>
          En juin 2017, Vaswani et al. publient{" "}
          <strong>&quot;Attention Is All You Need&quot;</strong> chez Google
          Brain. Leur idee : abandonner completement la recurrence et se baser
          uniquement sur un mecanisme d&apos;<strong>attention</strong>.
          L&apos;architecture proposee — le <strong>Transformer</strong> — traite
          tous les tokens en parallele et accede directement a n&apos;importe
          quel autre token de la sequence.
        </p>

        <Analogy>
          <p>
            Un RNN lit un livre page par page, en ne gardant qu&apos;un resume
            de ce qu&apos;il a lu. Un Transformer voit toutes les pages etalees
            sur une table et peut pointer du doigt n&apos;importe quel passage a
            tout moment.
          </p>
        </Analogy>

        <ComparisonTable
          headers={["", "RNN / LSTM", "Transformer"]}
          rows={[
            ["Traitement", "Sequentiel", "Parallele (tous les tokens en meme temps)"],
            ["Complexite temporelle", "O(n) par couche", "O(n^2) par couche (mais parallelisable)"],
            ["Dependances longues", "Difficile (vanishing gradient)", "Directes via attention"],
            ["Entrainement GPU", "Lent (pas parallelisable)", "Tres rapide (operations matricielles)"],
            ["Papier fondateur", "Hochreiter & Schmidhuber (1997)", "Vaswani et al. (2017)"],
          ]}
        />

        <p>
          Le Transformer a tout change. Huit ans plus tard, c&apos;est
          l&apos;architecture derriere GPT-4, Claude, Gemini, LLaMA, et la quasi
          totalite des modeles de langage modernes. Ce cours va dans le detail
          mathematique et l&apos;implementation from scratch.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 2. SELF-ATTENTION — LES MATHS                                */}
      {/* ============================================================ */}
      <Section
        id="self-attention"
        number="02"
        title="Self-Attention — les maths"
      >
        <p>
          Le coeur du Transformer est le mecanisme de{" "}
          <Term def="Mecanisme qui permet a chaque token de 'regarder' tous les autres tokens de la sequence pour calculer sa representation.">
            self-attention
          </Term>
          . L&apos;idee : pour representer un mot, on regarde a quel point
          chaque autre mot de la phrase est pertinent.
        </p>

        <Def title="Matrices Q, K, V">
          <p>
            Soit <F>X</F> la matrice d&apos;entree de taille{" "}
            <F>n x <Sub sub="model">d</Sub></F> (n tokens, chacun de
            dimension <Sub sub="model">d</Sub>). On definit trois projections
            lineaires :
          </p>
          <Eq>
            Q = X<Sub sub="Q">W</Sub> , K = X<Sub sub="K">W</Sub> , V = X<Sub sub="V">W</Sub>
          </Eq>
          <p>
            ou <Sub sub="Q">W</Sub>, <Sub sub="K">W</Sub>,{" "}
            <Sub sub="V">W</Sub> sont des matrices de poids apprenables de
            taille <F><Sub sub="model">d</Sub> x <Sub sub="k">d</Sub></F>.
          </p>
          <p>
            <strong>Q</strong> (Query) = &quot;ce que je cherche&quot;.{" "}
            <strong>K</strong> (Key) = &quot;ce que je propose&quot;.{" "}
            <strong>V</strong> (Value) = &quot;l&apos;information que je
            porte&quot;.
          </p>
        </Def>

        <Theorem title="Formule" name="Scaled Dot-Product Attention">
          <Eq>
            Attention(Q, K, V) = softmax(
            <Frac n={<>QK<Sup sup="T">&#8203;</Sup></>} d={<><F>&radic;<Sub sub="k">d</Sub></F></>} />
            ) V
          </Eq>
          <p>
            Le produit <F>QK<Sup sup="T">&#8203;</Sup></F> donne une matrice{" "}
            <F>n x n</F> de scores d&apos;attention. Le softmax normalise chaque
            ligne en distribution de probabilites. La multiplication par{" "}
            <F>V</F> produit la sortie ponderee.
          </p>
        </Theorem>

        <KeyConcept title="Pourquoi diviser par sqrt(d_k) ?">
          <p>
            Quand <Sub sub="k">d</Sub> est grand (ex : 64 ou 128), les produits
            scalaires <F>QK<Sup sup="T">&#8203;</Sup></F> deviennent tres grands
            en valeur absolue. Le softmax sature alors dans des zones ou son
            gradient est quasi nul — le modele n&apos;apprend plus.
          </p>
          <p>
            Si les composantes de Q et K suivent une loi{" "}
            <F>N(0, 1)</F>, alors la variance de leur produit
            scalaire est <Sub sub="k">d</Sub>. Diviser par{" "}
            <F>&radic;<Sub sub="k">d</Sub></F> ramene la variance a 1 et
            stabilise les gradients.
          </p>
        </KeyConcept>

        <Remark>
          <p>
            La complexite est <F>O(<Sup sup="2">n</Sup> &middot; <Sub sub="k">d</Sub>)</F>{" "}
            en temps et <F>O(<Sup sup="2">n</Sup>)</F> en memoire (la matrice
            d&apos;attention est <F>n x n</F>). Pour une sequence de 8 192
            tokens, ca fait ~67 millions d&apos;elements dans la matrice
            d&apos;attention par tete, par couche. C&apos;est la raison pour
            laquelle Flash Attention et les approximations lineaires existent.
          </p>
        </Remark>

        <Code language="python — self-attention from scratch">{`import torch
import torch.nn.functional as F_torch

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Q, K, V : tenseurs de shape (batch, n_tokens, d_k)
    mask    : optionnel, (batch, n_tokens, n_tokens) — True = ignorer
    """
    d_k = Q.size(-1)
    # Scores d'attention : (batch, n, n)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)

    if mask is not None:
        scores = scores.masked_fill(mask, float('-inf'))

    # Normalisation par softmax sur la derniere dimension
    attn_weights = F_torch.softmax(scores, dim=-1)

    # Sortie ponderee : (batch, n, d_k)
    output = torch.matmul(attn_weights, V)
    return output, attn_weights

# Exemple : 2 phrases de 5 tokens, dimension 64
Q = torch.randn(2, 5, 64)
K = torch.randn(2, 5, 64)
V = torch.randn(2, 5, 64)
out, weights = scaled_dot_product_attention(Q, K, V)
print(f"Sortie: {out.shape}")       # → (2, 5, 64)
print(f"Poids:  {weights.shape}")   # → (2, 5, 5)`}</Code>

        <Diagram title="Mecanisme de Self-Attention">
          <pre>{`
  Input X (n x d_model)
       |
  +---------+---------+---------+
  |  x W_Q  |  x W_K  |  x W_V  |
  +---------+---------+---------+
       Q         K         V
       |         |         |
       +----+----+         |
            |              |
     QK^T / sqrt(d_k)     |
            |              |
        softmax            |
            |              |
            +------x-------+
                   |
             Sortie (n x d_k)
          `}</pre>
        </Diagram>
      </Section>

      {/* ============================================================ */}
      {/* 3. MULTI-HEAD ATTENTION                                      */}
      {/* ============================================================ */}
      <Section
        id="multi-head"
        number="03"
        title="Multi-Head Attention"
      >
        <p>
          Une seule tete d&apos;attention capture un seul type de relation entre
          tokens. Mais dans une phrase, il y a plusieurs relations simultanees :
          syntaxique, semantique, coreference, etc. D&apos;ou l&apos;idee
          d&apos;utiliser <strong>plusieurs tetes en parallele</strong>.
        </p>

        <Def title="Multi-Head Attention">
          <p>
            On lance <F>h</F> tetes d&apos;attention en parallele, chacune avec
            ses propres poids <Sub sub="Q,i">W</Sub>, <Sub sub="K,i">W</Sub>,{" "}
            <Sub sub="V,i">W</Sub>. Puis on concatene les sorties et on
            projette :
          </p>
          <Eq>
            <Sub sub="i">head</Sub> = Attention(X<Sub sub="Q,i">W</Sub>,
            X<Sub sub="K,i">W</Sub>, X<Sub sub="V,i">W</Sub>)
          </Eq>
          <Eq>
            MultiHead(Q, K, V) = Concat(<Sub sub="1">head</Sub>, ...,{" "}
            <Sub sub="h">head</Sub>) <Sub sub="O">W</Sub>
          </Eq>
          <p>
            Ou <Sub sub="O">W</Sub> est une matrice de projection de taille{" "}
            <F>h&middot;<Sub sub="k">d</Sub> x <Sub sub="model">d</Sub></F>.
          </p>
        </Def>

        <KeyConcept title="Pourquoi plusieurs tetes ?">
          <p>
            Chaque tete opere dans un <strong>sous-espace different</strong> de
            l&apos;espace d&apos;embedding. Une tete peut capturer les relations
            syntaxiques (sujet-verbe), une autre les coreferences (pronom →
            nom), une troisieme la semantique locale. La concatenation combine
            toutes ces &quot;perspectives&quot;.
          </p>
        </KeyConcept>

        <Remark>
          <p>
            <strong>Nombre de parametres.</strong> Pour une couche multi-head
            attention avec <F>h</F> tetes, <Sub sub="model">d</Sub> = 768, et{" "}
            <Sub sub="k">d</Sub> = <Sub sub="v">d</Sub> ={" "}
            <Frac n={<Sub sub="model">d</Sub>} d="h" /> = 64 (pour h = 12) :
          </p>
          <p>
            Parametres Q, K, V : 3 &times; <Sub sub="model">d</Sub> &times;{" "}
            <Sub sub="model">d</Sub> = 3 &times; 768 &times; 768 = 1 769 472.
            Projection de sortie : 768 &times; 768 = 589 824.{" "}
            <strong>Total : ~2.4M parametres</strong> par couche d&apos;attention.
          </p>
        </Remark>

        <Code language="python — multi-head attention">{`import torch
import torch.nn as nn

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, n_heads: int):
        super().__init__()
        assert d_model % n_heads == 0
        self.d_k = d_model // n_heads
        self.n_heads = n_heads

        # Projections Q, K, V + sortie
        self.W_q = nn.Linear(d_model, d_model, bias=False)
        self.W_k = nn.Linear(d_model, d_model, bias=False)
        self.W_v = nn.Linear(d_model, d_model, bias=False)
        self.W_o = nn.Linear(d_model, d_model, bias=False)

    def forward(self, x, mask=None):
        B, N, _ = x.shape

        # Projeter et reshaper en (B, n_heads, N, d_k)
        Q = self.W_q(x).view(B, N, self.n_heads, self.d_k).transpose(1, 2)
        K = self.W_k(x).view(B, N, self.n_heads, self.d_k).transpose(1, 2)
        V = self.W_v(x).view(B, N, self.n_heads, self.d_k).transpose(1, 2)

        # Scaled dot-product attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / (self.d_k ** 0.5)
        if mask is not None:
            scores = scores.masked_fill(mask, float('-inf'))
        attn = torch.softmax(scores, dim=-1)
        out = torch.matmul(attn, V)  # (B, n_heads, N, d_k)

        # Concat des tetes et projection finale
        out = out.transpose(1, 2).contiguous().view(B, N, -1)
        return self.W_o(out)

# Test
mha = MultiHeadAttention(d_model=512, n_heads=8)
x = torch.randn(4, 20, 512)  # batch=4, 20 tokens, dim=512
print(mha(x).shape)  # → (4, 20, 512)
print(f"Parametres: {sum(p.numel() for p in mha.parameters()):,}")  # → 1,048,576`}</Code>

        <Warning>
          <p>
            La dimension par tete <Sub sub="k">d</Sub> ={" "}
            <Frac n={<Sub sub="model">d</Sub>} d="h" />. Si on augmente le nombre de
            tetes sans augmenter <Sub sub="model">d</Sub>, chaque tete a moins
            de capacite. Il faut trouver l&apos;equilibre. GPT-3 utilise 96
            tetes pour <Sub sub="model">d</Sub> = 12 288, soit{" "}
            <Sub sub="k">d</Sub> = 128.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 4. POSITIONAL ENCODING                                       */}
      {/* ============================================================ */}
      <Section
        id="positional-encoding"
        number="04"
        title="Positional Encoding"
      >
        <p>
          L&apos;attention est{" "}
          <Term def="Propriete mathematique : si on permute l'ordre des tokens en entree, les poids d'attention ne changent pas (le resultat est permute de la meme facon).">
            permutation-invariante
          </Term>
          . Sans rien ajouter, le Transformer ne sait pas si &quot;le chat
          mange la souris&quot; ou &quot;la souris mange le chat&quot; — les
          memes mots produisent les memes poids d&apos;attention. Il faut
          injecter explicitement l&apos;information de position.
        </p>

        <Def title="Encodage sinusoidal (Vaswani et al.)">
          <p>
            Pour chaque position <F>pos</F> et chaque dimension <F>i</F> de
            l&apos;embedding :
          </p>
          <Eq>
            PE(pos, 2i) = sin(pos / <Sup sup={<>2i / <Sub sub="model">d</Sub></>}>10000</Sup>)
          </Eq>
          <Eq>
            PE(pos, 2i+1) = cos(pos / <Sup sup={<>2i / <Sub sub="model">d</Sub></>}>10000</Sup>)
          </Eq>
          <p>
            Chaque dimension oscille a une frequence differente. Les basses
            frequences (grands i) capturent les positions absolues, les hautes
            frequences les positions relatives locales.
          </p>
        </Def>

        <Analogy>
          <p>
            C&apos;est comme un systeme horaire. Les secondes changent vite
            (haute frequence), les minutes plus lentement, les heures encore
            plus. En combinant toutes ces &quot;aiguilles&quot;, on identifie
            chaque instant de facon unique.
          </p>
        </Analogy>

        <Remark>
          <p>
            <strong>Learned positional embeddings</strong> : BERT et GPT-2
            apprennent directement un vecteur par position (0, 1, ..., 511).
            Plus simple, mais ne generalise pas au-dela de la longueur
            d&apos;entrainement.
          </p>
        </Remark>

        <KeyConcept title="RoPE — Rotary Position Embedding">
          <p>
            Introduit par Su et al. (2021), RoPE est devenu le standard dans
            les modeles modernes (LLaMA, Mistral, Qwen). Au lieu d&apos;additionner
            un encodage au vecteur, RoPE <strong>tourne</strong> les paires de
            composantes de Q et K selon un angle proportionnel a la position.
          </p>
          <p>
            Le produit scalaire entre deux tokens a les positions <F>m</F> et{" "}
            <F>n</F> ne depend que de la difference <F>m - n</F>, ce qui encode
            naturellement les <strong>positions relatives</strong>. RoPE
            generalise mieux aux sequences longues et est compatible avec Flash
            Attention.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Methode", "Type", "Generalisation longueur", "Usage"]}
          rows={[
            ["Sinusoidal", "Fixe", "Oui (theorique)", "Transformer original (2017)"],
            ["Learned", "Appris", "Non (position max fixe)", "BERT, GPT-2"],
            ["RoPE", "Relatif, appris", "Oui (avec NTK-scaling)", "LLaMA, Mistral, Qwen (2023+)"],
            ["ALiBi", "Biais lineaire", "Oui", "BLOOM, MPT (2022)"],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 5. ARCHITECTURE ENCODER                                      */}
      {/* ============================================================ */}
      <Section
        id="encoder"
        number="05"
        title="Architecture Encoder"
      >
        <p>
          Un bloc encoder du Transformer empile plusieurs sous-couches avec des{" "}
          <Term def="Connexion qui additionne l'entree d'une sous-couche a sa sortie : output = f(x) + x. Permet au gradient de circuler directement a travers les couches.">
            residual connections
          </Term>{" "}
          et des normalisations. Le papier original empile 6 blocs identiques.
        </p>

        <Def title="Bloc Encoder">
          <p>Un bloc encoder contient deux sous-couches :</p>
          <p>
            <strong>1.</strong> Multi-Head Self-Attention
          </p>
          <p>
            <strong>2.</strong> Feed-Forward Network (FFN) — deux couches
            lineaires avec une activation non-lineaire :
          </p>
          <Eq>
            FFN(x) = max(0, x<Sub sub="1">W</Sub> + <Sub sub="1">b</Sub>)<Sub sub="2">W</Sub> + <Sub sub="2">b</Sub>
          </Eq>
          <p>
            Chaque sous-couche est enveloppee d&apos;une residual connection et
            d&apos;une Layer Normalization.
          </p>
        </Def>

        <Diagram title="Bloc Encoder (Post-Norm, original)">
          <pre>{`
      Input (n x d_model)
            |
    +-------+-------+
    |  Multi-Head    |
    |  Self-Attention|
    +-------+-------+
            |
        Add & Norm  ←── residual connection
            |
    +-------+-------+
    |   FFN          |
    | (d_model→4d→d) |
    +-------+-------+
            |
        Add & Norm  ←── residual connection
            |
      Output (n x d_model)
          `}</pre>
        </Diagram>

        <KeyConcept title="Pre-Norm vs Post-Norm">
          <p>
            Le Transformer original place la LayerNorm{" "}
            <strong>apres</strong> l&apos;addition residuelle (Post-Norm). Les
            modeles modernes (GPT-2+, LLaMA) utilisent le{" "}
            <strong>Pre-Norm</strong> : la normalisation est appliquee{" "}
            <em>avant</em> la sous-couche.
          </p>
          <p>
            Pre-Norm est plus stable a l&apos;entrainement (pas besoin de
            warmup) et permet d&apos;empiler plus de couches. La plupart des LLM
            actuels utilisent Pre-Norm avec RMSNorm au lieu de LayerNorm.
          </p>
        </KeyConcept>

        <Steps>
          <Step number="1" title="Embedding + Positional Encoding">
            Les tokens sont convertis en vecteurs et additionnes avec les
            encodages de position.
          </Step>
          <Step number="2" title="Multi-Head Self-Attention">
            Chaque token regarde tous les autres pour calculer sa nouvelle
            representation.
          </Step>
          <Step number="3" title="Add & Norm">
            Residual connection + normalisation pour stabiliser le signal.
          </Step>
          <Step number="4" title="Feed-Forward Network">
            Deux couches lineaires avec activation (ReLU ou GELU). Typiquement
            la dimension interne est 4&times; <Sub sub="model">d</Sub>.
          </Step>
          <Step number="5" title="Add & Norm (2eme)">
            Deuxieme residual connection + normalisation. La sortie a la meme
            shape que l&apos;entree : on peut empiler les blocs.
          </Step>
        </Steps>

        <Remark>
          <p>
            Le FFN est le composant le plus couteux en parametres. Pour{" "}
            <Sub sub="model">d</Sub> = 768 et <Sub sub="ff">d</Sub> = 3072 :
            2 &times; 768 &times; 3072 = 4.7M parametres, soit le double de
            l&apos;attention. Les modeles recents utilisent des variantes comme
            SwiGLU (LLaMA) qui remplace ReLU par un gating mechanism.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 6. ARCHITECTURE DECODER                                      */}
      {/* ============================================================ */}
      <Section
        id="decoder"
        number="06"
        title="Architecture Decoder"
      >
        <p>
          Le decoder est le coeur des modeles generatifs (GPT, Claude, LLaMA).
          Il differe de l&apos;encoder sur deux points : le{" "}
          <strong>masked self-attention</strong> et (dans le Transformer
          original) le <strong>cross-attention</strong>.
        </p>

        <Def title="Masked Self-Attention">
          <p>
            Dans le decoder, le token a la position <F>t</F> ne doit voir que
            les tokens aux positions 1, ..., <F>t</F> (pas le futur).
            On applique un masque triangulaire superieur a la matrice de
            scores avant le softmax :
          </p>
          <Eq>
            scores[i][j] = -&infin; si j &gt; i
          </Eq>
          <p>
            Apres softmax, ces positions recoivent un poids de 0. Le modele ne
            peut pas &quot;tricher&quot; en regardant les tokens futurs.
          </p>
        </Def>

        <Def title="Cross-Attention (Transformer original)">
          <p>
            Dans l&apos;architecture encoder-decoder (traduction, etc.), le
            decoder a une couche supplementaire de cross-attention ou :{" "}
          </p>
          <p>
            <strong>Q</strong> vient du decoder, <strong>K</strong> et{" "}
            <strong>V</strong> viennent de la sortie de l&apos;encoder. Cela
            permet au decoder de &quot;consulter&quot; la phrase source pendant
            la generation.
          </p>
        </Def>

        <Diagram title="Bloc Decoder (Transformer original)">
          <pre>{`
      Input decale (shifted right)
            |
    +----------------+
    |  Masked Multi-  |
    |  Head Attention  |
    +--------+--------+
             |
         Add & Norm
             |
    +--------+--------+       Sortie Encoder
    |  Cross-Attention |←─── (K, V viennent
    |  (Q: decoder,    |      de l'encoder)
    |   K,V: encoder)  |
    +--------+--------+
             |
         Add & Norm
             |
    +--------+--------+
    |      FFN         |
    +--------+--------+
             |
         Add & Norm
             |
        Output (n x d)
          `}</pre>
        </Diagram>

        <KeyConcept title="Generation autoregressive">
          <p>
            Le decoder genere du texte token par token. A chaque pas, il prend
            tous les tokens generes jusqu&apos;ici, fait un forward pass, et
            predit le prochain token. La distribution de sortie passe par une
            couche lineaire + softmax sur tout le vocabulaire (ex : 32 000
            tokens pour LLaMA 2). Le token choisi est ajoute a la sequence, et
            on recommence.
          </p>
        </KeyConcept>

        <Warning>
          <p>
            Les modeles <strong>decoder-only</strong> (GPT, LLaMA, Claude) n&apos;ont
            pas de cross-attention. Ils n&apos;ont que le masked self-attention
            + FFN. L&apos;architecture encoder-decoder est utilisee pour la
            traduction (T5, BART) et certains modeles multimodaux.
          </p>
        </Warning>

        <ComparisonTable
          headers={["Architecture", "Attention", "Usage principal", "Exemples"]}
          rows={[
            ["Encoder-only", "Bidirectionnelle", "Classification, NER, embeddings", "BERT, RoBERTa"],
            ["Decoder-only", "Causale (masquee)", "Generation de texte", "GPT, LLaMA, Claude"],
            ["Encoder-Decoder", "Bidirectionnelle + Causale + Cross", "Traduction, resume", "T5, BART, Whisper"],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 7. BERT                                                      */}
      {/* ============================================================ */}
      <Section id="bert" number="07" title="BERT">
        <p>
          <Term def="Bidirectional Encoder Representations from Transformers. Modele encoder-only entraine par Google en 2018. 110M (base) ou 340M (large) parametres.">
            BERT
          </Term>{" "}
          (Devlin et al., 2018) est le premier modele a montrer que le
          pre-entrainement d&apos;un Transformer suivi d&apos;un fine-tuning
          pouvait dominer toutes les taches NLP.
        </p>

        <Steps>
          <Step number="1" title="Pre-entrainement : Masked Language Modeling (MLM)">
            On masque aleatoirement 15% des tokens de l&apos;entree (remplaces
            par [MASK]) et le modele doit les predire. Contrairement a un
            modele autogressif, BERT voit le contexte des deux cotes — il est{" "}
            <strong>bidirectionnel</strong>.
          </Step>
          <Step number="2" title="Pre-entrainement : Next Sentence Prediction (NSP)">
            Le modele recoit deux phrases et doit predire si la deuxieme suit
            naturellement la premiere. Objectif abandonne dans les variantes
            (RoBERTa montre qu&apos;il n&apos;aide pas).
          </Step>
          <Step number="3" title="Fine-tuning">
            On ajoute une simple couche lineaire en sortie et on entraine sur la
            tache cible (classification, NER, QA) avec peu de donnees labelisees.
            Tous les poids du Transformer sont ajustes.
          </Step>
        </Steps>

        <KeyConcept title="Pourquoi BERT a revolutionne le NLP">
          <p>
            Avant BERT, chaque tache NLP avait son propre modele entraine from
            scratch. BERT a introduit le paradigme{" "}
            <strong>pre-train + fine-tune</strong> : un seul gros modele
            generique, ajuste pour chaque tache en quelques heures. Les scores
            sur 11 benchmarks NLP ont ete depasses d&apos;un coup.
          </p>
        </KeyConcept>

        <Remark>
          <p>
            BERT ne genere pas de texte — il ne produit que des representations.
            Pour la generation, il faut un decoder (GPT) ou un encoder-decoder
            (T5). BERT est toujours tres utilise en 2026 pour les embeddings de
            phrases, la classification et la recherche semantique.
          </p>
        </Remark>

        <Code language="python — fine-tuning BERT avec Hugging Face">{`from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import Trainer, TrainingArguments

# Charger BERT pre-entraine
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased", num_labels=2  # classification binaire
)

# Tokeniser les donnees
texts = ["Ce film est genial", "Ce film est nul"]
labels = [1, 0]
encodings = tokenizer(texts, padding=True, truncation=True, return_tensors="pt")

# Fine-tuning (simplifie — en vrai on utilise un Dataset)
args = TrainingArguments(output_dir="./results", num_train_epochs=3, lr=2e-5)
# trainer = Trainer(model=model, args=args, train_dataset=...)
# trainer.train()

print(f"Parametres BERT base: {sum(p.numel() for p in model.parameters()):,}")
# → ~109,483,778 (110M)`}</Code>
      </Section>

      {/* ============================================================ */}
      {/* 8. GPT                                                       */}
      {/* ============================================================ */}
      <Section id="gpt" number="08" title="GPT">
        <p>
          La famille{" "}
          <Term def="Generative Pre-trained Transformer. Architecture decoder-only entrainee par OpenAI. GPT-1 (2018) a GPT-4 (2023).">
            GPT
          </Term>{" "}
          prend le chemin inverse de BERT : au lieu de masquer des tokens et
          predire dans les deux directions, GPT predit le token suivant de
          gauche a droite (autoregressive). C&apos;est plus simple, et ca
          scale mieux.
        </p>

        <ComparisonTable
          headers={["Modele", "Annee", "Parametres", "Innovation cle"]}
          rows={[
            ["GPT-1", "2018", "117M", "Pre-training autoregressive + fine-tuning"],
            ["GPT-2", "2019", "1.5B", "Zero-shot generalization, pas de fine-tuning necessaire"],
            ["GPT-3", "2020", "175B", "Few-shot learning via prompting, emergence"],
            ["GPT-4", "2023", "~1.8T (MoE)", "Multimodal, raisonnement avance, RLHF"],
          ]}
        />

        <Def title="Scaling Laws (Chinchilla, 2022)">
          <p>
            Hoffmann et al. (DeepMind) montrent que pour un budget de calcul
            donne, le nombre optimal de tokens d&apos;entrainement et la taille
            du modele doivent croitre proportionnellement. Regle empirique :{" "}
          </p>
          <Eq>
            tokens optimaux &asymp; 20 &times; nombre de parametres
          </Eq>
          <p>
            GPT-3 (175B params, 300B tokens) etait sous-entraine selon cette
            regle. Chinchilla (70B params, 1.4T tokens) le bat avec 2.5&times;
            moins de parametres.
          </p>
        </Def>

        <KeyConcept title="RLHF — Reinforcement Learning from Human Feedback">
          <p>
            Etape cle pour passer de GPT-3 a ChatGPT. Le processus en trois
            phases :
          </p>
          <p>
            <strong>1. SFT</strong> — Supervised Fine-Tuning sur des dialogues
            ecrits par des humains.
          </p>
          <p>
            <strong>2. Reward Model</strong> — Entrainer un modele a predire
            quelle reponse un humain prefere (comparaisons par paires).
          </p>
          <p>
            <strong>3. PPO</strong> — Optimiser le LLM avec du reinforcement
            learning pour maximiser le score du reward model, tout en restant
            proche du modele SFT (penalite KL).
          </p>
        </KeyConcept>

        <Warning>
          <p>
            Les tailles de parametres ne sont pas directement comparables entre
            modeles. GPT-4 utilise un Mixture of Experts (MoE) : seule une
            fraction des parametres est activee pour chaque token. Un MoE de
            1.8T params avec 8 experts active ~220B params par token — comparable
            a un dense de 220B.
          </p>
        </Warning>

        <Remark>
          <p>
            La tendance 2024-2026 est de combiner RLHF avec des techniques comme
            DPO (Direct Preference Optimization) qui simplifie l&apos;etape RL,
            et GRPO (Group Relative Policy Optimization, DeepSeek) qui n&apos;a
            pas besoin de reward model. Claude utilise RLHF + Constitutional AI
            (RLAIF).
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 9. VISION TRANSFORMERS                                       */}
      {/* ============================================================ */}
      <Section
        id="vision-transformers"
        number="09"
        title="Vision Transformers"
      >
        <p>
          En 2020, Dosovitskiy et al. (Google Brain) montrent que le Transformer
          n&apos;est pas reserve au texte. Le{" "}
          <Term def="Vision Transformer : applique l'architecture Transformer a des images en les decoupant en patches.">
            ViT
          </Term>{" "}
          decoupe une image en patches, les traite comme des tokens, et obtient
          des resultats comparables aux meilleurs CNN.
        </p>

        <Steps>
          <Step number="1" title="Decoupage en patches">
            Une image 224&times;224 est decoupee en patches de 16&times;16 pixels.
            Ca donne 196 patches (= 196 &quot;tokens&quot;). Chaque patch est
            aplati en un vecteur de 16&times;16&times;3 = 768 dimensions.
          </Step>
          <Step number="2" title="Projection lineaire + token [CLS]">
            Chaque patch est projete lineairement dans l&apos;espace
            d&apos;embedding. Un token special [CLS] est ajoute au debut pour
            la classification. Des positional embeddings (appris) sont
            additionnes.
          </Step>
          <Step number="3" title="Transformer Encoder">
            Les 197 tokens passent dans un Transformer Encoder standard (12
            couches pour ViT-Base). Pas de decoder, pas de masking causal.
          </Step>
          <Step number="4" title="Classification">
            La representation du token [CLS] en sortie est passee dans une
            couche lineaire pour predire la classe.
          </Step>
        </Steps>

        <Diagram title="Architecture ViT">
          <pre>{`
  Image (224 x 224 x 3)
         |
  Decoupage en patches 16x16
         |
  [CLS] + 196 patch embeddings + position embeddings
         |
  Transformer Encoder (12 couches)
         |
  Token [CLS] → MLP Head → Classe
          `}</pre>
        </Diagram>

        <KeyConcept title="ViT a besoin de beaucoup de donnees">
          <p>
            Contrairement aux CNN qui ont un biais inductif spatial (convolutions
            locales), le Transformer n&apos;a aucun a priori sur la structure
            2D d&apos;une image. Il doit apprendre la structure spatiale a
            partir des donnees. ViT ne surpasse les CNN que quand il est
            entraine sur de tres grands datasets (JFT-300M, ImageNet-21k).
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Modele", "Annee", "Innovation", "Particularite"]}
          rows={[
            ["ViT", "2020", "Patches = tokens", "Besoin de beaucoup de donnees"],
            ["DeiT", "2021", "Distillation + data augmentation", "Marche bien sur ImageNet seul"],
            ["Swin", "2021", "Shifted windows (attention locale→globale)", "Hierarchique, comme un CNN"],
            ["DINO v2", "2023", "Self-supervised ViT", "Embeddings visuels universels"],
          ]}
        />

        <Remark>
          <p>
            Les modeles multimodaux modernes (GPT-4V, Claude 3, Gemini)
            utilisent un ViT comme encodeur visuel. L&apos;image est encodee
            par le ViT, les embeddings sont projetes dans l&apos;espace du LLM
            via un adapteur lineaire, et le decoder traite tout (texte + vision)
            dans la meme sequence.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 10. IMPLEMENTER UN TRANSFORMER FROM SCRATCH                  */}
      {/* ============================================================ */}
      <Section
        id="implementation"
        number="10"
        title="Implementer un Transformer from scratch"
      >
        <p>
          Voici un Transformer Encoder complet en PyTorch. Chaque composant
          correspond aux sections precedentes. Le code est volontairement
          compact (~60 lignes) mais fonctionnel.
        </p>

        <Code language="python — transformer encoder from scratch">{`import torch
import torch.nn as nn
import math

class SelfAttention(nn.Module):
    """Scaled dot-product self-attention avec plusieurs tetes."""
    def __init__(self, d_model: int, n_heads: int):
        super().__init__()
        self.n_heads = n_heads
        self.d_k = d_model // n_heads
        self.qkv = nn.Linear(d_model, 3 * d_model, bias=False)
        self.proj = nn.Linear(d_model, d_model, bias=False)

    def forward(self, x):
        B, N, D = x.shape
        qkv = self.qkv(x).reshape(B, N, 3, self.n_heads, self.d_k)
        qkv = qkv.permute(2, 0, 3, 1, 4)         # (3, B, H, N, d_k)
        Q, K, V = qkv[0], qkv[1], qkv[2]

        scores = (Q @ K.transpose(-2, -1)) / math.sqrt(self.d_k)
        attn = scores.softmax(dim=-1)
        out = (attn @ V).transpose(1, 2).reshape(B, N, D)
        return self.proj(out)

class FeedForward(nn.Module):
    """FFN : linear → GELU → linear."""
    def __init__(self, d_model: int, d_ff: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),
            nn.Linear(d_ff, d_model),
        )
    def forward(self, x):
        return self.net(x)

class EncoderBlock(nn.Module):
    """Un bloc encoder Pre-Norm : LN → Attention → residual, LN → FFN → residual."""
    def __init__(self, d_model: int, n_heads: int, d_ff: int):
        super().__init__()
        self.ln1 = nn.LayerNorm(d_model)
        self.attn = SelfAttention(d_model, n_heads)
        self.ln2 = nn.LayerNorm(d_model)
        self.ffn = FeedForward(d_model, d_ff)

    def forward(self, x):
        x = x + self.attn(self.ln1(x))   # residual + pre-norm attention
        x = x + self.ffn(self.ln2(x))    # residual + pre-norm FFN
        return x

class TransformerEncoder(nn.Module):
    """Transformer Encoder complet : embedding + position + N blocs."""
    def __init__(self, vocab_size, d_model, n_heads, d_ff, n_layers, max_len=512):
        super().__init__()
        self.tok_emb = nn.Embedding(vocab_size, d_model)
        self.pos_emb = nn.Embedding(max_len, d_model)
        self.blocks = nn.ModuleList([
            EncoderBlock(d_model, n_heads, d_ff) for _ in range(n_layers)
        ])
        self.ln_final = nn.LayerNorm(d_model)

    def forward(self, token_ids):
        B, N = token_ids.shape
        positions = torch.arange(N, device=token_ids.device).unsqueeze(0)
        x = self.tok_emb(token_ids) + self.pos_emb(positions)
        for block in self.blocks:
            x = block(x)
        return self.ln_final(x)

# --- Test ---
model = TransformerEncoder(
    vocab_size=32_000, d_model=512, n_heads=8, d_ff=2048, n_layers=6
)
ids = torch.randint(0, 32_000, (2, 128))  # batch=2, seq_len=128
out = model(ids)
print(f"Sortie: {out.shape}")  # → (2, 128, 512)
n_params = sum(p.numel() for p in model.parameters())
print(f"Parametres: {n_params:,}")  # → ~25M`}</Code>

        <Warning>
          <p>
            Ce code est pedagogique. En production, on utilise{" "}
            <strong>Flash Attention</strong> (kernel CUDA fusionne),{" "}
            <strong>RoPE</strong> au lieu de positional embeddings appris,{" "}
            <strong>SwiGLU</strong> au lieu de GELU, et{" "}
            <strong>RMSNorm</strong> au lieu de LayerNorm. Mais la structure
            reste identique.
          </p>
        </Warning>

        <p>
          Et pour utiliser un modele pre-entraine en quelques lignes avec
          Hugging Face :
        </p>

        <Code language="python — generation avec GPT-2">{`from transformers import pipeline

# Charger GPT-2 (117M params) en une ligne
generator = pipeline("text-generation", model="gpt2")

# Generer du texte
outputs = generator(
    "Les Transformers sont",
    max_new_tokens=50,
    temperature=0.8,
    top_p=0.95,
    do_sample=True,
)
print(outputs[0]["generated_text"])

# Pour un modele plus gros (Mistral 7B, necessite un GPU)
# generator = pipeline("text-generation", model="mistralai/Mistral-7B-v0.1")
# outputs = generator("Les Transformers sont", max_new_tokens=100)`}</Code>

        <Remark>
          <p>
            Exercice recommande : modifier le code from scratch pour ajouter un
            masque causal (decoder) et une tete de classification (prediction du
            prochain token). Il suffit d&apos;ajouter ~10 lignes — le masque
            triangulaire dans SelfAttention et un <F>nn.Linear</F> final vers le
            vocabulaire.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 11. QUIZ FINAL                                               */}
      {/* ============================================================ */}
      <Section id="quiz-final" number="11" title="Quiz final">
        <p>
          Verifie que tu maitrises les concepts fondamentaux de
          l&apos;architecture Transformer.
        </p>

        <Quiz
          question="Pourquoi divise-t-on les scores d'attention par sqrt(d_k) ?"
          options={[
            "Pour reduire le nombre de parametres du modele",
            "Pour que le softmax ne sature pas quand d_k est grand (stabiliser les gradients)",
            "Pour normaliser la longueur des vecteurs Q et K",
            "Pour que l'attention soit permutation-invariante",
          ]}
          answer={1}
          explanation="Quand d_k est grand, les produits scalaires QK^T ont une variance proportionnelle a d_k. Sans normalisation, le softmax sature dans des zones a gradient quasi nul, ce qui bloque l'apprentissage."
        />

        <Quiz
          question="Quelle est la complexite en temps du mecanisme de self-attention par rapport a la longueur de sequence n ?"
          options={[
            "O(n) — lineaire",
            "O(n log n) — quasi-lineaire",
            "O(n^2 * d_k) — quadratique en n",
            "O(n^3) — cubique",
          ]}
          answer={2}
          explanation="Le produit QK^T est une multiplication de matrices (n x d_k) par (d_k x n), ce qui coute O(n^2 * d_k). C'est quadratique en n, ce qui limite les Transformers sur les tres longues sequences."
        />

        <Quiz
          question="Quelle est la difference principale entre BERT et GPT ?"
          options={[
            "BERT est plus gros que GPT",
            "BERT est encoder-only (bidirectionnel), GPT est decoder-only (autoregressive)",
            "GPT utilise des CNN et BERT des Transformers",
            "BERT genere du texte et GPT fait de la classification",
          ]}
          answer={1}
          explanation="BERT voit le contexte dans les deux directions (masked language modeling). GPT ne voit que le contexte passe (prediction du prochain token). BERT excelle en comprehension, GPT en generation."
        />

        <Quiz
          question="Comment le Vision Transformer (ViT) traite-t-il une image ?"
          options={[
            "Il applique des convolutions puis un Transformer",
            "Il traite chaque pixel comme un token",
            "Il decoupe l'image en patches, les projette lineairement, et les traite comme des tokens",
            "Il convertit l'image en texte puis utilise un LLM standard",
          ]}
          answer={2}
          explanation="ViT decoupe l'image en patches (ex : 16x16 pixels), projette chaque patch en un vecteur d'embedding, ajoute des positional embeddings, et fait passer le tout dans un Transformer Encoder standard."
        />

        <Quiz
          question="Que fait RoPE (Rotary Position Embedding) ?"
          options={[
            "Il ajoute un vecteur de position a l'embedding comme dans le Transformer original",
            "Il applique une rotation aux vecteurs Q et K selon la position, encodant les positions relatives",
            "Il apprend un embedding separee pour chaque position possible",
            "Il supprime le besoin d'encodage positionnel en utilisant des convolutions causales",
          ]}
          answer={1}
          explanation="RoPE tourne les paires de dimensions de Q et K d'un angle proportionnel a la position. Le produit scalaire entre deux tokens depend alors uniquement de leur distance relative, ce qui generalise mieux aux sequences longues."
        />
      </Section>
    </>
  );
}
