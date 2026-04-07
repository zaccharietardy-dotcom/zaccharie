import { notFound } from "next/navigation";
import { CourseLayout } from "@/components/course-layout";
import { FondationsLLM } from "./fondations-llm";
import { PromptEngineering } from "./prompt-engineering";
import { RAG } from "./rag";
import { Agents } from "./agents";
import { AgentsVocaux } from "./agents-vocaux";
import { StageSelectra } from "./stage-selectra";
import { Optimisation } from "./optimisation";
import { OptimisationResume } from "./optimisation-resume";
import { ArbresEnsembles } from "./arbres-ensembles";
import { FinanceQuantitative } from "./finance-quantitative";
import { RnnLstm } from "./rnn-lstm";
import { CNN } from "./cnn";
import { TransformersDeep } from "./transformers-deep";
import { GenerationImages } from "./generation-images";
import { DiffusionModels } from "./diffusion-models";
import { GitGithub } from "./git-github";

const courses: Record<
  string,
  {
    module: string;
    title: string;
    description: string;
    sections: { id: string; title: string }[];
    Component: React.ComponentType;
  }
> = {
  "fondations-llm": {
    module: "01",
    title: "Fondations LLM",
    description:
      "Comprendre comment fonctionnent les Large Language Models, de l'architecture Transformer au fine-tuning. Le socle sur lequel tout le reste repose.",
    sections: [
      { id: "pourquoi", title: "Pourquoi ce module ?" },
      { id: "tokens", title: "Les tokens — l'alphabet des LLMs" },
      { id: "embeddings", title: "Les embeddings — donner du sens aux mots" },
      { id: "attention", title: "L'attention — le coeur du Transformer" },
      { id: "architecture", title: "Architecture complete d'un Transformer" },
      { id: "entrainement", title: "Comment on entraine un LLM — pre-training, SFT, RLHF" },
      { id: "generation", title: "Comment le modele genere du texte" },
      { id: "parametres", title: "Temperature, top-p, top-k" },
      { id: "context-window", title: "Le context window — la memoire de travail" },
      { id: "modeles", title: "Panorama des modeles (2024-2026)" },
      { id: "api", title: "Utiliser un LLM via API — premier appel" },
      { id: "quiz-final", title: "Quiz final" },
    ],
    Component: FondationsLLM,
  },
  "prompt-engineering": {
    module: "02",
    title: "Prompt Engineering",
    description:
      "L'art de parler aux LLMs. Few-shot, chain-of-thought, system prompts, structured output — avec des exemples concrets pour un agent Selectra.",
    sections: [
      { id: "pourquoi", title: "Pourquoi le prompt engineering ?" },
      { id: "zero-few-shot", title: "Zero-shot vs Few-shot" },
      { id: "chain-of-thought", title: "Chain-of-Thought — forcer le raisonnement" },
      { id: "system-prompts", title: "System prompts avances" },
      { id: "structured-output", title: "Structured Output — extraire des donnees typees" },
      { id: "techniques-avancees", title: "Techniques avancees" },
      { id: "application-selectra", title: "Application : le prompt de l'agent Selectra" },
      { id: "quiz-final", title: "Quiz final" },
    ],
    Component: PromptEngineering,
  },
  rag: {
    module: "03",
    title: "RAG — Retrieval-Augmented Generation",
    description:
      "Donner de la memoire aux LLMs. Embeddings, vector stores, chunking, similarity search — pour que ton agent ait toujours les bonnes infos.",
    sections: [
      { id: "pourquoi", title: "Le probleme : les LLMs ne savent pas tout" },
      { id: "embeddings", title: "Les embeddings — la base du RAG" },
      { id: "vector-stores", title: "Vector stores — la memoire du RAG" },
      { id: "chunking", title: "Le chunking — decouper intelligemment" },
      { id: "similarity-search", title: "Similarity search — trouver les bons documents" },
      { id: "pipeline", title: "Pipeline RAG complet en code" },
      { id: "selectra", title: "Application Selectra : RAG pour l'agent vocal" },
      { id: "limites", title: "Quand NE PAS utiliser le RAG" },
      { id: "quiz-final", title: "Quiz final" },
    ],
    Component: RAG,
  },
  agents: {
    module: "04",
    title: "Tool Calling & Agents",
    description:
      "Quand le LLM agit dans le monde reel. Function calling, boucle agent, AI SDK Agent class, MCP.",
    sections: [
      { id: "pourquoi", title: "Du chatbot a l'agent" },
      { id: "tool-calling", title: "Tool calling — donner des outils au LLM" },
      { id: "boucle-agent", title: "La boucle agent : reflexion → action → observation" },
      { id: "agent-class", title: "L'Agent class du AI SDK" },
      { id: "mcp", title: "MCP — le protocole universel pour les outils" },
      { id: "patterns", title: "Patterns d'agents en production" },
      { id: "quiz-final", title: "Quiz final" },
    ],
    Component: Agents,
  },
  "agents-vocaux": {
    module: "05",
    title: "Agents Vocaux",
    description:
      "Pipeline vocal, STT/TTS, Moshi/Kyutai, ecosysteme francais, architectures et frameworks pour construire un agent vocal.",
    sections: [
      { id: "pourquoi", title: "Pourquoi les agents vocaux ?" },
      { id: "pipeline-classique", title: "Le pipeline classique : STT → LLM → TTS" },
      { id: "speech-to-speech", title: "La revolution : Speech-to-Speech (Kyutai / Moshi)" },
      { id: "vad-turn-taking", title: "VAD et turn-taking — qui parle quand ?" },
      { id: "architectures", title: "Architectures et frameworks" },
      { id: "ecosysteme-fr", title: "L'ecosysteme francais de la voix IA" },
      { id: "agent-selectra", title: "Architecture complete : l'agent vocal Selectra" },
      { id: "quiz-final", title: "Quiz final" },
    ],
    Component: AgentsVocaux,
  },
  "stage-selectra": {
    module: "06",
    title: "Application — Stage Selectra",
    description:
      "Audit complet de Selectra (stack, finances, problemes), 9 projets IA concrets avec impact chiffre, et comment impressionner en stage.",
    sections: [
      { id: "audit", title: "Selectra — audit complet" },
      { id: "stack-ia", title: "Stack IA existante et ce qui manque" },
      { id: "compliance", title: "Projet 1 — Scoring de conformite des appels" },
      { id: "lead-scoring", title: "Projet 2 — Lead scoring pre-appel" },
      { id: "maprimerenov", title: "Projet 3 — Chatbot MaPrimeRenov / DPE" },
      { id: "prix-forecast", title: "Projet 4 — Prevision prix electricite" },
      { id: "geo", title: "Projet 5 — Protection contre Google AI Overviews" },
      { id: "agent-vocal", title: "Projet 6 — Agent vocal de qualification" },
      { id: "agent-assist", title: "Projet 7 — Agent assist temps reel" },
      { id: "autres", title: "Autres projets" },
      { id: "entretien", title: "Ce qui impressionne en entretien" },
    ],
    Component: StageSelectra,
  },
  optimisation: {
    module: "P3",
    title: "Optimisation et Controle",
    description:
      "Existence, conditions d'optimalite (Euler, Lagrange, KKT), algorithmes (gradient, Newton, Nesterov). Cours de Gregoire Allaire, Ecole Polytechnique.",
    sections: [
      { id: "introduction", title: "Introduction & Motivation" },
      { id: "existence", title: "Existence de solutions" },
      { id: "convexite", title: "Convexite" },
      { id: "euler", title: "Conditions d'optimalite — K convexe" },
      { id: "cone", title: "Conditions d'optimalite — K non convexe" },
      { id: "egalite", title: "Contraintes d'egalite & Lagrangien" },
      { id: "inegalite", title: "Contraintes d'inegalite — KKT" },
      { id: "gradient", title: "Algorithme du gradient" },
      { id: "newton", title: "Algorithme de Newton" },
      { id: "acceleration", title: "Acceleration des algorithmes d'ordre 1" },
      { id: "gradient-projete", title: "Gradient projete" },
      { id: "uzawa", title: "Algorithme d'Uzawa" },
      { id: "penalisation", title: "Penalisation des contraintes" },
      { id: "lagrangien-augmente", title: "Lagrangien augmente" },
      { id: "sqp", title: "Approximations successives — SLP & SQP" },
      { id: "retropropagation", title: "Retro-propagation et etat adjoint" },
    ],
    Component: Optimisation,
  },
  "optimisation-resume": {
    module: "P3",
    title: "Optimisation — Fiche Resume",
    description:
      "Fiche synthetique : tous les theoremes, hypotheses a verifier, et algorithmes du cours d'optimisation.",
    sections: [
      { id: "existence", title: "Theoremes d'existence" },
      { id: "optimalite", title: "Conditions d'optimalite" },
      { id: "algorithmes", title: "Algorithmes d'optimisation" },
      { id: "comparaison", title: "Tableau comparatif" },
      { id: "pieges", title: "Pieges classiques" },
    ],
    Component: OptimisationResume,
  },
  "arbres-ensembles": {
    module: "ML",
    title: "Arbres de Decision & Methodes d'Ensemble",
    description:
      "Decision trees, Random Forests, XGBoost, LightGBM, CatBoost — theorie mathematique complete et applications en finance. Les rois du tabulaire.",
    sections: [
      { id: "pourquoi", title: "Pourquoi ce module" },
      { id: "arbres-decision", title: "Arbres de decision — CART" },
      { id: "bagging", title: "Bagging & Bootstrap" },
      { id: "random-forests", title: "Random Forests" },
      { id: "gradient-boosting", title: "Gradient Boosting — theorie complete" },
      { id: "xgboost", title: "XGBoost — eXtreme Gradient Boosting" },
      { id: "lightgbm-catboost", title: "LightGBM & CatBoost" },
      { id: "finance", title: "Applications en finance" },
      { id: "papiers-recents", title: "Papiers recents (2024-2025)" },
      { id: "feature-importance", title: "Feature importance et interpretabilite" },
      { id: "quiz-final", title: "Quiz final" },
    ],
    Component: ArbresEnsembles,
  },
  cnn: {
    module: "ML",
    title: "Reseaux de Neurones Convolutifs (CNN)",
    description:
      "Des premiers filtres de LeNet aux Vision Transformers. Convolutions, pooling, ResNet, EfficientNet, ViT, transfer learning — theorie et code PyTorch.",
    sections: [
      { id: "pourquoi", title: "Pourquoi les CNN" },
      { id: "convolution", title: "L'operation de convolution" },
      { id: "pooling", title: "Pooling et Feature Maps" },
      { id: "architecture", title: "Architecture d'un CNN" },
      { id: "architectures", title: "Les grandes architectures" },
      { id: "resnet", title: "ResNet et les connexions residuelles" },
      { id: "efficientnet", title: "EfficientNet et compound scaling" },
      { id: "vit", title: "Vision Transformers (ViT)" },
      { id: "transfer-learning", title: "Transfer learning" },
      { id: "quiz-final", title: "Quiz final" },
    ],
    Component: CNN,
  },
  "transformers-deep": {
    module: "ML",
    title: "Transformers — Architecture en profondeur",
    description:
      "Self-attention, multi-head, positional encoding, encoder/decoder, BERT, GPT, ViT — theorie mathematique complete et implementation PyTorch from scratch.",
    sections: [
      { id: "pourquoi", title: "Pourquoi les Transformers" },
      { id: "self-attention", title: "Self-Attention — les maths" },
      { id: "multi-head", title: "Multi-Head Attention" },
      { id: "positional-encoding", title: "Positional Encoding" },
      { id: "encoder", title: "Architecture Encoder" },
      { id: "decoder", title: "Architecture Decoder" },
      { id: "bert", title: "BERT" },
      { id: "gpt", title: "GPT" },
      { id: "vision-transformers", title: "Vision Transformers" },
      { id: "implementation", title: "Implementer un Transformer from scratch" },
      { id: "quiz-final", title: "Quiz final" },
    ],
    Component: TransformersDeep,
  },
  "finance-quantitative": {
    module: "ML",
    title: "Finance Quantitative",
    description:
      "Mouvement brownien, calcul stochastique, Black-Scholes, Greeks, Monte Carlo, risk management. Niveau Polytechnique, exercices style Heard on the Street.",
    sections: [
      { id: "pourquoi", title: "Pourquoi la finance quantitative" },
      { id: "brownien", title: "Mouvement brownien" },
      { id: "ito", title: "Calcul stochastique — Integrale d'Ito" },
      { id: "black-scholes", title: "Le modele de Black-Scholes" },
      { id: "greeks", title: "Les Greeks" },
      { id: "pricing", title: "Pricing d'options — mesure risque-neutre" },
      { id: "monte-carlo", title: "Methodes de Monte Carlo" },
      { id: "taux", title: "Modeles de taux d'interet" },
      { id: "risk", title: "Risk management — VaR et au-dela" },
      { id: "exercices", title: "Exercices style 'Heard on the Street'" },
      { id: "quiz", title: "Quiz final" },
    ],
    Component: FinanceQuantitative,
  },
  "rnn-lstm": {
    module: "ML",
    title: "RNN, LSTM & GRU",
    description:
      "Reseaux recurrents, vanishing gradient, LSTM, GRU, Bi-LSTM. Applications series temporelles et NLP. Papier 'Were RNNs All We Needed?' (2024).",
    sections: [
      { id: "sequentiel", title: "Pourquoi les modeles sequentiels ?" },
      { id: "rnn-vanilla", title: "Le RNN vanilla" },
      { id: "vanishing", title: "Le probleme du vanishing gradient" },
      { id: "lstm", title: "LSTM — Long Short-Term Memory" },
      { id: "gru", title: "GRU — Gated Recurrent Unit" },
      { id: "bi-lstm", title: "Bi-LSTM & Deep RNNs" },
      { id: "applications", title: "Applications pratiques" },
      { id: "min-lstm", title: "'Were RNNs All We Needed?' (2024)" },
      { id: "hybrides", title: "Architectures hybrides modernes" },
      { id: "quiz", title: "Quiz final" },
    ],
    Component: RnnLstm,
  },
  "generation-images": {
    module: "ML",
    title: "Generation d'Images — GANs & VAE",
    description:
      "Autoencoders, VAE (ELBO, reparametrization trick), GAN, DCGAN, ProGAN, StyleGAN. Maths detaillees et code PyTorch.",
    sections: [
      { id: "pourquoi", title: "Pourquoi la generation d'images ?" },
      { id: "autoencoders", title: "Autoencoders" },
      { id: "vae", title: "VAE — Variational Autoencoders" },
      { id: "gan", title: "GAN — le jeu min-max" },
      { id: "entrainement", title: "Entrainer un GAN — instabilite et astuces" },
      { id: "dcgan", title: "DCGAN — l'architecture convolutionnelle" },
      { id: "progan", title: "ProGAN — progressive growing" },
      { id: "stylegan", title: "StyleGAN — le generateur qui a tout change" },
      { id: "metriques", title: "Metriques d'evaluation" },
      { id: "limitations", title: "Limitations & transition vers la diffusion" },
      { id: "quiz", title: "Quiz final" },
    ],
    Component: GenerationImages,
  },
  "diffusion-models": {
    module: "ML",
    title: "Generation d'Images — Modeles de Diffusion",
    description:
      "DDPM, score matching, classifier-free guidance, Stable Diffusion, DALL-E, FLUX, Sora. Super-resolution (ESRGAN). Etat de l'art 2026.",
    sections: [
      { id: "pourquoi", title: "Pourquoi les modeles de diffusion" },
      { id: "forward", title: "DDPM — Forward process" },
      { id: "reverse", title: "DDPM — Reverse process" },
      { id: "sampling", title: "Sampling et acceleration" },
      { id: "score-sde", title: "Score matching et SDE" },
      { id: "cfg", title: "Classifier-Free Guidance" },
      { id: "stable-diffusion", title: "Stable Diffusion" },
      { id: "etat-art", title: "L'etat de l'art (2024-2026)" },
      { id: "super-resolution", title: "Super-resolution et restauration" },
      { id: "implementation", title: "Implementer un DDPM simple" },
      { id: "quiz", title: "Quiz final" },
    ],
    Component: DiffusionModels,
  },
  "git-github": {
    module: "DEV",
    title: "Git, GitHub & GitLab",
    description:
      "Toutes les commandes et bonnes pratiques pour travailler en equipe. Branches, merge, rebase, PR, CI/CD, workflows entreprise.",
    sections: [
      { id: "pourquoi", title: "Pourquoi Git est non-negociable" },
      { id: "concepts", title: "Les concepts fondamentaux" },
      { id: "commandes-base", title: "Les commandes de base — une par une" },
      { id: "branches", title: "Branches — le coeur du travail en equipe" },
      { id: "merge-rebase", title: "Merge vs Rebase — comprendre la difference" },
      { id: "conflits", title: "Resoudre les conflits sans paniquer" },
      { id: "remote", title: "Remotes, push, pull, fetch" },
      { id: "workflow", title: "Workflows d'equipe en entreprise" },
      { id: "pr-review", title: "Pull Requests et Code Review" },
      { id: "ci-cd", title: "CI/CD — automatiser les verifications" },
      { id: "commandes-avancees", title: "Commandes avancees" },
      { id: "gitignore", title: ".gitignore et bonnes pratiques" },
      { id: "scenario", title: "Scenario complet — une journee type" },
      { id: "quiz", title: "Quiz final" },
    ],
    Component: GitGithub,
  },
};

export function generateStaticParams() {
  return Object.keys(courses).map((slug) => ({ slug }));
}

export default async function CoursPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses[slug];
  if (!course) notFound();

  const { Component, ...meta } = course;

  return (
    <CourseLayout {...meta}>
      <Component />
    </CourseLayout>
  );
}
