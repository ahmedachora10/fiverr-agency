<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tags', function (Blueprint $table) {
            // Change translatable fields to JSON
            $table->json('name')->change();
            $table->json('slug')->change();
            $table->json('description')->nullable()->change();
            
            // Add meta fields for SEO
            $table->string('meta_title', 60)->nullable()->after('color');
            $table->text('meta_description')->nullable()->after('meta_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tags', function (Blueprint $table) {
            // Revert translatable fields back to string/text
            $table->string('name')->change();
            $table->string('slug')->change();
            $table->text('description')->nullable()->change();
            
            // Remove meta fields
            $table->dropColumn(['meta_title', 'meta_description']);
        });
    }
};
