import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import TagForm, { TagFormData } from '@/components/Admin/TagForm';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<TagFormData>({
        name: {},
        slug: {},
        description: {},
        color: '#10b981',
        meta_title: '',
        meta_description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.tags.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Tag" />

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
                        <h1 className="text-2xl font-semibold text-gray-900">Create Tag</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Add a new tag to categorize your blog posts
                        </p>
                    </div>
                </div>

                <TagForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleSubmit}
                    submitText="Create Tag"
                    cancelRoute={route('admin.tags.index')}
                />
            </div>
        </AppLayout>
    );
}
