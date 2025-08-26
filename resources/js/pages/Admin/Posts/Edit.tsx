import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Post, Category, Tag, PostFormData } from '@/types/blog';
import AppLayout from '@/layouts/app-layout';
import PostForm from '@/components/Admin/PostForm';
import { useTranslation } from '@/utils/translation';

interface Props {
  post: Post;
  categories: Category[];
  tags: Tag[];
}

export default function Edit({ post, categories, tags }: Props) {
  const { tBest } = useTranslation(post);
  const { data, setData, put, processing, errors } = useForm<PostFormData>({
    title: post.title || {},
    slug: post.slug || {},
    excerpt: post.excerpt || {},
    body: post.body || {},
    category_id: post.category_id,
    status: post.status || 'draft',
    published_at: post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : '',
    meta_title: post.meta_title || '',
    meta_description: post.meta_description || '',
    canonical_url: post.canonical_url || '',
    og_title: post.og_title || '',
    og_description: post.og_description || '',
    no_index: post.no_index,
    tags: post.tags.map(tag => tag.id),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('admin.posts.update', post.id));
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Edit Post: {tBest('title')}
        </h2>
        <div className="flex space-x-4">
          <a
            href={route('blog.show', tBest('slug'))}
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            View Post
          </a>
        </div>
      </div>
      <Head title={`Edit Post: ${tBest('title')}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <PostForm
            data={data}
            setData={setData}
            errors={errors}
            processing={processing}
            categories={categories}
            tags={tags}
            onSubmit={handleSubmit}
            submitText="Update Post"
            post={post}
          />
        </div>
      </div>
    </AppLayout>
  );
}
