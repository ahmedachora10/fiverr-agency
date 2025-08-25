<?php

use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Actions\SwitchLanguage;
use App\Http\Controllers\Api\Admin\UploadController;


Route::get('/', function () {
    return Inertia::render('Index', [
        'posts' => Post::with(['category', 'tags', 'author'])->take(6)->get(),
    ]);
})->name('home');

Route::get('/switch-language/{language}', SwitchLanguage::class)->name('switch-language');

// API routes for EditorJS
Route::middleware(['auth', 'verified'])->prefix('api/admin')->group(function () {
    Route::post('/upload-image', [UploadController::class, 'uploadImage'])->name('api.admin.upload-image');
    Route::post('/upload-image-by-url', [UploadController::class, 'uploadImageByUrl'])->name('api.admin.upload-image-by-url');
});

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
