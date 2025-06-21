import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <Head title="Forgot password" />
            
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl"></div>
                <div className="absolute top-1/2 right-1/3 h-16 w-16 rounded-full bg-amber-500/10 blur-xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main forgot password card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
                    {/* Header with brand */}
                    <div className="text-center mb-8">
                        <div className="mb-4 inline-flex items-center gap-2 text-purple-600">
                            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                            <span className="text-sm font-medium tracking-wide">MUSIC STORE</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
                        <p className="text-gray-600">We'll send you a link to get back to your music</p>
                    </div>

                    {/* Status message */}
                    {status && (
                        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4 text-center">
                            <p className="text-sm font-medium text-green-600">{status}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>
                        {/* Email field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoComplete="email"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter your email address"
                                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Submit button */}
                        <Button 
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Send Reset Link
                        </Button>
                    </form>

                    {/* Back to login link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-sm">
                            Remember your password?{' '}
                            <TextLink 
                                href={route('login')}
                                className="text-purple-600 hover:text-purple-700 font-semibold"
                            >
                                Back to sign in
                            </TextLink>
                        </p>
                    </div>
                </div>

                {/* Bottom decorative text */}
                <div className="text-center mt-8">
                    <p className="text-white/70 text-sm">
                        We'll help you get back to creating music
                    </p>
                </div>
            </div>
        </div>
    );
}