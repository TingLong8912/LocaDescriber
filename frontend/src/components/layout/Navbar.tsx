'use client';

import { IconBtn } from '@/components/ui/IconBtn';
import { PanelRightOpen, PanelRightDashed, Moon, PanelLeftDashed, PanelLeftOpen, Sun } from 'lucide-react';
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
      <div className='flex items-center space-x-4'>
        <IconBtn
          icon={<Sun size={20} />}
          hoverIcon={<Moon size={20} />}
          onClick={() => {
            document.documentElement.classList.toggle('dark');
          }}
        />
        {pathname !== '/home' && pathname !== "/ontology" && (
          <IconBtn
            icon={<PanelRightDashed size={20} />}
            hoverIcon={<PanelRightOpen size={20} />}
            onClick={() => setIsEventPanelOpen(!isEventPanelOpen)}
          />
        )}
      </div>
    </header>
  );
}