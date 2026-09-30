import type { Metadata } from "next";
import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { KNOWLEDGE_HUB_ARTICLES } from "@/data/knowledgeHubArticles";
import { DEFAULT_OG_IMAGE, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo/site";

const DESCRIPTION =
  "In-depth guides on Canadian mortgages: the stress test, CMHC insurance, first-time buyer programs, renewals, HELOCs, and self-employed qualification.";

export const metadata: Metadata = {
  title: "Knowledge Hub — Mortgage Articles & Guides | Royal Den Capital",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/knowledge-hub/") },
  openGraph: { title: "Knowledge Hub — Mortgage Articles & Guides | Royal Den Capital", description: DESCRIPTION, url: absoluteUrl("/knowledge-hub/"), images: [DEFAULT_OG_IMAGE] },
  twitter: { title: "Knowledge Hub — Mortgage Articles & Guides | Royal Den Capital", description: DESCRIPTION, images: [DEFAULT_OG_IMAGE] },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function KnowledgeHubIndexPage() {
  const articles = [...KNOWLEDGE_HUB_ARTICLES].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Knowledge Hub", path: "/knowledge-hub/" }])} />
      <RevealMain id="knowledge-hub-index">
        <section className="page-hero knowledge-hero">
          <div className="container-xl text-center">
            <h1>Knowledge Hub</h1>
            <p className="hero-lead mx-auto">
              In-depth, plain-language guides on Canadian mortgages, written by the Royal Den Capital team and
              grounded in CMHC and OSFI guidance.
            </p>
          </div>
        </section>

        <section className="knowledge-section">
          <div className="container-xl">
            <div className="kh-index-grid">
              {articles.map((article) => (
                <article className="kh-index-card" key={article.slug}>
                  <span className="kh-index-category">{article.category}</span>
                  <h3>
                    <Link href={`/knowledge-hub/${article.slug}/`}>{article.title}</Link>
                  </h3>
                  <p>{article.excerpt}</p>
                  <div className="kh-index-meta">
                    <span>{article.author}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="business-support knowledge-cta">
          <div className="container-xl">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <h2>Looking for the full mortgage process, A to Z?</h2>
                <p>
                  Our Mortgage Glossary walks through the entire buying, qualifying, and renewal process in one
                  reference page, alongside every term explained in plain language.
                </p>
                <Link className="btn btn-gold btn-lg" href="/mortgage-glossary/">
                  Open the Mortgage Glossary
                </Link>
              </div>
            </div>
          </div>
        </section>
      </RevealMain>
    </>
  );
}
