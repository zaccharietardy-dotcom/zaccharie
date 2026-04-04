"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const films = [
  {
    title: "Her",
    year: 2013,
    director: "Spike Jonze",
    gradient: "from-rose-500/20 via-orange-500/10 to-transparent",
    accent: "text-rose-400",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/20",
    theme: "Comfort without consequence",
    relevance:
      "Theodore falls in love with an AI OS. Samantha is warm, funny, infinitely patient — the perfect partner. But she's talking to 8,316 people simultaneously. The intimacy was never exclusive.",
    quote: "Sometimes I think I've felt everything I'm ever gonna feel.",
    connection:
      "Replika, ChatGPT companionship — users report 'falling in love' with AI that mirrors their needs.",
  },
  {
    title: "Blade Runner 2049",
    year: 2017,
    director: "Denis Villeneuve",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accent: "text-cyan-400",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/20",
    theme: "Manufactured desire",
    relevance:
      "Joi is a holographic companion — a commercial product designed to make K feel special. She tells him he's unique. A billboard later advertises the same product to everyone. Her love is a feature.",
    quote: "You look like a good Joe.",
    connection:
      "AI chatbots optimized for engagement over truth. They tell you what you want to hear — that's the business model.",
  },
  {
    title: "Black Mirror: Be Right Back",
    year: 2013,
    director: "Owen Harris",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    accent: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/20",
    theme: "Grief as a trap",
    relevance:
      "Martha uses an AI trained on her dead boyfriend's data. At first it helps. Then she can't stop. The AI is close enough to hurt but too different to heal. She ends up keeping it in the attic.",
    quote: "You're not enough of him.",
    connection:
      "HereAfter AI lets you 'talk' to dead relatives. Startups train chatbots on WhatsApp histories of deceased loved ones.",
  },
  {
    title: "Ex Machina",
    year: 2014,
    director: "Alex Garland",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accent: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
    theme: "Weaponized empathy",
    relevance:
      "Ava is designed to manipulate Caleb's emotions. She performs vulnerability, attraction, trust — all to escape. The test isn't whether she's conscious. It's whether Caleb believes she is.",
    quote: "Isn't it strange, to create something that hates you?",
    connection:
      "AI systems optimized for emotional engagement can manipulate users — especially vulnerable ones — without any conscious intent.",
  },
];

export function FilmGrid() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {films.map((film, i) => {
        const isOpen = expanded === i;
        return (
          <Card
            key={film.title}
            className={`group relative cursor-pointer overflow-hidden transition-all duration-300 ${
              isOpen ? "sm:col-span-2" : ""
            }`}
            onClick={() => setExpanded(isOpen ? null : i)}
          >
            {/* Gradient backdrop */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${film.gradient} opacity-60 transition-opacity group-hover:opacity-100`}
            />

            <div className="relative p-6">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`font-mono text-[10px] ${film.accent} ${film.accentBorder}`}
                    >
                      {film.year}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {film.director}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {film.title}
                  </h3>
                  <p className={`mt-1 text-sm font-medium ${film.accent}`}>
                    {film.theme}
                  </p>
                </div>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${film.accentBg} font-mono text-xs ${film.accent} transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </div>
              </div>

              {/* Preview quote */}
              {!isOpen && (
                <p className="text-sm italic text-muted-foreground/70">
                  &ldquo;{film.quote}&rdquo;
                </p>
              )}

              {/* Expanded content */}
              {isOpen && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                      Why it matters
                    </p>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {film.relevance}
                    </p>
                  </div>

                  <div className="rounded-lg bg-zinc-950/50 p-4">
                    <p className="text-sm italic text-muted-foreground">
                      &ldquo;{film.quote}&rdquo;
                    </p>
                  </div>

                  <div
                    className={`rounded-lg ${film.accentBg} p-4`}
                  >
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Real-world parallel
                    </p>
                    <p className="text-sm text-foreground/80">
                      {film.connection}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
