import type { MetadataRoute } from "next";
import { blogPosts, industries } from "@/lib/site-data";

const base = "https://nexcore-app.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/product`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/book-demo`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/resources/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/resources/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const solutionSlugs = ["ecommerce", "mobile-rewards", "memberships", "patient-engagement", "patient-financing", "business-intelligence"];
  const solutionPages: MetadataRoute.Sitemap = solutionSlugs.map((slug) => ({
    url: `${base}/solutions/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const industryPages: MetadataRoute.Sitemap = Object.keys(industries).map((slug) => ({
    url: `${base}/who-we-serve/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/resources/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...solutionPages, ...industryPages, ...blogPages];
}
