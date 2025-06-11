import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { parseRupiah, rupiahFormatter } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Categories',
        href: '/admin/categories',
    },
    {
        title: 'Create Category',
        href: '/admin/categories/create',
    },
];

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Category Name is required.',
    }),
});

export default function CreateCategory() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:'',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
       router.post(route('categories.store'), values);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Categories" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-4 md:p-8">
                    <h1 className="text-2xl font-semibold">Add Categories</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Category Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
