<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|array|max:255',
            'slug' => 'nullable|array|max:255',
            'description' => 'nullable|array',
            'color' => 'required|string|max:7|regex:/^#[0-9A-Fa-f]{6}$/',
            'is_active' => 'boolean',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The category name is required.',
            'name.*.max' => 'The category name may not be greater than 255 characters.',
            'slug.*.unique' => 'This slug is already taken.',
            'description.*.string' => 'The description must be a valid text.',
            'color.regex' => 'The color must be a valid hex color code (e.g., #FF0000).',
            'meta_title.max' => 'The meta title should not exceed 60 characters for optimal SEO.',
            'meta_description.max' => 'The meta description should not exceed 160 characters for optimal SEO.',
        ];
    }
}
