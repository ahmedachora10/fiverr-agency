import { Link } from '@inertiajs/react';
import { Post } from '@/types/blog';
import { useTranslation } from '@/utils/translation';
import { User } from '@/types';

interface HeroSectionProps {
    post: Post;
}

export default function HeroSection({ post }: HeroSectionProps) {
    const { tBest } = useTranslation(post);
    const category = post.category;
    const author = post.author as User & { avatar?: string };
    const categoryName = category?.name ? (typeof category.name === 'string' ? category.name : '') : '';

    return (
        <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src={post.thumbnail}
                    alt={tBest('title')}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-end">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="max-w-3xl">
                        {/* Category */}
                        {category && (
                            <Link
                                href={`/blog/category/${category.slug}`}
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
                                style={{
                                    backgroundColor: `${category.color}20`,
                                    color: category.color,
                                }}
                            >
                                {categoryName ? tBest(categoryName) : ''}
                            </Link>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {tBest('title')}
                        </h1>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <p className="text-xl text-gray-200 mb-8">
                                {tBest('excerpt')}
                            </p>
                        )}

                        {/* Author */}
                        <div className="flex items-center">
                            {author?.avatar ? (
                                <img
                                    src={author.avatar}
                                    alt={author.name}
                                    className="w-12 h-12 rounded-full border-2 border-white/50 mr-4"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-lg mr-4">
                                    {author?.name?.charAt(0) || 'U'}
                                </div>
                            )}
                            <div>
                                <p className="text-white font-medium">{author?.name || 'Unknown Author'}</p>
                                <p className="text-gray-300 text-sm">
                                    {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                    {' • '}
                                    {Math.ceil((post as any).reading_time || (post.body ? post.body.split(' ').length / 200 : 1))} min read
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
