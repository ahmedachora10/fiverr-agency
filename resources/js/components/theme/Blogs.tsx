import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePage } from "@inertiajs/react";
import { BlogPost, Tag } from "@/types/blog";
import { useTranslation } from "@/utils/translation";

const Blogs = () => {
    const { t } = useLanguage();

    const { props } = usePage();

    const posts: BlogPost[] = props.posts as BlogPost[];

    return (
        <section className="py-20 bg-muted/30">
            <div className="container max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {t('blog.title')}
                        <span className="text-primary">{t('blog.titleHighlight')}</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('blog.subtitle')}
                    </p>
                </div>

                {/* Featured Posts */}
                {posts.length > 0 && (
                    <div className="mb-16">
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                            {posts.map((post: BlogPost) => (
                                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-muted">
                                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={useTranslation(post).tBest('title')}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="secondary" className="text-xs">
                                                {useTranslation(post.category).tBest('name')}
                                            </Badge>
                                            <div className="flex items-center text-muted-foreground text-sm gap-4">
                                                <div className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    <span>{post.author.name}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{post.reading_time_minutes} {t('min.read')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                                            {useTranslation(post).tBest('title')}
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground line-clamp-3">
                                            {useTranslation(post).tBest('excerpt')}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-1">
                                                {post.tags?.slice(0, 2).map((tag: Tag) => (
                                                    <Badge key={tag.id} variant="outline" className="text-xs">
                                                        {useTranslation(tag).tBest('name')}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <Link href={route('blog.show', useTranslation(post).tBest('slug'))}>
                                                <Button variant="ghost" size="sm" className="group/btn">
                                                    {t('blog.readMore')}
                                                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* View All Button */}
                <div className="text-center">
                    <Button size="lg" className="font-semibold">
                        {t('blog.viewAll')}
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Blogs;