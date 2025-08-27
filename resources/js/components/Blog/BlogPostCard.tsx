import { Link } from '@inertiajs/react';
import { Post } from '@/types/blog';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Eye, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/utils/translation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { usePageTracking } from '@/hooks/use-page-tracking';

interface BlogPostCardProps {
    post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
    const { trackEvent } = usePageTracking();
    const { tBest } = useTranslation(post);

    return (
        <Card className="group border-0 hover:shadow-lg transition-all duration-200 overflow-hidden">
            {/* Post Header */}
            <CardHeader className="p-3 pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=6366f1&color=fff&size=32`}
                                alt={post.author.name}
                            />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                            <p className="text-xs text-gray-500">{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                    </div>
                </div>
            </CardHeader>

            {/* Post Image */}
            {post.featured_image && (
                <div className="relative aspect-square overflow-hidden">
                    <Link href={route('blog.show', tBest('slug'))}>
                        <img
                            src={`/storage/${post.featured_image}`}
                            alt={tBest('title')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                    </Link>
                </div>
            )}

            {/* Post Content */}
            <CardContent className="p-3">
                {/* Engagement Actions */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-ceter space-x-4">

                        <Button variant="ghost" size="sm" className="h-8 p-0 hover:bg-transparent">
                            <Bookmark className="h-5 w-5" />
                            <span className="text-xs text-gray-500">{post.reading_time_minutes} min read</span>
                        </Button>

                    </div>
                    <Button variant="ghost" size="sm" className="h-8 p-0 hover:bg-transparent">
                        <Eye className="h-5 w-5" />
                        <span className="text-xs text-gray-500">{post.views_count.toLocaleString()}</span>
                    </Button>
                </div>

                {/* Post Title & Content */}
                <div className="space-y-1">
                    <Link href={route('blog.show', tBest('slug'))}>
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                            {tBest('title')}
                        </h3>
                    </Link>
                    {tBest('excerpt') && (
                        <p className="text-xs text-gray-600 line-clamp-2">
                            {tBest('excerpt')}
                        </p>
                    )}
                </div>

                {/* Category & Tags */}
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                        {post.category && (
                            <Badge
                                variant="secondary"
                                className="text-xs"
                                style={{
                                    backgroundColor: `${post.category.color}20`,
                                    color: post.category.color,
                                    border: `1px solid ${post.category.color}30`
                                }}
                            >
                                {useTranslation(post.category).tBest('name')}
                            </Badge>
                        )}

                    </div>
                    <Link href={route('blog.show', tBest('slug'))} onClick={() => trackEvent('click', 'blog', tBest('title'))}>
                        <Button variant="ghost" size="sm" className="group/btn text-primary">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
