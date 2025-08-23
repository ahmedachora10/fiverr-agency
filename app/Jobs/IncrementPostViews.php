<?php

namespace App\Jobs;

use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;

class IncrementPostViews implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public int $postId
    ) {}

    public function handle(): void
    {
        $cacheKey = "post_views_{$this->postId}";
        
        // Increment cached view count
        $views = Cache::increment($cacheKey, 1);
        
        // Update database every 10 views to reduce DB writes
        if ($views % 10 === 0) {
            Post::where('id', $this->postId)->increment('views_count', 10);
            Cache::forget($cacheKey);
        }
    }
}
