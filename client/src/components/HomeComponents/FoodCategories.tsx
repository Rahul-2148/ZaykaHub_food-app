// Desc: Home page component for displaying popular food categories

import { motion } from "framer-motion";
import { Utensils, Pizza, Cake } from "lucide-react"; // Import food icons

const categories = [
  { id: 1, name: "Biryani", icon: <Utensils size={50} />, color: "bg-yellow-500" },
  { id: 2, name: "Pizza", icon: <Pizza size={50} />, color: "bg-red-500" },
  { id: 3, name: "Desserts", icon: <Cake size={50} />, color: "bg-pink-500" },
  { id: 4, name: "Burgers", icon: <Utensils size={50} />, color: "bg-green-500" },
];

const FoodCategories = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        🍽️ Popular Categories
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className={`w-32 h-32 ${category.color} bg-opacity-20 dark:bg-opacity-30 
              backdrop-blur-lg shadow-lg rounded-xl flex flex-col items-center justify-center`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.1, rotate: 3 }}
          >
            <motion.div whileHover={{ scale: 1.2 }} className="text-white dark:text-gray-200">
              {category.icon}
            </motion.div>
            <p className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
              {category.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FoodCategories;



