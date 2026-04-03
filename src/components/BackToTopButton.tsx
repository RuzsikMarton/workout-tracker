"use client";

import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const toggleVisibility = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(window.scrollY > 400);
      }, 100);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      aria-label="Return to top"
      title="Return to top"
      className={cn(
        "fixed bottom-6 right-6 rounded-full bg-brand-primary p-3 text-white shadow-lg transition-all duration-300 hover:bg-brand-hover cursor-pointer z-50",
        isVisible
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none translate-y-4",
      )}
      onClick={scrollToTop}
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
};

export default BackToTopButton;
