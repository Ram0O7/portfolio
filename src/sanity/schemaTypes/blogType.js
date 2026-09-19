import { defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import { imageFields, slugField } from "./shared";
export const blogType = defineType({
  name: "blog",
  title: "Blog article",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "writing", title: "Write", default: true },
    { name: "details", title: "Details" },
  ],
  initialValue: () => ({ publishedAt: new Date().toISOString() }),
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "writing",
      validation: (rule) => rule.required().max(150),
    },
    { ...slugField, group: "writing" },
    {
      name: "description",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "writing",
      description:
        "A short introduction shown in the article list and search results.",
      validation: (rule) => rule.required().max(300),
    },
    {
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: imageFields,
      group: "writing",
    },
    {
      name: "content",
      title: "Article",
      type: "blockContent",
      group: "writing",
      validation: (rule) => rule.required().min(1),
    },
    {
      name: "tags",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "details",
    },
    {
      name: "publishedAt",
      title: "Display date",
      type: "datetime",
      group: "details",
      description:
        "The date shown to readers. This does not schedule publishing; use Publish when ready.",
    },
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
});
