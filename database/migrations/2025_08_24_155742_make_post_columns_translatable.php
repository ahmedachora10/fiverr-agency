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
        Schema::table('posts', function (Blueprint $table) {
            $table->json('title')->change();
            $table->json('slug')->change();
            $table->json('excerpt')->nullable()->change();
            $table->json('body')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->string('title')->change();
            $table->string('slug')->change();
            $table->text('excerpt')->nullable()->change();
            $table->longText('body')->change();
        });
    }
};
