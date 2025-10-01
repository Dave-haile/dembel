<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Test', 'icon' => '✅'],
            ['name' => 'All', 'icon' => '🛍️'],
            ['name' => 'Fashion', 'icon' => '👗'],
            ['name' => 'Jewelry', 'icon' => '💍'],
            ['name' => 'Beauty', 'icon' => '💄'],
            ['name' => 'Electronics', 'icon' => '📱'],
            ['name' => 'Home & Living', 'icon' => '🏠'],
            ['name' => 'Entertainment', 'icon' => '🎮'],
            ['name' => 'Restaurants', 'icon' => '🍽️'],
            ['name' => 'Health & Fitness', 'icon' => '💪'],
            ['name' => 'Books & Stationery', 'icon' => '📚'],
            ['name' => 'Sports & Outdoors', 'icon' => '⚽'],
            ['name' => 'Toys & Kids', 'icon' => '🧸'],
            ['name' => 'Grocery & Essentials', 'icon' => '🛒'],
        ]);
    }
}
