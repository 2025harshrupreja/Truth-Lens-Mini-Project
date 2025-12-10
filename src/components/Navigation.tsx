import { useState } from 'react';
import { Search, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import type { Page, UserMode } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userMode: UserMode;
  onModeChange: (mode: UserMode) => void;
  userEmail?: string;
  onLogout?: () => void;
}

export function Navigation({ currentPage, onNavigate, userMode, onModeChange, userEmail, onLogout }: NavigationProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const menuItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'landing' },
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'Verify Media', page: 'verify-media' },
    { label: 'Verify Article', page: 'verify-article' },
    { label: 'History', page: 'history' },
    { label: 'Projects', page: 'projects' },
    { label: 'Professional Suite', page: 'organization' },
  ];

  const modes: UserMode[] = ['Basic', 'Creator', 'Professional'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Logo & Menu */}
        <div className="flex items-center gap-12">
          <div className="text-xl font-bold bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] bg-clip-text text-transparent">
            TruthLens
          </div>
          <div className="flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-sm transition-colors ${currentPage === item.page
                    ? 'text-white'
                    : 'text-[#D6D6D6] hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 backdrop-blur-sm">
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => onModeChange(mode)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all ${userMode === mode
                    ? 'bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] text-black'
                    : 'text-[#D6D6D6] hover:text-white'
                  }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Icons */}
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-[#D6D6D6]" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-[#D6D6D6]" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00FFC3] rounded-full" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00FFC3] to-[#99F8FF] flex items-center justify-center">
                <User className="w-5 h-5 text-black" />
              </div>
              <ChevronDown className={`w-4 h-4 text-[#D6D6D6] transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#1A1A1A] border border-white/10 shadow-xl overflow-hidden">
                {userEmail && (
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="text-xs text-[#D6D6D6]">Signed in as</div>
                    <div className="text-sm truncate">{userEmail}</div>
                  </div>
                )}
                <button
                  onClick={() => onNavigate('settings')}
                  className="w-full px-4 py-2.5 text-left text-sm text-[#D6D6D6] hover:bg-white/5 hover:text-white transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout?.();
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
