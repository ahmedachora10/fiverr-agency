import { Category } from '@/types/blog';
import { useTranslation } from '@/utils/translation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '../ui/badge';
import { File } from 'lucide-react';

interface CategoryHeroProps {
    category: Category;
    postCount: number;
}

export default function CategoryHero({ category, postCount }: CategoryHeroProps) {
    const { tBest } = useTranslation(category);
    const { t } = useLanguage();

    return (
        <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-gray-900">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <div
                    className="w-full h-full bg-cover bg-center opacity-50"
                    style={{
                        backgroundImage: `url(${category.thumbnail || 'https://tse1.mm.bing.net/th/id/OIP.n1hKkRQQVlYEdI6A56DVSwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-end">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="max-w-3xl">

                        {/* Post Count */}
                        <Badge variant="outline" className="text-gray-300 rounded-xs mb-4 py-2">
                            {/* Icon */}
                            <File className="h-4 w-4" />
                            <span className="mx-2">
                                {postCount} {postCount === 1 ? t('post') : t('posts')}
                            </span>
                        </Badge>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            {tBest('name')}
                        </h1>

                        {/* Description */}
                        {tBest('description') && (
                            <p className="text-xl text-gray-200 mb-6">
                                {tBest('description')}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
