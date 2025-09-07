<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class SitemapController extends Controller
{
    public function index()
    {
        $sitemap = Cache::remember('sitemap.xml', now()->addDay(), function () {
            $posts = Post::published()
                ->select(['slug', 'updated_at', 'published_at'])
                ->get();

            $categories = Category::active()
                ->select(['slug', 'updated_at'])
                ->get();

            $tags = Tag::select(['slug', 'updated_at'])
                ->withCount('publishedPosts')
                ->get();

            $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
            $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

            // Homepage
            $xml .= $this->addUrl(url('/'), now(), 'daily', '1.0');
            $xml .= $this->addUrl(route('blog.index'), now(), 'daily', '0.9');

            // Posts
            foreach ($posts as $post) {
                foreach (config('app.locales') as $locale) {
                    $xml .= $this->addUrl(
                        route('blog.show', $post->getTranslation('slug', $locale)),
                        $post->updated_at,
                        'weekly',
                        '0.8'
                    );
                }
            }

            // Categories
            foreach ($categories as $category) {
                foreach (config('app.locales') as $locale) {
                    $xml .= $this->addUrl(
                        route('blog.category', $category->getTranslation('slug', $locale)),
                        $category->updated_at,
                        'weekly',
                        '0.7'
                    );
                }
            }

            // Tags
            foreach ($tags as $tag) {
                foreach (config('app.locales') as $locale) {
                    $xml .= $this->addUrl(
                        route('blog.tag', $tag->getTranslation('slug', $locale)),
                        $tag->updated_at,
                        'monthly',
                        '0.6'
                    );
                }
            }

            $xml .= '</urlset>';

            return $xml;
        });

        return response($sitemap, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }

    public function robots()
    {
        $robots = Cache::remember('robots.txt', 86400, function () {
            $content = "User-agent: *\n";
            $content .= "Allow: /\n";
            $content .= "Disallow: /admin/\n";
            $content .= "Disallow: /login\n";
            $content .= "Disallow: /register\n";
            $content .= "\n";
            $content .= "Sitemap: " . route('sitemap') . "\n";

            return $content;
        });

        return response($robots, 200, [
            'Content-Type' => 'text/plain',
        ]);
    }

    private function addUrl($url, $lastmod, $changefreq, $priority)
    {
        $xml = '  <url>' . PHP_EOL;
        $xml .= '    <loc>' . htmlspecialchars($url) . '</loc>' . PHP_EOL;
        $xml .= '    <lastmod>' . $lastmod->toISOString() . '</lastmod>' . PHP_EOL;
        $xml .= '    <changefreq>' . $changefreq . '</changefreq>' . PHP_EOL;
        $xml .= '    <priority>' . $priority . '</priority>' . PHP_EOL;
        $xml .= '  </url>' . PHP_EOL;

        return $xml;
    }
}
