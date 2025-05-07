export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  isPremium: boolean;
  publishedAt: string;
  author: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
