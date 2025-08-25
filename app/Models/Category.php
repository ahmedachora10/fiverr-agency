<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;

class Category extends Model
{
    use HasFactory, HasTranslations;

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

    public function scopeBySlug($query, $slug)
    {
        return $query->where(function ($q) use ($slug) {
            $q->where('slug->en', $slug)
              ->orWhere('slug->ar', $slug);
        });
    }

    /**
     * Retrieve the model for a bound value.
     */
    public function resolveRouteBinding($value, $field = null)
    {
        // If field is specified and it's 'slug', handle JSON slug lookup
        if ($field === 'slug') {
            return $this->bySlug($value)->first();
        }

        // Default behavior for other fields
        return parent::resolveRouteBinding($value, $field);
    }

    public function getMetaTitleAttribute(): ?string
    {
        return $this->attributes['meta_title'] ?? $this->name;
    }

    public function getMetaDescriptionAttribute(): ?string
    {
        return $this->attributes['meta_description'] ?? $this->description;
    }

    /**
     * Generate a unique slug for the category
     */
    private static function generateUniqueSlug(string $baseSlug, ?int $excludeId = null): string
    {
        $slug = $baseSlug;
        $counter = 1;

        while (static::bySlug($slug)->when($excludeId, function ($query, $excludeId) {
            return $query->where('id', '!=', $excludeId);
        })->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}
