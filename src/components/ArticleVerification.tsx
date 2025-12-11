import { useState, useEffect } from 'react';
import { FileText, ExternalLink, CheckCircle2, AlertCircle, XCircle, Network, Loader2, RotateCcw, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import type { UserMode, Page } from '../App';
import type { AnalyzeResponse } from '../lib/api';
import { addToHistory, getCurrentResult, saveCurrentResult, clearCurrentResult } from '../lib/history';

interface ArticleVerificationProps {
    userMode: UserMode;
    onNavigate?: (page: Page) => void;
    isAuthenticated?: boolean;
}

const sourceMetrics = [
    { metric: 'Credibility', score: 85 },
    { metric: 'Bias Score', score: 70 },
    { metric: 'Fact Record', score: 92 },
    { metric: 'Source Age', score: 95 },
    { metric: 'Citations', score: 88 },
];

export function ArticleVerification({ userMode, onNavigate, isAuthenticated }: ArticleVerificationProps) {
    const [inputText, setInputText] = useState('');
    const [analyzed, setAnalyzed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalyzeResponse | null>(null);

    // Claim confirmation states
    const [extractedClaim, setExtractedClaim] = useState<string | null>(null);
    const [extracting, setExtracting] = useState(false);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (isAuthenticated === false && onNavigate) {
            onNavigate('login');
        }
    }, [isAuthenticated, onNavigate]);

    // Restore current result on mount (for navigation persistence)
    useEffect(() => {
        const saved = getCurrentResult();
        if (saved) {
            setInputText(saved.claim || '');
            setResult(saved.result);
            setAnalyzed(true);
        }
    }, []);

    // Step 1: Extract claim for user confirmation
    const handleExtractClaim = async () => {
        if (!inputText.trim()) return;

        setExtracting(true);
        setError(null);

        try {
            const { extractClaim } = await import('../lib/api');

            const isUrl = inputText.trim().startsWith('http://') || inputText.trim().startsWith('https://');

            const response = await extractClaim({
                text: isUrl ? undefined : inputText,
                url: isUrl ? inputText : undefined,
            });

            setExtractedClaim(response.primary_claim || inputText);
        } catch (err) {
            // Fallback to using input text directly
            setExtractedClaim(inputText);
        } finally {
            setExtracting(false);
        }
    };

    // Step 2: Run full analysis with confirmed claim
    const handleAnalyze = async () => {
        const claimToAnalyze = extractedClaim || inputText;
        if (!claimToAnalyze.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const { analyzeClaim } = await import('../lib/api');

            const response = await analyzeClaim({
                text: claimToAnalyze,
            });

            setResult(response);
            setAnalyzed(true);

            // Save to history and persist current result
            addToHistory(claimToAnalyze, response);
            saveCurrentResult(claimToAnalyze, response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Reset to start new analysis
    const handleReset = () => {
        setInputText('');
        setExtractedClaim(null);
        setAnalyzed(false);
        setResult(null);
        setError(null);
        clearCurrentResult();
    };

    // Helper to get verdict color
    const getVerdictStyle = (verdict?: string) => {
        if (!verdict) return { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white', icon: AlertCircle };
        const v = verdict.toLowerCase();
        if (v.includes('true') || v.includes('verified') || v.includes('accurate')) {
            return { bg: 'bg-[#00FFC3]/10', border: 'border-[#00FFC3]/30', text: 'text-[#00FFC3]', icon: CheckCircle2 };
        } else if (v.includes('false') || v.includes('misleading') || v.includes('inaccurate')) {
            return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: XCircle };
        }
        return { bg: 'bg-[#99F8FF]/10', border: 'border-[#99F8FF]/30', text: 'text-[#99F8FF]', icon: AlertCircle };
    };

    // Build evidence data from API response
    const evidenceData = result?.evidence?.map(e => ({
        source: e.source,
        reliability: e.stance === 'supporting' ? 85 : e.stance === 'neutral' ? 50 : 30,
        supporting: e.stance === 'supporting',
    })) || [];

    const claimSimilarity = result?.claims?.map((_c, i) => ({
        claim: `Claim ${i + 1}`,
        match: 100 - (i * 10),
    })) || [];

    if (!analyzed) {
        return (
            <div className="min-h-screen pt-20 pb-12 px-8">
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-40 right-1/3 w-[500px] h-[500px] bg-[#99F8FF]/5 rounded-full blur-[140px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl mb-3">Article Verification</h1>
                        <p className="text-[#D6D6D6]">Fact-check claims and analyze source credibility</p>
                    </div>

                    <div className="p-8 rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-sm text-[#D6D6D6] mb-3">Enter Article URL or Paste Text</label>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="https://example.com/article or paste article text here..."
                                className="w-full h-48 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FFC3]/30 focus:outline-none resize-none"
                                disabled={loading}
                            />
                        </div>

                        {/* Show extracted claim for confirmation */}
                        {extractedClaim && !analyzed && (
                            <div className="mb-6 p-4 rounded-xl bg-[#00FFC3]/10 border border-[#00FFC3]/30">
                                <div className="flex items-start gap-3 mb-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#00FFC3] flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <div className="text-sm text-[#00FFC3] mb-1">We detected this claim:</div>
                                        <textarea
                                            value={extractedClaim}
                                            onChange={(e) => setExtractedClaim(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FFC3]/30 focus:outline-none text-white min-h-[80px]"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => setExtractedClaim(null)}
                                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAnalyze}
                                        disabled={loading}
                                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#99F8FF] to-[#00FFC3] text-black hover:shadow-[0_0_30px_rgba(0,255,195,0.3)] transition-all text-sm disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            'Confirm & Analyze'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 1: Extract claim button (only if no extracted claim yet) */}
                        {!extractedClaim && (
                            <button
                                onClick={handleExtractClaim}
                                disabled={!inputText.trim() || extracting}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#99F8FF] to-[#00FFC3] text-black hover:shadow-[0_0_40px_rgba(153,248,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {extracting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Extracting Claim...</span>
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-5 h-5" />
                                        <span>Extract & Verify Claims</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const verdictStyle = getVerdictStyle(result?.verdict);
    const VerdictIcon = verdictStyle.icon;

    return (
        <div className="min-h-screen pt-20 pb-12 px-8">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-[#99F8FF]/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-[#00FFC3]/5 rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl mb-2">Fact-Check Analysis</h1>
                        <p className="text-[#D6D6D6]">Article verification complete</p>
                    </div>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        New Analysis
                    </button>
                </div>

                {/* Disclaimer Banner */}
                <div className="mb-6 p-4 rounded-xl bg-[#99F8FF]/10 border border-[#99F8FF]/30 flex items-start gap-3">
                    <Info className="w-5 h-5 text-[#99F8FF] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#D6D6D6]">
                        <span className="text-[#99F8FF] font-medium">Advisory Notice:</span> This is an automated assessment based on available online evidence and should not be considered legal, definitive, or absolute truth. Always verify critical information from multiple trusted sources.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8">
                    {/* Verdict Card */}
                    <div className={`col-span-1 p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br ${verdictStyle.bg} to-transparent border ${verdictStyle.border}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full ${verdictStyle.bg} flex items-center justify-center`}>
                                <VerdictIcon className={`w-5 h-5 ${verdictStyle.text}`} />
                            </div>
                            <div>
                                <div className="text-xs text-[#D6D6D6]">Overall Verdict</div>
                                <div className={`text-xl ${verdictStyle.text}`}>{result?.verdict || 'Unknown'}</div>
                            </div>
                        </div>
                        <div className="text-sm text-[#D6D6D6]">
                            Confidence: <span className="capitalize">{result?.confidence || 'Unknown'}</span>
                        </div>
                    </div>

                    {/* Domain Trust */}
                    <div className="col-span-1 p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                        <div className="text-sm text-[#D6D6D6] mb-2">Domain Trust Score</div>
                        <div className="text-3xl mb-3">{result?.domain_trust?.score || 'N/A'}</div>
                        <div className="text-xs text-[#D6D6D6] mb-2">{result?.domain_trust?.domain || 'No domain detected'}</div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] rounded-full" style={{ width: `${typeof result?.domain_trust?.score === 'number' ? result.domain_trust.score : 0}%` }} />
                        </div>
                    </div>

                    {/* Evidence Count */}
                    <div className="col-span-1 p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                        <div className="text-sm text-[#D6D6D6] mb-2">Evidence Found</div>
                        <div className="text-3xl mb-1">{result?.evidence?.length || 0} Sources</div>
                        <div className="text-xs text-[#00FFC3]">
                            {result?.evidence?.filter(e => e.stance === 'supporting').length || 0} supporting
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Explanation */}
                        <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                            <h2 className="text-xl mb-4">Analysis Explanation</h2>
                            <p className="text-[#D6D6D6] text-sm leading-relaxed">
                                {result?.explanation || 'No explanation available.'}
                            </p>
                        </div>

                        {/* Claims */}
                        <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                            <h2 className="text-xl mb-4">Analyzed Content</h2>
                            <div className="space-y-3">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="flex items-start gap-3">
                                        <VerdictIcon className={`w-5 h-5 ${verdictStyle.text} flex-shrink-0 mt-0.5`} />
                                        <div className="flex-1">
                                            <p className="text-sm mb-2">{inputText.slice(0, 200)}{inputText.length > 200 ? '...' : ''}</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded text-xs ${verdictStyle.bg} ${verdictStyle.text} border ${verdictStyle.border}`}>
                                                    {result?.verdict || 'Unknown'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Evidence Sources */}
                        <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                            <h2 className="text-xl mb-4">Evidence Sources</h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={evidenceData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                    <XAxis type="number" domain={[0, 100]} stroke="#666" />
                                    <YAxis type="category" dataKey="source" stroke="#666" width={100} />
                                    <Bar dataKey="reliability" fill="#00FFC3" radius={[0, 8, 8, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Fact-Check Info */}
                        <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                            <h2 className="text-xl mb-4">Fact-Check Results</h2>
                            {result?.factcheck?.found ? (
                                <div className="space-y-3">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-[#D6D6D6]">Rating</span>
                                            <span className="text-sm text-[#00FFC3]">{result.factcheck.rating || 'N/A'}</span>
                                        </div>
                                        <p className="text-sm">{result.factcheck.summary || 'No summary available'}</p>
                                        {result.factcheck.url && (
                                            <a href={result.factcheck.url} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-[#99F8FF] hover:underline mt-2">
                                                <ExternalLink className="w-3 h-3" /> View source
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm text-[#D6D6D6]">No existing fact-checks found for this claim.</div>
                            )}
                        </div>

                        {/* Evidence List */}
                        <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                            <h2 className="text-xl mb-4">Evidence Sources</h2>
                            {result?.evidence && result.evidence.length > 0 ? (
                                <div className="space-y-3">
                                    {result.evidence.map((ev, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-black text-xs ${ev.stance === 'supporting' ? 'bg-gradient-to-br from-[#00FFC3] to-[#99F8FF]'
                                                    : ev.stance === 'contradicting' ? 'bg-red-500'
                                                        : 'bg-gray-500'
                                                    }`}>
                                                    {ev.source ? ev.source[0]?.toUpperCase() : '?'}
                                                </div>
                                                <div>
                                                    <div className="text-sm">{ev.source || ev.title || 'Unknown Source'}</div>
                                                    <div className="text-xs text-[#D6D6D6]">{ev.description || ''}</div>
                                                    <div className={`text-xs ${ev.stance === 'supporting' ? 'text-[#00FFC3]'
                                                        : ev.stance === 'contradicting' ? 'text-red-400'
                                                            : 'text-gray-400'
                                                        }`}>{ev.stance}</div>
                                                </div>
                                            </div>
                                            {ev.url && (
                                                <a href={ev.url} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 text-[#666] hover:text-[#00FFC3]" />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-sm text-[#D6D6D6]">No evidence sources found.</div>
                            )}
                        </div>

                        {userMode !== 'Basic' && (
                            <>
                                {/* Claim Similarity Graph */}
                                <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                                    <h2 className="text-xl mb-4">Claim Similarity Analysis</h2>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={claimSimilarity}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                            <XAxis dataKey="claim" stroke="#666" tick={{ fontSize: 10 }} />
                                            <YAxis domain={[0, 100]} stroke="#666" />
                                            <Bar dataKey="match" fill="#99F8FF" radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Source Reliability Radar */}
                                {userMode === 'Professional' && (
                                    <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Network className="w-5 h-5 text-[#00FFC3]" />
                                            <h2 className="text-xl">Source Network Analysis</h2>
                                        </div>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <RadarChart data={sourceMetrics}>
                                                <PolarGrid stroke="#ffffff20" />
                                                <PolarAngleAxis dataKey="metric" stroke="#666" tick={{ fontSize: 10 }} />
                                                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#666" />
                                                <Radar dataKey="score" stroke="#00FFC3" fill="#00FFC3" fillOpacity={0.3} />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
