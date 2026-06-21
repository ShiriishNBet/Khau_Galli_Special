import { Link } from "@tanstack/react-router";
import type { Dish } from "@/data/dishes";
import { MapPin, Star, Clock } from "lucide-react";

function SpiceMeter({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`Spice level ${level} of 3`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= level ? "opacity-100" : "opacity-25"}>
          🌶️
        </span>
      ))}
    </span>
  );
}

export function DishCard({ dish, showMatch = false }: { dish: Dish; showMatch?: boolean }) {
  return (
    <Link
      to="/dish/$id"
      params={{ id: dish.id }}
      className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          width={768}
          height={576}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
        {showMatch && (
          <span className="absolute left-3 top-3 rounded-full bg-[image:var(--gradient-spice)] px-3 py-1 text-xs font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
            {dish.matchScore}% match
          </span>
        )}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-xs font-semibold backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          {dish.rating}
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-bold leading-tight">{dish.name}</h3>
            <p className="truncate text-xs text-muted-foreground">{dish.vendor}</p>
          </div>
          <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-sm font-bold text-primary">
            ₹{dish.price}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 truncate">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
          {dish.area} · {dish.distanceKm} km
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {dish.prepMins}m
          </span>
          <SpiceMeter level={dish.spice} />
        </span>
      </div>
    </Link>
  );
}