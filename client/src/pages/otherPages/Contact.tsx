"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="surface-card rounded-[2rem] p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div className="space-y-4">
              <span className="section-badge">Contact ZaykaHub</span>
              <h1 className="section-heading">We’d love to hear from you.</h1>
              <p className="section-subheading">
                Reach out for feedback, support, partnerships, or anything about your ordering experience. We respond with clarity and speed.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Address", "123 Street, Ranchi, Jharkhand, India"],
                  ["Phone", "+91 9973162148"],
                  ["Email", "rahulrajmodi24523@gmail.com"],
                  ["Hours", "Mon - Sat: 9:00 AM - 6:00 PM"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10">
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-gray-950 dark:text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="surface-card rounded-[1.75rem] p-5 md:p-6"
              action="https://api.web3forms.com/submit"
              method="POST"
            >
              <input
                type="hidden"
                name="access_key"
                value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY}
              />

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-950 outline-none ring-0 transition placeholder:text-gray-400 focus:border-orange-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-orange-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    className="min-h-32 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-orange-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    minLength={10}
                    required
                  />
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Minimum 10 characters required.</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                >
                  Send Message
                </motion.button>
              </div>
            </motion.form>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="surface-card rounded-[2rem] p-4 md:p-5">
            <iframe
              className="h-[360px] w-full rounded-[1.5rem] border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9023192577985!2d85.3217933142968!3d23.3440972847574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1f9b0aebfd7%3A0x507eefb9f7092b8a!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1629286201804!5m2!1sen!2sin"
              allowFullScreen
              title="Google Maps showing Ranchi, Jharkhand"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="section-badge">Quick Support</span>
            <h2 className="mt-4 text-2xl font-bold text-gray-950 dark:text-white">Direct channels for fast responses.</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Choose the fastest route for your request and we’ll get back with a clear, actionable response.
            </p>

            <div className="mt-6 space-y-4">
              {[
                ["Twitter", "@RahulRaj__48"],
                ["GitHub", "Rahul-2148"],
                ["Email", "rahulrajmodi24523@email.com"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10">
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-gray-950 dark:text-white">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}