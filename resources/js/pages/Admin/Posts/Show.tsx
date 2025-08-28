import { Head, Link, router } from '@inertiajs/react';
import { Post } from '@/types/blog';
import AppLayout from '@/layouts/app-layout';
import { PencilIcon, TrashIcon, EyeIcon } from 'lucide-react';
import { useTranslation } from '@/utils/translation';


interface Props {
  post: Post;
}

export default function Show({ post }: Props) {
  const { tBest } = useTranslation(post);
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      router.delete(route('admin.posts.destroy', post.id));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      published: 'bg-green-100 text-green-800',
      archived: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Post Details
        </h2>
        <div className="flex space-x-4">
          <a
            href={route('blog.show', { slug: tBest('slug') })}
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <EyeIcon className="w-4 h-4 mr-2" />
            View Post
          </a>
          <Link
            href={route('admin.posts.edit', post.id)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit Post
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete Post
          </button>
        </div>
      </div>
      <Head title={`Post: ${tBest('title')}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Post Header */}
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(post.status)}
                      {post.category && (
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${post.category.color}20`,
                            color: post.category.color,
                          }}
                        >
                          {useTranslation(post.category).tBest('name')}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {post.views_count.toLocaleString()} views
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{tBest('title')}</h1>

                  <div className="flex items-center text-sm text-gray-600 mb-6">
                    <img
                      className="h-8 w-8 rounded-full mr-3"
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=6366f1&color=fff`}
                      alt={post.author.name}
                    />
                    <span className="font-medium">{post.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    {post.published_at && (
                      <>
                        <span className="mx-2">•</span>
                        <span>Published: {new Date(post.published_at).toLocaleDateString()}</span>
                      </>
                    )}
                    <span className="mx-2">•</span>
                    <span>{post.reading_time_minutes} min read</span>
                  </div>

                  {tBest('excerpt') && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Excerpt</h3>
                      <p className="text-gray-600">{tBest('excerpt')}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Image */}
              {post.thumbnail && (
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h3>
                    <img
                      src={post.thumbnail}
                      alt={tBest('title')}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Content</h3>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700">
                      {tBest('body')}
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Information */}
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Meta Title</dt>
                      <dd className="mt-1 text-sm text-gray-900">{post.meta_title || tBest('title')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Meta Description</dt>
                      <dd className="mt-1 text-sm text-gray-900">{post.meta_description || tBest('excerpt') || 'No meta description'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Slug</dt>
                      <dd className="mt-1 text-sm text-gray-900 font-mono">{tBest('slug')}</dd>
                    </div>
                    {post.canonical_url && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Canonical URL</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a href={post.canonical_url} target="_blank" className="text-indigo-600 hover:text-indigo-500">
                            {post.canonical_url}
                          </a>
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Search Engine Indexing</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {post.no_index ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            No Index
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Indexable
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              {/* Open Graph */}
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media (Open Graph)</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">OG Title</dt>
                      <dd className="mt-1 text-sm text-gray-900">{post.og_title || tBest('title')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">OG Description</dt>
                      <dd className="mt-1 text-sm text-gray-900">{post.og_description || tBest('excerpt') || 'No OG description'}</dd>
                    </div>
                    {(post.og_image || post.thumbnail) && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">OG Image</dt>
                        <dd className="mt-1">
                          <img
                            src={`/storage/${post.og_image || post.thumbnail}`}
                            alt="OG Image"
                            className="h-32 w-auto rounded"
                          />
                        </dd>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Statistics */}
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Views</span>
                      <span className="text-sm font-medium text-gray-900">{post.views_count.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Reading Time</span>
                      <span className="text-sm font-medium text-gray-900">{post.reading_time_minutes} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Created</span>
                      <span className="text-sm font-medium text-gray-900">{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Updated</span>
                      <span className="text-sm font-medium text-gray-900">{new Date(post.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: `${tag.color}20`,
                            color: tag.color,
                          }}
                        >
                          #{useTranslation(tag).tBest('name')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link
                      href={route('admin.posts.index')}
                      className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back to Posts
                    </Link>
                    <Link
                      href={route('admin.posts.create')}
                      className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create New Post
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
