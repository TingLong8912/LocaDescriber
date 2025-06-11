'use client';

import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { EventPanel } from '@/components/layout/EventPanel';
import { usePersistentState } from '@/hooks/usePersistentState';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProgress } from '@/context/ProgressContext';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = usePersistentState('sidebar-open', false);
  const [isEventPanelOpen, setIsEventPanelOpen] = usePersistentState('eventpanel-open', false);
  const pathname = usePathname();
  const showPanel = pathname !== '/home' && pathname !== '/ontology';

  const { steps } = useProgress();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);
  
  useEffect(() => {
    if (steps.length > 0) {
      setIsEventPanelOpen(true);
    }
  }, [steps]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div className="relative h-full w-full min-h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        <Sidebar key="sidebar" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        {showPanel && (
          <EventPanel key="eventpanel" isOpen={isEventPanelOpen} onClose={() => setIsEventPanelOpen(false)} />
        )}
      </AnimatePresence>

      <div
        className={clsx(
          'flex flex-col h-screen transition-all duration-300',
          {
            'ml-64': isSidebarOpen,
            'mr-64': showPanel && isEventPanelOpen,
          }
        )}
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isEventPanelOpen={isEventPanelOpen}
          setIsEventPanelOpen={setIsEventPanelOpen}
        />
        <main className="flex-grow h-full w-full overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}