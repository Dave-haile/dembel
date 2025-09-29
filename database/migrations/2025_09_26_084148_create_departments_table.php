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
        Schema::create('departments', function (Blueprint $table) {
            $table->id();

            $table->string('title_en');
            $table->string('title_am');
            $table->string('sub_title_en');
            $table->string('sub_title_am');

            $table->longText('body_en');
            $table->longText('body_am');

            $table->string('icon')->nullable(); // could be emoji or path
            $table->string('image')->nullable();

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
        Schema::dropIfExists('departments');
    }
};
