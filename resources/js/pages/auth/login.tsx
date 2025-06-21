import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            <Head title="Log in" />

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl"></div>
                <div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full bg-amber-500/10 blur-xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main login card */}
                <div className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
                    {/* Header with brand */}
                    <div className="mb-8 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 text-purple-600">
                            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                            <span className="text-sm font-medium tracking-wide">SIX SEASONS MUSICAL</span>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to harmonize your musical journey</p>
                    </div>

                    {/* Status message */}
                    {status && (
                        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                            <p className="text-sm font-medium text-green-600">{status}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>
                        {/* Email field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                    Password
                                </Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={route('password.request')}
                                        className="text-sm font-medium text-purple-600 hover:text-purple-700"
                                        tabIndex={5}
                                    >
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password"
                                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember me checkbox */}
                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                tabIndex={3}
                                className="rounded-md border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <Label htmlFor="remember" className="text-sm text-gray-700">
                                Remember me for 30 days
                            </Label>
                        </div>

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-purple-700 hover:to-purple-800 hover:shadow-xl"
                            tabIndex={4}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In to Your Account
                        </Button>
                    </form>

                    {/* Sign up link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <TextLink href={route('register')} tabIndex={5} className="font-semibold text-purple-600 hover:text-purple-700">
                                Create your account
                            </TextLink>
                        </p>
                    </div>
                </div>

                {/* Bottom decorative text */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-white/70">Join thousands of musicians who trust our platform</p>
                </div>
            </div>
        </div>
    );
}
