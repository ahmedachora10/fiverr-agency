import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface CategoryFormData {
    name: string;
    slug: string;
    description: string;
    color: string;
    is_active: boolean;
    meta_title: string;
    meta_description: string;
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<CategoryFormData>({
        name: '',
        slug: '',
        description: '',
        color: '#6366f1',
        is_active: true,
        meta_title: '',
        meta_description: '',
    });

    const [activeTab, setActiveTab] = useState('basic');

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleNameChange = (name: string) => {
        setData('name', name);
        if (!data.slug || data.slug === generateSlug(data.name)) {
            setData('slug', generateSlug(name));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Category" />

            <div className="space-y-6 container mx-auto p-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => window.history.back()}
                        className="p-2 text-gray-400 hover:text-gray-600"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Create Category</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Add a new category to organize your blog posts
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                type="button"
                                onClick={() => setActiveTab('basic')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'basic'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Basic Information
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('seo')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'seo'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                SEO Settings
                            </button>
                        </nav>
                    </div>

                    {/* Basic Information Tab */}
                    {activeTab === 'basic' && (
                        <div className="bg-white shadow rounded-lg p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                                        Slug *
                                    </label>
                                    <input
                                        type="text"
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Brief description of this category..."
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                                        Color *
                                    </label>
                                    <div className="mt-1 flex items-center space-x-3">
                                        <input
                                            type="color"
                                            id="color"
                                            value={data.color}
                                            onChange={(e) => setData('color', e.target.value)}
                                            className="h-10 w-20 border border-gray-300 rounded-md"
                                        />
                                        <input
                                            type="text"
                                            value={data.color}
                                            onChange={(e) => setData('color', e.target.value)}
                                            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="#6366f1"
                                        />
                                    </div>
                                    {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <div className="mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">Active</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SEO Settings Tab */}
                    {activeTab === 'seo' && (
                        <div className="bg-white shadow rounded-lg p-6 space-y-6">
                            <div>
                                <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    id="meta_title"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    maxLength={60}
                                />
                                <div className="mt-1 flex justify-between text-xs text-gray-500">
                                    <span>Optimal length: 50-60 characters</span>
                                    <span>{data.meta_title.length}/60</span>
                                </div>
                                {errors.meta_title && <p className="mt-1 text-sm text-red-600">{errors.meta_title}</p>}
                            </div>

                            <div>
                                <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700">
                                    Meta Description
                                </label>
                                <textarea
                                    id="meta_description"
                                    rows={3}
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    maxLength={160}
                                    placeholder="Brief description for search engines..."
                                />
                                <div className="mt-1 flex justify-between text-xs text-gray-500">
                                    <span>Optimal length: 150-160 characters</span>
                                    <span>{data.meta_description.length}/160</span>
                                </div>
                                {errors.meta_description && <p className="mt-1 text-sm text-red-600">{errors.meta_description}</p>}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
