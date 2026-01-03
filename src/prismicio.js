import * as prismic from "@prismicio/client";

// Your Prismic repository name
const repositoryName = "silosite";

// The Prismic client
export const client = prismic.createClient(repositoryName, {
  // Add access token if your repository requires it
  // accessToken: process.env.PRISMIC_ACCESS_TOKEN,
});





