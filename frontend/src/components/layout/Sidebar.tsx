'use client';

import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        key="sidebar-desktop"
        initial={{ x: -260, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -260, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 z-30 w-64 h-full border-r border-border bg-background p-4 hidden lg:block"
      >
        <SidebarContent onClose={onClose} />
      </motion.aside>

      {/* Mobile Sidebar */}
      <motion.div
        key="sidebar-mobile"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-40 w-64 bg-background p-4 lg:hidden"
      >
        <SidebarContent onClose={onClose} />
      </motion.div>
    </>
  );
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <p className="font-medium mb-2">Sidebar Menu</p>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:underline" onClick={() => (window.location.href = '/home')}>
          Home
        </li>
        <li className="cursor-pointer hover:underline" onClick={() => (window.location.href = '/map')}>
          Map
        </li>
        <li className="cursor-pointer hover:underline" onClick={() => (window.location.href = '/ontology')}>
          Ontology
        </li>
      </ul>
      <button onClick={onClose} className="mt-4 text-sm underline">
        Close
      </button>
    </>
  );
}