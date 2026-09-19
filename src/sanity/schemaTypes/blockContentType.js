import { defineType } from "sanity";
import { imageFields } from "./shared";
export const blockContentType = defineType({
  name: "blockContent",
  title: "Article content",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Small heading", value: "h4" },
        { title: "Legacy heading", value: "h1" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Inline code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strikethrough", value: "strike-through" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto"],
                  }),
              },
            ],
          },
        ],
      },
    },
    { type: "image", options: { hotspot: true }, fields: imageFields },
    {
      type: "object",
      name: "code",
      title: "Code block",
      fields: [
        {
          name: "language",
          type: "string",
          title: "Language",
          options: {
            list: [
              "javascript",
              "typescript",
              "jsx",
              "tsx",
              "html",
              "css",
              "json",
              "bash",
              "sh",
              "python",
              "sql",
              "text",
            ],
          },
        },
        { name: "filename", title: "Filename (optional)", type: "string" },
        {
          name: "code",
          type: "text",
          title: "Code",
          rows: 12,
          validation: (rule) => rule.required(),
        },
      ],
      preview: { select: { title: "language", subtitle: "code" } },
    },
  ],
});
