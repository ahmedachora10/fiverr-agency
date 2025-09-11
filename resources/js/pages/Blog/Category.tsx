import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Category, Post, PaginatedData } from '@/types/blog';
import FrontAppLayout from '@/layouts/front-app-layout';
import { useTranslation } from '@/utils/translation';
import { useLanguage } from '@/contexts/LanguageContext';
import BlogPostCard from '@/components/Blog/BlogPostCard';
import { BlogPostsSkeleton, PaginationSkeleton } from '@/components/Skeletons/BlogPostsSkeleton';
import CategoryHero from '@/components/Blog/CategoryHero';
import { updateLangLink, updateMetaTag } from '@/lib/utils';

interface Props {
  category: Category;
  posts: PaginatedData<Post>;
}

function PostsByCategory({ category, posts }: Props) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const { tBest } = useTranslation(category);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [posts]);


  useEffect(() => {
    // Set up SEO meta tags dynamically
    const metaTitle = category.meta_title || tBest('name');
    const metaDescription = category.meta_description || tBest('description') || '';
    // const ogImage = category.og_image ? `/storage/${category.og_image}` : (category.thumbnail);

    document.title = tBest('name');

    updateMetaTag('description', metaDescription);


    updateLangLink('canonical', route('blog.category', tBest('slug')));

    if (category.slug) {
      for (const [lang, slug] of Object.entries(category.slug)) {
        updateLangLink('alternate', route('blog.category', slug), lang);
      }
    }


    // Add structured data
    const structuredData: any = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": metaTitle,
      "description": metaDescription,
      "datePublished": category.created_at,
      "dateModified": category.updated_at,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      },
      "articleSection": metaTitle
    };

    // if (category.tags.length > 0) {
    //     structuredData["keywords"] = category.tags.map(tag => useTranslation(tag).tBest('name')).join(', ');
    // }

    let structuredDataScript: HTMLScriptElement | null = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    return () => {
      // Cleanup function to reset title when component unmounts
      document.title = tBest('name');
    };
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <CategoryHero category={category} postCount={posts.total} />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
          {isLoading ? (
            <>
              <BlogPostsSkeleton />
              <PaginationSkeleton />
            </>
          ) : posts.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {posts.data.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {posts.links && (
                <div className="mt-8">
                  <nav className="flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                      {posts.prev_page_url && (
                        <Link
                          href={posts.prev_page_url}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          {t('previous')}
                        </Link>
                      )}
                      {posts.next_page_url && (
                        <Link
                          href={posts.next_page_url}
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          {t('next')}
                        </Link>
                      )}
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          {t('showing')} <span className="font-medium">{posts.from}</span> {t('to')}{' '}
                          <span className="font-medium">{posts.to}</span> {t('of')}{' '}
                          <span className="font-medium">{posts.total}</span> {t('results')}
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          {posts.links.map((link, index) => (
                            <Link
                              key={index}
                              href={link.url || '#'}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${link.active
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                } ${index === 0 ? 'rounded-l-md' : ''} ${index === posts.links.length - 1 ? 'rounded-r-md' : ''
                                }`}
                              dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                          ))}
                        </nav>
                      </div>
                    </div>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No posts have been published in this category yet.
              </p>
            </div>
          )}

          {/* Navigation */}
          {/* <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href={route('blog.index')}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('back_to_blog')}
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({ category, posts }: Props) {

  return (
    <FrontAppLayout title={`${useTranslation(category).tBest('name')} - Blog`}>
      <PostsByCategory category={category} posts={posts} />
    </FrontAppLayout>
  );

}
