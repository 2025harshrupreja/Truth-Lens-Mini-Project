/**
 * DomainTrustCard Component
 * 
 * Displays domain trust score and category.
 */

import type { DomainTrust } from '../types/api';

interface DomainTrustCardProps {
    domainTrust: DomainTrust;
}

const trustStyles: Record<string, { bg: string; text: string; badge: string }> = {
    trusted: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100 text-green-800' },
    mixed: { bg: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-800' },
    low: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100 text-red-800' },
    unknown: { bg: 'bg-gray-50', text: 'text-gray-700', badge: 'bg-gray-100 text-gray-800' },
};

const trustLabels: Record<string, string> = {
    trusted: 'Trusted Source',
    mixed: 'Mixed Reliability',
    low: 'Low Trust',
    unknown: 'Unknown Source',
};

export function DomainTrustCard({ domainTrust }: DomainTrustCardProps) {
    const { domain, score, category } = domainTrust;
    const style = trustStyles[score] || trustStyles.unknown;

    if (!domain) {
        return (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                    </svg>
                    Domain Trust
                </h3>
                <p className="text-gray-500 text-sm">No URL provided for domain analysis</p>
            </div>
        );
    }

    return (
        <div className={`${style.bg} rounded-lg p-4 border border-gray-200 animate-fade-in-up`}>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                Domain Trust
            </h3>

            <div className="flex items-center justify-between">
                <div>
                    <p className={`font-medium ${style.text}`}>{domain}</p>
                    {category && category !== 'unknown' && (
                        <p className="text-xs text-gray-500 capitalize mt-1">{category}</p>
                    )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style.badge}`}>
                    {trustLabels[score]}
                </span>
            </div>

            {/* Trust Indicator Bar */}
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-500 ${score === 'trusted' ? 'bg-green-500 w-full' :
                            score === 'mixed' ? 'bg-amber-500 w-2/3' :
                                score === 'low' ? 'bg-red-500 w-1/3' :
                                    'bg-gray-400 w-1/4'
                        }`}
                />
            </div>
        </div>
    );
}
