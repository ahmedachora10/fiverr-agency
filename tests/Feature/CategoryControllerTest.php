<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can edit category', function () {
    $this->actingAs($user = User::factory()->create());

    $category = Category::factory()->create();

    $response = $this->get(route('admin.categories.edit', $category));

    $response->assertStatus(200);
});

it('can create category', function () {
    $this->actingAs($user = User::factory()->create());

    $response = $this->post(route('admin.categories.store'), [
        'name' => 'Test Category',
        'slug' => 'test-category',
        'description' => 'Test category description',
        'color' => '#FF0000',
        'meta_title' => 'Test category meta title',
        'meta_description' => 'Test category meta description',
        'is_active' => true,
    ]);

    $response->assertStatus(302);
});