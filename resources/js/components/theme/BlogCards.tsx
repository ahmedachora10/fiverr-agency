import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogPost } from "@/types/blog";
import { usePage } from "@inertiajs/react";


const BlogCards = () => {
    const { t, isRTL } = useLanguage();

    const props = usePage().props;

    const blogPosts = props.posts as BlogPost[];

    return (
        <section id="blog" className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                        {t('blog.title')} <span className="bg-gradient-primary bg-clip-text text-transparent">{t('blog.titleHighlight')}</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('blog.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogPosts.map((post: BlogPost) => (
                        <article key={post.id} className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group">
                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                                        {post.category.name}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-heading text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Meta information */}
                                <div className={`flex items-center justify-between text-sm text-muted-foreground mb-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                                            <User className="w-4 h-4" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                                        <Clock className="w-4 h-4" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                {/* Read more button */}
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                                >
                                    <span>{t('blog.readMore')}</span>
                                    <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View all posts button */}
                <div className="text-center">
                    <Button size="lg" className="px-8 py-6 rounded-full shadow-button hover:shadow-button-hover">
                        <a href="/blog">{t('blog.viewAll')}</a>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default BlogCards;
