import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                {/* Banner Section */}
                <div className="relative w-full overflow-hidden rounded-xl">
                    <img
                        src="/Assets/banner.jpg" // Replace with your actual image path
                        alt="Banner"
                        className="h-64 w-full object-cover md:h-80"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center bg-black/40 px-6 text-white md:px-16">
                        <h1 className="mb-2 text-2xl font-bold md:text-4xl">Langkah Pasti, Gaya Tanpa Batas</h1>
                        <p className="max-w-xl text-sm md:text-base">
                            Temukan koleksi sepatu terbaik untuk setiap langkahmu. Dari sepatu dewasa hingga anak-anak, kami punya semua yang kamu
                            butuhkan.
                        </p>
                        <div className="mt-4">
                            <Button variant="default">Belanja Sekarang</Button>
                        </div>
                    </div>
                </div>

                {/* Product Category Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Card 1 - Sepatu Pria */}
                    <div className="bg-muted flex flex-col items-center rounded-xl p-4">
                        <img src="/Assets/sepatu-pria.jpg" alt="Sepatu Pria" className="h-32 object-contain" />
                        <span className="mt-2 font-medium">Sepatu Pria</span>
                    </div>

                    {/* Card 2 - Sepatu Wanita */}
                    <div className="bg-muted flex flex-col items-center rounded-xl p-4">
                        <img src="/Assets/sepatu-wanita.jpg" alt="Sepatu Wanita" className="h-32 object-contain" />
                        <span className="mt-2 font-medium">Sepatu Wanita</span>
                    </div>

                    {/* Card 3 - Sepatu Anak-anak */}
                    <div className="bg-muted flex flex-col items-center rounded-xl p-4">
                        <img src="/Assets/sepatu-anak.jpg" alt="Sepatu Anak-anak" className="h-32 object-contain" />
                        <span className="mt-2 font-medium">Sepatu Anak-anak</span>
                    </div>
                </div>
            </div>

            {/* Produk Kita Section */}
            <div>
                <h2 className="mt-6 mb-4 text-xl font-semibold">Produk Kita</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {/* Produk 1 */}
                    <div className="rounded-xl bg-white p-4 text-center shadow-md">
                        <img src="/Assets/nike-shox.jpg" alt="Nike Shox TL" className="mb-4 h-40 w-full object-contain" />
                        <h3 className="text-lg font-semibold">Nike Shox TL</h3>
                        <p className="text-sm text-gray-500">Sepatu Pria</p>
                        <p className="mt-2 text-base font-semibold">Rp 2.600.000</p>
                        <Button className="mt-4 w-full">Lihat Produk</Button>
                    </div>

                    {/* Produk 2 */}
                    <div className="rounded-xl bg-white p-4 text-center shadow-md">
                        <img src="/Assets/nike-air-force.jpg" alt="Nike Air Force 1" className="mb-4 h-40 w-full object-contain" />
                        <h3 className="text-lg font-semibold">Nike Air Force 1</h3>
                        <p className="text-sm text-gray-500">Sepatu Wanita</p>
                        <p className="mt-2 text-base font-semibold">Rp 1.500.000</p>
                        <Button className="mt-4 w-full">Lihat Produk</Button>
                    </div>

                    {/* Produk 3 */}
                    <div className="rounded-xl bg-white p-4 text-center shadow-md">
                        <img src="/Assets/nike-air-max.jpg" alt="Nike Air Max SYSTM" className="mb-4 h-40 w-full object-contain" />
                        <h3 className="text-lg font-semibold">Nike Air Max SYSTM</h3>
                        <p className="text-sm text-gray-500">Sepatu Anak-anak</p>
                        <p className="mt-2 text-base font-semibold">Rp 800.000</p>
                        <Button className="mt-4 w-full">Lihat Produk</Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
