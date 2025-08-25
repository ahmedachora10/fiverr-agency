import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Category } from '@/types/blog';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import CategoryForm, { CategoryFormData } from '@/components/Admin/CategoryForm';

interface Props {
    category: Category;
}

export default function Edit({ category }: Props) {
    const { data, setData, put, processing, errors } = useForm<CategoryFormData>({
        name: category.name || {},
        slug: category.slug || {},
        description: category.description || {},
        color: category.color,
        is_active: category.is_active,
        meta_title: category.meta_title || '',
        meta_description: category.meta_description || '',
    });

    console.log(category);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.categories.update', category.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit ${category.name?.en || category.name?.ar || 'Category'}`} />

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
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Category</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Update category information and settings
                        </p>
                    </div>
                </div>

                <CategoryForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleSubmit}
                    submitText="Update Category"
                    category={category}
                    cancelRoute={route('admin.categories.index')}
                />
            </div>
        </AppLayout>
    );
}
