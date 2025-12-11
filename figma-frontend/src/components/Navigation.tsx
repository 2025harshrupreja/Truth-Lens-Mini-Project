import { Search, Bell, User, Lock } from 'lucide-react';
import type { Page, UserMode } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userMode: UserMode;
  onModeChange: (mode: UserMode) => void;
}

// Define which pages are Coming Soon (non-MVP)
const comingSoonPages: Page[] = ['verify-media', 'projects', 'organization'];

export function Navigation({ currentPage, onNavigate, userMode, onModeChange }: NavigationProps) {
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

  const isComingSoon = (page: Page) => comingSoonPages.includes(page);

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
                className={`text-sm transition-colors relative group ${currentPage === item.page
                    ? 'text-white'
                    : isComingSoon(item.page)
                      ? 'text-[#666] hover:text-[#888]'
                      : 'text-[#D6D6D6] hover:text-white'
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.label}
                  {isComingSoon(item.page) && (
                    <span className="px-1.5 py-0.5 text-[9px] rounded bg-white/10 text-[#888] border border-white/10 uppercase tracking-wide">
                      Soon
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Mode Switcher - Only Basic is available */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 backdrop-blur-sm relative group">
            {modes.map((mode) => {
              const isLocked = mode !== 'Basic';
              return (
                <button
                  key={mode}
                  onClick={() => !isLocked && onModeChange(mode)}
                  disabled={isLocked}
                  className={`px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 ${userMode === mode && !isLocked
                      ? 'bg-gradient-to-r from-[#00FFC3] to-[#99F8FF] text-black'
                      : isLocked
                        ? 'text-[#555] cursor-not-allowed'
                        : 'text-[#D6D6D6] hover:text-white'
                    }`}
                  title={isLocked ? 'Coming Soon in v2.0' : undefined}
                >
                  {mode}
                  {isLocked && <Lock className="w-3 h-3" />}
                </button>
              );
            })}
            {/* Tooltip for locked modes */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-white/10 rounded-lg text-[10px] text-[#888] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Creator & Professional modes coming in v2.0
            </div>
          </div>

          {/* Icons */}
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-[#D6D6D6]" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-[#D6D6D6]" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00FFC3] rounded-full" />
          </button>
          <button className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00FFC3] to-[#99F8FF] flex items-center justify-center">
            <User className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </nav>
  );
}

