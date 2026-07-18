import type { MetadataRoute } from "next";
import { blogPosts, industries, solutions } from "@/lib/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wissem7155hack.github.io/Jeff";
  const now = new Date();
  const fixed = ["", "/product", "/about", "/contact", "/book-demo", "/resources/blog", "/resources/guides", "/privacy", "/terms"];
  return [
    ...fixed.map((path) => ({ url: `${base}${path}`, lastModified: now, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : path === "/product" ? 0.9 : 0.7 })),
    ...Object.keys(solutions).map((slug) => ({ url: `${base}/solutions/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...Object.keys(industries).map((slug) => ({ url: `${base}/who-we-serve/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...blogPosts.map((post) => ({ url: `${base}/resources/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
