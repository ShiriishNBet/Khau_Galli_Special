import misal from "@/assets/dish-misal.jpg";
import idli from "@/assets/dish-idli.jpg";
import vadapav from "@/assets/dish-vadapav.jpg";
import pavbhaji from "@/assets/dish-pavbhaji.jpg";
import dosa from "@/assets/dish-dosa.jpg";
import chai from "@/assets/dish-chai.jpg";

export type Dish = {
  id: string;
  name: string;
  vendor: string;
  area: string;
  city: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  distanceKm: number;
  prepMins: number;
  veg: boolean;
  spice: 1 | 2 | 3;
  image: string;
  tagline: string;
  description: string;
  matchScore: number;
  contextReason: string;
  signals: string[];
  bestFor: ("morning" | "afternoon" | "evening" | "rainy" | "humid")[];
};

export const categories = [
  { id: "all", label: "All", emoji: "🍽️" },
  { id: "breakfast", label: "Breakfast", emoji: "🌅" },
  { id: "snacks", label: "Snacks", emoji: "🔥" },
  { id: "curries", label: "Curries", emoji: "🍛" },
  { id: "beverages", label: "Chai & Drinks", emoji: "☕" },
];

export const dishes: Dish[] = [
  {
    id: "misal-pav",
    name: "Kolhapuri Misal Pav",
    vendor: "Shree Khaugiri",
    area: "Shivaji Chowk",
    city: "Solapur",
    category: "curries",
    price: 70,
    rating: 4.8,
    reviews: 2140,
    distanceKm: 0.6,
    prepMins: 8,
    veg: true,
    spice: 3,
    image: misal,
    tagline: "Fiery tarri that locals queue 20 mins for",
    description:
      "A blistering Kolhapuri-style misal — sprouted matki in a deep red tarri, layered with crunchy farsan, raw onion, lemon and two soft pav. The AI flags this as the city's most-craved breakfast on humid mornings.",
    matchScore: 97,
    contextReason: "Humid Solapur morning — locals crave a spicy, energising start",
    signals: ["1.2k YouTube vlog mentions", "Trending #SolapurMisal", "92% would re-order"],
    bestFor: ["morning", "humid"],
  },
  {
    id: "idli-sambar",
    name: "Steamed Idli Sambar",
    vendor: "Udupi Tiffin House",
    area: "Railway Lines",
    city: "Pune",
    category: "breakfast",
    price: 60,
    rating: 4.7,
    reviews: 1685,
    distanceKm: 1.1,
    prepMins: 6,
    veg: true,
    spice: 1,
    image: idli,
    tagline: "Cloud-soft idli with piping hot sambar",
    description:
      "Featherlight fermented rice cakes bathed in a fragrant lentil sambar with fresh coconut chutney. The recommendation engine surfaces this on rainy evenings when warm, comforting food peaks in demand.",
    matchScore: 95,
    contextReason: "Rainy Pune evening — warm, soothing comfort food peaks",
    signals: ["Top-rated comfort dish", "+38% orders when it rains", "98% softness score"],
    bestFor: ["evening", "rainy"],
  },
  {
    id: "vada-pav",
    name: "Tikha Vada Pav",
    vendor: "Ashok Vada Pav",
    area: "Saat Rasta",
    city: "Mumbai",
    category: "snacks",
    price: 25,
    rating: 4.9,
    reviews: 5320,
    distanceKm: 0.3,
    prepMins: 4,
    veg: true,
    spice: 2,
    image: vadapav,
    tagline: "The original 5-minute street legend",
    description:
      "Golden batata vada in a buttered pav with dry garlic chutney and a fried green chilli. Computer-vision tagging and 5k+ reviews make this the highest-confidence snack pick in the graph.",
    matchScore: 93,
    contextReason: "Quick craving fix — highest re-order rate nearby",
    signals: ["5.3k verified reviews", "#1 snack within 1km", "Instagram reel favourite"],
    bestFor: ["afternoon", "evening"],
  },
  {
    id: "pav-bhaji",
    name: "Butter Pav Bhaji",
    vendor: "Sardar Refreshments",
    area: "Tardeo",
    city: "Mumbai",
    category: "curries",
    price: 110,
    rating: 4.6,
    reviews: 2980,
    distanceKm: 1.8,
    prepMins: 12,
    veg: true,
    spice: 2,
    image: pavbhaji,
    tagline: "Buttery mash with extra-toasted pav",
    description:
      "A generous bhaji loaded with butter, finished tableside with onion and lemon, served with toasted pav. Demand spikes in the evening crowd window the AI tracks across the neighbourhood.",
    matchScore: 90,
    contextReason: "Evening hangout window — sharing-friendly comfort plate",
    signals: ["Group-order favourite", "+42% after 7pm", "High satiety score"],
    bestFor: ["evening"],
  },
  {
    id: "masala-dosa",
    name: "Crispy Masala Dosa",
    vendor: "Anna's Dosa Corner",
    area: "FC Road",
    city: "Pune",
    category: "breakfast",
    price: 90,
    rating: 4.7,
    reviews: 2410,
    distanceKm: 0.9,
    prepMins: 9,
    veg: true,
    spice: 1,
    image: dosa,
    tagline: "Paper-thin, ghee-roasted, gloriously crisp",
    description:
      "A ghee-roasted dosa wrapped around spiced potato masala, served with sambar and chutney trio. NLP review parsing rates its crispness in the top 2% of all dosas in the city graph.",
    matchScore: 92,
    contextReason: "Bright morning — top-rated crisp breakfast nearby",
    signals: ["Top 2% crispness", "Student-area favourite", "Consistent 4.7★"],
    bestFor: ["morning", "afternoon"],
  },
  {
    id: "kulhad-chai",
    name: "Kulhad Masala Chai",
    vendor: "Tapri Tea Co.",
    area: "Camp",
    city: "Pune",
    category: "beverages",
    price: 30,
    rating: 4.8,
    reviews: 3760,
    distanceKm: 0.4,
    prepMins: 5,
    veg: true,
    spice: 1,
    image: chai,
    tagline: "Earthy clay-cup chai for the drizzle",
    description:
      "Strong cardamom-ginger chai poured into a clay kulhad that adds an earthy aroma. The context layer pushes this to the top whenever rain and a cool evening overlap.",
    matchScore: 96,
    contextReason: "Cool drizzle — chai demand surges across the galli",
    signals: ["+60% orders in rain", "Most-shared on reels", "Aroma score 9.4/10"],
    bestFor: ["evening", "rainy"],
  },
];

export function getDish(id: string) {
  return dishes.find((d) => d.id === id);
}