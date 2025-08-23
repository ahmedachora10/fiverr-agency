<?php

use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Index', [
        'posts' => Post::with(['category', 'tags', 'author'])->take(6)->get(),
    ]);
})->name('home');

Route::middleware([
    'auth',
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


// Include blog routes
require __DIR__.'/blog.php';

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
