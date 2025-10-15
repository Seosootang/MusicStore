import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { parseRupiah, rupiahFormatter } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useMemo, useRef, useState } from 'react';
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
    badge: z.enum(['new', 'sale', 'bestseller', 'limited']),
});

export default function EditProduct({ categories }: { categories: { id: number; name: string }[] }) {
    const { props } = usePage<{ product: Product & { categories?: { id: number }[]; badge?: 'new' | 'sale' | 'bestseller' | 'limited' } }>();
    const product = props.product;

    const [selectedCategories, setSelectedCategories] = useState<number[]>(() => (product.categories || []).map((c) => c.id));

    // Keep the initial categories to detect changes later
    const initialCategoriesRef = useRef<number[]>([...(product.categories || []).map((c) => c.id)]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: null,
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
            badge: (product as any).badge ?? 'new',
        },
    });

    // Determine if categories changed vs initial
    const categoriesChanged = useMemo(() => {
        const a = [...initialCategoriesRef.current].sort((x, y) => x - y);
        const b = [...selectedCategories].sort((x, y) => x - y);
        if (a.length !== b.length) return true;
        for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return true;
        return false;
    }, [selectedCategories]);

    // Overall change detection: any form field dirty OR categories changed
    const hasChanges = form.formState.isDirty || categoriesChanged;

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price.toString());
        formData.append('stock', values.stock.toString());
        formData.append('badge', values.badge);
        selectedCategories.forEach((id) => formData.append('categories[]', String(id)));

        if (values.image && values.image instanceof File) {
            formData.append('image', values.image);
        }

        router.post(route('products.update', product.id), formData);
    }

    const isChecked = (id: number) => selectedCategories.includes(id);

    const toggleCategory = (id: number, value: boolean | string) => {
        const checked = value === true;
        setSelectedCategories((prev) => {
            const set = new Set(prev);
            if (checked) set.add(id);
            else set.delete(id);
            return Array.from(set);
        });
    };

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
                                name="badge"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Badge</FormLabel>
                                        <FormControl>
                                            <select
                                                className="rounded-md border p-2"
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value as 'new' | 'sale' | 'bestseller' | 'limited')}
                                            >
                                                <option value="new">New</option>
                                                <option value="sale">Sale</option>
                                                <option value="bestseller">Bestseller</option>
                                                <option value="limited">Limited</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <FormLabel>Categories</FormLabel>
                                <div className="grid gap-2">
                                    {categories.map((category) => (
                                        <label key={category.id} className="flex items-center gap-2">
                                            <Checkbox checked={isChecked(category.id)} onCheckedChange={(v) => toggleCategory(category.id, v)} />
                                            <span>{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

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
                            <Button type="submit" disabled={!hasChanges} title={!hasChanges ? 'Tidak ada perubahan' : undefined}>
                                Update
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
