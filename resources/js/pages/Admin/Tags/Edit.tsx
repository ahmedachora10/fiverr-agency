import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Tag } from '@/types/blog';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import TagForm, { TagFormData } from '@/components/Admin/TagForm';
import { useTranslation } from '@/utils/translation';


interface Props {
    tag: Tag;
}

export default function Edit({ tag }: Props) {
    const { data, setData, put, processing, errors } = useForm<TagFormData>({
        name: tag.name || {},
        slug: tag.slug || {},
        description: tag.description || {},
        color: tag.color,
        meta_title: tag.meta_title || '',
        meta_description: tag.meta_description || '',
    });

    const { tBest } = useTranslation(tag);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.tags.update', tag.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit ${tBest('name') || 'Tag'}`} />

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
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Tag</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Update tag information and settings
                        </p>
                    </div>
                </div>

                <TagForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleSubmit}
                    submitText="Update Tag"
                    tag={tag}
                    cancelRoute={route('admin.tags.index')}
                />
            </div>
        </AppLayout>
    );
}
