const published =
  '_type in ["blog", "post"] && !(_id in path("drafts.**")) && defined(slug.current)';
const fields = `_id, _type, _createdAt, _updatedAt, title,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "description": coalesce(description, pt::text(body)[0..200], ""),
  "tags": coalesce(tags, categories[]->title, []),
  "slug": slug.current,
  "image": coalesce(image.asset->url, mainImage.asset->url),
  "alt": coalesce(image.alt, mainImage.alt, title),
  "metadata": image.metadata,
  "content": coalesce(content, body, []),
  "author": coalesce(author->name, "Ramkrishn Rai")`;

export const blogsQuery = `*[${published}] | order(coalesce(publishedAt, _createdAt) desc) {${fields}}`;
export const blogQuery = `*[${published} && slug.current == $slug][0] {${fields}}`;
export const projectsQuery = `*[_type == "project" && !(_id in path("drafts.**"))] | order(coalesce(featured, false) desc, coalesce(order, 999) asc, _createdAt desc) { _id, name, description, "img": coalesce(image.asset->url, img), "tags": coalesce(tags, []), repo, website }`;
