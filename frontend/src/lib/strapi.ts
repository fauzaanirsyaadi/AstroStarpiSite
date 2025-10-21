const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:8080';

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage?: string;
  author: string;
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiArticleAttributes {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  featuredImage?: string;
  author: string;
  publishedDate?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiArticleData {
  id: number;
  documentId: string;
  attributes: StrapiArticleAttributes;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

function normalizeArticle(strapiArticle: StrapiArticleData): Article {
  return {
    id: strapiArticle.id,
    documentId: strapiArticle.documentId,
    ...strapiArticle.attributes,
    excerpt: strapiArticle.attributes.excerpt || '',
    publishedDate: strapiArticle.attributes.publishedDate || strapiArticle.attributes.publishedAt,
  };
}

export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?populate=*&sort=publishedDate:desc`);
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    const result: StrapiResponse<StrapiArticleData[]> = await response.json();
    return (result.data || []).map(normalizeArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }
    const result: StrapiResponse<StrapiArticleData[]> = await response.json();
    return result.data && result.data.length > 0 ? normalizeArticle(result.data[0]) : null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function fetchArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?filters[category][$eq]=${category}&populate=*&sort=publishedDate:desc`);
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    const result: StrapiResponse<StrapiArticleData[]> = await response.json();
    return (result.data || []).map(normalizeArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
