'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface IconBtnProps {
  icon: ReactNode;
  hoverIcon: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function IconBtn({ icon, hoverIcon, className, onClick }: IconBtnProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className={`cursor-pointer inline-flex items-center justify-center rounded-xs p-1 border-border ${className}`}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{ scale: hovered ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={hovered ? 'hover' : 'default'}
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 10 }}
          transition={{ duration: 0.2 }}
        >
          {hovered ? hoverIcon : icon}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}