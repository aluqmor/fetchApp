<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
//use Illuminate\Support\Facades\Auth;
//use Illuminate\Container\Attributes\Auth;

Route::get('/', [ProductController::class, 'main']);
//Route::get('product/messi/22', [ProductController::class, 'index']);
Route::resource('product', ProductController::class)->except(['create', 'edit']);
//Route::get('fetch', [ProductController::class, 'fetch']);
//Route::get('product1', [ProductController::class, 'index1']);

//Auth::routes();
//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::post('login', [UserController::class, 'login'])->name('login');
Route::post('logout', [UserController::class, 'logout'])->name('logout');
Route::post('register', [UserController::class, 'register'])->name('register');