import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import CategoryForm, { CategoryFormData } from '@/components/Admin/CategoryForm';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<CategoryFormData>({
        name: {},
        slug: {},
        description: {},
        color: '#6366f1',
        is_active: true,
        meta_title: '',
        meta_description: '',
    });

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

                <CategoryForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleSubmit}
                    submitText="Create Category"
                    cancelRoute={route('admin.categories.index')}
                />
            </div>
        </AppLayout>
    );
}
