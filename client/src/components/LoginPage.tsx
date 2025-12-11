import { useState } from 'react';
import { LogIn, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import type { Page } from '../App';

interface LoginPageProps {
    onNavigate: (page: Page) => void;
    onLogin: (email: string) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { login } = await import('../lib/api');
            await login({ email, password });
            onLogin(email);
            onNavigate('dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
            {/* Atmospheric Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F1419] to-[#0A0A0A]" />
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00FFC3]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-[#99F8FF]/8 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Back Button */}
            <button
                onClick={() => onNavigate('landing')}
                className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[#D6D6D6] hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
            </button>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md px-6">
                <div className="p-8 rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00FFC3] to-[#99F8FF] flex items-center justify-center">
                            <LogIn className="w-7 h-7 text-black" />
                        </div>
                        <h1 className="text-2xl mb-2">Welcome Back</h1>
                        <p className="text-[#D6D6D6] text-sm">Sign in to continue to TruthLens</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm text-[#D6D6D6] mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FFC3]/50 focus:outline-none focus:ring-1 focus:ring-[#00FFC3]/30 transition-all placeholder:text-[#666]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-[#D6D6D6] mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FFC3]/50 focus:outline-none focus:ring-1 focus:ring-[#00FFC3]/30 transition-all placeholder:text-[#666]"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] text-black font-medium hover:shadow-[0_0_40px_rgba(0,255,195,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-[#D6D6D6]">
                        Don't have an account?{' '}
                        <button
                            onClick={() => onNavigate('register')}
                            className="text-[#00FFC3] hover:text-[#99F8FF] transition-colors"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating orbs */}
            <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-[#00FFC3] rounded-full blur-sm animate-pulse" />
            <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#99F8FF] rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
    );
}
