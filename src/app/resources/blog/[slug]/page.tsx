import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock3 } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/resources/blog/${slug}` }, openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: new Date(post.date).toISOString(), images: [{ url: post.image, alt: post.imageAlt }] } };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = blogPosts.filter((item) => item.slug !== slug).slice(0, 3);
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.excerpt, datePublished: new Date(post.date).toISOString(), dateModified: new Date(post.date).toISOString(), image: post.image, author: { "@type": "Organization", name: "Nexcore" }, publisher: { "@type": "Organization", name: "Nexcore" }, mainEntityOfPage: `https://nexcore-app.com/resources/blog/${post.slug}` };
  const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <main id="main-content">
      <article>
        <header className="article-hero section-light"><div className="section-container article-hero-inner"><div className="breadcrumbs breadcrumbs-dark"><Link href="/">Home</Link><ChevronRight size={13} /><Link href="/resources/blog">Insights</Link><ChevronRight size={13} /><span>{post.category}</span></div><span className="eyebrow eyebrow-pink">{post.category}</span><h1>{post.title}</h1><p>{post.excerpt}</p><div className="article-byline"><span>By Nexcore</span><i /><span>{post.date}</span><i /><span><Clock3 size={14} /> {post.readTime}</span></div></div></header>
        <div className="article-cover section-light"><div className="section-container"><div className="article-cover-image"><Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 1000px) 100vw, 1100px" /></div></div></div>
        <section className="article-body-section section-light"><div className="article-layout section-container"><aside className="article-toc"><span>In this guide</span><nav>{post.sections.map((section, index) => <a href={`#${slugify(section.heading)}`} key={section.heading}><i>0{index + 1}</i>{section.heading}</a>)}</nav><Link href="/book-demo">See Nexcore <span>↗</span></Link></aside><div className="article-body"><p className="article-intro">{post.intro}</p>{post.sections.map((section) => <section id={slugify(section.heading)} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><Check size={16} />{bullet}</li>)}</ul>}</section>)}<div className="article-callout"><span>Put it into practice</span><h2>Bring the patient journey into one branded app.</h2><p>Nexcore connects mobile shopping, rewards, memberships, patient engagement, and an owner dashboard.</p><Link className="button button-white" href="/book-demo">Book a walkthrough <ArrowRight size={16} /></Link></div><Link className="back-to-insights" href="/resources/blog"><ArrowLeft size={16} /> Back to all insights</Link></div></div></section>
      </article>

      <section className="related-reading section-soft"><div className="section-container"><div className="split-heading align-end"><div><span className="eyebrow eyebrow-pink">Keep reading</span><h2>Related Nexcore insights.</h2></div><Link className="text-link" href="/resources/blog">View all insights <span>↗</span></Link></div><div className="related-grid">{related.map((item) => <article key={item.slug}><Link className="related-image" href={`/resources/blog/${item.slug}`}><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 800px) 100vw, 33vw" /></Link><span>{item.category} · {item.readTime}</span><h3><Link href={`/resources/blog/${item.slug}`}>{item.title}</Link></h3><Link className="text-link" href={`/resources/blog/${item.slug}`}>Read article <b>↗</b></Link></article>)}</div></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}
