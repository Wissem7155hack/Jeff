import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronRight, Clock, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/site-data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/resources/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "Nexcore" },
    publisher: { "@type": "Organization", name: "Nexcore LLC", url: "https://nexcore-app.com" },
    datePublished: post.date,
    image: post.image,
  };

  return (
    <main id="main-content">
      <section className="article-hero section-light">
        <div className="section-container article-hero-inner">
          <div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={13} /><Link href="/resources/blog">Insights</Link><ChevronRight size={13} /><span>{post.category}</span></div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="article-byline"><span><Calendar size={13} /> {post.date}</span><i /><span><Clock size={13} /> {post.readTime}</span><i /><span>By {post.author}</span></div>
        </div>
      </section>

      <section className="article-cover section-light">
        <div className="section-container"><div className="article-cover-image"><Image src={post.image} alt={post.imageAlt} fill sizes="100vw" priority /></div></div>
      </section>

      <section className="article-body-section section-light">
        <div className="section-container article-layout">
          <aside className="article-toc">
            <span>In this article</span>
            <nav>{post.sections.map((s, i) => <a href={`#${s.id}`} key={s.id}><i>0{i + 1}</i> {s.heading}</a>)}</nav>
            <Link href="/book-demo">Book a demo <span>↗</span></Link>
          </aside>
          <article className="article-body">
            <p className="article-intro">{post.intro}</p>
            {post.sections.map((s, i) => (
              <section id={s.id} key={s.id}>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
                {s.bullets && <ul>{s.bullets.map((b) => <li key={b}><Check size={16} />{b}</li>)}</ul>}

                {/* Mid-article CTA after every 2nd section */}
                {i === 1 && (
                  <div className="article-mid-cta">
                    <Sparkles size={18} />
                    <div>
                      <strong>See how Nexcore makes this easy</strong>
                      <p>Book a 15-minute demo tailored to your practice type.</p>
                    </div>
                    <Link href="/book-demo" className="button button-pink button-small">Book demo <ArrowRight size={14} /></Link>
                  </div>
                )}
              </section>
            ))}
            <div className="article-callout">
              <span>Nexcore platform</span>
              <h2>See these ideas working inside Nexcore.</h2>
              <p>Book a tailored product demo and explore the branded patient app and owner dashboard for your practice.</p>
              <Link className="button button-pink" href="/book-demo" style={{ marginTop: 18 }}>Book your demo <ArrowRight size={16} /></Link>
            </div>
            <Link href="/resources/blog" className="back-to-insights"><ArrowLeft size={15} /> Back to all insights</Link>
          </article>
        </div>
      </section>

      <section className="related-reading section-soft">
        <div className="section-container">
          <div className="center-heading"><span className="eyebrow eyebrow-pink">Keep reading</span><h2>Related insights.</h2></div>
          <div className="related-grid">
            {related.map((r) => (
              <article key={r.slug}>
                <Link className="related-image" href={`/resources/blog/${r.slug}`}><Image src={r.image} alt={r.imageAlt} fill sizes="(max-width: 800px) 100vw, 33vw" /></Link>
                <span>{r.category}</span>
                <h3><Link href={`/resources/blog/${r.slug}`}>{r.title}</Link></h3>
                <Link className="text-link" href={`/resources/blog/${r.slug}`}>Read insight <span>↗</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="simple-cta section-pink">
        <div className="section-container">
          <span className="eyebrow eyebrow-light">Ready to grow?</span>
          <h2>See how Nexcore works for your practice.</h2>
          <p>Book a personalized demo and explore the features that matter most to your clinic.</p>
          <Link className="button button-white" href="/book-demo">Book your demo <ArrowRight size={17} /></Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}
