<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class HomeController extends Controller
{
    public function dashboard() {
        $products = Product::with('category')->latest()->take(6)->get();
        $categories = Category::all();
        return Inertia::render('dashboard', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function detailProduct($id) {
        $product = Product::with('category')->findOrFail($id);
        return Inertia::render('product-detail', [
            'product' => $product,
        ]);
    }
}
