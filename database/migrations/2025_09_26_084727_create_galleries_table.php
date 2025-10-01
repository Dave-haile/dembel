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

            // Relate gallery items to floors
            $table->foreignId('floor_id')->nullable()->constrained('floors')->nullOnDelete();

            // If 'sector' is another table, make it a foreignId
            $table->unsignedInteger('sector')->nullable();

            $table->text('description')->nullable();
            $table->string('image');
            $table->boolean('approval')->default(false);

            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery');
    }
};
