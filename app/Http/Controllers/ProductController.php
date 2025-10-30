<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // public function dashboard() {
    //     return Inertia::render('admin/dashboard');
    // }

    public function index() 
    {
        $products = Product::with('categories')->latest()->get();
        $categories = Category::all();
        return Inertia::render('admin/products/index', [
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('admin/products/create', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'categories' => 'required|array|min:1',
            'categories.*' => 'exists:categories,id',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'title' => 'required|string|max:255',
            'badge' => 'required|in:new,sale,bestseller,limited',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0|max:10000000000',
            'stock' => 'required|integer|min:0',
        ], [
            'image.mimes' => 'Format gambar harus JPG, JPEG, atau PNG.',
        ]);

        $image = $request->file('image');
        $imagePath = $image->store('products', 'public');

        $firstCategoryId = collect($request->input('categories'))->map(fn($v) => (int)$v)->first();

        $product = Product::create([
            'category_id' => $firstCategoryId, // legacy column compatibility
            'image' => $imagePath,
            'title' => $request->input('title'),
            'badge' => $request->input('badge'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
        ]);

        $product->categories()->sync($request->input('categories'));

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function edit(string $id)
    {
        $product = Product::with('categories:id')->findOrFail($id);
        $categories = Category::all();
        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, string $id) 
    {
        $request->validate([
            'categories' => 'required|array|min:1',
            'categories.*' => 'exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'title' => 'required|string|max:255',
            'badge' => 'required|in:new,sale,bestseller,limited',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0|max:10000000000',
            'stock' => 'required|integer|min:0',
        ], [
            'image.mimes' => 'Format gambar harus JPG, JPEG, atau PNG.',
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($product->image);

            $image = $request->file('image');
            $imagePath = $image->store('products', 'public');
            $product->image = $imagePath;
        }

        $firstCategoryId = collect($request->input('categories'))->map(fn($v) => (int)$v)->first();

        $product->update([
            'category_id' => $firstCategoryId, // legacy column compatibility
            'title' => $request->input('title'),
            'badge' => $request->input('badge'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
        ]);

        $product->categories()->sync($request->input('categories'));

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        Storage::disk('public')->delete($product->image);
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }

    public function userDashboard()
    {
        $products = Product::with('categories')->latest()->get();
        $categories = Category::all();
        return Inertia::render('dashboard', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function adminDashboard()
    {
        $productCount = Product::count();
        $categoryCount = Category::count();

        return Inertia::render('admin/dashboard', [
            'productCount' => $productCount,
            'categoryCount' => $categoryCount,
        ]);
    }
}
