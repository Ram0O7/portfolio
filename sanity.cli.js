import { defineCliConfig } from "sanity/cli";
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "w7bwp0ru",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
