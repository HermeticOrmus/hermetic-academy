import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/wiki');

export interface ArticleMetadata {
  title: string;
  slug: string;
  readingTime?: string;
  difficulty?: string;
  category?: string;
  lastUpdated?: string;
}

export interface Article extends ArticleMetadata {
  content: string;
}

/**
 * Get all article slugs from the content directory
 */
export function getAllArticleSlugs(): string[][] {
  const slugs: string[][] = [];

  function traverseDirectory(dir: string, currentPath: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        traverseDirectory(fullPath, [...currentPath, entry.name]);
      } else if (entry.name.endsWith('.md')) {
        // Remove .md extension and use filename as last slug part
        const filename = entry.name.replace(/\.md$/, '');
        slugs.push([...currentPath, filename]);
      }
    }
  }

  traverseDirectory(contentDirectory);
  return slugs;
}

/**
 * Get article by slug array
 * Example: ['getting-started', 'what-is-hermetics'] or ['principles', 'mentalism', 'overview']
 */
export function getArticleBySlug(slug: string[]): Article | null {
  try {
    const filePath = path.join(contentDirectory, ...slug) + '.md';

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract title from the first heading if not in frontmatter
    let title = data.title || '';
    if (!title) {
      const titleMatch = content.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        title = titleMatch[1];
      }
    }

    // Extract reading time from the content if present
    const readingTimeMatch = content.match(/\*\*Reading Time\*\*:\s*(\d+\s+minutes?)/);
    const readingTime = readingTimeMatch ? readingTimeMatch[1] : data.readingTime;

    // Extract difficulty from the content if present
    const difficultyMatch = content.match(/\*\*Difficulty\*\*:\s*(\w+)/);
    const difficulty = difficultyMatch ? difficultyMatch[1] : data.difficulty;

    // Extract category from the content if present
    const categoryMatch = content.match(/\*\*Category\*\*:\s*([^*\n]+)/);
    const category = categoryMatch ? categoryMatch[1].trim() : data.category;

    // Extract last updated date
    const lastUpdatedMatch = content.match(/\*\*Last Updated\*\*:\s*([0-9-]+)/);
    const lastUpdated = lastUpdatedMatch ? lastUpdatedMatch[1] : data.lastUpdated;

    return {
      slug: slug.join('/'),
      title,
      content,
      readingTime,
      difficulty,
      category,
      lastUpdated,
    };
  } catch (error) {
    console.error(`Error reading article ${slug.join('/')}:`, error);
    return null;
  }
}

/**
 * Get all articles with metadata (for listing pages)
 */
export function getAllArticles(): ArticleMetadata[] {
  const slugs = getAllArticleSlugs();
  const articles: ArticleMetadata[] = [];

  for (const slugArray of slugs) {
    const article = getArticleBySlug(slugArray);
    if (article) {
      articles.push({
        title: article.title,
        slug: article.slug,
        readingTime: article.readingTime,
        difficulty: article.difficulty,
        category: article.category,
        lastUpdated: article.lastUpdated,
      });
    }
  }

  return articles;
}

/**
 * Extract table of contents from markdown content
 */
export function extractTableOfContents(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\*\*/g, '');
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      headings.push({ id, text, level });
    }
  }

  return headings;
}

/**
 * Get related articles based on category or principle
 */
export function getRelatedArticles(currentSlug: string, category?: string, limit: number = 3): ArticleMetadata[] {
  const allArticles = getAllArticles();

  // Filter out current article and by category if provided
  let related = allArticles.filter(article => {
    if (article.slug === currentSlug) return false;
    if (category && article.category === category) return true;
    return false;
  });

  // If not enough related articles by category, add random ones
  if (related.length < limit) {
    const remaining = allArticles.filter(
      article => article.slug !== currentSlug && !related.some(r => r.slug === article.slug)
    );
    related = [...related, ...remaining.slice(0, limit - related.length)];
  }

  return related.slice(0, limit);
}
