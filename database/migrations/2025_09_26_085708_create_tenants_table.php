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
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name', 150);
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('location')->nullable();
            $table->string('hours', 100)->nullable();
            $table->text('fullDescription')->nullable();
            $table->foreignId('floor_id')->constrained('floors')->nullable();
            $table->string('room_no')->nullable();
            $table->enum('building', ['Dembel', 'Dembel Extension'])->default('Dembel');
            $table->string('phone', 50)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('website', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
