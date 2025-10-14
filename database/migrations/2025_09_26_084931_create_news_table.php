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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('category', 50);

            $table->string('title_en');
            $table->string('title_am');
            $table->string('sub_title_en')->nullable();
            $table->string('sub_title_am')->nullable();

            $table->string('image')->nullable();
            $table->string('pdf_file')->nullable();

            $table->json('gallery')->nullable();

            $table->text('excerpt_en')->nullable(); // short summary
            $table->text('excerpt_am')->nullable(); // short summary
            $table->longText('content_en')->nullable();
            $table->longText('content_am')->nullable();

            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();

            $table->boolean('approval')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
