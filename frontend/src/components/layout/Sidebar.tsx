'use client';

import { motion } from 'framer-motion';
import SidebarItem from '@/components/ui/SidebarItem';
import { Home, Map, Circle, X } from 'lucide-react';

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
      <div onClick={onClose} className="flex justify-end">
        <X className="cursor-pointer" />
      </div>
      <ul className="space-y-2">
        <SidebarItem label="Home" href="/home" icon={<Home className='h-5 w-5 mr-2' />} onClick={onClose} />
        <SidebarItem label="Map" href="/map" icon={<Map className='h-5 w-5 mr-2' />} onClick={onClose} />
        <SidebarItem label="Ontology" href="/ontology" icon={<Circle className='h-5 w-5 mr-2' />} onClick={onClose} />
      </ul>
    </>
  );
}