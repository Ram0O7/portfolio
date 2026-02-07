import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";
import { Roboto_Condensed } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProvider from "@/context/AuthProvider";
import { baseURL } from "../../config";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || baseURL),
  title: {
    default: "Ramkrishn Rai",
    template: `%s | Ramkrishn Rai`,
  },
  description:
    "I'm a passionate student and a programmer based in India. With a keen eye for design and a love for coding, I am a dedicated web developer with passion for contributing to the growth of evolving tech industry with as much little knowledge i have. Beyond the screen, I immerses in the world of sci-fi through movies and web series, finding inspiration for my creative endeavors. When not crafting incredible websites, you'll find me delving into programming and computer science discussions. My journey is all about blending the art of web development with the precision of programming, a perfect fusion for a successful future in the tech realm. 🚀💻 #WebDev #TechEnthusiast #SciFiLover",
  verification: {
    google: "9Z0foBGZB3OxNJrDIYn6fLZqGyfUVNLQwQGn1HW5z-Y",
  },
  icons: {
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

const socials = [
  {
    name: "linkedIn",
    url: "https://www.linkedin.com/in/ramkrishn-rai-b06727230/",
    icon: <FaLinkedin />,
    style: "hover:text-blue-500",
  },
  {
    name: "github",
    url: "https://github.com/Ram0O7",
    icon: <FaGithub />,
    style: "hover:text-gray-700",
  },
  {
    name: "whatsapp",
    url: "https://wa.me/916387514709",
    icon: <FaWhatsapp />,
    style: "hover:text-green-600",
  },
  {
    name: "instagram",
    url: "https://instagram.com/ram20krishn?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D",
    icon: <FaInstagram />,
    style: "hover:text-pink-600",
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto_condensed.className}>
      <ThemeProvider>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <ScrollToTop />
          <Footer socials={socials} />
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
