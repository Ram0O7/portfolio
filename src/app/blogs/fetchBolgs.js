import config, { getSanityClient } from "@/config/sanity-config";
import { groq } from "next-sanity";

// Helper to get fresh content (server-side) or cached content (client-side)
function getClientConfig(isFresh = false) {
  // Use CDN (cached) by default unless explicitly requesting fresh content
  return { useCdn: !isFresh };
}

export async function getBlogs(isFresh = false) {
  //feching blogs from sanity io using groq query
  try {
    const client = getSanityClient(getClientConfig(isFresh));
    const blogs = await client.fetch(
      groq`*[_type == "blog" && !(_id in path("drafts.**"))]{
        _id,
        _createdAt,
        title,
        description,
        tags,
        "slug": slug.current,
        "image": image.asset->url,
        "alt": image.alt,
        "metadata":image.metadata,
      }`
    );
    return blogs;
  } catch (error) {
    console.error("Failed to fetch blogs from Sanity:", error.message || error);
    return [];
  }
}
export async function getProjects(isFresh = false) {
  //feching projects from sanity io using groq query
  try {
    const client = getSanityClient(getClientConfig(isFresh));
    const projects = await client.fetch(
      groq`*[_type == "project" && !(_id in path("drafts.**"))]{
          _id,
          name,
          img,
          tags,
          repo,
          website,
        }`
    );
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects from Sanity:", error.message || error);
    return [];
  }
}

export async function getBlog(slug, isFresh = false) {
  //feching single blog from sanity which matchess the slug passed through param
  try {
    const client = getSanityClient(getClientConfig(isFresh));
    const blog = await client.fetch(
      groq`*[_type == "blog" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        description,
        tags,
        "slug": slug.current,
        "image": image.asset->url,
        "alt": image.alt,
        "metadata":image.metadata,
        content,
      }`,
      { slug }
    );
    return blog;
  } catch (error) {
    console.error(`Failed to fetch blog for slug=${slug} from Sanity:`, error.message || error);
    return null;
  }
}
