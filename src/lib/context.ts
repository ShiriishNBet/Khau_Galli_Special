export type DayContext = {
  partOfDay: "morning" | "afternoon" | "evening";
  greeting: string;
  weather: string;
  weatherEmoji: string;
  city: string;
  tags: ("morning" | "afternoon" | "evening" | "rainy" | "humid")[];
};

export function getDayContext(now: Date = new Date()): DayContext {
  const h = now.getHours();
  if (h < 12) {
    return {
      partOfDay: "morning",
      greeting: "Good morning",
      weather: "Humid · 27°C",
      weatherEmoji: "🌤️",
      city: "Solapur",
      tags: ["morning", "humid"],
    };
  }
  if (h < 17) {
    return {
      partOfDay: "afternoon",
      greeting: "Good afternoon",
      weather: "Warm · 31°C",
      weatherEmoji: "☀️",
      city: "Pune",
      tags: ["afternoon"],
    };
  }
  return {
    partOfDay: "evening",
    greeting: "Good evening",
    weather: "Light rain · 23°C",
    weatherEmoji: "🌧️",
    city: "Pune",
    tags: ["evening", "rainy"],
  };
}