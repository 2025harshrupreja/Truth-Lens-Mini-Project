import { useState } from 'react';
import { ArrowLeft, Download, Eye, EyeOff, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ResultsBasicProps {
  preview: string | null;
  onBack: () => void;
}

export function ResultsBasic({ preview, onBack }: ResultsBasicProps) {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const verdict = 'LIKELY AUTHENTIC';

  return (
    <div className="min-h-screen pt-20 pb-12 px-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-[#00FFC3]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Verdict */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#00FFC3]/10 border border-[#00FFC3]/30 mb-4">
            <CheckCircle2 className="w-5 h-5 text-[#00FFC3]" />
            <span className="text-[#00FFC3]">Verification Complete</span>
          </div>
          <h1 className="text-5xl mb-4">{verdict}</h1>
          <p className="text-[#D6D6D6]">Our forensic AI has analyzed your media</p>
        </div>

        {/* Media Display */}
        <div className="mb-8 p-8 rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Analysis Preview</h2>
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              {showHeatmap ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showHeatmap ? 'Hide' : 'Show'} Heatmap</span>
            </button>
          </div>
          
          <div className="relative rounded-xl overflow-hidden">
            <img src={preview || ''} alt="Analysis" className="w-full h-[500px] object-cover" />
            {showHeatmap && (
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-yellow-500/20 to-green-500/30 backdrop-blur-sm">
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-xs">
                  Manipulation Probability Heatmap
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Key Findings */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="text-sm text-[#D6D6D6] mb-2">Model Confidence</div>
            <div className="text-3xl mb-1">94.2%</div>
            <div className="text-xs text-[#00FFC3]">High confidence</div>
          </div>

          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="text-sm text-[#D6D6D6] mb-2">Metadata Status</div>
            <div className="text-3xl mb-1">Valid</div>
            <div className="text-xs text-[#D6D6D6]">Original EXIF intact</div>
          </div>

          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="text-sm text-[#D6D6D6] mb-2">Artifacts Detected</div>
            <div className="text-3xl mb-1">None</div>
            <div className="text-xs text-[#D6D6D6]">No compression issues</div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-[#00FFC3]/10 to-transparent border border-[#00FFC3]/30 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#00FFC3]/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#00FFC3]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl mb-2">Recommendation</h3>
              <p className="text-[#D6D6D6]">
                Based on our analysis, this media shows no signs of manipulation or deepfake artifacts. 
                The metadata is consistent with original capture, and forensic checks passed successfully.
              </p>
            </div>
          </div>
        </div>

        {/* Export */}
        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] text-black hover:shadow-[0_0_40px_rgba(0,255,195,0.4)] transition-all flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          <span>Export Simple Report</span>
        </button>
      </div>
    </div>
  );
}
