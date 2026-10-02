import Link from "next/link";
import { RevealMain } from "@/components/ui/RevealMain";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { ArticleBlock, KnowledgeHubArticle } from "@/data/knowledgeHubArticles";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function Block({ block, index }: { block: ArticleBlock; index: number }) {
  switch (block.type) {
    case "h2":
      return <h2 key={index}>{block.text}</h2>;
    case "h3":
      return <h3 key={index}>{block.text}</h3>;
    case "ul":
      return (
        <ul className="knowledge-list" key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="knowledge-steps" key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="article-quote" key={index}>
          {block.text}
        </blockquote>
      );
    case "p":
    default:
      return <p key={index}>{block.text}</p>;
  }
}

export function KnowledgeArticleTemplate({ article }: { article: KnowledgeHubArticle }) {
  return (
    <RevealMain id={`kh-${article.slug}`}>
      <section className="page-hero knowledge-hero">
        <div className="container-xl text-center">
          <p className="section-kicker">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="hero-lead mx-auto">{article.excerpt}</p>
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 knowledge-byline mt-3">
            <span>
              By <strong>{article.author}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/knowledge-hub/">Knowledge Hub</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {article.title}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="knowledge-section">
        <div className="container-xl">
          <div className="mx-auto" style={{ maxWidth: 820 }}>
            <div className="knowledge-block">
              {article.body.map((block, index) => (
                <Block block={block} index={index} key={index} />
              ))}
            </div>

            {article.faq && article.faq.length > 0 && (
              <div className="knowledge-block">
                <h2>Frequently asked questions</h2>
                <FaqAccordion
                  id={`kh-faq-${article.slug}`}
                  items={article.faq.map((item, index) => ({
                    id: `kh-${article.slug}-faq${index + 1}`,
                    questionKey: `kh_${article.slug}_faq${index + 1}_q`,
                    question: item.question,
                    answerKey: `kh_${article.slug}_faq${index + 1}_a`,
                    answer: item.answer,
                  }))}
                />
              </div>
            )}

            <div className="knowledge-block sources-block">
              <h2>Sources</h2>
              <p>
                This article is written for client education and is not legal, tax, or lending advice. Rules,
                lender policies, and rates can change — always confirm current details with your advisor.
              </p>
              <ul className="source-list">
                {article.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer">
                      {source.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="business-support knowledge-cta">
        <div className="container-xl">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <h2>Have a question about your own mortgage file?</h2>
              <p>
                Every situation has details a general article can&apos;t fully cover. Royal Den Capital can help
                compare lender options and explain the trade-offs for your exact scenario.
              </p>
              <Link className="btn btn-gold btn-lg" href="/apply/">
                Let&apos;s Talk
              </Link>
            </div>
            <div className="col-lg-5">
              <div className="knowledge-help-list">
                <h3>More from the Knowledge Hub</h3>
                <ul>
                  <li>
                    <Link href="/knowledge-hub/">Browse all articles</Link>
                  </li>
                  <li>
                    <Link href="/mortgage-glossary/">Mortgage glossary &amp; buying process</Link>
                  </li>
                  <li>
                    <Link href="/mortgage-payment-calculator/">Mortgage payment calculator</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-band">
        <div className="container-xl d-flex flex-wrap align-items-center justify-content-between gap-4">
          <div>
            <h2>$2 Billion in Residential &amp; $2 Billion in Commercial Mortgage Closings.</h2>
            <p>Sign up for mortgage tips, rate updates, and funding insights from Royal Den Capital.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </RevealMain>
  );
}
