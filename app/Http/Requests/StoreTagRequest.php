<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTagRequest extends FormRequest
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
            'name' => 'required|array',
            'name.en' => 'required|string|max:255',
            'name.ar' => 'nullable|string|max:255',
            'slug' => 'required|array',
            'slug.en' => 'required|string|max:255|unique:tags,slug->en',
            'slug.ar' => 'nullable|string|max:255|unique:tags,slug->ar',
            'description' => 'nullable|array',
            'description.en' => 'nullable|string',
            'description.ar' => 'nullable|string',
            'color' => 'required|string|max:7|regex:/^#[0-9A-Fa-f]{6}$/',
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
            'color.regex' => 'The color must be a valid hex color code (e.g., #FF0000).',
            'meta_title.max' => 'The meta title should not exceed 60 characters for optimal SEO.',
            'meta_description.max' => 'The meta description should not exceed 160 characters for optimal SEO.',
        ];
    }
}
