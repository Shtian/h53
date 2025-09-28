import "server-only";

import { promises as fs, statSync } from "fs";
import path from "path";

import { logEvent } from "@/lib/logging";
import {
  validateArticleFrontmatter,
  type ArticleFrontmatter,
} from "@/lib/articles/frontmatter";
import {
  sortArticleSummaries,
  toArticleSummary,
  validateArticleContent,
  type ArticleContent,
  type ArticleSummary,
} from "@/lib/articles/content";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function ensureArticlesDir(): string {
  return ARTICLES_DIR;
}

async function readArticleFilenames(): Promise<string[]> {
  const directory = ensureArticlesDir();
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => entry.name);
  } catch (error) {
    logEvent("articles.read-directory.error", {
      directory,
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error(
      "Unable to read the articles directory. Ensure `content/articles` exists and is accessible.",
    );
  }
}

// Lightweight frontmatter extraction to avoid external markdown tooling in the sandbox.
function extractFrontmatter(raw: string): {
  frontmatterBlock: string | null;
  body: string;
} {
  if (!raw.startsWith("---")) {
    return { frontmatterBlock: null, body: raw.trimStart() };
  }

  const endIndex = raw.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { frontmatterBlock: null, body: raw.trimStart() };
  }

  const frontmatterBlock = raw.slice(3, endIndex).trim();
  const body = raw.slice(endIndex + 4).trimStart();
  return { frontmatterBlock, body };
}

function parseFrontmatterBlock(block: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = block.split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim()) continue;
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;
    const rawValue = rest.join(":").trim();
    const trimmed = rawValue.replace(/^['\"]|['\"]$/g, "");
    if (trimmed === "true" || trimmed === "false") {
      result[key.trim()] = trimmed === "true";
      continue;
    }
    const numberValue = Number(trimmed);
    if (!Number.isNaN(numberValue) && trimmed !== "") {
      result[key.trim()] = numberValue;
      continue;
    }
    result[key.trim()] = trimmed;
  }

  return result;
}

async function parseArticleFile(filename: string): Promise<ArticleContent> {
  const filePath = path.join(ensureArticlesDir(), filename);
  const raw = await fs.readFile(filePath, "utf8");
  const { frontmatterBlock, body } = extractFrontmatter(raw);

  if (!frontmatterBlock) {
    logEvent("articles.frontmatter.missing", { filePath });
    throw new Error(`Missing frontmatter in article: ${filename}`);
  }

  const tentativeFrontmatter = parseFrontmatterBlock(frontmatterBlock);
  let validatedFrontmatter: ArticleFrontmatter;
  try {
    validatedFrontmatter = validateArticleFrontmatter(tentativeFrontmatter);
  } catch (error) {
    logEvent("articles.frontmatter.invalid", {
      filePath,
      error: error instanceof Error ? error.message : String(error),
      frontmatter: tentativeFrontmatter,
    });
    throw new Error(`Invalid frontmatter in article: ${filename}`);
  }

  const article = validateArticleContent({
    slug: filename.replace(/\.md$/, ""),
    frontmatter: validatedFrontmatter,
    body,
  });

  return article;
}

export async function loadAllArticles(): Promise<ArticleContent[]> {
  const filenames = await readArticleFilenames();
  if (filenames.length === 0) {
    return [];
  }

  const articles = await Promise.all(filenames.map((filename) => parseArticleFile(filename)));
  return articles;
}

export async function loadArticleSummaries(): Promise<ArticleSummary[]> {
  const contents = await loadAllArticles();
  const summaries = contents.map(toArticleSummary);
  return sortArticleSummaries(summaries);
}

export async function loadArticleBySlug(slug: string): Promise<ArticleContent | null> {
  const targetFile = `${slug}.md`;
  const filenames = await readArticleFilenames();
  if (!filenames.includes(targetFile)) {
    return null;
  }

  return parseArticleFile(targetFile);
}

export async function loadArticleSlugs(): Promise<string[]> {
  const filenames = await readArticleFilenames();
  return filenames.map((file) => file.replace(/\.md$/, ""));
}

export async function getOrderedArticleSummaries(): Promise<ArticleSummary[]> {
  return loadArticleSummaries();
}

export async function getArticleContent(slug: string): Promise<ArticleContent | null> {
  try {
    const article = await loadArticleBySlug(slug);
    return article;
  } catch (error) {
    logEvent("articles.load.error", {
      slug,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

export function hasArticlesDirectory(): boolean {
  try {
    const stats = statSync(ensureArticlesDir());
    return stats.isDirectory();
  } catch {
    return false;
  }
}
