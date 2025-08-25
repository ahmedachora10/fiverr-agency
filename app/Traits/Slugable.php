<?php

namespace App\Traits;

trait Slugable
{
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
