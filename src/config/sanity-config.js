import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";
const baseConfig = { projectId, dataset, apiVersion };
export function getSanityClient({ useCdn = false } = {}) {
  return createClient({
    ...baseConfig,
    useCdn,
    perspective: "published",
    timeout: 10000,
    maxRetries: 1,
  });
}
export default baseConfig;
