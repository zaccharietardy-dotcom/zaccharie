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

export function StageSelectra() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. SELECTRA — AUDIT COMPLET                                  */}
      {/* ============================================================ */}
      <Section id="audit" number="01" title="Selectra — audit complet">
        <p>
          Avant de proposer des projets, il faut comprendre la boite en
          profondeur : comment elle gagne de l&apos;argent, quelle stack elle
          utilise, quels sont ses vrais problemes.
        </p>

        <ComparisonTable
          headers={["Metrique", "Valeur"]}
          rows={[
            ["Revenue", "~106M€ (2024)"],
            ["Employes", "2 200+"],
            ["Pays", "17"],
            ["Visiteurs/an", "350M+ (tous domaines)"],
            ["Contrats signes (2025)", "1M+"],
            ["Trafic organique", "81% desktop — Google est le moteur principal"],
            ["Verticales", "Energie, telecom, assurance, banque, alarmes, solaire"],
          ]}
        />

        <KeyConcept title="Le modele economique">
          <p>
            Client cherche &quot;changer fournisseur electricite&quot; sur
            Google → atterrit sur un article selectra.info → appelle le numero
            → conseiller qualifie → souscrit le contrat → Selectra touche une
            commission du fournisseur (~50€ en moyenne). 81% du trafic est
            organique — Google est litteralement le robinet a cash.
          </p>
        </KeyConcept>

        <KeyConcept title="Stack technique confirmee">
          <p>
            <strong>CRM :</strong> Zoho CRM (leur &quot;operating system&quot;
            selon leur propre etude de cas). <strong>Call center :</strong>{" "}
            Vonage Contact Center (ex-NewVoiceMedia), integre a Zoho via API.{" "}
            <strong>Analytics :</strong> Google Tag Manager + Search Console.{" "}
            <strong>Ads :</strong> Bing Ads + Outbrain. <strong>App :</strong>{" "}
            MySelectra (suivi conso Linky/Gazpar).{" "}
            <strong>Call centers offshore :</strong> Senegal, Maroc, Tunisie.
          </p>
        </KeyConcept>

        <Warning>
          <p>
            <strong>Amende DGCCRF (mai 2024) :</strong> 400 000€ pour pratiques
            commerciales trompeuses. Les agents externalises ne declaraient pas
            travailler pour Selectra, faisaient de fausses promesses tarifaires,
            et forcaient des changements de contrat sans consentement. C&apos;est
            un probleme structurel que l&apos;IA peut resoudre (voir Projet 1).
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 2. STACK IA EXISTANTE                                        */}
      {/* ============================================================ */}
      <Section id="stack-ia" number="02" title="Leur stack IA existante (et ce qui manque)">
        <ComparisonTable
          headers={["Ce qu'ils ont", "Ce qui manque"]}
          rows={[
            [
              "Gladia (STT) pour transcrire les appels",
              "Analyse automatisee de conformite (actuellement manuelle)",
            ],
            [
              "LLM pour QA post-appel (validation humaine)",
              "Agent vocal temps reel",
            ],
            [
              "Selectra Score (regle daily, pas ML)",
              "Score personnalise par profil de consommation",
            ],
            [
              "MySelectra app (Linky/Gazpar)",
              "Predictions de prix, alertes intelligentes",
            ],
            [
              "Zoho CRM (leads + conversions)",
              "Lead scoring ML, churn prediction",
            ],
            [
              "Vonage Contact Center",
              "Vonage Conversation Analyzer (Google Vertex AI) — semble inutilise",
            ],
            [
              "Contenu editorial manuel (200M+ visites)",
              "Generation automatisee, mise a jour cross-pays",
            ],
          ]}
        />

        <p>
          Point cle : Vonage (leur solution call center) a un module
          &quot;Conversation Analyzer&quot; integre (Google Vertex AI) qui fait
          du STT + sentiment analysis. Selectra ne semble pas l&apos;utiliser.
          C&apos;est une opportunite a cout quasi-zero.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 3. PROJET 1 — COMPLIANCE SCORING                             */}
      {/* ============================================================ */}
      <Section id="compliance" number="03" title="Projet 1 — Scoring de conformite des appels">
        <p>
          <strong>Le projet le plus urgent.</strong> L&apos;amende de 400K€
          est le symptome d&apos;un probleme structurel : Selectra ne peut pas
          auditer manuellement des millions d&apos;appels. Les agents offshore
          devient du script sans que personne s&apos;en rende compte.
        </p>

        <Diagram title="Pipeline de compliance automatisee">
          <pre className="text-center">{`
  Appel termine (Vonage)
        |
  [ Whisper / Gladia STT ]
        |
  Transcript texte
        |
  [ LLM — scoring sur rubrique ]
        |
  ┌──────────────────────────────────┐
  │  Score de conformite             │
  │                                  │
  │  ✅ Disclosure Selectra : OUI    │
  │  ✅ Comparaison ≥2 offres : OUI │
  │  ❌ Fausse promesse prix : OUI  │ ← ALERTE
  │  ✅ Droit de retractation : OUI │
  │  ⚠️  Pression excessive : MAYBE │
  │                                  │
  │  Score global : 3/5 — FLAG       │
  └──────────────────────────────────┘
        |
  → Dashboard QA + alerte Slack/email
`}</pre>
        </Diagram>

        <Code language="python — scoring LLM d'un transcript">{`from anthropic import Anthropic

client = Anthropic()
RUBRIC = """
Score ce transcript d'appel commercial sur ces criteres (0 ou 1 chacun) :

1. DISCLOSURE : L'agent a-t-il mentionne qu'il travaille pour un comparateur ?
2. COMPARAISON : A-t-il compare au moins 2 offres de fournisseurs differents ?
3. PRIX_CORRECT : Les prix mentionnes sont-ils corrects ? (pas de fausse promesse)
4. RETRACTATION : A-t-il mentionne le droit de retractation de 14 jours ?
5. PRESSION : Y a-t-il eu une pression excessive pour souscrire ?

Reponds en JSON : {"disclosure": 0/1, "comparaison": 0/1, ...}
"""

def score_call(transcript: str) -> dict:
    response = client.messages.create(
        model="claude-sonnet-4-6-20250514",
        max_tokens=200,
        messages=[{"role": "user", "content": f"{RUBRIC}\\n\\nTranscript:\\n{transcript}"}],
    )
    return json.loads(response.content[0].text)`}</Code>

        <ComparisonTable
          headers={["Metrique", "Valeur estimee"]}
          rows={[
            ["Impact", "Protection contre amendes >400K€/an + amelioration qualite"],
            ["Difficulte", "Moyenne — STT resolu, LLM scoring straightforward"],
            ["Donnees necessaires", "Call recordings Vonage (existent deja)"],
            ["Scope intern", "Prototype sur 500-1000 appels, valider vs audits manuels"],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 4. PROJET 2 — LEAD SCORING                                   */}
      {/* ============================================================ */}
      <Section id="lead-scoring" number="04" title="Projet 2 — Lead scoring pre-appel">
        <p>
          Tous les leads ne se valent pas. Un visiteur qui a lu 3 articles
          comparatifs et consulte le simulateur a un taux de conversion
          beaucoup plus eleve qu&apos;un clic pub Outbrain. Aujourd&apos;hui,
          les commerciaux traitent tous les appels de la meme facon.
        </p>

        <Code language="python — features pour le lead scoring">{`# Features extraites de Zoho CRM + Google Analytics
features = {
    # Comportement web (GA4)
    "pages_visited": 7,
    "time_on_site_seconds": 340,
    "visited_comparateur": True,
    "visited_simulateur": True,
    "visited_guide_demenagement": True,  # → intent demenagement
    "traffic_source": "organic",         # vs "outbrain", "bing_ads"
    "device": "mobile",
    "hour_of_day": 14,
    "day_of_week": "tuesday",

    # Donnees CRM (Zoho)
    "previous_calls": 0,
    "previous_contracts": 0,
    "city_population": 450000,  # grande ville = plus de fournisseurs
}

# Target : le client a-t-il souscrit un contrat ? (binaire)
# Modele : XGBoost ou LightGBM
# Score output : 0-100 (probabilite de conversion)`}</Code>

        <KeyConcept title="Impact business">
          <p>
            A 1M contrats/an et ~50€ de commission moyenne, chaque 1% de gain
            en conversion = 500K€. Router les leads chauds vers les meilleurs
            commerciaux et prioriser les callbacks par score = impact direct
            sur le revenue.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 5. PROJET 3 — ELIGIBILITE MAPRIMERENOV                       */}
      {/* ============================================================ */}
      <Section id="maprimerenov" number="05" title="Projet 3 — Chatbot eligibilite MaPrimeRenov / DPE">
        <p>
          <strong>Timing parfait :</strong> MaPrimeRenov a ete relance le 23
          fevrier 2026 avec de nouvelles regles. 850 000 logements ont ete
          reclasses suite a la reforme DPE du 1er janvier 2026. Les gens sont
          perdus. Un chatbot qui repond &quot;ai-je droit a des aides ?&quot;
          en 3 questions capture un trafic enorme.
        </p>

        <Diagram title="Chatbot d'eligibilite">
          <pre className="text-center">{`
  User : "J'ai un DPE E, est-ce que j'ai droit a MaPrimeRenov ?"
                    |
              [ LLM + contexte reglementaire ]
                    |
  "Oui, avec un DPE E vous etes eligible a
   MaPrimeRenov parcours accompagne.
   Pour un T3 avec un revenu < 23 541€/an :
   - MaPrimeRenov : jusqu'a 63 000€
   - Eco-PTZ : jusqu'a 50 000€
   - CEE : variable selon travaux
   Voulez-vous qu'on estime pour vos travaux ?"
`}</pre>
        </Diagram>

        <ComparisonTable
          headers={["Avantage", "Detail"]}
          rows={[
            ["Timing", "Reforme DPE jan 2026 + reouverture MPR fev 2026 — le sujet est brulant"],
            ["SEO", "\"MaPrimeRenov 2026 eligibilite\" = volume de recherche en explosion"],
            ["Cross-sell", "Le user qui renove a aussi besoin d'un nouveau contrat d'energie"],
            ["Difficulte", "Faible — LLM + contexte structure, pas d'entrainement"],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 6. PROJET 4 — PREVISION PRIX ELECTRICITE                     */}
      {/* ============================================================ */}
      <Section id="prix-forecast" number="06" title="Projet 4 — Prevision du prix de l'electricite">
        <p>
          Selectra montre les prix EPEX Spot mais sans prediction. Papernest
          (concurrent) a deja un predicteur du TRVE. L&apos;opportunite :
          &quot;faut-il souscrire une offre fixe ou indexee cette
          semaine ?&quot;
        </p>

        <Code language="python — pipeline de forecasting">{`import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor

# Donnees publiques disponibles
# - EPEX day-ahead (prix spot electricite FR)
# - RTE eco2mix (production nucleaire, eolien, solaire)
# - Meteo-France (temperature, ensoleillement)
# - EDF (disponibilite parc nucleaire)

features = [
    "prix_spot_j-1", "prix_spot_j-7", "prix_spot_j-30",  # historique
    "temperature_paris", "temperature_lyon",                # meteo
    "production_nucleaire_mw", "production_eolien_mw",      # offre
    "jour_semaine", "mois", "est_vacances",                 # saisonnalite
]

# Target : prix spot J+1 a J+7
# Modele : GBR ou LSTM pour les sequences
# Evaluation : MAE, MAPE sur rolling window`}</Code>

        <Warning>
          <p>
            <strong>Volatilite reelle :</strong> le spot a atteint 196€/MWh
            en janvier 2025 et 181€/MWh en mars 2026. Un outil qui dit
            &quot;les prix vont monter, souscrivez une offre fixe
            maintenant&quot; a une valeur commerciale enorme — c&apos;est un
            declencheur de conversion.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 7. PROJET 5 — GEO / PROTECTION GOOGLE                       */}
      {/* ============================================================ */}
      <Section id="geo" number="07" title="Projet 5 — Protection contre Google AI Overviews">
        <p>
          <strong>La menace existentielle.</strong> 81% du trafic de Selectra
          vient de Google organique. Les AI Overviews de Google repondent
          directement aux questions sans que l&apos;utilisateur clique sur le
          lien. Les etudes montrent une baisse de CTR de 34 a 46% quand un
          AI Overview apparait.
        </p>

        <Diagram title="La menace AI Overview">
          <pre className="text-center">{`
  AVANT (2024)
  User : "meilleur fournisseur electricite 2026"
       → Google affiche 10 liens bleus
       → Selectra est #1 → clic → appel → commission

  MAINTENANT (2026)
  User : "meilleur fournisseur electricite 2026"
       → Google AI Overview repond directement
       → "Selon nos sources, les meilleurs fournisseurs sont..."
       → L'utilisateur a sa reponse SANS cliquer
       → Selectra perd le trafic → perd le revenue
`}</pre>
        </Diagram>

        <p>Le projet :</p>

        <ComparisonTable
          headers={["Action", "Comment"]}
          rows={[
            ["Audit de risque", "Identifier quelles pages Selectra sont menacees par les AI Overviews"],
            ["Structured data", "Ajouter des schemas JSON-LD (FAQ, HowTo, Product) pour maximiser la citation dans les AI Overviews"],
            ["Tracking", "Dashboard qui suit quotidiennement si Selectra est cite dans les AI Overviews pour les requetes cibles"],
            ["Contenu optimise", "Reformater les articles pour etre \"citables\" par les LLMs (reponses directes, listes, comparatifs structures)"],
          ]}
        />

        <KeyConcept title="Pourquoi c'est critique">
          <p>
            Si 10% du trafic organique de Selectra est intercepte par les AI
            Overviews, ca represente ~35M de visites perdues par an. A un taux
            de conversion de 0.5%, c&apos;est 175 000 leads perdus. A 50€ de
            commission, c&apos;est <strong>8.7M€ de revenue en danger</strong>.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 8. PROJET 6 — AGENT VOCAL                                    */}
      {/* ============================================================ */}
      <Section id="agent-vocal" number="08" title="Projet 6 — Agent vocal de qualification">
        <p>
          Le projet le plus ambitieux mais le plus impactant. Un agent IA qui
          decroche le telephone, qualifie le client, et le transfere au
          commercial avec un dossier pre-rempli. 200+ commerciaux gagnent
          2-3 minutes par appel × 1000 appels/jour = une revolution
          operationnelle.
        </p>

        <KeyConcept title="Pourquoi c'est pertinent maintenant">
          <p>
            Selectra utilise deja Vonage Contact Center + Gladia. L&apos;infra
            telephonique existe. Les transcripts existent. On ajoute une couche
            IA par-dessus, on ne reconstruit pas from scratch.
          </p>
        </KeyConcept>

        <Diagram title="Architecture detaillee de l'agent vocal">
          <pre className="text-center">{`
  ┌───────────────────────────────────────────────────────────┐
  │                     TELEPHONIE                           │
  │  Numero Vonage → SIP trunk → WebSocket audio stream      │
  └────────────────────────┬──────────────────────────────────┘
                           │ audio PCM 16kHz
  ┌────────────────────────▼──────────────────────────────────┐
  │                  ORCHESTRATEUR                            │
  │  (Vapi / LiveKit Agents / custom Python)                  │
  │                                                           │
  │  ┌─────────┐   ┌──────────────┐   ┌───────────────────┐  │
  │  │  VAD    │   │    STT       │   │     TTS           │  │
  │  │ Silero  │   │  Gladia      │   │  Voxtral TTS      │  │
  │  │         │   │  Solaria     │   │  (Mistral, open)  │  │
  │  │ detect  │   │  <103ms      │   │  90ms first audio │  │
  │  │ silence │   │  streaming   │   │  voice clone 3s   │  │
  │  └────┬────┘   └──────┬───────┘   └────────▲──────────┘  │
  │       │               │ texte              │ texte       │
  │       │         ┌─────▼────────────────────┤             │
  │       │         │    LLM (Claude/GPT)      │             │
  │       │         │    via AI Gateway        │             │
  │       │         │                          │             │
  │       │         │  System prompt :         │             │
  │       │         │  - Role : agent qualif   │             │
  │       │         │  - Process : 5 etapes    │             │
  │       │         │  - Guardrails            │             │
  │       │         │                          │             │
  │       │         │  Tools :                 │             │
  │       │         │  ┌──────────────────┐    │             │
  │       │         │  │ chercherPDL()    │    │             │
  │       │         │  │ adresse → PDL    │    │             │
  │       │         │  ├──────────────────┤    │             │
  │       │         │  │ comparerOffres() │    │             │
  │       │         │  │ CP+conso → top 3 │    │             │
  │       │         │  ├──────────────────┤    │             │
  │       │         │  │ lookupDossier()  │    │             │
  │       │         │  │ n° → statut      │    │             │
  │       │         │  ├──────────────────┤    │             │
  │       │         │  │ transferer()     │    │             │
  │       │         │  │ fiche → humain   │    │             │
  │       │         │  └──────────────────┘    │             │
  │       │         │                          │             │
  │       │         │  RAG :                   │             │
  │       │         │  - FAQ (200+ Q/R)        │             │
  │       │         │  - Tarifs actuels         │             │
  │       │         │  - Scripts qualification  │             │
  │       │         └──────────────────────────┘             │
  └──────────────────────────────────────────────────────────┘
                           │
  ┌────────────────────────▼──────────────────────────────────┐
  │                   BACKEND                                 │
  │  Zoho CRM (fiche client) ← API webhook                  │
  │  Dashboard (conversations temps reel) ← WebSocket        │
  │  Vonage (transfert SIP vers commercial) ← API            │
  └──────────────────────────────────────────────────────────┘
`}</pre>
        </Diagram>

        <p>
          Le flow d&apos;un appel type :
        </p>

        <Code language="flow conversationnel detaille">{`[00:00] Client appelle le 09 XX XX XX XX
        → Vonage route vers l'agent IA

[00:01] Agent : "Bonjour, bienvenue chez Selectra, le comparateur d'energie.
         Comment puis-je vous aider aujourd'hui ?"

[00:05] Client : "Oui bonjour euh... je demenage le mois prochain et
         j'ai besoin de mettre l'electricite a mon nom"

[00:08] → Intent detecte : NOUVEAU_LOGEMENT
        → Agent entre dans le flow de qualification

[00:09] Agent : "Tres bien, felicitations pour votre demenagement !
         Quelle est l'adresse de votre nouveau logement ?"

[00:14] Client : "C'est au 42 rue Victor Hugo, a Lyon, dans le 3eme"

[00:16] → Tool call : chercherPDL("42 rue Victor Hugo, 69003 Lyon")
        → Resultat : { pdl: "09876543210987", puissance: 6 }

[00:17] Agent : "Parfait, j'ai retrouve votre compteur.
         Savez-vous environ combien vous consommez par an en electricite ?
         C'est sur votre derniere facture, en kilowattheures."

[00:25] Client : "Euh non j'ai pas ma facture... c'est un T3"

[00:27] → Pas de conso → estimation automatique
        → T3 Lyon ≈ 5500 kWh/an (estimation interne)

[00:28] Agent : "Pas de souci, pour un T3 on estime environ
         5500 kilowattheures par an. Je vais vous comparer
         les meilleures offres. Un instant..."

[00:30] → Tool call : comparerOffres("69003", 5500, "electricite")
        → Resultat : [
            { fournisseur: "OHM Energie", prix: 0.178, total: 1123 },
            { fournisseur: "Mint Energie", prix: 0.182, total: 1145 },
            { fournisseur: "TotalEnergies", prix: 0.189, total: 1184 }
          ]

[00:33] Agent : "Voici les trois meilleures offres pour votre logement :

         En premiere position, OHM Energie, a 0.178 euros le kilowattheure,
         soit environ 1123 euros par an.

         En deuxieme, Mint Energie, a 1145 euros par an.

         Et en troisieme, TotalEnergies, a 1184 euros par an.

         Souhaitez-vous que je vous transfere a un conseiller
         pour finaliser la souscription ? Il aura deja toutes
         vos informations."

[00:45] Client : "Oui, allez-y pour OHM Energie"

[00:46] → Tool call : transferer({
            adresse: "42 rue Victor Hugo, 69003 Lyon",
            pdl: "09876543210987",
            conso: 5500,
            intent: "nouveau_logement",
            offre_preferee: "OHM Energie",
            date_demenagement: "avril 2026"
          })
        → Fiche envoyee au CRM Zoho
        → Transfert SIP vers le prochain commercial disponible

[00:48] Agent : "Je vous transfere a un conseiller maintenant.
         Il a deja votre adresse et les offres comparees.
         Bonne installation et bonne journee !"

         → Le commercial recoit la fiche pre-remplie sur son ecran
         → Il enchaine directement sur la souscription (IBAN, etc.)
         → Gain : 2-3 minutes de qualification evitees`}</Code>

        <p>Les cas difficiles a gerer :</p>

        <ComparisonTable
          headers={["Situation", "Ce que fait l'agent", "Pourquoi"]}
          rows={[
            [
              "Client enerve",
              "Transfert immediat sans debat",
              "Un robot qui argumente avec un client enerve = catastrophe",
            ],
            [
              "Client demande un prix que l'agent n'a pas",
              "\"Je n'ai pas cette information, je vous transfere\"",
              "JAMAIS inventer — c'est ce qui a cause l'amende de 400K€",
            ],
            [
              "Client parle en meme temps",
              "Barge-in : l'agent s'arrete immediatement",
              "Le client doit toujours avoir la priorite vocale",
            ],
            [
              "Client ne sait pas son PDL",
              "\"Vous le trouvez sur votre facture ou sur votre compteur Linky, au-dessus de l'ecran\"",
              "Aider sans bloquer le flow",
            ],
            [
              "Client pose une question hors-sujet",
              "RAG sur la FAQ, reponse courte, puis retour au flow",
              "Ne pas devier — l'objectif est la qualification",
            ],
            [
              "Silence prolonge (>5s)",
              "\"Etes-vous toujours en ligne ?\"",
              "Verifier la connexion sans etre intrusif",
            ],
          ]}
        />

        <KeyConcept title="Metriques de succes">
          <p>
            <strong>Taux de qualification autonome :</strong> % d&apos;appels
            ou l&apos;agent collecte toutes les infos sans intervention humaine
            (cible : 70%). <strong>Temps moyen de qualification :</strong> cible
            &lt;2 min (vs 3-4 min humain). <strong>Taux de transfert
            reussi :</strong> % de transferts ou le commercial finalise la vente
            (cible : &gt;40%). <strong>NPS post-appel :</strong> satisfaction
            client vs appels 100% humains.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Composant", "Option recommandee", "Alternative", "Cout"]}
          rows={[
            ["STT", "Gladia Solaria (<103ms, FR natif, deja utilise)", "Deepgram", "~0.004€/min"],
            ["LLM", "Claude Sonnet 4.6 via AI Gateway (tool calling fiable)", "GPT-4o mini (moins cher, plus rapide)", "~0.01€/appel"],
            ["TTS", "Mistral Voxtral TTS (open-weights, 90ms, FR)", "ElevenLabs (meilleure qualite, plus cher)", "0 (Voxtral) vs ~0.01€/appel"],
            ["Orchestration", "Vapi (rapide a deployer, telephonie integree)", "LiveKit Agents (open-source, plus de controle)", "~0.05€/min (Vapi)"],
            ["RAG", "FAQ + tarifs en vector store (Chroma ou pgvector)", "Long context si <50 pages", "Negligeable"],
            ["CRM", "Zoho CRM API (ils l'ont deja)", "—", "0 (existant)"],
          ]}
        />

        <Code language="calcul de cout par appel">{`# Cout moyen d'un appel de 2 minutes avec l'agent vocal :
stt   = 2 * 0.004    # Gladia : 0.004€/min × 2 min      = 0.008€
llm   = 0.01          # Claude Sonnet : ~3000 tokens I/O  = 0.010€
tts   = 0.00          # Voxtral open-weights               = 0.000€
vapi  = 2 * 0.05      # Vapi orchestration : 0.05€/min    = 0.100€
#                                                    Total ≈ 0.12€/appel

# Cout humain (commercial) pour la meme qualification :
# Salaire moyen commercial Selectra ≈ 25K€/an = ~13€/heure
# 3 minutes de qualification = 0.65€ + charges sociales ≈ 1€/appel

# Economie par appel : 1€ - 0.12€ = 0.88€
# Sur 1000 appels/jour : 880€/jour = 22K€/mois = 264K€/an

# Et ca ne compte pas :
# - La disponibilite 24/7 (pas de nuit/weekend vide)
# - La reduction du temps d'attente client
# - La constance de qualite (pas de fatigue, pas de mauvais jour)`}</Code>
      </Section>

      {/* ============================================================ */}
      {/* 9. PROJET 7 — AGENT ASSIST                                   */}
      {/* ============================================================ */}
      <Section id="agent-assist" number="09" title="Projet 7 — Agent assist temps reel">
        <p>
          Plus facile a deployer que l&apos;agent vocal autonome et moins
          risque. L&apos;IA aide le commercial pendant l&apos;appel au lieu de
          le remplacer.
        </p>

        <Diagram title="Agent assist — ce que voit le commercial">
          <pre className="text-center">{`
  ┌──────────────────────────────────────────────────┐
  │  ECRAN DU COMMERCIAL (pendant l'appel)           │
  │                                                  │
  │  ┌─ Transcript live ────────────────────────┐    │
  │  │ Client: "Je suis chez EDF, mon compteur  │    │
  │  │ c'est le 09234... et je paye 120€/mois"  │    │
  │  └──────────────────────────────────────────┘    │
  │                                                  │
  │  ┌─ Infos extraites auto ──────────────────┐    │
  │  │ Fournisseur : EDF                        │    │
  │  │ PDL : 09234567890123                     │    │
  │  │ Budget mensuel : 120€ → ~8640 kWh/an     │    │
  │  │ Intent : changement_fournisseur          │    │
  │  └──────────────────────────────────────────┘    │
  │                                                  │
  │  ┌─ Suggestions IA ────────────────────────┐    │
  │  │ 🟢 OHM Energie    : 98€/mois (-18%)    │    │
  │  │ 🟡 Mint Energie   : 101€/mois (-16%)   │    │
  │  │ 🔵 TotalEnergies  : 105€/mois (-12%)   │    │
  │  │                                          │    │
  │  │ 💡 "Le client paie 22€ de plus que la   │    │
  │  │     meilleure offre. Forte economie."    │    │
  │  └──────────────────────────────────────────┘    │
  │                                                  │
  │  ┌─ Compliance ────────────────────────────┐    │
  │  │ ✅ Selectra mentionne                    │    │
  │  │ ⚠️  Droit retractation : PAS ENCORE DIT │    │
  │  │ ✅ Pas de fausse promesse               │    │
  │  └──────────────────────────────────────────┘    │
  │                                                  │
  │  ┌─ Sentiment ─────────────────────────────┐    │
  │  │ 😊 Client positif — bonne dynamique     │    │
  │  └──────────────────────────────────────────┘    │
  └──────────────────────────────────────────────────┘
`}</pre>
        </Diagram>

        <ComparisonTable
          headers={["Fonctionnalite", "Tech", "Valeur"]}
          rows={[
            ["Transcript live", "Gladia streaming STT → WebSocket → front React", "Le commercial ne prend plus de notes"],
            ["Extraction auto", "LLM structured output (adresse, PDL, conso) en continu", "Pre-remplissage CRM Zoho en temps reel"],
            ["Suggestions offres", "RAG sur catalogue + comparaison auto des le PDL detecte", "Le commercial a la bonne offre sans chercher"],
            ["Compliance check", "LLM verifie le script en live (disclosure, retractation)", "Evite les ecarts qui causent des amendes"],
            ["Sentiment analysis", "Classification continue (positif/neutre/negatif)", "Alerte si le client s'enerve"],
            ["Resume post-appel", "LLM genere un resume structure a la fin", "Plus de saisie manuelle dans Zoho"],
          ]}
        />

        <Warning>
          <p>
            <strong>Avantage vs agent vocal autonome :</strong> pas de TTS
            (pas de risque de voix bizarre), pas de risque de mauvaise reponse
            au client (c&apos;est le commercial qui parle), deploiement
            progressif (on peut commencer avec 5 commerciaux). C&apos;est le
            projet &quot;safe&quot; a proposer si Selectra hesite sur
            l&apos;autonomie.
          </p>
        </Warning>

        <Code language="python — extraction en temps reel">{`import json
from anthropic import Anthropic

client = Anthropic()

def extract_from_transcript(transcript_so_far: str) -> dict:
    """Extrait les infos client du transcript en cours."""
    response = client.messages.create(
        model="claude-sonnet-4-6-20250514",
        max_tokens=300,
        messages=[{
            "role": "user",
            "content": f"""Extrais les infos du transcript en cours.
Reponds en JSON. Mets null si pas encore mentionne.

{{"intent": "nouveau_logement|changement|suivi|reclamation|null",
  "adresse": "string|null",
  "fournisseur_actuel": "string|null",
  "pdl": "string|null",
  "conso_kwh": "number|null",
  "budget_mensuel": "number|null",
  "sentiment": "positif|neutre|negatif"}}

Transcript:
{transcript_so_far}"""
        }],
    )
    return json.loads(response.content[0].text)

# Appele toutes les 5-10 secondes pendant l'appel
# Le front met a jour le dashboard commercial en temps reel`}</Code>
      </Section>

      {/* ============================================================ */}
      {/* 10. AUTRES PROJETS                                           */}
      {/* ============================================================ */}
      <Section id="autres" number="10" title="Autres projets a proposer">
        <ComparisonTable
          headers={["Projet", "Description", "Impact", "Difficulte"]}
          rows={[
            [
              "Churn prediction",
              "Predire quels abonnes vont changer de fournisseur dans 6 mois → les re-contacter avec une meilleure offre",
              "375K€/an (5% de reconversion sur 150K churners)",
              "Moyen",
            ],
            [
              "Selectra Score personnalise",
              "Le Score actuel utilise un profil fixe (6000 kWh). Le personnaliser avec les vraies donnees MySelectra",
              "Meilleure satisfaction, moins de reclamations",
              "Moyen",
            ],
            [
              "Detection d'intent demenagement",
              "Classifier les sessions web pour detecter les demenageurs (valeur 4-5x vs client simple)",
              "Revenu/lead x3-5 sur les demenageurs",
              "Faible",
            ],
            [
              "Multi-language auto-update",
              "Detecter quand un tarif change en FR et propager aux 16 autres pays automatiquement",
              "Reduction risque compliance + gain editorial",
              "Faible",
            ],
            [
              "Agent vocal de qualification",
              "Le classique — agent IA qui qualifie avant le commercial",
              "Economie 5-10K€/jour sur 1000 appels",
              "Eleve",
            ],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 9. CE QUI IMPRESSIONNE                                       */}
      {/* ============================================================ */}
      <Section id="entretien" number="11" title="Ce qui impressionne en entretien">
        <Steps>
          <Step number="1" title="Montrer que tu connais leur stack">
            <p>
              &quot;Vous utilisez Zoho CRM avec Vonage Contact Center. Vonage
              a un Conversation Analyzer integre (Google Vertex AI) que vous
              pourriez activer pour du scoring temps reel.&quot;
            </p>
          </Step>
          <Step number="2" title="Montrer que tu connais leurs problemes">
            <p>
              &quot;L&apos;amende DGCCRF de 400K€ en 2024 vient d&apos;un
              manque de monitoring des agents offshore. Un pipeline LLM sur les
              transcripts resout ca en quelques semaines.&quot;
            </p>
          </Step>
          <Step number="3" title="Parler de la menace AI Overviews">
            <p>
              &quot;81% de votre trafic est organique Google. Les AI Overviews
              font baisser le CTR de 34-46%. C&apos;est un risque de plusieurs
              millions d&apos;euros par an. Je propose un audit + une strategie
              GEO.&quot;
            </p>
          </Step>
          <Step number="4" title="Avoir un prototype">
            <p>
              Un script Python qui score 10 transcripts d&apos;appels vaut mieux
              que 50 slides. Un dashboard qui track les AI Overviews en live
              impressionne plus qu&apos;un memo.
            </p>
          </Step>
        </Steps>

        <KeyConcept title="Le pitch complet">
          <p>
            &quot;Selectra a trois urgences IA : la compliance des appels
            (eviter la prochaine amende), le lead scoring (convertir mieux),
            et la protection contre les AI Overviews de Google (proteger 81%
            du trafic). Je peux prototyper les trois en stage. Mon site
            zaccharietardy.fr montre que je maitrise la stack — LLMs, RAG,
            agents, voice AI.&quot;
          </p>
        </KeyConcept>
      </Section>
    </>
  );
}
