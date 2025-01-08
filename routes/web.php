<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::resource('product', ProductController::class)->except(['edit', 'create']);
Route::get('fetch', [ProductController::class, 'fetch']);