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
        $products = Product::with('category')->latest()->get();
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
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $image = $request->file('image');
        $imagePath = $image->store('products', 'public');

        $data = $request->all();
        $data['image'] = $imagePath;
        
        Product::create($data);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function edit(string $id)
    {
        $product = Product::findOrFail($id);
        $categories = Category::all();
        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, string $id) 
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('image')) {
            Storage::disk ('public')->delete($product->image);

            $image = $request->file('image');
            $imagePath = $image->store('products', 'public');
            $product->update([
                'category_id' => $request->input('category_id'),
                'image' => $imagePath,
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'stock' => $request->input('stock'),
            ]);
        } else {
            $product->update([
                'category_id' => $request->input('category_id'),
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'stock' => $request->input('stock'),
            ]);
        }

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
        $products = Product::with('category')->latest()->get();
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
