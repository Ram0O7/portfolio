import { baseURL } from "../../config";
import { getBlogs } from "./blogs/fetchBolgs";
export default async function sitemap() {
  //get all blogs and get their urls
  const blogs = await getBlogs(true);
  const blogUrls =
    blogs.map((blog) => {
      return {
        url: `${baseURL}/blogs/${blog.slug}`,
        lastModified: blog._createdAt,
      };
    }) ?? [];

  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
