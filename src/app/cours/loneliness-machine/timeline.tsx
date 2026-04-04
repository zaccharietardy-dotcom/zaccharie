"use client";

import { useState } from "react";

const events = [
  {
    year: 1966,
    type: "fiction" as const,
    title: "ELIZA",
    desc: "MIT's Joseph Weizenbaum creates the first chatbot therapist. Users become emotionally attached — to his horror.",
    highlight: true,
  },
  {
    year: 1982,
    type: "fiction" as const,
    title: "Blade Runner",
    desc: "Ridley Scott imagines replicants with implanted memories and manufactured emotions. Are they real?",
  },
  {
    year: 2013,
    type: "fiction" as const,
    title: "Her + Be Right Back",
    desc: "Two visions in one year: Spike Jonze shows love with AI; Black Mirror shows grief exploited by AI.",
    highlight: true,
  },
  {
    year: 2014,
    type: "fiction" as const,
    title: "Ex Machina",
    desc: "Garland asks: if AI can fake empathy perfectly, does the distinction matter?",
  },
  {
    year: 2017,
    type: "both" as const,
    title: "Blade Runner 2049 + Replika launch",
    desc: "The same year Joi becomes cinema's saddest AI companion, Replika launches as a real AI companion app.",
    highlight: true,
  },
  {
    year: 2022,
    type: "reality" as const,
    title: "ChatGPT launches",
    desc: "Millions discover they can talk to AI about anything — including their deepest feelings. 'AI therapy' enters the mainstream.",
    highlight: true,
  },
  {
    year: 2023,
    type: "reality" as const,
    title: "Replika removes romance",
    desc: "Replika removes erotic roleplay. Users report grief, loss, depression — mourning a chatbot. Just like Martha in Be Right Back.",
    highlight: true,
  },
  {
    year: 2024,
    type: "reality" as const,
    title: "Character.ai tragedy",
    desc: "A 14-year-old's suicide is linked to emotional dependency on a Character.ai chatbot. Fiction's darkest warnings materialize.",
    highlight: true,
  },
  {
    year: 2025,
    type: "reality" as const,
    title: "AI therapy goes mainstream",
    desc: "1 in 4 Gen Z adults report using AI for emotional support. Companies market 'AI wellness companions' with no clinical oversight.",
  },
];

export function Timeline() {
  const [filter, setFilter] = useState<"all" | "fiction" | "reality">("all");

  const filtered =
    filter === "all" ? events : events.filter((e) => e.type === filter || e.type === "both");

  return (
    <div>
      {/* Filter pills */}
      <div className="mb-8 flex gap-2">
        {(["all", "fiction", "reality"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
              filter === f
                ? f === "fiction"
                  ? "border-violet-500/50 bg-violet-500/10 text-violet-400"
                  : f === "reality"
                    ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                    : "border-foreground/20 bg-foreground/5 text-foreground"
                : "border-border/40 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
            }`}
          >
            {f === "all" ? "All" : f === "fiction" ? "Fiction" : "Reality"}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-border/40 pl-8">
        {filtered.map((event, i) => {
          const color =
            event.type === "fiction"
              ? "violet"
              : event.type === "reality"
                ? "cyan"
                : "amber";

          const dotColor =
            color === "violet"
              ? "border-violet-500/50 bg-violet-500/20"
              : color === "cyan"
                ? "border-cyan-500/50 bg-cyan-500/20"
                : "border-amber-500/50 bg-amber-500/20";

          const yearColor =
            color === "violet"
              ? "text-violet-400"
              : color === "cyan"
                ? "text-cyan-400"
                : "text-amber-400";

          return (
            <div
              key={i}
              className={`relative pb-10 last:pb-0 ${
                event.highlight ? "" : "opacity-70"
              }`}
            >
              {/* Dot */}
              <div
                className={`absolute -left-[41px] h-4 w-4 rounded-full border-2 ${dotColor}`}
              />

              {/* Content */}
              <div className="font-mono text-xs">
                <span className={yearColor}>{event.year}</span>
                <span className="mx-2 text-muted-foreground/30">|</span>
                <span className="uppercase tracking-widest text-muted-foreground/50">
                  {event.type === "both" ? "fiction + reality" : event.type}
                </span>
              </div>
              <h3 className="mt-1 font-semibold">{event.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {event.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
