import Link from "next/link";
import Hero from "@/components/Hero";
import Skill from "@/components/Skill";
import Project from "@/components/Project";
import Contact from "@/components/Contact";
import { ArticleRow } from "@/components/ShowBlogs";
import { getBlogs, getProjects } from "@/sanity/lib/content";
export const revalidate = 60;
export default async function Home() {
  const [projectResult, blogResult] = await Promise.allSettled([
    getProjects(),
    getBlogs(),
  ]);
  const projects =
    projectResult.status === "fulfilled" ? projectResult.value : [];
  const blogs = blogResult.status === "fulfilled" ? blogResult.value : [];
  return (
    <>
      <Hero />
      <Project
        projects={projects}
        unavailable={projectResult.status === "rejected"}
      />
      <Skill />
      <section
        className="writing-section container section-space"
        aria-labelledby="writing-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / NOTES FROM THE JOURNEY</p>
            <h2 id="writing-title">Thinking out loud.</h2>
          </div>
          <Link href="/blogs" className="text-link">
            All writing <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="article-list">
          {blogs.slice(0, 3).map((blog) => (
            <ArticleRow key={blog._id} blog={blog} />
          ))}
        </div>
        {!blogs.length && (
          <p className="empty-state">
            {blogResult.status === "rejected"
              ? "Writing is temporarily unavailable. Please check back shortly."
              : "New notes are on the way. Check back soon."}
          </p>
        )}
      </section>
      <Contact />
    </>
  );
}
