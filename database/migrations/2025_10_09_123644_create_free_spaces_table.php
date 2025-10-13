<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('free_spaces', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->foreignId('floor_id')->nullable()->constrained('floors')->nullOnDelete();
            $table->string('wing_or_zone')->nullable();
            $table->decimal('area_sqm', 10, 2)->nullable();
            $table->string('dimensions')->nullable();
            $table->boolean('has_window')->default(false);
            $table->boolean('has_ventilation')->default(false);
            $table->boolean('has_plumbing')->default(false);
            $table->boolean('has_electricity')->default(true);
            $table->text('features')->nullable();
            $table->decimal('monthly_rent', 12, 2)->nullable();
            $table->string('rent_currency')->default('ETB');
            $table->text('rent_includes')->nullable();
            $table->boolean('negotiable')->default(true);
            $table->string('thumbnail')->nullable();
            $table->json('gallery')->nullable();
            $table->string('virtual_tour_url')->nullable();
            $table->text('short_description')->nullable();
            $table->longText('full_description')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('slug')->unique();
            $table->enum('availability_status', ['available', 'reserved', 'occupied'])->default('available');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('free_spaces');
    }
};
