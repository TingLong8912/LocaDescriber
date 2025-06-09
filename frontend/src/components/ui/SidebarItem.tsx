'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

type SidebarItemProps = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export default function SidebarItem({ label, href, icon }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li
      className={`relative cursor-pointer rounded-md px-5 py-2 transition-colors duration-200 flex items-center ${
        isActive ? 'bg-muted' : 'hover:bg-muted/60'
      }`}
      onClick={() => (window.location.href = href)}
    >
      <>
        {icon}
        {label}
      </>
      {isActive && (
        <span className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r" />
      )}
    </li>
  );
}
