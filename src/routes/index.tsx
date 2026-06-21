import { createFileRoute, Link } from "@tanstack/react-router";
import { dishes, categories } from "@/data/dishes";
import { getDayContext } from "@/lib/context";
import { DishCard } from "@/components/DishCard";
import heroMarket from "@/assets/hero-market.jpg";
import { Sparkles, Search, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khau Galli Specials — Find the best dish near you, right now" },
      {
        name: "description",
        content:
          "AI-powered dish discovery for India's streets. Find the absolute best version of the exact dish you crave, recommended by weather, time and local trends.",
      },
      { property: "og:title", content: "Khau Galli Specials — AI Food Intelligence" },
      {
        property: "og:description",
        content: "Find what to eat. Instantly. Dish-level recommendations powered by Khau Galli AI.",
      },
      { property: "og:image", content: heroMarket },
      { name: "twitter:image", content: heroMarket },
    ],
  }),
  component: Index,
});

function Index() {
  const ctx = getDayContext();
  const picks = [...dishes]
    .map((d) => ({ d, hit: d.bestFor.some((b) => ctx.tags.includes(b)) }))
    .sort((a, b) => Number(b.hit) - Number(a.hit) || b.d.matchScore - a.d.matchScore)
    .map((x) => x.d);
  const trending = [...dishes].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      {/* Hero */}
      <section className="relative mt-4 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]">
        <img
          src={heroMarket}
          alt="Indian street food night market"
          width={1536}
          height={1024}
          className="h-[340px] w-full object-cover sm:h-[420px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> {ctx.greeting}, {ctx.city} {ctx.weatherEmoji} {ctx.weather}
          </span>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-3xl font-extrabold leading-tight sm:text-5xl">
            Not <span className="text-muted-foreground">where</span> to eat. The best{" "}
            <span className="bg-[image:var(--gradient-spice)] bg-clip-text text-transparent">exact dish</span>{" "}
            near you, right now.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Khau Galli AI reads the weather, the time and local street-food trends to surface what
            you'll actually crave.
          </p>
          <Link
            to="/explore"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-spice)] px-5 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
          >
            <Search className="h-4 w-4" /> Explore cravings
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/explore"
              search={{ category: c.id, q: "" }}
              className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              <span>{c.emoji}</span>
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* AI Picks */}
      <section className="mt-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-extrabold">AI picks for right now</h2>
            <p className="text-sm text-muted-foreground">
              Tuned to a {ctx.partOfDay} in {ctx.city} · {ctx.weather}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary">
            Context-aware
          </span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.slice(0, 3).map((d) => (
            <DishCard key={d.id} dish={d} showMatch />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <TrendingUp className="h-6 w-6 text-accent" /> Trending in your galli
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((d) => (
            <DishCard key={d.id} dish={d} />
          ))}
        </div>
      </section>
    </div>
  );
}
