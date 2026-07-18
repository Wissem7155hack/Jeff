import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { blogPosts } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Insights for Aesthetic Practice Growth",
  description: "Explore practical Nexcore guides to patient loyalty, aesthetic practice memberships, treatment ecommerce, mobile engagement, and growth reporting.",
  alternates: { canonical: "/resources/blog" },
};

export default function BlogIndexPage() {
  const [featured, ...posts] = blogPosts;
  const categories = [...new Set(blogPosts.map((post) => post.category))];
  return (
    <main id="main-content">
      <section className="resource-hero section-dark"><div className="resource-orb" /><div className="section-container"><span className="eyebrow eyebrow-light">Nexcore insights</span><h1>Better ideas for a more connected practice.</h1><p>Practical guides to patient loyalty, memberships, mobile commerce, engagement, and the metrics behind sustainable growth.</p><div className="resource-categories"><span>Explore:</span>{categories.map((category) => <a href={`#${category.toLowerCase().replaceAll(" ", "-")}`} key={category}>{category}</a>)}</div></div></section>

      <section className="featured-article section-light"><div className="section-container"><article><Link href={`/resources/blog/${featured.slug}`} className="featured-article-image"><Image src={featured.image} alt={featured.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 55vw" /></Link><div className="featured-article-copy"><span className="eyebrow eyebrow-pink">Featured · {featured.category}</span><h2><Link href={`/resources/blog/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><div className="article-details"><span>{featured.date}</span><span><Clock3 size={14} /> {featured.readTime}</span></div><Link className="button button-dark" href={`/resources/blog/${featured.slug}`}>Read the guide <ArrowRight size={16} /></Link></div></article></div></section>

      <section className="all-insights section-soft"><div className="section-container"><div className="split-heading"><div><span className="eyebrow eyebrow-pink">Latest resources</span><h2>Built for the work behind great patient experiences.</h2></div><p>Use these frameworks to review your patient journey, clarify the value you offer, and improve the way your practice stays connected.</p></div><div className="blog-index-grid">{posts.map((post) => <article id={post.category.toLowerCase().replaceAll(" ", "-")} key={post.slug}><Link href={`/resources/blog/${post.slug}`} className="blog-card-image"><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 720px) 100vw, 33vw" /></Link><div className="article-meta"><span>{post.category}</span><span>{post.readTime}</span></div><h2><Link href={`/resources/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="text-link" href={`/resources/blog/${post.slug}`}>Read article <span>↗</span></Link></article>)}</div></div></section>

      <section className="simple-cta section-pink"><div className="section-container"><span className="eyebrow eyebrow-light">See the platform</span><h2>Turn these ideas into a branded patient experience.</h2><p>Explore Nexcore’s mobile app and owner dashboard in a walkthrough shaped around your practice.</p><Link className="button button-white" href="/book-demo">Book a demo <ArrowRight size={17} /></Link></div></section>
    </main>
  );
}
