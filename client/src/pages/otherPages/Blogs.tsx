"use client";
import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "The Secret Behind Our Authentic Flavors",
    description:
      "Discover the rich history and ingredients that make our dishes unique and unforgettable.",
    image: "https://picsum.photos/600/400",
    author: "Chef Raj",
    date: "March 10, 2025",
  },
  {
    id: 2,
    title: "A Day in the Life of Our Restaurant",
    description:
      "From the kitchen to the dining tables, get an inside look at how we bring joy through food.",
    image: "https://picsum.photos/600/400",
    author: "Manager Anjali",
    date: "April 5, 2025",
  },
  {
    id: 3,
    title: "5 Must-Try Dishes at Our Restaurant",
    description:
      "Don't miss out on these delicious signature dishes that our customers love!",
    // image: "https://source.unsplash.com/600x400/?delicious,meal",
    image: "https://picsum.photos/600/400",
    author: "Food Blogger Sagar",
    date: "April 15, 2025",
  },
];

const galleryImages = [
  "/hero_pizza.png",
  "/hero_pizza.png",
  "/hero_pizza.png",
  "/hero_pizza.png",
  "/hero_pizza.png",
  "/hero_pizza.png",
];

const BlogPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-10 px-5 md:px-20 md:mt-17">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-orange-600">Our Blog</h1>
        <p className="text-lg mt-3 text-gray-700 dark:text-gray-400">
          Stay updated with our latest stories, recipes, and restaurant updates.
        </p>
      </motion.div>

      {/* Blog Posts Section */}
      <section className="mt-10 grid md:grid-cols-3 gap-10">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={`${blog.image}?random=${index}`}
              alt={blog.title}
              className="rounded-lg"
            />
            <h2 className="text-2xl font-semibold mt-4">{blog.title}</h2>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              {blog.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {blog.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {blog.date}
                </p>
              </div>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-orange-500 font-bold"
              >
                Read More →
              </motion.a>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Gallery Section */}

      <section className="mt-20">
        <h2 className="text-3xl font-bold text-orange-600 text-center">
          Gallery
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-400 mt-2">
          A glimpse into our ambiance & dishes.
        </p>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          {galleryImages.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-orange-600">
          What Our Customers Say
        </h2>
        <div className="mt-5 grid md:grid-cols-3 gap-5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md"
          >
            <p className="text-gray-700 dark:text-gray-400">
              "Amazing food and great ambiance!"
            </p>
            <p className="font-semibold mt-2">- Alex D.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md"
          >
            <p className="text-gray-700 dark:text-gray-400">
              "Best dining experience ever! Highly recommended."
            </p>
            <p className="font-semibold mt-2">- Sarah L.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md"
          >
            <p className="text-gray-700 dark:text-gray-400">
              "Fantastic service and mouthwatering dishes!"
            </p>
            <p className="font-semibold mt-2">- John M.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-orange-600">
          📞 Let's Stay Connected
        </h2>
        <p className="text-gray-700 dark:text-gray-400 mt-2">
          Follow our journey & get exclusive updates.
        </p>
        <motion.a
          whileHover={{ scale: 1.1 }}
          href="mailto:contact@restaurant.com"
          className="inline-block mt-4 px-6 py-3 bg-orange-500 text-white rounded-md"
        >
          Contact Us
        </motion.a>
      </section>
    </div>
  );
};

export default BlogPage;
