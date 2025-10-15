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
        Schema::create('malls', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('year_built')->nullable();
            $table->integer('floors')->nullable();
            $table->decimal('total_area_sqm', 10, 2)->nullable();
            $table->integer('total_shops')->nullable();
            $table->text('description')->nullable();
            $table->json('floors_directory')->nullable();
            $table->json('facilities')->nullable();
            $table->json('gallery')->nullable();
            $table->string('virtual_tour_url')->nullable();
            $table->string('address')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('contact_email')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('malls');
    }
};
