import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
];

export default function Dashboard() {
    const { productCount, categoryCount } = usePage().props as unknown as {
        productCount: number;
        categoryCount: number;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin" />
            <div className="flex flex-col gap-6 p-6">
                {/* Data Recap Cards */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 text-center shadow-md">
                        <h3 className="text-xl font-bold">{productCount}</h3>
                        <p className="text-gray-500">Product Total</p>
                    </div>

                    <div className="rounded-xl bg-white p-4 text-center shadow-md">
                        <h3 className="text-xl font-bold">{categoryCount}</h3>
                        <p className="text-gray-500">Category Total</p>
                    </div>

                    {/* Add more cards if needed */}
                </div>

                {/* Optional: Banner */}
                <div className="relative mt-6 w-full overflow-hidden rounded-xl">
                    <img src="/Assets/banner.jpg" alt="Banner" className="h-64 w-full object-cover md:h-80" />
                    <div className="absolute inset-0 flex flex-col justify-center bg-black/40 px-6 text-white md:px-16">
                        <h1 className="mb-2 text-2xl font-bold md:text-4xl">Harmonize Your Soul</h1>
                        <p className="max-w-xl text-sm md:text-base">Discover premium instruments that inspire creativity and elevate your musical journey. From classic to contemporary, find
                            your perfect sound.</p>
                        <div className="mt-4">
                            <Button asChild>
                                <Link href={route('products.index')}>Manage Product</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
