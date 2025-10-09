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
        Schema::create('meqs_readings', function (Blueprint $table) {
            $table->id();
            $table->string('device_id', 100)->nullable();
            $table->date('starting_date')->nullable();
            $table->date('ending_date')->nullable();
            $table->decimal('amount', 12, 2)->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meqs_readings');
    }
};
