/**
 * ClaimInputForm Component
 * 
 * Form for submitting claims and URLs for verification.
 */

import React, { useState } from 'react';

interface ClaimInputFormProps {
    onSubmit: (text: string, url: string) => void;
    isLoading: boolean;
}

export function ClaimInputForm({ onSubmit, isLoading }: ClaimInputFormProps) {
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() || url.trim()) {
            onSubmit(text.trim(), url.trim());
        }
    };

    const isValid = text.trim() || url.trim();

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Text Input */}
            <div>
                <label
                    htmlFor="claim-text"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Paste claim or article text
                </label>
                <textarea
                    id="claim-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter the claim or article text you want to verify..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                     placeholder-gray-400 resize-none transition-colors"
                    disabled={isLoading}
                />
            </div>

            {/* URL Input */}
            <div>
                <label
                    htmlFor="claim-url"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Paste URL (optional)
                </label>
                <input
                    id="claim-url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/article"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                     placeholder-gray-400 transition-colors"
                    disabled={isLoading}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!isValid || isLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white 
                    transition-all duration-200 flex items-center justify-center gap-2
                    ${isValid && !isLoading
                        ? 'bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12" cy="12" r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                        Analyzing...
                    </>
                ) : (
                    <>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Verify Claim
                    </>
                )}
            </button>
        </form>
    );
}
