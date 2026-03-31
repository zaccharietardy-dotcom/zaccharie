import katex from "katex";
import { Card } from "@/components/ui/card";
import { ProofToggle } from "./proof-toggle";

/* ── Inline LaTeX ──────────────────────────────────────── */

export function M({ t }: { t: string }) {
  const html = katex.renderToString(t, {
    throwOnError: false,
    displayMode: false,
    strict: false,
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ── Display-mode LaTeX (centered block) ───────────────── */

export function MathBlock({ tex }: { tex: string }) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: true,
    strict: false,
  });
  return (
    <div
      className="my-5 overflow-x-auto text-center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ── Theorem box ───────────────────────────────────────── */

export function Theorem({
  title,
  name,
  children,
}: {
  title?: string;
  name?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="my-6 border-l-2 border-l-violet-500 bg-violet-500/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-500">
        {title ?? "Theoreme"}
        {name && <span className="normal-case"> — {name}</span>}
      </p>
      <div className="text-sm text-foreground/90 space-y-2">{children}</div>
    </Card>
  );
}

/* ── Proposition box ───────────────────────────────────── */

export function Proposition({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="my-6 border-l-2 border-l-indigo-400 bg-indigo-400/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
        {title ?? "Proposition"}
      </p>
      <div className="text-sm text-foreground/90 space-y-2">{children}</div>
    </Card>
  );
}

/* ── Definition box ────────────────────────────────────── */

export function Def({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="my-6 border-l-2 border-l-teal-500 bg-teal-500/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-500">
        {title ?? "Definition"}
      </p>
      <div className="text-sm text-foreground/90 space-y-2">{children}</div>
    </Card>
  );
}

/* ── Lemma box ─────────────────────────────────────────── */

export function Lemma({
  name,
  children,
}: {
  name?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="my-6 border-l-2 border-l-purple-400 bg-purple-400/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-purple-400">
        Lemme{name && <span className="normal-case"> — {name}</span>}
      </p>
      <div className="text-sm text-foreground/90 space-y-2">{children}</div>
    </Card>
  );
}

/* ── Collapsible proof (delegates to client component) ── */

export function Proof({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return <ProofToggle title={title}>{children}</ProofToggle>;
}

/* ── Remark box ────────────────────────────────────────── */

export function Remark({ children }: { children: React.ReactNode }) {
  return (
    <Card className="my-6 border-l-2 border-l-zinc-500 bg-zinc-500/5 p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
        Remarque
      </p>
      <div className="text-sm text-muted-foreground space-y-2">{children}</div>
    </Card>
  );
}

/* ── Hypothesis checklist ──────────────────────────────── */

export function Hypotheses({ items }: { items: string[] }) {
  return (
    <div className="my-4 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-500">
        Hypotheses a verifier
      </p>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="mt-0.5 text-amber-500">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
