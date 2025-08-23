<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        try {
            $categories = Category::withCount('posts')
                ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
                ->when($request->status !== null, function($q) use ($request) {
                    return $request->status === 'active' 
                        ? $q->where('is_active', true)
                        : $q->where('is_active', false);
                })
                ->latest()
                ->paginate(20);

            return Inertia::render('Admin/Categories/Index', [
                'categories' => $categories,
                'filters' => $request->only(['search', 'status']),
            ]);
        } catch (\Exception $e) {
            \Log::error('CategoryController@index error: ' . $e->getMessage());
            throw $e;
        }
    }

    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function store(StoreCategoryRequest $request)
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active', true);

        $category = Category::create($validated);

        return redirect()->route('admin.categories.show', $category);
    }

    public function show(Category $category)
    {
        $category->loadCount('posts');

        return Inertia::render('Admin/Categories/Show', [
            'category' => $category,
        ]);
    }

    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active', true);

        $category->update($validated);

        return redirect()->route('admin.categories.show', $category);
    }

    public function destroy(Category $category)
    {
        // Check if category has posts
        if ($category->posts()->count() > 0) {
            return back()->withErrors([
                'category' => 'Cannot delete category that has posts. Please reassign or delete the posts first.'
            ]);
        }

        $category->delete();

        return redirect()->route('admin.categories.index');
    }
}
