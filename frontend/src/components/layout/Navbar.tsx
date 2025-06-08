'use client';

import { IconBtn } from '@/components/ui/IconBtn';
import { ChevronRight, Menu, Moon, PanelLeftDashed, PanelLeftOpen, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  isEventPanelOpen: boolean;
  setIsEventPanelOpen: (value: boolean) => void;
}

export function Navbar({
  isSidebarOpen,
  setIsSidebarOpen,
  isEventPanelOpen,
  setIsEventPanelOpen,
}: NavbarProps) {
  const pathname = usePathname();
  return (
    <header className="h-16 w-full border-b border-border flex items-center px-4 justify-between bg-background">
      <div className="flex items-center space-x-2">
        <IconBtn
          icon={<PanelLeftDashed size={20} />}
          hoverIcon={<PanelLeftOpen size={20} />}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <img src="/logo.svg" alt="LocaDescriber Logo" className="h-8" />
      </div>
      <div>
        {pathname !== '/home' && (
          <button
            onClick={() => setIsEventPanelOpen(!isEventPanelOpen)}
            className="text-sm px-3 py-1 bg-muted rounded hover:bg-muted/80"
          >
            {isEventPanelOpen ? 'Hide Panel' : 'Show Panel'}
          </button>
        )}
        <IconBtn
          icon={<Sun />}
          hoverIcon={<Moon />}
          onClick={() => {
            document.documentElement.classList.toggle('dark');
          }}
        />
      </div>
    </header>
  );
}