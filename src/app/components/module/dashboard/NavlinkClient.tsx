/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as Icons from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  title: string;
  iconName: string;
}

const NavLinkClient = ({ href, title, iconName }: NavLinkProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullCurrentPath = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const isActive = fullCurrentPath === href || pathname === href;

  const Icon = (Icons as any)[iconName] as LucideIcon;

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-sm shadow-blue-500/25'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800/60'
      }`}
    >
      {/* Active left indicator pill */}
      {isActive && (
        <span className="absolute -left-1 top-1.5 bottom-1.5 w-1 rounded-r-full bg-white/90" />
      )}

      <div
        className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
          isActive
            ? 'text-white'
            : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
        }`}
      >
        {Icon ? (
          <Icon size={18} />
        ) : (
          <Icons.Circle size={18} className="opacity-25" />
        )}
      </div>

      <span className="truncate">{title}</span>
    </Link>
  );
};

export default NavLinkClient;
