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
        Schema::table('categories', function (Blueprint $table) {
            // Change name, slug, and description to JSON for translations
            $table->json('name')->change();
            $table->json('slug')->change();
            $table->json('description')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            // Revert back to string/text fields
            $table->string('name')->change();
            $table->string('slug')->change();
            $table->text('description')->nullable()->change();
        });
    }
};
