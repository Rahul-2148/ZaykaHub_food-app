import { useEffect, useState } from "react";
import { useCartStore } from "@/Zustand Store/useCartStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const SuccessPage = () => {
  const { clearCart } = useCartStore();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [countdown, setCountdown] = useState(5); // Redirect countdown

  useEffect(() => {
    clearCart(); // Clear the cart after successful payment

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/order/status"); // Redirect after countdown
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 md:mt-17">
      {/* Confetti Animation */}
      <Confetti width={width} height={height} numberOfPieces={200} />

      {/* Animated Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center max-w-md"
      >
        <div className="text-green-500 text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Payment Successful!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Thank you for your order. Your transaction was completed successfully.
        </p>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
          Redirecting to Order Status Page in <span className="font-semibold text-gray-700 dark:text-white">{countdown}</span> seconds...
        </p>

        {/* Redirect Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/order/status")}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition-all"
        >
          View Order Status
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
