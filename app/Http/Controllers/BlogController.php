<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $cacheKey = md5('blog.posts.' . $request->getQueryString() ?? 'all');

        $posts = Cache::remember($cacheKey, 3600, function () use ($request) {
            return Post::published()
            ->with(['author', 'category', 'tags'])
            ->when($request->category, fn($q) => $q->byCategory($request->category))
            ->when($request->tag, fn($q) => $q->byTag($request->tag))
            ->when($request->search, fn($q) => $q->where('title', 'like', "%{$request->search}%"))
            ->latest('published_at')
            ->paginate(12);
        });

        $categories = Cache::remember('blog.categories', 3600, function () {
            return Category::active()->withCount(['posts as published_posts_count' => function ($query) {
                $query->where('status', 'published')
                      ->where('published_at', '<=', now());
            }])->get();
        });

        $popularTags = Cache::remember('blog.popular_tags', 3600, function () {
            return Tag::withCount(['posts as published_posts_count' => function ($query) {
                    $query->where('status', 'published')
                          ->where('published_at', '<=', now());
                }])
                ->groupBy('tags.id')
                ->having('published_posts_count', '>', 0)
                ->orderBy('published_posts_count', 'desc')
                ->take(20)
                ->get();
        });

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'popularTags' => $popularTags,
            'filters' => $request->only(['category', 'tag', 'search']),
        ]);
    }

    public function show(Post $post)
    {
        if (!auth()->check() && ($post->status !== 'published' || $post->published_at > now())) {
            abort(404);
        }

        $post->load(['author', 'category', 'tags']);
        
        // Increment view count
        $this->incrementViews($post);

        $relatedPosts = Cache::remember("blog.related.{$post->id}", 3600, function () use ($post) {
            return Post::published()
                ->where('id', '!=', $post->id)
                ->where(function ($query) use ($post) {
                    $query->where('category_id', $post->category_id)
                          ->orWhereHas('tags', function ($q) use ($post) {
                              $q->whereIn('tags.id', $post->tags->pluck('id'));
                          });
                })
                ->with(['author', 'category'])
                ->latest('published_at')
                ->take(3)
                ->get();
        });

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    public function category(Category $category)
    {
        $posts = Post::published()
            ->where('category_id', $category->id)
            ->with(['author', 'category', 'tags'])
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Blog/Category', [
            'category' => $category,
            'posts' => $posts,
        ]);
    }

    public function tag(Tag $tag)
    {
        $posts = $tag->publishedPosts()
            ->with(['author', 'category', 'tags'])
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Blog/Tag', [
            'tag' => $tag,
            'posts' => $posts,
        ]);
    }

    private function incrementViews(Post $post)
    {
        $cacheKey = md5("post_views_{$post->id}");
        
        Cache::put($cacheKey, Cache::get($cacheKey, 0) + 1);
        
        if (Cache::get($cacheKey) % 10 === 0) {
            $post->increment('views_count', 10);
            Cache::forget($cacheKey);
        }
        
    }
}
