<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::with(['author', 'category', 'tags'])
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->when($request->category, fn($q) => $q->byCategory($request->category))
            ->when($request->search, fn($q) => $q->where('title', 'like', "%{$request->search}%"))
            ->latest()
            ->paginate(20);

        $categories = Category::active()->get();

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'filters' => $request->only(['status', 'category', 'search']),
        ]);
    }

    public function create()
    {
        $categories = Category::active()->get();
        $tags = Tag::all();

        return Inertia::render('Admin/Posts/Create', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }

        if ($request->hasFile('og_image')) {
            $validated['og_image'] = $request->file('og_image')->store('posts/og', 'public');
        }

        $validated['author_id'] = Auth::id();

        $post = Post::create($validated);

        if ($request->has('tags')) {
            $post->tags()->sync($request->tags);
        }

        return redirect()->route('admin.posts.show', $post);
    }

    public function show(Post $post)
    {
        $post->load(['author', 'category', 'tags']);

        return Inertia::render('Admin/Posts/Show', [
            'post' => $post,
        ]);
    }

    public function edit(Post $post)
    {
        $categories = Category::active()->get();
        $tags = Tag::all();
        $post->load('tags');

        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $validated = $request->validated();

        if($request->slug == $post->slug){
            unset($validated['slug']);
        }

        
        if ($request->hasFile('featured_image')) {
            if ($post->featured_image) {
                Storage::disk('public')->delete($post->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }
        
        if ($request->hasFile('og_image')) {
            if ($post->og_image && $post->og_image !== $post->featured_image) {
                Storage::disk('public')->delete($post->og_image);
            }
            $validated['og_image'] = $request->file('og_image')->store('posts/og', 'public');
        }

        dd($validated);
        
        $post->update($validated);

        if ($request->has('tags')) {
            $post->tags()->sync($request->tags);
        }

        return redirect()->route('admin.posts.show', $post);
    }

    public function destroy(Post $post)
    {
        if ($post->featured_image) {
            Storage::disk('public')->delete($post->featured_image);
        }

        if ($post->og_image && $post->og_image !== $post->featured_image) {
            Storage::disk('public')->delete($post->og_image);
        }

        $post->delete();

        return redirect()->route('admin.posts.index');
    }
}
