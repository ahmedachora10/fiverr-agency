export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Category {
  id: number;
  name: Record<string, string>;
  slug: Record<string, string>;
  description?: Record<string, string>;
  color: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  published_posts_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name: Record<string, string>;
  slug: Record<string, string>;
  description?: Record<string, string>;
  color: string;
  meta_title?: string;
  meta_description?: string;
  published_posts_count?: number;
  created_at: string;
  updated_at: string;
}


export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: User;
  created_at: Date;
  category: Category;
  slug: string;
  tags: Tag[];
  reading_time_minutes: number;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  author_id: number;
  category_id?: number;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  published_at?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  no_index: boolean;
  views_count: number;
  reading_time_minutes?: number;
  created_at: string;
  updated_at: string;
  author: User;
  category?: Category;
  tags: Tag[];
}

export interface PostFormData {
  title: Record<string, string>;
  slug: Record<string, string>;
  excerpt: Record<string, string>;
  body: Record<string, string>;
  category_id?: number;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  published_at?: string;
  featured_image?: File;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: File;
  no_index: boolean;
  tags: number[];
}

export interface PaginatedData<T> {
  data: T[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface BlogFilters {
  search?: string;
  category?: string;
  tag?: string;
  status?: string;
}
