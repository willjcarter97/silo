import * as prismic from "@prismicio/client";

// Your Prismic repository name
export const repositoryName = "silosite";

// Create the Prismic client
export const client = prismic.createClient(repositoryName, {
  // If you have a private API, add your access token here:
  // accessToken: import.meta.env.VITE_PRISMIC_ACCESS_TOKEN,
});

