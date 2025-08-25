import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Tag, PaginatedData } from '@/types/blog';
import { Search, Plus, Edit, Eye, Trash2, Tag as TagIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/utils/translation';

interface Props {
    tags: PaginatedData<Tag & { posts_count: number }>;
    filters: {
        search?: string;
    };
}

// TagRow component to handle individual tag translations
function TagRow({ tag, onDelete }: { tag: Tag & { posts_count: number }, onDelete: (tag: Tag) => void }) {
    const { tBest } = useTranslation(tag);
    
    return (
        <tr key={tag.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: tag.color }}
                    ></div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            #{tBest('name')}
                        </div>
                        <div className="text-sm text-gray-500">
                            /{tBest('slug')}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <TagIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-900">
                        {tag.posts_count}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(tag.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                    <Link
                        href={route('admin.tags.show', { tag: tag })}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                        href={route('admin.tags.edit', { tag: tag })}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <Edit className="h-4 w-4" />
                    </Link>
                    <button
                        onClick={() => onDelete(tag)}
                        className="text-red-600 hover:text-red-900"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default function Index({ tags, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.tags.index'), {
            search: search || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (tag: Tag) => {
        const { tBest } = useTranslation(tag);
        if (confirm(`Are you sure you want to delete "${tBest('name')}"?`)) {
            router.delete(route('admin.tags.destroy', { tag: tag.id }));
        }
    };

    return (
        <AppLayout>
            <Head title="Tags" />

            <div className="container mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Tags</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage blog tags for better content organization
                        </p>
                    </div>
                    <Link
                        href={route('admin.tags.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        New Tag
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search tags..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Tags List */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {tags.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tag
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Posts
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Created
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tags.data.map((tag) => (
                                            <TagRow key={tag.id} tag={tag} onDelete={handleDelete} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {tags.links && (
                                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 flex justify-between sm:hidden">
                                            {tags.prev_page_url && (
                                                <Link
                                                    href={tags.prev_page_url}
                                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Previous
                                                </Link>
                                            )}
                                            {tags.next_page_url && (
                                                <Link
                                                    href={tags.next_page_url}
                                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Next
                                                </Link>
                                            )}
                                        </div>
                                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Showing <span className="font-medium">{tags.from}</span> to{' '}
                                                    <span className="font-medium">{tags.to}</span> of{' '}
                                                    <span className="font-medium">{tags.total}</span> results
                                                </p>
                                            </div>
                                            <div>
                                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                    {tags.links.map((link, index) => (
                                                        <Link
                                                            key={index}
                                                            href={link.url || '#'}
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${link.active
                                                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                                } ${index === 0 ? 'rounded-l-md' : ''} ${index === tags.links.length - 1 ? 'rounded-r-md' : ''
                                                                }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ))}
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No tags found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by creating a new tag.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href={route('admin.tags.create')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Tag
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
