import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Post, Category, Tag, PaginatedData, BlogFilters } from '@/types/blog';
import { Search } from 'lucide-react';

interface Props {
    posts: PaginatedData<Post>;
    categories: Category[];
    popularTags: Tag[];
    filters: BlogFilters;
}

export default function Index({ posts, categories, popularTags, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('blog.index'), {
            search,
            category: selectedCategory,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <>
            <Head title="Blog" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Discover insights, tutorials, and stories from our team
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Search and Filters */}
                    <div className="mb-8">
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search posts..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.slug}>
                                            {category.name} ({category.published_posts_count})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {posts.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                                                    {post.category && (
                                                        <div className="mb-3">
                                                            <Link
                                                                href={route('blog.category', post.category.slug)}
                                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                                                                style={{
                                                                    backgroundColor: `${post.category.color}20`,
                                                                    color: post.category.color,
                                                                }}
                                                            >
                                                                {post.category.name}
                                                            </Link>
                                                        </div>
                                                    )}

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
                                                            <span>•</span>
                                                            <span>{post.views_count.toLocaleString()} views</span>
                                                        </div>
                                                    </div>
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
                                        {Object.keys(filters).some(key => filters[key as keyof BlogFilters])
                                            ? 'Try adjusting your search criteria.'
                                            : 'Check back later for new content.'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Popular Tags */}
                            {popularTags.length > 0 && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {popularTags.map((tag) => (
                                            <Link
                                                key={tag.id}
                                                href={route('blog.tag', tag.slug)}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                                                style={{
                                                    backgroundColor: `${tag.color}20`,
                                                    color: tag.color,
                                                }}
                                            >
                                                #{tag.name}
                                                <span className="ml-1 text-xs">({tag.published_posts_count})</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Categories */}
                            {categories.length > 0 && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={route('blog.category', category.slug)}
                                                className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center">
                                                    <div
                                                        className="w-3 h-3 rounded-full mr-3"
                                                        style={{ backgroundColor: category.color }}
                                                    ></div>
                                                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                                                </div>
                                                <span className="text-xs text-gray-500">{category.published_posts_count}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
