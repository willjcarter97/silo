import * as prismic from "@prismicio/client";

// Your Prismic repository name
const repositoryName = "silosite";

/**
 * Environment Detection
 * - Production (Netlify): VITE_ENV=production - fetches only published content
 * - Staging (Vercel/Dev): fetches draft + published content for previewing
 */
const isProduction = import.meta.env.VITE_ENV === "production";

// The Prismic client
export const client = prismic.createClient(repositoryName, {
  // Add access token if your repository requires it
  // accessToken: import.meta.env.VITE_PRISMIC_ACCESS_TOKEN,
  
  // Default options for all queries
  defaultParams: {
    // In staging/dev, we can see draft content
    // In production, this has no effect (published is default)
    ...(isProduction ? {} : {}),
  },
});

/**
 * Preview client for fetching draft content explicitly
 * Use this when you need to see unpublished changes in staging
 */
export const previewClient = prismic.createClient(repositoryName, {
  // accessToken: import.meta.env.VITE_PRISMIC_ACCESS_TOKEN,
});








