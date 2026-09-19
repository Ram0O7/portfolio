import { siteUrl } from "@/config/site";
import { getBlogs } from "@/sanity/lib/content";
export const revalidate = 60;
export default async function sitemap() {
  const origin = siteUrl;
  const blogs = await getBlogs();
  return [
    { url: origin },
    { url: origin + "/blogs" },
    ...blogs.map((blog) => ({
      url: origin + "/blogs/" + blog.slug,
      lastModified: blog._updatedAt || blog._createdAt,
    })),
  ];
}
