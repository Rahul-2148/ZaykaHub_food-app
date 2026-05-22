"use client";
import { motion } from "framer-motion";
import { useUserStore } from "@/Zustand Store/useUserStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const highlights = [
  { value: "20+", label: "Cuisine styles" },
  { value: "4.9/5", label: "Customer rating" },
  { value: "24/7", label: "Ordering support" },
];

const About = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="surface-card overflow-hidden rounded-[2rem] p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-5">
              <span className="section-badge">About ZaykaHub</span>
              <h1 className="section-heading">We turn food discovery into a clean, modern experience.</h1>
              <p className="section-subheading">
                Hi {user?.fullname || "there"}, ZaykaHub is built to help people discover food faster, check out smoother, and enjoy a premium browsing flow across every page.
              </p>
              <div className="flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10">
                    <div className="text-xl font-black text-gray-950 dark:text-white">{item.value}</div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{item.label}</div>
                  </div>
                ))}
              </div>
              <Button onClick={() => navigate("/blogs")} className="rounded-full bg-orange-500 px-6 py-6 text-base font-semibold text-white hover:bg-orange-600">
                Explore blogs
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Fast checkout", "Smooth cart and payment flow with less friction."],
                ["Verified sellers", "Restaurant pages are structured for trust and clarity."],
                ["Premium visuals", "Large cards, glass surfaces, and better spacing."],
                ["Modern support", "Chatbot and contact flows designed for quick help."],
              ].map(([title, desc]) => (
                <div key={title} className="surface-card rounded-3xl p-5">
                  <h3 className="text-lg font-bold text-gray-950 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="section-badge">Our Mission</span>
            <h2 className="mt-4 text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">Make ordering feel premium, fast, and intuitive.</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              We want every visitor to instantly understand what to do next, from browsing dishes to placing an order and tracking it with confidence.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="section-badge">Our Promise</span>
            <h2 className="mt-4 text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">Cleaner UI, stronger trust, better conversion.</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              From glass cards to refined spacing and polished invoices, the goal is a platform that looks current and feels reliable on every screen.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;