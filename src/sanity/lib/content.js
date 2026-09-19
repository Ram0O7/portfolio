import { cache } from "react";
import { getSanityClient } from "@/config/sanity-config";
import { blogsQuery, blogQuery, projectsQuery } from "@/sanity/lib/queries";
const client = getSanityClient();
const options = { next: { revalidate: 60, tags: ["sanity-content"] } };
export const getBlogs = cache(async () =>
  client.fetch(blogsQuery, {}, options),
);
export const getBlog = cache(async (slug) =>
  client.fetch(blogQuery, { slug }, options),
);
export const getProjects = cache(async () =>
  client.fetch(projectsQuery, {}, options),
);
