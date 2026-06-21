import { createFileRoute, Link } from "@tanstack/react-router";
import { CloudRain, MapPin, Brain, Network, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "How Khau Galli AI works — Dish-level food intelligence" },
      {
        name: "description",
        content:
          "Khau Galli builds a food intelligence graph linking dishes, vendors and cravings — using weather, time and social signals to recommend the best dish near you.",
      },
      { property: "og:title", content: "How Khau Galli AI works" },
      {
        property: "og:description",
        content: "From 'where to eat?' to 'what's the best version of this exact dish near me?'",
      },
    ],
  }),
  component: About,
});

const steps = [
  {
    icon: MapPin,
    title: "Location & context",
    body: "GPS plus live weather and time-of-day seed score modifiers — a humid morning ranks differently to a rainy evening.",
  },
  {
    icon: Network,
    title: "Data aggregation",
    body: "Google Places, review aggregators and social signals from Instagram and YouTube vlogs feed the trend layer.",
  },
  {
    icon: Brain,
    title: "AI & modeling",
    body: "NLP extracts dish names and sentiment from unstructured reviews; computer vision tags every dish photo.",
  },
  {
    icon: Sparkles,
    title: "Knowledge graph",
    body: "Dishes → Vendors → Cuisines → Preferences form a proprietary scoring engine that sharpens with every tap.",
  },
];

export function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
        <Sparkles className="h-3.5 w-3.5" /> India's AI Food Intelligence Platform
      </span>
      <h1 className="mt-4 text-balance font-display text-3xl font-extrabold sm:text-4xl">
        We surface the dish — not just the restaurant.
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Consumers waste minutes scrolling generic restaurant lists. Khau Galli shifts the question
        from <em>“where to eat?”</em> to <em>“what's the absolute best version of this exact dish
        near me, right now?”</em>
      </p>

      <div className="mt-8 rounded-3xl border border-primary/30 bg-[image:var(--gradient-warm)] p-6">
        <p className="flex items-center gap-2 font-display text-lg font-bold">
          <CloudRain className="h-5 w-5 text-accent" /> Context that other apps ignore
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          On a humid Solapur morning we recommend a fiery Misal Pav. On a rainy Pune evening we
          highlight steaming Idli-Sambar or a kulhad chai nearby. Same person, different craving —
          read in real time.
        </p>
      </div>

      <h2 className="mt-10 font-display text-2xl font-extrabold">The intelligence pipeline</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-display font-bold">
                  {i + 1}. {s.title}
                </p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { v: "10M+", l: "Street vendors in India" },
          { v: "₹9.8L Cr", l: "Total addressable market" },
          { v: "90%+", l: "Smartphone penetration" },
          { v: "Tier-2", l: "City-first strategy" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="font-display text-2xl font-extrabold text-primary">{s.v}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card p-6 text-center">
        <h2 className="font-display text-xl font-bold">Find what to eat. Instantly.</h2>
        <Link
          to="/"
          className="mt-4 inline-flex rounded-full bg-[image:var(--gradient-spice)] px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]"
        >
          Start discovering
        </Link>
      </div>
    </div>
  );
}