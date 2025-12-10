/**
 * ResultPanel Component
 * 
 * Container for all analysis result cards.
 */

import type { AnalyzeResponse } from '../types/api';
import { VerdictCard } from './VerdictCard';
import { DomainTrustCard } from './DomainTrustCard';
import { FactCheckCard } from './FactCheckCard';
import { EvidenceSummary } from './EvidenceSummary';

interface ResultPanelProps {
    result: AnalyzeResponse;
}

export function ResultPanel({ result }: ResultPanelProps) {
    const {
        claim,
        verdict,
        confidence,
        domain_trust,
        factcheck,
        evidence,
        stance_summary,
        explanation,
    } = result;

    return (
        <div className="space-y-4 animate-fade-in-up">
            {/* Main Verdict */}
            <VerdictCard
                verdict={verdict}
                confidence={confidence}
                claim={claim}
            />

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DomainTrustCard domainTrust={domain_trust} />
                <FactCheckCard factcheck={factcheck} />
            </div>

            {/* Evidence */}
            <EvidenceSummary
                evidence={evidence}
                stanceSummary={stance_summary}
            />

            {/* Explanation */}
            {explanation && (
                <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Analysis Explanation
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {explanation}
                    </p>
                </div>
            )}
        </div>
    );
}
