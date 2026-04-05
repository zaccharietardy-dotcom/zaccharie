import Link from "next/link";

const links = [
  { href: "/cours", label: "Cours" },
  { href: "/projets", label: "Projets" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-lg font-medium italic tracking-tight"
        >
          zt<span className="text-muted-foreground/40 font-sans not-italic">.</span>
        </Link>
        <ul className="flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground"
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
