<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('posts')->ignore($this->post->id)],
            'excerpt' => 'nullable|string',
            'body' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'status' => 'required|in:draft,scheduled,published,archived',
            'published_at' => 'nullable|date',
            'featured_image' => 'nullable|image|max:2048',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'canonical_url' => 'nullable|url|max:255',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string|max:255',
            'og_image' => 'nullable|image|max:2048',
            'no_index' => 'boolean',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The post title is required.',
            'title.max' => 'The post title may not be greater than 255 characters.',
            'slug.unique' => 'This slug is already taken.',
            'body.required' => 'The post content is required.',
            'category_id.exists' => 'The selected category is invalid.',
            'status.required' => 'The post status is required.',
            'status.in' => 'The post status must be one of: draft, scheduled, published, archived.',
            'published_at.date' => 'The publish date must be a valid date.',
            'featured_image.image' => 'The featured image must be an image file.',
            'featured_image.max' => 'The featured image may not be greater than 2MB.',
            'meta_title.max' => 'The meta title may not be greater than 255 characters.',
            'meta_description.max' => 'The meta description may not be greater than 255 characters.',
            'canonical_url.url' => 'The canonical URL must be a valid URL.',
            'og_title.max' => 'The OG title may not be greater than 255 characters.',
            'og_description.max' => 'The OG description may not be greater than 255 characters.',
            'og_image.image' => 'The OG image must be an image file.',
            'og_image.max' => 'The OG image may not be greater than 2MB.',
            'tags.array' => 'Tags must be an array.',
            'tags.*.exists' => 'One or more selected tags are invalid.',
        ];
    }
}
