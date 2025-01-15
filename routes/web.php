<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ProductController::class, 'main']);
Route::resource('product', ProductController::class)->except(['edit', 'create']);
// Route::get('fetch', [ProductController::class, 'fetch']);
Route::get('product1', [ProductController::class, 'index1']);