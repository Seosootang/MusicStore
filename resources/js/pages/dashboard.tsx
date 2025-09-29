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
    categories?: { id: number; name: string }[]; // many-to-many
    badge?: 'new' | 'sale' | 'bestseller' | 'limited';
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

    // Filter products by selected category (many-to-many)
    const filteredProducts =
        selectedCategory === 'all' ? products : products.filter((product) => product.categories?.some((c) => c.id === selectedCategory));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-8 p-6">
                {/* Hero Banner Section */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 p-8 md:p-12">
                    <div className="relative z-10 max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 text-purple-300">
                            <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                            <span className="text-sm font-medium tracking-wide">SIX SEASONS MUSICAL</span>
                        </div>
                        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                            Harmonisasi Musik, <br />
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Inspirasi Tanpa Batas</span>
                        </h1>
                        <p className="mb-6 text-lg text-purple-100">
                            Temukan instrumen musik berkualitas tinggi untuk setiap genre dan level. Dari piano klasik hingga gitar elektrik modern,
                            wujudkan passion musikmu bersama kami.
                        </p>
                        <Button className="transform rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-pink-700">
                            Jelajahi Koleksi
                        </Button>
                    </div>
                    <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-purple-600/20 to-transparent"></div>
                    <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl"></div>
                    <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-pink-500/20 blur-2xl"></div>
                </div>

                {/* Category Showcase */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="mb-6 flex h-32 items-center justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 shadow-lg">
                                <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v6.114A4.369 4.369 0 005 11c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-center text-xl font-bold text-purple-800">Instrumen String</h3>
                        <p className="mt-2 text-center text-sm text-purple-600">Gitar, Bass, Violin & Lebih</p>
                    </div>
                    <div className="group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="mb-6 flex h-32 items-center justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                                <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-1.194-.26-2.328-.657-3.343a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-center text-xl font-bold text-blue-800">Audio & Sound</h3>
                        <p className="mt-2 text-center text-sm text-blue-600">Speaker, Amplifier & Mikrofon</p>
                    </div>
                    <div className="group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="mb-6 flex h-32 items-center justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-600 shadow-lg">
                                <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-center text-xl font-bold text-pink-800">Keyboard & Piano</h3>
                        <p className="mt-2 text-center text-sm text-pink-600">Digital Piano, Synthesizer</p>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6 flex items-center justify-center">
                    <div className="flex items-center gap-4 rounded-2xl border border-purple-100 bg-white p-4 shadow-lg">
                        <label htmlFor="category-filter" className="font-semibold text-purple-700">
                            Filter Kategori:
                        </label>
                        <select
                            id="category-filter"
                            className="rounded-xl border-purple-200 bg-purple-50 px-4 py-2 font-medium text-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                            value={selectedCategory}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSelectedCategory(val === 'all' ? 'all' : Number(val));
                            }}
                        >
                            <option value="all">Semua Kategori</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            )) || []}
                        </select>
                    </div>
                </div>

                {/* Featured Products Section */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Koleksi Premium</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">
                            Instrumen musik berkualitas tinggi pilihan para musisi profesional dan pemula
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-purple-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-200/50"
                            >
                                {/* Badge */}
                                {product.badge && (
                                    <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-semibold text-white shadow">
                                        {product.badge === 'new'
                                            ? 'Baru'
                                            : product.badge === 'sale'
                                              ? 'Promo'
                                              : product.badge === 'bestseller'
                                                ? 'Terlaris'
                                                : product.badge === 'limited'
                                                  ? 'Terbatas'
                                                  : product.badge}
                                    </span>
                                )}
                                <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {product.categories?.map((c) => (
                                            <span
                                                key={c.id}
                                                className="inline-block rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 text-xs font-bold text-purple-700"
                                            >
                                                {c.name}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-purple-700">
                                        {product.title}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <p className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
                                            Rp {Number(product.price).toLocaleString('id-ID')}
                                        </p>
                                        <Button
                                            size="sm"
                                            className="transform rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-pink-700"
                                            asChild
                                        >
                                            <Link href={`/product/${product.id}`}>Detail</Link>
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
