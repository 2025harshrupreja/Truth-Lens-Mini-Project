/**
 * VerdictCard Component
 * 
 * Displays the final verdict with color coding and confidence level.
 */

interface VerdictCardProps {
    verdict: string;
    confidence: 'high' | 'medium' | 'low';
    claim: string | null;
}

const verdictStyles: Record<string, { bg: string; text: string; border: string }> = {
    'Likely True': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    'Likely False': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    'Misleading': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'Needs More Verification': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
};

const confidenceLabels = {
    high: { text: 'High Confidence', color: 'text-green-600' },
    medium: { text: 'Medium Confidence', color: 'text-amber-600' },
    low: { text: 'Low Confidence', color: 'text-gray-500' },
};

export function VerdictCard({ verdict, confidence, claim }: VerdictCardProps) {
    const style = verdictStyles[verdict] || verdictStyles['Needs More Verification'];
    const confidenceInfo = confidenceLabels[confidence];

    return (
        <div
            className={`rounded-xl border-2 p-6 ${style.bg} ${style.border} 
                  animate-fade-in-up`}
        >
            {/* Verdict Label */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Verdict
                </span>
                <span className={`text-sm font-medium ${confidenceInfo.color}`}>
                    {confidenceInfo.text}
                </span>
            </div>

            {/* Main Verdict */}
            <h2 className={`text-2xl font-bold ${style.text} mb-3`}>
                {verdict}
            </h2>

            {/* Claim */}
            {claim && (
                <p className="text-gray-600 text-sm leading-relaxed">
                    <span className="font-medium">Claim analyzed:</span> "{claim}"
                </p>
            )}

            {/* Visual Indicator */}
            <div className="mt-4 flex items-center gap-2">
                {verdict === 'Likely True' && (
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                )}
                {verdict === 'Likely False' && (
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                )}
                {verdict === 'Misleading' && (
                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                )}
                {verdict === 'Needs More Verification' && (
                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                )}
                <span className={`text-sm ${style.text}`}>
                    Analysis complete
                </span>
            </div>
        </div>
    );
}
