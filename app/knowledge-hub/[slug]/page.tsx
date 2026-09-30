import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeArticleTemplate } from "@/components/knowledge/KnowledgeArticleTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { KNOWLEDGE_HUB_ARTICLES, getKnowledgeHubArticle } from "@/data/knowledgeHubArticles";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo/site";

export function generateStaticParams() {
  return KNOWLEDGE_HUB_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getKnowledgeHubArticle(params.slug);
  if (!article) return {};
  const pageUrl = absoluteUrl(`/knowledge-hub/${article.slug}/`);
  return {
    title: `${article.title} | Royal Den Capital`,
    description: article.metaDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.metaDescription,
      url: pageUrl,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified ?? article.datePublished,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: { title: article.title, description: article.metaDescription, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function KnowledgeHubArticlePage({ params }: { params: { slug: string } }) {
  const article = getKnowledgeHubArticle(params.slug);
  if (!article) notFound();

  const pageUrl = `/knowledge-hub/${article.slug}/`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: [DEFAULT_OG_IMAGE],
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: { "@type": "Organization", name: article.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/assets/rdc-logo.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(pageUrl) },
  };

  const jsonLdData: object[] = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Knowledge Hub", path: "/knowledge-hub/" },
      { name: article.title, path: pageUrl },
    ]),
    articleJsonLd,
  ];
  if (article.faq && article.faq.length > 0) {
    jsonLdData.push(faqPageJsonLd(article.faq));
  }

  return (
    <>
      <JsonLd data={jsonLdData} />
      <KnowledgeArticleTemplate article={article} />
    </>
  );
}
