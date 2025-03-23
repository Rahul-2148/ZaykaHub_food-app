import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / windowHeight) * 100;

    setScrollProgress(scrollPercentage);

    // Show button after scrolling 300px
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* 🔥 Right Side Animated Scroll Progress Bar */}
      <div
        // className="fixed top-0 right-0 w-[6px] h-full z-50"
        // style={{
        //   background: `linear-gradient(to bottom, #ff5733 ${scrollProgress}%, #e5e7eb ${scrollProgress}%)`,
        //   transition: "all 0.2s ease-in-out",
        // }}
      />

      {/* 🔥 Animated Circular Back to Top Button */}
      {isVisible && (
        <div
          className="fixed bottom-18 right-4 w-16 h-16 flex items-center justify-center animate-bounce"
          style={{
            background: `conic-gradient(#ff5733 ${scrollProgress}%, #e5e7eb ${scrollProgress}%)`,
            borderRadius: "50%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Button
            onClick={scrollToTop}
            className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-800 focus:outline-none transition duration-300"
          >
            <FaArrowUp className="w-5 h-5 animate-pulse" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BackToTop;
