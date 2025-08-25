import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Category, Tag, PostFormData } from '@/types/blog';
import AppLayout from '@/layouts/app-layout';
import PostForm from '@/components/Admin/PostForm';


interface Props {
  categories: Category[];
  tags: Tag[];
}

export default function Create({ categories, tags }: Props) {
  const { data, setData, post, processing, errors } = useForm<PostFormData>({
    title: { en: '', ar: '' },
    slug: { en: '', ar: '' },
    excerpt: { en: '', ar: '' },
    body: { en: '', ar: '' },
    category_id: undefined,
    status: 'draft',
    published_at: '',
    meta_title: '',
    meta_description: '',
    canonical_url: '',
    og_title: '',
    og_description: '',
    no_index: false,
    tags: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.posts.store'));
  };

  return (
    <AppLayout>
      <Head title="Create Post" />

      <div className="mb-6">
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Create New Post
        </h2>
      </div>

      <div className="space-y-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <PostForm
            data={data}
            setData={setData}
            errors={errors}
            processing={processing}
            categories={categories}
            tags={tags}
            onSubmit={handleSubmit}
            submitText="Create Post"
          />
        </div>
      </div>
    </AppLayout>
  );
}
