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
