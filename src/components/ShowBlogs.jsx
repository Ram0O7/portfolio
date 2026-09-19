"use client";
import Link from "next/link";
import { useState } from "react";
import { formatDate, readingMinutes } from "@/lib/blog-utils";
export function ArticleRow({ blog }) {
  return (
    <Link href={"/blogs/" + blog.slug} className="article-row">
      <div className="article-meta">
        <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
        <span>{readingMinutes(blog.content || blog.description)} min read</span>
      </div>
      <div>
        <span className="article-category">{blog.tags?.[0] || "Notes"}</span>
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
      </div>
      <span className="article-arrow" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}
export default function ShowBlogs({ blogs }) {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const topics = [
    "All",
    ...Array.from(
      new Set(
        blogs
          .flatMap((blog) => blog.tags || [])
          .map((tag) => tag.toLowerCase()),
      ),
    ).slice(0, 6),
  ];
  const filtered = blogs.filter(
    (blog) =>
      (topic === "All" ||
        blog.tags?.some((tag) => tag.toLowerCase() === topic)) &&
      [blog.title, blog.description, ...(blog.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  return (
    <>
      <div className="blog-toolbar">
        <div className="filter-list" aria-label="Filter articles by topic">
          {topics.map((item) => (
            <button
              key={item}
              aria-pressed={topic === item}
              onClick={() => setTopic(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        <label>
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            className="search-input"
            value={search}
            placeholder="Search articles…"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <p className="results-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {search && " found"}
      </p>
      <div className="article-list">
        {filtered.map((blog) => (
          <ArticleRow blog={blog} key={blog._id} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <p>
            {blogs.length
              ? "No articles match your search."
              : "New notes are on the way. Check back soon."}
          </p>
          {blogs.length > 0 && (
            <button
              className="text-link"
              onClick={() => {
                setSearch("");
                setTopic("All");
              }}
            >
              Clear filters ↗
            </button>
          )}
        </div>
      )}
    </>
  );
}
