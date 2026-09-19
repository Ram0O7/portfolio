import { apiVersion } from "../env";
export async function isUniqueArticleSlug(slug, context) {
  const id = context.document._id.replace(/^drafts\./, "");
  return context
    .getClient({ apiVersion })
    .fetch(
      '!defined(*[_type in ["blog", "post"] && slug.current == $slug && !(_id in [$id, $draft])][0]._id)',
      { slug, id, draft: "drafts." + id },
    );
}
export const imageFields = [
  {
    name: "alt",
    title: "Alternative text",
    type: "string",
    description: "Describe the image for readers who cannot see it.",
    validation: (rule) => rule.required(),
  },
  { name: "caption", title: "Caption", type: "string" },
  {
    name: "metadata",
    title: "Photo attribution",
    type: "array",
    of: [{ type: "string" }],
    description:
      "Existing credit format: photographer, photographer URL, source, source URL.",
  },
];
export const slugField = {
  name: "slug",
  title: "Article URL",
  type: "slug",
  description:
    "Click Generate after entering a title. Keep this unchanged after publishing to preserve existing links.",
  options: { source: "title", maxLength: 96, isUnique: isUniqueArticleSlug },
  validation: (rule) => rule.required(),
};
