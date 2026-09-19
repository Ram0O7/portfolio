import { defineType } from "sanity";
import { imageFields, slugField } from "./shared";
export const postType = defineType({
  name: "post",
  title: "Other post",
  type: "document",
  initialValue: () => ({ publishedAt: new Date().toISOString() }),
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    slugField,
    {
      name: "description",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(300),
    },
    { name: "author", type: "reference", to: [{ type: "author" }] },
    {
      name: "mainImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: imageFields,
    },
    {
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    },
    {
      name: "publishedAt",
      title: "Display date",
      type: "datetime",
      description: "Displayed date only. Click Publish to make a post public.",
    },
    {
      name: "body",
      title: "Article",
      type: "blockContent",
      validation: (rule) => rule.required().min(1),
    },
  ],
  preview: { select: { title: "title", media: "mainImage" } },
});
