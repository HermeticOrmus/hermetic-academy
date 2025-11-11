import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticleSlugs, extractTableOfContents, getRelatedArticles } from '@/lib/markdown';
import { ArticleLayout } from '@/components/wiki/ArticleLayout';

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();

  return slugs.map((slugArray) => ({
    slug: slugArray,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found | Hermetic Academy',
    };
  }

  return {
    title: `${article.title} | The Codex - Hermetic Academy`,
    description: article.content.substring(0, 160).replace(/#/g, '').trim(),
  };
}

export default function WikiArticlePage({ params }: { params: { slug: string[] } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const tableOfContents = extractTableOfContents(article.content);
  const relatedArticles = getRelatedArticles(article.slug, article.category);

  return <ArticleLayout article={article} tableOfContents={tableOfContents} relatedArticles={relatedArticles} />;
}
