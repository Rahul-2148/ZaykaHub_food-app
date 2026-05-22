// Desc: TopRestaurants component to display real restaurants from the API

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

type ReviewLike = {
  rating?: number;
};

type RestaurantLike = {
  _id: string;
  restaurantName: string;
  city?: string;
  country?: string;
  imageUrl?: string;
  reviews?: ReviewLike[];
};

const getAverageRating = (reviews: ReviewLike[] = []) => {
  const ratings = reviews
    .map((review) => Number(review?.rating))
    .filter((rating) => Number.isFinite(rating) && rating > 0);

  if (ratings.length === 0) {
    return null;
  }

  const total = ratings.reduce((sum, rating) => sum + rating, 0);
  return Number((total / ratings.length).toFixed(1));
};

const TopRestaurants = () => {
  const [restaurants, setRestaurants] = useState<RestaurantLike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/restaurant/get-all-restaurants?limit=12`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }

        const data = await response.json();
        const list: RestaurantLike[] = Array.isArray(data?.data) ? data.data : [];

        const sorted = [...list].sort((a, b) => {
          const aReviews = a.reviews?.length ?? 0;
          const bReviews = b.reviews?.length ?? 0;

          if (bReviews !== aReviews) {
            return bReviews - aReviews;
          }

          const aRating = getAverageRating(a.reviews);
          const bRating = getAverageRating(b.reviews);

          return (bRating ?? 0) - (aRating ?? 0);
        });

        setRestaurants(sorted.slice(0, 4));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();

    return () => controller.abort();
  }, []);

  const topRestaurants = useMemo(
    () => restaurants.map((restaurant) => ({
      ...restaurant,
      reviewCount: restaurant.reviews?.length ?? 0,
      averageRating: getAverageRating(restaurant.reviews),
    })),
    [restaurants]
  );

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        🔥 Top Restaurants
      </h2>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-[22rem] animate-pulse rounded-[1.4rem] bg-white/80 p-4 shadow-lg dark:bg-gray-800/80" />
          ))}
        </div>
      ) : topRestaurants.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {topRestaurants.map((restaurant) => (
            <motion.div
              key={restaurant._id}
              className="overflow-hidden rounded-[1.4rem] bg-white p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={restaurant.imageUrl || "https://via.placeholder.com/600x600?text=Restaurant"}
                alt={restaurant.restaurantName}
                className="h-56 w-full rounded-[1rem] object-cover"
                whileHover={{ scale: 1.03 }}
              />
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {restaurant.restaurantName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {[restaurant.city, restaurant.country].filter(Boolean).join(", ") || "Location unavailable"}
                </p>
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-yellow-500">
                    ⭐ {restaurant.averageRating ?? "New"}
                  </span>
                  <span className="text-gray-500 dark:text-gray-300">
                    {restaurant.reviewCount} review{restaurant.reviewCount === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.4rem] border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
          No restaurants available right now.
        </div>
      )}
    </section>
  );
};

export default TopRestaurants;


