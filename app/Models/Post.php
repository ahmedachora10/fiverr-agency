<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

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
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }

            if (empty($post->reading_time_minutes)) {
                $post->reading_time_minutes = self::calculateReadingTime($post->body);
            }

            if (empty($post->excerpt)) {
                $post->excerpt = Str::limit(strip_tags($post->body), 160);
            }
        });

        static::updating(function (Post $post) {
            if ($post->isDirty('title') && empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }

            if ($post->isDirty('body')) {
                $post->reading_time_minutes = self::calculateReadingTime($post->body);
                
                if (empty($post->excerpt)) {
                    $post->excerpt = Str::limit(strip_tags($post->body), 160);
                }
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
            $q->where('slug', $categorySlug);
        });
    }

    public function scopeByTag($query, $tagSlug)
    {
        return $query->whereHas('tags', function ($q) use ($tagSlug) {
            $q->where('slug', $tagSlug);
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
