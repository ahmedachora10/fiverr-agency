import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Category } from '@/types/blog';
import { ArrowLeft, Edit, Trash2, FolderOpen, Calendar, Globe } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Props {
    category: Category & { posts_count: number };
}

export default function Show({ category }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
            router.delete(route('admin.categories.destroy', category.id));
        }
    };

    return (
        <AppLayout>
            <Head title={category.name} />

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
                                    style={{ backgroundColor: category.color }}
                                ></div>
                                {category.name}
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Category details and information
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route('admin.categories.edit', category.id)}
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

                {/* Status Badge */}
                <div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${category.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {category.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Category Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{category.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Slug</dt>
                                    <dd className="mt-1 text-sm text-gray-900 font-mono">/{category.slug}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Color</dt>
                                    <dd className="mt-1 flex items-center">
                                        <div
                                            className="w-4 h-4 rounded-full mr-2"
                                            style={{ backgroundColor: category.color }}
                                        ></div>
                                        <span className="text-sm text-gray-900 font-mono">{category.color}</span>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Posts Count</dt>
                                    <dd className="mt-1 flex items-center">
                                        <FolderOpen className="h-4 w-4 text-gray-400 mr-1" />
                                        <span className="text-sm text-gray-900">{category.posts_count}</span>
                                    </dd>
                                </div>
                            </dl>

                            {category.description && (
                                <div className="mt-6">
                                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{category.description}</dd>
                                </div>
                            )}
                        </div>

                        {/* SEO Information */}
                        {(category.meta_title || category.meta_description) && (
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                    <Globe className="h-5 w-5 mr-2" />
                                    SEO Settings
                                </h2>
                                <dl className="space-y-4">
                                    {category.meta_title && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Meta Title</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{category.meta_title}</dd>
                                        </div>
                                    )}
                                    {category.meta_description && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Meta Description</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{category.meta_description}</dd>
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
                                    <span className="text-sm font-medium text-gray-900">{category.posts_count}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Status</span>
                                    <span className={`text-sm font-medium ${category.is_active ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {category.is_active ? 'Active' : 'Inactive'}
                                    </span>
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
                                        {new Date(category.created_at).toLocaleDateString('en-US', {
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
                                        {new Date(category.updated_at).toLocaleDateString('en-US', {
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
                                    href={route('blog.category', category.slug)}
                                    className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    target="_blank"
                                >
                                    View on Site
                                </Link>
                                <Link
                                    href={route('admin.posts.index', { category: category.slug })}
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
