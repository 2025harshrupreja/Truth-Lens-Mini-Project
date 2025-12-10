/**
 * TruthLens Frontend App
 * 
 * Main application component with authentication routing.
 */

import { useState, useEffect } from 'react';
import { VerifyClaimPage } from './pages/VerifyClaimPage';
import { isAuthenticated, login, register, clearToken } from './lib/api';

type AuthMode = 'login' | 'register';

export default function App() {
    const [authenticated, setAuthenticated] = useState(isAuthenticated());
    const [authMode, setAuthMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState<string | undefined>();

    useEffect(() => {
        // Check auth on mount
        setAuthenticated(isAuthenticated());
    }, []);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (authMode === 'register') {
                await register({ email, password });
                // Auto-login after registration
                await login({ email, password });
            } else {
                await login({ email, password });
            }
            setUserEmail(email);
            setAuthenticated(true);
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        clearToken();
        setAuthenticated(false);
        setUserEmail(undefined);
    };

    // If authenticated, show main app
    if (authenticated) {
        return <VerifyClaimPage onLogout={handleLogout} userEmail={userEmail} />;
    }

    // Auth screen
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">TruthLens</h1>
                    <p className="text-gray-500 mt-2">Claim Verification MVP</p>
                </div>

                {/* Auth Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                        {authMode === 'login' ? 'Welcome back' : 'Create account'}
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div>
                            <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="auth-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                           placeholder-gray-400 transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="auth-password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="auth-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                           placeholder-gray-400 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-6 rounded-lg font-semibold text-white 
                          transition-all duration-200 flex items-center justify-center gap-2
                          ${!loading
                                    ? 'bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl'
                                    : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    {authMode === 'login' ? 'Signing in...' : 'Creating account...'}
                                </>
                            ) : (
                                authMode === 'login' ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Toggle mode */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        {authMode === 'login' ? (
                            <>
                                Don't have an account?{' '}
                                <button
                                    onClick={() => { setAuthMode('register'); setError(null); }}
                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    onClick={() => { setAuthMode('login'); setError(null); }}
                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    TruthLens MVP v0.1 — AI-powered claim verification
                </p>
            </div>
        </div>
    );
}
