import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Admin Dashboard',
    href: '/admin',
  },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-6">

        {/* Banner Section */}
        <div className="relative w-full rounded-xl overflow-hidden">
          <img
            src="/Assets/banner.jpg" // Replace with your actual image path
            alt="Banner"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 md:px-16 text-white">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              Langkah Pasti, Gaya Tanpa Batas
            </h1>
            <p className="text-sm md:text-base max-w-xl">
              Temukan koleksi sepatu terbaik untuk setiap langkahmu. Dari sepatu dewasa hingga anak-anak, kami punya semua yang kamu butuhkan.
            </p>
            <div className="mt-4">
              <Button asChild>
                  <Link href={route('admin.dashboard')}>Belanja Sekarang</Link>
                </Button>
            </div>
          </div>
        </div>

        {/* Product Category Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Card 1 - Sepatu Pria */}
          <div className="bg-muted rounded-xl p-4 flex flex-col items-center">
            <img
              src="/Assets/sepatu-pria.jpg"
              alt="Sepatu Pria"
              className="h-32 object-contain"
            />
            <span className="mt-2 font-medium">Sepatu Pria</span>
          </div>

          {/* Card 2 - Sepatu Wanita */}
          <div className="bg-muted rounded-xl p-4 flex flex-col items-center">
            <img
              src="/Assets/sepatu-wanita.jpg"
              alt="Sepatu Wanita"
              className="h-32 object-contain"
            />
            <span className="mt-2 font-medium">Sepatu Wanita</span>
          </div>

          {/* Card 3 - Sepatu Anak-anak */}
          <div className="bg-muted rounded-xl p-4 flex flex-col items-center">
            <img
              src="/Assets/sepatu-anak.jpg"
              alt="Sepatu Anak-anak"
              className="h-32 object-contain"
            />
            <span className="mt-2 font-medium">Sepatu Anak-anak</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
