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
            $table->string('title', 100);
            $table->string('place_of_work', 50);
            $table->string('category', 100);
            $table->string('employment_type', 20);

            $table->date('posted_date');
            $table->date('closing_date');

            $table->text('job_description');
            $table->text('how_to_apply');
            $table->text('qualification');
            $table->text('skill_req');

            $table->string('salary', 50);
            $table->string('term_of_employment', 50);
            $table->string('contact', 20);
            $table->text('address');

            $table->integer('required_candidates');
            $table->boolean('approval')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancy');
    }
};
