import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/site-data";

export const metadata: Metadata = { title: "Insights", description: "Practical ideas for growing your aesthetic or wellness practice with mobile rewards, treatment ecommerce, memberships, and patient engagement.", alternates: { canonical: "/resources/blog" } };

export default function BlogIndexPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);
  return (
    <main id="main-content">
      <section className="resource-hero section-dark">
        <div className="resource-orb" />
        <div className="section-container">
          <span className="eyebrow eyebrow-light">Nexcore insights</span>
          <h1>Practical ideas for patient growth.</h1>
          <p>Explore guides, frameworks, and strategies for aesthetic and wellness practices using mobile rewards, ecommerce, memberships, and patient engagement.</p>
        </div>
      </section>

      <section className="featured-article section-light">
        <div className="section-container">
          <article>
            <Link className="featured-article-image" href={`/resources/blog/${featured.slug}`}><Image src={featured.image} alt={featured.imageAlt} fill sizes="(max-width: 900px) 100vw, 55vw" /></Link>
            <div className="featured-article-copy">
              <div className="article-details"><span><Calendar size={13} /> {featured.date}</span><span><Clock size={13} /> {featured.readTime}</span></div>
              <div className="article-meta"><span>{featured.category}</span></div>
              <h2><Link href={`/resources/blog/${featured.slug}`}>{featured.title}</Link></h2>
              <p>{featured.excerpt}</p>
              <Link className="text-link" href={`/resources/blog/${featured.slug}`}>Read insight <span>↗</span></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="all-insights section-soft">
        <div className="section-container">
          <div className="center-heading"><span className="eyebrow eyebrow-pink">All insights</span><h2>Browse every article.</h2></div>
          <div className="blog-index-grid">
            {rest.map((post) => (
              <article key={post.slug}>
                <Link className="blog-card-image" href={`/resources/blog/${post.slug}`}><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 800px) 100vw, 50vw" /></Link>
                <div className="article-meta" style={{ marginTop: 19 }}><span>{post.category}</span><span>{post.readTime}</span></div>
                <h2><Link href={`/resources/blog/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.excerpt}</p>
                <Link className="text-link" href={`/resources/blog/${post.slug}`}>Read insight <span>↗</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="simple-cta section-pink"><div className="section-container"><span className="eyebrow eyebrow-light">Put insights into action</span><h2>See how Nexcore brings these ideas to life.</h2><p>Book a tailored product demo and explore the patient app and owner dashboard.</p><Link className="button button-white" href="/book-demo">Book your demo <ArrowRight size={17} /></Link></div></section>
    </main>
  );
}
