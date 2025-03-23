"use client";
import { motion } from "framer-motion";

import { useUserStore } from "@/Zustand Store/useUserStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 py-10 px-5 md:px-20 md:mt-14">
 
      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold text-orange-600">About Us</h1>
        <h2 className="text-2xl font-semibold text-black dark:text-white">Hi, I am {user?.fullname}</h2>
        <p className="text-lg mt-3 text-gray-700 dark:text-gray-400">
          Discover our story, passion, and commitment to serving delicious food.
        </p>
      </section>

      <div>
      <Button className="mt-4 bg-blue-500 hover:bg-blue-600 border focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800 text-white text-xl ml-[45%] px-5 py-5" onClick={() => navigate("/blogs")}>Blogs</Button>
    </div>

      {/* History & Mission */}
      <section className="grid md:grid-cols-2 gap-10 mt-10">
        <div>
          <h2 className="text-2xl font-semibold text-orange-600">Our History</h2>
          <p className="mt-3 text-gray-700 dark:text-gray-400">
            Founded in 2000, our restaurant has been serving authentic dishes crafted
            with love and tradition. We take pride in using the finest ingredients
            to bring you an unforgettable dining experience.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-orange-600">Our Mission</h2>
          <p className="mt-3 text-gray-700 dark:text-gray-400">
            Our mission is to create a warm and welcoming environment where food
            lovers can enjoy high-quality, flavorful meals made from the freshest
            ingredients.
          </p>
        </div>
      </section>

      {/* Chef Section */}
      <section className="mt-10 text-center">
        <h2 className="text-3xl font-bold text-orange-600">Meet Our Chef</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-400">Expert culinary skills and passion for great food.</p>
        <div className="mt-5 flex justify-center">
          <img
            src="https://source.unsplash.com/400x400/?chef"
            alt="Chef"
            className="rounded-full shadow-lg"
          />
        </div>
      </section>

      {/* Ambiance Section */}
      <section className="mt-10">
        <h2 className="text-3xl font-bold text-orange-600 text-center">Our Ambiance</h2>
        <p className="mt-3 text-center text-gray-700">A perfect place for family & friends.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          <img src="https://source.unsplash.com/400x300/?restaurant" alt="Interior" className="rounded-lg shadow-md dark:text-gray-400" />
          <img src="https://source.unsplash.com/400x300/?food" alt="Food" className="rounded-lg shadow-md dark:text-gray-400" />
          <img src="https://source.unsplash.com/400x300/?dining" alt="Dining Area" className="rounded-lg shadow-md dark:text-gray-400" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-10 text-center">
        <h2 className="text-3xl font-bold text-orange-600">What Our Customers Say</h2>
        <div className="mt-5 grid md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-gray-700 dark:text-gray-400">"Amazing food and great ambiance!"</p>
            <p className="font-semibold mt-2">- Alex D.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-gray-700 dark:text-gray-400">"Best dining experience ever! Highly recommended."</p>
            <p className="font-semibold mt-2">- Sarah L.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-gray-700 dark:text-gray-400">"Fantastic service and mouthwatering dishes!"</p>
            <p className="font-semibold mt-2 dark:text-gray-400">- John M.</p>
          </div>
        </div>
      </section>

      {/* Developer About Section */}
    <div className="min-h-screen bg-gray-900 text-white p-10 mt-5">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold">👋 About Me</h1>
        <p className="text-xl mt-4 text-gray-300">
          Passionate Developer | UI/UX Enthusiast | Tech Lover
        </p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="mt-10"
      >
        <h2 className="text-3xl font-semibold">🔥 My Skills</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"].map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-orange-500 rounded-md"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="mt-10"
      >
        <h2 className="text-3xl font-semibold">📌 Work Experience</h2>
        <div className="mt-4 space-y-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 border-l-4 border-orange-500 bg-gray-800 rounded-md"
          >
            <h3 className="text-2xl font-bold">Full-Stack Developer @ XYZ Company</h3>
            <p className="text-gray-300">2022 - Present</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 border-l-4 border-orange-500 bg-gray-800 rounded-md"
          >
            <h3 className="text-2xl font-bold">Frontend Developer @ ABC Inc.</h3>
            <p className="text-gray-300">2020 - 2022</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mt-10 text-center"
      >
        <h2 className="text-3xl font-semibold">📞 Let's Connect</h2>
        <p className="text-gray-300 mt-2">Want to work together? Feel free to reach out!</p>
        <motion.a
          whileHover={{ scale: 1.1 }}
          href="mailto:your@email.com"
          className="inline-block mt-4 px-6 py-3 bg-orange-500 text-white rounded-md"
        >
          Contact Me
        </motion.a>
      </motion.div>
    </div>
    </div>

  );
};

export default About;