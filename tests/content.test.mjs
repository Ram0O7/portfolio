import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse, evaluate } from "groq-js";

// Import pure application modules without changing the Next.js package module type.
async function moduleAt(path) {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  return import(
    "data:text/javascript;base64," + Buffer.from(source).toString("base64")
  );
}
const { blogsQuery, blogQuery, projectsQuery } = await moduleAt(
  "../src/sanity/lib/queries.js",
);
const { readingMinutes, safeUrl } = await moduleAt("../src/lib/blog-utils.js");
const block = {
  _type: "block",
  children: [{ _type: "span", text: "A useful article." }],
};
const dataset = [
  {
    _id: "old",
    _type: "blog",
    _createdAt: "2023-01-01T00:00:00Z",
    title: "Existing article",
    slug: { current: "existing" },
    content: [block],
    description: "Original summary",
    tags: ["React"],
  },
  {
    _id: "new",
    _type: "post",
    _createdAt: "2024-01-01T00:00:00Z",
    title: "Starter post",
    slug: { current: "new" },
    body: [block],
    publishedAt: "2025-01-01T00:00:00Z",
    categories: [{ _ref: "category" }],
  },
  { _id: "category", _type: "category", title: "Programming" },
  {
    _id: "drafts.old",
    _type: "blog",
    title: "Private changes",
    slug: { current: "existing" },
  },
  {
    _id: "drafts.private",
    _type: "post",
    title: "Private article",
    slug: { current: "private" },
  },
  { _id: "unfinished", _type: "blog", title: "No slug" },
];
async function query(source, data = dataset, params = {}) {
  return (await evaluate(parse(source), { dataset: data, params })).get();
}
test("both article schemas render while drafts and missing slugs stay private", async () => {
  const articles = await query(blogsQuery);
  assert.deepEqual(
    articles.map((article) => article._id),
    ["new", "old"],
  );
  assert.deepEqual(articles[0].content, [block]);
  assert.deepEqual(articles[0].tags, ["Programming"]);
  assert.equal(articles[1].description, "Original summary");
  assert.equal(articles[1].publishedAt, "2023-01-01T00:00:00Z");
});
test("single article lookup never returns a draft, and missing slugs return null", async () => {
  assert.equal(
    (await query(blogQuery, dataset, { slug: "existing" })).title,
    "Existing article",
  );
  assert.equal(await query(blogQuery, dataset, { slug: "private" }), null);
  assert.equal(await query(blogQuery, dataset, { slug: "missing" }), null);
});
test("project ordering prioritizes featured work and keeps legacy image URLs", async () => {
  const projects = await query(projectsQuery, [
    {
      _id: "normal",
      _type: "project",
      order: 0,
      img: "https://example.com/old.jpg",
    },
    { _id: "featured2", _type: "project", featured: true, order: 2 },
    { _id: "featured1", _type: "project", featured: true, order: 1 },
    { _id: "drafts.hidden", _type: "project", featured: true, order: 0 },
  ]);
  assert.deepEqual(
    projects.map((project) => project._id),
    ["featured1", "featured2", "normal"],
  );
  assert.equal(projects[2].img, "https://example.com/old.jpg");
});
test("reading time handles Portable Text and content links reject script URLs", () => {
  assert.equal(readingMinutes([block]), 1);
  assert.equal(
    readingMinutes([
      { _type: "block", children: [{ text: "word ".repeat(441) }] },
    ]),
    3,
  );
  assert.equal(readingMinutes(null), 1);
  assert.equal(safeUrl("javascript:alert(1)"), undefined);
  assert.equal(safeUrl("//untrusted.example"), undefined);
  assert.equal(safeUrl("https://example.com"), "https://example.com");
});
