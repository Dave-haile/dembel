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
        Schema::table('tenants', function (Blueprint $table) {
            // Add room_no column
            $table->string('room_no')->nullable()->after('category_id');
            
            // Change floor to floor_id foreign key
            $table->renameColumn('floor', 'floor_id');
            $table->foreign('floor_id')->references('id')->on('floors')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            // Drop the foreign key and column
            $table->dropForeign(['floor_id']);
            $table->renameColumn('floor_id', 'floor');
            
            // Drop the room_no column
            $table->dropColumn('room_no');
        });
    }
};
