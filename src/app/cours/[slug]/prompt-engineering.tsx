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

export function PromptEngineering() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. POURQUOI LE PROMPT ENGINEERING                            */}
      {/* ============================================================ */}
      <Section id="pourquoi" number="01" title="Pourquoi le prompt engineering ?">
        <p>
          Au Module 1, on a vu que le LLM est une machine a predire le prochain
          token. Le <strong>prompt engineering</strong>, c&apos;est l&apos;art de
          formuler ta requete pour que cette machine produise exactement ce que
          tu veux.
        </p>
        <p>
          Que ce soit pour un agent vocal, un chatbot, de l&apos;extraction de
          donnees, ou de la classification, tout commence par un bon prompt.
          C&apos;est la competence la plus transversale en IA generative.
        </p>

        <Analogy>
          <p>
            Un LLM, c&apos;est comme un stagiaire brillant mais literal. Si tu
            lui dis &quot;fais un resume&quot;, il va te faire un resume — mais
            peut-etre pas dans le format, la longueur, ou le style que tu veux.
            Le prompt engineering, c&apos;est apprendre a donner des
            instructions precises a ce stagiaire.
          </p>
        </Analogy>

        <ComparisonTable
          headers={["Prompt naive", "Prompt engineere", "Difference"]}
          rows={[
            [
              '"Resume ce texte"',
              '"Resume ce texte en 3 bullet points de max 15 mots chacun, en francais, au present"',
              "Format, longueur, langue, temps verbal — tout est specifie",
            ],
            [
              '"Classe ce message"',
              '"Classe ce message client dans une des categories suivantes : nouveau_logement, changement_fournisseur, suivi_contrat, reclamation. Reponds UNIQUEMENT avec le nom de la categorie."',
              "Categories explicites, format de sortie contraint",
            ],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 2. ZERO-SHOT vs FEW-SHOT                                    */}
      {/* ============================================================ */}
      <Section
        id="zero-few-shot"
        number="02"
        title="Zero-shot vs Few-shot"
      >
        <KeyConcept title="Zero-shot">
          <p>
            Tu donnes une instruction au modele <strong>sans aucun exemple</strong>.
            Tu comptes sur le fait qu&apos;il a deja vu des taches similaires
            pendant son entrainement.
          </p>
        </KeyConcept>

        <Code language="zero-shot">{`Prompt:
"Classe le message suivant dans une categorie :
Message : 'Je demenage le 15 mars et j'ai besoin d'electricite'
Categories : nouveau_logement, changement_fournisseur, suivi_contrat, reclamation"

Reponse du LLM:
"nouveau_logement"`}</Code>

        <p>
          Ca marche souvent pour des taches simples. Mais pour des taches
          ambigues ou specifiques a ton domaine, le modele peut se tromper.
          C&apos;est la que le <strong>few-shot</strong> entre en jeu.
        </p>

        <KeyConcept title="Few-shot">
          <p>
            Tu donnes <strong>2 a 5 exemples</strong> de la tache avant de poser
            ta question. Le modele comprend le pattern et le reproduit. C&apos;est
            comme montrer a quelqu&apos;un &quot;voila le format que je veux&quot;
            avant de lui demander de bosser.
          </p>
        </KeyConcept>

        <Code language="few-shot (3 exemples)">{`Prompt:
"Classe chaque message client dans une categorie.

Message : 'Je demenage a Lyon le mois prochain'
Categorie : nouveau_logement

Message : 'EDF est trop cher, je veux changer'
Categorie : changement_fournisseur

Message : 'Mon contrat a ete signe il y a 2 semaines, toujours pas actif'
Categorie : suivi_contrat

Message : 'Bonjour, je viens d'acheter un appartement et j'ai besoin de mettre l'electricite a mon nom'
Categorie :"`}</Code>

        <p>
          Avec ces 3 exemples, le modele comprend exactement le format attendu
          et les categories possibles. Il va repondre &quot;nouveau_logement&quot;
          de maniere beaucoup plus fiable.
        </p>

        <ComparisonTable
          headers={["Approche", "Quand l'utiliser", "Avantage", "Inconvenient"]}
          rows={[
            [
              "Zero-shot",
              "Tache simple, bien connue du modele",
              "Rapide, moins de tokens",
              "Moins fiable sur des taches specifiques",
            ],
            [
              "One-shot",
              "1 exemple suffit a montrer le format",
              "Bon compromis tokens/fiabilite",
              "Un seul exemple peut etre trompeur",
            ],
            [
              "Few-shot (2-5)",
              "Tache specifique, format precis, domaine metier",
              "Tres fiable, le modele 'comprend' le pattern",
              "Consomme plus de tokens (= plus cher)",
            ],
          ]}
        />

        <Warning>
          <p>
            <strong>Regle pratique :</strong> utilise TOUJOURS du few-shot
            pour la classification d&apos;intent dans un agent vocal.
            Un client qui dit &quot;je veux changer&quot; peut vouloir changer de
            fournisseur OU changer d&apos;offre chez le meme fournisseur.
            Les exemples levent l&apos;ambiguite.
          </p>
        </Warning>

        <Quiz
          question="Un client dit : 'Votre commercial m'a appele et j'ai souscrit mais je ne recois rien'. Zero-shot ou few-shot pour classifier ?"
          options={[
            "Zero-shot, c'est simple",
            "Few-shot, car c'est ambigu entre suivi_contrat et reclamation",
            "Ca n'a pas d'importance",
            "Ni l'un ni l'autre, il faut du fine-tuning",
          ]}
          answer={1}
          explanation="C'est ambigu : ca pourrait etre un suivi_contrat (il attend son contrat) ou une reclamation (il est mecontent). Avec des exemples few-shot, tu montres au modele comment tu veux que ce cas soit traite dans TON contexte metier."
        />
      </Section>

      {/* ============================================================ */}
      {/* 3. CHAIN-OF-THOUGHT                                         */}
      {/* ============================================================ */}
      <Section
        id="chain-of-thought"
        number="03"
        title="Chain-of-Thought — forcer le raisonnement"
      >
        <p>
          Parfois, le modele doit raisonner pour donner la bonne reponse.
          Le <Term def="Technique qui force le modele a montrer son raisonnement etape par etape avant de donner sa reponse finale. Ameliore significativement les performances sur les taches de logique, math, et decision complexe.">Chain-of-Thought</Term>{" "}
          (CoT) le force a &quot;reflechir a voix haute&quot;.
        </p>

        <KeyConcept title="Chain-of-Thought">
          <p>
            Au lieu de demander directement la reponse, tu demandes au modele
            de raisonner etape par etape. Ca reduit considerablement les erreurs
            sur les taches complexes.
          </p>
        </KeyConcept>

        <p>Exemple sans CoT :</p>

        <Code language="sans CoT">{`Prompt: "Un client consomme 8000 kWh/an. L'offre A coute 0.18€/kWh + 12€/mois d'abonnement.
L'offre B coute 0.21€/kWh + 8€/mois. Quelle offre est la moins chere ?"

Reponse: "L'offre B" ← FAUX ! (le modele choisit B car l'abonnement est moins cher, sans faire le calcul total)`}</Code>

        <p>Avec CoT :</p>

        <Code language="avec CoT">{`Prompt: "Un client consomme 8000 kWh/an. L'offre A coute 0.18€/kWh + 12€/mois d'abonnement.
L'offre B coute 0.21€/kWh + 8€/mois. Quelle offre est la moins chere ?

Raisonne etape par etape avant de repondre."

Reponse:
"Etape 1 : Cout annuel de l'offre A
  - Consommation : 8000 * 0.18 = 1440€
  - Abonnement : 12 * 12 = 144€
  - Total A = 1584€

Etape 2 : Cout annuel de l'offre B
  - Consommation : 8000 * 0.21 = 1680€
  - Abonnement : 8 * 12 = 96€
  - Total B = 1776€

Etape 3 : Comparaison
  1584€ < 1776€, donc l'offre A est moins chere.

Reponse : L'offre A est la moins chere (1584€/an vs 1776€/an)." ← CORRECT`}</Code>

        <p>
          La phrase magique : <strong>&quot;Raisonne etape par etape&quot;</strong>{" "}
          (ou &quot;Let&apos;s think step by step&quot; en anglais). Ca semble
          trivial, mais ca ameliore les resultats de 20-40% sur les benchmarks
          de raisonnement.
        </p>

        <Analogy>
          <p>
            C&apos;est comme en maths a l&apos;X : ton prof te demande de
            montrer ton raisonnement, pas juste le resultat. Si tu forces le
            modele a montrer ses etapes, il se trompe moins — parce que chaque
            etape est un point de controle.
          </p>
        </Analogy>

        <Warning>
          <p>
            <strong>Quand NE PAS utiliser le CoT :</strong> pour des taches
            simples (classification d&apos;intent, extraction d&apos;une
            adresse). Le CoT ajoute de la latence et des tokens. Utilise-le
            uniquement quand il y a un vrai raisonnement a faire (comparaisons,
            calculs, decisions multi-criteres).
          </p>
        </Warning>

        <Quiz
          question="Pour un agent vocal de qualification, quand utiliser le Chain-of-Thought ?"
          options={[
            "A chaque message du client",
            "Quand l'agent doit comparer des offres d'energie pour le client",
            "Pour classifier l'intent (nouveau_logement, changement, etc.)",
            "Jamais, c'est trop lent pour du vocal",
          ]}
          answer={1}
          explanation="Le CoT est utile quand l'agent doit comparer des offres (calculs, multi-criteres). Pour la classification d'intent, c'est simple — le few-shot suffit. Et en vocal, la latence du CoT est acceptable si c'est pour un calcul important (on peut dire 'laissez-moi verifier...' pendant le calcul)."
        />
      </Section>

      {/* ============================================================ */}
      {/* 4. SYSTEM PROMPTS AVANCES                                    */}
      {/* ============================================================ */}
      <Section
        id="system-prompts"
        number="04"
        title="System prompts avances"
      >
        <p>
          Le system prompt, c&apos;est la &quot;constitution&quot; de ton agent.
          C&apos;est la que tu definis QUI il est, CE QU&apos;il fait, et
          COMMENT il le fait. Pour un agent vocal en production, c&apos;est
          probablement le morceau de code le plus important de tout le projet.
        </p>

        <KeyConcept title="Structure d'un system prompt pro">
          <p>
            Un bon system prompt suit cette structure : <strong>Role →
            Contexte → Tache → Contraintes → Format de sortie → Exemples</strong>.
            Plus tu es precis, moins le modele improvise.
          </p>
        </KeyConcept>

        <Code language="system prompt — agent de qualification">{`Tu es un agent de qualification telephonique pour un comparateur d'offres
d'energie et d'internet.

## Ton role
Tu accueilles les clients qui appellent et collectes les informations necessaires pour leur
trouver la meilleure offre d'energie ou d'internet.

## Informations a collecter (dans cet ordre)
1. Le BESOIN : nouveau logement, changement de fournisseur, ou suivi de dossier
2. L'ADRESSE complete du logement concerne
3. Le FOURNISSEUR ACTUEL (si changement)
4. Le NUMERO PDL ou PCE (compteur electrique/gaz) — propose d'aider a le trouver si le client ne l'a pas
5. L'ESTIMATION DE CONSOMMATION annuelle (en kWh) — aide a estimer si le client ne sait pas

## Contraintes
- Parle en francais, vouvoie le client
- Sois concis : en vocal, les phrases longues sont penibles
- Pose UNE question a la fois, jamais deux
- Si le client s'enerve ou demande un humain, transfere immediatement
- Ne donne JAMAIS de prix invente — utilise uniquement les donnees de l'outil de comparaison
- Ne demande JAMAIS l'IBAN ou les infos bancaires — c'est le commercial humain qui le fera

## Format
Quand tu as collecte toutes les infos, appelle l'outil "comparer_offres" avec les parametres structures.
Presente les 3 meilleures offres au client, puis propose de le transferer a un conseiller
pour finaliser la souscription.`}</Code>

        <Steps>
          <Step number="1" title="Role (qui tu es)">
            <p>
              Definis clairement l&apos;identite. &quot;Tu es un agent de
              qualification telephonique pour un comparateur d&apos;energie&quot; est bien meilleur que &quot;Tu es un
              assistant utile&quot;.
            </p>
          </Step>
          <Step number="2" title="Contexte (le monde dans lequel tu operes)">
            <p>
              Donne le contexte metier. Le modele ne connait pas ton entreprise, les
              PDL, ni le marche de l&apos;energie francais. Explique-lui.
            </p>
          </Step>
          <Step number="3" title="Tache (ce que tu dois faire)">
            <p>
              Liste ordonnee des informations a collecter. L&apos;ordre
              compte — on ne demande pas le PDL avant l&apos;adresse.
            </p>
          </Step>
          <Step number="4" title="Contraintes (les guardrails)">
            <p>
              Ce que le modele ne doit PAS faire est aussi important que ce
              qu&apos;il doit faire. Sans guardrails, il va inventer des prix
              ou demander un IBAN.
            </p>
          </Step>
          <Step number="5" title="Format de sortie">
            <p>
              Specifie exactement comment la sortie doit etre structuree.
              Pour du tool calling : quand appeler quel outil, avec quels
              parametres.
            </p>
          </Step>
        </Steps>

        <Warning>
          <p>
            <strong>Les guardrails sont CRITIQUES.</strong> Sans la
            contrainte &quot;ne donne jamais de prix invente&quot;, le modele
            va halluciner des tarifs. Sans &quot;pose une question a la fois&quot;,
            il va bombarder le client avec 3 questions d&apos;un coup (horrible
            en vocal). Teste toujours les cas limites.
          </p>
        </Warning>

        <Quiz
          question="Quel est le probleme de ce system prompt : 'Tu es un assistant. Aide les clients.' ?"
          options={[
            "Il est trop court",
            "Il manque le role, les contraintes, le format, et les exemples — le modele va improviser tout",
            "Il devrait etre en anglais",
            "Il n'y a pas de probleme, c'est suffisant",
          ]}
          answer={1}
          explanation="Un prompt vague donne des resultats vagues. Le modele ne sait pas quelles infos collecter, dans quel ordre, ce qu'il ne doit pas faire, ni comment formater sa sortie. Il va improviser — et mal."
        />
      </Section>

      {/* ============================================================ */}
      {/* 5. STRUCTURED OUTPUT                                         */}
      {/* ============================================================ */}
      <Section
        id="structured-output"
        number="05"
        title="Structured Output — extraire des donnees typees"
      >
        <p>
          Jusqu&apos;ici, le modele produit du texte libre. Mais dans un vrai
          systeme, tu veux des <strong>donnees structurees</strong> — du JSON
          avec des champs precis que ton code peut utiliser.
        </p>

        <KeyConcept title="Pourquoi le structured output ?">
          <p>
            Un agent vocal de qualification doit remplir une fiche client avec des
            champs precis (adresse, PDL, fournisseur...). Tu ne veux pas parser
            du texte libre avec des regex — tu veux que le modele te donne
            directement un objet JSON type.
          </p>
        </KeyConcept>

        <p>
          Le Vercel AI SDK rend ca trivial avec{" "}
          <Term def="Output.object() prend un schema Zod et force le modele a produire un JSON conforme a ce schema. Le type TypeScript est infere automatiquement.">
            Output.object()
          </Term>{" "}
          + un schema Zod :
        </p>

        <Code language="typescript — extraction structuree">{`import { generateText, Output } from "ai";
import { z } from "zod";

// Schema Zod = la structure exacte que tu attends
const ficheClientSchema = z.object({
  intent: z.enum(["nouveau_logement", "changement_fournisseur", "suivi_contrat", "reclamation"]),
  adresse: z.string().optional().describe("Adresse complete du logement"),
  fournisseurActuel: z.string().optional().describe("Nom du fournisseur actuel"),
  numeroPDL: z.string().optional().describe("Numero PDL (14 chiffres)"),
  consommationKwh: z.number().optional().describe("Consommation annuelle estimee en kWh"),
  dateEmmenagement: z.string().optional().describe("Date d'emmenagement au format YYYY-MM-DD"),
  urgence: z.enum(["basse", "normale", "haute"]).describe("Niveau d'urgence"),
});

// Appel API avec structured output
const result = await generateText({
  model: "anthropic/claude-sonnet-4.6",
  output: Output.object({ schema: ficheClientSchema }),
  prompt: \`Extrais les informations client du transcript suivant :

Transcript:
"Bonjour, je demenage a Lyon au 42 rue de la Republique le 15 avril.
J'etais chez EDF avant, mon compteur c'est le 09234567890123.
On consomme environ 6000 kWh par an, c'est un T3."

Remplis la fiche client.\`
});

// result.object est TYPE-SAFE grace a Zod
console.log(result.object);
// {
//   intent: "nouveau_logement",
//   adresse: "42 rue de la Republique, Lyon",
//   fournisseurActuel: "EDF",
//   numeroPDL: "09234567890123",
//   consommationKwh: 6000,
//   dateEmmenagement: "2026-04-15",
//   urgence: "normale"
// }`}</Code>

        <Diagram title="Pipeline d'extraction structuree">
          <pre className="text-center">{`
  Transcript d'appel (texte brut)
           |
    [ LLM + schema Zod ]
           |
    JSON structure type-safe
           |
    ┌──────────────────┐
    │ intent: "..."     │
    │ adresse: "..."    │
    │ PDL: "..."        │
    │ conso: 6000       │
    └──────────────────┘
           |
    [ Outil de comparaison ]
           |
    Top 3 offres
`}</pre>
        </Diagram>

        <Warning>
          <p>
            <strong>Structured output ≠ JSON dans le prompt.</strong> Demander
            &quot;reponds en JSON&quot; dans le prompt est fragile — le modele
            peut ajouter du texte autour, mal fermer une accolade, ou utiliser
            des types incorrects. <code>Output.object()</code> avec Zod
            <em> garantit</em> la structure au niveau du SDK.
          </p>
        </Warning>

        <Quiz
          question="Pourquoi utiliser un schema Zod plutot que demander 'reponds en JSON' dans le prompt ?"
          options={[
            "Zod est plus rapide",
            "Le schema est valide au niveau du SDK : types TypeScript inferes, pas de parsing manuel, erreurs si le JSON est invalide",
            "Ca coute moins cher en tokens",
            "Le modele ne comprend pas le JSON sans Zod",
          ]}
          answer={1}
          explanation="Zod te donne la type-safety TypeScript + la validation automatique. Si le modele produit un champ manquant ou un type incorrect, le SDK le detecte. Avec un simple 'reponds en JSON', tu dois parser toi-meme, gerer les erreurs, et croiser les doigts."
        />
      </Section>

      {/* ============================================================ */}
      {/* 6. TECHNIQUES AVANCEES                                       */}
      {/* ============================================================ */}
      <Section
        id="techniques-avancees"
        number="06"
        title="Techniques avancees"
      >
        <p>
          Quelques techniques supplementaires que tu croiseras en production.
        </p>

        <KeyConcept title="Delimiters (separateurs)">
          <p>
            Utilise des delimiters clairs pour separer les parties de ton
            prompt : le contexte, les exemples, et la question. Ca evite que le
            modele confonde les exemples avec la vraie question.
          </p>
        </KeyConcept>

        <Code language="delimiters">{`System prompt:
"""
Tu es un classificateur d'intent pour un service client.
"""

Exemples:
---
Message: "Je demenage"
Intent: nouveau_logement
---
Message: "EDF est trop cher"
Intent: changement_fournisseur
---

Message a classifier:
###
{message_du_client}
###

Reponds avec l'intent uniquement.`}</Code>

        <KeyConcept title="Negative prompting">
          <p>
            Dis au modele ce qu&apos;il ne doit PAS faire. C&apos;est
            souvent plus efficace que de dire ce qu&apos;il doit faire.
          </p>
        </KeyConcept>

        <Code language="negative prompting">{`FAIS :
- Pose une question a la fois
- Vouvoie le client
- Utilise des phrases courtes

NE FAIS PAS :
- N'invente jamais de prix ou de tarifs
- Ne demande jamais de coordonnees bancaires
- Ne fais pas de promesses sur les delais
- Ne dis jamais "en tant qu'IA" ou "en tant que modele de langage"`}</Code>

        <KeyConcept title="Role-play prompting">
          <p>
            Donne un role tres precis au modele. Plus le role est specifique,
            meilleur est le resultat.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Prompt vague", "Role-play precis"]}
          rows={[
            [
              '"Tu es un assistant"',
              '"Tu es Marie, conseillere energie depuis 3 ans, specialiste du marche de l\'electricite et du gaz. Tu parles avec un ton professionnel mais chaleureux."',
            ],
            [
              '"Aide le client"',
              '"Tu suis le script de qualification : accueil → identification du besoin → collecte d\'infos → comparaison → transfert conseiller."',
            ],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 7. APPLICATION : SYSTEM PROMPT D'UN AGENT VOCAL               */}
      {/* ============================================================ */}
      <Section
        id="application-agent-vocal"
        number="07"
        title="Application : system prompt d'un agent vocal"
      >
        <p>
          Mettons tout ensemble. Voici un system prompt complet pour un agent
          vocal de qualification energie, utilisant toutes les techniques vues dans ce module.
        </p>

        <Code language="system prompt complet — production">{`## Identite
Tu es un agent vocal de qualification pour un comparateur d'offres d'energie.
Tu reponds au telephone pour aider les clients a trouver la meilleure offre.

## Contexte
Les clients appellent pour : ouvrir un contrat (demenagement), changer de
fournisseur (facture trop chere), suivre un dossier existant, ou faire une reclamation.

## Objectif
Qualifier le besoin du client en collectant les informations necessaires, puis le
transferer a un conseiller humain avec la fiche pre-remplie.

## Processus (suis cet ordre)
1. ACCUEIL : "Bonjour, comment puis-je vous aider ?"
2. IDENTIFICATION : Determine l'intent (nouveau_logement, changement, suivi, reclamation)
3. COLLECTE selon l'intent :
   - nouveau_logement : adresse, date emmenagement, type de logement, PDL si disponible
   - changement : fournisseur actuel, motif, adresse, consommation annuelle
   - suivi : numero de dossier → appelle l'outil lookup_dossier
   - reclamation : ecoute, resume, → transfert immediat
4. COMPARAISON : appelle l'outil comparer_offres avec les donnees collectees
5. PRESENTATION : presente les 3 meilleures offres (nom, prix mensuel estime, avantages)
6. TRANSFERT : "Je vous transfère à un conseiller pour finaliser. Il aura toutes vos infos."

## Exemples de conversation (few-shot)

Client : "Je demenage"
Agent : "Felicitations ! Quelle est l'adresse de votre nouveau logement ?"

Client : "EDF me coute trop cher"
Agent : "Je comprends. Savez-vous combien vous consommez par an en kWh ? Vous pouvez le trouver sur votre derniere facture."

Client : "J'ai souscrit la semaine derniere, j'ai rien recu"
Agent : "Je vais verifier l'avancement de votre dossier. Pouvez-vous me donner votre numero de dossier ?"

Client : "Passez-moi un responsable !"
Agent : "Bien sur, je vous transfère immédiatement à un conseiller. Un instant s'il vous plait."

## Contraintes absolues
- JAMAIS inventer de prix. Utilise UNIQUEMENT les resultats de comparer_offres.
- JAMAIS demander IBAN, RIB, ou coordonnees bancaires.
- TOUJOURS vouvoyer.
- UNE question a la fois. En vocal, c'est crucial.
- Si le client demande un humain ou s'enerve → transfert IMMEDIAT, pas de debat.
- Phrases COURTES (max 2 lignes). Le vocal n'est pas l'ecrit.
- Ne JAMAIS mentionner que tu es une IA sauf si on te le demande directement.`}</Code>

        <p>
          Ce prompt utilise toutes les techniques du module :
        </p>

        <ComparisonTable
          headers={["Technique", "Ou dans le prompt"]}
          rows={[
            ["Role-play", "\"Tu es un agent vocal de qualification pour un comparateur d'energie\""],
            ["Structure (Role → Contexte → Tache → Contraintes)", "Les sections ##"],
            ["Few-shot", "Les exemples de conversation"],
            ["Negative prompting", "Les contraintes \"JAMAIS\", \"NE PAS\""],
            ["Delimiters", "Les ## pour separer les sections"],
            ["Specifique vs vague", "Chaque etape du processus est detaillee"],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 8. QUIZ FINAL                                                */}
      {/* ============================================================ */}
      <Section id="quiz-final" number="08" title="Quiz final">
        <p>
          Verifions que le prompt engineering n&apos;a plus de secrets pour toi.
        </p>

        <Quiz
          question="Un client dit : 'Mon voisin a eu une super offre chez Engie, je veux la meme'. Comment l'agent doit reagir ?"
          options={[
            "Proposer directement l'offre Engie",
            "Classifier en 'changement_fournisseur', collecter les infos, puis comparer TOUTES les offres (pas juste Engie)",
            "Dire qu'on ne travaille pas avec Engie",
            "Demander le nom du voisin",
          ]}
          answer={1}
          explanation="Le role d'un comparateur est de COMPARER toutes les offres, pas de pousser un fournisseur specifique. Le client veut le meilleur prix — peut-etre qu'Engie est la meilleure offre, peut-etre pas. L'agent collecte les infos et laisse l'outil de comparaison faire le travail."
        />

        <Quiz
          question="Quelle est la difference entre 'reponds en JSON' dans le prompt et Output.object() du AI SDK ?"
          options={[
            "C'est la meme chose",
            "Output.object() utilise un schema Zod pour garantir la structure, la type-safety TypeScript, et la validation automatique",
            "Output.object() est plus lent",
            "'Reponds en JSON' est plus fiable",
          ]}
          answer={1}
          explanation="Output.object() + Zod te donne : 1) un schema valide au compile-time, 2) des types TypeScript inferes automatiquement, 3) une validation runtime — si le modele produit un champ manquant ou un type incorrect, le SDK le detecte. 'Reponds en JSON' est un voeu pieux."
        />

        <Quiz
          question="Pourquoi le system prompt d'un agent vocal inclut 'UNE question a la fois' ?"
          options={[
            "Pour economiser des tokens",
            "Par politesse",
            "Parce qu'en conversation vocale, bombarder de questions est confus — le client ne peut repondre qu'a une chose a la fois",
            "Parce que le modele ne sait pas poser plusieurs questions",
          ]}
          answer={2}
          explanation="En vocal, contrairement a l'ecrit, le client ne peut pas 'scroller' pour voir toutes les questions. Si l'agent dit 'Quelle est votre adresse, votre fournisseur actuel, et votre consommation ?', le client va repondre a une seule et oublier les autres. UNE question = UNE reponse."
        />

        <div className="mt-12 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
          <p className="mb-2 text-lg font-semibold text-emerald-400">
            Module 02 termine
          </p>
          <p className="text-sm text-muted-foreground">
            Tu maitrises maintenant le zero/few-shot, le chain-of-thought,
            les system prompts structures, et le structured output. Tu as meme
            ecrit le prompt complet d&apos;un agent vocal de qualification. Prochain
            module : RAG — donner de la memoire aux LLMs.
          </p>
        </div>
      </Section>
    </>
  );
}
