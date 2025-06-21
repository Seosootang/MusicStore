import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            <Head title="Register" />

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl"></div>
                <div className="absolute top-1/3 right-1/4 h-20 w-20 rounded-full bg-amber-500/10 blur-xl"></div>
                <div className="absolute bottom-1/3 left-1/3 h-12 w-12 rounded-full bg-rose-500/10 blur-lg"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main register card */}
                <div className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
                    {/* Header with brand */}
                    <div className="mb-8 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 text-purple-600">
                            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                            <span className="text-sm font-medium tracking-wide">SIX SEASONS MUSICAL</span>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">Start Your Journey</h1>
                        <p className="text-gray-600">Create your account to discover amazing instruments</p>
                    </div>

                    <form className="space-y-5" onSubmit={submit}>
                        {/* Name field */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Enter your full name"
                                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Email field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Create a strong password"
                                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Confirm password field */}
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-sm font-semibold text-gray-700">
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm your password"
                                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-purple-700 hover:to-purple-800 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                            tabIndex={5}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Create Your Account
                        </Button>
                    </form>

                    {/* Sign in link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <TextLink href={route('login')} tabIndex={6} className="font-semibold text-purple-600 hover:text-purple-700">
                                Sign in here
                            </TextLink>
                        </p>
                    </div>
                </div>

                {/* Bottom decorative text */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-white/70">Join our community of passionate musicians</p>
                </div>
            </div>
        </div>
    );
}
