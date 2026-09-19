"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { ViewPublishedAction } from "./src/sanity/ViewPublishedAction";
export default defineConfig({
  name: "portfolio",
  title: "Ramkrishn Rai · Writing desk",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool({ structure })],
  document: {
    actions: (previous, context) =>
      ["blog", "post"].includes(context.schemaType)
        ? [...previous, ViewPublishedAction]
        : previous,
  },
});
