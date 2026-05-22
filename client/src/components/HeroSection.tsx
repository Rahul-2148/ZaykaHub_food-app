import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search, Sparkles, Star, Truck, Clock3 } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import HeroImage from "@/assets/hero_pizza.png";
import TopRestaurants from "./HomeComponents/TopRestaurant";
import FoodCategories from "./HomeComponents/FoodCategories";
import CustomerReviews from "./HomeComponents/CustomerReviews";
import WhyChooseUs from "./HomeComponents/WhyChooseUs";
import FAQSection from "./HomeComponents/FAQSection";

const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const placeholders = [
    "Search for your favorite pizza 🍕",
    "Find delicious burgers 🍔 near you",
    "Craving pasta? Search here 🍝",
    "Discover top-rated restaurants ⭐",
    "Search restaurant by name, city & country",
  ];

  useEffect(() => {
    const currentText = placeholders[currentIndex];
    if (!currentText) return;

    let typingSpeed = isDeleting ? 45 : 85;

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 1300;
    } else if (isDeleting && charIndex === 0) {
      typingSpeed = 450;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setPlaceholder(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setPlaceholder(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 900);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentIndex]);

  const navigateTo = useNavigate();

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
        <div className="grid gap-10 px-6 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-12 lg:px-12 lg:py-16">
          <div className="flex flex-col justify-center gap-6">
            <span className="section-badge w-fit">
              <Sparkles className="h-4 w-4" /> Premium food discovery
            </span>

            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
                Order food anytime, anywhere with a modern dining experience.
              </h1>
              <p className="section-subheading">
                Explore trending restaurants, unlock curated cuisines, and place a smooth delivery order with a cleaner, faster interface built for today.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Star, label: "Top-rated spots" },
                { icon: Truck, label: "Fast delivery" },
                { icon: Clock3, label: "Open late" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="surface-card flex items-center gap-3 rounded-2xl px-4 py-3">
                  <Icon className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{label}</span>
                </div>
              ))}
            </div>

            <div className="surface-card flex flex-col gap-3 rounded-[1.75rem] p-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  value={searchText}
                  placeholder={placeholder || "Search restaurants, cuisines, cities..."}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="h-14 rounded-2xl border-0 bg-white pl-12 text-base shadow-none ring-1 ring-gray-200 placeholder:text-gray-400 focus-visible:ring-orange-400 dark:bg-slate-950 dark:ring-white/10"
                />
              </div>
              <Button
                onClick={() => navigateTo(`/search/${searchText}`)}
                className="h-14 rounded-2xl px-8 text-base font-semibold"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
              >
                Search now
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              <span className="rounded-full px-4 py-2" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>Smart search</span>
              <span className="rounded-full px-4 py-2" style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-muted-foreground)' }}>Verified restaurants</span>
              <span className="rounded-full px-4 py-2" style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-muted-foreground)' }}>Instant cart updates</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-8 rounded-[2rem] bg-gradient-to-br from-orange-400/20 via-amber-300/10 to-sky-300/20 blur-3xl" />
            <div className="surface-card relative w-full max-w-xl rounded-[2rem] p-4 md:p-6">
              <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-gray-950 to-gray-800 p-4 text-white shadow-2xl md:p-6">
                <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/70">
                  <span>Featured order</span>
                  <span>Fast checkout</span>
                </div>
                <div className="rounded-[1.5rem] bg-white/10 p-4 backdrop-blur-sm md:p-5">
                  <img
                    src={HeroImage}
                    alt="Delicious food"
                    className="mx-auto max-h-[360px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)]"
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    ["4.9", "Avg rating"],
                    ["20m", "Delivery"],
                    ["100+", "Dishes"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl bg-white/10 p-3 text-center">
                      <div className="text-lg font-bold">{value}</div>
                      <div className="text-[11px] uppercase tracking-wider text-white/65">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 py-10 md:space-y-12">
        <TopRestaurants />
        <FoodCategories />
        <CustomerReviews />
        <WhyChooseUs />
        <FAQSection />
      </div>
    </div>
  );
};

export default HeroSection;