import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import { getDish, dishes } from "@/data/dishes";
import { DishCard } from "@/components/DishCard";
import { ArrowLeft, Star, MapPin, Clock, Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dish/$id")({
  loader: ({ params }) => {
    const dish = getDish(params.id);
    if (!dish) throw notFound({ data: { id: params.id } });
    return { dish };
  },
  head: ({ loaderData }) => {
    const dish = loaderData?.dish;
    if (!dish) return { meta: [{ title: "Dish — Khau Galli Specials" }] };
    return {
      meta: [
        { title: `${dish.name} at ${dish.vendor} — Khau Galli Specials` },
        { name: "description", content: dish.description },
        { property: "og:title", content: `${dish.name} — ${dish.tagline}` },
        { property: "og:description", content: dish.description },
        { property: "og:image", content: dish.image },
        { name: "twitter:image", content: dish.image },
      ],
    };
  },
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">This dish didn't load</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-5xl">🍽️</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Dish not found</h1>
      <Link to="/" className="mt-4 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
        Back to discover
      </Link>
    </div>
  ),
  component: DishDetail,
});

function DishDetail() {
  const { dish } = Route.useLoaderData();
  const related = dishes.filter((d) => d.id !== dish.id && d.category === dish.category).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <div className="relative mt-4 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]">
        <img
          src={dish.image}
          alt={dish.name}
          width={768}
          height={576}
          className="h-[300px] w-full object-cover sm:h-[420px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <Link
          to="/"
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="absolute right-4 top-4 rounded-full bg-[image:var(--gradient-spice)] px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
          {dish.matchScore}% match
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{dish.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">{dish.tagline}</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: Star, label: `${dish.rating} (${dish.reviews.toLocaleString()})`, sub: "Rating" },
          { icon: MapPin, label: `${dish.distanceKm} km`, sub: dish.area },
          { icon: Clock, label: `${dish.prepMins} min`, sub: "Prep time" },
          { icon: Sparkles, label: `₹${dish.price}`, sub: dish.veg ? "Veg" : "Non-veg" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="rounded-2xl border border-border bg-card p-3 text-center">
              <Icon className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 truncate text-sm font-bold">{s.label}</p>
              <p className="truncate text-xs text-muted-foreground">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Why this */}
      <div className="mt-6 rounded-3xl border border-primary/30 bg-[image:var(--gradient-warm)] p-5 sm:p-6">
        <p className="flex items-center gap-2 text-sm font-bold text-primary">
          <Sparkles className="h-4 w-4" /> Why Khau Galli AI picked this
        </p>
        <p className="mt-2 text-sm text-foreground/90">{dish.contextReason}.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {dish.signals.map((sig: string) => (
            <span
              key={sig}
              className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold"
            >
              <TrendingUp className="h-3.5 w-3.5 text-accent" /> {sig}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-display text-xl font-bold">About this dish</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dish.description}</p>
        <p className="mt-3 text-sm">
          <span className="font-semibold">{dish.vendor}</span> · {dish.area}, {dish.city}
        </p>
      </div>

      <button className="mt-6 w-full rounded-full bg-[image:var(--gradient-spice)] py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01]">
        Get directions to {dish.vendor}
      </button>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-extrabold">You might also crave</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((d) => (
              <DishCard key={d.id} dish={d} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}