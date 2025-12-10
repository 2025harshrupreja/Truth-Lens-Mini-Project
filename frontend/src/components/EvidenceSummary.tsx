/**
 * EvidenceSummary Component
 * 
 * Displays evidence articles with stance indicators.
 */

import type { EvidenceItem, StanceSummary } from '../types/api';

interface EvidenceSummaryProps {
    evidence: EvidenceItem[];
    stanceSummary: StanceSummary;
}

const stanceStyles: Record<string, { bg: string; text: string; icon: string }> = {
    SUPPORTS: { bg: 'bg-green-100', text: 'text-green-700', icon: '✓' },
    REFUTES: { bg: 'bg-red-100', text: 'text-red-700', icon: '✗' },
    DISCUSS: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '◐' },
    UNRELATED: { bg: 'bg-gray-100', text: 'text-gray-600', icon: '○' },
};

export function EvidenceSummary({ evidence, stanceSummary }: EvidenceSummaryProps) {
    const hasEvidence = evidence && evidence.length > 0;
    const totalRelevant = stanceSummary.supports + stanceSummary.refutes + stanceSummary.discuss;

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-fade-in-up">
            {/* Header with Summary */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Evidence Analysis
                </h3>

                {/* Stance Summary Pills */}
                <div className="flex flex-wrap gap-2">
                    {stanceSummary.supports > 0 && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            {stanceSummary.supports} Supporting
                        </span>
                    )}
                    {stanceSummary.refutes > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                            {stanceSummary.refutes} Refuting
                        </span>
                    )}
                    {stanceSummary.discuss > 0 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {stanceSummary.discuss} Discussing
                        </span>
                    )}
                    {totalRelevant === 0 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                            No relevant evidence found
                        </span>
                    )}
                </div>
            </div>

            {/* Evidence List */}
            {hasEvidence ? (
                <ul className="divide-y divide-gray-100">
                    {evidence.map((item, index) => {
                        const style = stanceStyles[item.stance] || stanceStyles.UNRELATED;

                        return (
                            <li key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-3">
                                    {/* Stance Indicator */}
                                    <span
                                        className={`flex-shrink-0 w-6 h-6 rounded-full ${style.bg} ${style.text} 
                                flex items-center justify-center text-xs font-bold`}
                                    >
                                        {style.icon}
                                    </span>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {item.url ? (
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary-600 hover:underline"
                                                >
                                                    {item.title || 'Untitled'}
                                                </a>
                                            ) : (
                                                item.title || 'Untitled'
                                            )}
                                        </h4>
                                        {item.description && (
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                {item.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                            {item.source && (
                                                <span className="text-xs text-gray-400">{item.source}</span>
                                            )}
                                            {item.domain && (
                                                <span className="text-xs text-gray-400">• {item.domain}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Stance Badge */}
                                    <span
                                        className={`flex-shrink-0 px-2 py-1 rounded text-xs font-medium
                                ${style.bg} ${style.text}`}
                                    >
                                        {item.stance}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                    No evidence articles retrieved
                </div>
            )}
        </div>
    );
}
