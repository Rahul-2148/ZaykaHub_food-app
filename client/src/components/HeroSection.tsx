import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
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
        "Search restaurant by name, city & country"
    ];

    useEffect(() => {
        const currentText = placeholders[currentIndex]; // Correct text from array

        if (!currentText) return; // Safety check

        let typingSpeed = isDeleting ? 50 : 100; // Typing & deleting speed

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 1500; // Hold before deleting
        } else if (isDeleting && charIndex === 0) {
            typingSpeed = 500; // Pause before switching text
        }

        const timeout = setTimeout(() => {
            if (isDeleting) {
                setPlaceholder(currentText.substring(0, charIndex - 1)); // Delete last char
                setCharIndex((prev) => prev - 1);
            } else {
                setPlaceholder(currentText.substring(0, charIndex + 1)); // Type next char
                setCharIndex((prev) => prev + 1);
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => setIsDeleting(true), 1000); // Wait before deleting
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % placeholders.length); // Move to next text
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, currentIndex]);

    const navigateTo = useNavigate();

    return (
        <div>
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
            <div className="flex flex-col gap-10 md:w-[45%]">
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
                        Order Food Anytime & Anywhere
                    </h1>
                    <p className="text-gray-800 dark:text-gray-300">
                        Our extensive menu and convenient delivery services make it easy to find the perfect meal for your taste. <b>Search restaurant by name, city & country.</b> 
                    </p>
                </div>
                <div className="relative flex items-center gap-2">
                    <Input
                        type="text"
                        value={searchText}
                        placeholder={placeholder} // Dynamic placeholder
                        onChange={(e) => setSearchText(e.target.value)}
                        className="pl-10 shadow-lg text-black dark:text-white"
                    />
                    <Search className="text-gray-500 absolute inset-y-2 left-2" />
                    <Button onClick={() => navigateTo(`/search/${searchText}`)} className="bg-orange-500 hover:bg-orange-600">
                        Search
                    </Button>
                </div>
            </div>
            <div>
                <img 
                    src={HeroImage} 
                    alt="" 
                    className="object-cover w-full max-h-[500px]"
                />
            </div>
        </div>

        {/* other sections */}
        <TopRestaurants />
        <FoodCategories />
        <CustomerReviews />
        <WhyChooseUs />
        <FAQSection />
        </div>
    );
};

export default HeroSection;