import ShowBlogs from "@/components/ShowBlogs";
import { getBlogs } from "./fetchBolgs";

export const metadata = {
  title: "Blog",
  description:
    "Rk's blog page, where you can find blogs about various interesting progrmming stuffs.",
};

export default async function Blog() {
  const blogs = await getBlogs(true);
  return <ShowBlogs blogs={blogs} />;
}
