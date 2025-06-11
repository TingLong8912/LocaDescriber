'use client';

import { IconBtn } from '@/components/ui/IconBtn';
import { PanelRightOpen, PanelRightDashed, Moon, PanelLeftDashed, PanelLeftOpen, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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
  const [isDark, setIsDark] = useState(
    typeof window !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const handler = () => setIsDark(document.documentElement.classList.contains("dark"));
    window.addEventListener("storage", handler);
    // 監聽 class 變化（切換 dark mode 時 class 會變）
    const observer = new MutationObserver(handler);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      window.removeEventListener("storage", handler);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="h-16 w-full border-b border-border flex items-center px-4 justify-between bg-background">
      <div className="flex items-center space-x-2">
        <IconBtn
          icon={<PanelLeftDashed size={20} />}
          hoverIcon={<PanelLeftOpen size={20} />}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <img src={isDark ? "/logo_dark.svg" : "/logo_light.svg"} alt="LocaDescriber Logo" className="h-8" />
      </div>
      <div className='flex items-center space-x-4'>
        <IconBtn
          icon={<Sun size={20} />}
          hoverIcon={<Moon size={20} />}
          onClick={() => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            window.dispatchEvent(new Event('storage'));
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