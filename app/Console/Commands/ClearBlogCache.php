<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class ClearBlogCache extends Command
{
    protected $signature = 'blog:clear-cache';
    protected $description = 'Clear all blog-related cache entries';

    public function handle()
    {
        $patterns = [
            'blog.*',
            'sitemap.*',
            'robots.*',
            'post_views_*',
        ];

        $cleared = 0;
        foreach ($patterns as $pattern) {
            $keys = Cache::getRedis()->keys($pattern);
            foreach ($keys as $key) {
                Cache::forget($key);
                $cleared++;
            }
        }

        $this->info("Cleared {$cleared} blog cache entries.");
        
        return 0;
    }
}
