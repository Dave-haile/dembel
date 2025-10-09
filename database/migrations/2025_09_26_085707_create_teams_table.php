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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name_en', 200);
            $table->string('name_am', 200);
            $table->string('position', 200);

            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('photo');

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
        Schema::dropIfExists('team');
    }
};
