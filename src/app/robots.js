import { siteUrl } from "@/config/site";
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/studio", "/api/"],
    },
    sitemap: siteUrl + "/sitemap.xml",
  };
}
