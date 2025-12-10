import { Search, Bell, User } from 'lucide-react';
import type { Page, UserMode } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userMode: UserMode;
  onModeChange: (mode: UserMode) => void;
}

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
                className={`text-sm transition-colors ${
                  currentPage === item.page
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
                className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                  userMode === mode
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
          <button className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00FFC3] to-[#99F8FF] flex items-center justify-center">
            <User className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </nav>
  );
}
