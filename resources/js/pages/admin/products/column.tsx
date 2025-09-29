'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export type Product = {
    id: string | number;
    categories?: { id: number; name: string }[];
    title: string;
    description: string;
    price: number;
    stock: number;
    image: string;
};

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'no',
        header: 'no',
        cell: ({ row }) => {
            const index = row.index + 1;

            return <div className="font-medium">{index}</div>;
        },
    },
    {
        accessorKey: 'categories',
        header: 'Categories',
        cell: ({ row }) => {
            const cats = row.original.categories || [];
            if (!cats.length) return <span className="text-gray-400">-</span>;
            return <span>{cats.map((c) => c.name).join(', ')}</span>;
        },
    },
    {
        accessorKey: 'title',
        header: 'Product Name',
    },
    {
        accessorKey: 'description',
        header: 'Product Description',
    },
    {
        accessorKey: 'price',
        header: 'Harga',
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'));
            const formatted = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(price);

            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'stock',
        header: 'Product Stock',
    },
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const title = row.original.title;
            const image = row.original.image;
            const imageUrl = image ? `/storage/${image}` : '/placeholde.png';
            return <img src={imageUrl} alt={title} className="h-16 w-16 rounded object-cover" />;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={route('products.edit', payment.id)}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this product?')) {
                                    router.delete(route('products.destroy', payment.id), {
                                        preserveScroll: true,
                                    });
                                }
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
