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
import { SvgDiagram, Box, Arrow, Label, GroupBox } from "@/components/svg-diagrams";

export function RAG() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. POURQUOI LE RAG                                           */}
      {/* ============================================================ */}
      <Section id="pourquoi" number="01" title="Le probleme : les LLMs ne savent pas tout">
        <p>
          Au Module 1, on a vu que le LLM a une connaissance fige — il ne
          connait que ce qu&apos;il a vu pendant son entrainement. Il ne connait
          pas les tarifs Selectra d&apos;aujourd&apos;hui, ni les documents
          internes de ta boite, ni le contenu d&apos;un PDF que tu viens de
          recevoir.
        </p>

        <KeyConcept title="Le probleme des connaissances">
          <p>
            Les LLMs ont 3 limites majeures : <strong>1)</strong> leurs
            connaissances ont une date de coupure, <strong>2)</strong> ils
            n&apos;ont pas acces a tes donnees privees, <strong>3)</strong> ils
            hallucinent quand ils ne savent pas. Le RAG resout les trois.
          </p>
        </KeyConcept>

        <Analogy>
          <p>
            Imagine un expert qui repond a tes questions les yeux fermes, de
            memoire. Parfois il a raison, parfois il invente. Le RAG, c&apos;est
            lui ouvrir les yeux et lui donner un dossier de documents pertinents
            AVANT qu&apos;il reponde. Il peut maintenant citer ses sources.
          </p>
        </Analogy>

        <p>
          <strong>RAG = Retrieval-Augmented Generation.</strong> En francais :
          generation augmentee par la recuperation. Le principe est simple :
        </p>

        <SvgDiagram width={600} height={340} title="Pipeline RAG">
          {/* Question */}
          <Box x={190} y={10} w={220} h={36} label="Question utilisateur" color="cyan" />
          <Arrow x1={300} y1={46} x2={300} y2={72} />
          {/* Retrieval */}
          <Box x={150} y={72} w={300} h={44} label="1. Retrieval" sublabel="Chercher les documents pertinents" color="accent" />
          <Arrow x1={300} y1={116} x2={300} y2={148} />
          {/* Augmentation */}
          <Box x={150} y={148} w={300} h={44} label="2. Augmentation" sublabel="Injecter dans le prompt comme contexte" color="violet" />
          <Arrow x1={300} y1={192} x2={300} y2={224} />
          {/* Generation */}
          <Box x={150} y={224} w={300} h={44} label="3. Generation" sublabel="Le LLM repond avec les documents" color="amber" />
          <Arrow x1={300} y1={268} x2={300} y2={296} />
          {/* Output */}
          <Box x={175} y={296} w={250} h={36} label="Reponse sourcee et fiable" color="default" />
        </SvgDiagram>

        <ComparisonTable
          headers={["Approche", "Principe", "Quand l'utiliser"]}
          rows={[
            ["Sans RAG", "Le LLM repond de memoire", "Questions de culture generale, code, raisonnement"],
            ["RAG", "On donne des documents au LLM avant qu'il reponde", "Donnees privees, info a jour, besoin de sources"],
            ["Fine-tuning", "On re-entraine le modele sur tes donnees", "Changer le style/comportement du modele, pas pour des faits"],
            ["Long context", "On met tout dans le prompt (si ca rentre)", "Petit corpus (<100 pages), pas besoin de systeme complexe"],
          ]}
        />

        <Warning>
          <p>
            <strong>RAG vs Fine-tuning :</strong> c&apos;est la confusion la
            plus courante. Le fine-tuning change le <em>comportement</em> du
            modele (ton, style, format). Le RAG lui donne des <em>faits</em>.
            Pour que ton agent Selectra connaisse les tarifs actuels, c&apos;est
            du RAG qu&apos;il faut — pas du fine-tuning.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 2. EMBEDDINGS EN PROFONDEUR                                  */}
      {/* ============================================================ */}
      <Section
        id="embeddings"
        number="02"
        title="Les embeddings — la base du RAG"
      >
        <p>
          Au Module 1, on a brievement vu les embeddings. Ici on va plus loin
          car c&apos;est le moteur du RAG.
        </p>

        <KeyConcept title="Embedding = position dans un espace semantique">
          <p>
            Un embedding convertit un texte (mot, phrase, paragraphe) en un
            vecteur de nombres. Deux textes qui parlent du meme sujet auront
            des vecteurs proches, meme s&apos;ils utilisent des mots differents.
          </p>
        </KeyConcept>

        <Code language="exemple">{`embed("Comment reduire ma facture d'electricite ?")
→ [0.23, -0.41, 0.87, 0.12, ...]  (1536 dimensions)

embed("Je paye trop cher mon courant, que faire ?")
→ [0.21, -0.39, 0.85, 0.14, ...]  (tres proche ! meme sens)

embed("Quelle est la capitale de la France ?")
→ [0.78, 0.33, -0.21, 0.67, ...]  (tres loin — sujet different)

distance("facture", "courant") = 0.05  → tres similaire
distance("facture", "capitale") = 1.42 → tres different`}</Code>

        <p>
          La <Term def="Mesure mathematique de la proximite entre deux vecteurs. Plus la distance est faible (ou la similarite cosinus elevee), plus les textes sont semantiquement proches.">distance</Term>{" "}
          entre deux embeddings mesure la similarite semantique. C&apos;est ca
          qui permet de trouver &quot;les documents qui parlent du meme sujet
          que la question&quot;.
        </p>

        <Code language="typescript — generer des embeddings">{`import { embed, embedMany } from "ai";

// Embedder un seul texte
const { embedding } = await embed({
  model: "openai/text-embedding-3-small",
  value: "Comment changer de fournisseur d'electricite ?",
});
// embedding = number[] (1536 dimensions)

// Embedder plusieurs textes d'un coup (plus efficace)
const { embeddings } = await embedMany({
  model: "openai/text-embedding-3-small",
  values: [
    "Guide pour changer de fournisseur",
    "Tarifs electricite 2026",
    "Comment lire son compteur Linky",
  ],
});
// embeddings = number[][] (3 vecteurs)`}</Code>

        <ComparisonTable
          headers={["Modele d'embedding", "Dimensions", "Usage"]}
          rows={[
            ["text-embedding-3-small (OpenAI)", "1536", "Bon rapport qualite/prix, usage general"],
            ["text-embedding-3-large (OpenAI)", "3072", "Plus precis, plus cher"],
            ["voyage-3 (Voyage AI)", "1024", "Excellent pour le francais"],
            ["Mistral Embed", "1024", "Francais natif, bon marche"],
          ]}
        />

        <Code language="python — embeddings et similarite avec numpy">{`import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Simulons des embeddings (en vrai, ils viennent d'un modele)
# Ici on utilise sentence-transformers (pip install sentence-transformers)
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")  # leger, 384 dims

phrases = [
    "Comment reduire ma facture d'electricite ?",
    "Je paye trop cher mon courant, que faire ?",
    "Quelle est la capitale de la France ?",
]
embeddings = model.encode(phrases)  # → np.array shape (3, 384)

# Matrice de similarite
sim_matrix = cosine_similarity(embeddings)
print(f"facture ↔ courant  : {sim_matrix[0][1]:.3f}")  # → 0.82 (tres proche !)
print(f"facture ↔ capitale : {sim_matrix[0][2]:.3f}")  # → 0.13 (rien a voir)

# Trouver le document le plus proche d'une question
question = model.encode(["Je veux payer moins cher"])
scores = cosine_similarity(question, embeddings)[0]
best = np.argmax(scores)
print(f"Meilleur match : '{phrases[best]}' (score: {scores[best]:.3f})")`}</Code>

        <Quiz
          question="Pourquoi les embeddings sont-ils meilleurs que la recherche par mots-cles pour le RAG ?"
          options={[
            "Ils sont plus rapides",
            "Ils comprennent le SENS, pas juste les mots exacts — 'facture elevee' matche avec 'je paye trop cher'",
            "Ils prennent moins de place en memoire",
            "Ils fonctionnent sans internet",
          ]}
          answer={1}
          explanation="La recherche par mots-cles ne trouve que les correspondances exactes. 'Facture elevee' ne matchera pas 'je paye trop cher'. Les embeddings capturent le sens semantique : ces deux phrases auront des vecteurs tres proches malgre des mots differents."
        />
      </Section>

      {/* ============================================================ */}
      {/* 3. VECTOR STORES                                             */}
      {/* ============================================================ */}
      <Section
        id="vector-stores"
        number="03"
        title="Vector stores — la memoire du RAG"
      >
        <p>
          OK, on sait convertir du texte en vecteurs. Mais ou les stocker, et
          comment chercher dedans rapidement ?
        </p>

        <KeyConcept title="Vector store">
          <p>
            Un vector store (ou base de donnees vectorielle) stocke des
            embeddings et permet de faire des recherches de similarite en
            millisecondes, meme sur des millions de vecteurs.
          </p>
        </KeyConcept>

        <Steps>
          <Step number="1" title="Indexation (une seule fois)">
            <p>
              Tu prends tes documents, tu les decoupes en chunks, tu calcules
              l&apos;embedding de chaque chunk, et tu les stockes dans le vector
              store avec les metadonnees (source, page, date...).
            </p>
          </Step>
          <Step number="2" title="Recherche (a chaque requete)">
            <p>
              La question de l&apos;utilisateur est embedee, puis le vector
              store trouve les K chunks les plus proches (Approximate Nearest
              Neighbors — ANN).
            </p>
          </Step>
          <Step number="3" title="Generation">
            <p>
              Les chunks recuperes sont injectes dans le prompt du LLM, qui
              genere sa reponse en se basant dessus.
            </p>
          </Step>
        </Steps>

        <SvgDiagram width={700} height={460} title="Architecture RAG complete">
          {/* ---- INDEXATION side ---- */}
          <GroupBox x={20} y={10} w={300} h={280} label="Indexation (offline)" color="accent" />
          <Box x={60} y={36} w={220} h={36} label="Documents" sublabel="PDF / HTML / TXT" color="default" />
          <Arrow x1={170} y1={72} x2={170} y2={98} />
          <Box x={60} y={98} w={220} h={36} label="Chunking" sublabel="~500 tokens / chunk" color="accent" />
          <Arrow x1={170} y1={134} x2={170} y2={160} />
          <Box x={60} y={160} w={220} h={36} label="Embedding model" sublabel="texte -> vecteur" color="cyan" />
          <Arrow x1={170} y1={196} x2={170} y2={222} />
          <Box x={60} y={222} w={220} h={40} label="Vector Store" sublabel="stockage indexe" color="violet" />
          {/* ---- REQUETE side ---- */}
          <GroupBox x={370} y={10} w={310} h={440} label="Requete (a chaque question)" color="violet" />
          <Box x={400} y={36} w={250} h={36} label="Question utilisateur" color="cyan" />
          <Arrow x1={525} y1={72} x2={525} y2={98} />
          <Box x={400} y={98} w={250} h={36} label="Embedding model" sublabel="question -> vecteur" color="cyan" />
          <Arrow x1={525} y1={134} x2={525} y2={160} />
          <Box x={400} y={160} w={250} h={40} label="Vector Store" sublabel="top-K search" color="violet" />
          {/* Arrow from indexed store to query store */}
          <Arrow x1={280} y1={242} x2={400} y2={180} dashed label="index" color="#8b5cf6" />
          <Arrow x1={525} y1={200} x2={525} y2={230} />
          <Label x={525} y={240} text="3-5 chunks pertinents" size={10} color="#a1a1aa" />
          <Arrow x1={525} y1={250} x2={525} y2={276} />
          <Box x={390} y={276} w={270} h={40} label="Prompt" sublabel="system + chunks + question" color="amber" />
          <Arrow x1={525} y1={316} x2={525} y2={346} />
          <Box x={430} y={346} w={190} h={36} label="LLM" color="violet" />
          <Arrow x1={525} y1={382} x2={525} y2={410} />
          <Box x={390} y={410} w={270} h={30} label="Reponse avec sources" color="accent" />
        </SvgDiagram>

        <ComparisonTable
          headers={["Vector store", "Type", "Avantage", "Usage"]}
          rows={[
            ["Pinecone", "Cloud (managed)", "Simple, scalable, pas de maintenance", "Production, SaaS"],
            ["Chroma", "Local / embedde", "Gratuit, tourne en local, parfait pour prototyper", "Dev, petits projets"],
            ["Weaviate", "Cloud ou self-hosted", "Hybrid search (vecteurs + mots-cles)", "Production avancee"],
            ["pgvector", "Extension PostgreSQL", "Pas de nouvelle DB a gerer si tu as deja Postgres", "Si tu utilises deja Neon/Supabase"],
            ["En memoire (array)", "Juste du JS", "Zero dependance, quelques lignes de code", "Prototypage rapide, <1000 docs"],
          ]}
        />

        <KeyConcept title="Comment marche la recherche : ANN (Approximate Nearest Neighbors)">
          <p>
            Quand tu as 10 documents, tu peux comparer ta question a chaque
            vecteur un par un (<strong>brute force</strong>). Mais avec des
            millions de documents, c&apos;est O(n) — beaucoup trop lent.
            C&apos;est la que les algorithmes ANN entrent en jeu.
          </p>
          <p>
            <strong>HNSW (Hierarchical Navigable Small World) :</strong> on
            construit un graphe ou les vecteurs similaires sont connectes entre
            eux. Pour chercher, on part d&apos;un point aleatoire et on saute
            toujours vers le voisin le plus proche — comme demander son chemin
            dans une ville : chaque personne te rapproche de ta destination.
            Complexite : O(log n).
          </p>
          <p>
            <strong>IVF (Inverted File Index) :</strong> on regroupe les
            vecteurs en clusters (cellules de Voronoi). A la recherche, on ne
            regarde que les clusters les plus proches de la question. Comme
            chercher un livre a la bibliotheque — tu vas d&apos;abord au bon
            rayon, puis tu scannes cette etagere.
          </p>
          <p>
            <strong>Le compromis :</strong> ANN ne garantit pas de trouver LE
            vecteur le plus proche, mais il en trouve de tres proches beaucoup
            plus vite. En pratique, la perte de precision est negligeable (recall{" "}
            {">"} 95%) et le gain de vitesse est enorme (1000x plus rapide).
          </p>
        </KeyConcept>

        <Warning>
          <p>
            <strong>Pour ton stage :</strong> commence avec un vector store en
            memoire (simple array + cosine similarity) pour prototyper. Passe a
            Chroma ou pgvector quand ca marche. Ne commence pas par Pinecone —
            c&apos;est overkill pour une demo.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 4. CHUNKING                                                  */}
      {/* ============================================================ */}
      <Section
        id="chunking"
        number="04"
        title="Le chunking — decouper intelligemment"
      >
        <p>
          Tu ne peux pas embedder un PDF de 200 pages d&apos;un coup — le modele
          d&apos;embedding a une limite de tokens, et un vecteur de 200 pages
          serait trop generique pour etre utile. Il faut decouper.
        </p>

        <KeyConcept title="Le chunking">
          <p>
            Decouper tes documents en morceaux (<strong>chunks</strong>) de
            taille optimale. Trop petit = manque de contexte. Trop gros = trop
            generique, le vector store ne trouvera pas le bon passage.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Strategie", "Principe", "Taille typique", "Quand l'utiliser"]}
          rows={[
            [
              "Fixed-size",
              "Couper tous les N tokens",
              "200-500 tokens",
              "Simple, rapide, bon par defaut",
            ],
            [
              "Par paragraphe",
              "Couper aux sauts de ligne doubles",
              "Variable",
              "Documents bien structures (articles, docs)",
            ],
            [
              "Recursive",
              "Couper en hierarchie (section → paragraphe → phrase)",
              "200-1000 tokens",
              "Le plus polyvalent, recommande",
            ],
            [
              "Semantique",
              "Couper quand le sujet change (via embeddings)",
              "Variable",
              "Documents longs sans structure claire",
            ],
          ]}
        />

        <Code language="chunking recursif — concept">{`Document original (2000 tokens):
"## Changer de fournisseur
Pour changer de fournisseur d'electricite, il suffit de souscrire
une nouvelle offre. L'ancien fournisseur sera resilie automatiquement...
[500 tokens]

## Les tarifs reglementes
Le tarif reglemente de vente (TRV) est fixe par les pouvoirs publics...
[600 tokens]

## Le compteur Linky
Le compteur Linky permet de relever votre consommation a distance...
[900 tokens]"

Apres chunking recursif (max 500 tokens, overlap 50):
→ Chunk 1: "## Changer de fournisseur\nPour changer..." (480 tokens)
→ Chunk 2: "## Les tarifs reglementes\nLe tarif..." (520 tokens → re-decoupe)
  → Chunk 2a: "## Les tarifs reglementes\nLe tarif..." (300 tokens)
  → Chunk 2b: "...fixe par les pouvoirs publics..." (270 tokens)
→ Chunk 3: "## Le compteur Linky\nLe compteur..." (450 tokens)
→ Chunk 4: "...relever votre consommation a distance..." (500 tokens)`}</Code>

        <Code language="python — chunking recursif avec LangChain">{`from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,       # max 500 caracteres par chunk
    chunk_overlap=50,     # 50 caracteres de chevauchement
    separators=["\\n## ", "\\n\\n", "\\n", ". ", " "],  # priorite de coupure
)

texte = """## Changer de fournisseur
Pour changer de fournisseur d'electricite, il suffit de souscrire
une nouvelle offre. La resiliation est automatique et gratuite.

## Les tarifs reglementes
Le tarif reglemente de vente (TRV) est fixe par les pouvoirs publics.
Il change deux fois par an, en fevrier et en aout."""

chunks = splitter.split_text(texte)
for i, chunk in enumerate(chunks):
    print(f"Chunk {i} ({len(chunk)} chars): {chunk[:60]}...")`}</Code>

        <KeyConcept title="L'overlap (chevauchement)">
          <p>
            On fait chevaucher les chunks de 10-20% pour ne pas couper une
            phrase en deux. Si un chunk finit a &quot;Le tarif est de&quot; et le
            suivant commence a &quot;15 centimes&quot;, on a perdu
            l&apos;information. L&apos;overlap evite ca.
          </p>
        </KeyConcept>

        <KeyConcept title="Pourquoi le overlap est crucial">
          <p>
            <strong>Sans overlap :</strong> si une phrase importante est coupee
            entre deux chunks, aucun des deux n&apos;a le contexte complet.
            L&apos;embedding de chaque chunk rate le sens de la phrase — et ta
            recherche ne retrouvera jamais ce passage.
          </p>
          <p>
            <strong>Avec overlap :</strong> les tokens partages aux frontieres
            assurent la continuite. Un overlap de 20% signifie que les derniers
            20% du chunk N apparaissent comme les premiers 20% du chunk N+1.
            Le cout : un peu plus de stockage et de vecteurs a indexer, mais
            la qualite de retrieval augmente nettement.
          </p>
          <p>
            <strong>Analogie :</strong> imagine un livre ou chaque page repete
            le dernier paragraphe de la page precedente. Tu ne perds jamais le
            fil quand tu tournes la page.
          </p>
        </KeyConcept>

        <Quiz
          question="Pour une FAQ Selectra avec des questions-reponses courtes, quelle strategie de chunking ?"
          options={[
            "Fixed-size de 1000 tokens",
            "Un chunk par paire question-reponse",
            "Semantique avec embeddings",
            "Pas de chunking, tout dans un seul vecteur",
          ]}
          answer={1}
          explanation="Chaque paire Q/R est une unite de sens complete. La decouper serait destructif, la melanger avec d'autres Q/R ajouterait du bruit. Un chunk = une Q/R = un vecteur. C'est le cas ideal."
        />
      </Section>

      {/* ============================================================ */}
      {/* 5. SIMILARITY SEARCH                                         */}
      {/* ============================================================ */}
      <Section
        id="similarity-search"
        number="05"
        title="Similarity search — trouver les bons documents"
      >
        <p>
          Quand l&apos;utilisateur pose une question, comment trouver les chunks
          les plus pertinents parmi des milliers ?
        </p>

        <KeyConcept title="Cosine similarity">
          <p>
            La mesure la plus utilisee. Elle calcule l&apos;angle entre deux
            vecteurs. <strong>1.0</strong> = identiques,{" "}
            <strong>0.0</strong> = aucun rapport,{" "}
            <strong>-1.0</strong> = opposes. En pratique, un score &gt; 0.7 est
            generalement pertinent.
          </p>
        </KeyConcept>

        <Code language="typescript — recherche de similarite (en memoire)">{`// Cosine similarity entre deux vecteurs
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Chercher les K chunks les plus proches
function search(query: number[], chunks: { text: string; embedding: number[] }[], k = 3) {
  return chunks
    .map(chunk => ({
      text: chunk.text,
      score: cosineSimilarity(query, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

// Utilisation
const queryEmbedding = await embed({ model, value: "Comment changer de fournisseur ?" });
const results = search(queryEmbedding.embedding, indexedChunks, 3);
// → [
//   { text: "Pour changer de fournisseur...", score: 0.89 },
//   { text: "La procedure de changement...", score: 0.82 },
//   { text: "Les delais de changement...", score: 0.76 },
// ]`}</Code>

        <p>
          C&apos;est simple et ca marche. Pour des milliers de documents, les
          vector stores utilisent des algorithmes plus rapides (HNSW, IVF) mais
          le principe est le meme.
        </p>

        <KeyConcept title="Hybrid search (le meilleur des deux mondes)">
          <p>
            Combiner la recherche vectorielle (semantique) avec la recherche par
            mots-cles (BM25). La recherche vectorielle comprend le sens, la
            recherche BM25 trouve les mots exacts (numeros de PDL, noms propres).
            Ensemble, elles sont plus fiables que chacune seule.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Recherche", "Force", "Faiblesse", "Exemple"]}
          rows={[
            [
              "Vectorielle",
              "Comprend le sens",
              "Rate les mots exacts (codes, noms)",
              '"facture elevee" trouve "je paye trop cher"',
            ],
            [
              "BM25 (mots-cles)",
              "Trouve les mots exacts",
              "Ne comprend pas les synonymes",
              '"PDL 09234567" trouve le bon compteur',
            ],
            [
              "Hybrid",
              "Les deux",
              "Plus complexe a mettre en place",
              "Le meilleur choix en production",
            ],
          ]}
        />

        <KeyConcept title="Le probleme 'Lost in the Middle'">
          <p>
            Des chercheurs ont montre que les LLMs performent moins bien quand
            l&apos;information pertinente se trouve au <strong>milieu</strong>{" "}
            de la fenetre de contexte. Ils sont meilleurs quand elle est au{" "}
            <strong>debut</strong> ou a la <strong>fin</strong>.
          </p>
          <p>
            <strong>En pratique :</strong> quand tu injectes les chunks
            recuperes dans le prompt, mets les plus pertinents en premier et en
            dernier. Les chunks moyennement pertinents vont au milieu — la ou
            le modele fait le moins attention.
          </p>
          <p>
            <strong>Re-ranking :</strong> une technique complementaire. Tu
            recuperes d&apos;abord un top-100 avec ANN (rapide mais
            approximatif), puis tu re-classes avec un{" "}
            <Term def="Modele qui prend en entree la paire (question, document) et donne un score de pertinence. Plus lent qu'un bi-encoder (embedding separe) mais beaucoup plus precis car il voit les deux textes ensemble.">
              cross-encoder
            </Term>{" "}
            (plus lent mais beaucoup plus precis) pour garder le top-5. Ca
            combine la vitesse de ANN avec la precision d&apos;un modele qui
            voit question + document ensemble.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 6. PIPELINE RAG COMPLET                                      */}
      {/* ============================================================ */}
      <Section
        id="pipeline"
        number="06"
        title="Pipeline RAG complet en code"
      >
        <p>
          Assemblons tout en un pipeline fonctionnel. Voici un RAG complet
          sur une FAQ Selectra.
        </p>

        <Code language="typescript — pipeline RAG complet">{`import { embed, embedMany, generateText } from "ai";

// ── 1. Donnees (en prod, ca viendrait d'une DB ou de fichiers) ──

const faq = [
  {
    question: "Comment changer de fournisseur d'electricite ?",
    answer: "Il suffit de souscrire une offre chez un nouveau fournisseur. La resiliation de l'ancien contrat est automatique et gratuite. Le changement prend environ 3 semaines. Vous n'aurez aucune coupure d'electricite pendant la transition.",
  },
  {
    question: "Qu'est-ce que le numero PDL ?",
    answer: "Le PDL (Point de Livraison) est un numero a 14 chiffres qui identifie votre compteur electrique. Vous le trouvez sur votre facture d'electricite, sur votre compteur Linky, ou en appelant Enedis au 09 72 67 50 XX (XX = votre departement).",
  },
  {
    question: "Quels documents faut-il pour souscrire ?",
    answer: "Pour souscrire un contrat d'electricite, vous avez besoin de : votre adresse exacte, votre numero PDL (ou PCE pour le gaz), un RIB pour le prelevement, et une estimation de votre consommation annuelle en kWh.",
  },
  // ... 200 autres Q/R
];

// ── 2. Indexation (une seule fois au demarrage) ──

const texts = faq.map(f => f.question + " " + f.answer);
const { embeddings } = await embedMany({
  model: "openai/text-embedding-3-small",
  values: texts,
});

const index = faq.map((f, i) => ({
  text: f.question + "\\n" + f.answer,
  embedding: embeddings[i],
}));

// ── 3. Recherche (a chaque question utilisateur) ──

const userQuestion = "J'ai besoin de quoi pour ouvrir un contrat ?";

const { embedding: queryVec } = await embed({
  model: "openai/text-embedding-3-small",
  value: userQuestion,
});

// Trouver les 3 Q/R les plus pertinentes
const results = index
  .map(item => ({ ...item, score: cosineSimilarity(queryVec, item.embedding) }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);

// ── 4. Generation avec contexte ──

const response = await generateText({
  model: "anthropic/claude-sonnet-4.6",
  system: "Tu es l'assistant Selectra. Reponds en te basant UNIQUEMENT sur les documents fournis. Si l'info n'est pas dans les documents, dis-le.",
  prompt: \`Documents pertinents :
---
\${results.map(r => r.text).join("\\n---\\n")}
---

Question du client : \${userQuestion}

Reponds en citant les sources.\`
});`}</Code>

        <Warning>
          <p>
            <strong>Le system prompt RAG est crucial :</strong>{" "}
            &quot;Reponds UNIQUEMENT sur les documents fournis&quot; empeche le
            modele d&apos;halluciner. Sans ca, il completera avec ses
            connaissances (potentiellement fausses ou perimees). Pour Selectra,
            tu veux des tarifs d&apos;aujourd&apos;hui, pas ceux de
            l&apos;entrainement.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 7. RAG POUR SELECTRA                                         */}
      {/* ============================================================ */}
      <Section
        id="selectra"
        number="07"
        title="Application Selectra : RAG pour l'agent vocal"
      >
        <p>
          Comment le RAG s&apos;integre dans l&apos;agent vocal Selectra ?
        </p>

        <SvgDiagram width={700} height={400} title="Agent vocal + RAG">
          {/* Client question */}
          <Box x={170} y={10} w={360} h={36} label='"Les tarifs chez TotalEnergies ?"' color="cyan" />
          <Label x={130} y={28} text="Client" size={11} color="#06b6d4" anchor="end" />
          <Arrow x1={350} y1={46} x2={350} y2={72} />
          {/* Agent vocal */}
          <Box x={220} y={72} w={260} h={36} label="Agent vocal (LLM)" color="violet" />
          <Arrow x1={350} y1={108} x2={350} y2={130} label="besoin info factuelle" />
          {/* Vector search */}
          <Box x={170} y={140} w={360} h={40} label="Vector search" sublabel='"tarifs TotalEnergies"' color="accent" />
          <Arrow x1={350} y1={180} x2={350} y2={210} />
          {/* Retrieved docs */}
          <GroupBox x={120} y={210} w={460} h={60} label="Documents retrouves" color="default" />
          <Label x={350} y={234} text="Essentielle: 0.19EUR/kWh, abo 12EUR/mois" size={10} color="#a1a1aa" />
          <Label x={350} y={250} text="Verte: 0.21EUR/kWh, abo 13EUR/mois" size={10} color="#a1a1aa" />
          <Arrow x1={350} y1={274} x2={350} y2={300} />
          {/* LLM + RAG context */}
          <Box x={210} y={300} w={280} h={36} label="LLM + contexte RAG" color="violet" />
          <Arrow x1={350} y1={336} x2={350} y2={360} />
          {/* Agent response */}
          <Box x={130} y={360} w={440} h={30} label="Reponse avec tarifs precis et sources" color="amber" />
          <Label x={95} y={375} text="Agent" size={11} color="#f59e0b" anchor="end" />
        </SvgDiagram>

        <p>
          En pratique, l&apos;agent vocal Selectra utiliserait le RAG pour :
        </p>

        <ComparisonTable
          headers={["Cas d'usage RAG", "Base de connaissances", "Pourquoi RAG et pas de memoire"]}
          rows={[
            [
              "Tarifs des offres",
              "Base Selectra mise a jour quotidiennement",
              "Les prix changent tous les mois — le LLM ne peut pas les connaitre",
            ],
            [
              "FAQ client",
              "200+ questions/reponses Selectra",
              "Reponses precises et validees juridiquement",
            ],
            [
              "Procedures internes",
              "Scripts de qualification, regles metier",
              "L'agent doit suivre la procedure exacte, pas improviser",
            ],
            [
              "Info compteur",
              "Guide Linky, numeros Enedis par departement",
              "Infos techniques precises (numeros de tel, etapes)",
            ],
          ]}
        />

        <KeyConcept title="RAG en temps reel pour le vocal">
          <p>
            En vocal, la latence compte. Le RAG ajoute ~200-500ms (embedding de
            la question + recherche vectorielle). C&apos;est acceptable — le
            client ne remarque pas un silence de 500ms entre sa question et la
            reponse. L&apos;agent peut meme dire &quot;Un instant, je
            verifie...&quot; pendant la recherche.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 8. QUAND NE PAS UTILISER RAG                                 */}
      {/* ============================================================ */}
      <Section
        id="limites"
        number="08"
        title="Quand NE PAS utiliser le RAG"
      >
        <ComparisonTable
          headers={["Situation", "RAG ?", "Alternative"]}
          rows={[
            [
              "Petit corpus (<50 pages)",
              "Non",
              "Met tout dans le context window directement. Plus simple, plus fiable.",
            ],
            [
              "Le LLM connait deja la reponse",
              "Non",
              "Pour du code Python, de la culture generale, du raisonnement pur → pas besoin de RAG.",
            ],
            [
              "Tu veux changer le style du modele",
              "Non",
              "Fine-tuning ou system prompt elabore. Le RAG donne des faits, pas un style.",
            ],
            [
              "Donnees privees + mise a jour frequente",
              "Oui",
              "C'est LE cas d'usage ideal du RAG.",
            ],
          ]}
        />

        <Warning>
          <p>
            <strong>L&apos;erreur classique :</strong> mettre du RAG partout.
            Si ta FAQ fait 20 questions, tu n&apos;as pas besoin d&apos;un vector
            store — mets-la dans le system prompt. Le RAG ajoute de la complexite
            (indexation, maintenance de la base, latence). Utilise-le quand
            c&apos;est justifie.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 9. DEEP DIVE : HNSW                                         */}
      {/* ============================================================ */}
      <Section
        id="hnsw"
        number="09"
        title="Deep dive : comment les vector stores sont rapides (HNSW)"
      >
        <p>
          On a dit que les vector stores trouvent les vecteurs les plus proches
          en millisecondes, meme sur des millions de documents. Mais comment ?
          La recherche brute (comparer chaque vecteur un par un) est en O(n) —
          avec 10 millions de vecteurs de 1536 dimensions, ca prend des
          secondes. La reponse : <strong>HNSW</strong>.
        </p>

        <KeyConcept title="HNSW — Hierarchical Navigable Small World">
          <p>
            HNSW est l&apos;algorithme de recherche approximative (ANN) utilise
            par Pinecone, pgvector, Chroma, Weaviate, et quasiment tous les
            vector stores modernes. Il construit un graphe multi-couches ou
            chaque noeud est un vecteur, et la recherche se fait par navigation
            gloutonne dans ce graphe — pas besoin de tout scanner.
          </p>
        </KeyConcept>

        <p>
          L&apos;idee vient des <Term def="Reseaux ou chaque noeud est connecte a quelques voisins proches, mais certaines connexions 'longue distance' permettent de traverser le graphe en peu de sauts — comme les 6 degres de separation.">reseaux petit monde (Small World)</Term>.
          Pense a un reseau social : tu connais tes voisins (connexions locales),
          mais tu as aussi quelques amis lointains (connexions longue distance).
          Pour trouver quelqu&apos;un, tu demandes a tes amis, qui demandent a
          leurs amis — en quelques sauts, tu trouves.
        </p>

        <SvgDiagram width={660} height={380} title="Structure HNSW -- graphe multi-couches">
          {/* ---- Layer 2 ---- */}
          <GroupBox x={40} y={10} w={580} h={80} label="Layer 2 (peu de noeuds, sauts longs)" color="violet" />
          <Box x={80} y={40} w={60} h={30} label="A" color="violet" />
          <Box x={480} y={40} w={60} h={30} label="F" color="violet" />
          <Arrow x1={140} y1={55} x2={480} y2={55} dashed color="#8b5cf6" />
          {/* ---- Layer 1 ---- */}
          <GroupBox x={40} y={110} w={580} h={80} label="Layer 1 (plus de noeuds, connexions moyennes)" color="cyan" />
          <Box x={60} y={140} w={50} h={28} label="A" color="cyan" />
          <Box x={170} y={140} w={50} h={28} label="C" color="cyan" />
          <Box x={280} y={140} w={50} h={28} label="E" color="cyan" />
          <Box x={390} y={140} w={50} h={28} label="F" color="cyan" />
          <Box x={500} y={140} w={50} h={28} label="H" color="cyan" />
          <Arrow x1={110} y1={154} x2={170} y2={154} />
          <Arrow x1={220} y1={154} x2={280} y2={154} />
          <Arrow x1={330} y1={154} x2={390} y2={154} />
          <Arrow x1={440} y1={154} x2={500} y2={154} />
          {/* ---- Layer 0 ---- */}
          <GroupBox x={40} y={210} w={580} h={90} label="Layer 0 (tous les noeuds, connexions courtes)" color="accent" />
          <Box x={50} y={240} w={40} h={24} label="A" color="accent" />
          <Box x={100} y={240} w={40} h={24} label="B" color="accent" />
          <Box x={150} y={240} w={40} h={24} label="C" color="accent" />
          <Box x={200} y={240} w={40} h={24} label="D" color="accent" />
          <Box x={250} y={240} w={40} h={24} label="E" color="accent" />
          <Box x={300} y={240} w={40} h={24} label="F" color="accent" />
          <Box x={350} y={240} w={40} h={24} label="G" color="accent" />
          <Box x={400} y={240} w={40} h={24} label="H" color="accent" />
          <Box x={450} y={240} w={40} h={24} label="I" color="accent" />
          <Box x={500} y={240} w={40} h={24} label="J" color="accent" />
          <Box x={550} y={240} w={40} h={24} label="K" color="accent" />
          {/* Descent arrows between layers */}
          <Arrow x1={110} y1={90} x2={85} y2={140} dashed color="#a1a1aa" />
          <Arrow x1={510} y1={90} x2={415} y2={140} dashed color="#a1a1aa" />
          <Arrow x1={85} y1={168} x2={70} y2={240} dashed color="#a1a1aa" />
          <Arrow x1={415} y1={168} x2={320} y2={240} dashed color="#a1a1aa" />
          {/* Caption */}
          <Label x={330} y={330} text="Recherche : entrer par Layer 2, descendre couche par couche" size={11} color="#a1a1aa" />
          <Label x={330} y={350} text="en se rapprochant du vecteur cible a chaque etape" size={11} color="#a1a1aa" />
        </SvgDiagram>

        <Steps>
          <Step number="1" title="Construction du graphe">
            <p>
              Quand tu inseres un vecteur, HNSW le place dans le layer 0 (toujours)
              et le connecte a ses M plus proches voisins. Avec une probabilite
              decroissante, il est aussi insere dans les layers superieurs. Les
              layers hauts ont peu de noeuds mais des connexions longue distance.
            </p>
          </Step>
          <Step number="2" title="Recherche gloutonne (greedy search)">
            <p>
              Pour trouver les K plus proches voisins d&apos;un vecteur requete :
              on commence au layer le plus haut, on saute au noeud le plus proche
              de la requete, on descend d&apos;un layer, on repete. Au layer 0,
              on explore les voisins locaux pour affiner. C&apos;est du <strong>O(log n)</strong> au
              lieu de O(n).
            </p>
          </Step>
          <Step number="3" title="Pourquoi c'est approximatif">
            <p>
              HNSW ne garantit pas de trouver LE plus proche voisin — il peut
              rater un vecteur isole. En pratique, avec un bon parametre{" "}
              <code>ef</code> (nombre de candidats explores), le recall est
              &gt;99%. C&apos;est &quot;presque exact&quot; mais 1000x plus rapide.
            </p>
          </Step>
        </Steps>

        <ComparisonTable
          headers={["Methode", "Complexite", "10M vecteurs (1536d)", "Recall"]}
          rows={[
            ["Brute force (exact)", "O(n)", "~5-10 secondes", "100%"],
            ["HNSW (approximatif)", "O(log n)", "~1-5 millisecondes", ">99%"],
            ["IVF (inverted file)", "O(n/k)", "~10-50 millisecondes", "~95-98%"],
          ]}
        />

        <Code language="python — construire un index HNSW from scratch (simplifie)">{`import numpy as np
import heapq
from collections import defaultdict

class SimpleHNSW:
    """HNSW simplifie pour comprendre le principe.
    En prod, utiliser hnswlib ou faiss."""

    def __init__(self, dim: int, M: int = 16, ef: int = 50, max_layers: int = 4):
        self.dim = dim
        self.M = M          # nombre max de connexions par noeud
        self.ef = ef         # nombre de candidats explores pendant la recherche
        self.max_layers = max_layers
        self.graphs = [defaultdict(set) for _ in range(max_layers)]  # un graphe par layer
        self.vectors = {}    # id → vecteur
        self.entry_point = None

    def _cosine_sim(self, a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

    def _random_layer(self) -> int:
        """Chaque vecteur a une probabilite decroissante d'etre dans les layers hauts."""
        level = 0
        while np.random.random() < 0.5 and level < self.max_layers - 1:
            level += 1
        return level

    def insert(self, vec_id: int, vector: np.ndarray):
        self.vectors[vec_id] = vector
        level = self._random_layer()

        if self.entry_point is None:
            self.entry_point = vec_id
            return

        # Phase 1 : descendre des layers hauts en mode greedy
        current = self.entry_point
        for layer in range(self.max_layers - 1, level, -1):
            current = self._greedy_closest(vector, current, layer)

        # Phase 2 : inserer dans chaque layer de 'level' a 0
        for layer in range(level, -1, -1):
            neighbors = self._search_layer(vector, current, self.ef, layer)
            # Garder les M plus proches
            closest = sorted(neighbors, key=lambda x: -self._cosine_sim(vector, self.vectors[x]))[:self.M]
            for neighbor in closest:
                self.graphs[layer][vec_id].add(neighbor)
                self.graphs[layer][neighbor].add(vec_id)
            if closest:
                current = closest[0]

    def _greedy_closest(self, query, start, layer):
        """Avance gloutonnement vers le plus proche dans un layer."""
        current = start
        while True:
            best = current
            best_sim = self._cosine_sim(query, self.vectors[current])
            for neighbor in self.graphs[layer].get(current, []):
                sim = self._cosine_sim(query, self.vectors[neighbor])
                if sim > best_sim:
                    best_sim = sim
                    best = neighbor
            if best == current:
                break  # pas de voisin plus proche → on a converge
            current = best
        return current

    def _search_layer(self, query, start, ef, layer):
        """Recherche les ef meilleurs candidats dans un layer."""
        visited = {start}
        candidates = [(-self._cosine_sim(query, self.vectors[start]), start)]
        results = list(candidates)
        heapq.heapify(candidates)
        heapq.heapify(results)

        while candidates:
            _, current = heapq.heappop(candidates)
            for neighbor in self.graphs[layer].get(current, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    sim = self._cosine_sim(query, self.vectors[neighbor])
                    heapq.heappush(candidates, (-sim, neighbor))
                    heapq.heappush(results, (-sim, neighbor))
        return [idx for _, idx in sorted(results)[:ef]]

    def search(self, query: np.ndarray, k: int = 5):
        """Recherche les k plus proches voisins."""
        current = self.entry_point
        # Descendre des layers hauts
        for layer in range(self.max_layers - 1, 0, -1):
            current = self._greedy_closest(query, current, layer)
        # Recherche fine au layer 0
        candidates = self._search_layer(query, current, self.ef, 0)
        # Trier par similarite et garder les k meilleurs
        scored = [(self._cosine_sim(query, self.vectors[c]), c) for c in candidates]
        scored.sort(reverse=True)
        return scored[:k]

# ── Utilisation ──
index = SimpleHNSW(dim=384, M=16)
# Inserer 10 000 vecteurs
for i in range(10_000):
    vec = np.random.randn(384).astype(np.float32)
    index.insert(i, vec)

# Rechercher
query = np.random.randn(384).astype(np.float32)
results = index.search(query, k=5)
for score, idx in results:
    print(f"  ID {idx}: similarite = {score:.4f}")
# → Trouve les 5 plus proches en quelques ms au lieu de scanner les 10 000`}</Code>

        <Warning>
          <p>
            <strong>Ce code est pedagogique.</strong> En production, utilise{" "}
            <code>hnswlib</code> (C++ avec bindings Python, ultra-rapide) ou{" "}
            <code>faiss</code> (Facebook, supporte GPU). Le principe est
            identique, mais les implementations optimisees sont 100-1000x plus
            rapides que ce Python.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 10. DEEP DIVE : BM25                                         */}
      {/* ============================================================ */}
      <Section
        id="bm25"
        number="10"
        title="Deep dive : BM25 — les maths derriere la recherche par mots-cles"
      >
        <p>
          On a vu que la <strong>hybrid search</strong> combine recherche
          vectorielle + recherche par mots-cles (BM25). Mais c&apos;est quoi
          BM25 exactement ? C&apos;est l&apos;algorithme utilise par
          Elasticsearch, Lucene, et la plupart des moteurs de recherche texte.
        </p>

        <KeyConcept title="BM25 — Best Matching 25">
          <p>
            BM25 est une fonction de scoring qui mesure la pertinence d&apos;un
            document par rapport a une requete textuelle. C&apos;est une version
            amelioree de TF-IDF qui corrige deux problemes : la saturation du
            term frequency et le biais envers les documents longs.
          </p>
        </KeyConcept>

        <p>La formule BM25 pour scorer un document D par rapport a une requete Q :</p>

        <Code language="mathematiques — formule BM25">{`Score(D, Q) = Σ  IDF(qi) × [ TF(qi, D) × (k1 + 1) ]
              i              ─────────────────────────────────
                             TF(qi, D) + k1 × (1 - b + b × |D|/avgDL)

Ou :
  qi       = le i-eme mot de la requete Q
  TF(qi,D) = nombre d'occurrences du mot qi dans le document D
  IDF(qi)  = log((N - n(qi) + 0.5) / (n(qi) + 0.5) + 1)
             N     = nombre total de documents
             n(qi) = nombre de documents contenant qi
  |D|      = longueur du document D (en mots)
  avgDL    = longueur moyenne des documents du corpus
  k1       = parametre de saturation (typiquement 1.2 - 2.0)
  b        = parametre de normalisation par longueur (typiquement 0.75)

Intuitions :
  - IDF : un mot rare (present dans peu de docs) a plus de poids
    → "PDL" dans une FAQ energie est plus informatif que "le"
  - TF saturee : la 1ere occurrence d'un mot compte beaucoup,
    la 10eme beaucoup moins (contrairement a TF-IDF classique)
  - Normalisation par longueur : un doc court qui contient le mot
    est plus pertinent qu'un doc long qui le contient par hasard`}</Code>

        <Code language="python — BM25 from scratch avec numpy">{`import numpy as np
from collections import Counter
import math

class BM25:
    def __init__(self, documents: list[str], k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.documents = documents
        self.N = len(documents)

        # Tokeniser (en prod, utiliser un vrai tokenizer)
        self.doc_tokens = [doc.lower().split() for doc in documents]
        self.doc_lengths = [len(tokens) for tokens in self.doc_tokens]
        self.avgDL = sum(self.doc_lengths) / self.N

        # Term frequencies par document
        self.doc_tf = [Counter(tokens) for tokens in self.doc_tokens]

        # Document frequencies (combien de docs contiennent chaque mot)
        self.df = Counter()
        for tokens in self.doc_tokens:
            for token in set(tokens):
                self.df[token] += 1

    def _idf(self, term: str) -> float:
        """Inverse Document Frequency — les mots rares pesent plus."""
        n = self.df.get(term, 0)
        return math.log((self.N - n + 0.5) / (n + 0.5) + 1)

    def score(self, query: str) -> list[tuple[float, int, str]]:
        """Score chaque document par rapport a la requete."""
        query_terms = query.lower().split()
        scores = []

        for idx in range(self.N):
            doc_score = 0.0
            for term in query_terms:
                tf = self.doc_tf[idx].get(term, 0)
                idf = self._idf(term)

                # La formule BM25 :
                numerator = tf * (self.k1 + 1)
                denominator = tf + self.k1 * (1 - self.b + self.b * self.doc_lengths[idx] / self.avgDL)
                doc_score += idf * (numerator / denominator)

            scores.append((doc_score, idx, self.documents[idx]))

        return sorted(scores, reverse=True)

# ── Utilisation ──
corpus = [
    "Comment changer de fournisseur d'electricite en France",
    "Le numero PDL identifie votre compteur electrique",
    "Les tarifs reglementes changent en fevrier et aout",
    "Pour souscrire il faut un RIB et le numero PDL",
    "Enedis gere le reseau electrique de distribution",
]

bm25 = BM25(corpus)
results = bm25.score("numero PDL compteur")

print("Requete : 'numero PDL compteur'")
for score, idx, text in results[:3]:
    print(f"  Score {score:.3f} : {text}")

# → Score 2.841 : Le numero PDL identifie votre compteur electrique
# → Score 1.203 : Pour souscrire il faut un RIB et le numero PDL
# → Score 0.000 : Comment changer de fournisseur...`}</Code>

        <Analogy>
          <p>
            BM25, c&apos;est comme un index au dos d&apos;un livre. Tu cherches
            un mot precis, l&apos;index te dit les pages ou il apparait. Les
            mots rares (comme &quot;PDL&quot;) pointent vers peu de pages — donc
            ils sont plus utiles pour trouver la bonne. Les mots courants
            (comme &quot;le&quot;) apparaissent partout et ne servent a rien
            pour la recherche.
          </p>
        </Analogy>
      </Section>

      {/* ============================================================ */}
      {/* 11. CONSTRUIRE UN VECTOR INDEX FROM SCRATCH                   */}
      {/* ============================================================ */}
      <Section
        id="vector-index-scratch"
        number="11"
        title="Construire un vector index from scratch (numpy only)"
      >
        <p>
          Pour vraiment comprendre comment marche un vector store, construisons
          un index complet avec uniquement numpy — pas de librairie vectorielle,
          juste les maths.
        </p>

        <Code language="python — vector index complet, numpy only">{`import numpy as np
from dataclasses import dataclass

@dataclass
class SearchResult:
    text: str
    score: float
    metadata: dict

class NumpyVectorIndex:
    """Vector index minimaliste. Pas de HNSW — juste brute-force
    optimise avec les operations matricielles de numpy."""

    def __init__(self, dimension: int):
        self.dimension = dimension
        self.vectors = []      # liste de vecteurs
        self.documents = []    # textes associes
        self.metadata = []     # metadonnees

    def add(self, text: str, vector: np.ndarray, metadata: dict = {}):
        """Ajouter un document a l'index."""
        assert vector.shape == (self.dimension,), f"Attendu {self.dimension}d, recu {vector.shape}"
        # Normaliser pour que cosine similarity = dot product
        normalized = vector / np.linalg.norm(vector)
        self.vectors.append(normalized)
        self.documents.append(text)
        self.metadata.append(metadata)

    def _build_matrix(self) -> np.ndarray:
        """Empiler tous les vecteurs en une matrice (N x dim)."""
        return np.stack(self.vectors)  # shape: (N, dim)

    def search(self, query_vector: np.ndarray, k: int = 5) -> list[SearchResult]:
        """Recherche les k documents les plus proches.

        Astuce : si les vecteurs sont normalises, cosine_similarity = dot product.
        Et numpy calcule N dot products en une seule operation matricielle.
        """
        # Normaliser la requete
        query_norm = query_vector / np.linalg.norm(query_vector)

        # Matrice de tous les vecteurs : (N, dim)
        matrix = self._build_matrix()

        # Cosine similarity = dot product (vecteurs normalises)
        # matrix @ query_norm donne un score pour CHAQUE document en une operation
        scores = matrix @ query_norm  # shape: (N,)

        # Les k meilleurs indices
        top_k_indices = np.argpartition(scores, -k)[-k:]  # O(n) au lieu de O(n log n)
        top_k_indices = top_k_indices[np.argsort(scores[top_k_indices])[::-1]]  # trier

        return [
            SearchResult(
                text=self.documents[i],
                score=float(scores[i]),
                metadata=self.metadata[i],
            )
            for i in top_k_indices
        ]

# ── Pipeline complet : embeddings → index → recherche ──
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")  # 384 dimensions

# Documents a indexer
docs = [
    ("Comment changer de fournisseur d'electricite ?",
     {"source": "FAQ", "category": "changement"}),
    ("Le tarif reglemente change en fevrier et aout.",
     {"source": "FAQ", "category": "tarifs"}),
    ("Le numero PDL est un identifiant a 14 chiffres.",
     {"source": "FAQ", "category": "technique"}),
    ("Pour souscrire, vous avez besoin d'un RIB.",
     {"source": "FAQ", "category": "souscription"}),
    ("EDF propose le tarif Bleu, le tarif reglemente.",
     {"source": "FAQ", "category": "tarifs"}),
]

# Construire l'index
index = NumpyVectorIndex(dimension=384)
texts = [text for text, _ in docs]
embeddings = model.encode(texts)  # batch encoding, shape (5, 384)

for (text, meta), embedding in zip(docs, embeddings):
    index.add(text, embedding, meta)

# Rechercher
query = "je veux payer moins cher mon electricite"
query_vec = model.encode(query)  # shape (384,)

results = index.search(query_vec, k=3)
for r in results:
    print(f"  [{r.score:.3f}] {r.text}")
    print(f"          source={r.metadata['source']}, cat={r.metadata['category']}")

# Output :
#   [0.612] EDF propose le tarif Bleu, le tarif reglemente.
#   [0.583] Le tarif reglemente change en fevrier et aout.
#   [0.441] Comment changer de fournisseur d'electricite ?`}</Code>

        <KeyConcept title="L'astuce des vecteurs normalises">
          <p>
            Si tu normalises tes vecteurs (divise par la norme L2), alors la
            similarite cosinus devient un simple <strong>produit scalaire</strong>.
            Et numpy calcule N produits scalaires en une seule multiplication
            matricielle. C&apos;est pour ca que meme la recherche brute est rapide
            avec numpy — 10 000 vecteurs de 1536 dimensions se scannent en &lt;10ms.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Taille du corpus", "Recherche brute (numpy)", "HNSW (hnswlib)"]}
          rows={[
            ["1 000 docs", "< 1ms", "< 0.1ms"],
            ["10 000 docs", "~5ms", "< 0.5ms"],
            ["100 000 docs", "~50ms", "< 1ms"],
            ["1 000 000 docs", "~500ms (trop lent)", "~2ms"],
            ["10 000 000 docs", "~5s (inutilisable)", "~5ms"],
          ]}
        />

        <Warning>
          <p>
            <strong>Conclusion :</strong> pour un prototype ou un petit corpus
            (&lt;50 000 docs), la recherche brute numpy est parfaitement
            viable et bien plus simple a debugger. Au-dela, HNSW est
            indispensable — et c&apos;est ce que font tous les vector stores.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 12. QUIZ FINAL                                               */}
      {/* ============================================================ */}
      <Section id="quiz-final" number="12" title="Quiz final">
        <Quiz
          question="Quel est l'ordre correct du pipeline RAG ?"
          options={[
            "Generation → Retrieval → Augmentation",
            "Chunking → Embedding → Stockage → Recherche → Injection dans le prompt → Generation",
            "Embedding → Fine-tuning → Generation",
            "Question → LLM → Recherche → Reponse",
          ]}
          answer={1}
          explanation="Le RAG suit cet ordre : d'abord on prepare la base (chunking → embedding → stockage), puis a chaque question on cherche les documents pertinents (retrieval), on les injecte dans le prompt (augmentation), et le LLM genere sa reponse (generation)."
        />

        <Quiz
          question="Pour l'agent Selectra, pourquoi utiliser le RAG pour les tarifs plutot que de les mettre dans le system prompt ?"
          options={[
            "Le RAG est plus rapide",
            "Les tarifs changent regulierement — la base RAG peut etre mise a jour sans changer le prompt ni redeployer",
            "Le system prompt ne supporte pas les chiffres",
            "Le RAG est gratuit",
          ]}
          answer={1}
          explanation="Les tarifs d'energie changent chaque mois (voire chaque jour). Avec le RAG, tu mets a jour la base de connaissances sans toucher au code ni redeployer. Avec un system prompt hardcode, tu dois modifier et redeployer a chaque changement de prix."
        />

        <Quiz
          question="Un chunk de 2000 tokens avec des sujets melanges, c'est un probleme. Pourquoi ?"
          options={[
            "Ca coute trop cher en stockage",
            "Le vecteur sera trop generique — il matchera vaguement avec plein de questions sans etre vraiment pertinent pour aucune",
            "Le modele d'embedding ne supporte pas 2000 tokens",
            "Ca ralentit la recherche",
          ]}
          answer={1}
          explanation="Un chunk qui parle de 5 sujets differents aura un embedding 'moyen' qui ne represente bien aucun des 5 sujets. Il matchera faiblement avec plein de questions sans etre le meilleur resultat pour aucune. Des chunks plus petits et thematiquement coherents sont bien plus efficaces."
        />

        <div className="mt-12 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
          <p className="mb-2 text-lg font-semibold text-emerald-400">
            Module 03 termine
          </p>
          <p className="text-sm text-muted-foreground">
            Tu sais maintenant comment fonctionne le RAG de bout en bout :
            embeddings, chunking, vector stores, similarity search, et comment
            l&apos;integrer dans un agent vocal. Prochain module : Tool Calling
            &amp; Agents — quand le LLM agit dans le monde reel.
          </p>
        </div>
      </Section>
    </>
  );
}
