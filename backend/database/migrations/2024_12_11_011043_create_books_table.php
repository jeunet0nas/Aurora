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
        Schema::create('books', function (Blueprint $table) {
            $table->id('book_id');
            $table->string('book_name');
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('language');
            $table->integer('publish_year');
            $table->integer('page');
            $table->integer('book_qty');
            $table->integer('book_price');
            $table->longText('desc');
            $table->string('thumbnail');
            $table->string('status')->default(1);
            $table->foreignId('author_id')->constrained('authors', 'author_id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
