<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\EnsureAdmin;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', EnsureAdmin::class])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');

    Route::resource('/admin/products', ProductController::class);
    Route::resource('/admin/categories', CategoryController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
