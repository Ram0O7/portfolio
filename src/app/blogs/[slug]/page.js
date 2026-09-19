import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogs, getBlog } from "@/sanity/lib/content";
import config from "@/config/sanity-config";
import { formatDate, readingMinutes, safeUrl } from "@/lib/blog-utils";
import CodeBlock from "@/components/CodeBlock";
export const revalidate = 60;
export const dynamicParams = true;
const builder = imageUrlBuilder(config);
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Article not found" };
  return {
    title: blog.title,
    description: blog.description,
    alternates: { canonical: "/blogs/" + slug },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.description,
      publishedTime: blog.publishedAt,
      modifiedTime: blog._updatedAt,
    },
  };
}
export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}
function Attribution({ metadata }) {
  if (!Array.isArray(metadata) || !metadata[0]) return null;
  return (
    <figcaption>
      Photo by <a href={safeUrl(metadata[1])}>{metadata[0]}</a>
      {metadata[2] && (
        <>
          {" "}
          on <a href={safeUrl(metadata[3])}>{metadata[2]}</a>
        </>
      )}
    </figcaption>
  );
}
const components = {
  types: {
    code: ({ value }) => <CodeBlock value={value} />,
    image: ({ value }) =>
      value.asset ? (
        <figure>
          <img
            src={builder.image(value).width(1200).auto("format").url()}
            alt={value.alt || ""}
            loading="lazy"
          />
          <Attribution metadata={value.metadata} />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
  block: { h1: ({ children }) => <h2>{children}</h2> },
  marks: {
    link: ({ value, children }) => (
      <a href={safeUrl(value?.href)}>{children}</a>
    ),
  },
};
export default async function Page({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();
  return (
    <article className="article-container">
      <Link href="/blogs" className="back-link">
        ← Back to writing
      </Link>
      <header className="article-header">
        <p className="eyebrow">{(blog.tags || []).join(" / ") || "NOTES"}</p>
        <h1>{blog.title}</h1>
        <p className="article-deck">{blog.description}</p>
        <div className="article-byline">
          <span>By {blog.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={blog.publishedAt}>
            {formatDate(blog.publishedAt)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(blog.content)} min read</span>
        </div>
      </header>
      {blog.image && (
        <figure className="article-cover">
          <img
            src={blog.image}
            alt={blog.alt || ""}
            width="1200"
            height="675"
          />
          <Attribution metadata={blog.metadata} />
        </figure>
      )}
      <div className="article-body">
        <PortableText value={blog.content} components={components} />
      </div>
      <div className="article-end">
        <div>
          <p>Thanks for reading.</p>
          <a
            className="text-link"
            href={
              "mailto:ram706860@gmail.com?subject=" +
              encodeURIComponent("Re: " + blog.title)
            }
          >
            Continue the conversation ↗
          </a>
        </div>
        <Link className="text-link" href="/blogs">
          More writing →
        </Link>
      </div>
    </article>
  );
}
