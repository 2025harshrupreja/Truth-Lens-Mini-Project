import { useState } from 'react';
import { Users, UserPlus, Shield, Activity, Mail, MoreVertical } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Investigator' | 'Analyst' | 'Viewer';
  status: 'active' | 'pending';
  lastActive: string;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Dr. Sarah Chen', email: 'sarah.chen@org.com', role: 'Admin', status: 'active', lastActive: '5 min ago' },
  { id: '2', name: 'Marcus Rodriguez', email: 'marcus.r@org.com', role: 'Investigator', status: 'active', lastActive: '1 hour ago' },
  { id: '3', name: 'Emily Watson', email: 'emily.w@org.com', role: 'Analyst', status: 'active', lastActive: '2 hours ago' },
  { id: '4', name: 'James Park', email: 'james.p@org.com', role: 'Investigator', status: 'active', lastActive: '1 day ago' },
  { id: '5', name: 'Lisa Anderson', email: 'lisa.a@org.com', role: 'Viewer', status: 'pending', lastActive: 'Never' },
];

const activityLog = [
  { user: 'Dr. Sarah Chen', action: 'uploaded evidence to Case #2847', time: '5 minutes ago' },
  { user: 'Marcus Rodriguez', action: 'completed video analysis', time: '1 hour ago' },
  { user: 'Emily Watson', action: 'updated investigation notes', time: '2 hours ago' },
  { user: 'Dr. Sarah Chen', action: 'added new team member', time: '3 hours ago' },
  { user: 'James Park', action: 'exported forensic report', time: '1 day ago' },
];

export function OrganizationPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Investigator': return 'bg-[#00FFC3]/20 text-[#00FFC3] border-[#00FFC3]/30';
      case 'Analyst': return 'bg-[#99F8FF]/20 text-[#99F8FF] border-[#99F8FF]/30';
      case 'Viewer': return 'bg-white/10 text-[#D6D6D6] border-white/20';
      default: return 'bg-white/5 text-white border-white/10';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-[#00FFC3]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl mb-2">Organization</h1>
            <p className="text-[#D6D6D6]">Manage team members and permissions</p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] text-black hover:shadow-[0_0_40px_rgba(0,255,195,0.4)] transition-all flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            <span>Invite Member</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FFC3]/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="text-sm text-[#D6D6D6] mb-2">Total Members</div>
              <div className="text-3xl">24</div>
            </div>
          </div>
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="text-sm text-[#D6D6D6] mb-2">Active Now</div>
            <div className="text-3xl">8</div>
          </div>
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="text-sm text-[#D6D6D6] mb-2">Pending Invites</div>
            <div className="text-3xl">3</div>
          </div>
          <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="text-sm text-[#D6D6D6] mb-2">Active Cases</div>
            <div className="text-3xl">12</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Team Members Table */}
          <div className="col-span-2 p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Team Members</h2>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm">
                  All Roles
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {teamMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`w-full p-4 rounded-xl transition-all flex items-center gap-4 ${
                    selectedMember?.id === member.id
                      ? 'bg-white/10 border border-[#00FFC3]/30'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FFC3] to-[#99F8FF] flex items-center justify-center text-black">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {member.status === 'active' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00FFC3] rounded-full border-2 border-[#0A0A0A]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{member.name}</span>
                      {member.role === 'Admin' && <Shield className="w-3 h-3 text-purple-400" />}
                    </div>
                    <div className="text-sm text-[#D6D6D6]">{member.email}</div>
                  </div>

                  {/* Role & Status */}
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                    <div className="text-xs text-[#666] w-20 text-right">{member.lastActive}</div>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-[#666]" />
                    </button>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1 space-y-6">
            {/* Member Details */}
            {selectedMember && (
              <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                <h3 className="text-xl mb-4">Member Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00FFC3] to-[#99F8FF] flex items-center justify-center text-black text-xl">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{selectedMember.name}</div>
                      <div className="text-sm text-[#D6D6D6]">{selectedMember.email}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-[#D6D6D6] mb-2">Role</div>
                    <select className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FFC3]/30 focus:outline-none text-sm">
                      <option>{selectedMember.role}</option>
                      <option>Admin</option>
                      <option>Investigator</option>
                      <option>Analyst</option>
                      <option>Viewer</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-xs text-[#D6D6D6] mb-2">Permissions</div>
                    <div className="space-y-2">
                      {[
                        'Upload Media',
                        'Run Analysis',
                        'Export Reports',
                        'Manage Team',
                      ].map((permission, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={i < 3}
                            className="w-4 h-4 rounded bg-white/5 border-white/20 text-[#00FFC3] focus:ring-[#00FFC3]"
                          />
                          <span className="text-sm">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <button className="w-full py-2 rounded-lg bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] text-black hover:shadow-[0_0_30px_rgba(0,255,195,0.3)] transition-all text-sm">
                      Save Changes
                    </button>
                    <button className="w-full py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all text-sm">
                      Remove Member
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Log */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-[#00FFC3]" />
                <h3 className="text-xl">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {activityLog.map((log, i) => (
                  <div key={i} className="pb-3 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="text-sm mb-1">{log.user}</div>
                    <div className="text-xs text-[#D6D6D6] mb-1">{log.action}</div>
                    <div className="text-xs text-[#666]">{log.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
