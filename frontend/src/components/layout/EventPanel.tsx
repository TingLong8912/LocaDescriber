'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import ProgressItem from '@/components/ui/ProgressItem';
import { CheckCheck, CircleDashed, LoaderCircle } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

export function EventPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        key="eventpanel-desktop"
        initial={{ x: 260, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 260, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 right-0 z-30 w-64 h-full border-l bg-background py-4 hidden lg:block"
      >
        <SidebarContent onClose={onClose} />
      </motion.aside>

      {/* Mobile Sidebar */}
      <motion.div
        key="eventpanel-mobile"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 right-0 z-40 w-64 bg-background p-4 lg:hidden"
      >
        <SidebarContent onClose={onClose} />
      </motion.div>
    </>
  );
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  const { steps } = useProgress();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <span className="text-md h-11 px-3 font-semibold flex items-end">Processing Steps</span>
      <div className="flex flex-col items-stretch">
        {steps.map((step, i) => (
          <Step key={i} label={step.label} status={step.status} details={step.details} />
        ))}
      </div>
    </div>
  );
}

function Step({
  label,
  status,
  details,
}: {
  label: string;
  status: 'completed' | 'active' | 'pending';
  details?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const statusColor = {
    completed: "text-green-600",
    active: "text-blue-600",
    pending: "text-gray-400",
  };

  const icon = {
    completed: <CheckCheck />,
    active: <LoaderCircle className="animate-spin" />,
    pending: <CircleDashed />,
  };

  return (
    <div>
      <ProgressItem
        label={label}
        icon={icon[status]}
        actived={status === "active"}
        onClick={() => details && setExpanded(!expanded)}
      />
      {expanded && details && (
        <div className="text-sm text-muted-foreground whitespace-pre-wrap">{details}</div>
      )}
    </div>
  );
}