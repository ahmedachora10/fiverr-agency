import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TranslatableInput from '@/components/translatable-input';

interface PostFormProps {
    post?: {
        id?: number;
        title: Record<string, string>;
        slug: Record<string, string>;
        excerpt: Record<string, string>;
        body: Record<string, string>;
        category_id?: number;
        status: string;
        published_at?: string;
        tags?: Array<{ id: number; name: string }>;
    };
    categories: Array<{ id: number; name: string }>;
    tags: Array<{ id: number; name: string }>;
    isEditing?: boolean;
}

export default function PostForm({ post, categories, tags, isEditing = false }: PostFormProps) {
    const locales = ['en', 'ar'];

    const { data, setData, post: submitPost, put, processing, errors } = useForm({
        title: post?.title || { en: '', ar: '' },
        slug: post?.slug || { en: '', ar: '' },
        excerpt: post?.excerpt || { en: '', ar: '' },
        body: post?.body || { en: '', ar: '' },
        category_id: post?.category_id || '',
        status: post?.status || 'draft',
        published_at: post?.published_at || '',
        tags: post?.tags?.map(tag => tag.id) || [],
        featured_image: null,
        og_image: null,
    });

    const handleTranslatableChange = (field: string, locale: string, value: string) => {
        const currentValue = data[field as keyof typeof data] as Record<string, string> || {};
        setData(field as any, {
            ...currentValue,
            [locale]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && post?.id) {
            put(route('admin.posts.update', post.id));
        } else {
            submitPost(route('admin.posts.store'));
        }
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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Translatable Title */}
            <TranslatableInput
                name="title"
                label="Post Title"
                value={data.title}
                onChange={handleTranslatableChange}
                error={getTranslatableErrors('title')}
                locales={locales}
                required
                placeholder="Enter post title"
            />

            {/* Translatable Slug */}
            <TranslatableInput
                name="slug"
                label="Slug"
                value={data.slug}
                onChange={handleTranslatableChange}
                error={getTranslatableErrors('slug')}
                locales={locales}
                placeholder="auto-generated-from-title"
            />

            {/* Translatable Excerpt */}
            <TranslatableInput
                name="excerpt"
                label="Excerpt"
                type="textarea"
                value={data.excerpt}
                onChange={handleTranslatableChange}
                error={getTranslatableErrors('excerpt')}
                locales={locales}
                placeholder="Brief description of the post"
            />

            {/* Translatable Body */}
            <TranslatableInput
                name="body"
                label="Content"
                type="textarea"
                value={data.body}
                onChange={handleTranslatableChange}
                error={getTranslatableErrors('body')}
                locales={locales}
                required
                placeholder="Write your post content here"
            />

            {/* Category Selection */}
            <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select
                    value={data.category_id?.toString()}
                    onValueChange={(value) => setData('category_id', parseInt(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category_id && (
                    <p className="text-sm text-red-500">{errors.category_id}</p>
                )}
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                    value={data.status}
                    onValueChange={(value) => setData('status', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
                {errors.status && (
                    <p className="text-sm text-red-500">{errors.status}</p>
                )}
            </div>

            {/* Published At */}
            <div className="space-y-2">
                <Label htmlFor="published_at">Publish Date</Label>
                <Input
                    type="datetime-local"
                    id="published_at"
                    value={data.published_at}
                    onChange={(e) => setData('published_at', e.target.value)}
                    className={errors.published_at ? 'border-red-500' : ''}
                />
                {errors.published_at && (
                    <p className="text-sm text-red-500">{errors.published_at}</p>
                )}
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
                <Label htmlFor="featured_image">Featured Image</Label>
                <Input
                    type="file"
                    id="featured_image"
                    accept="image/*"
                    onChange={(e) => setData('featured_image', e.target.files?.[0] || null)}
                    className={errors.featured_image ? 'border-red-500' : ''}
                />
                {errors.featured_image && (
                    <p className="text-sm text-red-500">{errors.featured_image}</p>
                )}
            </div>

            {/* Tags Selection */}
            <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <label key={tag.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={data.tags.includes(tag.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setData('tags', [...data.tags, tag.id]);
                                    } else {
                                        setData('tags', data.tags.filter(id => id !== tag.id));
                                    }
                                }}
                            />
                            <span className="text-sm">{tag.name}</span>
                        </label>
                    ))}
                </div>
                {errors.tags && (
                    <p className="text-sm text-red-500">{errors.tags}</p>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
                </Button>
            </div>
        </form>
    );
}
