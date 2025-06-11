'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export type Category = {
    id: string;
    name: string;
};

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'no',
        header: 'No',
        cell: ({ row }) => {
            const index = row.index + 1;

            return <div className="font-medium">{index}</div>;
        },
    },
    {
        accessorKey: 'name',
        header: 'Category Name',
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
                            <Link href={route('categories.edit', payment.id)}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this categories?')) {
                                    router.delete(route('categories.destroy', payment.id), {
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
