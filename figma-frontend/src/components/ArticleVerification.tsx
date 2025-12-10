import { useState } from 'react';
import { FileText, ExternalLink, CheckCircle2, AlertCircle, XCircle, TrendingUp, Network } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import type { UserMode } from '../App';

interface ArticleVerificationProps {
  userMode: UserMode;
}

const evidenceData = [
  { source: 'Reuters', reliability: 95, supporting: true },
  { source: 'AP News', reliability: 92, supporting: true },
  { source: 'BBC', reliability: 88, supporting: true },
  { source: 'Unknown Blog', reliability: 45, supporting: false },
];

const claimSimilarity = [
  { claim: 'Original', match: 100 },
  { claim: 'Variant 1', match: 87 },
  { claim: 'Variant 2', match: 92 },
  { claim: 'Variant 3', match: 78 },
  { claim: 'Variant 4', match: 65 },
];

const sourceMetrics = [
  { metric: 'Credibility', score: 85 },
  { metric: 'Bias Score', score: 70 },
  { metric: 'Fact Record', score: 92 },
  { metric: 'Source Age', score: 95 },
  { metric: 'Citations', score: 88 },
];

export function ArticleVerification({ userMode }: ArticleVerificationProps) {
  const [url, setUrl] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setAnalyzed(true);
  };

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
            <div className="mb-6">
              <label className="block text-sm text-[#D6D6D6] mb-3">Enter Article URL or Paste Text</label>
              <textarea
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article or paste article text here..."
                className="w-full h-48 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FFC3]/30 focus:outline-none resize-none"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!url}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#99F8FF] to-[#00FFC3] text-black hover:shadow-[0_0_40px_rgba(153,248,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              <span>Extract & Verify Claims</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-[#99F8FF]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-[#00FFC3]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Fact-Check Analysis</h1>
          <p className="text-[#D6D6D6]">Article verification complete</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Verdict Card */}
          <div className="col-span-1 p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br from-[#00FFC3]/10 to-transparent border border-[#00FFC3]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00FFC3]/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#00FFC3]" />
              </div>
              <div>
                <div className="text-xs text-[#D6D6D6]">Overall Verdict</div>
                <div className="text-xl">Mostly True</div>
              </div>
            </div>
            <div className="text-sm text-[#D6D6D6]">
              Claims are supported by credible sources with minor discrepancies
            </div>
          </div>

          {/* Domain Trust */}
          <div className="col-span-1 p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="text-sm text-[#D6D6D6] mb-2">Domain Trust Score</div>
            <div className="text-3xl mb-3">87/100</div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] rounded-full" style={{ width: '87%' }} />
            </div>
          </div>

          {/* Evidence Count */}
          <div className="col-span-1 p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="text-sm text-[#D6D6D6] mb-2">Supporting Evidence</div>
            <div className="text-3xl mb-1">12 Sources</div>
            <div className="text-xs text-[#00FFC3]">9 high-credibility</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Claims */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <h2 className="text-xl mb-4">Extracted Claims</h2>
              <div className="space-y-3">
                {[
                  { text: 'Global temperatures rose 1.1°C since pre-industrial times', status: 'true' },
                  { text: 'Renewable energy costs decreased by 90% in the last decade', status: 'mostly-true' },
                  { text: 'AI models will replace 85% of jobs by 2030', status: 'false' },
                ].map((claim, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-start gap-3">
                      {claim.status === 'true' ? (
                        <CheckCircle2 className="w-5 h-5 text-[#00FFC3] flex-shrink-0 mt-0.5" />
                      ) : claim.status === 'mostly-true' ? (
                        <AlertCircle className="w-5 h-5 text-[#99F8FF] flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm mb-2">{claim.text}</p>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            claim.status === 'true'
                              ? 'bg-[#00FFC3]/10 text-[#00FFC3] border border-[#00FFC3]/30'
                              : claim.status === 'mostly-true'
                              ? 'bg-[#99F8FF]/10 text-[#99F8FF] border border-[#99F8FF]/30'
                              : 'bg-red-500/10 text-red-400 border border-red-500/30'
                          }`}>
                            {claim.status === 'true' ? 'True' : claim.status === 'mostly-true' ? 'Mostly True' : 'False'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
            {/* Fact-Check Links */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <h2 className="text-xl mb-4">Fact-Check Resources</h2>
              <div className="space-y-3">
                {[
                  { org: 'Snopes', verdict: 'True', url: '#' },
                  { org: 'PolitiFact', verdict: 'Mostly True', url: '#' },
                  { org: 'FactCheck.org', verdict: 'Accurate', url: '#' },
                  { org: 'Full Fact', verdict: 'Correct', url: '#' },
                ].map((fc, i) => (
                  <a
                    key={i}
                    href={fc.url}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00FFC3]/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FFC3] to-[#99F8FF] flex items-center justify-center text-black text-xs">
                        {fc.org[0]}
                      </div>
                      <div>
                        <div className="text-sm">{fc.org}</div>
                        <div className="text-xs text-[#00FFC3]">{fc.verdict}</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#666] group-hover:text-[#00FFC3]" />
                  </a>
                ))}
              </div>
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
