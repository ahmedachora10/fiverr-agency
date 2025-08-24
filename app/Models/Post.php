<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;

class Post extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'body',
        'author_id',
        'category_id',
        'status',
        'published_at',
        'featured_image',
        'meta_title',
        'meta_description',
        'canonical_url',
        'og_title',
        'og_description',
        'og_image',
        'no_index',
        'views_count',
        'reading_time_minutes',
    ];

    public $translatable = ['title', 'slug', 'excerpt', 'body'];

    protected $casts = [
        'published_at' => 'datetime',
        'no_index' => 'boolean',
        'views_count' => 'integer',
        'reading_time_minutes' => 'integer',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Post $post) {
            $currentLocale = app()->getLocale();
            
            // Generate slug from title if not provided
            if (empty($post->getTranslation('slug', $currentLocale))) {
                $title = $post->getTranslation('title', $currentLocale);
                if ($title) {
                    $baseSlug = Str::slug($title);
                    $uniqueSlug = self::generateUniqueSlug($baseSlug);
                    $post->setTranslation('slug', $currentLocale, $uniqueSlug);
                }
            }

            if (empty($post->reading_time_minutes)) {
                $body = $post->getTranslation('body', $currentLocale);
                if ($body) {
                    $post->reading_time_minutes = self::calculateReadingTime($body);
                }
            }

            if (empty($post->getTranslation('excerpt', $currentLocale))) {
                $body = $post->getTranslation('body', $currentLocale);
                if ($body) {
                    $post->setTranslation('excerpt', $currentLocale, Str::limit(strip_tags($body), 160));
                }
            }
        });

        static::updating(function (Post $post) {
            $currentLocale = app()->getLocale();
            
            // Update slug only if title changed and slug is empty for current locale
            if ($post->isDirty('title') && empty($post->getTranslation('slug', $currentLocale))) {
                $title = $post->getTranslation('title', $currentLocale);
                if ($title) {
                    $baseSlug = Str::slug($title);
                    $uniqueSlug = self::generateUniqueSlug($baseSlug, $post->id);
                    $post->setTranslation('slug', $currentLocale, $uniqueSlug);
                }
            }

            if ($post->isDirty('body')) {
                $body = $post->getTranslation('body', $currentLocale);
                if ($body) {
                    $post->reading_time_minutes = self::calculateReadingTime($body);
                    
                    if (empty($post->getTranslation('excerpt', $currentLocale))) {
                        $post->setTranslation('excerpt', $currentLocale, Str::limit(strip_tags($body), 160));
                    }
                }
            }
        });

        static::retrieved(function (Post $post) {
            $post->image = asset($post->featured_image);
            // Don't override translatable fields - let spatie/laravel-translatable handle them
            // The translatable trait will automatically return the correct locale or full array as needed
        });

    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                    ->where('published_at', '<=', now());
    }

    public function scopeByCategory($query, $categorySlug)
    {
        return $query->whereHas('category', function ($q) use ($categorySlug) {
            $q->where('slug', $categorySlug);
        });
    }

    public function scopeByTag($query, $tagSlug)
    {
        return $query->whereHas('tags', function ($q) use ($tagSlug) {
            $q->where('slug', $tagSlug);
        });
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
        return $this->attributes['meta_title'] ?? $this->title;
    }

    public function getMetaDescriptionAttribute(): ?string
    {
        return $this->attributes['meta_description'] ?? $this->excerpt;
    }

    public function getOgTitleAttribute(): ?string
    {
        return $this->attributes['og_title'] ?? $this->title;
    }

    public function getOgDescriptionAttribute(): ?string
    {
        return $this->attributes['og_description'] ?? $this->excerpt;
    }

    public function getOgImageAttribute(): ?string
    {
        return $this->attributes['og_image'] ?? $this->featured_image;
    }

    public function incrementViews(): void
    {
        $this->increment('views_count');
    }

    private static function calculateReadingTime(string $content): int
    {
        $wordCount = str_word_count(strip_tags($content));
        $wordsPerMinute = 200; // Average reading speed
        
        return max(1, (int) ceil($wordCount / $wordsPerMinute));
    }

    /**
     * Generate a unique slug for the post
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
