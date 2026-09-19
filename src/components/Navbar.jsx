"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="wordmark"
          onClick={() => setOpen(false)}
          aria-label="Ramkrishn Rai, home"
        >
          <span className="monogram">r.</span>
          <span>
            Ramkrishn Rai<span className="wordmark-dot">.</span>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "navigation is-open" : "navigation"}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <Link href="/#work" onClick={() => setOpen(false)}>
            Work
          </Link>
          <Link href="/#about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link
            href="/blogs"
            aria-current={pathname.startsWith("/blogs") ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Writing
          </Link>
          <Link
            className="nav-contact"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
