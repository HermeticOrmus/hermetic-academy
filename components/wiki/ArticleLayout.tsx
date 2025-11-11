"use client";

import Link from 'next/link';
import { Clock, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Article } from '@/lib/markdown';
import { WikiSidebar } from './WikiSidebar';

interface ArticleLayoutProps {
  article: Article;
  tableOfContents?: { id: string; text: string; level: number }[];
  relatedArticles?: { title: string; slug: string; readingTime?: string }[];
}

export function ArticleLayout({ article, tableOfContents, relatedArticles }: ArticleLayoutProps) {
  return (
    <div className="flex min-h-screen bg-cosmic-black">
      {/* Persistent Sidebar */}
      <WikiSidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_200px] gap-12">
            {/* Main Article Content */}
            <article className="max-w-3xl">
              {/* Breadcrumbs */}
              <nav className="mb-8 text-sm flex items-center">
                <Link href="/wiki" className="text-gray-400 hover:text-gold-divine transition-colors">
                  The Codex
                </Link>
                <span className="text-gray-600 mx-2">/</span>
                <span className="text-gray-300">{article.title}</span>
              </nav>

              {/* Article Header */}
              <header className="mb-12 pb-6 border-b border-gray-800">
                <h1 className="text-4xl md:text-4xl font-bold mb-6 text-gray-100">
                  {article.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  {article.readingTime && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {article.readingTime}
                    </div>
                  )}
                  {article.difficulty && (
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {article.difficulty}
                    </div>
                  )}
                  {article.category && (
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {article.category}
                    </div>
                  )}
                  {article.lastUpdated && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {article.lastUpdated}
                    </div>
                  )}
                </div>
              </header>

              {/* Article Body - Styled Markdown with improved readability */}
              <div
                className="prose prose-invert prose-lg max-w-none
                  space-y-8
                  prose-headings:font-bold
                  prose-h1:text-3xl prose-h1:text-gray-100 prose-h1:mt-12 prose-h1:mb-6 prose-h1:border-b prose-h1:border-gray-800 prose-h1:pb-4
                  prose-h2:text-2xl prose-h2:text-gray-200 prose-h2:mt-10 prose-h2:mb-5 prose-h2:font-semibold
                  prose-h3:text-xl prose-h3:text-gray-300 prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-medium
                  prose-h4:text-lg prose-h4:text-gray-400 prose-h4:mt-6 prose-h4:mb-3
                  prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-cosmic-purple prose-a:no-underline hover:prose-a:text-cosmic-gold hover:prose-a:underline
                  prose-strong:text-gray-200 prose-strong:font-semibold
                  prose-code:text-cosmic-gold prose-code:bg-gray-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-lg
                  prose-blockquote:border-l-4 prose-blockquote:border-cosmic-purple prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-400 prose-blockquote:my-6
                  prose-ul:list-disc prose-ul:ml-6 prose-ul:text-gray-400 prose-ul:my-6 prose-ul:space-y-2
                  prose-ol:list-decimal prose-ol:ml-6 prose-ol:text-gray-400 prose-ol:my-6 prose-ol:space-y-2
                  prose-li:mb-2 prose-li:text-gray-400 prose-li:leading-relaxed
                  prose-table:border-collapse prose-table:w-full prose-table:my-6
                  prose-th:border prose-th:border-gray-700 prose-th:bg-gray-900 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-200
                  prose-td:border prose-td:border-gray-700 prose-td:p-3 prose-td:text-gray-400
                  prose-hr:border-gray-800 prose-hr:my-10
                "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} className="text-gold-divine no-underline hover:underline" />
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>

              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <aside className="mt-16 pt-12 border-t border-gray-800">
                  <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/wiki/${related.slug}`}
                        className="block bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-gold-divine/50 transition-colors"
                      >
                        <h3 className="font-semibold text-white mb-2 line-clamp-2">{related.title}</h3>
                        {related.readingTime && (
                          <div className="text-sm text-gray-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {related.readingTime}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </aside>
              )}
            </article>

            {/* Table of Contents Sidebar */}
            {tableOfContents && tableOfContents.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-8">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    On This Page
                  </h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-sm hover:text-gold-divine transition-colors ${
                          heading.level === 2
                            ? 'text-gray-300 font-medium'
                            : 'text-gray-500 pl-4'
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
