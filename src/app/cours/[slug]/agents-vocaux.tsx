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

export function AgentsVocaux() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. POURQUOI LES AGENTS VOCAUX                                */}
      {/* ============================================================ */}
      <Section id="pourquoi" number="01" title="Pourquoi les agents vocaux ?">
        <p>
          Les entreprises du secteur de l&apos;energie recoivent des milliers
          d&apos;appels par jour. Les commerciaux passent les 2-3 premieres
          minutes de chaque appel a poser les memes questions : adresse,
          fournisseur actuel, numero PDL, consommation estimee. C&apos;est
          repetitif, couteux, et les clients attendent parfois longtemps
          avant d&apos;avoir quelqu&apos;un.
        </p>
        <p>
          L&apos;agent vocal IA resout ca : il repond instantanement, 24/7,
          collecte les infos de qualification, et transfere au commercial humain
          avec un dossier pre-rempli. Le commercial gagne 2-3 minutes par appel
          et se concentre sur le conseil et la vente.
        </p>

        <KeyConcept title="Le marche des agents vocaux en 2026">
          <p>
            Les agents vocaux IA sont un des secteurs les plus dynamiques de
            l&apos;IA. Selectra utilise deja <strong>Gladia</strong> (startup
            francaise) pour analyser les appels a posteriori avec du STT + LLM.
            L&apos;etape suivante — et c&apos;est probablement la ou tu
            interviens — c&apos;est le temps reel.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 2. LE PIPELINE CLASSIQUE                                     */}
      {/* ============================================================ */}
      <Section
        id="pipeline-classique"
        number="02"
        title="Le pipeline classique : STT → LLM → TTS"
      >
        <p>
          L&apos;architecture la plus repandue aujourd&apos;hui pour un agent
          vocal suit ce pipeline en cascade :
        </p>

        <Diagram title="Pipeline vocal classique (cascade)">
          <pre className="text-center">{`
  Client parle (audio)
        |
  ┌─────────────────┐
  │   STT           │  Speech-to-Text
  │   (Deepgram,    │  Audio → Texte
  │    Gladia,      │  ~100-300ms
  │    Whisper)      │
  └────────┬────────┘
           |
  ┌────────▼────────┐
  │   LLM           │  Raisonnement
  │   (Claude, GPT) │  Texte → Texte
  │                  │  ~200-1000ms
  │   + Tool calling │
  └────────┬────────┘
           |
  ┌────────▼────────┐
  │   TTS           │  Text-to-Speech
  │   (ElevenLabs,  │  Texte → Audio
  │    Voxtral,     │  ~100-300ms
  │    OpenAI TTS)  │
  └────────┬────────┘
           |
  Agent parle (audio)

  LATENCE TOTALE : 400ms - 1.6s
  (acceptable si < 1s, perceptible si > 1.5s)
`}</pre>
        </Diagram>

        <Code language="python — STT avec Whisper (OpenAI) en 5 lignes">{`import whisper  # pip install openai-whisper

model = whisper.load_model("base")  # small, medium, large pour + de precision
result = model.transcribe("appel_client.wav", language="fr")
print(result["text"])
# → "Bonjour, je demenage a Lyon et j'ai besoin d'ouvrir un contrat d'electricite"

# Avec timestamps par segment
for segment in result["segments"]:
    print(f"[{segment['start']:.1f}s → {segment['end']:.1f}s] {segment['text']}")`}</Code>

        <Code language="python — TTS avec Coqui (open-source) ou API">{`# Option 1 : TTS open-source avec Coqui (pip install TTS)
from TTS.api import TTS
tts = TTS(model_name="tts_models/fr/css10/vits")
tts.tts_to_file("Bonjour, bienvenue chez Selectra.", file_path="reponse.wav")

# Option 2 : API ElevenLabs (pip install elevenlabs)
from elevenlabs import generate, save
audio = generate(
    text="Tres bien, quelle est l'adresse de votre nouveau logement ?",
    voice="Rachel",       # voix pre-faite ou clonee
    model="eleven_multilingual_v2"
)
save(audio, "reponse.mp3")`}</Code>

        <ComparisonTable
          headers={["Composant", "Fournisseur", "Latence", "Forces"]}
          rows={[
            ["STT", "Deepgram", "~100ms (streaming)", "Ultra-rapide, streaming mot par mot"],
            ["STT", "Gladia (Solaria)", "<103ms", "Excellent francais, utilise par Selectra"],
            ["STT", "Whisper (OpenAI)", "~300-500ms", "Tres precis, mais plus lent (pas de streaming)"],
            ["STT", "Mistral Voxtral Transcribe", "<200ms", "Francais natif, open weights"],
            ["LLM", "Claude Sonnet", "~300-500ms (streaming)", "Excellent suivi d'instructions"],
            ["LLM", "GPT-4o mini", "~100-200ms", "Tres rapide, bon pour le routage"],
            ["TTS", "ElevenLabs", "~200ms", "Voix tres naturelles, francais excellent"],
            ["TTS", "Mistral Voxtral TTS", "90ms first audio", "Open weights, voice cloning 3s"],
            ["TTS", "OpenAI TTS", "~200ms", "Bon rapport qualite/prix"],
          ]}
        />

        <Warning>
          <p>
            <strong>La latence est TOUT en vocal.</strong> En conversation
            humaine, un silence de plus de ~800ms est percu comme anormal. Pour
            que l&apos;agent semble naturel, il faut une latence totale &lt;1s
            du moment ou le client finit de parler au moment ou l&apos;agent
            commence a repondre. Le streaming (TTS commence avant que le LLM ait
            fini) est essentiel.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 3. LA REVOLUTION SPEECH-TO-SPEECH                            */}
      {/* ============================================================ */}
      <Section
        id="speech-to-speech"
        number="03"
        title="La revolution : Speech-to-Speech (Kyutai / Moshi)"
      >
        <p>
          Et si on supprimait completement les etapes intermediaires ? C&apos;est
          exactement ce qu&apos;a fait <strong>Kyutai</strong>, un labo de
          recherche francais finance par Xavier Niel (Free) et Eric Schmidt.
        </p>

        <KeyConcept title="Moshi — le premier modele speech-to-speech open-source">
          <p>
            <Term def="Modele de dialogue vocal developpe par Kyutai (Paris). Au lieu de convertir audio → texte → texte → audio, il traite l'audio directement comme des tokens. Resultat : ~200ms de latence et conversation full-duplex.">Moshi</Term>{" "}
            elimine la cascade STT → LLM → TTS en traitant l&apos;audio
            directement comme des tokens dans un seul modele neural. Resultat :
            ~200ms de latence et <strong>full-duplex</strong> (il peut ecouter
            et parler en meme temps).
          </p>
        </KeyConcept>

        <Diagram title="Pipeline classique vs Speech-to-Speech">
          <pre className="text-center">{`
  CLASSIQUE (cascade)              SPEECH-TO-SPEECH (Moshi)
  ───────────────────              ──────────────────────────

  Audio ──▶ STT ──▶ LLM ──▶ TTS   Audio ──▶ ┌────────────┐ ──▶ Audio
           100ms   500ms   200ms              │   MOSHI    │
           ─────────────────────              │ (un seul   │
           Total: ~800ms+                     │  modele)   │
                                              └────────────┘
           Demi-duplex:                       Total: ~200ms
           L'un parle, l'autre
           ecoute. Pas les deux.              Full-duplex:
                                              Ecoute ET parle en
                                              meme temps. Peut
                                              s'interrompre.
`}</pre>
        </Diagram>

        <p>Comment ca marche techniquement ?</p>

        <Steps>
          <Step number="1" title="Mimi (codec neural)">
            <p>
              L&apos;audio est compresse en tokens semantiques a 12.5 Hz grace
              au codec <strong>Mimi</strong>. Ces tokens capturent a la fois le
              contenu (les mots) et le style (l&apos;intonation, l&apos;emotion).
              C&apos;est comme un tokenizer, mais pour l&apos;audio.
            </p>
          </Step>
          <Step number="2" title="Dual-stream Transformer (7B params)">
            <p>
              Un seul Transformer traite simultanement deux flux : la voix de
              l&apos;utilisateur ET la voix de Moshi. Ca permet le full-duplex —
              Moshi peut commencer a repondre avant que tu aies fini de parler.
            </p>
          </Step>
          <Step number="3" title="Inner Monologue">
            <p>
              Moshi genere du texte en interne avant de generer l&apos;audio.
              Ca ameliore la qualite linguistique sans ajouter de latence
              perceptible — le texte est genere &quot;dans la tete&quot; du
              modele, pas en sortie.
            </p>
          </Step>
        </Steps>

        <Code language="python — Moshi (Kyutai) en local">{`# pip install moshi  (necessite un GPU avec >=16GB VRAM)
from moshi.client import Client

# Se connecter au serveur Moshi local
client = Client("localhost:8998")

# Moshi fonctionne en streaming bidirectionnel :
# tu envoies de l'audio, il repond en audio, en temps reel
import sounddevice as sd
import numpy as np

def callback(indata, outdata, frames, time, status):
    # Envoie l'audio du micro → recoit l'audio de Moshi
    response = client.send_audio(indata)
    outdata[:] = response  # joue la reponse dans les speakers

# Stream full-duplex : ecoute ET parle en meme temps
with sd.Stream(samplerate=24000, channels=1, callback=callback):
    print("Parle a Moshi... (Ctrl+C pour arreter)")
    sd.sleep(60000)  # 60 secondes de conversation`}</Code>

        <ComparisonTable
          headers={["", "Pipeline classique", "Moshi (S2S)", "Gradium (commercial)"]}
          rows={[
            ["Latence", "400ms - 1.6s", "~200ms", "Sub-seconde"],
            ["Full-duplex", "Non", "Oui", "Oui"],
            ["Interruptions", "Complexe (VAD)", "Natif", "Natif"],
            ["Qualite voix", "Depends du TTS", "Correcte, en progres", "En cours d'amelioration"],
            ["Tool calling", "Oui (via le LLM)", "Limite", "En developpement"],
            ["Open-source", "Depends des composants", "Oui (CC BY 4.0)", "Non (API)"],
            ["Production-ready", "Oui", "Recherche", "Bientot"],
          ]}
        />

        <Warning>
          <p>
            <strong>Pour ton stage Selectra :</strong> le pipeline classique est
            le choix pragmatique. Moshi est de la recherche — extraordinaire pour
            comprendre et en parler en entretien, mais pas encore
            production-ready pour du tool calling en francais. Utilise le pipeline
            cascade (Deepgram/Gladia + Claude + ElevenLabs/Voxtral) pour ta
            demo, et mentionne Moshi/Gradium comme &quot;le futur du domaine&quot;.
          </p>
        </Warning>

        <KeyConcept title="Gradium — le spin-off commercial">
          <p>
            <strong>Gradium</strong> (Paris, $70M de seed en dec 2025) est le
            spin-off commercial de Kyutai. Meme equipe (Neil Zeghidour,
            Alexandre Defossez), meme techno, mais packagée en API B2B. Ils
            gèrent déjà des centaines de milliers d&apos;appels telephoniques.
            C&apos;est probablement le futur fournisseur pour des boites comme
            Selectra.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 4. VAD ET TURN-TAKING                                        */}
      {/* ============================================================ */}
      <Section
        id="vad-turn-taking"
        number="04"
        title="VAD et turn-taking — qui parle quand ?"
      >
        <p>
          Un des plus gros defis des agents vocaux : savoir quand le client
          a fini de parler pour commencer a repondre. C&apos;est le
          <Term def="Voice Activity Detection — algorithme qui detecte quand quelqu'un parle et quand il y a du silence. Essentiel pour savoir quand commencer a repondre."> VAD</Term>{" "}
          et le <Term def="Gestion des tours de parole — qui parle quand dans la conversation. L'agent doit savoir quand le client a fini, quand il hesite, et quand il est interrompu.">turn-taking</Term>.
        </p>

        <KeyConcept title="Le dilemme du VAD">
          <p>
            Si l&apos;agent repond trop vite → il coupe la parole au client
            (irritant). S&apos;il attend trop longtemps → silence genant. Le
            bon reglage depend du contexte : un client qui hesite sur un numero
            PDL a besoin de plus de temps qu&apos;un client qui dit &quot;oui&quot;.
          </p>
        </KeyConcept>

        <ComparisonTable
          headers={["Technique", "Principe", "Avantage", "Inconvenient"]}
          rows={[
            [
              "Silence threshold",
              "Attendre N ms de silence avant de repondre",
              "Simple a implementer",
              "N fixe = trop court ou trop long selon le contexte",
            ],
            [
              "Endpointing avance",
              "Modele ML qui detecte la fin de phrase (prosodie, syntaxe)",
              "Plus naturel, s'adapte",
              "Plus complexe, necessite un bon modele",
            ],
            [
              "Semantic turn-taking (Gradium)",
              "Le modele comprend le CONTENU pour detecter la fin de pensee",
              "Le plus naturel, gere les hesitations",
              "Etat de l'art, pas encore standard",
            ],
          ]}
        />

        <p>En pratique pour ton agent Selectra :</p>

        <Code language="config VAD — LiveKit">{`// Configuration VAD typique pour un agent de qualification
const vadConfig = {
  // Silence minimum avant de considerer que le client a fini
  silenceThreshold: 700,    // ms — augmenter a 1200 quand on attend un numero PDL

  // Seuil d'energie pour detecter la parole
  energyThreshold: 0.02,

  // Gestion des interruptions (barge-in)
  allowBargeIn: true,       // Le client peut couper l'agent
  bargeInThreshold: 300,    // ms de parole client pour interrompre

  // Padding
  speechPadding: 200,       // ms de marge apres la detection de silence
};`}</Code>

        <Warning>
          <p>
            <strong>Le barge-in est essentiel :</strong> si un client dit
            &quot;Non non, c&apos;est pas ca&quot; pendant que l&apos;agent
            parle, l&apos;agent doit s&apos;arreter immediatement. Sans
            barge-in, le client se retrouve a ecouter une reponse fausse
            jusqu&apos;au bout — c&apos;est la pire experience utilisateur.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 5. ARCHITECTURES                                             */}
      {/* ============================================================ */}
      <Section
        id="architectures"
        number="05"
        title="Architectures et frameworks"
      >
        <p>
          Tu n&apos;as pas besoin de tout coder from scratch. Plusieurs
          frameworks gerent l&apos;orchestration vocale pour toi.
        </p>

        <ComparisonTable
          headers={["Framework", "Type", "Avantage", "Inconvenient", "Prix"]}
          rows={[
            [
              "Vapi",
              "Platform (managed)",
              "Le plus simple — config par JSON, telephonie integree",
              "Moins de controle, vendor lock-in",
              "~5c/min",
            ],
            [
              "LiveKit Agents",
              "Open-source",
              "Full controle, self-hosted possible, communaute active",
              "Plus de code a ecrire",
              "Gratuit (self-hosted) ou hosted",
            ],
            [
              "Retell AI",
              "Platform",
              "Bonne qualite francais, API simple",
              "Moins flexible que LiveKit",
              "~7c/min",
            ],
            [
              "Bland.ai",
              "Platform",
              "Optimise pour les appels sortants (outbound)",
              "Moins bon en inbound",
              "~9c/min",
            ],
            [
              "Custom (WebSocket)",
              "DIY",
              "Controle total, pas de dependance",
              "Beaucoup de travail, gestion de la telephonie",
              "Cout des APIs STT/LLM/TTS",
            ],
          ]}
        />

        <KeyConcept title="Recommandation pour ton stage">
          <p>
            Pour la demo : <strong>Vapi</strong> (le plus rapide a mettre en
            place, telephonie integree, bon francais). Pour un vrai projet
            technique : <strong>LiveKit Agents</strong> (open-source, plus de
            controle, impressionnant en entretien technique).
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 6. L'ECOSYSTEME FRANCAIS                                     */}
      {/* ============================================================ */}
      <Section
        id="ecosysteme-fr"
        number="06"
        title="L'ecosysteme francais de la voix IA"
      >
        <p>
          La France est un des leaders mondiaux en voice AI. Connaitre cet
          ecosysteme est un atout enorme pour ton stage.
        </p>

        <ComparisonTable
          headers={["Boite", "Produit", "Approche", "Lien avec Selectra"]}
          rows={[
            [
              "Kyutai",
              "Moshi (speech-to-speech)",
              "Modele end-to-end, full-duplex, open-source",
              "Futur de la techno, pas encore production",
            ],
            [
              "Gradium",
              "Audio Language Models API",
              "Spin-off commercial de Kyutai ($70M)",
              "Pourrait etre le fournisseur de Selectra demain",
            ],
            [
              "Gladia",
              "Solaria (STT)",
              "STT ultra-rapide (<103ms), 100 langues",
              "DEJA UTILISE par Selectra pour l'analyse d'appels",
            ],
            [
              "Mistral",
              "Voxtral (STT + TTS)",
              "Open weights, voice cloning 3s, 90ms latence",
              "Alternative open-source pour STT et TTS",
            ],
          ]}
        />

        <KeyConcept title="Ce que tu dois savoir dire en entretien">
          <p>
            &quot;Selectra utilise deja Gladia pour l&apos;analyse post-appel.
            L&apos;etape suivante, c&apos;est le temps reel. Le pipeline
            classique (Gladia STT + Claude + Voxtral TTS) permet de deployer
            un agent vocal en quelques semaines. A terme, les modeles
            speech-to-speech comme Moshi de Kyutai — un labo francais — vont
            revolutionner le domaine en supprimant la latence de cascade. Le
            spin-off commercial Gradium gere deja des centaines de milliers
            d&apos;appels.&quot;
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 7. AGENT SELECTRA COMPLET                                    */}
      {/* ============================================================ */}
      <Section
        id="agent-selectra"
        number="07"
        title="Architecture complete : l'agent vocal Selectra"
      >
        <Diagram title="Architecture de production">
          <pre className="text-center">{`
  ┌─────────────────────────────────────────────────────┐
  │                TELEPHONIE                           │
  │  Numero entrant → SIP trunk → WebSocket             │
  │  (Twilio, Vonage, ou Vapi integre)                  │
  └──────────────────────┬──────────────────────────────┘
                         │ audio stream
  ┌──────────────────────▼──────────────────────────────┐
  │              ORCHESTRATEUR VOCAL                     │
  │  (LiveKit Agents ou Vapi)                           │
  │                                                      │
  │  ┌──────────┐  ┌───────────┐  ┌──────────────────┐ │
  │  │   VAD    │  │   STT     │  │    TTS           │ │
  │  │ (silence │  │ (Gladia   │  │ (Voxtral TTS     │ │
  │  │  detect) │  │  Solaria) │  │  ou ElevenLabs)  │ │
  │  └──────────┘  └─────┬─────┘  └────────▲─────────┘ │
  │                      │ texte            │ texte     │
  │                ┌─────▼─────────────────┐│           │
  │                │      LLM + AGENT      ││           │
  │                │  (Claude via AI SDK)   ├┘           │
  │                │                        │            │
  │                │  Tools:                │            │
  │                │  - chercherPDL()       │            │
  │                │  - comparerOffres()    │            │
  │                │  - transfererHumain()  │            │
  │                │                        │            │
  │                │  RAG:                  │            │
  │                │  - FAQ Selectra        │            │
  │                │  - Tarifs actuels      │            │
  │                └────────────────────────┘            │
  └─────────────────────────────────────────────────────┘
                         │
  ┌──────────────────────▼──────────────────────────────┐
  │              BACKEND (Next.js)                       │
  │  - API routes pour les tools                        │
  │  - Base de donnees (fiches client)                  │
  │  - Dashboard temps reel (WebSocket)                 │
  │  - CRM integration                                 │
  └─────────────────────────────────────────────────────┘
`}</pre>
        </Diagram>

        <p>
          Ce schema, c&apos;est exactement ce qu&apos;on a construit module par
          module :
        </p>

        <ComparisonTable
          headers={["Module", "Brique", "Role dans l'agent"]}
          rows={[
            ["Module 1", "Fondations LLM", "Comprendre comment le cerveau de l'agent fonctionne"],
            ["Module 2", "Prompt Engineering", "Ecrire le system prompt de qualification"],
            ["Module 3", "RAG", "Donner les tarifs actuels et la FAQ a l'agent"],
            ["Module 4", "Tool Calling & Agents", "Chercher le PDL, comparer les offres, transferer"],
            ["Module 5", "Pipeline vocal", "STT + TTS + orchestration + telephonie"],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 8. DEEP DIVE : VAD TECHNIQUE                                 */}
      {/* ============================================================ */}
      <Section
        id="vad-technique"
        number="08"
        title="Deep dive : comment le VAD fonctionne techniquement"
      >
        <p>
          On a vu que le VAD detecte quand le client parle et quand il y a du
          silence. Mais comment ca marche sous le capot ? Il y a trois
          approches, de la plus simple a la plus sophistiquee.
        </p>

        <KeyConcept title="Les 3 approches du VAD">
          <p>
            <strong>1) Energie</strong> — mesurer le volume sonore. Simple mais
            fragile (bruit de fond). <strong>2) Zero-crossing rate</strong> — mesurer
            la frequence des oscillations. Combine avec l&apos;energie, ca
            marche bien. <strong>3) ML-based</strong> (Silero VAD) — un petit
            reseau de neurones entraine a distinguer parole/silence. Le standard
            en production.
          </p>
        </KeyConcept>

        <Steps>
          <Step number="1" title="Approche par energie (RMS)">
            <p>
              L&apos;idee la plus simple : calculer le volume
              (<Term def="Root Mean Square — la racine carree de la moyenne des carres des echantillons audio. Mesure l'energie/volume du signal.">RMS</Term>)
              de chaque fenetre audio. Si le volume depasse un seuil, quelqu&apos;un parle.
            </p>
          </Step>
          <Step number="2" title="Zero-Crossing Rate (ZCR)">
            <p>
              Compter combien de fois le signal audio passe par zero dans une
              fenetre. La parole humaine a un ZCR typique (1000-3000 Hz), alors
              que le bruit blanc a un ZCR eleve et irregulier. Combine avec
              l&apos;energie, ca filtre bien le bruit de fond.
            </p>
          </Step>
          <Step number="3" title="ML-based (Silero VAD)">
            <p>
              Un petit modele (quelques MB) entraine sur des milliers d&apos;heures
              de parole/silence. Il donne une probabilite de parole pour chaque
              fenetre de 30ms. C&apos;est le standard en production — utilise par
              LiveKit, Vapi, et la plupart des frameworks vocaux.
            </p>
          </Step>
        </Steps>

        <Code language="python — VAD energy-based from scratch avec numpy">{`import numpy as np

def load_audio(path: str, sample_rate: int = 16000) -> np.ndarray:
    """Charger un fichier WAV en float32 normalise [-1, 1]."""
    import wave
    with wave.open(path, 'rb') as wf:
        assert wf.getsampwidth() == 2, "16-bit WAV attendu"
        assert wf.getframerate() == sample_rate
        frames = wf.readframes(wf.getnframes())
        audio = np.frombuffer(frames, dtype=np.int16).astype(np.float32) / 32768.0
    return audio

class EnergyVAD:
    """VAD basique par energie + zero-crossing rate.
    Suffisant pour un prototype, pas pour la production."""

    def __init__(
        self,
        sample_rate: int = 16000,
        frame_ms: int = 30,        # taille de fenetre en ms
        energy_threshold: float = 0.02,  # seuil RMS
        zcr_threshold: float = 0.5,      # seuil ZCR normalise
        min_speech_ms: int = 200,        # duree min de parole pour confirmer
        min_silence_ms: int = 700,       # duree min de silence pour fin de parole
    ):
        self.sample_rate = sample_rate
        self.frame_size = int(sample_rate * frame_ms / 1000)  # 16000 * 0.03 = 480 echantillons
        self.energy_threshold = energy_threshold
        self.zcr_threshold = zcr_threshold
        self.min_speech_frames = int(min_speech_ms / frame_ms)
        self.min_silence_frames = int(min_silence_ms / frame_ms)

    def _rms(self, frame: np.ndarray) -> float:
        """Root Mean Square — mesure l'energie du signal."""
        return np.sqrt(np.mean(frame ** 2))

    def _zcr(self, frame: np.ndarray) -> float:
        """Zero-Crossing Rate — combien de fois le signal passe par zero.
        Normalise entre 0 et 1."""
        signs = np.sign(frame)
        crossings = np.sum(np.abs(np.diff(signs)) > 0)
        return crossings / len(frame)

    def detect(self, audio: np.ndarray) -> list[dict]:
        """Detecter les segments de parole dans un signal audio.

        Returns: liste de {start_ms, end_ms, type: "speech"|"silence"}
        """
        segments = []
        is_speech = False
        speech_count = 0
        silence_count = 0
        segment_start = 0

        for i in range(0, len(audio) - self.frame_size, self.frame_size):
            frame = audio[i : i + self.frame_size]

            energy = self._rms(frame)
            zcr = self._zcr(frame)

            # Un frame est "parole" si l'energie est haute
            # ET le zero-crossing rate est dans la plage vocale
            frame_is_speech = energy > self.energy_threshold and zcr < self.zcr_threshold

            if not is_speech:
                if frame_is_speech:
                    speech_count += 1
                    if speech_count >= self.min_speech_frames:
                        # Assez de frames de parole consecutifs → debut de parole
                        is_speech = True
                        segment_start = i - (self.min_speech_frames * self.frame_size)
                        speech_count = 0
                else:
                    speech_count = 0
            else:
                if not frame_is_speech:
                    silence_count += 1
                    if silence_count >= self.min_silence_frames:
                        # Assez de silence → fin de parole
                        is_speech = False
                        segments.append({
                            "start_ms": int(segment_start / self.sample_rate * 1000),
                            "end_ms": int(i / self.sample_rate * 1000),
                            "type": "speech",
                        })
                        silence_count = 0
                else:
                    silence_count = 0

        return segments

# ── Utilisation ──
audio = load_audio("appel_client.wav")
vad = EnergyVAD(
    energy_threshold=0.02,   # ajuster selon le micro/bruit ambiant
    min_silence_ms=700,      # 700ms de silence = fin de parole
)
segments = vad.detect(audio)
for seg in segments:
    print(f"  [{seg['start_ms']}ms → {seg['end_ms']}ms] {seg['type']}")
# → [230ms → 3400ms] speech
# → [4100ms → 8200ms] speech`}</Code>

        <Code language="python — Silero VAD (production)">{`# pip install silero-vad torch torchaudio
import torch

# Charger le modele Silero VAD (~1MB, tourne sur CPU)
model, utils = torch.hub.load(
    repo_or_dir='snakers4/silero-vad',
    model='silero_vad',
    force_reload=False
)
(get_speech_timestamps, _, read_audio, _, _) = utils

# Charger l'audio
audio = read_audio("appel_client.wav", sampling_rate=16000)

# Detecter les segments de parole
speech_timestamps = get_speech_timestamps(
    audio,
    model,
    sampling_rate=16000,
    threshold=0.5,           # seuil de confiance (0-1)
    min_speech_duration_ms=250,  # ignorer les bruits courts
    min_silence_duration_ms=700, # silence pour fin de parole
)

for ts in speech_timestamps:
    start = ts['start'] / 16000 * 1000
    end = ts['end'] / 16000 * 1000
    print(f"  Parole : {start:.0f}ms → {end:.0f}ms")

# Silero est BEAUCOUP plus robuste que l'approche par energie :
# - resiste au bruit de fond (cafe, rue, ventilation)
# - distingue la parole de la musique/TV en arriere-plan
# - latence ~30ms par frame, tourne sur CPU`}</Code>

        <ComparisonTable
          headers={["Approche VAD", "Precision", "Latence", "Robustesse bruit", "Usage"]}
          rows={[
            ["Energie (RMS)", "~70%", "<1ms", "Faible", "Prototype, environnement calme"],
            ["Energie + ZCR", "~80%", "<1ms", "Moyenne", "Prototype ameliore"],
            ["Silero VAD (ML)", "~98%", "~30ms", "Excellente", "Production, standard industrie"],
            ["WebRTC VAD (Google)", "~90%", "<5ms", "Bonne", "Navigateur, applications legeres"],
          ]}
        />

        <Warning>
          <p>
            <strong>En production, utilise toujours Silero VAD</strong> ou
            equivalent ML. L&apos;approche par energie est pedagogique mais
            trop fragile — un client dans un cafe, une TV en fond, un
            ventilateur, et ton VAD detecte de la &quot;parole&quot; en
            permanence. Silero est gratuit, fait 1MB, et tourne sur CPU.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 9. DEEP DIVE : AUDIO STREAMING                               */}
      {/* ============================================================ */}
      <Section
        id="audio-streaming"
        number="09"
        title="Deep dive : comment le streaming audio fonctionne"
      >
        <p>
          L&apos;agent vocal doit recevoir et envoyer de l&apos;audio en temps
          reel. On ne peut pas attendre que le client ait fini de parler pour
          traiter — il faut du <strong>streaming bidirectionnel</strong>.
        </p>

        <KeyConcept title="WebSocket bidirectionnel">
          <p>
            Contrairement a HTTP (requete → reponse), un WebSocket reste ouvert
            et permet d&apos;envoyer des donnees dans les deux sens simultanement.
            Le client envoie des frames audio en continu, le serveur renvoie les
            frames audio de la reponse en continu. C&apos;est ce qui permet la
            conversation en temps reel.
          </p>
        </KeyConcept>

        <Diagram title="Streaming audio bidirectionnel (WebSocket)">
          <pre className="text-center">{`
  CLIENT (navigateur/telephone)           SERVEUR (agent vocal)
  ─────────────────────────────           ────────────────────────
       │                                       │
       │══ WebSocket connection ══════════════│
       │    (reste ouvert pendant tout        │
       │     l'appel, pas de reconnexion)     │
       │                                       │
       │── audio frame (20ms, 640 bytes) ────▶│
       │── audio frame (20ms, 640 bytes) ────▶│──▶ VAD: parole detectee
       │── audio frame (20ms, 640 bytes) ────▶│──▶ STT accumule...
       │── audio frame (20ms, 640 bytes) ────▶│──▶ STT: "Bonjour je"
       │── audio frame (20ms, 640 bytes) ────▶│──▶ STT: "Bonjour je veux"
       │── silence (20ms) ───────────────────▶│
       │── silence (20ms) ───────────────────▶│──▶ VAD: 700ms silence
       │                                       │──▶ STT final: "Bonjour
       │                                       │     je veux changer"
       │                                       │──▶ LLM commence a generer
       │                                       │
       │◀── audio frame TTS (20ms) ───────────│◀── TTS stream mot par mot
       │◀── audio frame TTS (20ms) ───────────│
       │◀── audio frame TTS (20ms) ───────────│
       │     (l'agent parle pendant que        │
       │      le LLM continue a generer)      │
       │                                       │
       │── audio frame (barge-in!) ──────────▶│──▶ Client interrompt !
       │                                       │──▶ STOP TTS, ecouter
       │                                       │
`}</pre>
        </Diagram>

        <p>
          Les details techniques qui comptent :
        </p>

        <ComparisonTable
          headers={["Parametre", "STT (entree)", "TTS (sortie)", "Pourquoi"]}
          rows={[
            [
              "Sample rate",
              "16 000 Hz",
              "24 000 Hz (ou 22 050 Hz)",
              "16kHz suffit pour la parole (bande 0-8kHz). Le TTS est a 24kHz pour une meilleure qualite de synthese.",
            ],
            [
              "Format",
              "PCM 16-bit mono (ou Opus)",
              "PCM 16-bit mono (ou MP3/Opus)",
              "PCM = pas de compression, zero latence de decodage. Opus = compresse, economise la bande passante.",
            ],
            [
              "Taille de frame",
              "20ms (320 echantillons a 16kHz)",
              "20ms (480 echantillons a 24kHz)",
              "20ms est le standard — assez court pour le temps reel, assez long pour etre efficace.",
            ],
            [
              "Debit",
              "~256 kbps (PCM) ou ~32 kbps (Opus)",
              "~384 kbps (PCM) ou ~48 kbps (Opus)",
              "Opus divise par 8 la bande passante avec une perte de qualite imperceptible.",
            ],
          ]}
        />

        <Code language="typescript — WebSocket audio streaming (serveur)">{`import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connecte — debut de l'appel");

  // Buffer pour accumuler l'audio entrant
  let audioBuffer: Buffer[] = [];
  let silenceMs = 0;
  const FRAME_MS = 20;
  const SILENCE_THRESHOLD_MS = 700;

  ws.on("message", async (data: Buffer) => {
    // Chaque message = un frame audio de 20ms
    // PCM 16-bit mono 16kHz = 640 bytes par frame

    const energy = calculateRMS(data);

    if (energy > 0.02) {
      // Parole detectee — accumuler
      audioBuffer.push(data);
      silenceMs = 0;
    } else {
      silenceMs += FRAME_MS;

      if (silenceMs >= SILENCE_THRESHOLD_MS && audioBuffer.length > 0) {
        // 700ms de silence → le client a fini de parler
        const fullAudio = Buffer.concat(audioBuffer);
        audioBuffer = [];
        silenceMs = 0;

        // 1. STT
        const transcript = await speechToText(fullAudio);
        console.log("Client:", transcript);

        // 2. LLM (streaming)
        const llmStream = await generateTextStream(transcript);

        // 3. TTS (streaming — commence a parler avant que le LLM ait fini)
        for await (const textChunk of llmStream) {
          const audioChunk = await textToSpeech(textChunk);
          // Envoyer le frame audio au client
          ws.send(audioChunk);  // ← l'agent "parle" en temps reel
        }
      }
    }
  });

  ws.on("close", () => {
    console.log("Appel termine");
  });
});

function calculateRMS(pcmBuffer: Buffer): number {
  const samples = new Int16Array(pcmBuffer.buffer, pcmBuffer.byteOffset, pcmBuffer.length / 2);
  let sum = 0;
  for (const sample of samples) {
    const normalized = sample / 32768;
    sum += normalized * normalized;
  }
  return Math.sqrt(sum / samples.length);
}`}</Code>

        <KeyConcept title="Le streaming TTS est la cle de la latence">
          <p>
            Sans streaming : le LLM genere TOUT le texte (500ms), puis le TTS
            convertit TOUT en audio (300ms) = 800ms avant le premier son.
            Avec streaming : le LLM genere le premier mot (50ms), le TTS le
            convertit (50ms) = 100ms avant le premier son. Le client entend
            l&apos;agent commencer a parler quasi-instantanement pendant que le
            reste de la phrase est encore en cours de generation.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 10. DEEP DIVE : CODEC MIMI                                   */}
      {/* ============================================================ */}
      <Section
        id="codec-mimi"
        number="10"
        title="Deep dive : le codec Mimi — comment l'audio devient des tokens"
      >
        <p>
          Moshi de Kyutai ne traite pas de l&apos;audio brut — il traite des{" "}
          <strong>tokens audio</strong> generes par le codec neural{" "}
          <strong>Mimi</strong>. C&apos;est l&apos;innovation cle qui rend le
          speech-to-speech possible.
        </p>

        <KeyConcept title="Mimi — Neural Audio Codec">
          <p>
            Mimi compresse de l&apos;audio 24kHz en <strong>tokens
            discrets a 12.5 Hz</strong>. Ca signifie que chaque seconde
            d&apos;audio est representee par seulement 12.5 tokens (au lieu de
            24 000 echantillons). Ces tokens capturent a la fois le contenu
            semantique (les mots) et les caracteristiques acoustiques
            (l&apos;intonation, le timbre).
          </p>
        </KeyConcept>

        <Diagram title="Comment Mimi compresse l'audio">
          <pre className="text-center">{`
  Audio brut 24kHz
  ─────────────────
  24 000 echantillons/seconde
  Chaque echantillon = un nombre float32
  → 768 kbits/s (beaucoup trop pour un Transformer)

          │
          ▼

  ┌──────────────────────────────┐
  │  ENCODEUR (CNN convolutif)   │
  │                              │
  │  24000 Hz → downsample ×1920│
  │  = 12.5 frames par seconde  │
  │                              │
  │  Chaque frame = un vecteur   │
  │  continu de 256 dimensions   │
  └──────────┬───────────────────┘
             │
             ▼

  ┌──────────────────────────────┐
  │  RVQ — Residual Vector       │
  │  Quantization (8 codebooks) │
  │                              │
  │  Vecteur continu (256d)      │
  │       │                      │
  │       ├─▶ Codebook 1: token 847   (semantique — le MOT)
  │       │   residu = vecteur - code_847
  │       ├─▶ Codebook 2: token 231   (phonetique)
  │       │   residu = residu - code_231
  │       ├─▶ Codebook 3: token 1092  (prosodie)
  │       │   ...                      │
  │       └─▶ Codebook 8: token 455   (details fins)
  │                              │
  │  8 tokens par frame          │
  │  = 100 tokens/seconde total  │
  └──────────┬───────────────────┘
             │
             ▼

  ┌──────────────────────────────┐
  │  DECODEUR (CNN inverse)      │
  │                              │
  │  Tokens → vecteurs           │
  │  → upsample ×1920           │
  │  → audio reconstruit 24kHz  │
  └──────────────────────────────┘

  Compression : 24000 Hz → 12.5 Hz = ×1920
  Debit : ~1.1 kbps (vs 768 kbps original)
  Qualite : quasi-transparente (on entend pas la difference)
`}</pre>
        </Diagram>

        <Steps>
          <Step number="1" title="L'encodeur CNN (downsample)">
            <p>
              Un reseau convolutif compresse l&apos;audio 24kHz en frames de
              12.5 Hz. Chaque frame de 80ms d&apos;audio est representee par un
              vecteur continu de 256 dimensions. Le ratio de compression est de
              1920 (24000 / 12.5).
            </p>
          </Step>
          <Step number="2" title="RVQ — Residual Vector Quantization">
            <p>
              C&apos;est l&apos;etape cle. Chaque vecteur continu est{" "}
              <Term def="Convertir un vecteur continu en un indice discret dans un codebook (dictionnaire de vecteurs pre-appris). Comme trouver le mot le plus proche dans un dictionnaire.">quantifie</Term>{" "}
              en tokens discrets via 8 codebooks successifs.
              Le premier codebook capture le gros du signal (le contenu
              semantique — quel mot est prononce). Chaque codebook suivant
              capture le <strong>residu</strong> (la difference entre le
              vecteur original et sa reconstruction) — l&apos;intonation, le
              timbre, les details acoustiques fins.
            </p>
          </Step>
          <Step number="3" title="Pourquoi c'est genial pour un LLM">
            <p>
              Le Transformer de Moshi ne traite que les tokens du premier
              codebook (12.5 tokens/seconde) pour le raisonnement semantique.
              Les 7 autres codebooks sont traites par un decodeur parallele
              plus leger. Ca permet au Transformer de raisonner sur la parole
              aussi efficacement que sur du texte — 12.5 tokens/s d&apos;audio
              vs ~4 tokens/s de texte, c&apos;est comparable.
            </p>
          </Step>
        </Steps>

        <ComparisonTable
          headers={["Codec", "Type", "Debit", "Tokens/s", "Usage"]}
          rows={[
            ["Mimi (Kyutai)", "Neural, RVQ 8 codebooks", "1.1 kbps", "12.5 (semantic) + 87.5 (acoustic)", "Moshi speech-to-speech"],
            ["EnCodec (Meta)", "Neural, RVQ 8 codebooks", "1.5-24 kbps", "75-600", "MusicGen, AudioCraft"],
            ["Opus", "Classique (signal processing)", "6-510 kbps", "N/A (pas de tokens)", "VoIP, WebRTC, streaming"],
            ["PCM 16-bit", "Pas de compression", "256-768 kbps", "N/A", "Audio brut, traitement local"],
          ]}
        />

        <Code language="python — utiliser Mimi pour tokeniser de l'audio">{`# pip install moshi
import torch
from moshi.mimi import Mimi

# Charger le codec Mimi
device = "cuda" if torch.cuda.is_available() else "cpu"
mimi = Mimi.from_pretrained("kyutai/mimi").to(device)

# Charger de l'audio (24kHz, mono, float32)
import torchaudio
audio, sr = torchaudio.load("dialogue.wav")
assert sr == 24000, "Mimi attend du 24kHz"
audio = audio.unsqueeze(0).to(device)  # shape: (1, 1, num_samples)

# Encoder : audio → tokens
with torch.no_grad():
    tokens = mimi.encode(audio)
    # tokens shape: (1, 8, num_frames)
    # 8 codebooks, num_frames = duree_secondes × 12.5

print(f"Audio : {audio.shape[-1] / 24000:.1f}s")
print(f"Tokens : {tokens.shape}")  # ex: (1, 8, 125) pour 10s
print(f"Premier codebook (semantique) : {tokens[0, 0, :10]}")
# → tensor([847, 231, 1092, 455, 782, 334, 998, 121, 567, 890])

# Decoder : tokens → audio
with torch.no_grad():
    audio_reconstructed = mimi.decode(tokens)
    # Qualite quasi-transparente malgre une compression ×1920

torchaudio.save("dialogue_reconstructed.wav", audio_reconstructed[0].cpu(), 24000)`}</Code>

        <Analogy>
          <p>
            Mimi, c&apos;est comme un <strong>tokenizer pour
            l&apos;audio</strong>. Un tokenizer texte convertit &quot;Bonjour,
            comment allez-vous ?&quot; en [15496, 11, 2156, 389, 12, 345, 30].
            Mimi fait pareil avec la voix : il convertit la forme d&apos;onde
            audio en une sequence de tokens (847, 231, 1092...) que le
            Transformer peut traiter comme du texte. La difference : les tokens
            Mimi capturent aussi l&apos;intonation et l&apos;emotion, pas juste
            les mots.
          </p>
        </Analogy>

        <Warning>
          <p>
            <strong>L&apos;innovation fondamentale :</strong> avant Mimi, les
            modeles audio comme Whisper devaient convertir l&apos;audio en
            texte puis traiter le texte. Avec Mimi, on peut traiter l&apos;audio
            directement dans le Transformer — c&apos;est ce qui permet le
            full-duplex et la latence de ~200ms de Moshi. C&apos;est aussi ce
            qui permet de preserver l&apos;emotion et l&apos;intonation, que
            la conversion en texte detruit.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 11. QUIZ FINAL                                               */}
      {/* ============================================================ */}
      <Section id="quiz-final" number="11" title="Quiz final">
        <Quiz
          question="Quelle est la latence acceptable pour un agent vocal en conversation ?"
          options={[
            "Moins de 100ms",
            "Moins de 800ms - 1 seconde (au-dela, le silence est perceptible)",
            "2-3 secondes, comme un humain qui reflechit",
            "La latence n'a pas d'importance si la reponse est bonne",
          ]}
          answer={1}
          explanation="En conversation humaine, un silence de plus de ~800ms est percu comme anormal. L'agent doit idealement repondre en <1s. Le streaming TTS (commencer a parler avant que le LLM ait fini) aide beaucoup. L'agent peut aussi utiliser des fillers ('Un instant...') pour masquer la latence."
        />

        <Quiz
          question="Quelle est la difference fondamentale entre Moshi (Kyutai) et le pipeline classique ?"
          options={[
            "Moshi est plus precis",
            "Moshi traite l'audio directement comme des tokens dans un seul modele, sans passer par du texte intermediaire — ca elimine la latence de cascade",
            "Moshi est moins cher",
            "Moshi fonctionne sans internet",
          ]}
          answer={1}
          explanation="Le pipeline classique convertit audio → texte → texte → audio (3 etapes, chacune avec sa latence). Moshi traite l'audio nativement dans un Transformer unique — pas de conversion texte intermediaire. Ca supprime les latences de cascade et permet le full-duplex (ecouter et parler simultanement)."
        />

        <Quiz
          question="Pour ta demo de stage Selectra, quelle stack recommandee ?"
          options={[
            "Moshi (speech-to-speech) — c'est le plus innovant",
            "Pipeline classique : Gladia/Deepgram (STT) + Claude (LLM) + Voxtral/ElevenLabs (TTS), orchestre par Vapi ou LiveKit",
            "Juste un chatbot texte, pas besoin de vocal",
            "Coder tout from scratch en WebSocket",
          ]}
          answer={1}
          explanation="Le pipeline classique est production-ready, supporte le tool calling (essentiel pour la comparaison d'offres), et a une bonne qualite en francais. Moshi est impressionnant mais pas encore assez mature pour le tool calling en prod. Tu mentionnes Moshi comme 'le futur du domaine' en entretien, mais tu construis ta demo avec la stack classique."
        />

        <div className="mt-12 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
          <p className="mb-2 text-lg font-semibold text-emerald-400">
            Module 05 termine
          </p>
          <p className="text-sm text-muted-foreground">
            Tu connais maintenant tout le pipeline vocal : STT, LLM, TTS,
            orchestration, VAD, turn-taking. Tu connais l&apos;ecosysteme
            francais (Kyutai, Gradium, Gladia, Mistral Voxtral) et tu as
            l&apos;architecture complete de l&apos;agent vocal Selectra. Tu es
            pret pour ton stage.
          </p>
        </div>
      </Section>
    </>
  );
}
