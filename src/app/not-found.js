"use client";
import Link from "next/link";
import { useThemeContext } from "@/context/ThemeContext";
import { FaSadCry } from "react-icons/fa";

export default function NotFound() {
  const { theme } = useThemeContext();

  return (
    <div
      className={`flex flex-col items-center justify-center gap-8 py-24 text-center min-h-[70vh]`}
    >
      <div>
        <div className="text-8xl font-bold mb-4">404</div>
        <h2 className={`text-3xl font-bold text-${theme}-txt/70 mb-2`}>
          Oops! Page Not Found
        </h2>
        <p className={`text-lg text-${theme}-txt/50 max-w-md mx-auto`}>
          The page you're looking for doesn't exist. Let me take you back home.
        </p>
      </div>

      <FaSadCry className="text-6xl" />

      <Link
        href="/"
        className={`btn after:bg-${theme}-secondary-accent relative uppercase tracking-widest pb-1`}
      >
        Go Home
      </Link>
    </div>
  );
}
