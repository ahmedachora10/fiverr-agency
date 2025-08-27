<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;
use App\Traits\Slugable;

class Post extends Model
{
    use HasFactory, HasTranslations, Slugable;

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
                    $baseSlug = Str::slug($title, '-', $currentLocale);
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

            if($post->status === 'published' && empty($post->published_at)) {
                $post->published_at = now();
            }
        });

        static::updating(function (Post $post) {
            $currentLocale = app()->getLocale();
            
            // Update slug only if title changed and slug is empty for current locale
            if ($post->isDirty('title') && empty($post->getTranslation('slug', $currentLocale))) {
                $title = $post->getTranslation('title', $currentLocale);
                if ($title) {
                    $baseSlug = Str::slug($title, '-', $currentLocale);
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

            if($post->isDirty('status') && $post->status === 'published' && empty($post->published_at)) {
                $post->published_at = now();
            }
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
            $q->bySlug($categorySlug);
        });
    }

    public function scopeByTag($query, $tagSlug)
    {
        return $query->whereHas('tags', function ($q) use ($tagSlug) {
            $q->bySlug($tagSlug);
        });
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
}
