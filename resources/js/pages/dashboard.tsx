import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

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

type PageProps = {
    products: Product[];
};

export default function Dashboard() {
    const { products } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-8 p-6">
                {/* Banner Section */}
                <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative flex flex-col justify-center px-8 py-16 text-white md:px-16 md:py-20">
                        <div className="mb-4 inline-flex items-center gap-2 text-purple-300">
                            <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                            <span className="text-sm font-medium tracking-wide">MUSIC STORE</span>
                        </div>
                        <h1 className="mb-4 text-3xl leading-tight font-bold md:text-5xl">Harmonize Your Soul</h1>
                        <p className="max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
                            Discover premium instruments that inspire creativity and elevate your musical journey. From classic to contemporary, find
                            your perfect sound.
                        </p>
                        <div className="mt-8">
                            <Button size="lg" className="bg-white px-8 py-3 font-semibold text-slate-900 hover:bg-gray-100">
                                Explore Collection
                            </Button>
                        </div>
                    </div>
                    <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl"></div>
                    <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl"></div>
                </div>

                {/* Product Category Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Card 1 - String Instruments */}
                    <div className="group cursor-pointer rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-200/50">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-amber-100 p-4 transition-colors group-hover:bg-amber-200">
                                <svg className="h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">String Instruments</h3>
                            <p className="mt-1 text-sm text-gray-600">Guitars, Violins, Cellos</p>
                        </div>
                    </div>

                    {/* Card 2 - Piano & Keyboards */}
                    <div className="group cursor-pointer rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200/50">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-blue-100 p-4 transition-colors group-hover:bg-blue-200">
                                <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Piano & Keyboards</h3>
                            <p className="mt-1 text-sm text-gray-600">Digital, Acoustic, Synthesizers</p>
                        </div>
                    </div>

                    {/* Card 3 - Drums & Percussion */}
                    <div className="group cursor-pointer rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-200/50">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-red-100 p-4 transition-colors group-hover:bg-red-200">
                                <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Drums & Percussion</h3>
                            <p className="mt-1 text-sm text-gray-600">Acoustic, Electronic, Accessories</p>
                        </div>
                    </div>
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
                        {products.map((product) => (
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
                                        <Button size="sm" className="bg-slate-900 px-4 hover:bg-slate-800">
                                            View Details
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
