import { useState } from 'react';
import { Search, Image, Video, FileText, ChevronRight, Filter, Download } from 'lucide-react';

interface HistoryItem {
  id: string;
  type: 'image' | 'video' | 'article';
  name: string;
  date: string;
  verdict: string;
  confidence: number;
}

const historyData: HistoryItem[] = [
  { id: '1', type: 'image', name: 'suspect_photo_001.jpg', date: '2024-12-08 14:32', verdict: 'Authentic', confidence: 94.2 },
  { id: '2', type: 'video', name: 'news_clip_december.mp4', date: '2024-12-08 13:15', verdict: 'Manipulated', confidence: 87.5 },
  { id: '3', type: 'article', name: 'Climate change article verification', date: '2024-12-08 11:45', verdict: 'Mostly True', confidence: 85.0 },
  { id: '4', type: 'image', name: 'social_media_post.png', date: '2024-12-07 16:20', verdict: 'Authentic', confidence: 91.8 },
  { id: '5', type: 'video', name: 'interview_footage.mp4', date: '2024-12-07 14:55', verdict: 'Suspicious', confidence: 68.3 },
  { id: '6', type: 'article', name: 'Tech industry news fact-check', date: '2024-12-07 10:30', verdict: 'True', confidence: 96.1 },
  { id: '7', type: 'image', name: 'document_scan_025.jpg', date: '2024-12-06 15:40', verdict: 'Authentic', confidence: 89.7 },
  { id: '8', type: 'video', name: 'security_camera_feed.mp4', date: '2024-12-06 09:15', verdict: 'Authentic', confidence: 93.4 },
];

export function HistoryPage() {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'article'>('all');

  const filteredData = historyData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      default: return null;
    }
  };

  const getVerdictColor = (verdict: string) => {
    if (verdict.includes('Authentic') || verdict.includes('True')) return 'text-[#00FFC3]';
    if (verdict.includes('Suspicious') || verdict.includes('Mostly')) return 'text-[#99F8FF]';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/3 w-[500px] h-[500px] bg-[#00FFC3]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Verification History</h1>
          <p className="text-[#D6D6D6]">View and manage past analyses</p>
        </div>

        {/* Filters & Search */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by filename..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FFC3]/30 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'image', 'video', 'article'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm transition-all capitalize ${
                  filterType === type
                    ? 'bg-[#00FFC3]/20 border border-[#00FFC3]/50 text-[#00FFC3]'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* History Table */}
          <div className="col-span-2 p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="space-y-2">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-white/10 text-sm text-[#D6D6D6]">
                <div className="col-span-1">Type</div>
                <div className="col-span-5">Name</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Verdict</div>
                <div className="col-span-2">Confidence</div>
              </div>

              {/* Rows */}
              {filteredData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full grid grid-cols-12 gap-4 p-4 rounded-xl transition-all ${
                    selectedItem?.id === item.id
                      ? 'bg-white/10 border border-[#00FFC3]/30'
                      : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.type === 'image' ? 'bg-[#00FFC3]/10 text-[#00FFC3]' :
                      item.type === 'video' ? 'bg-[#99F8FF]/10 text-[#99F8FF]' :
                      'bg-purple-500/10 text-purple-400'
                    }`}>
                      {getTypeIcon(item.type)}
                    </div>
                  </div>
                  <div className="col-span-5 flex items-center text-left">
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="col-span-2 flex items-center text-sm text-[#D6D6D6]">
                    {item.date}
                  </div>
                  <div className={`col-span-2 flex items-center ${getVerdictColor(item.verdict)}`}>
                    {item.verdict}
                  </div>
                  <div className="col-span-2 flex items-center justify-between">
                    <span>{item.confidence}%</span>
                    <ChevronRight className="w-4 h-4 text-[#666]" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="col-span-1">
            {selectedItem ? (
              <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 sticky top-24">
                <h3 className="text-xl mb-4">Report Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-[#D6D6D6] mb-1">File Name</div>
                    <div className="text-sm">{selectedItem.name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#D6D6D6] mb-1">Type</div>
                    <div className="text-sm capitalize">{selectedItem.type}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#D6D6D6] mb-1">Analysis Date</div>
                    <div className="text-sm">{selectedItem.date}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#D6D6D6] mb-1">Verdict</div>
                    <div className={`text-sm ${getVerdictColor(selectedItem.verdict)}`}>
                      {selectedItem.verdict}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#D6D6D6] mb-2">Confidence Score</div>
                    <div className="text-2xl mb-2">{selectedItem.confidence}%</div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] rounded-full"
                        style={{ width: `${selectedItem.confidence}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] text-black hover:shadow-[0_0_30px_rgba(0,255,195,0.3)] transition-all text-sm">
                      View Full Report
                    </button>
                    <button className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 h-full flex items-center justify-center text-center">
                <div>
                  <Filter className="w-12 h-12 text-[#666] mx-auto mb-3" />
                  <p className="text-[#D6D6D6]">Select an item to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
