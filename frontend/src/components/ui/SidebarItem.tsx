'use client';

import { usePathname } from 'next/navigation';

type SidebarItemProps = {
  label: string;
  href: string;
};

export default function SidebarItem({ label, href }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li
      className={`relative cursor-pointer rounded-md px-5 py-2 transition-colors duration-200 ${
        isActive ? 'bg-muted' : 'hover:bg-muted/60'
      }`}
      onClick={() => (window.location.href = href)}
    >
      {label}
      {isActive && (
        <span className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r" />
      )}
    </li>
  );
}
