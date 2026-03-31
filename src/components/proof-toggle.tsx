"use client";

import { useState } from "react";

export function ProofToggle({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-4 rounded-lg border border-border/40 bg-zinc-950/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <span
          className={`text-xs transition-transform ${open ? "rotate-90" : ""}`}
        >
          ▶
        </span>
        {title ?? "Idee de preuve"}
      </button>
      {open && (
        <div className="border-t border-border/40 px-4 py-4 text-sm text-muted-foreground space-y-2">
          {children}
          <p className="text-right text-muted-foreground/50">∎</p>
        </div>
      )}
    </div>
  );
}
