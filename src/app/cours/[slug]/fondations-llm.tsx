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

export function FondationsLLM() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. POURQUOI CE MODULE                                        */}
      {/* ============================================================ */}
      <Section id="pourquoi" number="01" title="Pourquoi ce module ?">
        <p>
          Avant de construire un chatbot, un agent vocal, ou un pipeline RAG, il
          faut comprendre la machine qui est au coeur de tout :{" "}
          <strong>le Large Language Model</strong>.
        </p>
        <p>
          Un LLM n&apos;est pas magique. C&apos;est un programme mathematique
          qui prend du texte en entree, calcule des probabilites, et produit du
          texte en sortie. Tout le reste — agents, RAG, tool calling — n&apos;est
          que de la plomberie autour de ce mecanisme.
        </p>

        <Analogy>
          <p>
            Imagine un musicien de jazz. Il ne sait pas ce qu&apos;il va jouer a
            l&apos;avance, mais a chaque note, il &quot;predit&quot; la
            prochaine en se basant sur toutes les notes qu&apos;il a entendues
            dans sa vie. Un LLM fait exactement ca, mais avec des mots.
          </p>
        </Analogy>

        <p>
          A la fin de ce module, tu sauras expliquer a n&apos;importe qui
          comment un LLM fonctionne, ce qu&apos;est un token, ce que fait
          l&apos;attention, et pourquoi la temperature change le comportement du
          modele. C&apos;est le socle.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 2. TOKENS                                                    */}
      {/* ============================================================ */}
      <Section id="tokens" number="02" title="Les tokens — l'alphabet des LLMs">
        <p>
          Un LLM ne lit pas des lettres ni des mots entiers. Il lit des{" "}
          <Term def="Unite de texte que le modele traite. Un token peut etre un mot, un bout de mot, ou un caractere de ponctuation. En moyenne, 1 token = 0.75 mot en anglais, un peu moins en francais.">
            tokens
          </Term>
          . C&apos;est la premiere chose a comprendre.
        </p>

        <KeyConcept title="Qu'est-ce qu'un token ?">
          <p>
            Un token est un morceau de texte que le modele traite comme une
            unite. Le processus qui decoupe le texte en tokens s&apos;appelle la{" "}
            <strong>tokenization</strong>.
          </p>
        </KeyConcept>

        <p>Prenons un exemple concret. La phrase :</p>

        <Code language="texte">{`"Bonjour, je cherche un contrat d'electricite"`}</Code>

        <p>
          Pourrait etre decoupee en tokens comme ca (ca depend du tokenizer) :
        </p>

        <Code language="tokens">{`["Bon", "jour", ",", " je", " cherche", " un", " contrat", " d", "'", "elect", "ric", "ite"]`}</Code>

        <p>
          Remarque : certains mots sont coupes en morceaux
          (&quot;electricite&quot; → 3 tokens). C&apos;est parce que le tokenizer
          a appris que &quot;elect&quot;, &quot;ric&quot; et &quot;ite&quot; sont
          des sous-unites frequentes.
        </p>

        <Code language="python — tokenizer en pratique">{`import tiktoken  # tokenizer d'OpenAI (pip install tiktoken)

enc = tiktoken.encoding_for_model("gpt-4o")
tokens = enc.encode("Bonjour, je cherche un contrat d'electricite")
print(f"{len(tokens)} tokens")  # → 12 tokens
print([enc.decode_single_token_bytes(t) for t in tokens])

# Avec Hugging Face Transformers (PyTorch)
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1")
result = tokenizer("Bonjour, je cherche un contrat d'electricite")
print(result["input_ids"])        # → [1, 9038, 28725, ...]
print(len(result["input_ids"]))   # → 13 tokens (different ! chaque modele a son tokenizer)`}</Code>

        <Warning>
          <p>
            <strong>Pourquoi c&apos;est important en pratique ?</strong> Parce
            que tu payes a l&apos;API au nombre de tokens, pas au nombre de
            mots. Et le context window (la &quot;memoire&quot; du modele) est
            mesure en tokens aussi. Un texte en francais consomme ~30% plus de
            tokens que le meme texte en anglais.
          </p>
        </Warning>

        <ComparisonTable
          headers={["Concept", "Exemple", "Impact pratique"]}
          rows={[
            ["1 token", '"hello"', "Les mots courants = 1 token"],
            ["Multi-token", '"electricite" → 3 tokens', "Les mots longs ou rares coutent plus"],
            ["Token special", '"<|endoftext|>"', "Signale la fin d'une sequence au modele"],
            ["~100 tokens", "~75 mots en anglais", "Regle rapide pour estimer les couts"],
          ]}
        />

        <Quiz
          question="La phrase 'Bonjour le monde' contient combien de tokens approximativement ?"
          options={[
            "3 tokens (un par mot)",
            "3-5 tokens (depend du tokenizer)",
            "15 tokens (un par lettre)",
            "1 token (c'est une phrase courte)",
          ]}
          answer={1}
          explanation="La plupart des tokenizers modernes decoupent cette phrase en 3 a 5 tokens. 'Bonjour' peut etre 1 ou 2 tokens selon le modele, et les espaces sont souvent attaches au mot suivant."
        />
      </Section>

      {/* ============================================================ */}
      {/* 3. EMBEDDINGS                                                */}
      {/* ============================================================ */}
      <Section
        id="embeddings"
        number="03"
        title="Les embeddings — donner du sens aux mots"
      >
        <p>
          OK, le modele a decoupes le texte en tokens. Mais un ordi ne comprend
          pas les mots — il comprend les nombres. Comment on passe de
          &quot;chat&quot; a quelque chose qu&apos;un ordinateur peut
          manipuler ?
        </p>

        <KeyConcept title="L'embedding">
          <p>
            Chaque token est converti en un <strong>vecteur</strong> — une liste
            de nombres (par exemple 768 ou 4096 nombres). Ce vecteur capture le{" "}
            <em>sens</em> du token. Des mots similaires ont des vecteurs
            proches.
          </p>
        </KeyConcept>

        <Analogy>
          <p>
            Imagine une carte du monde, mais pour les mots. &quot;Paris&quot; et
            &quot;Lyon&quot; seraient proches (deux villes francaises).
            &quot;Paris&quot; et &quot;banane&quot; seraient loin. Un embedding,
            c&apos;est la position GPS d&apos;un mot sur cette carte — sauf que
            la carte a 768 dimensions au lieu de 2.
          </p>
        </Analogy>

        <p>Voici a quoi ca ressemble en simplifie :</p>

        <Code language="python — embeddings avec PyTorch">{`import torch
from transformers import AutoTokenizer, AutoModel

# Charger un modele d'embeddings (sentence-transformers)
tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

# Embedder des mots
phrases = ["roi", "reine", "banane"]
inputs = tokenizer(phrases, padding=True, return_tensors="pt")

with torch.no_grad():
    outputs = model(**inputs)
    # Mean pooling sur les tokens → un vecteur par phrase
    embeddings = outputs.last_hidden_state.mean(dim=1)

print(embeddings.shape)  # → torch.Size([3, 384])  (3 phrases, 384 dimensions)

# Similarite cosinus
from torch.nn.functional import cosine_similarity
print(cosine_similarity(embeddings[0], embeddings[1], dim=0))  # roi↔reine  → 0.72 (proche !)
print(cosine_similarity(embeddings[0], embeddings[2], dim=0))  # roi↔banane → 0.11 (loin)`}</Code>

        <KeyConcept title="Comment le modele apprend les embeddings">
          <p>
            Les embeddings ne sont pas codes a la main. Ils sont <strong>appris
            pendant l&apos;entrainement</strong>. Le modele commence avec des
            vecteurs aleatoires et les ajuste par backpropagation pour que les
            mots qui apparaissent dans des contextes similaires aient des
            vecteurs proches. C&apos;est l&apos;hypothese distributionnelle :
            &quot;dis-moi avec qui tu traines, je te dirai qui tu es&quot;.
          </p>
        </KeyConcept>

        <p>
          Concretement, un embedding est une <strong>lookup table</strong> —
          une matrice de taille (vocabulaire x dimensions) :
        </p>

        <Code language="python — la matrice d'embedding">{`import torch
import torch.nn as nn

# Vocabulaire de 50 000 tokens, embeddings de 768 dimensions
embedding_layer = nn.Embedding(num_embeddings=50000, embedding_dim=768)

# Chaque token a un ID → l'embedding est juste la ligne correspondante
token_ids = torch.tensor([42, 1337, 7])  # 3 tokens
vectors = embedding_layer(token_ids)
print(vectors.shape)  # → torch.Size([3, 768])

# C'est literalement : matrice[42], matrice[1337], matrice[7]
# Pas de calcul — juste un lookup dans une table
# Les valeurs sont apprises pendant l'entrainement par gradient descent`}</Code>

        <KeyConcept title="Mesurer la similarite entre embeddings">
          <p>
            La question centrale : si j&apos;ai deux vecteurs, comment savoir
            s&apos;ils sont &quot;proches&quot; ? Il y a 3 metriques classiques.
          </p>
        </KeyConcept>

        <Code language="python — 3 metriques de similarite">{`import numpy as np

# Deux vecteurs (en vrai, 768 dimensions — ici on simplifie a 4)
a = np.array([0.8, 0.2, -0.1, 0.5])   # "roi"
b = np.array([0.7, 0.3, -0.2, 0.6])   # "reine"
c = np.array([-0.5, 0.9, 0.7, -0.3])  # "banane"

# ── 1. SIMILARITE COSINUS ──
# Mesure l'angle entre les vecteurs (ignore la magnitude)
# cos(θ) = (a · b) / (||a|| × ||b||)
def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print(f"cos(roi, reine)  = {cosine_sim(a, b):.3f}")   # → 0.964 (tres proche)
print(f"cos(roi, banane) = {cosine_sim(a, c):.3f}")   # → -0.327 (loin)
# Plage : [-1, 1]. 1 = identique, 0 = orthogonal, -1 = oppose

# ── 2. DISTANCE EUCLIDIENNE (L2) ──
# Distance geometrique classique
# d = sqrt(Σ (ai - bi)²)
def l2_dist(a, b):
    return np.linalg.norm(a - b)

print(f"L2(roi, reine)  = {l2_dist(a, b):.3f}")   # → 0.245 (petit = proche)
print(f"L2(roi, banane) = {l2_dist(a, c):.3f}")   # → 1.720 (grand = loin)

# ── 3. PRODUIT SCALAIRE (DOT PRODUCT) ──
# Simple mais ne normalise pas la magnitude
# d = Σ (ai × bi)
print(f"dot(roi, reine)  = {np.dot(a, b):.3f}")   # → 0.92
print(f"dot(roi, banane) = {np.dot(a, c):.3f}")   # → -0.31`}</Code>

        <ComparisonTable
          headers={["Metrique", "Formule", "Plage", "Quand l'utiliser"]}
          rows={[
            ["Similarite cosinus", "cos(θ) = a·b / (||a|| × ||b||)", "[-1, 1]", "Le plus courant en NLP — insensible a la longueur du vecteur"],
            ["Distance L2", "√Σ(ai - bi)²", "[0, +∞]", "Quand la magnitude compte (kNN, clustering)"],
            ["Produit scalaire", "Σ(ai × bi)", "[-∞, +∞]", "Rapide a calculer, utilise en interne par les transformers (attention)"],
          ]}
        />

        <p>
          La propriete magique des embeddings, c&apos;est qu&apos;on peut faire
          de l&apos;arithmetique dessus :
        </p>

        <Code language="python — arithmetique vectorielle">{`# L'exemple classique de Word2Vec :
# vec("roi") - vec("homme") + vec("femme") ≈ vec("reine")

# En pratique avec gensim :
# from gensim.models import KeyedVectors
# model = KeyedVectors.load_word2vec_format('GoogleNews-vectors.bin', binary=True)
# result = model.most_similar(positive=['roi', 'femme'], negative=['homme'])
# → [('reine', 0.85), ...]

# Pourquoi ca marche ? Parce que l'espace vectoriel a encode
# une "direction" pour le genre :
#   vec("homme") → vec("femme")  est le meme decalage que
#   vec("roi")   → vec("reine")
# Le modele a appris cette structure implicitement en lisant des textes`}</Code>

        <Warning>
          <p>
            <strong>Lien avec RAG (Module 3) :</strong> les embeddings sont la
            base du RAG. Quand tu chercheras des documents &quot;similaires&quot;
            a une question, tu compareras des embeddings avec la similarite
            cosinus. C&apos;est exactement le meme calcul que ci-dessus, mais
            sur des phrases entieres au lieu de mots isoles.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 4. ATTENTION                                                 */}
      {/* ============================================================ */}
      <Section
        id="attention"
        number="04"
        title="L'attention — le coeur du Transformer"
      >
        <p>
          C&apos;est LE concept qui a revolutionne le NLP en 2017 avec le papier
          &quot;Attention Is All You Need&quot;. Avant l&apos;attention, les
          modeles lisaient le texte mot par mot, de gauche a droite (RNN). Le
          probleme : pour des phrases longues, le modele &quot;oubliait&quot; le
          debut.
        </p>

        <KeyConcept title="Le mecanisme d'attention">
          <p>
            L&apos;attention permet a chaque token de &quot;regarder&quot; tous
            les autres tokens de la sequence et de decider lesquels sont
            importants pour lui. C&apos;est un systeme de ponderation dynamique.
          </p>
        </KeyConcept>

        <p>Prenons une phrase :</p>

        <Code language="exemple">{`"Le chat dort sur le canape car il est fatigue"`}</Code>

        <p>
          Quand le modele traite le mot &quot;il&quot;, l&apos;attention lui
          permet de &quot;regarder en arriere&quot; et de comprendre que
          &quot;il&quot; se refere a &quot;chat&quot;, pas a &quot;canape&quot;.
          Il attribue un poids eleve a &quot;chat&quot; et un poids faible a
          &quot;canape&quot;.
        </p>

        <Diagram title="Mecanisme d'attention simplifie">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3 text-zinc-500">
              <span>Le</span>
              <span className="text-emerald-400 font-bold">chat</span>
              <span>dort</span>
              <span>sur</span>
              <span>le</span>
              <span>canape</span>
              <span>car</span>
              <span className="text-amber-400 font-bold">il</span>
              <span>est</span>
              <span>fatigue</span>
            </div>
            <div className="text-zinc-600">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&nbsp;forte attention&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&uarr; regard
            </div>
            <p className="text-xs text-zinc-500">
              &quot;il&quot; donne un poids fort a &quot;chat&quot; (0.72) et faible a &quot;canape&quot; (0.03)
            </p>
          </div>
        </Diagram>

        <p>
          En pratique, le Transformer utilise du <strong>multi-head attention</strong> :
          plusieurs &quot;tetes&quot; d&apos;attention en parallele, chacune
          specialisee dans un type de relation (syntaxe, semantique, coreference...).
        </p>

        <p>Le calcul mathematique (simplifie) :</p>

        <Code language="mathematiques">{`Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V

Q = Query   → "Qu'est-ce que je cherche ?" (le token actuel)
K = Key     → "Qu'est-ce que je contiens ?" (chaque autre token)
V = Value   → "Quelle information je donne ?" (le contenu a transmettre)

Le softmax normalise les poids pour qu'ils somment a 1.
sqrt(d_k) empeche les valeurs de devenir trop grandes.`}</Code>

        <Code language="python — attention avec NumPy">{`import numpy as np

def attention(Q, K, V):
    """Self-attention en 4 lignes de NumPy."""
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)    # similarite entre Q et K
    weights = np.exp(scores) / np.exp(scores).sum(axis=-1, keepdims=True)  # softmax
    return weights @ V                   # moyenne ponderee des valeurs

# Exemple : 4 tokens, dimension 8
np.random.seed(42)
Q = np.random.randn(4, 8)  # 4 tokens, chacun un vecteur de dim 8
K = np.random.randn(4, 8)
V = np.random.randn(4, 8)

output = attention(Q, K, V)
print(output.shape)  # → (4, 8)  — chaque token recoit un vecteur "enrichi"

# En PyTorch, c'est une seule ligne :
import torch
import torch.nn.functional as F
attn_output = F.scaled_dot_product_attention(
    torch.randn(4, 8), torch.randn(4, 8), torch.randn(4, 8)
)  # PyTorch gere le scaling et le softmax pour toi`}</Code>

        <Analogy>
          <p>
            Imagine une salle de classe. L&apos;attention, c&apos;est comme si
            chaque eleve (Q) pouvait poser une question silencieuse, et chaque
            autre eleve (K) repondait avec un signal d&apos;intensite variable.
            L&apos;eleve recoit l&apos;info (V) proportionnellement a
            l&apos;intensite de chaque signal.
          </p>
        </Analogy>

        <Quiz
          question="Pourquoi le mecanisme d'attention est-il superieur aux RNN pour les longues sequences ?"
          options={[
            "Il est plus rapide a entrainer",
            "Chaque token peut 'voir' tous les autres directement, sans perte d'information sur la distance",
            "Il utilise moins de memoire",
            "Il ne necessite pas de GPU",
          ]}
          answer={1}
          explanation="Le probleme des RNN etait le 'vanishing gradient' : plus un token etait loin, plus son influence diminuait. L'attention resout ca en permettant des connexions directes entre tous les tokens, quelle que soit la distance."
        />
      </Section>

      {/* ============================================================ */}
      {/* 5. ARCHITECTURE                                              */}
      {/* ============================================================ */}
      <Section
        id="architecture"
        number="05"
        title="Architecture complete d'un Transformer"
      >
        <p>
          Maintenant qu&apos;on a les briques (tokens, embeddings, attention),
          assemblons le puzzle complet.
        </p>

        <Steps>
          <Step number="1" title="Tokenization">
            <p>Le texte brut est decoupe en tokens numeriques.</p>
          </Step>
          <Step number="2" title="Embedding + Positional Encoding">
            <p>
              Chaque token recoit un vecteur (embedding) + une information de
              position. Sans la position, le modele ne saurait pas l&apos;ordre
              des mots.
            </p>
          </Step>
          <Step number="3" title="N couches de Transformer">
            <p>
              Chaque couche contient : multi-head attention → normalisation →
              feed-forward network → normalisation. Les gros modeles (GPT-4,
              Claude) ont des dizaines voire des centaines de couches — les
              chiffres exacts ne sont pas publies. Chaque couche raffine la
              comprehension.
            </p>
          </Step>
          <Step number="4" title="Couche de sortie (logits)">
            <p>
              Le dernier vecteur est projete sur le vocabulaire entier (~100k tokens).
              Chaque token recoit un score (logit). Plus le score est haut, plus
              le modele pense que ce token est la bonne suite.
            </p>
          </Step>
          <Step number="5" title="Sampling">
            <p>
              Les logits sont convertis en probabilites (softmax), puis un token
              est choisi selon une strategie (greedy, top-k, top-p...). Ce token
              est ajoute a la sequence, et on recommence a l&apos;etape 1.
            </p>
          </Step>
        </Steps>

        <Diagram title="Pipeline simplifie d'un LLM">
          <pre className="text-center">{`
  "Bonjour, je"
       |
  [ Tokenizer ]
       |
  [82, 4521, 29]
       |
  [ Embedding + Position ]
       |
  [ 0.21, -0.3, ... ] x 3 tokens
       |
  ┌──────────────────────┐
  │  Transformer Layer 1 │ ← attention + feed-forward
  │  Transformer Layer 2 │
  │        ...           │
  │  Transformer Layer N │
  └──────────────────────┘
       |
  [ Projection → vocabulaire ]
       |
  "cherche" (probabilite: 0.12)
  "veux"    (probabilite: 0.08)
  "suis"    (probabilite: 0.07)
       |
  [ Sampling ] → "cherche"
       |
  Output: "Bonjour, je cherche"
  → on recommence avec cette nouvelle sequence
`}</pre>
        </Diagram>

        <KeyConcept title="Autoregressive generation">
          <p>
            Le modele genere UN SEUL token a la fois, puis le rajoute a
            l&apos;entree pour generer le suivant. C&apos;est pour ca que les
            reponses arrivent mot par mot quand tu utilises le streaming. Et
            c&apos;est pour ca que la generation est lente : chaque token
            necessite un passage complet dans le reseau.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 6. ENTRAINEMENT                                              */}
      {/* ============================================================ */}
      <Section
        id="entrainement"
        number="06"
        title="Comment on entraine un LLM — le pipeline en 3 etapes"
      >
        <p>
          On a vu l&apos;architecture du Transformer. Mais comment on passe d&apos;un
          reseau de neurones avec des poids aleatoires a un modele qui parle
          francais, suit des instructions, et refuse de t&apos;aider a fabriquer
          une bombe ? C&apos;est un pipeline en <strong>3 etapes</strong> :
        </p>

        <Diagram title="Pipeline d'entrainement d'un LLM moderne">
          <pre className="text-center">{`
  ┌─────────────────────────────────────────────────┐
  │  ETAPE 1 : PRE-TRAINING                         │
  │  "Apprendre le langage"                         │
  │                                                  │
  │  Donnees : des teraoctets de texte (internet,   │
  │  livres, Wikipedia, code, forums...)             │
  │  Objectif : predire le prochain token            │
  │  Duree : semaines/mois sur des milliers de GPU   │
  │  Cout : $10M - $100M+                           │
  │                                                  │
  │  Resultat : un modele "de base" qui sait         │
  │  completer du texte, mais ne sait pas dialoguer  │
  └──────────────────────┬──────────────────────────┘
                         │
  ┌──────────────────────▼──────────────────────────┐
  │  ETAPE 2 : SFT (Supervised Fine-Tuning)         │
  │  "Apprendre a suivre des instructions"           │
  │                                                  │
  │  Donnees : ~100k paires (instruction, reponse)   │
  │  ecrites ou verifiees par des humains            │
  │  Objectif : le modele apprend le format          │
  │  question → reponse utile                        │
  │  Duree : heures/jours                            │
  │                                                  │
  │  Resultat : un modele qui comprend "aide-moi"    │
  │  et repond de facon structuree                   │
  └──────────────────────┬──────────────────────────┘
                         │
  ┌──────────────────────▼──────────────────────────┐
  │  ETAPE 3 : RLHF / DPO                           │
  │  "Apprendre les preferences humaines"            │
  │                                                  │
  │  Donnees : des humains comparent 2 reponses      │
  │  et disent laquelle est meilleure                │
  │  Objectif : aligner le modele avec ce que les    │
  │  humains trouvent utile, honnete, et safe        │
  │  Duree : jours                                   │
  │                                                  │
  │  Resultat : ChatGPT, Claude, Gemini — un modele  │
  │  aligné qui refuse les demandes dangereuses      │
  └─────────────────────────────────────────────────┘
`}</pre>
        </Diagram>

        <KeyConcept title="Etape 1 — Pre-training : apprendre le langage">
          <p>
            Le modele lit des <strong>teraoctets</strong> de texte et apprend a
            predire le prochain token. C&apos;est tout. Pas de questions-reponses,
            pas d&apos;instructions — juste de la completion de texte. Un modele
            pre-entraine sait ecrire du texte coherent, mais si tu lui dis
            &quot;Quelle est la capitale de la France ?&quot;, il va continuer la
            phrase au lieu de repondre &quot;Paris&quot;.
          </p>
        </KeyConcept>

        <Code language="intuition — pre-training">{`# Ce que voit le modele pendant le pre-training :
# des milliards de lignes de texte brut

"La capitale de la France est Paris. Elle est traversee par la Seine..."
"import numpy as np\ndef matrix_multiply(a, b):\n    return a @ b"
"Le patient presente une douleur thoracique irradiant vers le bras gauche..."

# Le modele apprend a predire chaque token a partir des precedents.
# Il ne COMPREND pas — il detecte des PATTERNS statistiques.
# Mais ces patterns sont si riches que ca ressemble a de la comprehension.

# Objectif mathematique (loss function) :
# Minimiser la cross-entropy entre la prediction et le vrai token suivant
# L = -Σ log P(token_t | token_1, ..., token_{t-1})`}</Code>

        <KeyConcept title="Etape 2 — SFT : apprendre a suivre des instructions">
          <p>
            On prend le modele de base et on le fine-tune sur des exemples de
            conversations instruction → reponse. C&apos;est cette etape qui
            transforme un &quot;completeur de texte&quot; en un &quot;assistant&quot;.
            Les donnees sont souvent ecrites par des annotateurs humains ou
            generees par un autre LLM puis verifiees.
          </p>
        </KeyConcept>

        <Code language="donnees SFT — exemples">{`# Exemples de paires (instruction, reponse) pour le SFT :

{"instruction": "Resume ce texte en 3 points",
 "input": "Les transformers sont une architecture...",
 "output": "1. Les transformers utilisent l'attention...\n2. ...\n3. ..."}

{"instruction": "Traduis en anglais",
 "input": "Bonjour le monde",
 "output": "Hello world"}

{"instruction": "Ecris du code Python qui trie une liste",
 "input": "",
 "output": "def sort_list(lst):\n    return sorted(lst)"}

# En general ~50k-100k exemples de haute qualite suffisent.
# La QUALITE des donnees compte plus que la quantite.`}</Code>

        <KeyConcept title="Etape 3 — RLHF / DPO : aligner avec les preferences humaines">
          <p>
            Le modele SFT sait suivre des instructions, mais il peut etre verbeux,
            inventer des faits, ou repondre a des demandes dangereuses. L&apos;etape
            d&apos;alignement corrige ca en utilisant du feedback humain.
          </p>
        </KeyConcept>

        <Code language="RLHF vs DPO — intuition">{`# RLHF (Reinforcement Learning from Human Feedback) :
# 1. Le modele genere 2 reponses a la meme question
# 2. Un humain dit laquelle est meilleure
# 3. On entraine un "reward model" sur ces preferences
# 4. On optimise le LLM pour maximiser le score du reward model (PPO)

# Exemple de comparaison humaine :
Question: "Comment crocheter une serrure ?"
Reponse A: "Voici les etapes pour crocheter une serrure : 1) ..."  ← PIRE
Reponse B: "Je ne peux pas fournir d'instructions pour ca."        ← MIEUX

# DPO (Direct Preference Optimization) :
# Meme idee, mais sans reward model intermediaire.
# On optimise directement le LLM sur les paires de preferences.
# Plus simple, plus stable, utilise par la plupart des labos aujourd'hui.

# C'est cette etape qui donne au modele :
# - Le refus des demandes dangereuses
# - La preference pour des reponses utiles et honnetes
# - Le style "assistant" (concis, structure, avec nuances)
# - La tendance a dire "je ne suis pas sur" plutot qu'halluciner`}</Code>

        <ComparisonTable
          headers={["Etape", "Donnees", "Objectif", "Cout", "Resultat"]}
          rows={[
            [
              "Pre-training",
              "Teraoctets de texte brut (internet, livres, code)",
              "Predire le prochain token",
              "$10M - $100M+",
              "Sait ecrire du texte, ne sait pas dialoguer",
            ],
            [
              "SFT",
              "~50-100k paires instruction → reponse",
              "Suivre des instructions",
              "$10k - $100k",
              "Sait repondre aux questions, pas encore aligne",
            ],
            [
              "RLHF / DPO",
              "~100k comparaisons humaines (A vs B)",
              "Aligner avec les preferences humaines",
              "$100k - $1M",
              "ChatGPT, Claude — utile, honnete, safe",
            ],
          ]}
        />

        <Warning>
          <p>
            <strong>Pourquoi c&apos;est important pour toi ?</strong> Parce que
            ca explique TOUT : pourquoi le modele suit tes instructions (SFT),
            pourquoi il refuse certaines demandes (RLHF), pourquoi il hallucine
            (le pre-training n&apos;apprend pas la verite, juste des patterns
            statistiques), et pourquoi le fine-tuning change le style mais pas
            les connaissances (c&apos;est du SFT, pas du pre-training).
          </p>
        </Warning>

        <Analogy>
          <p>
            Le pre-training, c&apos;est aller a l&apos;ecole pendant 20 ans.
            Le SFT, c&apos;est ton premier jour de stage ou on t&apos;explique
            &quot;voila comment on repond aux clients chez nous&quot;. Le RLHF,
            c&apos;est ton manager qui te dit &quot;cette reponse-la etait top,
            celle-la etait nulle&quot; jusqu&apos;a ce que tu calibres.
          </p>
        </Analogy>

        <Quiz
          question="Un modele pre-entraine (sans SFT ni RLHF) recoit : 'Quelle est la capitale de la France ?' — que fait-il ?"
          options={[
            "Il repond 'Paris'",
            "Il continue la phrase : '... est une question souvent posee en geographie. La reponse est...'",
            "Il refuse de repondre",
            "Il genere du code Python",
          ]}
          answer={1}
          explanation="Sans SFT, le modele est un completeur de texte. Il ne comprend pas que c'est une QUESTION qui attend une REPONSE. Il va simplement completer la phrase de la facon la plus probable, comme un texte de Wikipedia ou un examen scolaire. C'est le SFT qui lui apprend le format question → reponse."
        />

        <Quiz
          question="Pourquoi les LLMs hallucinent-ils ?"
          options={[
            "Un bug dans le code",
            "Le pre-training apprend des patterns statistiques, pas la verite — le modele genere ce qui est PROBABLE, pas ce qui est VRAI",
            "Ils n'ont pas assez de donnees",
            "La temperature est trop haute",
          ]}
          answer={1}
          explanation="Le pre-training optimise la vraisemblance du prochain token, pas la verite factuelle. Si le pattern 'X a ete fonde en 1987' est statistiquement probable, le modele le generera meme si c'est faux. C'est pour ca que le RAG (Module 3) est si important : il donne des FAITS au modele au lieu de le laisser deviner."
        />
      </Section>

      {/* ============================================================ */}
      {/* 7. GENERATION                                                */}
      {/* ============================================================ */}
      <Section
        id="generation"
        number="07"
        title="Comment le modele genere du texte"
      >
        <p>
          Quand le modele a calcule les probabilites pour le prochain token,
          comment choisit-il ? Il y a plusieurs strategies :
        </p>

        <ComparisonTable
          headers={["Strategie", "Principe", "Usage"]}
          rows={[
            [
              "Greedy",
              "Toujours choisir le token le plus probable",
              "Rapide mais repetitif et ennuyeux",
            ],
            [
              "Top-k",
              "Choisir parmi les k tokens les plus probables",
              "Plus de variete, mais k est arbitraire",
            ],
            [
              "Top-p (nucleus)",
              "Choisir parmi les tokens dont la proba cumulee atteint p",
              "Le plus utilise — s'adapte au contexte",
            ],
            [
              "Temperature",
              "Aplatit ou accentue les probabilites avant sampling",
              "Controle la 'creativite' globale",
            ],
          ]}
        />

        <p>
          En pratique, on combine temperature + top-p. C&apos;est ce que tu
          controles quand tu appelles l&apos;API.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 8. PARAMETRES                                                */}
      {/* ============================================================ */}
      <Section
        id="parametres"
        number="08"
        title="Temperature, top-p, top-k"
      >
        <p>
          Ces trois parametres sont les boutons que tu tournes le plus souvent
          quand tu utilises un LLM. Comprends-les bien.
        </p>

        <KeyConcept title="Temperature">
          <p>
            La temperature controle la &quot;confiance&quot; du modele.{" "}
            <strong>T=0</strong> : le modele choisit toujours le token le plus
            probable (deterministe). <strong>T=1</strong> : distribution
            naturelle. <strong>T&gt;1</strong> : plus aleatoire, plus creatif.
          </p>
        </KeyConcept>

        <Code language="intuition">{`Temperature = 0.0 → "Le chat est sur le tapis."
                       Toujours la meme reponse. Factuel.

Temperature = 0.7 → "Le chat somnole paisiblement sur le tapis."
                       Un peu de variete. Bon equilibre.

Temperature = 1.5 → "Le chat cosmique danse sur un tapis de nebuleuses."
                       Creatif mais peut delirer.`}</Code>

        <KeyConcept title="Top-p (nucleus sampling)">
          <p>
            Au lieu de considerer TOUS les tokens possibles, on ne garde que ceux
            dont la probabilite cumulee atteint <strong>p</strong>. Avec p=0.9,
            on garde les tokens qui representent 90% de la masse de probabilite.
          </p>
        </KeyConcept>

        <Code language="python — temperature et sampling avec PyTorch">{`import torch
import torch.nn.functional as F

# Logits bruts du modele (scores avant softmax)
logits = torch.tensor([2.0, 1.5, 0.8, 0.3, -0.5])  # 5 tokens candidats
labels = ["chat", "chien", "oiseau", "dragon", "dinosaure"]

# Temperature = 1.0 (distribution naturelle)
probs_t1 = F.softmax(logits / 1.0, dim=0)
print(dict(zip(labels, probs_t1.tolist())))
# → {'chat': 0.42, 'chien': 0.25, 'oiseau': 0.13, 'dragon': 0.08, 'dinosaure': 0.03}

# Temperature = 0.3 (quasi-deterministe)
probs_t03 = F.softmax(logits / 0.3, dim=0)
# → {'chat': 0.89, 'chien': 0.09, ...}  ← "chat" domine

# Temperature = 2.0 (tres aleatoire)
probs_t2 = F.softmax(logits / 2.0, dim=0)
# → {'chat': 0.28, 'chien': 0.23, ...}  ← distribution aplatie

# Top-p sampling (nucleus)
def top_p_sample(logits, p=0.9):
    probs = F.softmax(logits, dim=0)
    sorted_probs, sorted_idx = torch.sort(probs, descending=True)
    cumsum = torch.cumsum(sorted_probs, dim=0)
    mask = cumsum - sorted_probs < p    # garder jusqu'a cumsum >= p
    filtered = sorted_probs * mask
    return torch.multinomial(filtered / filtered.sum(), 1)  # echantillonner`}</Code>

        <ComparisonTable
          headers={["Param", "Valeur basse", "Valeur haute", "Recommandation"]}
          rows={[
            ["temperature", "0 = deterministe", "2 = tres aleatoire", "0.7 pour du general, 0 pour de l'extraction"],
            ["top_p", "0.1 = tres restrictif", "1.0 = tout garder", "0.9 pour du general"],
            ["top_k", "1 = greedy", "100+ = large choix", "Souvent ignore, top-p suffit"],
          ]}
        />

        <Warning>
          <p>
            <strong>Regle pratique :</strong> pour du tool calling et de
            l&apos;extraction de donnees (ce qu&apos;on fera chez Selectra),
            utilise temperature=0 et top_p=1. Tu veux des reponses
            deterministes et fiables, pas de la creativite.
          </p>
        </Warning>

        <Quiz
          question="Pour un agent vocal Selectra qui doit collecter une adresse, quelle temperature utiliser ?"
          options={[
            "temperature = 1.5 pour etre naturel",
            "temperature = 0.7 pour un bon equilibre",
            "temperature = 0 pour des reponses deterministes",
            "La temperature n'a pas d'impact sur ce cas",
          ]}
          answer={2}
          explanation="Quand tu fais de l'extraction de donnees structurees (adresse, PDL, etc.), tu veux que le modele soit deterministe et previsible. temperature = 0 elimine l'aleatoire. La creativite n'est pas souhaitable quand tu collectes un numero de compteur."
        />
      </Section>

      {/* ============================================================ */}
      {/* 9. CONTEXT WINDOW                                            */}
      {/* ============================================================ */}
      <Section
        id="context-window"
        number="09"
        title="Le context window — la memoire de travail"
      >
        <p>
          Le{" "}
          <Term def="Nombre maximum de tokens que le modele peut traiter en une seule requete. Inclut le prompt (input) + la reponse (output).">
            context window
          </Term>{" "}
          est la quantite de texte que le modele peut &quot;voir&quot; en meme
          temps. C&apos;est sa memoire de travail.
        </p>

        <KeyConcept title="Input + Output = Context Window">
          <p>
            Le context window inclut TOUT : ton system prompt, l&apos;historique
            de conversation, les documents fournis, ET la reponse du modele. Si
            ton prompt fait 100k tokens et que le window est de 128k, il ne
            reste que 28k pour la reponse.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Modele", "Context window", "En mots (~)", "Equivalent"]}
          rows={[
            ["GPT-3.5", "4k tokens", "~3 000 mots", "~6 pages A4"],
            ["GPT-4o", "128k tokens", "~96 000 mots", "Un roman entier"],
            ["Claude 3.5 Sonnet", "200k tokens", "~150 000 mots", "2 romans"],
            ["Claude Opus 4", "1M tokens", "~750 000 mots", "10 romans"],
            ["Gemini 2.5", "1M tokens", "~750 000 mots", "10 romans"],
          ]}
        />

        <Warning>
          <p>
            <strong>Context window ≠ memoire long terme.</strong> Le modele
            &quot;oublie&quot; tout entre deux requetes API. Si tu veux qu&apos;il
            se souvienne d&apos;une conversation, tu dois renvoyer tout
            l&apos;historique a chaque appel. C&apos;est pour ca que les couts
            explosent dans les chatbots — chaque message renvoie tout ce qui
            precede.
          </p>
        </Warning>

        <Analogy>
          <p>
            Le context window, c&apos;est comme la table de travail d&apos;un
            artisan. Tu peux y poser beaucoup de choses (200k tokens), mais une
            fois que tu quittes l&apos;atelier et reviens le lendemain, la table
            est vide. Pas de memoire permanente.
          </p>
        </Analogy>
      </Section>

      {/* ============================================================ */}
      {/* 10. PANORAMA MODELES                                         */}
      {/* ============================================================ */}
      <Section
        id="modeles"
        number="10"
        title="Panorama des modeles (2024-2026)"
      >
        <p>
          Le paysage evolue tres vite. Voici les acteurs majeurs :
        </p>

        <ComparisonTable
          headers={["Famille", "Modeles", "Forces", "Faiblesses"]}
          rows={[
            [
              "OpenAI (GPT)",
              "GPT-5.4, o3, o4-mini",
              "Polyvalent, bon en code, large ecosysteme",
              "Closed-source, cher sur les gros modeles",
            ],
            [
              "Anthropic (Claude)",
              "Sonnet 4.6, Opus 4.6, Haiku 4.5",
              "Excellent en analyse longue (1M tokens), suivi d'instructions, code",
              "Closed-source, pas de fine-tuning public",
            ],
            [
              "Google (Gemini)",
              "Gemini 2.5 Flash/Pro, Gemini 3.1",
              "Multimodal natif, context 1M+, bon rapport qualite/prix",
              "Ecosysteme SDK moins mature",
            ],
            [
              "Meta (Llama)",
              "Llama 4 (Scout, Maverick)",
              "Open-source, deployable en local, fine-tunable",
              "Moins bon que les closed-source sur le raisonnement complexe",
            ],
            [
              "Mistral",
              "Mistral Large, Mistral Medium, Codestral",
              "Francais ! Open-weights, excellent en multilingue et code",
              "Ecosysteme plus petit que OpenAI/Anthropic",
            ],
          ]}
        />

        <KeyConcept title="Open-source vs Closed-source">
          <p>
            <strong>Closed-source</strong> (GPT, Claude) : tu appelles une API,
            tu ne vois pas les poids du modele. Plus performant mais dependance
            au fournisseur.
            <br />
            <strong>Open-source</strong> (Llama, Mistral) : tu peux telecharger
            et faire tourner le modele toi-meme. Moins performant sur les gros
            benchmarks, mais libre et fine-tunable.
          </p>
        </KeyConcept>

        <p>
          Pour ton stage chez Selectra, tu utiliseras probablement un modele
          closed-source (GPT ou Claude) via API pour l&apos;agent vocal. La
          latence et la qualite du raisonnement comptent plus que le cout pour
          une demo.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 11. PREMIER APPEL API                                        */}
      {/* ============================================================ */}
      <Section
        id="api"
        number="11"
        title="Utiliser un LLM via API — premier appel"
      >
        <p>
          Assez de theorie. Voici comment on parle a un LLM en vrai. On utilise
          le <strong>Vercel AI SDK</strong> — c&apos;est la librairie standard
          pour faire de l&apos;IA en TypeScript.
        </p>

        <Steps>
          <Step number="1" title="Installer les dependances">
            <Code language="terminal">{`npm install ai @ai-sdk/react`}</Code>
          </Step>
          <Step number="2" title="Creer la route API (serveur)">
            <Code language="typescript — app/api/chat/route.ts">{`import { streamText, convertToModelMessages } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-4.6",     // via AI Gateway
    system: "Tu es un assistant Selectra. Tu aides les clients a trouver le meilleur contrat d'energie.",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}`}</Code>
          </Step>
          <Step number="3" title="Creer le composant client (UI)">
            <Code language="typescript — app/page.tsx">{`"use client";
import { useChat, DefaultChatTransport } from "@ai-sdk/react";

const transport = new DefaultChatTransport({ api: "/api/chat" });

export default function Chat() {
  const { messages, status, sendMessage } = useChat({ transport });
  const [input, setInput] = useState("");

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          <strong>{m.role}:</strong>
          {m.parts.map((part, i) =>
            part.type === "text" ? <span key={i}>{part.text}</span> : null
          )}
        </div>
      ))}
      <form onSubmit={(e) => {
        e.preventDefault();
        sendMessage({ text: input });
        setInput("");
      }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </form>
    </div>
  );
}`}</Code>
          </Step>
        </Steps>

        <KeyConcept title="System prompt">
          <p>
            Le <strong>system prompt</strong> est une instruction invisible pour
            l&apos;utilisateur mais visible par le modele. C&apos;est la que tu
            definis le role, le ton, et les contraintes de ton assistant. Pour
            Selectra : &quot;Tu es un agent de qualification Selectra. Tu
            collectes l&apos;adresse, le fournisseur actuel, et le numero
            PDL.&quot;
          </p>
        </KeyConcept>

        <Warning>
          <p>
            <strong>streamText vs generateText :</strong> utilise{" "}
            <code>streamText</code> pour les interfaces utilisateur (les mots
            apparaissent un par un) et <code>generateText</code> pour le
            traitement en arriere-plan (tu veux la reponse complete d&apos;un
            coup).
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 11. QUIZ FINAL                                               */}
      {/* ============================================================ */}
      <Section id="quiz-final" number="12" title="Quiz final">
        <p>
          Verifions que les fondations sont solides avant de passer au Module 2.
        </p>

        <Quiz
          question="Quel est l'ordre correct du pipeline d'un LLM ?"
          options={[
            "Embedding → Tokenization → Attention → Softmax",
            "Tokenization → Embedding → Transformer layers → Softmax → Sampling",
            "Attention → Embedding → Tokenization → Output",
            "Sampling → Transformer → Tokenization → Embedding",
          ]}
          answer={1}
          explanation="Le texte est d'abord tokenize, puis chaque token recoit un embedding, passe dans N couches de Transformer (qui contiennent l'attention), puis un softmax convertit les logits en probabilites, et enfin le sampling choisit le prochain token."
        />

        <Quiz
          question="Pourquoi le context window est-il un facteur limitant pour les chatbots ?"
          options={[
            "Parce que le modele est lent",
            "Parce que tout l'historique de conversation doit etre renvoye a chaque message, ce qui consomme le window et coute cher",
            "Parce que le modele ne peut pas lire le francais",
            "Parce que le context window diminue avec le temps",
          ]}
          answer={1}
          explanation="Le LLM n'a pas de memoire entre les appels API. Chaque requete doit inclure TOUT le contexte necessaire : system prompt + historique complet. Sur une longue conversation, ca remplit vite le window et ca coute cher (facturation au token)."
        />

        <Quiz
          question="Que fait le mecanisme d'attention ?"
          options={[
            "Il supprime les tokens inutiles",
            "Il compresse le texte pour economiser de la memoire",
            "Il permet a chaque token de ponderer l'importance de tous les autres tokens",
            "Il traduit le texte en anglais",
          ]}
          answer={2}
          explanation="L'attention calcule des poids entre chaque paire de tokens. Ca permet au modele de comprendre les relations a longue distance (comme la coreference 'il' → 'chat') sans perte d'information liee a la distance."
        />

        <div className="mt-12 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
          <p className="mb-2 text-lg font-semibold text-emerald-400">
            Module 01 termine
          </p>
          <p className="text-sm text-muted-foreground">
            Tu connais maintenant les fondations : tokens, embeddings,
            attention, architecture Transformer, le pipeline d&apos;entrainement
            (pre-training → SFT → RLHF), les parametres de generation, et
            comment faire ton premier appel API. Prochain module : Prompt
            Engineering — l&apos;art de parler aux LLMs.
          </p>
        </div>
      </Section>
    </>
  );
}
