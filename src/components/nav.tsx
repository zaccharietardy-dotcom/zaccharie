import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/cours", label: "Cours" },
  { href: "/projets", label: "Projets" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link href="/" className="transition-opacity hover:opacity-70">
          <Image src="/logo.png" alt="ZT" width={32} height={32} className="rounded" />
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
