/**
 * FactCheckCard Component
 * 
 * Displays existing fact-check results if found.
 */

import type { FactCheck } from '../types/api';

interface FactCheckCardProps {
    factcheck: FactCheck;
}

const ratingStyles: Record<string, { bg: string; text: string }> = {
    True: { bg: 'bg-green-100', text: 'text-green-800' },
    False: { bg: 'bg-red-100', text: 'text-red-800' },
    Misleading: { bg: 'bg-amber-100', text: 'text-amber-800' },
    Unverifiable: { bg: 'bg-gray-100', text: 'text-gray-800' },
};

export function FactCheckCard({ factcheck }: FactCheckCardProps) {
    const { found, rating, summary, source, url } = factcheck;

    if (!found) {
        return (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Fact Check
                </h3>
                <p className="text-gray-500 text-sm">
                    No existing fact-checks found for this claim
                </p>
            </div>
        );
    }

    const style = ratingStyles[rating || 'Unverifiable'] || ratingStyles.Unverifiable;

    return (
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm animate-fade-in-up">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Existing Fact Check Found
            </h3>

            {/* Rating Badge */}
            {rating && (
                <div className="mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${style.bg} ${style.text}`}>
                        Rated: {rating}
                    </span>
                </div>
            )}

            {/* Summary */}
            {summary && (
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {summary}
                </p>
            )}

            {/* Source */}
            <div className="flex items-center justify-between text-sm">
                {source && (
                    <span className="text-gray-500">
                        Source: <span className="font-medium text-gray-700">{source}</span>
                    </span>
                )}
                {url && (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1"
                    >
                        View fact-check
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    );
}
