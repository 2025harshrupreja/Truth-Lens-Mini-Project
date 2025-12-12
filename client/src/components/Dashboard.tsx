import { useState, useEffect } from 'react';
import {
  Upload,
  FileText,
  FolderKanban,
  FileCheck,
  BarChart3,
  Shield,
  Loader2,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { Page, UserMode } from "../App";

interface DashboardProps {
  onNavigate: (page: Page) => void;
  userMode: UserMode;
}

interface UserStats {
  total_analyses: number;
  member_since: string;
  email: string;
}

// Placeholder chart data (will be replaced with real activity data later)
const accuracyData = [
  { month: "Jan", accuracy: 94 },
  { month: "Feb", accuracy: 95 },
  { month: "Mar", accuracy: 96 },
  { month: "Apr", accuracy: 97 },
  { month: "May", accuracy: 97 },
  { month: "Jun", accuracy: 98 },
];

export function Dashboard({
  onNavigate,
  userMode,
}: DashboardProps) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate weekly activity based on total analyses
  const generateWeeklyActivity = () => {
    const total = stats?.total_analyses || 0;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, i) => ({
      day,
      count: Math.max(0, Math.floor((total / 7) + (Math.random() * 3 - 1.5)))
    }));
  };

  const verificationData = generateWeeklyActivity();

  return (
    <div className="min-h-screen pt-20 pb-12 px-8">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-[#00FFC3]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-[#99F8FF]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-2">
              {[
                {
                  icon: BarChart3,
                  label: "Dashboard",
                  page: "dashboard" as Page,
                },
                {
                  icon: Upload,
                  label: "Image/Video Analysis",
                  page: "verify-media" as Page,
                },
                {
                  icon: FileText,
                  label: "Article Verification",
                  page: "verify-article" as Page,
                },
                {
                  icon: FileCheck,
                  label: "History",
                  page: "history" as Page,
                },
                {
                  icon: FolderKanban,
                  label: "Projects",
                  page: "projects" as Page,
                },
                ...(userMode === "Professional"
                  ? [
                    {
                      icon: Shield,
                      label: "Organization",
                      page: "organization" as Page,
                    },
                  ]
                  : []),
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.page)}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00FFC3]/30 transition-all flex items-center gap-3 group"
                >
                  <item.icon className="w-5 h-5 text-[#D6D6D6] group-hover:text-[#00FFC3]" />
                  <span className="text-sm text-[#D6D6D6] group-hover:text-white">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Welcome Panel */}
            <div className="mb-8 p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FFC3]/10 to-transparent opacity-30" />
              <div className="relative">
                <h1 className="text-3xl mb-2">
                  Welcome back to TruthLens
                </h1>
                <p className="text-[#D6D6D6]">
                  Your forensic verification dashboard is ready
                </p>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Verify Image/Video */}
              <button
                onClick={() => onNavigate("verify-media")}
                className="group p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#00FFC3]/50 hover:shadow-[0_0_40px_rgba(0,255,195,0.15)] transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFC3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00FFC3] to-[#99F8FF] flex items-center justify-center mb-4">
                    <Upload className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl mb-2">
                    Verify Image or Video
                  </h3>
                  <p className="text-sm text-[#D6D6D6]">
                    Upload media for deepfake and manipulation
                    detection
                  </p>
                </div>
              </button>

              {/* Verify Article */}
              <button
                onClick={() => onNavigate("verify-article")}
                className="group p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#00FFC3]/50 hover:shadow-[0_0_40px_rgba(0,255,195,0.15)] transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#99F8FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#99F8FF] to-[#00FFC3] flex items-center justify-center mb-4">
                    <FileText className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl mb-2">
                    Verify Article / URL
                  </h3>
                  <p className="text-sm text-[#D6D6D6]">
                    Fact-check claims and analyze source
                    credibility
                  </p>
                </div>
              </button>

              {/* Batch Analysis */}
              <div
                className={`group p-8 rounded-2xl backdrop-blur-md border transition-all relative overflow-hidden ${userMode === "Professional" ? "bg-white/5 border-white/10 hover:border-[#00FFC3]/50 hover:shadow-[0_0_40px_rgba(0,255,195,0.15)] cursor-pointer" : "bg-white/[0.02] border-white/5 cursor-not-allowed"}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 opacity-50 group-hover:opacity-100">
                    <FolderKanban className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl">Batch Analysis</h3>
                    <span className="px-2 py-0.5 rounded text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Pro
                    </span>
                  </div>
                  <p className="text-sm text-[#D6D6D6]">
                    Process multiple files simultaneously
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics Row */}
            <div className="grid grid-cols-4 gap-6">
              {/* Total Verifications - LIVE DATA */}
              <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FFC3]/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="text-sm text-[#D6D6D6] mb-2">
                    Total Verifications
                  </div>
                  {loading ? (
                    <Loader2 className="w-6 h-6 text-[#00FFC3] animate-spin" />
                  ) : (
                    <div className="text-3xl mb-1 text-[#00FFC3]">
                      {stats?.total_analyses ?? 0}
                    </div>
                  )}
                  <div className="text-xs text-[#888]">
                    All-time analyses
                  </div>
                </div>
              </div>

              {/* Accuracy Graph */}
              <div className="col-span-2 p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                <div className="text-sm text-[#D6D6D6] mb-4">
                  Model Accuracy Trend
                </div>
                <ResponsiveContainer width="100%" height={80}>
                  <AreaChart data={accuracyData}>
                    <defs>
                      <linearGradient
                        id="accuracyGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#00FFC3"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="#00FFC3"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#00FFC3"
                      strokeWidth={2}
                      fill="url(#accuracyGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* History Link - replacing Saved Reports */}
              <button
                onClick={() => onNavigate("history")}
                className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#00FFC3]/30 hover:bg-white/10 transition-all relative overflow-hidden text-left group"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#99F8FF]/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="text-sm text-[#D6D6D6] mb-2">
                    View History
                  </div>
                  <div className="text-xl mb-1 group-hover:text-[#00FFC3] transition-colors">
                    Past Analyses →
                  </div>
                  <div className="text-xs text-[#888]">
                    Browse all results
                  </div>
                </div>
              </button>
            </div>

            {/* Weekly Activity */}
            <div className="mt-6 p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <div className="text-sm text-[#D6D6D6] mb-4">
                Weekly Verification Activity
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={verificationData}>
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#00FFC3" />
                      <stop offset="100%" stopColor="#99F8FF" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff10"
                  />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={{ fill: "#00FFC3", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}