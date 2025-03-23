"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10 md:mt-17">
      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-center"
      >
        📩 Contact Us
      </motion.h1>
      <p className="text-gray-300 mt-2 text-lg text-center">
        We'd love to hear from you! Reach out to us anytime.
      </p>

      {/* Contact Details Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="mt-8 w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg flex flex-wrap gap-6 justify-between"
      >
        <div>
          <h2 className="text-xl font-bold">📍 Address</h2>
          <p className="text-gray-300">123 Street, Ranchi, Jharkhand, India</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">📞 Phone</h2>
          <p className="text-gray-300">+91 9973162148</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">📧 Email</h2>
          <p className="text-gray-300">rahulrajmodi24523@gmail.com</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">🕒 Business Hours</h2>
          <p className="text-gray-300">Mon - Sat: 9:00 AM - 6:00 PM</p>
        </div>
      </motion.div>

      {/* Contact Form with Web3Forms */}
      <motion.form
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mt-8 w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg"
        action="https://api.web3forms.com/submit"
        method="POST"
      >
        {/* Web3Forms Access Key */}
        <input
          type="hidden"
          name="access_key"
          value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY}
        />

        <div className="mb-4">
          <label className="block text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
            minLength={10}
            required
          />
          <p className="text-sm text-gray-400 mt-1">
            Minimum 10 characters required.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Send Message 🚀
        </motion.button>
      </motion.form>

      {/* Google Map */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-10 w-full max-w-4xl"
      >
        <iframe
          className="w-full h-80 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9023192577985!2d85.3217933142968!3d23.3440972847574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1f9b0aebfd7%3A0x507eefb9f7092b8a!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1629286201804!5m2!1sen!2sin"
          allowFullScreen
          title="Google Maps showing Ranchi, Jharkhand"
        ></iframe>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-6 flex gap-6"
      >
        <a
          href="https://x.com/RahulRaj__48"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-orange-500 transition"
        >
          🐦 Twitter
        </a>
        <a
          href="https://github.com/Rahul-2148"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-orange-500 transition"
        >
          💻 GitHub
        </a>
        <a
          href="mailto:rahulrajmodi24523@email.com"
          className="text-gray-300 hover:text-orange-500 transition"
        >
          📧 Email
        </a>
      </motion.div>
    </div>
  );
}
