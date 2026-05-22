// Desc: TopRestaurants component to display top restaurants

import { motion } from "framer-motion";
import BurgerKing_Logo from "@/assets/BurgerKing_Logo.jpg";
import logo_Dominos from "@/assets/logo_Dominos.jpg";
import KFC_logo from "@/assets/KFC_logo.png";
import tandoori_tadka from "@/assets/tandoori_tadka.webp";

const TopRestaurants = () => {
  const restaurants = [
    { id: 1, name: "🍔 Burger King", rating: 4.5, image: BurgerKing_Logo },
    { id: 2, name: "🍕 Domino's Pizza", rating: 4.3, image: logo_Dominos },
    { id: 3, name: "🍗 KFC", rating: 4.7, image: KFC_logo },
    { id: 4, name: "🍢 Tandoori Tadka", rating: 4.7, image: tandoori_tadka },
  ];

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        🔥 Top Restaurants
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {restaurants.map((restaurant) => (
          <motion.div
            key={restaurant.id}
            className="bg-white dark:bg-gray-800 p-5 shadow-lg rounded-lg w-64 transform hover:scale-105 transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-56 h-56 object-cover rounded-md"
              whileHover={{ rotate: 3, scale: 1.02 }}
            />
            <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
              {restaurant.name}
            </h3>
            <p className="text-yellow-500 text-lg">⭐ {restaurant.rating}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopRestaurants;


