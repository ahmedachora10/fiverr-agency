import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Tag } from '@/types/blog';
import { ArrowLeft, Edit, Trash2, Tag as TagIcon, Calendar, Globe, Languages } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/utils/translation';

interface Props {
    tag: Tag & { posts_count: number };
}

export default function Show({ tag }: Props) {
    const { tBest, t, currentLocale } = useTranslation(tag);

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${tBest('name')}"?`)) {
            router.delete(route('admin.tags.destroy', tag.id));
        }
    };

    return (
        <AppLayout>
            <Head title={tBest('name') || 'Tag'} />

            <div className="space-y-6 container mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => window.history.back()}
                            className="p-2 text-gray-400 hover:text-gray-600"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
                                <div
                                    className="w-6 h-6 rounded-full mr-3"
                                    style={{ backgroundColor: tag.color }}
                                ></div>
                                #{tBest('name')}
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Tag details and information
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route('admin.tags.edit', tag.id)}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Tag Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Language Switcher */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <Languages className="h-5 w-5 mr-2" />
                                Translations
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* English Content */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-700 border-b pb-2">English (EN)</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">#{t('name', 'en') || 'Not set'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Slug</dt>
                                            <dd className="mt-1 text-sm text-gray-900 font-mono">/{t('slug', 'en') || 'not-set'}</dd>
                                        </div>
                                        {t('description', 'en') && (
                                            <div>
                                                <dt className="text-xs font-medium text-gray-500">Description</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{t('description', 'en')}</dd>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Arabic Content */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-700 border-b pb-2">العربية (AR)</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900 text-right">#{t('name', 'ar') || 'غير محدد'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Slug</dt>
                                            <dd className="mt-1 text-sm text-gray-900 font-mono text-right">/{t('slug', 'ar') || 'غير-محدد'}</dd>
                                        </div>
                                        {t('description', 'ar') && (
                                            <div>
                                                <dt className="text-xs font-medium text-gray-500">Description</dt>
                                                <dd className="mt-1 text-sm text-gray-900 text-right">{t('description', 'ar')}</dd>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Current Display ({currentLocale.toUpperCase()})</h2>
                            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">#{tBest('name')}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Slug</dt>
                                    <dd className="mt-1 text-sm text-gray-900 font-mono">/{tBest('slug')}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Color</dt>
                                    <dd className="mt-1 flex items-center">
                                        <div
                                            className="w-4 h-4 rounded-full mr-2"
                                            style={{ backgroundColor: tag.color }}
                                        ></div>
                                        <span className="text-sm text-gray-900 font-mono">{tag.color}</span>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Posts Count</dt>
                                    <dd className="mt-1 flex items-center">
                                        <TagIcon className="h-4 w-4 text-gray-400 mr-1" />
                                        <span className="text-sm text-gray-900">{tag.posts_count}</span>
                                    </dd>
                                </div>
                            </dl>

                            {tBest('description') && (
                                <div className="mt-6">
                                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{tBest('description')}</dd>
                                </div>
                            )}
                        </div>

                        {/* SEO Information */}
                        {(tag.meta_title || tag.meta_description) && (
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                    <Globe className="h-5 w-5 mr-2" />
                                    SEO Settings
                                </h2>
                                <dl className="space-y-4">
                                    {tag.meta_title && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Meta Title</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{tag.meta_title}</dd>
                                        </div>
                                    )}
                                    {tag.meta_description && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Meta Description</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{tag.meta_description}</dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Total Posts</span>
                                    <span className="text-sm font-medium text-gray-900">{tag.posts_count}</span>
                                </div>
                            </div>
                        </div>

                        {/* Timestamps */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <Calendar className="h-5 w-5 mr-2" />
                                Timestamps
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(tag.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(tag.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </dd>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    href={route('blog.tag', tBest('slug'))}
                                    className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    target="_blank"
                                >
                                    View on Site
                                </Link>
                                <Link
                                    href={route('admin.posts.index', { search: `#${tBest('name')}` })}
                                    className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    View Posts
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
