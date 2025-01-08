<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        for ($i=0; $i < 200; $i++) { 
            $product = new Product();
            $product->name = fake()->word();
            $product->price = fake()->numberBetween(1, 200);
            $product->save();
        }
    }
}
