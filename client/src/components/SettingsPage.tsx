import { User, Lock, Bell, Palette, Info, Shield, Mail, Globe } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 right-1/3 w-[500px] h-[500px] bg-[#00FFC3]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Settings</h1>
          <p className="text-[#D6D6D6]">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Account Settings */}
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FFC3]/20 to-[#99F8FF]/20 border border-[#00FFC3]/30 flex items-center justify-center">
                <User className="w-5 h-5 text-[#00FFC3]" />
              </div>
              <h2 className="text-2xl">Account</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#D6D6D6] mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Dr. Sarah Chen"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FFC3]/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#D6D6D6] mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="sarah.chen@truthlens.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FFC3]/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#D6D6D6] mb-2">Organization</label>
                <input
                  type="text"
                  defaultValue="Digital Forensics Institute"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FFC3]/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#D6D6D6] mb-2">Job Title</label>
                <input
                  type="text"
                  defaultValue="Senior Forensic Analyst"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FFC3]/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] text-black hover:shadow-[0_0_40px_rgba(0,255,195,0.4)] transition-all">
                Save Changes
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                Cancel
              </button>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FFC3]/20 to-[#99F8FF]/20 border border-[#00FFC3]/30 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#00FFC3]" />
              </div>
              <h2 className="text-2xl">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-medium mb-1">Two-Factor Authentication</div>
                  <div className="text-sm text-[#D6D6D6]">Add an extra layer of security to your account</div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#00FFC3]/10 border border-[#00FFC3]/30 text-[#00FFC3] hover:bg-[#00FFC3]/20 transition-all text-sm">
                  Enable
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-medium mb-1">Change Password</div>
                  <div className="text-sm text-[#D6D6D6]">Update your password regularly for security</div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm">
                  Update
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-medium mb-1">Session History</div>
                  <div className="text-sm text-[#D6D6D6]">View and manage active sessions</div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm">
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FFC3]/20 to-[#99F8FF]/20 border border-[#00FFC3]/30 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#00FFC3]" />
              </div>
              <h2 className="text-2xl">Notifications</h2>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Analysis Complete', description: 'Get notified when verification is complete' },
                { label: 'Team Updates', description: 'Updates from team members and collaborators' },
                { label: 'System Alerts', description: 'Important system notifications and updates' },
                { label: 'Weekly Reports', description: 'Receive weekly summary of your activity' },
              ].map((notif, i) => (
                <label key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
                  <div>
                    <div className="font-medium mb-1">{notif.label}</div>
                    <div className="text-sm text-[#D6D6D6]">{notif.description}</div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={i < 2}
                    className="w-5 h-5 rounded bg-white/5 border-white/20 text-[#00FFC3] focus:ring-[#00FFC3] cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FFC3]/20 to-[#99F8FF]/20 border border-[#00FFC3]/30 flex items-center justify-center">
                <Palette className="w-5 h-5 text-[#00FFC3]" />
              </div>
              <h2 className="text-2xl">Appearance</h2>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1">Theme</div>
                  <div className="text-sm text-[#D6D6D6]">Pure Dark Mode – Optimized for forensic work</div>
                </div>
                <div className="px-4 py-2 rounded-lg bg-[#00FFC3]/10 border border-[#00FFC3]/30 text-[#00FFC3] text-sm">
                  Dark Mode Only
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FFC3]/20 to-[#99F8FF]/20 border border-[#00FFC3]/30 flex items-center justify-center">
                <Info className="w-5 h-5 text-[#00FFC3]" />
              </div>
              <h2 className="text-2xl">About & Transparency</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Version</div>
                  <div className="text-[#00FFC3]">v2.4.0</div>
                </div>
                <div className="text-sm text-[#D6D6D6]">
                  TruthLens Professional Forensic Suite
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                  <Globe className="w-5 h-5 text-[#00FFC3] mb-2" />
                  <div className="text-sm">Documentation</div>
                </button>
                <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                  <Shield className="w-5 h-5 text-[#00FFC3] mb-2" />
                  <div className="text-sm">Privacy Policy</div>
                </button>
                <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                  <Mail className="w-5 h-5 text-[#00FFC3] mb-2" />
                  <div className="text-sm">Contact Support</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
