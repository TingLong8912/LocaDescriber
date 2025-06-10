'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

type SidebarItemProps = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  actived?: boolean;
  onClick?: () => void;
};

export default function SidebarItem({ label, href, icon, actived, onClick }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;

  return (
    <li
      className={`relative cursor-pointer rounded-md px-5 py-2 transition-colors duration-200 flex items-center ${
        actived || isActive ? 'bg-muted' : 'hover:bg-muted/60'
      }`}
      onClick={onClick ? onClick : () => href && (window.location.href = href)}
    >
      <>
        {icon}
        {label}
      </>
      {(actived || isActive) && (
        <span className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r" />
      )}
    </li>
  );
}
