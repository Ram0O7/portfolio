"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function SiteShell({ children }) {
  const pathname = usePathname();
  if (pathname === "/studio" || pathname.startsWith("/studio/"))
    return <div className="studio-shell">{children}</div>;
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="site-main">
        {children}
      </main>
      <Footer />
    </>
  );
}
