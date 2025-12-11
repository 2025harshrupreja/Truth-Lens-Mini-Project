import { useState } from 'react';
import { ArrowLeft, Download, Eye, EyeOff, ZoomIn, FileText, FolderPlus, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

interface ResultsCreatorProps {
  preview: string | null;
  onBack: () => void;
}

const modelData = [
  { model: 'ResNet-50', confidence: 94.2, color: '#00FFC3' },
  { model: 'EfficientNet', confidence: 91.8, color: '#99F8FF' },
  { model: 'XceptionNet', confidence: 96.1, color: '#00FFC3' },
  { model: 'MesoNet', confidence: 89.4, color: '#99F8FF' },
];

const anomalies = [
  { type: 'Face Boundary', status: 'Clear', severity: 'low' },
  { type: 'Eye Blink Pattern', status: 'Natural', severity: 'low' },
  { type: 'Lighting Consistency', status: 'Verified', severity: 'low' },
  { type: 'Pixel Grid Analysis', status: 'Normal', severity: 'low' },
];

export function ResultsCreator({ preview, onBack }: ResultsCreatorProps) {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showELA, setShowELA] = useState(false);

  return (
    <div className="min-h-screen pt-20 pb-12 px-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-[#00FFC3]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl mb-2">Forensic Analysis Report</h1>
          <p className="text-[#D6D6D6]">Creator Mode – Enhanced Analytics</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Panel - Media Viewer */}
          <div className="space-y-6">
            {/* Media Display */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl">Media Analysis</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      showHeatmap
                        ? 'bg-[#00FFC3]/20 border border-[#00FFC3]/50 text-[#00FFC3]'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    Heatmap
                  </button>
                  <button
                    onClick={() => setShowELA(!showELA)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      showELA
                        ? 'bg-[#99F8FF]/20 border border-[#99F8FF]/50 text-[#99F8FF]'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    ELA
                  </button>
                  <button className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden">
                <img src={preview || ''} alt="Analysis" className="w-full h-[600px] object-cover" />
                {showHeatmap && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-yellow-500/20 to-green-500/30 backdrop-blur-sm">
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-xs">
                      Manipulation Heatmap
                    </div>
                  </div>
                )}
                {showELA && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-blue-500/40 backdrop-blur-sm mix-blend-screen">
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-xs">
                      Error Level Analysis
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
                <div className="text-xs text-[#D6D6D6] mb-1">Overall Score</div>
                <div className="text-2xl text-[#00FFC3]">94.2%</div>
              </div>
              <div className="p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
                <div className="text-xs text-[#D6D6D6] mb-1">Risk Level</div>
                <div className="text-2xl">Low</div>
              </div>
              <div className="p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
                <div className="text-xs text-[#D6D6D6] mb-1">Verdict</div>
                <div className="text-2xl">Authentic</div>
              </div>
            </div>
          </div>

          {/* Right Panel - Analytics */}
          <div className="space-y-6">
            {/* Model Confidence Breakdown */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <h3 className="text-xl mb-4">Model Confidence Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={modelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis type="number" domain={[0, 100]} stroke="#666" />
                  <YAxis type="category" dataKey="model" stroke="#666" width={100} />
                  <Bar dataKey="confidence" radius={[0, 8, 8, 0]}>
                    {modelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Metadata Table */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <h3 className="text-xl mb-4">Metadata Information</h3>
              <div className="space-y-3">
                {[
                  { label: 'Camera Model', value: 'Canon EOS R5' },
                  { label: 'Date Taken', value: '2024-12-08 14:32:15' },
                  { label: 'GPS Location', value: '37.7749° N, 122.4194° W' },
                  { label: 'ISO', value: '400' },
                  { label: 'Exposure', value: '1/250s' },
                  { label: 'Focal Length', value: '50mm' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-[#D6D6D6]">{item.label}</span>
                    <span className="text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Anomaly Detection */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <h3 className="text-xl mb-4">Anomaly Detection</h3>
              <div className="grid grid-cols-2 gap-3">
                {anomalies.map((anomaly) => (
                  <div
                    key={anomaly.type}
                    className="px-4 py-3 rounded-lg bg-[#00FFC3]/10 border border-[#00FFC3]/30 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm mb-0.5">{anomaly.type}</div>
                      <div className="text-xs text-[#00FFC3]">{anomaly.status}</div>
                    </div>
                    <div className="w-2 h-2 bg-[#00FFC3] rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center gap-4">
          <button className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] text-black hover:shadow-[0_0_40px_rgba(0,255,195,0.4)] transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            <span>Export PDF Report</span>
          </button>
          <button className="px-6 py-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
            <Layers className="w-5 h-5" />
            <span>Export Assets</span>
          </button>
          <button className="px-6 py-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
            <FolderPlus className="w-5 h-5" />
            <span>Add to Project</span>
          </button>
        </div>
      </div>
    </div>
  );
}
