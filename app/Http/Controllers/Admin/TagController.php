<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $tags = Tag::withCount('posts')
            ->when($request->search, function($q) use ($request) {
                $q->where(function($query) use ($request) {
                    $query->where('name->en', 'like', "%{$request->search}%")
                          ->orWhere('name->ar', 'like', "%{$request->search}%");
                });
            })
            ->latest()
            ->paginate(8);

        return Inertia::render('Admin/Tags/Index', [
            'tags' => $tags,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tags/Create');
    }

    public function store(StoreTagRequest $request)
    {
        $validated = $request->validated();

        $tag = Tag::create($validated);

        return redirect()->route('admin.tags.show', $tag);
    }

    public function show(Tag $tag)
    {
        $tag->loadCount('posts');

        return Inertia::render('Admin/Tags/Show', [
            'tag' => $tag,
        ]);
    }

    public function edit(Tag $tag)
    {
        return Inertia::render('Admin/Tags/Edit', [
            'tag' => $tag,
        ]);
    }

    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $validated = $request->validated();

        $tag->update($validated);

        return redirect()->route('admin.tags.show', $tag);
    }

    public function destroy(Tag $tag)
    {
        // Check if tag has posts
        if ($tag->posts()->count() > 0) {
            return back()->withErrors([
                'tag' => 'Cannot delete tag that has posts. Please remove the tag from posts first.'
            ]);
        }

        $tag->delete();

        return redirect()->route('admin.tags.index');
    }
}
