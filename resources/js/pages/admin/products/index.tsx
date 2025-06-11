import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Product, columns } from './column';
import { DataTable } from './data-table';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Products',
        href: '/admin/products',
    },
];

export default function Products({ products }: { products: Product[] }) {
    const { flash } = usePage().props as {flash?: { success?: string; error?: string }};

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-4 md:p-8">
                    <h1 className="text-2xl font-semibold">Products</h1>
                    <p className="mb-4 text-sm text-gray-500 md:w-2xl">Manage your products here.</p>
                    <Button asChild>
                        <Link href={route('products.create')}>Add Product</Link>
                    </Button>

                    <DataTable columns={columns} data={products} />
                </div>
            </div>
        </AppLayout>
    );
}
