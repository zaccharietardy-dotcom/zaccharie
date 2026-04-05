import Link from "next/link";

const links = [
  { href: "/cours", label: "Cours" },
  { href: "/projets", label: "Projets" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-4xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-lg font-medium italic tracking-tight group"
        >
          zt<span className="text-primary font-sans not-italic transition-opacity group-hover:opacity-60">.</span>
        </Link>
        <ul className="flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors hover:text-primary"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>

  );
}
