import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category?: {
        name: string;
    };
};

export default function ProductDetail({
    product,
}: {
    product: Product;
}) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const { data, setData, post, processing, errors } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('cart.store'), {
            onSuccess: () => {
                window.dispatchEvent(new Event('cart-updated'));
            },
        });
    };

    return (
        <AppLayout>
            <Head title={product.title} />
            <div className="border-sidebar-border/70 dark:border-sidebar-border mx-auto mt-4 flex max-w-3xl flex-col gap-8 rounded-xl border p-8 md:flex-row">
                <img
                    src={`/storage/${product.image}`}
                    alt={product.title}
                    className="h-80 w-80 rounded-xl object-cover"
                />
                <div className="flex-1">
                    <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
                    <p className="mb-2 text-gray-500">{product.category?.name}</p>
                    <p className="mb-4 text-gray-700">{product.description}</p>
                    <p className="mb-4 text-2xl font-semibold">
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(product.price)}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="number"
                                name="quantity"
                                min={1}
                                value={data.quantity}
                                onChange={(e) => setData('quantity', Number(e.target.value))}
                                className="mr-2 w-20 rounded border px-2 py-1 text-center shadow-sm"
                            />
                            {errors.quantity && (
                                <div className="mt-1 text-sm text-red-500">{errors.quantity}</div>
                            )}
                        </div>
                        <Button type="submit" disabled={processing}>
                            Tambah ke Keranjang
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
