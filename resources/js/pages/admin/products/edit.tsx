import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { parseRupiah, rupiahFormatter } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Product } from './column';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin' },
    { title: 'Products', href: '/admin/products' },
    { title: 'Edit Product', href: '' },
];

const formSchema = z.object({
    image: z.any().optional(),
    title: z.string().min(1, { message: 'Title is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    price: z.number().min(0),
    stock: z.number().min(0),
});

export default function EditProduct() {
    const { props } = usePage<{ product: Product }>();
    const product = props.product;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: null,
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price.toString());
        formData.append('stock', values.stock.toString());

        if (values.image && values.image instanceof File) {
            formData.append('image', values.image);
        }

        router.post(route('products.update', product.id), formData);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-4 md:p-8">
                    <h1 className="text-2xl font-semibold">Edit Product</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image Product (leave empty to keep current)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        field.onChange(file);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Product Price"
                                                value={rupiahFormatter.format(field.value || 0)}
                                                onChange={(e) => field.onChange(parseRupiah(e.target.value))}
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Stock</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Product Stock"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Update</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
