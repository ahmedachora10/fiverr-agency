import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Category, Tag, PostFormData } from '@/types/blog';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TranslatableInput from '../translatable-input';
import TranslatableQuillEditor from '@/components/Editor/TranslatableEditorJS';
import { useTranslation } from '@/utils/translation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  data: PostFormData;
  setData: (key: keyof PostFormData, value: any) => void;
  errors: Record<string, string>;
  processing: boolean;
  categories: Category[];
  tags: Tag[];
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  post?: any;
}

export default function PostForm({
  data,
  setData,
  errors,
  processing,
  categories,
  tags,
  onSubmit,
  submitText,
  post
}: Props) {
  const [activeTab, setActiveTab] = useState('content');
  const [metaTitleLength, setMetaTitleLength] = useState(0);
  const [metaDescLength, setMetaDescLength] = useState(0);
  const locales = ['en', 'ar'];

  useEffect(() => {
    setMetaTitleLength(data.meta_title?.length || 0);
  }, [data.meta_title]);

  useEffect(() => {
    setMetaDescLength(data.meta_description?.length || 0);
  }, [data.meta_description]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 \u0600-\u06FF -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string, locale: string) => {
    // Update title
    const currentTitleValue = data.title || {};
    setData('title', {
      ...currentTitleValue,
      [locale]: value
    });

    // Auto-generate slug if empty
    const currentSlugValue = data.slug || {};

    setData('slug', {
      ...currentSlugValue,
      [locale]: generateSlug(value)
    });

  };



  const getTranslatableErrors = (field: string) => {
    const fieldErrors: Record<string, string> = {};
    locales.forEach(locale => {
      const errorKey = `${field}.${locale}`;
      if (errors[errorKey]) {
        fieldErrors[locale] = errors[errorKey];
      }
    });
    return fieldErrors;
  };

  const handleTagToggle = (tagId: number) => {
    const currentTags = data.tags || [];
    const newTags = currentTags.includes(tagId)
      ? currentTags.filter(id => id !== tagId)
      : [...currentTags, tagId];
    setData('tags', newTags);
  };


  const handleTranslatableChange = (field: string, locale: string, value: string) => {
    const currentValue = data[field as keyof typeof data] as Record<string, string> || {};
    setData(field as keyof PostFormData, {
      ...currentValue,
      [locale]: value
    });

    if (field === 'title') {
      handleTitleChange(value, locale);
    }
  };

  const tabs = [
    { id: 'content', name: 'Content', icon: '📝' },
    { id: 'seo', name: 'SEO', icon: '🔍' },
    { id: 'social', name: 'Social Media', icon: '📱' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
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
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <TranslatableInput
                      name="title"
                      label="Title"
                      value={data.title as Record<string, string>}
                      error={getTranslatableErrors('title')}
                      locales={locales}
                      required
                      placeholder="Enter post title"
                      onChange={handleTranslatableChange}
                    />
                  </div>

                  <div>
                    <TranslatableInput
                      name="slug"
                      label="Slug"
                      value={data.slug as Record<string, string>}
                      error={getTranslatableErrors('slug')}
                      locales={locales}
                      placeholder="auto-generated-from-title"
                      onChange={handleTranslatableChange}
                    />

                    <p className="mt-1 text-sm text-gray-500">Leave empty to auto-generate from title</p>
                    <InputError message={errors.slug} className="mt-2" />
                  </div>

                  <div>
                    <TranslatableInput
                      name="excerpt"
                      label="Excerpt"
                      value={data.excerpt as Record<string, string>}
                      error={getTranslatableErrors('excerpt')}
                      locales={locales}
                      onChange={handleTranslatableChange}
                      type="textarea"
                    />
                    <p className="mt-1 text-sm text-gray-500">Leave empty to auto-generate from content</p>
                  </div>

                  <div>
                    <TranslatableQuillEditor
                      name="body"
                      label="Content"
                      value={data.body as Record<string, string>}
                      error={getTranslatableErrors('body')}
                      locales={locales}
                      onChange={handleTranslatableChange}
                      placeholder="Start writing your post content..."
                      required
                    />
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                      id="meta_title"
                      type="text"
                      className="mt-1 block w-full"
                      value={data.meta_title || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('meta_title', e.target.value)}
                      maxLength={60}
                    />
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-gray-500">Recommended: 50-60 characters. Leave empty to use post title.</p>
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
                      onChange={(e) => setData('meta_description', e.target.value)}
                      maxLength={160}
                    />
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-gray-500">Recommended: 150-160 characters. Leave empty to use excerpt.</p>
                      <span className={`text-xs ${metaDescLength > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                        {metaDescLength}/160
                      </span>
                    </div>
                    <InputError message={errors.meta_description} className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="canonical_url">Canonical URL</Label>
                    <Input
                      id="canonical_url"
                      type="url"
                      className="mt-1 block w-full"
                      value={data.canonical_url || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('canonical_url', e.target.value)}
                    />
                    <p className="mt-1 text-sm text-gray-500">Optional: Use if this content exists elsewhere</p>
                    <InputError message={errors.canonical_url} className="mt-2" />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="no_index"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={data.no_index}
                      onChange={(e) => setData('no_index', e.target.checked)}
                    />
                    <label htmlFor="no_index" className="ml-2 block text-sm text-gray-900">
                      No Index (prevent search engines from indexing this post)
                    </label>
                  </div>
                </div>
              )}

              {/* Social Media Tab */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="og_title">OG Title</Label>
                    <Input
                      id="og_title"
                      type="text"
                      className="mt-1 block w-full"
                      value={data.og_title || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('og_title', e.target.value)}
                    />
                    <p className="mt-1 text-sm text-gray-500">Leave empty to use post title</p>
                    <InputError message={errors.og_title} className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="og_description">OG Description</Label>
                    <textarea
                      id="og_description"
                      rows={3}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={data.og_description || ''}
                      onChange={(e) => setData('og_description', e.target.value)}
                    />
                    <p className="mt-1 text-sm text-gray-500">Leave empty to use excerpt</p>
                    <InputError message={errors.og_description} className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="og_image">OG Image</Label>
                    <input
                      id="og_image"
                      type="file"
                      accept="image/*"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      onChange={(e) => setData('og_image', e.target.files?.[0])}
                    />
                    <p className="mt-1 text-sm text-gray-500">Recommended: 1200x630px. Leave empty to use featured image.</p>
                    <InputError message={errors.og_image} className="mt-2" />
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={data.status}
                      onValueChange={(value) => setData('status', value)}
                    >
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </Select>
                    <InputError message={errors.status} className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="published_at">Publish Date</Label>
                    <Input
                      id="published_at"
                      type="datetime-local"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={data.published_at || ''}
                      onChange={(e) => setData('published_at', e.target.value)}
                    />
                    <InputError message={errors.published_at} className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="featured_image">Featured Image</Label>
                    <Input
                      id="featured_image"
                      type="file"
                      accept="image/*"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      onChange={(e) => setData('featured_image', e.target.files?.[0])}
                    />
                    <InputError message={errors.featured_image} className="mt-2" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category</h3>
            <select
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={data.category_id || ''}
              onChange={(e) => setData('category_id', e.target.value ? parseInt(e.target.value) : undefined)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {useTranslation(category).tBest('name')}
                </option>
              ))}
            </select>
            <InputError message={errors.category_id} className="mt-2" />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {tags.map((tag) => (
                <label key={tag.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={data.tags?.includes(tag.id) || false}
                    onChange={() => handleTagToggle(tag.id)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{useTranslation(tag).tBest('name')}</span>
                </label>
              ))}
            </div>
            <InputError message={errors.tags} className="mt-2" />
          </div>

          {/* Post Stats (only for edit) */}
          {post && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Views:</span>
                  <span className="font-medium">{post.views_count?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reading Time:</span>
                  <span className="font-medium">{post.reading_time_minutes} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Updated:</span>
                  <span className="font-medium">{new Date(post.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="mt-8 flex justify-end space-x-4">
        <Link href={route('admin.posts.index')}>
          <Button type="button" variant="outline">Cancel</Button>
        </Link>
        <Button type="submit" disabled={processing}>
          {processing ? 'Saving...' : submitText}
        </Button>
      </div>
    </form>
  );
}
