import ShowBlogs from "@/components/ShowBlogs";
import { getBlogs } from "@/sanity/lib/content";
export const revalidate = 60;
export const metadata = {
  title: "Writing",
  description:
    "Notes on web development, programming, and the things I learn along the way.",
};
export default async function Blog() {
  const blogs = await getBlogs();
  return (
    <div className="container blog-page">
      <div className="page-intro">
        <p className="eyebrow">THE NOTEBOOK</p>
        <h1>Thinking out loud.</h1>
        <p>
          Notes on building for the web, learning to code, and staying curious.
          A few things I’ve figured out along the way.
        </p>
      </div>
      <ShowBlogs blogs={blogs} />
    </div>
  );
}
