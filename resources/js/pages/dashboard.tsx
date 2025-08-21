import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Define the Product and PageProps types
type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    category?: {
        id: number;
        name: string;
    };
};

type Category = {
    id: number;
    name: string;
};

type PageProps = {
    products: Product[];
    categories: Category[];
};

export default function Dashboard() {
    const { products, categories } = usePage<PageProps>().props;
    const [selectedCategory, setSelectedCategory] = React.useState<number | 'all'>('all');

    // Filter products by selected category
    const filteredProducts = selectedCategory === 'all' ? products : products.filter((product) => product.category?.id === selectedCategory);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-8 p-6">
                {/* Banner Section */}
                {/* ...existing code... */}

                {/* Category Filter */}
                <div className="mb-4 flex items-center gap-4">
                    <label htmlFor="category-filter" className="font-medium text-gray-700">
                        Filter by Category:
                    </label>
                    <select
                        id="category-filter"
                        className="rounded border px-3 py-2"
                        value={selectedCategory}
                        onChange={(e) => {
                            const val = e.target.value;
                            setSelectedCategory(val === 'all' ? 'all' : Number(val));
                        }}
                    >
                        <option value="all">All Categories</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        )) || []}
                    </select>
                </div>

                {/* Featured Products Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Featured Instruments</h2>
                            <p className="mt-1 text-gray-600">Handpicked selections for music enthusiasts</p>
                        </div>
                        <Button variant="outline" className="hidden md:flex">
                            View All
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-gray-200/50"
                            >
                                <div className="aspect-square overflow-hidden bg-gray-50">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="mb-2">
                                        <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                                            {product.category?.name}
                                        </span>
                                    </div>
                                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">{product.title}</h3>
                                    <div className="mt-4 flex items-center justify-between">
                                        <p className="text-xl font-bold text-gray-900">Rp {Number(product.price).toLocaleString('id-ID')}</p>
                                        <Button size="sm" className="bg-slate-900 px-4 hover:bg-slate-800" asChild>
                                            <Link href={`/product/${product.id}`}>View Details</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
