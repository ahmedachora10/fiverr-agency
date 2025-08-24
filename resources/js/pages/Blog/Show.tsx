import React, { useEffect, useTransition } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Post } from '@/types/blog';
import { ClockIcon, EyeIcon, CalendarIcon, UserIcon } from 'lucide-react';
import { useTranslation } from '@/utils/translation';


interface Props {
    post: Post;
    relatedPosts: Post[];
}

export default function Show({ post, relatedPosts }: Props) {
    const { tBest } = useTranslation(post);
    useEffect(() => {
        // Set up SEO meta tags dynamically
        const metaTitle = post.meta_title || tBest('title');
        const metaDescription = post.meta_description || tBest('excerpt') || '';
        const ogImage = post.og_image ? `/storage/${post.og_image}` : (post.featured_image ? `/storage/${post.featured_image}` : '');

        document.title = metaTitle;

        // Update meta tags
        const updateMetaTag = (name: string, content: string, property = false) => {
            const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let meta = document.querySelector(selector) as HTMLMetaElement;
            if (!meta) {
                meta = document.createElement('meta');
                if (property) {
                    meta.setAttribute('property', name);
                } else {
                    meta.setAttribute('name', name);
                }
                document.head.appendChild(meta);
            }
            meta.content = content;
        };

        updateMetaTag('description', metaDescription);
        updateMetaTag('og:title', post.og_title || tBest('title'), true);
        updateMetaTag('og:description', post.og_description || tBest('excerpt') || '', true);
        updateMetaTag('og:type', 'article', true);
        updateMetaTag('og:url', window.location.href, true);
        if (ogImage) {
            updateMetaTag('og:image', ogImage, true);
        }
        updateMetaTag('twitter:card', 'summary_large_image', true);
        updateMetaTag('twitter:title', post.og_title || tBest('title'), true);
        updateMetaTag('twitter:description', post.og_description || tBest('excerpt') || '', true);
        if (ogImage) {
            updateMetaTag('twitter:image', ogImage, true);
        }

        // Add structured data
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": tBest('title'),
            "description": post.meta_description || tBest('excerpt'),
            "image": ogImage,
            "author": {
                "@type": "Person",
                "name": post.author.name
            },
            "datePublished": post.published_at,
            "dateModified": post.updated_at,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": window.location.href
            },
            "wordCount": tBest('body').split(' ').length,
            "timeRequired": `PT${post.reading_time_minutes}M`
        };

        if (post.category) {
            structuredData["articleSection"] = post.category.name;
        }

        if (post.tags.length > 0) {
            structuredData["keywords"] = post.tags.map(tag => tag.name).join(', ');
        }

        let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
        if (!structuredDataScript) {
            structuredDataScript = document.createElement('script');
            structuredDataScript.type = 'application/ld+json';
            document.head.appendChild(structuredDataScript);
        }
        structuredDataScript.textContent = JSON.stringify(structuredData);

        return () => {
            // Cleanup function to reset title when component unmounts
            document.title = tBest('title');
        };
    }, [post]);

    return (
        <>
            <Head title={post.meta_title || tBest('title')} />

            <div className="min-h-screen bg-gray-50">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Post Header */}
                    <header className="mb-8">
                        {post.category && (
                            <div className="mb-4">
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

                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{tBest('title')}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                            <div className="flex items-center">
                                <UserIcon className="h-4 w-4 mr-1" />
                                <img
                                    className="h-8 w-8 rounded-full mr-3"
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=6366f1&color=fff`}
                                    alt={post.author.name}
                                />
                                <span className="font-medium text-gray-900">{post.author.name}</span>
                            </div>

                            <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                <time dateTime={post.published_at || post.created_at}>
                                    {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>

                            <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                <span>{post.reading_time_minutes} min read</span>
                            </div>

                            <div className="flex items-center">
                                <EyeIcon className="h-4 w-4 mr-1" />
                                <span>{post.views_count.toLocaleString()} views</span>
                            </div>
                        </div>

                        {tBest('excerpt') && (
                            <p className="text-xl text-gray-600 leading-relaxed">{tBest('excerpt')}</p>
                        )}
                    </header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="mb-8">
                            <img
                                src={`/storage/${post.featured_image}`}
                                alt={tBest('title')}
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    )}

                    {/* Post Content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {tBest('body')}
                        </div>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
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
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Author Bio */}
                    <div className="border-t border-gray-200 pt-8 mb-12">
                        <div className="flex items-start">
                            <img
                                className="h-16 w-16 rounded-full mr-4"
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=6366f1&color=fff&size=64`}
                                alt={post.author.name}
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{post.author.name}</h3>
                                <p className="text-gray-600 mt-1">Content creator and blogger sharing insights and experiences.</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="border-t border-gray-200 pt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost) => (
                                    <article key={relatedPost.id} className="group">
                                        {relatedPost.featured_image && (
                                            <div className="aspect-w-16 aspect-h-9 mb-4">
                                                <img
                                                    src={`/storage/${relatedPost.featured_image}`}
                                                    alt={useTranslation(relatedPost).tBest('title')}
                                                    className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                                                />
                                            </div>
                                        )}

                                        {relatedPost.category && (
                                            <div className="mb-2">
                                                <span
                                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                                    style={{
                                                        backgroundColor: `${relatedPost.category.color}20`,
                                                        color: relatedPost.category.color,
                                                    }}
                                                >
                                                    {useTranslation(relatedPost.category).tBest('name')}
                                                </span>
                                            </div>
                                        )}

                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                            <Link href={route('blog.show', useTranslation(relatedPost).tBest('slug'))}>{useTranslation(relatedPost).tBest('title')}</Link>
                                        </h3>

                                        {useTranslation(relatedPost).tBest('excerpt') && (
                                            <p className="text-gray-600 text-sm mb-3">
                                                {useTranslation(relatedPost).tBest('excerpt').length > 100 ? `${useTranslation(relatedPost).tBest('excerpt').substring(0, 100)}...` : useTranslation(relatedPost).tBest('excerpt')}
                                            </p>
                                        )}

                                        <div className="flex items-center text-xs text-gray-500">
                                            <span>{useTranslation(relatedPost).tBest('author.name')}</span>
                                            <span className="mx-1">•</span>
                                            <span>{new Date(relatedPost.published_at || relatedPost.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                            <span className="mx-1">•</span>
                                            <span>{relatedPost.reading_time_minutes} min</span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <Link
                            href={route('home')}
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>
                </article>
            </div>
        </>
    );
}
