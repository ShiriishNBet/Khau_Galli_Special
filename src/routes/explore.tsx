import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { dishes, categories } from "@/data/dishes";
import { DishCard } from "@/components/DishCard";
import { Search, X } from "lucide-react";

type ExploreSearch = { category: string; q: string };

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): ExploreSearch => ({
    category: typeof s.category === "string" ? s.category : "all",
    q: typeof s.q === "string" ? s.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Explore cravings — Khau Galli Specials" },
      {
        name: "description",
        content: "Search street-food dishes by craving, category and neighbourhood across India.",
      },
      { property: "og:title", content: "Explore cravings — Khau Galli Specials" },
      {
        property: "og:description",
        content: "Search the taste graph for the exact dish you're craving.",
      },
    ],
  }),
  component: Explore,
});

function Explore() {
  const { category, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/explore" });
  const [query, setQuery] = useState(q);

  const results = useMemo(() => {
    const text = query.trim().toLowerCase();
    return dishes.filter((d) => {
      const inCat = category === "all" || d.category === category;
      const inText =
        !text ||
        [d.name, d.vendor, d.area, d.city, d.tagline].some((f) => f.toLowerCase().includes(text));
      return inCat && inText;
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <h1 className="font-display text-3xl font-extrabold">Explore cravings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Search by dish, vendor or neighbourhood — then let the taste graph rank it.
      </p>

      <div className="mt-5 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 'misal', 'chai', 'Pune'…"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Clear search" className="shrink-0">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => {
          const active = c.id === category;
          return (
            <button
              key={c.id}
              onClick={() =>
                navigate({ search: (prev: ExploreSearch) => ({ ...prev, category: c.id }) })
              }
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "border-primary bg-secondary text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{c.emoji}</span>
              {c.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "dish" : "dishes"} found
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((d) => (
            <DishCard key={d.id} dish={d} showMatch />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-border bg-card p-10 text-center">
          <p className="text-4xl">🍽️</p>
          <p className="mt-3 font-display text-lg font-bold">No dishes match that craving yet</p>
          <p className="text-sm text-muted-foreground">Try a different word or category.</p>
        </div>
      )}
    </div>
  );
}