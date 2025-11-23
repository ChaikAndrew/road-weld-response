"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

/**
 * ScrollToTopButton Component
 * Floating button to scroll to top of the page
 */

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={scrollToTop}
        className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-white hover:opacity-80 transition-opacity duration-300 ease-in-out"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-warning-yellow transition-colors" strokeWidth={2.5} />
      </button>
    </div>
  );
}

