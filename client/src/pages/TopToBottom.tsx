import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

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
      {/* Right Side Progress bar (kept but hidden by default) */}
      <div />

      {/* Compact Back to Top Button */}
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={scrollToTop}
            className="w-10 h-10 p-2 rounded-full flex items-center justify-center shadow-md transition-transform duration-200"
            style={{ backgroundColor: "var(--color-accent)", color: "var(--color-accent-foreground)" }}
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BackToTop;
