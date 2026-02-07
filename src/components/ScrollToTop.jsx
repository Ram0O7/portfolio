"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useThemeContext } from "@/context/ThemeContext";

export default function ScrollToTop() {
  const { theme } = useThemeContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-${theme}-accent text-white hover:bg-${theme}-secondary-accent transition-all duration-300 shadow-lg hover:shadow-xl z-40`}
      aria-label="Scroll to top"
      title="Go to top"
    >
      <FaArrowUp className="text-xl" />
    </button>
  );
}
