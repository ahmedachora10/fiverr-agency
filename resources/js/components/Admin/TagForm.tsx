import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Tag } from '@/types/blog';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TranslatableInput from '../translatable-input';

interface TagFormData {
    name: Record<string, string>;
    slug: Record<string, string>;
    description: Record<string, string>;
    color: string;
    meta_title: string;
    meta_description: string;
}

interface Props {
    data: TagFormData;
    setData: (key: keyof TagFormData, value: any) => void;
    errors: Record<string, string>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    submitText: string;
    tag?: Tag;
    cancelRoute: string;
}

export default function TagForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitText,
    tag,
    cancelRoute
}: Props) {
    const [activeTab, setActiveTab] = useState('basic');
    const [metaTitleLength, setMetaTitleLength] = useState(data.meta_title?.length || 0);
    const [metaDescLength, setMetaDescLength] = useState(data.meta_description?.length || 0);
    const locales = ['en', 'ar'];

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9 \u0600-\u06FF -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTranslatableChange = (field: string, locale: string, value: string) => {
        const currentValue = data[field as keyof typeof data] as Record<string, string> || {};
        setData(field as any, {
            ...currentValue,
            [locale]: value
        });

        if (field === 'name') {
            handleNameChange(value, locale);
        }
    };

    const handleNameChange = (name: string, locale: string) => {
        const currentSlug = data.slug[locale] || '';
        if (!currentSlug || currentSlug === generateSlug(data.name[locale] || '')) {
            setData('slug', {
                ...data.slug,
                [locale]: generateSlug(name)
            });
        }
    };

    const getTranslatableErrors = (field: string) => {
        const fieldErrors: Record<string, string> = {};
        locales.forEach(locale => {
            const errorKey = `${field}.${locale}`;
            if ((errors as any)[errorKey]) {
                fieldErrors[locale] = (errors as any)[errorKey];
            }
        });
        return fieldErrors;
    };

    const handleMetaTitleChange = (value: string) => {
        setData('meta_title', value);
        setMetaTitleLength(value.length);
    };

    const handleMetaDescChange = (value: string) => {
        setData('meta_description', value);
        setMetaDescLength(value.length);
    };

    const tabs = [
        { id: 'basic', name: 'Basic Information', icon: '🏷️' },
        { id: 'seo', name: 'SEO Settings', icon: '🔍' },
    ];

    return (
        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3">
                    {/* Tab Navigation */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8 px-6">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="mr-2">{tab.icon}</span>
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-6">
                            {/* Basic Information Tab */}
                            {activeTab === 'basic' && (
                                <div className="space-y-6">
                                    <div>
                                        <TranslatableInput
                                            name="name"
                                            label="Name"
                                            value={data.name}
                                            error={getTranslatableErrors('name')}
                                            locales={locales}
                                            required
                                            placeholder="Enter tag name"
                                            onChange={handleTranslatableChange}
                                        />
                                    </div>

                                    <div>
                                        <TranslatableInput
                                            name="slug"
                                            label="Slug"
                                            value={data.slug}
                                            error={getTranslatableErrors('slug')}
                                            locales={locales}
                                            placeholder="auto-generated-from-name"
                                            onChange={handleTranslatableChange}
                                        />
                                        <p className="mt-1 text-sm text-gray-500">Leave empty to auto-generate from name</p>
                                    </div>

                                    <div>
                                        <TranslatableInput
                                            name="description"
                                            label="Description"
                                            value={data.description}
                                            error={getTranslatableErrors('description')}
                                            locales={locales}
                                            onChange={handleTranslatableChange}
                                            type="textarea"
                                            placeholder="Brief description of this tag..."
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="color">Color *</Label>
                                        <div className="mt-1 flex items-center space-x-3">
                                            <input
                                                type="color"
                                                id="color"
                                                value={data.color}
                                                onChange={(e) => setData('color', e.target.value)}
                                                className="h-10 w-20 border border-gray-300 rounded-md"
                                            />
                                            <Input
                                                type="text"
                                                value={data.color}
                                                onChange={(e) => setData('color', e.target.value)}
                                                className="flex-1"
                                                placeholder="#10b981"
                                            />
                                        </div>
                                        <InputError message={errors.color} className="mt-2" />
                                    </div>
                                </div>
                            )}

                            {/* SEO Settings Tab */}
                            {activeTab === 'seo' && (
                                <div className="space-y-6">
                                    <div>
                                        <Label htmlFor="meta_title">Meta Title</Label>
                                        <Input
                                            id="meta_title"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.meta_title || ''}
                                            onChange={(e) => handleMetaTitleChange(e.target.value)}
                                            maxLength={60}
                                        />
                                        <div className="flex justify-between mt-1">
                                            <p className="text-sm text-gray-500">Optimal length: 50-60 characters</p>
                                            <span className={`text-xs ${metaTitleLength > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                                                {metaTitleLength}/60
                                            </span>
                                        </div>
                                        <InputError message={errors.meta_title} className="mt-2" />
                                    </div>

                                    <div>
                                        <Label htmlFor="meta_description">Meta Description</Label>
                                        <textarea
                                            id="meta_description"
                                            rows={3}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            value={data.meta_description || ''}
                                            onChange={(e) => handleMetaDescChange(e.target.value)}
                                            maxLength={160}
                                            placeholder="Brief description for search engines..."
                                        />
                                        <div className="flex justify-between mt-1">
                                            <p className="text-sm text-gray-500">Optimal length: 150-160 characters</p>
                                            <span className={`text-xs ${metaDescLength > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                                                {metaDescLength}/160
                                            </span>
                                        </div>
                                        <InputError message={errors.meta_description} className="mt-2" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Tag Stats (only for edit) */}
                    {tag && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Posts:</span>
                                    <span className="font-medium">{tag.published_posts_count || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Created:</span>
                                    <span className="font-medium">{new Date(tag.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Updated:</span>
                                    <span className="font-medium">{new Date(tag.updated_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Color Preview */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-8 h-8 rounded-full border-2 border-gray-200"
                                style={{ backgroundColor: data.color }}
                            ></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {data.name?.en || data.name?.ar || 'Tag Name'}
                                </p>
                                <p className="text-xs text-gray-500">{data.color}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end space-x-4">
                <Link href={cancelRoute}>
                    <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : submitText}
                </Button>
            </div>
        </form>
    );
}

export type { TagFormData };
