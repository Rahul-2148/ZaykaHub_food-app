import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const points = [
    { id: 1, text: "Fastest Food Delivery in Your City 🚀" },
    { id: 2, text: "Over 10,000+ Restaurants to Choose From 🍕" },
    { id: 3, text: "Exclusive Discounts & Cashback 💰" },
    { id: 4, text: "100% Hygiene & Freshness Guarantee ✅" },
  ];

  return (
    <section className="py-12 bg-yellow-200 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Why Choose Us?
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {points.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg w-64 text-center"
          >
            <p className="font-semibold text-gray-900 dark:text-gray-200">
              {point.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;

