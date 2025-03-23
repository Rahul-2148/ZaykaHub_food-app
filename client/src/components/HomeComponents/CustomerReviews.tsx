// Desc: Customer Reviews component for the Home page
// Displays customer reviews with their name, comment, and rating

import { motion } from "framer-motion";

const CustomerReviews = () => {
  const reviews = [
    { id: 1, name: "Rahul Raj Modi", comment: "Amazing food! Super fast delivery. 🔥", rating: 5 },
    { id: 2, name: "Sujay Sahis", comment: "Love the variety of food options available. ❤️", rating: 4.8 },
    { id: 3, name: "Sujoy Maji", comment: "Best app for ordering food at night!", rating: 4.5 },
    { id: 4, name: "Suman Shit", comment: "Fast and reliable delivery. 👌", rating: 4.7 },
    { id: 5, name: "Anshika Bakshi", comment: "Amazing food! Super fast delivery. 🔥", rating: 5 },
    { id: 5, name: "Arbaz Khan", comment: "Great customer service. 👍", rating: 4.9 },
    { id: 6, name: "Ahmad Salik Yazdani", comment: "Food quality is top-notch. 🌟", rating: 5 },
    { id: 7, name: "Mudassar Alam", comment: "Amazing food! Super fast delivery. 🔥", rating: 5 },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        What Our Customers Say 💬
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="w-72 p-6 rounded-lg shadow-xl bg-white/70 dark:bg-gray-800/80 backdrop-blur-md border border-gray-300 dark:border-gray-700"
          >
            <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
            <p className="text-gray-600 dark:text-gray-300 italic">"{review.comment}"</p>
            <p className="text-yellow-500 text-lg mt-2">⭐ {review.rating}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
