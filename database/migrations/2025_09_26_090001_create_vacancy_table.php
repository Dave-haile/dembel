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
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('title', 150);

            $table->string('department', 100)->nullable(); // optional: e.g. "Marketing", "Security"
            $table->string('employment_type', 30); // e.g. Full-time, Part-time, Contract
            $table->string('work_location', 100); // better than "place_of_work"
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();
            $table->string('currency', 10)->default('ETB');

            $table->text('job_description');
            $table->text('requirements')->nullable();
            $table->text('benefits')->nullable();
            $table->text('how_to_apply');

            $table->date('posted_date');
            $table->date('closing_date');

            $table->integer('number_of_positions')->default(1);
            $table->string('contact_email')->nullable();
            $table->string('contact_phone', 20)->nullable();
            $table->text('address')->nullable();
            $table->boolean('is_approved')->default(false);

            $table->string('slug')->unique();
            $table->string('thumbnail')->nullable(); // show job image or company logo

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
