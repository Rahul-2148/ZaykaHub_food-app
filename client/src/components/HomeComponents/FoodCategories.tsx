// Desc: Home page component for displaying popular food categories

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Utensils, Pizza, Cake, Beef, Salad } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

type RestaurantLike = {
  cuisines?: string[];
};

type CategoryItem = {
  name: string;
  count: number;
  icon: JSX.Element;
  color: string;
};

const categoryMeta: Record<string, { icon: JSX.Element; color: string }> = {
  biryani: { icon: <Utensils size={50} />, color: "bg-yellow-500" },
  pizza: { icon: <Pizza size={50} />, color: "bg-red-500" },
  dessert: { icon: <Cake size={50} />, color: "bg-pink-500" },
  desserts: { icon: <Cake size={50} />, color: "bg-pink-500" },
  burger: { icon: <Beef size={50} />, color: "bg-green-500" },
  burgers: { icon: <Beef size={50} />, color: "bg-green-500" },
  salad: { icon: <Salad size={50} />, color: "bg-emerald-500" },
  salads: { icon: <Salad size={50} />, color: "bg-emerald-500" },
};

const fallbackCategories: CategoryItem[] = [
  { name: "Biryani", count: 0, icon: <Utensils size={50} />, color: "bg-yellow-500" },
  { name: "Pizza", count: 0, icon: <Pizza size={50} />, color: "bg-red-500" },
  { name: "Desserts", count: 0, icon: <Cake size={50} />, color: "bg-pink-500" },
  { name: "Burgers", count: 0, icon: <Beef size={50} />, color: "bg-green-500" },
];

const normalizeCuisine = (value: string) => value.trim().toLowerCase();

const toTitleCase = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const FoodCategories = () => {
  const [restaurants, setRestaurants] = useState<RestaurantLike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/restaurant/get-all-restaurants?limit=50`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load restaurants");
        }

        const data = await response.json();
        setRestaurants(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();

    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();

    restaurants.forEach((restaurant) => {
      (restaurant.cuisines ?? []).forEach((cuisine) => {
        const normalized = normalizeCuisine(cuisine);
        if (!normalized) return;
        counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
      });
    });

    const items = Array.from(counts.entries())
      .map(([key, count]) => {
        const meta = categoryMeta[key] ?? {
          icon: <Utensils size={50} />,
          color: "bg-sky-500",
        };

        return {
          name: toTitleCase(key),
          count,
          icon: meta.icon,
          color: meta.color,
        } satisfies CategoryItem;
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    return items.length > 0 ? items : fallbackCategories;
  }, [restaurants]);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 px-4 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/60 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 text-center">
          <span className="section-badge mx-auto w-fit">
            <Sparkles className="h-4 w-4" /> Popular categories
          </span>
          <div className="space-y-3">
            <h2 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
              Explore what people are ordering most
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300 md:text-base">
              These categories are pulled from live restaurants, so the section stays aligned with real demand instead of fixed demo labels.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {fallbackCategories.map((category) => (
              <div
                key={category.name}
                className="h-48 animate-pulse rounded-[1.5rem] border border-white/60 bg-white/80 dark:border-white/10 dark:bg-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/60 bg-gradient-to-br from-white via-white/90 to-slate-50 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,23,42,0.12)] dark:border-white/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(91,81,216,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.12),transparent_30%)] opacity-90" />
                <div className="relative flex flex-col gap-5">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.color} bg-opacity-15 ring-1 ring-black/5 backdrop-blur-md dark:bg-opacity-20 dark:ring-white/10`}>
                    <motion.div whileHover={{ scale: 1.12, rotate: 4 }} className="text-white dark:text-gray-100">
                      {category.icon}
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-extrabold tracking-tight text-gray-950 dark:text-white">
                        {category.name}
                      </h3>
                      <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                        Live
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {category.count} restaurant{category.count === 1 ? "" : "s"} serving this cuisine.
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/10">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                        Popularity
                      </p>
                      <p className="mt-1 text-lg font-bold text-gray-950 dark:text-white">
                        #{categories.findIndex((item) => item.name === category.name) + 1}
                      </p>
                    </div>
                    <div className="rounded-full bg-gray-950 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-black/10 transition group-hover:bg-indigo-600 dark:bg-white dark:text-gray-950">
                      Explore
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FoodCategories;



