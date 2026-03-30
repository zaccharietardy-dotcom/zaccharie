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

export function Agents() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. POURQUOI LES AGENTS                                       */}
      {/* ============================================================ */}
      <Section id="pourquoi" number="01" title="Du chatbot a l'agent">
        <p>
          Jusqu&apos;ici, le LLM fait une seule chose : generer du texte. Il
          peut repondre a des questions, mais il ne peut pas <em>agir</em>.
          Il ne peut pas envoyer un email, chercher sur le web, ni appeler
          une API de comparaison d&apos;offres.
        </p>

        <KeyConcept title="Tool calling = le LLM qui agit">
          <p>
            Le tool calling permet au LLM de <strong>decider</strong> d&apos;appeler
            une fonction que TU as definie. Le modele ne l&apos;execute pas
            lui-meme — il produit un JSON &quot;appelle cette fonction avec ces
            parametres&quot;, et ton code l&apos;execute.
          </p>
        </KeyConcept>

        <Analogy>
          <p>
            Imagine un medecin. Il peut diagnostiquer (= raisonner), mais pour
            soigner il a besoin d&apos;outils : un stethoscope, un scanner, un
            scalpel. Le LLM, c&apos;est le medecin. Les tools, ce sont ses
            instruments. Sans outils, il ne peut que parler. Avec des outils, il
            peut agir.
          </p>
        </Analogy>

        <Diagram title="Chatbot vs Agent">
          <pre className="text-center">{`
  CHATBOT (sans tools)            AGENT (avec tools)
  ──────────────────              ─────────────────
  User → LLM → Texte             User → LLM → "je dois chercher"
                                              → [appel outil: search]
                                              → resultats
                                              → LLM → "je dois calculer"
                                              → [appel outil: calculate]
                                              → resultat
                                              → LLM → Reponse finale
`}</pre>
        </Diagram>
      </Section>

      {/* ============================================================ */}
      {/* 2. TOOL CALLING                                              */}
      {/* ============================================================ */}
      <Section
        id="tool-calling"
        number="02"
        title="Tool calling — donner des outils au LLM"
      >
        <p>
          Voici comment ca marche concretement avec le Vercel AI SDK.
        </p>

        <Steps>
          <Step number="1" title="Tu definis les outils disponibles">
            <p>
              Chaque outil a un nom, une description (pour que le LLM sache
              quand l&apos;utiliser), un schema d&apos;entree (Zod), et une
              fonction d&apos;execution.
            </p>
          </Step>
          <Step number="2" title="Le LLM decide d'appeler un outil">
            <p>
              En se basant sur la description de l&apos;outil et le contexte
              de la conversation, le LLM produit un &quot;tool call&quot; : le
              nom de l&apos;outil + les parametres.
            </p>
          </Step>
          <Step number="3" title="Ton code execute l'outil">
            <p>
              Le SDK intercepte le tool call, execute ta fonction, et renvoie le
              resultat au LLM.
            </p>
          </Step>
          <Step number="4" title="Le LLM integre le resultat">
            <p>
              Le LLM recoit le resultat de l&apos;outil et genere sa reponse
              finale en l&apos;integrant.
            </p>
          </Step>
        </Steps>

        <Code language="typescript — tool calling basique">{`import { generateText, tool } from "ai";
import { z } from "zod";

const result = await generateText({
  model: "anthropic/claude-sonnet-4.6",
  tools: {
    comparerOffres: tool({
      description: "Compare les offres d'electricite pour une adresse et une consommation donnees",
      inputSchema: z.object({
        codePostal: z.string().describe("Code postal du logement"),
        consommationKwh: z.number().describe("Consommation annuelle en kWh"),
        type: z.enum(["electricite", "gaz"]).describe("Type d'energie"),
      }),
      execute: async ({ codePostal, consommationKwh, type }) => {
        // En prod, ca appelle une vraie API
        return {
          offres: [
            { fournisseur: "TotalEnergies", prix: 0.19, abonnement: 12, total: consommationKwh * 0.19 + 144 },
            { fournisseur: "Engie", prix: 0.21, abonnement: 10, total: consommationKwh * 0.21 + 120 },
            { fournisseur: "EDF", prix: 0.22, abonnement: 11, total: consommationKwh * 0.22 + 132 },
          ]
        };
      },
    }),
  },
  prompt: "Je consomme 6000 kWh par an et j'habite a Lyon (69000). Quelle est la meilleure offre d'electricite ?",
});

// Le LLM va :
// 1. Voir qu'il a un outil "comparerOffres" qui correspond au besoin
// 2. L'appeler avec { codePostal: "69000", consommationKwh: 6000, type: "electricite" }
// 3. Recevoir les 3 offres
// 4. Presenter la meilleure au client`}</Code>

        <KeyConcept title="inputSchema et description sont CRITIQUES">
          <p>
            Le LLM decide d&apos;utiliser un outil en lisant sa{" "}
            <strong>description</strong>. Si ta description est vague, il ne
            saura pas quand l&apos;appeler. Le <strong>inputSchema</strong> Zod
            garantit que les parametres sont du bon type. Utilise{" "}
            <code>.describe()</code> sur chaque champ pour guider le LLM.
          </p>
        </KeyConcept>

        <Warning>
          <p>
            <strong>Le LLM ne peut PAS executer de code.</strong> Il ne fait que
            produire un JSON structuré &quot;appelle cette fonction avec ces
            params&quot;. C&apos;est TON code qui execute. Ca signifie que tu
            controles totalement ce qui se passe — le LLM ne peut pas faire
            quelque chose que tu n&apos;as pas prevu.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 3. LA BOUCLE AGENT                                           */}
      {/* ============================================================ */}
      <Section
        id="boucle-agent"
        number="03"
        title="La boucle agent : reflexion → action → observation"
      >
        <p>
          Un agent, c&apos;est un LLM qui peut appeler des outils{" "}
          <strong>en boucle</strong> jusqu&apos;a ce qu&apos;il ait assez
          d&apos;information pour repondre. C&apos;est la difference entre un
          tool call unique et un vrai agent.
        </p>

        <Diagram title="Boucle agent (ReAct pattern)">
          <pre className="text-center">{`
          ┌─────────────────────────────┐
          │                             │
          ▼                             │
  [ REFLEXION ]                         │
  "De quoi ai-je besoin ?"              │
          |                             │
  [ ACTION ]                            │
  Appeler un outil                      │
          |                             │
  [ OBSERVATION ]                       │
  Lire le resultat                      │
          |                             │
  Ai-je assez d'info ? ──── NON ────────┘
          |
         OUI
          |
  [ REPONSE FINALE ]
`}</pre>
        </Diagram>

        <p>Exemple concret pour Selectra :</p>

        <Code language="boucle agent — scenario Selectra">{`Client: "J'habite au 12 rue de la Paix a Paris, je veux changer de fournisseur"

── Step 1 (Reflexion) ──
Agent: Je dois d'abord trouver le numero PDL de cette adresse.

── Step 1 (Action) ──
→ Tool call: chercherPDL({ adresse: "12 rue de la Paix, 75002 Paris" })

── Step 1 (Observation) ──
← Resultat: { pdl: "09876543210987", puissance: 6, compteur: "Linky" }

── Step 2 (Reflexion) ──
Agent: J'ai le PDL. Maintenant j'ai besoin de la consommation pour comparer.
Le client ne me l'a pas dit. Je vais estimer avec la puissance.

── Step 2 (Action) ──
→ Tool call: estimerConsommation({ puissance: 6, type: "appartement", ville: "Paris" })

── Step 2 (Observation) ──
← Resultat: { estimationKwh: 5500 }

── Step 3 (Reflexion) ──
Agent: J'ai le PDL et la conso. Je peux comparer les offres.

── Step 3 (Action) ──
→ Tool call: comparerOffres({ codePostal: "75002", consommationKwh: 5500, type: "electricite" })

── Step 3 (Observation) ──
← Resultat: { offres: [...] }

── Step 4 (Reponse finale) ──
Agent: "Voici les 3 meilleures offres pour votre logement au 12 rue de la Paix..."`}</Code>

        <p>
          L&apos;agent a fait 3 appels d&apos;outils <strong>de sa propre
          initiative</strong>, chacun base sur le resultat du precedent.
          C&apos;est ca la puissance de la boucle agent.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 4. AI SDK AGENT CLASS                                        */}
      {/* ============================================================ */}
      <Section
        id="agent-class"
        number="04"
        title="L'Agent class du AI SDK"
      >
        <p>
          Le Vercel AI SDK fournit une classe <code>Agent</code> qui gere la
          boucle automatiquement. Plus besoin d&apos;ecrire la boucle
          manuellement.
        </p>

        <Code language="typescript — Agent class">{`import { Agent, tool, stepCountIs } from "ai";
import { z } from "zod";

const selectraAgent = new Agent({
  model: "anthropic/claude-sonnet-4.6",
  instructions: \`Tu es l'agent de qualification Selectra.
    Tu collectes les informations du client et cherches les meilleures offres.
    Utilise les outils disponibles pour trouver le PDL, estimer la conso, et comparer les offres.
    Pose UNE question a la fois au client.\`,
  tools: {
    chercherPDL: tool({
      description: "Recherche le numero PDL a partir d'une adresse",
      inputSchema: z.object({
        adresse: z.string().describe("Adresse complete du logement"),
      }),
      execute: async ({ adresse }) => {
        // Appel API Enedis/Grdf
        return { pdl: "09876543210987", puissance: 6 };
      },
    }),
    comparerOffres: tool({
      description: "Compare les offres d'energie pour un client",
      inputSchema: z.object({
        codePostal: z.string(),
        consommationKwh: z.number(),
      }),
      execute: async ({ codePostal, consommationKwh }) => {
        // Appel API comparateur Selectra
        return { offres: [/* ... */] };
      },
    }),
    transfererConseiller: tool({
      description: "Transfere le client a un conseiller humain avec les infos collectees",
      inputSchema: z.object({
        ficheClient: z.object({
          nom: z.string().optional(),
          adresse: z.string(),
          pdl: z.string(),
          intent: z.string(),
          offresProposees: z.array(z.string()),
        }),
      }),
      execute: async ({ ficheClient }) => {
        // Envoie la fiche au CRM
        return { status: "transfert_en_cours", conseiller: "Marie D." };
      },
    }),
  },
});

// Utilisation
const result = await selectraAgent.generate({
  prompt: "Bonjour, je demenage au 42 rue Victor Hugo a Lyon",
  stopWhen: stepCountIs(10), // max 10 etapes
});`}</Code>

        <ComparisonTable
          headers={["Concept", "Avant (manuel)", "Avec Agent class"]}
          rows={[
            ["Boucle", "While loop que tu ecris toi-meme", "Geree automatiquement"],
            ["Condition d'arret", "if (pas de tool call) break", "stopWhen: stepCountIs(N)"],
            ["System prompt", "Dans streamText()", "instructions: dans le constructeur"],
            ["Streaming", "streamText() + gestion manuelle", "agent.stream()"],
          ]}
        />

        <KeyConcept title="stopWhen — controler la boucle">
          <p>
            <code>stopWhen: stepCountIs(10)</code> limite l&apos;agent a 10
            etapes maximum. Sans ca, un agent mal configure pourrait boucler
            indefiniment. C&apos;est un guardrail essentiel.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 5. MCP                                                       */}
      {/* ============================================================ */}
      <Section
        id="mcp"
        number="05"
        title="MCP — le protocole universel pour les outils"
      >
        <p>
          Jusqu&apos;ici, tu definis tes outils dans le code. Mais imagine que
          tu veux donner a ton agent acces a 50 outils provenant de services
          differents (Slack, Google Calendar, CRM, etc.). Definir chaque tool
          manuellement, c&apos;est penible.
        </p>

        <KeyConcept title="Model Context Protocol (MCP)">
          <p>
            <Term def="Protocole ouvert (cree par Anthropic) qui standardise la connexion entre un LLM et des services externes. Un serveur MCP expose des outils que n'importe quel client MCP peut utiliser. C'est le 'USB-C' des outils IA.">MCP</Term>{" "}
            est un protocole standard qui permet a un agent de se connecter a
            des serveurs d&apos;outils. Chaque serveur MCP expose des outils
            avec leur schema, et l&apos;agent peut les utiliser sans que tu aies
            a ecrire les definitions manuellement.
          </p>
        </KeyConcept>

        <Diagram title="Architecture MCP">
          <pre className="text-center">{`
  ┌──────────────┐     ┌──────────────────┐
  │  Ton Agent   │────▶│ MCP Server: CRM  │
  │  (AI SDK)    │     │ - getClient()    │
  │              │     │ - updateFiche()  │
  │              │     └──────────────────┘
  │              │
  │              │     ┌──────────────────┐
  │              │────▶│ MCP Server: Slack│
  │              │     │ - sendMessage()  │
  │              │     │ - getChannel()   │
  │              │     └──────────────────┘
  │              │
  │              │     ┌──────────────────┐
  │              │────▶│ MCP Server: Vercel│
  │              │     │ - listDeploys()  │
  └──────────────┘     └──────────────────┘

  L'agent peut utiliser les outils de
  TOUS les serveurs connectes.
`}</pre>
        </Diagram>

        <Analogy>
          <p>
            MCP, c&apos;est comme l&apos;USB-C. Avant, chaque peripherique avait
            son propre cable. Maintenant, un seul connecteur pour tout. MCP fait
            pareil pour les outils IA : un seul protocole pour connecter
            n&apos;importe quel service a n&apos;importe quel agent.
          </p>
        </Analogy>

        <p>
          Pour Selectra, tu pourrais imaginer un serveur MCP qui expose les
          outils du CRM interne : recherche client, mise a jour fiche, historique
          des appels, etc. L&apos;agent vocal s&apos;y connecte et a acces a
          tout sans code supplementaire.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 6. PATTERNS D'AGENTS                                         */}
      {/* ============================================================ */}
      <Section
        id="patterns"
        number="06"
        title="Patterns d'agents en production"
      >
        <ComparisonTable
          headers={["Pattern", "Description", "Cas d'usage Selectra"]}
          rows={[
            [
              "Router",
              "L'agent detecte l'intent et route vers le bon sous-agent",
              "Intent classifier → agent nouveau_logement OU agent changement OU agent suivi",
            ],
            [
              "Sequential",
              "Les etapes s'executent dans l'ordre",
              "Qualification → Comparaison → Presentation → Transfert",
            ],
            [
              "Parallel",
              "Plusieurs outils appeles en parallele",
              "Chercher PDL + estimer conso en meme temps",
            ],
            [
              "Human-in-the-loop",
              "L'agent demande validation avant d'agir",
              "\"Je vous transfère à un conseiller. C'est OK ?\"",
            ],
          ]}
        />

        <Warning>
          <p>
            <strong>L&apos;agent Selectra en production utiliserait le
            pattern Router + Sequential :</strong> d&apos;abord un LLM leger
            (GPT-4o mini, Haiku) classifie l&apos;intent rapidement, puis un
            agent specialise prend le relais pour la qualification. Ca reduit la
            latence et le cout.
          </p>
        </Warning>

        <KeyConcept title="Agents durables (Workflow DevKit)">
          <p>
            En production, un agent peut planter en plein milieu (timeout,
            erreur reseau). Le{" "}
            <Term def="Framework Vercel qui rend les workflows durables : chaque etape est sauvegardee, et en cas de crash le workflow reprend exactement ou il s'est arrete. Essentiel pour les agents en production.">Workflow DevKit</Term>{" "}
            rend les agents <strong>durables</strong> : chaque etape est
            persistee, et en cas de crash, l&apos;agent reprend ou il en etait.
            On verra ca en detail au Module 5 avec l&apos;agent vocal.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 7. DEEP DIVE : LE PROTOCOLE TOOL CALLING                     */}
      {/* ============================================================ */}
      <Section
        id="protocol-tool-calling"
        number="07"
        title="Deep dive : comment le tool calling marche au niveau protocole"
      >
        <p>
          On a vu que le LLM &quot;decide&quot; d&apos;appeler un outil. Mais
          concretement, qu&apos;est-ce qui se passe entre le SDK et l&apos;API
          du LLM ? Voici les messages JSON bruts qui transitent.
        </p>

        <KeyConcept title="Le tool calling est du texte structure">
          <p>
            Le LLM ne &quot;sait&quot; pas qu&apos;il appelle une fonction. Il
            genere du JSON dans un format specifique que le SDK intercepte et
            execute. C&apos;est un contrat d&apos;interface entre le modele et
            ton code — rien de magique, juste du texte structure.
          </p>
        </KeyConcept>

        <p>
          Voici ce qui se passe etape par etape quand tu fais un{" "}
          <code>generateText()</code> avec des tools :
        </p>

        <Steps>
          <Step number="1" title="Ton code envoie la requete avec les definitions d'outils">
            <Code language="json — requete envoyee a l'API (Anthropic / Claude)">{`// POST https://api.anthropic.com/v1/messages
{
  "model": "claude-sonnet-4.6",
  "max_tokens": 1024,
  "system": "Tu es l'agent de qualification Selectra.",
  "tools": [
    {
      "name": "comparerOffres",
      "description": "Compare les offres d'electricite pour un client",
      "input_schema": {
        "type": "object",
        "properties": {
          "codePostal": {
            "type": "string",
            "description": "Code postal du logement"
          },
          "consommationKwh": {
            "type": "number",
            "description": "Consommation annuelle en kWh"
          }
        },
        "required": ["codePostal", "consommationKwh"]
      }
    },
    {
      "name": "chercherPDL",
      "description": "Recherche le numero PDL a partir d'une adresse",
      "input_schema": {
        "type": "object",
        "properties": {
          "adresse": {
            "type": "string",
            "description": "Adresse complete du logement"
          }
        },
        "required": ["adresse"]
      }
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": "Je consomme 6000 kWh/an a Lyon 69000, quelle offre ?"
    }
  ]
}`}</Code>
          </Step>

          <Step number="2" title="Le LLM repond avec un tool_use (tool call)">
            <Code language="json — reponse du LLM : tool_use">{`// Reponse de l'API Anthropic
{
  "id": "msg_01XFDUDYJgAACzvnptvVoYEL",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Je vais comparer les offres pour votre consommation a Lyon."
    },
    {
      "type": "tool_use",
      "id": "toolu_01A09q90qw90lq917835lq9",
      "name": "comparerOffres",
      "input": {
        "codePostal": "69000",
        "consommationKwh": 6000
      }
    }
  ],
  "stop_reason": "tool_use"
}

// NOTE: stop_reason = "tool_use", PAS "end_turn"
// Ca signifie : "j'ai besoin du resultat de cet outil avant de continuer"`}</Code>
          </Step>

          <Step number="3" title="Ton code execute l'outil et renvoie le resultat">
            <Code language="json — ton code renvoie le tool_result">{`// Tu renvoies une nouvelle requete avec le resultat :
{
  "messages": [
    // Message original du user
    {
      "role": "user",
      "content": "Je consomme 6000 kWh/an a Lyon 69000, quelle offre ?"
    },
    // Reponse de l'assistant (avec le tool_use)
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "Je vais comparer les offres pour votre consommation a Lyon."
        },
        {
          "type": "tool_use",
          "id": "toolu_01A09q90qw90lq917835lq9",
          "name": "comparerOffres",
          "input": { "codePostal": "69000", "consommationKwh": 6000 }
        }
      ]
    },
    // Le resultat de l'outil (role = "user" avec type "tool_result")
    {
      "role": "user",
      "content": [
        {
          "type": "tool_result",
          "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
          "content": "{\\\"offres\\\":[{\\\"fournisseur\\\":\\\"TotalEnergies\\\",\\\"prix\\\":0.19,\\\"total\\\":1284},{\\\"fournisseur\\\":\\\"Engie\\\",\\\"prix\\\":0.21,\\\"total\\\":1380}]}"
        }
      ]
    }
  ]
}`}</Code>
          </Step>

          <Step number="4" title="Le LLM genere la reponse finale">
            <Code language="json — reponse finale du LLM">{`{
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Voici les meilleures offres pour 6000 kWh/an a Lyon :\\n\\n1. **TotalEnergies** — 0.19€/kWh → 1 284€/an\\n2. **Engie** — 0.21€/kWh → 1 380€/an\\n\\nTotalEnergies est 96€ moins cher par an. Voulez-vous souscrire ?"
    }
  ],
  "stop_reason": "end_turn"
}

// stop_reason = "end_turn" : le LLM a fini, pas besoin d'autre outil`}</Code>
          </Step>
        </Steps>

        <Diagram title="Flux complet du tool calling">
          <pre className="text-center">{`
  TON CODE (SDK)                         API LLM
  ─────────────                          ───────
       │                                    │
       │── POST /messages ─────────────────▶│
       │   (tools[] + messages[])           │
       │                                    │
       │◀── { tool_use: comparerOffres } ──│
       │    stop_reason: "tool_use"         │
       │                                    │
  [execute comparerOffres()]                │
       │                                    │
       │── POST /messages ─────────────────▶│
       │   (+ tool_result dans messages)    │
       │                                    │
       │◀── { text: "Voici les offres..." }│
       │    stop_reason: "end_turn"         │
       │                                    │
  [afficher la reponse au user]             │
`}</pre>
        </Diagram>

        <Warning>
          <p>
            <strong>Le SDK fait tout ca pour toi.</strong> Quand tu utilises{" "}
            <code>generateText()</code> avec <code>tools</code>, le SDK gere
            automatiquement le ping-pong tool_use/tool_result. Tu n&apos;as
            jamais a construire ces JSON manuellement. Mais comprendre ce qui
            se passe sous le capot est essentiel pour debugger quand ca marche
            pas.
          </p>
        </Warning>

        <ComparisonTable
          headers={["Champ", "Anthropic (Claude)", "OpenAI (GPT)"]}
          rows={[
            ["Tool call dans la reponse", "content[].type = \"tool_use\"", "tool_calls[].function"],
            ["ID du tool call", "content[].id", "tool_calls[].id"],
            ["Parametres", "content[].input (objet)", "tool_calls[].function.arguments (string JSON)"],
            ["Resultat renvoyé", "role: \"user\", type: \"tool_result\"", "role: \"tool\", tool_call_id: ..."],
            ["Signal d'arret", "stop_reason: \"tool_use\"", "finish_reason: \"tool_calls\""],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 8. COMMENT LE LLM DECIDE QUEL OUTIL APPELER                  */}
      {/* ============================================================ */}
      <Section
        id="llm-tool-decision"
        number="08"
        title="Comment le LLM decide quel outil appeler"
      >
        <p>
          C&apos;est la question que tout le monde se pose : comment le modele
          &quot;sait&quot; qu&apos;il faut appeler <code>comparerOffres</code>{" "}
          et pas <code>chercherPDL</code> ? La reponse est plus simple
          qu&apos;on ne le pense.
        </p>

        <KeyConcept title="Les outils sont injectes dans le prompt">
          <p>
            Quand tu envoies des <code>tools</code> a l&apos;API, le provider
            (Anthropic, OpenAI) injecte les definitions d&apos;outils dans le
            system prompt du modele. Le LLM voit les noms, descriptions et
            schemas comme du texte, et il genere sa reponse en choisissant le
            bon outil par raisonnement sur ce texte.
          </p>
        </KeyConcept>

        <p>
          Concretement, voici ce que le modele &quot;voit&quot; en interne
          (simplifie — le format exact depend du provider) :
        </p>

        <Code language="ce que le modele voit dans son contexte">{`[System prompt interne — genere par le provider]

Tu as acces aux outils suivants :

## comparerOffres
Compare les offres d'electricite pour un client.
Parametres :
  - codePostal (string, requis) : Code postal du logement
  - consommationKwh (number, requis) : Consommation annuelle en kWh

## chercherPDL
Recherche le numero PDL a partir d'une adresse.
Parametres :
  - adresse (string, requis) : Adresse complete du logement

## transfererConseiller
Transfere le client a un conseiller humain.
Parametres :
  - ficheClient (object, requis) : les infos du client

Pour utiliser un outil, reponds avec un bloc tool_use.
---

[Message user]
"Je consomme 6000 kWh/an a Lyon 69000, quelle offre ?"

[Le modele raisonne]
→ Le user demande des offres. L'outil "comparerOffres" correspond.
→ Il a donne le code postal (69000) et la conso (6000).
→ Je genere un tool_use avec ces parametres.`}</Code>

        <p>
          Le modele fait du <strong>pattern matching semantique</strong> entre
          la requete du user et les descriptions d&apos;outils. C&apos;est
          pourquoi les descriptions sont critiques :
        </p>

        <ComparisonTable
          headers={["Description", "Le modele comprend", "Resultat"]}
          rows={[
            [
              "\"Compare les offres d'electricite pour un client\"",
              "Cet outil sert quand le user veut comparer des offres",
              "Appele correctement quand le user demande une comparaison",
            ],
            [
              "\"Outil de comparaison\"",
              "Comparer quoi ? Dans quel contexte ?",
              "Le modele hesite, peut ne pas l'appeler",
            ],
            [
              "\"Utilise cet outil pour comparer les offres d'electricite et de gaz. Ne l'utilise PAS pour les questions generales.\"",
              "Quand l'appeler ET quand ne PAS l'appeler",
              "Tres precis, moins d'erreurs",
            ],
          ]}
        />

        <KeyConcept title="Le modele ne 'sait' pas coder — il fait du raisonnement sur du texte">
          <p>
            Le LLM ne comprend pas ce que fait ta fonction{" "}
            <code>comparerOffres()</code> au niveau du code. Il comprend la{" "}
            <strong>description textuelle</strong> de l&apos;outil. Si ta
            description dit &quot;envoie un email&quot; mais que ta fonction
            fait un appel API, le modele s&apos;en fiche — il se base
            uniquement sur le texte. C&apos;est pour ca qu&apos;une bonne
            description est plus importante que le nom de la fonction.
          </p>
        </KeyConcept>

        <Code language="typescript — bonnes pratiques pour les descriptions d'outils">{`// ❌ MAUVAIS — trop vague
tool({
  description: "Chercher des infos",
  inputSchema: z.object({ q: z.string() }),
  // ...
});

// ✅ BON — precis, avec des exemples implicites
tool({
  description: "Recherche le numero PDL (Point de Livraison) d'un compteur electrique a partir de l'adresse du logement. Utilise cet outil quand le client donne son adresse et qu'on a besoin de son PDL pour la souscription.",
  inputSchema: z.object({
    adresse: z.string().describe("Adresse complete avec rue, code postal et ville. Ex: '12 rue de la Paix, 75002 Paris'"),
  }),
  // ...
});

// ✅ ENCORE MIEUX — dire quand NE PAS l'utiliser
tool({
  description: "Compare les offres d'electricite pour une adresse et une consommation donnees. Utilise cet outil UNIQUEMENT quand tu connais le code postal ET la consommation du client. Si tu n'as pas ces infos, demande-les d'abord au client.",
  inputSchema: z.object({
    codePostal: z.string().describe("Code postal a 5 chiffres du logement"),
    consommationKwh: z.number().describe("Consommation annuelle estimee en kWh (ex: 5500)"),
  }),
  // ...
});`}</Code>

        <Warning>
          <p>
            <strong>Le schema Zod est aussi un signal.</strong> Les types, les{" "}
            <code>.describe()</code> sur chaque champ, les <code>.enum()</code>{" "}
            pour les valeurs possibles — tout ca est converti en JSON Schema
            et injecte dans le prompt. Plus ton schema est precis, plus le
            modele genere des parametres corrects du premier coup.
          </p>
        </Warning>

        <Quiz
          question="Pourquoi la description de l'outil est-elle plus importante que le nom de la fonction ?"
          options={[
            "Le nom est limite en caracteres",
            "Le LLM se base sur la description textuelle pour decider quel outil appeler — il fait du raisonnement semantique sur ce texte, pas de l'execution de code",
            "Le nom n'est pas envoye a l'API",
            "C'est une convention arbitraire",
          ]}
          answer={1}
          explanation="Le LLM est un modele de langage — il raisonne sur du texte. Les definitions d'outils (nom, description, schema) sont injectees comme du texte dans son contexte. Il choisit l'outil dont la description correspond le mieux a la requete du user. Une description vague = un modele qui hesite ou se trompe."
        />
      </Section>

      {/* ============================================================ */}
      {/* 9. QUIZ FINAL                                                */}
      {/* ============================================================ */}
      <Section id="quiz-final" number="09" title="Quiz final">
        <Quiz
          question="Quelle est la difference entre un chatbot et un agent ?"
          options={[
            "Un agent est plus intelligent",
            "Un agent peut appeler des outils et agir dans le monde reel, un chatbot ne fait que generer du texte",
            "Un agent utilise GPT-5, un chatbot utilise GPT-4",
            "Il n'y a pas de difference",
          ]}
          answer={1}
          explanation="La difference fondamentale est le tool calling. Un chatbot recoit du texte et produit du texte. Un agent recoit du texte, decide d'appeler des outils (APIs, bases de donnees, etc.), observe les resultats, et continue a raisonner jusqu'a pouvoir repondre."
        />

        <Quiz
          question="Pourquoi le LLM ne peut-il pas executer les outils lui-meme ?"
          options={[
            "Il n'est pas assez puissant",
            "Il ne produit que du texte — il genere un JSON 'appelle cette fonction avec ces params', et c'est TON code qui execute. Ca te donne le controle total sur la securite.",
            "Les APIs refusent les connexions des LLMs",
            "C'est un choix de design arbitraire",
          ]}
          answer={1}
          explanation="Le LLM est un generateur de texte. Il ne peut pas ouvrir une connexion reseau ou executer du code. Il produit un objet JSON structure (tool call) que le SDK intercepte et execute dans TON environnement. Ca signifie que tu controles exactement ce qui se passe — le LLM ne peut rien faire que tu n'aies explicitement autorise."
        />

        <Quiz
          question="Pour l'agent Selectra, quel pattern d'agent est le plus adapte ?"
          options={[
            "Un seul gros agent qui fait tout",
            "Router (intent classifier rapide) + agents specialises par intent",
            "Parallel (tout en meme temps)",
            "Pas besoin d'agent, un simple chatbot suffit",
          ]}
          answer={1}
          explanation="Un routeur leger (GPT-4o mini) classifie l'intent en <200ms, puis un agent specialise prend le relais. C'est plus rapide (le routeur est leger), plus fiable (chaque agent est optimise pour son intent), et moins cher (le gros modele ne traite que ce qui est necessaire)."
        />

        <div className="mt-12 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
          <p className="mb-2 text-lg font-semibold text-emerald-400">
            Module 04 termine
          </p>
          <p className="text-sm text-muted-foreground">
            Tu maitrises le tool calling, la boucle agent, l&apos;Agent class,
            et MCP. Tu as vu comment l&apos;agent Selectra utilise 3 outils en
            sequence pour qualifier un client. Prochain module : Agents Vocaux —
            on assemble tout pour construire l&apos;agent qui parle.
          </p>
        </div>
      </Section>
    </>
  );
}
