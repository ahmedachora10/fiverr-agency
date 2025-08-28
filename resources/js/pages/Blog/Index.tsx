import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Post, Category, Tag, PaginatedData, BlogFilters } from '@/types/blog';
import { Search, Filter, TagIcon, Boxes } from 'lucide-react';
import { useTranslation } from '@/utils/translation';
import FrontAppLayout from '@/layouts/front-app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import BlogPostCard from '@/components/Blog/BlogPostCard';

interface Props {
    posts: PaginatedData<Post>;
    categories: Category[];
    popularTags: Tag[];
    filters: BlogFilters;
}

export default function Index({ posts, categories, popularTags, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedTag, setSelectedTag] = useState(filters.tag || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('blog.index'), {
            search,
            category: selectedCategory,
            tag: selectedTag,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <FrontAppLayout>
            <Head title="Blog" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Modern Header */}
                <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-100">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                        <div className="text-center">
                            {/* Badge */}
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm mb-6">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                <span className="text-sm font-medium text-gray-700">Latest insights & stories</span>
                            </div>

                            {/* Main Title */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                                    Discover
                                </span>
                                <br />
                                <span className="text-gray-900">Our Blog</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                                Explore insights, tutorials, and stories from our team of experts.
                                <br className="hidden sm:block" />
                                Stay updated with the latest trends and best practices.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span>Weekly updates</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                        </svg>
                                    </div>
                                    <span>Expert authors</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                        </svg>
                                    </div>
                                    <span>In-depth guides</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 py-16">

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                        {/* Enhanced Sidebar */}
                        <div className="space-y-4">
                            {/* Search Section */}
                            <Card className="p-4 border-0">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Search className="w-5 h-5 mr-2" />
                                    Search viral posts
                                </h3>
                                <form onSubmit={handleSearch} className="space-y-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                        <Input
                                            type="text"
                                            placeholder="#hashtags"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="pl-10 text-sm"
                                        />
                                    </div>

                                    {/* Popular Tags */}
                                    {popularTags.length > 0 && (
                                        <div>
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {popularTags.slice(0, 6).map((tag) => {
                                                    const { tBest } = useTranslation(tag);
                                                    return (
                                                        <Badge
                                                            key={tag.id}
                                                            variant="outline"
                                                            className="text-xs cursor-pointer hover:bg-blue-50 flex items-center"
                                                            onClick={() => setSelectedTag(tBest('slug'))}
                                                        >
                                                            <TagIcon className="w-3 h-3" />
                                                            <span className="mx-1">{tBest('name')}</span>
                                                        </Badge>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <span>Show engagement rate</span>
                                        <span className="text-blue-500">?</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="advanced" />
                                        <label htmlFor="advanced" className="text-sm text-gray-700">Advanced filtering</label>
                                    </div> */}

                                    <div className="space-y-3">
                                        {/* <div>
                                            <label className="text-sm text-gray-600 mb-1 block">Keywords</label>
                                            <Input placeholder="Add keywords" className="text-sm" />
                                        </div> */}

                                        <div>
                                            <label className="text-sm text-gray-600 mb-1 block flex items-center">
                                                <Boxes className="w-4 h-4 mr-1" />
                                                Category
                                            </label>
                                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                                <SelectTrigger className="w-full text-sm">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category) => {
                                                        const { tBest } = useTranslation(category);
                                                        return (
                                                            <SelectItem key={category.id} value={tBest('slug')}>
                                                                {tBest('name')} ({category.published_posts_count})
                                                            </SelectItem>
                                                        )
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full">
                                        <Filter className="w-4 h-4 mr-2" />
                                        Apply Filters
                                    </Button>
                                </form>
                            </Card>
                        </div>
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {posts.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                                        {posts.data.map((post: Post) => (
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
                    </div>
                </div>
            </div>
        </FrontAppLayout>
    );
}
