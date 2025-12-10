/**
 * VerifyClaimPage
 * 
 * Main page for claim verification - the primary MVP screen.
 */

import { useState } from 'react';
import { ClaimInputForm } from '../components/ClaimInputForm';
import { ResultPanel } from '../components/ResultPanel';
import { analyzeClaim, isAuthenticated, logout } from '../lib/api';
import type { AnalyzeResponse } from '../types/api';

interface VerifyClaimPageProps {
    onLogout: () => void;
    userEmail?: string;
}

export function VerifyClaimPage({ onLogout, userEmail }: VerifyClaimPageProps) {
    const [result, setResult] = useState<AnalyzeResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (text: string, url: string) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await analyzeClaim({
                text: text || undefined,
                url: url || undefined,
                language: 'en',
            });
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        onLogout();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Logo */}
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">TruthLens</h1>
                                <p className="text-xs text-gray-500">Claim Verification MVP</p>
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            {userEmail && (
                                <span className="text-sm text-gray-600 hidden sm:block">
                                    {userEmail}
                                </span>
                            )}
                            <button
                                onClick={handleLogout}
                                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Input Section */}
                <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Verify a Claim
                    </h2>
                    <ClaimInputForm onSubmit={handleSubmit} isLoading={isLoading} />
                </section>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Results Section */}
                {result && (
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Analysis Results
                        </h2>
                        <ResultPanel result={result} />
                    </section>
                )}

                {/* Empty State */}
                {!result && !isLoading && !error && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-gray-600 font-medium mb-2">Ready to verify</h3>
                        <p className="text-gray-400 text-sm max-w-md mx-auto">
                            Enter a claim or paste a URL above to analyze it for misinformation.
                            Our AI will check facts, analyze evidence, and provide a verdict.
                        </p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white mt-auto">
                <div className="max-w-4xl mx-auto px-4 py-4 text-center text-xs text-gray-400">
                    TruthLens MVP v0.1 — AI-powered claim verification
                </div>
            </footer>
        </div>
    );
}
