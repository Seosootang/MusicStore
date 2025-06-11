import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { DataTable } from './data-table';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { Category, columns } from './column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Products',
        href: '/admin/categories',
    },
];

export default function Categories({ categories }: { categories: Category[] }) {
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
            <Head title="Categories" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-4 md:p-8">
                    <h1 className="text-2xl font-semibold">Categoriess</h1>
                    <p className="mb-4 text-sm text-gray-500 md:w-2xl">Manage your categories here.</p>
                    <Button asChild>
                        <Link href={route('categories.create')}>Add Category</Link>
                    </Button>

                    <DataTable columns={columns} data={categories} />
                </div>
            </div>
        </AppLayout>
    );
}
