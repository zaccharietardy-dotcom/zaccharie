"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ── Section heading ─────────────────────────────────── */

export function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <div className="mb-6 flex items-baseline gap-3">
        <span className="font-mono text-sm text-muted-foreground/50">
          {number}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="space-y-5 text-[15px] leading-relaxed text-foreground/90">
        {children}
      </div>
    </section>
  );
}

/* ── Code block with syntax label ────────────────────── */

export function Code({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  return (
    <div className="group relative my-5 overflow-hidden rounded-lg border border-border/40 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ── Key concept callout ─────────────────────────────── */

export function KeyConcept({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="my-6 border-l-2 border-l-emerald-500 bg-emerald-500/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-500">
        Concept cle
      </p>
      <p className="mb-1 font-semibold">{title}</p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </Card>
  );
}

/* ── Warning/gotcha callout ──────────────────────────── */

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <Card className="my-6 border-l-2 border-l-amber-500 bg-amber-500/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-500">
        Attention
      </p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </Card>
  );
}

/* ── Analogy box ─────────────────────────────────────── */

export function Analogy({ children }: { children: React.ReactNode }) {
  return (
    <Card className="my-6 border-l-2 border-l-blue-500 bg-blue-500/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
        Analogie
      </p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </Card>
  );
}

/* ── Interactive quiz ────────────────────────────────── */

export function Quiz({
  question,
  options,
  answer,
  explanation,
}: {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === answer;

  return (
    <Card className="my-6 p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Quiz
      </p>
      <p className="mb-4 font-medium">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          let style = "border-border/40 hover:border-foreground/20";
          if (answered) {
            if (i === answer) style = "border-emerald-500 bg-emerald-500/10";
            else if (i === selected)
              style = "border-red-500/50 bg-red-500/5 opacity-60";
            else style = "opacity-40";
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${style}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/40 font-mono text-xs">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          className={`mt-4 rounded-lg p-3 text-sm ${
            correct
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-zinc-800 text-muted-foreground"
          }`}
        >
          {correct ? "Correct ! " : "Pas tout a fait. "}
          {explanation}
        </div>
      )}
    </Card>
  );
}

/* ── Diagram / visual block ──────────────────────────── */

export function Diagram({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-lg border border-border/40 bg-zinc-950 p-6">
      {title && (
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      )}
      <div className="flex justify-center font-mono text-sm text-zinc-400">
        {children}
      </div>
    </div>
  );
}

/* ── Vocab term inline ───────────────────────────────── */

export function Term({
  children,
  def,
}: {
  children: React.ReactNode;
  def: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline">
      <button
        onClick={() => setShow(!show)}
        className="cursor-help border-b border-dashed border-foreground/30 font-medium text-foreground transition-colors hover:border-foreground"
      >
        {children}
      </button>
      {show && (
        <span className="absolute bottom-full left-0 z-10 mb-2 w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg">
          {def}
          <span className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 border-b border-r border-border bg-popover" />
        </span>
      )}
    </span>
  );
}

/* ── Step-by-step process ────────────────────────────── */

export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 space-y-0 border-l-2 border-border/40 pl-6">
      {children}
    </div>
  );
}

export function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pb-6">
      <div className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background font-mono text-[10px] text-muted-foreground">
        {number}
      </div>
      <p className="mb-1 font-medium">{title}</p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

/* ── Comparison table ────────────────────────────────── */

export function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border/40">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40 bg-zinc-950">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border/40 last:border-0"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
