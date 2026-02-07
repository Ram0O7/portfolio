import { createClient } from "next-sanity";

const baseConfig = {
  projectId: "w7bwp0ru",
  dataset: "production",
  apiVersion: "2023-09-14",
};

// Factory that returns a configured Sanity client. Pass { useCdn: false }
// for server-side/pre-render fetches that need fresh content (and token auth).
export function getSanityClient(options = { useCdn: true }) {
  const config = { ...baseConfig, useCdn: options.useCdn };
  
  // Only include token for non-CDN requests (server-side fresh data)
  if (!options.useCdn && process.env.SANITY_API_TOKEN) {
    config.token = process.env.SANITY_API_TOKEN;
  }
  
  return createClient(config);
}

export default baseConfig;
