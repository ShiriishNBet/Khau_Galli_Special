import { Link } from "@tanstack/react-router";
import { Home, Search, Sparkles, Info } from "lucide-react";

const links = [
  { to: "/", label: "Discover", icon: Home },
  { to: "/explore", label: "Explore", icon: Search },
  { to: "/about", label: "How it works", icon: Sparkles },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-spice)] text-lg shadow-[var(--shadow-glow)]">
            🍲
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-extrabold leading-none">
              Khau Galli
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-primary">
              Specials
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-secondary text-primary" }}
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function BottomNav() {
  const items = [...links, { to: "/about", label: "About", icon: Info }].slice(0, 3);
  return (
    <nav className="sticky bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl sm:hidden">
      <div className="flex items-stretch justify-around">
        {items.map((l) => {
          const Icon = l.icon;
          return (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-muted-foreground"
            >
              <Icon className="h-5 w-5" />
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}