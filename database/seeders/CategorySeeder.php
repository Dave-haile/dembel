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
            ['id' => 0, 'name' => 'Test', 'icon' => '✅'],
            ['id' => 1, 'name' => 'All', 'icon' => '🛍️'],
            ['id' => 2, 'name' => 'Fashion', 'icon' => '👗'],
            ['id' => 3, 'name' => 'Jewelry', 'icon' => '💍'],
            ['id' => 4, 'name' => 'Beauty', 'icon' => '💄'],
            ['id' => 5, 'name' => 'Electronics', 'icon' => '📱'],
            ['id' => 6, 'name' => 'Home & Living', 'icon' => '🏠'],
            ['id' => 7, 'name' => 'Entertainment', 'icon' => '🎮'],
            ['id' => 8, 'name' => 'Restaurants', 'icon' => '🍽️'],
            ['id' => 9, 'name' => 'Health & Fitness', 'icon' => '💪'],
            ['id' => 10, 'name' => 'Books & Stationery', 'icon' => '📚'],
            ['id' => 11, 'name' => 'Sports & Outdoors', 'icon' => '⚽'],
            ['id' => 12, 'name' => 'Toys & Kids', 'icon' => '🧸'],
            ['id' => 13, 'name' => 'Grocery & Essentials', 'icon' => '🛒'],
        ]);
    }
}
