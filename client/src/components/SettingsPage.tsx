import { useState, useEffect } from 'react';
import { User, Shield, LogOut, Loader2, Calendar, BarChart3 } from 'lucide-react';
import type { Page } from '../App';

interface SettingsPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

interface UserProfile {
  id: number;
  email: string;
  member_since: string;
  total_analyses: number;
}

export function SettingsPage({ onLogout }: SettingsPageProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#00FFC3] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-8">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 right-1/3 w-[500px] h-[500px] bg-[#00FFC3]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Settings</h1>
          <p className="text-[#888]">Manage your account</p>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00FFC3] to-[#99F8FF] flex items-center justify-center">
                <User className="w-8 h-8 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {profile?.email || 'Unknown User'}
                </h2>
                <p className="text-[#888] text-sm">TruthLens User</p>
              </div>
            </div>

            {error ? (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {/* Member Since */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-[#888] mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <div className="text-lg font-semibold text-[#00FFC3]">
                    {profile?.member_since ? formatDate(profile.member_since) : '—'}
                  </div>
                </div>

                {/* Total Analyses */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-[#888] mb-2">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm">Total Analyses</span>
                  </div>
                  <div className="text-lg font-semibold text-[#00FFC3]">
                    {profile?.total_analyses ?? 0}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00FFC3]/10 border border-[#00FFC3]/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#00FFC3]" />
              </div>
              <h3 className="text-lg font-semibold">Security</h3>
            </div>
            <p className="text-[#888] text-sm">
              Your data is encrypted and securely stored. For password changes,
              please contact support.
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all flex items-center justify-center gap-3 text-red-400 group"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="font-semibold">Sign Out</span>
          </button>
        </div>

        {/* Version */}
        <div className="mt-8 text-center text-[#666] text-sm">
          TruthLens v0.1.0 • MVP Edition
        </div>
      </div>
    </div>
  );
}
