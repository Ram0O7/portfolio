import { defineType } from "sanity";
import { imageFields } from "./shared";
export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Project name",
      type: "string",
      validation: (rule) => rule.required(),
    },
    { name: "description", title: "Short description", type: "text", rows: 3 },
    {
      name: "image",
      title: "Screenshot",
      type: "image",
      options: { hotspot: true },
      fields: imageFields,
    },
    {
      name: "img",
      title: "Existing image URL",
      type: "url",
      description:
        "Preserves existing project screenshots. Upload a screenshot above to replace it.",
      validation: (rule) => rule.uri({ scheme: ["https", "http"] }),
    },
    {
      name: "tags",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "website",
      title: "Live website",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https", "http"] }),
    },
    {
      name: "repo",
      title: "Source code",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https", "http"] }),
    },
    {
      name: "featured",
      title: "Featured project",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "order",
      title: "Display order",
      type: "number",
      description:
        "Lower numbers appear first, within the featured or unfeatured group.",
      validation: (rule) => rule.integer().min(0),
    },
  ],
  preview: { select: { title: "name", media: "image" } },
});
