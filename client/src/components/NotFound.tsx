// components/NotFound.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import chinese from "@/assets/chinese.png";
import restaurant from "@/assets/restaurant.png";

const NotFound = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-all duration-300">
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-6">Oops! Page not found.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.img
              src={chinese}
              alt="Delicious Food"
              className="w-24 h-24 rounded-full shadow-lg mx-auto mb-6 dark:shadow-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <motion.img
              src={restaurant}
              alt="Delicious Food"
              className="w-24 h-24 rounded-full shadow-lg mx-auto mb-6 dark:shadow-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <Link to="/" className="relative inline-block px-6 py-3 font-medium group">
            <span className="absolute inset-0 w-full h-full transition-transform transform scale-150 bg-yellow-500 group-hover:scale-100 group-hover:opacity-100 opacity-0 rounded-md"></span>
            <span className="relative z-10 text-black dark:text-white">Back to Home</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default NotFound;
