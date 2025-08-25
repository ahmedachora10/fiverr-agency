<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;
use App\Traits\Slugable;

class Tag extends Model
{
    use HasFactory, HasTranslations, Slugable;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'color',
        'meta_title',
        'meta_description',
    ];

    public $translatable = ['name', 'slug', 'description'];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Tag $tag) {
            // Handle translatable slug generation
            foreach (config('app.locales', ['en']) as $locale) {
                $name = $tag->getTranslation('name', $locale);
                if ($name && empty($tag->getTranslation('slug', $locale))) {
                    $tag->setTranslation('slug', $locale, Str::slug($name));
                }
            }
        });

        static::updating(function (Tag $tag) {
            // Handle translatable slug generation on update
            if ($tag->isDirty('name')) {
                foreach (config('app.locales', ['en']) as $locale) {
                    $name = $tag->getTranslation('name', $locale);
                    if ($name && empty($tag->getTranslation('slug', $locale))) {
                        $tag->setTranslation('slug', $locale, Str::slug($name));
                    }
                }
            }
        });
    }

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class)->withTimestamps();
    }

    public function publishedPosts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class)->where('status', 'published')->where('published_at', '<=', now())->withTimestamps();
    }
}
