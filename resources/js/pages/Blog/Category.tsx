import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Category, Post, PaginatedData } from '@/types/blog';

interface Props {
  category: Category;
  posts: PaginatedData<Post>;
}

export default function CategoryPage({ category, posts }: Props) {
  return (
    <>
      <Head title={`${category.name} - Blog`} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="mb-4">
                <span
                  className="inline-flex items-center px-4 py-2 rounded-full text-lg font-medium"
                  style={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                  }}
                >
                  {category.name}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
              {category.description && (
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {category.description}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {posts.total} {posts.total === 1 ? 'post' : 'posts'}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {posts.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {posts.data.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {post.featured_image && (
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={`/storage/${post.featured_image}`}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        <Link
                          href={route('blog.show', post.slug)}
                          className="hover:text-indigo-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 mb-4">
                          {post.excerpt.length > 120 ? `${post.excerpt.substring(0, 120)}...` : post.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <img
                            className="h-6 w-6 rounded-full mr-2"
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=6366f1&color=fff&size=24`}
                            alt={post.author.name}
                          />
                          <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span>•</span>
                          <span>{post.reading_time_minutes} min</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Link
                              key={tag.id}
                              href={route('blog.tag', tag.slug)}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity"
                              style={{
                                backgroundColor: `${tag.color}20`,
                                color: tag.color,
                              }}
                            >
                              #{tag.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
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
                          Previous
                        </Link>
                      )}
                      {posts.next_page_url && (
                        <Link
                          href={posts.next_page_url}
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Next
                        </Link>
                      )}
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{posts.from}</span> to{' '}
                          <span className="font-medium">{posts.to}</span> of{' '}
                          <span className="font-medium">{posts.total}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          {posts.links.map((link, index) => (
                            <Link
                              key={index}
                              href={link.url || '#'}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                link.active
                                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              } ${index === 0 ? 'rounded-l-md' : ''} ${
                                index === posts.links.length - 1 ? 'rounded-r-md' : ''
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
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href={route('blog.index')}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
