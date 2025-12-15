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
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->foreignId('floor_id')->nullable()->constrained('floors')->nullOnDelete();
            $table->string('sector')->nullable();
            $table->text('description')->nullable();
            $table->string('image');
            $table->boolean('approval')->default(false);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
        // instagram images
        Schema::create('instagram_images', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('caption')->nullable();
            $table->string('hashtags')->nullable();
            $table->boolean('approval')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galleries');
        Schema::dropIfExists('instagram_images');
    }
};
