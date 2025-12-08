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
        Schema::create('applications', function (Blueprint $table) {
            $table->id(); // auto-increment primary key
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('phone', 20);
            $table->string('alt_phone', 20)->nullable();
            $table->date('birth_date')->nullable();
            $table->string('email', 100);
            $table->string('photo')->nullable(); // store file path, not raw data
            $table->string('subcity', 50)->nullable();
            $table->string('woreda', 50)->nullable();
            $table->string('city', 100)->nullable();
            $table->enum('marital_status', ['Single', 'Married', 'Divorced', 'Widowed'])->nullable();
            $table->string('education_background', 100)->nullable();
            $table->foreignId('vacancy_id')->constrained('vacancies')->onDelete('cascade');
            $table->string('cv')->nullable(); // file path to CV 
            //experiance
            $table->string('company', 150)->nullable();
            $table->string('position', 100)->nullable();
            $table->text('description')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
