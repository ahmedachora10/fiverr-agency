<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;
use App\Traits\Slugable;

class Category extends Model
{
    use HasFactory, HasTranslations, Slugable;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'color',
        'meta_title',
        'meta_description',
        'is_active',
    ];

    public $translatable = ['name', 'slug', 'description'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Category $category) {
            $currentLocale = app()->getLocale();
            
            // Generate slug from name if not provided
            if (empty($category->getTranslation('slug', $currentLocale))) {
                $name = $category->getTranslation('name', $currentLocale);
                if ($name) {
                    $baseSlug = Str::slug($name);
                    $uniqueSlug = self::generateUniqueSlug($baseSlug);
                    $category->setTranslation('slug', $currentLocale, $uniqueSlug);
                }
            }
        });

        static::updating(function (Category $category) {
            $currentLocale = app()->getLocale();
            
            // Update slug only if name changed and slug is empty for current locale
            if ($category->isDirty('name') && empty($category->getTranslation('slug', $currentLocale))) {
                $name = $category->getTranslation('name', $currentLocale);
                if ($name) {
                    $baseSlug = Str::slug($name);
                    $uniqueSlug = self::generateUniqueSlug($baseSlug, $category->id);
                    $category->setTranslation('slug', $currentLocale, $uniqueSlug);
                }
            }
        });
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function publishedPosts(): HasMany
    {
        return $this->hasMany(Post::class)->where('status', 'published')->where('published_at', '<=', now());
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    

    public function getMetaTitleAttribute(): ?string
    {
        return $this->attributes['meta_title'] ?? $this->name;
    }

    public function getMetaDescriptionAttribute(): ?string
    {
        return $this->attributes['meta_description'] ?? $this->description;
    }
}
