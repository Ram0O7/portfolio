import "./globals.css";
import "./portfolio.css";
import SiteShell from "@/components/SiteShell";
import { siteUrl } from "@/config/site";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ramkrishn Rai — Web developer",
    template: "%s | Ramkrishn Rai",
  },
  description:
    "Web developer based in Kolkata, India. Thoughtful web experiences, selected projects, and notes on programming.",
  verification: { google: "9Z0foBGZB3OxNJrDIYn6fLZqGyfUVNLQwQGn1HW5z-Y" },
  icons: { icon: "/favicon-32x32.png", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
