import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Section {
  id: string;
  title: string;
  group?: string;
}

interface CourseLayoutProps {
  module: string;
  title: string;
  description: string;
  sections: Section[];
  children: React.ReactNode;
}

export function CourseLayout({
  module,
  title,
  description,
  sections,
  children,
}: CourseLayoutProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Breadcrumb */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Retour
      </Link>

      {/* Header */}
      <header className="mb-12">
        <Badge variant="outline" className="mb-3 font-mono text-xs">
          Module {module}
        </Badge>
        <h1 className="mb-3 text-4xl font-bold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>
      </header>

      {/* Table of contents */}
      <nav className="mb-12 rounded-lg border border-border/40 bg-card p-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Sommaire
        </h2>
        <ol className="space-y-1.5">
          {sections.map((s, i) => {
            const prevGroup = i > 0 ? sections[i - 1].group : undefined;
            const showGroupHeader = s.group && s.group !== prevGroup;
            return (
              <li key={s.id}>
                {showGroupHeader && (
                  <div
                    className={`${i > 0 ? "mt-5" : ""} mb-2 border-l-2 border-indigo-400/40 pl-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300/70`}
                  >
                    {s.group}
                  </div>
                )}
                <a
                  href={`#${s.id}`}
                  className={`flex items-baseline gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground ${s.group ? "pl-4" : ""}`}
                >
                  <span className="font-mono text-xs tabular-nums text-muted-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <Separator className="mb-12" />

      {/* Content */}
      <article className="prose-custom">{children}</article>
    </div>
  );
}
